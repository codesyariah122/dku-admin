/**
 * @author: pujiermanto@gmail.com
 */

export const strict = false;

export const state = () => ({
  success_data: {},
  form_data: {}
});

export const mutations = {
  SAVED_SUCCESS(state, data) {
    state.success_data = localStorage.setItem("success-form", JSON.stringify({ data: data }));
  },
  GET_SUCCESS(state, key) {
    state.form_data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
  },
  REMOVE_SUCCESS(state, key) {
    localStorage.removeItem(key)
  }
};

export const actions = {
  storeSuccessFormData({commit}, data) {
    commit('SAVED_SUCCESS', data);
  },
  storedFormData({commit}, key) {
    commit('GET_SUCCESS', key);
  },
  removeStoreSuccess({commit}, key) {
    commit('REMOVE_SUCCESS', key);
  }
};

export const getters = {
  formData(state) {
    return state.form_data
  }
};
