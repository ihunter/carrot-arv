import { createApp } from "vue";
import { createPinia } from "pinia";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import VueTelInput from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAnMVNznWQVtyHnr9pL2Iv38oLtfXm3EmM",
    libraries: "places",
  },
});

app.use(VueTelInput);

app.mount("#app");
