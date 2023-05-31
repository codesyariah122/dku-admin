export default {
  data() {
    return {
      idleTime: 900000, // Waktu idle dalam milidetik (15 menit)
      logoutTimer: null,
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.resetLogoutTimer();
    window.addEventListener('mousemove', this.resetLogoutTimer);
    window.addEventListener('keydown', this.resetLogoutTimer);
    window.addEventListener('resize', this.resetLogoutTimer);
  },
  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    resetLogoutTimer() {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = setTimeout(() => {
        // Panggil metode logout atau logika logout
        this.logoutSession();
      }, this.idleTime);
    },

    removeAuth() {
      this.$store.dispatch("auth/removeAuthToken", "auth");
      this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
    },

    logoutSession() {
      const endPoint = `/auth/logout`;
      this.$api.defaults.headers.common["Accept"] = "application/json";
      this.$api.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${this.token.token}`;

      this.$api
      .post(endPoint)
      .then(({ data }) => {
        if (data.success) {
          this.$swal({
            icon: "error",
            title: "Bye ...",
            text: "Sesi login habis!",
          });
          this.removeAuth()
          setTimeout(() => {
            this.$router.replace("/");
          }, 500);
        }
      })
      .catch((err) => console.log(err));
    },
  },
  beforeDestroy() {
    clearTimeout(this.logoutTimer);
    window.removeEventListener('mousemove', this.resetLogoutTimer);
    window.removeEventListener('keydown', this.resetLogoutTimer);
    window.removeEventListener('resize', this.resetLogoutTimer);
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
