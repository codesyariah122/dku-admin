<template>
  <div>
    <main>
      <section class="relative w-full h-screen py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-cover bg-no-repeat bg-center "
          :style="`background-image: url('${bgImage}');`"
        ></div>
        <Nuxt />
      </section>
    </main>
  </div>
</template>
<script>
import registerBg2 from "@/assets/img/index-bg.jpg";

export default {
  data() {
    return {
      bgImage: registerBg2,
    };
  },

};
</script>
