<template>
  <nav class="app-menu"   :style="{height: height+'px'}">
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <!--导航菜单-折叠功能-->
    <!-- <aside :class="collapsed?'menu-collapsed':'menu-expanded'"> -->
    <!--单个激活 并以 index 作为 path 进行路由跳转
          :default-openeds="['0']"
    -->
    <el-menu unique-opened :router="false" :collapse="collapse"
      text-color = "#555"
      active-text-color = "#2d92ec"
      class = "el-menu-vertical"
      :collapse-transition = false
      :default-active="$route.path"
      :background-color = "backgroundColor"
     >
    <!--动态路由到子组件 将不可见的路径隐藏-->
      <!-- <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden"> -->
        <!-- <el-submenu :index="index+''" v-if="!item.leaf" :key="index"> -->
        <!--用el ui 的title进行solt分发菜单-->
          <!-- <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template> -->
        <!--item.name和item.children.name来配置菜单栏和子菜单栏的名称-->
          <!-- <el-menu-item v-for="child in item.children" :index="child.path"  -->
            <!-- :key="child.path" v-if="!child.hidden" :name="child.name" @click="menuClick">{{child.name}}</el-menu-item> -->
        <!-- </el-submenu> -->
        <!-- <el-menu-item v-if="item.leaf && item.children.length > 0"  -->
          <!-- :key="index" :index="item.children[0].path"><i  -->
          <!-- :class="item.iconCls" :name="item.children[0].name" @click="menuClick"></i>{{item.children[0].name}}</el-menu-item> -->

     <!--
      <el-menu-tree :menu-data="routers" @menu-click="menuClick">

      </el-menu-tree>
      -->
      <!-- 如果使用el-menu-tree 会破坏整个menu的结构，菜单收缩的时候不能自动隐藏文字，所以放在这里-->
       <template v-for="menu in routers">
            <el-submenu v-if="!menu.hidden && menu.children"
              :index="menu.name+menu.id"
              :key="menu.name+menu.id">
                <template slot="title">
                    <i :class="menu.iconCls"></i>
                    <span slot="title">{{menu.name}}</span>
                </template>
                <el-menu-tree @menu-click="menuClick"
                  :menu-data="menu.children"></el-menu-tree>
            </el-submenu>
            <el-menu-item v-else-if="!menu.hidden"
              :index="menu.name+menu.id"
              :key="menu.name+menu.id"
              :path="menu.path"
              :subUrl="menu.subUrl"
              :name="menu.name"
              @click="menuClick">
                <i :class="menu.iconCls"></i>
                <span slot="title">{{menu.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>

  </nav>
</template>

<script>
import store from "@/scripts/framework/store/";
export default {
  name: "AppMenu",
  props: ["height", "collapse", "backgroundColor"],
  data() {
    return {
      menuTree: [],
      collapsed: false
    };
  },
  async created () {
    // this.menuTree = await this.getMenuTree();
    // console.log(this.menuTree);
  },
  methods: {
    menuClick(e) {
      // 南京支撑性清除届数缓存，如有冲突请联系。
      localStorage.removeItem('session');
      let path = e.$attrs.path;
      let name = e.$attrs.name;
      this.$emit("menu-click", e, name, path);
    },
    // 后期未调用
    getMenuTree() {
      let param = {
        IASID: process.env.IASID,
        reqSsoToken: store.getters.token
      };
      return this.$http.get(kindo.config.api.comsUrl + "/api/security/info", param).then(res => {
        let diclist = [];
        diclist = res.menuTree;
        return this.createAuthRouter(diclist);
      });

      // menuList = [{
      //   "id": "1",
      //   "pid": "0",
      //   "name": "A区域1号馆",
      //   "icon": 'el-icon-info',
      //   "children": [{
      //     "id": "1.1",
      //     "pid": "1",
      //     "name": "1.1展厅",
      //     "path": "111111111123",
      //     "hidden": true,
      //     "child": null
      //   }, {
      //     "id": "1.2",
      //     "pid": "1",
      //     "name": "1.2展厅",
      //     "path": "zonePlanPreset",
      //     "url": "exhibitionplan/zonePlanPreset",
      //     "hidden": false,
      //     "child": null
      //   }]
      // }, {
      //   "id": "2",
      //   "pid": "0",
      //   "name": "A区域2号馆",
      //   "icon": 'el-icon-info',
      //   "children": [{
      //     "id": "2.2",
      //     "pid": "2",
      //     "name": "2.2展厅",
      //     "path": "extension",
      //     "url": "exhibitionplan/extension",
      //     "hidden": false,
      //     "children": null
      //   }]
      // }, {
      //   "id": "3",
      //   "pid": "0",
      //   "name": "多元化业务",
      //   "icon": 'el-icon-info',
      //   "children": [{
      //     "id": "3.1",
      //     "pid": "3",
      //     "name": "系统管理",
      //     "icon": 'el-icon-info',
      //     "children": [{
      //       "id": "3.1",
      //       "pid": "3",
      //       "name": "CF奖评选活动信息",
      //       "path": "competitionInformation",
      //       "url": "diversification/systemManagement/competitionInformation",
      //       "hidden": false,
      //       "children": null
      //     }]
      //   }]
      // }];
      // return this.createAuthRouter(menuList);
    },
    createAuthRouter(menuTree) {
      const authRouter = [];

      // 根据权限菜单树, 递归生成权限路由
      menuTree.forEach(menu => {
        authRouter.push({
          name: menu.name,
          path: `/${menu.path}`,
          iconCls: menu.icon,
          component: (resolve) => require(['@/components/framework/app/appBlock'], resolve),
          children: this.createChildrenAuthRouter(menu.children)
        });
      });

      // authRouter.push({
      //   path: '*',
      //   name: 'notFound',
      //   component: resolve => require(['./components/notFound.vue'], resolve)
      // })
      this.$router.addRoutes(authRouter);
      return authRouter;
    },
    createChildrenAuthRouter(menus, authRouterChildren = []) {
      // 根据权限菜单树, 递归生成权限路由
      if (menus && menus.length > 0) {
        menus.forEach(menu => {
          if (menu.children && menu.children.length > 0) {
            // console.log(menu.children);
            authRouterChildren.push({
              name: menu.name,
              path: `/${menu.path}`,
              iconCls: menu.icon,
              component: (resolve) => require(['@/components/framework/app/appBlock'], resolve),
              children: this.createChildrenAuthRouter(menu.children)
            });
            // this.createChildrenAuthRouter(menu.children, authRouterChildren);
          } else {
            authRouterChildren.push({
              name: menu.name,
              path: `/${menu.path}`,
              hidden: menu.hidden,
              component: resolve =>
                require([`@/pages/${menu.url}`], resolve, reject => {
                  return require(['@/pages/home/404'], resolve);
                })
            });
          }
        });
      }
      return authRouterChildren;
    }
  },
  computed: {
    routers() {
      return store.getters.routers;
    }
  }
};
</script>

<style>
.app-menu {
  overflow-y: auto;
  overflow-x: hidden;
  /* background-color: transparent;  设置背景图片 */
}
.el-menu {
  border: none;
   /* background-color: transparent;  设置背景图片 时将此部分透明 */
}
.app-menu::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
.app-menu::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #939494;
}
.app-menu::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #939494;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
li.el-menu-item:hover {
  color: #fff;
}
 /*
.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #4192bf;
}
*/

</style>
