<template>
  <ul>
    <li>
      <span class="mr-2" :class="[data.user_online ? 'text-emerald-600' : statPercentColor]">
        <i
          v-if="data.publish"
          class="fa-solid fa-check-double text-success-600 text-xs"
        ></i>

        {{ data.publish ? data.publish : `${statPercent}%` }}
      </span>
      <span class="whitespace-nowrap text-emerald-600">{{ statDescripiron.publish }}</span>
    </li>
    <li>
      <hr class="my-4 md:min-w-full" />
    </li>
    <li class="mb-2">
      <span class="whitespace-nowrap">{{ statDescripiron.most_viewer.title }} :</span>
      <br>
      <span class="mr-2" :class="[statPercentColor]">
        <i
          v-if="data.most_viewer"
          class="fa-solid fa-newspaper text-xs"
        ></i>

        {{ data.most_viewer ? data.most_viewer.title : `${statPercent}%` }}
      </span>
    </li>
    <li class="mb-2">
      <span class="mr-2" :class="[statPercentColor]">
        <i
          v-if="data.most_viewer.views"
          class="fa-solid fa-paperclip text-xs"
        ></i>

        {{ data.most_viewer.views ? data.most_viewer.views : `${statPercent}%` }}
      </span>
      <span class="whitespace-nowrap">{{ statDescripiron.most_viewer.views }}</span>
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
