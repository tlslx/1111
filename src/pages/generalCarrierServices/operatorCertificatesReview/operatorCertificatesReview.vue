
/**
* @file 经办人人证申请审核
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">经办人人证申请审核</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option v-for="(exhibition,index) in exhibitionSessions" :key="index" :label="'第' + exhibition.exhibitionNum + '届'"
                     :value="exhibition.exhibitionNum"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="承运商" size="mini">
        <el-input v-model.trim="ruleForm.carrierName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="人证类型" size="mini">
        <el-select v-model="ruleForm.cardType" placeholder="请选择">
          <el-option label="搬运证" value="01"></el-option>
          <el-option label="驻会服务证" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.applyStatus" placeholder="请选择">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核不通过" value="2"></el-option>
          <el-option label="科长审核通过" value="3"></el-option>
          <el-option label="科长审核不通过" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" @click="resetRuleForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button :disabled="canReviewBtn" type="primary" @click="handleMuitlReviewPass()">审核通过</el-button>
      <el-button :disabled="canReviewBtn" type="primary" @click="handleMuitlReviewNoPass()">不通过</el-button>
      <el-button :disabled="canOneKeyBtn" type="primary" @click="handleCertificate()">一键办证</el-button>
      <el-button type="primary" @click="exportApplyList()">导出</el-button>
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
          prop="carrierName"
          label="承运商"
          width="150"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{ path: '/carrierCmInfoDetail', query: { carrierId: scope.row.carrierId, enterRouter: '/operatorCertificatesReview' }}">{{scope.row.carrierName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          width="190"
          align="center">
        </el-table-column>
        <el-table-column
          label="人证类型"
          align="center"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.cardType === '01' ? '搬运证' : '驻会服务证'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="160"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus === '0'">待审核</span>
            <span v-if="scope.row.applyStatus === '1'">审核通过</span>
            <span v-if="scope.row.applyStatus === '2'">审核不通过</span>
            <span v-if="scope.row.applyStatus === '3'">科长审核通过</span>
            <span v-if="scope.row.applyStatus === '4'">科长审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="240">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.applyStatus === '0'" size="mini" @click="handleSingleReviewPass(scope.row, scope.$index)">通过</el-button>
            <el-button type="text" v-else-if="scope.row.applyStatus === '4'" size="mini" @click="handleSingleReviewPass(scope.row, scope.$index)">通过</el-button>
            <el-button type="text" v-else :disabled="true" size="mini" @click="handleSingleReviewPass(scope.row, scope.$index)">通过</el-button>

            <el-button type="text" v-if="scope.row.applyStatus === '0'" size="mini" @click="handleSingleReviewNoPass(scope.row, scope.$index)">不通过</el-button>
            <el-button type="text" v-else-if="scope.row.applyStatus === '4'" size="mini" @click="handleSingleReviewNoPass(scope.row, scope.$index)">不通过</el-button>
            <el-button type="text" v-else :disabled="true" size="mini" @click="handleSingleReviewNoPass(scope.row, scope.$index)">不通过</el-button>

            <el-button type="text" v-if="scope.row.applyStatus === '3'" size="mini" @click="cancelCertificate(scope.row, scope.$index)">撤销办证</el-button>
            <el-button type="text" v-else  :disabled="true" size="mini" @click="cancelCertificate(scope.row, scope.$index)">撤销办证</el-button>
            <el-button type="text" size="mini" @click="lookUpCertificateInfo(scope.row, scope.$index)">详情</el-button>
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

    <el-dialog title="人证信息" width="450px" :visible.sync="seeCertificateDialog" :close-on-click-modal="false">
      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">证件类型:</span>
        </el-col>
        <el-col :span="17">
          <span>{{certificateDetail.cardType === '01' ? '搬运证' : '驻会服务证'}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">姓名:</span>
        </el-col>
        <el-col :span="17">
          <span>{{certificateDetail.name}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">身份证号:</span>
        </el-col>
        <el-col :span="17">
          <span>{{certificateDetail.idCard}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">证件照片:</span>
        </el-col>
        <el-col :span="17">
          <img :src="showImg(certificateDetail.cardImage)" @click="showImgDialog(certificateDetail.cardImage)" class="img">
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">身份证照片:</span>
        </el-col>
        <el-col :span="17">
          <img :src="showImg(certificateDetail.idCardImage)" @click="showImgDialog(certificateDetail.idCardImage)" class="img">
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">附件:</span>
        </el-col>
        <el-col :span="17">
          <a style="display: block" target="_blank" v-for="(attachment,index) in certificateDetail.attachmentList" :key="index" :href="showImg(attachment.filePath)">{{attachment.fileName}}</a>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button type="primary" @click="seeCertificateDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!--驳回原因弹窗-->
    <el-dialog title="驳回原因" :visible.sync="noPassResonDialog" class="formProduct" :close-on-click-modal="false" :append-to-body="true">
      <el-form :model="resonForm" :rules="rules" ref="resonForm">
        <el-form-item label-width="0" prop="auditContent" style="margin: 0 10px">
          <el-input v-model.trim="resonForm.auditContent" type="textarea" maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" style="margin-top: 10px">
        <el-button type="primary" @click="sendNoPassRequest()">确 定</el-button>
        <el-button @click="noPassResonDialog = false">取 消</el-button>
        <el-button @click="resetResonForm()">重 置</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" width="550px">
      <img style="width: 100%;height: 360px"  :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "operatorCertificatesReview",
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

        seeCertificateDialog: false,
        noPassResonDialog: false,
        dialogVisible: false,
        dialogImageUrl: '',

        canReviewBtn: true,
        canOneKeyBtn: true,

        manCardIds: [],
        canReviewIds: [],
        otherStatusIds: [],
        onKeyCertificateId: [],

        resonForm: {
          nodeId: '',
          auditContent: ''
        },

        ruleForm: {
          exhibitionSession: '',
          carrierName: '',
          cardType: '',
          applyStatus: '0',
          current: 1,
          size: 10
        },
        certificateDetail: {},
        rules: {
          auditContent: [
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
      showImgDialog(path) {
        if (path !== '' && path != null) {
          this.dialogVisible = true;
          this.dialogImageUrl = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
        }
      },
      showImg(path) {
        let url = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
        return url;
      },
      /*
        搜索及条件重置
      */
      searchForumList(flag) {
        // 分页重置
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/carrier/listAuditManCardFirst', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      resetResonForm() {
        this.resonForm.auditContent = '';
      },
      /*
        顶部操作按钮
      */
      // 审核通过
      handleSingleReviewPass(row, index) {
        this.showDialogTips("确认审核通过?").then(() => {
          this.sendPassRequest(row.manCardId);
        }).catch(() => {});
      },
      handleMuitlReviewPass() {
        if (this.otherStatusIds.length > 0) {
          this.$message.warning("包含不能进行此操作的选项，请重新选择!");
          return;
        }
        this.showDialogTips("确认审核通过?").then(() => {
          this.sendPassRequest(this.canReviewIds.join());
        }).catch(() => {});
      },
      handleSingleReviewNoPass(row, index) {
        this.noPassResonDialog = true;
        this.resonForm.nodeId = row.manCardId;
        this.resetResonForm();
        if (this.$refs.resonForm !== undefined) {
          this.$refs.resonForm.resetFields();
        }
      },
      handleMuitlReviewNoPass() {
        if (this.otherStatusIds.length > 0) {
          this.$message.warning("包含不能进行此操作的选项，请重新选择!");
          return;
        }
        if (this.canReviewIds.length > 1) {
          this.$message.warning("只能选择其中一个选项进行操作，请重新选择!");
          return;
        }
        this.resonForm.nodeId = this.canReviewIds[0];
        this.noPassResonDialog = true;
        this.resetResonForm();
        if (this.$refs.resonForm !== undefined) {
          this.$refs.resonForm.resetFields();
        }
      },
      sendPassRequest(manCardIds) {
        this.$http.post(this.baseApi + '/api/customservice/carrier/passManCardFirst', { manCardIds: manCardIds }).then(res => {
          this.$message.success("操作成功!");
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      sendNoPassRequest() {
        this.$refs["resonForm"].validate((valid) => {
          if (valid) {
            this.$http.postJson(this.baseApi + '/api/customservice/carrier/rejectManCardFirst', this.resonForm).then(res => {
              this.$message.success("操作成功!");
              this.noPassResonDialog = false;
              this.searchForumList();
            }).catch(error => {
              this.$message.error(error);
            });
          }
        });
      },
      // 撤销办证
      cancelCertificate(row, index) {
        this.showDialogTips("确认撤销办证?").then(() => {
          this.$http.post(this.baseApi + '/api/customservice/carrier/revokeManCard', { manCardId: row.manCardId }).then(res => {
            this.$message.success("撤销办证成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      lookUpCertificateInfo(row, index) {
        for (let item in row) {
          this.certificateDetail[item] = row[item];
        }
        this.seeCertificateDialog = true;
      },
      // 下载回持
      downLoadReturnReceipt(row, index) {

      },
      // 一键办证
      handleCertificate() {

      },
      // 导出
      exportApplyList() {
        window.open(this.baseApi + '/api/customservice/carrier/exportManCard?exhibitionSession=' + this.currentExhibitionSession);
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.exhibitionSession = this.currentExhibitionSession;
        this.ruleForm.carrierName = '';
        this.ruleForm.cardType = '';
        this.ruleForm.applyStatus = '0';
        this.ruleForm.current = 1;
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
        this.canReviewIds = [];
        this.otherStatusIds = [];
        this.onKeyCertificateId = [];
        for (let i = 0, length = val.length; i < length; i++) {
          if (val[i].applyStatus === '0' || val[i].applyStatus === '4') {
            this.canReviewIds.push(val[i].manCardId);
          } else {
            this.otherStatusIds.push(val[i].manCardId);
          }
          if (val[i].applyStatus === '3') {
            this.onKeyCertificateId.push(val[i].manCardId);
          }
        }
        if (this.canReviewIds.length > 0) {
          this.canReviewBtn = false;
        } else {
          this.canReviewBtn = true;
        }
        if (this.onKeyCertificateId.length > 0) {
          this.canOneKeyBtn = false;
        } else {
          this.canOneKeyBtn = true;
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

  .img{
    height: 110px;
    width: 110px;
  }

  .item{
    margin: 20px 0;
  }
  .itemtitle{
    display: inline-block;
    vertical-align: top;
    width: 110px;
    text-align: right;
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
