import { createStore } from 'vuex';

export default new createStore({
  state: {
    isAuthenticated: false, // Initialize to false
  },
  mutations: {
    // Mutation to set the authentication state
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    // Action to set the authentication state
    setAuthentication({ commit }, isAuthenticated) {
      commit('setAuthentication', isAuthenticated);
    },
  },
  modules: {
    // You can add modules if needed
  },
});
