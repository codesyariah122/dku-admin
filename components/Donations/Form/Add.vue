<style lang="css" scoped>
	input[type="radio"] {
		display: none;
	}

	/* Mengatur tampilan tombol */
	input[type="radio"] + label {
		cursor: pointer;
		/*		display: inline-block;*/
		padding: 8px 16px;
		background-color: #f2f2f2;
		border: 1px solid #ccc;
		border-radius: 4px;
		transition: background-color 0.3s ease;
	}

	/* Mengatur tampilan tombol saat dihover */
	input[type="radio"]:hover + label {
		background-color: #e0e0e0;
	}

	/* Mengatur tampilan tombol saat di klik (selected) */
	.input__nominal:checked + label {
		background-color: #000000;
		color: #ffffff;
	}

	.input__bank:checked + label {
		background-color: #000000;
		color: #ffffff;
	}

</style>

<template>
	<div>
		<molecules-stepper :steps="steps" :currentStep="currentStep" />

		<!-- Konten langkah saat ini -->
		<div v-if="success" class="flex justify-center w-full bg-transparent mt-4 mb-4">
			<molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
		</div>

		<form @submit.prevent="addDonation">
			<div v-if="currentStep === 0">
				<!-- Konten langkah 1 -->
				<div class="grid grid-cols-1 place-items-center py-12">
					<div class="col-span-full">
						<h2 class="text-blueGray-700 font-bold">Pilih jumlah donasi</h2>
					</div>
				</div>
				<div class="flex justify-center py-6">				
					<div class="grid grid-cols-2 gap-4">
						<div v-for="nominal in nominals" :key="nominal.id" class="mb-6 w-full">
							<input class="input__nominal" @click="changeNominal(nominal.nominal)" type="radio" :id="`option-nominal${nominal.id}`" v-model="input.donation_amount" :value="nominal.id" name="donation_amount" :checked="input.donation_amount === nominal.id"/>
							<label :for="`option-nominal${nominal.id}`">{{$format(nominal.nominal)}}</label>
						</div>
					</div>
				</div>
			</div>

			<div v-else-if="currentStep === 1">
				<!-- Konten langkah 2 -->
				<div class="grid grid-cols-1 place-items-center py-12">
					<div class="col-span-full">
						<h2 class="text-blueGray-700 font-bold">Pilih metode pembayaran</h2>
					</div>
				</div>
				<div class="grid grid-cols-1 py-2">
					<div class="col-span-full">
						<h2 class="text-blueGray-700 font-bold">Transfer Bank (Transaksi diverifikasi manual 1x24jam)</h2>
					</div>
				</div>
				<div class="flex justify-center py-2">				
					<div class="grid grid-cols-1">
						<div v-for="bank in banks" :key="bank.id" class="col-span-full mb-6">
							<input :class="`${checked_bank ? 'input__bank' : ''}`" @click="changeBank(bank.id)" type="radio" :id="`option-bank${bank.id}`" v-model="input.bank_id" :value="bank.id" name="bank_id"/>
							<label :for="`option-bank${bank.id}`" class="flex justify-between items-center px-4 py-2" >
								<div>
									<img :src="`${img_url}/${bank.image}`" alt="Icon" class="w-[60px] h-auto">
								</div>
								<div>
									{{bank.name}}
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>

			<div v-else-if="currentStep === 2">
				<!-- Konten langkah 3 -->
				<div class="grid grid-cols-1 place-items-center py-12">
					<div class="col-span-full">
						<h2 class="text-blueGray-700 font-bold">Lengkapi informasi donatur</h2>
					</div>
				</div>
				<div class="flex flex-wrap py-2">
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
							
							<label class="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" @change="changeAnonim($event)" value="Y" v-model="input.anonim" class="sr-only peer">
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sembunyikan Nama (Hamba Allah)</span>
							</label>
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
							<label for="role" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
								Campaign
							</label>
							<select @change="changeCampaign($event)" id="status" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
								<option selected value="">Choose campaign</option>
								<option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">
									{{campaign.title}}
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

					<div class="w-full w-12/12 px-4 py-6">
						<div class="relative">
							
							<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pesan</label>
							<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." v-model="input.message"></textarea>

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
			</div>
		</form>

		<!-- Tombol navigasi -->
		<div class="flex justify-center items-center py-6 mb-4 space-x-4">
			<button @click="prevStep" :disabled="currentStep === 0" class="btn"><i class="fa-solid fa-arrow-left"></i> Kembali</button>
			<button @click="nextStep" :disabled="currentStep === steps.length - 1" class="btn">Selanjutnya <i class="fa-solid fa-arrow-right"></i></button>
		</div>


		<div v-if="loading">
			<molecules-row-loading :loading="loading" :options="options" />
		</div>
	</div>
