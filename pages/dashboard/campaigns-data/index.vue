<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <cards-card-table
        color="dark"
        title="Campaign Data"
        :headers="headers"
        :columns="items"
        types="campaign-data"
        queryType="CAMPAIGN_DATA"
        queryMiddle="campaigns-data"
        @deleted-data="deletedCampaign"
      />

      <div class="mt-12 mb-12">
        <div class="flex justify-end items-end">
          <molecules-pagination :links="links" :paging="paging" @fetch-data="getCampaignData"/>
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

    getCampaignData(loading, loadingDelete, page=1) {
      getData({
        api_url: `${this.api_url}/fitur/campaign-management?page=${page}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })

        .then(({ data }) => {
          let cells = []
          data?.data?.map((cell) => {
            const prepareCell = {
              id: cell?.id,
              title: cell?.title,
              banner: cell?.banner,
              is_headline: cell?.is_headline,
              publish: cell?.publish,
              end_campaign: cell?.end_campaign,
              author: cell?.author,
              limit: cell?.without_limit
            }
            cells.push(prepareCell)
          });
          this.items = [...cells]
          this.links = data?.links
          this.paging.current = data?.current_page
          this.paging.from = data?.from
          this.paging.last = data?.last_page
          this.paging.per_page = data?.per_page
          this.paging.total = data?.total
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
