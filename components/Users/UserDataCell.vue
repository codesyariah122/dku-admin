<template>
  <tbody>
    <tr v-for="column in columns" :key="column.id">
      <th
        v-if="column.name"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
      >
        {{ column.name }}
      </th>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <img v-if="column.photo" :src="`${img_url}/${column.photo}`" class="rounded-full w-10 h-10" />
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.username }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.email }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.phone ? column.phone : "NULL" }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <i
          :class="`fas fa-circle ${
            column.status === 'ACTIVE' ? 'text-green-700' : 'text-orange-500'
          } mr-2`"
        ></i>
        {{ column.status }}
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.last_login ? $moment(column.last_login).fromNow() : 'NULL' }}
      </td>

      <td
        v-if="column.expires_at"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.countdown }}
      </td>

      <td
        v-else
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        NULL
      </td>

      <td
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <i
          :class="`fas fa-circle ${
            column.is_login == 1 ? 'text-green-700' : 'text-orange-500'
          } mr-2`"
        ></i>
        {{ column.is_login == 1 ? "Online" : "Offline" }}
      </td>

      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown 
          @deleted-data="deletedData"
          @activation-user="activationUser"
          :id="column.id"
          :types="types"
          :username="username"
          :userStatus="{status: column.status, user_id: column.status === 'INACTIVE' ? column.id : null}"
          cellType="data"
          :queryMiddle="queryMiddle"
          :queryType="queryRole"
          :param="column.username"
          :queryData="column.username"
        />
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
      type: String,
      default: ''
    },
    queryMiddle: {
      type: String,
      default: ''
    },
    queryRole: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      userData: [],
      username: "",
      img_url: process.env.NUXT_ENV_ASSET_PUBLIC_URL
    }
  },

  mounted() {
    this.checkUserLogin();
  },

  methods: {
    deletedData(id) {
      this.$emit("deleted-data", id);
    },

    activationUser(id) {
      this.$emit('activation-user', id);
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
