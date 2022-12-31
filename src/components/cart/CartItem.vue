<!-- eslint-disable -->
<template>
  <li>
    <div class="cart-card">
      <img class="cart-card__img" :src="getImage()"  :alt="item.product.title">
      <div class="cart-card__info">
        <h3 class="cart-card__title bigger-font">{{ item.product.title }}</h3>
        <div class="cart-card__color-block">
          <h4 class="cart-card__color-title">Цвет:</h4>
          <span class="cart-card__color" :style="`background-color: ${item.color.color.code}`"></span>
          <span class="cart-card__color-name">{{ item.color.color.title }}</span>
        </div>
        <span class="cart-card__size">Размер: {{ item.size.title }}</span>
        <span class="cart-card__code">Артикул: {{ item.id }}</span>
      </div>
      <div class="cart-card__buttons-block">
        <div class="cart-card__counter">
          <ProductAmountChangingItem @updateProductAmount="onUpdateCartProductAmount" :product="item" :product-start-amount="item.quantity" />
        </div>
        <span class="cart-card__price">{{ item.price | numberFormat }} ₽</span>
        <button class="cart-card__remove-btn" @click.prevent="onRemoveCartProduct">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 1L1 17" stroke="#9D9D9D" stroke-width="0.8"/>
            <path d="M17 17L1 0.999999" stroke="#9D9D9D" stroke-width="0.8"/>
          </svg>
        </button>
      </div>
      <BaseSpinner v-if="productDeleting" />
      <ItemError :error.sync="productDeletingError" :message="errorMessage" />
    </div>
  </li>
</template>

<script>
/* eslint-disable */
  import numberFormat from '@/helpers/numberFormat';
	import { mapActions } from 'vuex';
	import ProductAmountChangingItem from '@/components/product/ProductAmountChangingItem';
  import BaseSpinner from '@/components/base/BaseSpinner';
  import ItemError from '@/components/base/ItemError';
	export default {
		name: 'CartItem',
		props: {
      item: Object
    },
		components: {ProductAmountChangingItem, ItemError, BaseSpinner},
    data(){
			return {
        errorMessage: "Извините, произошла ошибка. Удалить товар не удалось.",
        productDeleting: false,
        productDeletingError: false,
			}
		},
		filters: {numberFormat},
		methods: {
			...mapActions(['removeProductFromBasket', 'updateCartProductAmount']),
			onUpdateCartProductAmount(amount) {
        this.updateCartProductAmount({basketItemId: this.item.id, quantity:amount});
			},
      async onRemoveCartProduct() {
        this.productDeleting = true;
        const deletingError = await this.removeProductFromBasket(this.item.id) ? false : true;
        if (deletingError) {
          this.productDeleting = false;
          this.productDeletingError = true;
        } else {
          this.productDeleting = false;
        }
			},
      getImage() {
        try {
          return this.item.color.gallery[0].file.url;
        } catch {
          return './img/svg/no-img.svg'
        }
      }
		},
	}
</script>

<style lang="scss">
  .cart-card {
    position: relative;
    width: Min(762px, 100%);
    display: grid;
    grid-template-columns: 120px 1fr max-content;
    align-items: start;
    padding: 30px 22px 30px 0;
    border-bottom: 1px solid  #F7F7F7;
    &__img {
      height: 120px;
      margin-right: 20px;
    }
    &__title {
      margin-bottom: 20px;
    }
    &__color-block, &__size {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
      font-size: 14px;
      line-height: 24px;
    }
    &__color-title {
      margin-right: 10px;
      color: #737373;
      font-weight: 400;
    }
    &__color {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border-radius: 10px;
      border: 1px solid lightgrey;
    }
    &__code {
      font-weight: 500;
      font-size: 12px;
      line-height: 2;
      color: #9D9D9D;
    }
    &__buttons-block {
      display: flex;
      align-items: center;
    }
    &__counter {
      margin-right: 33px;
    }
    &__price {
      margin-right: 39px;
      font-weight: 500;
      font-size: 19px;
      line-height: 48px;
    }
  }
</style>
