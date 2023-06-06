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
    <div v-if="cellType === 'data'"
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
      >
        <i class="fa-solid fa-binoculars text-blue-700"></i> &nbsp;&nbsp;Detailed Data
      </a>

      <div class="h-0 my-2 border border-solid border-blueGray-100" />

      <a
        v-if="username === 'super_admin' || username === 'ad266' && types !== 'user-role'"
        @click.prevent="deletedData"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
      >
        <i class="fa-solid fa-trash text-red-700"></i> &nbsp;&nbsp;Delete Data
      </a>

      <div class="h-0 my-2 border border-solid border-blueGray-100" />

      <a
        v-if="username === 'super_admin' && types !== 'user-role'"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
      >
        <i class="fa-solid fa-pen-to-square text-cyan-800"></i> &nbsp;&nbsp;Edit Data
      </a>

      <div class="h-0 my-2 border border-solid border-blueGray-100" />

      <a
        v-if="userStatus.status === 'INACTIVE'"
        @click.prevent="activationUser(userStatus.user_id)"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
      >
        <i class="fa-solid fa-file-shield"></i> &nbsp;&nbsp;Activasi
      </a>
    </div>

    <div v-if="cellType === 'trash'"
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        v-if="username === 'super_admin' || username === 'ad266' && types !== 'user-role'"
        @click="restoredData"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
      >
        <i class="fa-solid fa-trash-can-arrow-up text-blue-700"></i> &nbsp;&nbsp;Restored
      </a>

      <div class="h-0 my-2 border border-solid border-blueGray-100" />

      <a
        v-if="username === 'super_admin' && types !== 'user-role'"
        @click="deletedData"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
      >
        <i class="fa-solid fa-trash text-red-700"></i> &nbsp;&nbsp;Destroy
      </a>

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
    },
    userStatus: {
      type: Object,
      default: function() {
        return {
          status: '',
          user_id: null
        }
      }
    },
    cellType: {
      type: String,
      default: 'data'
    }
  },
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },

  mounted() {
  },

  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "top-end",
        });
      }
    },

    deletedData() {
      this.$emit("deleted-data", this.id);
      this.dropdownPopoverShow = false;
    },

    activationUser(user_id) {
      this.$emit('activation-user', user_id)
      setTimeout(() => {
        this.dropdownPopoverShow = false;
      }, 500)
    },

    restoredData() {
      this.$emit('restored-data', this.id);
      this.dropdownPopoverShow = false;
    }
  },
};
</script>
