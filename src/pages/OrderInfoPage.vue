<!-- eslint-disable -->
<template>
  <BaseSpinner v-if="dataLoading" />
  <h1 v-else-if="!orderData" class="order-info-page__title">Извините, заказ не найден</h1>
  <main v-else class="order-info-page container">
    <h1 class="order-info-page__title">Заказ оформлен <span class="order-info-page__order-num">№{{ orderData.id }}</span></h1>
    <div class="order-info-page__content">
      <p class="order-info-page__message">Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа. Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.</p>
      <OrderList :products="products" :delivery="delivery" :total-price="totalPrice" />
      <dl class="order-info-page__costumer-info">
        <dt class="order-info-page__costumer-key">получатель</dt>
        <dd class="order-info-page__costumer-value">{{ orderData.name }}</dd>
        <dt class="order-info-page__costumer-key">Адрес доставки</dt>
        <dd class="order-info-page__costumer-value">{{ orderData.address }}</dd>
        <dt class="order-info-page__costumer-key">Телефон</dt>
        <dd class="order-info-page__costumer-value">{{ orderData.phone }}</dd>
        <dt class="order-info-page__costumer-key">Email</dt>
        <dd class="order-info-page__costumer-value">{{ orderData.email }}</dd>
        <dt class="order-info-page__costumer-key">Способ оплаты</dt>
        <dd class="order-info-page__costumer-value">{{ orderData.paymentType }}</dd>
      </dl>
    </div>
  </main>
</template>

<script>
/* eslint-disable */
  import axios from 'axios';
  import {API_BASE_URL} from '@/data/config';
  import OrderList from '@/components/order/OrderList';
  import BaseSpinner from '@/components/base/BaseSpinner';
  import numberFormat from '@/helpers/numberFormat';
	export default {
		name: 'OrderInfoPage',
    components: {OrderList, BaseSpinner},
    filters: {numberFormat},
    data() {
      return{
        orderData: null,
        dataLoading: false,
        dataLoadingFailed: false,
      }
    },
    methods: {
      loadOrderData() {
        this.dataLoadingFailed = false;
        this.dataLoading = true;
        axios.get(API_BASE_URL + '/api/orders/' + this.$route.params.id, {params: {userAccessKey: this.$store.state.userAccessKey}})
        .then(response => {
          this.orderData = response.data;
        })
        .catch(() => this.dataLoadingFailed = true)
        .finally(() => this.dataLoading = false);
      }
    },
    computed: {
      products() {
        return this.orderData ? this.orderData.basket.items : null
      },
      delivery() {
        return this.orderData ? this.orderData.deliveryType : null
      },
      totalPrice() {
        return this.orderData ? this.orderData.totalPrice : null
      }
    },
    watch: {
      '$route.params.id': {
        handler(){
          this.loadOrderData();
        },
        immediate: true
      }
    },
	}
</script>

<style lang="scss">
  .order-info-page {
    padding: 77px 0 100px;

    &__title {
      margin-bottom: 23px;
      font-weight: 800;
      font-size: 24px;
      line-height: 54px;
    }

    &__order-num {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000;
    }

    &__content {
      display: grid;
      grid-template-columns: 1fr 370px;
      gap: 50px 30px;
    }

    &__message {
      margin-top: 25px;
      font: 400 16px / 24px Geometria;
    }

    &__costumer-info {
      width: 100%;
      display: grid;
      grid-template-columns: max-content max-content;
      gap: 34px 65px;
    }

    &__costumer-key {
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      opacity: 0.6;
    }

    &__costumer-value {
      font-size: 16px;
      line-height: 24px;
    }
  }

  @media (max-width: 1225px) {
    .order-info-page__content {
      grid-template-columns: 1fr;
    }
  }
</style>
