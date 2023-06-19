<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img
              alt="..."
              :src="`${image_url}/${detail.photo}`"
              class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
            />
          </div>
        </div>

        <div class="w-full px-4 text-center mt-20">
          <div v-if="methodType !== 'add'" class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                22
              </span>
              <span class="text-sm text-blueGray-400">Friends</span>
            </div>
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                10
              </span>
              <span class="text-sm text-blueGray-400">Photos</span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                89
              </span>
              <span class="text-sm text-blueGray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <h3
          class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
        >
          {{detail.users[0].name}}
        </h3>
        <div v-if="successNew" class="flex justify-center">
          <molecules-success-alert :success="successNew" :messageAlert="messageNew" @close-alert="closeSuccessAlert"/>
        </div>
        <div v-if="methodType !== 'add'"
          class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {{detail.city}}, {{detail.district}}
        </div>
        <div class="mb-2 text-blueGray-600 mt-10">
          <i class="fas fa-paper-plane mr-2 text-lg text-blueGray-400"></i>
          Email - {{detail.users[0].email}}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-circle-user mr-2 text-lg text-blueGray-400"></i>
          Username - {{detail.username}}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-user-shield mr-2 text-lg text-blueGray-400"></i>
          Role - {{$role(detail.users[0].roles[0].name)}}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i :class="`fas ${detail.users[0].status === 'ACTIVE' ? 'fa-person-circle-check' : 'fa-hourglass'} mr-2 text-lg text-blueGray-400`"></i>
          Status - {{detail.users[0].status}}
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div v-if="methodType !== 'add'" class="flex flex-wrap justify-center">
          <div class="w-full lg:w-9/12 px-4">
            <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
              records all of his own music, giving it a warm, intimate feel with
              a solid groove structure. An artist of considerable range.
            </p>
            <a href="javascript:void(0);" class="font-normal text-emerald-500">
              Show more
            </a>
          </div>
        </div>

        <button @click="backTo" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <i class="fa-solid fa-chevron-left fa-lg"></i> Back
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import team2 from "@/assets/img/team-2-800x800.jpg";

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
    },
    methodType: {
      type: String,
      default: null
    },
    successNew: {
      type: Boolean,
      default: null
    },
    messageNew: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      team2,
      image_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL,
    };
  },

  mounted() {
    // console.log(this.link)
  },

  methods: {
    backTo() {
      setTimeout(() => {
        this.$store.dispatch('success/removeStoreSuccess', 'success-form');
        this.$router.push(`/dashboard/${this.link}`);
      }, 1000)
    },

    closeSuccessAlert() {
      this.$emit('close-alert')
    }
  }

};
</script>
