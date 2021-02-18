const state = {
  dataUser: {
    email: null
  }
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
  saveUser (state, payload) {
    console.log('check', payload)
    console.log(state.dataUser)
    state.dataUser.email = payload
  }
}
const getters = {
  getName: state => {
    return state.user.name
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
