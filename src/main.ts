import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";
import { v4 as uuidv4 } from 'uuid';
import "@/core/plugins/prismjs";
import 'leaflet/dist/leaflet.css';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});
// Genera un identificador único para la sesión del usuario si no existe uno
if (!localStorage.getItem('userSessionId')) {
  const token=uuidv4();
  localStorage.setItem('userSessionId', token);
}
app.mount("#app");
