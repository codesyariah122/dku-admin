<style lang="css" scoped>
	/* Menghilangkan gaya default dari input radio */
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
	input[type="radio"]:checked + label {
		background-color: #000000;
		color: #ffffff;
	}

</style>

<template>
	<div>
		<molecules-stepper :steps="steps" :currentStep="currentStep" />

		<!-- Konten langkah saat ini -->
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
							<input @click="changeNominal(nominal.nominal)" type="radio" :id="`option-nominal${nominal.id}`" v-model="input.donation_amount" :value="nominal.id" name="donation_amount"/>
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
							<input @click="changeBank(bank.id)" type="radio" :id="`option-bank${bank.id}`" v-model="input.bank_id" :value="bank.id" name="bank_id"/>
							<label :for="`option-bank${bank.id}`" class="flex justify-between items-center">
								<div>
									<img :src="`${img_url}/${bank.image}`" alt="Icon" class="w-[48px] h-auto">
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
				changeStep: false,
			};
		},


		mounted() {
			this.getNominalLists();
			this.getBankLists();
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

			changeNominal(data) {
				this.input.donation_amount = data
			},

			changeBank(id) {
				this.input.bank_id = id
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

			addDonation() {
				console.log(this.input)
			}
		},
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
