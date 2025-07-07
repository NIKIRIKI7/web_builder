import { createRouter, createWebHistory } from 'vue-router';
import BuilderPage from '@/pages/builder/ui/BuilderPage.vue';
import DashboardPage from '@/pages/dashboard/ui/DashboardPage.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/builder/:projectId',
    name: 'Builder',
    component: BuilderPage,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});