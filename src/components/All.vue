<template lang="html">
  <div>
    <app-menu @category-has-changed="category_has_changed"></app-menu>

    <div class="columns">
      <div class="column">
        <h1 class="title is-4" v-show="false">{{ category_name }}</h1>

        <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
          <ul>
            <li v-for="(item, i) in category_to_array" :class="{ 'is-active': i == category_to_array.length - 1 }" :key="i">
              <a @click.prevent="breadcrumb_a_click($event, item, i)" v-if="i < category_to_array.length - 1">{{ item }}</a>
              <a aria-current="page" :data-number-of-items="all.length ? all.length : null" v-else>{{ item }}</a>
            </li>
          </ul>
        </nav>

        <div class="gallery"><!-- columns is-multiline is-centered is-gapless -->
          <app-item-card v-for="(item, i) in all.slice((all_current_page - 1) * items_per_page, (all_current_page - 1) * items_per_page + items_per_page)" :key="item" :number="item" :i="(all_current_page - 1) * items_per_page + i + 1"></app-item-card>
        </div>

        <app-pagination :last_page="last_page" :current_page="all_current_page" @page-has-changed="page_has_changed" v-if="all.length"></app-pagination>  
      </div>
      <div class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd">
        <aside class="filter">
          <h2 class="title is-6">Уточнить категорию</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quam quae eaque, quod facere quis nobis. Odit commodi similique veritatis eum, a deserunt neque autem cumque ullam numquam! Delectus debitis libero pariatur repellat eos nulla sint modi rerum corporis accusamus beatae animi iste quod quaerat sequi vero, quas eligendi suscipit facilis quo in voluptates cum. Dolorem minus illum nulla, rem sit magni voluptatum labore veniam deserunt explicabo nisi repellendus unde doloremque, maiores esse odio corporis nostrum in omnis atque aspernatur! Reprehenderit asperiores deleniti itaque fugiat, vel minus tempore, iure veritatis voluptas illo dolores, saepe alias natus! Ipsa recusandae et corporis sit placeat magnam debitis rem minus laborum totam nostrum ratione fugiat sapiente quis beatae consequuntur perspiciatis similique, optio natus reprehenderit mollitia ad itaque. Laudantium vel rerum fugiat reprehenderit, itaque odit eius laborum. Atque natus tempora id molestiae quam quo commodi cumque earum amet ad qui, accusamus aliquid vero, nihil a similique maiores voluptatem minima optio. Voluptatibus distinctio ex fuga esse molestiae illum officia, sapiente laboriosam obcaecati similique animi suscipit! Omnis sequi dolorem ex ad vitae ipsum facilis accusantium aliquid quod impedit id dolor ratione obcaecati explicabo nisi sapiente doloremque consequatur unde labore, ab, hic asperiores repellendus eligendi rem esse. Quis repellendus blanditiis, error magnam quod animi aperiam optio quidem harum provident. Perferendis quis odit et, assumenda nulla sed, dignissimos, provident, adipisci vero nihil dolorem ducimus cumque ea accusamus distinctio nesciunt excepturi! Doloribus tenetur odit adipisci at placeat. Voluptatem modi ullam iusto magnam quam doloremque cum beatae repellat voluptas, consequuntur sequi, laboriosam inventore reprehenderit ut aut. A!</p>
        </aside>
      </div>
    </div>  
  </div>
</template>

<script>
import * as firebase from 'firebase'

import { mapState, mapActions } from 'vuex'

import Menu from './Menu'
import ItemCard from './ItemCard'
import Pagination from './Pagination'

export default {
  name: 'all',
  components: {
    'app-menu': Menu,
    'app-item-card': ItemCard,
    'app-pagination': Pagination
  },
  data () {
    return {
      items_per_page: 12
    }
  },
  computed: {
    ...mapState([ 'category', 'all', 'all_current_page' ]),
    
    category_to_array () {
      return typeof this.category == 'string' ? this.category.split('/') : []
    },

    category_name () {
      return typeof this.category == 'string' ? this.category.match(/[^/]+$/)[0] : ''
    },

    last_page () {
      return this.all.length == 0 ? 0 : Math.ceil(this.all.length / this.items_per_page)
    }
  },
  methods: {
    ...mapActions([ 'setCategory', 'search', 'pagination' ]),

    category_has_changed(category) {
      this.setCategory(category)

      this.search(category)
    },

    breadcrumb_a_click($event, item, i) {
      this.category_has_changed(this.category_to_array.slice(0, i + 1).join('/'))
    },

    page_has_changed (page) {
      this.pagination(page)
      
      this.$nextTick(
        () => {
          if (window.pageYOffset > 0) {
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
          }
        }
      )    
    }
  },
  mounted () {
      
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    font-size: .8em;

    a[aria-current='page'] {
      font-size: 1.2em;
    }

    [data-number-of-items] {
      position: relative;

      &::after {
        position: absolute;
        z-index: 1;  

        left: calc(100% - 1em);
        top: .2em;  

        min-width: 1.6em;

        content: '  ' attr(data-number-of-items) '  ';
        white-space: pre;

        font-size: .8em;
        text-align: center;

        background-color: hsl(171, 100%, 41%);
        color: white;

        border-radius: 1000px;
      }
    } 
  }

  .gallery {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    margin-bottom: 8px;
  }

  .filter {
    padding: 1.2em .8em;
    background-color: whitesmoke;
  }
</style>
	