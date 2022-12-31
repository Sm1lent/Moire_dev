<!-- eslint-disable -->
<template>
	<div class="counter">
		<button class="counter__btn" :class="{isdisabled : productAmount < 2}" aria-label="Убрать один товар" @click="decreaseProductAmount">
      <svg width="37" height="37">
        <use href="#minus"></use>
      </svg>
    </button>

		<input class="counter__input" type="text" v-model="productAmount" @keydown="pressOnlyNumbers($event,productAmount)" @input="fixNSync(productAmount)">

		<button class="counter__btn" :class="{isdisabled : productAmount > 98}" aria-label="Добавить один товар" @click="increaseProductAmount">
      <svg width="37" height="37">
        <use href="#plus"></use>
      </svg>
    </button>
	</div>
</template>

<script>
/* eslint-disable */
  import inputOnlyNumbers from '@/helpers/inputOnlyNumbers';
  import pressOnlyNumbers from '@/helpers/pressOnlyNums';

	export default {
		name: 'product-amount-changing-item',
		props: ['productStartAmount'],
		data(){
			return {
				productAmount: this.productStartAmount
			}
		},
		methods: {
      fixNSync(value){
        this.productAmount = this.inputOnlyNumbers(value);
        this.syncProductAmount();
      },
      syncProductAmount() {
        this.$emit('updateProductAmount', this.productAmount);
      },
			increaseProductAmount(){
				this.productAmount++;
				this.$emit('updateProductAmount', this.productAmount);
			},
			decreaseProductAmount(){
				if(this.productAmount > 0) {
					this.productAmount--;
					this.$emit('updateProductAmount', this.productAmount);
				}
			},
      inputOnlyNumbers,
      pressOnlyNumbers,
		},

	}
</script>

<style scoped lang="scss">
  .counter {
    display: flex;
    align-items: center;

    &__input {
      width: 50px;
      text-align: center;
      font-size: 24px;
      line-height: 24px;
    }

    &__btn {
      & svg {
        color: var(--note-color);
      }
      &.isdisabled {
        pointer-events: none;
        & svg {
          color: var(--pag-btn-color);
        }
      }
      &:active svg {
        color: var(--black);
      }
    }
  }

</style>
