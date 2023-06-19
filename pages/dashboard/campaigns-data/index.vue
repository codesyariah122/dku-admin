<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
    
      <cards-card-table
        color="dark"
        title="Campaign Data"
        :headers="headers"
        :columns="items"
        :loading="loading"
        types="campaign-data"
        queryType="CAMPAIGN_DATA"
        queryMiddle="campaigns-data"
        :success="success"
        :messageAlert="message_success"
        @close-alert="closeSuccessAlert"
        @deleted-data="deletedCampaign"
        @filter-data="handleFilterCampaign"
      />

      <div class="mt-6 -mb-2">
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
import { getData, deleteData } from "~/hooks/index";

export default {
  name: "campaigns-data",
  layout: "admin",

  data() {
    return {
      loading: null,
      options: '',
      success: null,
      message_success: '',
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
    this.checkUserLogin();
  },

  methods: {
    handleFilterCampaign(param, types) {
      if(types === 'campaign-data') {
        this.getCampaignData(1, param.title, param.category_campaign, param.start_date, param.end_date);
      }
    },

    getCampaignData(page=1, title='', category_campaign='', start_date='', end_date='') {
      // this.loading = loading ? loading : true;
      getData({
        api_url: `${this.api_url}/fitur/campaign-management?page=${page}&title=${title}&category_campaign=${category_campaign}&start_date=${start_date}&end_date=${end_date}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })

        .then(( data ) => {
          let cells = []
          data?.data?.map((cell) => {
            const prepareCell = {
              id: cell?.id,
              title: cell?.title,
              slug: cell?.slug,
              banner: cell?.banner,
              category_campaigns: cell?.category_campaigns,
              donation_target: cell?.donation_target,
              is_headline: cell?.is_headline,
              publish: cell?.publish,
              end_campaign: cell?.end_campaign,
              author: cell?.author,
              limit: cell?.without_limit
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
        // .finally(() => {
        //   setTimeout(() => {
        //     this.loading = false
        //   }, 500)
        // })
        .catch((err) => console.log(err));
    },

    deletedCampaign(id) {
      this.loading = true
      this.options = 'delete-campaign';
      deleteData({
        api_url: `${this.api_url}/fitur/campaign-management/${id}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
      .then((data) => {
        if(data.success) {
          // console.log(data.message)
          this.$toast.show('Campaign data successfully move to trash !', {
            type : 'info',
            duration: 5000,
            position: "top-right",
            icon: 'circle-exclamation'
          });
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

    closeSuccessAlert() {
      this.success = false
      this.message = ''
    }
  },

  watch: {
    notifs() {
      if (this.$_.size(this.notifs) > 0) {
        this.getCampaignData(this.paging.current);
      }
    },
    dataNotifs() {
      if (this.$_.size(this.dataNotifs) > 0) {
        if(this.token.token === this.tokenLogins) {          
          // this.$toast.show(this.messageNotif, {
          //   type: "info",
          //   duration: 5000,
          //   position: "top-right",
          // });
          this.message_success = this.messageNotif
        }
        this.getCampaignData(this.paging.current);
        this.getTotalCampaign();
      }
    },
  },
};
</script>
