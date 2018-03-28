<template>
  <div>
    <app-preloader :loading="loading"></app-preloader>
    <app-header :user="user"></app-header>	
        
    <section class="section">      
      <div class="container">
        <router-view></router-view>
      </div>
    </section>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import * as firebase from 'firebase'

  import Preloader from './components/Preloader'

  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'app',
    data() {
      return {
        loading: true,

        // Текущий пользователь
        user: null   
      } 
    },
    components: {
      'app-preloader': Preloader,
    	'app-header': Header,
    	'app-footer': Footer      
    },
    methods: {
      loaded() {
        return !this.loading
      }
    },
    created() {
      console.log(`${performance.now()} app:created`)
      
    },
    mounted() {
      console.log(`${performance.now()} app:mounted`) 
      
      // Завершение процесса загрузки
      document.addEventListener('DOMContentLoaded',
        () => {
          console.log(`${performance.now()} document:DOMContentLoaded`)

          document.body.style.paddingTop = `${document.getElementById('app-header-id').offsetHeight}px`

          this.loading = false
        }
      )  
        
      window.addEventListener('load',  
        () => {
          console.log(`${performance.now()} window:load`)
        }
      )

      // Get the currently signed-in user
      firebase.auth().onAuthStateChanged(
        (user) => {
          console.log(`${performance.now()} firebase:onAuthStateChanged`)

          this.user = user
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
