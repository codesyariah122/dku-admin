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
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
      >
        {{ column.title }}
      </th>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       <img :src="`${image_url}/${column.banner}`" class="w-42 h-24"/>
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.is_headline }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.publish === 1 ? 'Y' : 'N' }}
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
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown :types="types"/>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
    },
    types: {
      type: String
    }
  },

  data() {
    return {
      image_url: process.env.NUXT_ENV_STORAGE_URL
    }
  },

};
</script>
