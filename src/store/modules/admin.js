const state = {
  dataAdmin: null
}
const actions = {
  LOGIN: ({ commit, state }, queryData) => {
    console.log('1', queryData)
    console.log('2', state.user)

    commit('saveUser', queryData)

    const myUser = {
      name: 'null'
    }
    commit('save', myUser)
  }
}
const mutations = {
  SET_ADMIN (state, payload) {
    console.log('check', payload)
    console.log(state.dataAdmin)
    state.dataAdmin = payload
  }
}
const getters = {
  getName: state => {
    return ''
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
