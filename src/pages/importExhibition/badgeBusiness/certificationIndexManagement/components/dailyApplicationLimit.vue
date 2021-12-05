<template>
  <kindo-box ref="dailyApplicationLimit">
    <!--修改上限总数弹窗-->
    <el-dialog :title="language.modifyLimitTotal" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
      <kindo-box>
        <el-form :model="dailyApplyFrom" ref="dailyApplyFrom" :rules="dailyApplyFromRules" label-position="right" label-width="120px">
          <el-form-item :label="language.period" prop="period">
            <el-select v-model="dailyApplyFrom.period" :placeholder="language.pleaseChoose" class="dailyinput" :disabled="true">
              <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.dayNumber" prop="xst">
            <el-select v-model="dailyApplyFrom.xst" :placeholder="language.pleaseChoose" class="dailyinput" :disabled="true">
              <el-option v-for="item in source.daysOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.limitNumber" prop="ceiling" class="formitemclass">
            <el-input v-model="dailyApplyFrom.ceiling" class="dailyinput"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onCancel">{{language.cancel}}</el-button>
            <el-button v-if="right('submit')" type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{language.confirm}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </el-dialog>
    <!--表数据-->
    <kindo-table ref="dailyApplyLimitTable" :url="api.get" :queryParam="forms" :pagination="false" :span-method="mergeRowsMethod">
      <el-table-column prop="period" :label="language.numberOfPeriods" show-overflow-tooltip :formatter="periodFormat" min-width="150"></el-table-column>
      <el-table-column prop="xst" :label="language.numberOfDays" show-overflow-tooltip :formatter="daysFormat" min-width="150"></el-table-column>
      <el-table-column prop="ceiling" :label="language.ceiling" show-overflow-tooltip min-width="150"></el-table-column>
      <el-table-column :label="language.operation" min-width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="right('edit')" type="text" @click="onEdit(scope.row)">{{language.modify}}</el-button>
        </template>
      </el-table-column>
    </kindo-table>
  </kindo-box>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "dailyApplicationLimit",
  mixins: [listPageBase],
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
      pageId: "dailyApplicationLimit",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiDailyApplicationCeiling/getAllInfo",
        update: kindo.config.api.importExbUrl + "/api/infoIfiDailyApplicationCeiling/updateInfo"
      },
      forms: {},
      source: {
        language: {},
        periodOptions: [],
        daysOptions: []
      },
      dialogVisible: false,
      dailyApplyFrom: {}, // 每日申请上限表单
      dailyApplyFromRules: {},
      isSubmitDisabled: false // 提交按钮禁用
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
    var validateFixedInteger = (rule, value, callback) => {
      if (kindo.validate.fixedInteger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateFixedInteger));
      }
    };
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    this.dailyApplyFromRules = {
      ceiling: [
        { required: true, message: this.source.language.enterLimitNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ]
    };
    this.source.periodOptions = [{
      label: this.source.language.phaseOneTable,
      value: 1
    }, {
      label: this.source.language.phaseTwoTable,
      value: 2
    }, {
      label: this.source.language.phaseThreeTable,
      value: 3
    }];
    this.source.daysOptions = [{
      label: this.source.language.firstDay,
      value: 1
    }, {
      label: this.source.language.secondDay,
      value: 2
    }, {
      label: this.source.language.thirdDay,
      value: 3
    }, {
      label: this.source.language.fourthDay,
      value: 4
    }, {
      label: this.source.language.fifthDay,
      value: 5
    }];
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.dailyApplyLimitTable.loadData();
    },
    //期数过滤显示
    periodFormat(row) {
      let periodLabel = row.period;
      for (let i = 0; i < this.source.periodOptions.length; i++) {
        if (this.source.periodOptions[i].value === row.period) {
          periodLabel = this.source.periodOptions[i].label;
        }
      }
      return periodLabel;
    },
    //天数过滤显示
    daysFormat(row) {
      let daysLabel = row.xst;
      for (let i = 0; i < this.source.daysOptions.length; i++) {
        if (this.source.daysOptions[i].value === row.xst) {
          daysLabel = this.source.daysOptions[i].label;
        }
      }
      return daysLabel;
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.dailyApplyFrom = {
        id: row.id,
        period: row.period,
        xst: row.xst,
        ceiling: row.ceiling
      };
      this.$nextTick(function () {
        this.$refs.dailyApplyFrom.clearValidate();
      });
    },
    mergeRowsMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    onSubmit() {
      let params = {
        id: this.dailyApplyFrom.id,
        period: this.dailyApplyFrom.period,
        xst: this.dailyApplyFrom.xst,
        ceiling: this.dailyApplyFrom.ceiling
      };
      this.$refs.dailyApplyFrom.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.update, params)
            .then(res => {
              this.isSubmitDisabled = false;
              this.dialogVisible = false;
              this.$refs.dailyApplyLimitTable.loadData();
            }, err => {
              this.isSubmitDisabled = false;
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
.dailyinput {
  width: 380px;
}
.formitemclass {
  margin-bottom: 20px;
}
</style>