</template>

<script>
	import {getData} from '~/hooks/index';

	export default {
		data() {
			return {
				loading: null,
				options: '',
				api_url: process.env.NUXT_ENV_API_URL,
				api_token: process.env.NUXT_ENV_APP_TOKEN,
				img_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL,
				input: {},
				validations: [],
				success: null,
				message_success: '',
				steps: [
				{
					id: 1,
					title: 'Pilih Nominal',
					icon: 'fa-cash-register'
				},
				{
					id: 2,
					title: 'Pilih Metode Pembayaran',
					icon: 'fa-credit-card'
				},
				{
					id: 3,
					title: 'Selesaikan Donasi',
					icon: 'fa-check-to-slot'
				}
				],
				currentStep: 0,
				nominals: [],
				banks: [],
				campaigns: [],
				changeStep: false,
				checked_bank: false
			};
		},

		created() {
			this.dataManagementEvent();
		},


		mounted() {
			this.getNominalLists();
			this.getBankLists();
			this.getCampaignLists();
		},

		methods: {
			nextStep() {
				if (this.currentStep < this.steps.length - 1) {
					this.currentStep++;
				}
			},

			prevStep() {
				if (this.currentStep > 0) {
					this.currentStep--;
				}
			},

			closeSuccessAlert() {
				this.success = false;
				this.message_success = '';
			},

			changeNominal(data) {
				this.input.donation_amount = data
			},

			changeBank(id) {
				this.input.bank_id = id
				this.checked_bank = true
			},

			changeAnonim(e) {
				this.input.anonim = e.target.value
			},

			changeCampaign(e) {
				this.input.campaign_id = e.target.value
			},

			getNominalLists() {
				getData({
					api_url: `${this.api_url}/fitur/nominal-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					this.nominals = data
				})
				.catch((err) => console.log(err))
			},

			getBankLists() {
				getData({
					api_url: `${this.api_url}/fitur/bank-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					this.banks = data
				})
				.catch((err) => console.log(err))
			},

			getCampaignLists() {
				getData({
					api_url: `${this.api_url}/fitur/campaign-management`,
					token: this.token.token,
					api_key: this.api_token
				})
				.then(({data}) => {
					this.campaigns = data
				})
				.catch((err) => console.log(err))
			},

			addDonation() {
				this.loading = true;
				this.options = "add-donatur"

				const endPoint = `/fitur/donation-management`;
				const config = {
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
				};

				this.$api.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
				this.$api.defaults.headers.common["Dku-Api-Key"] = this.api_token;

				const dataPrepare = {
					name: this.input.name,
					email: this.input.email,
					anonim: this.input.anonim ? this.input.anonim : 'N',
					status: null,
					methode: this.input.bank_id ? 'BANK_TRANSFER' : '',
					bank_id: this.input.bank_id,
					campaign_id: this.input.campaign_id,
					nominal_donation: this.input.donation_amount,
					user_id: null,
					message: this.input.message
				}


				this.$api.post(endPoint, dataPrepare, config)
				.then(({data}) => {
					// console.log(data)
					if(data.success) {
						this.$toast.show(data.message, {
							type: "success",
							duration: 1500,
							position: "top-right",
							icon: 'check-double'
						});
						this.success = true;
						this.message_success = data.message
						this.scrollToTop();
						this.input = {}
					} else {
						this.$swal({
							icon: 'info',
							title: 'Oops...',
							text: data.message,
						})
					}
				})
				.finally(() => {
					setTimeout(() => {
						this.loading = false;
						this.options = ''
						this.input = {};
						this.input.donation_amount = '';
						this.input.bank_id = '';
					}, 1500)
				})
				.catch((err) => {
					this.$swal({
						icon: 'info',
						title: 'Oops...',
						text: 'Failed form data, please check again!',
					})
					this.validations = err.response.data;
					this.scrollToTop();
				})
			}
		},

		watch: {
			dataNotifs() {
				if (this.$_.size(this.dataNotifs) > 0) {
					// if(this.token.token) {
					// 	this.message_success = this.messageNotif;
					// }
					console.log("Ok")
					this.getNominalLists();
					this.getCampaignLists();
					this.getBankLists();
				}
			},
		}
	};
</script>

<style>
	.btn {
		background-color: #000000;
		color: #ffffff;
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		margin-top: 16px;
		cursor: pointer;
	}
</style>
