import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import TripList from './pages/TripList.vue';
import UserProfile from './pages/UserProfile.vue';
import NewTripForm from './pages/NewTripForm.vue';
import SingleTrip from './pages/SingleTrip.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';

import { useAuthStore } from './stores/authStore';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registrati',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            name: 'home',
            component: AppHome,
            meta: { requiresAuth: true }
        },
        {
            path: '/viaggi',
            name: 'trips',
            component: TripList,
            meta: { requiresAuth: true }
        },
        {
            path: '/profilo',
            name: 'profile',
            component: UserProfile,
            meta: { requiresAuth: true }
        },
        {
            path: '/nuovo-viaggio',
            name: 'new-trip',
            component: NewTripForm,
            meta: { requiresAuth: true }
        },
        {
            path: '/viaggi/:id',
            name: 'single-trip',
            component: SingleTrip,
            meta: { requiresAuth: true }
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]
});

/**
 * before navigating, check if the user 
 * is authenticated for protected routes. 
 * if not, redirect to the login page
 */
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.token) {
        next('/login');
    } else {
        next();
    }
});

export { router };