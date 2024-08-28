<script>
export default {
    props: {
        isOpen: Boolean,  // control visibility of the modal
        deleteItem: String, // name of the item to be deleted
        type: String
    },
    methods: {
        closeModal() {
            this.$emit('close'); // emit an event to close the modal
        },
        deleteTrip() {
            this.$emit('delete'); // emit an event to trigger trip deletion
        }
    }
};
</script>

<template>
    <!-- delete trip modal  -->
    <div :class="[isOpen ? 'block' : 'hidden']"
        class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75" role="dialog" tabindex="-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3 class="font-bold text-gray-800 dark:text-white">
                    Cancella {{ type }}
                </h3>
                <button type="button" @click="closeModal"
                    class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600">
                    <span class="sr-only">Chiudi</span>
                    <font-awesome-icon :icon="['fas', 'xmark']" class="shrink-0 size-4" />
                </button>
            </div>
            <div class="p-4 overflow-y-auto">
                <p class="m-2 text-gray-800 dark:text-neutral-400">
                    Sei sicuro di voler eliminare definitivamente {{ deleteItem }}?
                </p>
            </div>
            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button type="button" @click="closeModal"
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
</template>