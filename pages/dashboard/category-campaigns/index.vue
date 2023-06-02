<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <cards-card-table
        color="dark"
        title="Category Campaign"
        :headers="headers"
        :columns="items"
        types="category-campaign"
        queryType="CATEGORY_CAMPAIGN"
        queryMiddle="category-campaigns"
        @deleted-data="deletedCampaign"
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
import { CATEGORY_CAMPAIGN_DATA_TABLE } from "~/utils/tables-organizations";
import { getData } from "~/hooks/getData/index";

export default {
  name: "categpry-campaigns",
  layout: "admin",

  data() {
    return {
      loading: null,
      notifs: [],
      dataNotifs: [],
      message: '',
      headers: [...CATEGORY_CAMPAIGN_DATA_TABLE],
      api_url: process.env.NUXT_ENV_API_URL,
      items: [],
    };
  },

  created() {
    this.checkNewData();
    this.dataManagementEvent();
  },

  mounted() {
    this.getCategoryCampaignData();
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

    getCategoryCampaignData() {
      this.loading = true;
      getData({
        api_url: `${this.api_url}/fitur/category-campaigns-management`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
        .then(({ data }) => {
          let cells = []
          data.data.map((cell) => {
            const prepareCell = {
              id: cell.id,
              title: cell.name,
              campaigns: this.$_.size(cell.campaigns)
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
        .catch((err) => console.log(err));
    },

    deletedCampaign(id) {
      console.log(id);
    }
  },

  watch: {
    notifs() {
      if (this.$_.size(this.notifs) > 0) {
        this.getCategoryCampaignData();
      }
    },
    dataNotifs() {
      if (this.$_.size(this.dataNotifs) > 0) {
        this.$toast.show(this.message, {
          type: "info",
          duration: 5000,
          position: "top-right",
        });
        this.getCategoryCampaignData();
        this.getTotalCampaign();
      }
    },
  },
};
</script>
