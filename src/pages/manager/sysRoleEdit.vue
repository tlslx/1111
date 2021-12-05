<template>
  <el-form :ref="name" :model="form" :sub-data="subData" 
    data-url="/api/sysRole/getSingleById"
    update-url="/api/sysRole/updateById" 
    add-url="/api/sysRole/add" 
    :before-submit="beforeSubmits">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="角色名称：" prop="roleName" :span="24">
            <el-input v-model="form.roleName" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="角色类型" prop="roleType" :span="24">
            <el-dropdown-list v-model="form.roleType" :disabled="isView"
              data-dictionary="roleType"></el-dropdown-list>
          </el-form-col> -->
          <el-form-col label="所属系统：" prop="systemId" :span="24">
            <el-dropdown-list v-model="form.systemId" 
              url="/api/sysSystemInfo/getListAll"
              text-field="systemName" value-field="systemId"
              :params="{OrderModelField: [{OrderByField: 'orderNo',asc: true}]}"
              :allow-create="false" 
              :filterable="true"
              :clearable="true" 
              :disabled="isView">
            </el-dropdown-list>
            <!-- <el-dropdown-list v-model="form.systemId" :disabled="isView"></el-dropdown-list> -->
          </el-form-col>
          <!-- <el-form-col label="上级：" prop="parentId" :span="24">
            <el-input v-model="form.parentId" :disabled="isView"></el-input>
          </el-form-col> -->
          <el-form-col label="状态：" prop="state" :span="12">
            <el-dropdown-list v-model="form.state" :disabled="isView" 
              data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="排序：" prop="orderNo" :span="12">
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="24">
            <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="权限信息" name="authInfo">
        <el-row>
          <el-form-col label="菜单权限：" :span="24" style="max-height:400px; overflow:auto;">
            <!-- <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input> -->
            <el-tree-view ref="tree" 
              :lazy="false"
              :data="menuData"
              class="el-datagrid-picker-tree"
              iconCls="glyphicon glyphicon-folder-close" 
              highlightCurrent 
              :url="orgUrl" 
              :default-expand-keys="defaultExpandKeys"
              :default-checked-keys="defaultCheckedKeys"
              :custom-render-content="treeRenderContent"
              root-id="0" 
              text-field="menuName" 
              value-field="menuId" 
              parent-field="parentId" 
              :show-checkbox="true" 
              :filter-node-method="filterNode">
            </el-tree-view>
          </el-form-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色用户信息" name="roleUsers">
        <el-button type="primary" @click="fnAddUsers">增加</el-button>
        <br />
        <el-datagrid ref="detailtable" :height="300" 
          style="margin-bottom:12px;" 
          v-model="subData[0].data" 
          row-key="userRoleId"
          data-url="/api/sysUserRole/getListPage" 
          :query-params="queryParams"
          :default-row-data="subData[0].defaultRowData"
          :editable="!isView"
          :addable="false"
          :show-checkbox="false">
          <el-table-column prop="userName" label="用户名称" width="180" sortable="custom">
          </el-table-column>
          <el-table-column prop="positionType" label="职位类型" width="200" sortable="custom">
          </el-table-column>
          <el-table-column prop="job" label="职别" width="200" sortable="custom">
          </el-table-column>
        </el-datagrid>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
import Vue from "@/scripts/framework/config";
export default {
  mixins: [dialogPageBase],
  data() {
    return {
      submitType: "json",
      activeTab: "baseInfo",
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
        systemId: "",
        authList: [],
        parentAuthList: []
      },
      subData: [
        {
          name: "SysUserRole",
          data: [],
          defaultRowData: {}
        }
      ],
      carNoSelector: {},
      orgUrl: "/api/sysMenu/getListAll",
      defaultExpandKeys: [],
      defaultCheckedKeys: [],
      filterText: "",
      menuData: [],
      isLoadedMenuTree: false
    };
  },
  watch: {
    filterText(val) {
      // this.$refs["tree"].filter(val);
    }
  },
  methods: {
    fnAddUsers() {
      this.carNoSelector.dialogVisible = true;
    },
    genTreeData(list, rootId, idField, pIdField) {
      let _idField = idField;
      let _pIdField = pIdField;
      _idField = _idField || "id";
      _pIdField = _pIdField || "parentId";
      let nodes = [];
      list.forEach(e => {
        var id = e[_idField];
        var parentId = e[_pIdField];
        if (parentId === rootId) {
          nodes.push(e);
          e.children = this.genTreeData(list, id, _idField, _pIdField);
        }
      });
      return nodes;
    },
    pageLoad() {
      if (this.isLoadedMenuTree === false) {
        this.$http.get("/api/sysMenu/getListAll").then(data => {
          this.menuData = this.genTreeData(data.records, "0", "menuId");
          try {
            this.$refs["tree"].setCheckedKeys(this.form.authList);
          } catch (ex) {
            return;
          }
          this.isLoadedMenuTree = true;
        });
      } else {
        try {
          this.$refs["tree"].setCheckedKeys(this.form.authList);
        } catch (ex) {
          return;
        }
      }
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.menuName.indexOf(value) !== -1;
    },
    treeRenderContent(node, data, store) {
      // console.info(node);
      if (data.menuType === "2" || data.menuType === "3") {
        node.isLeaf = true;
        return (
          <span class='el-tree-node__label'>
            <i class={"el-tree-node__label-icon"} />
            {data["menuName"]}
          </span>
        );
      } else {
        // node.disabled = true;
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
    onSelectionChange(selection) {
      let rows = this.$refs["detailtable"].getRows();
      var existsList = [];
      selection.forEach(row => {
        var isExists = false;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].userId === row.userId) {
            existsList.push(row.userName);
            isExists = true;
            continue;
          }
        }
        if (isExists === false) {
          let newRow = {};
          newRow.userId = row.userId;
          newRow.userName = row.userName;
          newRow.roleId = this.form.roleId;
          newRow.workDeptName = row.workDeptName;
          newRow.positionType = row.positionType;
          newRow.position = row.position;
          newRow.job = row.job;
          this.$refs["detailtable"].addRowData(row, "normal");
        }
      });
      if (existsList.length > 0) {
        this.$message.warning("已存在用户，无需重新添加：" + existsList.join());
      }
    }
  },
  computed: {
    queryParams() {
      // 查询参数只能放在Computed，不能放到mathods里面，不然会经常刷新列表
      return [{ Name: "roleId", FindType: "EQ", Values: [this.params.id] }];
    }
  },
  mounted() {
    let DatagridSelector = Vue.component("ElDatagridSelector");
    this.carNoSelector = new DatagridSelector({
      propsData: {
        url: "/api/sysUser/getListPage",
        valueField: "userId",
        textField: "userName",
        multiple: true,
        defaultQueryParams: [{ Name: "state", FindType: "EQ", Values: ["1"] }],
        columns: [
          {
            field: "workDeptName",
            title: "所在部门",
            width: "200",
            sortable: true
          },
          {
            field: "userName",
            title: "用户姓名",
            width: "200",
            sortable: true
          },
          {
            field: "job",
            title: "职位",
            width: "120",
            sortable: true
          },
          {
            field: "positionType",
            title: "职位类型",
            width: "120",
            sortable: true
          }
        ],
        dialogTitle: "用户信息选择"
      }
    }).$mount();
    document
      .getElementsByClassName("el-page")[0]
      .appendChild(this.carNoSelector.$el);
    this.carNoSelector.$on("selection-change", this.onSelectionChange);
  }
};
</script>
<style>
.el-dialog{
  width: 800px;
}
</style>
