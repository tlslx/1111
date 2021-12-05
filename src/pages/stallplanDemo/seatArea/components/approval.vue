<template>
  <el-container>
    <el-header >
      <headline :label="languageSource.AdjustmentApply.checkTitle" v-if="itemData.length > 0" />
    </el-header>

    <el-main >
      <label-item v-if="itemData.length > 0"  :data="itemData" :languageSource="languageSource"></label-item>
      <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" v-if="resultData.submit" label-position="left">
        <el-form-item :label="languageSource.AdjustmentApply.check" prop="passFlag" class="row-margin">
          <el-select v-model="variables.passFlag" :placeholder='languageSource.CommonLang.select' style="width: 50%;" @change="passFlagChange">
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.AdjustmentApply.opinion" prop="reviewComment" class="row-margin">
          <el-input type="textarea" v-model="variables.reviewComment" rows="6" maxlength="201" style="width: 50%;" :placeholder="languageSource.LocationLang.approvalCommentMsg"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="backTo" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
          <el-button type="primary" @click="checkSubmit('variables')" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
        </el-form-item>

      </el-form>
      <el-row v-else :gutter="20" type="flex" justify="center">
        <el-col :span="9" style="text-align: center;" >
            <router-link :to="{ path: backPath + '?primarycolor=2b579a'}" class="b-m-l"><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
            <el-button type="success" v-if="resultData.save" @click="saveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
            <!-- <el-button type="primary" v-if="resultData.save" @click="checkFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.AdjustmentApply.verify}}</el-button> -->
            <el-button type="primary" v-if="resultData.reSubmit" @click="refuseSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
            <el-button type="primary" v-if="resultData.start" @click="startSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
        </el-col>
      </el-row>
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
    'label-item': () => import('./labelItem.vue')
  },
  props: {
    'languageSource': {
      'type': Object
    },
    'itemData': {
      'type': Array
    },
    'curItem': {
      'type': Object
    },
    'resultData': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      'variables': {
        passFlag: '',
        reviewComment: ''
      },
      'visiableState': true, //审核标签显示状态
      'formState': false, //审核完成返回按钮显示状态
      'formRefuse': false, //审核拒绝表单显示状态
      'rules': {
        // passFlag: [
        //   { required: true, message: '请选择审核意见', trigger: 'change' }
        // ],
        // reviewComment: [
        //   { required: true, message: '请输入审核建议', trigger: 'change' },
        //   { max: 200, message: '长度不能超过200个字符', trigger: 'change' }
        // ]
      },
      'fullscreenLoading': false,
      'backPath': '/seatApply'
    };
  },
  created () {
    let tag = this.$route.query.tag;
    if (tag === "seatApply" || tag === "contrast" || tag === "gearDialog") { //位置安排申请
      this.backPath = '/seatApply';
    } else if (tag === "seatReview") { //位置安排审核
      this.backPath = '/seatReview';
    } else if (tag === "seatPublicity") { //位置安排方案公示公布
      this.backPath = '/seatPublicity';
    } else if (tag === "businessArrange") { //商协会位置安排
      this.backPath = '/patchSchemeAdd';
    }

    //校验国际化设置
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
  },
  methods: {
    //返回首页
    backTo () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.reviewMsg, languageSource.CommonLang.tips, "warning", async () => {
        this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      });
    },
    //审核提交
    checkSubmit (formName) {
      let scopeRow = this.$route.query.scopeRow;
      let submitData = {
        "schemeId": scopeRow.schemeId,
        "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }],
        "variables": this.variables
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.$http.postJson(this.config.api.submitApprove, submitData)
            .then(res => {
              this.fullscreenLoading = false;
              this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
            });
        } else {
          return false;
        }
      });
    },
    //开启流程时提交
    startSubmit () {
      this.$emit('submitFunc', 'submit');
      // this.fullscreenLoading = true;
      // let params = { "schemeId": this.$route.query.businessKey };
      // this.$http.postJson(this.config.api.startApprove, params)
      //   .then((res) => {
      //     this.fullscreenLoading = false;
      //     this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      //   });
    },
    //流程拒绝重新提交方法
    refuseSubmit () {
      this.$emit('refuseSubmitFunc', 'refuseSubmit');
      // let scopeRow = this.$route.query.scopeRow;
      // let submitData = {
      //   "schemeId": scopeRow.schemeId,
      //   "taskEntities": [{ "curActId": scopeRow.taskEntities[0].curActId }],
      //   "variables": {
      //     "passFlag": "1"
      //   }
      // };
      // this.fullscreenLoading = true;
      // this.$http.postJson(this.config.api.reStartApprove, submitData)
      //   .then(res => {
      //     this.fullscreenLoading = false;
      //     this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      //   });
    },
    //保存方法
    saveFunc () {
      this.$emit('saveFunc', 'save');
      // let saveData = {
      //   schemeId: this.$route.query.businessKey
      // };
      // this.fullscreenLoading = true;
      // this.$http.postJson(this.config.api.updateSchema, saveData)
      //   .then(res => {
      //     this.fullscreenLoading = false;
      //     this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      //   });
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
          // { required: true, message: '请输入审核建议', trigger: 'change' },
          // { max: 200, message: '长度不能超过200个字符', trigger: 'change' }
          { required: true, message: languageSource.LocationLang.approvalCommentMsg, trigger: 'change' },
          { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'change' }
        ];
      }
    },
    //校验方法
    checkFunc () {
      this.$emit('verify', true);
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
  margin-right: 10px;
}
</style>
