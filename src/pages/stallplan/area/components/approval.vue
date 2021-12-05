<template>
  <el-container v-if="visiableState">
    <el-header >
      <headline :label="languageSource.AdjustmentApply.check" />
    </el-header>

    <el-main >
      <label-item :data="itemData" :languageSource="languageSource"></label-item>
      <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" v-if="!formRefuse">
        <el-form-item :label="languageSource.AdjustmentApply.check" prop="passFlag" class="row-margin">
          <el-select v-model="variables.passFlag" placeholder="请选择" style="width: 50%;">
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.AdjustmentApply.opinion" prop="reviewComment" class="row-margin">
          <el-input type="textarea" v-model="variables.reviewComment" rows="6" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkSubmit('variables')" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
          <confirm-button :message="languageSource.AdjustmentApply.reviewMsg" button-type="default" @remove="backTo">{{languageSource.AdjustmentApply.backBtn}}</confirm-button>
        </el-form-item>

      </el-form>
      <el-row v-else>
        <el-col :span="6" :offset="9" v-if="!formState" >
          <div>
            <el-button type="success" @click="saveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
            <el-button type="primary" @click="refuseSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
            <router-link :to="{ path: backPath + '?primarycolor=2b579a'}" class="b-m-l"><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
          </div>
        </el-col>
        <el-col :span="2" :offset="11" v-else>
          <div>
            <router-link :to="{ path: backPath + '?primarycolor=2b579a' }" ><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <el-row v-else>
    <el-col :span="6" :offset="9" class="sub-button">
      <div>
        <el-button type="success" @click="saveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
        <el-button type="primary" @click="startSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
        <router-link :to="{ path: backPath + '?primarycolor=2b579a' }" class="b-m-l"><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { Loading } from 'element-ui';
import config from './index';

export default {
  name: 'approval',
  components: {
    'headline': () => import('../../components/headline.vue'),
    'label-item': () => import('./labelItem.vue')
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
        passFlag: [
          { required: true, message: '请选择审核意见', trigger: 'change' }
        ],
        reviewComment: [
          { required: true, message: '请输入审核建议', trigger: 'blur' },
          { max: 200, message: '长度不能超过200个字符', trigger: 'blur' }
        ]
      },
      'fullscreenLoading': false,
      'backPath': '/stallplan/seat'
    };
  },
  created () {
    this.getDetail();
    let tag = this.$route.query.tag;
    if (tag === "seat") { //位置安排
      this.backPath = '/stallplan/seat';
    } else if (tag === "seatOutsourceReview") { //外包审核
      this.backPath = '/stallplan/seatOutsourceReview';
    } else if (tag === "seatWorkReview") { //工作部审核
      this.backPath = '/stallplan/seatWorkReview';
    } else if (tag === "seatForeignReview") { //外贸司审核
      this.backPath = '/stallplan/seatForeignReview';
    // } else if (tag === "seatReview") { //方案审核
    //   this.backPath = '/stallplan/seatReview';
    // } else if (tag === "foreignTradeDepartment") { //外贸司审核汇总
    //   this.backPath = '/stallplan/foreignTradeDepartment';
    }
    // this.source.quarter = await kindo.dictionary.get('languageType');
  },
  methods: {
    getDetail () {
      let params = { 'json': { "businessKey": this.$route.query.businessKey }};
      let tag = this.$route.query.tag;
      const loading = Loading.service({
        lock: true
      });
      this.$http.get(this.config.api.getApproveDetails, params)
        .then((res) => {
          let resLength = res.length;
          let lastItem = res.length > 0 ? res[resLength - 1] : {};
          loading.close();
          this.visiableState = resLength > 0;
          //如果已审批只显示日志和返回按钮
          if (this.$route.query.description === "已审批") {
            this.formState = true;
            this.formRefuse = true;
          } else if (lastItem.actId === "positionAssignApply") { //如果当前流程审核已被拒绝则只显示流程日志和提交按钮
            this.formRefuse = true;
            this.formState = false;
          } else if (this.$route.query.description === "未提交") {
            this.visiableState = false;
          } else if (tag === 'seat') { //位置安排没有审核页面
            this.formState = true;
            this.formRefuse = true;
          }
          //如果最后一个节点没有结束时间，当前就是最后一个节点
          this.curItem = !lastItem.endTime ? res.pop() : {};
          this.itemData = res.filter(v => v.endTime !== "");
        });
    },
    //返回首页
    backTo () {
      this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
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
              this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
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
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        });
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
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
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
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        });
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
