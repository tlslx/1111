<template>
  <el-container >
    <el-header >
      <headline :label="titleText" />
    </el-header>

    <el-main >
      <!-- 调整申请查看 -->
      <template v-if='businessState === 1'>
        <label-item :data="itemData" :languageSource='languageSource'></label-item>
        <el-row>
          <el-col :span="4" :offset="10" >
            <el-button @click="backTo" v-if="this.backPath !== '/adjustmentApplition'">{{languageSource.AdjustmentApply.backBtn}}</el-button>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <div>
          <!-- 交易团显示模板 -->
          <label-item :data="itemData" :languageSource='languageSource'></label-item>
          <!-- 团间交换页面 -->
          <business-check-swap ref="businessCheckRef" v-if="right('checkSwap')" :languageSource='languageSource'/>
          <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" v-if='itemFlag' label-position="left">
            <el-form-item :label="languageSource.AdjustmentApply.check" prop="passFlag" class="row-margin" >
              <el-select v-model="variables.passFlag" :placeholder="languageSource.CommonLang.select" style="width: 50%;" @change="passFlagChange">
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.AdjustmentApply.suggest" prop="reviewComment" class="row-margin">
              <el-input type="textarea" v-model="variables.reviewComment" rows="6" maxlength="201" style="width: 50%;" :placeholder="languageSource.LocationLang.approvalCommentMsg"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="backTo('msg')" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
              <el-button type="primary" @click="checkSubmit(currentItem)" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
            </el-form-item>
          </el-form>
          <el-row v-else type="flex" justify="center">
            <el-col :span="2" >
              <el-button @click="backTo">{{languageSource.AdjustmentApply.backBtn}}</el-button>
            </el-col>
          </el-row>
        </div>
      </template>

    </el-main>
  </el-container>

