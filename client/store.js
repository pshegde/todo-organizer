import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    category: '',
    items: {}
  },
  mutations: {
    setCategories(state, val) {
      state.categories = val
    },
    setCategory(state, val) {
      state.category = val
    },
    setItems(state, val) {
      state.items = val
    }
  },
  actions: {
    async fetchCategories({ commit }, params) {
      commit('setCategories', ['work', 'prep', 'personal'])
    },
    async fetchItems({ commit, state }) {
      commit('setItems', { work: ['meeting', 'server side code'] })
    }
  },
  getters: {
    category(state) {
      return state.category
    },
    categories(state) {
      return state.categories
    },
    items(state) {
      return state.items
    }
  }
})
