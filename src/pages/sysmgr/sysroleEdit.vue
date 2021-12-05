<template>
  <el-form
    :ref="name"
    :model="form"
    :data-url="api.datarl"
    :update-url="api.updateUrl"
    :add-url="api.addUrl"
    @reloadTable="reload"
    :before-submit="beforeSubmits"
  >
    <el-tabs v-model="activeTab">
      <el-row>
        <el-form-col
          :label="language.roleLang.name"
          prop="roleName"
          :required="true"
          trigger="blur"
          :max="10"
          :min="1"
          :span="12"
        >
          <el-input
            v-model="form.roleName"
            :disabled="isView"
          ></el-input>
        </el-form-col>
      </el-row>
      <el-row>
        <el-form-col
          :label="language.commonLang.remark"
          prop="remark"
          :span="12"
          :max="50"
        >
          <el-input
            type="textarea"
            v-model="form.remark"
            :disabled="isView"
          ></el-input>
        </el-form-col>
      </el-row>
      <el-row>
        <el-form-col
          :label="language.roleLang.menuPermission"
          :span="24"
          style="max-height:400px; overflow:auto;"
        >
          <el-tree-view
            ref="tree"
            :lazy="false"
            :data="menuData"
            class="el-datagrid-picker-tree"
            iconCls="glyphicon glyphicon-folder-close"
            highlightCurrent
            :url="api.orgUrl"
            :customParams="queryParams"
            :default-expand-keys="defaultExpandKeys"
            :default-checked-keys="defaultCheckedKeys"
            :custom-render-content="treeRenderContent"
            root-id="0"
            text-field="menuName"
            value-field="menuId"
            parent-field="parentId"
            :show-checkbox="true"
            :filter-node-method="filterNode"
          >
          </el-tree-view>
        </el-form-col>
      </el-row>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
export default {
  mixins: [dialogPageBase],
  data() {
    return {
      api: {
        baseUrl: kindo.config.api.upms,
        datarl: kindo.config.api.upms + "/api/sysRole/getSingleById",
        updateUrl: kindo.config.api.upms + "/api/sysRole/updateById",
        addUrl: kindo.config.api.upms + "/api/sysRole/add",
        orgUrl: kindo.config.api.upms + "/api/sysMenu/getListAllByUserId"
      },
      submitType: "json",
      activeTab: "baseInfo",
      language: {
        commonLang: {},
        roleLang: {}
      },
      form: {
        createDate: "",
        creatorId: "",
        creatorName: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        orderNo: "0",
        parentId: "",
        remark: "",
        roleId: "",
        roleLevel: "",
        roleName: "",
        roleType: "",
        state: "1",
        authList: [],
        parentAuthList: [],
        creatorDeptLevelCode: ""
      },
      carNoSelector: {},
      defaultExpandKeys: [],
      defaultCheckedKeys: [],
      menuData: [],
      isLoadedMenuTree: false,
      queryParam: {
        userId: ""
      },
      userSource: ""
    };
  },
  methods: {
    isDepartment() {
      let roles = this.$store.getters.userInfo.role;
      let role = kindo.config.departmentRoleId;
      let flag = false;
      roles.forEach((temp, index) => {
        if (temp.roleId === role) {
          flag = true;
          return;
        }
      });
      return flag;
    },
    fnAddUsers() {
      this.carNoSelector.dialogVisible = true;
    },
    genTreeData(list, rootId, idField, pIdField) {
      var _this = this;
      var nodes = [];
      var treeIdField = idField || "id";
      var treePidField = pIdField || "parentId";
      list.forEach(e => {
        var id = e[treeIdField];
        var parentId = e[treePidField];
        if (parentId === rootId) {
          e.disabled = _this.isView;
          nodes.push(e);
          e.children = this.genTreeData(list, id, treeIdField, pIdField);
        }
      });
      return nodes;
    },
    pageLoad() {
      let _this = this;
      if (_this.$store.getters.userInfo.source !== "2") {
        _this.loading = true;
        if (!_this.isLoadedMenuTree) {
          let queryParams = {
            CustomQueryParams: _this.queryParam
          };
          _this.$http.get(_this.api.orgUrl, { json: queryParams }).then(data => {
            _this.menuData = _this.genTreeData(data.records, "0", "menuId");
            try {
              // console.log(this.getChildren(["c9cfd303547747f3858f6b75a965e117", "2349b53c598a47968de3cdf10378640a", "5afdf083f2464d9f8c34de46911fc892", "53e9b6e590a2419ea25bfe9945dc4516"], _this.menuData));
              _this.form.authList = this.getChildren(_this.form.authList, _this.menuData);
              _this.$refs["tree"].setCheckedKeys(_this.form.authList);
            } catch (ex) {
              _this.$message.error(ex);
            }
            _this.loading = false;
          });
          _this.isLoadedMenuTree = true;
        } else {
          try {
            _this.$refs["tree"].setCheckedKeys(_this.form.authList);
          } catch (ex) {
            _this.$message.error(ex);
          }
        }
      } else {
        //如果当前登录用户时外部用户，菜单从当前用户信息中获取
        setTimeout(() => {
          _this.menuData = _this.genTreeData(_this.$store.getters.userInfo.menus, "0", "menuId");
          try {
            _this.form.authList = this.getChildren(_this.form.authList, _this.menuData);
            _this.$refs["tree"].setCheckedKeys(_this.form.authList);
          } catch (ex) {
            _this.$message.error(ex);
          }
          _this.loading = false;
        }, 100);
      }
    },
    getChildren(arr, data, menu = []) {
      if (typeof data === "object") {
        for (let i = 0; arr[i] !== undefined; i++) {
          for (let j = 0; data[j] !== undefined; j++) {
            if (arr[i] === data[j].menuId && data[j].children.length === 0) {
              menu.push(data[j].menuId);
            }
          }
        }
        for (let i = 0; data[i] !== undefined; i++) {
          this.getChildren(arr, data[i].children, menu);
        }
      }
      return menu;
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.menuName.indexOf(value) !== -1;
    },
    treeRenderContent(node, data, store) {
      if (data.menuType === "2" || data.menuType === "3") {
        node.isLeaf = true;
        return (
          <span class='el-tree-node__label'>
            <i class={"el-tree-node__label-icon"} />
            {data["menuName"]}
          </span>
        );
      } else {
        return (
          <span class='el-tree-node__label'>
            <i
              class={
                "el-tree-node__label-icon glyphicon glyphicon-folder-close"
              }
            />
            {data["menuName"]}
          </span>
        );
      }
    },
    beforeSubmits() {
      this.form.parentAuthList = this.$refs["tree"].getHalfCheckedKeys();
      this.form.authList = this.$refs["tree"].getCheckedKeys();
      return true;
    },
    reload() {
      this.$emit("isReloadData");
    }
  },
  computed: {
    queryParams() {
      // 查询参数只能放在Computed，不能放到mathods里面，不然会经常刷新列表
      return [this.queryParam];
    }
  },
  async created() {
    this.language.roleLang = await kindo.util.getLanguage('RoleLang');
    this.language.commonLang = await kindo.util.getLanguage('CommonLang');
    this.userSource = this.$store.getters.userInfo.source;
    if (this.userSource === "2") {
      this.form.creatorDeptLevelCode = this.$store.getters.userInfo.org.levelCode;
    } else {
      //内部用户创建角色归属根部门
      this.form.creatorDeptLevelCode = "0!";
    }
  },
  mounted() {

  }
};
</script>
<style>
.el-dialog {
  width: 800px;
}
</style>
