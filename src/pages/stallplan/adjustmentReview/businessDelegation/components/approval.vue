<template>
  <el-container >
    <el-header >
      <headline :label="titleText" />
    </el-header>

    <el-main >
      <!-- 调整申请查看, 商协会查看 -->
      <template v-if='businessState === 1'>
        <label-item :data="itemData" :languageSource='languageSource'></label-item>
        <el-row>
          <el-col :span="4" :offset="10" >
            <!-- <el-button :type="refuseBtnType(applyEntity.status)" @click="refuseFunc(applyEntity)" v-if="refuseBtnShow" >{{languageSource.AdjustmentApply.refuse}}</el-button> -->
            <el-button @click="backTo" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <div>
          <!-- 交易团显示模板 -->
          <label-item :data="itemData" :languageSource='languageSource'></label-item>
          <business-check-swap ref="businessCheckRef" v-if="businessState === 0" :languageSource='languageSource'/>
          <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" v-if='checkBtnState(itemFlag)'>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.AdjustmentApply.check" prop="passFlag" class="row-margin">
                  <el-select v-model="variables.passFlag" placeholder="请选择" >
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.AdjustmentApply.suggest" prop="reviewComment" class="row-margin">
                  <el-input type="textarea" v-model="variables.reviewComment" rows="6" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="checkSubmit(currentItem)" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
              <confirm-button :message="languageSource.AdjustmentApply.reviewMsg" button-type="default" @remove="backTo">{{languageSource.AdjustmentApply.backBtn}}</confirm-button>
            </el-form-item>
          </el-form>
          <el-row v-else>
            <el-col :span="2" :offset="11" >
              <el-button @click="backTo">{{languageSource.AdjustmentApply.backBtn}}</el-button>
            </el-col>
          </el-row>
        </div>
      </template>

      <el-dialog
        :title="languageSource.AdjustmentApply.refuseReson"
        :visible.sync="dialogFormVisible"
        @close="clear"
        width="60%">
        <el-form ref="refuseForm" :model="refuseForm" :rules="refuseRule" style="margin-bottom: 20px;">
          <el-form-item :label="languageSource.AdjustmentApply.refuseReson" prop="refuseReson">
            <el-input type="textarea" v-model="refuseForm.refuseReson" rows="6" style="width: 90%;" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" >
          <el-button @click="dialogFormVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
          <el-button type="primary" @click="refuseSure" :loading="refuseLoading">{{languageSource.CommonLang.confirm}}</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>

</template>

