<!-- eslint-disable -->
<template>
  <div class="container container_loader"  v-if="productLoading">
      <BaseSpinner />
  </div>
  <div class="column-flex container" v-else-if="productLoadingFailed">
    <span class="error-message">Произошла ошибка при загрузке товара...</span>
    <button @click.prevent="loadProduct">Попробовать ещё раз</button>
  </div>
  <main class="product-page container" v-else>
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
        <router-link class="link-under common-font" :to="{name: 'catalog', query: {id: category.id}}" href="#">
          {{ category.title }}
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <span class="common-font" >
          &mdash;
        </span>
      </li>
      <li class="breadcrumbs__item">
        <span class="common-font">
          {{ product.title }}
        </span>
      </li>
    </ul>
    <div class="product-page__productblock productblock">

      <img class="productblock__img" :src="getImage()" :alt="product.title">

      <div class="productblock__data">
        <span class="productblock__id">Артикул: {{ product.id }}</span>
        <h2  class="productblock__title">{{ product.title }}  </h2>
        <div class="productblock__price-wrap">
          <ProductAmountChangingItem @updateProductAmount="onUpdateProductAmount" :product="product" product-start-amount="1" />
          <span class="productblock__price">{{ product.price | numberFormat }} ₽</span>
        </div>
        <div class="productblock__filters">
          <div class="productblock__filter">
            <legend class="productblock__legend">Цвет</legend>
            <fieldset class="productblock__fieldset productblock__fieldset_colors">
              <label  class="productblock__color color" v-for="color in product.colors" :key="`${product.id}_${color.id}`">
                <input  class="color__input visually-hidden" type="radio" :value="color.color.code" v-model="productColorCode">
                <span class="color__skin" :style="`background-color: ${color.color.code}`"></span>
              </label>
            </fieldset>
          </div>
          <div class="productblock__filter">
            <legend class="productblock__legend">Размер</legend>
            <fieldset class="productblock__fieldset">
              <v-select v-model="currentSize" :options="product.sizes" label="title" />
            </fieldset>
          </div>
        </div>
        <button class="btn productblock__add-to-cart-btn" @click="addToCart">в корзину</button>
        <BaseSpinner v-if="productAddSending" />
        <ItemError :error.sync="productSendingError" :message="responseErrorMessage" />
        <ItemError :error.sync="productBasketSendingError" :message="basketErrorMessage" />
      </div>

      <ul class="productblock__preview img-switch" v-if="product.colors.length > 1">
        <li class="img-switch__item" v-for="color of product.colors" :key="`${product.id}_${color.id}`">
          <label>
            <input  class="img-switch__input visually-hidden" type="radio" :value="color.color.code" v-model="productColorCode">
            <img class="img-switch__img" :src="getPreviewImg(color)" :alt="`${product.title}, цвет: ${color.color.title}`">
          </label>
        </li>
      </ul>

      <div class="productblock__info-btns">
        <button class="productblock__info-btn productblock__info-btn_one" :class="{active : firstTabIsActive}" @click="switchTab">Информация о&nbsp;товаре</button>
        <button class="productblock__info-btn productblock__info-btn_two" :class="{active : !firstTabIsActive}" @click="switchTab">Доставка и&nbsp;возврат</button>
      </div>

      <div  class="productblock__info" v-if="firstTabIsActive">
        <h3 class="productblock__attribute">Состав:</h3>
        <ul class="productblock__values">
          <li  class="productblock__value" v-for="material in product.materials" :key="`${product.title}_${material.id}`"> {{material.title}}</li>
        </ul>
      </div>

      <div  class="productblock__info" v-if="firstTabIsActive">
        <h3 class="productblock__attribute">Уход:</h3>
        <ul class="productblock__values">
          <li  class="productblock__value">Машинная стирка при макс. 30ºC короткий отжим</li>
          <li  class="productblock__value">Гладить при макс. 110ºC</li>
          <li  class="productblock__value">Не использовать машинную сушку</li>
          <li  class="productblock__value">Отбеливать запрещено</li>
          <li  class="productblock__value">Не подвергать химчистке</li>
        </ul>
      </div>

      <div  class="productblock__info" v-if="!firstTabIsActive && deliverData">
        <h3 class="productblock__attribute">Доставка:</h3>
        <ul class="productblock__values">
          <li class="productblock__value" v-for="deliver in deliverData" :key="`deliver_${deliver.id}`"> {{deliver.title}}	&#x20; &mdash; 	&#x20; {{deliver.price}} 	&#x20; ₽</li>
          <li class="productblock__value">Список и адреса магазинов Вы можете посмотреть&nbsp;<a class="addresses-link link" href="#">здесь</a></li>
        </ul>
      </div>

      <div  class="productblock__info" v-if="!firstTabIsActive">
        <h3 class="productblock__attribute">Возврат:</h3>
        <ul class="productblock__values">
          <li  class="productblock__value">Любой возврат должен быть осуществлен в течение 30 дней с момента отгрузки.</li>
          <li  class="productblock__value">Возвраты в магазине БЕСПЛАТНО.</li>
          <li  class="productblock__value">Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили покупку.</li>
          <li  class="productblock__value">БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.</li>
          <li  class="productblock__value">Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону:&nbsp; <a class="link" href="tel:88006009009">8 800 600 90 09</a></li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
