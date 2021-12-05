<template>
  <el-page class="area">
    <template slot="body">
      <info :languageSource="languageSource"/>
      <gear ref="gearRefs" currentPagId='stallplanDemo/seatArea' :languageSource="languageSource"  @validate="validateFunc" @disableBtn="disableBtnFunc"/>
      <checking ref="checkRefs" :languageSource="languageSource" />
      <el-row v-if="gearState" :gutter="20" type="flex" justify="center" style="margin: 20px 0;">
        <el-col :span="9" style="text-align: center;" >
          <el-button @click="backFunc">{{languageSource.AdjustmentApply.backBtn}}</el-button>
          <el-button type="success" :disabled="submitAndSaveBtnDisabled" @click="gearSaveFunc('save')" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
          <!-- <el-button type="primary" @click="checkFunc(true)" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.AdjustmentApply.verify}}</el-button> -->
          <el-button type="primary" :disabled="submitAndSaveBtnDisabled" @click="gearSaveFunc('submit')" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
        </el-col>
      </el-row>
      <el-row v-else-if="contrastState" :gutter="20" type="flex" justify="center" style="margin: 20px 0;">
        <el-col :span="2" style="text-align: center;" >
          <el-button @click="backFunc">{{languageSource.AdjustmentApply.backBtn}}</el-button>
        </el-col>
      </el-row>
      <approval v-else
        :languageSource="languageSource"
        :itemData="itemData"
        :curItem="curItem"
        :resultData="resultData"
        @saveFunc="gearSaveFunc"
        @submitFunc="gearSaveFunc"
        @refuseSubmitFunc="gearSaveFunc"
        @verify="checkFunc"/>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './components/index';
