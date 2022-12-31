<template>
<!-- eslint-disable -->
  <div class="overlay item-error" :class="{active: error}">
    <div class="error-in-frame">
      <p>{{ message }}</p>
      <button class="btn item-error__btn" @click="closeError">Принять</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
	export default {
		name: 'item-error',
    props: {
      error: Boolean,
      message: String
    },
    methods: {
      closeError() {
        this.$emit('update:error', false)
      }
    }
	}
</script>

<style lang="scss">
  .item-error {
    transition: transform .25s ease-in-out;
    &:not(.active) {
      transform: scale(0, 0);
    }
  }
  .item-error__btn {
    display: block;
    margin: 25px auto 0;
  }
</style>
