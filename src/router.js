import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import TripList from './pages/TripList.vue';
import UserProfile from './pages/UserProfile.vue';
import NewTripForm from './pages/NewTripForm.vue';
import SingleTrip from './pages/SingleTrip.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/viaggi',
            name: 'trips',
            component: TripList
        },
        {
            path: '/profilo',
            name: 'profile',
            component: UserProfile
        },
        {
            path: '/nuovo-viaggio',
            name: 'new-trip',
            component: NewTripForm
        },
        {
            path: '/viaggi/:id',
            name: 'single-trip',
            component: SingleTrip
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]
});
export { router };