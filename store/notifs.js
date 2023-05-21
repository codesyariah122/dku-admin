/**
 * @author: pujiermanto@gmail.com
 * @globals: method reusable for any component and any source
*/

import axios from 'axios';

export const strict = false;

export const state = () => ({
  notifs: []
});

export const mutations = {
  getNotifications: (state, event) => {
  	state.notifs.push(event[0])
  }
};

export const actions = {
	getNotificationMessage({commit}) {
		window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen("EventNotification", (e) => {
			commit('getNotifications', e);
		});
	}
};

export const getters = {
	notificationMessage(state) {
		return state.notifs
	}
}
