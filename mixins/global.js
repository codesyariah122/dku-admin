/**
 * @author: pujiermanto@gmail.com
 * @globals: method reusable for any component and any source
 */

export default {
  data() {
    return {
      globalLoading: null,
      expires_at: null,
      api_url: process.env.NUXT_ENV_API_URL,
      notifs: [],
      message: null,
      userEmail: "",
      emailForbaiden: "",
      cells: [],
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  created() {
    this.checkNewData();
  },

  mounted() {
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          this.notifs.push(e);
          this.message = e[0].notif;
        }
      );
    },

    roleUserExit() {
      const endPoint = `${this.api_url}/auth/logout`;
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
              title: "Oops...",
              text: "you are not allowed to access this page!",
            });
            this.$store.dispatch("auth/removeAuthToken", "auth");
            this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
            setTimeout(() => {
              if (this.path === "/") {
                location.reload();
              } else {
                this.$router.replace("/");
              }
            }, 1500);
          }
        })
        .catch((err) => console.log(err));
    },

    sesiLogout(roles = "") {
      const endPoint = `${this.api_url}/auth/logout`;
      this.$api.defaults.headers.common["Accept"] = "application/json";
      this.$api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.token.token}`;
      this.$api
        .post(endPoint)
        .then(({ data }) => {
          if (data.success) {
            this.$swal(`Sesi login habis!`, "", "success");
            this.$store.dispatch("auth/removeAuthToken", "auth");
            this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
            setTimeout(() => {
              if (this.path === "/") {
                location.reload();
              } else {
                this.$router.replace("/");
              }
            }, 1500);
          }
        })
        .catch((err) => console.log(err));
    },

    logout() {
      this.$swal({
        title: `kamu akan segera keluar dari Dashboard ${this.roles} ?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Keluar",
        denyButtonText: `Batal`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.globalLoading = true;
          const endPoint = `${this.api_url}/auth/logout`;
          this.$api.defaults.headers.common["Accept"] = "application/json";
          this.$api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token.token}`;
          this.$api
            .post(endPoint)
            .then(({ data }) => {
              if (data.success) {
                this.$swal(`Logout Berhasil!`, "", "success");
                this.$store.dispatch("auth/removeAuthToken", "auth");
                this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
                setTimeout(() => {
                  if (this.path === "/") {
                    location.reload();
                  } else {
                    this.$router.replace("/");
                  }
                }, 1500);
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setTimeout(() => {
                this.globalLoading = false;
              }, 500);
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },

    tableCells(props) {
      let cells = [];
      switch (props.type) {
        case "user-data":
          props.cells.map((cell) => {
            const prepareCell = {
              name: cell.name,
              email: cell.email,
              phone: cell.phone,
              status: cell.status,
              last_login: cell.last_login,
              expires_at: cell.expires_at,
              is_login: cell.is_login,
              countdown: cell.countdown,
              endTime: cell.endTime
            };
            cells.push(prepareCell);
          });
          break;

        case "user-role":
          props.cells.map((cell) => {
            const prepareCell = {
              name: this.$role(cell.name),
              users: cell.users.map(user => user.name)
            };
            cells.push(prepareCell);
          });
          break;
        default:
          cells.push([]);
      }
      this.cells = [...cells];
    },

  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
  watch: {
    notifs() {
      if (this.notifs?.length > 0) {
        console.log(":CREATED");
      }
    },
  },
};
