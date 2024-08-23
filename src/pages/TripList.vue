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
  <h2 class="text-xl font-bold px-6 py-4">Tutti i viaggi</h2>

  <ul class="md:flex md:flex-wrap px-6">
    <li v-for="trip in initialTrips"
      class="flex md:flex-col items-center md:w-[calc((100%/3)-20px)] xl:w-[calc((100%/4)-20px)] md:max-h-96 gap-4 my-2 md:m-2 p-4 border rounded shadow shadow-cyan-100 cursor-pointer">

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

</template>