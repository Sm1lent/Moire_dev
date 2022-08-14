<!-- eslint-disable -->
<template>
  <li>
    <article class="catalog__card product">
      <img class="product__img" :src="getImage()" :alt="product.title">
      <a class="link" href="#">
        <h2 class="common-text">{{ product.title }}</h2>
      </a>
      <span class="product__price">{{ product.price | numberFormat }} ₽</span>
      <fieldset class="product__colors">
        <label  class="product__color color" v-for="color in product.colors" :key="`${product.id}_${color.id}`">
          <input  class="color__input visually-hidden" type="radio" :value="color.color.code" v-model="productColorCode">
          <span class="color__skin" :style="`background-color: ${color.color.code}`"></span>
        </label>
      </fieldset>
    </article>
  </li>
</template>

<script>
/* eslint-disable */
  import numberFormat from '@/helpers/numberFormat'

  export default {
    name: 'ProductItem',
    props: {
      product: Object
    },
    data(){
      return {
        productColorCode: '',
      }
    },
    computed: {
      currentColor(){
        return this.productColorCode ? this.product.colors.find(item => item.color.code === this.productColorCode) : ''
      }
    },
    methods: {
      getImage(){
        if(this.currentColor){
          try {
            return this.currentColor.gallery[0].file.url
          }
          catch{
            return './img/svg/no-img.svg'
          }
        }
        return ''
      },
      getColor(color){
        return color ? color.code : '#fff';
      }
    },
    mounted() {
      this.productColorCode = this.product.colors[0].color.code;
    },
    filters: {
      numberFormat
    },
  }
</script>

<style scoped lang="scss">
  .product {
    display: grid;
    gap: 10px;
    height: 100%;
    border: 1px solid var(--pale-pink);

    &__img {
      width: 100%;
      margin-bottom: 10px;
      aspect-ratio: 317 / 411;
    }

    &__price {
      margin-top: auto;
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

</style>
