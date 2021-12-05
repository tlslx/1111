/**
* @file 企业展品管理---审核意见
*/
<style scoped>
  .table-img {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
  .btn-arr {
    margin-left: 60%;
  }
  .aud-exhibit >>> .el-form-item__content {
    word-wrap: break-word!important;
    width: 550px;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业展品" name="first">
      <el-form v-if="hack" :model="form" ref="form" label-width="60%" label-position="right" style="width: 50%; margin-top: 30px;">
        <!-- <el-form-item label="展品名称：">
          {{ form.exhibitNameCh }}
        </el-form-item> -->
        <el-form-item label="展品类别：">
          {{ dealWithProType }}
        </el-form-item>
        <el-form-item label="展品名称（中文）：">
          {{ form.exhibitNameCh }}
        </el-form-item>
        <el-form-item label="展品名称（英文）：">
          {{ form.exhibitNameEn }}
        </el-form-item>
        <el-form-item label="展品关键字（中文）：">
          {{ form.exhibitKeywordCh }}
        </el-form-item>
        <el-form-item label="展品关键字（英文）：">
          {{ form.exhibitsKeywordEn }}
        </el-form-item>
        <el-form-item label="展品型号（中文）：">
          {{ form.exhibitModelCh }}
        </el-form-item>
        <el-form-item label="展品型号（英文）：">
          {{ form.exhibitModelEn }}
        </el-form-item>
        <el-form-item label="展品材质（中文）：">
          {{ form.exhibitMaterialCh }}
        </el-form-item>
        <el-form-item label="展品材质（英文）：">
          {{ form.exhibitMaterialEn }}
        </el-form-item>
        <el-form-item label="展品尺寸：">
          {{ form.exhibitSizeCh }}
        </el-form-item>
        <el-form-item label="展品特征：">
          {{ getProductFeature }}
        </el-form-item>
        <el-form-item label="特征描述（中文）：">
          {{ form.exhibitFeatureDescribeCh }}
        </el-form-item>
        <el-form-item label="特征描述（英文）：" class="aud-exhibit">
          {{ form.exhibitFeatureDescribeEn }}
        </el-form-item>
        <el-form-item label="展品图片：">
          <img :src="getImgSrc" class="table-img">
        </el-form-item>
        <el-form-item label="是否对图片保密：">
          {{ getYesOrNo('imageSecrecyStatus') }}
        </el-form-item>
        <el-form-item label="是否愿意参加CF奖评选：">
          {{ getYesOrNo('cfPrizeStatus') }}
        </el-form-item>
        <el-form-item label="是否为刀具展品：">
          {{ getYesOrNo('isToolStatus') }}
        </el-form-item>
        <div v-if="form.isToolStatus === '1'">
          <el-form-item label="规格（中文）：">
            {{ form.toolSpecCh }}
          </el-form-item>
          <!-- <el-form-item label="规格（英文）：">
            {{ form.toolSpecEn }}
          </el-form-item> -->
          <el-form-item label="数量：">
            {{ form.toolCount }}
          </el-form-item>
          <el-form-item label="刀具展品展位号：">
            {{ form.boothNo }}
          </el-form-item>
        </div>
        <el-form-item label="展品品牌（中文）：">
          {{ form.brandCh }}
        </el-form-item>
        <el-form-item label="展品品牌（英文）：">
          {{ form.prandEn }}
        </el-form-item>
        <el-form-item label="产地（中文）：">
          {{ form.producingAreaCh }}
        </el-form-item>
        <el-form-item label="产地（英文）：">
          {{ form.producingAreaEn }}
        </el-form-item>
        <el-form-item label="展品颜色（固定单一颜色）(中文)：">
          {{ form.exhibitColourOneCh }}
        </el-form-item>
        <el-form-item label="展品颜色（固定单一颜色）（英文）：">
          {{ form.exhibitColourOneEn }}
        </el-form-item>
        <el-form-item label="展品颜色（多色可选）（中文）：">
          {{ form.exhibitColourTwoCh }}
        </el-form-item>
        <el-form-item label="展品颜色（多色可选）（英文）：">
          {{ form.exhibitColourTwoEn }}
        </el-form-item>
        <el-form-item label="展品颜色（可定制颜色）（中文）：">
          {{ form.exhibitColourThreeCh }}
        </el-form-item>
        <el-form-item label="展品颜色（可定制颜色）（英文）：">
          {{ form.exhibitColourThreeEn }}
        </el-form-item>
        <el-form-item label="包装（中文）：">
          {{ form.packageCh }}
        </el-form-item>
        <el-form-item label="包装（英文）：">
          {{ form.packageEn }}
        </el-form-item>
        <el-form-item label="本项展品的行业认证：">
          {{ getIndustryCertification }}
        </el-form-item>
        <el-form-item label="付款方式：">
          {{ getdicPay }}
        </el-form-item>
        <el-form-item label="计价方式:">
          {{ getdicVal }}
        </el-form-item>
        <el-form-item label="愿意接受的最小订单量:">
          {{ form.minimumOrderCount }}
        </el-form-item>
        <el-form-item label="生产所需时间:">
          {{ form.productionNeedDate }}
        </el-form-item>
        <el-form-item label="离岸口岸（中文）:">
          {{ form.offshorePortCh }}
        </el-form-item>
        <el-form-item label="离岸口岸（英文）:">
          {{ form.offshorePortEn }}
        </el-form-item>
        <el-form-item label="审核意见：">
          <el-input type="textarea" :rows="5" maxlength="255" v-model="form.approveExplain"></el-input>
        </el-form-item>
        <div class="btn-arr">
          <el-button type="primary" @click="submitForm" v-loading.fullscreen.lock="fullscreenLoading">通过</el-button>
          <el-button @click="resetForm" v-loading.fullscreen.lock="fullscreenLoading">不通过</el-button>
          <el-button @click="returnBack" v-loading.fullscreen.lock="fullscreenLoading">返回</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import { $helper } from "@/scripts/project/utils";
  export default {
    data() {
      return {
        activeName: "first",
        fullscreenLoading: false,
        form: {
          approveExplain: ""
        },
        // 展品特征字典
        dicFeature: [],
        dicTypeData: {},
        // 行业认证
        dicCert: [],
        hack: true,
        exhibitId: null
      };
    },
    computed: {
      ...mapGetters('enterExManagement', ['getopinion', 'getPro']),
      // ...mapGetters('typeData', ['dicTypeData']),
      // 处理展品类别
      dealWithProType() {
        let _this = this;
        let newexhibitTypeOne = '';
        let newexhibitTypeTwo = '';
        let newexhibitTypeThree = '';
        if (this.form.exhibitTypeOne) {
          newexhibitTypeOne = _this.getDicText(_this.dicTypeData.exhibit_type_one, this.form.exhibitTypeOne);
        } else {
          newexhibitTypeOne = '';
        }
        // this.form.newExhibitTypeOne = newexhibitTypeOne;
        if (this.form.exhibitTypeTwo) {
          newexhibitTypeTwo = " " + '|' + " " + _this.getDicText(_this.dicTypeData.exhibit_type_two, this.form.exhibitTypeTwo);
        } else {
          newexhibitTypeTwo = '';
        }
        // this.form.newExhibitTypeTwo = newexhibitTypeTwo;
        if (this.form.exhibitTypeThree) {
          newexhibitTypeThree = " " + '|' + " " + _this.getDicText(_this.dicTypeData.exhibit_type_three, this.form.exhibitTypeThree);
        } else {
          newexhibitTypeThree = '';
        }
        // this.form.newExhibitTypeThree = newexhibitTypeThree;
        return newexhibitTypeOne + newexhibitTypeTwo + newexhibitTypeThree;
      },
      // 处理展品特征
      getProductFeature() {
        let _this = this;
        let currentStr = "";
        if (_this.form.exhibitFeature && _this.form.exhibitFeature !== "") {
          let currentArr = _this.form.exhibitFeature.split(",");
          currentArr.forEach((value, index, array) => {
            currentStr += index === (array.length - 1) ? $helper.getDictLabel(_this.dicFeature, value) : ($helper.getDictLabel(_this.dicFeature, value) + '，');
          });
        }
        return currentStr;
      },
      // 处理行业认证
      getIndustryCertification() {
        let currentStr = "";
        if (this.form.industryCertification && this.form.industryCertification !== "") {
          let currentArr = this.form.industryCertification.split(",");
          currentArr.forEach((value, index, array) => {
            currentStr += index === (array.length - 1) ? $helper.getDictLabel(this.dicCert, value) : ($helper.getDictLabel(this.dicCert, value) + '，');
          });
        }
        return currentStr;
      },
      getdicPay() {
        let currentStr = "";
        if (this.form.paymentMethod && this.form.paymentMethod !== "") {
          let currentArr = this.form.paymentMethod.split(",");
          currentArr.forEach((value, index, array) => {
            currentStr += index === (array.length - 1) ? $helper.getDictLabel(this.dicPay, value) : ($helper.getDictLabel(this.dicPay, value) + '，');
          });
        }
        return currentStr;
      },
      getdicVal() {
        let _this = this;
        let currentStr = "";
        if (_this.form.valuationMethod && _this.form.valuationMethod !== "") {
          let currentArr = _this.form.valuationMethod.split(",");
          currentArr.forEach((value, index, array) => {
            currentStr += index === (array.length - 1) ? $helper.getDictLabel(_this.dicVal, value) : ($helper.getDictLabel(_this.dicVal, value) + '，');
          });
        }
        return currentStr;
      },

      // 获取展品图片地址
      getImgSrc() {
        if (this.form.images && this.form.images[0] && this.form.images[0].imageB) {
          return process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.form.images[0].imageB;
        }
      }
    },
    methods: {
      ...mapActions('enterExManagement', ['getOpinionInfo', 'getProductDetailInfo', 'getExhibitCategorysInfo']),
      // 处理是否问题
      getYesOrNo(param) {
        let currentStr = "";
        if (this.form[param] === '0') {
          currentStr = '否';
        } else {
          currentStr = '是';
        }
        return currentStr;
      },
      // 字典code转换
      getDicText(dicArray, dicValue) {
        let text = '';
        for (let i = 0; i < dicArray.length; i++) {
          if (dicArray[i].exhibitTypeId === dicValue) {
            text = dicArray[i].commcn;
          }
        }
        return text;
      },
      // 审核通过
      submitForm() {
        this.fullscreenLoading = true;
        this.form.approveResult = "1";
        let param = {
          "approveInfos": [{
            "oldExhibitId": this.form.oldExhibitId,
            "exhibitId": this.form.exhibitId,
            "approveResult": this.form.approveResult,
            "showStatus": "2",
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "approveExplain": this.form.approveExplain
          }]
        };
        this.getOpinionInfo(param).then(res => {
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 1000);
          this.$message.success("审核通过");
          this.$router.push("/auditEnterProducts");
        });
      },
      // 返回list
      returnBack() {
        this.fullscreenLoading = true;
        this.$router.push({
          name: '审核企业展品',
          path: "/auditEnterProducts"
        });
      },
      // 审核不通过
      resetForm() {
        this.fullscreenLoading = true;
        this.form.approveResult = "2";
        let param = {
          "approveInfos": [{
            "oldExhibitId": this.form.oldExhibitId,
            "exhibitId": this.form.exhibitId,
            "approveResult": this.form.approveResult,
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "approveExplain": this.form.approveExplain
          }]
        };
        this.getOpinionInfo(param).then(res => {
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 1000);
          this.$message.success("审核不通过");
          this.$router.push("/auditEnterProducts");
        });
      }
    },

    created() {
      this.dicCert = kindo.dictionary.get('exhibitCert'); // 行业认证
      this.dicPay = kindo.dictionary.get('payType'); // 支付方式
      this.dicVal = kindo.dictionary.get('valuationType'); // 计价方式
      this.dicFeature = kindo.dictionary.get('exhibitFeature'); // 展品特征
    // 获取上一页面带来的值
      let _this = this;
      this.exhibitId = this.$route.query.row.exhibitId;
      // 是否
      this.hack = false;

      this.getExhibitCategorysInfo().then(rest => {
        this.dicTypeData = rest;
        this.getProductDetailInfo(this.exhibitId).then(res => {
          _this.form = Object.assign(_this.form, res.exhibitInfo);
          _this.form = Object.assign(_this.form, res.toolSampleInfo);
          _this.hack = true;
        });
      });
    }
  };

</script>
