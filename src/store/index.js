import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      score: 3000
    },
    token: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.face
      state.token = payload.token
    },
    resetUser(state) {
      state.user = {
        id: 0,
        score: 0
      }
      state.token = ''
    },
    increaseScore(state, payload = 50) {
      state.user.score += payload
    },
    reduceScore(state, payload) {
      state.user.score -= payload
    }
  },
  actions: {
  },
  modules: {
  }
})
