<template>
  <el-page ref="index" :leftWidth="menuLeftSize">
    <template slot="lefter" style="bg:#545c64">
      <div class="userInfo" v-bind:style="{'height': userInfo.height + 'px', 
                                          'background-color': '#' + userInfo.backgroundColor }">
        <div class="userInfosimple" style="height:80px" v-if="!menuIsCollapse">
          <!-- <div class="userInfoWelcom">
            <div>欢迎，{{userName}}</div>
          </div> -->
          <!-- <div class="userinfoSwitch" v-if="!menuIsCollapse">
            <i v-if="!userInfo.isCollapse" class="el-icon-caret-top" @click.stop="userInfoSizeChange">
            </i>
            <i v-if="userInfo.isCollapse" class="el-icon-caret-bottom" @click.stop="userInfoSizeChange">
            </i>
          </div> -->
        </div>
        <div class="userInfoImg" v-if="!userInfo.isCollapse || menuIsCollapse" v-bind:style="{ 'width': userInfo.img.width + 'px' ,
                                                            'height': userInfo.img.height + 'px' ,
                                                            'left': userInfo.img.marginLeft + 'px',
                                                            'top': userInfo.img.marginTop + 'px'}">
          <img src="/static/img/head.jpg" v-bind:style="{ 'width': userInfo.img.width + 'px' ,
                                                            'height': userInfo.img.height + 'px' }" />
        </div>
        <div class="userInfoTool" v-if="!userInfo.isCollapse">
          <el-button type="warning" icon="el-icon-bell" circle size="mini"></el-button>
          <el-button type="info" icon="el-icon-message" circle size="mini"></el-button>
          <el-button type="success" icon="el-icon-date" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-service" circle size="mini"></el-button>
        </div>
      </div>
      <div class="menu">
        <app-menu v-bind:height="menuHeight" :collapse="menuIsCollapse" :backgroundColor="menuBackColor" @menu-click="menuClick"></app-menu>
      </div>
      <div class="menuSwitch">
        <i v-if="menuIsCollapse" class="el-icon-caret-right" @click.stop="menuSizeChange">
        </i>
        <i v-if="!menuIsCollapse" class="el-icon-caret-left" @click.stop="menuSizeChange">
        </i>
      </div>
    </template>

    <template slot="body">
      <el-tabs class="tabs-header" type="border-card" v-model="editableTabsValue" @tab-click="handleClick" @tab-remove="removeTab">
        <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :index="index" :label="item.title" :name="item.name" :closable="item.closable">
          <!-- <iframe class="ifa" scrolling=auto :src="item.path" frameborder="0" :height="iframeHeight" style="margin:0"></iframe> -->
        </el-tab-pane>
      </el-tabs>
      <div style="background: #ededed;">
        <iframe class="ifa" id="newframe" scrolling=auto :src="path" frameborder="0" :height="iframeHeight"></iframe>
      </div>
      <!-- <el-tabs class="tabs-header" type="border-card" v-model="editableTabsValue" @tab-remove="removeTab">
        <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :index="index" :label="item.title" :name="item.name" :closable="item.closable">
          <iframe class="ifa" scrolling=auto :src="item.path" frameborder="0" :height="iframeHeight" style="margin:0"></iframe>
        </el-tab-pane>
      </el-tabs> -->
      <!-- <div class="userControl">
        <el-badge :value="3" class="item">
          <el-button icon="el-icon-message" circle></el-button>
        </el-badge>
      </div> -->
      <div class="userImg">
        <!-- <el-badge :value="3" class="item">
          <el-button icon="el-icon-message" circle></el-button>
        </el-badge> -->
        <img src="/static/img/head.jpg" v-bind:style="{ 'width': userInfo.img.width + 'px' ,
                                                            'height': userInfo.img.height + 'px' }" />
        <span class="el_span_userName" @click="showHideMenu">
          {{userName}}
          <i :class="iconArrow"></i>
        </span>
      </div>
      <div v-if='isShowHideMenu' class="hideMenu">
        <div class="triangle_border_up"></div>
        <div class="el_div_hideMenue" @mouseenter="handleDefautBg(1)" @mouseleave="handleDefautBg(2)">
          <ul>
            <li v-for="(menu,index) in hideMenu" :key="index" @click.stop="gotoNextMenu(menu)" :class="index > 0 ?elLliActiveColor:defautBg+' '+elLliActiveColor">{{menu.menuName}}<span style="color:red">{{rolesId!==null ? rolesId === menu.id?'(当前角色)':'':''}}</span></li>
          </ul>
        </div>
      </div>
      <i class="iconfont icon-swticontuichu" @click="logout"></i>
    </template>
  </el-page>
