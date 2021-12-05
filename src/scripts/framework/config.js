import Vue from 'vue';
// import axios from 'axios';
import '@/config/index.js';
import '@/config/langzh.js';
import '@/config/langen.js';
import '@/utils/index.js';
import ElementUI from '@/components/framework/extend/';
import KindoBox from '@/components/project/plugins/KindoBox.vue';
import KindoTable from '@/components/project/plugins/KindoTable.vue';
import customComponents from './customComponents';
import http from './http.js';
// import mornAxios from './http.js';
import utility from './utility.js';
import formatter from './formatter';
import '@/components/framework/directives/';
import md5 from 'js-md5';

Vue.component('kindo-box', KindoBox);
Vue.component('kindo-table', KindoTable);


Vue.config.productionTip = true;
Vue.prototype.kindo = global.kindo || {};
Vue.prototype.$http = http;
// Vue.prototype.$mornAxios = mornAxios; // test
Vue.prototype.$utility = utility;
Vue.prototype.$utils = utility;
Vue.prototype.$formatter = formatter;
Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
window.eventBus = new Vue();
// const axiosInstance = axios.create();
// const configPath = `static/config/config.json`; // ${process.env.API_BASE_URL}/
// axiosInstance.get(configPath).then(config => {
//   let newtemp = Object.assign({}, kindo.config, config.data);
//   console.log(newtemp);
//   kindo.config = newtemp;
// });

customComponents.register(Vue);

export default Vue;
