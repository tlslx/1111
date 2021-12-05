/**
* @file 承运商-车证申请列表
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">承运商车证申请列表</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option v-for="(exhibition,index) in exhibitionSessions" :key="index" :label="'第' + exhibition.exhibitionNum + '届'"
                     :value="exhibition.exhibitionNum"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期数" size="mini">
        <el-select v-model="ruleForm.exhibitionPeriod" placeholder="请选择">
          <el-option label="第一期" value="0"></el-option>
          <el-option label="第二期" value="1"></el-option>
          <el-option label="第三期" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车证类型" size="mini">
        <el-select v-model="ruleForm.cardType" placeholder="请选择">
          <el-option label="筹展车证" value="0"></el-option>
          <el-option label="撤展车证" value="1"></el-option>
          <el-option label="叉车证" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.applyStatus" placeholder="请选择">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核不通过" value="2"></el-option>
          <el-option label="审核中" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" @click="resetRuleForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" @click="openAddpage()">新增</el-button>
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
          width="50">
        </el-table-column>

        <el-table-column
          prop="exhibitionSession"
          label="届数"
          align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.exhibitionSession}}届</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="exhibitionPeriod"
          label="期数"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.exhibitionPeriod === '0'">第一期</span>
            <span v-if="scope.row.exhibitionPeriod === '1'">第二期</span>
            <span v-if="scope.row.exhibitionPeriod === '2'">第三期</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车证类型"
          align="center"
          width="220">
          <template slot-scope="scope">
            <span v-if="scope.row.cardType === '0'">筹展车证</span>
            <span v-if="scope.row.cardType === '1'">撤展车证</span>
            <span v-if="scope.row.cardType === '2'">叉车证</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="applyStatus"
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus === '0'">待审核</span>
            <span v-else-if="scope.row.applyStatus === '3'">审核通过</span>
            <span v-else-if="scope.row.applyStatus === '2'">审核不通过</span>
            <span v-else-if="scope.row.applyStatus === '1'">审核中</span>
            <span v-else>审核中</span>
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
            <el-button type="text" v-else :disabled="true" size="mini" @click="cancelCertificate(scope.row, scope.$index)">撤销办证</el-button>
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

    <el-dialog title="车证信息" width="700px" :visible.sync="carCertificateDetailDialog" :close-on-click-modal="false">
      <div v-for="(addCertificateForm, index) in addCertificateForms" :key="index">
        <div v-if="index !== 0" style="width: 100%;height: 1px;margin-bottom: 15px;background-color: #c1c1c1"></div>
        <el-row class="item">
          <el-col :span="12">
            <span class="itemtitle">驾驶员姓名:</span>
            <span class="content">{{addCertificateForm.driverName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">驾驶员电话:</span>
            <span class="content">{{addCertificateForm.driverPhone}}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="itemtitle">身份证号:</span>
            <span class="content">{{addCertificateForm.driverIdCard}}</span>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">车牌号码:</span>
            <span class="content">{{addCertificateForm.plateNumber}}</span>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="12">
            <span class="itemtitle">货车(车长):</span>
            <span class="content">{{addCertificateForm.carLeader}}米</span>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">车证时间:</span>
            <span class="content">{{addCertificateForm.cardDate}}</span>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="12">
            <span class="itemtitle">行驶证照片:</span>
            <img :src="showImg(addCertificateForm.runLicenseImage)" @click="showImgDialog(addCertificateForm.runLicenseImage)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">驾驶证照片:</span>
            <img :src="showImg(addCertificateForm.driverLicenseImage)" @click="showImgDialog(addCertificateForm.driverLicenseImage)" class="img"/>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="12">
            <span class="itemtitle">司机头像照片:</span>
            <img :src="showImg(addCertificateForm.driverImage)" @click="showImgDialog(addCertificateForm.driverImage)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">身份证照片:</span>
            <img :src="showImg(addCertificateForm.idCardImage)" @click="showImgDialog(addCertificateForm.idCardImage)" class="img"/>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">
            <span class="itemtitle">车险照片:</span>
            <img :src="showImg(addCertificateForm.carInsuranceImage)" @click="showImgDialog(addCertificateForm.carInsuranceImage)" class="img"/>
          </el-col>
          <el-col :span="12" >
            <span class="itemtitle" v-if="cardType === '2'">出厂合格证:</span>
            <img v-if="cardType === '2'" :src="showImg(addCertificateForm.passCertificate)" @click="showImgDialog(addCertificateForm.passCertificate)" class="img"/>
          </el-col>
        </el-row>
        <el-row class="item" v-if="cardType === '2'">
          <el-col :span="12">
            <span class="itemtitle">特种使用登记证:</span>
            <img :src="showImg(addCertificateForm.registrationCertificate)" @click="showImgDialog(addCertificateForm.registrationCertificate)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">检验报告和检验合格标记:</span>
            <img :src="showImg(addCertificateForm.testReport)" @click="showImgDialog(addCertificateForm.testReport)" class="img"/>
          </el-col>
        </el-row>
        <el-row class="item" v-if="cardType === '2'">
          <el-col :span="12">
            <span class="itemtitle">特种作业人员证:</span>
            <img :src="showImg(addCertificateForm.operationCard)" @click="showImgDialog(addCertificateForm.operationCard)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">保险:</span>
            <img :src="showImg(addCertificateForm.insurance)" @click="showImgDialog(addCertificateForm.insurance)" class="img"/>
          </el-col>
        </el-row>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="carCertificateDetailDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" width="550px">
      <img style="width: 100%;height: 360px"  :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import imageMagnify from "@/components/project/common/imageMagnify";
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "carrierCarApplyList",
    mixins: [dialogMixin],
    components: {
      imageMagnify
    },
    data() {
      return {
        listDatas: [],
        listTotal: 0,
        carCertificateDetailDialog: false,
        dialogVisible: false,
        dialogImageUrl: '',

        ruleForm: {
          exhibitionSession: '125',
          exhibitionPeriod: '',
          cardType: '',
          applyStatus: '',
          current: 1,
          size: 10
        },
        cardType: '0',
        addCertificateForms: [],
        rules: {

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
      // 下载回持
      downLoadReturnReceipt(row, index) {

      },
      /*
        搜索及条件重置
      */
      searchForumList(flag) {
        // 分页重置
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/carrier/listVehicleCard', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      showImgDialog(path) {
        this.dialogVisible = true;
        this.dialogImageUrl = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
      },
      showImg(path) {
        let url = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
        return url;
      },
      getDetailById(vehicleCardId) {
        this.$http.get(this.baseApi + '/api/customservice/carrier/adminGetVehicleCard', { vehicleCardId: vehicleCardId }).then(res => {
          let deepClone = JSON.stringify(res);
          this.addCertificateForm = JSON.parse(deepClone);
        }).catch(error => {
          this.$message.error(error);
        });
      },
      cancelCertificate(row, index) {
        this.showDialogTips("确认撤销?").then(() => {
          this.$http.post(this.baseApi + '/api/customservice/carrier/cancelVehicleCard', { vehicleCardId: row.vehicleCardId }).then(res => {
            this.$message.success("撤销成功!");
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.exhibitionSession = this.currentExhibitionSession;
        this.ruleForm.exhibitionPeriod = '';
        this.ruleForm.cardType = '';
        this.ruleForm.applyStatus = '';
        this.ruleForm.current = 1;
      },
      openUpdateDialog(row, index) {
        this.$router.push({ path: '/carrierCarApplyDetail', query: { vehicleCardId: row.vehicleCardId }});
      },
      openAddpage() {
        this.$router.push({ path: '/carrierCarApplyDetail' });
      },
      lookUpCertificateInfo(row, index) {
        this.addCertificateForms = row.cardDetailList;
        this.cardType = row.cardType;
        this.carCertificateDetailDialog = true;
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
        // for (let i = 0, length = val.length; i < length; i++) {
        //
        // }
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
  .btn-row {
    margin-bottom: 20px;
  }
  .dialog-footer {
    text-align: center;
    padding: 20px 0;
  }
  .img{
    height: 50px;
    width: 90px;
  }
  .item{
    margin: 25px 0;
  }
  .itemtitle{
    display: inline-block;
    width: 120px;
    vertical-align: top;
    text-align: right;
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

