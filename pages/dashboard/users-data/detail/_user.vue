<template>
  <div class="flex flex-wrap">
  	<div class="w-full lg:w-12/12 px-4">
  		<cards-card-detail-data 
  			:detail="detail"
  			type="users-data"
  		/>
  	</div>
  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

export default {
	name: 'detail-user',
	layout: 'admin',

	async asyncData({params, $api}) {
		const store = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		const {token} = store;
		const {user} = params;
		const endPoint = `/fitur/user-management/${user}`;

		$api.setHeader('Authorization', `Bearer ${token}`);
		$api.defaults.headers.common['Content-Type'] = 'application/json';
		$api.defaults.headers.common['Dku-Api-Key'] = process.env.NUXT_ENV_APP_TOKEN;

		const response = await $api.$get(endPoint);
		const detail = response?.data;

		return {
			detail
		}
	}
}
</script>
