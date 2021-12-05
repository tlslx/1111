<template>
  <el-page ref="applicationChannelControl">
    <template slot="header">
      <kindo-box :title="source.language.applicationChannelControl">
        <el-form :model="forms" :rules="applicationChannelControlRules" inline label-position="right">
          <el-form-item :label="source.language.enterpriseNameTable" prop="enterpriseName" label-width="90px">
            <el-input v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.enterpriseUniformCoding" prop="unifiedSocialCreditCode" label-width="110px">
            <el-input v-model="forms.unifiedSocialCreditCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>

    <template slot="body">
      <!--表数据-->
      <kindo-box>
        <kindo-table ref="applicationChannelControlTable" :url="api.get" :queryParam="form">
          <el-table-column prop="enterpriseName" :label="source.language.enterpriseNameTable" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="unifiedSocialCreditCode" :label="source.language.enterpriseCode" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column :label="source.language.status" min-width="150px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.greenChannel" :active-value=1 :inactive-value=0 active-color="#13ce66" @change="channelChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "applicationChannelControl",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "applicationChannelControl",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseUser/getEntInfoByParam",
        switchStatus: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseUser/auditGreenChannel"
      },
      forms: {},
      applicationChannelControlRules: {},
      source: {
        language: {}
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.applicationChannelControlTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.applicationChannelControlTable.reloadData();
      });
    },
    // 修改通道状态。打开：1，关闭：0
    channelChange(row) {
      let channelChangeTips = row.greenChannel === 1 ? this.source.language.open : this.source.language.shutDown;
      this.$confirm(this.source.language.channelChangeTipsA + channelChangeTips + this.source.language.channelChangeTipsB, this.source.language.prompt, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        let params = {
          enterpriseId: row.enterpriseId,
          greenChannel: row.greenChannel
        };
        this.$http.postJson(this.api.switchStatus, params).then(res => {
          this.$message({
            type: "success",
            message: row.greenChannel === 1 ? this.source.language.channelIsOpen : this.source.language.channelIsOff
          });
          this.$refs.applicationChannelControlTable.reloadData();
        }, err => {
          this.$message.error(err);
          this.$refs.applicationChannelControlTable.reloadData();
        });
      }).catch(() => {
        this.$refs.applicationChannelControlTable.reloadData();
        this.$message({
          type: 'info',
          message: this.source.language.operationCanceled
        });
      });
    }
  }
};
</script>
<style scoped>
</style>
