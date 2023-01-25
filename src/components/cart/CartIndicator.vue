<!-- eslint-disable -->
<template>
      <router-link class="cart-indicator" href="#" :to="{name: 'cart'}">
        <svg width="18" height="23" fill="currentColor">
          <use href="#icon-cart"></use>
        </svg>
        <span class="cart-indicator__counter"> {{ $store.state.cartProductsData.length }} </span>
      </router-link>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'CartIndicator',
  }
</script>

<style lang="scss">
.cart-indicator {
  position: relative;
  margin-right: 6px;

  &__counter {
    position: absolute;
    bottom: 1px;
    right: -6px;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    background-color: var(--pink);
    text-align: center;
    font: 500 8px/13px Geometria;
    color: #fff;
  }
}
</style>
