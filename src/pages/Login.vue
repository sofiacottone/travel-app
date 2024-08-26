<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '../stores/authStore';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['login']), // map the login action from the auth store
        async handleLogin() {
            try {
                await this.login({
                    email: this.email,
                    password: this.password,
                });
                this.$router.push('/'); // redirect after successful login
            } catch (err) {
                this.error = 'Impossibile effettuare il login. Verifica le tue credenziali e riprova.';
            }
        },
    },
};
</script>

<template>
    <div class="px-6 py-2">
        <h2 class="text-2xl text-center font-bold py-4">
            Accedi
        </h2>

        <div class="px-4 py-2 md:w-3/5 m-auto rounded-xl bg-cyan-500/20">
            <form @submit.prevent="handleLogin">
                <div class="my-4">
                    <label for="email" class="text-gray-900 dark:text-gray-400">Email</label>
                    <input type="email" id="email" v-model="email" required
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>

                <div class="my-4">
                    <label for="password" class="text-gray-900 dark:text-gray-400">Password</label>
                    <input type="password" id="password" v-model="password" required
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>
                <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

                <div class="flex justify-center items-center my-4">
                    <button type="submit"
                        class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">
                        Accedi
                    </button>
                </div>
            </form>
            <p>
                Non hai un account?
                <router-link :to="{ name: 'register' }">Registrati</router-link>
            </p>
        </div>
    </div>
</template>