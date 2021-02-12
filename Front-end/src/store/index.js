import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import iusers from './modules/iusers'
import jusers from './modules/jusers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users, iusers,jusers
  }
})
