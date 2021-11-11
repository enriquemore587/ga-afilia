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
    isLogged(state) {
      // state.logged = view.$route.name != 'Login'
      state.logged = localStorage.getItem("token") != undefined && localStorage.getItem("token") != null
      &&  localStorage.getItem("token").length > 0
    }
  },
  actions: {
  },
  modules: {
  }
})
