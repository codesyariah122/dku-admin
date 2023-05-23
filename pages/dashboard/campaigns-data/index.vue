<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <cards-card-table
        color="dark"
        title="Campaign Data"
        :headers="headers"
        :columns="items"
        types="campaign-data"
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
import { CAMPAIGN_DATA_TABLE } from "~/utils/tables-organizations";
import { getData } from "~/hooks/getData/index";

export default {
  name: "campaigns-data",
  layout: "admin",

  data() {
    return {
      notifs: [],
      dataNotifs: [],
      message: '',
      headers: [...CAMPAIGN_DATA_TABLE],
      api_url: process.env.NUXT_ENV_API_URL,
      items: [],
    };
  },

  created() {
    this.checkNewData();
    this.dataManagementEvent();
  },

  mounted() {
    this.getCampaignData();
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

    getCampaignData() {
      getData({
        api_url: `${this.api_url}/fitur/campaign-management`,
        token: this.token.token,
      })
        .then(({ data }) => {
          let cells = []
          data.data.map((cell) => {
            const prepareCell = {
              id: cell.id,
              title: cell.title,
              banner: cell.banner,
              is_headline: cell.is_headline,
              author: cell.author,
              limit: cell.without_limit
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
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
        this.getCampaignData();
      }
    },
    dataNotifs() {
      if (this.$_.size(this.dataNotifs) > 0) {
        this.$toast.show(this.message, {
          type: "info",
          duration: 5000,
          position: "top-right",
        });
        this.getCampaignData();
        this.getTotalCampaign();
      }
    },
  },
};
</script>
