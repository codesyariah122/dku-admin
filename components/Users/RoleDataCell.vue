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
        v-if="$_.size(column.users) > 0"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <div v-for="user in column.users" :key="user.id">
          <span class="capitalize font-semibold font-sans leading-6">
            <i class="fa-regular fa-circle"></i> {{ user }}
          </span>
        </div>
      </td>

      <td
        v-else
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <i class="fa-regular fa-hourglass"></i>
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown />
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
  }
};
</script>
