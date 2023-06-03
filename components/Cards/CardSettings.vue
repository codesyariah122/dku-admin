<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">{{title}}</h6>
        <button
          @click="backTo"
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        >
          Back
        </button>
      </div>
    </div>

    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <users-form-add v-if="pageType === 'userData'" />
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      pageType: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: null
      }
    },

    mounted() {
      console.log(this.title)
    },

    methods: {
      backTo() {
        console.log("ANJKING")
        this.$router.go(-1)
      }
    }
  }
</script>