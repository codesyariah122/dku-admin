<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">

      <cards-card-table
        color="dark"
        title="User Donation"
        :headers="headers"
        :columns="items"
        types="user-data"
        :loading="loading"
        @deleted-data="deletedUser"
        @activation-user="activationUser"
      />

      <molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>

    </div>
  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
 import { USER_DATA_TABLE } from "~/utils/tables-organizations";
import { getData, activateUser } from "~/hooks/index";


export default {
  name: "uses-donation",
  layout: "admin",

  data() {
    return {
      loading: null,
      options: '',
      success: null,
      message_success: '',
      notifs: [],
      dataNotifs: [],
      message: '',
      headers: [...USER_DATA_TABLE],
      api_url: process.env.NUXT_ENV_API_URL,
      items: [],
    };
  },

  created() {
    this.checkNewData();
    this.dataManagementEvent();
    this.checkUpdateEvent();
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

    dataManagementEvent() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "DataManagementEvent",
        (e) => {
          this.message = e[0].notif;
          this.dataNotifs.push(e[0]);
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
        api_url: `${this.api_url}/fitur/user-management?role=USER`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
        .then(({ data }) => {
          let cells = []
          data.map((cell) => {
            // console.log(cell)
            const prepareCell = {
              id: cell.id,
              name: cell.name,
              email: cell.email,
              role: cell.role,
              phone: cell.phone,
              status: cell.status,
              last_login: cell.last_login,
              token: cell.logins.map((data) => data.user_token_login)[0],
              expires_at: cell.expires_at,
              is_login: cell.is_login,
              endTime: new Date(cell.expires_at),
              countdown: "",
              username: cell.profiles.map((profile) => profile.username)[0]
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
        })
        .catch((err) => console.log(err));
    },

    deletedUser(id) {
      console.log(id);
    },

    activationUser(id) {
      this.loading = true
      this.options = 'activation-user';
      activateUser({
        api_url: `${this.api_url}/auth/activation/${id}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN,
        data: this.activation_id ? this.activation_id : null
      })
      .then(({data}) => {
        if(data.status === 'ACTIVE') {
          this.success = true;
          this.message_success = `${data.name}, berhasil di aktivasi !`
        }
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false
          this.options = ''
        }, 1000)
      })
      .catch((err) => console.error(err))
    },

    closeSuccessAlert() {
      this.success = false
      this.message = ''
    }
  },

  watch: {
    notifs() {
      if (this.$_.size(this.notifs) > 0) {
        this.getUserData();
      }
    },
    dataNotifs() {
      if (this.$_.size(this.dataNotifs) > 0) {
        this.$toast.show(this.message, {
          type: "info",
          duration: 5000,
          position: "top-right",
        });
        this.getUserData();
      }
    },
    updateProfileNotifs() {
      if(this.$_.size(this.updateProfileNotifs) > 0) {
        this.getUserData();
      }
    }
  },
};
</script>
