import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged : false
  },
  mutations: {
    clearToken() {
      localStorage.clear()
    },
    isLogged(state, view) {
      state.logged = view.$route.name != 'Login'
    }
  },
  actions: {
  },
  modules: {
  }
})
