<template lang="html">
  <header id="app-header-id" @click="header_click">
    <nav class="top-bar">
      <!-- dropdown-menu-place -->
      <div :class="['dropdown', {'is-active': dropdown_menu_place_active}]">
        <div class="dropdown-trigger">
          <button :class="['button', 'is-small', {'is-active': dropdown_menu_place_active}]" id="dropdown-menu-place-button" aria-haspopup="true" aria-controls="dropdown-menu-place" @click.stop="dropdown_menu_place_active = !dropdown_menu_place_active">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon>
            </span>
            <span>{{ place }}</span>

            <span class="icon">
              <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>           
            </span>
          </button>
        </div>

        <div class="dropdown-menu" id="dropdown-menu-place" role="menu">
          <div class="dropdown-content">
            <a v-for="(item, index) in places" :key="index" :class="['dropdown-item', { 'is-active': item == place }]" @click.prevent="dropdown_menu_place_item_click($event, item)">{{ item }}</a>
          </div>
        </div>
      </div>
      <!-- dropdown-menu-place -->
      
      <!-- `skype:${online_shop_phone_number}?call` или `tel:${online_shop_phone_number}` -->
      <a class="button is-small tooltip is-tooltip-bottom" :href="`skype:${online_shop_phone_number}?call`" data-tooltip="Наш телефон">
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'phone']"></font-awesome-icon>
        </span>
        <span>{{ online_shop_phone }}</span>
      </a>

      <!-- dropdown-menu-user -->
      <div :class="['dropdown', 'is-right', {'is-active': dropdown_menu_user_active}]" v-if="user">
        <div class="dropdown-trigger">
          <button :class="['button', 'is-small', {'is-active': dropdown_menu_user_active}]" id="dropdown-menu-user-button" aria-haspopup="true" aria-controls="dropdown-menu-user" @click.stop="dropdown_menu_user_active = !dropdown_menu_user_active">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
            </span>
            <span>{{ user_phone }}</span>

            <span class="icon">
              <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>           
            </span>
          </button>
        </div>

        <div class="dropdown-menu" id="dropdown-menu-user" role="menu">
          <div class="dropdown-content">
            <a class="dropdown-item" @click.prevent="">История заказов</a>
            <a class="dropdown-item" @click.prevent="">Бонусная программа</a>
            <a class="dropdown-item" @click.prevent="">Отзывы</a>
            <a class="dropdown-item" @click.prevent="">Подписки</a>                    

            <hr class="dropdown-divider">

            <a class="dropdown-item" @click.prevent="a_signout_click">Выйти</a>
          </div>
        </div>
      </div>
      <!-- dropdown-menu-user -->

      <!-- dropdown-menu-sign -->
      <div :class="['dropdown', 'is-right', {'is-active': dropdown_menu_sign_active}]" v-else>
        <div class="dropdown-trigger">
          <button :class="['button', 'is-small', {'is-active': dropdown_menu_sign_active}]" id="dropdown-menu-sign-button" aria-haspopup="true" aria-controls="dropdown-menu-sign" @click.stop="dropdown_menu_sign_button_click">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']"></font-awesome-icon>
            </span>
            <span>Вход в систему</span>

            <span class="icon">
              <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>           
            </span>
          </button>
        </div>

        <div class="dropdown-menu" id="dropdown-menu-sign" role="menu" @click.stop>
          <div class="dropdown-content">
            <!-- form-sign -->
            <form class="dropdown-item" id="form-sign" @submit.prevent="form_sign_submit" @reset="form_sign_reset">
              <div class="field">
                <label class="label">Номер телефона</label>

                <div class="field has-addons">
                  <div class="control">
                    <a class="button is-static">{{ phone.country_code }}</a>
                  </div>
                  <div class="control is-expanded">
                    <masked-input type="tel" class="input" name="phone" ref="phone" v-model="phone.number" mask="111 111-11-11" placeholder-char="X" placeholder="XXX XXX-XX-XX" autocomplete="off" />
                  </div>                                                    
                </div>                                               
              </div>

              <div class="field">
                <div class="control">
                  <button type="button" :class="['button', 'is-fullwidth', 'is-link', {'is-loading': send_password_loading}, {'badge': send_password_history.length}, 'is-badge-small', 'is-badge-success']" @click="button_send_password_click" :disabled="button_send_password_disabled" :data-badge="send_password_history.length">
                    <span>Получить пароль в SMS</span>
                    <span class="icon">
                      <font-awesome-icon :icon="['fas', 'arrow-right']"></font-awesome-icon>
                    </span>
                  </button>
                </div>
              </div>

              <div class="field" v-if="send_password_history.length">
                <table class="table is-narrow is-fullwidth history">
                  <thead>
                    <tr>
                      <th>Время</th>
                      <th>Номер телефона</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in send_password_history" :class="{ 'is-selected': index == send_password_history.length - 1 }">
                      <td>{{ item.time.toLocaleTimeString('ru-RU') }}</td>
                      <td>{{ item.phone }}</td>
                    </tr>
                  </tbody>
                </table>                        
              </div>

              <div class="field" v-if="confirmationResult">
                <label class="label">Пароль</label>
                <div class="control">
                  <input type="password" class="input" name="password" ref="password" v-model="password" :disabled="confirmationResult === null">
                </div>
              </div>

              <div class="notification is-danger" v-if="error">
                <button type="button" class="delete" @click="error = null"></button>
                {{ error.message }}
              </div>
            </form>
            <!-- form-sign -->

            <hr class="dropdown-divider">

            <div class="dropdown-item">
              <div class="field is-grouped">
                <div class="control">
                  <button type="submit" form="form-sign" :class="['button', 'is-primary', {'is-loading': form_sign_submit_loading}]" :disabled="form_sign_submit_disabled">Войти</button>
                </div>
                <div class="control">
                  <button type="reset" form="form-sign" class="button is-text">Очистить</button>
                </div>
              </div> 
            </div>                     
          </div>
        </div>
      </div>
      <!-- dropdown-menu-sign -->
    </nav>

    <nav class="navbar is-primary has-shadow">
      <div class="navbar-brand">
        <a class="navbar-item" :href="location_origin">
          <!--
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          !-->
          <span class="is-size-5 has-text-warning" id="online-shop-brand">Online Shop</span>
        </a>
        <div class="navbar-burger burger" data-target="navbar-menu-id">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbar-menu-id" class="navbar-menu">
        <div class="navbar-start">
          <router-link :class="['navbar-item', { 'is-active': $route.name == 'home' }]" to="home">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'home']"></font-awesome-icon>
            </span>
            <span>Витрина</span>
            <span>&nbsp;&nbsp;</span>
          </router-link>
          <router-link :class="['navbar-item', { 'is-active': $route.name == 'all' }]" to="all">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
            </span>
            <span>Поиск</span>
            <span>&nbsp;&nbsp;</span>
          </router-link>
          <router-link :class="['navbar-item', { 'is-active': $route.name == 'favorites' }]" to="favorites">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'heart']"></font-awesome-icon>
            </span>
            <span :class="[ { 'badge': favorites.length > 0 }, 'is-badge-small', 'is-badge-info']" :data-badge="favorites.length">Избранное</span>
            <span>&nbsp;&nbsp;</span>
          </router-link>
          <router-link :class="['navbar-item', { 'is-active': $route.name == 'basket' }]" to="basket">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'shopping-basket']"></font-awesome-icon>
            </span>
            <span :class="[ { 'badge': basket.length > 0 }, 'is-badge-small', 'is-badge-success']" :data-badge="basket.length">Корзина</span>
            <span>&nbsp;&nbsp;</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- recaptcha-container -->
    <div id="recaptcha-container"></div>
  </header>
