<style>
.truncated-container {
  max-height: 100px; /* Adjust the height as needed */
  overflow: auto;
}
</style>

<template>
  <tbody>
    <tr v-for="column in columns" :key="column.id">
      <th
        v-if="column.title"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
      >
        {{ column.title }}
      </th>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       <span class="font-bold text-md">{{ column.campaigns }}</span>&nbsp;&nbsp; Campaigns
      </td>

      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown @deleted-data="deletedData" :id="column.id" :types="types" :username="username" cellType="data"/>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function () {
        return {};
      },
    },
    types: {
      type: String
    }
  },

  data() {
    return {
      username: '',
      userData: []
    }
  },

  mounted() {
    this.checkUserLogin()
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    },
    checkUserLogin() {
      if (this?.token !== null) {
        const endPoint = `${this.api_url}/fitur/user-profile`;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this?.token?.token}`,
          },
        };
        this.$api
          .get(endPoint, config)
          .then(({ data }) => {
            this.userData = data.data.map((user) => user)[0]
            data.data.map((user) => {
              user.profiles.map((profile) => {
                this.username = profile.username
              })
            })
          })
          .catch((err) => {
            console.log(err)
          });
      } else {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Error Access!",
        });
        this.$router.replace("/");
      }
    },
  }

};
</script>
