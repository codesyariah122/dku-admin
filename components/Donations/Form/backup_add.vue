<style scoped>
	.file-uploader {
		text-align: center;
	}

	.drop-area {
		@apply border-2 border-dashed border-gray-300 p-4 rounded-md;
	}

</style>


<template>
	<form @submit.prevent="addNewCampaign">
		<div v-if="success" class="flex justify-center w-full bg-transparent mt-4">
			<molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
		</div>

		<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
			New Transaction Donation
		</h6>

		<div class="flex flex-wrap">
			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">Donatur Name</label>

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

			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">email</label>

					<input type="text" name="email" id="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="placeholder@email.com" v-model="input.email"/>
				</div>
				<div v-if="validations.email" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.email[0]}}
					</div>
				</div>
			</div>


			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="donation_target">Methode</label>

					<select @change="changePaymentMethod($event)" id="is_headline" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected value="">Choose Payment</option>
						<option value="transfer">
							Bank Transfer
						</option>
						<option value="instant">
							Instant Payment
						</option>
						<option value="virtual">
							Virtual Account
						</option>
					</select>
				</div>
				<div v-if="validations.methode" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.methode[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">					
					<label for="is_headline" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Donation Amount
					</label>
					<input @change="changeDonationAmount($event)" type="number" name="donation_target" id="donation_target" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="1000000" v-model="input.donation_amount"/>

					<small class="text-blueGray-600 font-italic px-4 py-2">
						{{donation_amount}}
					</small>
				</div>
				<div v-if="validations.donation_amount" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.donation_amount[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">				
					<label for="role" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Anonim
					</label>
					<select @change="changeAnonim($event)" id="status" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected value="">Choose anonim</option>
						<option value="Y">
							Yes
						</option>
						<option value="N">
							No
						</option>
					</select>
				</div>
				<div v-if="validations.anonim" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.anonim[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">				
					<label for="category_campaign" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Change Donatur User
					</label>
					<select @change="changeUserDonatur($event);" id="category_campaign" name="category_campaign" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected value="">Choose a user donatur</option>
						<option v-for="user in users" :key="user.id" :value="user.id">
							{{user.name}}
						</option>
					</select>
				</div>
				<div v-if="validations.user_id" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.user_id[0]}}
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
					<span v-else><i class="fa-solid fa-plus"></i> Add New Campaign</span>
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
				hidePassword: true,
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				categories: [],
				error: null,
				input: {},
				banner: [],
				donation_amount: null,
				previewUrl: '',
				isDragging: null,
				validations: [],
				success: null,
				message_success: '',
				optionsObject: {
					menubar: false,
				},
				editorConfig: {
					height: 800
				},
				users: []
			}
		},

		created() {
			this.dataManagementEvent();
		},

		mounted() {
			this.getCategoryCampaignData();
			this.checkUserLogin();
			this.getUserData();
		},

		methods: {
			changeSlug(e) {
				if(e.target.value) {					
					const title = e.target.value
					this.input.slug = slugify(title, {
						lower: true,
						strict: true,
						trim: true
					});
				} else {
					this.input.slug = ''
				}
			},

			changeDonationAmount(e) {
				this.donation_amount = this.$format(e.target.value);
				this.input.donation_target = e.target.value;
			},

			changeUserDonatur(e) {
				this.input.category_campaign = e.target.value;
			},

			changeAnonim(e) {
				this.input.publish = e.target.value;
			},

			changeLimit(e) {
				this.input.without_limit = e.target.value;
			},

			changePaymentMethod(e) {
				this.input.is_headline = e.target.value;
			},

			handleDragOver(event) {
				event.preventDefault();
				this.isDragging = true;
			},
			handleDragLeave() {
				this.isDragging = false;
			},
			handleDrop(event) {
				event.preventDefault();
				this.isDragging = false;

				const files = event.dataTransfer.files;
				this.uploadFiles(files);
			},

			handleFileInput(event) {
				const files = event.target.files;
				this.uploadFiles(files);
			},

			uploadFiles(files) {
				this.input.banner = files[0]
				const fileInput = this.$refs.fileInput;

				if (fileInput.files && fileInput.files.length > 0) {
					const file = fileInput.files[0];

					const reader = new FileReader();

					reader.onload = (e) => {
						this.previewUrl = e.target.result;
					};

					reader.readAsDataURL(file);

				} else {
					event.preventDefault();
					const file = files[0];

					const reader = new FileReader();

					reader.onload = (e) => {
						this.previewUrl = e.target.result;
					};

					reader.readAsDataURL(file);

				}
			},

			removePreview() {
				this.previewUrl = '';
			},

			closeSuccessAlert() {
				this.success = false;
				this.message = '';
				this.detailCampaign();
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

			clearValidation() {
				this.validations = [];
			},

			getUserData(page=1, roles='USER') {
				getData({
					api_url: `${this.api_url}/fitur/user-management?role=USER&page=${page}&roles=${roles}`,
					token: this.token.token,
					api_key: process.env.NUXT_ENV_APP_TOKEN
				})
				.then((data) => {
					console.log(data.data)
					this.users = data.data
				})
				.catch((err) => console.log(err));
			},

			addNewCampaign() {
				this.loading = true
				this.options = 'add-campaign';
				
				const endPoint = `/fitur/campaign-management`;
				const config = {
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};

				let formData = new FormData();

				formData.append('title', this.input.title || '');
				formData.append('slug', this.input.slug || '');
				formData.append('description', this.input.description || '');
				formData.append('donation_target', this.input.donation_target || '');
				formData.append('is_headline', this.input.is_headline || '');
				formData.append('banner', this.input.banner || '');
				formData.append('publish', this.input.publish || '');
				formData.append('end_campaign', this.$timestamp(this.input.end_campaign) || null);
				formData.append('without_limit', this.input.without_limit || '');
				formData.append('category_campaign', this.input.category_campaign || '');

				// console.log(formData);

				this.$api.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
				this.$api.defaults.headers.common["Dku-Api-Key"] = this.api_token;
				
				this.$api.post(endPoint, formData, config)
				.then(({data}) => {
					// console.log(data)
					if(data.success) {
						this.$toast.show(`${data.data[0].title}, successfully added !`, {
							type: "success",
							duration: 1500,
							position: "top-right",
						});
						this.success = true;
						this.scrollToTop();
						this.input = {}
						this.param = data.data[0].id;
						this.detailCampaign(data.data[0].id);
						this.$store.dispatch('success/storeSuccessFormData', data?.data[0]);
					} else {
						this.$swal({
							icon: 'info',
							title: 'Oops...',
							text: data.message,
						})
						his.loading = false;
						this.options = ''
						this.input = {};
						this.input.category_campaign = '';
						this.input.publish = '';
						this.input.without_limit = '';
						this.input.is_headline = '';
						this.previewUrl = '';
					}
				})
				.finally(() => {
					setTimeout(() => {
						this.loading = false;
						this.options = ''
						this.input = {};
						this.input.category_campaign = '';
						this.input.publish = '';
						this.input.without_limit = '';
						this.input.is_headline = '';
						this.previewUrl = '';
					}, 1500)
				})
				.catch((err) => {
					this.$swal({
						icon: 'info',
						title: 'Oops...',
						text: err.reponse.message ? err.response.message : 'Failed form data!',
					})
					this.validations = err.response.data;
					this.scrollToTop();
				})
			},

			detailCampaign(detailId) {
				this.$emit('detail-data', detailId)
			}
		},

		watch: {
			dataNotifs() {
				if (this.$_.size(this.dataNotifs) > 0) {
					if(this.token.token) {
						this.message_success = this.messageNotif;
					}
					this.getTotalCampaign();
				}
			},
		}
	}
</script>