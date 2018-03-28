<template lang="html">
  <transition name="app-preloader">
    <div class="app-preloader" v-if="loading">
      <div class="has-text-white has-text-centered">
        <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x"></font-awesome-icon><br><span class="is-size-5">Загрузка</span>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'app-preloader',
    props: ['loading']
  }
</script>

<style lang="scss" scoped>
  .app-preloader {
    position: fixed;
    
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 1000;

    background-color: hsl(171, 100%, 41%);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-preloader-enter-active {
    transition: transform 1.2s ease-out;
  }

  .app-preloader-leave-active {
    transition: transform .8s ease-in;
  }

  .app-preloader-enter, .app-preloader-leave-to /* .app-preloader-leave-active до версии 2.1.8 */ {
    transform: translateY(-100vh);
  }
</style>