<template>
  <el-page ref="collectRecords">
    <template slot="header">
      <!-- 对话框 -->
      <el-dialog :title="languageSource.CommonPayLang.refuseReason" top="30px" :visible.sync="childVisible" width="50%">
        <kindo-box>
          <el-form class="form_class" :model="child" ref="child" label-position="right" label-width="80px" inline>
            <el-form-item :label="languageSource.CommonPayLang.refuseReason" prop="approveRemark">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.approveRemark" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item prop="id" hidden>
              <el-input v-model="child.id" class="inputclass" type="hidden"></el-input>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{languageSource.CommonLang.confirm}}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{languageSource.CommonLang.cancel}}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.paymentExamine" icon="fa-search">
        <el-form :model="forms" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.collection" prop="operatorAccount">
            <el-dropdown-list class="inputclass" :placeholder="languageSource.CommonLang.select" v-model="forms.operatorAccount" :url="api.getOperator" text-field="operatorName" value-field="id" :params="{OrderModelField: [{OrderByField: 'id',asc: true}]}" :allow-create="false" :filterable="true" :clearable="true"></el-dropdown-list>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.paymentNo" prop="handinFlowNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.handinFlowNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.examineState" prop="approveState">
            <el-select v-model="forms.approveState" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.paymentDate" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonLang.startDate" :end-placeholder="languageSource.CommonLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange" :pageIndex="pageIndex">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="handinFlowNo" :label="languageSource.CommonPayLang.paymentNo" width="150" align="center" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="userName" :label="languageSource.CommonPayLang.collection" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorGroup" :label="languageSource.CommonPayLang.group" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="upperAdmin" :label="languageSource.CommonPayLang.collectionAdmin" align="center" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="rechargeAccountAmount" :label="languageSource.CommonPayLang.advancePayment" align="center" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="cashAmount" :label="languageSource.CommonPayLang.cash" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="checkAmount" :label="languageSource.CommonPayLang.check" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="alipayAmount" :label="languageSource.CommonPayLang.alipay" align="center" width="80" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="wechartAmount" :label="languageSource.CommonPayLang.wechat" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankCardAmount" :label="languageSource.CommonPayLang.bankcard" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" :label="languageSource.CommonPayLang.refundAmount" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="handinAmount" :label="languageSource.CommonPayLang.collectAmount" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="remark" :label="languageSource.CommonPayLang.remark" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="languageSource.CommonPayLang.collectTime" width="180" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('forSure')" @click="enSure(scope.row)">{{languageSource.CommonLang.confirm}}</el-button>
                <el-button type="text" v-if="right('refused')" @click="refuse(scope.row)">{{languageSource.CommonPayLang.refuse}}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
          <div slot="control">
            <div class="button_class">
              <el-button icon="el-icon-plus" v-if="right('forSure')" @click="onInsure">{{languageSource.CommonLang.confirm}}</el-button>
            </div>
            <div class="button_class">
              <el-button icon="el-icon-plus" v-if="right('refused')" @click="onRefuse">{{languageSource.CommonPayLang.refuse}}</el-button>
            </div>
          </div>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import request from "@/scripts/framework/http";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "remitRecords",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "recordsReview",
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/handle/record/getListPage",
        getOperator: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/getAllList",
        updateStatus: kindo.config.api.unifiedCollectUrl + "/api/handle/record/updateStatus",
        ensureByIds: kindo.config.api.unifiedCollectUrl + "/api/handle/record/ensureByIds",
        refuseByIds: kindo.config.api.unifiedCollectUrl + "/api/handle/record/refuseByIds"
      },
      forms: {
        operatorAccount: "",
        handinFlowNo: "",
        approveState: "",
        createDate: ""
      },
      // 弹出框
      child: {
        id: "",
        approveRemark: ""
      },
      source: {
        approveStates: []
      },
      childVisible: false,
      multipleSelection: [],
      pageIndex: false
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
    this._child = Object.assign({}, this.child);
    this.languageSource.CommonPayLang = await kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.source.approveStates = [{ value: "1", label: this.languageSource.CommonPayLang.examined }, { value: "2", label: this.languageSource.CommonPayLang.unExamine }, { value: "3", label: this.languageSource.CommonPayLang.refused }];
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$refs.table.loadData();
        }
      });
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    onClick(row) {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    enSure(row) {
      kindo.util.confirm(this.languageSource.CommonPayLang.passRecord + "?", undefined, undefined, () => {
        this.$http.postJson(this.api.updateStatus, { id: row.id, approveState: 1 }).then((res) => {
          kindo.util.alert(this.languageSource.CommonPayLang.examineSuccess, this.languageSource.CommonLang.tips, 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    refuse(row) {
      this.childVisible = true;
      // 初始化数据
      this.$nextTick(function () {
        this.child = Object.assign({}, this._child);
        this.$refs['child'].resetFields();
        this.child.id = row.id;
      });
    },
    commonRequest(url, warningMsg) {
      var i;
      console.info(this.multipleSelection);
      if (this.multipleSelection.length) {
        let _this = this;
        for (i = 0; i < this.multipleSelection.length; i++) {
          this.multipleSelection[i].approveRemark = this.child.approveRemark;
        }
        _this
          .$confirm(this.languageSource.CommonPayLang.sureBatch + warningMsg + this.languageSource.CommonPayLang.yeah + "?", this.languageSource.CommonLang.tips, { type: "warning" })
          .then(() => {
            request
              .postJson(url, _this.multipleSelection)
              .then(data => {
                this.childVisible = false;
                _this.$message.success(this.languageSource.CommonPayLang.batch + warningMsg + this.languageSource.CommonPayLang.success + "!");
                _this.onResetQuery();
              })
              .catch(error => {
                _this.$message.error(this.languageSource.CommonPayLang.batch + warningMsg + this.languageSource.CommonPayLang.fail + "!");
              });
          });
      } else {
        this.$message({ message: this.languageSource.CommonPayLang.selectone });
      }
    },
    onInsure() {
      this.commonRequest(this.api.ensureByIds, this.languageSource.CommonPayLang.examine);
    },
    onRefuse() {
      this.childVisible = true;
      this.$nextTick(function () {
        this.child = Object.assign({}, this._child);
        this.$refs['child'].resetFields();
        this.child.id = "";
      });
    },
    diagsave() {
      var dataId = this.child.id;
      var approveRemark = this.child.approveRemark;
      if (dataId !== "") {
        kindo.util.confirm(this.languageSource.CommonPayLang.refuseRecord + "?", undefined, undefined, () => {
          this.$http.postJson(this.api.updateStatus, { id: dataId, approveState: 3, "approveRemark": approveRemark }).then((res) => {
            this.childVisible = false;
            kindo.util.alert(this.languageSource.CommonPayLang.refuseSuccess, this.languageSource.CommonLang.tips, 'success');
            this.$refs['table'].reloadData();
          });
        });
      } else {
        this.commonRequest(this.api.refuseByIds, this.languageSource.CommonPayLang.refuse);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shortclass {
  width: 140px !important;
  margin-right: 5px;
}
.inputclass {
  width: 160px !important;
}
.button_class {
  display: inline-block;
  margin-left: 10px;
}
</style>