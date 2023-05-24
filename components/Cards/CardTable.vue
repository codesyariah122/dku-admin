<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-blueGray-800 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            {{ title }}
          </h3>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <molecules-table-header :headers="headers" :color="color" />

        <users-user-data-cell
          v-if="types === 'user-data'"
          :columns="columns"
          @deleted-data="deletedData"
          :types="types"
        />

        <users-role-data-cell
          v-if="types === 'user-role'"
          :columns="columns"
          @deleted-data="deletedData"
          :types="types"
        />

        <campaigns-campaign-data-cell
          v-if="types === 'campaign-data'"
          :columns="columns"
          @deleted-data="deletedData"
          :types="types"
        />
      </table>
    </div>
  </div>
</template>
<script>
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
    }
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    }
  },
};
</script>
