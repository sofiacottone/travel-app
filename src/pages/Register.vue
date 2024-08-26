<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '../stores/authStore';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['register']), // map the register action from the auth store
        async handleRegister() {
            try {
                await this.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });
                this.$router.push('/'); // redirect after successful registration
            } catch (err) {
                this.error = 'Impossibile effettuare la registrazione. Verifica le tue credenziali e riprova.';
            }
        },
    },
};
</script>

<template>
    <div class="px-6 py-2">
        <h2 class="text-2xl text-center font-bold py-4">
            Registrati per iniziare
        </h2>

        <div class="px-4 py-2 md:w-3/5 m-auto rounded-xl bg-cyan-500/20">
            <form @submit.prevent="handleRegister">
                <div class="my-4">
                    <label for="name" class="text-gray-900 dark:text-gray-400">Nome</label>
                    <input type="text" id="name" v-model="name" required
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>

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

                <div class="my-4">
                    <label for="password-confirmation" class="text-gray-900 dark:text-gray-400">Conferma
                        password</label>
                    <input type="password" id="password-confirmation" v-model="password_confirmation" required
                        class="py-1 pe-0 ps-3 w-full text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b-2 border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-cyan-600 dark:focus:border-cyan-500 appearance-none" />
                </div>

                <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

                <div class="flex justify-center items-center my-4">
                    <button type="submit"
                        class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">
                        Registrati
                    </button>
                </div>
            </form>
        </div>
    </div>
    <img class="hidden md:block absolute md:top-72 right-14" src="../../public/travel.png" alt="travel the world">
    <img class="hidden md:block absolute md:top-72 left-14" src="../../public/travel2.png" alt="luggage">
</template>