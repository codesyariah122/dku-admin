<template>
  <div class="flex flex-wrap">

    <div v-if="successNew" :class="`w-full ${routeName === 'edit' ? 'lg:w-12/12' :'lg:w-12/12'} px-4`">
      <cards-card-profile 
      pageType="campaignData"
      link="campaigns-data"
      title="Add New Campaign"
      methodType="add"
      :successNew="successNew"
      :detail="detail"
      />
    </div>

    <div v-else :class="`w-full ${routeName === 'edit' ? 'lg:w-12/12' :'lg:w-12/12'} px-4`">
      <cards-card-settings 
      pageType="campaignData" 
      methodType="edit"
      link="campaigns-data"
      :title="`Edit Campaign ${campaign.title}`"
      :data="campaign"
      :type="type"
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
    name: "campaigns-data-edit",
    layout: "admin",

    data() {
      return {
        routeName: this.$route.name.split('-').pop(),
        type: this.$route.query['type'],
        slug: this.$route.params.slug,
        loadingDetail: null,
        successNew: null,
        detail: {},
      };
    },

    beforeMount() {
      this.storedFormData();
    },

    created() {
      this.dataManagementEvent();
    },

    mounted() {
      // this.detailCampaign(this.slug ? this.slug : '');
    },

    methods: {
      storedFormData() {
        this.$store.dispatch('success/storedFormData', 'success-form');
      },

      detailCampaign(slug='') {
        this.loadingDetail = true
        if(slug) {          
          getData({
            api_url: `${this.api_url}/fitur/campaign-management/${slug}`,
            token: this.token.token,
            api_key: process.env.NUXT_ENV_APP_TOKEN
          })
          .then(({data}) => {
            console.log(data);
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
    },

    async asyncData({params, $api}) {
      try {        
        const store = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        const {token} = store;
        const {slug} = params;
        const endPoint = `/fitur/campaign-management/${slug}`;

        $api.setHeader('Authorization', `Bearer ${token}`);
        $api.defaults.headers.common['Content-Type'] = 'application/json';
        $api.defaults.headers.common['Dku-Api-Key'] = process.env.NUXT_ENV_APP_TOKEN;
        const response = await $api.$get(endPoint);
        const campaign = response?.data;

        return {
          campaign
        }
      } catch (err) {
        console.log(err)
        return {
          campaign: {}
        }
      }
    }

  };
</script>
