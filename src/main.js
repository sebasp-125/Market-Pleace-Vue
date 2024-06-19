import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VuexStore from './components/VuexStore';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
//--- IMPORT TO THE BOOTSTRAP PROYECT OF MY PROYECT-----
// Import Bootstrap and BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.config.productionTip = false;

const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

Vue.use(Toast, options);

new Vue({
  router,
  store: VuexStore,
  render: h => h(App),
}).$mount('#app');
