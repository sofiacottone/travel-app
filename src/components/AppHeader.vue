<script>
export default {
    data() {
        return {
            navLinks: [
                {
                    label: 'Home',
                    routeName: 'home'
                },
                {
                    label: 'I miei viaggi',
                    routeName: 'trips'
                },
                {
                    label: 'Profilo',
                    routeName: 'profile'
                },
            ],
            isOpen: false,
        }
    },
    mounted() {
        
    }
}
</script>
<template>
    <header>
        <nav class="bg-gray-50 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <!-- logo  -->
                <router-link :to="{name: 'home'}" class="flex items-center space-x-3">
                    <img src="../../public/favicon.ico" class="h-8" alt="Travel Journal Logo">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Travel Journal</span>
                </router-link>

                <!-- hamburger menu  -->
                <div  class="flex">
                    <button @click="isOpen = !isOpen" data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <font-awesome-icon :icon="['fas', 'bars']" class="w-5 h-5" />
                    </button>
                </div>

                <!-- navbar links  -->
                <div :class="[isOpen ? 'block' : 'hidden']" class="items-center justify-between w-full md:flex md:w-auto" id="navbar-sticky">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li v-for="link in navLinks">
                            <router-link class="block py-2 px-3 rounded cursor-pointer text-gray-900 dark:text-white hover:text-cyan-600 md:p-0 dark:hover:text-cyan-500 dark:hover:bg-gray-700 hover:bg-gray-200 md:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700" activeClass="text-cyan-600 dark:text-cyan-500" aria-current="page"
                                :to="{ name: link.routeName }" @click="isOpen = false">
                                {{ link.label }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>