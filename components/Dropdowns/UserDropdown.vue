<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="!#"
      @click="toggleDropdown" ref="btnDropdownRef"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 border-0 border-none inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="
              image === null
                ? require('~/assets/img/team-1-800x800.jpg')
                : image
            "
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        :href="`/dashboard/${roles}`"
        class="capitalize text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:underline hover:text-blue-700 hover:decoration-double"
      >
        {{ name }}
      </a>

      <p
        class="text-sm py-2 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:underline hover:text-blue-700 hover:decoration-double"
      >
        {{ userData.email }}
      </p>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <nuxt-link
        to="/dashboard/settings/profile"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-600 hover:text-white"
      >
        Setting
      </nuxt-link>

      <a
        @click="logout(),dropdownPopoverShow=false"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-600 hover:text-white"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import image from "@/assets/img/team-1-800x800.jpg";

export default {
  data() {
    return {
      notifs: [],
      updateProfileNotifs: [],
      loadingData: null,
      api_url: process.env.NUXT_ENV_API_URL,
      dropdownPopoverShow: false,
      image: image,
      roles: "",
      name: "",
      userData: [],
      path: this.$route.path,
      image_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL,
      photo: "",
      messageNotif: "",
    };
  },

  created() {
    this.checkNewData();
    this.checkUpdateEvent();
    this.checkIsLogin();
  },

  methods: {
    toggleDropdown(event) {
      event.preventDefault()
      this.dropdownPopoverShow = !this.dropdownPopoverShow;

      if (this.dropdownPopoverShow) {
        createPopper(this.$refs?.btnDropdownRef, this.$refs?.popoverDropdownRef, {
          placement: "bottom-start",
        });

          // Menambahkan event listener pada dokumen
        document.addEventListener("click", this.hideDropdown);
      } else {
          // Menghapus event listener dari dokumen
        document.removeEventListener("click", this.hideDropdown);
      }
    },

    hideDropdown(event) {
        const targetElement = event.target;

        // Mengecek apakah elemen yang diklik berada di luar elemen referensi dan elemen popover
        if (
          !this.$refs?.btnDropdownRef.contains(targetElement) &&
          !this.$refs?.popoverDropdownRef.contains(targetElement)
          ) {
          this.dropdownPopoverShow = false;

          // Menghapus event listener dari dokumen
        document.removeEventListener("click", this.hideDropdown);
      }
    },


    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          this.messageNotif = e[0].notif;
          this.notifs.push(e[0]);
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
            if (data.data.logins[0].user_token_login === this.token.token) {
              setTimeout(() => {
                this.loadingData = false;
                this.userDataCheck(data.data);
              }, 500);
              this.userToken = data.data.logins.map(
                (d) => d.user_token_login
              );
              this.image =
                this.image_url +
                "/" +
                data.data.profiles.map((profile) => profile.photo)[0];

              this.userData = { ...data.data };
            } else {
              this.$router.replace("/");
            }
          })
          .catch((err) => {
            // console.log(err)
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
      if (this.$_.size(this.notifs) > 0) {
        this.checkIsLogin();
      }
    },
    updateProfileNotifs() {
      if (this.$_.size(this.updateProfileNotifs) > 0) {
        this.checkIsLogin();
      }
    },
  },
};
</script>
