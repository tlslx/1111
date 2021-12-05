// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// css
import 'element-ui/lib/theme-chalk/index.css';
import './theme/framework/css/glyphicons.css';
import './theme/framework/fonts/iconfont.css';
import './theme/project/iconfont/iconfont.css';
// import '//at.alicdn.com/t/font_858494_i0rilmldkda.css'
import './theme/framework/css/plugins.css';
import './theme/framework/css/layout.css';
import './theme/project/css/global.css';

/* vue-quill-editor css
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 */
/* KindEditor css
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
*/
import Vue from './scripts/framework/config';
import App from './App';
import router from './router/index.js';
import whileList from './router/whileList.js';
import store from './scripts/framework/store/index.js';
import './scripts/framework/prototype.js';
// import VuePreview from 'vue-preview';
// Vue.use(VuePreview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: { top: 0, bottom: 0 },
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// });
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    navbar: true,
    // zoomable: false,
    rotatable: false,
    scalable: false
  }
});
import pageprint from './scripts/framework/pageprint.js';
Vue.use(pageprint);
// import vcolorpicker from 'vcolorpicker';
// Vue.use(vcolorpicker);
// import moment from 'moment-timezone'
import Element from 'element-ui';
import en from 'element-ui/lib/locale/lang/en';
import zhCN from 'element-ui/lib/locale/lang/zh-CN';
import locale from 'element-ui/lib/locale';
import 'babel-polyfill';
// import i18n from './config/i18n.js';
let currentLocaleLn = zhCN;
try {
  currentLocaleLn = kindo.cache.get('language') === 'zh' ? zhCN : en;
} catch (e) {
  kindo.cache.set('language', 'zh', 'local');
  currentLocaleLn = zhCN;
}
locale.use(currentLocaleLn);
Vue.use(Element, { locale });
// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value)
// });

/**
 * 跳转统一登录
 * @param {*} path
 */
function toSsoLogin(path) {
  // let url = location.href;
  // let loginUrl = process.env.SSO_BASE_URL;
  // let IASID = process.env.IASID;
  // let url = localStorage.getItem("USER_URL");
  let url = kindo.cache.get("LOGIN_URL");
  if (url) {
    location.href = '/#' + url;
  } else {
    location.href = '/#/login';
  }
  store.commit('pageLoading', false);
  // if (kindo.util.checkuserAgent() === "IE") {
  //   window.top.location.reload();
  // }
  window.top.location.reload();
  // location.href = 'http://localhost:8090' + "/login?type=0&IASID="
  // + IASID + "&ReturnUrl=" + encodeURI(url);
}
/**
 * 判断是否白名单
 * @param {*} page
 * @returns {*} true or false
 */
function isWhileList(page) {
  for (let i = 0, len = whileList.length; i < len; i++) {
    if (whileList[i] === page.path) {
      return true;
    }
  }
  return false;
}
/**
 * 判断是否有效路由
 * @param {*} page
 * @returns {*} true or false
 */
function isRouteValidate(page) {
  if (!String.isNullOrEmpty(store.getters.token)) {
    return true;
  } else if (isWhileList(page)) {
    return true;
  } else {
    return false;
  }
}

router.beforeEach((to, from, next) => {
  if (isWhileList(to)) {
    if (to.path === '/login' || to.path === '/fciLogin') {
      kindo.cache.set("LOGIN_URL", to.path, 'session');
      // localStorage.setItem("USER_URL", to.path);
    }
    next();
    return;
  }
  if (to.path === '/login' || to.path === '/register' || to.path === '/findPwd' || to.path === '/importLogin' || to.path === '/importRegister' || to.path === '/importFindPwd' || to.path === '/agentLogin' || to.path === '/agentRegister' || to.path === '/agentFindPwd') {
    // 跳转至登录页面
    // console.log(to);
    // console.log(11123);
    // toSsoLogin();
    next();
    return;
  } else if (to.path === '/') {
    next("/index");
    return;
  } else {
    store.commit('pageLoading', true);
    if (process.env.IS_NEED_LOGIN !== 'false') {
      if (String.isNullOrEmpty(store.getters.token)) {
        store.dispatch('userInfo/getUserInfo', {
          callback: (isSuccess) => {
            if (isSuccess === true) {
              // console.log(store.getters.routers);
              router.addRoutes(store.getters.routers);
              if (!isRouteValidate(to)) {
                store.commit('pageLoading', false);
                // console.log(333);
                toSsoLogin(to.path);
              } else {
                // 加载字典信息
                store.dispatch('dataDictionary/getDictData').then(data => {
                  next(Object.assign({}, to));
                });
                return next(Object.assign({}, to));
              }
            } else {
              // console.log(555);
              toSsoLogin(to.path);
            }
          }
        });
      } else {
        // console.log(444);
        return next();
      }
    } else {
      return next();
    }
  }
});

router.afterEach((to, from) => {
  store.commit('pageLoading', false);
});

router.onError(() => {
  router.push('/404');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
