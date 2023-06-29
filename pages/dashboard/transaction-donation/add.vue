<template>
  <div class="flex flex-wrap">

    <div :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-settings 
      pageType="transactionDonation"
      link="transaction-donation"
      title="Add New Transaction Donation"
      methodType="add"
      :type="type"
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
    name: "transaction-donation-add",
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

    created() {
      this.dataManagementEvent();
    },

    watch: {
      dataNotifs() {
        if (this.dataNotifs && this.$_.size(this.dataNotifs) > 0) {
         console.log(":CREATED")
        }
      },
    }

  };
</script>
