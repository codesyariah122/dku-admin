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
        v-if="$_.size(column.users) > 0"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <div v-if="column.id !== 3">
          <div v-for="user in column.users" :key="user.id">
            <span class="capitalize font-semibold font-sans leading-6">
              <i class="fa-regular fa-circle"></i> {{ user }}
            </span>
          </div>
        </div>

        <div v-else>
          <nuxt-link
            to="/dashboard/users-donation"
            class="hover:text-blue-600 hover:underline hover:decoration-double text-md font-bold"
          >
            Total : {{ $_.size(column.users) }} User
          </nuxt-link>
        </div>
      </td>

      <td
        v-else
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <i class="fa-regular fa-hourglass"></i>
      </td>

     <!--  <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown @deleted-data="deletedData" :id="column.id" :types="types" :username="username" cellType="data"/>
      </td> -->
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
    }
  },

  data() {
    return {
      userData: [],
      username: ""
    }
  },


  mounted() {
    this.checkUserLogin();
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
            this.userData = data.data
            data.data.profiles.map((profile) => {
              this.username = profile.username
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
