<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-8/12 px-4">
      <cards-card-settings />
    </div>
    <div class="w-full lg:w-4/12 px-4">
      <cards-card-profile />
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
    name: "users-role-add",
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
      };
    },

    created() {
      this.checkNewData();
      this.dataManagementEvent();
      this.checkUpdateEvent();
    },

    mounted() {
      this.getUserData();
    },

    methods: {
      checkNewData() {
        window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
          "EventNotification",
          (e) => {
          // console.log(e[0].notif)
            this.notifs.push(e);
            this.messageNotifs = e[0].notif;        }
            );
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
