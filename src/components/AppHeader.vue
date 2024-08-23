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
            isDark: false,
        }
    },
    methods: {
        toggleDarkMode() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                this.isDark = false;
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                this.isDark = true;
            }
        },
    },
    mounted() {

    }
}
</script>
<template>
    <header>
        <nav
            class="bg-gray-50 dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div class="flex items-center gap-3">
                    <!-- logo  -->
                    <router-link :to="{ name: 'home' }" class="flex items-center space-x-3">
                        <img src="../../public/favicon.ico" class="h-8" alt="Travel Journal Logo">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Travel
                            Journal</span>
                    </router-link>

                    <!-- darkmode switcher  -->
                    <div @click="toggleDarkMode">
                        <!-- dark  -->
                        <button type="button" :class="[isDark ? 'hidden' : 'block']"
                            class="font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                            <span class="group inline-flex shrink-0 justify-center items-center size-9">
                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                </svg>
                            </span>
                        </button>

                        <!-- light -->
                        <button type="button" :class="[isDark ? 'block' : 'hidden']"
                            class="font-medium text-gray-800 rounded-full focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:text-gray-800 dark:hover:bg-gray-200 dark:focus:bg-neutral-800">
                            <span class="group inline-flex shrink-0 justify-center items-center size-9">
                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <path d="M12 2v2"></path>
                                    <path d="M12 20v2"></path>
                                    <path d="m4.93 4.93 1.41 1.41"></path>
                                    <path d="m17.66 17.66 1.41 1.41"></path>
                                    <path d="M2 12h2"></path>
                                    <path d="M20 12h2"></path>
                                    <path d="m6.34 17.66-1.41 1.41"></path>
                                    <path d="m19.07 4.93-1.41 1.41"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                <!-- hamburger menu  -->
                <div class="flex">
                    <button @click="isOpen = !isOpen" data-collapse-toggle="navbar-sticky" type="button"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <font-awesome-icon :icon="['fas', 'bars']" class="w-5 h-5" />
                    </button>
                </div>




                <!-- navbar links  -->
                <div :class="[isOpen ? 'block' : 'hidden']"
                    class="items-center justify-between w-full md:flex md:w-auto" id="navbar-sticky">
                    <ul
                        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                        <li v-for="link in navLinks">
                            <router-link
                                class="block py-2 px-3 rounded cursor-pointer text-gray-900 dark:text-white hover:text-cyan-600 md:p-0 dark:hover:text-cyan-500 dark:hover:bg-gray-700 hover:bg-gray-200 md:hover:bg-transparent md:dark:hover:bg-transparent dark:border-gray-700"
                                activeClass="text-cyan-600 dark:text-cyan-500" aria-current="page"
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