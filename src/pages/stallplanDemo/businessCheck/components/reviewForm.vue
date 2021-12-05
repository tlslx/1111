<template>
  <el-container>
    <el-header >
      <headline :label="titleText" />
    </el-header>

    <el-main v-loading.fullscreen.lock="fullscreenLoading">
      <el-form :inline="false" label-width="120px" label-position="left">
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.oldEnterpriseName" prop="schemeName" >
              <el-input :value="formEntity.enterpriseName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="positionNature">
              <el-input :value="formEntity.positionNature" :disabled="true"></el-input>
              <i class="el-icon-info i-s">
                <span class="tip-text">{{languageSource.AdjustmentApply.seatTips}}</span>
              </i>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" prop="exhibitionType">
              <el-input :value="formEntity.exhibitionType" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionArea">
              <el-input :value="formEntity.exhibitionArea" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.adjustmentContent" prop="adjustmentContent">
              <el-input :value="formEntity.adjustmentContent" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.returnNum" prop="boothCode">
              <el-input :value="formEntity.boothCode" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.boothNum">
              <el-input :disabled="true"></el-input>
              <i class="el-icon-info i-s">
                <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
              </i>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" class="checkBtn" v-if="businessState === 0">{{languageSource.AdjustmentApply.verify}}</el-button>
            &nbsp;&nbsp;
            </el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.backNum" prop="adjustmentNumber">
              <el-input :value="formEntity.adjustmentNumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.adjuestReson" prop="adjustmentReason">
              <el-input
                type="textarea"
                :rows="4"
                :value="formEntity.adjustmentReason"
                :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item :label="languageSource.AdjustmentApply.annex" >
              <el-button type="primary"  @click="downloadFunc(formEntity.fileId)">{{languageSource.AdjustmentApply.download}}</el-button>
              <div v-for="(item, index) in fileDatas" :key="index" >
                <label class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</label>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row v-if='btnShowState' type="flex" justify="center">
        <el-col :span="2" >
          <router-link :to="{ path: '/adjustmentApplition?primarycolor=2b579a'}" ><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './index';
export default {
  name: 'reviewForm',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline.vue')
  },
  props: ["applyEntity", "languageSource"],
  data () {
    return {
      config,
      'formEntity': {},
      'btnShowState': false,
      'businessState': -1,
      'fullscreenLoading': false,
      'fileDatas': []
    };
  },
  computed: {
    titleText: function () {
      if (this.$route.query && this.$route.query.tag && this.$route.query.tag === 'adjustmentApply') {
        this.btnShowState = true;
        this.formEntity = this.$route.query.scopeRow;
        return this.languageSource.AdjustmentApply.adjustmentApplyTitle;
      } else {
        this.formEntity = this.applyEntity;
        this.btnShowState = false;
        return this.languageSource.AdjustmentApply.adjustmentReviewTitle;
      }
    }
  },
  mounted() {
    this.setBtnState();
    this.getFileName();
  },
  methods: {
    //判断返回地址及显示标题
    setBtnState () {
      let targValue = (this.$route.query && this.$route.query.tag) ? this.$route.query.tag : "";
      if (targValue === 'businessDelegation') { //交易团，只有交易团有校验按钮
        this.businessState = 0;
      }
    },
    //下载方法
    downloadFunc (id) {
      window.location.href = this.config.api.dowloadURL + '?fileIds=' + id;
    },
    //获取文件名信息
    getFileName () {
      let scopeRow = this.$route.query.scopeRow;
      let param = { fileIds: scopeRow.fileId };
      this.fullscreenLoading = true;
      this.$http.get(this.config.api.getFileNameByIds, param)
        .then(res => {
          this.fullscreenLoading = false;
          this.fileDatas = res;
        });
    }
  }
};
</script>

<style scoped>
  .checkBtn {
    margin-left: 10px;
    margin-top: 3px;
  }
  .i-s {
    color: #F56C6C;
    margin-top: 10px;
  }
  .tip-text {
    color: #606266;
    font-size: 12px;
    margin-left: 5px;
  }
  .download-style {
    color: #2c579b;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
