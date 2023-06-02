<template>
	<nav aria-label="Page navigation example z-0">
    <ul class="flex list-style-none">
      <div v-for="(link, idx) in links" :key="idx">
        <li v-if="link.label === '&laquo; Previous'" class="page-item"><a
          :class="`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded  ${paging.current > 1 ? 'cursor-pointer' : 'pointer-events-none text-gray-500'} focus:shadow-none`" @click="fetchAllData(true, false, paging.current -= 1)" tabindex="-1" aria-disabled="true" v-html="link.label"></a></li>

          <li v-else-if="link.active" class="page-item active"><a
            :class="`page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md ${link.active ? 'pointer-events-none' : 'cursor-pointer'}`" @click="fetchAllData(true, false, parseInt(link.label))">{{link.label}}</a>
          </li>

          <li v-else-if="link.label === 'Next &raquo;'" :class="`page-item ${paging.current === paging.last ? 'disabled' : ''}`"><a
            :class="`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${paging.current === paging.last ? 'pointer-events-none text-gray-400' : 'cursor-pointer text-gray-800'}`"
            @click="fetchAllData(true, false, paging.current+=1)" v-html="link.label"></a>
          </li>

          <li v-else class="page-item"><a
            :class="`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${link.active ? 'pointer-events-none' : 'cursor-pointer'}`" @click="fetchAllData(true, false, parseInt(link.label))">{{link.label}}</a>
          </li>
        </div>
      </ul>
    </nav>
</template>


<script>
	export default {
		props: ['links', 'paging', 'category'],

		methods: {
			fetchAllData(loading, loadingDelete, page=1, name='', barcode='', category_id=this.category_id) {
				this.$emit('fetch-data', loading, loadingDelete, page, name , barcode, category_id)
			}
		}
	}
</script>