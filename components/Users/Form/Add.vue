<template>
	<form>
		<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
			New user data
		</h6>

		<div class="flex flex-wrap">
			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">Fullname</label>

					<input type="text" name="name" id="name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your fullname" />
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">Email Address</label>

					<input type="email" name="email" id="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="your_email@email.com" />
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="password">Password</label>
					<input
					id="password"
					:class="`${
						error
						? 'pass1 h-12 w-full rounded-lg outline-none p-2 border border-solid border-red-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-red-600'
						: 'pass1 h-12 w-full border mt-0 rounded-lg outline-none p-2'
					}`"
					type="password"
					placeholder="Password"
					/>
					<i
					@click="showingPassword"
					:class="`fa ${
						hidePassword ? 'fa-eye-slash' : 'fa-eye'
					} eye_1 absolute top-[45px] right-3 cursor-pointer`"
					></i>
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<div class="relative">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone">Phone</label>

					<input type="phone" name="phone" id="phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					placeholder="62+xxxx xxxx xxx" />
				</div>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<label for="role" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
					Role User
				</label>
				<select id="role" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
					<option selected>Choose a role</option>
					<option v-for="role in roles" :key="role.id" :value="role.id">
						{{$role(role.name)}}
					</option>
				</select>
			</div>

			<div class="w-full lg:w-6/12 px-4 py-6">
				<label for="role" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
					Status User
				</label>
				<select id="role" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
					<option selected>Choose a status</option>
					<option value="ACTIVE">
						ACTIVE
					</option>
					<option value="INACTIVE">
						INACTIVE
					</option>
				</select>
			</div>

			<div class="flex-shrink-0 lg:w-12/12 w-full py-10">
				<button type="button" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add User</button>
			</div>
		</div>

	</form>
</template>

<script>
	import {getData} from '~/hooks/index'

	export default {
		data() {
			return {
				hidePassword: true,
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				roles: [],
				error: null
			}
		},

		mounted() {
			this.getRoleLists();
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

			getRoleLists() {
				getData({
					api_url: `${this.api_url}/fitur/roles-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					this.roles = [...data.data]
				})
				.catch((err) => console.log(err))
			}
		}
	}
</script>