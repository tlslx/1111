<template>
  <el-page ref="viewBadgeAuditStatus">
    <template slot="header">
      <kindo-box :title="source.language.viewAuditStatus"></kindo-box>
    </template>
    <template slot="body">
      <!--回执弹窗-->
      <receipt-dialog ref="receiptDialog" :receiptForm="viewReceiptForm" :language="source.language"></receipt-dialog>
      <!--审核状态表数据-->
      <kindo-table ref="badgeStatusTable" :url="api.get" :queryParam="form">
        <el-table-column prop="applyUserName" :label="source.language.nameTable" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="createDate" :label="source.language.applicationTime" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="exhibitionPeriod" :label="source.language.numberOfPeriods" :formatter="periodFormat" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="feeType" :label="source.language.numberOfDays" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="effectStartDate" :label="source.language.startingTime" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="feeLevel" :label="source.language.feeLevel" :formatter="feeLevelFormat" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="totalPrice" :label="source.language.cost" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="status" :label="source.language.auditStatus" :formatter="statusFormat" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column :label="source.language.operation" fixed="right" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="onRepeal(scope.row)" v-if="(scope.row.status === 'SUBMITTED'|| scope.row.status === 'BU_APPROVED' || scope.row.status ==='BC_APPROVED')">{{source.language.repeal}}</el-button>
            <!-- <el-button type="text" @click="onEdit(scope.row)" v-if="scope.row.status === 'SUBMITTED'">修改</el-button> -->
            <el-button type="text" @click="onView(scope.row)" v-else-if="(scope.row.status ==='BC_APPROVED' || scope.row.status ==='SETTLE' || scope.row.status ==='MADE' || scope.row.status ==='SENT')">{{source.language.viewReceipt}}</el-button>
            <!-- <el-button type="text" @click="onResubmit(scope.row)" v-if="scope.row.status === 'BU_REJECTED'">重新提交</el-button> -->
            <span v-else>-</span>
          </template>
        </el-table-column>
      </kindo-table>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  // name: "viewBadgeAuditStatus",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "viewBadgeAuditStatus",
      api: {
        get: kindo.config.api.importExbUrl + "/api/BmMcApply/getListPage",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        revoke: kindo.config.api.importExbUrl + "/api/BmMcApply/revokeQuotaApply",
        update: kindo.config.api.importExbUrl + "/api/BmMcApply/updateQuotaApply",
        resubmit: kindo.config.api.importExbUrl + "/api/BmMcApply/toResubmitQuotaApply"
      },
      viewStatusForm: {
        idcardNo: ""
      },
      source: {
        language: {},
        //审核状态
        statusOptions: [],
        periodOptions: [],
        feeLevelOptions: []
      },
      viewReceiptForm: {}, //查看回执表单
      dialogVisible: false,
      //当前登录的用户信息
      currentUserInfo: {
        userId: ""
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.viewStatusForm
      };
    }
  },
  async created() {
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    // 审核状态
    this.source.statusOptions = await kindo.dictionary.get('badge_audit_status');
    this.viewStatusForm.idcardNo = this.$route.query.idcardNo;

    this.source.periodOptions = [{
      label: this.source.language.phaseOneTable,
      value: "1"
    }, {
      label: this.source.language.phaseTwoTable,
      value: "2"
    }, {
      label: this.source.language.phaseThreeTable,
      value: "3"
    }];
    this.source.feeLevelOptions = [{
      label: this.source.language.firstGear,
      value: "1"
    }, {
      label: this.source.language.secondGear,
      value: "2"
    }, {
      label: this.source.language.thirdGear,
      value: "3"
    }, {
      label: this.source.language.fourthGear,
      value: "4"
    }, {
      label: this.source.language.fifthGear,
      value: "5"
    }];
  },
  mounted() {
    this.$nextTick(function () {
      this.getCurrentUserInfo();
    });
  },
  methods: {
    //  审核状态过滤显示
    //  1.SUBMITTED：业务部门待审核，2.BU_REJECTED：业务部门审核不通过，3.BU_APPROVED：业务部门审核通过，4.SETTLE：已结算
    //  5.BC_APPROVED：证件中心审核通过，6.BC_REJECTED：证件中心审核不通过，7.SENT：已发证，8.REVOKE_AUDIT：撤销待审核
    //  9.REVOKE: 已撤销， 10.MADE：已制证
    statusFormat(row) {
      let statusLabel = row.status;
      for (let i = 0; i < this.source.statusOptions.length; i++) {
        if (this.source.statusOptions[i].value === row.status) {
          statusLabel = this.source.statusOptions[i].label;
        }
      }
      return statusLabel;
    },
    //期数过滤显示
    periodFormat(row) {
      let exhibitionPeriodLabel = row.exhibitionPeriod;
      for (let i = 0; i < this.source.periodOptions.length; i++) {
        if (this.source.periodOptions[i].value === row.exhibitionPeriod) {
          exhibitionPeriodLabel = this.source.periodOptions[i].label;
        }
      }
      return exhibitionPeriodLabel;
    },
    //档位过滤显示
    feeLevelFormat(row) {
      let feeLevelLabel = row.feeLevel;
      for (let i = 0; i < this.source.feeLevelOptions.length; i++) {
        if (this.source.feeLevelOptions[i].value === row.feeLevel) {
          feeLevelLabel = this.source.feeLevelOptions[i].label;
        }
      }
      return feeLevelLabel;
    },
    //获取当前用户信息
    getCurrentUserInfo() {
      let params = {
        json: {
          customQueryParams: {
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getUserInfo, params).then(res => {
        this.currentUserInfo = res;
        this.viewStatusForm.idcardNo = this.currentUserInfo.idCardNo;
        this.onQuery();
      }, err => {

        this.onQuery();
      });
    },
    onQuery() {
      if (!this.viewStatusForm.idcardNo) {
        this.$message({
          type: "warning",
          message: "暂无申请记录"
        });
      }
      this.$refs.badgeStatusTable.loadData();
    },
    onRepeal(row) {
      let params = {
        status: "REVOKE",
        applyId: row.applyId,
        userId: this.currentUserInfo.userId,
        exhibitionPeriod: row.exhibitionPeriod,
        feeLevel: row.feeLevel,
        effectStartDate: row.effectStartDate,
        feeType: row.feeType,
        idcardNo: row.idcardNo
      };
      let promptMessage = this.source.language.repealPrompt;
      if (row.status === "BU_APPROVED") {
        promptMessage = this.source.language.departmentMessage;
      } else if (row.status === "BC_APPROVED") {
        promptMessage = this.source.language.centerMessage;
      }
      this.$confirm(promptMessage, this.source.language.repealReminder, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.postJson(this.api.revoke, params).then(res => {
          this.$refs.badgeStatusTable.reloadData();
          this.$message({
            type: 'success',
            message: this.source.language.repealSuccess
          });
        });
      });
    },
    // onEdit(row) {
    //   let params = {
    //     isEnterpriseEdit: true,
    //     name: row.applyUserName,
    //     idcardNo: row.idcardNo,
    //     applyId: row.applyId,
    //     exhibitionPeriod: row.exhibitionPeriod,
    //     feeLevel: row.feeLevel,
    //     feeType: row.feeType,
    //     effectStartDate: row.effectStartDate,
    //     badgeFeeLkId: row.badgeFeeLkId,
    //     idCardFrontPhotoUrl: row.idCardFrontPhotoUrl,
    //     takeBadgeAddr: row.takeBadgeAddr,
    //     idCardBackPhotoUrl: row.idCardBackPhotoUrl,
    //     badgePhotoUrl: row.badgePhotoUrl
    //   };
    //   //跳转个人申请页面
    //   this.$router.push({
    //     path: '/personalUserBadgeApplication',
    //     query: {
    //       params
    //     }
    //   });
    // },
    //查看回执
    onView(row) {
      this.$refs.receiptDialog.dialogVisible = true;
      this.viewReceiptForm = {
        takeBadgeAddr: row.takeBadgeAddr,
        applyUserName: row.applyUserName,
        idcardNo: row.idcardNo,
        feeType: row.feeType,
        createDate: row.createDate,
        feeLevel: row.feeLevel,
        applyId: row.applyId
      };
    }
    // //重新提交
    // onResubmit(row) {
    //   let params = {
    //     status: "BU_APPROVED",
    //     applyId: row.applyId,
    //     userId: "c414d726e8a64f66af80bef51ce6qyqy",
    //     exhibitionPeriod: row.exhibitionPeriod,
    //     feeLevel: row.feeLevel,
    //     effectStartDate: row.effectStartDate,
    //     feeType: row.feeType
    //   };
    //   this.$http.postJson(this.api.resubmit, params).then(res => {
    //     this.$refs.badgeStatusTable.reloadData();
    //   });
    // }
  },
  components: {
    "receiptDialog": () => import("./components/receiptDialog.vue")
  }
};
</script>
<style>
</style>