</template>

<script>
import $ from "jquery";
import store from "@/scripts/framework/store/";
import Menu from "@/components/framework/app/appMenu";
export default {
  name: "Index",
  data() {
    return {
      primaryColor: "#ffffff",
      // backgroundImg: "url(/static/img/menuback.jpg)",
      iframeHeight: 0,
      userInfo: {
        height: 80,
        backgroundColor: '2b579a',
        isCollapse: true,
        img: {
          width: 45,
          height: 45,
          marginLeft: 52,
          marginTop: 0
        }
      },
      path: "/#/mainPage",
      source: {
        language: {
          commonLang: ''
        }
      },
      menuHeight: 80,
      menuLeftSize: 250,
      menuIsCollapse: false,
      menuBackColor: "transparent",
      menuTree: [],
      userRoles: [],
      dataTree: [],
      rolesId: "",
      editableTabsValue: "首页",
      editableTabs: [
        {
          title: "首页",
          name: "首页",
          path: "/#/mainPage",
          closable: false
        }
      ],
      isShowHideMenu: false,
      hideMenu: [],
      defautBg: 'blueDefautBg',
      elLliActiveColor: 'el_li_activeColor_blue',
      iconArrow: 'el-icon-arrow-left'
    };
  },
  async created() {
    let _this = this;
    let that = _this;
    this.resizeHandler = function () {
      that.computeStyle();
    };
    window.addEventListener("resize", this.resizeHandler);
    this.$nextTick(() => {
      that.computeStyle();
    });
    // 读取国际化
    this.source.language.commonLang = kindo.util.getLanguage('CommonLang');
    this.hideMenu = [
      {
        id: 1,
        menuName: this.source.language.commonLang.accountInfo,  //账号管理
        route: '/#/accountInfo'
      }
      // {
      //   id: 2,
      //   menuName: this.source.language.commonLang.changePassword,  //修改密码
      //   route: '/#/changePassword'
      // },
      // {
      //   id: 3,
      //   menuName: this.source.language.commonLang.findPwd,  //找回密码
      //   route: '/#/findPwd'
      // },
      // {
      //   id: 4,
      //   menuName: this.source.language.commonLang.revisePhoneNum,  //修改手机号
      //   route: '/#/revisePhoneNum'
      // },
      // {
      //   id: 5,
      //   menuName: this.source.language.commonLang.getEmail,  //发送邮箱
      //   route: '/#/getEmail'
      // },
      // {
      //   id: 6,
      //   menuName: this.source.language.commonLang.reviseEmail,  //修改邮箱
      //   route: '/#/reviseEmail'
      // }
    ];
  },
  mounted() {
    this.switchTheme();
    this.getTabs();
    window.menuClick = this.menuClick;
    window.addTab = this.addTab;
    window.handleClick = this.handleClick;
    this.path = "/?r=" + (new Date()).getTime() + "/#/mainPage?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(this.editableTabsValue);
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     kindo.util.clickWin();
    //   }, 15000);
    // });
  },
  components: { [Menu.name]: Menu },
  computed: {
    userName() {
      if (this.$utility.isEmpty(this.$store.getters.userInfo)) {
        return "未登录";
      }
      return this.$store.getters.userInfo.userName;
    }
  },
  methods: {
    handleLeaveHideMenu() {
      this.handleDefautBg();
      // this.isShowHideMenu = false;
    },
    handleDefautBg(type) {
      const temp = kindo.config.theme === 'blue' ? 'blueDefautBg' : 'redDefautBg';
      this.defautBg = this.defautBg ? '' : temp;
      if (type === 2) {
        this.isShowHideMenu = false;
        this.iconArrow = this.isShowHideMenu ? 'el-icon-arrow-down' : 'el-icon-arrow-left';
      }
    },
    gotoNextMenu(menu) {
      // console.log(menu);
      if (!menu.route) {
        kindo.cache.set(kindo.constant.USER_ROLE, menu.id, 'session');
        location.href = '/';
      }
      this.path = "/?r=" + (new Date()).getTime() + menu.route + "?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(this.editableTabsValue);
      // console.log(this.path);
    },
    showHideMenu() {
      if (this.$store.getters.userInfo.source === '2' || this.$store.getters.userInfo.org.deptType === '5' || this.$store.getters.userInfo.org.deptType === '7' || this.$store.getters.userInfo.org.deptType === '10' || this.$store.getters.userInfo.org.deptType === '30') {
        this.isShowHideMenu = !this.isShowHideMenu;
        this.iconArrow = this.isShowHideMenu ? 'el-icon-arrow-down' : 'el-icon-arrow-left';
      }
    },
    computeStyle() {
      try {
        let height = 0;
        if (this.$el.parentNode.tagName === "BODY") {
          height = window.document.documentElement.clientHeight;
        } else {
          height = this.$el.parentNode.offsetHeight;
        }
        this.iframeHeight = height - 100;
        this.menuHeight = height - this.userInfo.height - 32;
      } catch (ex) {
        return;
      }
    },
    // 控制用户信息显示和缩进
    userInfoSizeChange() {
      this.userInfo.isCollapse = !this.userInfo.isCollapse;
      if (!this.userInfo.isCollapse) {
        this.userInfo.height = 181;
      } else {
        this.userInfo.height = 80;
      }

      let _this = this;
      let that = _this;
      that.computeStyle();
    },
    // 控制菜单栏显示和缩进
    menuSizeChange() {
      this.menuIsCollapse = !this.menuIsCollapse;
      if (this.menuIsCollapse) {
        // 强制缩小个人信息位置
        if (!this.userInfo.isCollapse) {
          this.userInfo.isCollapse = true;
          this.userInfo.height = 80;
        }
        // 修改背景颜色
        // this.userInfo.backgroundColor = '#545c64';
        // 缩小头像并调整位置
        this.userInfo.img.height = 45;
        this.userInfo.img.width = 45;
        this.userInfo.img.marginLeft = 10;
        this.userInfo.img.marginTop = 15;
        // 设置菜单背景颜色
        this.menuBackColor = this.primaryColor;
        // 缩小菜单宽度
        this.menuLeftSize = 65;
      } else {
        // 恢复头像并恢复位置
        this.userInfo.img.height = 45;
        this.userInfo.img.width = 45;
        this.userInfo.img.marginLeft = 52;
        this.userInfo.img.marginTop = 0;
        // 恢复个人信息背景色
        // this.userInfo.backgroundColor = '#eee';
        // 恢复菜单宽度
        if (kindo.config.theme === 'blue') {
          this.menuLeftSize = 250;
        } else {
          this.menuLeftSize = 310;
        }
        // 恢复菜单背景透明
        this.menuBackColor = "transparent";
      }
      this.computeStyle();
    },
    menuClick(e, name, path) {
      // console.log(e.$attrs.remark);
      this.path = '';
      // this.path = Object.assign({}, path);
      // console.log(name, path);
      let _forms = Object.assign({}, { path: path });
      // this.addTab(name, path);
      let _path = _forms.path;
      // console.log(_path);
      if (typeof _path !== 'undefined' && _path != null && _path.indexOf("http") === -1 && _path.indexOf("https") === -1) {
        _path = "/?r=" + (new Date()).getTime() + "/#" + _path + "?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(name);
        // console.log(_path);
      }
      // console.log(e.$attrs.subUrl);
      if (e.$attrs.subUrl) {
        let local = 'http://';
        if (window.location.href.indexOf('https:') !== -1) {
          local = 'https://';
        }
        _path = local + window.location.host + "/" + e.$attrs.subUrl + "/?r=" + (new Date()).getTime() + "/#" + _forms.path + "?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(name);
      }
      // console.log(_path);
      this.path = _path;
    },
    addTab(targetName, path) {
      let isExists = false;
      let tabs = this.editableTabs;
      // console.log(tabs);
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          isExists = true;
        }
      });
      if (isExists === false) {
        this.editableTabs.push({
          title: targetName,
          name: targetName,
          // path: _path,
          closable: false
        });
      }
      // this.editableTabsValue = targetName;
    },
    handleClick(target) {
      // console.log(target.name);
      let menus = kindo.cache.get(kindo.constant.USER_MENU, 'session');
      if (target.name === '首页') {
        // console.log(menus);
        // console.log(JSON.stringify(menus));
        store.dispatch('right/getRight', (menus || []), { root: true });
        this.path = "/?r=" + (new Date()).getTime() + "/#/mainPage?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(target.name);
        // let curSelf = $('#app iframe').attr('src');
        // if (curSelf.indexOf('/#/mainPage') !== -1) {
        //   this.path = "/?r=" + (new Date()).getTime() + "/#/mainPage?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(target.name);
        //   document.getElementById('newframe').contentWindow.location.reload(true);
        // } else {
        //   this.path = "/?r=" + (new Date()).getTime() + "/#/mainPage?primarycolor=" + this.userInfo.backgroundColor + "&page=" + encodeURI(target.name);
        // }
      } else {
        // this.dataTree = [];
        let menuitem = menus.filter(v => v.menuName === target.name && v.parentId === '0');
        let params = {
          children: menus || [],
          menuId: menuitem[0].menuId
        };
        store.dispatch('right/getMenuRight', params, { root: true });
        // this.menuTree.forEach((tab, index) => {
        //   if (tab.menuName === target.name) {
        //     this.editableTabsValue = tab.menuName;
        //     // tab.children.splice(tab.children.findIndex(item => item.pid === '0'), 1);
        //     // console.log(JSON.stringify(tab.children));
        //     store.dispatch('right/getMenuRight', (tab.children || []), { root: true });
        //   }
        // });
      }
    },
    // getJsonList(id) {
    //   let _this = this;
    //   _this.menuTree.forEach((item, i) => {
    //     if (item.parentId === id) {
    //       _this.dataTree.push(item);
    //       _this.getJsonList(item.menuId);
    //     }
    //   });
    // },
    createAuthRouter(mid) {
      const authRouter = [];
      // 根据权限列表, 递归生成菜单
      if (this.menuTree) {
        this.menuTree.forEach(menu => {
          if (menu.parentId === mid) {
            authRouter.push({
              id: menu.menuId,
              pid: menu.parentId,
              hidden: false,
              menuId: menu.menuId,
              menuName: menu.menuName,
              menuCode: menu.menuCode,
              menuUrl: menu.menuUrl,
              parentId: menu.parentId,
              state: menu.state,
              menuType: menu.menuType,
              children: this.createAuthRouter(menu.menuId)
            });
          }
        });
      }
      return authRouter;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    switchTheme() {
      let $el = $(this.$el);
      // let $left = $el.find(".el-layout-item.left");
      // $left.css("background-image", "url(/static/img/menuback.jpg)");
      let $left = $el.find(".userInfosimple");
      // add logo css
      $left.css("background", "url(/static/img/" + kindo.config.theme + "/logo.png) no-repeat 25px 20px");
      $left.css("background-size", "190px 40px");
      let $tab = $el.find(".el-tabs__header");
      $tab.css("background-image", "url(/static/img/" + kindo.config.theme + "/menuback4.jpg)");

      if (kindo.config.theme === 'blue') {
        this.userInfo.backgroundColor = '2b579a';
        this.menuLeftSize = 250;
        this.defautBg = 'blueDefautBg';
        this.elLliActiveColor = 'el_li_activeColor_blue';
      } else {
        this.userInfo.backgroundColor = 'D80C18';
        this.menuLeftSize = 310;
        this.defautBg = 'redDefautBg';
        this.elLliActiveColor = 'el_li_activeColor_red';
      }
    },
    getTabs() {
      let _this = this;
      this.menuTree = kindo.cache.get(kindo.constant.USER_MENU, 'session');
      this.dataTree = this.createAuthRouter('0');
      // console.log(JSON.stringify(this.dataTree));
      // 角色切换
      // if (kindo.config.theme !== 'blue') {
      //   this.rolesId = kindo.cache.get(kindo.constant.USER_ROLE, 'session');
      //   this.userRoles = kindo.cache.get(kindo.constant.USER_INFO, 'session');
      //   if (this.userRoles) {
      //     this.userRoles.forEach((item, index) => {
      //       _this.hideMenu.push({
      //         id: item.roleId,
      //         menuName: item.roleName,
      //         route: ''
      //       });
      //     });
      //   }
      // }
      if (this.dataTree) {
        if (this.dataTree.length > 0) {
          this.dataTree.forEach((tab, index) => {
            if (tab.state !== 0) {
              _this.addTab(tab.menuName, tab.menuCode);
            }
          });
        }
      }
    },
    logout() {
      kindo.util.confirm(this.source.language.commonLang.logoutConfirm, this.source.language.commonLang.tips, "warning", async () => {
        // 删除字典表数据后跳转
        kindo.cache.remove('dictInfo');
        kindo.cache.remove('dictItem');
        kindo.cache.remove(kindo.constant.USER_ROLE);
        kindo.cache.remove(kindo.constant.USER_INFO);
        kindo.cache.remove(kindo.constant.USER_MENU);
        // kindo.cache.remove(kindo.constant.USER_MENUTREE);
        kindo.cache.remove(kindo.constant.THEME);
        let loginUrl = process.env.SSO_BASE_URL;
        let IASID = process.env.IASID;
        let reqSsoToken = localStorage.getItem(kindo.constant.USER_TOKEN);
        let params = {
          IASID: IASID,
          reqSsoToken: reqSsoToken
        };
        this.$http.get(loginUrl + '/api/logout', params).then(res => {
          kindo.cache.remove(kindo.constant.USER_TOKEN);
          kindo.cache.remove('USER_DATA');
          localStorage.removeItem(kindo.constant.USER_TOKEN);
          let url = kindo.cache.get("LOGIN_URL");
          kindo.cache.remove("LOGIN_URL");
          if (url !== '/login') {
            // location.href = url;
            this.$router.push(url);
          } else {
            location.href = '/';
          }
          // window.top.location.href = '/#/login';
          if (kindo.util.checkuserAgent() === "IE") {
            window.top.location.reload();
          }
        });
      });
    }
  },
  watch: {
    // 利用watch方法检测路由变化：
    // '$route': function (to, from) {
    //   console.log(to.query.id);
    // }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs--border-card > .el-tabs__content {
  display: none !important;
}
.el-button.is-circle {
  padding: 0 12px !important;
}
.userImg {
  .el_span_userName {
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
  }
}
.hideMenu {
  position: absolute;
  top: 60px;
  right: 20px;
  .triangle_border_up {
    width: 0;
    height: 0;
    border-width: 0 15px 15px;
    border-style: solid;
    border-color: transparent transparent #fff; /*透明 透明 白色*/
    position: relative;
    left: 202px;
    top: 6px;
  }
  .el_div_hideMenue {
    position: relative;
    top: 10px;
    left: 10px;
    color: #000000;
    background-color: #ffffff;
    .blueDefautBg {
      background-color: #2b579a;
      color: #ffffff;
    }
    .redDefautBg {
      background-color: #d80c18;
      color: #ffffff;
    }
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        width: 240px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        cursor: pointer;
      }
      .el_li_activeColor_blue:hover {
        background-color: #2b579a;
        color: #ffffff;
      }
      .el_li_activeColor_red:hover {
        background-color: #d80c18;
        color: #ffffff;
      }
    }
  }
}
</style>
