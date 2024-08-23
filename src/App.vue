<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter,

  }
}

</script>

<template>
  <AppHeader></AppHeader>

  <main class="w-full max-w-screen-xl m-auto mt-16 pb-10 overflow-y-auto">
    <router-view></router-view>
  </main>

  <AppFooter></AppFooter>
</template>
