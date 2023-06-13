<template>
  <div v-if="successNew || methodType !== 'add'"
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >

    <campaigns-form-detail 
      v-if="pageType === 'campaignData'"
      :detail="detail"
      :link="link"
    />

    <users-form-detail
      v-if="pageType === 'userData'"
      :detail="detail"
      :link="link"
      :methodType="methodType"
      :successNew="successNew"
      :messageNew="messageNew"
      @close-alert="closeSuccessAlert"
    />
   
  </div>
</template>
<script>
export default {
  props: {
    pageType: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    methodType: {
      type: String,
      default: null
    },
    title: {
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
    detail: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  methods: {
    closeSuccessAlert() {
      this.$emit('close-alert')
    }
  }
};
</script>
