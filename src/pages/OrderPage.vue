<!-- eslint-disable -->
<template>
  <main class="order-page container">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="link-under common-font"  :to="{name: 'catalog'}" href="#">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <span class="common-font" >
          &mdash;
        </span>
      </li>
      <li class="breadcrumbs__item">
        <router-link class="link-under common-font"  :to="{name: 'cart'}" href="#">
          Корзина
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <span class="common-font">
          Оформление заказа
        </span>
      </li>
    </ul>
    <h1 class="order-page__title">Оформление заказа</h1>
    <h2 v-if="products.length < 1">Похоже, корзина пуста</h2>
    <form class="order-page__form" @submit.prevent="submitForm" v-if="products.length > 0" autocomplete="true">
      <fieldset class="order-page__fields">
        <label class="order-page__field-label empty">
          <span class="order-page__field-placeholder">ФИО</span>
          <input class="order-page__field" :class="{ invalid: nameError }" v-model.trim="nameValue" @focus="resetNameError" @blur="setEmpty">
          <span class="validation-error" v-if="nameError">{{ nameError }}</span>
        </label>
        <label class="order-page__field-label empty" >
          <span class="order-page__field-placeholder">Адрес доставки</span>
          <input class="order-page__field" :class="{ invalid: addressError }" v-model.trim="addressValue"  @focus="resetAddressError" @blur="setEmpty">
          <span class="validation-error" v-if="addressError">{{ addressError }}</span>
        </label>
        <label class="order-page__field-label half-width empty">
          <span class="order-page__field-placeholder">Телефон</span>
          <input class="order-page__field" :class="{ invalid: phoneError }" v-model.trim="phoneValue" @focus="resetPhoneError" @blur="setEmpty">
          <span class="validation-error" v-if="phoneError">{{ phoneError }}</span>
        </label>
        <label class="order-page__field-label half-width empty">
          <span class="order-page__field-placeholder">Email</span>
          <input class="order-page__field" :class="{ invalid: emailError }" v-model.trim="emailValue" @focus="resetEmailError" @blur="setEmpty">
          <span class="validation-error" v-if="emailError">{{ emailError }}</span>
        </label>
        <label class="order-page__field-label empty" >
          <span class="order-page__field-placeholder">Комментарий к заказу</span>
          <textarea class="order-page__field" rows="4"  v-model.trim="commentsValue"  @focus="removeEmpty" @blur="setEmpty"></textarea>
        </label>
      </fieldset>

      <OrderList :products="products" :delivery="currentDelivery" :total-price="totalPrice">
        <button class="order-page__submit-btn btn btn-primary" type="submit">Оформить заказ</button>
      </OrderList>

      <div class="order-page__options" v-if="deliverData">
        <fieldset class="order-page__option">
          <h2 class="order-page__option-name">Доставка</h2>
          <label class="order-page__radio-label" v-for="deliver in deliverData" :key="`deliver_${deliver.id}`">
            <input class="order-page__radio-input visually-hidden" type="radio" name="delivery"  :value="deliver.id" v-model="productDelivery">
            <span class="order-page__radio-inner">
              <span class="order-page__radio-sign"></span>
              {{ deliver.title }} {{ deliver.price | numberFormat }} ₽
            </span>
          </label>
        </fieldset>
        <fieldset class="order-page__option" v-if="paymentData">
          <h2 class="order-page__option-name">Оплата</h2>
          <label class="order-page__radio-label" v-for="payment in paymentData" :key="`payment_${payment.id}`">
            <input class="order-page__radio-input visually-hidden" type="radio" name="pay" :value="payment.id" v-model="productPaySource">
            <span class="order-page__radio-inner">
              <span class="order-page__radio-sign"></span>
              {{ payment.title }}
            </span>
          </label>
        </fieldset>
      </div>
      <div class="order-page__error-block error-in-frame" v-if="orderError">
        <h2 class="order-page__error-title" v-if="orderErrorTitle">{{ orderErrorTitle }}</h2>
        <p class="order-page__error-message">{{ orderErrorMessage }}</p>
      </div>
    </form>
  </main>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import {API_BASE_URL} from '@/data/config';
