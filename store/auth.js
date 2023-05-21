/**
 * @author: pujiermanto@gmail.com
 * @globals: method reusable for any component and any source
*/

export const strict = false;
export const state = () => ({
  endPoint: process.env.NUXT_ENV_API_URL,
  token: {},
  expired: {}
});

export const mutations = {
  SAVE_LOGIN(state, data) {
    state.token = localStorage.setItem("auth", JSON.stringify({ token: data }));
  },
  SAVE_EXPIRED(state, data) {
    state.expired = localStorage.setItem('expired_at', JSON.stringify({data: data}))
  },
  GET_TOKEN(state, key) {
    state.token = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
  },
  REMOVE_TOKEN(state, key) {
    localStorage.removeItem(key);
  },
  REMOVE_EXPIRED(state, key) {
    localStorage.removeItem(key)
  }
};

export const actions = {
  storeAuthLogin({ commit }, data) {
    commit("SAVE_LOGIN", data);
  },
  storeExpiredLogin({commit}, data) {
    commit("SAVE_EXPIRED", data)
  },
  storeAuthToken({ commit }, key) {
    commit("GET_TOKEN", key);
  },
  removeAuthToken({ commit }, key) {
    commit("REMOVE_TOKEN", key);
  },
  removeExpiredLogin({commit}, key) {
    commit("REMOVE_EXPIRED", key);
  }
};

export const getters = {
  getAuthToken(state) {
    return state.token;
  },
  getExpired(state) {
    return state.expired
  }
};