import { Loading } from 'element-ui';
export default {
  name: 'areas',
  mixins: [listPageBase],
  components: {
    'info': () => import('./components/info'),
    'gear': () => import('./components/gear'),
    'checking': () => import('./components/checking'),
    'approval': () => import('./components/approval')
  },
  data () {
    return {
      config,
      'pageId': 'stallplanDemo/seatArea',
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {},
        'CheckProgress': {}
      },
      //判断当前页面是否是在线安排企业弹窗
      'gearState': false,
      'fullscreenLoading': false,
      'variables': {},
      'rules': {},
      'backPath': '/seatApply',
      'curItem': {},
      'itemData': [],
      'resultData': {},  //详情记录对象
      'contrastState': false, //方案对比弹框
      'submitAndSaveBtnDisabled': false,
      'violateRuleList': {} //违反规则的数据
    };
  },
  created () {
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');

    let tag = this.$route.query.tag;
    if (tag === "gearDialog") { //在线安排企业弹窗
      this.gearState = true;
      this.contrastState = false;
      this.backPath = '/seatApply';
    } else if (tag === "contrast") { //方案对比
      this.gearState = false;
      this.contrastState = true;
      this.backPath = '/seatApply';
    }
    //校验国际化设置
    let languageSource = this.languageSource;
    this.rules = {
      reviewComment: [
        { required: true, message: languageSource.LocationLang.approvalCommentMsg, trigger: 'blur' },
        { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'blur' }
      ]
    };

    //判断是新增还是其它，新增不能查询详情
    let addState = this.$route.query.addState;
    if (!addState) {
      this.getDetail();
      this.checkFunc(false);
    }
  },
  methods: {
    //获取详情记录
    getDetail () {
      let scopeRow = this.$route.query.scopeRow;
      let params = { 'json': { "schemeId": scopeRow.schemeId }};
      let url = this.config.api.getApproveDetails;
      let right = this.$route.query.right;
      const loading = Loading.service({
        lock: true
      });
      if (right === 'seatApplyReview') {
        params = { 'json': { "schemeId": scopeRow.schemeId, "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }] }};
        url = this.config.api.getApproveReviewDetails;
      }
      this.$http.get(url, params)
        .then((res) => {
          let workData = res.actLogEntities;
          let resLength = workData.length;
          let lastItem = resLength > 0 ? workData[resLength - 1] : {};
          loading.close();
          this.resultData = res;
          //如果最后一个节点没有结束时间，当前就是最后一个节点
          this.curItem = !lastItem.endTime ? workData.pop() : {};
          this.itemData = workData.filter(v => v.endTime !== "");
        });
    },
    disableBtnFunc () {
      this.submitAndSaveBtnDisabled = true;
    },
    //返回首页提示
    backFunc () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.onlineApplyTips, languageSource.CommonLang.tips, "warning", async () => {
        this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      });
    },
    // 判断企业重评是否上传文件
    isPassReappraisal () {
      const checkRefs = this.$refs.checkRefs;
      return checkRefs.reevaluationState ? (checkRefs.reevaluationState && checkRefs.fileList.length) : true;
    },
    //位置安排插件新增方案保存方法/提交/拒绝之后再提交
    gearSaveFunc (type) {
      const languageSource = this.languageSource;
      if (!this.isPassReappraisal()) {
        this.$message.error(languageSource.LocationLang.reappraisal);
        return false;
      }
      let arrangeValue = this.$refs.gearRefs.planedData;
      let arrangeRows = Object.values(arrangeValue);
      let scopeRow = this.$route.query.scopeRow;
      let tableData = this.$refs.checkRefs ? this.$refs.checkRefs.tableData : [];
      for (let i = 0; i < arrangeRows.length; i++) {
        let violateObj = this.violateRuleList[arrangeRows[i].companyId];
        if (violateObj && violateObj.less) {
          let msg = this.$refs.checkRefs.tabMsg;
          arrangeRows[i].forcedReason = msg;
          if (!msg || msg === '') {
            this.$message.error(languageSource.AdjustmentApply.lessInfo);
            return false;
          }
        }
        arrangeRows[i].recommendedQuantity = arrangeRows[i].boothNum || arrangeRows[i].recommendedQuantity;
        arrangeRows[i].isCentralPassage = scopeRow.isCentralPassage || arrangeRows[i].isCentralPassage;
        arrangeRows[i].exhibitionKind = scopeRow.exhibitionKind || arrangeRows[i].exhibitionKind;

        if (!scopeRow.schemeId) {
          arrangeRows[i].addBoothNo = arrangeRows[i].addBoothNo || '';
          arrangeRows[i].boothNo = arrangeRows[i].boothNo || '';
          let conacatArray = arrangeRows[i].addBoothNo.split(',').concat(arrangeRows[i].boothNo.split(','));
          conacatArray = conacatArray.filter(item => item && item.length);
          arrangeRows[i].addBoothNo = [...new Set(conacatArray)].join(',');
        }
      }
      let param = {
        "operType": "NONE",
        "subTablesMap": scopeRow.subTablesMap,
        "schemeId": scopeRow.schemeId,
        "schemeName": scopeRow.schemeName,
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
        "fileId": this.$refs.checkRefs.fileId,
        "fileName": this.$refs.checkRefs.fileName,
        "paSchemeEnterpriseList": arrangeRows
      };
      //品牌展位校验主副通道规则
      if (type !== 'save') {
        this.$refs.gearRefs.validateChannelFunc(true);
      }
      //提交时校验是否有安排展位信息
      if (!arrangeRows.length) {
        this.$message.warning(languageSource.LocationLang.arrangeSubmitTips);
        return false;
      }
      //提交时校验是否有违反严禁类规则的信息
      if (type !== 'save' && tableData && tableData.filter(v => (v.violate === true && v.state === 2)).length > 0) {
        this.$message.error(this.languageSource.LocationLang.checkIngTips);
        return false;
      }
      //弹框提示
      // if (type === 'submit' && tableData && tableData.filter(v => v.state === 2).length > 0) {
      //   kindo.util.confirm(languageSource.LocationLang.checkIngTips, languageSource.CommonLang.tips, 'error');
      //   return false;
      // }
      const loading = Loading.service({
        lock: true
      });
      this.$http.postJson(this.config.api.updateSchemeData, param)
        .then(res => {
          if (type === 'save') {
            loading.close();
            this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
          } else if (type === 'submit') {
            this.gearSubmitFunc(res, loading);
          } else if (type === 'refuseSubmit') {
            this.gearRefuseSubmitFunc(loading);
          }
        });
    },
    //位置安排插件新增方案提交方法
    gearSubmitFunc (data, loading) {
      let param = { "schemeId": data.schemeId };
      this.$http.postJson(this.config.api.startApprove, param)
        .then((submitRes) => {
          loading.close();
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        });
    },
    //位置安排插件新增方案拒绝重新提交方法
    gearRefuseSubmitFunc (loading) {
      let scopeRow = this.$route.query.scopeRow;
      let submitData = {
        "schemeId": scopeRow.schemeId,
        "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }],
        "variables": {
          "passFlag": "1"
        }
      };
      this.$http.postJson(this.config.api.reStartApprove, submitData)
        .then(res => {
          loading.close();
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        });
    },
    // 规则校验
    validateFunc (ruleRelatedData) {
      let planedData = Object.values(this.$refs.gearRefs.planedData);
      const violateRuleList = ruleRelatedData.violateRuleList;
      const allValidateRule = ruleRelatedData.allValidateRule;
      const result = {};
      const tableData = [];
      const violations = [];
      this.violateRuleList = violateRuleList;
      Object.values(violateRuleList).forEach(object => {
        for (let key in object) {
          if (!result[key]) {
            const currentObject = Object.assign({}, object[key]);
            result[key] = Object.assign(currentObject, { rule: key, violate: true });
            tableData.push(result[key]);
            violations.push(key);
          } else {
            const filter = tableData.filter(item => item.rule === key)[0];
            filter.boothCode += `,${object[key].boothCode}`;
          }
        }
      });
      Object.keys(allValidateRule).forEach(key => violations.indexOf(key) === -1 && tableData.push(Object.assign(allValidateRule[key], { rule: key, violate: false })));
      this.$refs.checkRefs.tableData = tableData.filter(v => v.violation !== '展位数少于推荐数');
      this.$refs.checkRefs.infoData = tableData.filter(v => v.violation === '展位数少于推荐数');
      for (let i = 0; i < planedData.length; i++) {
        let reasonValue = planedData[i].forcedReason;
        if (reasonValue && reasonValue !== '') {
          this.$refs.checkRefs.tabMsg = reasonValue;
          return '';
        }
      }
      this.$emit('data-to-checkeing', tableData);
    },
    //校验方法
    checkFunc (tag) {
      let tableData = this.$refs.checkRefs ? this.$refs.checkRefs.tableData : [];
      if (tag && tableData && tableData.filter(v => v.state === 2).length > 0) {
        let languageSource = this.languageSource;
        this.fullscreenLoading = false;
        kindo.util.confirm(languageSource.LocationLang.checkIngTips, languageSource.CommonLang.tips, 'error');
        return false;
      }
      //奖惩名单需要发请求查询
    }
  }
};
</script>

<style scoped>
.area {
  overflow-y: auto;
}
.b-m-l {
  margin-right: 10px;
}
</style>
