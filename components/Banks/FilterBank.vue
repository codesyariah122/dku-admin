<template>
	<div class="flex flex-wrap">
		<div class="flex justify-start">
			<div class="relative flex w-full flex-wrap items-stretch mb-3">
				<input @keyup="handleFilter($event)" type="text" placeholder="Filter by bank name" class="px-3 py-3 placeholder-blueGray-500 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" v-model="input.name"/>
				<span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
					<i class="fa-solid fa-magnifying-glass"></i>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {getData} from "~/hooks/index"
	import Datepicker from 'vue2-datepicker';
	import 'vue2-datepicker/index.css';

	export default {
		name: "emerald-tabs",
		components: {
			Datepicker
		},
		props: {
			queryRole: {
				type: String,
			default: ''
			}
		},

		data() {
			return {
				openTab: 1,
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				input: {}			}
		},
		
		methods: {
			handleFilter(e) {
				const name = e.target.value
				this.$emit('filter-data', {name: name})
			},
		}
	}
</script>