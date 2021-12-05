<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="退回申请详情页" name="first">
      <el-form class="back-apply-details" :model="queryFormData" :inline="true" label-width="170px">
        <div class="back-apply-div">
          <el-form-item label="企业名称：" prop="companyName">{{ queryFormData.companyName }}</el-form-item>
          <el-form-item label="交易团：" prop="dealClusterName">{{ queryFormData.dealClusterName }}</el-form-item>
        </div>
        <div class="back-apply-div">
          <el-form-item label="广交会编码：" prop="cantonFairCode">{{ queryFormData.cantonFairCode }}</el-form-item>
          <el-form-item label="展期：" prop="exhibitionPeriod">{{ queryFormData.exhibitionPeriod }}</el-form-item>
        </div>
        <div class="back-apply-div">
          <el-form-item label="展区：" prop="exhibitionAreaName">{{ queryFormData.exhibitionAreaName }}</el-form-item>
          <el-form-item label="退回前品牌展位数量：" prop="lastBoothNumber">{{ queryFormData.lastBoothNumber }}</el-form-item>
        </div>
        <div class="back-apply-div">
          <el-form-item label="退回品牌展位数：" prop="currentChangeNumber">{{ queryFormData.currentChangeNumber }}</el-form-item>
          <el-form-item label="保留品牌展位数：" prop="currentReserveNumber">{{ queryFormData.currentReserveNumber }}</el-form-item>
        </div>
        <div class="back-apply-div">
          <el-form-item label="情况分类：" prop="backType">{{ queryFormData.backType | backTypeFilt }}</el-form-item>
        </div>
        <div class="back-apply-div">
          <el-form-item label="退回原因：" prop="backReason">
            <!--
            <el-input type="textarea" v-model="queryFormData.backReason" readonly></el-input>
            -->
            {{ queryFormData.backReason }}
          </el-form-item>
        </div>
      </el-form>
      <div class="back-apply-form">
        <!--
        <h4>关于退展位收费约束机制的时间机制</h4>
        <p>
          {{ aboutBackText }}
        </p>
        <div class="back-apply-confirm">
          <div><el-checkbox label="本司已读并确认以上所述内容" checked disabled></el-checkbox></div>
          <div v-if="fileId"><a href="javascript:;" @click="handleBackBookDownload">企业确认退回申请书.doc</a></div>
        </div>
        -->
        <div class="back-apply-confirm">
          <div v-if="fileId"><a href="javascript:;" @click="handleBackBookDownload">企业确认退回申请书</a></div>
        </div>
        <el-form ref="backApplyForm" class="checkForm" :model="checkData" :rules="rules">
          <el-form-item label="审核结果：" prop="dealCheckStatus">
            <el-select v-model="checkData.dealCheckStatus">
              <el-option v-for="(item, index) in checkResultOpts" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不通过原因：" v-if="checkData.dealCheckStatus === '2'" prop="dealCheckOpinion" label-width="110px">
            <el-input type="textarea" v-model="checkData.dealCheckOpinion" :rows="4" maxlength="120"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="handleSubmit('backApplyForm')">提交</el-button>
          <el-button size="medium" @click="goBack">返回</el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      boothAffirm: {
        boothAffirmId: ''
      },
      fileId: '',
      queryFormData: {
        companyName: '',
        backBooth: '',
        cantonFairCode: '',
        dealClusterName: '',
        currentChangeNumber: '',
        currentReserveNumber: '',
        exhibitionAreaName: '',
        backType: '',
        exhibitionPeriod: '',
        backReason: '',
        lastBoothNumber: ''
      },
      checkResultOpts: [{ value: '1', label: '审核通过' }, { value: '2', label: '审核不通过' }],
      checkData: {
        dealCheckStatus: '',
        dealCheckOpinion: '',
        checkStatus: '',
        applyRole: ''
      },
      rules: {
        dealCheckStatus: [{ required: true, message: '请选择', trigger: 'change' }],
        dealCheckOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      aboutBackText: ''
    };
  },
  filters: {
    backTypeFilt: value => {
      switch (value) {
        case 1:
          return '全部退回';
        case 2:
          return '部分退回';
        default:
          return '';
      }
    }
  },
  computed: {
    ...mapGetters('enterpriseReturnApply', ['applyDetailsData'])
  },
  created() {
    this.boothAffirm.boothAffirmId = this.$route.query.id;
    this.fileId = this.$route.query.file;
    let fullScreenloading = this.$loading({ fullscreen: true });
    this.postApplicationDetail(this.boothAffirm).then(res => {
      this.queryFormData = {
        companyName: res.companyName,
        backBooth: res.backBooth,
        cantonFairCode: res.cantonFairCode,
        dealClusterName: res.dealClusterName,
        currentChangeNumber: res.currentChangeNumber,
        currentReserveNumber: res.currentReserveNumber,
        exhibitionAreaName: res.exhibitionAreaName,
        backType: res.backType,
        exhibitionPeriod: res.exhibitionPeriod,
        backReason: res.backReason,
        lastBoothNumber: res.lastBoothNumber
      };
      this.checkData.applyRole = res.applyRole;
      // 获取退展位约束机制说明
      this.getExplainSet().then(data => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
        this.aboutBackText = data.projectContent;
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
    }).catch(e => {
      this.$nextTick(() => {
        fullScreenloading.close();
      });
    });
  },
  methods: {
    ...mapActions('enterpriseReturnApply', ['postApplicationDetail', 'postBackBookCheckSubmit']),
    ...mapActions('numberBrands', ['getExplainSet']),
    // 附件下载
    handleBackBookDownload() {
      window.open(`${process.env.API_NA_URL}/api/boothreturned/attachment/download?fileId=${this.fileId}&token=${localStorage.getItem("USER_TOKEN")}`, '_parent');
    },
    // 提交
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let submitObj = {
            boothAffirmId: this.boothAffirm.boothAffirmId,
            checkStatus: this.checkData.checkStatus,
            dealClusterId: this.$store.getters.userInfo.org.deptId,
            dealCheckStatus: this.checkData.dealCheckStatus,
            dealCheckOpinion: this.checkData.dealCheckOpinion,
            workCheckStatus: '0',
            applyRole: this.checkData.applyRole
          };
          let dealSts = this.checkData.dealCheckStatus;
          let workSts = this.$route.query.work;
          if (dealSts === '0') {
            submitObj.checkStatus = '0';
          } else if (dealSts === '1' && workSts === '0') {
            submitObj.checkStatus = '3';
          } else if (workSts === '1') {
            submitObj.checkStatus = '1';
          } else if (dealSts === '2' || workSts === '2') {
            submitObj.checkStatus = '2';
          } else {
            submitObj.checkStatus = '';
          }
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postBackBookCheckSubmit(submitObj).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message.success('提交成功');
            this.$router.push({ path: '/enterpriseReturnApply' });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 返回
    goBack() {
      this.$router.push({ path: '/enterpriseReturnApply' });
    }
  }
};
</script>
<style scoped>
.back-apply-details{
  width: 60%;
  margin: 0 auto;
  line-height: 40px;
}
.back-apply-form{
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.back-apply-form p{
  text-align: justify;
  text-justify: inter-ideograph;
}
.back-apply-div .el-form-item{
  width: 48%;
}
.back-apply-confirm{
  display: flex;
  justify-content: space-between;
}
.checkForm{
  width: 50%;
  min-width: 550px;
  margin-top: 20px;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
