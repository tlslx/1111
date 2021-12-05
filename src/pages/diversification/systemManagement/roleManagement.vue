/**
* @file 角色权限信息
* @author:wanglifeng
* @date:2019/1/21
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="角色权限基本信息" name="first">
      <!--<el-form v-model="json" :inline="true" class="demo-ruleForm">-->
        <!--<el-form-item label="角色名称:" size="mini" prop="userName">-->
          <!--<el-input v-model="json.roleName" placeholder="请输入内容" maxlength="50"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item size="mini">-->
          <!--<el-button type="primary" @click="initSearch()">查询</el-button>-->
          <!--<el-button type="primary" @click="resetSearch()">重置</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-row class="btn-row">
        <el-button type="primary" @click="addRole">创建</el-button>
        <el-button type="primary" @click="handleDelete">删除</el-button>
        <!--<el-button type="primary" @click="dialogAwardSetting = true">奖项设置</el-button>-->
      </el-row>
      <template>
        <!-- @selection-change="handleSelection" -->
        <el-table :data="tableData" border @selection-change="handleSelection" style="width: 100%;">
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.state === 1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row, scope.index)" type="text" size="small">查看</el-button>
              <el-button @click="handleEdit(scope.row, scope.index)" type="text" size="small">修改</el-button>
              <el-button @click="rowDelete(scope.row, scope.index)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>


      <!--详细信息弹窗-->
      <el-dialog title="详细信息" :visible.sync="dialogProduct" class="formProduct" :close-on-click-modal="false" width="650px">
        <el-tabs v-show="isAdd === 'first'" v-model="dialogTab" @tab-click="handleClick">
          <el-tab-pane label="角色信息" name="first">
            <el-form :model="formProduct" :rules="rules" ref="formProduct" :disabled="isView">
              <el-form-item label="角色名称" prop="roleName" >
                <el-input v-model="formProduct.roleName" :disabled="isForbidden" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-select v-model="formProduct.state" placeholder="请选择">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formProduct.remark" type="textarea" maxlength="200"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="权限信息" name="second">
            <el-row>
              <el-col :span="6">权限配置</el-col>
              <el-col :span="16">
                <div class="item-right">
                  <el-tree-view
                    ref="tree"
                    :lazy="false"
                    :data="dataSec"
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
                    :filter-node-method="filterNode"
                    @check-change="handleCheckChange"
                  ></el-tree-view>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="用户信息" name="third">
            <el-row>
              <el-button type="primary" size="mini" @click="userPage" v-if="isView === false">添加</el-button>
              <el-button size="mini" @click="userDelete" v-if="isView === false">删除</el-button>
            </el-row>

            <el-table
              :data="dialogTableData"
              border
              style="width: 100%;margin-top: 10px;"
              @selection-change="delSelection"
            >
              <el-table-column type="selection" width="80"></el-table-column>
              <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
              <el-table-column prop="userType" label="用户类型" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.userType === '1'">评审专家</span>
                  <span v-else>工作人员</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center"></el-table-column>
              <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="userDelete(scope.row, scope.index)" type="text" :disabled="isView === true" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <div class="addBtn">
            <el-button type="primary" @click="handleAdd('formProduct')" v-if="isView === false">保存并关闭</el-button>
            <el-button type="primary" v-if="isView === false">保存</el-button>
            <el-button @click="dialogProduct = false">关闭</el-button>
          </div>
        </el-tabs>
        <!-- 添加用户列表 -->
        <el-tabs v-show="isAdd === 'second'">
          <el-form :inline="true" :model="searchForm" class="demo-ruleForm" ref="searchForm">
            <el-form-item label="姓名:" prop="userName">
              <el-input v-model="searchForm.userName" placeholder="请输入内容" class="searchParms"></el-input>
            </el-form-item>
            <el-form-item label="用户类型:"  prop="userType" >
              <el-select v-model="searchForm.userType" class="searchParms">
                <el-option
                 v-for="item in userTypeList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
                 ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="submitForm()">查询</el-button>
            </el-form-item>
            <el-form-item size="mini">
              <el-button type="primary"  @click="clearSearch('searchForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table
             ref="addUserList"
            :data="addUserList"
            border
            style="width: 100%;"
            @select="handleSelectionChange"
            @select-all="handleSelectAll"
          >
            <el-table-column type="selection" width="80" ></el-table-column>

            <el-table-column prop="account" label="账号" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="userType" label="用户类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.userType === '1'">评审专家</span>
                <span v-else>工作人员</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          </el-table>

          <div class="dialog-userList">
            <ul :key="index" v-for="(item,index) in userList" style="padding:0px">
              <li class="li_style">{{ item }}</li>
            </ul>
          </div>
          <div class="userPages">
          <div class="block">
            <el-pagination
              @size-change="userPageSizeChange"
              @current-change="userPageCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 20, 50, 100]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="userTotal"
              :small="true"
            ></el-pagination>
          </div>
          </div>
          <div class="dialog-footer">
            <el-button type="primary" @click="giveUserList">确 定</el-button>
            <el-button @click="handleReturn">取 消</el-button>
          </div>
        </el-tabs>
      </el-dialog>
    </el-tab-pane>
    <div class="block" style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "roleManagement",
  data() {
    return {
      currentPage: 1,
      total: 0,
      userTotal: 0,
      isView: false,
      ids: [],
      idsRow: [],
      delId: [],
      thirdList: [],
      isForbidden: false,
      userList: [],
      checkedList: [
        {
          checks: [],
          pages: ""
        }
      ],
      checkUser: [],
      dataSec: [],
      roleId: "",
      statusOptions: [
        {
          value: 0,
          label: "禁用"
        },
        {
          value: 1,
          label: "启用"
        }
      ],
      userTypeList: [
        {
          value: "0",
          label: "工作人员"
        },
        {
          value: "1",
          label: "评审专家"
        }
      ],
      searchForm: {
        userName: "",
        userType: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      activeName: "first",
      dialogTab: "first",
      isAdd: "first",
      selectAllList: [],
      dialogTableData: [],
      addUserList: [],
      tableData: [],
      mulSelection: [],
      ruleForm: {
        activeNo: "",
        multipleSelection: ""
      },
      dialogProduct: false, // 产品列表弹窗
      dialogAwardSetting: false, // 奖项设置弹窗
      formLabelWidth: "120px",
      formProduct: {
        roleName: "",
        remark: "",
        state: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { max: 50, message: "超过长度限制（50）", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
              let space = /\s+/g;
              if (regRule.test(value) || space.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }
            },
            trigger: "blur"
          }
        ],
        state: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        remark: [{ max: 250, message: "超过长度限制（250）", trigger: "blur" }]
      },
      formAward: {
        name: "",
        region: ""
      },
      json: {
        OrderModelField: [
          {
            OrderByField: "",
            asc: false
          }
        ],
        CustomQueryParams: [],
        // roleName: '',
        PageIndex: 1,
        PageSize: 10
      },
      userPageparam: {
        OrderModelField: [
          {
            OrderByField: "",
            asc: false
          }
        ],
        CustomQueryParams: [
          {
            Name: "state",
            FindType: "EQ",
            Values: ["1"]
          }
        ],
        PageIndex: 1,
        PageSize: 5
      },
      newDate: [],
      updateDate: [],
      isLoadedMenuTree: false,
      authList: [],
      defaultExpandKeys: [],
      defaultCheckedKeys: [],
      orgUrl: "/api/sysMenu/getListAll",
      menuId: [],
      newMenuId: [],
      parentId: [],
      baseApi: process.env.API_BASE_URL
    };
  },
  computed: {
    ...mapGetters("roleManagement", ["getRole"]), // 角色列表查询
    ...mapGetters("roleManagement", ["delRole"]), // 角色删除
    ...mapGetters("roleManagement", ["getRoleSave"]), // 角色创建
    ...mapGetters("roleManagement", ["getUserList"]), // 查询用户
    ...mapGetters("roleManagement", ["getUserPage"]), // 新增用户列表
    ...mapGetters("roleManagement", ["getSingle"]), // 修改列表 赋值
    ...mapGetters("roleManagement", ["getListAll"]), // 权限列表
    ...mapGetters("roleManagement", ["updateById"]) // 角色修改
    // tableData() {
    //   return {
    //     data: this.data
    //   };
    // }
  },
  created() {
    let _this = this;
    // 角色列表查询
    this.getRoleList(this.json).then(res => {
      _this.tableData = res.records;
      _this.total = res.total;
    });
  },
  watch: {
    newDate(val, oldVal) {
      this.dialogTableData = val;
    },
    newMenuId(val, oldVal) {
      this.menuId = val;
    }
    // formProduct: {
    //   handler: function(obj) {
    //     if (this.formProduct.roleName.length > 50) {
    //       this.isForbidden = true;
    //     } else {
    //       this.isForbidden = false;
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {
    ...mapActions("roleManagement", ["getRoleList"]), // 角色列表查询
    ...mapActions("roleManagement", ["delRoleInfo"]), // 角色删除
    ...mapActions("roleManagement", ["getroleSaveInfo"]), // 角色创建
    ...mapActions("roleManagement", ["getUserListInfo"]), // 查询用户
    ...mapActions("roleManagement", ["getListPageInfo"]), // 新增用户列表
    ...mapActions("roleManagement", ["getSingleByIdInfo"]), // 修改列表 赋值
    ...mapActions("roleManagement", ["getListAllInfo"]), // 权限列表
    ...mapActions("roleManagement", ["updateByIdInfo"]), // 角色修改
    initSearch() {
      this.json.PageIndex = 1;
      this.getRoleList(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
      // this.$http.get(this.baseApi + '/api/sysRole/getListPage', this.json).then(res => {
      //   this.tableData = res.records;
      //   this.total = res.total;
      // }).catch(error => {
      //   this.$message.error(error);
      // });
    },
    resetSearch() {
      this.json.roleName = '';
    },
    // 角色修改
    handleEdit(row, index) {
      this.isAdd = "first";
      this.dialogTab = "first";
      this.isView = false;
      if (this.isLoadedMenuTree === false) {
        this.$http.get("/api/sysMenu/getListAll").then(data => {
          this.dataSec = this.genTreeData(data.records, "0", "menuId");
          this.isLoadedMenuTree = true;
        });
      }
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([]);
        this.defaultExpandKeys = [];
      }
      let param = {
        OrderModelField: [
          {
            OrderByField: "",
            asc: false
          }
        ],
        CustomQueryParams: [
          {
            Name: "roleId",
            FindType: "EQ",
            Values: [row.roleId]
          }
        ]
      };

      this.getSingleByIdInfo(param).then(res => {
        this.dialogTableData = res.records;
      });
      this.getListAllInfo(row.roleId).then(res => {
        if (res.authList.length > 0) {
          this.defaultCheckedKeys = res.authList;
        }
      });
      this.formProduct.roleName = row.roleName;
      this.formProduct.remark = row.remark;
      this.formProduct.state = row.state;
      this.roleId = row.roleId;
      this.newMenuId = JSON.parse(JSON.stringify(this.defaultCheckedKeys));
      this.updateDate = [];
      this.dialogProduct = true;
    },
    // 查看
    handleView(row, index) {
      if (this.$refs.formProduct !== undefined) {
        this.$refs.formProduct.resetFields();
      }
      this.handleEdit(row, index);
      this.isView = true;
    },
    // 给用户列表赋值
    giveUserList() {
      this.newDate = JSON.parse(JSON.stringify(this.dialogTableData));
      for (let i = 0; i < this.thirdList.length; i++) {
        this.newDate.push(this.thirdList[i]);
        this.updateDate.push(this.thirdList[i]);
      }
      for (let i = 0; i < this.updateDate.length; i++) {
        if (this.updateDate[i].operType) {
          this.updateDate[i].operType = "ADD";
        }
      }
      this.isAdd = "first";
      this.dialogTab = "third";
      // this.splitSame(this.newDate);
    },
    // 数组去重
    // splitSame(arr) {
    //   debugger;
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = i + 1; j < arr.length; j++) {
    //       if (arr[i] === arr[j]) {
    //         arr.splice(j, 1);
    //         arr.length--;
    //         j--;
    //       }
    //     }
    //   }
    //   return arr;

    // },
    // 用户新增时 勾选框变化触发事件
    handleSelectionChange(selection, row) {
        // 本地又数据的情况下
        // 勾选框确认
      if (selection.length > 0 && selection.indexOf(row) !== -1) {
        this.checkUser.push(row.userId);
        let checkArr = this.checkUser;
        localStorage.setItem("checkUser", JSON.stringify(checkArr));
        this.userList.push(row.userName);
        this.thirdList.push(row);
      } else {
        // 勾选框取消
        let contrastdata = JSON.parse(localStorage.getItem('checkUser')); // 数组化后的值
        contrastdata.splice(contrastdata.indexOf(row.userId), 1);
        this.userList.splice(this.userList.indexOf(row), 1);
        this.thirdList.splice(this.thirdList.indexOf(row), 1);
        this.checkUser = contrastdata;
        localStorage.setItem("checkUser", JSON.stringify(contrastdata));
      }
    },
    // 用户新增时 勾选框全选
    handleSelectAll(selection) {
      for (let indexs in selection) {
        this.selectAllList.push(selection[indexs]);
      }
      if (this.thirdList.length > 0) {
        for (let third in this.thirdList) {
          for (let sel in selection) {
            if (selection[sel] === this.thirdList[third]) {
              this.thirdList.splice(this.thirdList.indexOf(this.thirdList[third]), 1);
              this.userList.splice(this.userList.indexOf(this.thirdList[third]), 1);
            }
          }
        }
      }

      // 全选确认
      for (let items in selection) {
        if (selection.length > 0 && selection.indexOf(selection[items]) !== -1) {

          this.checkUser.push(selection[items].userId);
          let checkArr = this.checkUser;
          localStorage.setItem("checkUser", JSON.stringify(checkArr));
          this.userList.push(selection[items].userName);
          this.thirdList.push(selection[items]);
        }
      }
      if (selection.length === 0) {
        // 全选取消
        let arr = this.selectAllList;
        for (let itemsT in arr) {
          let contrastdata = JSON.parse(localStorage.getItem('checkUser')); // 数组化后的值
          contrastdata.splice(contrastdata.indexOf(arr[itemsT].userId), 1);
          this.userList.splice(this.userList.indexOf(arr[itemsT]), 1);
          this.thirdList.splice(this.thirdList.indexOf(arr[itemsT]), 1);
          this.checkUser = contrastdata;
          localStorage.setItem("checkUser", JSON.stringify(contrastdata));
        }
        this.selectAllList = [];
      }
    },
    // 新增用户 列表取消
    handleReturn() {
      this.isAdd = "first";
      this.dialogTab = "third";
    },
    // 新增用户 列表
    userPage() {
      this.getListPageInfo(this.userPageparam).then(res => {
        this.addUserList = res.records;
        this.userTotal = res.total;
        let nullList = [];
        this.userList = [];
        this.checkUser = [];
        this.thirdList = [];
        localStorage.setItem("checkUser", JSON.stringify(nullList));
        this.isAdd = "second";
      });
    },
    // 创建
    addRole() {
      this.isView = false;
      this.formProduct = {
        roleName: "",
        remark: "",
        state: ""
      };
      this.roleId = "";
      this.addUserList = [];
      this.menuId = [];
      this.newMenuId = [];
      this.parentId = [];
      let _this = this;
      this.isAdd = "first";
      this.dialogTab = "first";
      let param = {
        OrderModelField: [{ OrderByField: "", asc: false }],
        CustomQueryParams: [{ Name: "roleId", FindType: "EQ", Values: [null] }]
      };
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([]);
        this.defaultExpandKeys = [];
      }
      this.getUserListInfo(param).then(res => {
        _this.dialogTableData = res.records;
      });
      if (this.isLoadedMenuTree === false) {
        this.$http.get("/api/sysMenu/getListAll").then(data => {
          this.dataSec = this.genTreeData(data.records, "0", "menuId");
          this.isLoadedMenuTree = true;
        });
      }
      this.dialogProduct = true;
    },
    // 角色删除
    handleDelete() {
      let _this = this;
      if (_this.ids.length === 0) {
        this.$message({
          type: "info",
          message: "请至少选择一个角色信息"
        });
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          _this.delRoleInfo(_this.ids).then(res => {
            location.reload();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }
    },
    // 行内删除
    rowDelete(scope, prop) {
      this.idsRow.push(scope.roleId);
      let _this = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.delRoleInfo(_this.idsRow).then(res => {
            location.reload();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 用户列表删除
    userDelete(row, index) {
      let arr = [];
      let arrs = [];
      // this.delDate = JSON.parse(JSON.stringify(this.dialogTableData));
      // arrs = this.delDate;
      arrs = this.dialogTableData;
      arr = this.delId;
      let _this = this;
      if (!row) {
        if (arr.length === 0) {
          this.$message({
            type: "info",
            message: "请至少选择一个角色信息"
          });
        } else {
          this.$confirm("确认删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              if (arr.length >= 1) {
                for (let i = 0; i < arr.length; i++) {
                  for (let j = 0; j < arrs.length; j++) {
                    if (arr[i] === arrs[j]) {
                      arrs.splice(j, 1);
                      _this.updateDate.push(arr[i]);
                      for (let k = 0; k < _this.updateDate.length; k++) {
                        _this.updateDate[k].operType = "DEL";
                      }
                      break;
                    }
                  }
                }
              } else {
                for (let m = 0; m < arrs.length; m++) {
                  if (row === arrs[m]) {
                    arrs.splice(m, 1);
                    _this.updateDate.push(row);
                    for (let i = 0; i < _this.updateDate.length; i++) {
                      _this.updateDate[i].operType = "DEL";
                    }
                    break;
                  }
                }
              }
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(() => {
            });
        }
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (arr.length >= 1) {
              for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arrs.length; j++) {
                  if (arr[i] === arrs[j]) {
                    arrs.splice(j, 1);
                    _this.updateDate.push(arr[i]);
                    for (let k = 0; k < _this.updateDate.length; k++) {
                      _this.updateDate[k].operType = "DEL";
                    }
                    break;
                  }
                }
              }
            } else {
              for (let m = 0; m < arrs.length; m++) {
                if (row === arrs[m]) {
                  arrs.splice(m, 1);
                  _this.updateDate.push(row);
                  for (let i = 0; i < _this.updateDate.length; i++) {
                    _this.updateDate[i].operType = "DEL";
                  }
                  break;
                }
              }
            }
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
          });
      }
    },
    delSelection(selection, row) {
      let arrs = [];
      for (let i = 0; i < selection.length; i++) {
        arrs.push(selection[i]);
      }
      this.delId = arrs;
    },
    // 重置搜索框
    clearSearch(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询
    submitForm() {
      let param = {
        OrderModelField: [
          {
            OrderByField: "",
            asc: false
          }
        ],
        CustomQueryParams: [
          {
            FindType: "EQ",
            Name: "workDeptId",
            Values: ["4594a42e12394c31b9e1ce4945dc8f7c"]
          },
          {
            Name: "state",
            FindType: "EQ",
            Values: ["1"]
          },
          {
            Name: "userType",
            FindType: "LIKE",
            Values: [this.searchForm.userType.replace(/\s*/g, "")]
          },
          {
            Name: "userName",
            FindType: "LIKE",
            Values: [this.searchForm.userName.replace(/\s*/g, "")]
          }
        ],
        PageIndex: 1,
        PageSize: 5
      };
      this.getListPageInfo(param).then(res => {
        this.addUserList = res.records;
        this.userTotal = res.total;
        this.isAdd = "second";
      });

    },
    // 新增
    handleAdd(formName) {
      this.isView = false;
      let _this = this;
      this.newDate = JSON.parse(JSON.stringify(this.dialogTableData));
      for (let i = 0; i < this.newDate.length; i++) {
        this.newDate[i].operType = "ADD";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let parmary = {
            baseInfo: {
              roleName: this.formProduct.roleName,
              remark: this.formProduct.remark,
              state: this.formProduct.state,
              roleId: this.roleId,
              roleType: "0",
              systemId: "663689e547834dbaa8e449ffdc864e87",
              orderNo: "0",
              authList: this.newMenuId,
              parentAuthList: this.parentId
            },
            subTables: this.newDate,
            subTableNames: ["SysUserRole"],
            subTableLength: 1
          };
          if (this.roleId === "") {
            this.getroleSaveInfo(parmary).then(res => {
              this.dialogProduct = false;
              this.getRoleList(_this.json).then(res2 => {
                _this.tableData = res2.records;
              });
              this.$message({
                type: "success",
                message: "创建成功"
              });
            }).catch(e => {
              _this.$message.error(e);
              return false;
            });
          } else {
            parmary.subTables = _this.updateDate;
            this.updateByIdInfo(parmary).then(res => {
              this.dialogProduct = false;
              this.getRoleList(_this.json).then(res2 => {
                _this.tableData = res2.records;
              });
              this.$message({
                type: "success",
                message: "修改成功"
              });
            }).catch(e => {
              _this.$message.error(e);
              return false;
            });
          }
        } else {
          return false;
        }
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      let selectionIds = [];
      selection.forEach(item => {
        selectionIds.push(item.roleId);
      });
      this.ids = selectionIds;
    },
    handleClick() {},
    handleSizeChange(val) {
      let _this = this;
      this.json.PageSize = val;
      // 角色列表查询
      this.getRoleList(this.json).then(res => {
        _this.tableData = res.records;
        _this.total = res.total;
      });
    },
    // 用户新增列表 分页改变
    userPageSizeChange(val) {
      this.userPageparam.PageSize = val;
      this.getListPageInfo(this.userPageparam).then(res => {
        this.addUserList = res.records;
        this.userTotal = res.total;
      });
    },
    handleCurrentChange(val) {
      let _this = this;
      this.json.PageIndex = val;
      // 角色列表查询
      this.getRoleList(this.json).then(res => {
        _this.tableData = res.records;
        _this.total = res.total;
      });
    },
    // 用户新增列表查询 分页
    userPageCurrentChange(val) {
      this.userPageparam.PageIndex = val;
      this.getListPageInfo(this.userPageparam).then(res => {
        this.addUserList = res.records;
        this.userTotal = res.total;
        this.$nextTick(() => {
          this.getCheckData();
        });
      });
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
    // 获取打勾数据
    getCheckData() {
      let localCheckData = JSON.parse(localStorage.getItem("checkUser") || '[]');
      // let checkData = [];
      let selectData = [];
      this.addUserList.filter((data, index) => {
        if (localCheckData.includes(data.userId)) {
          selectData.push(this.addUserList[index]);

        }
      });
      this.toggleSelection(selectData);
    },
    toggleSelection(rows) {
      if (rows) {
        for (let item of rows) {
          this.$refs.addUserList.toggleRowSelection(item);
        }
      } else {
        this.$refs.addUserList.clearSelection();
      }
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
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.menuName.indexOf(value) !== -1;
    },
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.newMenuId.push(data.menuId);
      } else {
        this.newMenuId.splice($.inArray(data.menuId, this.newMenuId), 1);
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 30px;
}
.btn-row {
  margin: 10px;
}
.dialog-footer {
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.addBtn {
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
  float: right;
}
.dialog-userList {
  padding-bottom: 10px;
  height: 32px;
}
.li_style {
  float: left;
  list-style: none;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 10px;
  margin-right: 5px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
}
.userPages {
  text-align: right;
  margin-right: 30px;
}
.searchParms {
  height: 40px;
  width: 120px;
}
.formProduct .el-tabs_nav-wrap .el-tabs_nav-scroll {
  width: 100%;
}

</style>
