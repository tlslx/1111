/**
* @file 广交会-搬运服务记录
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">搬运服务记录</span></p>
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
    <template>
      <el-table
        ref="multipleTable"
        :data="listDatas"
        class="table"
        border>

        <el-table-column
          label="序号"
          type="index"
          fixed="left"
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
          prop="companyName"
          label="承运商"
          width="90"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showDetail(scope.row, scope.$index)">{{scope.row.companyName}}</el-button>
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
          prop="exhibitionPeriod"
          label="期数"
          width="90"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.exhibitionPeriod === 0">第一期</span>
            <span v-if="scope.row.exhibitionPeriod === 1">第二期</span>
            <span v-if="scope.row.exhibitionPeriod === 2">第三期</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="carrierId"
          label="承运商"
          align="center">
          <template slot-scope="scope">
            <span v-for="(carrier, index) in carriers" :key="index" v-if="carrier.carrierId === scope.row.carrierId ">{{carrier.carrierName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约日期"
          width="180"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.exhibitionPeriod === 0">一期</span>
            <span v-if="scope.row.exhibitionPeriod === 1">二期</span>
            <span v-if="scope.row.exhibitionPeriod === 2">三期</span>
            <span> {{ scope.row.appointDate }} {{ scope.row.appointTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="appraisal"
          label="企业评价"
          align="center">
        </el-table-column>
        <el-table-column
          prop="feedback"
          label="承运商评价"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus === '01'">待受理</span>
            <span v-if="scope.row.applyStatus === '02'">已受理</span>
            <span v-if="scope.row.applyStatus === '03'">不受理</span>
            <span v-if="scope.row.applyStatus === '04'">已完成</span>
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

    <el-dialog title="搬运申请详情" width="400px" :visible.sync="transportDetailDialog" :close-on-click-modal="false">
      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">届数:</span>
        </el-col>
        <el-col :span="17">
          <span>第{{transportDetail.exhibitionSession}}届</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">类型:</span>
        </el-col>
        <el-col :span="17">
          <span>{{transportDetail.carryPeriod === '0'? '筹展服务' : '撤展服务'}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">展位号:</span>
        </el-col>
        <el-col :span="17">
          <span>{{transportDetail.boothNumber}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">预约日期:</span>
        </el-col>
        <el-col :span="17">
          <span v-if="transportDetail.exhibitionPeriod === 0">一期</span>
          <span v-if="transportDetail.exhibitionPeriod === 1">二期</span>
          <span v-if="transportDetail.exhibitionPeriod === 2">三期</span>
          <span> {{ transportDetail.appointDate}} {{ transportDetail.appointTime }}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">承运商:</span>
        </el-col>
        <el-col :span="17">
          <span>{{transportDetail.carrierName}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">联系人:</span>
        </el-col>
        <el-col :span="17">
          <span>{{transportDetail.contactName}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">联系电话:</span>
        </el-col>
        <el-col :span="17">
          <span>{{transportDetail.contactMobile}}</span>
        </el-col>
      </el-row>

      <div class="dialog-footer">
        <el-button type="primary" @click="transportDetailDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "transportServiceList",
    data() {
      return {
        listDatas: [],
        listTotal: 0,
        carriers: [],
        transportDetailDialog: false,

        imageUrl: '',
        fileList: [],
        transportDetail: {},

        ruleForm: {
          exhibitionSession: '',
          carryPeriod: '',
          applyStatus: '',
          companyName: '',
          current: 1,
          size: 10
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
        this.$http.get(this.baseApi + '/api/customservice/carrier/listApplyCarryRecord', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      showDetail(row, index) {
        this.transportDetailDialog = true;
        this.transportDetail = row;
        this.getTransportDetail(row.applyCarryId);
      },
      getTransportDetail(applyCarryId) {
        this.$http.get(this.baseApi + '/api/customservice/carrier/getApplyCarryRecord', { applyCarryId: applyCarryId }).then(res => {
          this.transportDetail = res;
        }).catch(error => {
          this.$message.error(error);
        });
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
        this.ruleForm.companyName = '';
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
  .item{
    margin: 25px 0;
  }
  .itemtitle{
    display: inline-block;
    width: 100px;
    padding-right: 10px;
    vertical-align: center;
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

