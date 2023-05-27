<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
  >
    <div class="flex-auto p-4">
      <div class="flex flex-wrap">
        <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
          <h5 class="text-blueGray-400 uppercase font-bold text-xs">
            {{ statSubtitle }}
          </h5>
          <span class="font-semibold text-xl text-blueGray-700">
            {{ statTitle }}
          </span>
        </div>
        <div class="relative w-auto pl-4 flex-initial">
          <div
            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
            :class="[statIconColor]"
          >
            <i :class="[statIconName]"></i>
          </div>
        </div>
      </div>
      <div v-if="$_.size(Object.entries(data)) > 0" class="text-sm text-blueGray-400 mt-4">
        <molecules-cards-campaign-data v-if="statSubtitle === 'TOTAL CAMPAIGNS'"  :data="data" statePercentColor="text-blueGray-700" :statDescripiron="statDescripiron" :statPercent="statPercent" />

        <molecules-cards-user-data v-if="statSubtitle === 'TOTAL USERS'" :data="data" statPercentColor="text-blueGray-700" :statDescripiron="statDescripiron" :statPercent="statPercent"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card-stats",
  props: {
    statSubtitle: {
      type: String,
      default: "Traffic",
    },

    statTitle: {
      type: String,
      default: "350,897",
    },

    data: {
      type: Object,
      default: () => {
        return {}
      }
    },

    statArrow: {
      default: "up",
      validator: function (value) {
        return ["up", "down"].indexOf(value) !== -1;
      },
    },

    statPercent: {
      type: String,
      default: "3.48",
    },

    statPercentColor: {
      type: String,
      default: "text-emerald-500",
    },

    statDescripiron: {
      type: Object,
      default: () => {
        return {}
      }
    },

    statIconName: {
      type: String,
      default: "far fa-chart-bar",
    },

    statIconColor: {
      type: String,
      default: "bg-red-500",
    },
  },

};
</script>
