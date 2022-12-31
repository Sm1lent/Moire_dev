<!-- eslint-disable -->
<template>
  <main class="cart-page container">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="link-under common-font"  :to="{name: 'catalog'}" href="#">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <span class="common-font" >
          &mdash;
        </span>
      </li>
      <li class="breadcrumbs__item">
        <span class="common-font">
          Корзина
        </span>
      </li>
    </ul>

    <div class="cart-page__title-wrap"   v-if="productsAmount > 0">
      <h1 class="cart-page__title">
        Корзина
      </h1>
      <span class="cart-page__products-counter">
        товаров: {{ productsAmount }}
      </span>
    </div>

    <h2 v-if="productsAmount < 1" class="error-message">
      Корзина пока пуста. Перейти в <router-link class="cart-page__link" :to="{name: 'catalog'}" href="#">
      Каталог</router-link>?
    </h2>

    <div class="cart-page__content" v-if="productsAmount > 0">
      <ul class="cart-page__products-list">
        <CartItem v-for="item in products" :key="item.id" :item="item" />
      </ul>
      <div class="cart-page__order">
        <span class="cart-page__lesser-heading bigger-font">Мы посчитаем стоимость доставки на&nbsp;следующем этапе</span>
        <span class="cart-page__total-price">
          Итого:<span class="cart-page__total-price-value">{{ totalPrice | numberFormat }} ₽</span>
        </span>
        <router-link class="cart-page__order-link btn btn-primary" :to="{name: 'order'}" href="#">оформить&nbsp;заказ</router-link>
      </div>
    </div>
  </main>
</template>

<script>
/* eslint-disable */
  import numberFormat from '@/helpers/numberFormat';
  import {mapGetters} from 'vuex';
  import CartItem from '@/components/cart/CartItem';

  export default {
    name: 'CartPage',
    components: {CartItem},
    computed: {
      ...mapGetters({totalPrice: 'cartTotalPrice'}),
      productsAmount(){
        return this.products.length
      },
      products() {
        return  this.$store.state.cartProductsData;
      }
    },
    filters: {numberFormat},
  }
</script>

<style lang="scss">
  .cart-page {
    padding:  30px 0 84px;

    &__title-wrap {
      display: flex;
      align-items: center;
    }

    &__title {
      font-weight: 800;
      font-size: 24px;
      line-height: 54px;
      margin-right: 12px;
    }

    &__link {
      position: relative;
      &::after{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
        background-color: var(--pink);
      }
      &:hover {
        color: var(--pink);
      }
    }

    &__products-counter {
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: var(--note-color);
    }

    &__content {
      display: grid;
      grid-template-columns: minmax(762px, 1fr) 1fr;
      align-items: start;
      column-gap: 60px;
      padding: 55px 0 85px;
    }

    &__products-list {
      display: grid;
      row-gap: 60px;
    }

    &__order {
      display: grid;
      padding: 30px;
      border: 1px solid var(--btn-hover-color);
      background-color: #fff;

      & > * {
        width: 258px;
      }
    }

    &__lesser-heading {
      margin-bottom: 20px;
    }

    &__total-price {
      margin-bottom: 30px;
      font-size: 25px;
      line-height: 48px;
    }

    &__total-price-value {
      margin-left: 20px;
      font-weight: 500;
      font-size: 30px;
    }
  }

  @media (max-width: 1200px) {
    .cart-page {
      &__content {
        position: relative;
        grid-template-columns: 100%;
        gap: 30px;
      }
      &__order {
        position: fixed;
        z-index: 1;
        right: 40px;
        top: 100px;
        padding: 15px;
      }
      &__lesser-heading, &__total-price {
        margin-bottom: 15px;
      }
    }
    .cart-card {
      grid-template-columns: 120px 1fr;
      gap: 15px;
      &__img {
        grid-row: span 2;
      }
      &__info {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 64px);
        gap: 0 15px;
      }
      &__title {
        width: 100%;
      }
      &__remove-btn {
        position: absolute;
        top: 30px;
        right: 22px;
      }
    }
  }

  @media (max-width: 620px) {
    .cart-page {
      &__content {
        padding-top: 35px;
        padding-bottom: 0;
      }
      &__products-list {
        row-gap: 20px;
      }
      &__order {
        position: static;
        grid-row: 1 / 2;
        width: 100%;
      }
    }
    .cart-card {
      grid-template-columns: 100%;
      gap: 10px;
      padding: 15px;
      padding-left: 0;
      &__img {
        grid-row: unset;
        max-width: 120px;
      }
      &__remove-btn {
        top: 15px;
        right: 15px;
      }
    }
  }
</style>
