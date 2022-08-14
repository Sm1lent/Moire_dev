<!-- eslint-disable -->
<template>
  <form class="filters"  @submit.prevent="submit">
    <fieldset class="filters__filter">
      <legend class="filters__legend">Цена</legend>
      <label class="filters__input-label">
        <input class="filters__input common-text" type="number" name="min-price" v-model="currentPriceFrom">
      </label>
      <label class="filters__input-label">
        <input class="filters__input common-text" type="number" name="max-price" v-model="currentPriceTo">
      </label>
    </fieldset>

    <fieldset class="filters__filter">
      <legend class="filters__legend">Категория</legend>
      <select class=" visually-hidden" :value="currentCategory.title">
        <option value="0">Все товары</option>
        <option v-for="category in categories" :key="category.id">{{ category.title }}</option>
      </select>
    </fieldset>
    <v-select v-model="currentCategory" :options="categories" label="title" />

    <h2 v-if="colorsLoading">LOADING</h2>
    <fieldset class="filters__filter" v-if="colorsData">
      <legend class="filters__legend">Цвет</legend>
      <ul class="filters__color-list color-list">
        <li class="color-list__item" v-for="color in colors" :key="`color_${color.id}`">
          <label class="color-list__color color">
            <input class="color__input visually-hidden"  :value="color" v-model="currentColors" type="checkbox">
            <span class="color__skin" :style="`background-color: ${color.code}`"></span>
          </label>
        </li>
      </ul>
    </fieldset>

    <h2 v-if="materialsLoading">LOADING</h2>
    <fieldset class="filters__filter" v-if="materialsData">
      <legend class="filters__legend">Материал</legend>
      <ul class="filters__material-list square-check-list">
        <li class="material-list__item" v-for="material in materials" :key="`material_${material.id}`">
          <label class="material-list__material square-check">
            <input class="square-check__input visually-hidden" :value="material"  v-model="currentMaterials" type="checkbox">
            <span class="square-check__skin"></span>
            <span class="square-check__value">{{ material.title }}</span>
            <span class="square-check__amount">({{ material.productsCount }})</span>
          </label>
        </li>
      </ul>
    </fieldset>

    <h2 v-if="seasonsLoading">LOADING</h2>
    <fieldset class="filters__filter" v-if="seasonsData">
      <legend class="filters__legend">Коллекция</legend>
      <ul class="filters__material-list square-check-list">
        <li class="material-list__item" v-for="season in seasons" :key="`season_${season.id}`">
          <label class="material-list__material square-check">
            <input class="square-check__input visually-hidden" :value="season"  v-model="currentSeasons" type="checkbox">
            <span class="square-check__skin"></span>
            <span class="square-check__value">{{ season.title }}</span>
            <span class="square-check__amount">({{ season.productsCount }})</span>
          </label>
        </li>
      </ul>
    </fieldset>

    <button class="btn btn-primary" type="submit">Применить</button>
    <button class="btn btn-trans" @click.prevent="reset">сбросить</button>
  </form>
</template>