import OrderList from '@/components/order/OrderList';
import {mapGetters, mapMutations} from 'vuex';
import numberFormat from '@/helpers/numberFormat';
  export default {
    name: 'order-page',
    components: {OrderList},
    data() {
      return {
        productDelivery: null,
        productPaySource: null,
        nameValue: "",
        addressValue: "",
        phoneValue: "",
        emailValue: "",
        commentsValue: "",
        nameError: false,
        addressError: false,
        phoneError: false,
        emailError: false,
        commentsError: false,

        deliverData: null,
        deliverLoadingFailed: false,

        paymentData: null,
        paymentLoadingFailed: false,


        orderErrorTitle: null,
        orderErrorMessage: null,
      }
    },
    computed: {
      ...mapGetters({totalPrice: 'cartTotalPrice'}),
      products() {
        return  this.$store.state.cartProductsData;
      },
      productsAmount(){
        return this.products().length
      },
      currentDelivery(){
        return this.deliverData ? this.deliverData.find(item => item.id === this.productDelivery) : null;
      },
      currentPayment(){
        return this.paymentData ? this.paymentData.find(item => item.id === productPaySource).title : null;
      },
      formValidity(){
        return (this.nameError || this.phoneError || this.emailError || this.addressError) ? false : true;
      },
      orderError() {
        return this.orderErrorMessage ? true : false;
      },
    },
    methods: {
      ...mapMutations(['clearCart']),
      async submitForm() {
        this.orderErrorMessage = null;
        this.formValidation();
        if (this.productPaySource === null) {
          this.orderErrorMessage = "Пожалуйста, выберите способ оплаты и доставки";
          setTimeout(this.resetOrderErrorMessage, 4000);
        } else if (this.formValidity) {
          const response = await this.sendOrder();

          if(response) {
            this.clearCart();
            this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
          } else {
            this.orderErrorMessage = "Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.";
            console.log('отправка заказа неудачна');
          }
        } else {
          document.querySelector('.order-page__form').scrollIntoView({behavior: 'smooth',block: 'start',});
        }
      },
      formValidation() {
        const validLetters = /^[А-Яа-яA-Za-z ]+$/;
        const numbers = /^\d+$/;
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if(this.nameValue === "") {
          this.nameError = "Заполните поле";
        } else if (!this.nameValue.match(validLetters)) {
          this.nameError = "допустимы только буквы";
        }

        if(this.addressValue === "") {
          this.addressError = "Заполните поле";
        }

        if(this.phoneValue === "") {
          this.phoneError = "Заполните поле";
        } else if (this.phoneValue.length !== 10) {
          this.phoneError = "введите номер в 10-значном формате";
        } else if (!this.phoneValue.match(numbers)) {
          this.phoneError = "допустимы только цифры";
        }

        if(this.emailValue === "") {
          this.emailError = "Заполните поле";
        } else if (!this.emailValue.match(EMAIL_REGEXP)) {
          this.emailError = "неверный формат";
        }
      },
      removeEmpty(event) {
        event.target.closest('.order-page__field-label').classList.remove('empty')
      },
      setEmpty(event) {
        if(event.target.value.trim() === "") {
          event.target.closest('.order-page__field-label').classList.add('empty');
        }
      },
      resetNameError(e){
        this.removeEmpty(e);
        this.nameError = false;
      },
      resetPhoneError(e){
        this.removeEmpty(e);
        this.phoneError = false;
      },
      resetEmailError(e){
        this.removeEmpty(e);
        this.emailError = false;
      },
      resetAddressError(e){
        this.removeEmpty(e);
        this.addressError = false;
      },
      resetOrderErrorMessage() {
        this.orderErrorMessage = null;
      },
      loadDeliver(){
        this.deliverLoadingFailed = false;
        axios.get(API_BASE_URL + '/api/deliveries/')
        .then(response => {
          this.deliverData = response.data;
        })
        .catch(() => this.deliverLoadingFailed = true);
      },
      getPaymentData(){
        if (this.currentDelivery) {
          this.paymentLoadingFailed = false;
          axios.get(API_BASE_URL + '/api/payments/', {params: {deliveryTypeId: this.productDelivery}})
          .then(response => {
            this.paymentData = response.data;
          })
          .catch(() => this.paymentLoadingFailed = true);
        }
      },
      async sendOrder(){
       let result;
        try {
          let phoneNum = "+7" + this.phoneValue;

          result = await axios.post(API_BASE_URL+'/api/orders',
            {
              name: this.nameValue,
              address: this.addressValue,
              phone: phoneNum,
              email: this.emailValue,
              deliveryTypeId: this.productDelivery,
              paymentTypeId: this.productPaySource,
              comment: this.commentValue
            }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            }
          });
        } catch(error) {
          console.log('error',error);
        }
        return result;
      },
    },
    filters: {numberFormat},
    created(){
      this.loadDeliver();
    },
    watch: {
      productDelivery() {
        this.getPaymentData();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-page {
    padding-bottom: 124px;

    &__title {
      margin-bottom: 5px;
      font-weight: 800;
      font-size: 24px;
      line-height: 225%;
      text-transform: uppercase;
    }

    &__form {
      display: grid;
      grid-auto-flow: dense;
      grid-template-columns: 1fr 370px;
      gap: 50px 30px;
    }

    &__fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    &__field-label {
      position: relative;
    }
    &__field-label:not(.half-width) {
      grid-column: span 2;
    }

    &__field-placeholder {
      position: absolute;
      left: 20px;
      top: 0;
      color: var(--darkgreytwo);
      transform: translateY(13px);
      font-weight: 300;
      font-size: 10px;
      line-height: 14px;
      transition: .25s ease-in-out;
      transition-property: transform, font-size;
    }
    .empty .order-page__field-placeholder {
      font-size: 16px;
      transform: translateY(30px);
    }

    &__field {
      width: 100%;
      padding: 30px 20px 16px;
      border: 1px solid transparent;
      border-radius: 2px;
      background-color: var(--pale-pink);
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      resize: none;
      &.invalid {
        border-color: coral;
      }
    }

    &__options {
      grid-row: span 2;
    }

    &__option {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 30px;
      margin-bottom: 50px;
    }

    &__option-name {
      grid-column: span 2;
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 150%;
      text-transform: uppercase;
    }

    &__radio-label {
      position: relative;
      width: 100%;
    }

    &__radio-sign {
      position: relative;
      margin-right: 9px;
      width: 16px;
      height: 16px;
      border: 4px solid var(--white);
      border-radius: 8px;
      &::after {
        content: '';
        position: absolute;
        inset: -4px;
        border: 1px solid var(--black);
        border-radius: 8px;
        opacity: 1;
        transition: opacity .25s ease-in-out;
      }
    }

    &__radio-inner {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 38px 29px;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      border: 1px solid var(--btn-hover-color);
      border-radius: 2px;
      background-color: transparent;
      transition: background-color .25s ease-in-out;
      transition-property: color, background-color, border-color, opacity;
    }

    &__radio-input:checked + &__radio-inner &__radio-sign::after {
      opacity: 0;
    }

    &__radio-input:checked + &__radio-inner {
      color: var(--white);
      background-color: var(--pink);
      border-color: transparent;
    }
    &__radio-input:focus-visible + &__radio-inner {
      border-color: var(--black);
    }

    &__error-block {
      align-self: flex-start;
    }

    &__error-title {
      margin-bottom: 3px;
      font-weight: 500;
      font-size: 17px;
      line-height: 24px;
      color: var(--pink);
    }

    &__error-message {
      font-size: 13px;
      line-height: 140%;
      color: var(--ultrablack);
    }
  }

  .validation-error {
    position: absolute;
    top: 74px;
    left: 0;
    width: 100%;
    padding: 4px 12px;
    color: coral;
    pointer-events: none;
  }

  @media screen and (any-hover: hover) {
    .order-page__radio-inner:hover {
      background-color: var(--btn-hover-color);
      border-color: rgba(222, 222, 222, .2);
    }
    .order-page__radio-input:checked + .order-page__radio-inner:hover {
      opacity: .5;
    }
  }

  @media (max-width: 1225px) {
    .order-page {
      &__form {
        grid-template-columns: 100%;
      }
      &__options {
        grid-row: unset;
      }
      &__submit-btn {
        display: block;
        margin: 0 auto;
      }
    }
  }
  @media (max-width: 860px) {
    .order-page {
      padding-bottom: 40px;
      &__field-label.half-width {
        grid-column: span 2;
      }
      &__radio-inner {
        padding: 12px 15px;
      }
    }
  }
  @media (max-width: 620px) {
    .order-page {
      &__option {
        grid-template-columns: 1fr;
        gap: 10px 20px;
        margin-bottom: 25px;
      }
      &__option-name {
        grid-column: unset;
      }
    }
  }
</style>
