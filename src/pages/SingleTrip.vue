<script>
import { useTripsStore } from '../stores/store';
import axios from '../axios';
import { DateTime } from 'luxon';
import UpdateTripModal from '../components/UpdateTripModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import AddNewPlaceModal from '../components/AddNewPlaceModal.vue'
import TokenExpiredModal from '../components/TokenExpiredModal.vue';

export default {
    components: {
        UpdateTripModal,
        ConfirmDeleteModal,
        AddNewPlaceModal,
        TokenExpiredModal
    },
    data() {
        return {
            store: useTripsStore(),
            trip: null,
            days: [],
            addNewDay: false,
            newDayDate: '',
            isEditDayOpen: false,
            dayData: {
                date: '',
                notes: '',
                id: null,
            },
            isActionsOpen: false,
            modals: {
                addNewPlace: false,
                isUpdateOpen: false,
                isDeleteTripOpen: false,
                isDeleteDayOpen: false
            },
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
        formatLongDate(date) {
            // => dd month (ex. 30 agosto)
            return DateTime.fromISO(date).setLocale('it').toLocaleString({ month: 'long', day: 'numeric' });
        },
        formatShortDate(date) {
            // => dd/MM (ex. 30/08)
            return DateTime.fromISO(date).toFormat('dd/LL');;
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
                console.log('update', response);

                // handle success
                this.successMessage = 'Viaggio aggiornato con successo!';
                this.error = null;
                this.modals.isUpdateOpen = false;
            } catch (error) {
                this.error = 'Errore durante l\'aggiornamento del viaggio.';
                this.successMessage = null;
                console.error('Errore durante l\'aggiornamento del viaggio:', error);
            }
        },
        handleUpdateTrip(updatedTrip) {
            // Update the trip data with the updated trip
            this.trip = updatedTrip;
            this.updateTrip();
        },
        async deleteTrip() {
            try {
                // send a delete request to delete the trip
                const response = await axios.delete(`${this.store.baseURL}/trips/${this.trip.id}`);

                if (response.status === 204) {
                    // redirect to trips list
                    this.$router.push('/viaggi');
                    this.modals.isDeleteTripOpen = false;
                } else {
                    console.error('Errore durante l\'eliminazione del viaggio:', response.status);
                }
            } catch (error) {
                console.error('Errore durante l\'eliminazione del viaggio:', error);
            }
        },
        async confirmAddDay() {
            try {
                // get trip id
                const tripId = this.$route.params.id;

                // check if a date has been selected
                if (!this.newDayDate) {
                    alert('Seleziona una data per il nuovo giorno.');
                    return;
                }

                // prepare data to be sent
                const newDay = {
                    date: this.newDayDate,
                    notes: '',
                };

                // send a POST request to add a new day
                const response = await axios.post(`${this.store.baseURL}/trips/${tripId}/days`, newDay);
                console.log('Nuovo giorno aggiunto:', response);

                // handle the response
                if (response.status === 200) {
                    this.successMessage = 'Giorno aggiunto con successo!';
                    this.error = null;
                    this.addNewDay = false;  // close the new day form

                    // refresh the list of days
                    this.getDays();
                } else {
                    console.error('Errore durante l\'aggiunta del giorno:', response.status);
                }
            } catch (error) {
                this.error = 'Errore durante l\'aggiunta del giorno.';
                this.successMessage = null;
                console.error('Errore durante l\'aggiunta del giorno:', error);
            }
        },
        async getDays() {
            try {
                // get trip id
                const tripId = this.$route.params.id;

                // send a GET request to fetch days
                const response = await axios.get(`${this.store.baseURL}/trips/${tripId}/days`);
                console.log('Giorni:', response.data);

                // update days array with the fetched data
                this.days = response.data.results;
            } catch (error) {
                this.error = 'Errore nel recupero dei giorni.';
                console.error('Errore nel recupero dei giorni:', error);
            }
        },
        async updateDay() {
            try {
                const tripId = this.$route.params.id;

                const updatedData = {
                    date: DateTime.fromISO(this.dayData.date).toISODate(),
                    notes: this.dayData.notes,
                    id: this.dayData.id
                };

                const response = await axios.put(
                    `${this.store.baseURL}/trips/${tripId}/days/${updatedData.id}`,
                    updatedData
                );

                if (response.status === 200) {
                    console.log('Giorno modificato con successo');
                    this.isEditDayOpen = false;
                    this.dayData.id = null;
                    this.dayData.date = '';
                    // refresh the list of days
                    this.getDays();
                } else {
                    console.error('Errore nella modifica del giorno:', response.status);
                }
            } catch (error) {
                console.error('Errore nella modifica del giorno:', error);
            }
        },
        async deleteDay() {
            try {
                const tripId = this.$route.params.id;

                const dayId = this.dayData.id;

                const response = await axios.delete(
                    `${this.store.baseURL}/trips/${tripId}/days/${dayId}`
                );

                // handle response
                if (response.status === 204) {
                    console.log('Giorno eliminato con successo');
                    this.modals.isDeleteDayOpen = false;
                    this.dayData.id = null;
                    this.dayData.date = '';
                    this.dayData.notes = '';

                    this.getDays();
                } else {
                    console.error('Errore nella eliminazione del giorno:', response.status);
                }
            } catch (error) {
                console.error('Errore nella eliminazione del giorno:', error.response ? error.response.data : error.message);
            }
        },
        addNewPlace(newPlace) {
            // add new place - to be added later
        },
    },
    mounted() {
        this.getTrip();
        this.getDays();
    },
    computed: {
        initialTrips() {
            return this.store.initialTrips;
        },
        sortedDays() {
            return this.days.sort((a, b) => {
                return DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis();
            });
        },
    }
}
</script>

