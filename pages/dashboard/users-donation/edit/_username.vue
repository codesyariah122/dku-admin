<template>
  <div class="flex flex-wrap">

    <div :class="`w-full ${routeName === 'edit' ? 'lg:w-12/12' :'lg:w-12/12'} px-4`">
      <cards-card-settings 
      pageType="userData"
      link="users-data"
      :title="`Edit User ${param}`"
      methodType="edit"
      :type="type"
      :data="detail"
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
      };
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
        const detail = response?.data;

        return {
          detail
        }
      } catch (err) {
        console.log(err)
        return {
          detail: {}
        }
      }

    }

  };
</script>
