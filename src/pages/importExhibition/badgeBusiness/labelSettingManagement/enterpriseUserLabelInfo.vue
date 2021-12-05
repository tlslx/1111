<template>
  <el-page ref="enterpriseUserLabelInfo">
    <template slot="header">
      <!--标签设置弹窗-->
      <!-- <el-dialog title="企业标签设置" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
        <kindo-box>
          <el-form :model="enterpriseLabelSettingForm" ref="enterpriseLabelSettingForm" :rules="enterpriseLabelSettingRules" label-position="right" label-width="120px">
            <el-form-item label="标签类别：" prop="labelType">
              <el-select v-model="enterpriseLabelSettingForm.labelType" placeholder="请选择" class="inputclass" :disabled="true">
                <el-option v-for="item in source.labelTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签名称：" prop="buyerType">
              <el-radio-group v-model="enterpriseLabelSettingForm.buyerType">
                <el-radio label="内贸采购商"></el-radio>
                <el-radio label="进口采购商"></el-radio>
                <el-radio label="全部"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="isSubmitDisabled">确 定</el-button>
              <el-button @click="onCancel">取 消</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog> -->
      <kindo-box :title="source.language.enterpriseUserLabelInfo">
        <el-form :model="forms" inline :rules="formsRules" @submit.native.prevent @keyup.enter.native="onQuery" label-position="right">
          <el-form-item :label="source.language.enterpriseNameTable" label-width="90px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" placeholder="请输入" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.unifiedSocialCreditCode" label-width="140px" prop="unifiedSocialCreditCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.unifiedSocialCreditCode" placeholder="请输入" class="inputclass"></el-input>
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
        <kindo-table ref="enterpriseUserLabelInfoTable" :url="api.get" :queryParam="form">
          <el-table-column prop="enterpriseName" :label="source.language.enterpriseNameTable" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="unifiedSocialCreditCode" :label="source.language.unifiedSocialCreditCode" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column :label="source.language.customerType" show-overflow-tooltip min-width="240">
            <el-table-column prop="firstPeriodCustomer" :label="source.language.phaseOneTable" show-overflow-tooltip min-width="80" :formatter="customerTypeFormat"></el-table-column>
            <el-table-column prop="secondPeriodCustomer" :label="source.language.phaseTwoTable" show-overflow-tooltip min-width="80" :formatter="customerTypeFormat"></el-table-column>
            <el-table-column prop="thirdPeriodCustomer" :label="source.language.phaseThreeTable" show-overflow-tooltip min-width="80" :formatter="customerTypeFormat"></el-table-column>
          </el-table-column>
          <el-table-column prop="buyerType" :label="source.language.buyerTypeTable" show-overflow-tooltip min-width="150" :formatter="buyerTypeFormat"></el-table-column>
          <el-table-column prop="sourceType" :label="source.language.sourceType" :formatter="sourceTypeFormat" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="invitationNumber" :label="source.language.invitationNumber" show-overflow-tooltip min-width="80"></el-table-column>
          <el-table-column prop="activeTags" :label="source.language.activeTagsTable" :formatter="activityTagFormat" show-overflow-tooltip min-width="150"></el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "enterpriseUserLabelInfo",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "enterpriseUserLabelInfo",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseLabelRecord/getListPage",
        update: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseLabelRecord/updataListPage"
      },
      forms: {
        enterpriseName: "",
        unifiedSocialCreditCode: ""
      },
      formsRules: {},
      source: {
        language: {},
        labelTypeOptions: [{
          label: "采购商类型",
          value: "1"
        }],
        //1：特邀，2：重要，3：普通
        customerTypeOptions: [{
          label: "特邀",
          value: 1
        }, {
          label: "重要",
          value: 2
        }, {
          label: "普通",
          value: 3
        }],
        //1：进口采购商，2：内贸采购商，3：全部
        buyerTypeOptions: [{
          label: "进口采购商",
          value: 1
        }, {
          label: "内贸采购商",
          value: 2
        }, {
          label: "全部",
          value: 3
        }],
        //来源类型（1：老采购商，2：参展商，3：展团，4：商会，5：交易团，6：招商合作机构）
        sourceTypeOptions: [{
          label: "老采购商",
          value: "1"
        }, {
          label: "参展商",
          value: "2"
        }, {
          label: "展团",
          value: "3"
        }, {
          label: "商会",
          value: "4"
        }, {
          label: "交易团",
          value: "5"
        }, {
          label: "招商合作机构",
          value: "6"
        }],
        activityTagOptions: []
      },
      // 企业标签设置表单
      enterpriseLabelSettingForm: {
        labelType: "",
        buyerType: ""
      },
      enterpriseLabelSettingRules: {},
      dialogVisible: false,
      isSubmitDisabled: false //提交按钮禁用
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
    this.enterpriseLabelSettingRules = {
      buyerType: [
        { required: true, message: this.source.language.chooseLabel, trigger: "change" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    //客户类型过滤显示
    customerTypeFormat(row) {
      let customerLabel = 0;
      if (row.firstPeriodCustomer) {
        customerLabel = row.firstPeriodCustomer;
      } else if (row.secondPeriodCustomer) {
        customerLabel = row.secondPeriodCustomer;
      } else if (row.thirdPeriodCustomer) {
        customerLabel = row.thirdPeriodCustomer;
      }
      for (let i = 0; i < this.source.customerTypeOptions.length; i++) {
        if (this.source.customerTypeOptions[i].value === customerLabel) {
          customerLabel = this.source.customerTypeOptions[i].label;
          break;
        }
      }
      //存在值为0的情况，表中不显示
      if (!customerLabel) {
        customerLabel = "";
      }
      return customerLabel;
    },
    //采购商类型过滤显示
    buyerTypeFormat(row) {
      let buyerTypeLabel = row.buyerType;
      for (let i = 0; i < this.source.buyerTypeOptions.length; i++) {
        if (this.source.buyerTypeOptions[i].value === row.buyerType) {
          buyerTypeLabel = this.source.buyerTypeOptions[i].label;
          break;
        }
      }
      //存在值为0的情况，表中不显示
      if (!buyerTypeLabel) {
        buyerTypeLabel = "";
      }
      return buyerTypeLabel;
    },
    //来源类型"1/2/3/4/5"对应转化为“老采购商/参展商/展团/商会/交易团/招商合作机构”显示
    sourceTypeFormat(row) {
      let sourceTypeStr = row.sourceType ? row.sourceType : "";
      let sourceTypeLabel = "";
      let sourceTypeList = sourceTypeStr.split("/");
      for (let i = 0; i < this.source.sourceTypeOptions.length; i++) {
        for (let j = 0; j < sourceTypeList.length; j++) {
          if (sourceTypeList[j] === this.source.sourceTypeOptions[i].value) {
            sourceTypeList[j] = this.source.sourceTypeOptions[i].label;
            break;
          }
        }
      }
      sourceTypeLabel = sourceTypeList.join("/");
      return sourceTypeLabel;
    },
    //活动标签过滤显示
    activityTagFormat(row) {
      let activityTagStr = row.activeTags ? row.activeTags : "";
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
      this.$refs.enterpriseUserLabelInfoTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.enterpriseUserLabelInfoTable.reloadData();
      });
    }
    // onEdit(row) {
    //   this.dialogVisible = true;
    //   this.isSubmitDisabled = false;
    //   //表中buyerType为key值，需转化为value值显示
    //   let buyerType = this.buyerTypeFormat(row);
    //   this.enterpriseLabelSettingForm = {
    //     enterpriseLabelId: row.enterpriseLabelId,
    //     labelType: "采购商类型",
    //     buyerType: buyerType
    //   };
    //   this.$nextTick(function () {
    //     this.$refs.enterpriseLabelSettingForm.clearValidate();
    //   });
    // },
    // onSubmit() {
    //   //标签名称选中为value值，参数需要过滤为key值下发
    //   let buyerType = this.buyerTypeFormat(this.enterpriseLabelSettingForm);
    //   let params = {
    //     enterpriseLabelId: this.enterpriseLabelSettingForm.enterpriseLabelId,
    //     buyerType: buyerType
    //   };
    //   this.$refs.enterpriseLabelSettingForm.validate(valid => {
    //     if (valid) {
    //       this.isSubmitDisabled = true;
    //       this.$http.postJson(this.api.update, params).then(res => {
    //         this.isSubmitDisabled = false;
    //         this.dialogVisible = false;
    //         this.$refs.enterpriseUserLabelInfoTable.reloadData();
    //       }, err => {
    //         this.isSubmitDisabled = false;
    //         this.$message.error(err);
    //       });
    //     } else {
    //       this.$message.error("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // onCancel() {
    //   this.dialogVisible = false;
    // }
  }
};
</script>
<style>
</style>
