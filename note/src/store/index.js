import Vue from 'vue'
import Vuex from 'vuex' 
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userinfo:{
            _id:'',
            avatar: '',
            email:'',
            username:'',
            password:'',
        }
    },
    mutations: {
        'CHANGEINFO'(state,payload) { 
            state.userinfo = payload
        }
    },
    actions: {},
    plugins: [createPersistedState({
        storage: {
          getItem: key => sessionStorage.getItem(key),
          setItem: (key, value) =>
            sessionStorage.setItem(key, value),
          removeItem: key => sessionStorage.removeItem(key),
        },
      })],
  })

  export default store