export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create()

  // api.interceptors.request.use(config => {
  //   delete config.url;
  //   return config;
  // });

  // Set baseURL to something different
  api.setBaseURL(process.env.NUXT_ENV_API_URL)

  // Inject to context as $api
  inject('api', api)
}
