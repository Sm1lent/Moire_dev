<!-- eslint-disable -->
<template>
  <li class="catalog__card-wrap">
    <article class="catalog__card product">
      <img class="product__img" :src="getImage()" :alt="product.title">
      <router-link class="product__link link-under" href="#" :to="{name: 'product', params: {id: product.id}}">
        <h2 class="bigger-font">{{ product.title }}</h2>
      </router-link>
      <div class="product__options">
        <span class="product__price">{{ product.price | numberFormat }} ₽</span>
        <fieldset class="product__colors">
          <label  class="product__color color" v-for="color in product.colors" :key="`${product.id}_${color.id}`">
            <input  class="color__input visually-hidden" type="radio" :value="color.color.code" v-model="productColorCode">
            <span class="color__skin" :style="`background-color: ${color.color.code}`"></span>
          </label>
        </fieldset>
      </div>
      <button class="btn btn-trans product__add-btn" @click="addToCart">Добавить в корзину</button>
      <BaseSpinner v-if="productAddSending" />
      <ItemError :error.sync="productAddSendingError" :message="errorMessage" />
    </article>
  </li>
</template>

<script>
/* eslint-disable */
  import productCommonPropertiesMixin from '@/mixins/productCommonPropertiesMixin';
  import BaseSpinner from '@/components/base/BaseSpinner';
  import ItemError from '@/components/base/ItemError';
  import { mapActions } from 'vuex';
  import axios from 'axios';
  import {API_BASE_URL} from '@/data/config';

  export default {
    name: 'ProductItem',
    mixins: [productCommonPropertiesMixin],
    props: {
      product: Object
    },
    components: {ItemError, BaseSpinner},
    data(){
			return {
        errorMessage: null,
        productAddSending: false,
        productAddSendingError: false,
			}
		},
    mounted() {
      this.productColorCode = this.product.colors[0].color.code;
    },
    methods: {
      ...mapActions(['sendProductToCart']),
      addToCart() {
        this.productAddSending = true;
        this.productAddSendingError = false;
        axios.get(API_BASE_URL + '/api/products/' + this.product.id)
        .then(response => {
          const size = response.data.sizes[0].id;
          this.sendProductToCart(
          {
            productId: this.product.id,
            colorId: this.currentColor.color.id,
            sizeId: size,
            quantity: 1
          })
          .then((response) => {
            this.productAddSendingError = response ? false :  true;
            this.productAddSending = false;
          })
          .catch(() => {
            this.errorMessage = "Произошла ошибка. Добавить товар не удалось."
            this.productAddSendingError = true;
            this.productAddSending = false;
          })
        })
        .catch(() => {
          this.errorMessage = "Произошла ошибка. Проверьте соединение с Internet."
          this.productAddSendingError = true;
          this.productAddSending = false;
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .catalog__card-wrap {
    height: 100%;
  }

  .product {
    position: relative;
    max-width: 310px;
    margin-left: auto;
    display: grid;
    gap: 10px;
    height: 100%;
    padding: 15px;
    box-shadow: 0px 18px 52.8537px rgb(224 45 113 / 30%);

    &__img {
      max-width: unset;
      width: calc(100% + 30px);
      margin: -15px -15px 10px;
      aspect-ratio: 317 / 411;
    }

    &__link {
      justify-self: start;
    }

    &__options {
      margin-top: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__price {
      margin-right: 15px;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
    }

    &__colors {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      gap: 4px;
    }

  }

  @media (max-width: 620px) {
    .product {
      margin-right: auto;
    }
  }
</style>
