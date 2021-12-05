<template>
  <div class="page-style">
    <el-header>
      <headline :label="titleLable"></headline>
    </el-header>
    <el-main >
      <el-form ref="applyForm" :model="applyForm" :inline="false" :rules="rules" label-position="left">
        <!-- <el-row :gutter="20" >
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.earnestMode" prop="earnestMode" label-width="155px" >
              <el-radio v-model="applyForm.earnestMode" label="2">否</el-radio>
              <el-radio v-model="applyForm.earnestMode" label="1">是</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <div>  </div>
          </el-col>
        </el-row> -->
        <el-row :gutter="20" >
          <el-col :span="12" >
            <el-form-item :label="languageSource.RuleSettingLang.enterpriseName" prop="enterpriseName" >
              <el-select
                :disabled="updateState"
                class="common-style"
                v-model="applyForm.enterpriseName"
                filterable
                remote
                reserve-keyword
                :placeholder="languageSource.RuleSettingLang.enterpriseNameTips"
                @change='handleSelect'
                :remote-method="querySearch"
                :loading="selectLoading">
                <el-option
                  v-for="item in selectOption"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="languageSource.LocationLang.programCodeLabel" prop="cantonCode" >
              <el-input class="common-style" v-model="applyForm.cantonCode" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.businessDelegation" prop="businessDelegation" >
              <el-input class="common-style" v-model="applyForm.businessDelegation" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.associationFormLabel" prop="chamberOfCommerce" >
              <el-input class="common-style" v-model="applyForm.chamberOfCommerce" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" >
            <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionArea" >
              <el-select
                class="common-style"
                v-model="applyForm.exhibitionArea"
                :placeholder="languageSource.LocationLang.exhibitionAreaTip"
                @change="exhibitionAreaChange">
                <el-option
                  v-for="area in exhibitionAreaOption"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="languageSource.LocationLang.exhibitionPeriod" prop="exhibitionPeriod" >
              <el-select v-model="applyForm.exhibitionPeriod"
                clearable
                class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionTips"
              >
                <el-option
                  v-for="area in exhibitionPeriodRow"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12" >
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="positionNature" >
              <el-select
                class="common-style"
                v-model="applyForm.positionNature"
                :placeholder="languageSource.LocationLang.exhibitionPropertyTips"
                @change="positionNatureChange">
                <el-option
                  v-for="area in positionNatureOption"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" prop="exhibitionType" >
              <el-select
                class="common-style"
                v-model="applyForm.exhibitionType"
                :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips"
                @change="exhibitionTypeChange">
                <el-option
                  v-for="area in exhibitionTypeOption"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.boothCode" prop="boothCode" >
                <el-checkbox-group v-model="applyForm.boothCode" @change='boothCodeChange'>
                  <el-checkbox v-for="boothItem in boothCodeOption"
                    :key="boothItem.value"
                    :label="boothItem.value"
                    >{{boothItem.label}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.adjustmentNumber" prop="adjustmentNumber" >
              <el-input class="common-style" v-model="applyForm.adjustmentNumber" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-form-item label="选择需要交换的展位号：" prop="changeNum" label-width="110px">
            <el-transfer
              v-model="applyForm.changeNum"
              :titles="['待选展位号', '已选展位号']"
              @change='transferChange'
              :data="changeNumData">
            </el-transfer>
          </el-form-item>
        </el-row> -->
        <el-row :gutter="20" >
          <el-col :span="12" v-if="adjustContentState">
            <el-form-item :label="languageSource.AdjustmentApply.adjustmentContent" prop="adjustmentContent" >
              <el-select class="common-style" v-model="applyForm.adjustmentContent" :placeholder="languageSource.AdjustmentApply.adjuestContentTips" @change="contentChange">
                <el-option
                  v-for="session in adjustContentOption"
                  :key="session.value"
                  :label="session.label"
                  :value="session.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="businessNameState">
            <el-form-item :label="languageSource.AdjustmentApply.businessName" prop="businessName" >
              <el-input
                class="common-style"
                :maxlength='255'
                :placeholder="languageSource.CheckProgress.businessDelegationTips"
                v-model="applyForm.businessName">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.adjuestReson" prop="adjustmentReason" >
              <el-input
                class="common-style"
                type="textarea"
                :rows="4"
                :placeholder="languageSource.AdjustmentApply.adjustReasonTips"
                v-model="applyForm.adjustmentReason" />
            </el-form-item>
          </el-col>
          <!-- 图片自动上传 -->
          <el-col :span="12" >
            <el-form-item :label="languageSource.AdjustmentApply.uploadAnnex" prop="files" >
              <el-upload
                :disabled="uploadState"
                class="upload-demo"
                :action='config.api.uploadURL'
                name='files'
                :data="otherInfo"
                :headers="{ 'Token': store.getters.token }"
                accept=".jpg, .png"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :before-upload="beforeAvatarUpload"
                :file-list="files"
                multiple>
                <el-button type="primary" :disabled="uploadState">{{languageSource.AdjustmentApply.uploadBtn}}</el-button>
                <span slot="tip"><span class="tip">{{languageSource.AdjustmentApply.uploadTips}}</span></span>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="8" >
            <el-form-item prop="makeSure" >
              <el-checkbox-group v-model="applyForm.makeSure">
                <el-checkbox name="makeSure"><span class="tip-text">{{languageSource.AdjustmentApply.tipMsg}}</span></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="20" v-if="!editState" type="flex" justify="center">
        <el-col :span="6" >
          <router-link :to="{ path: '/adjustmentApplition?primarycolor=2b579a' }" ><el-button class="b-m-r">{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
          <el-button type="primary" @click="submitFunction" v-loading.fullscreen.lock="fullscreenLoading" :disabled="uploadState">{{languageSource.AdjustmentApply.applyBtn}}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-else type="flex" justify="center">
        <el-col :span="6" >
          <router-link :to="{ path: '/adjustmentApplition?primarycolor=2b579a' }" ><el-button class="b-m-r">{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
          <el-button type="primary" @click="refuseSubmit" v-loading.fullscreen.lock="fullscreenLoading" :disabled="uploadState">{{languageSource.CommonLang.submit}}</el-button>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import config from './components';
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../scripts/framework/store';
export default {
  name: 'applyDialog',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../components/headline.vue')
  },
  data () {
    return {
      'pageId': 'stallplanDemo/applyDialog',
      config,
      store,
      'rules': {},
      'applyForm': {
        'earnestMode': '2',
        'adjustmentNumber': '',
        'adjustmentContent': '',
        'adjustmentReason': '',
        'enterpriseName': '',
        'exhibitionArea': '',
        'positionNature': '',
        'exhibitionType': '',
        'makeSure': [],
        'boothCode': [],
        'businessName': '',
        'cantonCode': '',
        'businessDelegation': '',
        'chamberOfCommerce': '',
        'exhibitionPeriod': ''
      },
      'adjustContentOption': [
        {
          label: '与其他企业互换位置',
          value: '与其他企业互换位置'
        }, {
          label: '跨交易团调整',
          value: '跨交易团调整'
        }, {
          label: '调整到新位置',
          value: '调整到新位置'
        }
      ],
      //调整内容选项
      'changeNumData': [],
      'businessNameState': false, //交易团名称输入框状态
      'businessSelectItem': {}, //企业名称选中值
      'files': [], //上传文件列表框
      'adjustContentState': true, //调整内容下拉框显示状态
      'titleLable': '新增调整申请',
      'fullscreenLoading': false, //加载样式
      'editState': false, //编辑状态
      'currentRow': {},
      //国际化内容值
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {},
        'CheckProgress': {}
      },
      'selectLoading': false, //查询加载
      'selectOption': [], //查询记录
      'otherInfo': { //文件上传的额外参数
        ids: []
      },
      'uploadState': false, //文件上传状态
      'exhibitionAreaOption': [],  //展区选项
      'positionNatureOption': [],  //展位性质选项
      'exhibitionTypeOption': [],  //布展类型选项
      'boothCodeOption': [], //展位号选项
      'boothCodeRow': [], //查询到的展位号相关的数据
      'updateState': false, //修改状态，true表示修改，false表示新增
      'exhibitionPeriodRow': [], //展期数据
      'currentSession': '' //当前届信息
    };
  },
  created () {
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');
    //设置校验信息国际化
    this.setRules();
  },
  mounted() {
    this.$nextTick(function () {
      this.checkUpdate();
    });
  },
  methods: {
    //判断文件信息
    validateFile (rule, value, callback) {
      let fileList = this.files;
      if (fileList.length <= 0) {
        // return callback(new Error(`请选择文件`));
        return callback(new Error(this.languageSource.LocationLang.selectFileMsg));
      }
      return callback();
    },
    //判断是修改还是新增
    checkUpdate () {
      let scopeRow = this.$route.query.scopeRow;
      this.titleLable = this.languageSource.AdjustmentApply.adjustApplyAddTitle;
      this.updateState = false; //默认新增
      if (scopeRow && scopeRow.applicationId) {
        let fileId = this.$route.query.scopeRow.fileId;
        let param = { fileIds: fileId };
        this.fullscreenLoading = true;
        this.updateState = true; //修改状态
        this.$http.get(this.config.api.getFileNameByIds, param)
          .then(res => {
            this.fullscreenLoading = false;
            let fileRow = [];
            for (let i = 0; i < res.length; i++) {
              let obj = {
                name: res[i].fileName,
                response: {
                  data: {
                    fileName: res[i].fileName,
                    fileId: res[i].fileId
                  }
                }
              };
              fileRow.push(obj);
            }
            this.applyForm = { ...this.applyForm, ...scopeRow };
            this.files = fileRow;
            this.titleLable = this.languageSource.AdjustmentApply.adjustApplyTitle;
            this.businessSelectItem = {
              enterpriseId: scopeRow.enterpriseId,
              enterpriseName: scopeRow.enterpriseName
            };
            this.editState = true;
            this.otherInfo.ids = fileId.split(',');
            this.handleSelect(scopeRow);
            this.exhibitionAreaChange(scopeRow.exhibitionArea);
            this.positionNatureChange(scopeRow.positionNature);
            this.exhibitionTypeChange(scopeRow.exhibitionType);
            this.boothCodeChange(scopeRow.boothCode.split(','));
            this.applyForm.boothCode = scopeRow.boothCode.split(',');
          });
      }
    },
    clear () {
      this.files = [];
      this.clearEnterpriseForm();
      this.$refs.applyForm.resetFields();
    },
    //校验企业名称
    validateEnterpriseName (rule, value, callback) {
      if (value === '' || value === undefined) {
        this.clearEnterpriseForm();
        return callback(new Error(this.languageSource.RuleSettingLang.enterpriseNameTips));
      } else {
        return callback();
      }
    },
    //企业名称查询请求
    querySearch (queryString) {
      if (queryString !== '') {
        this.selectLoading = true;
        let params = {
          enterpriseName: queryString
        };
        this.$http.get(this.config.api.selectCompanyByName, params)
          .then(res => {
            let result = res.resultData;
            let showItem = [];
            for (let i = 0; i < result.length; i++) {
              let itemObj = {
                key: i,
                label: result[i].enterpriseName + '(' + result[i].cantonCode + ')',
                value: {
                  enterpriseId: result[i].enterpriseId,
                  enterpriseName: result[i].enterpriseName
                }
              };
              showItem.push(itemObj);
            }
            this.selectOption = showItem;
            this.selectLoading = false;
          });
      } else {
        this.selectLoading = false;
        this.selectOption = [];
      }
    },
    //企业名称选中改变
    handleSelect (item) {
      let params = {
        enterpriseId: item.enterpriseId
      };
      this.applyForm.enterpriseName = item.enterpriseName;
      this.businessSelectItem = item;
      if (this.exhibitionAreaOption.length > 0) {
        this.clearEnterpriseForm();
      }
      this.$http.get(this.config.api.selectSchemeByCompanyId, params)
        .then(res => {
          let result = res.resultData;
          let exhibitionAreaItem = [];
          for (let i = 0; i < result.length; i++) {
            // let current = this.regionOfExhibition.filter(v => v.label === );
            exhibitionAreaItem.push(this.creatSelectObj(result[i].exhibitionArea, result[i].exhibitionArea + ',' + result[i].exhibitionAreaCode));
          }
          exhibitionAreaItem = this.arrayReduce(exhibitionAreaItem);
          this.exhibitionAreaOption = exhibitionAreaItem; //展区赋值
          this.applyForm.cantonCode = result[0].cantonCode;
          this.applyForm.businessDelegation = result[0].businessDelegation;
          this.applyForm.businessDelegationId = result[0].businessDelegationId;
          this.applyForm.chamberOfCommerce = result[0].chamberOfCommerce;
          this.applyForm.chamberOfCommerceCode = result[0].chamberOfCommerceCode;
          this.applyForm.sessionNumber = result[0].sessionNumber;
        });
    },
    //展区改变方法
    exhibitionAreaChange (value) {
      if (!value || value === '') {
        return false;
      }
      let valueItem = value.split(',');
      let params = {
        enterpriseId: this.businessSelectItem.enterpriseId,
        exhibitionArea: valueItem[0]
      };
      //根据返回值匹配展期信息
      this.$http.get(this.config.api.selectSchemeByCompanyId, params)
        .then(res => {
          let result = res.resultData;
          let positionNatureItem = [];
          let exhibitionPeriodRow = [];
          for (let i = 0; i < result.length; i++) {
            positionNatureItem.push(this.creatSelectObj(result[i].positionNature, result[i].positionNature));
            exhibitionPeriodRow.push(this.creatSelectObj('第' + result[i].exhibitionPeriod + '期', result[i].exhibitionPeriod));
          }
          positionNatureItem = this.arrayReduce(positionNatureItem);
          exhibitionPeriodRow = this.arrayReduce(exhibitionPeriodRow);
          this.positionNatureOption = positionNatureItem;  //展位性质赋值
          this.exhibitionPeriodRow = exhibitionPeriodRow;  //展期赋值
        });
      //重新选择时清除数据
      if (this.positionNatureOption.length > 0) {
        this.exhibitionTypeOption = [];  //布展类型选项
        this.boothCodeOption = []; //展位号选项
        this.exhibitionPeriodRow = []; //展期数据
        this.applyForm.positionNature = ''; //展位性质
        this.applyForm.boothCode = []; //展位号
        this.applyForm.exhibitionType = ''; //布展类型
        this.applyForm.adjustmentNumber = '';
        this.applyForm.exhibitionPeriod = '';
      }
    },
    //展位性质改变方法
    positionNatureChange (value) {
      let valueItem = this.applyForm.exhibitionArea.split(',');
      let params = {
        enterpriseId: this.businessSelectItem.enterpriseId,
        exhibitionArea: valueItem[0],
        positionNature: value
      };
      //根据选择的展位性质判断调整内容选项是否展示
      this.adjustContentState = !(value === '品牌');
      if (value === '品牌') {
        this.businessNameState = false;
        this.applyForm.adjustmentContent = '退回大会';
      }
      this.$http.get(this.config.api.selectSchemeByCompanyId, params)
        .then(res => {
          let result = res.resultData;
          let exhibitionTypeItem = [];
          for (let i = 0; i < result.length; i++) {
            exhibitionTypeItem.push(this.creatSelectObj(result[i].exhibitionType, result[i].exhibitionType));
          }
          exhibitionTypeItem = this.arrayReduce(exhibitionTypeItem);
          this.exhibitionTypeOption = exhibitionTypeItem;  //布展类型赋值
        });
      //重新选择时清除数据
      if (this.exhibitionTypeOption.length > 0) {
        this.boothCodeOption = []; //展位号选项
        this.applyForm.boothCode = []; //展位号
        this.applyForm.exhibitionType = ''; //布展类型
        this.applyForm.adjustmentNumber = '';
      }
    },
    //布展类型改变方法
    exhibitionTypeChange (value) {
      let valueItem = this.applyForm.exhibitionArea.split(',');
      let params = {
        enterpriseId: this.businessSelectItem.enterpriseId,
        exhibitionArea: valueItem[0],
        positionNature: this.applyForm.positionNature,
        exhibitionType: value
      };
      this.$http.get(this.config.api.selectSchemeByCompanyId, params)
        .then(res => {
          let result = res.resultData;
          let boothCodeItem = [];
          this.boothCodeRow = result;
          for (let i = 0; i < result.length; i++) {
            boothCodeItem.push(this.creatSelectObj(result[i].boothCode, result[i].boothCode));
          }
          boothCodeItem = this.arrayReduce(boothCodeItem);
          this.boothCodeOption = boothCodeItem;  //布展类型赋值
        });
      //重新选择时清除数据
      if (this.boothCodeOption.length > 0) {
        this.applyForm.boothCode = []; //展位号
        this.applyForm.adjustmentNumber = '';
      }
    },
    //展位号改变方法
    boothCodeChange (value) {
      this.applyForm.adjustmentNumber = value.length === 0 ? '' : value.length;
    },
    generateData () {
      const data = [];
      for (let i = 1; i <= 10; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      return data;
    },
    //文件上传前增加判断
    beforeAvatarUpload(file) {
      let languageSource = this.languageSource;
      let name = file.name;
      let suffix = name.substring(name.lastIndexOf(".") + 1, name.length);

      if (!(suffix === 'jpg' || suffix === 'png' || suffix === 'JPG' || suffix === 'PNG')) {
        this.$message.error(languageSource.AdjustmentApply.imageTips);
        return false;
      } else if (file.size > 10485760) {
        this.$message.error(languageSource.AdjustmentApply.imageSizeTips);
        return false;
      } else {
        this.uploadState = true;
        return true;
      }
    },
    //图片删除方法
    handleRemove(file, fileList) {
      this.files = fileList;
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField(['files']);
      }
    },
    //图片改变方法
    handleChange (file, fileList) {
      let infoIds = [];
      for (let i = 0; i < fileList.length; i++) {
        let id = fileList[i].response ? fileList[i].response.data.fileId : '';
        if (id !== '') {
          infoIds.push(id);
          fileList[i].name = fileList[i].response.data.fileName;
        }
      }
      this.otherInfo.ids = infoIds;
      this.files = fileList;
      if (fileList.length) {
        this.uploadState = false;
        this.$refs.applyForm.clearValidate(['files']);
      }
    },
    //图片上传成功
    handleSuccess (res) {
      if (res.data.fileId) {
        this.$refs.applyForm.clearValidate(['files']);
      } else {
        this.$message.error(res.data);
      }
    },
    //品牌提交方法
    submitFunction () {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          let applyForm = this.applyForm;
          let fileIds = [];
          let paApplyRefSchemes = [];
          let files = this.files;
          let boothCode = this.applyForm.boothCode;
          let exhibitionAreaItem = this.applyForm.exhibitionArea.split(',');
          for (let i = 0; i < files.length; i++) {
            let item = files[i].response.data.fileId;
            fileIds.push(item);
          }
          for (let i = 0; i < boothCode.length; i++) {
            let boothItem = this.boothCodeRow.filter(v => v.boothCode === boothCode[i])[0];
            let detailIdObj = {
              "oldSchemeId": boothItem.schemeId,
              "oldSchemeDetailId": boothItem.detailId
            };
            paApplyRefSchemes.push(detailIdObj);
          }
          let data = {
            "adjustmentContent": applyForm.adjustmentContent,
            "adjustmentNumber": applyForm.adjustmentNumber,
            "adjustmentReason": applyForm.adjustmentReason,
            "boothCode": boothCode.join(','),
            "enterpriseId": this.businessSelectItem.enterpriseId,
            "enterpriseName": this.businessSelectItem.enterpriseName,
            "fileId": fileIds.join(','),
            "positionNature": applyForm.positionNature,
            "exhibitionType": applyForm.exhibitionType,
            "exhibitionArea": exhibitionAreaItem[0],
            "exhibitionAreaCode": exhibitionAreaItem[1],
            "sessionNumber": applyForm.sessionNumber,
            "exhibitionPeriod": applyForm.exhibitionPeriod,
            "businessDelegation": applyForm.businessDelegation,
            "businessDelegationId": applyForm.businessDelegationId,
            "chamberOfCommerce": applyForm.chamberOfCommerce,
            "chamberOfCommerceCode": applyForm.chamberOfCommerceCode,
            "cantonCode": applyForm.cantonCode,
            "paApplyRefSchemes": paApplyRefSchemes
          };
          this.fullscreenLoading = true;
          this.$http.postJson(this.config.api.startApply, data)
            .then(res => {
              this.$emit("reloadTable");
              this.$router.push({ path: '/adjustmentApplition?primarycolor=2b579a' });
            });
        }
      });
    },
    //拒绝之后重新提交
    refuseSubmit () {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          let applyForm = this.applyForm;
          let fileIds = [];
          let files = this.files;
          let scopeRow = this.$route.query.scopeRow;
          let boothCode = applyForm.boothCode;
          let exhibitionAreaItem = applyForm.exhibitionArea.split(',');
          for (let i = 0; i < files.length; i++) {
            if (files[i].response && files[i].response.data) {
              let item = files[i].response.data.fileId;
              fileIds.push(item);
            }
          }
          let paApplyRefSchemes = [];
          for (let i = 0; i < boothCode.length; i++) {
            let boothItem = this.boothCodeRow.filter(v => v.boothCode === boothCode[i])[0];
            let detailIdObj = {
              "oldSchemeId": boothItem.schemeId,
              "oldSchemeDetailId": boothItem.detailId
            };
            paApplyRefSchemes.push(detailIdObj);
          }
          let data = {
            "applicationId": applyForm.applicationId,
            "enterpriseId": this.businessSelectItem.enterpriseId,
            "enterpriseName": applyForm.enterpriseName,
            "exhibitionArea": exhibitionAreaItem[0],
            "exhibitionAreaCode": exhibitionAreaItem[1],
            "exhibitionType": applyForm.exhibitionType,
            "adjustmentReason": applyForm.adjustmentReason,
            "adjustmentContent": applyForm.adjustmentContent,
            "adjustmentNumber": applyForm.adjustmentNumber,
            "exhibitionPeriod": applyForm.exhibitionPeriod,
            "boothCode": boothCode.join(','),
            "fileId": fileIds.join(','),
            "taskEntities": [{ "curActId": scopeRow.curActId }],
            "paApplyRefSchemes": paApplyRefSchemes,
            "variables": {
              "passFlag": "1",
              "reviewComment": "提交申请"
            }
          };
          this.fullscreenLoading = true;
          this.$http.postJson(this.config.api.submitApply, data)
            .then(res => {
              this.$emit("reloadTable");
              this.$router.push({ path: '/adjustmentApplition?primarycolor=2b579a' });
              this.fullscreenLoading = false;
            });
        }
      });
    },
    //调整内容改变调用
    contentChange (value) {
      this.businessNameState = (value === '跨交易团调整');
    },
    //穿梭框改变调用方法
    transferChange (value) {
      this.$refs.applyForm.validateField(['changeNum']);
    },
    //创建下拉框对象
    creatSelectObj (lable, value) {
      return {
        label: lable,
        value: value
      };
    },
    //数组对象去重
    arrayReduce (arr) {
      let obj = {};
      let resultArr = [];
      resultArr = arr.reduce(function(item, next) {
        obj[next.value] ? '' : obj[next.value] = true && item.push(next);
        return item;
      }, []);
      return resultArr;
    },
    //清除与选中企业相关的表单数据
    clearEnterpriseForm () {
      this.boothCodeOption = []; //展位号选项
      this.exhibitionAreaOption = []; //展区选项
      this.positionNatureOption = []; //展位性质选项
      this.exhibitionTypeOption = []; //布展类型选项
      this.exhibitionPeriodRow = []; //展期数据
      this.adjustContentState = true;
      this.businessNameState = false;
      this.applyForm.positionNature = ''; //展位性质
      this.applyForm.exhibitionArea = ''; // 展区
      this.applyForm.exhibitionType = ''; //布展类型
      this.applyForm.boothCode = []; //展位号
      this.applyForm.adjustmentNumber = '';
      this.applyForm.cantonCode = '';
      this.applyForm.businessDelegation = '';
      this.applyForm.businessDelegationId = '';
      this.applyForm.chamberOfCommerce = '';
      this.applyForm.chamberOfCommerceCode = '';
      this.applyForm.exhibitionPeriod = ''; //展期数据
    },
    //给校验信息赋值
    setRules () {
      let languageSource = this.languageSource;
      this.rules = {
        enterpriseName: [
          { required: true, validator: this.validateEnterpriseName, trigger: 'change' }
        ],
        boothCode: [
          { required: true, message: languageSource.AdjustmentApply.checkBoothCode, trigger: 'change' }
        ],
        exhibitionArea: [
          { required: true, message: languageSource.LocationLang.exhibitionAreaTip, trigger: 'change' }
        ],
        exhibitionPeriod: [
          { required: true, message: languageSource.LocationLang.exhibitionTips, trigger: 'change' }
        ],
        positionNature: [
          { required: true, message: languageSource.LocationLang.exhibitionPropertyTips, trigger: 'change' }
        ],
        exhibitionType: [
          { required: true, message: languageSource.AdjustmentApply.exhibitionTypeTips, trigger: 'change' }
        ],
        adjustmentContent: [
          { required: true, message: languageSource.AdjustmentApply.adjuestContentTips, trigger: 'change' }
        ],
        adjustmentReason: [
          { required: true, message: languageSource.AdjustmentApply.adjustReasonTips, trigger: 'change' },
          { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
        ],
        files: [
          { required: true, validator: this.validateFile, trigger: 'change' }
        ],
        makeSure: [
          { required: true, message: languageSource.AdjustmentApply.checkTips, trigger: 'change' }
        ]
      };
    }
  }
};
</script>


<style scoped>
.tip-text {
  color: #F56C6C
}
.page-style {
  overflow-x: hidden;
}
.tip {
  margin-left: 10px;
}
.b-m-r {
  margin-right: 10px;
}
.common-style {
  width: 280px;
}
</style>
