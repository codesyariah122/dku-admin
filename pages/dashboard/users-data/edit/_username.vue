<template>
  <div class="flex flex-wrap">

    <div v-if="successNew" :class="`w-full ${routeName === 'username' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-profile 
      pageType="userData"
      link="users-data"
      title="Add New User"
      methodType="add"
      :successNew="successNew"
      :messageNew="messageNew"
      :detail="detail"
      @close-alert="closeSuccessAlert"
      />
    </div>

    <div v-else :class="`w-full ${routeName === 'username' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-settings 
      pageType="userData"
      link="users-data"
      :title="`Edit User ${param}`"
      methodType="edit"
      :type="type"
      :data="user"
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
    name: "users-data-edit",
    layout: "admin",

    data() {
      return {
        routeName: this.$route.name.split('-').pop(),
        param: this.$route.params.username,
        type: this.$route.query['type'],
        loadingDetail: null,
        successNew: null,
        messagenew: '',
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
      // console.log(this.routeName)
      // this.detailUser(this.formData ? this.formData.data[0] : this.param);
    },

    methods: {
      storedFormData() {
        this.$store.dispatch('success/storedFormData', 'success-form');
      },

      detailUser(username = '') {
        try {          
          this.loadingDetail = true
          if(username) {          
            getData({
              api_url: `${this.api_url}/fitur/user-management/${username}`,
              token: this.token.token,
              api_key: process.env.NUXT_ENV_APP_TOKEN
            })
            .then(({data}) => {
              if(data) {
                this.successNew = true
                this.messageNew = `${data.username}, data successfully updated !`
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
        } catch (err) {
          console.error(err)
        }
      },

      closeSuccessAlert() {
        this.successNew = false
        this.messageNew = ''
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
          this.detailUser(this.formData ? this.formData.data[0] : this.param)
        }
      },
    },


    async asyncData({params, $api}) {
      try {        
        const store = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        const {token} = store;
        const {username} = params;
        const endPoint = `/fitur/user-management/${username}`;

        $api.setHeader('Authorization', `Bearer ${token}`);
        $api.defaults.headers.common['Content-Type'] = 'application/json';
        $api.defaults.headers.common['Dku-Api-Key'] = process.env.NUXT_ENV_APP_TOKEN;
        const response = await $api.$get(endPoint);
        const user = response?.data;

        return {
          user
        }
      } catch (err) {
        console.log(err)
        return {
          user: {}
        }
      }

    }

  };
</script>
