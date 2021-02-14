import Vue from 'vue';
import App from './App.vue';
import store from './store';
import 'materialize-css/extras/noUiSlider/nouislider.css';
import 'materialize-css/dist/css/materialize.min.css';
import Vuelidate from 'vuelidate';

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
