<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-blueGray-800 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-between">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            {{ title }} <i v-if="queryParam" class="fa-solid fa-trash-can-arrow-up text-lg"></i> 
          </h3>
        </div>
        <div v-if="!queryParam && types !== 'user-role'">
          <button type="button" @click="
            $router.push({
              path: `/dashboard/${queryMiddle}/add`,
              query: {
                'type': queryRole
              }
            })
          " class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i class="fa-solid fa-plus"></i> Add</button>
        </div>

        <div v-else>
          <button v-if="types !== 'user-data'"
          @click="backTo"
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
            Back
          </button>
        </div>

        <div v-if="!queryParam && types !== 'user-role'">
          <button type="button" @click="total > 0 ?
          $router.push({
            path: `/dashboard/${queryMiddle}/trash`,
            query: {
              type: queryType,
              roles: queryRole
            }
          }) : null;
          " class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <i class="fa-solid fa-trash"></i>
            <span class="sr-only">Notifications</span>
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{{total}}</div>
          </button>
        </div>
      </div>

      <div v-if="success" ref="alertNotifs" class="flex justify-center w-full bg-transparent mt-4">
        <molecules-success-alert :success="success" :messageAlert="messageAlert" @close-alert="closeSuccessAlert"/>
      </div>
     
      <div v-if="types === 'campaign-data' || types === 'user-data' || types === 'bank-data'">
        <div class="flex justify-start mt-4 mb-4">
          <div>
            <h2 class="text-white text-md font-bold">Filter {{title}} By</h2>
          </div>
        </div>

        <div class="flex justify-start mt-6 mb-6 space-x-4">
          <div>
            <button @click="resetFilter" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Reset Filter
              <i class="fa-solid fa-repeat"></i>
            </button>
          </div>

          <div v-if="types === 'campaign-data'">
            <button @click="downloadData" type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Export All
              <i class="fa-solid fa-download"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-start w-full bg-transparent mt-2 mb-8">
        <div v-if="types === 'campaign-data'" >
          <campaigns-campaign-filter  @filter-data="filterData"/>
        </div>
        <div v-if="types === 'user-data'" >
          <users-user-filter  @filter-data="filterData" :queryRole="queryRole"/>
        </div>
        <div v-if="types === 'bank-data'">
          <banks-filter-bank @filter-data="filterData" />
        </div>
      </div>

    </div>

    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <molecules-table-header 
          :headers="headers" 
          :color="color"
          :types="types"
        />

        <users-user-data-cell
          v-if="types === 'user-data'"
          :columns="columns"
          :types="types"
          :queryMiddle="queryMiddle"
          :queryRole="queryRole"
          @deleted-data="deletedData"
          @activation-user="activationUser"
        />

        <users-role-data-cell
          v-if="types === 'user-role'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
        />

        <users-user-trash-cell 
          v-if="types === 'user-trash'" 
          :columns="columns" 
          :types="types" 
          @deleted-data="deletedData" 
          @restored-data="restoredData"
        />

        <campaigns-campaign-data-cell
          v-if="types === 'campaign-data'"
          :columns="columns"
          :types="types"
          :queryMiddle="queryMiddle"
          @deleted-data="deletedData"
        />

        <campaigns-category-campaign-cell
          v-if="types === 'category-campaign'"
          :columns="columns"
          :types="types"
          :queryMiddle="queryMiddle"
          @deleted-data="deletedData"
        />

        <campaigns-campaign-trash-cell
          v-if="types === 'campaign-trash'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
          @restored-data="restoredData"
        />

        <campaigns-category-trash-cell
          v-if="types === 'category-campaign-trash'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
          @restored-data="restoredData"
        />

        <banks-bank-data-cell
          v-if="types === 'bank-data'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
          @restored-data="restoredData"
        />

        <banks-trash-cell
          v-if="types === 'bank-data-trash'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
          @restored-data="restoredData"
        />

        <dontaions-donation-data-cell
          v-if="types ==='transaction-donation'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
          @restored-data="restoredData"
          @accept-payment="acceptPayment"
        />

        <tr v-if="loading">
          <molecules-row-loading :loading="loading" :options="options" />
        </tr>

      </table>
    </div>
  </div>
</template>
<script>
import { totalTrash } from '~/hooks/index';

export default {
  props: {
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    title: {
      type: String,
    },
    headers: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    types: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: null
    },
    options: {
      type: String,
      default: ''
    },
    queryType: {
      type: String,
      default: ''
    },
    queryRole: {
      type: String,
      default: ''
    },
    queryMiddle: {
      type: String,
      default: ''
    },
    success: {
      type: Boolean,
      default: null
    },
    messageAlert: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      total: 0,
      queryParam: this.$route.query.type,
      api_url: process.env.NUXT_ENV_API_URL
    }
  },

  created() {
    this.dataManagementEvent();
  },

  mounted() {
    this.totalTrash();
    // console.log(this.queryRole)
  },

  methods: {
    backTo() {
      this.$router.go(-1);
    },

    deletedData(id) {
      this.$emit("deleted-data", id);
    },

    activationUser(id) {
      this.$emit("activation-user", id);
    },


    restoredData(id) {
      this.$emit("restored-data", id);
    },

    acceptPayment(transaction_id) {
      this.$emit('accept-payment', transaction_id);
    },

    totalTrash() {
      totalTrash({
        api_url: `${this.api_url}/fitur/trashed?type=${this.queryType}${this.queryRole ? '&roles='+this.queryRole : ''}`,
        api_key: process.env.NUXT_ENV_APP_TOKEN,
        token: this.token.token
      })
      .then(({data}) => {
        this.total = this.$_.size(data.data);
      })
      .catch((err) => console.log(err))
    },

    closeSuccessAlert() {
      this.$emit('close-alert');
    },

    filterData(param) {
      this.$emit('filter-data', param, this.types)
    },

    resetFilter() {
      if(this.types === 'campaign-data') {
        this.$emit('filter-data', {}, this.types)
      } else {
        this.$emit('filter-data', {}, this.types)
      }
    },

    downloadData() {
      if(this.types === 'campaign-data') {
        this.$emit('download-data')
      }
    }
  },

  watch: {
    dataNotifs() {
      if (this.$_.size(this.dataNotifs) > 0) {
        this.$toast.show(this.message, {
          type: "info",
          duration: 5000,
          position: "top-right",
        });
        this.totalTrash();
      }
    },
  }
};
</script>
