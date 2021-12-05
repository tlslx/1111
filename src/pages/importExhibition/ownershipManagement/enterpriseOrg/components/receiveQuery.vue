<template>
  <div ref="receiveQuery">
    <kindo-box>
      <el-row>
        <el-col :span="6">
          <div class="table-tips">{{language.receiveQueryTips}}</div>
        </el-col>
      </el-row>
      <kindo-table ref="receiveQueryTable" :url="api.get" :queryParam="form">
        <el-table-column prop="cooperationAgencyName" :label="language.initiatorCooperationAgency" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="createDate" :label="language.invitationTime" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column :label="language.operation" fixed="right">
          <template slot-scope="scope">
            <el-button v-right.edit type="text" @click="accept(scope.row, scope.$index)" v-if="right('accept') && (scope.row.status !== language.accepted && scope.row.status !== language.rejected)">{{language.accept}}</el-button>
            <el-button v-right.edit type="text" @click="reject(scope.row, scope.$index)" v-if="right('reject') && (scope.row.status !== language.accepted && scope.row.status !== language.rejected)">{{language.notAccepted}}</el-button>
            <span v-if="scope.row.status === language.accepted">{{language.accepted}}</span>
            <span v-if="scope.row.status === language.rejected">{{language.rejected}}</span>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>

<script>
export default {
  name: "receiveQuery",
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
      pageId: "receiveQuery",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/getAcceptreQuestList",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        acceptOrNot: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/acceptAgencyOwnershipRequset",
        verifyRelevance: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/verifyRelevance"

      },
      loading: false,
      forms: {},
      receiveQueryTable: [],
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
    this.$root.$on("refreshReceiveTable", refresh => {
      if (refresh) {
        this.onQuery();
      }
    });
  },
  methods: {
    onQuery(page) {
      this.$refs.receiveQueryTable.loadData();
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
    },
    //  接受邀请
    accept(row, index) {
      let params = {
        json: {
          customQueryParams: {
            enterpriseId: this.currentUserInfo.enterpriseId
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$confirm(this.language.agencyAcceptTips, this.language.prompt, {
        confirmButtonText: this.language.confirm,
        cancelButtonText: this.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.get(this.api.verifyRelevance, params).then(result => {
          if (result.applyType === 0) {
            this.$http.post(this.api.acceptOrNot, { "id": row.id, "applyStatus": 1 }).then(res => {
              row.status = this.language.accepted;
              this.$refs.receiveQueryTable.internalData.splice(index, 1, row);
              this.$message({
                type: 'success',
                message: this.language.acceptSuccess
              });
            });
          } else if (result.applyType === 1) {
            this.$message({
              showClose: true,
              message: this.language.acceptError,
              type: "error"
            });
          }
        });
      });
    },
    reject(row, index) {
      let params = {
        id: row.id,
        applyStatus: 2
      };
      this.$http.post(this.api.acceptOrNot, params).then(res => {
        row.status = this.language.rejected;
        this.$refs.receiveQueryTable.internalData.splice(index, 1, row);
      });
    }
  }
};
</script>

<style>
.table-tips {
  color: red;
  margin-bottom: 5px;
}
</style>
