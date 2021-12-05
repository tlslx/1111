<template>
  <div ref="sendQuery">
    <kindo-box>
      <kindo-table ref="sendQueryTable" :url="uri" :queryParam="form">
        <el-table-column prop="cooperationAgencyName" :label="language.cooperationAgency" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="cooperationAgencyCode" :label="language.cooperationAgencyCode" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column prop="agencyTypeId" :label="language.cooperationAgencyType" :formatter="typeView" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column :label="language.operation" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="release(scope.row, scope.$index)" v-if="right('release')&&(((scope.row.applyType === 0 || scope.row.applyType === 1) && scope.row.adminAuditStatus === 1) || ((scope.row.applyType === 3 || scope.row.applyType === 4) && scope.row.adminAuditStatus === 0))">{{language.release}}</el-button>
            <div v-else-if="scope.row.applyStatus === 0 || (scope.row.applyStatus === 1 && scope.row.adminAuditStatus === 0)">
              <span>{{language.hasBeenSent}}</span>
              <el-button type="text" @click="repeal(scope.row, scope.$index, 3)" v-if="right('repeal')">{{language.repeal}}</el-button>
            </div>
            <el-button type="text" @click="sendRequest(scope.row, scope.$index)" v-else-if="right('sendRequest')">{{language.sendRequest}}</el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>

<script>
export default {
  name: "sendQuery",
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
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/getListPage",
        getRequest: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findOrgUser",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        sendRuquest: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/addAgencyOwnership",
        repeal: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/acceptAgencyOwnershipRequset",
        relieve: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/relieveAgencyOwnership"
      },
      queryParams: {},
      isSearchNow: false,
      source: {
        typeOptions: []
      },
      //当前登录的用户信息
      currentUserInfo: {},
      currentUrl: ""
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.queryParams
      };
    },
    uri: function () {
      return this.currentUrl;
    }
  },
  async created() {
    this.currentUrl = this.api.get;
    // 读取数据字典 合作机构类型
    this.source.typeOptions = await kindo.dictionary.get('typeOfCooInstitutions');
  },
  mounted() {
    this.$nextTick(function () {
      //获取当前登录用户信息
      this.getCurrentUserInfo();
    });
    this.$root.$on("onSearch", params => {
      if (params.isSearch) {
        this.queryParams = params.queryParams;
        this.isSearchNow = true;
        this.onQuery();
      }
    });
  },
  methods: {
    onQuery() {
      this.currentUrl = this.api.get;
      if (this.isSearchNow) {
        this.currentUrl = this.api.getRequest;
      }
      this.$nextTick(function () {
        this.$refs.sendQueryTable.loadData();
      });
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
        this.queryParams.enterpriseId = this.currentUserInfo.enterpriseId;
        this.onQuery();
      });
    },
    //类型
    typeView(row) {
      let typeLabel = "";
      for (let i = 0; i < this.source.typeOptions.length; i++) {
        if (this.source.typeOptions[i].value === row.agencyTypeId) {
          typeLabel = this.source.typeOptions[i].label;
          break;
        }
      }
      return typeLabel;
    },
    //  发送请求
    sendRequest(row, index) {
      let params = JSON.stringify({
        orgId: row.orgId,
        agencyTypeId: row.agencyTypeId,
        enterpriseId: this.currentUserInfo.enterpriseId,
        cooperationAgencyName: row.cooperationAgencyName,
        cooperationAgencyCode: row.cooperationAgencyCode,
        intentionEnterprise: row.intentionEnterprise
      });
      this.$http.postJson(this.api.sendRuquest, params).then(res => {
        this.isSearchNow = false;
        this.onQuery();
      }, err => {
        this.$message.error(err);
      }
      );
    },
    //  解除请求
    release(row, index) {
      let params = {
        id: row.id,
        applyType: 4,
        enterId: row.enterpriseId
      };
      this.$confirm(this.language.releaseTips, this.language.prompt, {
        confirmButtonText: this.language.confirm,
        cancelButtonText: this.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post(this.api.relieve, params).then(res => {
          this.onQuery();
          this.$message({
            type: 'success',
            message: this.language.releaseSuccess
          });
        }, err => {
          this.$message.error(err);
        });
      });
    },
    //  撤销请求
    repeal(row, index, status) {
      let params = {
        id: row.id,
        applyStatus: 3
      };
      this.$confirm(this.language.repealTips, this.language.prompt, {
        confirmButtonText: this.language.confirm,
        cancelButtonText: this.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.post(this.api.repeal, params).then(res => {
          this.onQuery();
          this.$message({
            type: 'success',
            message: this.language.repealSuccess
          });
        }, err => {
          this.$message.error(err);
        });
      });
    }
  }
};
</script>

<style>
</style>
