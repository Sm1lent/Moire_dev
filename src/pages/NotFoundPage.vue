<!-- eslint-disable -->
<template>
  <main class="not-found">
    <h1 class="not-found__header">Страница не найдена</h1>
    <router-link class="not-found__home-link link" href="#" :to="{name: 'catalog'}">Перейти в каталог</router-link>
  </main>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'not-found-page'
  }
</script>

<style lang="scss">
	.not-found {
    flex-grow: 1;
    margin: 150px 0;

    &__header {
      text-align: center;
      font-size: 50px;
      margin-bottom: 70px;
    }

    &__home-link {
      display: block;
      width: max-content;
      margin: 0 auto;
      font-size: 35px;
      color: var(--active-color);
      border-bottom: 2px solid var(--active-color);
    }
  }
</style>
