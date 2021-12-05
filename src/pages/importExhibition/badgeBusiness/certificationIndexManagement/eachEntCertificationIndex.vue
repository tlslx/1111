<template>
  <el-page ref="eachEntCertificationIndex">
    <template slot="header">
      <!--查看、调整指标弹框-->
      <el-dialog :title="formTitleId" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
        <kindo-box>
          <el-form :model="indexForm" ref="indexForm" :rules="indexFormRules" :inline-message="true" label-position="right" label-width="120px">
            <el-form-item :label="source.language.enterpriseName">
              <el-input v-model="indexForm.enterpriseName" :disabled="true" class="indexinput"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.period">
              <el-select v-model="indexForm.period" :placeholder="source.language.pleaseChoose" class="indexinput" :disabled="true">
                <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <!--档位表-->
              <el-table ref="levelNameTable" :data="levelNameTable" border v-loading="loading" max-height="400" class="indexinput">
                <el-table-column prop="levelName" align="center" :label="source.language.feeLevel" min-width="100" :formatter="levelNameFormat"></el-table-column>
                <el-table-column prop="adjustNumber" align="center" :label="source.language.number" min-width="100">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.adjustNumber" v-if="!isFormView" class="inputclass"></el-input-number>
                    <span v-else>{{scope.row.adjustNumber}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item v-if="!isSubmitDisabled">
              <el-button @click="onCancel">{{source.language.cancel}}</el-button>
              <el-button v-if="right('submit')" type="primary" @click="onSubmit">{{source.language.confirm}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>

      <kindo-box :title="source.language.eachEntCertificationIndex">
        <el-form :model="forms" ref="eachEntCertificateForm" inline :rules="eachEntCertificateRules" @submit.native.prevent @keyup.enter.native="onQuery" label-position="right">
          <el-form-item :label="source.language.numberOfPeriods" label-width="60px">
            <el-select v-model="forms.period" clearable :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.enterpriseNameTable" label-width="90px" prop="enterpriseName">
            <el-input v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.enterpriseNo" label-width="90px" prop="enterpriseNo">
            <el-input v-model="forms.enterpriseNo" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>

    <template slot="body">
      <kindo-box>
        <kindo-table ref="eachEntCertificateTable" :url="api.get" :queryParam="form">
          <el-table-column prop="enterpriseName" :label="source.language.enterpriseNameTable" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="period" :label="source.language.numberOfPeriods" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column :label="source.language.details" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-button v-if="right('view')" type="text" @click="onView(scope.row)">{{source.language.view}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="total" :label="source.language.totalIndex" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="remainder" :label="source.language.availableIndex" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column :label="source.language.operation" min-width="100">
            <template slot-scope="scope">
              <el-button v-if="right('adjust')" type="text" @click="adjust(scope.row)">{{source.language.adjustment}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '@/scripts/framework/store';
export default {
  name: "eachEntCertificationIndex",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "eachEntCertificationIndex",
      store,
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseQuotaAdjustRecord/getListPage",
        getPriceName: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseQuotaAdjustRecord/getEnterpriseOne",
        update: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseQuotaAdjustRecord/updateQuota"
      },
      forms: {
        period: "",
        enterpriseName: "",
        enterpriseNo: ""
      },
      source: {
        language: {},
        periodOptions: [],
        adjustmentTypeOptions: [{
          label: "临时",
          value: 2
        }, {
          label: "永久",
          value: 1
        }],
        levelNameOptions: []
      },
      eachEntCertificateRules: {},
      indexForm: {}, //查看，调整指标弹框表单
      indexFormRules: {},
      dialogVisible: false,
      formTitleId: "",
      isFormView: false,
      loading: false,
      levelNameTable: [], //档位表
      isSubmitDisabled: false
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
    this.indexFormRules = {
      adjustType: [
        { required: true, message: this.source.language.pleaseChoose, trigger: "change" }
      ]
    };
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
    this.source.levelNameOptions = [{
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
      this.onQuery();
    });
  },
  methods: {
    //档位过滤显示
    levelNameFormat(row) {
      let priceLabel = row.levelName;
      for (let i = 0; i < this.source.levelNameOptions.length; i++) {
        if (this.source.levelNameOptions[i].value === row.levelName) {
          priceLabel = this.source.levelNameOptions[i].label;
        }
      }
      return priceLabel;
    },
    onQuery() {
      this.$refs.eachEntCertificateTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.eachEntCertificateTable.reloadData();
      });
    },
    //查档位表
    onPriceNameQuery(enterpriseId, period, isAdjustIndex) {
      this.loading = true;
      let params = {
        json: {
          customQueryParams: {
            enterpriseId: enterpriseId,
            period: period
          },
          page: {
            current: false,
            size: false
          }
        }
      };
      this.$http.get(this.api.getPriceName, params).then(
        ({ records, current, total, size }) => {
          let priceNameObj = records[0].quota;
          let priceArr = [];
          for (let item in priceNameObj) {
            priceArr.push({
              levelName: item,
              adjustNumber: isAdjustIndex ? 0 : priceNameObj[item]
            });
          }
          this.levelNameTable = priceArr;
          //数组复制
          this._levelNameTable = JSON.parse(JSON.stringify(this.levelNameTable));
          this.loading = false;
        },
        err => {
          this.$message.error(err);
          this.loading = false;
        }
      );
    },
    onView(row) {
      this.isFormView = true;
      this.dialogVisible = true;
      this.isSubmitDisabled = true;
      this.formTitleId = this.source.language.viewIndex;
      this.indexForm = {
        id: row.enterpriseId,
        enterpriseName: row.enterpriseName,
        period: row.period
      };
      // 查档位表
      this.onPriceNameQuery(row.enterpriseId, row.period);
    },
    adjust(row) {
      this.isFormView = false;
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.formTitleId = this.source.language.adjustIndex;
      this.indexForm = {
        enterpriseId: row.enterpriseId,
        enterpriseName: row.enterpriseName,
        period: row.period,
        session: row.session
      };
      // 查档位表
      this.onPriceNameQuery(row.enterpriseId, row.period, true);
      this.$nextTick(function () {
        this.$refs.indexForm.clearValidate();
      });
    },
    onSubmit() {
      let params = [];
      for (let i = 0; i < this.levelNameTable.length; i++) {
        for (let j = 0; j < this._levelNameTable.length; j++) {
          //检测档位表数据变化，如果同一档位对应数量发生改变则下发该参数
          if (this.levelNameTable[i].levelName === this._levelNameTable[j].levelName) {
            //输入的数字是字符串格式，原数组存的是数字格式，转字符串进行比较
            if ((this.levelNameTable[i].adjustNumber + "") !== (this._levelNameTable[j].adjustNumber + "")) {
              params.push({
                enterpriseId: this.indexForm.enterpriseId,
                enterpriseName: this.indexForm.enterpriseName,
                period: this.indexForm.period,
                session: this.indexForm.session,
                adjustType: this.indexForm.adjustType,
                levelName: this.levelNameTable[i].levelName,
                adjustNumber: this.levelNameTable[i].adjustNumber
              });
              break;
            }
          }
        }
      }
      this.$refs.indexForm.validate(valid => {
        if (valid) {
          if (params.length > 0) {
            this.isSubmitDisabled = true;
            this.$http.postJson(this.api.update, params)
              .then(res => {
                this.isSubmitDisabled = false;
                this.dialogVisible = false;
                this.$refs.eachEntCertificateTable.loadData();
              }, err => {
                this.isSubmitDisabled = false;
                this.$message.error(err);
              });
          } else {
            this.dialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.dialogVisible = false;
      this.isSubmitDisabled = false;
    }
  }
};
</script>
<style scoped>
.indexinput {
  width: 400px;
}
.uploadclass {
  display: inline-block;
}
</style>

