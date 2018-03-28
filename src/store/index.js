import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import * as firebase from 'firebase'

Vue.use(Vuex)

// Очистка хранилища
// localStorage.removeItem('vuex')

export default new Vuex.Store({
  plugins: [ 
    createPersistedState() 
  ],
  state: {
    // Регион доставки
    place: 'Москва',

    // Фильтр
    category: 'Все товары',

    // Все товары
    all: [],
    all_current_page: 1,

    // Избранное
    favorites: [],

    // Корзина
    basket: [] 
  },
  getters: {
    
  },
  mutations: {
    SET_PLACE (state, value) {
      state.place = value
    },

    SET_CATEGORY (state, value) {
      state.category = value
    },

    SET_ALL (state, value) {
      state.all = [...value]
    },

    CHANGE_ALL_CURRENT_PAGE (state, value) {
      state.all_current_page = value
    },

    IN_FAVORITES (state, value) {
      if (state.favorites.includes(value)) return 
      
      state.favorites.push(value)
    },

    IN_BASKET (state, value) {
      if (state.basket.includes(value)) return 
      
      state.basket.push(value)
    }

  },
  actions: {
    setPlace ({ state, dispatch, commit }, value) {
      commit('SET_PLACE', value)

      return new Promise (
        (resolve, reject) => {
          setTimeout(() => {

            resolve(`Регион доставки: ${value}`)
          }, 200)          
        }
      )      
    },

    setCategory ({ state, dispatch, commit }, value) {
      commit('SET_CATEGORY', value)
    },

    search ({ state, dispatch, commit }, value) {
      commit('SET_ALL', [])
      commit('CHANGE_ALL_CURRENT_PAGE', 1)

      firebase.database().ref('/search/').orderByChild('category').equalTo(value).once(
        'value', 
        (snapshot) => {
          if (snapshot.val()) {
            var items = []

            for (var key of Object.keys(snapshot.val())) {
              items = items.concat(snapshot.val()[key].items)
            }

            commit('SET_ALL', items)
          }
        }
      )
    },

    pagination ({ state, dispatch, commit }, value) {
      commit('CHANGE_ALL_CURRENT_PAGE', value)
    },

    inFavorites ({ state, dispatch, commit }, value) {
      commit('IN_FAVORITES', value)
    },

    inBasket ({ state, dispatch, commit }, value) {
      commit('IN_BASKET', value)
    }
  }
})
