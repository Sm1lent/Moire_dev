<!-- eslint-disable -->
<template>
  <main class="catalog container">
    <div class="catalog__title-wrap">
      <h1 class="main-title">Каталог</h1>
      <span class="catalog__products-quantity">{{productsQuantity}} {{quantityNaming}}</span>
      <button class="catalog__filter-control btn btn-primary" @click="toggleFilter">{{ filterControlText }}</button>
    </div>
    <ProductFilter :show="!isFilterHidden" :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :choosen-category.sync="choosenCategory" :choosen-colors.sync="choosenColors" :choosen-materials.sync="choosenMaterials" :choosen-seasons.sync="choosenSeasons" />
    <BaseSpinner v-if="productsLoading" />
    <ProductList v-if="productsData" :products="products" />
    <h2 class="status-report" v-if="productsLoadingFailed">Извините, загрузить товары не удалось</h2>
    <BasePagination v-model="page" :count="productsQuantity" :per-page="productsPerPage" />
  </main>
</template>

<script>
/* eslint-disable */
  import ProductFilter from '@/components/product/ProductFilter';
  import ProductList from '@/components/product/ProductList';
  import BasePagination from '@/components/base/BasePagination';
  import BaseSpinner from '@/components/base/BaseSpinner';
  import axios from 'axios';
  import {API_BASE_URL} from '@/data/config';

	export default {
		name: 'catalog',
    components: {
      ProductFilter,
      ProductList,
      BasePagination,
      BaseSpinner,
    },
    data() {
      return {
        page: 1,
        productsPerPage: 12,
        filterPriceFrom: 0,
        filterPriceTo: 0,
        choosenCategory: {id: 0, title: 'Все товары'},
        choosenColors: [],
        choosenMaterials: [],
        choosenSeasons: [],

        isFilterHidden: false,

        productsData: null,
        productsLoading: false,
        productsLoadingFailed: false,

      };
    },
    computed: {
      products() {
        return this.productsData ? this.productsData.items : [];
      },
      productsQuantity(){
        return this.productsData ? this.productsData.pagination.total : 0;
      },
      quantityNaming(){
        if (4 > this.productsQuantity < 21) {
          return 'товаров';
        } else {
          const lastNum = this.productsQuantity.toString().slice(-1);
          switch(lastNum){
            case '1': return 'товар';
            case '2': return 'товара';
            case '3': return 'товара';
            case '4': return 'товара';
            default: return 'товаров';
          };
        }
      },
      filterControlText(){
        return this.isFilterHidden ? "Показать фильтры" : "Скрыть фильтры";
      },
    },
    methods: {
      updateProductsPerPage() {
        const viewport = document.body.offsetWidth;
        if (viewport > 1550) {
          this.productsPerPage = 12;
        } else if (viewport < 620) {
          this.productsPerPage = 2;
        } else {
          this.productsPerPage = 6;
        }
      },
      loadProducts(){
        this.productsLoading = true
        this.productsLoadingFailed = false
        clearTimeout(this.loadProductsTimer)        //чтобы не посылать трижды один и тот же запрос,если фильтров будет активировано несколько (3)
        this.loadProductsTimer = setTimeout(() => { //чтобы не посылать трижды один и тот же запрос,если фильтров будет активировано несколько
          axios.get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.choosenCategory.id,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorIds: this.getIds(this.choosenColors),
              materialIds: this.getIds(this.choosenMaterials),
              seasonIds: this.getIds(this.choosenSeasons),
            }
          })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
        }, 0);
      },
      getIds(array){
        let idList =[];
        for(let item of array){
          idList.push(item.id);
        }
        return idList;
      },
      toggleFilter(){
        this.isFilterHidden = !this.isFilterHidden;
      },
    },
    watch: {
      productsPerPage(){
        this.loadProducts();
      },
      page(){
        this.loadProducts();
      },
      filterPriceFrom(){
        this.loadProducts();
      },
      filterPriceTo(){
        this.loadProducts();
      },
      choosenColors(){
        this.loadProducts();
      },
      choosenMaterials(){
        this.loadProducts();
      },
      choosenCategory(){
        this.loadProducts();
      },
      choosenSeasons(){
        this.loadProducts();
      },
    },
    created(){
      this.updateProductsPerPage();
      this.loadProducts();
      window.addEventListener('resize', ()=> {
        this.updateProductsPerPage();
        const viewport = document.body.offsetWidth;
        if (viewport > 1225) {
          this.isFilterHidden = false;
        } else {
          this.isFilterHidden = true;
        }
      })
    }
	}
</script>

<style lang="scss">
  .main-title {
    display: inline-block;
    margin-right: 16px;
    font: 800 24px/54px Geometria;
    text-transform: uppercase;
  }

  .catalog {
    padding: 47px 0 95px;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 30px 64px;

    &__title-wrap {
      width: 100%;
      grid-column: span 2;
      display: flex;
      align-items: center;
    }

    &__products-quantity {
      font-weight: 300;
      font-size: 16px;
      line-height: 22px;
      color: var(--grey);
    }

    &__filter-control {
      display: none;
    }
  }

  @media (max-width: 1225px) {
    .catalog {
      position: relative;
      grid-template-columns: 100%;
      &__title-wrap {
        grid-column: span 1;
        flex-wrap: wrap;
      }
      &__filter-control {
      display: flex;
      justify-content: center;
      min-width: 214px;
      margin-left: auto;
    }
    }
  }
</style>
