<template>
  <div>
    <div v-if="globalLoading">
      <molecules-row-loading :loading="globalLoading" options="user-logout" />
    </div>
    <div v-else>
      <sidebar />
      <div class="relative md:ml-64 bg-blueGray-100">
        <admin-navbar ref="layoutRef"/>
        <header-stats />

        <div class="px-4 md:px-10 mx-auto w-full -m-24 py-6">
          <Nuxt />
          <footer-admin />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import autoLogoutMixin from '~/plugins/autoLogoutMixin.js';
  import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
  import Sidebar from "@/components/Sidebar/Sidebar.vue";
  import HeaderStats from "@/components/Headers/HeaderStats.vue";
  import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
  import globalMixin from "~/mixins/global";

  Vue.mixin(globalMixin);
  Vue.mixin(autoLogoutMixin);

  export default {
    mixins: [autoLogoutMixin, globalMixin],
    name: "admin-layout",
    components: {
      AdminNavbar,
      Sidebar,
      HeaderStats,
      FooterAdmin,
    },

    data() {
      return {
        api_url: process.env.NUXT_ENV_API_URL,
        expires_at: "",
        loading: null,
        roles: "",
        userEmail: "",
        userName: "",
        userRoles: "",
        emailForbaiden: "",

      };
    },

    // beforeRouteLeave(to, from, next) {
    //   this.$nuxt.$loading.start();
    //   next();
    // },

    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm.$nextTick(() => {
    //       vm.$nuxt.$loading.finish();
    //     });
    //   });
    // },

    created() {
      this.checkUserLogin();
    },

    mounted() {
      // document.addEventListener("visibilitychange", this.handleVisibilityChange);
      this.checkExpires();
      console.log(this.$refs.layoutRef.$children[1].$refs.popoverDropdownRef)
    },

    // beforeDestroy() {
    //   document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    // },

    methods: {
      // handleVisibilityChange() {
      //   if (document.hidden) {
      //     console.log("Automatic logout")
      //   // Panggil fungsi logout di sini
      //     this.roleUserExit();
      //   }
      // },

      checkExpires() {
        if (this?.token !== null) {
          this.loading = true;
          const endPoint = `/fitur/user-profile`;
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${this?.token?.token}`,
              'Dku-Api-Key': process.env.NUXT_ENV_APP_TOKEN
            },
          };
          this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            const roles = this.$role(data.data[0].roles[0].name);
            const now = this.$moment().format("LLLL");
            const expires_at = this.$moment(data.data[0].expires_at).format(
              "LLL"
              );

            this.roles = roles;

            if (roles === "USER") {
              this.roleUserExit();
            }

            this.userRoles = roles;

            this.userEmail = data.data[0].email;

            this.userName = data.data[0].profiles[0].username;

            if (now > expires_at && data.data[0].remember_token === null) {
              this.$toast.show("Sesi login telah habis", {
                type: "info",
                duration: 2000,
                position: "top-right",
              });

              this.sesiLogout(roles);
              this.$store.dispatch("auth/removeAuthToken", "auth");
              this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false;
            }, 1500)
          })
          .catch((err) => {
            console.log(err)
            if (err) {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Forbaiden Access!",
              });
              this.roleUserExit();
              this.$store.dispatch("auth/removeAuthToken", "auth");
              this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
              setTimeout(() => {
                this.$router.replace("/");
              }, 500);
            }
          });
        } else {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Error Access!",
          });
          this.$router.replace("/");
        }
      },
    },

    watch: {
      notifs() {
        if (this.$_.size(this.notifs) > 0) {
        // console.log(this.notifs[0][0].emailForbaiden)
          this.checkExpires();
          if (this.notifs[0][0].emailForbaiden === this.userEmail) {
            this.$toast.show(this.messageNotifs, {
              type: "info",
              duration: 5000,
              position: "top-right",
            });
          }
        }
      },
    },
  };
</script>
