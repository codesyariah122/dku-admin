<style scoped>
	.file-uploader {
		text-align: center;
	}

	.drop-area {
		@apply border-2 border-dashed border-gray-300 p-4 rounded-md;
	}

</style>


<template>
	<form @submit.prevent="addNewCategoryCampaign">
		<div v-if="success" class="flex justify-center w-full bg-transparent mt-4">
			<molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
		</div>

		<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
			New Category Campaign
		</h6>

		<div class="flex flex-wrap">
			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">Category Name</label>

					<input type="text" name="name" id="name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your fullname" v-model="input.name"/>
				</div>

				<div v-if="validations.name" class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.name[0]}}
					</div>
				</div>
			</div>


			<div class="flex-shrink-0 lg:w-12/12 w-full py-10">
				<button type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
					<div v-if="loading">
						<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
						</svg>
						Loading...
					</div>
					<span v-else><i class="fa-solid fa-plus"></i> Add New Category</span>
				</button>
			</div>
		</div>

		<div v-if="loading">
			<molecules-row-loading :loading="loading" :options="options" />
		</div>

	</form>
</template>

<script>
	import slugify from 'slugify';
	import {getData} from '~/hooks/index';

	export default {
		data() {
			return {
				param: '',
				loading: null,
				options: '',
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				error: null,
				input: {},
				validations: [],
				success: null,
				message_success: ''
			}
		},

		created() {
			this.dataManagementEvent();
		},

		mounted() {
			this.checkUserLogin();
		},

		methods: {

			closeSuccessAlert() {
				this.success = false;
				this.message_success = '';
			},

			addNewCategoryCampaign() {
				this.loading = true;
				this.options = 'category-campaigns';
				const postData = {
					name: this.input.name,
				}
				const endPoint = `/fitur/category-campaigns-management`;
				const config = {
					headers: {
						Accept: "application/json",
					},
				};

				this.$api.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
				this.$api.defaults.headers.common["Dku-Api-Key"] = this.api_token;
				
				this.$api.post(endPoint, postData, config)
				.then(({data}) => {
					if(data.success) {
						this.$toast.show(`${data.data.name}, successfully added !`, {
							type: "success",
							duration: 1500,
							position: "top-right",
						});
						this.input.name = ''
						this.success = true;
						this.message_success = data.message
					}
				})
				.finally(() => {
					setTimeout(() => {
						this.loading = false;
						this.options = '';
					}, 1000)
				})
				.catch((err) => {
					this.validations = err.response.data;
				})
			},

		},

		watch: {
			dataNotifs() {
				if (this.$_.size(this.dataNotifs) > 0) {
					if(this.token.token) {
						this.message_success = this.messageNotif;
					}
				}
			},
		}
	}
</script>