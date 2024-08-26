<script>
import { useAuthStore } from '../stores/authStore';

export default {
    data() {
        return {
            user: null,
            authStore: useAuthStore()
        };
    },
    methods: {
        async getAuthUser() {
            try {
                await this.authStore.fetchUser(); //get user data
                this.user = this.authStore.user.user; // set user data
                await this.$nextTick();
            } catch (error) {
                console.error('Errore nel recupero dell\'utente:', error);
            }
        },
        logout() {
            try {
                this.authStore.logout(); // Call logout from auth store
                this.user = null; // Clear user data
                this.$router.push('/login'); // Redirect to login page

            } catch (error) {
                console.error('Errore durante il logout:', error);
            }
        },
    },
    mounted() {
        this.getAuthUser();
    }
}
</script>

<template>
    <div class="m-10 p-4 shadow shadow-cyan-500 rounded-xl">
        <div v-if="user">
            <h2 class="font-bold mb-2">Le tue credenziali:</h2>
            <p><strong>Nome:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <div class="flex justify-center my-2">
                <button @click="logout"
                    class="px-3 py-2 text-white font-semibold bg-cyan-500 dark:bg-cyan-600 rounded">Logout</button>
            </div>
        </div>
        <div v-else>
            <p>Caricamento dati...</p>
        </div>
    </div>
</template>