<style scoped>
.mainExhibitsForm {
  width: 100%;
}

.haiguan {
  width: 170px;
}
.reviewRules {
  cursor: pointer;
  color: -webkit-link;
  text-decoration: underline;
}

.mainExhibitsForm >>> .el-form-item {
  margin-bottom: 22px !important;
}

.zhanpin {
  line-height: 3;
}

.dangerInfo {
  color: #f56c6c;
}

.martop {
  margin-top: 10px;
}

.select-width {
  width: 170px;
}

.input-widths {
  width: 90px;
}

.input-width >>> .el-input__inner {
  padding-right: 15px;
}

.input-width,
.small-select-width {
  width: 170px;
}

.footer-btn {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
}

.promptWords {
  text-align: center;
}
.dia-footer {
  text-align: center;
  padding-bottom: 20px;
}
.addProduct {
  cursor: pointer;
  color: #d80c18;
  margin-right: 8px;
  margin-left: 5px;
}

.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
.item-Num >>> input[type="number"] {
  -moz-appearance: textfield !important;
}
/* 打印时去掉页眉页脚、以及按钮等不需要打印的元素  */
@media print {
  .mimeograph {
    display: none;
  }
  .edit-text {
    display: none;
  }
  .noprint {
    display: none;
  }
}
@page {
  margin: 0;
}
</style>
<template>
  <el-tabs v-model="activeName" :inline="true" v-loading="loading">
    <el-tab-pane label="一般性展位申请" name="first">
      <div v-if="!containExhibitionPeriod" style="padding: 15px 0;font-size: 17px;font-weight: bold;color: #d80c18;">{{ notContainExhibitPeriodTip }}</div>
      <el-form class="mainExhibitsForm" :model="mainExhibitsData" ref="mainExhibitsForm" :rules="mainExhibitsRules" label-width="200px">
        <el-form-item label="展位性质：" prop="boothType">
          <el-select v-model="mainExhibitsData.boothType" disabled @change="clearBooth" class="select-width">
            <el-option v-for="(item, key) in boothTypeList" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionArea">
          <el-select v-model="mainExhibitsData.exhibitionArea" @change="handleExhibitionChange" class="select-width">
            <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label" :disabled="item.disabled"></el-option>
          </el-select>
          <span class="reviewRules" @click="toOut">参展展品范围</span>
        </el-form-item>
        <el-form-item label="展品分类：" prop="productType" v-if="isShow">
          <el-radio-group v-model="mainExhibitsData.productType">
            <el-radio class="zhanpin" v-for="(item, key) in productTypeOpts" :label="item.value" :key="key">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主要展示产品：" prop="domains">
          <div style="float: left;width:100%;" v-for="(domain, index) in mainExhibitsData.domains" :key="domain.key" :prop="'domain.' + index + '.value'">
            <el-select class="small-select-width" v-model="mainExhibitsData.domains[index].products" @change="handleChangeOne">
              <el-option v-for="(item, key) in getExhibit" :key="key" :value="item.exhibitId" :label="item.exhibitNameCh"></el-option>
            </el-select>
            <span class="addProduct" v-if="mainExhibitsData.domains[0].products != '' && isToAddition && mainExhibitsData.domains.length < 2" @click="addDomain"><i class="el-icon-circle-plus-outline basic-info-companyppl-icon"></i></span>
            <span class="addProduct" v-if="mainExhibitsData.domains.length > 1" @click.prevent="removeDomain(domain)"><i class="el-icon-remove-outline basic-info-companyppl-icon"></i></span>
            <el-button v-if="index === 0" type="primary" size="medium" @click="submitApplyConfirm('mainExhibitsData', 'toAddition')">添加新展品</el-button>
          </div>
          <!-- <span  class="addProduct"  @click="submitApplyConfirm('mainExhibitsData', 'toAddition')">(添加新展品)</span> -->
        </el-form-item>

        <el-form-item label="产品HS编码：" prop="hscode" v-if="isMechan">
          <div class="widths martop" v-for="(domain, index) in mainExhibitsData.domatons" :key="domain.key">
            <el-col :span="11">
              <el-form-item prop="hs" label="海关HS编码：">
                <el-input v-model="mainExhibitsData.domatons[index].listSpou" class="haiguan" maxlength="8" placeholder="请输入10位产品hs编码的前8位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="mc" label="对应具体展品名称：">
                <el-input class="haiguan" maxlength="10" v-model="mainExhibitsData.domatons[index].listOptn"></el-input>
              </el-form-item>
            </el-col>
            <span class="addProduct" v-if="mainExhibitsData.domatons.length > 1" @click.prevent="removeRemove(index)"><i class="el-icon-remove-outline basic-info-companyppl-icon"></i></span>
          </div>
          <span class="addProduct" v-if="mainExhibitsData.domatons.length < 5
               && mainExhibitsData.domatons[mainExhibitsData.domatons .length - 1].listOptn != ''
               && mainExhibitsData.domatons[mainExhibitsData.domatons .length - 1].listSpou != ''
               " @click="addDomainCode"><i class="el-icon-circle-plus-outline basic-info-companyppl-icon"></i></span>
        </el-form-item>
        <el-form-item class="item-Num" label="产品HS编码：" prop="hscose" v-if="isNewBaby">
          <el-input placeholder="" maxlength="8" ref="order" v-model="mainExhibitsData.hscose" class="input-width" clearable></el-input>
          <span class="reviewRules" @click="downRules">HS编码范围</span>
        </el-form-item>
        <el-form-item label="申请数量：" prop="boothNumber">
          <el-input placeholder="请输入申请数量" v-model.number="mainExhibitsData.boothNumber" maxlength="8" @change="handleBoothNumBlur" class="input-width"></el-input>个
        </el-form-item>
        <el-form-item label="申请展位面积" prop="boothAcreage">
          <el-input placeholder="自动计算折合面积" v-model.number="mainExhibitsData.boothAcreage" maxlength="10" @change="handleAcreageBlur" class="input-width" disabled></el-input>平方米
        </el-form-item>
        <el-form-item label="上届展位数量：" prop="square">
          <el-input v-model="mainExhibitsData.boothNumberLast" maxlength="10" class="input-width" disabled></el-input>
        </el-form-item>
        <el-form-item label="上届展位折合面积：" prop="booUmber">
          <el-input v-model="mainExhibitsData.boothAcreageLast" class="input-width" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品最大外形尺寸（mm）：" v-if="isMechanical" prop="productSize">
          长:<el-input placeholder="长" v-model="mainExhibitsData.productLong" class="input-widths" clearable maxlength="5"></el-input>
          <!-- v-model.number="mainExhibitsData.productLong" -->
          宽:<el-input placeholder="宽" v-model="mainExhibitsData.productWidth" class="input-widths" clearable maxlength="5"></el-input>
          <!-- v-model.number="mainExhibitsData.productWidth" -->
          高:<el-input placeholder="高" v-model="mainExhibitsData.productHeight" class="input-widths" clearable maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="重量(kg)：" v-if="isMechanical" prop="productWeight">
          <el-input placeholder="请输入重量" v-model="mainExhibitsData.productWeight" class="input-width" clearable maxlength="9"></el-input>
        </el-form-item>
        <el-form-item label="产品底盘长(m)：" v-if="isMechanical" prop="bottomLong">
          <el-input placeholder="请输入产品底盘长度" v-model="mainExhibitsData.bottomLong" class="input-width" clearable maxlength="9"></el-input>
        </el-form-item>
        <el-form-item label="产品底盘宽(m)：" v-if="isMechanical" prop="bottomWidth">
          <el-input placeholder="请输入产品底盘宽度" v-model="mainExhibitsData.bottomWidth" class="input-width" clearable maxlength="9"></el-input>
        </el-form-item>
        <el-form-item label="布展类型：" prop="typeed">
          <el-select v-if="ifBooth" v-model="mainExhibitsData.exhibitionType" class="select-width">
            <el-option v-for="(item, key) in ExhibitionTypeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否愿意接洽国内采购商：" prop="isContacted">
          <el-radio-group v-model="mainExhibitsData.isContacted" @change="handleIsContracted">
            <el-radio v-for="(item, key) in isContactedOpts" :key="key" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展会期间开展的内贸业务：" v-if="isContractFlag" prop="exhibition">
          <el-radio-group v-model="mainExhibitsData.isCarryOut">
            <el-radio v-for="(item, key) in isCarryOutOpts" :key="key" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="我司参展商品为：" v-if="isContractFlag" prop="exhibits">
          <el-radio-group v-model="mainExhibitsData.joinProductType">
            <el-radio v-for="(item, key) in joinProductTypeOpts" :key="key" :label="item.value" name="joinProductType">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联营企业：" prop="enterprise" v-if="unionCom">
          <div style="float: left; width: 100%;" v-for="(domain, index) in mainExhibitsData.enterprise" :key="domain.key" :prop="'domain.' + index + '.value'">
            <!-- {{index}}
            {{mainExhibitsData.enterprise[index].venture}} -->
            <el-select class="small-select-width" v-model="mainExhibitsData.enterprise[index].venture" :disabled="disabledVenture" @change="isRepeat">
              <!-- :disabled="disabledVenture"  -->
              <el-option v-for="(item, key) in getAddit" :key="key" :value="item.associateId" :label="item.nameCh"></el-option>
            </el-select>
            <span class="addProduct" v-if="mainExhibitsData.enterprise.length > 1" @click.prevent="removeTomain(index)"><i class="el-icon-remove-outline basic-info-companyppl-icon"></i></span>
            <span class="addProduct" v-if="mainExhibitsData.enterprise[0].venture !== 'none' && isHide && mainExhibitsData.enterprise.length < 2" @click="addTomain"><i class="el-icon-circle-plus-outline basic-info-companyppl-icon"></i></span>
          </div>
          <span class="addProduct" @click="submitApplyConfirm('mainExhibitsData', 'toUnionCom')">(点此添加联营企业)</span>
          <br />
          <span class="dangerInfo">（注：品牌展位申请不允许联营；<br />
            一般性展位必须在同一展区申请2个或2个以上展位且贵公司的企业类型为外贸企业或工贸企业时才可联营）
          </span>
        </el-form-item>
        <el-form-item label="企业资质信息：" v-if="isShowComInfo">
        </el-form-item>
        <el-form-item label="营业执照：" v-if="isShowComInfo" prop="enterpriseLegalId" ref="enterpriseLegalId">
          <el-upload v-model="mainExhibitsData.enterpriseLegalId" class="upload-demo" :action="uploadUrl + ''" :on-remove="handleRemoveLegalId" :on-success="handleSuccessLegalId" :before-remove="beforeRemoveLegalId" :file-list="enterpriseLegalIdfileList" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF" :on-exceed="handleExceed" :limit="imgLimit">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="外贸经营者备案登记证明及进出口企业代码：" v-if="isShowComInfo" prop="certificateId" ref="certificateId">
          <el-upload v-model="mainExhibitsData.certificateId" class="upload-demo" :action="uploadUrl + ''" :on-remove="handleRemovecertificateId" :on-success="handleSuccesscertificateId" :before-remove="beforeRemovecertificateId" :file-list="certificateIdLegalIdfileList" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF" :on-exceed="handleExceed" :limit="imgLimit">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <span v-if="isShowComInfo">（请提供以下任一证明材料：对外贸易经营者备案登记表、外商（或台港澳侨）投资企业批准证书、外商投资企业设立备案回执、外商投资企业变更备案回执） <br /><br /></span>

        <el-form-item label="海关编码：" prop="appList" v-if="isMechan" ref="appList">
          <div class="widths martop" v-for="(domain, index) in mainExhibitsData.appList" :key="domain.key">
            <span>海关编码：</span>
            <el-input class="haiguan" maxlength="10" v-model="mainExhibitsData.appList[index].customsCode"></el-input>
            <span>与本企业关系：</span>
            <el-select class="small-select-width" v-model="mainExhibitsData.appList[index].relationship" :disabled="index === 0">
              <el-option label="本企业" value="ENTERPRISE"></el-option>
              <el-option label="全资子公司" value="SUBSIDARYCOMPANY"></el-option>
              <el-option label="控股子公司" value="HOLDCOMPANY"></el-option>
            </el-select>
            <span v-if="index !== 0">公司名称：</span>
            <el-input class="haiguan" maxlength="150" v-model="mainExhibitsData.appList[index].relationshipName" v-if="index !== 0"></el-input>
            <el-upload v-model="mainExhibitsData.appList[index].fileList" class="upload-demo" :action="action" :on-remove="(file, fileList) => handleRemove(file, fileList, index)" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="(response, file, fileList) => uploadSuccessfully(response, file, fileList, index)" :file-list="domain.fileList" :before-upload="beforeUpload">
              <el-button size="small" class="mimeograph" type="primary">上传海关注册登记证书</el-button>
            </el-upload>
            <el-button class="mimeograph" v-if="mainExhibitsData.appList && mainExhibitsData.appList.length > 1 && index > 0" @click.prevent="removeSemove(index)"><i class="el-icon-remove-outline basic-info-companyppl-icon"></i></el-button>
          </div>
          <el-button @click="addDomainDode" v-if="mainExhibitsData.appList && mainExhibitsData.appList.length < 5
          && mainExhibitsData.appList[mainExhibitsData.appList.length - 1].relationshipName !== ''
          && mainExhibitsData.appList[mainExhibitsData.appList.length - 1].relationship !== ''
          && mainExhibitsData.appList[mainExhibitsData.appList.length - 1].customsCode !== ''
          && urlName[urlName.length - 1] !== undefined
          "><i class="el-icon-circle-plus-outline basic-info-companyppl-icon"></i></el-button>
        </el-form-item>
        <el-form-item label="国内销售额：" v-if="isShowComInfo" prop="insideSale" ref="insideSale">
          <el-input class="haiguan" maxlength="20" v-model="mainExhibitsData.insideSale"></el-input>
          （万元人民币）
          <el-upload v-model="mainExhibitsData.uploadTanxId" class="upload-demo" :action="uploadUrl + ''" :on-preview="handlePreview" :on-remove="handleRemoveT" :on-success="handleSuccess" :before-remove="beforeRemove" :before-upload="handleBeforeUpload" :file-list="fileList" :on-exceed="handleExceed" :limit="imgLimit">
            <el-button size="small" type="primary">上传增值税纳税申报表</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品简介" v-if="isShowComInfo" prop="productBriefId" ref="productBriefId">
          <el-upload v-model="mainExhibitsData.productBriefId" class="upload-demo" :action="uploadUrl + ''" :on-remove="handleRemoveproductBriefId" :on-success="handleSuccessproductBriefId" :before-remove="beforeRemovecertificateId" :file-list="productBriefIdfileList" list-type="text" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF" :on-exceed="handleExceed" :limit="imgLimit">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="上传增值税纳税申报表：" v-if="isShowComInfo" prop="uploadTanxId">

        </el-form-item> -->
        <el-form-item label="境外注册商标数：" v-if="isShowComInfo">
          {{companyCount.outside}}个
          <el-button type="text" size="medium" @click="toReview('02')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="国际通行认证：" v-if="isShowComInfo">
          {{companyCount.mxscxhyrz}}个
          <el-button type="text" size="medium" @click="toReview('05')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="国家高新技术：" v-if="isShowComInfo">
          {{companyCount.gxjsqy}}个
          <el-button type="text" size="medium" @click="toReview('12')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="参与国家或行业标准制定：" v-if="isShowComInfo">
          {{companyCount.gjhzbz}}个
          <el-button type="text" size="medium" @click="toReview('09')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="专利证明：" v-if="isShowComInfo">
          {{companyCount.zl}}个
          <el-button type="text" size="medium" @click="toReview('13')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="近两年参加国际专业展：" v-if="isShowComInfo">
          {{companyCount.czs}}个
          <el-button type="text" size="medium" @click="toReview('11')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="近两年参与商务部组织对外经济合作、援助项目：" v-if="isShowComInfo && mainExhibitsData.exhibitionArea === 'NE01'">
          {{companyCount.yzxm}}个
          <el-button type="text" size="medium" @click="toReview('10')">查看/编辑</el-button>
        </el-form-item>
        <el-form-item label="电商平台网址：" v-if="isShowComInfo" prop="commerceWebsit">
          <el-input placeholder="请输入电商平台网址" v-model="mainExhibitsData.commerceWebsit" class="input-width" clearable maxlength="500"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-btn">
        <el-button type="primary" class="mimeograph" size="medium" :disabled="confirmDisabled" :loading="loading" @click="submitApplyConfirm('mainExhibitsData', 'notTo')">确定</el-button>
        <el-button type="primary" class="mimeograph" size="medium" @click="goBack">取消</el-button>
      </div>
      <!-- <el-dialog title="提示" :visible.sync="isPrompt" width="20%">
        <p class="promptWords">您的申请已提交成功,确认是否打印此申请？</p>
        <div class="dia-footer">
          <el-button type="primary" size="medium" @click="isPrompt = false;">确定</el-button>
          <el-button type="danger" size="medium" @click="isPrompt = false;">取消</el-button>
        </div>
      </el-dialog>-->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $locals } from '@/utils';

