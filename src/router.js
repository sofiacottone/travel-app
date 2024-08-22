import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import TripList from './pages/TripList.vue';
import UserProfile from './pages/UserProfile.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/',
            name: 'trips',
            component: TripList
        },
        {
            path: '/',
            name: 'profile',
            component: UserProfile
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]
});
export { router };