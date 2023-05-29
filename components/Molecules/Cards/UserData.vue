<template>
  <ul>
    <li>
      <span class="mr-2" :class="[data.user_online ? 'text-emerald-600' : statPercentColor]">
        <i
          v-if="data.user_online"
          class="fa-solid fa-circle text-success-600 text-xs"
        ></i>

        {{ data.user_online ? data.user_online : `-` }}
      </span>
      <span class="whitespace-nowrap text-emerald-600">{{ statDescripiron.user_online }}</span>
    </li>
    <li>
      <hr class="my-4 md:min-w-full" />
    </li>
    <li class="mb-2">
      <span class="mr-2" :class="[statPercentColor]">
        <i
          class="fa-solid fa-user-plus text-xs"
        ></i>

        {{ data.admin_dashboard ? data.admin_dashboard : `0` }}
      </span>
      <span class="whitespace-nowrap">{{ statDescripiron.admin }}</span>
    </li>
    <li class="mb-2">
      <span class="mr-2" :class="[statPercentColor]">
        <i
          class="fa-solid fa-user-pen text-xs"
        ></i>

        {{ data.author ? data.author : `0` }}
      </span>
      <span class="whitespace-nowrap">{{ statDescripiron.author }}</span>
    </li>
    <li>
      <span class="mr-2" :class="[statPercentColor]">
        <i
          class="fa-solid fa-hand-holding-medical text-xs"
        ></i>

        {{ data.user_donation ? data.user_donation : `0` }}
      </span>
      <span class="whitespace-nowrap">{{ statDescripiron.user }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    statPercentColor: {
      type: String,
      default: "text-emerald-500",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    statDescripiron: {
      type: Object,
      default: () => {
        return {}
      }
    },

    statPercent: {
      type: String,
      default: "3.48",
    },
  },
};
</script>
