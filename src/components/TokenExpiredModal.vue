<script>
import { useAuthStore } from '../stores/authStore';

export default {
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        redirectToLogin() {
            this.$router.push('/login');
        },
    },
    mounted() {
        const authStore = useAuthStore();
        authStore.checkTokenExpiry();

        // listen to changes in the store state and update visibility
        authStore.$subscribe((mutation, state) => {
            this.isVisible = state.isTokenExpired;
        });
    },
};
</script>

<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Sessione Scaduta</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
                La tua sessione è scaduta. Effettua nuovamente l'accesso per continuare.
            </p>
            <div class="mt-4 flex justify-end">
                <button @click="redirectToLogin" class="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
                    Accedi
                </button>
            </div>
        </div>
    </div>
</template>