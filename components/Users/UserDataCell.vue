<template>
  <tbody>
    <tr v-for="column in columns" :key="column.id">
      <th
        v-if="column.name"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
      >
        {{ column.name }}
      </th>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.username }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.email }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.phone ? column.phone : "NULL" }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <i
          :class="`fas fa-circle ${
            column.status === 'ACTIVE' ? 'text-green-700' : 'text-orange-500'
          } mr-2`"
        ></i>
        {{ column.status }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ $moment(column.last_login).fromNow() }}
      </td>

      <td
        v-if="column.expires_at"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
      {{ column.countdown }}
      </td>

      <td
        v-else
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        NULL
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <i
          :class="`fas fa-circle ${
            column.is_login == 1 ? 'text-green-700' : 'text-orange-500'
          } mr-2`"
        ></i>
        {{ column.is_login == 1 ? "Online" : "Offline" }}
      </td>
      <td v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown @deleted-data="deletedData" :id="column.id" />
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
    }
  },

  mounted () {
    console.log(this.token.token)
  },

  methods: {
    deletedData(id) {
      this.$emit('deleted-data', id);
    }
  }
};
</script>
