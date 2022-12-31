/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import CatalogPage from '@/pages/CatalogPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import OrderPage from '@/pages/OrderPage';
import OrderInfoPage from '@/pages/OrderInfoPage';
import NotFoundPage from '@/pages/NotFoundPage';

Vue.use(VueRouter);

const routes = [
  {name: 'catalog', component: CatalogPage, path: '/'},
  {name: 'product', component: ProductPage, path: '/product/:id'},
  {name: 'cart', component: CartPage, path: '/cart'},
  {name: 'order', component: OrderPage, path: '/order'},
  {name: 'orderInfo', component: OrderInfoPage, path: '/order-info/:id'},
  {name: 'notFound', component: NotFoundPage, path: '*'}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
