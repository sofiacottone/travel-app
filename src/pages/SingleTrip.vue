<script>
import { useTripsStore } from '../stores/store';
import axios from '../axios';
import { DateTime } from 'luxon';
export default {
    data() {
        return {
            store: useTripsStore(),
            addNewDay: false,
            addNewPlace: false,
            isUpdateOpen: false,
            isActionsOpen: false,
            isDeleteOpen: false,
            trip: null,
            error: null,
            successMessage: null,
            loading: false,
        }
    },
    methods: {
        hasHistory() {
            return window.history.length > 2
        },
        async getTrip() {
            this.loading = true;
            this.error = null;
            try {
                const tripId = this.$route.params.id;
                await axios.get(`${this.store.baseURL}/trips/${tripId}`)
                    .then((response) => {
                        console.log(response.data);

                        this.trip = response.data.results;
                    })
            } catch (error) {
                this.error = 'Errore nel recupero dei dettagli del viaggio.';
                console.error('Errore nel recupero del viaggio:', error);
            } finally {
                this.loading = false;
            }
        },
        formatDate(date) {
            // => 30 ago
            return DateTime.fromISO(date).setLocale('it').toLocaleString({ month: 'long', day: 'numeric' });
        },
        getYear(date) {
            // => 2024
            return date.substr(0, 4);
        },
        async updateTrip() {
            try {
                // send a PUT request to update the trip
                const tripId = this.$route.params.id;
                const response = await axios.put(`${this.store.baseURL}/trips/${tripId}`, this.trip);

                // handle success
                this.successMessage = 'Viaggio aggiornato con successo!';
                this.error = null;
                this.isUpdateOpen = false;
            } catch (error) {
                this.error = 'Errore durante l\'aggiornamento del viaggio.';
                this.successMessage = null;
                console.error('Errore durante l\'aggiornamento del viaggio:', error);
            }
        },
        async deleteTrip() {
            try {
                // send a delete request to delete the trip
                const response = await axios.delete(`${this.store.baseURL}/trips/${this.trip.id}`);

                if (response.status === 204) {
                    // redirect to trips list
                    this.$router.push('/viaggi');
                    this.isDeleteOpen = false;
                } else {
                    console.error('Errore durante l\'eliminazione del viaggio:', response.status);
                }
            } catch (error) {
                console.error('Errore durante l\'eliminazione del viaggio:', error);
            }
        },
    },
    mounted() {
        this.getTrip();
    },
    computed: {
        initialTrips() {
            return this.store.initialTrips;
        }
    }
}
</script>

