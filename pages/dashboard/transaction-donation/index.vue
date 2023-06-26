<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
    
      <cards-card-table
        color="dark"
        title="Transaction Donation"
        :headers="headers"
        :columns="items"
        :loading="loading"
        types="transaction-donation"
        queryType="DONATION_DATA"
        queryMiddle="transaction-donation"
        :success="success"
        :messageAlert="message_success"
        @close-alert="closeSuccessAlert"
        @deleted-data="deletedCampaign"
        @filter-data="handleFilterCampaign"
        @download-data="downloadDataCampaign"
        @accept-donation="acceptDonation"
      />

      <div class="mt-6 -mb-2">
        <div class="flex justify-end items-end">
          <molecules-pagination :links="links" :paging="paging" @fetch-data="getDonationData"/>
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
import { DONATION_DATA_TABLE } from "~/utils/tables-organizations";
import { getData, deleteData } from "~/hooks/index";

export default {
  name: "transaction-donation",
  layout: "admin",

  data() {
    return {
      loading: null,
      options: '',
      success: null,
      message_success: '',
      headers: [...DONATION_DATA_TABLE],
      asset_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL,
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
    this.getDonationData();
    this.checkUserLogin();
  },

  methods: {
    handleFilterCampaign(param, types) {
      if(types === 'transaction-donation') {
        this.getDonationData(1, param.campaign_title, param.startDate, param.endDate);
      }
    },

    downloadDataCampaign() {
      this.loading = true
      getData({
        api_url: `${this.api_url}/fitur/campaign-data/download`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
      .then((data) => {
        if(data.success) {
          this.$toast.show('Campaign data downloaded.. !', {
            type : 'success',
            duration: 2500,
            position: "top-right",
            icon: 'check-double'
          });
          window.open(data.link, '_blank');
        }
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    },

    getDonationData(page=1, campaign_title='', start_date='', end_date='') {
      // this.loading = loading ? loading : true;
      getData({
        api_url: `${this.api_url}/fitur/donation-management?page=${page}&campaign_title=${campaign_title}&start_date=${start_date}&end_date=${end_date}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })

        .then(( data ) => {
          console.log(data);
          let cells = []
          data?.data?.map((cell) => {
            const prepareCell = {
            	id: cell?.id,
            	transaction_date: cell?.created_at,
            	transaction_receipt: cell?.image,
            	transaction_id: cell?.transaction_id,
            	campaign_title: cell?.campaigns[0].title,
            	name: cell?.name,
            	email: cell?.name,
            	fundraiser: cell?.fundraiser,
            	payment_method: `<img src='${this.asset_url}/${cell.banks[0].image}' class='w-12 h-auto'/>&nbsp;<span>${cell?.banks[0].name}</span>`,
            	status: cell?.status
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
    },

    acceptDonation(id) {
    	console.log(id)
    }
  },

  watch: {
    notifs() {
      if (this.$_.size(this.notifs) > 0) {
        this.getDonationData(this.paging.current);
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
        this.getDonationData(this.paging.current);
        this.getTotalCampaign();
      }
    },
  },
};
</script>
