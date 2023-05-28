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
      dataNotifs: [],
      updateProfileNotifs: [],
      messageNotifs: null,
      userEmail: "",
      emailForbaiden: "",
      cells: [],
      userData: []
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  created() {
    this.checkNewData();
  },


  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          // console.log(e[0].notif)
          if(e[0].type !== 'logout') {
            this.notifs.push(e);
            this.messageNotifs = e[0].notif;
          }
        }
      );
    },

    dataManagementEvent() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "DataManagementEvent",
        (e) => {
          this.dataNotifs.push(e[0]);
        }
      );
    },

    checkUpdateEvent() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "UpdateProfileEvent",
        (e) => {
          this.updateProfileNotifs.push(e[0]);
        }
      );
    },

    roleUserExit() {
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
            }, 500);
          }
        })
        .catch((err) => console.log(err));
    },

    sesiLogout(roles = "") {
      const endPoint = `/auth/logout`;
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
            }, 500);
          }
        })
        .catch((err) => console.log(err));
    },

    removeAuth() {
      this.$store.dispatch("auth/removeAuthToken", "auth");
      this.$store.dispatch("auth/removeExpiredLogin", "expired_at");
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
          const endPoint = `/auth/logout`;
          this.$api.defaults.headers.common["Accept"] = "application/json";
          this.$api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token.token}`;
          this.$api
            .post(endPoint)
            .then(({ data }) => {
              if (data.success) {
                this.$swal(`Logout Berhasil!`, "", "success");
                this.removeToken();
                setTimeout(() => {
                  this.$router.replace("/");
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
          this.$swal("Changes are not saved", "", "info");
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

    checkUserLogin() {
      if (this?.token !== null) {
        const endPoint = `/fitur/user-profile`;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this?.token?.token}`,
          },
        };
        this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            this.userData = {...data.data[0]}
          })
          .catch((err) => {
            console.log(err)
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

    getTotalUser() {
      this.$store.dispatch("totals/totalDataQuery", {
        api_url: this.api_url,
        type: "TOTAL_USER",
        token: this.token,
      });
    },

    getTotalCampaign() {
      this.$store.dispatch("totals/totalDataQuery", {
        api_url: this.api_url,
        type: "TOTAL_CAMPAIGN",
        token: this.token,
      });
    },

    getUserOnline() {
      this.$store.dispatch("totals/totalUserOnline", {
        api_url: this.api_url,
        token: this.token,
      });
    },

  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
  watch: {
    notifs() {
      if (this.$_.size(this.notifs) > 0) {
        console.log(":CREATED");
      }
    },
  },
};
