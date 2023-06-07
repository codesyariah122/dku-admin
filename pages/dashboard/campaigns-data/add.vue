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
  import { USER_DATA_TABLE } from "~/utils/tables-organizations";
  import { getData, activateUser, deleteData } from "~/hooks/index";

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
      if(this.formData) {
        this.detailCampaign();
      }
    },

    methods: {
      storedFormData() {
        this.$store.dispatch('success/storedFormData', 'success-form');
      },

      detailCampaign() {
        this.loadingDetail = true
        const detail_id = this.formData?.data?.id;

        getData({
          api_url: `${this.api_url}/fitur/campaign-management/${detail_id}`,
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
    },

    computed: {
      formData() {
        return this.$store.getters['success/formData'];
      }
    },

    watch: {
      dataNotifs() {
        if (this.$_.size(this.dataNotifs) > 0) {
          this.storedFormData();
          if(this.formData) {
            this.detailCampaign();
          }
        }
      },
    }

  };
</script>
