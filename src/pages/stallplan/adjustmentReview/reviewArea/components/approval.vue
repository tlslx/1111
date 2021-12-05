<template>
  <el-container v-if="visiableState">
    <el-header >
      <headline :label="languageSource.AdjustmentApply.check" />
    </el-header>

    <el-main >
      <label-item :data="itemData"></label-item>
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
          <el-button type="primary" @click="checkSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
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
// import { Loading } from 'element-ui';
import config from '../../components';

export default {
  name: 'approval',
  components: {
    'headline': () => import('../../../components/headline.vue'),
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
      'backPath': '/stallplan/reviewArrangement',
      'currentRow': {},
      'itemData': []
    };
  },
  created () {
    let tag = this.$route.query.tag;
    if (tag === "reviewArrangement") { //商协会位置安排
      this.backPath = '/stallplan/reviewArrangement';
    } else if (tag === "workDepartment") { //工作部审核
      this.backPath = '/stallplan/workDepartmentReview';
    } else if (tag === "foreignTradeDepartment") { //外贸司审核
      this.backPath = '/stallplan/foreignTradeReview';
    }
    this.getDetail();
  },
  methods: {
    getDetail () {
      let schemeStatus = this.$route.query.scopeRow.schemeStatus;
      let tag = this.$route.query.tag;
      let params = { 'json': {
        "schemeId": this.$route.query.scopeRow.schemeId,
        "workFlowParam": {
          "businessKey": this.$route.query.scopeRow.schemeId
        }
      }};
      this.fullscreenLoading = true;
      this.$http.get(this.config.api.reviewArrangementGetDetail, params)
        .then((res) => {
          this.fullscreenLoading = false;
          //如果最后一个节点没有结束时间，当前就是最后一个节点
          let workData = res.workFlowLogData.data;
          let currentRows = workData.filter(v => v.endTime === "");
          let current = currentRows ? currentRows[0] : {};
          let itemData = workData.filter(v => v.endTime !== "");
          this.currentRow = current;
          this.itemData = itemData;
          //未提交状态，只显示三个按钮
          if (schemeStatus === 5 && itemData.length === 0) {
            this.visiableState = false;
          } else if (schemeStatus === 5 && current.actId === 'toBeSubmit') { //拒绝之后重新提交
            this.formRefuse = true;
            this.formState = false;
            this.visiableState = true;
          } else if (schemeStatus === 6 || schemeStatus === 3) { //6: 作废方案，只显示返回按钮, 3: 审核通过，只显示返回按钮
            this.formRefuse = true;
            this.formState = true;
          }
          //商协会位置安排只有提交和拒绝之后重新提交方法
          if (tag === "reviewArrangement" && ((schemeStatus !== 5 && current && current.actId !== 'toBeSubmit') || schemeStatus === 1)) {
            this.formRefuse = true;
            this.formState = true;
          }
        });
    },
    //返回首页
    backTo () {
      this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
    },
    //审核提交
    checkSubmit () {
      let scopeRow = this.$route.query.scopeRow;
      let currentRow = this.currentRow;
      let applicationIds = this.applicationIds;
      let flags = [];
      let comments = [];
      for (let i = 0; i < applicationIds.length; i++) {
        flags.push('1');
        comments.push('通过');
      }
      let submitData = {
        "schemeId": scopeRow.schemeId,
        "schemeName": scopeRow.schemeName,
        "exhibitionPeriod": scopeRow.exhibitionPeriod,
        "boothCode": scopeRow.boothCode,
        "exhibitionAreaCode": scopeRow.exhibitionAreaCode,
        "exhibitionAreaName": scopeRow.exhibitionAreaName,
        "exhibitionProperty": scopeRow.exhibitionProperty,
        "sessionNumber": scopeRow.sessionNumber,
        "actId": scopeRow.actId,
        "workFlowParam": {
          "id": currentRow.id,
          "variables": {
            "businessKey": applicationIds,
            "taskPassFlags": flags,
            "taskReviewComments": comments,
            ...this.variables
          }
        }
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
      this.fullscreenLoading = true;
      let scopeRow = this.$route.query.scopeRow;
      let data = {
        "schemeId": scopeRow.schemeId,
        "schemeName": scopeRow.schemeName,
        "exhibitionPeriod": scopeRow.exhibitionPeriod,
        "boothCode": scopeRow.boothCode,
        "exhibitionAreaCode": scopeRow.exhibitionAreaCode,
        "exhibitionAreaName": scopeRow.exhibitionAreaName,
        "exhibitionProperty": scopeRow.exhibitionProperty,
        "sessionNumber": scopeRow.sessionNumber
      };
      this.$http.postJson(this.config.api.reviewArrangementStartApprove, data)
        .then((res) => {
          this.fullscreenLoading = false;
          this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
        });
    },
    //流程拒绝重新提交方法
    refuseSubmit () {
      this.fullscreenLoading = true;
      let scopeRow = this.$route.query.scopeRow;
      let submitData = {
        "schemeId": scopeRow.schemeId,
        "schemeName": scopeRow.schemeName,
        "exhibitionPeriod": scopeRow.exhibitionPeriod,
        "boothCode": scopeRow.boothCode,
        "exhibitionAreaName": scopeRow.exhibitionAreaName,
        "exhibitionProperty": scopeRow.exhibitionProperty,
        "sessionNumber": scopeRow.sessionNumber,
        "taskId": scopeRow.taskId
      };
      this.$http.postJson(this.config.api.reviewArrangementReSubmit, submitData)
        .then(res => {
          this.fullscreenLoading = false;
          this.$router.push({ path: this.backPath });
        });
    },
    //保存方法
    saveFunc () {
      let saveData = {
        schemeId: this.$route.query.scopeRow.schemeId
      };
      this.fullscreenLoading = true;
      this.$http.postJson(this.config.api.reviewArrangementUpdateSchema, saveData)
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
