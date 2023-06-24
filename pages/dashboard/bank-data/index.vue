<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
    
      <cards-card-table
        color="dark"
        title="Payment Method"
        types="bank-data"
        queryType="BANK_DATA"
        queryMiddle="bank-data"
        :headers="headers"
        :columns="items"
        :loading="loading"
        :success="success"
        :messageAlert="message_success"
        @filter-data="handleFilterCampaign"
        @close-alert="closeSuccessAlert"
        @deleted-data="deletedBank"
      />

      <div class="mt-6 -mb-2">
        <div class="flex justify-end items-end">
          <molecules-pagination :links="links" :paging="paging" @fetch-data="getBankData"/>
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
import { BANK_DATA_TABLE } from "~/utils/tables-organizations";
import { getData, deleteData } from "~/hooks/index";

export default {
  name: "bank-data",
  layout: "admin",

  data() {
    return {
      loading: null,
      options: '',
      success: null,
      message_success: '',
      headers: [...BANK_DATA_TABLE],
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
    this.getBankData();
    this.checkUserLogin();
  },

  methods: {
    handleFilterCampaign(param, types) {
      if(types === 'bank-data') {
        this.getBankData(1, param.name);
      }
    },

    getBankData(page=1, name='') {
      getData({api_url: `${this.api_url}/fitur/bank-management?page=${page}${name ? '&name='+name : ''}`, token: this.token.token,api_key: process.env.NUXT_ENV_APP_TOKEN})

        .then(( data ) => {
          let cells = []
          data?.data?.map((cell) => {
            const prepareCell = {
              id: cell?.id,
              image: cell?.image,
              name: cell?.name,
              norek: cell?.norek,
              owner: cell?.owner,
              status: cell?.status,
              type: cell?.type
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

    deletedBank(id) {
      this.loading = true
      this.options = 'delete-bank';
      deleteData({
        api_url: `${this.api_url}/fitur/bank-management/${id}`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
      .then((data) => {
        if(data.success) {
          // console.log(data.message)
          this.$toast.show('Bank data successfully move to trash !', {
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
        this.getBankData(this.paging.current);
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
        this.getBankData();
        this.getTotalCampaign();
      }
    },
  },
};
</script>
