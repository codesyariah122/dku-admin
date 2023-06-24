<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <cards-card-table
        color="dark"
        title="Category Campaign"
        :headers="headers"
        :columns="items"
        :loading="loading"
        :success="success"
        :messageAlert="message_success"
        types="category-campaign"
        queryType="CATEGORY_CAMPAIGN_DATA"
        queryMiddle="category-campaigns"
        @deleted-data="deletedCategoryCampaign"
      />

      <div class="mt-6 -mb-2">
        <div class="flex justify-end items-end">
          <molecules-pagination :links="links" :paging="paging" @fetch-data="getCategoryCampaignData"/>
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
import { CATEGORY_CAMPAIGN_DATA_TABLE } from "~/utils/tables-organizations";
import { getData, deleteData } from "~/hooks/index";

export default {
  name: "category-campaigns",
  layout: "admin",

  data() {
    return {
      loading: null,
      notifs: [],
      dataNotifs: [],
      success: null,
      message_success: '',
      headers: [...CATEGORY_CAMPAIGN_DATA_TABLE],
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

    getCategoryCampaignData(page=1) {
      getData({
        api_url: `${this.api_url}/fitur/category-campaigns-management?page=${page}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
      .then(( data ) => {
        let cells = []
        data.data?.data?.map((cell) => {
          const prepareCell = {
            id: cell.id,
            title: cell.name,
            campaigns: this.$_.size(cell.campaigns)
          }
          cells.push(prepareCell)
        });
        this.items = [...cells]

        this.links = data?.data?.links
        this.paging.current = data?.data?.current_page
        this.paging.from = data?.data?.from
        this.paging.last = data?.data?.last_page
        this.paging.per_page = data?.data?.per_page
        this.paging.total = data?.data?.total
      })
      
      .catch((err) => console.log(err));
    },

    deletedCategoryCampaign(id) {
      this.loading = true
      this.options = 'delete-category-campaigns';
      deleteData({
        api_url: `${this.api_url}/fitur/category-campaigns-management/${id}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
      .then((data) => {
        if(data.success) {
          this.$toast.show('Category Campaign data successfully move to trash !', {
            type : 'info',
            duration: 5000,
            position: "top-right",
            icon: 'circle-exclamation'
          });
          this.success = true;
          this.message_success = data.message
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
        this.getCategoryCampaignData();
        this.getTotalCampaign();
      }
    },
  },
};
</script>
