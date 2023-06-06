<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">

      <cards-card-table
      color="dark"
      title="User Dashboard"
      :headers="headers"
      :columns="items"
      :loading="loading"
      :userName="userName"
      types="user-data"
      queryType="USER_DATA"
      queryMiddle="users-data"
      :success="success"
      :messageAlert="message_success"
      @close-alert="closeSuccessAlert"
      @deleted-data="deletedUser"
      @activation-user="activationUser"
      />

      <div class="mt-6 -mb-2">
        <div class="flex justify-end items-end">
          <molecules-pagination :links="links" :paging="paging" @fetch-data="getUserData"/>
        </div>
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
  import { getData, activateUser, deleteData } from "~/hooks/index";

  export default {
    name: "users-data",
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
      this.dataManagementEvent();
      this.getUserData();
      this.startCountdown();
    },

    beforeMount() {
      this.dataManagementEvent()
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
          data?.data?.map((cell) => {
            const prepareCell = {
              id: cell?.id,
              name: cell?.name,
              photo: cell.profiles.map(profile => profile?.photo ? profile?.photo : profile?.g_avatar)[0],
              email: cell?.email,
              role: cell?.role,
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
            this.scrollToTop();
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
          this.$toast.show(this.messageNotif, {
            type: "info",
            duration: 5000,
            position: "top-right",
          });
          this.message_success = this.messageNotif
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
