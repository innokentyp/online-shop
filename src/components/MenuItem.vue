<template lang="html">
  <li @mouseenter="li_mouseenter" @mouseleave="li_mouseleave">
    <a :class="{ 'menu-item-is-active': category.indexOf(path) == 0 }" @click.prevent="a_click">
      <span>{{ parent_name }}</span>
      <span class="icon is-small has-text-info" v-if="parent.children">
        <font-awesome-icon :icon="[ 'fas', 'angle-right' ]"></font-awesome-icon>
      </span>
      <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </a>    
    <ul ref="ul_children" v-if="parent.children"><!--  v-show="li_hover" -->
      <app-menu-item v-for="item in parent.children" :key="`${path}/${item_name(item)}`" :path="`${path}/${item_name(item)}`" :parent="item" @category-has-changed="category_has_changed"></app-menu-item>
    </ul>
  </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-menu-item',
  props: [ 'path', 'parent' ],
  data () {
    return {
      // li_hover: false
    }
  },
  computed: {
    ...mapState([ 'category' ]),

    parent_name () {
      return this.parent.name ? this.parent.name : this.parent
    },

    category_item_name () {
      return this.path.match(/[^/]+$/)[0]
    }
  },
  methods: {
    item_name (item) {
      return item.name ? item.name : item
    },

    li_mouseenter (e) {
      // this.li_hover = true

      if (this.parent.children) {
        if (document.documentElement.clientWidth < 1024) return
        /*  
        this.$nextTick(
          () => {
            var ul = this.$refs.ul_children, rect = ul.getBoundingClientRect()

            if (rect.right > document.documentElement.clientWidth) {
              ul.style.left = `-${rect.right - rect.left}px`
              ul.style.right = '100%'
            }
          }
        )
        */  
        let ul = this.$refs.ul_children, rect = ul.getBoundingClientRect()

        if (rect.right > document.documentElement.clientWidth) {
          ul.style.left = `-${rect.right - rect.left}px`
          ul.style.right = '100%'
        }
      }
    },

    li_mouseleave (e) {
      // this.li_hover = false

      if (this.parent.children) {
        this.$refs.ul_children.style.cssText = ''
      }
    },

    category_has_changed (category) {
      this.$emit('category-has-changed', category)
    },

    a_click (e) {
      this.category_has_changed(this.path)
    }
  }  
}
</script>

<style lang="scss" scoped>
  li {
    &:not(:last-child) {
      border-bottom: dashed 1px hsl(0, 0%, 86%);
    }
      
    transition: .3s;

    &:hover {
      background-color: whitesmoke;
                                                    
      >ul {                    
        display: block;
      }
    }
    
    position: relative;
    
    >a {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: .4em .4em .4em .8em;
      color: inherit;
      text-decoration: none;

      &.menu-item-is-active {
        color: orange;
      }

      .icon {
        margin-left: .2em;
      }
    }

    >ul {
      display: none;

      position: absolute;
      z-index: 1;

      @media screen and (max-width: 1023px) {
        left: 3.6em;
        right: 0;

        top: calc(100% - 2px);
      }

      @media screen and (min-width: 1024px) {
        left: 100%;
        top: 0;
      }

      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      background-color: white;
    } 
  }
</style>