<template lang="html">
  <nav>
    <ul class="menu">
      <li v-for="(item, i) in categories" :key="item.name" @mouseenter="li_mouseenter($event, item, i)" @mouseleave="li_mouseleave($event, item, i)">
        <a :class="{ 'menu-item-is-active': category.indexOf(item.name) == 0 }" @click.prevent="a_click($event, item, i)">
          <span>{{ item.name }}</span>
          <span class="icon is-small has-text-info" v-if="item.children">
            <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>
          </span>
          <span v-else>&nbsp;&nbsp;</span>
        </a>
        <ul ref="ul_children" v-if="item.children"><!-- v-show="li_hover[i]" --> 
          <app-menu-item v-for="child in item.children" :key="`${item.name}/${child_name(child)}`" :path="`${item.name}/${child_name(child)}`" :parent="child" @category-has-changed="category_has_changed"></app-menu-item>
        </ul>
      </li>
    </ul>  
  </nav>
</template>

<script>
import * as firebase from 'firebase'

import { mapState } from 'vuex'

import MenuItem from './MenuItem'

export default {
  name: 'app-menu',
  components: {
    'app-menu-item': MenuItem
  },
  data () {
    return {
      categories: []
      // li_hover: []
    }
  },
  computed: {
    ...mapState([ 'category' ])

  },
  methods: {
    child_name (item) {
      return item.name ? item.name : item
    },

    li_mouseenter (e, parent, i) {
      // this.$set(this.li_hover, i, true)
      
      if (parent.children) {
        if (document.documentElement.clientWidth < 1024) return
        /*
        this.$nextTick(
          () => {
            var ul = this.$refs.ul_children[i], rect = ul.getBoundingClientRect()

            if (rect.right > document.documentElement.clientWidth) {
              ul.style.left = `-${rect.right - rect.left}px`
              ul.style.right = '0'
            }
          }
        )
        */
        let ul = this.$refs.ul_children[i], rect = ul.getBoundingClientRect()

        if (rect.right > document.documentElement.clientWidth) {
          ul.style.left = `-${rect.right - rect.left}px`
          ul.style.right = '0'
        }
      }
    },

    li_mouseleave (e, parent, i) {
      // this.$set(this.li_hover, i, false)

      if (parent.children) {
        this.$refs.ul_children[i].style.cssText = ''
      }
    },

    category_has_changed (category) {
      this.$emit('category-has-changed', category)
    },

    a_click (e, parent, i) {
      this.category_has_changed(parent.name)
    }    
  },
  mounted () {
    firebase.database().ref('/category/').once(
      'value', 
      (snapshot) => {
        if (snapshot.val()) {
          this.categories = snapshot.val()
        }
      }
    )

    // this.li_hover = new Array(this.categories.length).fill(false)
  }
}
</script>

<style lang="scss" scoped>
  nav {
    margin-bottom: 24px;
  }

  .menu {
    
    @media screen and (min-width: 1024px) {
      display: flex;
      justify-content: flex-start;
      //flex-wrap: wrap;

      white-space: nowrap;
    }

    font-size: .8em;

    >li {
      $border-color: hsl(0, 0%, 86%);

      &:not(:last-child) {
        @media screen and (max-width: 1023px) {   
          border-bottom: dashed 1px $border-color;
        }

        @media screen and (min-width: 1024px) {   
          border-right: dashed 1px $border-color;
        }
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
        z-index: 100;
        
        @media screen and (max-width: 1023px) {
          left: 3.6em;
          right: 0;

          top: calc(100% - 2px); 
        }

        @media screen and (min-width: 1024px) {
          left: 0;
          top: 100%;
        }
                  
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background-color: white;
      } 
    } 
  }
</style>