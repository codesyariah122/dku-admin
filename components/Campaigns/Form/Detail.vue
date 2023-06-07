<template>
	<div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <div v-html="detail.barcode" class="shadow-xl rounded-md h-auto align-middle border-none bg-white absolute -m-16 -ml-20 lg:-ml-16 max-w-250-px"></div>
          </div>
        </div>
        <div class="w-full px-4 text-center mt-20">
          <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{detail.publish === 'Y' ? 'publish' : 'draft'}}
              </span>
              <span class="text-sm text-blueGray-400">Status</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-6">
        <h3
          class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
        >
          {{ detail.title }}
        </h3>
        <div class="mt-4 mb-4">
          <img
          alt="detail-campaign-banner"
          :src="`${image_url}/${detail.banner}`"
          class="shadow-xl h-auto"
          />
        </div>
        <div
          class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-calendar-days mr-2 text-lg text-blueGray-400"></i>
          Akhir Tayang - {{detail.end_campaign ? $moment(detail.end_campaign).format("LLLL") : '-'}}
        </div>

        <div class="mb-2 text-blueGray-600 mt-10">
          <i class="fas fa-newspaper mr-2 text-lg text-blueGray-400"></i>
          Author - {{detail.author}}
        </div>

      </div>

      <div class="mt-10 py-10 border-t border-blueGray-200 text-left">
        <div class="flex flex-wrap justify-start">
          <div class="w-full lg:w-9/12 px-4">
            <!-- Decode string entities -->
            <div class="mb-4 text-lg leading-relaxed text-blueGray-700" 
              v-html="$decode(detail.description)"></div>

            <button @click="backTo" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
          return {};
        }
      },
      link: {
        type: String,
        default: null
      }
		},

    data() {
      return {
        image_url: process.env.NUXT_ENV_STORAGE_URL,
      };
    },

    methods: {
      backTo() {
        setTimeout(() => {
          this.$store.dispatch('success/removeStoreSuccess', 'success-form');
          this.$router.push(`/dashboard/${this.link}`);
        }, 1000)
      }
    }
	}
</script>