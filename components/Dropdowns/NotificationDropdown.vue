<template>
  <div>
    <a
      class="text-blueGray-300 block py-1 px-3 cursor-pointer"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="relative m-6 inline-flex w-fit">
        <div v-if="showNotif"
          class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2.5 text-xs"
        ></div>
        <div
          class="flex items-center justify-center rounded-full bg-transparent px-0 py-0 text-center 2xl:text-gray-400 dark:text-gray-800"
        >
          <i class="fa-solid fa-bell text-2xl"></i>
        </div>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
    <div v-for="notif in listNotifs" :key="notif.id" class="grid grid-cols-1">
      <div class="col-span-full">
        <a
          href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
        <i class="fa-solid fa-circle text-success-600"></i>&nbsp;&nbsp;{{ notif }}
        </a>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      showNotif: null,
      listNotifs: localStorage.getItem('notif-lists') ? JSON.parse(localStorage.getItem('notif-lists')) : [],
    };
  },

  mounted() {
    console.log(this.notifs);
  },

  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      this.showNotif = false
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
  // watch: {
  //   notifs() {
  //     if (this.$_.size(this.notifs) > 0) {
  //       this.showNotif = true;
  //       let lists = [];
  //       lists.push(this.messageNotifs);
  //       localStorage.setItem('notif-lists', JSON.stringify(lists));
  //     }
  //   },
  // },
};
</script>
