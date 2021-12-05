<template>
  <el-page ref="EnterpriseInformationAudit">
    <template slot="header">
      <!--查询栏-->
      <template>
        <el-form :model="queryForm">
          <el-row>
            <el-form-col :span="6" label="公司名称：" prop="enterpriseName">
              <el-input v-model="queryForm.enterpriseName" size="small"></el-input>
            </el-form-col>
            <el-form-col
              :span="8"
              label="统一社会信用代码："
              prop="unifiedSocialCreditCode"
              label-width="150px"
            >
              <el-input v-model="queryForm.unifiedSocialCreditCode" size="small"></el-input>
            </el-form-col>
            <el-form-col :span="6" style="text-align:right;margin-left:-20px;">
              <el-button type="primary" @click="onQuery()">查询</el-button>
            </el-form-col>
          </el-row>
        </el-form>
      </template>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid
          ref="datagrid"
          :showCheckbox="false"
          :height="scope.height-8"
          :query-params="queryParams"
          row-key="id"
          data-url="/openapi/findModifyRecordByEnterpriseId"
        >
          <el-table-column prop="enterpriseName" label="申请企业" align="center"></el-table-column>
          <el-table-column
            prop="applyDate"
            align="center"
            label="申请时间"
            :formatter="formatDate"
            sortable="custom"
          ></el-table-column>
          <el-table-column prop="auditStatus" align="center" label="审核状态"></el-table-column>
          <el-table-column prop="applyContent" align="center" label="申请内容">
            <template>
              <el-popover trigger="click" placement="top">
                <el-form ref="form" :model="form">
                  <el-row>
                    <el-col :span=" 12">
                      <el-form-item label="企业名称" prop="enterpriseId" label-width="150px">
                        <el-input  placeholder="广州天宇机械有限公司"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="enterpriseId">
                        <el-input  placeholder="广州天宇机械"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="联系人姓名" prop="enterpriseId" label-width="150px">
                        <el-input  placeholder="李源"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="enterpriseId">
                        <el-input placeholder="李远"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">查看</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="auditor" align="center" label="审核人"></el-table-column>
          <el-table-column
            prop="auditDate"
            align="center"
            label="审核时间"
            :formatter="formatDate"
            sortable="custom"
          ></el-table-column>
          <el-table-column prop="approveState" align="center" label="状态">
            <template slot-scope="scope">
              <template v-if="scope.row.auditStatus==2">
                <el-tag type="warning">不通过</el-tag>
              </template>
              <template v-else-if="scope.row.auditStatus==1">
                <el-tag type="info">通过</el-tag>
              </template>
              <template v-else-if="scope.row.auditStatus==0">
                <el-tag type="success">待审核</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="remitNotes" align="center" label="操作" sortable="custom"></el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "EnterpriseInformationAudit",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "ucpRemitRecordsPage",
      dataView: "",
      queryParams: [],
      queryOptions: [],
      queryBillNum: "",
      queryForm: {
        enterpriseName: "",
        unifiedSocialCreditCode: ""
      },
      approveState: [
        { value: "", label: "全部" },
        { value: "1", label: "已审核" },
        { value: "2", label: "未审核" },
        { value: "3", label: "已驳回" }
      ],
      form: {

      }
    };
  },
  methods: {
    formatApproveState(row, column, cellValue, index) {
      if (cellValue === "1") {
        return "已审核";
      } else if (cellValue === "2") {
        return "未审核";
      } else if (cellValue === "3") {
        return "已驳回";
      } else {
        return "---";
      }
    },
    formatDate(row, column, cellValue, index) {
      let date = new Date(cellValue);
      return this.$utility.DateFormat(date, "yyyy-MM-dd");
    },
    onQuery(queryParams) {
      var tempQueryParams = [];
      this.pageQueryParams = queryParams;
      // tempQueryParams = tempQueryParams.concat(this.pageQueryParams);
      tempQueryParams = tempQueryParams.concat(this.customQueryParams);

      if (this.queryForm.queryBillNum) {
        tempQueryParams.push({
          Name: "enterpriseName",
          FindType: "LIKE",
          Values: [this.queryForm.enterpriseName]
        });
      }

      if (this.queryForm.queryApproveState) {
        tempQueryParams.push({
          Name: "unifiedSocialCreditCode",
          FindType: "LIKE",
          Values: [this.queryForm.unifiedSocialCreditCode]
        });
      }


      this.queryParams = tempQueryParams;
    }
  }
};
</script>
