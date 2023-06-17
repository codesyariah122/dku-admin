<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img
              :alt="userData.name"
              :src="image"
              class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
            />
          </div>
        </div>
      </div>
      <div class="text-justify mt-24">
        <h3
          class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 capitalize"
        >
          {{user.name}}
        </h3>
        <div
          class="text-sm text-justify mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          Address : {{profiles.address}}
        </div>
        <div
          class="text-sm text-justify mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-tree-city mr-2 text-lg text-blueGray-400"></i>
          City : {{profiles.city}}
        </div>
        <div
          class="text-sm text-justify mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-signs-post mr-2 text-lg text-blueGray-400"></i>
          Post Code : {{profiles.post_code}}
        </div>
        <div
          class="text-sm text-justify mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="fas fa-earth-asia mr-2 text-lg text-blueGray-400"></i>
          Province : {{profiles.province}}
        </div>
        <div class="mb-2 text-left text-blueGray-600 mt-10">
          <i class="fas fa-envelope-circle-check mr-2 text-lg text-blueGray-400"></i>
          Email : {{user.email}}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
          Phone: {{user.phone}}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-user-lock mr-2 text-lg text-blueGray-400"></i>
          Username : {{profiles.username}}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-user-shield mr-2 text-lg text-blueGray-400"></i>
          Roles: {{roles.name}}
        </div>

        <div class="mb-2 text-blueGray-600">
          <i :class="`fas ${user.status === 'INACTIVE' ? 'fa-square-person-confined' : 'fa-shield'} mr-2 text-lg text-blueGray-400`"></i>
          Status: {{user.status}}
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-9/12 px-4">
            <span class="text-blueGray-400 text-left">About : </span>
            <article class="mb-4 text-justify text-lg leading-relaxed text-blueGray-700" v-html="profiles.about"></article>
            <a href="javascript:void(0);" class="font-normal text-emerald-500">
              Show more
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: function() {
        return {}
      }
    },
    profiles: {
      type: Object,
      default: function() {
        return {}
      }
    },
    roles: {
      type: Object,
      default: function() {
        return {}
      }
    },
    image: {
      type: String,
      default: ''
    }
  }
};
</script>
