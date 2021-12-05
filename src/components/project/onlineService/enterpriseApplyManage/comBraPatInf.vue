/**
 * @file 企业品牌/认证/奖励/专利信息
 */
<style scoped>
  .el-form-item {
    width: 700px;
    position: relative;
    left: 20%;
  }
  .el-input {
    width: 60%;
    margin-right:40%;
  }
  .cb_confirm {
    position: relative;
    left: 38%;
    margin-top: 20px;
  }
  .el-checkbox {
    margin-left: 0px;
    margin-right: 30px;
  }
  .el-radio {
    margin-left: 0px;
    margin-right: 30px;
  }
  .el-form-item-btn {
    text-align: center;
  }
</style>
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="comBraPatInfo"
      label-width="300px"
      class="demo-ruleForm"
      :label-position="labelPosition">
      <el-form-item label="品牌（商标）：" prop="brandCn">
        <span v-if="getBrands.length > 0">
          <span>已登记</span>
          <span style="color: #d80c18;;">{{ getBrandsInfo }}</span>
          <span>,共{{ getBrands.length }}个品牌（商标）</span>
        </span>
        <span v-if="getBrands.legnth === 0">未登记品牌（商标）</span>
        <span v-if="!disabledJytReview" style="text-decoration: underline;cursor: pointer;color: #d80c18;" @click="editBrands">请点击进行修改</span>
      </el-form-item>
      <el-form-item label="海外注册商标的国家及地区数量（个）：" prop="registeredTrademarkCount">
        <el-input v-model="ruleForm.registeredTrademarkCount" :disabled="disabledJytReview" placeholder="请输入" clearable maxlength="48"></el-input>
      </el-form-item>
      <el-form-item label="国际/行业通行管理体系认证的数量（个）：" prop="internationallytCertificationCount">
        <el-input class="com-bra-pat-info-item" v-model="ruleForm.internationallytCertificationCount" :disabled="disabledJytReview" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="ruleForm.internationallytCertification" :disabled="disabledJytReview" placeholder="请选择" >
          <el-checkbox v-for="item in getManageQuantity" :key="item.value" :label="item.label" @change="changeInternationCertifi"></el-checkbox>
        </el-checkbox-group>
        <el-form-item v-if="showInterCertifiCountOther"  label="" prop="internationallytCertificationCountOther" style="left: 0;" ref="internationallytCertificationCountOther">
          <el-input placeholder="请填写" v-model="ruleForm.internationallytCertificationCountOther" :disabled="disabledJytReview" style="width: 100px;" clearable maxlength="20"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="面向企业的行业认证数量（个）：" prop="industryCertificationCount">
        <el-input class="com-bra-pat-info-item" v-model="ruleForm.industryCertificationCount" :disabled="disabledJytReview" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="ruleForm.industryCertification" :disabled="disabledJytReview" placeholder="请选择">
          <el-checkbox v-for="item in getIndustryNum" :key="item.value" :label="item.label" @change="changeIndustryCertifiCountOther"></el-checkbox>
        </el-checkbox-group>
        <el-form-item v-if="showIndustryCertifiCountOther"  label="" prop="industryCertificationCountOther" style="left: 0;" ref="industryCertificationCountOther">
          <el-input placeholder="请填写" v-model="ruleForm.industryCertificationCountOther" style="width: 100px;" clearable maxlength="20"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="面向产品/生产线的行业认证数量（个）：" prop="productCertificationQuantity">
        <el-input class="com-bra-pat-info-item" style="margin-bottom: 15px" v-model="ruleForm.productCertificationQuantity" :disabled="disabledJytReview" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox-group v-model="ruleForm.productCertification" :disabled="disabledJytReview" placeholder="请选择">
          <el-checkbox v-for="item in getExhibitCert" :key="item.value" :label="item.label" @change="changeProductCertifiQuantityOther"></el-checkbox>
        </el-checkbox-group>
        <el-form-item v-if="showProductCertifiQuantityOther" label="" prop="productCertificationQuantityOther" style="left: 0;" ref="productCertificationQuantityOther">
          <el-input placeholder="请填写" v-model="ruleForm.productCertificationQuantityOther" :disabled="disabledJytReview" style="width: 100px;" clearable maxlength="20"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="国家级奖励数量（个）：" prop="nationalAwardsCount">
        <el-input v-model="ruleForm.nationalAwardsCount" :disabled="disabledJytReview" style="width: 200px" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="省级奖励数量（个）：" prop="provincialAwardsCount">
        <el-input v-model="ruleForm.provincialAwardsCount" :disabled="disabledJytReview" style="width: 200px" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="发明专利数（个）：" prop="inventionPatentsCount">
        <el-input v-model="ruleForm.inventionPatentsCount" :disabled="disabledJytReview" style="width: 200px" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="实用新型专利数（个）：" prop="utilityPatentsCount">
        <el-input v-model="ruleForm.utilityPatentsCount" :disabled="disabledJytReview" style="width: 200px" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="外观设计专利数（个）：" prop="patentsDesignCount">
        <el-input v-model="ruleForm.patentsDesignCount" :disabled="disabledJytReview" style="width: 200px" placeholder="请输入" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="includStatus">
        <el-checkbox v-model="ruleForm.includStatus" :disabled="disabledJytReview" label="是否列入《中国高科技出口产品目录》" name="type"></el-checkbox>
      </el-form-item>
    </el-form>
    <div class="el-form-item-btn">
      <el-button type="primary" :disabled="disabledJytReview"  @click="submitForm">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  data() {
    // 正则只能输入数字
    let validateNum = (rule, value, callback) => {
      let str = /^[0-9]*$/;
      if (value === '' || value == null) {
        return callback();
      }
      if (!str.test(value)) {
        return callback(new Error('请输入数字'));
      } else {
        return callback();
      }
    };
    return {
      // 设置表单对齐方式
      labelPosition: 'left',
      setManageQuantity: [],
      setIndustryNum: [],
      setExhibitCert: [],
      getManageQuantity: [],
      getIndustryNum: [],
      getExhibitCert: [],
      showInterCertifiCountOther: false, // 国际/行业通行管理体系认证的数量其他
      showIndustryCertifiCountOther: false, // 面向企业的行业认证数量
      showProductCertifiQuantityOther: false, // 面向产品/生产线的行业认证数量
      companyId: this.$store.state.userInfo.companyId,
      // 企业品牌/认证/奖励/专利信息
      ruleForm: {
        companyId: this.$store.state.userInfo.companyId,
        // 品牌
        brand: "",
        // 海外注册
        registeredTrademarkCount: "",
        // 国际/行业通行（个) 管理体系认证的数量
        internationallytCertificationCount: "",
        // 国际/行业通行（个) 管理体系认证的数量罗列
        internationallytCertification: [],
        // 国际/行业通行（个) 管理体系认证的数量补充
        internationallytCertificationCountOther: "",
        // 面向企业的（个）行业认证数量
        industryCertificationCount: "",
        // 面向企业的（个）行业认证数量罗列
        industryCertification: [],
        // 面向企业的（个）行业认证数量罗列
        industryCertificationCountOther: "",
        // 面向产品/生产线的（个）行业认证数量
        productCertificationQuantity: "",
        // 面向产品/生产线的（个）行业认证数量罗列
        productCertification: [],
        // 面向产品/生产线的（个）行业认证数量补充
        productCertificationQuantityOther: "",
        // 国家级奖励数量
        nationalAwardsCount: "",
        // 省级奖励数量
        provincialAwardsCount: "",
        // 发明专利数
        inventionPatentsCount: "",
        // 实用新型专利数：
        utilityPatentsCount: "",
        // 外观设计专利数：
        patentsDesignCount: "",
        // 是否列入《中国高科技出口产品目录》
        includStatus: ""
      },
      rules: {
        // 填写其他国际/行业通行管理体系认证
        internationallytCertificationCountOther: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        // 请填写面向企业的行业认证数量
        industryCertificationCountOther: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        // 请填写面向产品/生产线的行业认证
        productCertificationQuantityOther: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        registeredTrademarkCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        internationallytCertificationCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        industryCertificationCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        productCertificationQuantity: [
          { validator: validateNum, trigger: 'blur' }
        ],
        nationalAwardsCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        provincialAwardsCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        inventionPatentsCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        utilityPatentsCount: [
          { validator: validateNum, trigger: 'blur' }
        ],
        patentsDesignCount: [
          { validator: validateNum, trigger: 'blur' }
        ]
      },
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [],
            "description": ""
          }
        ]
      }
    };
  },
  props: {
    basEntInf: {
      type: Object,
      default: () => {}
    },
    disabledJytReview: {
      type: Boolean,
      default: false
    }
  },
  async beforeCreate() {
    this.setManageQuantity = await kindo.dictionary.get('manageQuantity'); // 国际/行业通行（个)管理体系认证的数量
    this.setIndustryNum = await kindo.dictionary.get('industryNum'); // 面向企业的（个）行业认证数量
    this.setExhibitCert = await kindo.dictionary.get('exhibitCert'); // 面向产品/生产线的（个）行业认证数量
  },
  mounted() {
    let _this = this;
    this.getBasicInfo(_this.companyId).then(res => {
      if (res) {
        for (let ruleKey in _this.ruleForm) {
          for (let key in res) {
            if (res[ruleKey] && res[ruleKey] !== '' && ruleKey === key) {
              _this.$set(_this.ruleForm, ruleKey, res[key]);
            }
          }
        }
        _this.dealWithData(res);

      }
    });
    _this.searchParams.customQueryParams.forEach((value) => {
      value.values.push(_this.$store.state.userInfo.companyId);
    });
    _this.getBrandByCompanyID(_this.searchParams);
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getBrands', 'getbasic']),
    getBrandsInfo() {
      let str = '';
      if (this.getBrands.length > 0) {
        this.getBrands.forEach((value, index, array) => {
          str += index === (array.length - 1) ? value.brandNameCh : value.brandNameCh + ',';
        });
      }
      return str;
    }
  },
  methods: {
    ...mapActions('corpDataManagement', ['getBrandByCompanyID']),
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    handleClick(tab, event) {

    },
    // 处理相关数据
    dealWithData(res) {
      let _this = this;
      // 处理是否列入《中国高科技出口产品目录》
      _this.$set(_this.ruleForm, 'includStatus', _this.dealWithYesOrNo(res.includStatus));
      // 处理国际/行业通行（个）管理体系认证的数量罗列
      if (typeof res.internationallytCertification === 'string' && res.internationallytCertification.length > 0) {
        _this.$set(_this.ruleForm, 'internationallytCertification', _this.dealWithShowCheckBox(res.internationallytCertification, _this.getManageQuantity));
      }
      // 处理面向企业的（个）行业认证数量罗列
      if (typeof res.industryCertification === 'string' && res.industryCertification.length > 0) {
        _this.$set(_this.ruleForm, 'industryCertification', _this.dealWithShowCheckBox(res.industryCertification, _this.getIndustryNum));
      }
      // 面向产品/生产线的（个）行业认证数量罗列
      if (typeof res.productCertification === 'string' && res.productCertification.length > 0) {
        _this.$set(_this.ruleForm, 'productCertification', _this.dealWithShowCheckBox(res.productCertification, _this.getExhibitCert));
      }
    },
    // 初始化处理是否问题
    dealWithYesOrNo(value) {
      if (value === '1') {
        return true;
      } else {
        return false;
      }
    },
    // 处理checkbox的显示问题
    dealWithShowCheckBox(prevData, dicData) {
      let targetArray = [];
      targetArray = prevData && dicData && dicData.length > 0
      ? $helper.getLabelArray(prevData, dicData)
      : [];
      return targetArray;
    },
    // 添加其他国际/行业通行管理体系认证
    changeInternationCertifi(val) {
      let code = '';
      if (this.getManageQuantity && this.getManageQuantity.length > 0) {
        code = $helper.getDictValue(this.getManageQuantity, val);
      }
      if (code === '99' || code === 99) {
        this.showInterCertifiCountOther = true;
        this.rules.internationallytCertificationCountOther[0].required = true;
      } else {
        this.showInterCertifiCountOther = false;
        this.rules.internationallytCertificationCountOther[0].required = false;
        this.ruleForm.internationallytCertificationCountOther = '';
      }
    },
    // 面向企业的行业认证数量
    changeIndustryCertifiCountOther(val) {
      let code = '';
      if (this.getIndustryNum && this.getIndustryNum.length > 0) {
        code = $helper.getDictValue(this.getIndustryNum, val);
      }
      if (code === '99' || code === 99) {
        this.showIndustryCertifiCountOther = true;
        this.rules.industryCertificationCountOther[0].required = true;
      } else {
        this.showIndustryCertifiCountOther = false;
        this.rules.industryCertificationCountOther[0].required = false;
        this.ruleForm.industryCertificationCountOther = '';
      }
    },
    // 添加面向产品/生产线的行业认证
    changeProductCertifiQuantityOther(val) {
      let code = '';
      if (this.getExhibitCert && this.getExhibitCert.length > 0) {
        code = $helper.getDictValue(this.getExhibitCert, val);
      }
      if (code === '99' || code === 99) {
        this.showProductCertifiQuantityOther = true;
        this.rules.productCertificationQuantityOther[0].required = true;
      } else {
        this.showProductCertifiQuantityOther = false;
        this.rules.productCertificationQuantityOther[0].required = false;
        this.ruleForm.productCertificationQuantityOther = '';
      }
    },
    // 修改品牌
    editBrands() {
      this.$router.push({
        path: '/registeEnterBrands'
      });
    },
    // 处理品牌、商标
    dealWithBrand() {
      let str = '';
      if (this.getBrands.length > 0) {
        this.getBrands.forEach((value, index, array) => {
          str += index === (array.length - 1) ? value.brandNameCh : value.brandNameCh + ',';
        });
      }
      this.ruleForm.brand = str;
    },
    // 处理提交时问题
    dealWithYesOrNoValue(value) {
      if (value) {
        return '1';
      } else {
        return '0';
      }
    },
    // 提交企业品牌/认证/奖励/专利信息
    submitForm() {
      let comInfoForm = JSON.parse(JSON.stringify(this.ruleForm));
      // 处理品牌（商标）
      let str = '';
      if (this.getBrands.length > 0) {
        this.getBrands.forEach((value, index, array) => {
          str += index === (array.length - 1) ? value.brandNameCh : value.brandNameCh + ',';
        });
      }
      comInfoForm.brand = str;
      // 处理是否列入《中国高科技出口产品目录》
      comInfoForm.includStatus = this.dealWithYesOrNoValue(comInfoForm.includStatus);
      comInfoForm.reviewResult = '3';
      this.$parent.$parent.$children[0].$children[0].$refs['basicInfo'].validate((basicValid) => {
        if (basicValid) {
          this.$refs['comBraPatInfo'].validate((enterValid) => {
            if (enterValid) {
              this.reviewCompanyDocs(comInfoForm).then(res => {
                this.$message({
                  type: 'success',
                  message: '提交成功，请继续完善信息'
                });
                // 通知父页面信息提交成功
                this.$emit('complete-com-bra-pat-info', true);
                this.getBasicInfo(this.companyId).then(response => {
                  if (response) {
                    for (let ruleKey in this.ruleForm) {
                      for (let key in response) {
                        if (response[ruleKey] && response[ruleKey] !== '' && ruleKey === key) {
                          this.$set(this.ruleForm, ruleKey, response[key]);
                        }
                      }
                    }
                    this.dealWithData(response);
                  }
                });
                this.loading = false;
              }).catch(e => {
                this.loading = false;
                this.$message({
                  showClose: true,
                  message: e,
                  type: 'error'
                });
                // 通知父页面信息提交失败
                this.$emit('complete-com-bra-pat-info', false);
              });
            } else {
              this.loading = false;
              setTimeout(() => {
                this.$parent.$parent.activeNames = [];
                this.$parent.$parent.activeNames.push('second');
                let isError = document.getElementsByClassName("is-error");
                isError[0].querySelector('input').focus();
              }, 1);
              this.$message({
                showClose: true,
                message: '企业品牌/认证/奖励/专利信息验证未通过',
                type: 'error'
              });
              // 通知父页面信息提交失败
              this.$emit('complete-com-bra-pat-info', false);
            }
          });
        } else {
          this.loading = false;
          setTimeout(() => {
            this.$parent.$parent.activeNames = [];
            this.$parent.$parent.activeNames.push('first');
            let isError = document.getElementsByClassName("is-error");
            isError[0].querySelector('input').focus();
          }, 1);
          this.$message({
            showClose: true,
            message: '企业基本信息验证未通过',
            type: 'error'
          });
        }
      });
      // this.$refs['comBraPatInfo'].validate((valid) => {
      //   if (valid) {
      //     this.reviewCompanyDocs(comInfoForm).then(res => {
      //       this.$message({
      //         type: 'success',
      //         message: '提交成功，请继续完善信息'
      //       });
      //       // 通知父页面信息提交成功
      //       this.$emit('complete-com-bra-pat-info', true);
      //       this.getBasicInfo(this.companyId).then(response => {
      //         if (response) {
      //           for (let ruleKey in this.ruleForm) {
      //             for (let key in response) {
      //               if (response[ruleKey] && response[ruleKey] !== '' && ruleKey === key) {
      //                 this.$set(this.ruleForm, ruleKey, response[key]);
      //               }
      //             }
      //           }
      //           this.dealWithData(response);
      //         }
      //       });
      //       this.loading = false;
      //     }).catch(e => {
      //       this.loading = false;
      //       this.$message({
      //         showClose: true,
      //         message: e,
      //         type: 'error'
      //       });
      //       // 通知父页面信息提交失败
      //       this.$emit('complete-com-bra-pat-info', false);
      //     });
      //   } else {
      //     setTimeout(() => {
      //       let isError = document.getElementsByClassName("is-error");
      //       isError[0].querySelector('input').focus();
      //     }, 1);
      //     this.$message({
      //       showClose: true,
      //       message: '企业品牌/认证/奖励/专利信息验证未通过',
      //       type: 'error'
      //     });
      //     // 通知父页面信息提交失败
      //     this.$emit('complete-com-bra-pat-info', false);
      //   }
      // });
    }
  },
  watch: {
    "setManageQuantity": {
      handler(newVal) {
        this.getManageQuantity = newVal;
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    "setIndustryNum": {
      handler(newVal) {
        this.getIndustryNum = newVal;
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    "setExhibitCert": {
      handler(newVal) {
        this.getExhibitCert = newVal;
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    "ruleForm.internationallytCertification"(newVal) {
      if (newVal && Array.isArray(newVal)) {
        this.ruleForm.internationallytCertificationCount = String(newVal.length);
      }
      if (newVal && Array.isArray(newVal) && newVal.indexOf('其他（请列明）') > -1) {
        this.showInterCertifiCountOther = true;
        this.rules.internationallytCertificationCountOther[0].required = true;
      } else {
        this.showInterCertifiCountOther = false;
        this.rules.internationallytCertificationCountOther[0].required = false;
      }
    },
    "ruleForm.industryCertification"(newVal) {
      if (newVal && Array.isArray(newVal)) {
        this.ruleForm.industryCertificationCount = String(newVal.length);
      }
      if (newVal && Array.isArray(newVal) && newVal.indexOf('其他（请列明）') > -1) {
        this.showIndustryCertifiCountOther = true;
        this.rules.industryCertificationCountOther[0].required = true;
      } else {
        this.showIndustryCertifiCountOther = false;
        this.rules.industryCertificationCountOther[0].required = false;
      }
    },
    "ruleForm.productCertification"(newVal) {
      if (newVal && Array.isArray(newVal)) {
        this.ruleForm.productCertificationQuantity = String(newVal.length);
      }
      if (newVal && Array.isArray(newVal) && ((newVal.indexOf('OTHER') > -1) || (newVal.indexOf('其他（请列明）') > -1) || (newVal.indexOf('其他(请列明)') > -1) || (newVal.indexOf('其他') > -1))) {
        this.showProductCertifiQuantityOther = true;
        this.rules.productCertificationQuantityOther[0].required = true;
      } else {
        this.showProductCertifiQuantityOther = false;
        this.rules.productCertificationQuantityOther[0].required = false;
      }
    }
  }
};
</script>




