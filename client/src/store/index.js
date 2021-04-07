import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      paths: ['user', 'token', 'isUserLoggedIn']
    })
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    player: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setLoginState (state, bool) {
      if (bool) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setPlayer (state, player) {
      state.player = player
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setPlayer ({commit}, player) {
      commit('setPlayer', player)
    }
  }
})
