/**
 * @file 企业展品管理---新增展品
*/
<style scoped>
.el-checkbox {
  margin-left: 10px !important;
}
.el-checkbox+.el-checkbox {
  margin-left: 0px;
}
.el-form-item {
  width: 800px;
  position: relative;
  left: 20%;
  margin-bottom: 22px;
}
.el-input{
  width: 400px;
}
.third{
  width: 90%;
  margin: 0 1% 0 0;
}
.upload-basic-info {
  display: inline;
}
.remark{
  width: 200px;
  color: #d80c18;
}
.remarkClick{
  width: 200px;
  color: #d80c18;
  cursor: pointer;
}
.remarkable{
  cursor: pointer;
  color: #d80c18;
}
.info {
  color: #d80c18;
}
.giveInfo {
  text-align: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  color: #d80c18;
}
.giveInfoT {
  margin-top: 20px;
  text-align: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  color: #d80c18;
}
.addProduct {
    cursor: pointer;
    color: #d80c18;
    margin-right: 8px;
    margin-left: 5px;
  }

</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="module" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
        <!-- 后期需要调接口获取展品类别下拉框选项值，暂时为假数据 -->
        <el-form-item label="展品类别:" prop="exhibitTypeOne">
          <el-row>
            <el-col :span="8">
              <el-select v-model="ruleForm.exhibitTypeOne" placeholder="请选择展品类别一"
                class="third" :disabled="disabled" clearable @change="clearDicTypeTwo">
                <el-option v-for="item in dicTypeOne"
                  :key="item.exhibitTypeId"
                  :label="item.commcn"
                  :value="item.exhibitTypeId">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="ruleForm.exhibitTypeTwo" placeholder="请选择展品类别二"
                class="third" :disabled="disabled"  clearable @change="clearDicTypeThree">
                <el-option v-for="item in dicTypeTwo"
                  :key="item.exhibitTypeId"
                  :label="item.commcn"
                  :value="item.exhibitTypeId">
                </el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="8">
              <el-select v-model="ruleForm.exhibitTypeThree" placeholder="请选择展品类别三"
                class="third" :disabled="disabled"  clearable >
                <el-option v-for="item in dicTypeThree"
                  :key="item.exhibitTypeId"
                  :label="item.commcn"
                  :value="item.exhibitTypeId">
                </el-option>
              </el-select>

            </el-col> -->
          </el-row>
        </el-form-item>
        <el-form-item v-if="ishowRadio">
            <el-radio-group v-model="ruleForm.exhibitTypeThree">
            <el-radio v-for="item in dicTypeThree"
              :key="item.exhibitTypeId"
              :label="item.exhibitTypeId"
              >{{item.commcn}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="展品名称（中文）:" prop="exhibitNameCh">
          <el-input v-model.trim="ruleForm.exhibitNameCh" maxlength="50" clearable :disabled="disabled" placeholder="请输入展品名称"></el-input>
        </el-form-item>
        <el-form-item label="展品名称（英文）:" prop="exhibitNameEn">
          <el-input v-model="ruleForm.exhibitNameEn" maxlength="50" clearable :disabled="disabled" placeholder="请输入展品名称"></el-input>
        </el-form-item>
        <el-form-item label="展品关键字（中文）:" prop="exhibitKeywordCh">
          <el-row>
            <el-col :span="8">
              <el-input class="third" maxlength="16" clearable v-model="cusForm.getKeyvalOne" @change="getKeyOne" :disabled="disabled" placeholder="请输入关键字"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input class="third" maxlength="16" clearable v-model="cusForm.getKeyvalTwo" @change="getKeyTwo" :disabled="disabled"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input class="third" maxlength="16" clearable v-model="cusForm.getKeyvalThree" @change="getKeyThree" :disabled="disabled"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="展品关键字（英文）:" prop="exhibitsKeywordEn">
          <!-- 修改人: 李康   maxlength=16 改为 maxlength="50" -->
          <el-row>
            <el-col :span="8">
              <el-input class="third" maxlength="50" clearable v-model="cusForm.getKeyvalEnOne" @change="getKeyEnOne" :disabled="disabled" placeholder="请输入关键字"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input class="third" maxlength="50" clearable v-model="cusForm.getKeyvalEnTwo" @change="getKeyEnTwo" :disabled="disabled"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input class="third" maxlength="50" clearable v-model="cusForm.getKeyvalEnThree" @change="getKeyEnThree" :disabled="disabled"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="展品型号（中文）:" prop="exhibitModelCh">
          <el-input v-model="ruleForm.exhibitModelCh" clearable maxlength="50" :disabled="disabled" placeholder="请输入展品型号"></el-input>
        </el-form-item>
        <el-form-item label="展品型号（英文）:" prop="exhibitModelEn">
          <el-input v-model="ruleForm.exhibitModelEn" clearable maxlength="50" :disabled="disabled" placeholder="请输入展品型号"></el-input>
        </el-form-item>
        <el-form-item label="展品材质（中文）:" prop="exhibitMaterialCh">
          <el-input v-model="ruleForm.exhibitMaterialCh" clearable maxlength="50" :disabled="disabled" placeholder="请输入展品材质"></el-input>
        </el-form-item>
        <!-- 修改人： 李康  修改了展品材质（英文）的校验 -->
        <el-form-item label="展品材质（英文）:" prop="exhibitMaterialEn">
          <el-input v-model="ruleForm.exhibitMaterialEn" clearable maxlength="50" :disabled="disabled" placeholder="请输入展品材质"></el-input>
        </el-form-item>
        <el-form-item label="展品尺寸（中文）（mm）:" prop="exhibitSizeCh">
          <el-input v-model="ruleForm.exhibitSizeCh" clearable maxlength0="50" :disabled="disabled" placeholder="请输入展品尺寸（中文）"></el-input>
          <span class="remark">示例：80x20x90</span>
        </el-form-item>
         <!-- xlshih -->
        <el-form-item label="展品尺寸（英文）（mm）:" prop="exhibitSizeEn">
          <el-input v-model="ruleForm.exhibitSizeEn" clearable maxlength="50" :disabled="disabled" placeholder="请输入展品尺寸（英文）"></el-input>
          <span class="remark">示例：80x20x90</span>
        </el-form-item>
        <!-- 后期更改 -->
        <el-form-item label="展品特征:" prop="exhibitFeature">
          <el-checkbox-group v-model="cusForm.exFeature" @change="handleCheckedChange">
            <el-checkbox v-for="item in dicFeature" :label="item.value" :key="item.value" :disabled="disabled">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特征描述（中文）:" prop="exhibitFeatureDescribeCh">
          <el-input type="textarea" :autosize="{ minRows: 7 }" v-model="ruleForm.exhibitFeatureDescribeCh" clearable maxlength="500" :disabled="disabled" placeholder="请输入例如展品功能、特性、材质、尺寸、包装等信息。"></el-input>
        </el-form-item>
        <el-form-item label="特征描述（英文）:" prop="exhibitFeatureDescribeEn">
          <el-input type="textarea" :autosize="{ minRows: 7 }" v-model="ruleForm.exhibitFeatureDescribeEn" clearable maxlength="500" :disabled="disabled" placeholder="Please provide additional product information here,such as function,features,characteristics,material, size, package."></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <!-- exhibitImageId 字段 实际用处， 只用于触发验证   ref="exhibitImageId"-->
        <el-form-item label="展品图片:" prop="exhibitImageId">
          <el-upload
            v-model="ruleForm.exhibitImageId"
            class="upload-basic-info"
            :action="uploadUrl"
            :data="{ 'businessDelegationCode': delegationCode }"
            list-type="picture-card"
            :disabled="disabled"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :before-upload="handleBeforeUpload"
            :file-list="fileList"
            :limit="imgLimit">
            <i v-show="fileList.length < 4" class="el-icon-plus"></i>
          </el-upload>
          <span style="float: right;font-size: 12px;">- 格式：JPG, JPEG, GIF, PNG<br/>- 数量：不超过{{imgLimit}}张<br/>- 大小：不超过5mb<br/>- 建议图片长宽为600像素左右，以达到最佳显示效果</span>
          <el-dialog title="图片预览" :visible.sync="picInfo.dialogVisible">
            <img width="100%" :src="picInfo.dialogImageUrl">
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否对图片保密:" prop="imageSecrecyStatus" required>
          <el-radio-group v-model="ruleForm.imageSecrecyStatus">
            <el-radio :label="1" :disabled="disabled">是</el-radio>
            <el-radio :label="0" :disabled="disabled">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否愿意参加2019年CF奖评选:" prop="cfPrizeStatus">
          <el-radio-group v-model="ruleForm.cfPrizeStatus">
            <el-radio :label="1" :disabled="disabled">是</el-radio>
            <el-radio :label="0" :disabled="disabled">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否为刀具展品:" prop="isToolStatus">
          <el-radio-group v-model="ruleForm.isToolStatus" @change="isCutter">
            <el-radio :label="1" :disabled="disabled">是</el-radio>
            <el-radio :label="0" :disabled="disabled">否</el-radio>
          </el-radio-group>
          <!-- <span class="remarkClick" @click="toSafeManageNotice" v-if="isEdit">广交会刀具展样品报备登记表</span> -->
        </el-form-item>
        <el-form-item label="规格 :" prop="toolSpecCh" v-if="isTool">
          <el-input v-model="ruleForm.toolSpecCh" maxlength="50" clearable :disabled="disabled" placeholder="请输入刀具规格"></el-input>
        </el-form-item>
        <!-- xlshih修改<el-form-item label="规格（英文）:" prop="toolSpecEn" v-if="isTool">
          <el-input v-model="ruleForm.toolSpecEn" maxlength="50" clearable :disabled="disabled" placeholder="请输入刀具规格"></el-input>
        </el-form-item> -->
        <el-form-item label="数量:" prop="toolCount" v-if="isTool">
          <!-- 计数器 -->
          <el-input :disabled="disabled" style="width:100px;" clearable maxlength="10" type="text" min="1" v-model="ruleForm.toolCount" placeholder="请输入数字"></el-input>
        </el-form-item>
        <!-- <el-form-item label="刀具展品展位号:" prop="boothNo" v-if="isTool">
          <el-input  v-model="ruleForm.boothNo" maxlength="16" clearable :disabled="disabled" placeholder="请输入展品展位号"></el-input>
        </el-form-item> -->
        <el-form-item label="刀具展品展位号:" prop="boothNo" v-if="isTool">
          <div
            style="float: left; width: 100%;"
            v-for="(items, index) in knifeExhList"
            :key="index"
          >
          <el-row>
            <el-col :span="6">
              <el-input @blur="getVal" class="third" maxlength="5"  v-model="items.valOne"  :disabled="disabled" placeholder="请输入展厅号"></el-input>-
            </el-col>
            <el-col :span="6">
              <el-input @blur="getVal" class="third" maxlength="1"  v-model="items.valTwo"  :disabled="disabled" placeholder="请输入通道"></el-input>-
            </el-col>
            <el-col :span="6">
              <el-input @blur="getVal" class="third" maxlength="8"  v-model="items.valThree" :disabled="disabled" placeholder="请输入展位号"></el-input>
            </el-col>
            <el-col :span="6">
            <span class="addProduct"  v-if="knifeExhList.length > 1" @click.prevent="removeTomain(index)">删除</span>
            </el-col>
          </el-row>
          </div>
          <span class="addProduct" v-if="knifeExhList[knifeExhList.length - 1].valOne != '' && knifeExhList[knifeExhList.length - 1].valTwo != '' && knifeExhList[knifeExhList.length - 1].valThree != ''"   @click="addTomain">添加</span><br/>
          <span class="info">"请在获得展位后填写相关信息"</span>
        </el-form-item>
        <!-- 填写更多选项可获得排名靠前 -->
        <el-form-item>
          <span class="remarkable" @click="isMoreContent"> >填写更多选项可获得排名靠前</span>
        </el-form-item>
        <el-form-item label="展品品牌（中文）:" prop="brandCh" v-if="isMore">
          <el-input v-model="ruleForm.brandCh" maxlength="50" clearable :disabled="disabled" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="展品品牌（英文）:" prop="prandEn" v-if="isMore">
          <el-input v-model="ruleForm.prandEn" maxlength="50" clearable :disabled="disabled" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="产地（中文）:" prop="producingAreaCh" v-if="isMore">
          <el-input v-model="ruleForm.producingAreaCh" clearable maxlength="100" :disabled="disabled" placeholder="请输入产地"></el-input>
        </el-form-item>
        <el-form-item label="产地（英文）:" prop="producingAreaEn" v-if="isMore">
          <el-input v-model="ruleForm.producingAreaEn" clearable maxlength="100" :disabled="disabled" placeholder="请输入产地"></el-input>
        </el-form-item>
        <el-form-item label="展品颜色（中文）:" prop="exhibitColourOneCh" v-if="isMore">
          <el-input v-model="ruleForm.exhibitColourOneCh" clearable maxlength="100" :disabled="disabled" placeholder="请输入展品颜色"></el-input>
          <span class="remark">固定单一颜色</span>
        </el-form-item>
        <el-form-item label="展品颜色（英文）:" prop="exhibitColourOneEn" v-if="isMore">
          <el-input v-model="ruleForm.exhibitColourOneEn" clearable maxlength="100" :disabled="disabled" placeholder="请输入展品颜色"></el-input>
          <span class="remark">固定单一颜色</span>
        </el-form-item>
        <el-form-item label="展品颜色（中文）:" prop="exhibitColourTwoCh" v-if="isMore">
          <el-input v-model="ruleForm.exhibitColourTwoCh" clearable maxlength="100" :disabled="disabled" placeholder="请输入展品颜色"></el-input>
          <span class="remark">多色可选</span>
        </el-form-item>
        <el-form-item label="展品颜色（英文）:" prop="exhibitColourTwoEn" v-if="isMore">
          <el-input v-model="ruleForm.exhibitColourTwoEn" clearable maxlength="100" :disabled="disabled" placeholder="请输入展品颜色"></el-input>
          <span class="remark">多色可选</span>
        </el-form-item>
        <el-form-item label="展品颜色（中文）:" prop="exhibitColourThreeCh" v-if="isMore">
          <el-input v-model="ruleForm.exhibitColourThreeCh" clearable maxlength="100" :disabled="disabled" placeholder="请输入展品颜色"></el-input>
          <span class="remark">可定制颜色</span>
        </el-form-item>
        <el-form-item label="展品颜色（英文）:" prop="exhibitColourThreeEn" v-if="isMore">
          <el-input v-model="ruleForm.exhibitColourThreeEn" clearable maxlength="100" :disabled="disabled" placeholder="请输入展品颜色"></el-input>
          <span class="remark">可定制颜色</span>
        </el-form-item>
        <el-form-item label="包装（中文）:" prop="packageCh" v-if="isMore">
          <el-input v-model="ruleForm.packageCh" clearable maxlength="100" :disabled="disabled" placeholder="请输入包装"></el-input>
        </el-form-item>
        <el-form-item label="包装（英文）:" prop="packageEn" v-if="isMore">
          <el-input v-model="ruleForm.packageEn" clearable maxlength="100" :disabled="disabled" placeholder="请输入包装"></el-input>
        </el-form-item>
        <!-- 后期更改 -->
        <el-form-item label="本项展品的行业认证:" prop="industryCertification" v-if="isMore">
          <el-checkbox-group v-model="cusForm.exCert" @change="handleCheckedCert">
            <el-checkbox v-for="item in dicCert" :label="item.value" :key="item.value" :disabled="disabled">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox label="其他(请填写)" :disabled="disabled" @change="isRest" :checked="isChecked"></el-checkbox>
          <el-input v-model="ruleForm.otherIndustryCertificati" maxlength="48" style="width:100px;" :disabled="disabled" v-if="isElse"></el-input>
        </el-form-item>
        <el-form-item label="付款方式:" prop="paymentMethod" v-if="isMore">
          <el-checkbox-group v-model="cusForm.exPay" @change="handleCheckedPay">
            <el-checkbox v-for="item in dicPay" :label="item.value" :key="item.value" :disabled="disabled">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="计价方式:" prop="valuationMethod" v-if="isMore">
          <el-checkbox-group v-model="cusForm.exVal" @change="handleCheckedVal">
            <el-checkbox v-for="item in dicVal" :label="item.value" :key="item.value" :disabled="disabled">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="愿意接受的最小订单量:" prop="minimumOrderCount" v-if="isMore">
          <el-input v-model="ruleForm.minimumOrderCount" clearable maxlength="9" :disabled="disabled" placeholder="请输入愿意接受的最小订单"></el-input> --单位（件、套、台等）
        </el-form-item>
        <el-form-item label="生产所需时间:" prop="productionNeedDate" v-if="isMore">
          <el-input v-model="ruleForm.productionNeedDate" clearable maxlength="20" :disabled="disabled" placeholder="请输入生产所需时间"></el-input>（天） --仅接受数字和-，如3-5或3，单位为天
        </el-form-item>
        <el-form-item label="离岸口岸（中文）:" prop="offshorePortCh" v-if="isMore">
          <el-input v-model="ruleForm.offshorePortCh" clearable maxlength="100" :disabled="disabled" placeholder="请输入离岸口岸（中文）">中文</el-input>
        </el-form-item>
        <el-form-item label="离岸口岸（英文）:" prop="offshorePortEn" v-if="isMore">
          <el-input v-model="ruleForm.offshorePortEn" clearable maxlength="100" :disabled="disabled" placeholder="请输入离岸口岸（英文）">英文</el-input>
        </el-form-item>
        <div class="giveInfo">
        <span><strong>授权声明：</strong>本企业对上述填报的所有展品信息（含文字和图片）的真实性、合法性负责，授权广交会在全球范围内以宣传推广为目的，在所有介质上使用上述资料，并确保广交会不会因此违反任何法律法规和政策规范、承担任何法律责任，因此造成的一切损失由本企业自行承担。</span>
        </div>
        <div class="giveInfo">
        <el-radio-group v-model="infoRadio">
          <el-radio :label="1">同意</el-radio>
          <el-radio :label="0">不同意</el-radio>
        </el-radio-group>
        </div>
        <div class="giveInfoT">
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="isOp !== '0'" v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
          <el-button type="info" @click="resetForm">取消</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {

    // 正则展品尺寸
    // let validateSize = (rule, value, callback) => {
    //   let str = /^\d+\*\d+\*\d+$/;
    //   let val = value.split("*")[1] * value.split("*")[2] * value.split("*")[0];
    //   if (!str.test(value) || val <= 0) {
    //     return callback(new Error('请填写正确尺寸'));
    //   } else {
    //     return callback();
    //   }
    // };
    // // 正则展品尺寸
    // let validateSize = (rule, value, callback) => {
    //   let str = /^\+?[1-9][0-9]*\*\+?[1-9][0-9]*\*\+?[1-9][0-9]*$/;
    //   let val = value.split("*")[1] * value.split("*")[2] * value.split("*")[0];
    //   if (!str.test(value) || val < 0) {
    //     return callback(new Error('请填写正确尺寸'));
    //   } else {
    //     return callback();
    //   }
    // };
    let validateSize = (rule, value, callback) => {
      if (value === 0 || value === '0') {
        return callback(new Error('输入不能为零'));
      } else {
        return callback();
      }
    };
    // let checkEn = (rule, value, callback) => {
    //   let errors = [];
    //   let regRule = /^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z0-9]*[a-zA-Z0-9]+$/;
    //   if (!regRule.test(value) && value !== "") {
    //     errors.push(new Error("请输入字母、数字、括号、字符间支持一个空格"));
    //   }
    //   callback(errors);
    // };
    let checkEn = (rule, value, callback) => {
      let errors = [];
      let regRule = /^[\x01-\x7f]*$/;
      let regOnlyEnglish = this.$store.state.common.CHECK_CONST_DATA.onlyBlank;
      if (!regRule.test(value) && value !== "") {
        errors.push(new Error("请输入英文"));
      } else if (regOnlyEnglish.test(value)) {
        errors.push(new Error("不允许只输入空格"));
      }
      callback(errors);
    };
    // let checkCn = (rule, value, callback) => {
    //   let errors = [];
    //   let regRule = /.*[\u4e00-\u9fa5]+.*$/;
    //   if (!regRule.test(value) && value !== "") {
    //     errors.push(new Error("请输入中文"));
    //   }
    //   callback(errors);
    // };
    // 生成所需时间校验 只能填数字和-
    let checkProductTime = (rule, value, callback) => {
      let errors = [];

      let valBefore = value ? value.split("-")[0] : '';
      let valBehind = value ? value.split("-")[1] : '';
      let regular = /^[1-9]{1}[0-9]{0,9}$/;

      let splitLen = value && value !== '' ? value.split("-").length : 0;
      if (value && value !== '') {
        if (splitLen < 3) {

          if (splitLen === 1 && !regular.test(value)) {
            errors.push(new Error("生产所需时间填写仅接受10位以内数字和-"));

          }

          if (splitLen === 2) {
            if (valBefore === '' || valBehind === ''
              || !regular.test(valBefore) || !regular.test(valBehind)
              || (valBefore - valBehind) > 0) {
              errors.push(new Error("生产所需时间填写不符合规范"));
            }
          }

        } else {
          errors.push(new Error("生产所需时间填写不符合规范"));
        }

      }


      // if (!regular.test(value) && !regularNum.test(value) && value !== '') {
      //   errors.push(new Error("生产所需时间填写仅接受10位以内数字和-"));
      // } else if ((valBefore - valBehind) > 0) {
      //   errors.push(new Error("生产所需时间填写不符合规范"));
      // }
      callback(errors);
    };
    let checkValNum = (rule, value, callback) => {
      let errors = [];
      let regularNum = /(^[1-9]\d*$)|(^0?$)/;
      if (value <= 0 || !regularNum.test(value)) {
        errors.push(new Error("刀具数量需为大于0的数字"));
      }
      callback(errors);
    };
    let checkCnT = (rule, value, callback) => {
      let errors = [];
      // let regRuleChAndEn = this.$store.state.common.CHECK_CONST_DATA.engAndChine;
      let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      let val = value;
      if (value && !regRuleContainCh.test(value.replace(/[\r\n]/g, "")) && value !== "" && String(val) !== 'null') {
        errors.push(new Error("请输入中文，必须包含中文"));
      }
      callback(errors);
    };
    let checkContainCn = (rule, value, callback) => {
      let errors = [];
      // let regRuleChAndEn = this.$store.state.common.CHECK_CONST_DATA.engAndChine;
      let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      // let regOnlyEnglish = this.$store.state.common.CHECK_CONST_DATA.onlyBlank;
      if (value && regRuleContainCh.test(value) && value !== "" && String(value) !== 'null') {
        errors.push(new Error("不能包含中文"));
      }
      //  else if (regOnlyEnglish.test(value)) {
      //   errors.push(new Error("不允许只输入空格"));
      // }
      callback(errors);
    };
    // 修改：李康  此处校验不能输入空格
    let checkContainCne = (rule, value, callback) => {
      let errors = [];
      // let regRuleChAndEn = this.$store.state.common.CHECK_CONST_DATA.engAndChine;
      let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      let regOnlyEnglish = this.$store.state.common.CHECK_CONST_DATA.onlyBlank;
      if (regRuleContainCh.test(value) && value !== "") {
        errors.push(new Error("不能包含中文"));
      } else if (regOnlyEnglish.test(value)) {
        errors.push(new Error("不允许只输入空格"));
      }
      callback(errors);
    };
    let checkContainCnBlank = (rule, value, callback) => {
      let errors = [];
      let regOnlyEnglish = this.$store.state.common.CHECK_CONST_DATA.onlyBlank;
      if (regOnlyEnglish.test(value)) {
        errors.push(new Error("不允许只输入空格"));
      }
      callback(errors);
    };
    let checkContainCnT = (rule, value, callback) => {
      let errors = [];
      // let regRuleChAndEn = this.$store.state.common.CHECK_CONST_DATA.engAndChine;
      let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      if ((regRuleContainCh.test(this.cusForm.getKeyvalEnOne) && this.cusForm.getKeyvalEnOne !== '') || (regRuleContainCh.test(this.cusForm.getKeyvalEnTwo) && this.cusForm.getKeyvalEnTwo !== '') || (regRuleContainCh.test(this.cusForm.getKeyvalEnThree) && this.cusForm.getKeyvalEnThree !== '')) {
        errors.push(new Error("不能包含中文"));
      }
      callback(errors);
    };
    let checkBoothNo = (rule, value, callback) => {
      let decimal = /^[0-9]*\.[0-9]{0,2}$/;
      let AZ = /^[A-Z]*$/;
      let engAndChine = /^[0-9,\./;\'\[\]`\-=\<>?:"{}~\!@#$￥%\^&\*\(\)\_\+\|]*$/;
      let valOne = this.knifeExhList[this.knifeExhList.length - 1].valOne;
      let valTwo = this.knifeExhList[this.knifeExhList.length - 1].valTwo;
      let valThree = this.knifeExhList[this.knifeExhList.length - 1].valThree;
      if ((valOne !== '' && valOne !== undefined) || (valTwo !== '' && valTwo !== undefined) || valThree !== '' && (valThree !== undefined)) {
        if (valOne === '' || valTwo === '' || valThree === '') {
          return callback(new Error("请输入完整展位号"));
        } else if (!decimal.test(valOne)) {
          return callback(new Error("请输入正确展厅号，如：9.3"));
        } else if (!AZ.test(valTwo)) {
          return callback(new Error("通道号为大写字母A-Z"));
        } else if (!engAndChine.test(valThree)) {
          return callback(new Error("展位号只能输入数字和符号"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }

    };


    let checkImg = (rule, value, callback) => {
      if (Array.isArray(this.imageList) && this.imageList.length === 0) {
        return callback(new Error("请输入展品图片"));
      } else {
        return callback();
      }
    };

    // let quantity = (rule, value, callback) => {
    //   let regular = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
    //   if (this.mainExhibitsData.boothNumber === "") {
    //     return callback(new Error("展品尺寸不能为空"));
    //   } else if (!regular.test(value)) {
    //     return callback(new Error("展品尺寸为大于0的数字"));
    //   } else {
    //     return callback();
    //   }
    // };

    return {
      module: '',
      activeName: "first",
      userType: "",
      companyId: "",
      handeDate: {},
      isEdit: true,
      returnName: "", // 判断是否从一般性展位跳转过来
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addThumb',
      // 图片文件
      fileList: [],
      // 图片上传文件数最大限制
      imgLimit: 3,
      infoRadio: 1,
      picInfo: {
        // 预览图片窗口图片地址
        dialogImageUrl: '',
        // 预览图片窗口默认隐藏
        dialogVisible: false
      },
      fullscreenLoading: false,
      isOp: "3", // 确认按钮变量
      // 是否为刀具
      isTool: false,
      // 是否填写更多
      isMore: false,
      // 是否点击其他
      isElse: false,
      // 展品特征字典
      dicFeature: [],
      // 行业认证字典
      dicCert: [],
      // 支付方式字典
      dicPay: [],
      // 计价方式字典
      dicVal: [],
      isChecked: false,
      ishowRadio: false, // 展品类别三是否显示
      disabled: false, // 禁用变量
      // 展品类别一
      dicTypeOne: [],
      // 展品类别三字典
      dicTypeThree: [],
      // 暂存展品类别三
      toDicTypeThree: [],
      // 展品类别二字典
      dicTypeTwo: [],
      // 暂存展品类别二字典
      toDicTypeTwo: [],
      cusForm: {
        // 展品特征数据
        exFeature: [],
        // 行业认证数据
        exCert: [],
        // 支付方式数据
        exPay: [],
        // 计价方式数据
        exVal: [],
        getKeyvalOne: '', // 关键字中文一
        getKeyvalTwo: '', // 关键字中文二
        getKeyvalThree: '', // 关键字中文三
        getKeyvalEnOne: '', // 关键字英文一
        getKeyvalEnTwo: '', // 关键字英文二
        getKeyvalEnThree: '' // 关键字英文三
      },
      // 表单对象
      ruleForm:
      {
        exhibitType: '', // 展品类别
        exhibitTypeOne: '', // 展品类别一
        exhibitTypeTwo: '', // 展品类别二
        exhibitTypeThree: '', // 展品类别三
        exhibitNameCh: '',  // 展品名称中文
        exhibitNameEn: '',  // 展品名称英文
        exhibitKeywordCh: '', // 展品关键字中文
        exhibitsKeywordEn: '', // 展品关键字英文
        exhibitModelCh: '', // 展品型号中文
        exhibitModelEn: '', // 展品型号英文
        exhibitMaterialCh: '', // 展品材质中文
        exhibitMaterialEn: '', // 展品材质英文
        exhibitSizeCh: '', // 展品尺寸/中文
        exhibitSizeEn: '', // 展品尺寸/英文
        exhibitFeature: "", // 展品特征
        exhibitFeatureDescribeCh: '', // 展品描述中文
        exhibitFeatureDescribeEn: '', // 展品描述英文
        exhibitImageId: '',
        imageSecrecyStatus: "", // 是否对图片加密
        cfPrizeStatus: "", // 是否愿意参加2019年CF奖评选
        isToolStatus: "", // 是否为刀具
        brandCh: '', // 品牌中文
        prandEn: '', // 品牌英文
        producingAreaEn: '', // 产地中文
        producingAreaCh: '', // 产地英文
        exhibitColourOneCh: '', // 展品颜色中文
        exhibitColourOneEn: '', // 展品颜色英文
        exhibitColourTwoCh: '', // 展品颜色中文
        exhibitColourTwoEn: '', // 展品颜色英文
        exhibitColourThreeCh: '', // 展品颜色中文
        exhibitColourThreeEn: '', // 展品颜色英文
        packageCh: '', // 包装中文
        packageEn: '', // 包装英文
        industryCertification: "", // 本项展品的行业认证
        paymentMethod: "", // 支付方式
        valuationMethod: "", // 计价方式
        toolSpecCh: '', // 刀具规格中文
        // toolSpecEn: '', // 刀具规格英文 //xlshih
        boothNo: "", // 刀具展位号
        toolCount: 1,  // 刀具数量
        exhibitId: '', // 展品id
        toolSampleId: '', // 刀具id
        otherIndustryCertificati: '',
        minimumOrderCount: "", // 愿意接受的最小订单量
        productionNeedDate: "", // 生产所需时间
        offshorePortCh: "", // 离岸口岸（中文）
        offshorePortEn: "" // 离岸口岸（英文）
      },
      knifeExhList: [{
        valOne: "",
        valTwo: "",
        valThree: ""
      }],
      // 校验规则
      rules: {
        // offshorePortEh: [
        //    { validator: checkEn, trigger: 'blur' }
        // ],
        exhibitsKeywordEn: [
          { validator: checkContainCnT, trigger: 'blur' }
        ],
        exhibitMaterialEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        productionNeedDate: [
          { validator: checkProductTime, trigger: 'blur' }
        ],
        offshorePortEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        // 离岸口岸（中文）
        offshorePortCh: [
          { validator: checkCnT, trigger: 'blur' }
        ],
        toolCount: [
          { required: true, message: '请填写展品刀具数量', trigger: 'blur' },
          { validator: checkValNum, trigger: 'blur' }
        ],
        exhibitImageId: [
          { required: true, validator: checkImg, trigger: 'blur' }
        ],
        exhibitTypeOne: [
          { required: true, message: '请至少选择展品类别', trigger: 'change' }
        ],
        exhibitNameCh: [
          { required: true, message: '请填写展品名称（中文）', trigger: 'blur' }
        ],
        exhibitNameEn: [
          { required: true, message: '请填写展品名称（英文）', trigger: 'blur' },
          { validator: checkContainCne, trigger: 'blur' }
        ],
        exhibitModelCh: [
          { required: true, message: '请填写展品型号', trigger: 'blur' },
          { validator: checkContainCnBlank, trigger: 'blur' }
        ],
        exhibitModelEn: [
          { required: true, message: '请填写展品型号（英文）', trigger: 'blur' },
          { validator: checkContainCne, trigger: 'blur' }
        ],
        exhibitSizeCh: [
          { required: true, message: '请填写展品尺寸', trigger: 'blur' },
          { trigger: 'blur', validator: checkContainCnBlank },
          { trigger: 'blur', validator: validateSize }
        ],
        exhibitSizeEn: [
          { required: true, message: '请填写展品尺寸', trigger: 'blur' },
          { trigger: 'blur', validator: checkEn }
        ],
        isToolStatus: [{ required: true, message: '请选择是否为刀具展品', trigger: 'blur' }],
        exhibitFeatureDescribeCh: [
          { required: true, message: '请填写展品特征描述（中文）', trigger: 'blur' },
          { validator: checkCnT, trigger: 'blur' }
        ],
        exhibitFeatureDescribeEn: [
          { required: true, message: '请填写展品特征描述（英文）', trigger: 'blur' },
           { validator: checkContainCne, trigger: 'blur' }
        ],
        boothNo: [
          { validator: checkBoothNo, trigger: 'blur' }
        ],
        toolSpecCh: [
          { required: true, message: '请填写展品规格', trigger: 'blur' }
          // { validator: checkCnT, trigger: 'blur' }
        ],
        // toolSpecEn: [
        //   { required: true, message: '请填写展品规格（英文）', trigger: 'blur' },
        //    { validator: checkEn, trigger: 'blur' }
        // ],
        // 品牌英文校验
        prandEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        // 品牌产地校验
        producingAreaEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        // 产品（中文）
        producingAreaCh: [
          { validator: checkCnT, trigger: 'blur' }
        ],
        // 品牌展品颜色校验
        exhibitColourOneEn: [
           { validator: checkContainCn, trigger: 'blur' }
        ],
        // 展品颜色（中文）--固定单一颜色
        exhibitColourOneCh: [
          { validator: checkCnT, trigger: 'blur' }
        ],
        // 展品颜色（中文）--多色可选
        exhibitColourTwoCh: [
          { validator: checkCnT, trigger: 'blur' }
        ],
        // 品牌展品颜色校验
        exhibitColourTwoEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        // 展品颜色（中文）--可定制颜色
        exhibitColourThreeCh: [
          { validator: checkCnT, trigger: 'blur' }
        ],
        // 品牌展品颜色校验
        exhibitColourThreeEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        // 包装英文校验
        packageEn: [
          { validator: checkContainCn, trigger: 'blur' }
        ],
        // boothNo: [
        //   { required: true, message: '请填写刀具展位号', trigger: 'blur' }
        // ],
        cfPrizeStatus: [
          { required: true, message: '请选择是否愿意', trigger: 'blur' }
        ]
      },
      // 上传图片地址
      dialogImageUrl: '',
      dialogVisible: false, // 图片显示
      imageList: [] // 图片数组
    };
  },
  async created() {
    this.dicCert = await kindo.dictionary.get('exhibitCert'); // 行业认证
    this.dicPay = await kindo.dictionary.get('payType'); // 支付方式
    this.dicVal = await kindo.dictionary.get('valuationType'); // 计价方式
    this.dicFeature = await kindo.dictionary.get('exhibitFeature'); // 展品特征
  },
  mounted() {
    const _this = this;
    if (this.$store.state.userInfo.userType) {
      this.userType = this.$store.state.userInfo.userType;
    }
    if (this.$store.state.userInfo.companyId) {
      this.companyId = this.$store.state.userInfo.companyId;
      // 获取所属交易团code
      this.getDelegationCodeInfo(this.companyId);
    }
    this.getSessionInfo(); // 获取届数

    if (this.$route.query.data) {
      this.handeDate = this.$route.query.data;
    }
     // 初始化加载展品类别
    _this.getExhibitCategorysInfo().then(res => {
      _this.dicTypeOne = res.exhibit_type_one;
      for (let i in res.exhibit_type_two) {
        if (res.exhibit_type_two[i].parentId === _this.ruleForm.exhibitTypeOne) {
          _this.dicTypeTwo.push(res.exhibit_type_two[i]);
        }
      }
      for (let i in res.exhibit_type_three) {
        if (res.exhibit_type_three[i].parentId === _this.ruleForm.exhibitTypeTwo) {
          _this.dicTypeThree.push(res.exhibit_type_three[i]);
        }
      }
      // _this.dicTypeTwo = res.exhibit_type_two;
      // _this.dicTypeThree = res.exhibit_type_three;
      _this.toDicTypeTwo = res.exhibit_type_two;
      _this.toDicTypeThree = res.exhibit_type_three;

    });

    // 从刀具打印页面跳转来赋值
    if (_this.$route.query.returnName) {
      _this.returnName = _this.$route.query.returnName;
    }
    if (_this.$route.query.ruleForm) {
      _this.ruleForm = _this.$route.query.ruleForm;
      _this.cusForm = _this.$route.query.cusForm;
      // 展品类别转换
      // if (_this.ruleForm.exhibitTypeTwo) {
      //   _this.dicTypeTwo = _this.dicTypeData.exTypeTwo;
      // } else {
      //   _this.dicTypeTwo = [];
      // }
      // if (_this.ruleForm.exhibitTypeThree) {
      //   _this.dicTypeThree = _this.dicTypeData.exTypeThree;
      // } else {
      //   _this.dicTypeThree = [];
      // }
    } else {
      _this.ruleForm = _this.ruleForm;
      _this.cusForm = _this.cusForm;
    }
    _this.isOp = _this.$route.query.isOp; // 获取上一页面带来的isOp
    if (this.isOp === "0") {
      this.disabled = true; // isOp为0，所用输入框禁用
    }

    // 判断为编辑页面获取详情
    if (_this.$route.query.exhibitId) {
      _this.getProductDetailInfo(_this.$route.query.exhibitId).then(res => {
        for (let i in res.exhibitInfo) {
          for (let j in _this.ruleForm) {
            if (i === j) {
              _this.ruleForm[j] = res.exhibitInfo[i];
            }
          }
        }
        if (this.ruleForm) {
          this.isMore = true;
        } else {
          this.isMore = false;
        }
        // 图片预览
        // if (res.exhibitInfo.exhibitImageId) {
        //   let fileList = res.exhibitInfo.exhibitImageId.split(",");
        //   for (let items in fileList) {
        //     this.fileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + fileList[items], fileId: fileList[items] });
        //   }
        // }
        this.imageList = [];
        // 图片预览  江重生
        if (Array.isArray(res.exhibitInfo.images) && res.exhibitInfo.images.length !== 0) {
          let fileList = res.exhibitInfo.images;
          for (let items in fileList) {
            this.imageList.push({
              'imageS': fileList[items]['imageS'],
              'imageB': fileList[items]['imageB']
            });
            this.fileList.push({ url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + fileList[items]['imageB'], images: fileList[items] });
          }
        }
        // 刀具展品信息保存 - 回显(修改人：张文建 去除了764行 并将764的i变为j)
        if (res.exhibitInfo.boothNo) {
          let boothNos = res.exhibitInfo.boothNo.split(',');
          for (let j = 0; j < boothNos.length; j++) {
            let knifeExhLists = boothNos[j].split('-');
            if (j === 0) {
              this.knifeExhList[0].valOne = knifeExhLists[0];
              this.knifeExhList[0].valTwo = knifeExhLists[1];
              this.knifeExhList[0].valThree = knifeExhLists[2];
            } else {
              let params = {
                valOne: "",
                valTwo: "",
                valThree: ""
              };
              params.valOne = knifeExhLists[0];
              params.valTwo = knifeExhLists[1];
              params.valThree = knifeExhLists[2];
              this.knifeExhList.push(params);
            }
          }
        }
        // 切割关键字
        _this.cusForm.getKeyvalOne = res.exhibitInfo.exhibitKeywordCh && res.exhibitInfo.exhibitKeywordCh.split(",")[0] ? res.exhibitInfo.exhibitKeywordCh.split(",")[0] : "";
        _this.cusForm.getKeyvalTwo = res.exhibitInfo.exhibitKeywordCh && res.exhibitInfo.exhibitKeywordCh.split(",")[1] ? res.exhibitInfo.exhibitKeywordCh.split(",")[1] : "";
        _this.cusForm.getKeyvalThree = res.exhibitInfo.exhibitKeywordCh && res.exhibitInfo.exhibitKeywordCh.split(",")[2] ? res.exhibitInfo.exhibitKeywordCh.split(",")[2] : "";
        _this.cusForm.getKeyvalEnOne = res.exhibitInfo.exhibitsKeywordEn && res.exhibitInfo.exhibitsKeywordEn.split(",")[0] ? res.exhibitInfo.exhibitsKeywordEn.split(",")[0] : "";
        _this.cusForm.getKeyvalEnTwo = res.exhibitInfo.exhibitsKeywordEn && res.exhibitInfo.exhibitsKeywordEn.split(",")[1] ? res.exhibitInfo.exhibitsKeywordEn.split(",")[1] : "";
        _this.cusForm.getKeyvalEnThree = res.exhibitInfo.exhibitsKeywordEn && res.exhibitInfo.exhibitsKeywordEn.split(",")[2] ? res.exhibitInfo.exhibitsKeywordEn.split(",")[2] : "";
        // 单选框转为数字
        _this.ruleForm.imageSecrecyStatus = Number(res.exhibitInfo.imageSecrecyStatus);
        _this.ruleForm.cfPrizeStatus = Number(res.exhibitInfo.cfPrizeStatus);
        _this.ruleForm.isToolStatus = Number(res.exhibitInfo.isToolStatus);
        // 刀具规格
        if (res.toolSampleInfo) {
          _this.ruleForm.toolSpecCh = res.toolSampleInfo.toolSpecCh;
        // 刀具规格
        // _this.ruleForm.toolSpecEn = res.toolSampleInfo.toolSpecEn; //xlshih
        // 刀具数量
          _this.ruleForm.toolCount = Number(res.toolSampleInfo.toolCount);
        }
        // 展品特征多选框赋值
        if (_this.ruleForm.exhibitFeature) {
          _this.cusForm.exFeature = _this.ruleForm.exhibitFeature.split(",");
        } else {
          _this.cusForm.exFeature = [];
        }
        // 行业认证多选框赋值
        if (_this.ruleForm.industryCertification) {
          _this.cusForm.exCert = _this.ruleForm.industryCertification.split(",");
        } else {
          _this.cusForm.exCert = [];
        }
        // 支付方式多选框赋值
        if (_this.ruleForm.paymentMethod) {
          _this.cusForm.exPay = _this.ruleForm.paymentMethod.split(",");
        } else {
          _this.cusForm.exPay = [];
        }
        // 计价方式多选框赋值
        if (_this.ruleForm.valuationMethod) {
          _this.cusForm.exVal = _this.ruleForm.valuationMethod.split(",");
        } else {
          _this.cusForm.exVal = [];
        }
        if (_this.ruleForm.otherIndustryCertificati) {
          _this.isElse = true;
          _this.isChecked = true;
        } else {
          _this.isElse = false;
          _this.isChecked = false;
        }
        // if (_this.ruleForm.exhibitTypeTwo) {
        //   _this.dicTypeTwo = _this.dicTypeData.exTypeTwo;
        // } else {
        //   _this.dicTypeTwo = [];
        // }
        // if (_this.ruleForm.exhibitTypeThree) {
        //   _this.dicTypeThree = _this.dicTypeData.exTypeThree;
        // } else {
        //   _this.dicTypeThree = [];
        // }
      });
    }
    if (this.isOp === "0") {
      this.module = '查看展品';
      this.ishowRadio = true;
      this.isEdit = true;
    } else if (this.isOp === "1") {
      this.module = '编辑展品';
      this.isEdit = false;
      this.ishowRadio = true;
    } else {
      this.module = '新增展品';
      this.isEdit = true;
    }
  },
  computed: {
    ...mapGetters('enterExManagement', ['getPro']),
    // ...mapGetters('typeData', ['dicTypeData']), // 获取展品类别
    ...mapGetters('common', ['session', 'delegationCode']) // 获取届数
  },
  methods: {
    ...mapActions('common', ['getSessionInfo', 'getDelegationCodeInfo']),
    ...mapActions('file', ['delFileInfo']),
    ...mapActions('enterExManagement', [
      'getProductDetailInfo',
      'updateProductInfo',
      'addProductInfo',
      'getExhibitCategorysInfo', // 获取展品类别
      'getExhibitCategoryInfo' // 转换展区类别CODE
    ]),
    // 删除展位号
    removeTomain(item) {
      if (item !== -1) {
        this.knifeExhList.splice(item, 1);
      }
      if (this.knifeExhList[item].valOne !== '' && this.knifeExhList[item].valTwo !== '' && this.knifeExhList[item].valThree !== '') {
        let arr = [];
        for (let i = 0; i < this.knifeExhList.length; i++) {
          arr.push(this.knifeExhList[i].valOne + '-' + this.knifeExhList[i].valTwo + '-' + this.knifeExhList[i].valThree);
        }
        this.ruleForm.boothNo = arr.join(',');
      }
    },
    // 添加展位号
    addTomain() {
      this.knifeExhList.push({
        valOne: "",
        valTwo: "",
        valThree: ""
      });
    },
    // 获取展位号框内值
    getVal() {
      // if (this.knifeExhList[this.knifeExhList.length - 1].valOne !== '' && this.knifeExhList[this.knifeExhList.length - 1].valTwo !== '' && this.knifeExhList[this.knifeExhList.length - 1].valThree !== '') {
      let arr = [];
      for (let i = 0; i < this.knifeExhList.length; i++) {
        arr.push(this.knifeExhList[i].valOne + '-' + this.knifeExhList[i].valTwo + '-' + this.knifeExhList[i].valThree);
      }
      this.ruleForm.boothNo = arr.join(',');
      // }
    },
    // 清空展品类别二
    clearDicTypeTwo(val) {
      this.dicTypeTwo = [];
      this.ruleForm.exhibitTypeTwo = "";
      this.dicTypeThree = [];
      this.ishowRadio = false;
      this.ruleForm.exhibitTypeThree = "";
      for (let i in this.toDicTypeTwo) {
        if (this.toDicTypeTwo[i].parentId === val) {
          this.dicTypeTwo.push(this.toDicTypeTwo[i]);
        }
      }
      if (this.$route.query.returnName === "brandApplyDataList" && this.$route.query.data.exhibitionArea) {
        this.getExhibitCategoryInfo(this.$route.query.data.exhibitionArea).then(res => {
          if (res.exhibitTypeId !== val && res.exhibitTypeId !== '') {
            this.$message({
              message: '所选展品分类与主要展示展品不符',
              type: 'warning'
            });
          }
        });
      }
    },
    // 清空展品类别三
    clearDicTypeThree(val) {
      this.ishowRadio = false;
      this.dicTypeThree = [];
      this.ruleForm.exhibitTypeThree = "";
      for (let i in this.toDicTypeThree) {
        if (this.toDicTypeThree[i].parentId === val) {
          this.dicTypeThree.push(this.toDicTypeThree[i]);
          this.ishowRadio = true;
        }
      }
    },
    // 文件预览
    handlePreview(file) {
      this.picInfo.dialogImageUrl = file.url;
      this.picInfo.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.error('最多只能上传三张图片!');
    },
    beforeRemove(file, fileList) {},
    // 删除图片
    handleRemove(file, fileList) {
      let obj = {};
      if (file.response) {
        let imgList = file.response.data.split(',');
        obj = {
          'imageS': imgList[0],
          'imageB': imgList[1]
        };
      } else if (file.images) {
        obj = {
          'imageS': file.images.imageS,
          'imageB': file.images.imageB
        };
      }

      this.imageList = this.imageList.filter(function(item) {
        return item.imageS !== obj.imageS && item.imageB !== obj.imageB;
      });
      let fileIdList = [];
      if (file.response && file.response.data) {
        fileIdList = file.response.data.split(',');
        if (fileIdList.length > 0) {
          fileIdList.forEach((value, index) => {
            this.delFileInfo(value).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            }).catch(e => {
            });
          });
        }
      }
    },
    // 上传类型设置
    handleBeforeUpload(file) {
      let isJPG = file.type === 'image/jpeg';
      let isGIF = file.type === 'image/gif';
      let isPNG = file.type === 'image/png';
      let isLt5Mb = file.size / 1024 / 1024 < 5;
      let getBusiDele = true;
      if (this.delegationCode && this.delegationCode !== '') {
        getBusiDele = true;
      } else {
        getBusiDele = false;
        this.$message.error('未获取到所属交易团');
      }
      if (!isJPG && !isGIF && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/GIF/PNG 格式!');
      }
      if (!isLt5Mb) {
        this.$message.error('上传头像图片大小不能超过 5Mb!');
      }
      return (isJPG || isGIF || isPNG) && isLt5Mb && getBusiDele;
    },
    // 上传图片成功
    handleSuccess(response, file, fileList) {
      // if (this.ruleForm.exhibitImageId) {
      //   this.ruleForm.exhibitImageId = this.ruleForm.exhibitImageId + "," + response.data.fileId.toString();
      // } else {
      //   this.ruleForm.exhibitImageId = response.data.fileId.toString();
      // }
      if (this.delegationCode && this.delegationCode !== '') {
        if (response.data) {
          let imgList = response.data.split(',');
          this.imageList.push({
            'imageS': imgList[1],
            'imageB': imgList[0]
          });
        }
      } else {
        // 获取所属交易团code
        this.getDelegationCodeInfo(this.companyId).then((res) => {
          if (res && res !== '' && response.data) {
            let imgList = response.data.split(',');
            this.imageList.push({
              'imageS': imgList[1],
              'imageB': imgList[0]
            });
          }
        });
      }
    },
    // 是否填写更多
    isMoreContent() {
      this.isMore = !this.isMore;
    },
    // // 三级二级随一级联动
    // changeValueOne(val) {
    //   this.ruleForm.exhibitTypeTwo = '';
    //   this.ruleForm.exhibitTypeThree = '';
    // },
    // // 三级随二级联动
    // changeValueTwo(val) {
    //   this.ruleForm.exhibitTypeThree = '';
    // },
    // // 三级联动方法
    // changeValue(value, prop) {
    //   let _this = this;
    //   let temp = [];
    //   let currentArray = [];
    //   if (prop === 'exhibitTypeTwo') {
    //     temp = JSON.parse(JSON.stringify(_this.dicTypeData.exTypeTwo));
    //     temp.forEach((dicValue) => {
    //       if (dicValue.pValue === _this.ruleForm.exhibitTypeOne) {
    //         currentArray.push(dicValue);
    //       }
    //     });
    //     this.dicTypeTwo = currentArray;
    //   } else if (prop === 'exhibitTypeThree') {
    //     temp = JSON.parse(JSON.stringify(_this.dicTypeData.exTypeThree));
    //     temp.forEach((dicValue) => {
    //       if (dicValue.pValue === _this.ruleForm.exhibitTypeTwo) {
    //         currentArray.push(dicValue);
    //       }
    //     });
    //     this.dicTypeThree = currentArray;
    //   }
    // },
    // 判断是否为刀具
    isCutter(val) {
      if (val === 1) {
        this.isTool = true;
      } else {
        this.isTool = false;
      }
    },
    // 展品特征多选框
    handleCheckedChange(value) {
      let str = "";
      for (let i = 0; i < value.length; i++) {
        str = value[i] + ',' + str;
      }
      this.ruleForm.exhibitFeature = str.substring(0, str.lastIndexOf(','));
    },
    // 展品行业认证多选框
    handleCheckedCert(value) {
      let str = "";
      for (let i = 0; i < value.length; i++) {
        str = value[i] + ',' + str;
      }
      this.ruleForm.industryCertification = str.substring(0, str.lastIndexOf(','));
    },
    // 支付方式多选框
    handleCheckedPay(value) {
      let str = "";
      for (let i = 0; i < value.length; i++) {
        str = value[i] + ',' + str;
      }
      this.ruleForm.paymentMethod = str.substring(0, str.lastIndexOf(','));
    },
    // 计价方式多选框
    handleCheckedVal(value) {
      let str = "";
      for (let i = 0; i < value.length; i++) {
        str = value[i] + ',' + str;
      }
      this.ruleForm.valuationMethod = str.substring(0, str.lastIndexOf(','));
    },
    // 获取关键字中文一
    getKeyOne(val) {
      this.cusForm.getKeyvalOne = val;
    },
    // 获取关键字中文二
    getKeyTwo(val) {
      this.cusForm.getKeyvalTwo = val;
    },
    // 获取关键字中文三
    getKeyThree(val) {
      this.cusForm.getKeyvalThree = val;
    },
    // 获取关键字英文一
    getKeyEnOne(val) {
      this.cusForm.getKeyvalEnOne = val;
    },
    // 获取关键字英文二
    getKeyEnTwo(val) {
      this.cusForm.getKeyvalEnTwo = val;
    },
    // 获取关键字英文三
    getKeyEnThree(val) {
      this.cusForm.getKeyvalEnThree = val;
    },
    // 处理展品关键字中文
    dealWithKeyValueCh() {
      let exhibitKeywordChArr = [];
      if (this.cusForm.getKeyvalOne !== '') {
        exhibitKeywordChArr.push(this.cusForm.getKeyvalOne);
      }
      if (this.cusForm.getKeyvalTwo !== '') {
        exhibitKeywordChArr.push(this.cusForm.getKeyvalTwo);
      }
      if (this.cusForm.getKeyvalThree !== '') {
        exhibitKeywordChArr.push(this.cusForm.getKeyvalThree);
      }
      let exhibitKeywordChStr = '';
      if (exhibitKeywordChArr.length > 0) {
        exhibitKeywordChArr.forEach((value, index, array) => {
          exhibitKeywordChStr += index === (array.length - 1) ? value : (value + ',');
        });
      }
      this.ruleForm.exhibitKeywordCh = exhibitKeywordChStr;
    },
    // 处理展品关键字-英文
    dealWithKeyValueEn() {
      let exhibitKeywordEnArr = [];
      if (this.cusForm.getKeyvalEnOne !== '') {
        exhibitKeywordEnArr.push(this.cusForm.getKeyvalEnOne);
      }
      if (this.cusForm.getKeyvalEnTwo !== '') {
        exhibitKeywordEnArr.push(this.cusForm.getKeyvalEnTwo);
      }
      if (this.cusForm.getKeyvalEnThree !== '') {
        exhibitKeywordEnArr.push(this.cusForm.getKeyvalEnThree);
      }
      let exhibitKeywordEnStr = '';
      if (exhibitKeywordEnArr.length > 0) {
        exhibitKeywordEnArr.forEach((value, index, array) => {
          exhibitKeywordEnStr += index === (array.length - 1) ? value : (value + ',');
        });
      }
      this.ruleForm.exhibitsKeywordEn = exhibitKeywordEnStr;
    },
    // 确认提交
    submitForm(formName) {
      if (this.infoRadio === 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true;
            this.changeData();
          } else {
            this.$message.error('请正确填写信息');
            return false;
          }
        });
      } else {
        this.$message.info("请同意授权声明！");
      }
    },
    // 处理数据
    changeData() {
      // 处理展品关键字-中文
      this.dealWithKeyValueCh();
      // 处理展品关键字-英文
      this.dealWithKeyValueEn();
      if (!this.ruleForm.toolCount) {
        this.ruleForm.toolCount = 0;
      }
      let param = {
        exhibitInfo: {
          session: this.session,
          companyId: "",
          approveResult: "3",
          exhibitId: this.ruleForm.exhibitId,
          toolSampleId: this.ruleForm.exhibitId,
          exhibitTypeOne: this.ruleForm.exhibitTypeOne,
          exhibitTypeTwo: this.ruleForm.exhibitTypeTwo,
          exhibitTypeThree: this.ruleForm.exhibitTypeThree,
          exhibitNameCh: this.ruleForm.exhibitNameCh,
          exhibitNameEn: this.ruleForm.exhibitNameEn,
          exhibitKeywordCh: this.ruleForm.exhibitKeywordCh,
          exhibitsKeywordEn: this.ruleForm.exhibitsKeywordEn,
          exhibitModelCh: this.ruleForm.exhibitModelCh,
          exhibitModelEn: this.ruleForm.exhibitModelEn,
          exhibitMaterialCh: this.ruleForm.exhibitMaterialCh,
          exhibitMaterialEn: this.ruleForm.exhibitMaterialEn,
          exhibitSizeCh: this.ruleForm.exhibitSizeCh,
          exhibitSizeEn: this.ruleForm.exhibitSizeEn,
          exhibitFeature: this.ruleForm.exhibitFeature,
          exhibitFeatureDescribeCh: this.ruleForm.exhibitFeatureDescribeCh,
          exhibitFeatureDescribeEn: this.ruleForm.exhibitFeatureDescribeEn,
          // exhibitImageId: this.ruleForm.exhibitImageId, 不要
          images: this.imageList,
          imageSecrecyStatus: this.ruleForm.imageSecrecyStatus.toString(),
          cfPrizeStatus: this.ruleForm.cfPrizeStatus.toString(),
          isToolStatus: this.ruleForm.isToolStatus.toString(),
          brandCh: this.ruleForm.brandCh,
          prandEn: this.ruleForm.prandEn,
          producingAreaEn: this.ruleForm.producingAreaEn,
          producingAreaCh: this.ruleForm.producingAreaCh,
          exhibitColourOneCh: this.ruleForm.exhibitColourOneCh,
          exhibitColourOneEn: this.ruleForm.exhibitColourOneEn,
          exhibitColourTwoCh: this.ruleForm.exhibitColourTwoCh,
          exhibitColourTwoEn: this.ruleForm.exhibitColourTwoEn,
          exhibitColourThreeCh: this.ruleForm.exhibitColourThreeCh,
          exhibitColourThreeEn: this.ruleForm.exhibitColourThreeEn,
          packageCh: this.ruleForm.packageCh,
          packageEn: this.ruleForm.packageEn,
          boothNo: this.ruleForm.boothNo,
          industryCertification: this.ruleForm.industryCertification,
          otherIndustryCertificati: this.ruleForm.otherIndustryCertificati,
          paymentMethod: this.ruleForm.paymentMethod,
          valuationMethod: this.ruleForm.valuationMethod,
          offshorePortCh: this.ruleForm.offshorePortCh,
          minimumOrderCount: this.ruleForm.minimumOrderCount,
          productionNeedDate: this.ruleForm.productionNeedDate,
          offshorePortEn: this.ruleForm.offshorePortEn
        },
        toolSampleInfo: {
          toolSampleId: this.ruleForm.exhibitId,
          toolSpecCh: this.ruleForm.toolSpecCh,
          // toolSpecEn: this.ruleForm.toolSpecEn, //xlshih
          toolCount: this.ruleForm.toolCount.toString()
        }
      };
      // 编辑更新
      if (this.$route.query.exhibitId) {
        if (this.$route.query.oldExhibitId) {
          param.exhibitInfo.oldExhibitId = this.$route.query.oldExhibitId;
        }
        param.exhibitInfo.companyId = this.companyId;
        console.log(param);
        this.updateProductInfo(param).then(res => {
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 1000);
          this.$message.success("提交成功");
          this.$router.push("/EnterExManagement");
        });
      } else {
        // 新增展品
        if (this.userType === "qy") {
          param.exhibitInfo.companyId = this.companyId;
        } else {
          param.exhibitInfo = {
            session: this.session,
            personalId: this.companyId,
            approveResult: "3",
            exhibitId: this.ruleForm.exhibitId,
            toolSampleId: this.ruleForm.exhibitId,
            exhibitTypeOne: this.ruleForm.exhibitTypeOne,
            exhibitTypeTwo: this.ruleForm.exhibitTypeTwo,
            exhibitTypeThree: this.ruleForm.exhibitTypeThree,
            exhibitNameCh: this.ruleForm.exhibitNameCh,
            exhibitNameEn: this.ruleForm.exhibitNameEn,
            exhibitKeywordCh: this.ruleForm.exhibitKeywordCh,
            exhibitsKeywordEn: this.ruleForm.exhibitsKeywordEn,
            exhibitModelCh: this.ruleForm.exhibitModelCh,
            exhibitModelEn: this.ruleForm.exhibitModelEn,
            exhibitMaterialCh: this.ruleForm.exhibitMaterialCh,
            exhibitMaterialEn: this.ruleForm.exhibitMaterialEn,
            exhibitSizeCh: this.ruleForm.exhibitSizeCh,
            exhibitSizeEn: this.ruleForm.exhibitSizeEn,
            exhibitFeature: this.ruleForm.exhibitFeature,
            exhibitFeatureDescribeCh: this.ruleForm.exhibitFeatureDescribeCh,
            exhibitFeatureDescribeEn: this.ruleForm.exhibitFeatureDescribeEn,
            // exhibitImageId: this.ruleForm.exhibitImageId, 不要
            images: this.imageList,
            imageSecrecyStatus: this.ruleForm.imageSecrecyStatus.toString(),
            cfPrizeStatus: this.ruleForm.cfPrizeStatus.toString(),
            isToolStatus: this.ruleForm.isToolStatus.toString(),
            brandCh: this.ruleForm.brandCh,
            prandEn: this.ruleForm.prandEn,
            producingAreaEn: this.ruleForm.producingAreaEn,
            producingAreaCh: this.ruleForm.producingAreaCh,
            exhibitColourOneCh: this.ruleForm.exhibitColourOneCh,
            exhibitColourOneEn: this.ruleForm.exhibitColourOneEn,
            exhibitColourTwoCh: this.ruleForm.exhibitColourTwoCh,
            exhibitColourTwoEn: this.ruleForm.exhibitColourTwoEn,
            exhibitColourThreeCh: this.ruleForm.exhibitColourThreeCh,
            exhibitColourThreeEn: this.ruleForm.exhibitColourThreeEn,
            packageCh: this.ruleForm.packageCh,
            packageEn: this.ruleForm.packageEn,
            boothNo: this.ruleForm.boothNo,
            industryCertification: this.ruleForm.industryCertification,
            otherIndustryCertificati: this.ruleForm.otherIndustryCertificati,
            paymentMethod: this.ruleForm.paymentMethod,
            valuationMethod: this.ruleForm.valuationMethod
          };
        }
        this.addProductInfo(param).then(res => {
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 1000);
          this.$message.success("提交成功");
          if (this.returnName === "brandApplyDataList") {
        // this.$router.push("/brand_applicat_list");
            this.$router.push({
              path: "/main_exhibits_apply",
              query: {
                data: this.handeDate,
                temp: true
              }
            });
          } else if (this.returnName === "brandBoothConfirm") {
        // this.$router.push("/brand_applicat_list");
            this.$router.push({
              path: "/brandBoothConfirm",
              query: {
                schemeDetail: JSON.stringify(this.handeDate)
              }
            });
          } else {
            this.$router.push("/enterExManagement");
          }
        });
      }
    },
    // 取消，返回上一页
    resetForm() {
      if (this.returnName === "brandApplyDataList") {
        // this.$router.push("/brand_applicat_list");
        this.$router.push({
          path: "/main_exhibits_apply",
          query: {
            data: this.handeDate,
            temp: true
          }
        });
      } else if (this.returnName === "brandBoothConfirm") {
        // this.$router.push("/brand_applicat_list");
        this.$router.push({
          path: "/brandBoothConfirm",
          query: {
            schemeDetail: JSON.stringify(this.handeDate)
          }
        });
      } else {
        this.$router.push("/enterExManagement");
      }

    },
    // 进入刀具安全登记页面
    toSafeManageNotice() {
      // 跳转判断
      if (this.ruleForm.boothNo !== "" && this.ruleForm.boothNo) {
        this.$router.push({
          path: "/safeManageNotice",
          query: {
            ruleForm: this.ruleForm,
            cusForm: this.cusForm,
            isOp: this.isOp,
            returnPath: 'addProduction'
          }
        });
      } else {
        this.$message({
          type: 'error',
          message: '请填写刀具展位所在展位号。'
        });
      }
    },
    isRest(val) {
      this.isElse = !this.isElse;
    }
  },
  watch: {
    // "isTool"(newVal) {
    //   if (newVal) {
    //     this.rules.boothNo[0].required = true;
    //   } else {
    //     this.rules.boothNo[0].required = false;
    //   }
    // },

    // "knifeExhList": {
    //   handler(newName, oldName) {
    //   },
    //   immediate: true,
    //   deep: true
    // },

    "ruleForm.isToolStatus"(newVal) {
      if (newVal === 1) {
        this.isTool = true;
      } else {
        this.isTool = false;
      }
    }
    // "ruleForm.exhibitImageId"(newVal) {
    //   if (newVal !== '') {
    //     this.$refs['exhibitImageId'].clearValidate();
    //   }
    // }
    // "ruleForm.exhibitTypeOne"(val) {
    //   this.dicTypeTwo = [];
    //   this.ruleForm.exhibitTypeTwo = "";
    //   for (let i in this.toDicTypeTwo) {
    //     if (this.toDicTypeTwo[i].parentId === val) {
    //       this.dicTypeTwo.push(this.toDicTypeTwo[i]);

    //     }
    //   }
    // },
    // "ruleForm.exhibitTypeTwo"(val) {
    //   this.dicTypeThree = [];
    //   this.ruleForm.exhibitTypeThree = "";
    //   for (let i in this.toDicTypeThree) {
    //     if (this.toDicTypeThree[i].parentId === val) {
    //       this.dicTypeThree.push(this.toDicTypeThree[i]);
    //     }
    //   }
    // }
  }
};
</script>
