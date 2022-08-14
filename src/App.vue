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
          <router-link class="header__cart-link"  aria-label="Корзина товаров"  :to="{name: 'catalog'}">
            <svg width="19" height="24">
              <use href="#icon-cart"></use>
            </svg>
            <span class="header__cart-count" aria-label="Количество товаров">3</span>
          </router-link>
        </div>
      </div>
    </header>

    <router-view />

    <footer class="footer">
      <div class="container footer__container">
        <div class="footer__left-block">
          <div class="footer__links-wrap">
            <ul class="footer__nav footer__cell">
              <li>
                <router-link class="footer__nav-link link" :to="{name: 'catalog'}">Каталог</router-link>
              </li>
              <li>
                <a class="footer__nav-link link" href=#>Распродажа</a>
              </li>
            </ul>
            <div class="footer__phone-block footer__cell">
              <a class="common-font link" href="tel:8 800 600 90 09">8 800 600 90 09</a>
              <a class="footer__recall-link link" href="">Заказать звонок</a>
            </div>
            <a class="footer__mail common-font link" href="mailto:hello@moire.com">hello@moire.com</a>
          </div>
          <p class="note">Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.</p>
        </div>
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
	export default{
    name: 'app',
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

    &__cart-link {
      position: relative;
      margin-right: 6px;
    }

    &__cart-count {
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

  .common-font {
    font-size: 14px;
    line-height: 24px;
  }

  .footer {
    &__container {
      display:grid;
      padding: 60px 0;
      grid-template-columns: 570px 1fr;
      gap: 48px 25px;
      border-top: var(--grey) solid 1px;
    }

    &__links-wrap {
      display: flex;
      margin-bottom: 30px;
    }

    &__cell {
      display: grid;
      width: max-content;
      align-items: start;
      gap: 20px;
    }

    &__nav {
      margin-right: 75px;
    }

    &__nav-link {
      font-size: 14px;
      line-height: 24px;
    }

    &__phone-block {
      margin-right: 80px;
    }

    &__recall-link {
      font: 500 14px/20px Geometria;
      border-bottom: 1px solid var(--pink);
    }

    &__mail {
      align-self: start;
    }

    &__bottom-block {
      grid-column: span 2;
      display: flex;
      width: 100%;
    }

    &__copy {
      margin-right: auto;
    }

    &__politics-link {
      margin-right: 78px;
    }
  }

  .social {
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
</style>
