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
    playerState: null
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
    setPlayerState (state, playerState) {
      state.playerState = playerState
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setPlayerState ({commit}, playerState) {
      commit('setPlayerState', playerState)
    }
  }
})
