<template>
  <div class="container mx-auto px-4 py-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">

        <div v-if="globalLoading">
          <molecules-row-loading :loading="globalLoading" options="user-login" />
        </div>
       

        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 h-auto"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <router-link
                class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                to="/"
              >
                <img
                  :src="require('~/assets/img/logo-dku.png')"
                  style="max-width: 150px"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "activity-force-logout",
  layout: "auth",
  
  mounted() {
    this.forceNow();
  },

  methods: {
    forceNow() {
      const queryToken = this.$route.query.token;
      console.log(queryToken);
      this.$swal({
        title: "Really you ?",
        text: "If you are the owner of this account, please do a force logout !",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#FF0000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Force Logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.forceLogout(queryToken);
        }
      })
    }
  }
};
</script>
