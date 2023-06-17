<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-8/12 px-4">
      <settings-profile-card-settings />
    </div>
    <div class="w-full lg:w-4/12 px-4">
      <settings-profile-card-profile />
    </div>
  </div>
</template>

<script>
/**
 * @param {string}
 * @returns {string}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */
  import { getData } from "~/hooks/index";

  export default {
    name: "settings-profile",
    layout: "admin"

  };
</script>
