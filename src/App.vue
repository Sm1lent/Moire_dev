<!-- eslint-disable -->
<template>
  <div>
    <header class="header">
      <div class="container header__container">
        <router-link class="header__catalog-link link" :to="{name: 'catalog'}">Каталог</router-link>
        <a class="header__logo" href="" >
          <img src="img/svg/logo.svg" alt="Логотип интернет-магазина Moire">
        </a>
        <div class="header__content">
          <a class="header__tel common-font link" href="tel:8 800 600 90 09">8 800 600 90 09</a>
          <button class="header__search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2239 3.09729C16.0203 5.89367 16.0203 10.4275 13.2239 13.2239C10.4275 16.0203 5.89367 16.0203 3.09729 13.2239C0.300904 10.4275 0.300904 5.89367 3.09729 3.09729C5.89367 0.300904 10.4275 0.300904 13.2239 3.09729ZM13.9524 13.9095C17.1179 10.7209 17.1107 5.56993 13.931 2.39018C10.7441 -0.796727 5.57709 -0.796727 2.39018 2.39018C-0.796727 5.57709 -0.796727 10.7441 2.39018 13.931C5.56993 17.1107 10.7209 17.1179 13.9095 13.9524L13.2096 14.6523L18.2587 19.7014C18.6571 20.0998 19.303 20.0998 19.7013 19.7014C20.0997 19.303 20.0997 18.6572 19.7013 18.2588L14.6522 13.2097L13.9524 13.9095Z" fill="black"/>
            </svg>
          </button>
          <cartIndicator />
        </div>
      </div>
    </header>

    <router-view />

    <footer class="footer">
      <div class="container footer__container">
        <router-link class="footer__nav-link footer__nav-link_catalog link" :to="{name: 'catalog'}">Каталог</router-link>
        <a class="footer__nav-link footer__nav-link_sale link" href=#>Распродажа</a>
        <a class="common-font footer__nav-link_phone link" href="tel:8 800 600 90 09">8 800 600 90 09</a>
        <a class="footer__recall-link link" href="">Заказать звонок</a>
        <a class="footer__mail common-font link" href="mailto:hello@moire.com">hello@moire.com</a>
        <ul class="footer__social social">
          <li>
            <a class="social__link" href="#" aria-label="Вконтакте">
              <svg width="20" height="11" fill="currentColor">
                <use href="#icon-vk"></use>
              </svg>
            </a>
          </li>
          <li>
            <a class="social__link" href="#" aria-label="Инстаграм">
              <svg width="17" height="17" fill="currentColor">
                <use href="#icon-insta"></use>
              </svg>
            </a>
          </li>
          <li>
            <a class="social__link" href="#" aria-label="Facebook">
              <svg width="17" height="17" fill="currentColor">
                <use href="#icon-facebook"></use>
              </svg>
            </a>
          </li>
          <li>
            <a class="social__link" href="#" aria-label="Twitter">
              <svg width="17" height="14" fill="currentColor">
                <use href="#icon-twitter"></use>
              </svg>
            </a>
          </li>
          <li>
            <a class="social__link" href="#" aria-label="Telegram">
              <svg width="19" height="17" fill="currentColor">
                <use href="#icon-telegram"></use>
              </svg>
            </a>
          </li>
        </ul>
        <p class="note footer__note">Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.</p>
        <div class="footer__bottom-block">
          <span class="footer__copy common-font">© 2020 Moire</span>
          <a class="footer__politics-link common-font link" href="#">Политика конфиденциальности</a>
          <a class="common-font link" href="#">Публичная оферта</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
  import CartIndicator from '@/components/cart/CartIndicator.vue';
  import {mapActions, mapMutations} from 'vuex';

	export default{
    components: { CartIndicator },
    name: 'app',
    methods: {
      ...mapActions(['loadCart']),
      ...mapMutations(['updateUserAccessKey'])
    },
    created() {
      const userAccessKey = localStorage.getItem('userAccessKey');
      if (userAccessKey) {
        this.updateUserAccessKey(userAccessKey);
      }
      this.loadCart();
    }
	}
</script>

<style lang="scss">
  .header {
    &__container {
      position: relative;
      padding: 27px 0 21px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--grey) solid 1px;
    }

    &__catalog-link {
      margin-right: 168px;
      font: 400 12px/24px Geometria;
      text-transform: uppercase;
    }

    &__logo {
      width: 116px;
      height: 34px;
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__tel {
      margin-right: 41px;
    }

    &__search-btn {
      width: 20px;
      height: 20px;
      margin-right: 26px;
    }
  }

  .footer {
    &__container {
      display:grid;
      padding: 60px 0;
      grid-template-columns: repeat(3, auto) 1fr;
      grid-template-areas: "catalog phone mail social"
                            "sale    callback . ."
                            "note note note note"
                            "copy copy copy copy";
      align-items: center;
      gap: 20px 75px;
      border-top: var(--grey) solid 1px;
    }

    &__nav-link {
      font-size: 14px;
      line-height: 24px;
      &_catalog {
        grid-area: catalog;
      }
      &_phone {
        grid-area: phone;
      }

      &_sale {
        grid-area: sale;
      }
    }

    &__recall-link {
      grid-area: callback;
      font: 500 14px/20px Geometria;
      border-bottom: 1px solid var(--pink);
    }

    &__mail {
      grid-area: mail;
    }

    &__bottom-block {
      grid-area: copy;
      display: flex;
      width: 100%;
    }

    &__note {
      width: Min(100%, 570px);
      grid-area: note;
    }

    &__copy {
      margin-right: auto;
    }

    &__politics-link {
      margin-right: 78px;
    }

    .link {
      width: max-content;
    }
  }

  .social {
    grid-area: social;
    justify-self: end;
    align-self: start;
    padding: 4px 0;
    display: grid;
    grid-auto-flow: column;
    gap: 30px;
    color: var(--grey);

    &__link {
      position: relative;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        position: absolute;
        content: '';
        inset: -3px;
        border: 1px solid transparent;
        border-radius: 4px;
        transition: border-color .25s ease-in-out;
      }
      &:focus-visible::after {
        border-color: var(--pink);
      }
    }
    @media screen and (any-hover: hover) {
      .social__link:hover {
        color: var(--pink)
      }
    }
    .social__link:active {
      color: var(--active-color)
    }
  }

  .note {
    font-size: 14px;
    line-height: 20px;
    color: var(--note-color);
  }

  @media (max-width: 860px) {
    .header {
      &__catalog-link {
        margin-right: 0;
      }
      &__tel, &__search-btn {
        display: none;
      }
    }
    .footer {
      &__container {
        padding: 30px 0;
        grid-template-columns: repeat(3, auto);
        gap: 15px 35px;
        grid-template-areas: "catalog phone mail"
                              "sale    callback . "
                              "social social social"
                              "note note note"
                              "copy copy copy";
      }
    }
    .social {
      justify-self: center;
    }
  }

  @media (max-width: 620px) {
    .footer {
      &__container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      &__bottom-block {
        flex-direction: column-reverse;
        align-items: flex-start;
        gap: 15px;
      }
    }
    .social {
      width: 100%;
      justify-content: center;
    }
  }
</style>
