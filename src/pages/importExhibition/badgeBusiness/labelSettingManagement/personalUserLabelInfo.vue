<template>
  <el-page ref="personalUserLabelInfo">
    <template slot="header">
      <!--标签设置弹窗-->
      <el-dialog :title="source.language.personalLabelSettings" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
        <kindo-box>
          <el-form :model="personalLabelSettingForm" ref="personalLabelSettingForm" :rules="personalLabelSettingRules" label-position="right" label-width="120px">
            <el-form-item :label="source.language.labelType" prop="labelType">
              <el-select v-model="personalLabelSettingForm.labelType" :placeholder="source.language.pleaseChoose" class="inputclass" :disabled="true">
                <el-option v-for="item in source.labelTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="source.language.labelName" prop="activeTagsName">
              <el-checkbox-group v-model="personalLabelSettingForm.activeTagsName">
                <el-checkbox v-for="item in source.activityTagOptions" :key="item.value" :label="item.label"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="onCancel">{{source.language.cancel}}</el-button>
              <el-button v-if="right('submit')" type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{source.language.confirm}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>
      <kindo-box :title="source.language.personalUserLabelInfo">
        <el-form :model="forms" ref="forms" inline :rules="formsRules" label-position="right" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.nameTable" label-width="60px" prop="name">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.name" :placeholder="source.language.pleaseEnter" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.identityNumber" label-width="90px" prop="idCardNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.idCardNo" :placeholder="source.language.pleaseEnter" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.ownedEnterprise" label-width="90px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" :placeholder="source.language.pleaseEnter" class="inputclass"></el-input>
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
        <kindo-table ref="personalUserLabelInfoTable" :url="api.get" :queryParam="form">
          <el-table-column prop="name" :label="source.language.nameTable" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column prop="idCardNo" :label="source.language.identityNumber" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="enterpriseName" :label="source.language.ownedEnterprise" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="idCard" :label="source.language.dataType" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column prop="activeTagsName" :label="source.language.activeTagsTable" :formatter="activityTagFormat" show-overflow-tooltip min-width="250"></el-table-column>
          <el-table-column :label="source.language.operation" min-width="120" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" :title="source.language.modify" @click="onEdit(scope.row)">{{source.language.modify}}</el-button>
            </template>
          </el-table-column>
          <div slot="control">
            <el-upload ref="upload" accept=".xls, .xlsx" :data="uploadParams" :show-file-list="false" :limit="1" :action="api.import" :headers="{ 'Token': store.getters.token }" :on-success="handleSuccess">
              <el-button v-if="right('import')" type="danger" icon="el-icon-upload" @click="activityListImport">{{source.language.activityListImport}}</el-button>
            </el-upload>
          </div>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '@/scripts/framework/store';
export default {
  name: "personalUserLabelInfo",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "personalUserLabelInfo",
      store,
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiActiveLabelRecord/getListPage",
        update: kindo.config.api.importExbUrl + "/api/infoIfiActiveLabelRecord/updataPersonLabel",
        import: kindo.config.api.importExbUrl + "/api/infoIfiActiveLabelRecord/upload"
      },
      forms: {},
      formsRules: {},
      source: {
        language: {},
        labelTypeOptions: [{
          label: "活动标签",
          value: "1"
        }],
        activityTagOptions: []
      },
      //个人标签设置表单
      personalLabelSettingForm: {
        labelType: "",
        activeTagsName: []
      },
      personalLabelSettingRules: {},
      dialogVisible: false,
      isSubmitDisabled: false, //提交按钮禁用
      uploadParams: {}
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
    //读取数据字典
    this.source.activityTagOptions = await kindo.dictionary.get('activity_label');
    this.personalLabelSettingRules = {
      activeTagsName: [
        { type: 'array', required: true, message: this.source.language.selectAtLeastOneLabel, trigger: "change" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    //活动标签过滤显示
    activityTagFormat(row) {
      let activityTagStr = row.activeTagsName ? row.activeTagsName : "";
      let activityTagLabel = "";
      let activityTagList = activityTagStr.split("/");
      for (let i = 0; i < this.source.activityTagOptions.length; i++) {
        for (let j = 0; j < activityTagList.length; j++) {
          if (activityTagList[j] === this.source.activityTagOptions[i].value) {
            activityTagList[j] = this.source.activityTagOptions[i].label;
            break;
          }
        }
      }
      activityTagLabel = activityTagList.join("/");
      return activityTagLabel;
    },
    onQuery() {
      this.$refs.personalUserLabelInfoTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.personalUserLabelInfoTable.reloadData();
      });
    },
    activityListImport() {
      this.uploadParams = {
        "activityLabel": JSON.stringify(this.source.activityTagOptions)
      };
    },
    onEdit(row) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      let tagName = row.activeTagsName;
      //活动标签activeTagsName数据格式为字符串（"Aforum/Bforum/Cforum"），需转为数组
      let tagList = tagName ? tagName.split("/") : [];
      //["Aforum","Bforum","Cforum"]后缀转化为"论坛"
      for (let i = 0; i < this.source.activityTagOptions.length; i++) {
        for (let j = 0; j < tagList.length; j++) {
          if (tagList[j] === this.source.activityTagOptions[i].value) {
            tagList[j] = this.source.activityTagOptions[i].label;
            break;
          }
        }
      }
      this.personalLabelSettingForm = {
        personLabId: row.personLabId,
        labelType: this.source.language.activeTagsTable,
        activeTagsName: tagList
      };
      this.$nextTick(function () {
        this.$refs.personalLabelSettingForm.clearValidate();
      });
    },
    onSubmit() {
      let tagList = this.personalLabelSettingForm.activeTagsName;
      //参数下发，活动标签["A论坛","B论坛","C论坛"]后缀转化为"forum"
      for (let i = 0; i < this.source.activityTagOptions.length; i++) {
        for (let j = 0; j < tagList.length; j++) {
          if (tagList[j] === this.source.activityTagOptions[i].label) {
            tagList[j] = this.source.activityTagOptions[i].value;
            break;
          }
        }
      }
      let params = {
        personLabId: this.personalLabelSettingForm.personLabId,
        activeTagsNameArry: tagList
      };
      this.$refs.personalLabelSettingForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.update, params).then(res => {
            this.isSubmitDisabled = false;
            this.dialogVisible = false;
            this.$refs.personalUserLabelInfoTable.reloadData();
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
    },
    handleSuccess(res) {
      if (res.flag === '1') {
        this.$message.success(this.source.language.importSuccess);
        this.$refs.personalUserLabelInfoTable.reloadData();
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.upload.clearFiles();
      }
    }
  }
};
</script>
<style>
</style>

