/**
 * @file 企业参展及贸易需求
 */
 <style scoped>
  .el-form-item {
    width: 700px;
    position: relative;
    left: 20%;
    margin-bottom: 22px;
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
  .third {
    width: 90%;
    margin: 0 1% 0 0;
  }
  .el-form-item-btn {
    text-align: center;
  }
  .enter-doc-form-item-checkbox >>> .el-form-item__error {
    top: 27px;
    left: -210px;
  }
</style>
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="entPatPurInfo"
      label-width="220px"
      class="demo-ruleForm"
      :label-position="labelPosition">
      <el-form-item class="enter-doc-form-item-checkbox" label="参展目的（多选）：" prop="participationGoal">
        <el-checkbox-group v-model="ruleForm.participationGoal" :disabled="disabledJytReview" placeholder="请选择">
          <el-checkbox v-for="item in getParticipationGoalDic" :label="item.label" :value="item.value" :key="item.value"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否有内贸业务：" prop="nternalTradeStatus">
        <!-- <el-select v-model="ruleForm.nternalTradeStatus" placeholder="请选择">
          <el-option label="是" value="01"></el-option>
          <el-option label="否" value="02"></el-option>
        </el-select> -->
        <el-radio v-model="ruleForm.nternalTradeStatus" :disabled="disabledJytReview" label="01">是</el-radio>
        <el-radio v-model="ruleForm.nternalTradeStatus" :disabled="disabledJytReview" label="02">否</el-radio>
      </el-form-item>
      <el-form-item label="上年度出口额度前三位的国家地区：" prop="firstThreeCustomersCountry">
        <el-row>
          <el-col :span="8">
            <el-input v-model="ruleForm.exportQuotasOne" :disabled="disabledJytReview" clearable maxlength="160" class="third"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="ruleForm.exportQuotasTwo" :disabled="disabledJytReview" clearable maxlength="160" class="third"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="ruleForm.exportQuotasThree" :disabled="disabledJytReview" clearable maxlength="160" class="third"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="enter-doc-form-item-checkbox" label="主要目标市场（多选）：" prop="mainTargetMarket">
        <el-checkbox-group v-model="ruleForm.mainTargetMarket" :disabled="disabledJytReview">
          <el-checkbox v-for="item in getMainTargetMarketDic" :key="item.value" :label="item.label" @change="changeMainTargetMarket"></el-checkbox>
        </el-checkbox-group>
        <el-form-item label="" v-if="showMainTargetMarketOther" prop="mainTargetMarketOther" style="left: 0;" ref="mainTargetMarketOther">
          <el-input placeholder="请填写" v-model="ruleForm.mainTargetMarketOther" :disabled="disabledJytReview" style="width: 100px;" clearable maxlength="20"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item class="enter-doc-form-item-checkbox" label="主要目标客户类型（多选）：" prop="mainCustomersType">
        <el-checkbox-group v-model="ruleForm.mainCustomersType" :disabled="disabledJytReview" placeholder="请选择">
          <el-checkbox v-for="item in getMainCustomersTypeDic" :key="item.value" :label="item.label" @change="changeMainCustomersType"></el-checkbox>
        </el-checkbox-group>
        <el-form-item v-if="showMainCustomersTypeOther" label="" prop="mainCustomersTypeOther" style="left: 0;">
          <el-input placeholder="请填写" v-model="ruleForm.mainCustomersTypeOther" :disabled="disabledJytReview" style="width: 100px;" clearable maxlength="20"></el-input>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div class="el-form-item-btn">
      <el-button type="primary" :disabled="disabledJytReview" @click="submitForm">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  data() {
    return {
      // 设置表单对齐方式
      labelPosition: 'left',
      companyId: this.$store.state.userInfo.companyId,
      // 企业参展及贸易需求
      ruleForm: {
        companyId: this.$store.state.userInfo.companyId,
        // 参展目的
        participationGoal: [],
        // 是否有内贸业务
        nternalTradeStatus: "01",
        // 主要目标市场（多选）
        mainTargetMarket: [],
        // 主要目标市场（多选）补充
        mainTargetMarketOther: "",
        // 主要目标客户类型（多选）
        mainCustomersType: [],
        // 主要目标客户类型（多选）补充
        mainCustomersTypeOther: "",
        // 额度地区一
        exportQuotasOne: "",
        // 额度地区二
        exportQuotasTwo: "",
        // 额度地区三
        exportQuotasThree: "",
        // 上年度出口额度前三位的地区
        firstThreeCustomersCountry: ""
      },
      // 参展目的
      setParticipationGoalDic: [],
      // 主要目标市场
      setMainTargetMarketDic: [],
      // 主要目标客户类型
      setMainCustomersTypeDic: [],
      // 参展目的
      getParticipationGoalDic: [],
      // 主要目标市场
      getMainTargetMarketDic: [],
      // 主要目标客户类型
      getMainCustomersTypeDic: [],
      // 填写其他主要目标市场
      showMainTargetMarketOther: false,
      // 请填写其他主要目标客户类型
      showMainCustomersTypeOther: false,
      rules: {
        // 参展目的验证
        participationGoal: [
          { required: true, message: "请勾选参展目的", trigger: "change" }
        ],
        // 是否有内贸业务验证
        nternalTradeStatus: [
          { required: true, message: "请选择是否有内贸业务", trigger: "change" }
        ],
        // 主要目标市场验证
        mainTargetMarket: [
          { required: true, message: "请勾选主要目标市场", trigger: "change" }
        ],
        // 其他主要目标市场验证
        mainTargetMarketOther: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        // 主要目标客户类型验证
        mainCustomersType: [
          { required: true, message: "请勾选主要目标客户类型", trigger: "change" }
        ],
        // 主要目标客户类型填写验证
        mainCustomersTypeOther: [
          { required: false, message: "请输入", trigger: "blur" }
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
    this.setParticipationGoalDic = await kindo.dictionary.get('participationGoal'); // 参展目的字典
    this.setMainTargetMarketDic = await kindo.dictionary.get('mainMarket'); // 主要目标市场字典
    this.setMainCustomersTypeDic = await kindo.dictionary.get('mainType'); // 主要目标客户类型字典
  },
  created() {
    let _this = this;
    this.getBasicInfo(_this.companyId).then(res => {
      if (res) {
        for (let key in res) {
          _this.dealWithFormData(key, res);
        }
        _this.dealWithData(res);
        // 处理参展目的罗列
        if (typeof res.participationGoal === 'string' && res.participationGoal.length > 0) {
          _this.$set(_this.ruleForm, 'participationGoal', _this.dealWithShowCheckBox(res.participationGoal, kindo.dictionary.get('participationGoal')));
        }
        // 处理主要目标市场罗列
        if (typeof res.mainTargetMarket === 'string' && res.mainTargetMarket.length > 0) {
          _this.$set(_this.ruleForm, 'mainTargetMarket', _this.dealWithShowCheckBox(res.mainTargetMarket, kindo.dictionary.get('mainMarket')));
        }
        // 处理主要目标客户类型（多选）
        if (typeof res.mainCustomersType === 'string' && res.mainCustomersType.length > 0) {
          _this.$set(_this.ruleForm, 'mainCustomersType', _this.dealWithShowCheckBox(res.mainCustomersType, kindo.dictionary.get('mainType')));
        }
      }
    });
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getbasic'])
  },
  methods: {
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    // 循环遍历表单的数据
    dealWithFormData(key, res) {
      let _this = this;
      // 处理企业参展及贸易需求
      for (let ruleKey in _this.ruleForm) {
        if (res[key] && res[key] !== '' && key === ruleKey) {
          _this.$set(_this.ruleForm, ruleKey, res[key]);
        }
      }
    },
    // 处理相关数据
    dealWithData(res) {
      let _this = this;
      // 处理参展目的罗列
      if (typeof res.participationGoal === 'string' && res.participationGoal.length > 0) {
        _this.$set(_this.ruleForm, 'participationGoal', _this.dealWithShowCheckBox(res.participationGoal, _this.getParticipationGoalDic));
      }
      // 处理主要目标市场罗列
      if (typeof res.mainTargetMarket === 'string' && res.mainTargetMarket.length > 0) {
        _this.$set(_this.ruleForm, 'mainTargetMarket', _this.dealWithShowCheckBox(res.mainTargetMarket, _this.getMainTargetMarketDic));
      }
      // 处理主要目标客户类型（多选）
      if (typeof res.mainCustomersType === 'string' && res.mainCustomersType.length > 0) {
        _this.$set(_this.ruleForm, 'mainCustomersType', _this.dealWithShowCheckBox(res.mainCustomersType, _this.getMainCustomersTypeDic));
      }
      if (_this.ruleForm.firstThreeCustomersCountry && _this.ruleForm.firstThreeCustomersCountry !== '') {
        let firstThreeCustomersCountryArr = _this.ruleForm.firstThreeCustomersCountry.split(',');
        if (firstThreeCustomersCountryArr.length === 1) {
          _this.ruleForm.exportQuotasOne = firstThreeCustomersCountryArr[0];
        } else if (firstThreeCustomersCountryArr.length === 2) {
          _this.ruleForm.exportQuotasOne = firstThreeCustomersCountryArr[0];
          _this.ruleForm.exportQuotasTwo = firstThreeCustomersCountryArr[1];
        } else if (firstThreeCustomersCountryArr.length === 3) {
          _this.ruleForm.exportQuotasOne = firstThreeCustomersCountryArr[0];
          _this.ruleForm.exportQuotasTwo = firstThreeCustomersCountryArr[1];
          _this.ruleForm.exportQuotasThree = firstThreeCustomersCountryArr[2];
        }
      }
    },
    handleClick(tab, event) {

    },
    // 处理checkbox的显示问题
    dealWithShowCheckBox(prevData, dicData) {
      let targetArray = [];
      targetArray = prevData && dicData && dicData.length > 0
      ? $helper.getLabelArray(prevData, dicData)
      : [];
      return targetArray;
    },
    // 修改主要目标市场
    changeMainTargetMarket(val) {
      let code = '';
      if (this.getMainTargetMarketDic && this.getMainTargetMarketDic.length > 0) {
        code = $helper.getDictValue(this.getMainTargetMarketDic, val);
      }
      if (code === '99' || code === 99) {
        this.showMainTargetMarketOther = true;
        this.rules.mainTargetMarketOther[0].required = true;
      } else {
        this.showMainTargetMarketOther = false;
        this.rules.mainTargetMarketOther[0].required = false;
        this.ruleForm.mainTargetMarketOther = '';
        // this.$refs['mainTargetMarketOther'].clearValidate();
      }
    },
    // 修改主要目标客户类型
    changeMainCustomersType(val) {
      let code = '';
      if (this.getMainCustomersTypeDic && this.getMainCustomersTypeDic.length > 0) {
        code = $helper.getDictValue(this.getMainCustomersTypeDic, val);
      }
      if (code === '9' || code === 9) {
        this.showMainCustomersTypeOther = true;
        this.rules.mainCustomersTypeOther[0].required = true;
      } else {
        this.showMainCustomersTypeOther = false;
        this.rules.mainCustomersTypeOther[0].required = false;
        this.ruleForm.mainCustomersTypeOther = '';
      }
    },
    // 处理上年度出口额度前三位的地区
    dealWithExportQuotas(currentObject) {
      let exportQuotasArr = [];
      let exportQuotasStr = '';
      if (currentObject.exportQuotasOne) {
        exportQuotasArr.push(currentObject.exportQuotasOne);
      }
      if (currentObject.exportQuotasTwo) {
        exportQuotasArr.push(currentObject.exportQuotasTwo);
      }
      if (currentObject.exportQuotasThree) {
        exportQuotasArr.push(currentObject.exportQuotasThree);
      }
      if (exportQuotasArr.length > 0) {
        exportQuotasArr.forEach((value, index, array) => {
          exportQuotasStr += index === array.length - 1 ? value : value + ',';
        });
      }
      currentObject.firstThreeCustomersCountry = exportQuotasStr;
    },
    // 提交表单
    submitForm() {
      let entDemInfoForm = JSON.parse(JSON.stringify(this.ruleForm));
      // 处理上年度出口额度前三位的地区
      this.dealWithExportQuotas(entDemInfoForm);
      entDemInfoForm.reviewResult = '3';
      this.$parent.$parent.$children[0].$children[0].$refs['basicInfo'].validate((basicValid) => {
        if (basicValid) {
          this.$parent.$parent.$children[1].$children[0].$refs['comBraPatInfo'].validate((enterValid) => {
            if (enterValid) {
              this.$refs['entPatPurInfo'].validate((demValid) => {
                if (demValid) {
                  this.reviewCompanyDocs(entDemInfoForm).then(res => {
                    this.$message({
                      type: 'success',
                      message: '提交成功，请继续完善信息'
                    });
                    // 通知父页面信息提交成功
                    this.$emit('complete-ent-pat-pur-tra-dem', true);
                    this.getBasicInfo(this.companyId).then(response => {
                      if (response) {
                        for (let key in response) {
                          this.dealWithFormData(key, response);
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
                    // 通知父组件信息提交失败
                    this.$emit('complete-ent-pat-pur-tra-dem', false);
                  });
                } else {
                  this.loading = false;
                  setTimeout(() => {
                    this.$parent.$parent.activeNames = [];
                    this.$parent.$parent.activeNames.push('third');
                    let isError = document.getElementsByClassName("is-error");
                    isError[0].querySelector('input').focus();
                  }, 1);
                  this.$message({
                    showClose: true,
                    message: '企业参展及贸易需求验证未通过',
                    type: 'error'
                  });
                }
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
          // 通知父组件信息提交失败
          this.$emit('complete-ent-pat-pur-tra-dem', false);
        }
      });
      // this.$refs['entPatPurInfo'].validate((valid) => {
      //   if (valid) {
      //     this.reviewCompanyDocs(entDemInfoForm).then(res => {
      //       this.$message({
      //         type: 'success',
      //         message: '提交成功，请继续完善信息'
      //       });
      //       // 通知父页面信息提交成功
      //       this.$emit('complete-ent-pat-pur-tra-dem', true);
      //       this.getBasicInfo(this.companyId).then(response => {
      //         if (response) {
      //           for (let key in response) {
      //             this.dealWithFormData(key, response);
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
      //       // 通知父组件信息提交失败
      //       this.$emit('complete-ent-pat-pur-tra-dem', false);
      //     });
      //   } else {
      //     setTimeout(() => {
      //       let isError = document.getElementsByClassName("is-error");
      //       isError[0].querySelector('input').focus();
      //       isError[0].querySelector('checkbox').focus();
      //     }, 1);
      //     this.$message({
      //       showClose: true,
      //       message: '企业参展及贸易需求验证未通过',
      //       type: 'error'
      //     });
      //     // 通知父组件信息提交失败
      //     this.$emit('complete-ent-pat-pur-tra-dem', false);
      //   }
      // });
    }
  },
  watch: {
    // 参展目的
    "setParticipationGoalDic": {
      handler(newVal) {
        this.getParticipationGoalDic = JSON.parse(JSON.stringify(newVal));
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    // 主要目标市场
    "setMainTargetMarketDic": {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.getMainTargetMarketDic = JSON.parse(JSON.stringify(newVal));
          this.getMainTargetMarketDic.sort((x, y) => {
            let val1 = x.value;
            let val2 = y.value;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    // 主要目标客户类型
    "setMainCustomersTypeDic": {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.getMainCustomersTypeDic = JSON.parse(JSON.stringify(newVal));
          this.getMainCustomersTypeDic.sort((x, y) => {
            let val1 = x.value;
            let val2 = y.value;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    "ruleForm": {
      handler(newVal) {
        if (newVal.mainTargetMarket && newVal.mainTargetMarket.indexOf('其他（请列明）') > -1) {
          this.showMainTargetMarketOther = true;
          this.rules.mainTargetMarketOther[0].required = true;
        } else {
          this.showMainTargetMarketOther = false;
          this.rules.mainTargetMarketOther[0].required = false;
        }
        if (newVal.mainCustomersType && newVal.mainCustomersType.indexOf('其他（请列明）') > -1) {
          this.showMainCustomersTypeOther = true;
          this.rules.mainCustomersTypeOther[0].required = true;
        } else {
          this.showMainCustomersTypeOther = false;
          this.rules.mainCustomersTypeOther[0].required = false;
        }
      },
      deep: true
    }
  }
};
</script>


