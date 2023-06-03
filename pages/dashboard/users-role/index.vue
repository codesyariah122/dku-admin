<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table
        color="dark"
        title="Roles User"
        :headers="headers"
        :columns="items"
        types="user-role"
        queryType="USER_ROLE"
        queryMiddle="users-role"
        :usersData="Object.values(this.userData)"
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
      dataNotifs: [],
      notifs: [],
      items: [],
      headers: [...USER_ROLE_TABLE],
      api_url: process.env.NUXT_ENV_API_URL,
      message: "",
      loading: null
    };
  },

  created() {
    this.checkNewData();
    this.dataManagementEvent();
  },

  mounted() {
    this.checkUserLogin();
    this.getUserRole();
  },

  methods: {
    authTokenStorage() {
      this.$store.dispatch("auth/storeAuthToken", "auth");
    },

    getUserRole() {
      getData({
        api_url: `${this.api_url}/fitur/roles-management`,
        token: this.token.token,
        api_key: process.env.NUXT_ENV_APP_TOKEN
      })
        .then(({ data }) => {
          let cells = [];
          data?.data?.map((cell) => {
            cells.push({
              id: cell?.id,
              name: this.$role(cell?.name),
              users: cell?.users?.map((user) => user?.name),
            });
          });
          this.items = [...cells];
        })
        .catch((err) => console.log(err));
    },
  },

  watch: {
    notifs() {
      if (this.$_.size(this.notifs) > 0) {
        if (this.notifs.type !== "added" || this.notifs.type !== "removed") {
          this.getUserRole();
        }
      }
    },
    dataNotifs() {
      if (this.dataNotifs?.length > 0) {
        this.$toast.show(this.message, {
          type: "info",
          duration: 5000,
          position: "top-right",
        });
        this.getUserRole();
      }
    },
  },
};
</script>
