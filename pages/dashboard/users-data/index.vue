<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table
        color="dark"
        :headers="headers"
        :columns="items"
        types="user-data"
      />
    </div>
  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
import CardTable from "@/components/Cards/CardTable.vue";
import { USER_DATA_TABLE } from "~/utils/tables-organizations";
import { getData } from "~/hooks/getData/index";

export default {
  name: "users-data",
  layout: "admin",
  components: {
    CardTable,
  },

  data() {
    return {
      notifs: [],
      headers: [...USER_DATA_TABLE],
      api_url: process.env.NUXT_ENV_API_URL,
      items: [],
    };
  },

  created() {
    this.checkNewData();
  },

  mounted() {
    this.getUserData();
    this.startCountdown();
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          this.notifs.push(e[0]);
        }
      );
    },

    timerData(item, timeLeft) {
      const dataTime = {
        seconds: Math.floor((timeLeft / 1000) % 60),
        minutes: Math.floor((timeLeft / 1000 / 60) % 60),
        hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      }
      return dataTime;
    },

    startCountdown() {
      setInterval(() => {
        this.items.forEach((item) => {
          const currentTime = new Date().getTime()
          const timeLeft = item.endTime - currentTime
          let {
            seconds,
            minutes,
            hours,
            days
          } = this.timerData(item, timeLeft)


          if (item.endTime !== null) {
            item.countdown = `${days > 0 ? days + " hari, " : ""} ${
              hours > 0 ? hours + " hari, " : ""
            } ${minutes > 0 ? minutes + " menit, " : ""} ${
              seconds > 0 ? seconds + " detik" : ""
            }`;
          } else {
            item.countdown = null;
          }

          if (timeLeft < 0 && item.endTime !== null) {
            item.countdown = "Sesi login berakhir!";
          }
        });
      }, 1000);
    },

    getUserData() {
      getData({
        api_url: `${this.api_url}/fitur/user-management`,
        token: this.token.token,
      })
        .then(({ data }) => {
          let cells = []
          data.data.map((cell) => {
            const prepareCell = {
              id: cell.id,
              name: cell.name,
              email: cell.email,
              phone: cell.phone,
              status: cell.status,
              last_login: cell.last_login,
              expires_at: cell.expires_at,
              is_login: cell.is_login,
              endTime: new Date(cell.expires_at),
              countdown: "",
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
        })
        .catch((err) => console.log(err));
    },
  },

  watch: {
    notifs() {
      if (this.notifs?.length > 0) {
        this.getUserData();
      }
    },
  },
};
</script>
