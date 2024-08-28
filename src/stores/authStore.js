import { defineStore } from 'pinia';
import axiosInstance from '../axios';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isTokenExpired: false,
        baseURL: 'http://localhost:8000/api', // backend url

    }),
    actions: {
        /**
        * get the authenticated user's details using the JWT token
        */
        async fetchUser() {
            try {
                const response = await axiosInstance.get('/authUser');
                this.user = response.data;

            } catch (error) {
                this.logout();
            }
        },
        /**
         * send user credentials to the backend and, if valid, 
         * save the JWT token in localStorage and set the
         * authorization header for future requests
         * 
         * @param {string} credentials 
         */
        async login(credentials) {
            try {
                const response = await axiosInstance.post(`${this.baseURL}/login`, credentials);
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                this.fetchUser();
            } catch (error) {
                throw error;
            }
        },
        /**
         * send new user data to the backend and
         * save the JWT token in localStorage and set the
         * authorization header for future requests
         * 
         * @param {string} userData 
         */
        async register(userData) {
            try {
                const response = await axiosInstance.post(`${this.baseURL}/register`, userData);
                console.log('prova di register');
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                this.fetchUser();
            } catch (error) {
                console.error('Errore nella Registrazione:', error.response ? error.response.data : error.message)
                throw error;
            }
        },
        /**
         * clear the JWT token from the state and localStorage, 
         * and redirect the user to the login page
         */
        async logout() {
            try {
                const response = await axiosInstance.post(`${this.baseURL}/logout`); // Call the logout endpoint
                this.user = null;
                this.token = null;
                localStorage.removeItem('token');
                delete axiosInstance.defaults.headers.common['Authorization'];

                // redirect to login page
                window.location.href = '/login';
            } catch (error) {
                console.error('Errore in fase di logout:', error.response ? error.response.data : error.message)

            }
        },
        checkTokenExpiry() {
            if (this.token) {
                try {
                    const decodedToken = jwtDecode(this.token);
                    const now = Math.floor(Date.now() / 1000);

                    // expired token
                    if (decodedToken.exp < now) {
                        this.logout();
                        console.log('Token scaduto, effettua nuovamente l\'accesso');

                    }
                } catch (error) {
                    console.error('Errore nella decodifica del token:', error);
                    this.logout();

                }
            }
        }
    }
});
