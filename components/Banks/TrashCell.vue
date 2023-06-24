<template>
  <tbody>
    <tr v-for="column in columns" :key="column.id">

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       <img v-if="column.image !== null" :src="`${image_url}/${column.image}`" class="w-42 h-24"/>
       <img v-else :src="require('~/assets/img/default.jpg')" class="w-42 h-24">
      </td>

      <th
        v-if="column.name"
        class="border-t-0 px-6  border-l-0 border-r-0 text-xs w-12 p-4 text-left" style="width: 50px;"
      >
        {{ column.name }}
      </th>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.norek }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.owner }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.status }}
      </td>
      
      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.type }}
      </td>
      
      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown @deleted-data="deletedData" @restored-data="restoredData" :id="column.id" :types="types"cellType="trash"/>
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
        return {}; // or any other appropriate default value
      },
    },
    types: {
      type: String
    },
  },

  data() {
    return {
      image_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL
    }
  },

  mounted() {
    console.log(this.types)
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    },

    restoredData(id) {
      this.$emit('restored-data', id)
    }
  },
};
</script>
