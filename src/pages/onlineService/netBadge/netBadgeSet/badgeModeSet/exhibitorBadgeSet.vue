<template>
  <div class="exhibitorBadgeSetBox">
    <kindo-box title="交易团参展商证件限制模式管理">
      <kindo-box>
        <el-form :model="form" inline label-width="80px" size="small" label-position="right">
          <el-form-item label="交易团:">
            <el-select v-model="form.selectTrade" placeholder="" clearable filterable>
              <el-option v-for="item in tradeOptions" :key="item.id" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTradeRestrictIndexList" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </kindo-box>
    <kindo-box>
      <kindo-table ref="tradeTableData" :height="'630px'" :url="api.getTradeRestrictIndexList" :queryParam="getQueryParam">
        <el-table-column label="交易团" prop="orgName" align="center" min-width="80"></el-table-column>
        <el-table-column label="参展商证件限制模式" prop="indexJudgeType" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.indexJudgeType==='ORG'?'按交易团名额指标限制':'按企业名额指标限制'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有权自主设置" prop="selfSetting" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.selfSetting==='1'?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有权调整企业指标" prop="modifyEnterpriseIndex" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.modifyEnterpriseIndex==='1'?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" class="btnUnderline" @click="edit(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>
    <el-dialog title="修改参展商证件限制模式" :visible.sync="editDialog" width="50%">
      <el-form :model="eidtForm" label-position="right" label-width="220px" style="">
        <el-form-item label="交易团：">
          <el-input v-model="eidtForm.orgName" disabled class="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="参展商证限制方式：">
          <el-radio-group v-model="eidtForm.indexJudgeType">
            <el-radio :label="'COM'">按企业名额指标限制</el-radio>
            <el-radio :label="'ORG'">按交易团名额指标限制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否有权自主更改限制模式：">
          <el-radio-group v-model="eidtForm.selfSetting">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'2'">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否有权调整企业指标：">
          <el-radio-group v-model="eidtForm.modifyEnterpriseIndex">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'2'">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog=false">关闭</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/badgeModeSet/exhibitorBadgeSet",
      api: {
        // getTradeInfo: 'http://10.28.124.108:9001/api/tradeRestrict/getTradeInfo',
        // getTradeRestrictIndexList: 'http://10.28.124.108:9001/api/tradeRestrict/getTradeRestrictIndexList',
        // updateTradeRestrictIndex: 'http://10.28.124.108:9001/api/tradeRestrict/updateTradeRestrictIndex'
        getTradeInfo: kindo.config.api.osUrl + '/api/tradeRestrict/getTradeInfo',
        getTradeRestrictIndexList: kindo.config.api.osUrl + '/api/tradeRestrict/getTradeRestrictIndexList',
        updateTradeRestrictIndex: kindo.config.api.osUrl + '/api/tradeRestrict/updateTradeRestrictIndex'
      },
      queryParam: {
        queryParam: {}
      },
      editDialog: false,
      eidtForm: {},
      cuurentRow: '',
      form: {
        selectTrade: ''
      },
      tradeOptions: [],
      tradeTableData: []
    };
  },
  methods: {
    edit(scope) {
      console.log(scope);
      this.eidtForm = scope.row;
      this.cuurentRow = scope.row;
      this.editDialog = true;
    },
    submit() {
      const eidtForm = Object.assign({}, this.eidtForm);
      console.log('eidtForm:', eidtForm);
      this.$http.postJson(this.api.updateTradeRestrictIndex, eidtForm)
        .then(res => {
          console.log(res);
          if (res.sign) {
            kindo.util.alert('操作成功');
          } else {
            kindo.util.alert('操作失败', '', 'warning');
          }
          this.editDialog = false;
          this.$refs.tradeTableData.reloadData();
        })
        .catch(err => {
          this.editDialog = false;
          console.error(err);
        });
    },
    closedEditDialog() { },
    getTradeInfo() {
      this.$http.get(this.api.getTradeInfo)
        .then(res => {
          res.forEach(r => {
            this.tradeOptions.push({
              id: r.deptId,
              value: r.deptId,
              label: r.deptName
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    getTradeRestrictIndexList() {
      this.$refs.tradeTableData.loadData();
    }
  },
  mounted() {
    this.getTradeInfo();
    this.getTradeRestrictIndexList();
  },
  created() {

  },
  computed: {
    getQueryParam() {
      return {
        queryParams: {
          id: this.form.selectTrade
        }
      };
    }
  }
};
</script>

<style lang="less" scoped>
.exhibitorBadgeSetBox {
  .btnUnderline {
    text-decoration: underline;
  }
  .inputWidth {
    width: 280px;
  }
}
</style>
