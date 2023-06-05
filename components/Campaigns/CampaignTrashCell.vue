<template>
  <tbody>
    <tr v-for="column in columns" :key="column.id">
      <th
        v-if="column.title"
        class="border-t-0 px-6  border-l-0 border-r-0 text-xs w-12 p-4 text-left" style="width: 50px;"
      >
        {{ column.title }}
      </th>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       <img v-if="column.banner !== null" :src="`${image_url}/${column.banner}`" class="w-42 h-24"/>
       <img v-else :src="require('~/assets/img/default.jpg')" class="w-42 h-24">
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.publish }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ $moment(column.end_campaign).format("LLLL") }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.created_by }}
      </td>

      
      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown @deleted-data="deletedData" @restored-data="restoredData" :id="column.id" :types="types" :username="username" :userStatus="{status: column.status, user_id: column.status === 'INACTIVE' ? column.id : null}" cellType="trash"/>
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
        return {}; // or any other appropriate default value
      },
    },
    types: {
      type: String
    },
  },

  data() {
    return {
      image_url: process.env.NUXT_ENV_STORAGE_URL,
      userData: [],
      username: "",
    }
  },

  mounted() {
    this.checkUserLogin();
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    },

    restoredData(id) {
      this.$emit('restored-data', id)
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
  },
};
</script>
