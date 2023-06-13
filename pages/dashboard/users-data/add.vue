<template>
  <div class="flex flex-wrap">

    <div v-if="successNew" :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-profile 
      pageType="userData"
      link="users-data"
      title="Add New User Dashboard Admin"
      methodType="add"
      :successNew="successNew"
      :messageNew="messageNew"
      :detail="detail"
      />
    </div>

    <div v-else :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-settings 
      pageType="userData"
      link="users-data"
      title="Add New User Dashboard Admin"
      methodType="add"
      :type="type"
      @detail-data="detailUser"
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
    name: "users-data-add",
    layout: "admin",

    data() {
      return {
        routeName: this.$route.name.split('-').pop(),
        loadingDetail: null,
        successNew: null,
        messageNew: '',
        detail: {},
        type: this.$route.query['type']
      };
    },

    beforeMount() {
      this.storedFormData();
    },

    created() {
      this.dataManagementEvent();
    },

    mounted() {
      this.detailUser(this.formData ? this.formData.data[0] : this.routeName);
    },

    methods: {
      storedFormData() {
        this.$store.dispatch('success/storedFormData', 'success-form');
      },

      detailUser(username = '') {
        this.loadingDetail = true

        if(username) {          
          getData({
            api_url: `${this.api_url}/fitur/user-management/${username}`,
            token: this.token.token,
            api_key: process.env.NUXT_ENV_APP_TOKEN
          })
          .then(({data}) => {
            // console.log(data)
            if(data) {
              this.successNew = true
              this.messageNew = `${data.username}, data successfully added !`
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
          this.detailUser(this.formData ? this.formData.data[0] : '')
        }
      },
    }

  };
</script>
