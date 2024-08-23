<script>
import { useTripsStore } from '../stores/store';

export default {
  data() {
    return {
      store: useTripsStore(),
    }
  },
  computed: {
    initialTrips() {
      return this.store.initialTrips;
    }
  }
}
</script>

<template>
  <div class="h-screen">
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

    <div class="flex justify-between md:justify-start md:items-baseline md: gap-2 px-6">
      <h2 class="text-xl font-bold">Ultimi viaggi</h2>
      <span class="text-xl font-bold">&#183;</span>
      <router-link :to="{ name: 'trips' }" class="text-cyan-500 dark:text-cyan-600">Vedi tutti</router-link>
    </div>

    <!-- latest trips  -->
    <ul class="md:flex md:gap-8 px-6">
      <li v-for="trip in initialTrips"
        class="flex md:flex-col items-center md:w-1/3 md:max-h-96 gap-3 my-2 p-4 border rounded shadow shadow-cyan-100 cursor-pointer dark:bg-">

        <router-link :to="{ name: 'single-trip', params: { id: trip.id } }">
          <img class="w-1/12 md:w-full md:h-auto md:max-h-72 md:rounded-t aspect-square object-cover rounded"
            :src="trip.img" alt="">
          <div class="md:text-center">
            <h4>{{ trip.title }}</h4>
            <span class="text-sm text-gray-500">{{ trip.from }} - {{ trip.to }} {{ trip.year }}</span>
          </div>
        </router-link>

      </li>
    </ul>
  </div>


</template>