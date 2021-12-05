<template>
  <el-page ref="configFeeList">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'? languageSource.CommonLang.add :child.action==='edit'? languageSource.CommonLang.edit : languageSource.CommonLang.view) + languageSource.CommonPayLang.configurationFee" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="0px" inline>

            <el-row>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.transUnitType" prop="transUnitType" label-width="160px">
                  <el-select v-model="child.transUnitType" prop="transUnitType">
                    <el-option v-for="item in source.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.unitName" prop="unitName" label-width="160px">
                  <el-input v-model="child.unitName" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>
            <el-row>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.rechargeAccountNum" prop="rechargeAccount" label-width="160px">
                  <el-input v-model="child.rechargeAccount"></el-input>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.remitAmount" prop="chargeAmount" label-width="160px">
                  <el-input v-model="child.chargeAmount"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>

            <el-row>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.exportBank" prop="payBankName" label-width="160px">
                  <el-input v-model="child.payBankName"></el-input>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.exportAccount" prop="payBankAccount" label-width="160px">
                  <el-input v-model="child.payBankAccount"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>

            <el-row>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.importBank" prop="receiveBankName" label-width="160px">
                  <el-input v-model="child.receiveBankName"></el-input>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.importAccount" prop="receiveBankAccount" label-width="160px">
                  <el-input v-model="child.receiveBankAccount"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>
            <el-row>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.remitDate" prop="chargeDate" label-width="160px">
                  <el-date-picker v-model="child.chargeDate" type="date" value-format="yyyy-MM-dd hh:mm:ss" :placeholder="languageSource.CommonPayLang.selectDate"></el-date-picker>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.currency" prop="currency" label-width="160px">
                  <el-select v-model="child.currency" prop="currency" :disabled="true">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-col>
            </el-row>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="child.action !=='view'" type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{languageSource.CommonLang.confirm}}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{languageSource.CommonLang.cancel}}</el-button>
        </div>
      </el-dialog>
      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.configFeeRegList" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.unitName" label-width="150px" prop="unitName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.unitName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.billNo" label-width="150px" prop="billNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="shortclass" v-model="forms.billNo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery" v-if="right('configFeeListQuery')">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" @click="onResetQuery" v-if="right('configFeeListReset')">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.registerDate" prop="chargeDate">
            <el-date-picker v-model="forms.chargeDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonPayLang.startDate" :end-placeholder="languageSource.CommonPayLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column :label="languageSource.CommonPayLang.unitName" prop="unitName" width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.billNo" prop="billNo" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.transUnitType" prop="transUnitType" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.type,value)}" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.rechargeAccountNum" prop="rechargeAccount" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.registerDate" width="200px" prop="chargeDate" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.remitAmount" prop="chargeAmount" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.currency" prop="currency" align="center" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(options,value)}" sortable="custom"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.projectType" prop="chargeProject" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.projectTypes,value)}" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.exportBank" prop="payBankName" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.exportAccount" prop="payBankAccount" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.importBank" prop="receiveBankName" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.importAccount" prop="receiveBankAccount" min-width="200px" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.registerPerson" prop="creatorName" min-width="150px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="150px" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" @click="editList(scope.row,'id', 'child', api.getbyid)" v-if="right('configFeeListEdit')">{{ languageSource.CommonLang.edit }}</el-button>
                <el-button type="text" @click="deleteData(scope.row)" v-if="right('configFeeListDelete')">{{ languageSource.CommonLang.delete }}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "configFeeList",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "configFeeList",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/recharge/prereceiveRecords/getSingleById",
        get: kindo.config.api.unifiedCollectUrl + "/api/recharge/prereceiveRecords/getListPage", //kindo.config.api.baseUrl + 
        delete: kindo.config.api.unifiedCollectUrl + "/api/recharge/prereceiveRecords/deleteById",
        update: kindo.config.api.unifiedCollectUrl + "/api/recharge/prereceiveRecords/saveOrUpdate"   //kindo.config.api.baseUrl + 
      },
      forms: {
        unitName: "",
        billNo: "",
        chargeDate: "",
        chargeProject: "2"
      },
      formsRules: {},
      childVisible: false,
      child: {
        id: "",
        transUnitType: "",
        unitName: "",
        chargeProject: "2",
        chargeAmount: "",
        chargeDate: "",
        rechargeAccount: "",
        currency: "",
        payBankName: "",
        payBankAccount: "",
        receiveBankName: "",
        receiveBankAccount: ""
      },
      options: [],
      childRules: {},
      source: {
        projectTypes: [],
        type: []
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

    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    let checkRechargeAmount = (rule, value, callback) => {
      if (kindo.validate.pNumerical(value)) {
        if (value < 0 || value > 999999999) {
          return callback(new Error(this.languageSource.CommonPayLang.pleaseEnterNum));
        }
        if (value.toString().indexOf(".") >= 0 && value.toString().split(".")[1].length > 2) {
          return callback(new Error(this.languageSource.CommonPayLang.maxTwoDecimalPlaces));
        }
        this.ruleForm.chargeAmount = Math.floor(value * 100) / 100;
        return callback();
      } else {
        return callback(new Error(this.languageSource.CommonPayLang.pleaseEnterNum));
      }
    };

    this.formsRules = {
      unitName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.unitName, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      billNo: [
        { required: false, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.billNo, trigger: "blur" },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ]
    };

    this.childRules = {
      rechargeAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.rechargeAccountNum, trigger: 'blur' },
        { pattern: kindo.validate.pattern.bankCard, message: this.languageSource.CommonPayLang.onlyPositiveNum, trigger: 'blur' }
      ],
      chargeAmount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.remitAmount, trigger: 'blur' },
        { validator: checkRechargeAmount, trigger: "blur" }
      ],
      payBankName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.exportBank, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      payBankAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.exportAccount, trigger: 'blur' },
        { pattern: kindo.validate.pattern.bankCard, message: this.languageSource.CommonPayLang.onlyPositiveNum, trigger: 'blur' }
      ],
      receiveBankName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.importBank, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      receiveBankAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.importAccount, trigger: 'blur' },
        { pattern: kindo.validate.pattern.bankCard, message: this.languageSource.CommonPayLang.onlyPositiveNum, trigger: 'blur' }
      ],
      chargeDate: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.remitDate, trigger: 'blur' }
      ],
      unitName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.unitName, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      currency: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.currency, trigger: 'blur' }
      ],
      transUnitType: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.transUnitType, trigger: 'blur' }
      ]
    };

    this.options = [{ value: "1", label: this.languageSource.CommonPayLang.renminbi }];
    this.source.type = [{ value: "1", label: this.languageSource.CommonPayLang.provincialTradingGrp }, { value: "2", label: this.languageSource.CommonPayLang.centralTradingGrp }, { value: "3", label: this.languageSource.CommonPayLang.businessUnit }];
    this.source.projectTypes = [{ value: "1", label: this.languageSource.CommonLang.boothFee }, { value: "2", label: this.languageSource.CommonLang.configurationFee }];
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    deleteData(row) {
      this.child.action = 'delete';
      kindo.util.confirm(this.languageSource.CommonPayLang.deleteWarning, undefined, undefined, () => {
        this.$http.postJson(this.api.delete, { id: row.id }).then((res) => {
          kindo.util.alert(this.languageSource.CommonLang.deleteSuccess, this.languageSource.CommonLang.tips, 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    onQuery() {
      this.$refs.table.loadData();
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.forms.chargeProject = "2";

      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    // 保存提交数据
    diagsave() {
      this.$refs.child.validate(valid => {
        if (valid) {
          let url = "";
          if (this.child.action === 'add') {
            url = this.api.add;
          } else if (this.child.action === 'edit') {
            url = this.api.update;
          }
          this.$http.postJson(url, this.child).then(res => {
            this.childVisible = false;
            this.$refs.table.reloadData();
            kindo.util.alert(this.languageSource.CommonPayLang.dataSaveSuccess, "success");
          });
        }
      });
    }
  },
  watch: {
    "forms.prepareStartTime"(v) {
      this.forms.prepareStartTime = kindo.util.formatDate(v);
    },
    "forms.prepareEndTime"(v) {
      this.forms.prepareEndTime = kindo.util.formatDate(v);
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
.el-table__body {
  .el-table__row {
    .el-button {
      padding: 0 2px;
    }
  }
}
</style>