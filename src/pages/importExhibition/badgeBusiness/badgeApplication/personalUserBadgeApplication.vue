<template>
  <el-page ref="personalUserBadgeApplication">
    <template slot="header">
      <kindo-box :title="source.language.personalUserBadgeApplication"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-form :model="badgeApplicationForm" :rules="badgeApplicationRules" ref="badgeApplicationForm" label-position="right" label-width="140px">
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item :label="source.language.name" class="formitemclass">
                <el-input v-model="badgeApplicationForm.name" :placeholder="source.language.pleaseEnter" class="badgeclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item :label="source.language.idCardNo" class="formitemclass">
                <el-input v-model="badgeApplicationForm.idcardNo" :placeholder="source.language.pleaseEnter" class="badgeclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item :label="source.language.period" prop="exhibitionPeriod" class="formitemclass">
                <el-select v-model="badgeApplicationForm.exhibitionPeriod" :placeholder="source.language.pleaseChoose" @change="periodChange" class="badgeclass" :disabled="routeParams.isEnterpriseEdit">
                  <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item :label="source.language.gearPosition" prop="feeLevel" class="formitemclass">
                <el-select v-model="badgeApplicationForm.feeLevel" :placeholder="source.language.pleaseChoose" class="badgeclass" :disabled="routeParams.isEnterpriseEdit">
                  <el-option v-for="item in source.levelNameOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item :label="source.language.dayNumber" prop="feeType" class="formitemclass">
                <el-select v-model="badgeApplicationForm.feeType" :placeholder="source.language.pleaseChoose" class="badgeclass">
                  <el-option v-for="item in source.feeTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item :label="source.language.startDate" prop="effectStartDate" class="formitemclass">
                <el-date-picker :picker-options="exhibitionPeriodTimeOption" value-format="yyyy-MM-dd" v-model="badgeApplicationForm.effectStartDate" type="date" :placeholder="source.language.selectDate" class="badgeclass">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item :label="source.language.idCardScanFront">
                <img :src="imageUrl.idScannedCopyImageUrl" v-if="imageUrl.idScannedCopyImageUrl" class="avatar">
                <img class="imgclass" :src="api.getFile + badgeApplicationForm.idcardFrontPhotoUrl" v-else>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="uploadclass">
              <el-row>
                <el-col :span="8">
                  <el-upload class="avatar-uploader" ref="IdCardFront" :show-file-list="false" :action="api.uploadFile" :on-success="handleIdCardFrontSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
                <el-col :span="10">
                  <div class="changeclass">{{source.language.change}}</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8" class="takebadgeclass">
              <el-form-item :label="source.language.licenseLocation" prop="takeBadgeAddr" class="formitemclass">
                <el-select v-model="badgeApplicationForm.takeBadgeAddr" :placeholder="source.language.pleaseChoose" class="badgeclass" :disabled="routeParams.isEnterpriseEdit">
                  <el-option v-for="item in source.licenseLocationOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item :label="source.language.idCardScanReverse">
                <img :src="imageUrl.idCardScanReverseUrl" v-if="imageUrl.idCardScanReverseUrl" class="avatar">
                <img class="imgclass" :src="api.getFile + badgeApplicationForm.idcardBackPhotoUrl" v-else>
              </el-form-item>
            </el-col>
            <el-col :span="5" class="uploadclass">
              <el-row>
                <el-col :span="8">
                  <el-upload class="avatar-uploader" ref="IdCardBack" :show-file-list="false" :action="api.uploadFile" :on-success="handleIdCardReverseSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
                <el-col :span="10">
                  <div class="badge-div-class">{{source.language.change}}</div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item :label="source.language.avatar">
                <img :src="imageUrl.headPortraitImageUrl" v-if="imageUrl.headPortraitImageUrl" class="headimgclass">
                <img class="headPortrait-class" :src="api.getFile + badgeApplicationForm.badgePhotoUrl" v-else>
              </el-form-item>
            </el-col>
            <el-col :span="5" class="head-uploadclass">
              <el-row>
                <el-col :span="8">
                  <el-upload class="avatar-uploader" ref="badgePhoto" :show-file-list="false" :action="api.uploadFile" :on-success="handleHeadPortraitSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
                <el-col :span="10">
                  <div class="badge-div-class">{{source.language.change}}</div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item>
                <el-button @click="onCancel">{{source.language.cancel}}</el-button>
                <el-button v-if="right('submit')" type="primary" @click="onSubmit">{{source.language.submit}}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
    </template>
  </el-page>

