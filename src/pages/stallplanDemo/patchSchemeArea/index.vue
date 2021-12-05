<template>
  <el-page class="area">
    <template slot="body" >
      <div v-if="businessState">
        <el-header>
          <headline :label="languageSource.AdjustmentApply.baseInfo"/>
        </el-header>
        <el-form :inline="true" ref="itemForm" :model="itemForm" label-position="left" :rules="rules" class="info-form">
          <el-form-item class="m-b-n" :label="languageSource.LocationLang.programName" prop="schemeName" >
            <el-input v-model="itemForm.schemeName" clearable  ></el-input>
          </el-form-item>
          <el-form-item class="m-b-n" :label="languageSource.LocationLang.exhibitionProperty">
            <el-input v-model="itemForm.exhibitionProperty" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="m-b-n" :label="languageSource.LocationLang.exhibitionAreaName" >
            <el-input v-model="itemForm.exhibitionAreaName" clearable :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <info v-else :languageSource='languageSource'/>
      <business-select-table :tableData='tableData' :languageSource='languageSource'/>
      <gear ref="gearRefs" currentPagId='businessSeatArea' :languageSource="languageSource" @validate="validateFunc"/>
      <checking ref="checkRefs" :languageSource="languageSource" />
      <el-form v-if="businessState" ref="variables" :model="variables" :rules="rules" label-width="92px" label-position="left" style="margin: 20px 0;">
        <el-form-item :label="languageSource.LocationLang.arrangeResonForm" prop="reviewComment" class="row-margin">
          <el-input type="textarea" v-model="variables.reviewComment" rows="6" style="width: 98%" :placeholder="languageSource.LocationLang.arrangeResonTips"></el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="8" style="text-align: center;" >
            <el-button @click="backFunc" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
            <el-button type="success" @click="businessSaveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
            <el-button type="primary" @click="businessSubmitFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
          </el-col>
        </el-row>
      </el-form>
      <approval v-else
        :applicationIds="applicationIds"
        :languageSource='languageSource'
        @saveFunc="businessSaveFunc"
        @submitFunc="businessSubmitFunc"
        @refuseSubmitFunc="refuseSubmit"
      />
    </template>
  </el-page>
</template>

