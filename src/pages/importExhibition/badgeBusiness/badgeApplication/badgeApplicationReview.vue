<template>
  <el-page ref="badgeApplicationReview">
    <template slot="header">
      <!--管理员查看个人信息弹窗-->
      <el-dialog :title="source.language.adminViewPersonalInfo" :close-on-click-modal="false" :visible.sync="dialogVisible" width="75%">
        <el-dialog width="70%" :visible.sync="pictureVisible" append-to-body>
          <img :src="api.getFile + adminViewPersonalInfoForm.imgId" class="largepicture">
        </el-dialog>
        <!--不通过原因内部弹窗-->
        <el-dialog width="40%" :title="source.language.failureReason" :close-on-click-modal="false" :visible.sync="innerVisible" append-to-body>
          <kindo-box>
            <el-form :model="notPassFrom" ref="notPassFrom" :rules="notPassRules" label-width="70px">
              <el-form-item :label="source.language.theReason" prop="remark">
                <el-input type="textarea" :rows="8" :placeholder="source.language.enterContent" v-model="notPassFrom.remark">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="innerVisible = false">{{source.language.cancel}}</el-button>
                <el-button type="primary" @click="notPassReason">{{source.language.confirm}}</el-button>
              </el-form-item>
            </el-form>
          </kindo-box>
        </el-dialog>
        <kindo-box>
          <el-form :model="adminViewPersonalInfoForm" ref="adminViewPersonalInfoForm" label-position="right" label-width="120px">
            <el-row>
              <el-col>
                <div class="formtitle">{{source.language.badgeTipOneF}} {{promptMessageOne.exhibitionPeriod}} {{source.language.indexTipOneB}} {{promptMessageOne.levelName}} {{source.language.indexTipOneC}} {{promptMessageOne.totalQuotaNumber}} {{source.language.indexTipOneD}} {{promptMessageOne.levelName}} {{source.language.indexTipOneC}} {{promptMessageOne.remainQuotaNumber}} {{source.language.indexTipOneE}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="formtitle">{{source.language.badgeTipsA}}<span v-for="item in promptMessageData" :key="item.hintKey">{{item.hintKey}} {{source.language.badgeTipsB}}{{item.hintValue}}{{source.language.badgeTipsC}}</span>{{source.language.badgeTipsD}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item :label="source.language.name" prop="applyUserName" class="formitemclass">
                  <el-input v-model="adminViewPersonalInfoForm.applyUserName" class="reviewclass" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="source.language.idCardNo" prop="idcardNo" class="formitemclass">
                  <el-input v-model="adminViewPersonalInfoForm.idcardNo" class="reviewclass" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item :label="source.language.attributiveEnterprise" prop="enterpriseName" class="formitemclass">
                  <el-input v-model="adminViewPersonalInfoForm.enterpriseName" class="reviewclass" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="source.language.period" prop="exhibitionPeriod" class="formitemclass">
                  <el-select v-model="adminViewPersonalInfoForm.exhibitionPeriod" :placeholder="source.language.pleaseChoose" class="reviewclass" :disabled="true">
                    <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item :label="source.language.dayNumber" prop="feeType" class="formitemclass">
                  <el-select v-model="adminViewPersonalInfoForm.feeType" :placeholder="source.language.pleaseChoose" class="reviewclass" :disabled="true">
                    <el-option v-for="item in source.dayOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="source.language.startDate" class="formitemclass">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="adminViewPersonalInfoForm.effectStartDate" type="date" :placeholder="source.language.selectDate" class="reviewclass" :disabled="true">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item :label="source.language.idCardScan" class="formitemclass">
                  <img class="pictureclass" :src="api.getFile + adminViewPersonalInfoForm.idcardBackPhotoUrl" @click="onViewImg(adminViewPersonalInfoForm.idcardBackPhotoUrl)">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="source.language.gearPosition" class="formitemclass">
                  <el-select v-model="adminViewPersonalInfoForm.feeLevel" :placeholder="source.language.pleaseChoose" class="reviewclass" :disabled="true">
                    <el-option v-for="item in source.feeLevelOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item class="formitemclass">
                  <img class="pictureclass" :src="api.getFile + adminViewPersonalInfoForm.idcardFrontPhotoUrl" @click="onViewImg(adminViewPersonalInfoForm.idcardFrontPhotoUrl)">
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="source.language.avatar">
              <el-row>
                <el-col :span="4">
                  <img class="headclass" :src="api.getFile + adminViewPersonalInfoForm.badgePhotoUrl" @click="onViewImg(adminViewPersonalInfoForm.badgePhotoUrl)" v-if="!showModifiedPhoto">
                  <img class="headclass" :src="adminViewPersonalInfoForm.badgePhotoCropped" @click="onViewImg(adminViewPersonalInfoForm.badgePhotoUrl)" v-else>
                </el-col>
                <el-col :span="4">
                  <!--照片管理工具-->
                  <pic-cropper @getImageData="onGetImageData" :img-url="api.getFile + adminViewPersonalInfoForm.badgePhotoUrl" :language="source.language"></pic-cropper>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label-width="140px">
              <el-button v-if="right('auditPass')" type="primary" @click="auditPass" :disabled="isSubmitDisabled">{{source.language.auditPassed}}</el-button>
              <el-button v-if="right('auditNotPass')" @click="auditNotPass">{{source.language.auditNotPassed}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>

      <kindo-box :title="source.language.badgeApplicationReview">
        <!--按钮栏-->
        <el-form :model="forms" :rules="badgeApplicationReviewRules" inline label-position="right">
          <el-form-item :label="source.language.ownedEnterprise" prop="enterpriceName" label-width="90px">
            <el-input v-model="forms.enterpriceName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.badgeApplicationStatus" prop="status" label-width="110px">
            <el-select v-model="forms.status" :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>

    <template slot="body">
      <!--表数据-->
      <kindo-box>
        <kindo-table ref="badgeApplicationReviewTable" :url="api.get" :queryParam="form">
          <el-table-column prop="applyUserName" :label="source.language.applicant" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="source.language.numberOfPeriods" :formatter="periodFormat" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="feeType" :label="source.language.numberOfDays" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="enterpriceName" :label="source.language.ownedEnterprise" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column prop="hintInformation" :label="source.language.systemPromptMessage" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column prop="status" :label="source.language.badgeApplicationStatus" :formatter="statusFormat" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column :label="source.language.operation" min-width="150px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" @click="onView(scope.row)">{{source.language.view}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "badgeApplicationReview",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "badgeApplicationReview",
      api: {
        get: kindo.config.api.importExbUrl + "/api/BmMcApply/getUserInfoByEnterprise",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getUserInfo",
        review: kindo.config.api.importExbUrl + "/api/BmMcApply/auditQuotaApply",
        uploadFile: kindo.config.api.upms + "/api/fs/save", //图片上传
        getFile: kindo.config.api.comsUrl + "/api/fs/view/", //图片查看
        getLoginUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser", //获取当前登录用户信息
        getHint: kindo.config.api.importExbUrl + "/api/BmMcApply/enterpriseQuotaHint", //查剩余指标提示信息1
        getTimeHint: kindo.config.api.importExbUrl + "/api/BmMcApply/quotaApplyTimeHint" //查申请数量提示信息2
      },
      forms: {},
      badgeApplicationReviewRules: {},
      source: {
        language: {},
        //证件申请状态
        statusOptions: [],
        periodOptions: [{
          label: "一期",
          value: "1"
        }, {
          label: "二期",
          value: "2"
        }, {
          label: "三期",
          value: "3"
        }],
        dayOptions: [],
        feeLevelOptions: [{
          label: "一档",
          value: "1"
        }, {
          label: "二档",
          value: "2"
        }, {
          label: "三档",
          value: "3"
        }, {
          label: "四档",
          value: "4"
        }, {
          label: "五档",
          value: "5"
        }],
        activityTagOptions: [{
          label: "A论坛",
          value: "1"
        }, {
          label: "B对接会",
          value: "2"
        }]
      },
      adminViewPersonalInfoForm: {
        applyUserName: "",
        idcardNo: "",
        exhibitionPeriod: "",
        feeType: "",
        effectStartDate: "",
        badgePhotoUrl: "/static/img/head.jpg",
        idcardBackPhotoUrl: ""
      }, //管理员查看个人信息表单
      dialogVisible: false, //管理员查看个人信息外部弹框
      innerVisible: false, //不通过原因，内部弹框
      pictureVisible: false, //大图
      notPassFrom: {}, //不通过原因表单
      enterpriseAuditRules: {},
      notPassRules: {},
      isSubmitDisabled: false,
      //提示信息
      promptMessageOne: {},
      promptMessageData: [],
      showModifiedPhoto: false
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    // 审核状态
    this.source.statusOptions = await kindo.dictionary.get('badge_audit_status');

    this.notPassRules = {
      remark: [
        { required: true, message: this.source.language.enterReason, trigger: 'blur' },
        { max: 100, message: this.source.language.badgeCostLength, trigger: "blur" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    //  审核状态过滤显示
    //  1.MAKED：已制证，2.BU_REJECTED：业务部门审核不通过，3.BU_APPROVED：业务部门审核通过，4.SETTLE：已结算
    //  5.BC_APPROVED：证件中心审核通过，6.BC_REJECTED：证件中心审核不通过，7.SENT：已发证，8.SUMMITED：业务部门待审核
    statusFormat(row) {
      let statusLabel = row.status;
      for (let i = 0; i < this.source.statusOptions.length; i++) {
        if (this.source.statusOptions[i].value === row.status) {
          statusLabel = this.source.statusOptions[i].label;
        }
      }
      return statusLabel;
    },
    //期数过滤显示
    periodFormat(row) {
      let periodLabel = row.period ? row.period : row.exhibitionPeriod;
      for (let i = 0; i < this.source.periodOptions.length; i++) {
        if (this.source.periodOptions[i].value === periodLabel) {
          periodLabel = this.source.periodOptions[i].label;
        }
      }
      return periodLabel;
    },
    //档位过滤显示
    levelNameFormat(row) {
      let levelLabel = row.feeLevel ? row.feeLevel : row.levelName;
      for (let i = 0; i < this.source.feeLevelOptions.length; i++) {
        if (this.source.feeLevelOptions[i].value === levelLabel) {
          levelLabel = this.source.feeLevelOptions[i].label;
        }
      }
      return levelLabel;
    },
    onQuery() {
      this.$refs.badgeApplicationReviewTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.badgeApplicationReviewTable.reloadData();
      });
    },
    // 查剩余指标（提示1）
    getRemainingIndex(row) {
      let params = {
        json: {
          customQueryParams: {
            enterpriseCode: row.enterpriceCode ? row.enterpriceCode : "",
            period: row.exhibitionPeriod ? row.exhibitionPeriod : "1",
            levelName: row.feeLevel ? row.feeLevel : "1"
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getHint, params).then(res => {
        this.promptMessageOne = res.records[0] ? res.records[0] : {};
        //期数，档位返回的是数字，需转换后显示
        this.promptMessageOne.exhibitionPeriod = this.periodFormat(this.promptMessageOne);
        this.promptMessageOne.levelName = this.levelNameFormat(this.promptMessageOne);
      });
    },
    // 查收到的申请数（提示2）
    getNumberOfApplication(row) {
      let params = {
        json: {
          customQueryParams: {
            applyId: row.applyId,
            effectStartDate: row.effectStartDate,
            feeType: row.feeType
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.promptMessageData = [];
      this.$http.get(this.api.getTimeHint, params).then(res => {
        let messageData = res.records;
        messageData.forEach(item => {
          this.promptMessageData.push({
            hintKey: item.hintKey,
            hintValue: item.hintValue
          });
        });

      });
    },
    onView(row) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.showModifiedPhoto = false;
      this.adminViewPersonalInfoForm = {
        applyId: row.applyId,
        applyUserName: row.applyUserName,
        idcardNo: row.idcardNo,
        enterpriseName: row.enterpriceName,
        exhibitionPeriod: row.exhibitionPeriod,
        feeType: row.feeType,
        feeLevel: row.feeLevel,
        effectStartDate: row.effectStartDate,
        idcardBackPhotoUrl: row.idcardBackPhotoUrl,
        idcardFrontPhotoUrl: row.idcardFrontPhotoUrl,
        badgePhotoUrl: row.badgePhotoUrl
      };
      this._badgePhotoUrl = row.badgePhotoUrl;
      //查提示信息1,2
      this.getRemainingIndex(row);
      this.getNumberOfApplication(row);
    },
    onViewImg(imgId) {
      this.pictureVisible = true;
      this.adminViewPersonalInfoForm.imgId = imgId;
    },
    //审核通过（status:BU_APPROVED）
    auditPass() {
      let params = {
        applyId: this.adminViewPersonalInfoForm.applyId,
        status: "BU_APPROVED"
      };
      //头像裁剪后，需保存
      if (this._badgePhotoUrl !== this.adminViewPersonalInfoForm.badgePhotoUrl) {
        params.badgePhotoUrl = this.adminViewPersonalInfoForm.badgePhotoUrl;
      }
      this.$refs.adminViewPersonalInfoForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.review, params).then(res => {
            this.isSubmitDisabled = false;
            this.dialogVisible = false;
            this.$refs.badgeApplicationReviewTable.reloadData();
          }, err => {
            this.isSubmitDisabled = false;
            this.$message.error(err);
          });
        } else {
          return false;
        }
      });
    },
    //审核不通过
    auditNotPass() {
      this.innerVisible = true;
      this.notPassFrom = {};
      this.$nextTick(function () {
        this.$refs.notPassFrom.clearValidate();
      });
    },
    //提交不通过（status:BU_REJECTED）原因
    notPassReason() {
      let params = {
        applyId: this.adminViewPersonalInfoForm.applyId,
        status: "BU_REJECTED",
        remark: this.notPassFrom.remark
      };
      this.$refs.notPassFrom.validate(valid => {
        if (valid) {
          this.$http.postJson(this.api.review, params).then(res => {
            this.innerVisible = false;
            this.dialogVisible = false;
            this.$refs.badgeApplicationReviewTable.reloadData();
          }, err => {
            this.$message.error(err);
          });
        } else {
          return false;
        }
      });
    },
    //照片管理工具
    onGetImageData(img) {
      //裁剪后图片显示
      this.adminViewPersonalInfoForm.badgePhotoCropped = img;
      //裁剪后的图片位base64格式需转换成file
      let filename = "test";
      let arr = img.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let len = bstr.length;
      let u8arr = new Uint8Array(len);
      while (len--) {
        u8arr[len] = bstr.charCodeAt(len);
      }
      let badgePhoteFile = new File([u8arr], filename, { type: mime });
      let formData = new FormData();
      formData.append("file", badgePhoteFile);
      //上传文件获取图片id
      this.$http.postFormData(this.api.uploadFile, formData).then(data => {
        this.adminViewPersonalInfoForm.badgePhotoUrl = data.original.fileId;
        this.showModifiedPhoto = true;
      });
    }
  },
  components: {
    "picCropper": () => import("./components/cropperTool.vue")
  }
};
</script>
<style scoped>
.formtitle {
  color: #ff0000;
}
.tablecolumnclass {
  cursor: pointer;
  color: #409eff;
}
.pictureclass {
  cursor: pointer;
  width: 250px;
  height: 150px;
  display: block;
}
.headclass {
  cursor: pointer;
  width: 100px;
  height: 130px;
  display: block;
}
.reviewclass {
  width: 250px;
}
.formitemclass {
  margin-bottom: 20px;
}
.largepicture {
  width: 100%;
  height: 100%;
}
</style>
