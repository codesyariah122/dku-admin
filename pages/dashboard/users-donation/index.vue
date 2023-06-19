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
        queryType="USER_DATA"
        queryRole="USER"
        queryMiddle="users-donation"
        :success="success"
        :messageAlert="message_success"
        @deleted-data="deletedUser"
        @activation-user="activationUser"
        @close-alert="closeSuccessAlert"
        @filter-data="handleFilterUser"
      />

      <div class="mt-12 mb-1">
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
  name: "users-donation",
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
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
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

    handleFilterUser(param, types) {
      if(types === 'user-data') {
        this.getUserData(1, param.name, param.roles);
      }
    },

    getUserData(page=1, name='', roles='') {
      getData({
        api_url: `${this.api_url}/fitur/user-management?role=USER&page=${page}&name=${name}&roles=${roles}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
      .then((data) => {
        let cells = []
        data?.data?.map((cell) => {
          const prepareCell = {
            id: cell?.id,
            name: cell?.name,
            photo: cell?.profiles?.map(profile => profile?.photo ? profile?.photo : profile?.g_avatar)[0],
            email: cell?.email,
            role: this.$role(cell?.roles.map(role => role?.name)),
            phone: cell?.phone,
            status: cell?.status,
            expires_at: cell?.expires_at,
            activation_id: cell?.activation_id ? cell?.activation_id : null,
            token: cell?.logins?.map((data) => data?.user_token_login)[0],
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
      .then((data) => {
        if(data.success) {
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
          // if(this.token.token === this.tokenLogins) {
          //   this.$toast.show(this.messageNotif, {
          //     type: "info",
          //     duration: 5000,
          //     position: "top-right",
          //   });
          // }
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
