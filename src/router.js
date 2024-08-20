import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: AppHome
        },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]
});
export { router };