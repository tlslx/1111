/**
* @file 广交会-账号管理
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">账号管理</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="姓名" size="mini">
        <el-input v-model.trim="ruleForm.userName" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="账号名称" size="mini">
        <el-input v-model.trim="ruleForm.account" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" @click="resetRuleForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" @click="openAddDialog()">新增</el-button>
      <el-button type="primary" :disabled="canDelete" @click="handleMuitlDelete()">删除</el-button>
    </el-row>
    <template>
      <el-table
        ref="multipleTable"
        :data="listDatas"
        class="table"
        border
        @select-all="handleListSelectAll"
        @selection-change="handleListSelectChange"
        style="width: 100%;">

        <el-table-column
          type="selection"
          align="center"
          width="80">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="姓名"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号名称"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="carrierName"
          label="承运商"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="150"
          align="center">
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="220">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openUpdateDialog(scope.row, scope.$index)">修改</el-button>
            <el-button type="text" size="mini" @click="handleSignleDelete(scope.row, scope.$index)">删除</el-button>
            <el-button type="text" size="mini" @click="handleReviewInfo(scope.row, scope.$index)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleListSizeChange"
        @current-change="handleListCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </template>

    <!--账号设置弹框-->
    <el-dialog title="账号设置" width="860px" :visible.sync="addDialog" :close-on-click-modal="false">
      <el-form :model="addAccountForm" :rules="rules" class="demo-form-inline" style="margin-right: 15px" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称:" size="small" prop="userName">
              <el-input type="text" maxlength="50" v-model.trim="addAccountForm.userName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户名称:" size="small" prop="account">
              <el-input type="text" maxlength="50" v-model.trim="addAccountForm.account" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="承运商:" size="small" prop="carrierName">
              <el-input type="text" maxlength="50" v-model.trim="addAccountForm.carrierName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机:" size="small" prop="mobile">
              <el-input type="text" maxlength="11" v-model.trim="addAccountForm.mobile" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="邮件:" size="small" prop="email">
              <el-input type="email" maxlength="50" v-model.trim="addAccountForm.email" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:" size="small" prop="state">
              <el-select v-model="addAccountForm.state" placeholder="请选择">
                <el-option v-for="(state,index) in states" :key="index" :label="state.itemText" :value="Number(state.itemCode)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="密码重置:" size="small" prop="resetType">
              <el-select v-model="addAccountForm.resetType" placeholder="请选择" clearable>
                <el-option v-for="(reset,index) in resetTypes" :key="index" :label="reset.itemText" :value="Number(reset.itemCode)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" size="small" prop="remark">
              <el-input type="textarea" maxlength="200" v-model.trim="addAccountForm.remark" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmSendRequest()">确认</el-button>
        <el-button @click="addDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="账户信息" width="700px" :visible.sync="seeUserDialog" :close-on-click-modal="false">
      <el-row class="item">
        <el-col :span="12">
          <span class="itemtitle">用户名称:</span>
          <span class="content">{{addAccountForm.userName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="itemtitle">账户名称:</span>
          <span class="content">{{addAccountForm.account}}</span>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="12">
          <span class="itemtitle">承运商:</span>
          <span class="content">{{addAccountForm.carrierName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="itemtitle">手机:</span>
          <span class="content">{{addAccountForm.mobile}}</span>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="12">
          <span class="itemtitle">邮件:</span>
          <span class="content">{{addAccountForm.email}}</span>
        </el-col>
        <el-col :span="12">
          <span class="itemtitle">状态:</span>
          <span v-for="(state,index) in states" :key="index" v-if="state.itemCode === addAccountForm.state" class="content">{{state.itemText}}</span>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="12">
          <span class="itemtitle">密码重置:</span>
          <span v-for="(reset,index) in resetTypes" :key="index" v-if="reset.itemCode === addAccountForm.resetType" class="content">{{reset.itemText}}</span>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="12">
          <span class="itemtitle">备注:</span>
          <span class="content">{{addAccountForm.remark}}</span>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>

      <div class="dialog-footer">
        <el-button type="primary" @click="seeUserDialog = false">关 闭</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "carrierAccountManagement",
    mixins: [dialogMixin],
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error("输入不能包含特殊字符!"));
        } else {
          return callback();
        }
      };
      return {
        listDatas: [],
        listTotal: 0,
        addDialog: false,
        isUpdate: false,
        resetTypes: [],
        states: [],
        seeUserDialog: false,
        canDelete: true,

        ruleForm: {
          userName: '',
          account: ''
        },

        userIds: [],
        carrierUserIds: [],
        addAccountForm: {
          userName: '',
          account: '',
          carrierName: '',
          mobile: '',
          email: '',
          state: '',
          resetType: '',
          remark: '',
          carrierUserId: '',
          userId: ''
        },
        currentUserId: '',
        currentCarrierUserId: '',
        currentCarrierId: '',
        rules: {
          userName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          account: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          carrierName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          mobile: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'change' }
          ],
          email: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          resetType: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_MB_URL,
        baseApi2: process.env.API_COMS_URL,
        baseApi3: process.env.API_DICT_URL
      };
    },
    mounted() {
      this.getResetTypes();
      this.getStates();
      this.searchForumList();
    },
    methods: {
      // 字典数据获取
      getResetTypes() {
        this.$http.get(this.baseApi3 + '/api/sysDataDictItem/findDicItemList?dictCode=resetType').then(data => {
          this.resetTypes = data.records;
        }).catch(err => {
        });
      },
      getStates() {
        this.$http.get(this.baseApi3 + '/api/sysDataDictItem/findDicItemList?dictCode=state').then(data => {
          this.states = data.records;
        }).catch(err => {
        });
      },
      /*
        搜索及条件重置
      */
      searchForumList(flag) {
        // 分页重置
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/carrier/listCarrierUser', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },

      getUserInfoById(userId) {
        this.$http.get(this.baseApi2 + '/api/sysUser/getSingleById', { id: userId }).then(res => {
          for (let item in this.addAccountForm) {
            this.addAccountForm[item] = res[item];
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getUserInfoByIdLocal(carrierUserId) {
        this.$http.get(this.baseApi + '/api/customservice/carrier/carrierUserDetail', { carrierUserId: carrierUserId }).then(res => {
          for (let item in res) {
            this.addAccountForm[item] = res[item];
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.current = 1;
        this.ruleForm.userName = '';
        this.ruleForm.account = '';
      },
      resetAddForm() {
        for (let item in this.addAccountForm) {
          this.addAccountForm[item] = '';
        }
      },
      // 弹窗处理
      openAddDialog() {
        this.isUpdate = false;
        this.addDialog = true;
        this.resetAddForm();
      },
      openUpdateDialog(row, index) {
        this.isUpdate = true;
        this.addDialog = true;
        this.currentCarrierUserId = row.carrierUserId;
        this.currentUserId = row.userId;
        this.currentCarrierId = row.carrierId;
        this.getUserInfoById(row.userId);
        this.getUserInfoByIdLocal(row.carrierUserId);
      },
      confirmSendRequest() {
        if (this.isUpdate) {
          this.handleUpdateAccount();
        } else {
          this.handleAddAccount();
        }
      },
      handleAddAccount() {
        let params = {
          roles: [],
          workDeptCode: "cys_qy",
          workDeptName: "承运商企业",
          oauthInfo: "663689e547834dbaa8e449ffdc864e87",
          roleIds: ['f863a09b0a8e443093187044afe3c6e1'],
          workDeptId: '0a249efe08684aa5ad4e3eecba9feb4a',
          userName: this.addAccountForm.userName,
          account: this.addAccountForm.account,
          mobile: this.addAccountForm.mobile,
          email: this.addAccountForm.email,
          state: this.addAccountForm.state,
          resetType: this.addAccountForm.resetType,
          remark: this.addAccountForm.remark
        };
        this.$http.post(this.baseApi2 + '/api/sysUser/add', {
          json: JSON.stringify({
            formData: params,
            subTables: [JSON.stringify([])],
            subTableNames: [],
            subTableLength: 0 })
        }).then(res => {
          this.addAccountForm.userId = res.userId;
          this.handleAddAccountLocal();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleAddAccountLocal() {
        let localParams = {
          carrierName: this.addAccountForm.carrierName,
          userName: this.addAccountForm.userName,
          account: this.addAccountForm.account,
          carrierUserId: this.addAccountForm.carrierUserId,
          userId: this.addAccountForm.userId
        };
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveCarrierUser', localParams).then(res => {
          this.$message.success('新增成功');
          this.addDialog = false;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 更新操作
      handleUpdateAccount() {
        let params = {
          roles: [],
          userId: this.currentUserId,
          workDeptCode: "cys_qy",
          workDeptName: "承运商企业",
          oauthInfo: "663689e547834dbaa8e449ffdc864e87",
          roleIds: ['f863a09b0a8e443093187044afe3c6e1'],
          workDeptId: '0a249efe08684aa5ad4e3eecba9feb4a',
          userName: this.addAccountForm.userName,
          account: this.addAccountForm.account,
          mobile: this.addAccountForm.mobile,
          email: this.addAccountForm.email,
          state: this.addAccountForm.state,
          resetType: this.addAccountForm.resetType,
          remark: this.addAccountForm.remark
        };
        this.$http.post(this.baseApi2 + '/api/sysUser/updateById', {
          json: JSON.stringify({
            formData: params,
            subTables: [JSON.stringify([])],
            subTableNames: [],
            subTableLength: 0 })
        }).then(res => {
          this.updateAccountLocal(this.currentCarrierUserId);
        }).catch(error => {
          this.$message.error(error);
        });
      },
      updateAccountLocal(carrierUserId) {
        let localParams = {
          carrierName: this.addAccountForm.carrierName,
          userName: this.addAccountForm.userName,
          account: this.addAccountForm.account,
          carrierUserId: carrierUserId,
          carrierId: this.currentCarrierId,
          userId: this.addAccountForm.userId
        };
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/updateCarrierUser', localParams).then(res => {
          this.$message.success('更新成功');
          this.addDialog = false;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 删除操作 api/sysUser/deleteBatchIds
      handleSignleDelete(row, index) {
        this.showDialogTips("确认删除?").then(() => {
          this.$http.post(this.baseApi2 + '/api/sysUser/deleteBatchIds', { json: JSON.stringify([row.userId]) }).then(res => {
            this.deleteSingleAccountLocal(row.carrierUserId);
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      deleteSingleAccountLocal(carrierUserIds) {
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/deleteCarrierUser', [carrierUserIds]).then(res => {
          this.$message.success('删除成功');
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleMuitlDelete() {
        this.showDialogTips("确认删除?").then(() => {
          this.$http.post(this.baseApi2 + '/api/sysUser/deleteBatchIds', { json: JSON.stringify(this.userIds) }).then(res => {
            this.deleteMuitlAccountLocal();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      deleteMuitlAccountLocal() {
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/deleteCarrierUser', this.carrierUserIds).then(res => {
          this.$message.success('删除成功');
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 查看信息
      handleReviewInfo(row, index) {
        this.getUserInfoById(row.userId);
        this.getUserInfoByIdLocal(row.carrierUserId);
        this.seeUserDialog = true;
      },
      // 列表选择事件
      handleListSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleListSelectChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.carrierUserIds = [];
        this.userIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.carrierUserIds.push(val[i].carrierUserId);
          this.userIds.push(val[i].userId);
        }

        if (this.userIds.length > 0) {
          this.canDelete = false;
        } else {
          this.canDelete = true;
        }
      },
      // 论坛列表分页
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchForumList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchForumList();
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 10px 10px 10px 20px;
  }

  .top_line {
    border-bottom: 1px solid #cdcdcd;
  }

  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }

  .dialog-footer{
    text-align: center;
    padding: 20px 0;
  }
  .pagination {
    text-align: right;
    margin: 10px;
  }
  .btn-row{
    margin-bottom: 20px;
  }
</style>
<style lang="scss" scoped>
  /deep/.el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
    width: 180px;
  }
  /deep/.el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--mini .el-input  .el-input__inner{
    height: 40px;
    line-height: 40px;
    width: 160px;
  }
  /deep/.el-select--small{
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--small   .el-input  .el-input__inner{
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-pagination .el-select .el-input .el-input__inner{
    height: 28px;
    line-height: 28px;
    width: 100px;
  }
  /deep/.el-form-item--mini .el-form-item__label{
    line-height: 20px;
  }
  /deep/.el-form-item--small .el-form-item__label{
    line-height: 18px;
  }
  /deep/.el-form-item--mini{
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }
  /deep/.el-form-item--small{
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
  }
  /deep/.el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  /deep/.el-table__header tr,
  /deep/.el-table__header th {
    padding: 0;
    height: 42px;
  }
  /deep/.el-table__body tr,
  /deep/.el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
<style>
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>

