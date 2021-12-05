/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */
let routerMode = 'history';
let DEBUG = false;
let cancleHTTP = [];//取消请求头设置；
//注：下面的baseUrl地址为假地址，只是模拟的，无法调通。
if (process.env.NODE_ENV === 'development') {
  DEBUG = true;
} else if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
} else if (process.env.NODE_ENV === 'testing') {
  DEBUG = false;
}

export {
  routerMode,
  DEBUG,
  ROLE,
  cancleHTTP
};
