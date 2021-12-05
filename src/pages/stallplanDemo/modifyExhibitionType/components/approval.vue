<template>
  <el-container v-if="visiableState">
    <el-header >
      <headline :label="languageSource.AdjustmentApply.transactionReview" />
    </el-header>

    <el-main >
      <approval-item :languageSource="languageSource" />
      <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" v-if="!formRefuse" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="languageSource.AdjustmentApply.check" prop="passFlag" class="row-margin">
              <el-select v-model="variables.passFlag" :placeholder="languageSource.CommonLang.select" style="width: 50%;" @change="passFlagChange">
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="languageSource.AdjustmentApply.opinion" prop="reviewComment" class="row-margin">
              <el-input type="textarea" v-model="variables.reviewComment" rows="6" style="width: 50%;" :placeholder="languageSource.LocationLang.approvalCommentMsg"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="backTo" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
          <el-button type="primary" @click="checkSubmit('variables')" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
        </el-form-item>

      </el-form>
      <el-row v-else :gutter="20" type="flex" justify="center">
        <el-col :span="9" v-if="!formState" >
          <div>
            <router-link :to="{ path: '/stallplan/businessDelegation?primarycolor=2b579a' }" class="b-m-l"><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
            <el-button type="success" @click="saveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
            <el-button type="primary" @click="refuseSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
          </div>
        </el-col>
        <el-col :span="4" :offset="9" v-else>
          <div>
            <router-link :to="{ path: '/stallplan/businessDelegation?primarycolor=2b579a' }" ><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <el-row v-else>
    <el-col :span="6" :offset="9" class="sub-button">
      <div>
        <router-link :to="{ path: '/stallplan/businessDelegation?primarycolor=2b579a' }" class="b-m-l"><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
        <el-button type="success" @click="saveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
        <el-button type="primary" @click="startSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import config from './index';
export default {
  name: 'approval',
  components: {
    'headline': () => import('../../components/headline.vue'),
    'approvalItem': () => import('./approvalItem.vue')

  },
  props: {
    'languageSource': {
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
      'itemData': [],
      'curItem': {},
      'visiableState': true, //审核标签显示状态
      'formState': false, //审核完成返回按钮显示状态
      'formRefuse': false, //审核拒绝表单显示状态
      'rules': {
        // passFlag: [
        //   { required: true, message: '请选择审核意见', trigger: 'change' }
        // ],
        // reviewComment: [
        //   { required: true, message: '请输入审核建议', trigger: 'blur' },
        //   { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        // ]
      },
      'fullscreenLoading': false
    };
  },
  created () {
    this.getDetail();
    let languageSource = this.languageSource;
    this.rules = {
      passFlag: [
        { required: true, message: languageSource.LocationLang.approvalMsg, trigger: 'change' }
      ],
      reviewComment: [
        { required: true, message: languageSource.LocationLang.approvalCommentMsg, trigger: 'blur' },
        { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'blur' }
      ]
    };
  },
  methods: {
    getDetail () {

    },
    //返回首页
    backTo () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.reviewMsg, languageSource.CommonLang.tips, "warning", async () => {
        this.$router.push({ path: '/stallplan/businessDelegation?primarycolor=2b579a' });
      });
    },
    //审核提交
    checkSubmit (formName) {
      let submitData = {
        "businessKey": this.$route.query.businessKey,
        "id": this.curItem.id,
        "actId": this.curItem.actId,
        "variables": this.variables
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.$http.postJson(this.config.api.submitApprove, submitData)
            .then(res => {
              this.fullscreenLoading = false;
              this.$router.push({ path: '/stallplan/businessDelegation?primarycolor=2b579a' });
            });
        } else {
          return false;
        }
      });
    },
    //开启流程时提交
    startSubmit () {
      this.fullscreenLoading = true;
      this.$http.postJson(this.config.api.startApprove, this.$route.query)
        .then((res) => {
          this.fullscreenLoading = false;
          this.$router.push({ path: '/stallplan/businessDelegation?primarycolor=2b579a' });
        });
    },
    //流程开启保存方法
    startSave () {

    },
    //流程拒绝重新提交方法
    refuseSubmit () {
      let submitData = {
        "businessKey": this.$route.query.businessKey,
        "id": this.curItem.id,
        "actId": this.curItem.actId
      };
      this.fullscreenLoading = true;
      this.$http.postJson(this.config.api.reStartApprove, submitData)
        .then(res => {
          this.fullscreenLoading = false;
          this.$router.push({ path: '/stallplan/businessDelegation?primarycolor=2b579a' });
        });
    },
    //保存方法
    saveFunc () {
      let saveData = {
        schemeId: this.$route.query.businessKey
      };
      this.fullscreenLoading = true;
      this.$http.postJson(this.config.api.updateSchema, saveData)
        .then(res => {
          this.fullscreenLoading = false;
          this.$router.push({ path: '/stallplan/businessDelegation?primarycolor=2b579a' });
        });
    },
    //根据审核判断审核意见是否要校验
    passFlagChange (value) {
      let languageSource = this.languageSource;
      if (value === '1') { //选择通过不需要填写审核意见
        this.rules.reviewComment = [];
        this.$refs.variables.clearValidate(['reviewComment']);
      } else {
        this.rules.reviewComment = [
          // { required: true, message: '请输入审核建议', trigger: 'blur' },
          // { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
          { required: true, message: languageSource.LocationLang.approvalCommentMsg, trigger: 'blur' },
          { max: 200, message: languageSource.LocationLang.longMsg, trigger: 'blur' }
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
