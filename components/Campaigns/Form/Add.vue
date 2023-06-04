<style scoped>
	.file-uploader {
		text-align: center;
	}

	.drop-area {
		@apply border-2 border-dashed border-gray-300 p-4 rounded-md;
	}

</style>


<template>
	<form @submit.prevent="AddNewUser" enctype="multipart/form-data">
		<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
			New user data
		</h6>

		<div class="flex flex-wrap">
			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">Campaign Title</label>

					<input @keyup="changeSlug($event)" type="text" name="name" id="name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your fullname" v-model="input.title"/>
				</div>

				<div v-if="validations.title" class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.title[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 sm:py-6">
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

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">Description</label>
					<tinymce
					name="description"
					id="d1"
					v-model="input.description"
					:other_options="options"
					:init="editorConfig"
					></tinymce>
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
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone">Donation Target</label>

					<input @change="changeDonationTarget($event)" type="text" name="name" id="name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your fullname" v-model="input.donation_target"/>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">					
					<label for="status" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Is Headline
					</label>
					<select @change="changeStatus($event)" id="status" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected>Choose a is headline</option>
						<option value="Y">
							Yes
						</option>
						<option value="N">
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
						Campaign Category
					</label>
					<select @change="changeRoles($event);" id="role" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected>Choose a campaign category</option>
						<option v-for="category in categories" :key="category.id" :value="category.id">
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

			<div class="w-full lg:w-12/12 px-4 py-6">
				<div v-if="previewUrl" class="flex justify-between w-full">
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
				<span v-else><i class="fa-solid fa-plus"></i> Add New Campaign</span>
			</button>
		</div>
	</div>
	<molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
</form>
</template>

<script>
	import slugify from 'slugify';
	import {getData} from '~/hooks/index';

	export default {
		data() {
			return {
				loading: null,
				hidePassword: true,
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				categories: [],
				error: null,
				input: {},
				previewUrl: '',
				isDragging: null,
				validations: [],
				success: null,
				message_success: '',
				options: {
					menubar: false,
				},
				editorConfig: {
					height: 800
				}
			}
		},

		created() {
			this.dataManagementEvent();
		},

		mounted() {
			this.getRoleLists();
		},

		methods: {
			changeSlug(e) {
				const title = e.target.value
				this.input.slug = slugify(title, {
					lower: true,
					strict: true,
					trim: true
				});
			},

			changeDonationTarget(e) {
				this.input.donation_target = this.$format(e.target.value)
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
				console.log(files);
			},

			handleFileInput(event) {
				const files = event.target.files;
				this.uploadFiles(files);
			},

			uploadFiles(files) {
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
				this.previewUrl = ''
			},

			closeSuccessAlert() {
				this.success = false;
				this.message = '';
			},

			getRoleLists() {
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

			AddNewUser() {
				this.loading = true
				const postData = {
					name: this.input.name,
					email: this.input.email,
					password: this.input.password,
					phone: this.input.phone,
					role: this.input.role,
					status: this.input.status
				}
				const endPoint = `/fitur/user-management`;
				const config = {
					headers: {
						Accept: "application/json",
					},
				};
				this.$api.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
				this.$api.defaults.headers.common["Dku-Api-Key"] = this.api_token;
				this.$api.post(endPoint, postData)
				.then(({data}) => {
					if(data.success) {
						this.success = true;
						this.message_success = this.messageNotif;
					}
				})
				.finally(() => {
					setTimeout(() => {
						this.loading = false;
						this.input = {}
						this.input.role = ''
						this.input.status = ''
					}, 1000)
				})
				.catch((err) => {
					this.validations = err.response.data;
				})
			},

			changeRoles(e) {
				this.validations.role = ''
				this.input.role = e.target.value
			},

			changeStatus(e) {
				this.validations.status = ''
				this.input.status = e.target.value
			}
		},

		watch: {
			dataNotifs() {
				if (this.$_.size(this.dataNotifs) > 0) {
					this.$toast.show(this.messageNotif, {
						type: "info",
						duration: 5000,
						position: "top-right",
					});
					this.getTotalUser();
				}
			},
		}
	}
</script>