/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/data/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    cartProductsData: [],
  },
  getters: {
		cartTotalPrice(state, getters){
			return state.cartProductsData.reduce((acc, item) => (item.price * item.quantity) + acc, 0)
		},
  },
  mutations: {
		updateUserAccessKey(state, accessKey){
			state.userAccessKey = accessKey;
		},
		updateCartProductsData(state, items){
			state.cartProductsData = items
		},
    clearCart(state){
      state.cartProductsData = [];
    },
  },
  actions: {
    loadCart(context){
      axios.get(API_BASE_URL + '/api/baskets', {params: {userAccessKey: context.state.userAccessKey}})
      .then(response => {
        if(!context.state.userAccessKey){
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCartProductsData', response.data.items);
      })
    },
    sendProductToCart(context, {productId, colorId, sizeId, quantity}){
      return axios.post(API_BASE_URL + '/api/baskets/products', {
        productId,
        colorId,
        sizeId,
        quantity
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateCartProductsData', response.data.items);
        return response.status
      })
      .catch(error => {
        return error.response.status
      })
		},
		updateCartProductAmount(context, {basketItemId, quantity}){
			return axios.put(API_BASE_URL + '/api/baskets/products', {
        basketItemId,
        quantity
        }, {
				params: {
					userAccessKey: context.state.userAccessKey
				}
			})
			.then(response => {
				context.commit('updateCartProductsData', response.data.items);
			})
		},
    removeProductFromBasket(context, basketItemId){
			return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
				params: {
					userAccessKey: context.state.userAccessKey
				},
				data: {
					basketItemId
				},
			})
			.then((response) => {
				context.commit('updateCartProductsData', response.data.items);
        return true
			})
			.catch(()=> {
				console.log('smth went wrong');
        return false
			})
		},
  },
  modules: {
  },
});
