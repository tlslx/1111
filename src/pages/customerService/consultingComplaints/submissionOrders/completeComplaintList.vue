/**
 * @file 完成投诉报障列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="完成投诉报障列表" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="咨询投诉类型：">
          <el-select v-model="queryForm.consultationComplaintType" clearable>
            <el-option label="咨询" value="1"></el-option>
            <el-option label="投诉" value="2"></el-option>
            <el-option label="保障" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="queryForm.consultationStatus" clearable>
            <el-option v-for="item in consultationStatusOps" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table border :data="listByCondition" v-loading="loading">
        <el-table-column label="序号" prop="sequenceNum" align="center"></el-table-column>
        <el-table-column label="咨询投诉类型" prop="consultationComplaintType" align="center"></el-table-column>
        <el-table-column label="联系电话" prop="contactNumber" align="center"></el-table-column>
        <el-table-column label="电子邮箱" prop="email" align="center"></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <el-table-column label="问题描述" prop="problemDescription" align="center"></el-table-column>
        <el-table-column label="状态" prop="consultationStatus" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="detailUser(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form :inline="true" class="search-form-inline" style="margin-top:60px">
        <el-form-item>
          <el-button type="warning" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
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
      consultationComplaintTypes: [],
      consultationStatusOps: [],
      syntheticMaterialName: '',
      exhibitionNumber: '',
      syntheticMaterialSpecifications: '',
      queryForm: {
        consultationComplaintType: '',
        consultationStatus: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListByCondition(this.completeComplaintQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('submissionOrders', ['listByCondition']),
    completeComplaintQuery() {
      return {
        consultationComplaintType: this.queryForm.consultationComplaintType,
        consultationStatus: this.queryForm.consultationStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  methods: {
    ...mapActions('submissionOrders', ['selectListByCondition']),
    detailUser(row) {
      console.log(row.counselingComplainId, "222");
      this.$router.push({
        path: '/userComplaintsDetail',
        // name: 'userComplaintsDetail',
        query: {
          id: row.counselingComplainId
        }
      });
    },
    handleAdd() {
      this.$router.push("/fillComplaintConsultation");
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
      this.selectListByCondition(this.completeComplaintQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
</style>












