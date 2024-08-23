<script>
import { useTripsStore } from '../stores/store';

export default {
    data() {
        return {
            store: useTripsStore(),
            addNewDay: false,
            addNewPlace: false,
        }
    },
    methods: {
        hasHistory() {
            return window.history.length > 2
        },
    },
    computed: {
        initialTrips() {
            return this.store.initialTrips;
        }
    }
}
</script>

<template>
    <div class=" m-3 px-2 py-1 absolute top-16 z-10 rounded bg-white/70 dark:bg-gray-900/70 hover:bg-white dark:hover:bg-gray-900 dark:text-white"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')" role="button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Indietro
    </div>

    <div class="relative dark:text-white">
        <img class="w-full h-auto max-h-80 object-cover" :src="initialTrips[0].img" alt="Card Image">
        <div
            class="absolute bottom-2 start-0 end-0 border dark:border-neutral-700 rounded-xl m-6 bg-white/90 dark:bg-gray-900 dark:text-white">
            <div class="p-4 md:p-5">
                <h3 class="text-3xl font-bold text-cyan-600 dark:text-cyan-500">
                    {{ initialTrips[0].title }}
                </h3>
                <div class="mt-1">
                    <span class="font-semibold ps-2">Date: </span>
                    {{ initialTrips[0].from }} - {{ initialTrips[0].to }} {{ initialTrips[0].year }}
                </div>

            </div>
        </div>
    </div>

    <div class="text-gray-900 dark:text-white bg-white dark:bg-gray-900 px-6 py-2">

        <!-- overview  -->
        <h3 class="text-lg text-cyan-600 dark:text-cyan-500 font-semibold border-b pb-1">Panoramica</h3>

        <!-- destination  -->
        <div class="flex items-center gap-2 mt-5">
            <h5 class="font-semibold text-gray-800 dark:text-white">
                Località:
            </h5>
            <span>Parigi, Francia</span>
        </div>

        <!-- description  -->
        <h5 class="mt-5 font-semibold text-gray-800 dark:text-white">
            Descrizione
        </h5>

        <!-- itinerary  -->
        <div class="relative flex justify-between border-b">
            <h3 class="text-lg text-cyan-600 dark:text-cyan-500 font-semibold pb-1 mt-5">Itinerario</h3>

            <!-- add new day  -->
            <button @click="addNewDay = !addNewDay" class="px-2 mb-1 text-white bg-cyan-600 rounded">
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
        <div class="flex gap-3 mt-2">
            <span @click="addNewPlace = !addNewPlace"
                class="py-1 px-2 border rounded hover:bg-gray-100 dark:hover:text-gray-800 cursor-pointer">
                Aggiungi nuova tappa
            </span>
            <span class="py-1 px-2 border rounded hover:bg-gray-100 dark:hover:text-gray-800 cursor-pointer">Note</span>
        </div>
    </div>

    <!-- add new place modal  -->
    <div :class="[addNewPlace ? 'fixed' : 'hidden']"
        class="px-2 py-3 w-11/12 max-w-screen-lg max-h-full m-auto overflow-y-auto fixed top-20 right-0 left-0 z-50 rounded-xl bg-slate-50 dark:bg-gray-900 dark:text-white border border-cyan-500/70">
        <div class="flex justify-between items-center ms-6 me-4">
            <h3 class="text-xl underline">Aggiungi nuova tappa</h3>
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