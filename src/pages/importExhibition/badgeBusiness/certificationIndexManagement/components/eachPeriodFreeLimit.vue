<template>
  <kindo-box ref="eachPeriodFreeLimit">
    <!--修改上限总数弹窗-->
    <el-dialog :title="language.modifyLimitTotal" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
      <kindo-box>
        <el-form :model="eachPeriodFreeLimitForm" ref="eachPeriodFreeLimitForm" :rules="eachPeriodFreeLimitRules" label-position="right" label-width="120px">
          <el-form-item :label="language.period">
            <el-select v-model="eachPeriodFreeLimitForm.period" :placeholder="language.pleaseChoose" class="limitinput" :disabled="true">
              <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.limitNumber" prop="defaultCeiling" class="formitemclass">
            <el-input v-model="eachPeriodFreeLimitForm.defaultCeiling" class="limitinput"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onCancel">{{language.cancel}}</el-button>
            <el-button v-if="right('submit')" type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{language.confirm}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </el-dialog>

    <!--表数据-->
    <kindo-table ref="eachPeriodFreeLimitTable" :url="api.get" :queryParam="form" :pagination="false">
      <el-table-column prop="period" :label="language.numberOfPeriods" show-overflow-tooltip min-width="150" :formatter="periodFormat"></el-table-column>
      <el-table-column prop="defaultCeiling" :label="language.ceiling" show-overflow-tooltip min-width="150"></el-table-column>
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
  name: "eachPeriodFreeLimit",
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
      pageId: "eachPeriodFreeLimit",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiPeriodApplicationCeiling/getAllInfo",
        update: kindo.config.api.importExbUrl + "/api/infoIfiPeriodApplicationCeiling/updateInfo"
      },
      forms: {},
      source: {
        language: {},
        periodOptions: []
      },
      dialogVisible: false,
      eachPeriodFreeLimitForm: {},
      eachPeriodFreeLimitRules: {},
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
    var validateFixedInteger = (rule, value, callback) => {
      if (kindo.validate.fixedInteger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateFixedInteger));
      }
    };
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    this.eachPeriodFreeLimitRules = {
      defaultCeiling: [
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
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
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
    onQuery() {
      this.$refs.eachPeriodFreeLimitTable.loadData();
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.eachPeriodFreeLimitForm = {
        id: row.id,
        period: row.period,
        defaultCeiling: row.defaultCeiling
      };
      this.$nextTick(function () {
        this.$refs.eachPeriodFreeLimitForm.clearValidate();
      });
    },
    onSubmit() {
      let params = {
        id: this.eachPeriodFreeLimitForm.id,
        period: this.eachPeriodFreeLimitForm.period,
        defaultCeiling: this.eachPeriodFreeLimitForm.defaultCeiling
      };
      this.$refs.eachPeriodFreeLimitForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.update, params)
            .then(res => {
              this.isSubmitDisabled = false;
              this.dialogVisible = false;
              this.$refs.eachPeriodFreeLimitTable.loadData();
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
.limitinput {
  width: 380px;
}
.formitemclass {
  margin-bottom: 20px;
}
</style>

