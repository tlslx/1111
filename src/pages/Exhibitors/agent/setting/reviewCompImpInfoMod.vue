/*
* @file 审核企业重要信息修改
* @author: weiwei
* @date:2019/6/10
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业重要信息修改" name="first">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="queryForm.companyName"></el-input>
        </el-form-item>

        <el-form-item label="初审审核状态" prop="approveStatus">
          <el-select  placeholder="请选择" v-model="queryForm.approveStatus">
            <el-option  v-for="item in reviewStatusOneArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="复审审核状态" prop="finalApproveStatus">
          <el-select placeholder="请选择" v-model="queryForm.finalApproveStatus" :disabled="this.queryForm.approveStatus !== 2">
            <el-option v-for="item in reviewStatusTwoArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleListQuery">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="coHistoryListData.records" border>
        <el-table-column prop="companyNameEn" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="applyModifyTime" label="申请修改时间" align="center"></el-table-column>
        <el-table-column prop="status" label="审核状态" align="center"></el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row.historyModifyId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page = pageInfoData.currentPage
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="prev, pager, next, jumper"
          :total="coHistoryListData.total">
        </el-pagination>
      </el-row>

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      pageInfoData: { currentPage: 1, pageSize: 10 },
      reviewStatusOneArr: [
        { value: 0, label: '未审核' }, { value: 1, label: '不通过' }, { value: 2, label: '审核通过' }
      ],
      reviewStatusTwoArr: [
        { value: 0, label: '未审核' }, { value: 1, label: '不通过' }, { value: 2, label: '审核通过' }
      ],
      queryForm: {
        companyName: '', approveStatus: '', finalApproveStatus: ''
      }
    };
  },
  computed: {
    ...mapGetters('settingReview', ['coHistoryListData']),
    queryParams() {
      let obj = this.queryForm;
      obj.current = this.pageInfoData.currentPage;
      obj.size = this.pageInfoData.pageSize;
      obj.orderByField = 'ihm.create_date';
      obj.isAsc = false;
      return obj;
    },
    approveStatus() {
      return this.queryForm.approveStatus;
    }
  },
  watch: {
    approveStatus() {
      this.queryForm.finalApproveStatus = '';
    }
  },
  created() {
    this.getCoHistoryList(this.queryParams); // 查询
  },
  methods: {
    ...mapActions('settingReview', ['getCoHistoryList']),
    handleListQuery() {
      this.getCoHistoryList(this.queryParams); // 查询
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getCoHistoryList(this.queryParams); // 查询
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getCoHistoryList(this.queryParams); // 查询
    },
    handleDetail(_historyModifyId) {
      this.$router.push({
        path: "/compImpInfoModDetail",
        query: {
          historyModifyId: _historyModifyId
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
