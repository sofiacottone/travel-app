<script>
import { DateTime } from 'luxon';
import { useTripsStore } from '../stores/store';

export default {
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
    },
    formatDate(date) {
      // => 30 ago
      return DateTime.fromISO(date).setLocale('it').toLocaleString({ month: 'short', day: 'numeric' });
    },
    getYear(date) {
      // => 2024
      return date.substr(0, 4);
    },
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
  <h2 class="text-xl font-bold px-6 py-4">Tutti i viaggi</h2>

  <div class="px-6">
    <template v-if="userTrips.results.length > 0">
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <ul v-if="!loading && !error" class="md:flex md:flex-wrap">
        <li v-for=" trip in userTrips.results" :key="trip.id"
          class="flex md:flex-col items-center md:w-[calc((100%/3)-20px)] xl:w-[calc((100%/4)-20px)] md:max-h-96 gap-4 my-2 md:m-2 p-4 border rounded shadow shadow-cyan-100 cursor-pointer dark:bg-slate-200 dark:text-gray-800">

          <router-link :to="{ name: 'single-trip', params: { id: trip.id } }" class="flex items-center gap-3 md:block">
            <img class="w-1/12 md:w-full md:h-auto md:max-h-72 md:rounded-t aspect-square object-cover rounded"
              src="../../public/map.jpg" alt="default image">

            <div class="md:text-center">
              <h4>{{ trip.title }}</h4>
              <span class="text-sm text-gray-500">
                {{ formatDate(trip.start_date) }}
                <span v-if="getYear(trip.start_date) != getYear(trip.end_date)">
                  {{ getYear(trip.start_date) }}
                </span>
                - {{ formatDate(trip.end_date) }}
                {{ getYear(trip.end_date) }}
              </span>
            </div>
          </router-link>

        </li>
      </ul>
    </template>
    <template v-else>
      <p>
        Non sono presenti viaggi.
        <router-link :to="{ name: 'new-trip' }" class="underline hover:text-cyan-600">
          Aggiungi un nuovo viaggio per iniziare.
        </router-link>
      </p>
      <p class="mt-3">
        Ecco dei template da cui prendere spunto:
      </p>
    </template>
  </div>

  <template v-if="userTrips.results.length > 0">
    <h5 class="px-6 pt-3 font-semibold">Template:</h5>
  </template>
  <ul class="md:flex md:flex-wrap px-6">
    <li v-for="trip in initialTrips"
      class="flex md:flex-col items-center md:w-[calc((100%/3)-20px)] xl:w-[calc((100%/4)-20px)] md:max-h-96 gap-4 my-2 md:m-2 p-4 border rounded shadow shadow-cyan-100 cursor-pointer dark:bg-slate-200 dark:text-gray-800">

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



</template>