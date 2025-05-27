import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faIdCard,
  faMapMarkerAlt,
  faCalendar,
  faPhone,
  faEnvelope, 
  faEdit,
  faTrash,
  faPlus,
  faCheck,
  faTimes,
  faHome,
  faPencil,
  faBox,
  faDollarSign,
  faBoxes, 
  faTags,
  faLock,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import i18nEs from "./i18n-es";
import i18nEn from "./i18n-en";

const i18n = createI18n({
    messages: {
    es: i18nEs,
    en: i18nEn,
  },
  fallbackFormat: "en",
  locale:navigator.language.startsWith("es") ? "es" : "en",
});

library.add(
  faUser,
  faIdCard,
  faMapMarkerAlt,
  faCalendar,
  faPhone,
  faEnvelope,
  faEdit,
  faTrash,
  faPlus,
  faCheck,
  faTimes,
  faHome,
  faPencil,
  faBox,
  faDollarSign,
  faBoxes,
  faTags,
  faLock,
  faUserTag
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(i18n)
  .mount("#app");
