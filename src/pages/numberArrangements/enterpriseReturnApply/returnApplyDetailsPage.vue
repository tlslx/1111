<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="退回申请详情页" name="first">
      <el-row type="flex" justify="end">
        <el-button type="primary" size="medium" @click="goBack">返回</el-button>
      </el-row>
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
          <el-form-item label="退回前品牌展位数：" prop="lastBoothNumber">{{ queryFormData.lastBoothNumber }}</el-form-item>

        </div>
        <div class="back-apply-div">
          <el-form-item label="本届品牌展位数变化量：" prop="currentChangeNumber">{{ queryFormData.currentChangeNumber }}</el-form-item>
          <el-form-item label="本届保留品牌展位数：" prop="currentReserveNumber">{{ queryFormData.currentReserveNumber }}</el-form-item>
        </div>

        <div class="back-apply-div">
          <el-form-item label="情况分类：" prop="backType">{{ queryFormData.backType | backTypeFilt }}</el-form-item>
        </div>
        <div class="back-apply-div">
          <el-form-item label="企业申请退回原因：" prop="backReason">
            <el-input type="textarea" v-model="queryFormData.backReason" readonly></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="back-apply-form">
        <h4>关于退展位收费约束机制的时间机制</h4>
        <p>
          {{ aboutBackText }}
        </p>
        <div class="back-apply-confirm">
          <div><el-checkbox label="本司已读并确认以上所述内容" checked disabled></el-checkbox></div>
          <div><a href="javascript:;">企业确认退回申请书.doc</a></div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: 'first',
      boothAffirm: {
        boothAffirmId: ''
      },
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
    ...mapActions('enterpriseReturnApply', ['postApplicationDetail']),
    ...mapActions('numberBrands', ['getExplainSet']),
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
</style>
