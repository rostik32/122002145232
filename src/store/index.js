import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { storage } from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: null,
    filteredProducts: null,
    localeProducts: null,
    currency: 'UAH',
    sortBy: 'toLow',
    min: 1,
    max: 29999,
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },

    setFilteredProducts(state, payload) {
      state.filteredProducts = payload;
    },

    addProduct(state, payload) {
      state.products.push(payload);
    },

    setLocaleProducts(state, payload) {
      state.localeProducts = payload;
    },

    setSort(state, payload) {
      state.sortBy = payload;
    },

    setCurrency(state, payload) {
      state.currency = payload;
    },

    setMin(state, payload) {
      state.min = payload;
    },

    setMax(state, payload) {
      state.max = payload;
    },
  },

  actions: {
    async GET_PRODUCTS({ commit }) {
      try {
        const response = await axios.get('products.json');
        const localeProducts = storage.fetch('products') || [];
        const products = [...response.data.products, ...localeProducts];

        commit('setLocaleProducts', localeProducts);
        commit('setProducts', products);
        commit('setFilteredProducts', products);
      } catch (error) {
        console.log(error);
      }
    },

    addProduct({ state, commit, dispatch }, payload) {
      const products = state.localeProducts.slice(0);
      products.push(payload);
      storage.save(products, 'products');
      commit('setLocaleProducts', products);
      commit('addProduct', payload);
      dispatch('filterProducts');
    },

    filterProducts({ state, commit }) {
      const products = state.products.slice(0);
      const filteredProducts = products.filter(
        (item) => item.price >= state.min && item.price <= state.max
      );

      commit('setFilteredProducts', filteredProducts);
    },
  },

  getters: {
    products(state) {
      if (!state.filteredProducts) return [];
      let products = state.filteredProducts.slice(0);

      const sortMethods = {
        toHigh: (a, b) => a.price - b.price,
        toLow: (a, b) => b.price - a.price,
        alphabet: (a, b) => a.name.localeCompare(b.name),
      };

      return products.sort(sortMethods[state.sortBy]);
    },

    sortBy(state) {
      return state.sortBy;
    },

    currency(state) {
      return state.currency;
    },

    price: (state) => (value) => {
      const uahToUsd = 0.036;

      if (state.currency === 'USD') {
        return `${(+value * uahToUsd).toFixed(0)} USD`;
      }

      return `${value} UAH`;
    },

    min(state) {
      return state.min;
    },

    max(state) {
      return state.max;
    },
  },
});
