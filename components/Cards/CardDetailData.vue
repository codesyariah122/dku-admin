<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <campaigns-campaign-detail
      v-if="type === 'campaigns-data'"
      :imageUrl="image_url"
      :detail="detail"
      @back-to="backTo"
    />

    <users-user-detail
      v-if="type === 'users-data'"
      :imageUrl="public_asset"
      :detail="detail"
      @back-to="backTo"
    />

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
    type: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      image_url: process.env.NUXT_ENV_STORAGE_URL,
      public_asset: process.env.NUXT_ENV_ASSET_PUBLIC_URL
    };
  },

  methods: {
    backTo() {
      setTimeout(() => {
        this.$router.go(-1);
      }, 500)
    }
  }
};
</script>
