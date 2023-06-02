<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">

      <h1>
        Add new user
      </h1>

    </div>
    <molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>
  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
  import { USER_DATA_TABLE } from "~/utils/tables-organizations";
  import { getData, activateUser, deleteData } from "~/hooks/index";

  export default {
    name: "add-user",
    layout: "admin",

    data() {
      return {
        loading: null,
        options: '',
        success: null,
        message_success: '',
        headers: [...USER_DATA_TABLE],
        api_url: process.env.NUXT_ENV_API_URL,
        items: [],
        notifs: [],
        activation_id: null,
        links: [],
        paging: {
          current: null,
          from: null,
          last: null,
          per_page: null,
          total: null
        },
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

      getUserData(loading, loadingDelete, page=1, name='') {
        getData({
          api_url: `${this.api_url}/fitur/user-management?page=${page}&name=${name}`,
          token: this.token.token,
          api_key: process.env.NUXT_ENV_APP_TOKEN
        })
        .then((data) => {
          let cells = []
          data.data.map((cell) => {
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
          this.links = data.meta.links
          this.paging.current = data.meta.current_page
          this.paging.from = data.meta.from
          this.paging.last = data.meta.last_page
          this.paging.per_page = data.meta.per_page
          this.paging.total = data.meta.total
        })
        
        .catch((err) => console.log(err));
      },

      deletedUser(id) {
        this.loading = true
        this.options = 'delete-user';
        deleteData({
          api_url: `${this.api_url}/fitur/user-management/${id}`,
          token: this.token.token,
          api_key: process.env.NUXT_ENV_APP_TOKEN
        })
        .then(({data}) => {
          if(data.deleted_at != null) {
            this.success = true;
            this.message_success = this.dataNotifs[0].notif
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
            this.options = ''
          }, 1000)
        })
        .catch((err) => console.log(err))
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
            this.message_success = this.dataNotifs[0].notif
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
