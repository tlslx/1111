<template>
  <div>
    <!--用户授权-->
    <el-dialog :title="language.accredit" :close-on-click-modal="false" top="15px" :visible.sync="authorVisible" width="60%">
      <kindo-box>
        <el-form :model="authorizeForm" ref="authorizeForm" label-position="right" inline label-width="80px" @submit.native.prevent @keyup.enter.native="onQueryRoleName">
          <el-form-item :label="language.rolename">
            <el-input v-model="authorizeForm.roleName" class="inputclass" @blur="(ev)  =>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQueryRoleName">{{language.query}}</el-button>
            <!-- <el-button type="info" plain @click="onResetQuery">{{language.reset}}</el-button> -->
          </el-form-item>
        </el-form>
      </kindo-box>
      <!-- <el-form :model="child" size="small" ref="child" onsubmit="return false;" label-width="110px" inline>
        <el-form-item :label="language.rolename" prop="searchname">
          <el-autocomplete v-model="child.searchname" :fetch-suggestions="SearchAsyncName" placeholder="请输入名称进行查询" @select="(item)=>{handleSelect(item,'authorTable')}"></el-autocomplete>
        </el-form-item>
      </el-form> -->
      <el-row :gutter="20">
        <el-col :span="12">
          <kindo-table ref="authorTable" :pagination="false" :height="authorHeight" :fixed="false" :highlightCurrentRow="true" @current-change="nodeChange" :cell-style="isCenter">
            <el-table-column prop="roleName" :label="language.rolename" min-width="140" show-overflow-tooltip header-align="center"></el-table-column>
            <!-- <el-table-column prop="privileges" :label="language.hall" min-width="210" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-exphall-picker :multiple="true" :showcheckbox="true" :getchild="true" v-model="scope.row.privileges"></el-exphall-picker>
              </template>
            </el-table-column>
            <el-table-column :label="language.operation" min-width="140" align="center" header-align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-delete" :title="language.delete" @click="delRowClick(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column> -->
          </kindo-table>
        </el-col>
        <el-col :span="12">
          <div class="sysdict-data-tree">
            <el-tree ref="tree" :data="treedata" class="el-datagrid-picker-tree" auto-expand-parent :default-expand-all="true" :render-content="renderContent" highlightCurrent show-checkbox :props="defaultProps" node-key="id" :default-checked-keys="ckeys" @check-change="onTreeNodeClick"></el-tree>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="authorVisible = false">{{language.cancel}}</el-button>
        <el-button icon="el-icon-check" type="primary" @click="onSave()">{{language.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
export default {
  name: 'authordialog',
  mixins: [tableMixIn],
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
  data() {
    return {
      action: "",
      // 弹出框
      child: {
        searchname: ""
      },
      authorizeForm: {
        roleName: null,
        type: 3
      },
      source: {
      },
      iconCls: "glyphicon glyphicon-folder-close",
      treedata: [],
      ckeys: [],
      newTree: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      authorHeight: 350,
      selectData: [],
      authorVisible: false
    };
  },
  async created() {
    // this._child = Object.assign({}, this.child);
    this._authorizeForm = Object.assign({}, this.authorizeForm);
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getadd() {
      // this.child = Object.assign({}, this._child);
      this.authorizeForm = Object.assign({}, this._authorizeForm);
      this.selectData = [];
      this.newTree = [];
      this.$refs.authorTable.internalData = [];
      // let levelCode = this.$store.getters.userInfo.org.levelCode;
      this.$nextTick(function () {
        // let params = {
        //   levelCode: levelCode,
        //   type: 3
        // };
        // this.$http.get(this.api.getaudit, params).then(res => {
        //   this.$refs.authorTable.internalData = res.records;
        //   this.onTree();
        // });
        this.onQueryRoleName();
        this.onTree();
      });
    },
    onQueryRoleName() {
      this.$http.get(this.api.getaudit, this.authorizeForm).then(res => {
        this.$refs.authorTable.internalData = res.records;
      }).catch(_ => {
        return false;
      });
    },
    delRowClick(rowIndex, row) {
      kindo.util.confirm(this.language.common.deleteConfirm, this.language.common.tips, "warning", async () => {
        this.$refs.authorTable.internalData.splice(rowIndex, 1);
      });
    },
    // 点击下拉框
    handleSelect(item, table) {
      // 先检查是否重复
      if (this.$refs[table].internalData.length) {
        const inChecKeys = this.$refs[table].internalData.findIndex(
          temp => temp.roleName === item.value
        );
        if (inChecKeys !== -1) {
          kindo.util.alert(this.language.common.repeatedAddition, this.language.common.tips, "warning");
          return;
        }
      }
      let model = {
        roleName: item.value,
        roleId: item.code,
        privileges: []
      };
      this.selectData.push(model);
      this.$refs[table].internalData = this.selectData;
    },
    // 加载树菜单
    onTree() {
      let jsonData = {
        userId: "",
        type: "3"
      };
      this.$http
        .get(this.api.getTree, jsonData)
        .then(res => {
          if (res.records) {
            this.treedata = res.records;
            this.$refs.authorTable.setCurrentRowIndex(0);
          }
        });
    },
    // 勾选树菜单
    onTreeNodeClick(data, node, component) {
      let dictIds = data["id"];
      this.$refs.authorTable.internalData.map(temp => {
        if (this.selectData.roleId === temp.roleId) {
          if (node) {
            if (temp.privileges.indexOf(dictIds) === -1) {
              // console.log(dictIds);
              temp.privileges.push(dictIds);
            }
          } else if (node === false) {
            if (temp.privileges.length > 0) {
              // console.log(temp.privileges);
              let index = temp.privileges.indexOf(dictIds);
              // console.log(index);
              if (index > -1) {
                temp.privileges.splice(index, 1);
              }
            }
          }
        }
      });
      // if (!data.child) {
      // }
    },
    // 获取左边数据加载右边
    nodeChange(data) {
      if (data) {
        let getIds = data["privileges"];
        if (getIds) {
          this.selectData = data;
          this.ckeys = getIds;
          this.$refs.tree.setCheckedKeys(getIds);
        }
      }
      // this.model.orgaName = data.orgaName
      // this.model.orgaId = data.orgaCode
    },
    nodeIds(ids) {
      this.treedata.map(item => {
        if (item.child) {
          if (item.child.length === 1) {
            ids.map(temp => {
              if (temp === item.child[0].id) {
                this.newTree.push(item.id);
                this.newTree.push(item.child[0].id);
              }
            });
            // const inChecKeys = item.child.findIndex(
            //   temp => temp.id === id
            // );
            // if (inChecKeys !== -1) {
            //   this.newTree.push(item.id);
            //   this.newTree.push(item.child[0].id);
            // }
          }
        }
      });
    },
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
    },
    // 可远程模糊可手填input框(名称)
    // SearchAsyncName(queryString, callback) {
    //   if (queryString) {
    //     let params = {
    //       roleName: queryString
    //     };
    //     let param = {
    //       json: {
    //         customQueryParams: params,
    //         page: {
    //           current: 1,
    //           size: 10
    //         }
    //       }
    //     };
    //     this.$http.get(this.api.getcoms, param).then(res => {
    //       this.restaurants = res.records.map(item => { 
    //         return { value: item.roleName, code: item.roleId }; 
    //       }) || [];
    //       callback(this.restaurants);
    //     });
    //   } else {
    //     // callback(arr);
    //   }
    // },
    // 保存提交数据
    onSave() {
      if (!this.$refs.authorTable.internalData.length) {
        kindo.util.alert(this.language.common.increaseDepart, this.language.common.tips, "warning");
        return;
      }
      let jsonData = this.$refs.authorTable.internalData;
      // console.log(JSON.stringify(jsonData));
      this.$http.postJson(this.api.updatebase, jsonData).then(res => {
        this.authorVisible = false;
        this.$emit('reload');
        kindo.util.alert(this.language.common.successfully, this.language.common.tips, "success");
      });
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "add":
          return this.getadd();
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-table__body-wrapper {
  overflow-y: auto !important;
}
.sysdict-data-tree {
  width: 96%;
  border: 1px solid #ebeff5;
  padding: 2%;
  max-height: 590px;
  overflow: auto;
  margin-top: 0px;
}
</style>
