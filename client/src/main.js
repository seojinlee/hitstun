import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { sync } from 'vuex-router-sync'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import './App.css'

Vue.config.productionTip = false
Vue.use(Buefy)
sync(store, router)

const socketConnection = SocketIO('http://localhost:5000')

Vue.use(new VueSocketIO ({
  debug: true,
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
