
/**
* @file 承运商-搬运服务
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">承运商搬运服务</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option v-for="(exhibition,index) in exhibitionSessions" :key="index" :label="'第' + exhibition.exhibitionNum + '届'"
                     :value="exhibition.exhibitionNum"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="承运商" size="mini">
        <el-input v-model.trim="ruleForm.companyName" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="类型" size="mini">
        <el-select v-model="ruleForm.carryPeriod" placeholder="请选择">
          <el-option label="筹展服务" value="0"></el-option>
          <el-option label="撤展服务" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.applyStatus" placeholder="请选择">
          <el-option label="待受理" value="01"></el-option>
          <el-option label="已受理" value="02"></el-option>
          <el-option label="不受理" value="03"></el-option>
          <el-option label="已完成" value="04"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" @click="resetRuleForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" :disabled="acceptBtn" @click="handeMuitlAccept()">受理</el-button>
      <el-button type="warning" :disabled="noAcceptBtn" @click="handeMuitlNoAccept()">不受理</el-button>
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
          width="50">
        </el-table-column>

        <el-table-column
          prop="exhibitionSession"
          label="届数"
          width="90"
          align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.exhibitionSession}}届</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="承运商"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="carryPeriod"
          label="类型"
          width="150"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.carryPeriod === '0' ? '筹展服务' : '撤展服务'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约日期"
          align="center"
          width="190">
          <template slot-scope="scope">
            <span>第 {{ parseInt(scope.row.exhibitionPeriod) + 1}} 期 {{ scope.row.appointDate.substring(0,10) }} {{ scope.row.appointTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contactName"
          label="联系人"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contactMobile"
          label="联系电话"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus === '01'">待受理</span>
            <span v-if="scope.row.applyStatus === '02'">已受理</span>
            <span v-if="scope.row.applyStatus === '03'">不受理</span>
            <span v-if="scope.row.applyStatus === '04'">已完成</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.applyStatus === '01'" size="mini" @click="handleSingleAccept(scope.row, scope.$index)">受理</el-button>
            <el-button type="text" :disabled="true" v-else size="mini" @click="handleSingleAccept(scope.row, scope.$index)">受理</el-button>
            <el-button type="text" v-if="scope.row.applyStatus === '01'" size="mini" @click="openHandleNoAcceptDialog(scope.row, scope.$index)">不受理</el-button>
            <el-button type="text" :disabled="true" v-else size="mini" @click="openHandleNoAcceptDialog(scope.row, scope.$index)">不受理</el-button>
            <el-button type="text" size="mini" @click="openfeedBackDialog(scope.row, scope.$index)">反馈结单</el-button>
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

    <!--不受理弹框-->
    <el-dialog title="不受理" width="400px" :visible.sync="noAcceptDialog" :close-on-click-modal="false">
      <el-form :model="noAcceptForm" class="demo-form-inline" ref="noAcceptForm" label-width="70px" :rules="rules">
        <el-form-item label="备注:" size="medium" prop="remark">
          <el-input maxlength="100" type="textarea" v-model.trim="noAcceptForm.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="sendNoAcceptRequest()">确认</el-button>
        <el-button @click="noAcceptDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 反馈结单 -->
    <el-dialog title="评价" width="400px" :visible.sync="feedBackDialog" :close-on-click-modal="false">
      <el-form :model="feedBackForm" class="demo-form-inline" ref="feedBackForm" label-width="70px" :rules="rules">
        <el-form-item label="备注:" size="medium" prop="feedback">
          <el-input maxlength="100" type="textarea" v-model.trim="feedBackForm.feedback" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="feedbackRequest()">确认</el-button>
        <el-button @click="feedBackDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "carrierTransportService",
    mixins: [dialogMixin],
    data() {
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`@#$%^&]/im;
        let regCn = /[#￥【】]/im;

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

        noAcceptDialog: false,
        feedBackDialog: false,

        hasApplyCarryIds: [],
        waitApplyCarryIds: [],
        noAcceptCarryId: [],

        acceptBtn: true,
        noAcceptBtn: true,

        ruleForm: {
          companyName: '',
          carryPeriod: '',
          exhibitionSession: '',
          applyStatus: '',
          current: 1,
          size: 10
        },
        noAcceptForm: {
          remark: '',
          applyCarryId: ''
        },
        feedBackForm: {
          feedback: '',
          applyCarryId: ''
        },
        rules: {
          feedback: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ]
        },
        uploadApi: '',
        baseApi: process.env.API_MB_URL,
        baseApi3: process.env.API_EXP_URL,
        exhibitionSessions: [],
        currentExhibitionSession: '',
        currentYear: ''
      };
    },
    mounted() {
      this.getCurrentSession();
      this.getExhibitionSessions();
    },
    methods: {
      getCurrentSession() {
        this.$http.get(this.baseApi3 + '/api/exp/exhibitions/current').then(res => {
          this.currentExhibitionSession = res.exhibitionNum;
          this.currentYear = res.exhibitionYear;
          this.ruleForm.exhibitionSession = res.exhibitionNum;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getExhibitionSessions() {
        this.$http.get(this.baseApi3 + '/api/exp/exhibitions/getListAll').then(res => {
          this.exhibitionSessions = res;
        }).catch(error => {
          this.$message.error(error);
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
        this.$http.get(this.baseApi + '/api/customservice/carrier/listAcceptApplyCarry', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.exhibitionSession = this.currentExhibitionSession;
        this.ruleForm.companyName = '';
        this.ruleForm.carryPeriod = '';
        this.ruleForm.applyStatus = '';
      },
      handleSingleAccept(row, index) {
        this.showDialogTips("确认受理?").then(() => {
          this.sendAcceptRequest([row.applyCarryId]);
        }).catch(() => {});
      },
      openHandleNoAcceptDialog(row, index) {
        this.noAcceptForm.applyCarryId = row.applyCarryId;
        this.noAcceptDialog = true;
      },
      openfeedBackDialog(row, index) {
        this.feedBackDialog = true;
        this.feedBackForm.applyCarryId = row.applyCarryId;
      },
      handeMuitlAccept() {
        if (this.hasApplyCarryIds.length > 0) {
          this.$message.warning('不能包含已经审核过的选项!');
          return;
        }
        this.showDialogTips("确认受理?").then(() => {
          this.sendAcceptRequest(this.waitApplyCarryIds);
        }).catch(() => {});
      },
      handeMuitlNoAccept() {
        this.noAcceptDialog = true;
        if (this.waitApplyCarryIds.length > 1) {
          this.$message.warning('只能选择一个选项进行操作!');
          return;
        }
        this.noAcceptForm.applyCarryId = this.waitApplyCarryIds[0];
      },
      // 受理请求
      sendAcceptRequest(applyCarryIds) {
        this.$http.post(this.baseApi + '/api/customservice/carrier/acceptApplyCarry', { applyCarryIds: applyCarryIds.join() }).then(res => {
          this.$message.success("受理成功!");
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 不受理请求
      sendNoAcceptRequest() {
        this.$refs["noAcceptForm"].validate((valid) => {
          this.$http.postJson(this.baseApi + '/api/customservice/carrier/rejectApplyCarry', this.noAcceptForm).then(res => {
            this.$message.success("不受理成功!");
            this.searchForumList();
            this.noAcceptDialog = false;
          }).catch(error => {
            this.$message.error(error);
          });
        });
      },
      // 反馈结单请求
      feedbackRequest() {
        this.$refs["feedBackForm"].validate((valid) => {
          if (valid) {
            this.$http.postJson(this.baseApi + '/api/customservice/carrier/carryFeedback', this.feedBackForm).then(res => {
              this.$message.success("反馈结单成功!");
              this.searchForumList();
              this.feedBackDialog = false;
            }).catch(error => {
              this.$message.error(error);
            });
          }
        });
      },
      /*
        选择及分页事件处理
      */
      // 列表选择事件
      handleListSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleListSelectChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.waitApplyCarryIds = [];
        this.hasApplyCarryIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          if (val[i].applyStatus === '01') {
            this.waitApplyCarryIds.push(val[i].applyCarryId);
          } else {
            this.hasApplyCarryIds.push(val[i].applyCarryId);
          }
        }
        if (this.waitApplyCarryIds.length > 0) {
          this.acceptBtn = false;
          this.noAcceptBtn = false;
        } else {
          this.acceptBtn = true;
          this.noAcceptBtn = true;
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
    padding: 10px 10px 10px 20px;
  }

  .top_line {
    border-bottom: 1px solid #cdcdcd;
  }

  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }

  .demo-form-inline{
    margin-right: 20px;
  }

  .btn-row {
    margin-bottom: 20px;
  }

  .dialog-footer {
    text-align: center;
    padding: 0 0 20px 0;
  }

  .pagination {
    text-align: right;
    margin: 10px;
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

