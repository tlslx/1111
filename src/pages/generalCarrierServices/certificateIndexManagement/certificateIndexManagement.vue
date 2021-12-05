/**
* @file 广交会-证件指标管理
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">证件指标管理</span></p>
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
        border
        style="width: 100%;">

        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="70">
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
            <router-link :to="{ path: '/carrierCmInfoDetail', query: { carrierId: scope.row.carrierId, enterRouter: '/certificateIndexManagement' }}">{{scope.row.carrierName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="oneCarCard"
          label="一期车证"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="twoCarCard"
          label="二期车证"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="threeCarCard"
          label="三期车证"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="serviceCardQuota"
          label="驻会服务证"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="arrangeCardQuota"
          label="搬运证"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCarCertificateDialog(scope.row, scope.$index)">车证分配</el-button>
            <el-button type="text" size="mini" @click="openPersonCertificateDialog(scope.row, scope.$index)">人证分配</el-button>
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

    <!--车证分配-->
    <el-dialog title="车证分配" width="450px" :visible.sync="carCertificateDialog" :close-on-click-modal="false">
      <el-form :model="carCertificateNumber" class="demo-form-inline" :rules="rules" style="margin-right: 15px" label-width="100px">
        <el-form-item label="一期车证:" size="small" prop="oneCarCard">
          <el-input maxlength="10" v-model.trim="carCertificateNumber.oneCarCard" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="二期车证:" size="small" prop="twoCarCard">
          <el-input maxlength="10" v-model.trim="carCertificateNumber.twoCarCard" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="三期车证:" size="small" prop="threeCarCard">
          <el-input maxlength="10" v-model.trim="carCertificateNumber.threeCarCard" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="sendCarCertificateRequest()">确认</el-button>
        <el-button @click="carCertificateDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!--人证分配-->
    <el-dialog title="车证分配" width="450px" :visible.sync="personCertificateDialog" :close-on-click-modal="false">
      <el-form :model="personCertificateNumber" class="demo-form-inline" :rules="rules" style="margin-right: 15px" label-width="100px">
        <el-form-item label="驻会服务证:" size="small" prop="arrangeCardQuota">
          <el-input maxlength="10" v-model.trim="personCertificateNumber.serviceCardQuota" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="搬运证:" size="small" prop="serviceCardQuota">
          <el-input maxlength="10" v-model.trim="personCertificateNumber.arrangeCardQuota" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="sendPersonCertificateRequest()">确认</el-button>
        <el-button @click="personCertificateDialog = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "certificateIndexManagement",
    data() {
      const validateNumber = (rule, value, callback) => {
        let number = /^[0-9]\d*$/;
        if (!number.test(value)) {
          return callback(new Error("请输入大于0的整数"));
        } else {
          return callback();
        }
      };
      return {
        listDatas: [],
        listTotal: 0,
        carCertificateDialog: false,
        personCertificateDialog: false,

        imageUrl: '',
        fileList: [],
        carCertificateNumber: {
          exhibitionSession: '',
          oneCarCard: '',
          twoCarCard: '',
          threeCarCard: '',
          carrierId: ''
        },
        personCertificateNumber: {
          exhibitionSession: '',
          carrierId: '',
          arrangeCardQuota: '',
          serviceCardQuota: ''
        },
        ruleForm: {
          exhibitionSession: '',
          companyName: '',
          current: 1,
          size: 10
        },
        rules: {
          oneCarCard: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          twoCarCard: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          threeCarCard: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          arrangeCardQuota: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          serviceCardQuota: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
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
      this.searchForumList();
    },
    methods: {
      getCurrentSession() {
        this.$http.get(this.baseApi3 + '/api/exp/exhibitions/current').then(res => {
          this.currentExhibitionSession = res.exhibitionNum;
          this.currentYear = res.exhibitionYear;
          this.ruleForm.exhibitionSession = res.exhibitionNum;
          // 表单的默认展届值
          this.carCertificateNumber.exhibitionSession = res.exhibitionNum;
          this.personCertificateNumber.exhibitionSession = res.exhibitionNum;
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
        this.$http.get(this.baseApi + '/api/customservice/carrier/listCardQuota', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.current = 1;
        this.ruleForm.companyName = '';
        this.ruleForm.exhibitionSession = this.currentExhibitionSession;
      },
      // 重置搜索表单
      resetPersonCertificate() {
        for (let item in this.personCertificateNumber) {
          this.personCertificateNumber[item] = '';
        }
      },
      // 重置搜索表单
      resetCarCertificate() {
        for (let item in this.carCertificateNumber) {
          this.carCertificateNumber[item] = '';
        }
      },
      openCarCertificateDialog(row, index) {
        this.resetCarCertificate();
        this.carCertificateDialog = true;
        this.carCertificateNumber.exhibitionSession = this.currentExhibitionSession;
        this.carCertificateNumber.carrierId = row.carrierId;
        this.carCertificateNumber.oneCarCard = row.oneCarCard;
        this.carCertificateNumber.twoCarCard = row.twoCarCard;
        this.carCertificateNumber.threeCarCard = row.threeCarCard;
      },
      openPersonCertificateDialog(row, index) {
        this.resetPersonCertificate();
        this.personCertificateDialog = true;
        this.personCertificateNumber.exhibitionSession = this.currentExhibitionSession;
        this.personCertificateNumber.carrierId = row.carrierId;
        this.personCertificateNumber.arrangeCardQuota = row.arrangeCardQuota;
        this.personCertificateNumber.serviceCardQuota = row.serviceCardQuota;
      },
      // 车证分配
      sendCarCertificateRequest() {
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveParkLotQuota', this.carCertificateNumber).then(res => {
          this.$message.success("车证分配成功!");
          this.carCertificateDialog = false;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 人证分配
      sendPersonCertificateRequest() {
        this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveManCardQuota', this.personCertificateNumber).then(res => {
          this.$message.success("人证分配成功!");
          this.personCertificateDialog = false;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
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

  .table {

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