<template>
    <!-- back to previous page  -->
    <div :class="[Object.values(modals).some(flag => flag) ? 'pointer-events-none' : '']"
        class=" m-3 px-2 py-1 absolute top-16 z-10 rounded bg-white/70 dark:bg-gray-900/70 hover:bg-white dark:hover:bg-gray-900 dark:text-white"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')" role="button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Indietro
    </div>

    <!-- loading or error/success display -->
    <p v-if="loading" class="py-6 text-center">Caricamento...</p>
    <p v-if="error" class="py-6 text-center">{{ error }}</p>
    <div v-if="successMessage" class="p-2 bg-green-200/70 rounded flex gap-3 absolute top-20 right-60 z-10">
        <p>{{ successMessage }}</p>
        <font-awesome-icon :icon="['fas', 'xmark']" @click="successMessage = null" class="cursor-pointerå" />
    </div>

    <template v-if="!loading && !error && trip">
        <!-- trip general info  -->
        <div class="relative dark:text-white">

            <!-- actions - edit + delete  -->
            <div v-if="!loading && !error && trip">
                <!-- btn  -->
                <div @click="modals.isActionsOpen = !modals.isActionsOpen"
                    :class="[Object.values(modals).some(flag => flag) ? 'pointer-events-none' : '']"
                    class=" m-3 px-3 py-1 absolute top-0 right-0 z-10 rounded bg-white/70 dark:bg-gray-900/70 hover:bg-white dark:hover:bg-gray-900 dark:text-white cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </div>

                <div :class="[modals.isActionsOpen ? 'flex' : 'hidden']"
                    class="m-3 absolute top-8 right-0 z-10 flex-col rounded bg-white dark:bg-gray-900 dark:text-white cursor-pointer">

                    <!-- edit  -->
                    <span @click="modals.isUpdateOpen = !modals.isUpdateOpen; modals.isActionsOpen = false"
                        class="ps-4 pe-10 py-2 hover:bg-cyan-600/80 dark:hover:bg-cyan-600/70">
                        Modifica
                    </span>
                    <!-- delete  -->
                    <span @click="modals.isDeleteTripOpen = !modals.isDeleteTripOpen; modals.isActionsOpen = false"
                        class="ps-4 pe-10 py-2 hover:bg-cyan-600/80 dark:hover:bg-cyan-500/70">Elimina</span>
                </div>
            </div>

            <img class="w-full h-auto max-h-80 object-cover" src="../../public/map.jpg" alt="default image">
            <div
                class="absolute bottom-2 start-0 end-0 border dark:border-neutral-700 rounded-xl m-6 bg-white/90 dark:bg-gray-900 dark:text-white">
                <div class="p-4 md:p-5">
                    <h3 class="text-3xl font-bold text-cyan-600 dark:text-cyan-500">
                        {{ trip.title }}
                    </h3>
                    <div class="mt-1">
                        <span class="font-semibold ps-2">Date: </span>
                        {{ formatLongDate(trip.start_date) }}
                        <span v-if="getYear(trip.start_date) != getYear(trip.end_date)">
                            {{ getYear(trip.start_date) }}
                        </span>
                        - {{ formatLongDate(trip.end_date) }}
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
                <button @click="addNewDay = !addNewDay"
                    :class="[Object.values(modals).some(flag => flag) ? 'pointer-events-none' : '']"
                    class="px-2 mb-1 text-white bg-cyan-600 rounded">
                    Nuovo giorno <font-awesome-icon :icon="['fas', 'plus']" />
                </button>

                <!-- date picker  -->
                <div v-if="addNewDay"
                    class="my-2 p-4 absolute top-12 right-0 flex flex-col justify-end items-center gap-3 bg-white">
                    <input type="date" v-model="newDayDate"
                        class="p-2 bg-gray-300 dark:text-gray-800 rounded focus:outline-cyan-600 focus:ring-0" />
                    <button @click="confirmAddDay"
                        class="ml-2 px-2 py-1 text-white bg-cyan-600 rounded">Conferma</button>
                </div>
            </div>

            <!-- days  -->
            <div v-if="days.length">
                <ul v-for="day in sortedDays" :key="day.id">
                    <li class="py-2 border-b">
                        <div class="my-3 flex justify-between">
                            <div class="w-fit p-2 rounded bg-gray-200 dark:text-gray-800">
                                {{ formatShortDate(day.date) }}
                            </div>

                            <!-- day actions  -->
                            <div class="flex gap-3">
                                <span class="sr-only">Modifica giorno</span>
                                <font-awesome-icon :icon="['fas', 'pencil']"
                                    @click="dayData.id = day.id; dayData.date = day.date; isEditDayOpen = !isEditDayOpen"
                                    class="p-2 border border-gray-200 hover:bg-gray-200 rounded cursor-pointer" />

                                <span class="sr-only">Elimina giorno</span>
                                <font-awesome-icon :icon="['fas', 'trash']"
                                    @click="dayData.id = day.id; dayData.date = day.date; modals.isDeleteDayOpen = !modals.isDeleteDayOpen"
                                    class="p-2 border border-gray-200 hover:bg-gray-200 rounded cursor-pointer" />
                            </div>
                        </div>

                        <!-- notes  -->
                        <div v-if="day.notes" class="ms-2">
                            <span class="pt-3 font-semibold">Note</span>
                            <p>{{ day.notes }}</p>
                        </div>
                        <p v-else class="text-gray-500 dark:text-gray-300">Nessuna nota aggiunta.</p>

                        <!-- place actions -->
                        <div class="flex gap-3 mt-2"
                            :class="[Object.values(modals).some(flag => flag) ? 'pointer-events-none' : '']">
                            <span @click="modals.addNewPlace = !modals.addNewPlace"
                                class="py-1 px-2 border rounded hover:bg-gray-100 dark:hover:text-gray-800 cursor-pointer">
                                Aggiungi nuova tappa
                            </span>
                            <span
                                class="py-1 px-2 border rounded hover:bg-gray-100 dark:hover:text-gray-800 cursor-pointer">
                                Note
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <p v-else class="mt-3 text-gray-500 dark:text-gray-300">
                Itinerario vuoto. Inserisci una nuova data per cominciare a progettare il tuo viaggio.
            </p>

        </div>
    </template>

    <!-- update trip modal  -->
    <UpdateTripModal v-if="modals.isUpdateOpen" :trip="trip" :isOpen="modals.isUpdateOpen"
        @closeModal="modals.isUpdateOpen = false" @update="handleUpdateTrip" />

    <!-- delete trip modal  -->
    <ConfirmDeleteModal v-if="modals.isDeleteTripOpen" :isOpen="modals.isDeleteTripOpen" :deleteItem="`'${trip.title}'`"
        :type="'viaggio'" @close="modals.isDeleteTripOpen = false" @delete="deleteTrip" />

    <!-- edit day modal  -->
    <div v-if="isEditDayOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
        role="dialog" tabindex="-1">
        <form @submit.prevent="updateDay"
            class="mt-20 w-2/3 max-w-screen-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div class="flex justify-between items-center py-3 px-4">
                <h3 class="font-bold text-lg text-gray-800 dark:text-white">
                    Modifica giorno
                </h3>
                <button type="button" @click="isEditDayOpen = false"
                    class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600">
                    <span class="sr-only">Close</span>
                    <font-awesome-icon :icon="['fas', 'xmark']" class="shrink-0 size-4" />
                </button>
            </div>

            <div class="px-4 py-2 m-2 flex flex-col items-start  text-gray-800 dark:text-neutral-400">
                <div class="mb-2">
                    <span class="font-semibold">Data: </span>
                    <input type="date" name="date" v-model="dayData.date"
                        class="px-2 py-1 bg-gray-200 dark:text-gray-800 rounded focus:outline-cyan-600 focus:ring-0" />
                </div>

                <label for="notes" class="font-semibold text-gray-900 dark:text-gray-400">Note</label>
                <textarea v-model="dayData.notes"
                    class="mt-2 px-2 pt-2 w-full text-sm dark:text-white bg-transparent border-2 rounded border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                    rows="5" id="description" name="description" placeholder="Aggiungi una nota..."></textarea>
            </div>

            <div class="pb-4 px-4 flex justify-center items-center gap-x-2">
                <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700">
                    Modifica
                </button>
            </div>
        </form>
    </div>

    <!-- delete day modal  -->
    <ConfirmDeleteModal v-if="modals.isDeleteDayOpen" :isOpen="modals.isDeleteDayOpen"
        :deleteItem="`il giorno ${formatShortDate(dayData.date)}/${getYear(dayData.date)}`" :type="'giorno'"
        @close="modals.isDeleteDayOpen = false" @delete="deleteDay" />

    <!-- add new place modal  -->
    <AddNewPlaceModal v-if="modals.addNewPlace" :isOpen="modals.addNewPlace" @close="modals.addNewPlace = false"
        @add="addNewPlace" />

    <TokenExpiredModal />

</template>