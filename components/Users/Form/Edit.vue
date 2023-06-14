<template>
	<form @submit.prevent="updateUser">

		<!-- <div v-if="success">
			<molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
		</div> -->

		<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
			Edit user data
		</h6>

		<div class="flex flex-wrap">
			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">Fullname</label>

					<input @keyup="() => validations.name = ''" type="text" name="name" id="name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your fullname" v-model="input.name"/>
				</div>

				<div v-if="validations.name" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.name[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 sm:py-6 lg:py-0 xl:py-0">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">Email Address</label>

					<input @keyup="() => validations.email = ''" type="email" name="email" id="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your_email@email.com" v-model="input.email"/>
				</div>
				<div v-if="validations.email" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.email[0]}}
					</div>
				</div>
			</div>


			<!-- <div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone">Phone</label>

					<vue-tel-input name="phone" id="phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="62+xxxx xxxx xxx" v-model="input.phone" style="height: 50px;"></vue-tel-input>
				</div>
			</div> -->

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">					
					<label for="role" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Role User
					</label>
					<select @change="changeRoles($event);" id="role" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected :value="input.role">{{roleNameEdit}}</option>
						<option v-for="role in roles" :key="role.id" :value="role.id">
							{{$role(role.name)}}
						</option>
					</select>
				</div>
				<div v-if="validations.role" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.role[0]}}
					</div>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">					
					<label for="status" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
						Status User
					</label>
					<select @change="changeStatus($event)" id="status" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
						<option selected :value="input.status">
							{{input.status}}
						</option>
						<option value="INACTIVE">
							INACTIVE
						</option>
					</select>
				</div>
				<div v-if="validations.status" class="flex p-4 py-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
					<i class="fa-solid fa-circle-info"></i>
					<div class="px-2">
						{{validations.status[0]}}
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
					<span v-else><i class="fa-solid fa-plus"></i> Update User</span>
				</button>
			</div>
		</div>

		<div v-if="loading">
			<molecules-row-loading :loading="loading" :options="options" />
		</div>

	</form>
</template>

<script>
	import {getData} from '~/hooks/index'

	export default {
		props: {
			type: {
				type: String,
				default: null
			},
			detail: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},

		data() {
			return {
				loading: null,
				options: '',
				hidePassword: true,
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				roles: [],
				roleNameEdit: '',
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
			this.getRoleLists();
			this.setUpUserEdit();
		},

		methods: {
			showingPassword() {
				const password = document.querySelector("#password");
				if (password.type === "password") {
					password.type = "text";
					this.hidePassword = false;
				} else {
					password.type = "password";
					this.hidePassword = true;
				}
			},

			closeSuccessAlert() {
				this.success = false;
				this.message = '';
			},

			setUpUserEdit() {
				const prepare = this.detail.users.map((user) => user)[0];
				this.input = {
					name: prepare.name,
					email: prepare.email,
					// phone: prepare.phone ? prepare.phone : '',
					role: prepare.role,
					status: prepare.status
				}
			},

			getRoleLists() {
				getData({
					api_url: `${this.api_url}/fitur/roles-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					let prepareRoles = [];
					if(this.type === 'DASHBOARD') {
						const roles = data.data.map((role) => role).filter((role) => this.$role(role.name) !== 'USER');
						this.roles = roles.filter(role => role.id !== this.input.role)
						const selected = roles.filter((role) => role.id === this.input.role)
						this.roleNameEdit = selected.map((role) => this.$role(role.name))[0];
						console.log(this.roleNameEdit);
					} else {
						const roles = data.data.map((role) => role).filter((role) => this.$role(role.name) === 'USER');
						this.roles = roles.filter(role => role.id !== this.input.role)
						const selected = roles.filter((role) => role.id === this.input.role)
						this.roleNameEdit = selected.map((role) => this.$role(role.name))[0];
						console.log(this.roleNameEdit);
					}
				})
				.catch((err) => console.log(err))
			},

			changeRoles(e) {
				this.validations.role = ''
				this.input.role = e.target.value
			},

			changeStatus(e) {
				this.validations.status = ''
				this.input.status = e.target.value
			},

			updateUser() {
				this.loading = true;
				this.options = 'edit-user';
				const postData = {
					name: this.input.name,
					email: this.input.email,
					password: this.input.password,
					// phone: this.input.phone,
					role: this.input.role,
					status: this.input.status
				}
				const endPoint = `/fitur/user-management/${this.detail.username}`;
				const config = {
					headers: {
						Accept: "application/json",
					},
				};

				this.$api.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
				this.$api.defaults.headers.common["Dku-Api-Key"] = this.api_token;
				
				this.$api.put(endPoint, postData)
				.then(({data}) => {
					if(data.success) {
						this.success = true;
						this.message_success=data.message
						this.$emit('detail-data', data?.data?.profiles[0].username);
						this.$store.dispatch('success/storeSuccessFormData', data?.data?.profiles[0].username);
					}
				})
				.finally(() => {
					setTimeout(() => {
						this.loading = false;
						this.options = '';
					}, 1000)
				})
				.catch((err) => {
					console.log(err);
				})
			},

			colseAlert() {
				this.success = false;
				this.message_success = ''
			},
			
		},

		watch: {
			dataNotifs() {
				if (this.$_.size(this.dataNotifs) > 0) {
					if(this.token.token) {						
						this.message_success = this.messageNotif;
					}
					this.getTotalUser();
				}
			},
		}
	}
</script>