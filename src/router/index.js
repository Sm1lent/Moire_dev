/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import CatalogPage from '@/pages/CatalogPage'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(VueRouter);

const routes = [
  {name: 'catalog', component: CatalogPage, path: '/'},

  {name: 'notFound', component: NotFoundPage, path: '*'}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