</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'approval',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline.vue'),
    'label-item': () => import('./labelItem.vue'),
    'businessCheckSwap': () => import('./businessCheckSwap.vue')
  },
  props: {
    'itemData': {
      'type': Array,
      'required': true
    },
    'currentItem': {
      'type': Object,
      'required': true
    },
    'itemFlag': {
      'type': Boolean,
      'required': true
    },
    'applyEntity': {
      'type': Object,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'pageId': 'stallplanDemo/businessCheck',
      config,
      'variables': {
        passFlag: '',
        reviewComment: ''
      },
      'rules': {},
      'fullscreenLoading': false,
      'businessState': 2, // 1：查看状态， 2：审核状态
      'backPath': '/adjustmentApplition',
      'titleText': '审核', //显示标题
      'btnState': true //按钮状态
    };
  },
  created () {
    //设置校验信息国际化
    let languageSource = this.languageSource;
    this.rules = {
      passFlag: [
        { required: true, message: languageSource.LocationLang.approvalMsg, trigger: 'change' }
      ],
      reviewComment: [
        { required: true, message: languageSource.LocationLang.approvalCommentMsg, trigger: 'change' },
        { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'change' }
      ]
    };
    //判断返回地址
    this.setBackPath();
  },
  methods: {
    //带有提示信息的返回
    backWithInfo () {

    },
    //返回首页
    backTo (val) {
      let queryItem = this.$route.query;
      let languageSource = this.languageSource;
      if (val === 'msg') {
        kindo.util.confirm(languageSource.AdjustmentApply.reviewMsg, languageSource.CommonLang.tips, "warning", async () => {
          let targValue = (queryItem && queryItem.tag) ? queryItem.tag : "";
          if (targValue === 'sendArrangeDialog') { //补丁方案新增  位置安排
            this.$router.push({ path: this.backPath + '?primarycolor=2b579a', query: { arrangeDialog: "true" }});
          } else if (targValue === 'patchSchemeArea') { //补丁方案查看页面
            this.$router.push({ path: this.backPath + '?primarycolor=2b579a', query: { ...queryItem, scopeRow: queryItem.paramRow, tag: queryItem.paramTag, right: 'patchSchemeView' }});
          } else if (targValue === 'patchSchemeAdd') { //补丁方案新增
            this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
          } else {
            this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
          }
        });
      } else {
        let targValue = (queryItem && queryItem.tag) ? queryItem.tag : "";
        if (targValue === 'sendArrangeDialog') { //补丁方案新增  位置安排
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a', query: { arrangeDialog: "true" }});
        } else if (targValue === 'patchSchemeArea') { //补丁方案查看页面
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a', query: { ...queryItem, scopeRow: queryItem.paramRow, tag: queryItem.paramTag, right: 'patchSchemeView' }});
        } else if (targValue === 'patchSchemeAdd') { //补丁方案新增
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        } else {
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        }
      }
    },
    //审核提交
    checkSubmit (currentItem) {
      this.$refs.variables.validate((valid) => {
        if (valid) {
          let applyEntity = this.applyEntity;
          let scopeRow = this.$route.query.scopeRow;
          if (this.$refs.businessCheckRef) {
            this.$refs.businessCheckRef.checkForm();
          // let swapForm = this.$refs.businessCheckRef.variables;  //交易团审核页面表单数据
          }
          let submitData = {
            "applicationId": applyEntity.applicationId,
            "oldSchemeId": applyEntity.oldSchemeId,
            "schemeDetailId": applyEntity.schemeDetailId,
            "enterpriseId": applyEntity.enterpriseId,
            "enterpriseName": applyEntity.enterpriseName,
            "exhibitionArea": applyEntity.exhibitionArea,
            "exhibitionType": applyEntity.exhibitionType,
            "adjustmentReason": applyEntity.adjustmentReason,
            "adjustmentContent": applyEntity.adjustmentContent,
            "adjustmentNumber": applyEntity.adjustmentNumber,
            "boothCode": applyEntity.boothCode,
            "fileId": applyEntity.fileId,
            "taskEntities": [{ "curActId": (scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId) }],
            "paApplyRefSchemes": applyEntity.paApplyRefSchemes,
            "variables": this.variables
          };

          this.fullscreenLoading = true;
          this.$http.postJson(this.config.api.submitApply, submitData)
            .then(res => {
              this.fullscreenLoading = false;
              this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
            });
        } else {
          return false;
        }
      });
    },
    //判断返回地址及显示标题
    setBackPath () {
      let languageSource = this.languageSource;
      let targValue = (this.$route.query && this.$route.query.tag) ? this.$route.query.tag : "";
      if (targValue === 'adjustmentApply') { //展位调整申请新增
        this.backPath = '/adjustmentApplition';
        this.titleText = languageSource.AdjustmentApply.reviewRecordTitle;
        this.businessState = 1;
      } else if (targValue === 'adjustmentReview') { //展位调整申请审核
        // 用于判断是否是商协会人员, 值为business就是商协会人员
        let others = this.$route.query.others ? this.$route.query.others : '';
        this.backPath = '/adjustmentReview';
        this.titleText = languageSource.AdjustmentApply.adjustReviewTitle;
        if (others === 'business') { //商协会人员只能查看
          this.businessState = 1;
        } else {
          this.businessState = 2;
        }
      } else if (targValue === 'sendArrangeDialog') { //补丁方案新增  位置安排
        this.backPath = '/patchSchemeAdd';
        this.titleText = languageSource.AdjustmentApply.reviewRecordTitle;
        this.businessState = 1;
      } else if (targValue === 'patchSchemeAdd') { //补丁方案新增
        this.backPath = '/patchSchemeAdd';
        this.titleText = languageSource.AdjustmentApply.reviewRecordTitle;
        this.businessState = 1;
      } else if (targValue === 'patchSchemeArea') {
        this.backPath = '/stallplanDemo/patchSchemeArea';
        this.titleText = languageSource.AdjustmentApply.reviewRecordTitle;
        this.businessState = 1;
      } else if (targValue === 'patchSchemeReview') { //补丁方案新增
        this.backPath = '/patchSchemeReview';
        this.titleText = languageSource.AdjustmentApply.reviewRecordTitle;
        this.businessState = 1;
      }
    },
    //根据审核判断审核意见是否要校验
    passFlagChange (value) {
      let languageSource = this.languageSource;
      if (value === '1') { //选择通过不需要填写审核意见
        this.rules.reviewComment = [
          { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'change' }
        ];
        this.$refs.variables.clearValidate(['reviewComment']);
      } else {
        this.rules.reviewComment = [
          { required: true, message: languageSource.LocationLang.approvalCommentMsg, trigger: 'change' },
          { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'change' }
        ];
      }
    }
  }
};
</script>

<style scoped>
.row-margin {
  margin-bottom: 20px;
}
.sub-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
.b-m-l {
  margin-left: 10px;
}
</style>
