<template>
  <el-page ref="applicationDeadline">
    <template slot="header">
      <!--修改对话框-->
      <el-dialog :title="source.language.modify" :close-on-click-modal="false" :visible.sync="dialogVisible" width="40%">
        <kindo-box>
          <el-form :model="applicationDeadlineFrom" ref="applicationDeadlineFrom" :rules="applicationDeadlineRules" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="16" :offset="1">
                <div class="formtitle">{{applicationDeadlineFrom.timeType}}</div>
              </el-col>
            </el-row>
            <div v-if="!isBadgeApplicationDeadline">
              <el-form-item :label="source.language.domesticTradeBuyers" prop="domesticBuyers" class="formitemclass">
                <el-input v-model="applicationDeadlineFrom.domesticBuyers" class="applicationinput"></el-input>
              </el-form-item>
              <el-form-item :label="source.language.importBuyer" prop="importPurchaser" class="formitemclass">
                <el-input v-model="applicationDeadlineFrom.importPurchaser" class="applicationinput"></el-input>
              </el-form-item>
              <el-form-item :label="source.language.all" prop="allType" class="formitemclass">
                <el-input v-model="applicationDeadlineFrom.allType" class="applicationinput"></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item :label="source.language.domesticTradeBuyers" prop="deadlineDomesticBuyers" class="formitemclass">
                <el-input v-model="applicationDeadlineFrom.deadlineDomesticBuyers" class="applicationinput"></el-input>
              </el-form-item>
              <el-form-item :label="source.language.importBuyer" prop="deadlineImportPurchaser" class="formitemclass">
                <el-input v-model="applicationDeadlineFrom.deadlineImportPurchaser" class="applicationinput"></el-input>
              </el-form-item>
              <el-form-item :label="source.language.all" prop="deadlineAllType" class="formitemclass">
                <el-input v-model="applicationDeadlineFrom.deadlineAllType" class="applicationinput"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button @click="onCancel">{{source.language.cancel}}</el-button>
              <el-button type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{source.language.confirm}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>
      <kindo-box :title="source.language.applicationDeadline"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <!--表数据-->
        <kindo-box>
          <kindo-table ref="applicationDeadlineTable" :url="api.get" :queryParam="form" :pagination="false">
            <el-table-column prop="timeType" :label="source.language.timeType" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="domesticBuyers" :label="source.language.domesticBuyers" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="importPurchaser" :label="source.language.importPurchaser" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="allType" :label="source.language.allType" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column :label="source.language.operation" min-width="150px" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button v-if="right('edit')" type="text" :title="source.language.modify" @click="onEdit(scope.row)">{{source.language.modify}}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "applicationDeadline",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "applicationDeadline",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiCertificateApplicationDeadline/getAllInfo",
        update: kindo.config.api.importExbUrl + "/api/infoIfiCertificateApplicationDeadline/updateInfo"
      },
      forms: {},
      dialogVisible: false,
      applicationDeadlineFrom: {
        timeType: "",
        domesticBuyers: "",
        importPurchaser: "",
        allType: ""
      },
      source: {
        language: {}
      },
      applicationDeadlineRules: {},
      isSubmitDisabled: false, //提交按钮禁用
      isBadgeApplicationDeadline: false
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
    var validateBadgeDeadline = (rule, value, callback) => {
      if (kindo.validate.badgeDeadline(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateBadgeDeadline));
      }
    };
    var validateFixedInteger = (rule, value, callback) => {
      if (kindo.validate.fixedInteger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateFixedInteger));
      }
    };
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');

    this.applicationDeadlineRules = {
      domesticBuyers: [
        { required: true, message: this.source.language.pleaseEnter, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      importPurchaser: [
        { required: true, message: this.source.language.pleaseEnter, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      allType: [
        { required: true, message: this.source.language.pleaseEnter, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      deadlineDomesticBuyers: [
        { required: true, message: this.source.language.pleaseEnter, trigger: "blur" },
        { validator: validateBadgeDeadline, trigger: 'blur' }
      ],
      deadlineImportPurchaser: [
        { required: true, message: this.source.language.pleaseEnter, trigger: "blur" },
        { validator: validateBadgeDeadline, trigger: 'blur' }
      ],
      deadlineAllType: [
        { required: true, message: this.source.language.pleaseEnter, trigger: "blur" },
        { validator: validateBadgeDeadline, trigger: 'blur' }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.applicationDeadlineTable.loadData();
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.isBadgeApplicationDeadline = false;
      this.applicationDeadlineFrom = {
        id: row.id,
        timeType: row.timeType,
        domesticBuyers: row.domesticBuyers,
        importPurchaser: row.importPurchaser,
        allType: row.allType
      };
      // 证件申请截止时间(id为3)校验规则不同
      if (row.id === "3") {
        this.isBadgeApplicationDeadline = true;
        this.applicationDeadlineFrom = {
          id: row.id,
          timeType: row.timeType,
          deadlineDomesticBuyers: row.domesticBuyers,
          deadlineImportPurchaser: row.importPurchaser,
          deadlineAllType: row.allType
        };
      }
      this.$nextTick(function () {
        this.$refs.applicationDeadlineFrom.clearValidate();
      });
    },
    onSubmit() {
      let params = {
        id: this.applicationDeadlineFrom.id,
        domesticBuyers: this.applicationDeadlineFrom.domesticBuyers,
        importPurchaser: this.applicationDeadlineFrom.importPurchaser,
        allType: this.applicationDeadlineFrom.allType
      };
      if (this.isBadgeApplicationDeadline) {
        params = {
          id: this.applicationDeadlineFrom.id,
          domesticBuyers: this.applicationDeadlineFrom.deadlineDomesticBuyers,
          importPurchaser: this.applicationDeadlineFrom.deadlineImportPurchaser,
          allType: this.applicationDeadlineFrom.deadlineAllType
        };
      }
      this.$refs.applicationDeadlineFrom.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.update, params)
            .then(res => {
              this.isSubmitDisabled = false;
              this.dialogVisible = false;
              this.$refs.applicationDeadlineTable.loadData();
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
.formtitle {
  margin-bottom: 20px;
}
.applicationinput {
  width: 300px;
}
.formitemclass {
  margin-bottom: 20px;
}
</style>
