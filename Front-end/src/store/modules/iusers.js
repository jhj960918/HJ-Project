import http from '@/utils/http'

const state = {
  listData: null,
  detail: null,
  totalPage: null,
  isAuth: false
  
  /*  putDetail:null */
};

const getters = {
  getIsAuth: state => state.isAuth
};

const actions = {
  getList({ commit }, data) {
    return http.process("user", "list", { page: data }).then(data => {
      commit("setListData", data);
    })
  },
  getUser({ commit }, data) {
    return http.process("user", "item", { id: data }).then(data => {
      commit("setDetail", data.data);
    })
  },
  putUser({ commit }, data) {
  //  console.log(data)
   // let params = { id: 1, name: 'test' };
    return http.process("user", "update", data).then(data => {
      commit("setDetail", data);
      //commit("setDetail", data);
      //  dispatch('getUser', data)
      //state.detail = Object.assign({}, state.detail, data);
    })
  },
  removeUser({ commit }, data) {
    return http.process("user", "delete", { id: data }).then(data => {
      commit("setDetail", data);
      /* let idx = listData.data.findIndex(v=>v.id == data)
      if(found != -1) {
        listData.data = listData.data.splice(idx, 1)
      } */
    })
  },
  removeSelect({ commit }, data) {
    return http.process("user", "delete", { id: data }).then(data => {
      commit("setListData", data);
    })
  },
  resetState({ commit }) {
    commit('reset')
  },
  addList({ commit }, data) {
    return http.process("user", "add", data).then(data => {
      commit("addListData", data);
    })
  },
};

const mutations = {
  setListData(state, data) {
    state.listData = data;
    state.totalPage = data.total_pages;
  },
  setDetail(state, data) {
    state.detail = data;
  },
  /* updateDetail(state, data) {
    state.putDetail = data;
  }, */
  addListData(state, data) {
    //state.listData.push(data);
    if (state.listData) {
      state.listData.data = [...state.listData.data, data]
    }
  },
  reset(state) {
    state.detail = null
  }

};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
