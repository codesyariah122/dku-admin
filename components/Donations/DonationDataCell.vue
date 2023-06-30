<style>
.truncated-container {
  max-height: 100px; /* Adjust the height as needed */
  overflow: auto;
}
</style>

<template>
  <tbody>
    <tr v-for="column in columns" :key="column.id">
      <th
        v-if="column.transaction_date"
        class="border-t-0 px-6  border-l-0 border-r-0 text-xs w-12 p-4 text-left" style="width: 50px;"
      >
        {{ $moment(column.transaction_date).format("LLLL") }}
      </th>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       <img v-if="column.transaction_receipt !== null" :src="`${image_url}/${column.transaction_receipt}`" class="w-42 h-24"/>
       <span v-else>NULL</span>
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.unique_code }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ $format(column.donation_amount) }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.transaction_id }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.campaign_title }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.name }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.email }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.fundraiser === 'N' ? 'No' : 'Yes' }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" v-html="column.payment_method"
      >
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <span v-if="column.status === 'PENDING'" class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">{{column.status}}</span>
        <span v-else-if="column.status === 'HOLD'" class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{column.status}}</span>
        <span v-else class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{{column.status}}</span>
      </td>

      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown 
          :id="column.id" 
          :types="types" 
          :username="username" 
          cellType="data"
          :queryMiddle="queryMiddle"
          :queryData="column.slug"
          :param="column.slug"
          :donationStatus="column.status"
          :transactionReceipt="`${image_url}/${column.transaction_receipt}`"
          :transactionId="column.transaction_id"
          @deleted-data="deletedData"
          @accept-payment="acceptPayment"
        />
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function () {
        return {};
      },
    },
    types: {
      type: String
    },
    queryMiddle: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      image_url: process.env.NUXT_ENV_STORAGE_URL,
      username: '',
      userData: []
    }
  },

  mounted() {
    this.checkUserLogin();
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    },

    acceptPayment(transaction_id) {
    	this.$emit('accept-payment', transaction_id);
    },

    checkUserLogin() {
      if (this?.token !== null) {
        const endPoint = `${this.api_url}/fitur/user-profile`;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this?.token?.token}`,
          },
        };
        this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            this.userData = data.data
            data.data.profiles.map((profile) => {
              this.username = profile.username
            })
          })
          .catch((err) => {
            console.log(err)
          });
      } else {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Error Access!",
        });
        this.$router.replace("/");
      }
    },
  }

};
</script>