export default {
  data() {
    // 产品尺寸校验 - 包含0的正数，可保留两位小数
    let productSizeCheck = (rule, value, callback) => {
      const reg = /^((0|\+?[1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      //20190503修改bug,尺寸只能为正整数,不能输入小数
      // const reg = /^[0-9]*[1-9][0-9]*$/;
      if (
        this.mainExhibitsData.productLong === "" || this.mainExhibitsData.productWidth === "" || this.mainExhibitsData.productHeight === ""
      ) {
        return callback(new Error("产品尺寸任一项都不得为空"));
        // } else if (!reg.test(this.mainExhibitsData.productLong) || !reg.test(this.mainExhibitsData.productWidth) || !reg.test(this.mainExhibitsData.productHeight)) {
        //   return callback(new Error('产品尺寸任一项都为>=0且可保留两位小数的数'));
      } else if (!reg.test(this.mainExhibitsData.productLong)
        || !reg.test(this.mainExhibitsData.productWidth)
        || !reg.test(this.mainExhibitsData.productHeight)) {
        // return callback(new Error("产品尺寸任一项都为整数"));
        return callback(new Error('请输入大于0的数字'));
      } else if (this.mainExhibitsData.productLong <= 0 || this.mainExhibitsData.productWidth <= 0 || this.mainExhibitsData.productHeight <= 0) {
        return callback(new Error('请输入大于0的数字'));
      } else {
        return callback();
      }
    };
    // // 产品重量校验 - 包含0的整数，可保留两位小数
    let productWeightCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入大于0的数字"));
      } else if (value <= 0) {
        return callback(new Error("请输入大于0的数字"));
      } else {
        return callback();
      }
    };
    // 主要海关商品编码
    let commodity = (rule, value, callback) => {
      let regular = /^[0-9]{8}$/;
      let _this = this;
      if (!regular.test(_this.mainExhibitsData.domatons[_this.mainExhibitsData.domatons.length - 1].listSpou)) {
        return callback(new Error("请输入10位产品hs编码的前8位"));
      } else {
        return callback();
      }
    };
    //对应具体展品名称
    let mcdity = (rule, value, callback) => {
      let _this = this;
      if (_this.mainExhibitsData.domatons[_this.mainExhibitsData.domatons.length - 1].listOptn === "") {
        return callback(new Error("对应具体展品名称不能为空"));
      } else {
        return callback();
      }
    };
    // 确认海关编码
    let commodedof = (rule, value, callback) => {
      let _this = this;
      let regular = /^[A-Za-z0-9]{10}$/;
      for (let index = 0; index < _this.mainExhibitsData.appList.length; index++) {
        if (_this.mainExhibitsData.appList[index].relationshipName === "") {
          return callback(new Error('公司名称不能为空'));
        }
        if (!regular.test(_this.mainExhibitsData.appList[index].customsCode)) {
          return callback(new Error('海关编码不能为空,应为长度为10的字母或数字'));
        }
        if (_this.mainExhibitsData.appList[index].relationship === "") {
          return callback(new Error('与本企业关系不能为空'));
        }
        if (_this.mainExhibitsData.appList[index].fileList === undefined || _this.mainExhibitsData.appList[index].fileList.length === 0) {
          return callback(new Error('海关编码证书不能为空'));
        }
      }
      return callback();
    };
    // 数量
    let quantity = (rule, value, callback) => {
      let regular = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
      if (this.mainExhibitsData.boothNumber === "") {
        return callback(new Error("申请数量不能为空"));
      } else if (!regular.test(value)) {
        return callback(new Error("申请数量为大于0的数字"));
      } else if (this.maxNum !== 0 && value > this.maxNum) {
        return callback(new Error("该企业在该展区为黑名单用户最大申请数量为" + this.maxNum));
      } else {
        return callback();
      }
    };
    // 展位性质
    let naturbooth = (rule, value, callback) => {
      if (this.mainExhibitsData.boothType === "") {
        return callback(new Error("展位性质不能为空"));
      } else {
        return callback();
      }
    };
    // 展品分类
    let category = (rule, value, callback) => {
      if (this.mainExhibitsData.productType === "") {
        return callback(new Error("展品分类不能为空"));
      } else {
        return callback();
      }
    };
    // 面积
    let areaed = (rule, value, callback) => {
      let regular = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
      if (this.mainExhibitsData.boothNumber === "") {
        return callback(new Error("面积不能为空"));
      } else if (!regular.test(value)) {
        return callback(new Error("面积为大于0的数字"));
      } else {
        return callback();
      }
    };
    // 布展类型
    let installa = (rule, value, callback) => {
      let _this = this;
      if (this.mainExhibitsData.exhibitionType === "") {
        return callback(new Error("请选择"));
      } else if (_this.mainExhibitsData.exhibitionType === "SPECIAL_BOOTH" && _this.isApplySpecial === false) {
        return callback(new Error("该企业在该展区为黑名单用户不能申请布展类型为绿色特装展位"));
      } else {
        return callback();
      }
    };
    // 主要展示产品校验
    let checkProduct = (rule, value, callback) => {
      if (value.length > 1) {
        for (let i = 0; i < value.length - 1; i++) {
          if (value[i].products === value[value.length - 1].products) {
            return callback(new Error("主要展示产品不能重复"));
          }
        }
      }
      if (value[value.length - 1].products === "") {
        return callback(new Error("主要展示产品不能为空"));
      } else {
        return callback();
      }
    };
    // 联营企业
    let firmBusiness = (rule, value, callback) => {
      if (value.length > 1) {
        for (let i = 0; i < value.length - 1; i++) {
          if (value[i].venture === value[value.length - 1].venture) {
            return callback(new Error("联营企业不能重复"));
          }
        }
      }
      if (value[value.length - 1].venture === "") {
        return callback(new Error("联营企业不能为空"));
      } else if ((value[value.length - 1].venture === 'none' || value.venture === 'none') && value.length > 1) {
        return callback(new Error("已选联营企业不能再选无联营企业"));
      } else {
        return callback();
      }
    };
    // 产品HS编码
    // let productesd = (rule, value, callback) => {
    //   if (value === "") {
    //     return callback(new Error("请填写8位产品hs编码"));
    //   } else {
    //     return callback();
    //   }
    // };
    let productesd = (rule, value, callback) => {
      let str = value + '';
      if (str.length !== 8) {
        return callback(new Error("请输入10位产品hs编码的前8位"));
      } else {
        return callback();
      }
    };
    let enterpriseLegalIddity = (rule, value, callback) => {
      let _this = this;
      if (_this.mainExhibitsData.enterpriseLegalId === '') {
        return callback(new Error("营业执照不能为空"));
      } else {
        return callback();
      }
    };
    let certificateIddity = (rule, value, callback) => {
      let _this = this;
      if (_this.mainExhibitsData.certificateId === '') {
        return callback(new Error("外贸经营者备案登记证明不能为空"));
      } else {
        return callback();
      }
    };
    let productBriefIddity = (rule, value, callback) => {
      let _this = this;
      if (_this.mainExhibitsData.productBriefId === '') {
        return callback(new Error("产品简介不能为空"));
      } else {
        return callback();
      }
    };
    let checkInsideSale = (rule, value, callback) => {
      let decimal = /^(\d+|\d+\.\d{1,4})$/;
      if (!decimal.test(value) && value !== "") {
        return callback(new Error("国内销售额为最多保留4位小数的数字"));
      } else if (this.mainExhibitsData.uploadTanxId === '' && value !== "") {
        return callback(new Error("上传增值税纳税申报表不能为空"));
      } else {
        return callback();
      }
    };
    // 校验网址是否包含小数点
    let onlineAddr = (rule, value, callback) => {
      let decimal = /[.]/gi;
      if (!decimal.test(value) && value !== "") {
        return callback(new Error("请填写正确的网址"));
      } else {
        return callback();
      }
    };
    return {
      baseApi: process.env.API_OS_URL,
      containExhibitionPeriod: true, // 判断是否在参展期内
      disabledVenture: false, // 禁用联营企业
      notContainExhibitPeriodTip: '当前时间不在申请展位时间范围内',
      confirmDisabled: false,
      ifBooth: true,
      enterpriseLegalIdfileList: [],
      certificateIdLegalIdfileList: [],
      productBriefIdfileList: [],
      activeName: "first",
      ispath: true,
      isShowed: false,
      areaCount: "",
      indexes: 0,
      productIds: [],
      isHide: true,
      isNewBaby: true, // 新宠隐藏HS编码
      isToAddition: true, // 用于判断是否展区下没有展品
      companyCount: {},
      unionCom: false, // 是否显示联营企业
      zlAndBq: "",
      loading: false, // 处理操作过程中页面加载
      ventureList: [], // 联营企业暂存集合
      productList: [], // 产品暂存
      action: process.env.API_OS_URL + "/efOS/file/addFile",
      // 图片文件
      fileList: [],
      urlName: [],
      urlNameT: [],
      urlNameF: [],
      fileListied: [],
      imgLimit: 1,
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile',
      // customscode: false,
      cancelL: false,
      exhibitionAreaList: [],
      dataList: [],
      isPrompt: false,
      boothTypeList: [],
      // boothTypeOpts: [
      //   { value: "ORDINARY", label: "一般性展位" },
      //   { value: "03", label: "新题材" }
      // ],
      exhibitionAreaOpts: [],
      productTypeOpts: [],
      productIdOneOpts: [
        { value: "BM02", label: "卫浴设备" },
        { value: "MA02", label: "大型机械及设备" },
        { value: "CG06", label: "宠物用品" },
        { value: "OF03", label: "体育及旅游休闲用品" },
        { value: "EH05", label: "电子消费品及信息产品" }
      ],
      productIdTwoOpts: [],
      listOne: [],
      listTwo: [],
      ExhibitionTypeOpts: [],
      finalExhibitionTypeOpts: [],
      isContactedOpts: [
        { label: "是", value: "1" },
        { label: "否", value: "0" }
      ],
      isCarryOutOpts: [
        { label: "由内贸人员专项负责", value: "1" },
        { label: "由外贸人员兼顾", value: "0" }
      ],
      joinProductTypeOpts: [
        { label: "全面面向境外市场", value: "0" },
        { label: "外销设计，但也可兼顾境内销售", value: "1" },
        { label: "有部分主要针对境内市场", value: "2" }
      ],
      isMechanical: false, // 是否为大型机械等
      isContractFlag: false, // 是否愿意接洽国内采购商
      isMechan: false, // 宠物是否显影
      isShow: false,
      isShowComInfo: false,
      isnew: false,
      maxNum: 0, // 黑名单企业最大申请展位数量
      isApplySpecial: true, // 黑名单企业能否申请绿色特装
      appData: "",
      resData: {},
      id: "",
      mainExhibitsData: {
        appList: [
          // 确认海关编码
          { customsCode: "", relationship: "", relationshipName: "", fileList: [] }
        ],
        hscose: "",
        enterprise: [
          // 联营企业
          { venture: "" }
        ],
        domatons: [{ listOptn: "", listSpou: "" }],
        domains: [
          // 主要展示产品
          {
            products: ""
          }
        ],
        productNameOne: "", // 展示产品
        listChang: "", // 展示产品(增加)
        boothType: "01", // 展位性质
        exhibitionArea: "", // 展区id
        productType: "", // 展品分类
        productId: "", // 主要出口展品
        productIdOne: "",
        productIdTwo: "",
        business: "", // 联营企业
        // businessTwo: '', // 联营企业
        hscode: "", // 主要海关编码
        customs: "",
        company: "",
        boothNumber: "", // 申请数量
        boothAcreage: 0, // 申请折合面积
        boothNumberLast: 0, // 上届申请数量
        boothAcreageLast: 0, // 上届折合面积
        productLong: 0, // 产品尺寸-长
        productWidth: 0, // 产品尺寸-宽
        productHeight: 0, // 产品尺寸-高
        productWeight: 0, // 产品重量
        exhibitionType: "", // 布展类型
        isContacted: "", // 是否愿意接洽国内采购商
        isCarryOut: "", // 展位期间开展的内贸业务
        joinProductType: '', // 我司参展
        insideSale: "", // 国内销售额
        uploadTanxId: "", //上传增值税纳税申报表
        bottomWidth: 0, //底座宽度
        bottomLong: 0, //底座长度
        enterpriseLegalId: '', //营业执照
        certificateId: '', //备案登记
        productBriefId: '', // 产品简介
        commerceWebsit: '' // 电商平台网址
      },
      mainExhibitsRules: {
        hs: [
          { validator: commodity, trigger: "blur" }
        ],
        mc: [
          { validator: mcdity, trigger: "blur" }
        ],
        enterpriseLegalId: [
          { required: true, validator: enterpriseLegalIddity, trigger: "change" }
        ],
        certificateId: [
          { required: true, validator: certificateIddity, trigger: "change" }
        ],
        productBriefId: [
          { required: true, validator: productBriefIddity, trigger: "change" }
        ],
        boothType: [
          { required: true, validator: naturbooth, trigger: "change" }
        ],
        insideSale: [
          { validator: checkInsideSale, trigger: "blur" }
        ],
        exhibitionArea: [
          { required: true, message: "展区不能为空", trigger: "change" }
        ],
        productType: [
          { required: true, validator: category, trigger: "change" }
        ],
        enterprise: [{ required: true, validator: firmBusiness, trigger: 'change' }],
        hscode: [{ required: true, validator: commodity, trigger: "blur" }],
        productSize: [
          { required: true, validator: productSizeCheck, trigger: "change" }
        ],
        productWeight: [
          { required: true, validator: productWeightCheck, trigger: "blur" }
        ],
        boothNumber: [{ required: true, validator: quantity, trigger: "blur" }],
        // isContacted: [{ required: true, message: '不能为空', trigger: 'blur' }],
        domains: [
          { required: true, message: "主要展示产品不能为空", trigger: "change" },
          { validator: checkProduct, trigger: "change" }
        ],
        isContacted: [
          { required: true, message: "是否愿意接洽国内采购商不能为空", trigger: "blur" }
        ],
        // exhibits: [
        //   { required: true, validator: ourProducts, trigger: "change" }
        // ],
        // exhibition: [
        //   { required: true, validator: domestic, trigger: "change" }
        // ],
        typeed: [{ required: true, validator: installa, trigger: "change" }],
        // domestic: [{ required: true, message: '不能为空', trigger: 'change' }],
        // square: [{ required: true, message: '不能为空', trigger: 'change' }],
        boothAcreage: [{ required: true, validator: areaed, trigger: "blur" }],
        // booUmber: [{ required: true, message: '不能为空', trigger: 'change' }],
        appList: [{ required: true, validator: commodedof, trigger: "change" }],
        // cerficate: [{ required: true, validator: comInfo, trigger: "blur" }],
        // hscose: [{ required: true, trigger: "blur", validator: productesd }],
        // hscose: [{ required: true, trigger: "blur", message: "产品HS编码不能为空" }],
        hscose: [
          { required: true, message: '请输入10位产品hs编码前8位', trigger: "blur" },
          { validator: productesd, trigger: "blur" }
        ],
        bottomLong: [{ required: true, validator: productWeightCheck, trigger: "blur" }],
        bottomWidth: [{ required: true, validator: productWeightCheck, trigger: "blur" }],
        commerceWebsit: [{ required: false, trigger: "blur", message: "电商平台网址不能为空" },
        { validator: onlineAddr, trigger: "blur" }]

      }
    };
  },
  computed: {
    ...mapGetters("companyInfomation", [
      "getBrandFlag",
      "getAddit",
      "getExhibit",
      "postRemove",
      "fileSelect"
    ]),
    ...mapGetters('common', ['session']) // 获取届数
  },
  watch: {
    // getExhibit(val) {
    //   for (let i = 0; i < val.length; i++) {
    //     if (val[i].showStatus === '1') {
    //       arr = arr + 1;
    //     }
    //   }
    // },
    // 展位数量不小于2个，才允许填报联营企业
    "mainExhibitsData.boothNumber"(val) {
      if (val >= 2) {
        this.unionCom = true;
      } else {
        this.unionCom = false;
      }
    },
    "mainExhibitsData.exhibitionArea"(val) {
      this.getCountByCompanyIdInfo({
        "companyId": this.$store.state.userInfo.companyId
      }).then(res => {
        this.companyCount = res;
        this.zlAndBq = parseInt(res.fmzl) + parseInt(res.xxzl) + parseInt(res.wgzl) + parseInt(res.bqzl);
      });
      if (this.mainExhibitsData.appList) {
        if ((val === 'CG06' || val === 'NE01') && this.mainExhibitsData.appList.length < 2) {
          // this.addDomainDode();
          //20190504 编辑非新宠展区数据时，修改展区为新宠时报错了，list里面没有这个对象
          if (this.mainExhibitsData.appList.length === 0) {
            this.addDomainDode();
          }
          this.mainExhibitsData.appList[0].relationship = 'ENTERPRISE';
        }
      }
    }
  },
  // mounted() {},
  async created() {
    this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.exhibitionAreaOpts.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.exhibitionAreaOpts.splice(deleteIndex, 1);
      }
    });
    this.boothTypeList = await kindo.dictionary.get('booth_Type'); // 展位性质
    this.finalExhibitionTypeOpts = await kindo.dictionary.get('exhibitionType');
    // this.typeOfExhibitsArrangement = await kindo.dictionary.get('typeOfExhibitsArrangement'); // 布展类型
  },
  mounted() {
    // 获取届数
    this.getSessionInfo().then(res => {
      if (res.session) {
        // 获取一般性展位的参展时间段
        let progressParam = {
          exhibitionNum: res.session,
          subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_1'
        };
        this.getProgressTimeInfo(progressParam).then(progressRes => {
          // 当前时间在参展时间段内可确认参展和编辑
          if (progressRes && progressRes.startTime && progressRes.endTime) {
            let startTime = new Date(progressRes.startTime).getTime();
            let endTime = new Date(progressRes.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
            let nowTime = new Date().getTime();
            if (nowTime >= startTime && nowTime <= endTime) {
              this.containExhibitionPeriod = true;
              // 启用联营企业
              this.disabledVenture = false;
              // 启用最终提交按钮
              this.confirmDisabled = false;
            } else {
              let ruleParam = {
                exhibitionNum: res.session,
                subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_2',
                orgId: this.$store.state.userInfo.companyId
              };
              this.getRuleInfos(ruleParam).then(resp => {
                // 当前时间在参展时间段内可新增，编辑和删除展位
                if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                  let ruleStartTime = new Date(resp[0].startTime).getTime();
                  let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                  let ruleNowTime = new Date().getTime();
                  if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                    this.containExhibitionPeriod = true;
                    // 启用联营企业
                    this.disabledVenture = false;
                    // 启用最终提交按钮
                    this.confirmDisabled = false;
                  } else {
                    this.containExhibitionPeriod = false;
                    // 禁用联营企业
                    this.disabledVenture = true;
                    this.mainExhibitsData.enterprise[0].venture = 'none';
                    // 禁用最终提交按钮
                    this.confirmDisabled = true;
                  }
                } else {
                  // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                  this.containExhibitionPeriod = false;
                  // // 禁用联营企业
                  // this.disabledVenture = true;
                  // this.mainExhibitsData.enterprise[0].venture = 'none';
                  // // 禁用最终提交按钮
                  // this.confirmDisabled = false;
                }
              }).catch(e => {
                // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                this.containExhibitionPeriod = true;
              });
            }
          } else {
            // 未拿到参展时间段也暂时可以新增，编辑和删除展位
            this.containExhibitionPeriod = true;
            // 启用联营企业
            this.disabledVenture = false;
            // 启用最终提交按钮
            this.confirmDisabled = false;
          }
        }).catch(e => {
          // 未拿到参展时间段也暂时可以新增，编辑和删除展位
          this.containExhibitionPeriod = true;
          // 启用联营企业
          this.disabledVenture = false;
          // 启用最终提交按钮
          this.confirmDisabled = false;
        });

      } else {
        // 未拿到届数暂时可以新增，编辑和删除展位
        this.containExhibitionPeriod = true;
      }
    }).catch(e => {
      // 未拿到届数暂时可以新增，编辑和删除展位
      this.containExhibitionPeriod = true;
    });
    let newener = {
      companyId: this.$store.state.userInfo.companyId
    };

    this.dataList = this.$router.history.current.query;

    // 一般性新增联营
    this.handeNewGeneral(newener);
    if (this.$route.query.temp) {
      const obj = JSON.parse($locals.get('__cache_exh_data__'));
      delete obj['mainExhibitsRules'];
      Object.assign(this.$data, obj);
      let ExhibitJson = {
        companyId: this.$store.state.userInfo.companyId,
        exhibitTypeOne: this.mainExhibitsData.exhibitionArea
      };
      this.getGeneralVenture(ExhibitJson).then(res => { }).catch(err => { });
      return;
    }
    let _this = this;

    this.mainExhibitsData.appList[0].relationshipName = '本企业';
    // 编辑
    if (_this.dataList.id === 1) {
      let val = { demandRecordId: this.dataList.data.demandRecordId };
      let appoped = encodeURI(JSON.stringify(val));
      this.getHandRemove(appoped)
        .then(res => {
          let newRes = JSON.parse(JSON.stringify(res));
          this.appData = newRes.demandRecordId;
          this.mainExhibitsData.exhibitionArea = newRes.exhibitionArea; // 展区
          this.mainExhibitsData.productType = newRes.productType; // 展位类型
          if (newRes.isContacted === "1") {
            this.isContractFlag = true;
            this.mainExhibitsData.isContacted = newRes.isContacted;
            this.mainExhibitsData.isCarryOut = newRes.isCarryOut;
          } else {
            this.isContractFlag = false;
            this.mainExhibitsData.isContacted = newRes.isContacted;
          }
          this.mainExhibitsData.joinProductType = newRes.joinProductType; // 我司参展展品为
          this.mainExhibitsData.isCarryOut = newRes.isCarryOut; // 展位期间开展的内贸业务
          this.mainExhibitsData.productLong = newRes.productLong; // 长
          this.mainExhibitsData.productWidth = newRes.productWidth; // 宽
          this.mainExhibitsData.productHeight = newRes.productHeight; // 高
          this.mainExhibitsData.productWeight = newRes.productWeight; // 产品最大重量
          this.mainExhibitsData.hscose = newRes.hscode; // 产品SH编码
          this.mainExhibitsData.boothNumber = newRes.boothNumber; // 申请数量
          this.mainExhibitsData.boothAcreage = newRes.boothAcreage; // 申请折合面积
          this.mainExhibitsData.boothNumberLast = newRes.boothNumberLast; // 上届申请数量
          this.mainExhibitsData.boothAcreageLast = newRes.boothAcreageLast; // 上届申请折合面积
          this.mainExhibitsData.exhibitionType = newRes.exhibitionType;
          this.mainExhibitsData.bottomLong = newRes.bottomLong;
          this.mainExhibitsData.bottomWidth = newRes.bottomWidth;
          this.mainExhibitsData.insideSale = newRes.insideSale;
          this.mainExhibitsData.productBriefId = newRes.productBriefId;
          this.mainExhibitsData.certificateId = newRes.certificateId;
          this.mainExhibitsData.uploadTanxId = newRes.uploadTanxId;
          this.mainExhibitsData.enterpriseLegalId = newRes.enterpriseLegalId;
          this.mainExhibitsData.commerceWebsit = newRes.commerceWebsit;
          if (newRes.companyUnionList && newRes.companyUnionList.length > 0) {
            for (let union = 0; union < newRes.companyUnionList.length; union++) {
              if (newRes.companyUnionList.length < 2) {
                this.mainExhibitsData.enterprise[union].venture = newRes.companyUnionList[union].unionId;
              } else {
                this.mainExhibitsData.enterprise.push({ venture: newRes.companyUnionList[union].unionId });
              }
            }
          } else {
            this.mainExhibitsData.enterprise[0].venture = 'none';
          }

          // 主要海关商品编码
          for (let maint in newRes.mainProductCodeList) {
            if (maint < 1) {
              this.mainExhibitsData.domatons[maint].listSpou = newRes.mainProductCodeList[maint].hsCode;
              this.mainExhibitsData.domatons[maint].listOptn = newRes.mainProductCodeList[maint].exhibitsCn;
            } else {
              this.mainExhibitsData.domatons.push({
                listSpou: newRes.mainProductCodeList[maint].hsCode,
                listOptn: newRes.mainProductCodeList[maint].exhibitsCn
              });
            }
          }
          if (_this.$route.query.data.companyUnionList.length > 1) {
            this.mainExhibitsData.enterprise = [];
          }
          if (_this.$route.query.data.companyUnionList && _this.$route.query.data.companyUnionList.length > 0) {
            for (let union = 0; union < _this.$route.query.data.companyUnionList.length; union++) {
              if (_this.$route.query.data.companyUnionList.length < 2) {
                this.mainExhibitsData.enterprise[union].venture = _this.$route.query.data.companyUnionList[union].unionId;
              } else {
                this.mainExhibitsData.enterprise.push({ venture: _this.$route.query.data.companyUnionList[union].unionId });
              }
            }
          } else {
            this.mainExhibitsData.enterprise[0].venture = 'none';
          }
          // 主要展示产品
          for (let key in newRes.companyProductList) {
            if (key < 1) {
              this.mainExhibitsData.domains[key].products = newRes.companyProductList[key].productId;
            } else {
              this.mainExhibitsData.domains.push({
                products: newRes.companyProductList[key].productId
              });
            }
          }
          // 确认海关编码
          this.mainExhibitsData.appList = newRes.companyCustomsCodeList;
          this.urlName = [];
          for (let custom in this.mainExhibitsData.appList) {
            const attachment = newRes.companyCustomsCodeList[custom].attachment;
            const attachmentName = newRes.companyCustomsCodeList[custom].attachmentName;
            this.urlName.push(attachment);
            this.mainExhibitsData.appList[custom].customsCode = newRes.companyCustomsCodeList[custom].customsCode;
            this.mainExhibitsData.appList[custom].relationship = newRes.companyCustomsCodeList[custom].relationship;
            this.mainExhibitsData.appList[custom].relationshipName = newRes.companyCustomsCodeList[custom].relationshipName;
            if (attachment) {
              this.mainExhibitsData.appList[custom].fileList = [{ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + attachment, name: attachmentName, uid: attachment }];
            }
          }
          if (res.uploadTanxId) {
            this.fileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + res.uploadTanxId, name: res.uploadTanxName, uid: res.uploadTanxId });
          }
          if (res.enterpriseLegalId) {
            this.enterpriseLegalIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + res.enterpriseLegalId, name: res.enterpriseLegalName, uid: res.enterpriseLegalId });
          }
          if (res.certificateId) {
            this.certificateIdLegalIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + res.certificateId, name: res.certificateName, uid: res.certificateId });
          }
          if (res.productBriefId) {
            this.productBriefIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + res.productBriefId, name: res.productBriefName, uid: res.productBriefId });
          }
        })
        .catch(e => { });
      let values = encodeURI(JSON.stringify({ companyId: this.$store.state.userInfo.companyId }));
      this.getSchemePublishBrandFlag(values)
        .then(res => {
          if (res === "0") {
            this.mainExhibitsData.boothType = "01";
            this.isShowed = true;
          } else {
            this.boothTypeOpts = [
              { value: "01", label: "一般性展位" },
              { value: "02", label: "品牌展位" }
            ];
            this.isShowed = false;
          }
        })
        .catch(e => { });
    }
    if (_this.dataList.id === 3) {
      this.isShowed = true;
      let val = { demandRecordId: this.dataList.addoped.demandRecordId };
      let appoped = encodeURI(JSON.stringify(val));
      this.getHandRemove(appoped).then(res => {
        let newRes = JSON.parse(JSON.stringify(res));
        this.appData = newRes.demandRecordId;
        this.mainExhibitsData.exhibitionArea = newRes.exhibitionArea; // 展区
        this.handleExhibitionChange(this.mainExhibitsData.exhibitionArea);
        this.mainExhibitsData.productType = newRes.productType; // 展位类型
        if (newRes.isContacted === "1") {
          this.isContractFlag = true;
          this.mainExhibitsData.isContacted = newRes.isContacted;
          this.mainExhibitsData.isCarryOut = newRes.isCarryOut;
        } else {
          this.isContractFlag = false;
          this.mainExhibitsData.isContacted = newRes.isContacted;
        }
        this.mainExhibitsData.joinProductType = newRes.joinProductType; // 我司参展展品为
        this.mainExhibitsData.isCarryOut = newRes.isCarryOut; // 展位期间开展的内贸业务
        this.mainExhibitsData.productLong = newRes.productLong; // 长
        this.mainExhibitsData.productWidth = newRes.productWidth; // 宽
        this.mainExhibitsData.productHeight = newRes.productHeight; // 高
        this.mainExhibitsData.productWeight = newRes.productWeight; // 产品最大重量
        this.mainExhibitsData.hscode = newRes.hscode; // 产品SH编码
        this.mainExhibitsData.boothNumber = newRes.boothNumber; // 申请数量
        this.mainExhibitsData.boothAcreage = newRes.boothAcreage; // 申请折合面积
        this.mainExhibitsData.boothNumberLast = newRes.boothNumberLast; // 上届申请数量
        this.mainExhibitsData.boothAcreageLast = newRes.boothAcreageLast; // 上届申请折合面积
        this.mainExhibitsData.exhibitionType = newRes.exhibitionType;
        this.mainExhibitsData.insideSale = newRes.insideSale;
        this.mainExhibitsData.commerceWebsit = newRes.commerceWebsit;

        // 主要海关商品编码
        for (let maint in newRes.mainProductCodeList) {
          if (maint < 1) {
            this.mainExhibitsData.domatons[maint].listSpou = newRes.mainProductCodeList[maint].hsCode;
            this.mainExhibitsData.domatons[maint].listOptn = newRes.mainProductCodeList[maint].exhibitsCn;
          } else {
            this.mainExhibitsData.domatons.push({
              listSpou: newRes.mainProductCodeList[maint].hsCode,
              listOptn: newRes.mainProductCodeList[maint].exhibitsCn
            });
          }
        }
        // 确认海关编码
        this.mainExhibitsData.appList = newRes.companyCustomsCodeList;
        const urlName = [];
        for (let custom in this.mainExhibitsData.appList) {
          const attachment = newRes.companyCustomsCodeList[custom].attachment;
          const attachmentName = newRes.companyCustomsCodeList[custom].attachmentName;
          urlName.push(attachment);
          this.mainExhibitsData.appList[custom].customsCode = newRes.companyCustomsCodeList[custom].customsCode;
          this.mainExhibitsData.appList[custom].relationship = newRes.companyCustomsCodeList[custom].relationship;
          this.mainExhibitsData.appList[custom].relationshipName = newRes.companyCustomsCodeList[custom].relationshipName;
          this.mainExhibitsData.appList[custom].attachmentName = newRes.companyCustomsCodeList[custom].attachmentName;
          this.mainExhibitsData.appList[custom].attachment = newRes.companyCustomsCodeList[custom].attachment;
          this.mainExhibitsData.appList[custom].fileList = [{ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + attachment, name: attachmentName, uid: attachment }];
        }
        this.urlName = urlName;
        // 联营企业
        for (let union in newRes.companyUnionList) {
          if (newRes.companyUnionList.length < 2) {
            this.mainExhibitsData.enterprise[union].venture = newRes.companyUnionList[union].unionId;
          } else {
            this.mainExhibitsData._this.$route.query.data.companyUnionList[union].unionId.push({
              venture: newRes.companyUnionList[union].unionId
            });
          }
        }
        // 主要展示产品
        for (let key in newRes.companyProductList) {
          if (key < 1) {
            this.mainExhibitsData.domains[key].products = newRes.companyProductList[key].productId;
          } else {
            this.mainExhibitsData.domains.push({
              products: newRes.companyProductList[key].productId
            });
          }
        }
        this.mainExhibitsData.insideSale = newRes.insideSale;
        setTimeout(() => {
          window.print();
        }, 2000);
      })
        .catch(e => { });
      let values = encodeURI(JSON.stringify({ companyId: this.$store.state.userInfo.companyId }));
      this.getSchemePublishBrandFlag(values).then(res => {
        if (res === "0") {
          this.mainExhibitsData.boothType = "01";
          this.isShowed = true;
        } else {
          this.boothTypeOpts = [
            { value: "01", label: "一般性展位" },
            { value: "02", label: "品牌展位" }
          ];
          this.isShowed = false;
        }
      })
        .catch(e => { });
    }
    let countParam = {
      "companyId": this.$store.state.userInfo.companyId
    };
    if (_this.$route.query.data) {
      // if (_this.$route.query.data.exhibitionArea) {
      //   _this.handleExhibitionChange(_this.$route.query.data.exhibitionArea);
      // }
      for (let i in _this.mainExhibitsData) {
        for (let j in _this.$route.query.data) {
          if (i === j) {
            _this.$set(_this.mainExhibitsData, [i], _this.$route.query.data[j]);
          }
        }
      }

      //20190504修改bug，页面从新增展品或添加联营返回来的时候，上次填写的内容被清空了
      //原先的代码里面重新赋值内容不全 需重新补全
      let queryData = _this.$route.query.data;  //保存下来的数据
      // 主要海关商品编码
      for (let maint in queryData.mainProductCodeList) {
        if (maint < 1) {
          this.mainExhibitsData.domatons[maint].listSpou = queryData.mainProductCodeList[maint].hsCode;
          this.mainExhibitsData.domatons[maint].listOptn = queryData.mainProductCodeList[maint].exhibitsCn;
        } else {
          this.mainExhibitsData.domatons.push({
            listSpou: queryData.mainProductCodeList[maint].hsCode,
            listOptn: queryData.mainProductCodeList[maint].exhibitsCn
          });
        }
      }

      // 确认海关编码
      this.mainExhibitsData.appList = queryData.companyCustomsCodeList;
      const urlName = [];
      for (let custom in this.mainExhibitsData.appList) {
        const attachment = queryData.companyCustomsCodeList[custom].attachment;
        urlName.push(attachment);
        this.mainExhibitsData.appList[custom].customsCode = queryData.companyCustomsCodeList[custom].customsCode;
        this.mainExhibitsData.appList[custom].relationship = queryData.companyCustomsCodeList[custom].relationship;
        this.mainExhibitsData.appList[custom].relationshipName = queryData.companyCustomsCodeList[custom].relationshipName;
        this.mainExhibitsData.appList[custom].attachment = queryData.companyCustomsCodeList[custom].attachment;
        this.mainExhibitsData.appList[custom].attachmentName = queryData.companyCustomsCodeList[custom].attachmentName;
        this.mainExhibitsData.appList[custom].fileList = [{
          url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + queryData.companyCustomsCodeList[custom].attachment, name: queryData.companyCustomsCodeList[custom].attachmentName, uid: queryData.companyCustomsCodeList[custom].attachment
        }];
      }
      this.urlName = urlName.join(',');
      // 联营企业
      if (queryData.companyUnionList && queryData.companyUnionList.length > 0) {
        for (let union in queryData.companyUnionList) {
          if (queryData.companyUnionList.length < 2) {
            this.mainExhibitsData.enterprise[union].venture = queryData.companyUnionList[union].unionId;
          } else {
            this.mainExhibitsData.enterprise.push({
              venture: queryData.companyUnionList[union].unionId
            });
          }
        }
      } else {
        this.mainExhibitsData.enterprise[0].venture = 'none';
      }

      // 主要展示产品
      for (let key in queryData.companyProductList) {
        if (key < 1) {
          this.mainExhibitsData.domains[key].products = queryData.companyProductList[key].productId;
        } else {
          this.mainExhibitsData.domains.push({
            products: queryData.companyProductList[key].productId
          });
        }
      }

      //  新宠需要上传的几个文件
      if (queryData.uploadTanxId) {
        this.fileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + queryData.uploadTanxId, name: queryData.uploadTanxName, uid: queryData.uploadTanxId });
      }
      if (queryData.enterpriseLegalId) {
        this.enterpriseLegalIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + queryData.enterpriseLegalId, name: queryData.enterpriseLegalName, uid: queryData.enterpriseLegalId });
      }
      if (queryData.certificateId) {
        this.certificateIdLegalIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + queryData.certificateId, name: queryData.certificateName });
      }
      if (queryData.productBriefId) {
        this.productBriefIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + queryData.productBriefId, name: queryData.productBriefName, uid: queryData.productBriefId });
      }
    }

    //20190504只有是新宠的时候才需要查询该接口
    this.getCountByCompanyIdInfo(countParam).then(res => {
      this.companyCount = res;
      this.zlAndBq = parseInt(res.fmzl) + parseInt(res.xxzl) + parseInt(res.wgzl) + parseInt(res.bqzl);
    });

    if (this.$route.query && this.$route.query.data && this.$route.query.data.exhibitionArea) {
      this.mainExhibitsData.exhibitionArea = this.$route.query.data.exhibitionArea;
      this.handleExhibitionChange(this.$route.query.data.exhibitionArea);
    }

  },
  methods: {
    ...mapActions("file", ["delFileInfo", "addFile", "selectFileInfo", "downloadFileInfo"]),
    ...mapActions('common', ['getSessionInfo', 'getRuleInfos', 'getProgressTimeInfo']),
    ...mapActions('corpDataManagement', ['getBasicInfo']), // 获取企业基本信息
    ...mapActions("companyInfomation", [
      "getGeneralAddi", // 一般性新增联营
      "getGeneralVenture", // 一般性新增展品
      "getSchemePublishBrandFlag", // 展位性质判断
      "postSchemePublishSubmit",
      "postSchemePublishSubmit", // 提交
      "getGeneralExhibit", // 面积
      "getHandRemove",
      "postGetSubmission",
      'getCountByCompanyIdInfo', // 获取企业资质信息参与次数
      'getAreaCodeInfo',
      'insertCompanyCertificateInfo', // 企业对应关系
      'judgeGeneralStandIsBlack', // 查看企业在该展区是否黑名单
      'getLastApplyNumberInfo' // 获取上届展位数量
    ]),
    limitOrder() {
      // 要做长度判断
      if (this.$refs.order.value.length > 8) {
        this.$refs.order.value = this.$refs.order.value.substring(0, 9);
        this.order = this.$refs.order.value;
      }
    },
    // 跳转外部链接
    toOut() {
      window.open("http://www.cantonfair.org.cn/cn/common/detail.aspx?oid=8466");
    },
    // 下载对应规则
    downRules() {
      let fileId = 'notes/HS编码范围.xlsx';
      // let fileId = '5cc024881202ad754ca08a6c';
      let baseUrl = process.env.API_OS_URL;
      // this.downloadFileInfo(fileId);
      window.open(baseUrl + "/efOS/file/downloadFile?fileId=" + fileId);

    },
    // 企业资质信息查看
    toReview(item) {
      $locals.set("__cache_exh_data__", JSON.stringify(this.$data));
      this.$router.push({
        path: '/aptitudedTable',
        query: {
          data: {
            "item": item,
            // "returnPage": '/brand_applicat_list'
            "returnPage": '/main_exhibits_apply',
            "exhibitionArea": this.mainExhibitsData.exhibitionArea
          }
        }
      });
    },

    // 清空展区等
    clearBooth() {
      this.mainExhibitsData.exhibitionArea = "";
      this.isMechanical = false; // 是否为大型机械等
      this.isContractFlag = false; // 是否愿意接洽国内采购商
      this.isMechan = false; // 宠物是否显影
      this.isShow = false;
      this.isShowComInfo = false;
      this.isnew = false;
    },
    // 文件上传成功之前
    beforeUpload(file) { },
    // 上传成功的文件
    uploadSuccessfully(response, file, fileList, index) {
      this.mainExhibitsData.appList[index].attachment = response.data.fileId;
      this.mainExhibitsData.appList[index].attachmentName = file.name;
      this.mainExhibitsData.appList[index].fileList = fileList;
      this.urlName = this.urlName.concat(response.data.fileId);
      this.$refs.mainExhibitsForm.validateField('appList');
    },
    uploadSuccessfullyT(response, file, fileList, index) {
      this.urlNameT.push(response.data.fileId);
    },
    uploadSuccessfullyF(response, file, fileList, index) {
      this.urlNameF.push(response.data.fileId);
    },
    //上传成功
    handleSuccessLegalId(response, file, fileList, index) {
      this.$refs.enterpriseLegalId.clearValidate();
      this.enterpriseLegalIdfileList = [];
      this.enterpriseLegalIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + response.data.fileId, name: file.name, uid: response.data.fileId });
      this.mainExhibitsData.enterpriseLegalId = response.data.fileId;
      this.mainExhibitsData.enterpriseLegalName = file.name;
    },
    //删除文件
    handleRemoveLegalId(file, fileList) {
      let _this = this;
      let fileId = "";
      if (file.response) {
        fileId = file.response.data.fileId;
      } else if (file.uid) {
        fileId = file.uid;
      }
      // 删除图片
      this.$http.postJson(this.baseApi + '/efOS/file/deleteFile', fileId).then((res) => {
        _this.mainExhibitsData.enterpriseLegalId = '';
        _this.mainExhibitsData.enterpriseLegalName = '';
        _this.enterpriseLegalIdfileList = [];
        this.$message.success('删除成功!');
        this.$refs.mainExhibitsForm.validateField('enterpriseLegalId');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    beforeRemoveLegalId() {
      return this.$confirm('确定移除该文件？');
    },
    handleRemovecertificateId(file, fileList) {
      const _this = this;
      let fileId = "";
      if (file.response) {
        fileId = file.response.data.fileId;
      } else if (file.uid) {
        fileId = file.uid;
      }
      // 删除图片
      this.$http.postJson(this.baseApi + '/efOS/file/deleteFile', fileId).then((res) => {
        _this.mainExhibitsData.certificateId = '';
        _this.mainExhibitsData.certificateName = "";
        _this.certificateIdLegalIdfileList = [];
        this.$message.success('删除成功!');
        this.$refs.mainExhibitsForm.validateField('certificateId');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    handleRemoveproductBriefId(file, fileList) {
      let fileId = "";
      const _this = this;
      if (file.response) {
        fileId = file.response.data.fileId;
      } else if (file.uid) {
        fileId = file.uid;
      }
      // 删除图片
      this.$http.postJson(this.baseApi + '/efOS/file/deleteFile', fileId).then((res) => {
        _this.mainExhibitsData.productBriefId = '';
        _this.productBriefIdfileList = [];
        _this.mainExhibitsData.productBriefName = '';
        this.$message.success('删除成功!');
        this.$refs.mainExhibitsForm.validateField('productBriefId');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    beforeRemovecertificateId() {
      return this.$confirm('确定移除该文件？');
    },
    handleSuccesscertificateId(response, file, fileList, index) {
      this.certificateIdLegalIdfileList = [];
      this.mainExhibitsData.certificateId = response.data.fileId.toString();
      this.mainExhibitsData.certificateName = file.name;
      this.certificateIdLegalIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + response.data.fileId, name: file.name, uid: response.data.fileId });
      // this.mainExhibitsData.certificateId = response.data.fileId;
      this.$refs.certificateId.clearValidate();
    },
    handleSuccessproductBriefId(response, file, fileList, index) {
      this.$refs.productBriefId.clearValidate();
      this.productBriefIdfileList = [];
      this.mainExhibitsData.productBriefId = response.data.fileId.toString();
      this.mainExhibitsData.productBriefName = file.name;
      // this.mainExhibitsData.productBriefId = response.data.fileId;
      this.productBriefIdfileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + response.data.fileId, name: file.name, uid: response.data.fileId });
    },

    // // 删除文件方法
    handleRemove(file, fileList, index) {
      let fileId = "";
      if (file.response) {
        fileId = file.response.data.fileId;
      } else if (file.uid) {
        fileId = file.uid;
      }
      this.$http.postJson(this.baseApi + '/efOS/file/deleteFile', fileId).then((res) => {
        this.mainExhibitsData.appList[index].fileList = [];
        this.mainExhibitsData.appList[index].attachment = '';
        this.mainExhibitsData.appList[index].attachmentName = '';
        this.urlName.splice(this.urlName.indexOf(fileId), 1);
        this.$message.success('删除成功!');
        this.$refs.mainExhibitsForm.validateField('appList');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    handlePreview(file) { },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm('确定移除该文件？');
    },
    // 一般性新增联营
    handeNewGeneral(val) {
      let values = encodeURI(JSON.stringify(val));
      this.getGeneralAddi(values)
        .then(res => { })
        .catch(e => { });
    },
    // 主要出口展品选择事件
    handleChangeOne(val) {
      this.productList = [];
      let kk = "";
      if (this.mainExhibitsData.domains.length > 0) {
        for (let i = 0; i < this.mainExhibitsData.domains.length; i++) {
          this.productList.push(this.mainExhibitsData.domains[i].products);
        }
        this.productList.splice(this.productList.indexOf(val), 1);
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i] === val) {
            kk = '1';
          } else {
            kk = '2';
          }
        }
        this.productList.push(val);
      }
      if (kk === '1') {
        this.isToAddition = false;
      } else {
        this.isToAddition = true;
      }
      if (val) {
        for (let i = 0; i < this.productIdOneOpts.length; i++) {
          if (this.productIdOneOpts[i].value === val) {
            this.mainExhibitsData.productNameOne = this.productIdOneOpts[i].value;
            // this.mainExhibitsData.listChang = this.productIdOneOpts[i].label;
            break;
          }
        }
        for (let i = 0; i < this.indexes; i++) {
          this.productIds.push({ productId: val });
        }

      } else {
        this.mainExhibitsData.productNameOne = "";
      }
    },
    handleChangeTwo(val) {
      if (val) {
        for (let i = 0; i < this.productIdTwoOpts.length; i++) {
          if (this.productIdTwoOpts[i].value === val) {
            this.mainExhibitsData.productNameTwo = this.productIdTwoOpts[i].label;
            break;
          }
        }
      } else {
        this.mainExhibitsData.productNameTwo = "";
      }
    },
    // 删除海关编码
    removeRemove(index) {
      this.mainExhibitsData.domatons.splice(index, 1);
    },
    // 添加 海关编码
    addDomainCode(val) {
      this.mainExhibitsData.domatons.push({
        listOptn: "",
        listSpou: "",
        key: Date.now()
      });
    },
    // 删除确认海关编码
    removeSemove(index) {
      this.mainExhibitsData.appList.splice(index, 1);
    },
    // removeSemoveT(index) {
    //   this.mainExhibitsData.cerficate.splice(index, 1);
    // },
    // 添加确认海关编码
    addDomainDode(val) {
      this.mainExhibitsData.appList.push({
        customsCode: "",
        relationship: "",
        attachment: '',
        relationshipName: "",
        fileList: [],
        key: Date.now()
      });
    },
    // addDomainDodeT(val) {
    //   this.mainExhibitsData.cerficate.push({
    //     holdingCompany: "",
    //     key: Date.now()
    //   });
    // },
    // 删除主要展示产品
    removeDomain(item) {
      this.indexes = this.indexes - 1;
      let index = this.mainExhibitsData.domains.indexOf(item);
      if (index !== -1) {
        this.mainExhibitsData.domains.splice(index, 1);
      }
      this.$refs['mainExhibitsForm'].validateField('domains', (valid) => {
        if (!valid) {
          this.isToAddition = true;
        }
      }
      );
    },
    // 添加主要展示产品
    addDomain() {
      this.indexes = this.indexes + 1;
      this.mainExhibitsData.domains.push({
        products: "",
        key: Date.now(),
        newVal: ""
      });
    },
    // 联营企业删除
    removeTomain(item) {
      if (!this.disabledVenture) {
        if (item !== -1) {
          for (let i = 0; i < this.mainExhibitsData.enterprise.length; i++) {
            if (this.mainExhibitsData.enterprise[i] === this.mainExhibitsData.enterprise[item]) {
              this.isHide = true;
            }
          }
          this.mainExhibitsData.enterprise.splice(item, 1);
        }
        this.$refs['mainExhibitsForm'].validateField('enterprise', (valid) => {
          if (!valid) {
            this.isHide = true;
          }
        });
      } else {
        this.mainExhibitsData.enterprise[0].venture = 'none';
        this.$message.error(this.notContainExhibitPeriodTip);
      }
    },
    // 添加联营企业
    addTomain() {
      if (!this.disabledVenture) {
        this.mainExhibitsData.enterprise.push({
          venture: ""
          // key: Date.now()
        });
      } else {
        this.mainExhibitsData.enterprise[0].venture = 'none';
        this.$message.error(this.notContainExhibitPeriodTip);
      }
    },
    // 判断当前选择的联营企业是否重复
    isRepeat(val) {
      // 判断是否已经选择过展区
      if (this.mainExhibitsData.exhibitionArea === '' || !this.mainExhibitsData.exhibitionArea) {
        this.$message.error('请先选择展区');
      } else {
        this.ventureList = [];
        let kk = "";
        if (this.mainExhibitsData.enterprise.length > 0) {
          for (let i = 0; i < this.mainExhibitsData.enterprise.length; i++) {
            this.ventureList.push(this.mainExhibitsData.enterprise[i].venture);
          }
          this.ventureList.splice(this.ventureList.indexOf(val), 1);
          for (let i = 0; i < this.ventureList.length; i++) {
            if (this.ventureList[i] === val) {
              kk = '1';
            } else {
              kk = '2';
            }
          }
          this.ventureList.push(val);
        }
        if (kk === '1') {
          this.isHide = false;
        } else {
          this.isHide = true;
        }
      }

    },
    // 展区更换事件
    handleExhibitionChange(val) {
      // 获取届数
      this.getSessionInfo().then(res => {
        if (res.session) {
          // 获取参展时间段
          let progressParam = {
            exhibitionNum: res.session,
            subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_1'
          };
          this.getProgressTimeInfo(progressParam).then(progressRes => {
            // 当前时间在参展时间段内可确认参展和编辑
            if (progressRes && progressRes.startTime && progressRes.endTime) {
              let startTime = new Date(progressRes.startTime).getTime();
              let endTime = new Date(progressRes.endTime).getTime();
              let nowTime = new Date().getTime();
              if (nowTime >= startTime && nowTime <= endTime) {
                this.containExhibitionPeriod = true;
                // 启用最终提交按钮，联营企业必须未被禁用
                if (!this.disabledVenture) {
                  this.confirmDisabled = false;
                }
              } else {
                // 获取参展时间段
                let ruleParam = {
                  exhibitionNum: res.session,
                  subKey: val && (val === 'NE01' || val === 'CG06') ? 'TIM_NEW_COMMONLY_EXHIBITION_POSITION_APPLY' : 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_1',
                  orgId: this.$store.state.userInfo.companyId,
                  area: val
                };
                this.getRuleInfos(ruleParam).then(resp => {
                  // 当前时间在参展时间段内可新增，编辑和删除展位
                  if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                    let ruleStartTime = new Date(resp[0].startTime).getTime();
                    let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                    let ruleNowTime = new Date().getTime();
                    if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                      this.containExhibitionPeriod = true;
                      // 启用最终提交按钮，联营企业必须未被禁用
                      // if (!this.disabledVenture) {
                      //   this.confirmDisabled = false;
                      // }
                      this.confirmDisabled = false;
                    } else {
                      this.containExhibitionPeriod = false;
                      // 禁用最终提交按钮
                      this.confirmDisabled = true;
                    }
                  } else {
                    // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                    this.containExhibitionPeriod = false;
                    // 禁用最终提交按钮
                    this.confirmDisabled = true;
                  }
                }).catch(e => {
                  // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                  this.containExhibitionPeriod = true;
                });
              }
            } else {
              // 未拿到参展时间段也暂时可以新增，编辑和删除展位
              this.containExhibitionPeriod = true;
              // 启用最终提交按钮，联营企业必须未被禁用
              this.confirmDisabled = false;
            }
          });
        } else {
          // 未拿到届数暂时可以新增，编辑和删除展位
          this.containExhibitionPeriod = true;
        }
      }).catch(e => {
        // 未拿到届数暂时可以新增，编辑和删除展位
        this.containExhibitionPeriod = true;
      });
      this.dealWithExhibitApply(val);
    },
    dealWithExhibitApply(val) {
      this.$refs["mainExhibitsForm"].clearValidate();
      let _this = this;
      this.ExhibitionTypeOpts = [];
      this.productTypeOpts = [];
      for (let i in this.mainExhibitsData.domains) {
        this.mainExhibitsData.domains[i].products = "";
      }
      this.mainExhibitsData.productType = "";
      this.mainExhibitsData.productIdOne = "";
      this.mainExhibitsData.productIdTwo = "";
      // 获取展品大类
      let parms = {
        "areaCode": val,
        "session": this.session
      };
      this.getAreaCodeInfo(parms).then(res => {
        this.ifBooth = false;
        if (this.mainExhibitsData.boothNumber) {
          this.mainExhibitsData.boothAcreage = this.mainExhibitsData.boothNumber * res[0].seatArea;
        }
        for (let m = 0; m < res.length; m++) {
          this.areaCount = res[m].seatArea;
          if (res[m].specialAreas && res[m].specialAreas.length > 0) {
            let currentSpecialAreas = res[m].specialAreas;
            for (let i = 0; i < currentSpecialAreas.length; i++) {
              let currentSubSpecialAreas = currentSpecialAreas[i];
              if (currentSubSpecialAreas.languages && currentSubSpecialAreas.languages.length > 0) {
                let currentLanguages = currentSubSpecialAreas.languages;
                for (let j = 0; j < currentLanguages.length; j++) {
                  if (currentLanguages[j].language === 'zh') {
                    this.productTypeOpts.push({
                      value: currentSubSpecialAreas.specialAreaCode,
                      label: currentLanguages[j].name
                    });
                  }
                }
              }
            }
            this.isShow = true;
          } else {
            this.isShow = false;
          }
          if (!_this.$route.query.data) {
            this.mainExhibitsData.exhibitionType = '';
          }
          // if (val !== 'CG06' && val !== 'NE01') {
          if (res[m].isUnifyArrangeExhibitionArea === false) {
            // 非统一布展区  只能选择标摊  和 绿色特装
            for (let k = 0; k < _this.finalExhibitionTypeOpts.length; k++) {
              if (_this.finalExhibitionTypeOpts[k].value === "SPECIAL_BOOTH" || _this.finalExhibitionTypeOpts[k].value === "STANDARD_BOOTH") {
                _this.ExhibitionTypeOpts.push({
                  value: _this.finalExhibitionTypeOpts[k].value,
                  label: _this.finalExhibitionTypeOpts[k].label
                });
              }
            }
          } else if (res[m].isUnifyArrangeExhibitionArea === true) {
            if (val === 'MA02') {
              // 大型机械 布展类型只能选择统一布展
              for (let n = 0; n < _this.finalExhibitionTypeOpts.length; n++) {
                if (_this.finalExhibitionTypeOpts[n].value === "UNIFICATION_BOOTH") {
                  _this.ExhibitionTypeOpts.push({
                    value: _this.finalExhibitionTypeOpts[n].value,
                    label: _this.finalExhibitionTypeOpts[n].label
                  });
                }
              }
            } else {
              for (let n = 0; n < _this.finalExhibitionTypeOpts.length; n++) {
                // 其他统一布展展区 只能选择统一布展 和绿色特装
                if (_this.finalExhibitionTypeOpts[n].value === "UNIFICATION_BOOTH" || _this.finalExhibitionTypeOpts[n].value === "SPECIAL_BOOTH") {
                  _this.ExhibitionTypeOpts.push({
                    value: _this.finalExhibitionTypeOpts[n].value,
                    label: _this.finalExhibitionTypeOpts[n].label
                  });
                }
              }
            }

          }
        }
        this.ifBooth = true;

        //20190503 修改bug，用户申请数量如果是1，则只提供”标摊“列表，
        //在这里判断是为了防止用户先输入数量，再去重新选择展区，选择展区时，布展类型已经发生了变化，而此时并没有出发input的事件
        _this.TempExhibitionTypeOpts = JSON.parse(JSON.stringify(_this.ExhibitionTypeOpts));
        if (_this.ExhibitionTypeOpts.length > 0 && this.mainExhibitsData.boothNumber && this.mainExhibitsData.boothNumber < 2 && val !== "MA02" && val !== "MA07" && val !== "MA08" && val !== "HD06" && val !== "VS04") {
          _this.mainExhibitsData.exhibitionType = 'STANDARD_BOOTH';  //清空选择过的布展类型
          _this.ExhibitionTypeOpts = [{ value: 'STANDARD_BOOTH', label: '标摊' }];
        } else {
          _this.ExhibitionTypeOpts = _this.TempExhibitionTypeOpts;
        }
      });

      if (val === 'CG06' || val === 'NE01') {
        this.isShowComInfo = true;
        this.isNewBaby = false;
      } else {
        this.isShowComInfo = false;
        this.isNewBaby = true;
      }
      //20190503 新增“铁石”，“车辆” 同大型机械设备展示
      if (val === "MA02" || val === "MA07" || val === "MA08" || val === "HD06" || val === "VS04") {
        this.isMechanical = true;
      } else if (val === "FN01") {
        this.isMechanical = false;
        this.isMechan = false;
      } else if (val === "CG06") {
        this.isMechanical = false;
        this.isMechan = true;
      } else if (val === "NE01") {
        this.isMechanical = false;
        this.isMechan = true;
      } else if (val === "CG01") {
        this.isMechanical = false;
        this.isMechan = false;
      } else if (val === "HT01") {
        this.isMechanical = false;
        this.isMechan = false;
      } else if (val === "EH04") {
        this.isMechanical = false;
        this.isMechan = false;
      } else if (val === "BM02") {
        this.isMechanical = false;
        this.isMechan = false;
      } else {
        this.isMechanical = false;
        this.isMechan = false;
        this.productTypeOpts = [];
        this.productIdOneOpts = [];
        this.productIdTwoOpts = [];
      }
      // let values = encodeURI(JSON.stringify(val));

      // 更新主要展示产品下拉
      let ExhibitJson = {
        companyId: this.$store.state.userInfo.companyId,
        exhibitTypeOne: val
      };

      this.getGeneralVenture(ExhibitJson).then(res => {
      }).catch(e => { });

      // 获取上届展位数量和设置上届展位面积
      let parm = {
        companyId: this.$store.state.userInfo.companyId,
        exhibitionArea: val,
        boothType: this.mainExhibitsData.boothType
      };
      this.getLastApplyNumberInfo(parm).then(res => {
        this.mainExhibitsData.boothNumberLast = res.lastApplyNum;
        let par = {
          "areaCode": val,
          "session": this.session - 1
        };
        // 获取上届展位面积
        this.getAreaCodeInfo(par).then(resT => {
          if (resT && resT[0] && res) {
            this.mainExhibitsData.boothAcreageLast = res.lastApplyNum * resT[0].seatArea;
          }
        });
      }).catch(e => { });
      // 判断展区是否是黑名单
      this.judgeGeneralStandIsBlack({
        "exhibitionNum": this.session,
        "companyId": this.$store.state.userInfo.companyId,
        "exhibitionAreaCode": val,
        "ifflaunt": "01"
      }).then(res => {
        if (res.punishInfos) {
          this.maxNum = 0;
          this.isApplySpecial = true;
          // 前提是联营企业未被禁用
          if (!this.disabledVenture) {
            this.confirmDisabled = false;
          }
          for (let i = 0; i < res.punishInfos.length; i++) {
            // 如果maxnum不为0，则根据其值限制申请展位数量，
            if (res.punishInfos[i].maxnum && (res.punishInfos[i].maxnum !== 0 || res.punishInfos[i].maxnum !== "0") && (res.punishInfos[i].maxnum > this.maxNum)) {
              this.maxNum = res.punishInfos[i].maxnum;
            } else if (res.punishInfos[i].maxnum === 0 || res.punishInfos[i].maxnum === "0") {
              // 事件eventCode为107，117，101时，不给展位申请
              if (res.punishInfos[i].eventCode && (res.punishInfos[i].eventCode === "107" || res.punishInfos[i].eventCode === "117" || res.punishInfos[i].eventCode === "101")) {
                this.$message.error('该企业在该展区为黑名单用户!');
                this.confirmDisabled = true;
                // 事件eventCode为125时，系统对展位申请操作为在相应展区申请展位不可将布展类型选为 特装。
              } else if (res.punishInfos[i].eventCode && res.punishInfos[i].eventCode === "125") {
                this.isApplySpecial = false;
              }
            }
          }
        }
      }).catch(e => {
      });
    },
    // 申请数量鼠标离开事件
    handleBoothNumBlur() {
      let _this = this;
      let parms = {
        "areaCode": this.mainExhibitsData.exhibitionArea,
        "session": this.session
      };
      this.mainExhibitsData.boothAcreage = this.mainExhibitsData.boothNumber * this.areaCount;
      if (this.mainExhibitsData.exhibitionArea === 'CG06' || this.mainExhibitsData.exhibitionArea === 'NE01') {
        this.getAreaCodeInfo(parms).then(res => {
          this.ExhibitionTypeOpts = [];
          this.mainExhibitsData.exhibitionType = '';
          for (let m = 0; m < res.length; m++) {
            // 以下为了做布展类型修改
            if (res[m].isUnifyArrangeExhibitionArea === false) {
              for (let k = 0; k < _this.finalExhibitionTypeOpts.length; k++) {
                if (_this.finalExhibitionTypeOpts[k].value !== "UNIFICATION_BOOTH" && _this.finalExhibitionTypeOpts[k].value !== "CENTER_CHANNEL_BOOTH" && this.mainExhibitsData.boothNumber > 1) {
                  _this.ExhibitionTypeOpts.push({
                    value: _this.finalExhibitionTypeOpts[k].value,
                    label: _this.finalExhibitionTypeOpts[k].label
                  });
                } else if (_this.finalExhibitionTypeOpts[k].value === "STANDARD_BOOTH" && this.mainExhibitsData.boothNumber < 2 && this.mainExhibitsData.boothNumber < 2) {
                  _this.ExhibitionTypeOpts.push({
                    value: _this.finalExhibitionTypeOpts[k].value,
                    label: _this.finalExhibitionTypeOpts[k].label
                  });
                }
              }
            } else if (res[m].isUnifyArrangeExhibitionArea === true) {
              for (let n = 0; n < _this.finalExhibitionTypeOpts.length; n++) {
                if (this.mainExhibitsData.boothNumber > 1) {
                  _this.ExhibitionTypeOpts.push({
                    value: _this.finalExhibitionTypeOpts[n].value,
                    label: _this.finalExhibitionTypeOpts[n].label
                  });
                } else if (_this.finalExhibitionTypeOpts[n].value === "STANDARD_BOOTH" && this.mainExhibitsData.boothNumber < 2 && this.mainExhibitsData.boothNumber < 2 && this.mainExhibitsData.exhibitionArea !== "MA02" && this.mainExhibitsData.exhibitionArea !== "MA07" && this.mainExhibitsData.exhibitionArea !== "MA08" && this.mainExhibitsData.exhibitionArea !== "HD06" && this.mainExhibitsData.exhibitionArea !== "VS04") {
                  _this.ExhibitionTypeOpts.push({
                    value: _this.finalExhibitionTypeOpts[n].value,
                    label: _this.finalExhibitionTypeOpts[n].label
                  });
                }

              }
            }
          }
        });
        // 20190511 大型机械及设备，仅有“统一布展”类
      } else if (this.mainExhibitsData.exhibitionArea === 'MA02') {
        _this.mainExhibitsData.exhibitionType = 'UNIFICATION_BOOTH';
        _this.ExhibitionTypeOpts = [{ value: 'UNIFICATION_BOOTH', label: '统一布展' }];
        // 车辆、工程农机（室内、外）、铁石装饰品及户外水疗设施，1个展位仅能选择“统一布展”，2个或以上展位可以选择“统一布展”或“绿色特装”
      } else if (['VS04', 'MA07', 'MA08', 'HD06'].includes(this.mainExhibitsData.exhibitionArea)) {
        _this.mainExhibitsData.exhibitionType = '';
        if (this.mainExhibitsData.boothNumber && this.mainExhibitsData.boothNumber < 2) {
          _this.mainExhibitsData.exhibitionType = 'UNIFICATION_BOOTH';
          _this.ExhibitionTypeOpts = [{ value: 'UNIFICATION_BOOTH', label: '统一布展' }];
        } else {
          _this.ExhibitionTypeOpts = [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'UNIFICATION_BOOTH', label: '统一布展' }];
        }
      } else {
        //20190503修改bug，除宠物、新能源以外，申请数量1条只提供“标摊”  如果大于1则是“标摊”+其他。只有查询到了布展类型才有意义进行下面的操作
        //客户要求只要数量是1则只提供一个“标摊”选择，大于1的时候则随意选择（及时查询到的布展类型只有1条也按此逻辑展示）
        _this.mainExhibitsData.exhibitionType = '';
        if (_this.ExhibitionTypeOpts.length > 0 && this.mainExhibitsData.boothNumber && this.mainExhibitsData.boothNumber < 2) {
          _this.mainExhibitsData.exhibitionType = 'STANDARD_BOOTH';  //清空选择过的布展类型
          _this.ExhibitionTypeOpts = [{ value: 'STANDARD_BOOTH', label: '标摊' }];
        } else {
          // _this.ExhibitionTypeOpts = _this.TempExhibitionTypeOpts;
          _this.ExhibitionTypeOpts = [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' }];
        }
      }
    },
    // 折合面积鼠标离开事件
    handleAcreageBlur() {
      if (this.mainExhibitsData.exhibitionArea === "MA02") {
        this.mainExhibitsData.boothNumber = Math.floor(
          this.mainExhibitsData.boothAcreage / 9
        );
      } else {
        this.mainExhibitsData.boothNumber = Math.floor(
          this.mainExhibitsData.boothAcreage / 8
        );
      }
    },
    // 是否愿意接洽国内采购商
    handleIsContracted(val) {
      if (val === "1") {
        this.isContractFlag = true;
      } else {
        this.mainExhibitsData.isCarryOut = '';
        this.mainExhibitsData.joinProductType = '';
        this.isContractFlag = false;
      }
    },
    // 删除图片
    handleRemoveT(file, fileList) {
      let fileId = "";
      if (file.response) {
        fileId = file.response.data.fileId;
      } else if (file.uid) {
        fileId = file.uid;
      }
      // 删除图片
      this.$http.postJson(this.baseApi + '/efOS/file/deleteFile', fileId).then((res) => {
        this.mainExhibitsData.uploadTanxId = '';
        this.mainExhibitsData.uploadTanxName = '';
        this.fileList = [];
        this.$message.success('删除成功!');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    handleSuccess(response, file, fileList) {
      this.mainExhibitsData.uploadTanxId = response.data.fileId.toString();
      this.mainExhibitsData.uploadTanxName = file.name;
      this.$refs.insideSale.clearValidate();
      this.fileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + response.data.fileId, name: file.name, uid: response.data.fileId });
    },
    // 上传类型设置
    handleBeforeUpload(file) {
      let isLt5Mb = file.size / 1024 / 1024 < 5;
      if (!isLt5Mb) {
        this.$message.error('上传文件大小不能超过 5Mb!');
      }
      return isLt5Mb;
    },
    getDicValue() { },
    // 点击确定
    async submitApplyConfirm(formName, val) {
      //20190504 选择新宠展区时，新增编辑确认操作需要进行二次确认；新增二次确认弹框
      let isConfirm = true;
      if (val === 'notTo') {
        // 该企业在所选展区为黑名单用户时 限制展位申请数量
        if (this.maxNum !== 0 && this.mainExhibitsData.boothNumber > this.maxNum) {
          this.$message.error("该企业在该展区为黑名单用户最大申请数量为" + this.maxNum);
          return false;
        } else if (this.mainExhibitsData.exhibitionType === "SPECIAL_BOOTH" && this.isApplySpecial === false) {
          this.$message.error("该企业在该展区为黑名单用户不能申请布展类型为绿色特装");
          return false;
        }
        if (this.mainExhibitsData.exhibitionArea === 'CG06' || this.mainExhibitsData.exhibitionArea === 'NE01') {
          await this.$confirm('请确认已按要求提交相关企业资质证明材料，确认请继续。').then(_ => {
            isConfirm = true;
          }).catch(_ => {
            isConfirm = false;
          });
        }
      }
      //如果新宠点击取消，则不用继续执行后面的操作；其他情况都要去执行后面的操作
      if (!isConfirm) {
        return;
      }
      // 主要展示产品
      let companyProductList = [];
      for (let key in this.mainExhibitsData.domains) {
        companyProductList.push({ productId: this.mainExhibitsData.domains[key].products });
      }
      // 确认海关编码
      let companyCustomsCodeList = [];
      for (let key in this.mainExhibitsData.appList) {
        let obj = {};
        obj.customsCode = this.mainExhibitsData.appList[key].customsCode;
        obj.relationship = this.mainExhibitsData.appList[key].relationship;
        obj.relationshipName = this.mainExhibitsData.appList[key].relationshipName;
        obj.relationship = this.mainExhibitsData.appList[key].relationship;
        obj.attachment = this.mainExhibitsData.appList[key].attachment;
        obj.attachmentName = this.mainExhibitsData.appList[key].attachmentName;
        companyCustomsCodeList.push(obj);
      }
      // 主要海关商品编码
      let mainProductCodeList = [];
      for (let i in this.mainExhibitsData.domatons) {
        mainProductCodeList.push({
          hsCode: this.mainExhibitsData.domatons[i].listSpou,
          exhibitsCn: this.mainExhibitsData.domatons[i].listOptn
        });
      }
      // 联营企业
      let companyUnionList = [];
      for (let i in this.mainExhibitsData.enterprise) {
        companyUnionList.push({
          unionId: this.mainExhibitsData.enterprise[i].venture
        });
      }
      let newName = "";
      for (let key in this.exhibitionAreaOpts) {
        if (
          this.exhibitionAreaOpts[key].value === this.mainExhibitsData.exhibitionArea
        ) {
          newName = this.exhibitionAreaOpts[key].label;
        }
      }
      // 展品分类
      for (let exhibit in this.productTypeOpts) {
        if (this.productTypeOpts[exhibit].value === this.mainExhibitsData.productType) {
          this.mainExhibitsData.productName = this.productTypeOpts[exhibit].label;
        }
      }

      let handeDate = {
        companyId: this.$store.state.userInfo.companyId,
        exhibitionArea: this.mainExhibitsData.exhibitionArea, // 展区cord
        boothType: this.mainExhibitsData.boothType, // 展位类型
        productType: this.mainExhibitsData.productType, // 展品分类
        productTypeName: this.mainExhibitsData.productName, // 展品分类
        hscode: this.mainExhibitsData.hscose, // 产品SH编码
        hscose: this.mainExhibitsData.hscose, // 产品SH编码
        boothNumber: this.mainExhibitsData.boothNumber, // 申请数量
        boothAcreage: this.mainExhibitsData.boothAcreage, // 申请折合面积
        boothNumberLast: this.mainExhibitsData.boothNumberLast, // 上届申请数量
        boothAcreageLast: this.mainExhibitsData.boothAcreageLast, // 上届申请折合面积
        productLong: this.mainExhibitsData.productLong, // 长
        productWidth: this.mainExhibitsData.productWidth, // 宽
        productHeight: this.mainExhibitsData.productHeight, // 高
        productWeight: this.mainExhibitsData.productWeight, // 产品最大重量
        exhibitionType: this.mainExhibitsData.exhibitionType, // 布展类型
        isContacted: this.mainExhibitsData.isContacted, // 是否愿意接洽国内采购商
        isCarryOut: this.mainExhibitsData.isCarryOut, // 展位期间开展的内贸业务
        joinProductType: "", // 我司参展展品为
        bottomLong: this.mainExhibitsData.bottomLong, // 底盘长
        bottomWidth: this.mainExhibitsData.bottomWidth, // 底盘宽
        insideSale: this.mainExhibitsData.insideSale, // 国内销售额
        companyProductList: companyProductList, // 主要展示产品
        uploadTanxId: this.mainExhibitsData.uploadTanxId,
        uploadTanxName: this.mainExhibitsData.uploadTanxName,
        // unionId: 76,            // 联营企业记录ID
        confirmFlag: "89898", // 选择标记（0否1是）
        // uploadlist: this.urlName,       // 选择标记（0否1是）
        companyCustomsCodeList: companyCustomsCodeList, // 确认海关编码
        mainProductCodeList: mainProductCodeList, // 主要海关编码
        companyUnionList: companyUnionList, // 联营企业
        exhibitionAreaName: newName, //展区名称
        enterpriseLegalId: this.mainExhibitsData.enterpriseLegalId,   //营业执照
        enterpriseLegalName: this.mainExhibitsData.enterpriseLegalName, // 营业执照名称
        certificateId: this.mainExhibitsData.certificateId,   //外贸经营者备案登记证明
        certificateName: this.mainExhibitsData.certificateName, //外贸经营者备案登记证明名称
        productBriefId: this.mainExhibitsData.productBriefId,   //产品简介
        productBriefName: this.mainExhibitsData.productBriefName,   //产品简介名称
        commerceWebsit: this.mainExhibitsData.commerceWebsit   //电商平台网址
      };
      if (this.mainExhibitsData.joinProductType) {
        handeDate.joinProductType = this.mainExhibitsData.joinProductType;
      }
      if (this.dataList.id === 1) {
        handeDate.demandRecordId = this.appData;
        // 联营企业
        for (let i in this.mainExhibitsData.enterprise) {
          handeDate.companyUnionList[i]["demandRecordId"] = this.appData;
        }

        // 主要展示产品
        for (let key in this.mainExhibitsData.domains) {
          handeDate.companyProductList[key]["demandRecordId"] = this.appData;
        }
        // 主要海关编码
        for (let keted in this.mainExhibitsData.domatons) {
          handeDate.mainProductCodeList[keted]["demandRecordId"] = this.appData;
        }
        // 确认海关编码
        // let companyCustomsCodeList = [];
        for (let key in this.mainExhibitsData.appList) {
          handeDate.companyCustomsCodeList = this.mainExhibitsData.appList;

          handeDate.companyCustomsCodeList[key][
            "demandRecordId"
          ] = this.appData;
        }
        if (val === "notTo") {
          this.$refs.mainExhibitsForm.validate(valid => {
            if (handeDate.companyProductList) {
              if (valid) {
                this.loading = true;
                this.postGetSubmission(handeDate)
                  .then(res => {
                    this.$router.push({
                      path: "/brand_applicat_list",
                      query: {
                        id: this.id
                      }
                    });
                  })
                  .catch(err => {
                    this.loading = false;
                  });
              }
            } else {
              this.isToAddition = false;
            }
          });
        }
      }
      if (val === "toAddition") {
        this.loading = false;
        handeDate.dataListId = this.dataList.id; //从下个新增产品页面返回回来需要记录新增、编辑的表示
        this.$confirm('前往新增产品？').then(_ => {
          $locals.set("__cache_exh_data__", JSON.stringify(this.$data));
          this.$router.push({
            path: '/addProduction',
            query: {
              returnName: "brandApplyDataList",
              data: handeDate
            }
          });
        }).catch(_ => { });
      } else if (val === "toUnionCom") {
        this.getBasicInfo(this.$store.state.userInfo.companyId).then(response => {
          if (response) {
            if (response.enterprisesType === "2" || response.enterprisesType === "3" || response.enterprisesType == null) {
              this.loading = false;
              handeDate.dataListId = this.dataList.id; //从下个维护联营企业页面返回回来需要记录新增、编辑的表示
              this.$confirm('前往维护联营企业？').then(_ => {
                $locals.set("__cache_exh_data__", JSON.stringify(this.$data));
                this.$router.push({
                  path: '/registJointInfo',
                  query: {
                    returnName: "brandApplyDataList",
                    data: handeDate
                  }
                });
              }).catch(_ => { });
            } else {
              this.$message({
                type: 'warning',
                message: '贵公司的企业类型为外贸企业或工贸企业时才可联营'
              });
            }
          }
        });

      } else if (val === "notTo") {
        //1编辑 3未知, 在初始化的时候看到有 20190504
        if (this.dataList.id !== 1 && this.dataList.id !== 3) {
          this.$refs.mainExhibitsForm.validate((valid, obj) => {
            if (handeDate.companyProductList[0].productId !== "") {
              if (valid) {
                this.loading = true;
                this.postSchemePublishSubmit(handeDate).then(res => {
                  $locals.removeItem('__cache_exh_data__');
                  this.loading = false;
                  this.$router.push({
                    path: "/brand_applicat_list",
                    query: {
                      id: this.id
                    }
                  });
                }).catch(err => {
                  this.loading = false;
                });
              }
            } else {
              this.isToAddition = false;
            }
          });
        }

      }
    },
    // 点击取消
    goBack() {
      $locals.removeItem('__cache_exh_data__');
      this.$router.push({ path: "/brand_applicat_list" });
    }
  }
};
</script>