</template>

<script>
  import * as firebase from 'firebase'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app-header',
    props: [ 'user' ],
    data () {
      return {
        places: [],

        online_shop_phone_number: '+79067038001',

        dropdown_menu_place_active: false,

        dropdown_menu_user_active: false,
        dropdown_menu_sign_active: false,

        phone: {
          country_code: '+7',
          number: null
        },

        send_password_loading: false,
        send_password_history: [],  

        password: null,

        form_sign_submit_loading: false,

        recaptchaVerifier: null,
        confirmationResult: null,

        error: null
      }
    },
    computed: {
      ...mapState([ 'place', 'favorites', 'basket' ]),

      ...mapGetters([ ]),

      location_origin () {
        return window.location.origin + (window.location.pathname == '/' ? '' : window.location.pathname)
      },

      button_send_password_disabled () {
        return /[0-9]{3}\s[0-9]{3}-[0-9]{2}-[0-9]{2}/.test(this.phone.number) == false 
      },
      form_sign_submit_disabled () {
        return !(this.confirmationResult && this.password)
      },

      phone_number () {
        return `${this.phone.country_code}${this.phone.number.replace(/[\s\-]/g, '')}`
      },

      send_password_history_last () {
        return this.send_password_history.length ? this.send_password_history[this.send_password_history.length - 1] : { time: new Date(), phone: null }
      },
      user_phone () {
        return this.user ? `${this.user.phoneNumber.slice(0, 2)} XXX XX-${this.user.phoneNumber.slice(8, 10)}-${this.user.phoneNumber.slice(10)}` : 'Неизвестный' 
      },

      online_shop_phone () {
        return `${this.online_shop_phone_number.slice(0, 2)} ${this.online_shop_phone_number.slice(2, 5)} ${this.online_shop_phone_number.slice(5, 8)}-${this.online_shop_phone_number.slice(8, 10)}-${this.online_shop_phone_number.slice(10)}`        
      }
    },
    methods: {
      ...mapActions([ 'setPlace' ]),
      
      header_click (e) {
        this.dropdown_menu_place_active = false

        this.dropdown_menu_user_active = false  
        this.dropdown_menu_sign_active = false  
      },

      dropdown_menu_place_item_click (e, item) {
        this.setPlace(item)
          .then((response) => {
            console.log(response)
          })
          .catch((status) => {
            console.error(`Response status: ${status}`)
          })
          .finally(() => {

          })
      },

      dropdown_menu_sign_button_click (e) {
        this.dropdown_menu_sign_active = !this.dropdown_menu_sign_active

        if (this.dropdown_menu_sign_active) {
          this.$nextTick(() => this.$refs.phone.$el.focus())
        }
      },

      // Посылка пароля в СМС
      button_send_password_click (e) {
        this.send_password_loading = true

        firebase.auth().signInWithPhoneNumber(this.phone_number, this.recaptchaVerifier)
          .then((confirmationResult) => {
            this.send_password_loading = false

            // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
            this.confirmationResult = confirmationResult

            this.send_password_history.push(
              { 
                time: new Date(),
                phone: this.phone_number
              }
            )

            this.$nextTick(() => this.$refs.password.focus())
          })
          .catch((error) => {
            this.send_password_loading = false

            // Error; SMS not sent
            this.error = error
          })
      },

      // Вход в систему            
      form_sign_submit (e) {
        this.form_sign_submit_loading = true

        this.confirmationResult.confirm(this.password)
          .then((result) => {
            // User signed in successfully.
            this.form_sign_submit_loading = false
            
            this.form_sign_reset()
            this.send_password_history.splice(0, this.send_password_history.length)

            this.dropdown_menu_sign_active = false
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            this.form_sign_submit_loading = false
            
            this.error = error
          })
      },

      // Очистка формы входа
      form_sign_reset (e) {
        this.confirmationResult = null

        this.phone.number = null
        this.password = null

        this.error = null

        if (e) {
          this.$nextTick(() => this.$refs.phone.$el.focus())
        }
      },

      // Выход из системы
      a_signout_click (e) {
        firebase.auth().signOut()
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {

            // An error happened.
            console.error(error.message)
          })
      }
          
    },
    mounted () {
      // Bulma navbar script
      document.addEventListener('DOMContentLoaded', function () {
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
          // Add a click event on each of them
          $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

              // Get the target from the "data-target" attribute
              var target = $el.dataset.target;
              var $target = document.getElementById(target);

              // Toggle the class on both the "navbar-burger" and the "navbar-menu"
              $el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
            });
          });
        }
      });
      // end Bulma navbar script

      // Use invisible reCAPTCHA
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container', 
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        }
      )

      // Регионы доставки
      firebase.database().ref('/place/').once(
        'value', 
        (snapshot) => {
          if (snapshot.val()) {
            this.places = snapshot.val()
          }
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  header {
    position: fixed;

    left: 0;
    top: 0;

    width: 100%;

    z-index: 800;
  }

  .top-bar {
    padding: 2px;

    display: flex;
    justify-content: space-between;

    background-color: white;
  }

  #online-shop-brand {
    &::first-letter {
      color: hsl(348, 100%, 61%);
    }
  } 

  input[name="phone"],
  input[name="password"] {
    box-shadow: none !important;  
  }
  
  .navbar-menu {
    @media screen and (max-width: 1023px) {
      overflow: visible !important;

      .navbar-item {
        display: flex;
        justify-content: flex-start;
      }
    }
  }

  #dropdown-menu-place,
  #dropdown-menu-user {
    a::first-letter {
      color: hsl(171, 100%, 41%);
    }
  }

  #form-sign {
    min-width: 20em;
  }

  #recaptcha-container {
    display: none;
  }

  .history {
    white-space: nowrap;

    td {
      border-width: 0;
    }
  }   
</style>
