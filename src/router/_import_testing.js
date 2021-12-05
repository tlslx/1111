module.exports = file => require('@/pages/' + file).default;
//module.exports = (file) => { 
//  return () => import('@/pages/' + file);
//};
