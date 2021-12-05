/**
* @file 用户管理
* @author:wanglifeng
* @date:2019/1/21
*/
<template>

  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" ref="ruleForm">
        <el-form-item label="账号:" size="mini" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入内容" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" size="mini" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入内容" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:" size="mini" prop="userType">
          <el-select v-model="ruleForm.userType" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="评审专家" value="0"></el-option>
            <el-option label="工作人员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="clearSearch('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row class="btn-row">
        <el-button type="primary" @click="locationAdd">新增</el-button>
        <el-button type="primary" @click="giveProCat" :disabled="isDisable">分配大类</el-button>
        <el-button type="primary" @click="handleDelete">删除</el-button>
      </el-row>
      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          border
          style="width: 100%;"
          @select="handleSelection"
          >
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="userType"
            label="用户类型"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.userType==1">工作人员</span>
              <span v-else>评审专家</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="开始时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="结束时间"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="200px"
            >
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row, scope.index)" type="text" size="small">修改</el-button>
              <el-button @click="rowDelete(scope.row, scope.index)" type="text" size="small">删除</el-button>
              <el-button @click="handleReset(scope.row, scope.index)" type="text" size="small">重置密码</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
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
      </template>

      <!--新增产品大类弹窗-->
      <el-dialog title="新增产品大类" :visible.sync="dialogProduct" class="formProduct" :close-on-click-modal="false">
        <el-form :model="formProduct">
          <el-form-item label="大类名称">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="初评通过率">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="初评投票上限">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="初评投票下限">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终评通过率">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终评投票上限">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终评投票下限">
            <el-input v-model="formProduct.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogProduct = false">确 定</el-button>
          <el-button @click="dialogProduct = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--分配大类弹窗-->
      <el-dialog title="分配大类" :visible.sync="distributionClass" :close-on-click-modal="false">
        <el-form :inline="true" :model="formAward" style="margin-bottom: 30px;">
          <el-checkbox-group v-model="formAward.checkboxGroup" style="margin-left: 10px;">
            <el-checkbox
            v-for="category in categories"
            :label="category"
            :key="category.id"
            >
            {{category.name}}
            </el-checkbox>
          </el-checkbox-group>
          <div class="dialog-userList">
            <ul :key="index" v-for="(item,index) in formAward.checkboxGroup" style="padding:0px">
              <li class="li_style">{{ item.name }}</li>
            </ul>
          </div>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitCat">确 定</el-button>
          <el-button @click="distributionClass = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "userManagement",
  data() {
    return {
      activeName: 'first',
      isDisable: true,
      tableData: [],
      selectionList: [],
      ids: [],
      expIds: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      currentPage: 1,
      total: 0,
      ruleForm: {
        account: '',
        userName: '',
        userType: ''
      },
      dialogProduct: false, // 产品列表弹窗
      distributionClass: false, // 奖项设置弹窗
      formLabelWidth: '120px',
      formProduct: {
        name: '',
        region: ''
      },
      formAward: {
        checkboxGroup: []
      },
      json: {
        "OrderModelField": [
          {
            "OrderByField": "workDeptCode",
            "asc": true
          }
        ],
        "CustomQueryParams": [
          {
            "FindType": "EQ",
            "Name": "workDeptId",
            "Values": ["4594a42e12394c31b9e1ce4945dc8f7c"]
          }
        ],
        "PageIndex": 1,
        "PageSize": 10
      }
    };
  },
  mounted() {
    this.getListPageInfo(this.json).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });
  },
  computed: {
    ...mapGetters("getUserManagement", ["getUserList"]), // 用户列表查询
    ...mapGetters("getUserManagement", ["delBatChids"]), // 用户删除
    ...mapGetters("getUserManagement", ["getSingle"]), // 用户修改页赋值
    ...mapGetters("getUserManagement", ["getProCat"]), // 用户分配大类查询
    ...mapGetters("getUserManagement", ["getResetPwd"]) // 用户重置密码
  },
  methods: {
    ...mapActions("getUserManagement", ["getListPageInfo"]), // 用户列表查询
    ...mapActions("getUserManagement", ["deleteBatchIdsInfo"]), // 用户删除
    ...mapActions("getUserManagement", ["getSingleByIdInfo"]), // 用户修改页赋值
    ...mapActions("getUserManagement", ["getProductCategoryInfo"]), // 用户分配大类查询
    ...mapActions("getUserManagement", ["resetPwdInfo"]), // 用户重置密码
    ...mapActions("getUserManagement", ["saveExpProCatInfo"]), // 用户分配大类保存
    ...mapActions("getUserManagement", ["deleteExpertInfo"]), // 专家删除

    // 搜索框查询
    submitForm() {
      let account = this.ruleForm.account.replace(/\s*/g, "");
      let userName = this.ruleForm.userName.replace(/\s*/g, "");
      this.json.CustomQueryParams[1] = {
        "FindType": "LIKE",
        "Name": "account",
        "Values": [account]
      };
      this.json.CustomQueryParams[2] = {
        "FindType": "LIKE",
        "Name": "userName",
        "Values": [userName]
      };
      this.json.CustomQueryParams[3] = {
        "FindType": "LIKE",
        "Name": "userType",
        "Values": [this.ruleForm.userType]
      };
      this.json.PageIndex = 1;
      this.json.PageSize = 10;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    // 重置搜索框
    clearSearch(formName) {
      this.$refs[formName].resetFields();
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.json.PageSize = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.json.PageIndex = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.selectionList = selection;
      this.ids = [row.userId];
      this.expIds = [];
      this.userIds = [];
      for (let item in selection) {
        if (selection[item].userType === "0") {
          this.expIds.push(selection[item].userId);
          this.isDisable = false; // 分配大类按钮可用
        } else if (selection[item].userType === "1") {
          this.userIds.push(selection[item].userId);
          this.isDisable = true; // 分配大类按钮置灰
        }
      }
      this.nowUserId = this.$store.getters.userInfo.userId;

    },
    // 跳转到用户新增页面
    locationAdd() {
      this.$router.push('/addUser');
    },
      // 修改
    handleEdit(row, index) {
      if (row.userType === "1") {
        this.getSingleByIdInfo(row.userId).then(res => {
          this.$router.push({
            path: '/addUser',
            query: {
              data: JSON.stringify(res)
            }
          });
        });
      } else if (row.userType === "0") {
        this.$router.push({
          path: '/addUser',
          query: {
            data: JSON.stringify(row)
          }
        });
      }
    },
      // 批量删除
    handleDelete() {
      let _this = this;
      if (this.selectionList.length === 0) {
        this.$message({
          type: "info",
          message: "请至少选择一个用户"
        });
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (_this.expIds.length > 0) {
            _this.deleteExpertInfo(_this.expIds).then(resT => {
              _this.deleteBatchIdsInfo(_this.expIds).then(res => {
                this.expIds = [];
                this.getListPageInfo(this.json).then(resF => {
                  this.tableData = resF.records;
                  this.total = resF.total;
                });
                this.$message({

                  type: "success",
                  message: "删除成功!"

                });
              });
            });
          }
          if (_this.userIds.length > 0) {
            _this.deleteBatchIdsInfo(_this.userIds).then(resT => {
              _this.userIds = [];
              this.getListPageInfo(this.json).then(resF => {
                this.tableData = resF.records;
                this.total = resF.total;
              });
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          }
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
      this.idsRow.push(scope.userId);
      let _this = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (scope.userType === "0") {
          _this.deleteExpertInfo(_this.idsRow).then(resT => {
            _this.deleteBatchIdsInfo(_this.idsRow).then(res => {
              this.getListPageInfo(this.json).then(resF => {
                this.tableData = resF.records;
                this.total = resF.total;
              });
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
               // location.reload();
            });
          });
        } else if (scope.userType === "1") {
          _this.deleteBatchIdsInfo(_this.idsRow).then(res => {
            this.getListPageInfo(this.json).then(resF => {
              this.tableData = resF.records;
              this.total = resF.total;
            });
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
               // location.reload();
          });
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 分配产品大类列表
    giveProCat() {
      this.formAward.checkboxGroup = [];
      if (this.selectionList.length > 1) {
        this.$message({
          type: "info",
          message: "只能勾选一个用户"
        });
      } else if (this.selectionList.length === 0) {
        this.$message({
          type: "info",
          message: "请至少选择一个用户"
        });
      } else if (this.distributionClass === false) {
        this.categories = [];
        this.distributionClass = true;
        this.getProductCategoryInfo(this.ids[0]).then(res => {
          for (let i = 0; i < res.records.length; i++) {
            this.categories.push({ name: res.records[i].productCategoryNameCn, id: res.records[i].productCategoryId });
            if (res.records[i].isExpertLk === 1) {
              this.formAward.checkboxGroup.push(this.categories[i]);
            }

          }
        });
      }
    },
    // 产品大类保存
    submitCat() {
      let catIds = [];
      for (let i = 0; i < this.formAward.checkboxGroup.length; i++) {
        catIds.push(this.formAward.checkboxGroup[i].id);
      }
      let param = {
        userId: this.ids[0],
        productCategoryIdList: catIds
      };
      this.saveExpProCatInfo(param).then(res => {
        this.distributionClass = false;
        this.$message({
          type: "success",
          message: "分配大类成功!"
        });
        this.$refs.multipleTable.clearSelection();
      }).catch(e => {
        this.$message.error(e);
        return false;
      });
      this.categories = [];
      this.formAward.checkboxGroup = [];
    },
      // 重置密码
    handleReset(row, index) {
      let param = {
        account: row.account,
        newPwd: 123456
      };
      this.$confirm('你确定要重置密码为：123456 吗?', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.resetPwdInfo(param).then(res => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
      // 新增
    handleAdd() {
      this.dialogProduct = true;
    },
      // 表格多选框选中事件
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      this.selectionList = val;
    }
  }
};
</script>
<style scoped>
.title{
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.btn-row{
  margin: 10px;
}
.dialog-footer{
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.check-item{
  margin: 10px;
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
</style>
