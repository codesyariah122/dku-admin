<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <Loading v-if="loading" />
      <cards-card-table
      color="dark"
      title="User Dashboard"
      :headers="headers"
      :columns="items"
      types="user-data"
      @deleted-data="deletedUser"
      @activation-user="activationUser"
      />
    </div>
    <div class="w-full mt-2 px-36">
      <div v-if="success" id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">{{message_success}}</div>
        <button @click="() => success = false" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
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
  import { getData, activateUser} from "~/hooks/index";

  export default {
    name: "users-data",
    layout: "admin",

    data() {
      return {
        loading: null,
        success: null,
        message_success: '',
        headers: [...USER_DATA_TABLE],
        api_url: process.env.NUXT_ENV_API_URL,
        items: [],
        notifs: [],
        activation_id: null
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
      timerData(item, timeLeft) {
        const dataTime = {
          seconds: Math.floor((timeLeft / 1000) % 60),
          minutes: Math.floor((timeLeft / 1000 / 60) % 60),
          hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        }
        return dataTime;
      },

      checkNewData() {
        window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
          "EventNotification",
          (e) => {
          // console.log(e[0].notif)
            this.notifs.push(e);
            this.messageNotifs = e[0].notif;        }
            );
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
                hours > 0 ? hours + " jam, " : ""
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
          api_key: process.env.NUXT_ENV_APP_TOKEN
        })
        .then(({ data }) => {
          let cells = []
          data.map((cell) => {
            const prepareCell = {
              id: cell.id,
              name: cell.name,
              email: cell.email,
              role: cell.role,
              phone: cell.phone,
              status: cell.status,
              expires_at: cell.expires_at,
              activation_id: cell.activation_id ? cell.activation_id : null,
              token: cell.logins.map((data) => data.user_token_login)[0],
              last_login: cell.last_login,
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
          }, 1000)
        })
        .catch((err) => consol.error(err))
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
          this.getTotalUser();
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