/* eslint-disable */
  import productCommonPropertiesMixin from '@/mixins/productCommonPropertiesMixin';
  import ProductAmountChangingItem from '@/components/product/ProductAmountChangingItem';
  import BaseSpinner from '@/components/base/BaseSpinner';
  import ItemError from '@/components/base/ItemError';
  import axios from 'axios';
  import {API_BASE_URL} from '@/data/config';
  import { mapActions } from 'vuex';
  import vSelect from 'vue-select';
	export default {
    name: 'product-page',
    components: {ProductAmountChangingItem, vSelect, ItemError, BaseSpinner},
    mixins: [productCommonPropertiesMixin],
    data(){
			return {
				productAmount: 1,
        currentSize: '',
        firstTabIsActive: true,
        responseErrorMessage: "Товар не найден. Пожалуйста, выберите другой цвет или размер.",
        basketErrorMessage: "Товар не добавлен в корзину. Пожалуйста, проверьте соединение с Internet и попробуйте ещё раз.",

        product: null,
        productLoading: false,
        productLoadingFailed: false,

        deliverData: null,
        deliverLoadingFailed: false,

        productAddSending: false,
        productSendingError: false,
        productBasketSendingError: false,
			}
		},
		computed: {
			category(){
				return this.product.category;
			},
      colorId(){
       let currentColor =  this.product.colors.find(item => item.color.code === this.productColorCode);
        return currentColor.color.id;
      },
    },
		methods: {
      ...mapActions(['sendProductToCart']),
      addToCart() {
        this.productAddSending = true;
        this.productSendingError = false;
        this.productBasketSendingError = false;
        this.sendProductToCart(
        {
          productId: this.product.id,
          colorId: this.colorId,
          sizeId: this.currentSize.id,
          quantity: this.productAmount
        })
        .then((response) => {
          if(response === 400) {
            this.productSendingError = true;
          } else if (response !== 200) {
            this.productBasketSendingError = true;
          }
        })
        .catch(() => {
          this.productBasketSendingError =  true;
        })
        .finally(() => {
          this.productAddSending = false;
        })
      },
      onUpdateProductAmount(amount) {
        this.productAmount = amount;
      },
      loadDeliver(){
        this.deliverLoadingFailed = false;
        axios.get(API_BASE_URL + '/api/deliveries/')
        .then(response => {
          this.deliverData = response.data;
        })
        .catch(() => this.deliverLoadingFailed = true);
      },
      loadProduct(){
        this.productLoading = true;
        this.productLoadingFailed = false;
        axios.get(API_BASE_URL + '/api/products/' + this.$route.params.id)
        .then(response => {
          this.product = response.data;
          this.currentSize = this.product.sizes[0];
          this.productColorCode = this.product.colors[0].color.code;
        })
        .catch(() => this.productLoadingFailed = true)
        .then(() => this.productLoading = false)
      },
      getPreviewImg(source){
        try {
          return source.gallery[0].file.url
        } catch {
          return './img/svg/no-img.svg'
        }
      },
      switchTab(){
        this.firstTabIsActive = !this.firstTabIsActive;
      },
		},
    watch: {
      '$route.params.id':{
        handler(){
          this.loadProduct();
        },
        immediate: true //замена хука created()
      }
    },
    created(){
      this.loadDeliver();
    }
	}
