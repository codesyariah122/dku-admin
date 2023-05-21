import Echo from "laravel-echo";

window.Pusher = require("pusher-js");
window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.NUXT_ENV_PUSHER_KEY,
  cluster: process.env.NUXT_ENV_PUSHER_CLUSTER,
  useTLS: true,
  // wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  // wsPort: process.env.VUE_APP_WEBSOCKETS_PORT,
  // forceTLS: false,
  // disableStats: true
});
