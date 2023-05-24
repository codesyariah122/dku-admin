<template>
  <div>
    <a
      class="text-blueGray-400 py-1 px-6 font-bold text-lg"
      href="#!"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <div v-if="types == 'campaign-data'">
        <a
          href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
        >
          <i class="fa-solid fa-info"></i> &nbsp;&nbsp;Detailed Data
        </a>
      </div>
      <div v-else>
        <a
          href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
        >
          <i class="fa-solid fa-info"></i> &nbsp;&nbsp;Detailed Data
        </a>
        <a v-if="username === 'super_admin'"
          @click="deletedData"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
        >
          <i class="fa-solid fa-trash"></i> &nbsp;&nbsp;Delete Data
        </a>
        <a v-if="username === 'super_admin'"
          href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
        >
          <i class="fa-solid fa-pen-to-square"></i> &nbsp;&nbsp;Edit Data
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  props: {
    id: {
      type: Number,
    },
    types: {
      type: String,
    },
    username: {
      type: String,
    }
  },
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },

  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },

    deletedData() {
      this.$emit("deleted-data", this.id);
      this.dropdownPopoverShow = false;
    },
  },
};
</script>
