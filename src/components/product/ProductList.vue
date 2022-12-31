<!-- eslint-disable -->
<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" :id="`product_${product.id}`" />
  </ul>
</template>

<script>
/* eslint-disable */
  import ProductItem from '@/components/product/ProductItem'

  export default {
    name: 'ProductList',
    props: ["products"],
    components: {ProductItem},
  }
</script>

<style lang="scss" scoped>
  .catalog__list {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 30px;
    align-items: start;
  }

  @media (max-width: 1550px) {
    .catalog__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 860px) {
    .catalog__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 620px) {
    .catalog__list {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>
