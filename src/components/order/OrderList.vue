<!-- eslint-disable -->
<template>
  <div class="order-list">
    <button class="order-list__show-list-btn btn btn-trans" @click="toggleShow" type="button">{{ showBtnText }}</button>
    <transition name="scroll">
      <ul class="order-list__products" v-show="show">
        <OrderItem v-for="item in products" :key="item.id" :item="item" />
      </ul>
    </transition>
    <div class="order-list__submit">
      <span class="order-list__total" v-if="delivery">Доставка: <b>{{ delivery.price | numberFormat }} ₽</b></span>
      <span class="order-list__total" v-if="delivery">Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ (Number(totalPrice) + Number(delivery.price)) | numberFormat }} ₽</b></span>
      <span class="order-list__total" v-else>Выберите способ доставки для окончательного расчёта</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import OrderItem from '@/components/order/OrderItem';
  import numberFormat from '@/helpers/numberFormat';
	export default {
		name: 'OrderList',
    props: ['products', 'delivery', 'totalPrice'],
    components: {OrderItem},
    filters: {numberFormat},
    data() {
      return {
        show: true,
        showBtnText: "Скрыть список покупок"
      }
    },
    methods: {
      toggleShow(){
        this.show = !this.show;
        this.showBtnText = this.show ? "Скрыть список покупок" : "Показать список покупок";
      }
    },
    created(){
      window.addEventListener('resize', ()=> {
        const viewport = document.body.offsetWidth;
        if (viewport > 1225) {
          this.show = true;
          this.showBtnText = "Скрыть список покупок";
        }
      })
    }
	}
</script>

<style lang="scss">
  .order-list {
    grid-row: span 2;
    align-self: start;
    border: 1px solid var(--btn-hover-color);
    border-radius: 2px;

    &__show-list-btn {
      display: none;
    }

    &__products {
      display: grid;
      gap: 15px;
      padding: 30px 30px 25px;
      border-bottom: 1px solid var(--btn-hover-color);
    }

    &__submit {
      padding: 30px 30px 36px;
    }

    &__total {
      display: block;
      font-size: 14px;
      line-height: 257%;
      &:last-of-type {
        margin-bottom: 26px;
      }
    }
  }

  @media (max-width: 1225px) {
    .order-list {
      grid-row:  3 / 4;
      width: 320px;
      &__show-list-btn {
        display: block;
        margin: 15px auto;
      }
    }
  }
</style>
