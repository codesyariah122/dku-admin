<template>
  <div>
    <a
      class="text-blueGray-400 py-1 px-6 font-bold text-lg"
      href="#!"
      @click="toggleDropdown" ref="btnDropdownRef"
    >
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div v-if="cellType === 'data'"
      ref="popoverDropdownRef"
       class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-if="types !== 'user-role'">
          <button
            @click="detailDataRedirect(queryData)"
            role="button"
            class="text-sm py-2 px-4 font-normal block w-full bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-binoculars text-blue-700"></i> &nbsp;&nbsp;Detailed Data
          </button>
        </li>
        <li>
          <button
            v-if="username === 'super_admin' || username === 'ad266' && types !== 'user-role'"
            @click.prevent="deletedData"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-trash text-red-700"></i> &nbsp;&nbsp;Delete Data
          </button>
        </li>
        <li v-if="types === 'user-data' && username === 'super_admin' && types !== 'user-role'">
          <button v-if="userStatus.status !== 'INACTIVE'"
            @click="redirectEditPage"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-pen-to-square text-cyan-800"></i> &nbsp;&nbsp;Edit Data
          </button>
        </li>
        <li v-else>
          <button v-if="username === 'super_admin' && types !== 'user-role'"
            @click="redirectEditPage"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-pen-to-square text-cyan-800"></i> &nbsp;&nbsp;Edit Data
          </button>
        </li>
        <li v-if="userStatus.status === 'INACTIVE'">
          <button
            @click.prevent="activationUser(userStatus.user_id)"
            href="javascript:void(0);"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-file-shield text-orange-500"></i> &nbsp;&nbsp;Activasi
          </button>
        </li>
      </ul>
    </div>

    <div v-if="cellType === 'trash'"
      ref="popoverDropdownRef"
      class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
     <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>      
          <button
            v-if="username === 'super_admin' || username === 'ad266' && types !== 'user-role'"
            @click="restoredData"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
          >
            <i class="fa-solid fa-trash-can-arrow-up text-blue-700"></i> &nbsp;&nbsp;Restored
          </button>
        </li>

        <li>      
          <button
            v-if="username === 'super_admin' && types !== 'user-role'"
            @click="deletedData"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
          >
            <i class="fa-solid fa-trash text-red-700"></i> &nbsp;&nbsp;Destroy
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  props: {
    id: {
      type: Number,
      default: ''
    },
    types: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
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
    },
    queryMiddle: {
      type: String,
      default: ''
    },
    queryType: {
      type: String,
      default: ''
    },
    queryData: {
      type: String,
      default: ''
    },
    param: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dropdownPopoverShow: false,
    };
  },

  mounted() {
    console.log(this.param)
  },

  methods: {
    toggleDropdown(event) {
      event.preventDefault()
      this.dropdownPopoverShow = !this.dropdownPopoverShow;

      if (this.dropdownPopoverShow) {
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
        document.addEventListener("click", this.hideDropdown);
      } else {
          // Menghapus event listener dari dokumen
        document.removeEventListener("click", this.hideDropdown);
      }
    },

    hideDropdown(event) {
        const targetElement = event.target;

        if (
          !this.$refs.btnDropdownRef.contains(targetElement) &&
          !this.$refs.popoverDropdownRef.contains(targetElement)
          ) {
          this.dropdownPopoverShow = false;
          // Menghapus event listener dari dokumen
        document.removeEventListener("click", this.hideDropdown);
      }
    },

    redirectEditPage() {
      if(this.type === 'user-data') {      
        this.$router.push({
          'path': `/dashboard/${this.queryMiddle}/edit/${this.param}`,
          query: {
            type: this.queryType
          }
        })
      } else {
        this.$router.push({path: `/dashboard/${this.queryMiddle}/edit/${this.param}`})
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
    },

    detailDataRedirect(param) {
      this.$router.push({path: `/dashboard/${this.queryMiddle}/detail/${param}`})
    }
  },
};
</script>
