<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">

      <cards-card-table
      color="dark"
      title="User Trashed"
      :headers="headers"
      :columns="items"
      :loading="loading"
      types="user-trash"
      queryType="USER_DATA"
      @deleted-data="deletedUser"
      @restored-data="restoreData"
      />

    </div>

    <molecules-success-alert :success="success" :messageAlert="message_success" @close-alert="closeSuccessAlert"/>

  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 * @vue tolol anjing developer vuejs mah
 */
  import { USER_TRASH_DATA_TABLE } from "~/utils/tables-organizations";
  import { getData, deleteData, totalTrash, restoredData } from "~/hooks/index";

  export default {
    name: "users-data",
    layout: "admin",

    data() {
      return {
        loading: null,
        options: '',
        success: null,
        message_success: '',
        headers: [...USER_TRASH_DATA_TABLE],
        api_url: process.env.NUXT_ENV_API_URL,
        items: [],
        notifs: [],
        activation_id: null,
        queryParam: this.$route.query.type,
        totals: 0
      };
    },

    created() {
      this.checkNewData();
      this.dataManagementEvent();
      this.checkUpdateEvent();
    },

    mounted() {
      this.getUserTrash();
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


      getUserTrash() {
        totalTrash({
        api_url: `${this.api_url}/fitur/trashed?type=${this.queryParam}`,
        api_key: process.env.NUXT_ENV_APP_TOKEN,
        token: this.token.token
        })
        .then(({ data }) => {
          this.totals = this.$_.size(data.data);
          let cells = []
          data.data.map((cell) => {
            const prepareCell = {
              id: cell.id,
              name: cell.name,
              email: cell.email,
              phone: cell.phone,
              status: cell.status,
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
      },

      restoreData(id) {
        this.loading = true
        this.options = 'restore-user';
        restoredData({
          api_url: `${this.api_url}/fitur/trashed/${id}?type=${this.queryParam}`,
          token: this.token.token,
          api_key: process.env.NUXT_ENV_APP_TOKEN
        })
        .then(({data}) => {
          if(data.deleted_at === null) {
            if(this.totals > 1) {
              this.success = true;
              this.message_success = this.dataNotifs[0].notif;
            } else {
              this.$router.go(-1)
            }
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
            this.options = ''
          }, 1000)
        })
        .catch((err) => {
          console.log(err)
        })
      },

      closeSuccessAlert() {
        this.success = false
        this.message = ''
      }
    },

    watch: {
      notifs() {
        if (this.$_.size(this.notifs) > 0) {
          this.getUserTrash();
        }
      },
      dataNotifs() {
        if (this.$_.size(this.dataNotifs) > 0) {
          this.$toast.show(this.message, {
            type: "info",
            duration: 5000,
            position: "top-right",
          });
          this.getUserTrash();
          this.getTotalUser();
        }
      },
      updateProfileNotifs() {
        if(this.$_.size(this.updateProfileNotifs) > 0) {
          this.getUserTrash();
        }
      }
    },
  };
</script>
