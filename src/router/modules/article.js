export default [
  {
    name: "文章大全",
    path: "article",
    iconCls: "el-icon-info",
    component: resolve => require(['@/components/framework/app/appBlock'], resolve),
    children: [
        { name: "文章管理", path: '/article', component: resolve => require(['@/pages/article/articleManage'], resolve) },
        { name: "分类管理", path: '/article/category', component: resolve => require(['@/pages/article/articleCategoryManage'], resolve) },
        { name: "文章索引", path: 'http://10.32.8.55:15601/app/kibana#/home?_g=()' }
    ]
  }
];
