<script>
export default {
    props: {
        isOpen: Boolean, // control visibility of the modal
    },
    data() {
        return {
            placeName: '',
            description: '',
            isVisited: false,
            photos: null,
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleFileUpload(event) {
            // handle file upload 
            // by accessing selected files
            // and saving them in a variable
            this.photos = event.target.files;
        },
        addPlace() {
            const newPlace = {
                name: this.placeName,
                description: this.description,
                isVisited: this.isVisited,
                photos: this.photos,
            };
            // emit an event to add new place
            this.$emit('add', newPlace);
            this.closeModal();
        },
    },
};
</script>

<template>
    <div
        class="px-2 py-3 w-11/12 max-w-screen-lg max-h-full m-auto overflow-y-auto fixed top-20 right-0 left-0 z-50 rounded-xl bg-slate-50 dark:bg-gray-900 dark:text-white border border-cyan-500/70">
        <div class="flex justify-between items-center ms-6 me-4">
            <h3 class="text-xl underline">Aggiungi nuova tappa</h3>
            <span class="sr-only">Chiudi</span>
            <font-awesome-icon :icon="['fas', 'xmark']" @click="closeModal"
                class="my-1 px-2 py-1 border rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:text-gray-900" />
        </div>

        <form class="my-8 px-6" @submit.prevent="addPlace">
            <!-- name -->
            <div class="my-4">
                <label for="name" class="text-gray-900 dark:text-gray-400">Nome</label>
                <input type="text" id="name" name="name" v-model="placeName"
                    class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                    placeholder="Inserisci il nome della tappa. (es: Tour Eiffel)" />
            </div>

            <!-- photos -->
            <div class="my-4 flex flex-col gap-2">
                <label for="photo-url" class="text-gray-900 dark:text-gray-400">Aggiungi le tue foto</label>
                <input type="file" id="photo-url" name="url" @change="handleFileUpload">
            </div>

            <!-- description -->
            <div class="my-4">
                <label for="description" class="text-gray-900 dark:text-gray-400">Descrizione (opzionale)</label>
                <textarea v-model="description"
                    class="mt-2 px-2 pt-2 w-full text-sm dark:text-white bg-transparent border-2 rounded border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                    rows="5" id="description" name="description"
                    placeholder="Scrivi qualcosa su questa tappa..."></textarea>
            </div>

            <!-- isVisited -->
            <div class="my-4 flex items-center gap-2">
                <label for="is-visited" class="text-gray-900 dark:text-gray-400">Già visitata?</label>
                <input type="checkbox" id="is-visited" name="is_visited" v-model="isVisited"
                    class="focus:ring-cyan-500 checked:bg-cyan-600" />
            </div>

            <!-- add new place btn -->
            <div class="flex justify-center items-center my-4">
                <button type="submit" class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">
                    Aggiungi
                </button>
            </div>
        </form>
    </div>
</template>