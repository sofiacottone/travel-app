<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter
    
  }
}

</script>

<template>
  <AppHeader></AppHeader>

  <main class="w-full mt-20 pb-10 overflow-y-auto">
    <router-view></router-view>
  </main>

  <AppFooter></AppFooter>
</template>