</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '@/scripts/framework/store';
export default {
  name: "personalUserBadgeApplication",
  mixins: [listPageBase],
  data() {
    var _this = this;
    return {
      pageId: "personalUserBadgeApplication",
      store,
      api: {
        get: kindo.config.api.importExbUrl + "",
        getPersonalInfo: kindo.config.api.importExbUrl + "/api/infoIfiPersonUser/getPersonInformationById",
        getLevelName: kindo.config.api.importExbUrl + "/api/BmMcApply/getUsableBadge",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        update: kindo.config.api.importExbUrl + "/api/BmMcApply/userQuotaApply",
        uploadFile: kindo.config.api.upms + "/api/fs/save",
        getFile: kindo.config.api.comsUrl + "/api/fs/view/",
        edit: kindo.config.api.importExbUrl + "/api/BmMcApply/updateQuotaApply"
      },
      badgeApplicationForm: {},
      source: {
        language: {},
        periodOptions: [],
        feeTypeOptions: [{
          label: "一天",
          value: 1
        }, {
          label: "两天",
          value: 2
        }, {
          label: "三天",
          value: 3
        }, {
          label: "四天",
          value: 4
        }, {
          label: "五天",
          value: 5
        }],
        levelNameOptions: [],
        //领证地点
        licenseLocationOptions: [],
        //采购商类型
        buyerTypeOptions: [],
        feeTypeQueryOptions: []
      },
      //当前登录的用户信息
      currentUserInfo: {
        userId: ""
      },
      badgeApplicationRules: {},
      imageUrl: {
        idScannedCopyImageUrl: "",
        idCardScanReverseUrl: "",
        visitingCardImageUrl: "",
        headPortraitImageUrl: ""
      },
      routeParams: {}, // 路由跳转参数
      //设置可选日期范围
      exhibitionPeriodTimeOption: {
        disabledDate(date) {
          //日期结束时间为凌晨0点（如"2019-04-11 00:00:00"）可选范围需减一天（24*3600*1000毫秒）
          if (date.getTime() > (_this.badgeApplicationForm.closingTime - 86400000) || date.getTime() < _this.badgeApplicationForm.curtainTime) {
            return true;
          }
        }
      }
    };
  },
  async created() {
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    //读取数据字典 领证地点
    this.source.licenseLocationOptions = await kindo.dictionary.get('takeBadgeAddr');

    this.badgeApplicationRules = {
      exhibitionPeriod: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ],
      feeLevel: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ],
      feeType: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ],
      effectStartDate: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ],
      takeBadgeAddr: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ]
    };

    this.source.periodOptions = [{
      label: this.source.language.phaseOneTable,
      value: "1"
    }, {
      label: this.source.language.phaseTwoTable,
      value: "2"
    }, {
      label: this.source.language.phaseThreeTable,
      value: "3"
    }];
    this.source.feeTypeQueryOptions = [{
      label: this.source.language.firstGear,
      value: "1"
    }, {
      label: this.source.language.secondGear,
      value: "2"
    }, {
      label: this.source.language.thirdGear,
      value: "3"
    }, {
      label: this.source.language.fourthGear,
      value: "4"
    }, {
      label: this.source.language.fifthGear,
      value: "5"
    }];
  },
  mounted() {
    this.$nextTick(function () {
      //获取当前登录用户信息
      this.getCurrentUserInfo();
      // //修改个人申请，给表单赋值，只能修改天数 开始日期
      // this.routeParams = this.$route.query.params ? this.$route.query.params : {};
    });
  },
  updated: function () {
    this.$nextTick(function () {
      this.$refs.badgeApplicationForm.clearValidate();
    });
  },
  methods: {
    //查询个人用户信息
    getPersonalInfoById() {
      let params = {
        json: {
          OrderModelField: [{
            OrderByField: "",
            asc: false
          }],
          CustomQueryParams: [{
            Name: "userId",
            FindType: "EQ",
            Values: [this.currentUserInfo.userId]
          }],
          PageIndex: 1,
          PageSiz: 10
        }
      };
      this.$http.get(this.api.getPersonalInfo, params).then(res => {
        let personalInfo = res.records[0] ? res.records[0] : {};
        this.badgeApplicationForm = {
          name: personalInfo.name,
          idcardNo: personalInfo.idCardNo,
          idcardFrontPhotoUrl: personalInfo.idCardPicFront,
          idcardBackPhotoUrl: personalInfo.idCardPicBack,
          badgePhotoUrl: personalInfo.portrait,
          phonenumber: personalInfo.phonenumber
        };
      });
    },
    //选择期数后，查对应档位选项
    getLevelName(exhibitionPeriod) {
      let params = {
        json: {
          customQueryParams: {
            exhibitionPeriod: exhibitionPeriod,
            userId: this.currentUserInfo.userId
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      let levelNameData = [];
      this.source.levelNameOptions = [];
      this.$http.get(this.api.getLevelName, params).then(res => {
        levelNameData = res.records;
        if (!levelNameData.length) {
          this.badgeApplicationForm.feeLevel = "";
          this.$message({
            type: "warning",
            message: this.source.language.levelNameTips
          });
        }
        this.badgeApplicationForm.closingTime = levelNameData[0] ? new Date(levelNameData[0].closingTime).getTime() : "";
        this.badgeApplicationForm.curtainTime = levelNameData[0] ? new Date(levelNameData[0].curtainTime).getTime() : "";
        for (let i = 0; i < levelNameData.length; i++) {
          for (let j = 0; j < this.source.feeTypeQueryOptions.length; j++) {
            if (levelNameData[i].levelName === this.source.feeTypeQueryOptions[j].value) {
              this.source.levelNameOptions.push({
                label: this.source.feeTypeQueryOptions[j].label,
                value: this.source.feeTypeQueryOptions[j].value
              });
              break;
            }
          }
        }
      });
    },
    //当前期数
    periodChange(val) {
      this.getLevelName(val);
    },
    //获取当前用户信息
    getCurrentUserInfo() {
      let params = {
        json: {
          customQueryParams: {
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getUserInfo, params).then(res => {
        this.currentUserInfo = res;
        //查个人信息
        this.getPersonalInfoById();
      }, err => {
        this.$message.error(err);
      });
    },
    beforeUpload(file) {
      const isPicture = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      const isLt2M = file.size / (1024 * 1024) < 0.5;
      if (!isPicture) {
        this.$message.error(this.source.language.uploadImgTips);
      }
      if (!isLt2M) {
        this.$message.error(this.source.language.uploadPrompt);
      }
      return isPicture && isLt2M;
    },
    //身份证正面
    handleIdCardFrontSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.idScannedCopyImageUrl = URL.createObjectURL(file.raw);
        this.$message.success(this.source.language.uploadSuccess);
        this.badgeApplicationForm.idcardFrontPhotoUrl = res.data.original ? res.data.original.fileId : "";
        this.$refs.IdCardFront.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.IdCardFront.clearFiles();
      }
    },
    //身份证反面
    handleIdCardReverseSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.idCardScanReverseUrl = URL.createObjectURL(file.raw);
        this.$message.success(this.source.language.uploadSuccess);
        this.badgeApplicationForm.idcardBackPhotoUrl = res.data.original ? res.data.original.fileId : "";
        this.$refs.IdCardBack.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.IdCardBack.clearFiles();
      }
    },
    //头像上传
    handleHeadPortraitSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.headPortraitImageUrl = URL.createObjectURL(file.raw);
        this.$message.success(this.source.language.uploadSuccess);
        this.badgeApplicationForm.badgePhotoUrl = res.data.original ? res.data.original.fileId : "";
        this.$refs.badgePhoto.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.badgePhoto.clearFiles();
      }
    },
    //提交申请
    onSubmit() {
      //开始日期参数带当前的时分秒
      let startDate = kindo.util.formatDate(this.badgeApplicationForm.effectStartDate) + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
      let params = {
        userId: this.currentUserInfo.userId,
        badgeTypeName: "国内采购商证",
        badgeTypeCode: "91",
        idcardNo: this.badgeApplicationForm.idcardNo,
        applyUserName: this.badgeApplicationForm.name,
        applyUserMobile: this.badgeApplicationForm.phonenumber,
        exhibitionPeriod: this.badgeApplicationForm.exhibitionPeriod,
        feeLevel: this.badgeApplicationForm.feeLevel,
        feeType: this.badgeApplicationForm.feeType,
        effectStartDate: startDate,
        takeBadgeAddr: this.badgeApplicationForm.takeBadgeAddr,
        idcardFrontPhotoUrl: this.badgeApplicationForm.idcardFrontPhotoUrl,
        idcardBackPhotoUrl: this.badgeApplicationForm.idcardBackPhotoUrl,
        badgePhotoUrl: this.badgeApplicationForm.badgePhotoUrl
      };
      let uri = this.api.update;
      this.$refs.badgeApplicationForm.validate(valid => {
        if (valid) {
          this.$http.postJson(uri, params)
            .then(res => {
              // 跳转查看审核状态列表页面
              this.$router.push({
                path: '/viewBadgeAuditStatus',
                query: {
                  idcardNo: this.badgeApplicationForm.idcardNo
                }
              });
            }, err => {
              if (!err.message) {
                this.$message.error(err);
              } else {
                this.$alert(err, this.source.language.prompt, {
                  confirmButtonText: this.source.language.confirm,
                  center: true
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$router.push("/viewBadgeAuditStatus");
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 75px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.avatar {
  width: 250px;
  height: 150px;
  display: block;
}
.headimgclass {
  width: 100px;
  height: 130px;
  display: block;
}
.uploadclass {
  margin-top: 117px;
}
.head-uploadclass {
  margin-top: 100px;
}
.badge-div-class {
  margin-top: 10px;
}
.changeclass {
  margin-top: 10px;
  margin-left: 70px;
  width: 30px;
}
.formitemclass {
  margin-bottom: 20px;
}
.badgeclass {
  width: 277px !important;
}
.imgclass {
  width: 277px;
  height: 150px;
}
.headPortrait-class {
  width: 100px;
  height: 130px;
}
.takebadgeclass {
  margin-left: 8px;
}
</style>

