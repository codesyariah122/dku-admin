<template>
  <ul>
    <li>
      <span class="mr-2" :class="[data.user_online ? 'text-emerald-600' : statPercentColor]">
        <i
          class="fa-solid fa-check-double text-success-600 text-xs"
        ></i>

        {{ data.publish ? data.publish : `${statPercent}%` }}
      </span>
      <span class="whitespace-nowrap text-emerald-600">{{ statDescripiron.publish }}</span>
    </li>
    <li>
      <hr class="my-4 md:min-w-full" />
    </li>
    <li class="mb-1">
      <span class="whitespace-nowrap">{{ statDescripiron.most_viewer.title }} :</span>
      <br>
      <span class="mr-2" :class="[statPercentColor]">
        {{ data.most_viewer ? data.most_viewer.title : `0` }}
      </span>
    </li>
    <li>
      <span class="mr-2" :class="[statPercentColor]">
        <i
          v-if="data.most_viewer.views"
          class="fa-solid fa-paperclip text-xs"
        ></i>

        {{ data.most_viewer.views ? data.most_viewer.views : `0` }}
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
