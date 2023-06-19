<template>
	<div class="flex flex-wrap">
		<div class="w-full">
			<ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row cursor-pointer">
				<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
					<a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-emerald-600 bg-white': openTab !== 1, 'text-white bg-emerald-600': openTab === 1}">
						<i class="fas fa-space-shuttle text-base mr-1"></i> Title Campaign
					</a>
				</li>
				<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
					<a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-emerald-600 bg-white': openTab !== 2, 'text-white bg-emerald-600': openTab === 2}">
						<i class="fas fa-cog text-base mr-1"></i> Category Campaign
					</a>
				</li>
				<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
					<a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-emerald-600 bg-white': openTab !== 3, 'text-white bg-emerald-600': openTab === 3}">
						<i class="fas fa-briefcase text-base mr-1"></i> Date Campaign
					</a>
				</li>
			</ul>

			<div class="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-sm rounded">
				<div class="px-4 py-5 flex-auto">
					<div class="tab-content tab-space">
						<div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
							<div class="relative flex w-full flex-wrap items-stretch mb-3">
								<input @keyup="handleFilter($event)" type="text" placeholder="Filter by title" class="px-3 py-3 placeholder-blueGray-500 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" v-model="input.title"/>
								<span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
									<i class="fa-solid fa-magnifying-glass"></i>
								</span>
							</div>
						</div>
						<div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
							<select @change="changeCategory($event);" id="category_campaign" name="category_campaign" class="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
								<option selected value="">Choose a campaign category</option>
								<option v-for="category in categories" :key="category.id" :value="category.id">
									{{category.name}}
								</option>
							</select>
						</div>
						<div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
							<div class="flex justify-center">
								<div class="flex-none w-full">
									<datepicker v-model="selectedDate" :config="datePickerConfig" @input="handleDateChange" placeholder="Date Campaign" :format="dateFormat" range></datepicker>
								</div>
							</div>
						</div>
					</div>
				</div>
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
		data() {
			return {
				openTab: 1,
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				input: {},
				categories: [],
				startDate: null,
				endDate: null,
				selectedDate: [],
				datePickerConfig: {
			        range: true
			    },
			    dateFormat: 'YYYY-MM-DD'
			}
		},
		mounted() {
			this.getCategoryCampaignData()
		},
		methods: {
			toggleTabs: function(tabNumber){
				this.openTab = tabNumber
			},

			changeCategory(e) {
				const category_campaign = e.target.value;
				this.$emit('filter-data', '', category_campaign, '', '')
			},

			handleDateChange(date) {
				if (date.length === 2) {
					const startDate = this.$moment(date[0]).format("YYYY-MM-DD")
					const endDate = this.$moment(date[1]).format("YYYY-MM-DD")
					this.$emit('filter-data', '', '', startDate, endDate)
				}
			},

			handleFilter(e) {
				const title = e.target.value
				this.$emit('filter-data', title, '', '', '')
			},

			getCategoryCampaignData() {
				getData({
					api_url: `${this.api_url}/fitur/category-campaigns-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					this.categories = [...data.data]
				})
				.catch((err) => console.log(err))
			},
		}
	}
</script>