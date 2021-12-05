<template>
  <el-container >
    <el-header >
      <headline :label="languageSource.AdjustmentApply.checkTitle" v-if="itemData.length > 0"/>
    </el-header>

    <el-main >
      <label-item v-if="itemData.length > 0" :data="itemData" :languageSource='languageSource'></label-item>
      <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" v-if="resultData.submit" label-position="left">
        <el-form-item :label="languageSource.AdjustmentApply.check" prop="passFlag" class="row-margin">
          <el-select v-model="variables.passFlag" :placeholder="languageSource.CommonLang.select" style="width: 50%;" @change="passFlagChange">
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.AdjustmentApply.opinion" prop="reviewComment" class="row-margin">
          <el-input type="textarea" v-model="variables.reviewComment" rows="6" maxlength="201" style="width: 50%;" :placeholder="languageSource.LocationLang.approvalCommentMsg"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="backTo" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
          <el-button type="primary" @click="checkSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
        </el-form-item>
      </el-form>

      <el-row v-else type="flex" justify="center">
        <el-col :span="9" style="text-align: center;" >
          <router-link :to="{ path: backPath + '?primarycolor=2b579a'}" class="b-m-l"><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
          <el-button v-if="resultData.save" type="success" @click="saveFunc" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.save}}</el-button>
          <el-button v-if="resultData.reSubmit" type="primary" @click="refuseSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
          <el-button v-if="resultData.start" type="primary" @click="startSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
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
    'applicationIds': {
      type: Array
    },
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
      'backPath': '/patchSchemeAdd',
      'currentRow': {},
      'itemData': [],
      'resultData': {}
    };
  },
  created () {
    let tag = this.$route.query.tag;
    if (tag === "patchSchemeAdd") { //补丁方案新增
      this.backPath = '/patchSchemeAdd';
    } else if (tag === "patchSchemeReview") { //补丁方案审核
      this.backPath = '/patchSchemeReview';
    } else if (tag === 'patchSchemePublicity') { //补丁方案公示公布
      this.backPath = '/patchSchemePublicity';
    }
    this.getDetail();
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
  },
  methods: {
    getDetail () {
      // let schemeStatus = this.$route.query.scopeRow.schemeStatus;
      // let tag = this.$route.query.tag;
      let params = { 'json': {
        "schemeId": this.$route.query.scopeRow.schemeId,
        "schemaStatus": this.$route.query.scopeRow.schemaStatus
      }};
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
      this.fullscreenLoading = true;
      this.$http.get(url, params)
        .then((res) => {
          this.fullscreenLoading = false;
          //如果最后一个节点没有结束时间，当前就是最后一个节点
          let workData = res.actLogEntities;
          let currentRows = workData.filter(v => v.endTime === "");
          let current = currentRows ? currentRows[0] : {};
          let itemData = workData.filter(v => v.endTime !== "");
          this.currentRow = current;
          this.itemData = itemData;
          this.resultData = res;
        });
    },
    //返回首页
    backTo () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.reviewMsg, languageSource.CommonLang.tips, "warning", async () => {
        this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      });
    },
    //审核提交
    checkSubmit () {
      let scopeRow = this.$route.query.scopeRow;
      let applicationIds = this.applicationIds;
      let flags = [];
      let comments = [];
      for (let i = 0; i < applicationIds.length; i++) {
        flags.push('1');
        comments.push('通过');
      }
      let submitData = {
        "schemeId": scopeRow.schemeId,
        "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }],
        "variables": this.variables
      };

      this.$refs.variables.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.$http.postJson(this.config.api.reviewArrangementSubmitApprove, submitData)
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
      this.$emit('submitFunc');
      // this.fullscreenLoading = true;
      // let scopeRow = this.$route.query.scopeRow;
      // let data = {
      //   "schemeId": scopeRow.schemeId
      // };
      // this.$http.postJson(this.config.api.reviewArrangementStartApprove, data)
      //   .then((res) => {
      //     this.fullscreenLoading = false;
      //     this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      //   });
    },
    //流程拒绝重新提交方法
    refuseSubmit () {
      this.$emit('refuseSubmitFunc');
      // this.fullscreenLoading = true;
      // let scopeRow = this.$route.query.scopeRow;
      // let submitData = {
      //   "schemeId": scopeRow.schemeId,
      //   "taskEntities": [{ "curActId": scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId }]
      // };
      // this.$http.postJson(this.config.api.reviewArrangementReSubmit, submitData)
      //   .then(res => {
      //     this.fullscreenLoading = false;
      //     this.$router.push({ path: this.backPath });
      //   });
    },
    //保存方法
    saveFunc () {
      this.$emit('saveFunc');
      // let saveData = {
      //   schemeId: this.$route.query.scopeRow.schemeId
      // };
      // this.fullscreenLoading = true;
      // this.$http.postJson(this.config.api.reviewArrangementUpdateSchema, saveData)
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
