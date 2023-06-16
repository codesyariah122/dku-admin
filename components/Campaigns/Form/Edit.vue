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
			New campaign data
		</h6>

		<div class="flex flex-wrap">
			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">Campaign Title</label>

					<input @keyup="changeSlug($event),clearValidation()" type="text" name="title" id="name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your fullname" v-model="input.title"/>
				</div>

				<div v-if="validations.title" class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.title[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="slug">Slug</label>

					<input type="text" name="slug" id="slug" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="campaign-title-slug" v-model="input.slug"/>
				</div>
				<div v-if="validations.slug" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.slug[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-12/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">Description</label>
					<wysiwyg v-model="input.description"/>
				</div>
				<div v-if="validations.description" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.description[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="donation_target">Donation Target</label>

					<input @change="changeDonationTarget($event)" type="number" name="donation_target" id="donation_target" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" :placeholder="input.donation_target" v-model="input.donation_target"/>

					<small class="text-blueGray-600 font-italic px-4 py-2">
						{{donation_currency}}
					</small>
				</div>
				<div v-if="validations.donation_target" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.donation_target[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">					
					<label for="is_headline" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Is Headline
					</label>
					<select @change="changeIsHeadline($event)" id="is_headline" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected :value="input.is_headline">{{input.is_headline === 'N' ? 'No' : 'Yes'}}</option>
						<option v-if="input.donation_target === 'N'" value="Y">
							Yes
						</option>
						<option v-else value="N">
							No
						</option>
					</select>
				</div>
				<div v-if="validations.is_headline" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.is_headline[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">				
					<label for="role" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Publish Campaign
					</label>
					<select @change="changePublish($event)" id="status" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected :value="input.publish">{{input.publish === 'N' ? 'No' : 'Yes'}}</option>
						<option v-if="input.publish === 'N'" value="Y">
							Yes
						</option>
						<option v-else value="N">
							No
						</option>
					</select>
				</div>
				<div v-if="validations.publish" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.publish[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">				
					<label for="date" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						End Campaign
					</label>
					<input id="date" type="date" class="px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="input.end_campaign">
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="created_by">Created By</label>

					<input type="text" name="created_by" id="created_by" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="campaign-title-slug" v-model="userData.name" disabled />`
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="author_email">Author Email</label>

					<input type="text" name="author_email" id="author_email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="campaign-title-slug" v-model="userData.email" disabled />
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">				
					<label for="category_campaign" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Campaign Category
					</label>
					<select @change="changeCategory($event);" id="category_campaign" name="category_campaign" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option v-for="category_campaign in input.category_campaign" :key="Math.random()" selected :value="category_campaign.id">
							{{category_campaign.name}}
						</option>
						<option v-for="category in categories.filter((category) => category.id !== category_selected[0])" :key="category.id" :value="category.id">
							{{category.name}}
						</option>
					</select>
				</div>
				<div v-if="validations.category_campaign" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.category_campaign[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">				
					<label for="limit" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Limit
					</label>
					<select @change="changeLimit($event)" id="limit" name="without_limit" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected :value="input.without_limit">{{input.without_limit === 'N' ? 'No' : 'Yes'}}</option>
						<option v-if="this.input.without_limit === 'N'" value="Y">
							Yes
						</option>
						<option v-else value="N">
							No
						</option>
					</select>
				</div>
				<div v-if="validations.without_limit" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.without_limit[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-12/12 px-4 py-6">
				<div v-if="previewUrl && input.banner !== null" class="flex justify-between w-full">
					<div class="grow">
						<img :src="previewUrl" class="h-auto w-full">
					</div>
					<div class="relative h-32 w-32">
						<button @click="removePreview" class="bg-transparent rounded-lg absolute top-[-1rem] right-[-2rem] h-16 w-16">
							<i class="fa-solid fa-xmark text-2xl text-gray-700 font-bold"></i>
						</button>
					</div>
				</div>
				<div v-else class="flex items-center justify-center w-full">
					<label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
						<div 
						class="flex flex-col items-center justify-center pt-5 pb-6"
						@dragover="handleDragOver"
						@dragleave="handleDragLeave"
						@drop="handleDrop"
						>
						<h2 class="mb-4 text-sm text-gray-500 dark:text-gray-400">Upload Banner Here !</h2>
						<i class="fa-solid fa-cloud-arrow-up text-5xl text-gray-500"></i>
						<p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
					</div>
					<input 
					ref="fileInput"
					id="dropzone-file"
					type="file" 
					class="hidden" 
					@change="handleFileInput"
					/>
				</label>
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
				<span v-else><i class="fa-solid fa-plus"></i> Update Campaign</span>
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
	props: {
		type: {
			type: String,
			default: null
		},
		data: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},

	data() {
		return {
			param: '',
			loading: null,
			options: '',
			hidePassword: true,
			api_url: process.env.NUXT_ENV_API_URL,
			api_token: process.env.NUXT_ENV_APP_TOKEN,
			storage_url: process.env.NUXT_ENV_STORAGE_URL,
			categories: [],
			error: null,
			input: {},
			banner: [],
			donation_currency: null,
			previewUrl: '',
			isDragging: null,
			validations: [],
			success: null,
			message_success: '',
			optionsObject: {
				menubar: false,
				entity_encoding: 'raw',
			},
			editorConfig: {
				height: 800
			},
			category_selected: null,
			
		}
	},

	created() {
		this.dataManagementEvent();
	},

	mounted() {
		this.getCategoryCampaignData();
		this.checkUserLogin();
		this.setupCampaignEdit();
	},

	methods: {
		setupCampaignEdit() {
			const prepare = this.data;
			const decodedDescription = this.$decode(prepare.description);
			this.input.title = prepare.title;
			this.input.slug = prepare.slug;
			this.input.description = decodedDescription;
			this.donation_currency = this.$format(prepare.donation_target);
			this.input.donation_target = prepare.donation_target;
			this.input.is_headline = prepare.is_headline;
			this.input.end_campaign = this.$moment(prepare.end_campaign).format('YYYY-MM-DD');
			
			this.input.publish = prepare.publish;
			this.input.created_by = prepare.created_by;
			this.input.author_email = prepare.author_email;
			this.input.category_campaign = prepare.category_campaigns
			this.input.without_limit = prepare.without_limit;
			this.input.banner = prepare.banner;
			this.previewUrl = `${this.storage_url}/${prepare.banner}`
		},

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

		changeDonationTarget(e) {
			this.donation_currency = this.$format(e.target.value);
			this.input.donation_target = e.target.value;
		},

		changeCategory(e) {
			this.input.category_campaign = e.target.value;
		},

		changePublish(e) {
			this.input.publish = e.target.value;
		},

		changeLimit(e) {
			this.input.without_limit = e.target.value;
		},

		changeIsHeadline(e) {
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
				const category_selected = this.input.category_campaign.map((category) => category.id);
				this.category_selected = category_selected;

				this.categories = [...data.data];
			})
			.catch((err) => console.log(err))
		},

		clearValidation() {
			this.validations = [];
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
			formData.append('banner', this.input.banner || null);
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