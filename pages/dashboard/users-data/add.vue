<template>
  <div class="flex flex-wrap">

    <div :class="`w-full ${routeName === 'add' ? 'lg:w-12/12' :'lg:w-8/12'} px-4`">
      <cards-card-settings 
        pageType="userData"
        link="users-data"
        title="Add New User"
        methodType="add"
      />
    </div>

    <div class="w-full lg:w-4/12 px-4">
      <cards-card-profile 
        pageType="userData"
        title="Add New User"
        methodType="add"
      />
    </div>

  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */
  export default {
    name: "users-data-add",
    layout: "admin",

    data() {
      return {
        routeName: this.$route.name.split('-').pop()
      };
    }
  };
</script>
