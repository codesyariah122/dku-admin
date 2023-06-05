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
        v-if="column.title"
        class="border-t-0 px-6  border-l-0 border-r-0 text-xs w-12 p-4 text-left" style="width: 50px;"
      >
        {{ column.title }}
      </th>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       <img v-if="column.banner !== null" :src="`${image_url}/${column.banner}`" class="w-42 h-24"/>
       <img v-else :src="require('~/assets/img/default.jpg')" class="w-42 h-24">
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ $format(column.donation_target) }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.is_headline }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.publish ? column.publish : 'NULL' }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.end_campaign ? column.end_campaign : 'NULL' }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.author }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.limit }}
      </td>

      <!-- <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 truncate">
        <div class="truncated-container">
          <div v-html="$options.filters.truncateHtml(column.description, maxLength)"></div>
        </div>
      </td> -->

      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown @deleted-data="deletedData" :id="column.id" :types="types" :username="username" cellType="data"/>
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
    }
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
    }
  }

};
</script>
