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

      <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div v-for="category in column.category_campaigns">
          {{category.name}}
        </div>
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ $format(column.donation_target) }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ $format(column.total_trf) }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.is_headline }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
       {{ column.publish ? column.publish : 'NULL' }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        <span v-if="checkEndCampaign(column.end_campaign)" class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{{$moment(column.end_campaign).fromNow()}}</span>
        <span v-else class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
          Telah Berakhir {{$moment(column.end_campaign).fromNow()}}
        </span>
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.author }}
      </td>

      <td

        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
      >
        {{ column.limit }}
      </td>

      <td
        v-if="column.token !== token.token && column.username !== 'super_admin'"
        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
      >
        <dropdowns-table-dropdown 
          @deleted-data="deletedData" 
          :id="column.id" 
          :types="types" 
          :username="username" 
          cellType="data"
          :queryMiddle="queryMiddle"
          :queryData="column.slug"
          :param="column.slug"
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
        return {};
      },
    },
    types: {
      type: String
    },
    queryMiddle: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      image_url: process.env.NUXT_ENV_STORAGE_URL,
      username: '',
      userData: [],
      today: this.$moment().startOf('day')
    }
  },

  mounted() {
    this.checkUserLogin();
  },

  methods: {
    checkEndCampaign(time) {
      return this.$moment(time).startOf('day') > this.today
    },

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
  }

};
</script>
