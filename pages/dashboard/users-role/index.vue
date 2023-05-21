<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table
        color="dark"
        :headers="headers"
        :columns="items"
        types="user-role"
      />
    </div>
  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
import CardTable from "@/components/Cards/CardTable.vue";
import { USER_ROLE_TABLE } from "~/utils/tables-organizations";
import { getData } from "~/hooks/getData/index";

export default {
  name: "users-data",
  layout: "admin",
  components: {
    CardTable,
  },
  data() {
    return {
      notifs: [],
      items: [],
      headers: [...USER_ROLE_TABLE],
      api_url: process.env.NUXT_ENV_API_URL,
    };
  },

  created() {
    this.checkNewData();
  },

  mounted() {
    this.getUserRole();
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    checkNewData() {
      window.Echo.channel(process.env.NUXT_ENV_PUSHER_CHANNEL).listen(
        "EventNotification",
        (e) => {
          this.notifs.push(e[0]);
        }
      );
    },

    getUserRole() {
      getData({
        api_url: `${this.api_url}/fitur/roles-management`,
        token: this.token.token,
      })
        .then(({ data }) => {
          data.data.map((cell) => {
            this.items.push({
              id: cell.id,
              name: this.$role(cell.name),
              users: cell.users.map((user) => user.name),
            });
          });
        })
        .catch((err) => console.log(err));
    },
  },

  watch: {
    notifs() {
      if (this.notifs?.length > 0) {
        this.getUserRole();
      }
    },
  },
};
</script>
