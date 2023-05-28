<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <span
        class="text-xs font-semibold inline-block py-2 px-2 rounded text-emerald-600 bg-emerald-200 capitalize last:mr-0 mr-1"
      >
        Sesi login: {{ countdown }}
      </span>

      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <li class="mr-12">
          <dropdowns-notification-dropdown />
        </li>
        <li class="inline-block relative">
          <dropdowns-user-dropdown />
        </li>
      </ul>
    </div>
    <div v-if="userDonationLogin" id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">{{userDonationLoginMessage}}</div>
        <button type="button" @click="() => userDonationLogin = false" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
export default {
  data() {
    return {
      countdown: "",
      userDonationLogin: null
    };
  },

  created() {
    this.checkUserLogin();
  },

  mounted() {
    this.expiredCountDown();
    this.userDonationEvent();
  },

  methods: {
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
          hours > 0 ? hours + " jam, " : ""
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
  },
  watch: {
    userDontaionLoginNotifs() {
      if (this.$_.size(this.userDontaionLoginNotifs) > 0) {
        this.userDonationLogin = true
      }
    },
  }
};
</script>
