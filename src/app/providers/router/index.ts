import { createRouter, createWebHistory } from 'vue-router';
import BuilderPage from '@/pages/builder/ui/BuilderPage.vue';

const routes = [
    {
        path: '/',
        name: 'Builder',
        component: BuilderPage,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});