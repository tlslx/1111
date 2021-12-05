<template>
  <el-container>
     <el-dialog :title="language.authorization" :visible.sync="authorizeVisible" :close-on-click-modal="false" :close-on-press-escape="false">
        <kindo-box>
          <el-form :model="authorizeForm" ref="authorizeForm" label-position="right" inline label-width="80px"
          @submit.native.prevent @keyup.enter.native="onQueryRoleName">
            <el-form-item :label="language.rolename">
              <el-input v-model="authorizeForm.roleName" class="inputclass" @blur="(ev)  =>ev.target.value = ev.target.value.trim()"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQueryRoleName">{{language.query}}</el-button>
            <!-- <el-button type="info" plain @click="onResetQuery">{{language.reset}}</el-button> -->
          </el-form-item>
        </el-form>
        </kindo-box>
        
        <el-row :gutter="20">
        <el-col :span="12">
          <kindo-table ref="authorizeTable" :pagination="false" :height="authorHeight" :fixed="false" :highlightCurrentRow="true" @current-change="nodeChange">
            <el-table-column prop="roleName" :label="language.rolename" min-width="140" show-overflow-tooltip header-align="center"></el-table-column>
          </kindo-table>
        </el-col>
        <el-col :span="12">
          <div class="sysdict-data-tree">
            <el-tree ref="tree" :data="treedata" class="el-datagrid-picker-tree" auto-expand-parent :default-expand-all="true" :render-content="renderContent" highlightCurrent show-checkbox :props="defaultProps" node-key="id" :default-checked-keys="ckeys" @check-change="onTreeNodeClick"></el-tree>
          </div> 
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorizeVisible = false">{{language.cancel}}</el-button>
        <el-button type="primary" @click="onSubmit()">{{language.confirm}}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import common from '@/components/project/mixins/common';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'authorizeDialog',
  mixins: [common, listPageBase],
  data() {
    return {
      authorizeVisible: false,
      isEmpypData: false,
      iconCls: "glyphicon glyphicon-folder-close",
      treedata: [],
      ckeys: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      authorizeForm: {   
        roleName: null,
        type: 2 
      },
      authorHeight: 350,
      selectData: [],
      action: ''
    };
  },
  props: {
    api: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  async created () {
    this._authorizeForm = Object.assign({}, this.authorizeForm);
  },
  methods: {
    // 获取表格数据
    getAuthorize() {
      this.authorizeForm = Object.assign({}, this._authorizeForm);
      this.$nextTick(function () {
        this.selectData = [];
        this.$refs.authorizeTable.internalData = [];
        // let levelCode = this.$store.getters.userInfo.org.levelCode;
        // this.$http.get(this.api.getAuth, this.authorizeForm).then(res => {
        //   this.$refs.authorizeTable.internalData = res.records;
        // });
        this.onQueryRoleName();
        this.onTree();
      });
    },
    onQueryRoleName() {
      this.$http.get(this.api.getAuth, this.authorizeForm).then(res => {
        this.$refs.authorizeTable.internalData = res.records;
      }).catch(_ => {
        return false;
      });
    },
     // 加载树菜单
    onTree() {
      let jsonData = {
        userId: "",
        type: "2"
      };
      this.$http
      .get(this.api.getTree, jsonData)
      .then(res => {
        if (res.records) {
          this.treedata = res.records;
          this.$refs.authorizeTable.setCurrentRowIndex(0);
        }
      });
    },
      // 勾选树菜单
    onTreeNodeClick(data, node, component) {
      let dictIds = data["id"];
      this.$refs.authorizeTable.internalData.map(temp => {
        if (this.selectData.roleId === temp.roleId) {
          if (node) {
            if (temp.privileges.indexOf(dictIds) === -1) {
              temp.privileges.push(dictIds);
            }
          } else if (node === false) {
            if (temp.privileges.length > 0) {
              let index = temp.privileges.indexOf(dictIds);
              if (index > -1) {
                temp.privileges.splice(index, 1); 
              }
            }
          }
        }
      });
    },
      // 获取左边数据加载右边
    nodeChange(data) {
      this.isEmpypData = false;
      if (data) {
        let getIds = data["privileges"];
        this.isEmpypData = true;
        if (getIds) {
          this.selectData = data;
          this.ckeys = getIds;
          this.$refs.tree.setCheckedKeys(getIds);
        }
      }
    },
    // 提交
    onSubmit() {
      if (!this.isEmpypData) {
        this.$message({
          type: 'warning',
          message: '请选择角色名称'
        });
        return;
      }
      if (!this.$refs.authorizeTable.internalData.length) {
        kindo.util.alert(this.language.increaseRoleName, this.language.tips, "warning");
        return;
      }
      let jsonData = this.$refs.authorizeTable.internalData;
      this.$http.postJson(this.api.updateTemplate, jsonData).then(res => {
        this.authorizeVisible = false;
        this.$emit('reload');
        kindo.util.alert(this.language.dataSavedSuccessfully, "success");
      });
    },
    // 树节点的内容区的渲染
    renderContent(h, { node, data, store }) {
      if (!String.isNullOrEmpty(this.iconCls)) {
        return (
          <span class='el-tree-node__label'>
            <i class={"el-tree-node__label-icon " + this.iconCls} />
            {data["label"]}
          </span>
        );
      } else {
        return (
          <span class='el-tree-node__label'>{data["label"]}</span>
        );
      }
    }
  },
  watch: {
    // authorizeVisible(val, oldVal) {
    //   if (val === true) {
    //     this.getAuthorize();
    //   }
    // }
    "action"(value) {
      switch (value) {
        case "authorize":
          return this.getAuthorize();
        default:
          return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

