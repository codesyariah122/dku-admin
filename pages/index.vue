<template>
  <div class="container mx-auto px-4 py-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">

        <div v-if="globalLoading">
          <molecules-row-loading :loading="globalLoading" options="user-login" />
        </div>
        
        <div v-if="errorUsers" id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Warning icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">Improve password difficulty.</div>
          <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
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

          <div v-if="errorLogin" class="flex py-6">
            <div
            :class="`${errorLogin === 'Your email not registered !' ? 'bg-danger-600' : 'bg-warning-300'} rounded-sm mb-4 text-base text-white font-bold capitalize w-full h-auto p-2`"
            role="alert"
            >
              {{ errorLogin }}
            </div>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form @submit.prevent="login">
              <div class="relative w-full mb-3">
                <input
                  v-model="form.email"
                  type="text"
                  :class="`${
                    error
                      ? 'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-red-600'
                      : 'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  }`"
                  id="exampleFormControlInput1"
                  placeholder="Email Address"
                />
                <div v-if="validation.email" class="flex py-6">
                  <div
                    class="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert"
                    >
                    <span class="font-medium"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;{{ validation.email[0] }}</span>
                  </div>
                </div>
              </div>

              <div class="relative">
                <input
                  v-model="form.password"
                  id="password"
                  :class="`${
                    error
                      ? 'pass1 h-12 w-full mt-6 rounded-lg outline-none p-2 border border-solid border-red-600 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-red-600'
                      : 'pass1 h-12 w-full border mt-6 rounded-lg outline-none p-2'
                  }`"
                  type="password"
                  placeholder="Password"
                />
                <i
                  @click="showingPassword"
                  :class="`fa ${
                    hidePassword ? 'fa-eye-slash' : 'fa-eye'
                  } eye_1 absolute top-10 right-3 cursor-pointer`"
                ></i>
                <div v-if="validation.password" class="flex py-6">
                  <div
                    class="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert"
                    >
                    <span class="font-medium"><i class="fa-solid fa-circle-exclamation"></i>&nbsp;{{ validation.password[0] }}</span>
                  </div>
                </div>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer py-6">
                  <input
                    @change="remember_me"
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  <div
                  v-if="loadingLogin"
                  role="status"
                  class="flex justify-center"
                  >
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Loading...
                  </div>
                  <span v-else> Sign in </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndexPage",
  layout: "auth",
  data() {
    return {
      loadingData: null,
      loadingLogin: null,
      loadingCheck: null,
      api_url: process.env.NUXT_ENV_API_URL,
      form: {},
      validation: [],
      errorLogin: "",
      hidePassword: true,
      error: false,
      showLogin: false,
      errorUsers: null
    };
  },

  beforeMount() {
    this.authTokenStorage();
  },

  mounted() {
    this.checkIsLogin();
  },

  methods: {
    remember_me() {
      this.form.checked = true;
    },

    showingPassword() {
      const password = document.querySelector("#password");
      if (password.type === "password") {
        password.type = "text";
        this.hidePassword = false;
      } else {
        password.type = "password";
        this.hidePassword = true;
      }
    },

    checkIsLogin() {
      if (this.token !== null) {
        this.loadingCheck = true;
        const endPoint = `/fitur/user-profile`;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };
        this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            if (data.data[0].logins[0].user_token_login === this.token.token) {
              this.$swal(
                "You are login",
                `You are login as a ${this.getRoles(
                  data.data[0].roles[0].name
                )}`,
                "warning"
              );
              setTimeout(() => {
                this.$router.replace({
                  path: `/dashboard/${this.getRoles(
                    data.data[0].roles[0].name
                  )}`,
                });
              }, 1500);
            }
          })
          .finally(() => (this.loadingCheck = false))
          .catch((err) => console.log(err));
      }
    },
    
    login() {
      this.errorLogin = false;
      this.loadingLogin = true;
      this.validation = [];
      const endPoint = `/auth/login`;
     
      this.$api
        .post(endPoint,{
          email: this.form.email,
          password: this.form.password,
          remember_me: this.form.checked ? this.form.checked : false,
        })
        .then(({ data }) => {
          if (data.is_login) {
            // this.$swal({
            //   icon: "warning",
            //   title: "Oops...",
            //   text: data.message + data.quote,
            // });
            const roles = this.getRoles(data.data.roles[0].name);
            const expires = [
              {
                expires_at: data.data.expires_at,
                remember_token: data.data.remember_token,
              }
            ];
            const token = data.data.logins.map((login) => login.user_token_login)

            this.saveExpires(expires[0]);

            this.saveLogin(token);

            if (roles !== "user") {
              this.$swal({
                position: "top-end",
                icon: "success",
                title: `Selamat datang , ${data.data.name}`,
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                this.$router.replace({
                  path: `/dashboard/${roles}`,
                });
              }, 1000);
            }
          }

          if (data.not_found) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: data.message,
            });
            this.errorUsers = true;
            this.error = true;
            this.form = {};
          }


          if (data.success || data.data.logins) {
            const roles = this.getRoles(data.data[0].roles[0].name);
            const token = data.data.map((d) =>
              d.logins.map((login) => login.user_token_login))[0];
            let expires = [];
            data.data.map((d) => {
              const prepare = {
                expires_at: d.expires_at,
                remember_token: data.remember_token,
              };
              expires.push(prepare);
            });

            this.saveExpires(expires[0]);

            this.saveLogin(token[0]);

            if (roles !== "user") {
              this.$swal({
                position: "top-end",
                icon: "success",
                title: `Selamat datang , ${data.data[0].name}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
            setTimeout(() => {
              this.$router.replace({
                path: `/dashboard/${roles}`,
              });
              // localStorage.setItem(
              //   "refresh-first",
              //   JSON.stringify({ reload: true })
              //   );
            }, 1000);
          } else {
            this.errorLogin = data.message;
            this.errorUsers = true;
            this.error = true;
            this.form = {};
            this.$swal({
              icon: "warning",
              title: "Oops...",
              text: data.message,
            });
          }
        })
        .catch((err) => {
          if (err?.message === 'Request failed with status code 400') {
            this.$swal({
              icon: "warning",
              title: "Oops...",
              text: "Column email & password cannot be empty",
            });

            this.errorUsers = true;
            this.error = true;
            this.errorLogin = "";
            this.validation = err?.response?.data;
            this.errorUsers = err.response.data.message === "User cannot access dashboard!" ? true : false
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loadingLogin = false;
          }, 1000);
        });
    },

    saveLogin(data) {
      this.$store.dispatch("auth/storeAuthLogin", data);
    },

    saveExpires(data) {
      this.$store.dispatch("auth/storeExpiredLogin", data);
    },

    getRoles(data) {
      const checkRole = JSON.parse(data);
      const roles = checkRole[0].toString().toLowerCase();
      return roles;
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },
  },
  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