</script>

<style lang="scss">
  .product-page {
    padding: 30px 0 100px;
  }

  .container_loader {
    position: relative;
    min-height: 70vh;
  }

  .productblock {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px 30px;

    &__img {
      width: Min(100%, 600px);
      aspect-ratio: 1 / 1;
    }

    &__data {
      position: relative;
      grid-row: span 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
    }

    &__id {
      color: var(--note-color);
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }

    &__title {
      margin-bottom: 19px;
      font-weight: 500;
      font-size: 42px;
      line-height: 54px;
    }

    &__price-wrap {
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    &__price {
      font-weight: 500;
      font-size: 30px;
      line-height: 54px;
    }

    &__filters {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    &__filter {
      width: max-content;
      &:not(:last-child) {
      margin-right: 55px;
      }
    }

    &__fieldset_colors {
      display: flex;
      padding: 6px 0;
    }

    &__legend {
      margin-bottom: 12px;
      color: var(--darkgrey);
      font-size: 16px;
      line-height: 24px;
    }
    .vs__selected {
      padding: 5px 27px 5px 10px;
      min-width: 95px;
    }

    &__info-btns {
      grid-column: span 2;
      display: flex;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--info-border-color);
    }

    &__info-btn {
      position: relative;
      grid-column: span 2;
      margin: 0 29px;
      border-radius: 5px;
      color: var(--note-color);
      font-size: 18px;
      line-height: 28px;
      &::after {
        position: absolute;
        content: '';
        display: block;
        height: 3px;
        left: -29px;
        right: -29px;
        bottom: -18px;
        background-color: var(--pink);
        border-radius: 5px;
        transition: transform .25s ease-in-out;
        transform: scaleX(0);
        pointer-events: none;
      }
      &_one::after {
        transform-origin: right;
      }
      &_two::after {
        transform-origin: left;
      }

      &.active {
        font-weight: 700;
        color: var(--black);
        pointer-events: none;
        &::after {
          transform: scaleX(1);
        }
      }
    }

    &__info {
      grid-column: span 2;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }

    &__attribute {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
    }

    &__value {
      display: flex;
      font-size: 16px;
      line-height: 28px;
    }
  }

  .addresses-link {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      inset: 0;
      border-bottom: 1px solid var(--pink);
    }
  }

  .img-switch {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

    &__item {
      &:not(:last-child) {
        margin-right: 26px;
      }
    }

    &__img {
      width: 98px;
      padding-bottom: 2px;
      aspect-ratio: 98 / 104;
      outline-offset: -1px;
      outline: 1px solid var(--pale-pink);
      border-bottom: 4px solid transparent;
      transition: border-color .25s ease-in-out;
      cursor: pointer;
    }

    &__input {
      &:checked + .img-switch__img {
        border-color: var(--pink)
      }
      &:focus-visible + .img-switch__img {
        border-color: var(--btn-active-color)
      }
    }
  }

  @media (max-width: 620px) {
    .productblock {
      &__img, &__data {
        grid-column: span 2;
      }
      &__data {
        margin-bottom: 20px;
      }
      &__preview {
        display: none;
      }
      &__info-btns {
        display: flex;
        flex-wrap: wrap;
        border-bottom: none;
      }
      &__info-btn {
        margin: 0 0 10px;
        &_one {
          margin-right: 15px;
        }
        &::after {
          left: 0;
          right: 0px;
          bottom: -4px;
        }
      }
    }
  }
</style>
