<template>
  <el-page ref="customerTypeRuleSetting">
    <template slot="header">
      <!--修改规则对话框-->
      <el-dialog :title="source.language.modify" :close-on-click-modal="false" :visible.sync="dialogVisible" width="40%">
        <kindo-box>
          <el-form ref="customerTypeRuleSettingForm" :model="customerTypeRuleSettingForm" :rules="customerTypeRuleSettingRules" label-position="right" label-width="65px">
            <el-form-item :label="source.language.rules" prop="rulesContent" class="formitemclass">
              <el-input type="textarea" :rows="4" v-model="customerTypeRuleSettingForm.rulesContent" class="ruleclass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onCancel">{{source.language.cancel}}</el-button>
              <el-button v-if="right('edit')" type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{source.language.confirm}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>
      <kindo-box :title="source.language.customerTypeRuleSetting">
        <el-row>
          <el-col>
            <div class="ruleheaderclass">{{source.language.customerTypeA}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="ruleheaderclass">{{source.language.customerTypeB}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="ruleheaderclass">{{source.language.customerTypeC}}</div>
          </el-col>
        </el-row>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table ref="customerTypeRuleSettingTable" :url="api.get" :queryParam="form" :pagination="false">
          <el-table-column prop="period" :label="source.language.extension" :formatter="periodFormat" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="rulesContent" :label="source.language.rulesTable" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column :label="source.language.operation" fixed="right" align="center" min-width="150">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" :title="source.language.modify" @click="onEdit(scope.row)">{{source.language.modify}}</el-button>
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
  name: "customerTypeRuleSetting",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "customerTypeRuleSetting",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiActiveLabelRecord/getRulesList",
        update: kindo.config.api.importExbUrl + "/api/infoIfiActiveLabelRecord/updataRules"
      },
      forms: {},
      source: {
        language: {},
        periodOptions: []
      },
      dialogVisible: false,
      customerTypeRuleSettingForm: {}, // 客户类型规则设定表单
      customerTypeRuleSettingRules: {},
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
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    this.customerTypeRuleSettingRules = {
      rulesContent: [
        { required: true, message: this.source.language.enterRule, trigger: "blur" },
        { max: 500, message: this.source.language.badgeCostLength, trigger: "blur" }
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
    //展期过滤显示
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
      this.$refs.customerTypeRuleSettingTable.loadData();
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.customerTypeRuleSettingForm = {
        rulesId: row.rulesId,
        rulesContent: row.rulesContent,
        period: row.period
      };
      this.$nextTick(function () {
        this.$refs.customerTypeRuleSettingForm.clearValidate();
      });
    },
    onSubmit() {
      this.$refs.customerTypeRuleSettingForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.update, this.customerTypeRuleSettingForm)
            .then(res => {
              this.dialogVisible = false;
              this.isSubmitDisabled = false;
              this.$refs.customerTypeRuleSettingTable.loadData();
            }, err => {
              this.isSubmitDisabled = false;
              this.$alert(err, this.source.language.prompt, {
                confirmButtonText: this.source.language.iKnow,
                center: true
              });
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
.ruleclass {
  width: 80%;
}
.ruleheaderclass {
  height: 30px;
  line-height: 30px;
}
.formitemclass {
  margin-bottom: 20px;
}
</style>
