/**
 * @file 咨询投诉报障记录
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="咨询投诉报障记录" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="编号：">
          <el-select v-model="queryForm.counselingComplaintCode" clearable>
            <el-option v-for="item in counselingComplaintCodes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="queryForm.consultationComplaintType" clearable>
            <el-option v-for="item in consultationComplaintTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="queryForm.consultationStatus" clearable>
            <el-option v-for="item in consultationStatusOps" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAdd">创建</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="deriveExcel">导出Excel</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listByCondition" v-loading="loading">
        <el-table-column label="编号" prop="counselingComplaintCode" align="center"></el-table-column>
        <el-table-column label="类型" prop="consultationComplaintType" align="center"></el-table-column>
        <el-table-column label="状态" prop="consultationStatus" align="center"></el-table-column>
        <el-table-column label="来源" prop="source" align="center"></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <el-table-column label="问题描述" prop="problemDescription" align="center"></el-table-column>
        <el-table-column label="报障人" prop="name" align="center"></el-table-column>
        <el-table-column label="国家" prop="country" align="center"></el-table-column>
        <el-table-column label="语言" prop="language" align="center"></el-table-column>
        <el-table-column label="联系电话" prop="contactNumber" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="detailUser(scope.row)">详情</el-button>
            <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
            <el-button type="text" @click="replyUser(scope.row)">回复</el-button>
            <el-button type="text" @click="visitUser(scope.row)">回访</el-button>
            <el-button type="text" @click="dispatchUser(scope.row)">派工</el-button>
            <el-button type="text" @click="statementUser(scope.row)">结单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="listByCondition.total">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      counselingComplaintCodes: [], 
      consultationComplaintTypes: [], 
      consultationStatusOps: [], 
      queryForm: {
        counselingComplaintCode: '', 
        consultationComplaintType: '', 
        consultationStatus: '' 
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListByCondition(this.advisoryComplaintRecordQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('exhibitionToolManagement', ['listAll']),
    ...mapGetters('returnVisitorSatisfaction', ['listByCondition']),
    advisoryComplaintRecordQuery() {
      return {
        counselingComplaintCode: this.queryForm.counselingComplaintCode,
        consultationComplaintType: this.queryForm.consultationComplaintType,
        consultationStatus: this.queryForm.consultationStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  methods: {
    ...mapActions('returnVisitorSatisfaction', ['selectListByCondition', 'deleteWorkOrderInfo']),
    ...mapActions('submissionOrders', ['getExportExcel']),
    //详情
    detailUser(row) {
      console.log(row.complaintReportId, "222");
      this.$router.push({
        path: '/modifySheme',
        query: {
          id: row.complaintReportId
        }
      });
    },
    //修改
    modifyUser(row) {
      console.log(row.complaintReportId, "222");
      this.$router.push({
        path: '/modifySheme',
        query: {
          id: row.complaintReportId
        }
      });
    },
    //删除
    deleteUser(row) {
      let complaintReportId = row.complaintReportId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteWorkOrderInfo(complaintReportId).then(response => {
          _this.selectListByCondition(this.advisoryComplaintRecordQuery).then(response2 => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
          });
          _this.loading = false;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 回复
    replyUser(row) {
      console.log(row.complaintReportId, "222");
      this.$router.push({
        path: '/reply',
        query: {
          id: row.complaintReportId
        }
      });
    },
    // 回访
    visitCustomer(row) {
      console.log(row.complaintReportId, "222");
      this.$router.push({
        path: '/visitCustomer',
        query: {
          id: row.complaintReportId
        }
      });
    },
    // 派工
    dispatchUser(row) {
      console.log(row.complaintReportId, "222");
      this.$router.push({
        path: '/complaintAndReport',
        query: {
          id: row.complaintReportId
        }
      });
    },
    // 结单
    statementUser(row) {
      console.log(row.complaintReportId, "222");
      this.$router.push({
        path: '/statement',
        query: {
          id: row.complaintReportId
        }
      });
    },
    deriveExcel() {
      this.loading = true;
      this.getExportExcel().then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    handleAdd() {
      this.$router.push("/complaintAndReport");
    },
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.selectListByCondition(this.advisoryComplaintRecordQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>













