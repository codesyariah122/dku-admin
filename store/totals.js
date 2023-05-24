/**
 * @author: pujiermanto@gmail.com
 * @globals: method reusable for any component and any source
 */

import axios from "axios";

export const strict = false;

export const state = () => ({
  api_url: process.env.NUXT_ENV_API_URL,
  totalUser: 0,
  userPerRole: {},
  totalCampaign: 0,
  dataCampaign: {},
  userisonline: 0,
});

export const mutations = {
  TOTAL_DATA_USER(state, data) {
    state.totalUser = data;
  },
  TOTAL_USER_ONLINE(state, data) {
    state.userisonline = data;
  },
  USER_PER_ROLE(state, data) {
    state.userPerRole = data;
  },
  TOTAL_DATA_CAMPAIGN(state, data) {
    state.totalCampaign = data;
  },
  DATA_CAMPAIGN(state, data) {
    state.dataCampaign = data
  }
};

export const actions = {
  totalUserOnline({ commit }, param) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${param.token.token}`,
      },
    };
    const endPoint = `${param.api_url}/fitur/user-online`;
    this.$axios
      .get(endPoint, config)
      .then(({ data }) => {
        commit("TOTAL_USER_ONLINE", data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  totalDataQuery({ commit }, param) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${param.token.token}`,
      },
    };
    const endPoint = `${param.api_url}/fitur/total-data?type=${param.type}`;
    this.$api
      .get(endPoint, config)
      .then(({ data }) => {
        switch (param.type) {
          case "TOTAL_USER":
            commit("TOTAL_DATA_USER", data?.total);
            commit("USER_PER_ROLE", data?.data);
            break;

          case "TOTAL_CAMPAIGN":
            commit("TOTAL_DATA_CAMPAIGN", data?.total);
            commit("DATA_CAMPAIGN", data?.data);
            break;

          default:
            console.log("No Param Type");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export const getters = {
  getTotalUser(state) {
    return state.totalUser;
  },
  getTotalCampaign(state) {
    return state.totalCampaign;
  },
  getDataCampaign(state) {
    return state.dataCampaign;
  },
  getUserPerRole(state) {
    return state.userPerRole;
  }
};
