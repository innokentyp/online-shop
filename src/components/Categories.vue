<template lang="html">
  <aside class="menu is-small">
    <ul class="menu-list">
      <app-category-item v-for="(value, name) in categories" :key="name" :path="name" :categories="value"></app-category-item>          
    </ul>
  </aside>	
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as firebase from 'firebase'

import CategoryItem from './CategoryItem'

export default {
  name: 'app-categories',
  components: {
    'app-category-item': CategoryItem
  },
  data () {
    return {
      categories: {}
    }
  },
  computed: {
    ...mapGetters([ 'category' ]),    
    
  },
  methods: {
    ...mapActions([ 'set_category' ]),

    get_categories () {
      firebase.database().ref('/category/').once(
        'value', 
        (snapshot) => {
          if (snapshot.val()) {
            this.categories = {...snapshot.val()}

            if (this.category === null) {
              try {
                this.set_category(Object.keys(this.categories)[0])

              } catch (e) {  
                console.error(e)  
              }
            }
          }
        }
      )
    }
  },
  mounted () {
    //this.get_categories ()
  }
}  
</script>

<style lang="scss" scoped>
  /*
  aside {
    > ul {
      margin: 0;
      list-style-type: none; 
    }
  }
  */
</style>