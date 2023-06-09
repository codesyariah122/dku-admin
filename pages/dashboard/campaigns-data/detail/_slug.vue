<template>
  <div class="flex flex-wrap">
  	<div class="w-full lg:w-12/12 px-4">
  		<cards-card-detail-data :detail="campaign" />
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
	name: 'detail-slug',
	layout: 'admin',

	async asyncData({params, $api}) {
		const store = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		const {token} = store;
		const {slug} = params;
		const endPoint = `/fitur/campaign-management/${slug}`;

		$api.setHeader('Authorization', `Bearer ${token}`);
		$api.defaults.headers.common['Content-Type'] = 'application/json';
		$api.defaults.headers.common['Dku-Api-Key'] = process.env.NUXT_ENV_APP_TOKEN;

		const response = await $api.$get(endPoint);
		const campaign = response?.data;

		return {
			campaign
		}
	}
}
</script>
