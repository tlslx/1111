<template>
  <el-page ref="infoIfiEnterpriseUser">
    <template slot="header">
      <!--页面对话框-->
      <!-- <el-page-dialog ref="editpage" :page="editPage" data-grid="datagrid"></el-page-dialog> -->
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid
          ref="datagrid"
          :height="scope.height-8"
          :query-params="queryParams"
          row-key="id"
          data-url="/api/infoIfiModifyRecord/findCustomerModifyRecord/"
          delete-url="/api/infoIfiEnterpriseUser/deleteBatchIds"
        >
          <el-table-column align="center" prop="applyDate" label="申请日期:" sortable="custom"></el-table-column>

          <el-table-column
            align="center"
            prop="auditStatus"
            :formatter="formatApproveState"
            label="审核进度:"
            sortable="custom"
          ></el-table-column>

          <el-table-column align="center" :formatter="formatAuditState" prop="auditStatus" label="审核结果:" sortable="custom"></el-table-column>
          <el-table-column align="center" prop="auditOpinion" label="审核意见:" sortable="custom"></el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "infoIfiEnterpriseUser",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "infoIfiEnterpriseUserPage",
      // editpage,
      dataView: "",
      queryParams: [{ enterpriseId: "C000001" }],
      queryOptions: []
    };
  },
  // mounted: function() {
  //   let _this = this;
  //   this.$http
  //     .post("/api/infoIfiModifyRecord/findCustomerModifyRecord", {
  //       enterpriseId: "C000001"
  //     })
  //     .then(function(result) {
  //       _this.form = result.data;
  //     });
  // },
  methods: {
    formatAuditState(row, column, cellValue, index) {
      let state = { 0: "-", 1: "通过", 2: "不通过" };
      return state[cellValue];
    },
    formatApproveState(row, column, cellValue, index) {
      let state = { 0: "待审核", 1: "已审核", 2: "已审核" };
      return state[cellValue];
    }
  }
};
</script>
