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
  </nav>
  <!-- End Navbar -->
</template>

<script>
export default {
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
