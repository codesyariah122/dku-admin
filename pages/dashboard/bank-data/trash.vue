<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">

      <cards-card-table
      color="dark"
      title="Bank Trashed"
      :headers="headers"
      :columns="items"
      :loading="loading"
      types="bank-data"
      queryType="BANK_DATA"
      :success="success"
      :messageAlert="message_success"
      @close-alert="closeSuccessAlert"
      @deleted-data="deletedData"
      @restored-data="restoreData"
      />

    </div>

  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 * @vue tolol anjing developer vuejs mah
 */
  import { BANK_DATA_TRASH } from "~/utils/tables-organizations";
  import { getData, deleteData, totalTrash, restoredData } from "~/hooks/index";

  export default {
    name: "campaigns-data",
    layout: "admin",

    data() {
      return {
        loading: null,
        options: '',
        success: null,
        message_success: '',
        headers: [...BANK_DATA_TRASH],
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
      this.getBankTrash();
    },

    methods: {
      checkNewData() {
        window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
          "EventNotification",
          (e) => {
          // console.log(e[0].notif)
            this.notifs.push(e);
            this.messageNotifs = e[0].notif;
          });
      },


      getBankTrash() {
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
              image: cell.image,
              name: cell.name,
              norek: cell.norek,
              owner: cell.owner,
              status: cell.status,
              type: cell.type
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
        })
        .catch((err) => console.log(err));
      },

      deletedData(id) {
        this.loading = true
        this.options = 'delete-campaign';
        deleteData({
          api_url: `${this.api_url}/fitur/trashed/${id}?type=${this.queryParam}`,
          token: this.token.token,
          api_key: process.env.NUXT_ENV_APP_TOKEN
        })
        .then((data) => {
          if(data.success) {
            this.$toast.show('Campaign data successfully destroyed !', {
              type : 'error',
              duration: 5000,
              position: "top-right",
              icon: 'dumpster-fire'
            });
            this.success = true;
            if(this.totals > 1) {
              this.message_success = data.message;
              this.scrollToTop();
            } else {
              this.$router.go(-1);
            }
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
        this.options = 'restore-campaign';
        restoredData({
          api_url: `${this.api_url}/fitur/trashed/${id}?type=${this.queryParam}`,
          token: this.token.token,
          api_key: process.env.NUXT_ENV_APP_TOKEN
        })
        .then(({data}) => {
          if(data.deleted_at === null) {
            this.$toast.show("Campaign data successfully restored !", {
              type : 'success',
              duration: 5000,
              position: "top-right",
              icon: 'check-double'
            });
            if(this.totals > 1) {
              this.success = true;
              this.scrollToTop();
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
          this.getBankTrash();
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
          this.getBankTrash();
          this.getTotalCampaign();
        }
      },
      updateProfileNotifs() {
        if(this.$_.size(this.updateProfileNotifs) > 0) {
          this.getBankTrash();
        }
      }
    },
  };
</script>
