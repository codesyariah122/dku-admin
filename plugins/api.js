/**
 *
 * @param  props
 * @returns Inject
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create()

  // api.interceptors.request.use(config => {
  //   delete config.url;
  //   return config;
  // });

  // Set baseURL to something different
  api.setBaseURL(process.env.NUXT_ENV_API_URL)
  api.defaults.headers.common['Dku-Api-Key'] = process.env.NUXT_ENV_APP_TOKEN

  // Inject to context as $api
  inject('api', api)
}
