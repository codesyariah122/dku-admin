export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // loading: {
  //   color: "#01d28e",
  //   height: "11px",
  // },
  loading: '~/components/Loading.vue',
  generate: {
    dir: "dist",
    cache: {
      ignore: ["renovate.json"],
    },
  },
  server: {
    port: 3031 // Set your desired port number here
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "DKU DASHBOARD",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Yayasan Dompet Kebaikan Umat",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "keyword",
        content: "Yayasan Dompet Kebaikan Umat",
      },
      {
        name: "description",
        content: "Yayasan Dompet Kebaikan Umat",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://dompetkebaikanumat.com/",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "Yayasan Dompet Kebaikan Umat",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Yayasan Dompet Kebaikan Umat",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Yayasan Dompet Kebaikan Umat",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:image:type",
        property: "og:image:type",
        content: "image/png",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://api.dompetkebaikanumat.com/assets/img/logo-dku.png",
      },
      {
        hid: "og:image:width",
        property: "og:image:width",
        content: "600",
      },
      {
        hid: "og:image:height",
        property: "og:image:height",
        content: "600",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/assets/flowbite.min.css",
      },
    ],
    script: [
      {
        src: "/assets/flowbite.min.js",
        body: true,
        async: true,
        defer: true,
        ssr: false,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js",
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/main.css",
    "@/assets/css/global.css",
    "@/assets/css/tailwind.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/api" },
    { src: "~/plugins/vue-sweetalert2" },
    { src: "~/plugins/role" },
    { src: "~/plugins/laravel-echo" },
    { src: "~/plugins/v-select2-component" },
    { src: "~/plugins/size" },
    { src: "~/plugins/currency" },
    { src: "~/plugins/pagination" },
    { src: "~/plugins/vClickOutside", ssr: false },
    { src: "~/plugins/lodash", ssr: false },
    { src: '~/plugins/truncate-html', ssr: false },
    { src: '~/plugins/he', ssr: false },
    { src: '~/plugins/autoLogoutMixin.js', ssr: false },
    { src: "~/plugins/tel-input", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxt/postcss8",
    "@nuxtjs/dotenv",
    "@nuxtjs/device",
    "@nuxtjs/moment",
    // '@nuxtjs/style-resources'
    // "@nuxtjs/fontawesome",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/tailwindcss",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/toast",
  ],

  //   fontawesome: {
  //     component: 'Fa',
  //     suffix: false,
  //     icons: {
  //       solid: true,
  //       brands: true,
  //     },
  // },

  device: {
    refreshOnResize: true,
  },
  styleResources: {
    scss: ["~/assets/scss/_app.scss"],
  },
  moment: {
    timezone: true,
    defaultTimezone: "Asias/Jakarta",
    locales: ["id"],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NUXT_ENV_API_URL,
  },

  workbox: {
    // workboxOptions: {
    //   skipWaiting: true,
    // },
    cachingExtensions: '@/plugins/workbox-cache.js',
    cacheOptions: {
      cacheId: 'dku-cache',
      clientsClaim: true,
    },
    offline: true,
    // offlineStrategy: 'NetworkFirst',
    // offlinePage: null,
    // offlineAssets: [],
    runtimeCaching: [
      {
        urlPattern: "/assets/css/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "/assets/fonts/.*",
        handler: "cacheFirst",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "/assets/img/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "/assets/js/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "/assets/scss/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        urlPattern: "/assets/vendor/.*",
        method: "GET",
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
    ],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: "DKU::ADMIN",
      author: "DKU::ADMIN",
      icon: true,
      canonical: "https://dompetkebaikanumat.com/",
      description:
        "Dompet Kebaikan Umat merupakan sebuah lembaga filantropi yang bergerak dalam penghimpunan dan pengelolaan dana sosial untuk membantu masyarakat kategori mustahik menjadi masyarakat sejahtera melalui pemberdayaan umat (Empowering Program) dan kemanusiaan. Pemberdayaan bergulir melalui pengelolaan dana infak, sedekah dan wakaf serta dana sosial lainnya yang terkelola secara modern dan Amanah. Bersama Anda #SahabatKU raih amalsholeh dengan jembatan kebaikan dalam menuntaskan permasalahan sosial seperti kesehatan, pendidikan, tanggap bencana, dakwah dan pemberdayaan..",
      keywords: "DKU - Yayasan Dompet Kebaikan Umat",
      ogUrl: "https://dompetkebaikanumat.com/",
      ogType: "website",
      ogSiteName: "DKU::ADMIN",
      ogTitle: "DKU::ADMIN",
      ogImage: "/icon.png",
      ogImageWidth: "600",
      ogImageHeight: "400",
    },
    manifest: {
      lang: "en",
      name: "DKU::ADMIN",
      short_name: "DKU::ADMIN",
      description:
        "Dompet Kebaikan Umat merupakan sebuah lembaga filantropi yang bergerak dalam penghimpunan dan pengelolaan dana sosial untuk membantu masyarakat kategori mustahik menjadi masyarakat sejahtera melalui pemberdayaan umat (Empowering Program) dan kemanusiaan. Pemberdayaan bergulir melalui pengelolaan dana infak, sedekah dan wakaf serta dana sosial lainnya yang terkelola secara modern dan Amanah. Bersama Anda #SahabatKU raih amalsholeh dengan jembatan kebaikan dalam menuntaskan permasalahan sosial seperti kesehatan, pendidikan, tanggap bencana, dakwah dan pemberdayaan..",
      start_url: "/",
      lang: "en",
      display: "standalone",
      theme_color: "#000",
      background_color: "#000",
      icons: [
        {
          src: "/icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any",
        },
      ],
    },
  },
  robots: {
    UserAgent: "*",
    Disallow: "/",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
