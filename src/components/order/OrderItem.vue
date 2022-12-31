<!-- eslint-disable -->
<template>
  <li class="order-product">
    <span class="order-product__title bigger-font">{{ item.product.title }}</span>
    <b class="order-product__price">{{ item.price | numberFormat }} ₽</b>
    <span class="order-product__attribute order-product__attribute_code"><span class="note-color">Артикул:</span> {{ item.id }}</span>
    <span class="order-product__attribute order-product__attribute_amount"><span class="note-color">Количество:</span> {{ item.quantity }}</span>
    <span class="order-product__attribute order-product__attribute_size"><span class="note-color">Размер:</span> {{ item.size.title }}</span>
    <span class="order-product__attribute order-product__attribute_color"><span class="note-color">Цвет:</span> {{ item.color.color.title }}</span>
  </li>
</template>

<script>
/* eslint-disable */
  import numberFormat from '@/helpers/numberFormat';
	export default {
		name: 'OrderItem',
		props: {
      item: Object
    },
    filters: {
      numberFormat
    },
	}
</script>

<style lang="scss">
  .order-product {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 7px;

    &__title {
      font-size: 16px;
      line-height: 21px;
    }

    &__price {
      justify-self: end;
    }

    &__attribute {
      font-size: 12px;
      line-height: 24px;

      &_amount, &_color {
        justify-self: end;
      }
    }
  }
  .note-color {
    color: var(--note-color);
  }
</style>
