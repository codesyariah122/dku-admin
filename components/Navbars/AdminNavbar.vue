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
      <!-- Form -->
      <form
        class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
      >
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
          >
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search here..."
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form>
      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <dropdowns-user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
export default {
  props: ['userData'],
  data() {
    return {
      countdown: "",
    };
  },

  created() {
    this.expiredCountDown();
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
  },
};
</script>
