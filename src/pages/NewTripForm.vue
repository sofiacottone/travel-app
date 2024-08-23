<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        hasHistory() {
            return window.history.length > 2
        },
    },
}
</script>

<template>
    <div class="mx-3 mt-2 px-2 py-1 w-fit rounded border border-gray-200 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:text-gray-900"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')" role="button">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Indietro
    </div>

    <div class="px-6">
        <h1 class="text-2xl font-bold py-4">
            Aggiungi un nuovo viaggio
        </h1>
        <p>Crea un itinerario e inizia a pianificare il tuo prossimo viaggio</p>
    </div>

    <form class="my-8 px-6">
        <div class="my-4">
            <label for="title" class="text-gray-900 dark:text-gray-400">Titolo</label>
            <input type="text" id="title"
                class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                placeholder="Inserisci il titolo del tuo prossimo viaggio. (es: Viaggio a Parigi)" />
        </div>

        <div class="my-4">
            <label for="location" class="text-gray-900 dark:text-gray-400">Destinazione</label>
            <input type="text" id="location"
                class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none"
                placeholder="Inserisci la destinazione del tuo prossimo viaggio..." />
        </div>

        <div class="my-4">
            <label for="start-date" class="text-gray-900 dark:text-gray-400">Data di partenza</label>
            <input type="date" id="start-date"
                class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
        </div>

        <div class="my-4">
            <label for="start-date" class="text-gray-900 dark:text-gray-400">Data di ritorno</label>
            <input type="date" id="start-date"
                class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
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
</template>