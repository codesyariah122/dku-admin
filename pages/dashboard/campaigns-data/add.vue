<template>
  <div class="flex flex-wrap">
    <div :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-settings 
        pageType="campaignData" 
        title="Add New Campaign"
        methodType="add"
      />
    </div>
    <div class="w-full lg:w-4/12 px-4">
      <cards-card-profile 
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
        routeName: this.$route.name.split('-').pop()
      };
    },

  };
</script>
