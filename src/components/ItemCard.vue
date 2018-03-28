<template lang="html">
  <article class="card">
    <div class="card-image">
      <figure class="image is-square">
        <a @click.prevent="a_preview_click">
          <img :src="photo" alt="Placeholder image">
        </a>
      </figure>
    </div>

    <div class="card-content">
      <a @click.prevent="a_preview_click">{{ item.name }}</a>
      <strong>{{ price }}</strong>
    </div>

    <footer class="card-footer">
      <a class="card-footer-item tooltip is-tooltip-primary is-tooltip-top" data-tooltip="В избранное" @click.prevent="a_in_favorites_click">
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'heart']"></font-awesome-icon>
        </span>
      </a>
      <a class="card-footer-item tooltip is-tooltip-primary is-tooltip-top buy" data-tooltip="Купить" @click.prevent="a_in_basket_click">
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'shopping-basket']"></font-awesome-icon>
        </span>
      </a>
    </footer>
  </article>
</template>

<script>
import * as firebase from 'firebase'

import { mapActions } from 'vuex'
import default_item_photo from '../assets/item.png'

export default {
  name: 'app-item-card',
  props: [ 'number', 'i' ],
  data () {
    return {
      item: {
        id: null,
        category: 'Нет',
        name: 'Нет',
        price: {
          value: 0,
          currency: '₽'
        },
        photos: [],
        current_photo: -1
      },
      photo: default_item_photo
    }
  },
  computed: {
    price () {
      return  `${this.item.price.value} ${this.item.price.currency}`
    }
  },
  methods: {
    ...mapActions([ 'inFavorites', 'inBasket' ]),

    a_preview_click (e) {
      console.log(`preview ${this.number}`)
    },

    a_in_favorites_click (e) {
      console.log(`in favorites ${this.number}`)

      this.inFavorites(this.number)
    },
    
    a_in_basket_click (e) {
      console.log(`in basket ${this.number}`)

      this.inBasket(this.number)
    },

    load_photo () {
      firebase.storage().ref().child(`item/${this.item.id}/${this.item.photos[this.item.current_photo]}`).getDownloadURL()
        .then(
          (url) => {
            this.photo = url
          }
        )
        .catch(
          (error) => {
            console.error(error.message)
          }
        ) 
    }
  },
  mounted () {
    this.item.id = this.number

    firebase.database().ref('/item/').orderByChild('id').equalTo(this.number).once(
        'value', 
        (snapshot) => {
          if (snapshot.val()) {
            for (var key of Object.keys(snapshot.val())) {
              this.item = snapshot.val()[key]

              if (this.item.photos && this.item.photos.length) {
                this.load_photo()
              }

              break
            }
          }
        }
      )
  }  
}
</script>

<style lang="scss" scoped>
  .card {
    flex: 1 1 240px;

    margin-right: 3px;
    margin-bottom: 3px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-content {
      flex: 1 1 auto;

      display: flex;
      flex-direction: column;
      justify-content: space-between;  

      >:first-child {
        flex-grow: 1;
      }       
    }

    .card-footer-item {
      transition: all .3s;

      &:hover {
        background-color: hsl(217, 71%, 53%);
        color: white;
      }

      &.buy {
        color: hsl(141, 71%, 48%);

        &:hover {
          background-color: hsl(141, 71%, 48%);
          color: white;
        }
      }
    }

    &:hover {
      z-index: 1;
      outline: solid 1px orange;
    }

    /*
    .card-content {
      position: relative;

      &::after {
        content: "";

        position: absolute;
        z-index: 1;

        left: 0;
        top: 0;  
        right: 0;
        bottom: 0;

        background-color: hsl(48, 100%, 67%);
        opacity: .08;

        transform: none;
        transition: transform .2s ease-in-out;
      }

      &:hover {
        &::after {
          transform: rotateY(90deg);
        }
      } 
    }
    */
  }
</style>