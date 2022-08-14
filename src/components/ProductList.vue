<!-- eslint-disable -->
<template>
  <ul class="catalog__list container">
    <ProductItem v-for="product in products" :key="product.id" :product="product" :id="`product_${product.id}`" />
  </ul>
</template>

<script>
/* eslint-disable */
  import ProductItem from '@/components/ProductItem'

  export default {
    name: 'ProductList',
    props: ["products"],
    components: {ProductItem},
  }
</script>

<style lang="scss" scoped>
  .catalog__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 30px;
  }

  @media (max-width: 1550px) {
    .catalog__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
