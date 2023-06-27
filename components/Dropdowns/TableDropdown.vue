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
        <li v-if="campaigns === 0">
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
          <button v-if="username === 'super_admin' && types !== 'user-role' && donationStatus !== 'PENDING' && donationStatus !== 'HOLD'"
            @click="redirectEditPage"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-pen-to-square text-cyan-800"></i> &nbsp;&nbsp;Edit Data
          </button>
        </li>
        <li v-if="userStatus.status === 'INACTIVE' && username === 'super_admin'">
          <button
            @click.prevent="activationUser(userStatus.user_id)"
            href="javascript:void(0);"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-file-shield text-orange-500"></i> &nbsp;&nbsp;Activasi
          </button>
        </li>

        <li v-if="donationStatus === 'HOLD' && username === 'super_admin'">
          <button
            @click.prevent="toggleModal()"
            href="javascript:void(0);"
            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
            <i class="fa-solid fa-file-shield text-orange-500"></i> &nbsp;&nbsp;Accept Payment
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

    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-5xl font-bold text-blueGray-800">
              Bukti Transfer
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="flex justify-center">
            <img :src="transactionReceipt" class="w-auto h-62">
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Close
            </button>
            <button @click="acceptPayment(transactionId)" class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-30 fixed inset-0 z-40 bg-black"></div>
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
    },
    campaigns: {
      type: Number,
      default: 0
    },
    donationStatus: {
      type: String,
      default: 'PENDING'
    },
    transactionId: {
      type: String,
      default: ''
    },
    transactionReceipt: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dropdownPopoverShow: false,
      showModal: false
    };
  },

  mounted() {
    // console.log(this.transactionId)
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

    toggleModal: function(){
      this.showModal = !this.showModal;
      // this.$emit('accept-payment', id)
      setTimeout(() => {
        this.dropdownPopoverShow = false;
      }, 500)
    },

    hideDropdown(event) {
      const targetElement = event.target;

      if (this.$refs.btnDropdownRef && !this.$refs.btnDropdownRef.contains(targetElement) && this.$refs.popoverDropdownRef && !this.$refs.popoverDropdownRef.contains(targetElement)
          ) {
          this.dropdownPopoverShow = false;
          // Menghapus event listener dari dokumen
          document.removeEventListener("click", this.hideDropdown);
      }
    },

    redirectEditPage() {
      if(this.types === 'user-data') {      
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
    },

    acceptPayment(id) {
      this.$emit('accept-payment', id)
      setTimeout(() => {
        this.dropdownPopoverShow = false;
      }, 500)
    }
  },
};
</script>