<script>
import { Loading } from 'element-ui';
import config from './components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'areas',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../components/headline.vue'),
    'info': () => import('./components/info'),
    'businessSelectTable': () => import('./components/businessSelectTable'),
    'gear': () => import('../seatArea/components/gear.vue'),
    'checking': () => import('../seatArea/components/checking.vue'),
    'approval': () => import('./components/approval')
  },
  data () {
    return {
      'pageId': 'stallplanDemo/patchSchemeArea',
      config,
      tableData: [], //关联的表格数据
      applicationIds: [], //applicationIds的数组值
      languageSource: {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      },
      backPath: '/patchSchemeAdd',
      //审核意见
      variables: {
        reviewComment: ''
      },
      itemForm: {
        schemeName: '',
        exhibitionProperty: '',
        exhibitionAreaName: ''
      },
      //校验规则
      rules: {},
      //加载样式
      fullscreenLoading: false,
      //商协会位置安排状态
      businessState: false,
      schemeEnterpriseList: [] //企业信息
    };
  },
  created () {
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');

    let tag = this.$route.query.tag;
    let scopeRow = this.$route.query.scopeRow;
    if (tag === "businessArrange") { //商协会位置安排
      this.businessState = true;
      this.backPath = '/patchSchemeAdd';
      this.tableData = scopeRow.selectData;
      this.itemForm.exhibitionProperty = scopeRow.exhibitionProperty;
      this.itemForm.exhibitionAreaName = scopeRow.exhibitionAreaName;
      const loading = Loading.service({
        lock: true
      });
      this.getEnterpriseList(loading, scopeRow.selectData);
    } else if (scopeRow.status === 4 && tag === "patchSchemeAdd") { //展位调整修改方法
      this.businessState = true;
      this.backPath = '/patchSchemeAdd';
      this.tableData = scopeRow.selectData;
      this.itemForm.exhibitionProperty = scopeRow.exhibitionProperty;
      this.itemForm.exhibitionAreaName = scopeRow.exhibitionAreaName;
      this.itemForm.schemeName = scopeRow.schemeName;
      this.variables.reviewComment = scopeRow.arrangeResult;
      const loading = Loading.service({
        lock: true
      });
      this.getEnterpriseList(loading, scopeRow.selectData);
    } else {
      if (tag === "patchSchemeAdd") { //补丁方案新增
        this.backPath = '/patchSchemeAdd';
      } else if (tag === "patchSchemeReview") { //补丁方案审核
        this.backPath = '/patchSchemeReview';
      } else if (tag === 'patchSchemePublicity') { //补丁方案公示公布
        this.backPath = '/patchSchemePublicity';
      }
      this.businessState = false;
      this.getDetail();
    }

    //校验国际化设置
    let languageSource = this.languageSource;
    this.rules = {
      reviewComment: [
        { required: true, message: languageSource.LocationLang.arrangeResonTips, trigger: 'change' },
        { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'change' }
      ],
      schemeName: [
        { required: true, message: languageSource.LocationLang.programNameTip, trigger: 'change' }
      ]
    };
  },
  methods: {
    //返回首页提示
    backFunc () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.onlineApplyTips, languageSource.CommonLang.tips, "warning", async () => {
        this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      });
    },
    getDetail () {
      let params = { 'json': {
        "schemeId": this.$route.query.scopeRow.schemeId,
        "schemaStatus": this.$route.query.scopeRow.schemaStatus
      }};
      const loading = Loading.service({
        lock: true
      });
      let tag = this.$route.query.tag;
      let url = this.config.api.reviewArrangementGetDetail; //补丁方案新增查看详情接口
      let scopeRow = this.$route.query.scopeRow;
      //补丁方案审核查看详情接口
      if (tag === 'patchSchemeReview') {
        url = this.config.api.reviewArrangementGetReviewDetail;
        params = { 'json': {
          "schemeId": this.$route.query.scopeRow.schemeId,
          "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }]
        }};
      }
      this.$http.get(url, params)
        .then((res) => {
          loading.close();
          let ids = [];
          this.tableData = res.list;
          for (let i = 0; i < res.list.length; i++) {
            ids.push(res.list[i].applicationId);
          }
          this.applicationIds = ids;
        });
    },
    //获取企业详情信息
    getEnterpriseList (loading, list) {
      this.$http.postJson(config.api.getAdjustEnterpriseList, JSON.stringify(list))
        .then(enterpriseRes => {
          this.schemeEnterpriseList = enterpriseRes;
          loading.close();
        });
    },
    //商协会位置安排保存
    businessSaveFunc () {
      let itemState = false;
      this.$refs.itemForm.validate(valid => {
        if (!valid) {
          kindo.util.confirm(this.languageSource.LocationLang.programNameTip, this.languageSource.CommonLang.tips, 'error');
          return false;
        }
        itemState = valid;
      });
      this.$refs.variables.validate(valid => {
        if (valid && itemState) {
          let scopeRow = this.$route.query.scopeRow;
          let adjustedRows = this.$refs.gearRefs.adjustedRows;
          let listValue = [];
          this.schemeEnterpriseList.forEach(item => {
            let obj = Object.assign({}, item);
            let adjustRow = adjustedRows[item.companyId + item.boothNo];
            if (adjustRow && adjustRow.adjustedBoothNo && adjustRow.boothNo === item.boothNo) {
              obj.addBoothNo = adjustRow.adjustedBoothNo;
            }
            obj.deleteBoothNo = item.boothNo;
            listValue.push(obj);
          });
          let arrangeState = listValue.filter(v => (v.addBoothNo === '' || !v.addBoothNo));
          if (arrangeState.length === listValue.length) {
            this.$message.error(this.languageSource.AdjustmentApply.enterpriseArrangeInfo);
            return false;
          }
          if (listValue.filter(v => (v.addBoothNo !== '' && v.addBoothNo)).length !== this.schemeEnterpriseList.length) {
            this.$message.error(this.languageSource.AdjustmentApply.adjustInfo);
            return false;
          }
          let param = {
            "operType": "NONE",
            "subTablesMap": scopeRow.subTablesMap,
            "schemeId": scopeRow.schemeId,
            "schemeName": this.itemForm.schemeName,
            "exhibitionPeriod": scopeRow.exhibitionPeriod,
            "boothCode": scopeRow.boothCode,
            "exhibitionAreaCode": scopeRow.exhibitionAreaCode,
            "exhibitionAreaName": scopeRow.exhibitionAreaName,
            "exhibitionProperty": scopeRow.exhibitionProperty,
            "creatorId": scopeRow.creatorId,
            "creatorName": scopeRow.creatorName,
            "createDate": scopeRow.createDate,
            "modifierId": scopeRow.modifierId,
            "modifierName": scopeRow.modifierName,
            "modifyDate": scopeRow.modifyDate,
            "description": scopeRow.description,
            "sessionNumber": scopeRow.sessionNumber,
            "isCentralPassage": scopeRow.isCentralPassage,
            "arrangeResult": this.variables.reviewComment, // 安排原因
            // "isCheckPass": "0",  // 是否校验通过
            "paSchemeEnterpriseList": listValue,
            "mySpecialEntitys": scopeRow.selectData
          };
          const loading = Loading.service({
            lock: true
          });
          this.$http.postJson(this.config.api.savePatchScheme, param)
            .then(res => {
              loading.close();
              this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
            });
        }
      });
    },
    //商协会位置安排提交
    businessSubmitFunc () {
      let itemState = false;
      let tableData = this.$refs.checkRefs ? this.$refs.checkRefs.tableData : [];
      this.$refs.itemForm.validate(valid => {
        if (!valid) {
          kindo.util.confirm(this.languageSource.LocationLang.programNameTip, this.languageSource.CommonLang.tips, 'error');
          return false;
        }
        itemState = valid;
      });
      this.$refs.variables.validate(valid => {
        if (valid && itemState) {
          if (tableData && tableData.filter(v => (v.violate === true && v.state === 2)).length > 0) {
            this.$message.error(this.languageSource.LocationLang.checkIngTips);
            return false;
          }
          let scopeRow = this.$route.query.scopeRow;
          let adjustedRows = this.$refs.gearRefs.adjustedRows;
          let listValue = [];
          this.schemeEnterpriseList.forEach(item => {
            let obj = Object.assign({}, item);
            let adjustRow = adjustedRows[item.companyId + item.boothNo];
            if (adjustRow && adjustRow.adjustedBoothNo && adjustRow.boothNo === item.boothNo) {
              obj.addBoothNo = adjustRow.adjustedBoothNo;
            } else {
              obj.addBoothNo = obj.adjustedBoothNo;
            }
            obj.deleteBoothNo = item.boothNo;
            listValue.push(obj);
          });
          let arrangeState = listValue.filter(v => (v.addBoothNo === '' || !v.addBoothNo));
          if (arrangeState.length === listValue.length) {
            this.$message.error(this.languageSource.AdjustmentApply.enterpriseArrangeInfo);
            return false;
          }
          if (listValue.filter(v => (v.addBoothNo !== '' && v.addBoothNo)).length !== this.schemeEnterpriseList.length) {
            this.$message.error(this.languageSource.AdjustmentApply.adjustInfo);
            return false;
          }
          let param = {
            "operType": "NONE",
            "subTablesMap": scopeRow.subTablesMap,
            "schemeId": scopeRow.schemeId,
            "schemeName": this.itemForm.schemeName,
            "exhibitionPeriod": scopeRow.exhibitionPeriod,
            "boothCode": scopeRow.boothCode,
            "exhibitionAreaCode": scopeRow.exhibitionAreaCode,
            "exhibitionAreaName": scopeRow.exhibitionAreaName,
            "exhibitionProperty": scopeRow.exhibitionProperty,
            "creatorId": scopeRow.creatorId,
            "creatorName": scopeRow.creatorName,
            "createDate": scopeRow.createDate,
            "modifierId": scopeRow.modifierId,
            "modifierName": scopeRow.modifierName,
            "modifyDate": scopeRow.modifyDate,
            "description": scopeRow.description,
            "sessionNumber": scopeRow.sessionNumber,
            "isCentralPassage": scopeRow.isCentralPassage,
            "arrangeResult": this.variables.reviewComment, // 安排原因
            // "isCheckPass": "0",  // 是否校验通过
            "paSchemeEnterpriseList": listValue,
            "mySpecialEntitys": scopeRow.selectData
          };
          const loading = Loading.service({
            lock: true
          });
          this.$http.postJson(this.config.api.submitPatchScheme, param)
            .then(res => {
              loading.close();
              this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
            });
        }
      });
    },
    // 规则校验
    validateFunc (ruleRelatedData) {
      const violateRuleList = ruleRelatedData.violateRuleList;
      const allValidateRule = ruleRelatedData.allValidateRule;
      const result = {};
      const tableData = [];
      const violations = [];
      Object.values(violateRuleList).forEach(object => {
        for (let key in object) {
          if (!result[key]) {
            result[key] = Object.assign(object[key], { rule: key, violate: true });
            tableData.push(result[key]);
            violations.push(key);
          }
        }
      });
      Object.keys(allValidateRule).forEach(key => violations.indexOf(key) === -1 && tableData.push(Object.assign({ rule: key }, allValidateRule[key])));
      this.$refs.checkRefs.tableData = tableData.filter(v => v.violation !== '展位数少于推荐数');
      this.$refs.checkRefs.infoData = tableData.filter(v => v.violation === '展位数少于推荐数');
    },
    //流程拒绝重新提交方法
    refuseSubmit () {
      const loading = Loading.service({
        lock: true
      });
      let scopeRow = this.$route.query.scopeRow;
      let submitData = {
        "schemeId": scopeRow.schemeId,
        "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }]
      };
      this.$http.postJson(this.config.api.reviewArrangementReSubmit, submitData)
        .then(res => {
          loading.close();
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        });
    }
  }
};
</script>

<style scoped>
.area {
  overflow-y: auto;
}
.info-form {
  margin-top: 20px;
}
.m-b-n {
  margin-bottom: 0px;
}
</style>
