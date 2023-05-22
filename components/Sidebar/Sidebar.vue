<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-2 mb-4 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        :to="`/dashboard/${roles}`"
      >
        <img
          :src="require('~/assets/img/logo-dku.png')"
          style="max-width: 150px"
        />
      </router-link>

      <span
        class="text-xs font-semibold inline-block py-2 px-2 rounded text-emerald-600 bg-emerald-200 capitalize last:mr-0 mr-1"
      >
        Sesi login: {{ countdown }}
      </span>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-screen items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                :to="`/dashboard/${roles}`"
              >
                <img
                  :src="require('~/assets/img/logo-dku.png')"
                  style="max-width: 100px"
                />
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="border-0 px-3 py-2 h-12 border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />

        <div
          v-if="loadingMenu"
          class="fixed top-48 left-0 w-64 h-screen pt-32 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
          role="status"
        >
          <div class="flex justify-center">
            <div>
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="menu in menus" :key="menu.id">
            <!-- Heading -->
            <h6
              class="md:min-w-full text-blueGray-600 text-sm uppercase font-bold block pt-1 pb-4 no-underline"
            >
              {{ menu.menu }}
            </h6>
            <!-- Navigation -->

            <ul class="md:flex-col md:min-w-full flex flex-col list-none">
              <li
                v-for="sub in menu.sub_menus"
                :key="sub.id"
                class="items-center"
              >
                <div v-if="menu.sub_menus !== []">
                  <router-link
                    :to="`/dashboard/${sub.link}`"
                    v-slot="{ href, navigate, isActive }"
                  >
                    <a
                      :href="href"
                      @click="navigate"
                      class="text-xs uppercase py-3 font-bold block"
                      :class="[
                        isActive
                          ? 'text-purple-700 hover:text-blueGray-800'
                          : 'text-blueGray-700 hover:text-blueGray-500',
                      ]"
                    >
                      <i :class="`fa-solid fa-${sub.icon} mr-2 text-sm`"></i>
                      {{ sub.menu }}
                    </a>
                  </router-link>
                </div>
                <span v-else>{{ "-" }}</span>
              </li>
            </ul>
            <!-- Divider -->
            <hr class="my-4 md:min-w-full" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      collapseShow: "hidden",
      notifs: [],
      userData: [],
      notifType: "",
      loadingData: null,
      loadingMenu: null,
      api_url: process.env.NUXT_ENV_API_URL,
      image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
      roles: "",
      name: "",
      path: this.$route.path,
      image_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL,
      photo: "",
      messageNotif: "",
      menus: [],
      menuSubMenuNotifs: [],
      countdown: "",
    };
  },

  components: {
    NotificationDropdown,
    UserDropdown,
  },

  beforeMount() {
    this.authTokenStorage();
  },

  created() {
    this.checkNewMenuSubMenu();
    this.checkNewData();
  },

  created() {
    this.expiredCountDown();
  },

  mounted() {
    this.checkIsLogin();
    this.userAccessMenu();
  },

  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },

    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          this.messageNotif = e[0].notif;
          this.notifs.push(e[0]);
          e.map((d) => (this.notifType = d.type));
        }
      );
    },

    expiredCountDown() {
      setInterval(() => {
        // Waktu saat ini
        const endTime = new Date(this.userData.expires_at);
        let currentTime = new Date().getTime();

        // Selisih antara waktu akhir dan waktu saat ini
        let timeLeft = endTime - currentTime;

        // Konversi selisih waktu menjadi detik, menit, dan jam
        let seconds = Math.floor((timeLeft / 1000) % 60);
        let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        // Format waktu mundur
        this.countdown = `${days > 0 ? days + " hari, " : ""} ${
          hours > 0 ? hours + " hari, " : ""
        } ${minutes > 0 ? minutes + " menit, " : ""} ${
          seconds > 0 ? seconds + " detik" : ""
        }`;

        // Hentikan penghitungan waktu mundur jika waktu telah habis
        if (timeLeft < 0) {
          clearInterval(countdownInterval);
          this.countdown = "Waktu telah habis!";
        }
      }, 1000);
    },

    checkNewMenuSubMenu() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "MenuSubMenuManagement",
        (e) => {
          this.menuSubMenuNotifs.push(e[0]);
        }
      );
    },

    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    userAccessMenu() {
      if (this.token !== null) {
        this.loadingMenu = true;
        const endPoint = `${this.api_url}/fitur/access-menu`;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.token.token}`,
          },
        };

        this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            this.menus = { ...data.menus };
          })
          .finally(() => {
            setTimeout(() => {
              this.loadingMenu = false;
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    checkIsLogin() {
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
            if (data.data[0].logins[0].user_token_login === this.token.token) {
              setTimeout(() => {
                this.loadingData = false;
                this.userDataCheck(data.data[0]);
              }, 500);
              this.userToken = data.data[0].logins.map(
                (d) => d.user_token_login
              );
              this.image =
                this.image_url +
                "/" +
                data.data[0].profiles.map((profile) => profile.photo)[0];
              this.userData = { ...data.data[0] };
            } else {
              this.$router.replace("/");
            }
          })
          .catch((err) => {
            if (err.error) {
              // this.$router.replace("/auth/login")
              this.sesiLogout(this.roles ? this.roles : "");
            }
          });
      }
    },

    userDataCheck(userData) {
      this.roles = this.getRoles(userData.roles[0].name);
      this.name = userData.name;
    },

    getRoles(data) {
      const checkRole = JSON.parse(data);
      const roles = checkRole[0].toString().toLowerCase();
      return roles;
    },
  },

  watch: {
    notifs() {
      if (this.notifs?.length > 0) {
        this.checkIsLogin();
      }
    },
    menuSubMenuNotifs() {
      if (this.menuSubMenuNotifs.length > 0) {
        this.userAccessMenu();
      }
    },
  },

  computed: {
    token() {
      return this.$store.getters["auth/getAuthToken"];
    },
  },
};
</script>
