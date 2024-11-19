import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CountryDetailsView from '../views/CountryDetailsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/country',
      name: 'CountryDetail',
      component: CountryDetailsView,
    },
  ],
});

export default router;
