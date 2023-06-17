<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">My account</h6>
        <button
        @click="$router.go(-1)"
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          Back
        </button>
      </div>

      <div class="flex justify-center mt-4 mb-4">
        <div>
          <molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
        </div>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form @submit.prevent="updateProfile">
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Fullname
              </label>
              <input
                type="text"
                id="name"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model='user.name'
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="text"
                id="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="user.email"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <vue-tel-input v-if="user.phone" name="phone" id="phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="62+xxxx xxxx xxx" v-model="user.phone" style="height: 50px;"></vue-tel-input>
              <vue-tel-input v-else name="phone" id="phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="62+xxxx xxxx xxx" v-model="input.phone" style="height: 50px;"></vue-tel-input>
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                disabled
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="profiles.username"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Contact Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                v-model="profiles.address"
                id="address"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
              /></textarea>
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="profiles.city"
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="province"
              >
                Province
              </label>
              <input
                type="text"
                id="province"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="profiles.province"
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="profiles.country"
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="post_code"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="post_code"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="profiles.post_code"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          About Me
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="about"
              >
                About me
              </label>
              <wysiwyg v-model="profiles.about" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="about"/>
            </div>
          </div>

          <div class="flex-shrink-0 lg:w-12/12 w-full py-10">
            <button type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              <div v-if="loading">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading...
              </div>
              <span v-else><i class="fa-solid fa-plus"></i> Update Data</span>
            </button>
          </div>
        </div>

        <div v-if="loading">
          <molecules-row-loading :loading="loading" :options="options" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { getData } from "~/hooks/index";

  export default {
    data() {
      return {
        loading: null,
        success: null,
        message_success: '',
        options: "",
        image: '',
        img_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL,
        api_token: process.env.NUXT_ENV_APP_TOKEN,
        user: {},
        profiles: {},
        roles: {},
        input: {}
      };
    },

    created() {
      this.prepareProfileData();
    },


    methods:{
      updateProfile() {
        try {
          this.loading = true;
          this.options = 'update-profile';
          const dataProfile = {
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone ? this.user.phone : this.input.phone,
            address: this.profiles.address,
            city: this.profiles.city,
            province: this.profiles.province,
            post_code: this.profiles.post_code,
            about: this.profiles.about
          }

          const endPoint = `/fitur/update-profile`;
          const config = {
            headers: {
              Accept: "application/json",
            },
          };

          this.$api.defaults.headers.common["Authorization"] = `Bearer ${this.token.token}`;
          this.$api.defaults.headers.common["Dku-Api-Key"] = this.api_token;

          this.$api.put(endPoint, dataProfile, config)
          .then(({data}) => {
            if(data.success) {
              this.$toast.show(data.message, {
                type: "success",
                duration: 2500,
                position: "top-right",
                icon: 'check-double'
              });
              this.success = true
              this.message_success = data.message
              this.scrollToTop();
              this.$emit('refetch-data');
              this.prepareProfileData();
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
              this.options = ""
            }, 1500)
          })
          .catch((err) => {
            console.log(err)
          })
        } catch(err) {
          console.error(err)
        }
      },

      prepareProfileData() {
        if (this.token !== null) {
          this.loadingData = true;
          const endPoint = `${this.api_url}/fitur/user-profile`;
          const config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
          };
          this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            if (data.data.logins[0].user_token_login === this.token.token) {
              this.image = this.img_url + "/" + data.data.profiles.map((profile) => profile.photo)[0];
              this.user = { ...data.data };
              this.profiles = {...data.data.profiles[0]}
              this.roles = {...data.data.roles[0]}
            } else {
              this.$router.replace("/");
            }
          })
          .catch((err) => {
            console.log(err)
          });
        }
      },

      getUserData(page=1, name='') {
        // this.loading = loading ? loading : true;
        getData({
          api_url: `${this.api_url}/fitur/user-management?page=${page}&name=${name}`,
          token: this.token.token,
          api_key: this.api_token
        })
        .then((data) => {
          let cells = []
          data?.data?.map((cell) => {
            const prepareCell = {
              id: cell?.id,
              name: cell?.name,
              photo: cell.profiles.map(profile => profile?.photo ? profile?.photo : profile?.g_avatar)[0],
              email: cell?.email,
              role: this.$role(cell?.roles.map(role => role.name)),
              phone: cell?.phone,
              status: cell?.status,
              expires_at: cell?.expires_at,
              activation_id: cell?.activation_id ? cell?.activation_id : null,
              token: cell?.logins?.map((data) => data.user_token_login)[0],
              last_login: cell?.last_login,
              is_login: cell?.is_login,
              endTime: new Date(cell?.expires_at),
              countdown: "",
              username: cell?.profiles?.map((profile) => profile?.username)[0]
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
          this.links = data?.meta?.links
          this.paging.current = data?.meta?.current_page
          this.paging.from = data?.meta?.from
          this.paging.last = data?.meta?.last_page
          this.paging.per_page = data?.meta?.per_page
          this.paging.total = data?.meta?.total
        })
        .catch((err) => console.log(err));
      },

      closeSuccessAlert() {
        this.success = false
        this.message_success = ''
      }
    },

    watch: {
      dataNotifs() {
        if (this.$_.size(this.dataNotifs) > 0) {
          this.getUserData();
        }
      },
    }
  }
</script>