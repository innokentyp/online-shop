<template lang="html">
  <li>
    <a :class="[ { 'is-active': category == path } ]" :data-number-of-items="number_of_items(categories)" @click.prevent="category_item_click">{{ category_item_name }}</a>
    <ul class="menu-list" v-if="category.indexOf(path) == 0 && typeof categories == 'object'">
      <app-category-item v-for="(value, name) in categories" :key="`${path}/${name}`" :path="`${path}/${name}`" :categories="value"></app-category-item>
    </ul>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// class="category-item"
// :class="[ { 'has-text-black': category == path }, { 'has-text-weight-semibold': category == path } ]"

export default {
  name: 'app-category-item',
  props: [ 'path', 'categories' ],
  computed: {
    ...mapGetters([ 'category' ]),

    category_item_name () {
      return this.path.match(/[^/]+$/)[0]
    }    
  },
  methods: {
    ...mapActions([ 'set_category' ]),
    
    number_of_items (value) {
      if (typeof value == 'object') {
        let total = 0

        Object.keys(value).forEach((key) => { total += this.number_of_items(value[key]) })

        return total
      } else {
        return value
      }
    },

    category_item_click (e) {
      this.set_category(this.path)
    }    
  }  
}
</script>

<style lang="scss" scoped>
  [data-number-of-items]:not(.is-active)::after {
    content: '\00a0' attr(data-number-of-items);
    color: hsl(171, 100%, 41%);
  }
  /*
  .category-item {
    margin-top: 0;

    > a {
      transition: all .3s linear .1s; 
    }

    > [data-number-of-items]::after {
      content: ' ' attr(data-number-of-items);
      color: hsl(348, 100%, 61%);
      font-size: .8em;
      font-weight: normal;
      cursor: default;
    }

    > ul {
      margin: 0 0 0 16px;
      list-style-type: none;
    }
  }
  */ 
</style>