<template>
    <!-- back to previous page  -->
    <div :class="[isDeleteOpen ? 'pointer-events-none' : '']"
        class=" m-3 px-2 py-1 absolute top-16 z-10 rounded bg-white/70 dark:bg-gray-900/70 hover:bg-white dark:hover:bg-gray-900 dark:text-white"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')" role="button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Indietro
    </div>

    <!-- actions - edit + delete  -->
    <div v-if="!loading && !error && trip" :class="[isDeleteOpen ? 'pointer-events-none' : '']">
        <!-- btn  -->
        <div @click="isActionsOpen = !isActionsOpen"
            class=" m-3 px-3 py-1 absolute top-16 right-0 z-10 rounded bg-white/70 dark:bg-gray-900/70 hover:bg-white dark:hover:bg-gray-900 dark:text-white cursor-pointer">
            <font-awesome-icon :icon="['fas', 'bars']" />
        </div>

        <div :class="[isActionsOpen ? 'flex' : 'hidden']"
            class="m-3 absolute top-24 right-0 z-10 flex-col rounded bg-white dark:bg-gray-900 dark:text-white cursor-pointer">

            <!-- edit  -->
            <span @click="isUpdateOpen = !isUpdateOpen; isActionsOpen = false"
                class="ps-4 pe-10 py-2 hover:bg-cyan-600/80 dark:hover:bg-cyan-600/70">
                Modifica
            </span>
            <!-- delete  -->
            <span @click="isDeleteOpen = !isDeleteOpen; isActionsOpen = false"
                class="ps-4 pe-10 py-2 hover:bg-cyan-600/80 dark:hover:bg-cyan-500/70">Elimina</span>
        </div>
    </div>

    <!-- loading or error display -->
    <p v-if="loading" class="py-6 text-center">Caricamento...</p>
    <p v-if="error" class="py-6 text-center">{{ error }}</p>
    <div v-if="successMessage" class="p-2 bg-green-200/70 rounded flex gap-3 absolute top-20 right-60 z-10">
        <p>{{ successMessage }}</p>
        <font-awesome-icon :icon="['fas', 'xmark']" @click="successMessage = null" class="cursor-pointerå" />
    </div>

    <template v-if="!loading && !error && trip">
        <!-- trip general info  -->
        <div class="relative dark:text-white">
            <img class="w-full h-auto max-h-80 object-cover" src="../../public/map.jpg" alt="default image">
            <div
                class="absolute bottom-2 start-0 end-0 border dark:border-neutral-700 rounded-xl m-6 bg-white/90 dark:bg-gray-900 dark:text-white">
                <div class="p-4 md:p-5">
                    <h3 class="text-3xl font-bold text-cyan-600 dark:text-cyan-500">
                        {{ trip.title }}
                    </h3>
                    <div class="mt-1">
                        <span class="font-semibold ps-2">Date: </span>
                        {{ formatDate(trip.start_date) }}
                        <span v-if="getYear(trip.start_date) != getYear(trip.end_date)">
                            {{ getYear(trip.start_date) }}
                        </span>
                        - {{ formatDate(trip.end_date) }}
                        {{ getYear(trip.end_date) }}
                    </div>

                </div>
            </div>
        </div>

        <!-- trip details  -->
        <div class="text-gray-900 dark:text-white px-6 py-2">

            <!-- overview  -->
            <h3 class="text-lg text-cyan-600 dark:text-cyan-500 font-semibold border-b pb-1">Panoramica</h3>

            <!-- destination  -->
            <div class="flex items-center gap-2 mt-5">
                <h5 class="font-semibold text-gray-800 dark:text-white">
                    Località:
                </h5>
                <span>{{ trip.location }}</span>
            </div>

            <!-- description  -->
            <template v-if="trip.description">
                <h5 class="mt-5 font-semibold text-gray-800 dark:text-white">
                    Descrizione
                </h5>
                <p>{{ trip.description }}</p>
            </template>

            <!-- itinerary  -->
            <div class="relative flex justify-between border-b">
                <h3 class="text-lg text-cyan-600 dark:text-cyan-500 font-semibold pb-1 mt-5">Itinerario</h3>

                <!-- add new day  -->
                <button @click="addNewDay = !addNewDay" :class="[isDeleteOpen ? 'pointer-events-none' : '']"
                    class="px-2 mb-1 text-white bg-cyan-600 rounded">
                    Nuovo giorno <font-awesome-icon :icon="['fas', 'plus']" />
                </button>

                <!-- date picker  -->
                <div v-if="addNewDay" class="absolute top-12 right-0 flex justify-end my-2">
                    <input type="date" class="bg-gray-300 dark:text-gray-800 p-2 rounded" />
                </div>
            </div>

            <p class="mt-3 text-gray-500 dark:text-gray-300">
                Itinerario vuoto. Inserisci una nuova data per cominciare a progettare il tuo viaggio.
            </p>

            <div class="w-fit mt-3 p-2 rounded bg-gray-200 dark:text-gray-800">
                02/08
            </div>
            <div class="flex gap-3 mt-2" :class="[isDeleteOpen ? 'pointer-events-none' : '']">
                <span @click="addNewPlace = !addNewPlace"
                    class="py-1 px-2 border rounded hover:bg-gray-100 dark:hover:text-gray-800 cursor-pointer">
                    Aggiungi nuova tappa
                </span>
                <span
                    class="py-1 px-2 border rounded hover:bg-gray-100 dark:hover:text-gray-800 cursor-pointer">Note</span>
            </div>
        </div>


        <!-- update trip modal  -->
        <div :class="[isUpdateOpen ? 'fixed' : 'hidden']"
            class="px-2 py-3 w-11/12 max-w-screen-lg max-h-full m-auto overflow-y-auto fixed top-20 right-0 left-0 z-50 rounded-xl bg-slate-50 dark:bg-gray-900 dark:text-white border border-cyan-500/70">
            <div class="flex justify-between items-center ms-6 me-4">
                <h3 class="text-xl underline">Modifica informazioni viaggio</h3>

                <span class="sr-only">Chiudi</span>
                <font-awesome-icon :icon="['fas', 'xmark']" @click="isUpdateOpen = false"
                    class="my-1 px-2 py-1 border rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:text-gray-900" />
            </div>

            <form @submit.prevent="updateTrip" class="my-8 px-6">

                <!-- title  -->
                <div class="my-4">
                    <label for="title" class="text-gray-900 dark:text-gray-400">Titolo</label>
                    <input type="text" id="title" v-model="trip.title"
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>

                <div class="my-4">
                    <label for="location" class="text-gray-900 dark:text-gray-400">Destinazione</label>
                    <input type="text" id="location" v-model="trip.location"
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                        placeholder="Inserisci la destinazione del tuo prossimo viaggio..." />
                </div>

                <div class="my-4">
                    <label for="start-date" class="text-gray-900 dark:text-gray-400">Data di partenza</label>
                    <input type="date" id="start-date" v-model="trip.start_date"
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>

                <div class="my-4">
                    <label for="end-date" class="text-gray-900 dark:text-gray-400">Data di ritorno</label>
                    <input type="date" id="end-date" v-model="trip.end_date"
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>

                <!-- add new trip  -->
                <div class="flex justify-center items-center my-4">
                    <button type="submit"
                        class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">
                        Modifica
                    </button>
                </div>

            </form>
        </div>

        <!-- delete trip modal  -->
        <div :class="[isDeleteOpen ? 'block' : 'hidden']"
            class="size-full fixed top-0 start-0 z-10 overflow-x-hidden overflow-y-auto pointer-events-none"
            role="dialog" tabindex="-1">
            <div class="mt-20 m-3 opacity-1 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto">
                <div
                    class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        <h3 class="font-bold text-gray-800 dark:text-white">
                            Cancella viaggio
                        </h3>
                        <button type="button"
                            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600">
                            <span class="sr-only">Close</span>
                            <font-awesome-icon :icon="['fas', 'xmark']" @click="isDeleteOpen = false"
                                class="shrink-0 size-4" />
                        </button>
                    </div>
                    <div class="p-4 overflow-y-auto">
                        <p class="mt-1 text-gray-800 dark:text-neutral-400">
                            Sei sicuro di voler eliminare definitivamente "{{ trip.title }}"?
                        </p>
                    </div>
                    <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                        <button type="button" @click="isDeleteOpen = false"
                            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                            Chiudi
                        </button>
                        <button type="button" @click="deleteTrip"
                            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
                            Elimina
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- add new place modal  -->
        <div :class="[addNewPlace ? 'fixed' : 'hidden']"
            class="px-2 py-3 w-11/12 max-w-screen-lg max-h-full m-auto overflow-y-auto fixed top-20 right-0 left-0 z-50 rounded-xl bg-slate-50 dark:bg-gray-900 dark:text-white border border-cyan-500/70">
            <div class="flex justify-between items-center ms-6 me-4">
                <h3 class="text-xl underline">Aggiungi nuova tappa</h3>

                <span class="sr-only">Chiudi</span>
                <font-awesome-icon :icon="['fas', 'xmark']" @click="addNewPlace = false"
                    class="my-1 px-2 py-1 border rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:text-gray-900" />
            </div>

            <form class="my-8 px-6">

                <!-- !TODO insert search field to find place coordinates to be shown in a map later -->
                <!-- name  -->
                <div class="my-4">
                    <label for="name" class="text-gray-900 dark:text-gray-400">Nome</label>
                    <input type="text" id="name"
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                        placeholder="Inserisci il nome della tappa. (es: Tour Eiffel)" />
                </div>

                <!-- photos  -->
                <div class="my-4 flex flex-col gap-2">
                    <label for="photo-url" class="text-gray-900 dark:text-gray-400">Aggiungi le tue foto</label>
                    <input type="file" id="photo-url">
                </div>

                <!-- description  -->
                <div class="my-4">
                    <label for="description" class="text-gray-900 dark:text-gray-400">Descrizione (opzionale)</label>
                    <textarea
                        class="mt-2 px-2 pt-2 w-full text-sm dark:text-white bg-transparent border-2 rounded border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                        rows="5" id="description" placeholder="Scrivi qualcosa su questa tappa...">
            </textarea>
                </div>

                <!-- isVisited  -->
                <div class="my-4 flex items-center gap-2">
                    <label for="is-visited" class="text-gray-900 dark:text-gray-400">Già visitata?</label>
                    <input type="checkbox" id="is-visited" class="focus:ring-cyan-500 checked:bg-cyan-600" />
                </div>


                <!-- add new trip  -->
                <div class="flex justify-center items-center my-4">
                    <button class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">
                        <router-link :to="{ name: 'new-trip' }">
                            Aggiungi
                        </router-link>
                    </button>
                </div>

            </form>
        </div>
    </template>

</template>