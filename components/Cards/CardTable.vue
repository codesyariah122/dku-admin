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
            {{ title }}
          </h3>
        </div>
        <div v-if="!queryParam">
          <button type="button" @click="total > 0 ?
          $router.push({
            path: `/dashboard/${queryMiddle}/trash`,
            query: {
              type: queryType
            }
          }) : null;
          " class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <i class="fa-solid fa-trash"></i>
            <span class="sr-only">Notifications</span>
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{{total}}</div>
          </button>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <molecules-table-header :headers="headers" :color="color" />

        <users-user-data-cell
          v-if="types === 'user-data'"
          :columns="columns"
          :types="types"
          @deleted-data="deletedData"
          @activation-user="activationUser"
        />

        <users-role-data-cell
          v-if="types === 'user-role'"
          :columns="columns"
          @deleted-data="deletedData"
          :types="types"
        />

        <users-user-trash-cell v-if="types === 'user-trash'" :columns="columns" :types="types" @deleted-data="deletedData" @restored-data="restoredData"/>

        <campaigns-campaign-data-cell
          v-if="types === 'campaign-data'"
          :columns="columns"
          @deleted-data="deletedData"
          :types="types"
        />

        <campaigns-category-campaign-cell
          v-if="types === 'category-campaign'"
          :columns="columns"
          @deleted-data="deletedData"
          @activation-user="activationUser"
          :types="types"
        />

        <molecules-row-loading :loading="loading" :options="options" />

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
      default: false
    },
    options: {
      type: String,
      default: ''
    },
    queryType: {
      type: String,
      default: ''
    },
    queryMiddle: {
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
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    },
    activationUser(id) {
      this.$emit("activation-user", id);
    },

    restoredData(id) {
      this.$emit("restored-data", id);
    },

    totalTrash() {
      totalTrash({
        api_url: `${this.api_url}/fitur/trashed?type=${this.queryType}`,
        api_key: process.env.NUXT_ENV_APP_TOKEN,
        token: this.token.token
      })
      .then(({data}) => {
        this.total = this.$_.size(data.data);
      })
      .catch((err) => console.log(err))
    },
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
