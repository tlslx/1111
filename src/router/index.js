import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);
// 预先加载页面
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require([`@/pages/home/login`], resolve)
    },
    {
      path: '/buslogin',
      name: 'buslogin',
      component: resolve => require([`@/pages/home/buslogin`], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require([`@/pages/home/onlineService/register`], resolve)
    },
    {
      path: '/findPwd',
      name: 'findPwd',
      component: resolve => require([`@/pages/home/personal/findPwd`], resolve)
    },
    {
      path: '/accountInfo',
      name: 'accountInfo',
      component: resolve => require([`@/pages/home/personal/accountInfo`], resolve)
    },
    {
      path: '/reviseEmail',
      name: 'reviseEmail',
      component: resolve => require([`@/pages/home/personal/reviseEmail`], resolve)
    },
    {
      path: '/revisePhoneNum',
      name: 'revisePhoneNum',
      component: resolve => require([`@/pages/home/personal/revisePhoneNum`], resolve)
    },
    {
      path: '/submitEmail',
      name: 'submitEmail',
      component: resolve => require([`@/pages/home/personal/submitEmail`], resolve)
    },
    {
      path: '/submitPhoneNum',
      name: 'submitPhoneNum',
      component: resolve => require([`@/pages/home/personal/submitPhoneNum`], resolve)
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: resolve => require([`@/pages/home/personal/changePassword`], resolve)
    },
    {
      path: '/importLogin',
      name: 'importLogin',
      component: resolve => require([`@/pages/home/Exhibitors/importLogin`], resolve)
    },
    {
      path: '/importRegister',
      name: 'importRegister',
      component: resolve => require([`@/pages/home/Exhibitors/importRegister`], resolve)
    },
    {
      path: '/importFindPwd',
      name: 'importFindPwd',
      component: resolve => require([`@/pages/home/Exhibitors/importFindPwd`], resolve)
    },
    {
      path: '/agentLogin',
      name: 'agentLogin',
      component: resolve => require([`@/pages/home/Exhibitors/agentLogin`], resolve)
    },
    {
      path: '/agentRegister',
      name: 'agentRegister',
      component: resolve => require([`@/pages/home/Exhibitors/agentRegister`], resolve)
    },
    {
      path: '/agentFindPwd',
      name: 'agentFindPwd',
      component: resolve => require([`@/pages/home/Exhibitors/agentFindPwd`], resolve)
    }
  ]
});
export const constantRouterMap = routes;
export default router;