<script>
import config from '../../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'approval',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../../components/headline.vue'),
    'label-item': () => import('./labelItem.vue'),
    'businessCheckSwap': () => import('./businessCheckSwap')
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
      config,
      'variables': {
        passFlag: '',
        reviewComment: ''
      },
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
      'businessState': 0, //交易团商协会显示 0：交易团， 1：商协会,  2: 展位调整申请
      'backPath': '/stallplan/businessDelegation',
      'titleText': '审核', //显示标题
      'btnState': true, //按钮状态
      //拒绝表单
      refuseForm: {
        refuseReson: ''
      },
      refuseRule: {
        refuseReson: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]
      },
      //拒绝参数
      refuseObj: {},
      //拒绝确定按钮加载状态
      refuseLoading: false,
      //审核拒绝弹框状态
      dialogFormVisible: false
    };
  },
  computed: {
    //拒绝按钮显示判断
    refuseBtnShow: function () {
      let targValue = (this.$route.query && this.$route.query.tag) ? this.$route.query.tag : "";
      if (targValue === 'businessAssociation') {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted () {
    this.setBackPath();
  },
  methods: {
    //返回首页
    backTo () {
      let targValue = (this.$route.query && this.$route.query.tag) ? this.$route.query.tag : "";
      if (targValue === 'reviewArea') {
        this.$router.push({ path: this.backPath + '?primarycolor=2b579a', query: { scopeRow: this.$route.query.paramRow }});
      } else {
        this.$router.push({ path: this.backPath + '?primarycolor=2b579a' });
      }
    },
    //审核提交
    checkSubmit (currentItem) {
      let applyEntity = this.applyEntity;
      let scopeRow = this.$route.query.scopeRow;
      if (this.$refs.businessCheckRef) {
        this.$refs.businessCheckRef.checkForm();
      // let swapForm = this.$refs.businessCheckRef.variables;  //交易团审核页面表单数据
      }
      this.$refs.variables.validate((valid) => {
        if (valid) {
          let submitData = {
            "applicationId": applyEntity.applicationId,
            "oldSchemeId": applyEntity.oldSchemeId,
            "schemeDetailId": applyEntity.schemeDetailId,
            "enterpriseName": applyEntity.enterpriseName,
            "exhibitionArea": applyEntity.exhibitionArea,
            "exhibitionType": applyEntity.exhibitionType,
            "adjustmentReason": applyEntity.adjustmentReason,
            "adjustmentContent": applyEntity.adjustmentContent,
            "adjustmentNumber": applyEntity.adjustmentNumber,
            "boothCode": applyEntity.boothCode,
            "workFlowParam": {
              "actId": currentItem.actId,
              "businessKey": applyEntity.applicationId,
              "id": scopeRow.taskId,
              "variables": this.variables
            }
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
      let targValue = (this.$route.query && this.$route.query.tag) ? this.$route.query.tag : "";
      if (targValue === 'businessDelegation') { //交易团
        this.backPath = '/stallplan/businessDelegation';
        this.titleText = '交易团审核';
        this.businessState = 0;
      } else if (targValue === 'businessAssociation') { //商协会
        this.backPath = '/stallplan/businessAssociation';
        this.titleText = '商协会审核';
        this.businessState = 1;
      } else if (targValue === 'adjustmentApply') {  //展位调整申请
        this.backPath = '/stallplan/adjustmentApplition';
        this.titleText = '审核结果记录';
        this.businessState = 1;
      } else if (targValue === 'reviewArea') { //商协会位置安排
        this.backPath = '/stallplan/reviewArea';
        this.titleText = '商协会审核';
        this.businessState = 1;
      }
    },
    //判断当前页面显示状态
    checkBtnState (itemFlag) {
      let stete = this.$route.query.scopeRow.taskType === '0' && itemFlag;
      return stete;
      // return true;
    },
    //拒绝点击
    refuseFunc (row) {
      if (row.status !== 1) {
        this.$message.error('申请已绑定方案，不可以拒绝');
        return false;
      }
      this.dialogFormVisible = true;
      this.refuseObj = row;
    },
    //拒绝确定提交
    refuseSure () {
      this.refuseLoading = true;
      let row = this.refuseObj;
      this.$refs.refuseForm.validate(valid => {
        if (valid) {
          let submitData = {
            "applicationId": row.applicationId,
            "oldSchemeId": row.oldSchemeId,
            "oldSchemeDetailId": row.oldSchemeDetailId,
            "enterpriseName": row.enterpriseName,
            "exhibitionArea": row.exhibitionArea,
            "exhibitionType": row.exhibitionType,
            "adjustmentReason": row.adjustmentReason,
            "adjustmentContent": row.adjustmentContent,
            "adjustmentNumber": row.adjustmentNumber,
            "boothCode": row.boothCode,
            "workFlowParam": {
              "businessKey": row.applicationId,
              "id": row.taskId,
              "variables": {
                "passFlag": "0", // 驳回申请默认为0,
                "reviewComment": this.refuseForm.refuseReson // 审核意见。
              }
            }
          };
          this.$http.postJson(this.config.api.businessRefuse, submitData)
            .then(res => {
              this.refuseLoading = false;
              this.$refs.table.reloadData();
              this.dialogFormVisible = false;
            });
        }
      });
    },
    //清除方法
    clear () {
      this.$refs.refuseForm.resetFields();
    },
    //判断按钮状态
    refuseBtnType (status) {
      if (status !== 1) {
        return 'info';
      } else {
        return 'primary';
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
