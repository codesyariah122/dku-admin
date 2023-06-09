<template>
	<div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center -mt-12">
          <div class="relative" v-html="detail?.barcode"></div>
        </div>
        <div class="w-full px-4 text-center mt-6">
          <div class="flex justify-center py-4 lg:pt-4 pt-4">
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{detail?.views}}
              </span>
              <span class="text-sm text-blueGray-400">Views</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <h3
          class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
        >
          {{detail?.title}}
        </h3>
        <div class="mt-4 mb-4">
          <img v-if="detail.banner"
          alt="detail-campaign-banner"
          :src="`${imageUrl}/${detail?.banner}`"
          class="shadow-xl h-auto w-full"
          />
          <img v-else :src="require('~/assets/img/default.jpg')" class="shadow-xl h-auto w-full" alt="default-campaign-banner" />
        </div>
        <div
          class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-calendar-days mr-2 text-lg text-blueGray-400"></i>
          Akhir Tayang - {{detail?.end_campaign ? $moment(detail?.end_campaign).format("LLLL") : '-'}}
        </div>

        <div class="mb-2 text-blueGray-600 mt-10">
          <i class="fas fa-newspaper mr-2 text-lg text-blueGray-400"></i>
          Author - {{detail?.author}}
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200">
        <div class="flex flex-col justify-start">
          <div class="w-full lg:w-12/12 px-4" v-html="$decode(detail?.description)"></div>
        </div>

        <div class="flex flex-col">
            <div>
              <button @click="backToPage" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <i class="fa-solid fa-chevron-left fa-lg"></i> Back
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Object,
				default: function() {
					return {}
				}
			},
			imageUrl: {
				type: String,
				default: ''
			}
		},


		methods: {
			backToPage() {
				this.$emit('back-to')
			}
		}
	}
</script>