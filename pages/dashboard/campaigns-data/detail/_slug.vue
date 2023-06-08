<template>
  <div class="flex flex-wrap">
  	<div class="w-full lg:w-12/12 px-4">
  		<!-- <cards-card-detail-data :detail="campaign.data" /> -->
  	</div>
  	<pre>


  	</pre>
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
		const { slug } = params;
	}
	
}
</script>
