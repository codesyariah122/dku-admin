<template>
	<div class="flex flex-wrap">
		<div v-if="queryRole !== 'USER'" class="w-full">
			<ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row cursor-pointer">
				<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
					<a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-emerald-600 bg-white': openTab !== 1, 'text-white bg-emerald-600': openTab === 1}">
						<i class="fas fa-space-shuttle text-base mr-1"></i> Name
					</a>
				</li>
				<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
					<a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-emerald-600 bg-white': openTab !== 2, 'text-white bg-emerald-600': openTab === 2}">
						<i class="fas fa-cog text-base mr-1"></i> Roles
					</a>
				</li>
			</ul>

			<div class="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-sm rounded">
				<div class="px-0 py-5 flex-auto">
					<div class="tab-content tab-space">
						<div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
							<div class="relative flex w-full flex-wrap items-stretch mb-3">
								<input @keyup="handleFilter($event)" type="text" placeholder="Filter by name" class="px-3 py-3 placeholder-blueGray-500 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" v-model="input.name"/>
								<span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-500 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
									<i class="fa-solid fa-magnifying-glass"></i>
								</span>
							</div>
						</div>
						<div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
							<select @change="changeRoles($event);" id="category_campaign" name="category_campaign" class="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
								<option selected value="">Filter by role user</option>
								<option v-for="role in roles" :key="role.id" :value="role.id">
									{{$role(role.name)}}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="flex justify-start">
			<div class="relative flex w-full flex-wrap items-stretch mb-3">
				<input @keyup="handleFilter($event)" type="text" placeholder="Filter by name" class="px-3 py-3 placeholder-blueGray-500 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" v-model="input.name"/>
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
				input: {},
				roles: [],
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
			this.getRoleLists()
		},
		methods: {
			toggleTabs: function(tabNumber){
				this.openTab = tabNumber
			},

			changeRoles(e) {
				const roles = e.target.value;
				this.$emit('filter-data', {name: '', roles: roles})
			},

			handleFilter(e) {
				const name = e.target.value
				this.$emit('filter-data', {name: name, roles: ''})
			},

			getRoleLists() {
				getData({
					api_url: `${this.api_url}/fitur/roles-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					let prepareRoles = [];
					if(this.queryRole === 'DASHBOARD') {					
						const roles = data.data.map((role) => role).filter((role) => this.$role(role.name) !== 'USER');
						prepareRoles = [...roles];
					} else {
						const roles = data.data.map((role) => role).filter((role) => this.$role(role.name) === 'USER');
						prepareRoles = [...roles];
						this.input.role = roles.map((role) => role.id)[0];
					}
					this.roles = [...prepareRoles]
				})
				.catch((err) => console.log(err))
			},
		}
	}
</script>