<script>
/* eslint-disable */
  import axios from 'axios';
  import vSelect from 'vue-select';
  import {API_BASE_URL} from '@/data/config';
  export default {
    name: 'ProductFilter',
    components: {vSelect},
    props: {
      priceFrom: Number,
      priceTo: Number,
      choosenCategory: Object,
      choosenColors: Array,
      choosenMaterials: Array,
      choosenSeasons: Array,
    },
    data() {
      return {
        currentPriceFrom: 0,
        currentPriceTo: 0,
        currentCategory: {id: 0, title: 'Все товары'},
        currentColors: [],
        currentMaterials: [],
        currentSeasons: [],

        categoriesData: null,
        categoriesLoading: false,
        categoriesLoadingFailed: false,

        colorsData: null,
        colorsLoading: false,
        colorsLoadingFailed: false,

        materialsData: null,
        materialsLoading: false,
        materialsLoadingFailed: false,

        seasonsData: null,
        seasonsLoading: false,
        seasonsLoadingFailed: false,
      }
    },
    computed: {
      categories() {
        return this.categoriesData ? this.categoriesData.items : []
      },
      colors() {
        return this.colorsData ? this.colorsData.items : []
      },
      materials() {
        return this.materialsData ? this.materialsData.items : []
      },
      seasons() {
        return this.seasonsData ? this.seasonsData.items : []
      },
    },
    methods: {
      submit() {
        this.$emit('update:priceFrom', Number(this.currentPriceFrom));
        this.$emit('update:priceTo', Number(this.currentPriceTo));
        this.$emit('update:choosenCategory', this.currentCategory);
        this.$emit('update:choosenColors', this.currentColors);
        this.$emit('update:choosenMaterials', this.currentMaterials);
        this.$emit('update:choosenSeasons', this.currentSeasons);
      },
      reset() {
        this.$emit('update:priceFrom', 0);
        this.currentPriceFrom = 0;
        this.$emit('update:priceTo', 0);
        this.currentPriceTo = 0;
        this.$emit('update:choosenCategory', {id: 0, title: 'Все товары'});
        this.currentCategory = {id: 0, title: 'Все товары'};
        this.$emit('update:choosenColors', []);
        this.currentColors = [];
        this.$emit('update:choosenMaterials', []);
        this.currentMaterials = [];
        this.$emit('update:choosenSeasons', []);
        this.currentSeasons =[];
      },
      loadCategories(){
        this.categoriesLoading = true;
        this.categoriesLoadingFailed = false;
        axios.get(API_BASE_URL + '/api/productCategories')
        .then(response => this.categoriesData = response.data)
        .catch(() => this.categoriesLoadingFailed = true)
        .then(() => this.categoriesLoading = false);
      },
      loadColors(){
        this.colorsLoading = true;
        this.colorsLoadingFailed = false;
        axios.get(`${API_BASE_URL}/api/colors`)
        .then(response => {
          this.colorsData = response.data;
        })
        .catch(() => this.colorsLoadingFailed = true)
        .then(() => this.colorsLoading = false);
      },
      loadMaterials(){
        this.materialsLoading = true;
        this.materialsLoadingFailed = false;
        axios.get(`${API_BASE_URL}/api/materials`)
        .then(response => {
          this.materialsData = response.data;
        })
        .catch(() => this.materialsLoadingFailed = true)
        .then(() => this.materialsLoading = false);
      },
      loadSeasons(){
        this.seasonsLoading = true;
        this.seasonsLoadingFailed = false;
        axios.get(`${API_BASE_URL}/api/seasons`)
        .then(response => {
          this.seasonsData = response.data;
        })
        .catch(() => this.seasonsLoadingFailed = true)
        .then(() => this.seasonsLoading = false);
      },
    },
    created(){
      this.loadCategories();
      this.loadColors();
      this.loadMaterials();
      this.loadSeasons();
    },
  };
</script>

<style lang="scss">
  .filters {
    grid-row: span 2;
    display: grid;
    grid-auto-rows: max-content;
    row-gap: 30px;

    &__legend {
      margin-bottom: 12px;
      color: var(--darkgrey);
      font-size: 14px;
      line-height: 14px;
    }

    &__filter {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &:fist-child {
        margin-bottom: 14px;
      }
      &:nth-child(2) {
        margin-bottom: -16px;
      }
    }

    &__input-label {
      position: relative;
      &::before {
        position: absolute;
        left: 18px;
        top: 7px;
        font-size: 12px;
        line-height: 14px;
        color: var(--darkgrey);
      }
      &::after {
        content: '₽';
        position: absolute;
        right: 20px;
        bottom: 8px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        pointer-events: none;
      }
      &:nth-child(2)::before {
        content: 'От'
      }
      &:nth-child(3)::before {
        content: 'До'
      }
      &:not(:last-child) {
        margin-bottom: 14px;
      }
    }

    &__input {
      padding: 24px 40px 7px 18px;
      width: 228px;
      font-size: 16px;
      line-height: 24px;
      background: var(--pale-pink);
      border-radius: 1px;
    }
  }

  .color-list {
    display: flex;
    &__item:not(:last-child) {
      margin-right: 4px;
    }
  }

  /* v-select */
  .v-select {
    position: relative;
    &.vs--open .vs__selected {
      &::before {
      transform: translateX(4px) rotate(45deg);
      }
      &::after {
        transform: translateX(-4px) rotate(-45deg);
      }
    }
  }

  .vs__selected {
    position: relative;
    display: block;
    padding: 14px 18px;
    font-size: 16px;
    line-height: 24px;
    background-color: var(--pale-pink);
    border: 1px solid var(--pale-pink);
    border-bottom-color: var(--pale-border);
    &::before, &::after {
      content: '';
      position: absolute;
      top: calc(50%);
      width: 6px;
      height: 1px;
      border-radius: 50%;
      background-color: #000;
      transition: .25s ease-in-out;
      transition-property: transform, background-color;
    }
    &::before {
      right: 15px;
      transform: rotate(45deg);
    }
    &::after {
      right: 11px;
      transform: rotate(-45deg);
    }
  }
  .vs__search, .vs__actions {
    display: none;
  }

  .vs__dropdown-option {
    display: block;
    padding: 14px 18px 11px;
    background-color: var(--pale-pink);
    transition: background-color .25s ease-in-out;
    cursor: pointer;
  }
  @media screen and (any-hover: hover) {
  .vs__dropdown-option:hover {
    background-color: var(--pale-border);
  }
}

.vs__dropdown-menu {
  position: absolute;
  width: 100%;
  z-index: 2;
}

</style>
