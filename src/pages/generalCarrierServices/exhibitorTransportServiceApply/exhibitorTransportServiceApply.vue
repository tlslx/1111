
/**
* @file 参展商-搬运服务申请
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">参展商搬运服务申请</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option v-for="(exhibition,index) in exhibitionSessions" :key="index" :label="'第' + exhibition.exhibitionNum + '届'"
                     :value="exhibition.exhibitionNum"></el-option>
        </el-select>
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
      <el-button type="primary" @click="openTranportDialog()">搬运申请</el-button>
    </el-row>
    <template>
      <el-table
        ref="multipleTable"
        :data="listDatas"
        class="table"
        border>

        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80">
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
          prop="carryPeriod"
          label="类型"
          width="150"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.carryPeriod === '0' ? '筹展服务' : '撤展服务'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="boothNumber"
          label="展位号"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="预约日期"
          align="center"
          width="210">
          <template slot-scope="scope">
            <span>{{ scope.row.exhibitionPeriod + 1 }}期 {{ scope.row.appointDate.substring(0,10) }} {{ scope.row.appointTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="carrierId"
          label="承运商"
          width="150"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{ path: '/carrierCmInfoDetail', query: { carrierId: scope.row.carrierId, enterRouter: '/exhibitorTransportServiceApply' }}" v-for="(carrier, index) in carriers" :key="index" v-if="carrier.carrierId === scope.row.carrierId " >{{carrier.carrierName}}</router-link>
          </template>
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
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.applyStatus === '04'" size="mini" @click="openCommentDialog(scope.row, scope.$index)">评价</el-button>
            <el-button type="text" v-else size="mini" :disabled="true" @click="openCommentDialog(scope.row, scope.$index)">评价</el-button>
            <el-button type="text" v-if="scope.row.applyStatus === '04' || scope.row.applyStatus === '02'" :disabled="true" size="mini" @click="openUpdateDialog(scope.row, scope.$index)">修改</el-button>
            <el-button type="text" v-else size="mini" @click="openUpdateDialog(scope.row, scope.$index)">修改</el-button>
            <el-button type="text" v-if="scope.row.applyStatus === '04' || scope.row.applyStatus === '02'" :disabled="true" size="mini" @click="cancelPublish(scope.row, scope.$index)">撤回</el-button>
            <el-button type="text" v-else size="mini" @click="cancelPublish(scope.row, scope.$index)">撤回</el-button>
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

    <!--搬运预约登记-->
    <el-dialog title="搬运预约登记" width="500px" :visible.sync="transPortApplyDialog" :close-on-click-modal="false">
      <el-form :model="transPortApplyForm" ref="transPortApplyForm" :rules="rules" class="demo-form-inline" style="margin-right: 15px" label-width="110px">
        <el-form-item label="届数:" size="small" prop="exhibitionSession">
          <el-select v-model="transPortApplyForm.exhibitionSession" placeholder="请选择">
            <el-option label="第123届" value="123"></el-option>
            <el-option label="第124届" value="124"></el-option>
            <el-option label="第125届" value="125"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:" size="small" prop="carryPeriod">
          <el-select v-model="transPortApplyForm.carryPeriod" placeholder="请选择">
            <el-option label="筹展服务" value="0"></el-option>
            <el-option label="撤展服务" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="展位号:" size="small" prop="boothNumber">
          <el-input type="text" maxlength="32" v-model.trim="transPortApplyForm.boothNumber" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="预约日期:" size="medium" prop="exhibitionPeriod" style="width: 250px;display: inline-block">
          <el-select v-model="transPortApplyForm.exhibitionPeriod" placeholder="请选择" class="datepicker" @change="periodChange">
            <el-option label="第一期" value="0"></el-option>
            <el-option label="第二期" value="1"></el-option>
            <el-option label="第三期" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0" size="medium" prop="appointDate" style="display:inline-block;width: 135px">
          <el-select v-model="transPortApplyForm.appointDate" style="width: 135px" placeholder="请选择"  @change="periodChange">
            <el-option v-for="(item, index) in periodDays" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  size="medium" prop="startTime" style="display: inline-block">
          <el-time-select
            class="datepicker"
            v-model="transPortApplyForm.startTime"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '20:00'
            }"
            placeholder="开始时间">
          </el-time-select>
        </el-form-item> -
        <el-form-item  label-width="0" size="medium" prop="endTime" style="display: inline-block">
          <el-time-select
            class="datepicker"
            v-model="transPortApplyForm.endTime"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '20:00',
              minTime: transPortApplyForm.startTime
            }"
            placeholder="结束时间">
          </el-time-select>
        </el-form-item>

        <el-form-item label="承运商:" size="small" prop="carrierId">
          <el-select v-model="transPortApplyForm.carrierId" placeholder="请选择">
            <el-option v-for="(carrier,index) in carriers" :key="index" :label="carrier.carrierName" :value="carrier.carrierId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人:" size="small" prop="contactName">
          <el-input type="text" maxlength="32" v-model.trim="transPortApplyForm.contactName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" size="small" prop="contactMobile">
          <el-input type="text" maxlength="11" v-model.trim="transPortApplyForm.contactMobile" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmSendApplyRequest()">提交</el-button>
        <el-button @click="transPortApplyDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 评价弹框 -->
    <el-dialog title="评价" width="400px" :visible.sync="commentDialog" :close-on-click-modal="false">
      <el-form :model="commentForm" class="demo-form-inline" :rules="rules" style="margin-right: 15px" label-width="90px">
        <el-form-item label="类型:" size="small" prop="appraisalLevel">
          <el-select v-model="commentForm.appraisalLevel" placeholder="请选择">
            <el-option label="非常满意" value="0"></el-option>
            <el-option label="满意" value="1"></el-option>
            <el-option label="不满意" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价:" size="small" prop="appraisal">
          <el-input type="textarea" maxlength="200" v-model.trim="commentForm.appraisal" placeholder="请输入内容" style="width: 280px"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmSendCommentRequest()">提交</el-button>
        <el-button @click="commentDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "exhibitorTransportServiceApply",
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
        carriers: [],

        listTotal: 0,
        periodDays: [],
        oneDays: ['10日', '11日', '12日', '13日', '14日'],
        twoDays: ['20日', '21日', '22日'],
        threeDays: ['28日', '29日', '30日'],

        transPortApplyDialog: false,
        commentDialog: false,
        isUpdate: false,
        isCanRequest: true, // 是否能够发起请求

        currentApplyCarryId: '',

        ruleForm: {
          exhibitionSession: '',
          carryPeriod: '',
          applyStatus: '',
          current: 1,
          size: 10
        },
        transPortApplyForm: {
          applyCarryId: '',
          exhibitionSession: '',
          exhibitionPeriod: '',
          boothNumber: '',
          carryPeriod: '',
          appointDate: '',
          appointTime: '',
          carrierId: '',
          startTime: '',
          endTime: '',
          contactName: '',
          contactMobile: ''
        },
        commentForm: {
          applyCarryId: '',
          appraisal: '',
          appraisalLevel: ''
        },

        rules: {
          exhibitionSession: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          exhibitionPeriod: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          carryPeriod: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          appointDate: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          appointTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          carrierId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          boothNumber: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          contactMobile: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          applyCarryId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          appraisalLevel: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          appraisal: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ]
        },
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
      this.getCarrierList();
    },
    methods: {
      getCurrentSession() {
        this.$http.get(this.baseApi3 + '/api/exp/exhibitions/current').then(res => {
          this.currentExhibitionSession = res.exhibitionNum;
          this.currentYear = res.exhibitionYear;
          this.ruleForm.exhibitionSession = res.exhibitionNum;
          // 表单的默认展届值
          this.transPortApplyForm.exhibitionSession = res.exhibitionNum;
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
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/carrier/listApplyCarry', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      periodChange(val) {
        if (val === '0') {
          this.periodDays = this.oneDays;
        } else if (val === '1') {
          this.periodDays = this.twoDays;
        } else {
          this.periodDays = this.threeDays;
        }
      },
      // 获取承运商列表
      getCarrierList() {
        this.$http.get(this.baseApi + '/api/customservice/carrier/listCarrier', this.ruleForm).then(res => {
          this.carriers = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.current = 1;
        this.ruleForm.exhibitionSession = this.currentExhibitionSession;
        this.ruleForm.carryPeriod = '';
        this.ruleForm.applyStatus = '';
      },
      resetTransPortApplyForm() {
        this.transPortApplyForm.applyCarryId = '';
        this.transPortApplyForm.exhibitionSession = this.currentExhibitionSession;
        this.transPortApplyForm.exhibitionPeriod = '';
        this.transPortApplyForm.boothNumber = '';
        this.transPortApplyForm.carryPeriod = '';
        this.transPortApplyForm.appointDate = '';
        this.transPortApplyForm.appointTime = '';
        this.transPortApplyForm.startTime = '';
        this.transPortApplyForm.endTime = '';

        this.transPortApplyForm.carrierId = '';
        this.transPortApplyForm.contactName = '';
        this.transPortApplyForm.contactMobile = '';
      },
      openUpdateDialog(row, index) {
        this.isUpdate = true;
        if (this.$refs.transPortApplyForm !== undefined) {
          this.$refs.transPortApplyForm.resetFields();
        }
        this.getCarrierList();
        for (let item in this.transPortApplyForm) {
          this.transPortApplyForm[item] = row[item];
        }
        this.transPortApplyForm.applyCarryId = row.applyCarryId;
        this.transPortApplyForm.exhibitionPeriod = row.exhibitionPeriod + '';
        this.transPortApplyForm.exhibitionSession = row.exhibitionSession + '';
        if (row.appointTime) {
          this.transPortApplyForm.startTime = row.appointTime.split('-')[0];
          this.transPortApplyForm.endTime = row.appointTime.split('-')[1];
        }
        // console.log(this.transPortApplyForm);
        this.transPortApplyDialog = true;
      },
      openTranportDialog() {
        this.isUpdate = false;
        this.getCarrierList();
        if (this.$refs.transPortApplyForm !== undefined) {
          this.$refs.transPortApplyForm.resetFields();
        }
        this.resetTransPortApplyForm();
        this.transPortApplyForm.appointDate = '';
        this.transPortApplyDialog = true;
      },
      openCommentDialog(row, index) {
        this.commentDialog = true;
        this.commentForm.applyCarryId = row.applyCarryId;
      },
      // 发送搬运申请请求
      confirmSendApplyRequest() {
        this.$refs["transPortApplyForm"].validate((valid) => {
          if (valid) {
            if (this.isUpdate) {
              this.updateApplyData();
            } else {
              this.addApplyData();
            }
          }
        });
      },
      updateApplyData() {
        this.transPortApplyForm.appointTime = this.transPortApplyForm.startTime + '-' + this.transPortApplyForm.endTime;
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/updateApplyCarry', this.transPortApplyForm).then(res => {
          this.$message.success("修改成功!");
          this.searchForumList();
          this.transPortApplyDialog = false;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      addApplyData() {
        this.transPortApplyForm.appointTime = this.transPortApplyForm.startTime + '-' + this.transPortApplyForm.endTime;
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveApplyCarry', this.transPortApplyForm).then(res => {
          this.$message.success("申请成功!");
          this.searchForumList();
          this.transPortApplyDialog = false;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 发送评价请求
      confirmSendCommentRequest() {
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/appraisalApplyCarry', this.commentForm).then(res => {
          this.$message.success("评价成功!");
          this.commentDialog = false;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      cancelPublish(row, index) {
        this.showDialogTips("确认撤回?").then(() => {
          this.$http.post(this.baseApi + '/api/customservice/carrier/cancelApplyCarry', { applyCarryId: row.applyCarryId }).then(res => {
            this.$message.success("撤回成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      /*
        选择及分页事件处理
      */
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
  .datepicker{
    display: inline-block;
    width: 132px;
  }
  .btn-row {
    margin-bottom: 20px;
  }

  .dialog-footer {
    text-align: center;
    padding: 20px 0;
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
