<script>
import { useTripsStore } from '../stores/store';
import TokenExpiredModal from '../components/TokenExpiredModal.vue';

export default {
  components: {
    TokenExpiredModal
  },
  data() {
    return {
      store: useTripsStore(),
      loading: false,
      error: null,
    }
  },
  methods: {
    async getTrips() {
      this.loading = true;
      this.error = null;
      try {
        await this.store.getTrips();
      } catch (error) {
        this.error = 'Errore nel recupero dei viaggi';
        console.error('Errore nel recupero dei viaggi:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    initialTrips() {
      return this.store.initialTrips;
    },
    userTrips() {
      return this.store.trips;
    },
  },
  mounted() {
    this.getTrips();
  }
}
</script>

<template>
  <h1 class="text-2xl font-bold py-4 px-6">
    Benvenuto in Travel Journal!
  </h1>

  <!-- add new trip  -->
  <div class="flex justify-end items-center mb-4 px-6">
    <button class="px-3 py-2 text-white bg-cyan-500 dark:bg-cyan-600 rounded">
      <router-link :to="{ name: 'new-trip' }">
        Nuovo viaggio...<font-awesome-icon :icon="['fas', 'person-walking-luggage']" />
      </router-link>
    </button>
  </div>

  <div class="flex justify-start items-baseline md: gap-2 px-6">
    <h2 class="text-xl font-bold">Ultimi viaggi</h2>
    <span class="text-xl font-bold">&#183;</span>
    <router-link :to="{ name: 'trips' }" class="text-cyan-500 dark:text-cyan-600">Vedi tutti</router-link>
  </div>

  <!-- latest trips  -->
  <ul class="md:flex md:gap-8 px-6">
    <li v-for="trip in initialTrips"
      class="flex md:flex-col items-center md:w-1/3 md:max-h-96 gap-3 my-2 p-4 rounded shadow shadow-cyan-100 cursor-pointer dark:bg-slate-200 dark:text-gray-800">

      <router-link :to="{ name: 'single-trip', params: { id: trip.id } }" class="flex items-center gap-3 md:block">
        <img class="w-1/12 md:w-full md:h-auto md:max-h-72 md:rounded-t aspect-square object-cover rounded"
          :src="trip.img" alt="">
        <div class="md:text-center">
          <h4>{{ trip.title }}</h4>
          <span class="text-sm text-gray-500">{{ trip.from }} - {{ trip.to }} {{ trip.year }}</span>
        </div>
      </router-link>

    </li>
  </ul>

  <TokenExpiredModal />
</template>