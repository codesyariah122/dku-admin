<template>
  <thead>
    <tr>
      <th
        v-for="header in headers"
        :key="header.id"
        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        :class="[
          `${color === 'light'
            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
            : 'bg-blueGray-900 text-blueGray-300 border-blueGray-700'}`, `${header.id === 1 ? 'w-10' : ''}`
        ]"
      >
        {{ header.title }}
      </th>

      <th
        v-if="types !== 'user-role'"
        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
        :class="[
          color === 'light'
            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
            : 'bg-blueGray-900 text-blueGray-300 border-blueGray-700',
        ]"
      >
        Options
      </th>
    </tr>
  </thead>
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
    headers: {
      type: Array,
    },
    types: {
      type: String,
      default: ''
    },
  },
};
</script>
