<script>
export default {
    props: {
        trip: Object,  // receive trip data as prop
        isOpen: Boolean, // control visibility of the modal
    },
    data() {
        return {
            tripData: { ...this.trip },  // create a copy of the trip data for editing
        };
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        updateTrip() {
            // emit the updated trip data to the parent component
            this.$emit('update', this.tripData);
            // close modal after update
            this.closeModal();
        },
    },
};
</script>

<template>
    <div
        class="px-2 py-3 w-11/12 max-w-screen-lg max-h-full m-auto overflow-y-auto fixed top-20 right-0 left-0 z-50 rounded-xl bg-slate-50 dark:bg-gray-900 dark:text-white border border-cyan-500/70">
        <div class="flex justify-between items-center ms-6 me-4">
            <h3 class="text-xl underline">Modifica informazioni viaggio</h3>

            <span class="sr-only">Chiudi</span>
            <font-awesome-icon :icon="['fas', 'xmark']" @click="closeModal"
                class="my-1 px-2 py-1 border rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:text-gray-900" />
        </div>

        <form @submit.prevent="updateTrip" class="my-8 px-6">

            <!-- title  -->
            <div class="my-4">
                <label for="title" class="text-gray-900 dark:text-gray-400">Titolo</label>
                <input type="text" id="title" v-model="tripData.title"
                    class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
            </div>

            <div class="my-4">
                <label for="location" class="text-gray-900 dark:text-gray-400">Destinazione</label>
                <input type="text" id="location" v-model="tripData.location"
                    class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                    placeholder="Inserisci la destinazione del tuo prossimo viaggio..." />
            </div>

            <div class="my-4">
                <label for="start-date" class="text-gray-900 dark:text-gray-400">Data di partenza</label>
                <input type="date" id="start-date" v-model="tripData.start_date"
                    class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
            </div>

            <div class="my-4">
                <label for="end-date" class="text-gray-900 dark:text-gray-400">Data di ritorno</label>
                <input type="date" id="end-date" v-model="tripData.end_date"
                    class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
            </div>

            <!-- add new trip  -->
            <div class="flex justify-center items-center my-4">
                <button type="submit" class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">
                    Modifica
                </button>
            </div>

        </form>
    </div>
</template>