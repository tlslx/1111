<template>
  <div ref="applyRecord">
    <kindo-box>
      <kindo-table ref="applyRecordTable" :url="api.get" :queryParam="form">
        <el-table-column prop="dealDate" :label="language.reviewTime" show-overflow-tooltip :formatter="thinkTime" min-width="120"></el-table-column>
        <el-table-column prop="cooperationAgencyName" :label="language.agencyName" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="reviewStatus" :label="language.auditStatus" show-overflow-tooltip :formatter="verifyStatus" min-width="120"></el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>

<script>
export default {
  name: "applyRecord",
  props: {
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      pageId: "applyRecord",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/getFeedbackRecordList",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser"
      },
      loading: false,
      forms: {},
      paginationInfo: {},
      //当前登录的用户信息
      currentUserInfo: {}
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  mounted() {
    this.$nextTick(function () {
      //获取当前登录用户信息
      this.getCurrentUserInfo();
    });
    this.$root.$on("refreshApplyTable", refresh => {
      if (refresh) {
        this.onQuery();
      }
    });
  },
  methods: {
    thinkTime(row) {
      if (row.applyStatus === 2) {
        return row.dealDate;
      } else {
        return row.adminAuditDate;
      }
    },
    verifyStatus(row) {
      if (row.adminAuditStatus === 1 && row.applyType === 1 && row.applyStatus === 1) {
        return this.language.pass;
      } else if (row.applyType === 1 && (row.applyStatus === 2 || row.adminAuditStatus === 2)) {
        return this.language.notPassing;
      }
    },
    onQuery() {
      this.$refs.applyRecordTable.loadData();
    },
    //获取当前用户信息
    getCurrentUserInfo() {
      let params = {
        json: {
          customQueryParams: {},
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getUserInfo, params).then(res => {
        this.currentUserInfo = res;
        this.forms.enterpriseId = this.currentUserInfo.enterpriseId;
        this.onQuery();
      });
    }
  }
};
</script>

<style>
</style>
