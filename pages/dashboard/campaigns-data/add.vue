<template>
  <div class="flex flex-wrap">

    <div v-if="successNew" :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-profile 
      pageType="campaignData"
      link="campaigns-data"
      title="Add New Campaign"
      methodType="add"
      :successNew="successNew"
      :detail="detail"
      />
    </div>

    <div v-else :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-settings 
      pageType="campaignData" 
      title="Add New Campaign"
      methodType="add"
      @detail-data="detailCampaign"
      />
    </div>

  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */
  import { getData } from "~/hooks/index";

  export default {
    name: "campaigns-data-add",
    layout: "admin",

    data() {
      return {
        routeName: this.$route.name.split('-').pop(),
        loadingDetail: null,
        successNew: null,
        detail: {}
      };
    },

    beforeMount() {
      this.storedFormData();
    },

    created() {
      this.dataManagementEvent();
    },

    mounted() {
      this.detailCampaign(this.formData ? this.formData.data.id : '');
    },

    methods: {
      storedFormData() {
        this.$store.dispatch('success/storedFormData', 'success-form');
      },

      detailCampaign(detailId='') {
        this.loadingDetail = true
        if(detailId) {          
          getData({
            api_url: `${this.api_url}/fitur/campaign-management/${detailId}`,
            token: this.token.token,
            api_key: process.env.NUXT_ENV_APP_TOKEN
          })
          .then(({data}) => {
            if(data) {
              this.successNew = true
              this.detail = data
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loadingDetail = false
            }, 500)
          })
          .catch((err) => console.log(err));
        }
      }
    },

    computed: {
      formData() {
        return this.$store.getters['success/formData'];
      }
    },

    watch: {
      dataNotifs() {
        if (this.dataNotifs && this.$_.size(this.dataNotifs) > 0) {
          this.storedFormData();
          this.detailCampaign(this.formData ? this.formData.data.id : '');
        }
      },
    }

  };
</script>
