<template>
  <!-- Header -->
  <div class="relative bg-purple-900 md:pt-32 pb-32 pt-24">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="TOTAL CAMPAIGNS"
              :statTitle="`${totalCampaign}`"
              statDataPercentColor="text-emerald-500"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="TOTAL USERS"
              :statTitle="`${totalUser}`"
              :data="`${userOnline}`"
              statArrow="up"
              statPercent="3.48"
              statPercentColor="text-emerald-500"
              statDescripiron="User is online"
              statIconName="fas fa-users"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="TOTAL CUSTOMER"
              statTitle="50"
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PERFORMANCE"
              statTitle="49,65%"
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="fas fa-percent"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import fingerPrintIcon from "~/assets/icons/fingerprint.svg";

export default {
  components: {
    CardStats,
  },

  data() {
    return {
      notifs: [],
      api_url: process.env.NUXT_ENV_API_URL,
      dataPercent: {},
      messageNotif: "",
    };
  },

  created() {
    this.checkNewData();
  },

  mounted() {
    this.getTotalUser();
    this.getUserOnline();
    this.getTotalCampaign();
  },

  methods: {
    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          this.messageNotif = e[0].notif;
          this.notifs.push(e[0]);
        }
      );
    },

    getTotalUser() {
      this.$store.dispatch("totals/totalDataQuery", {
        api_url: this.api_url,
        type: "TOTAL_USER",
        token: this.token,
      });
    },

    getTotalCampaign() {
      this.$store.dispatch("totals/totalDataQuery", {
        api_url: this.api_url,
        type: "TOTAL_CAMPAIGN",
        token: this.token,
      });
    },

    getUserOnline() {
      this.$store.dispatch("totals/totalUserOnline", {
        api_url: this.api_url,
        token: this.token,
      });
    },
  },

  computed: {
    totalUser() {
      return this.$store.getters["totals/getTotalUser"];
    },

    totalCampaign() {
      return this.$store.getters["totals/getTotalCampaign"];
    },

    userOnline() {
      return this.$store.getters["totals/getUserIsOnline"];
    },
  },
  watch: {
    notifs() {
      if (this.notifs?.length > 0) {
        this.getTotalUser();
        this.getUserOnline();
      }
    },
  },
};
</script>
