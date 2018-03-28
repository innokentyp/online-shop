import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home'
import All from '../components/All'
import Favorites from '../components/Favorites'
import Basket from '../components/Basket'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: to => {
      return '/home'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/all',
    name: 'all',
    component: All
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket
  }
]

export default new VueRouter({
  routes
})
