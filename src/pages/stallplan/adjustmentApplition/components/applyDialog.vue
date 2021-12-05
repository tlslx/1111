<template>

  <div class="page-style">
    <el-header>
      <headline :label="checkState"></headline>
    </el-header>
    <el-main >
      <el-form ref="applyForm" :model="applyForm" :inline="false" size="small" :rules="rules">
        <el-row :gutter="20">
          <el-form-item :label="languageSource.AdjustmentApply.earnestMode" prop="earnestMode" label-width="155px" >
            <el-radio v-model="applyForm.earnestMode" label="2">否</el-radio>
            <el-radio v-model="applyForm.earnestMode" label="1">是</el-radio>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11" >
            <el-form-item :label="languageSource.RuleSettingLang.enterpriseName" prop="enterpriseName" >
              <el-select
                v-model="applyForm.enterpriseName"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                @change='handleSelect'
                :remote-method="querySearch"
                :loading="selectLoading">
                <el-option
                  v-for="item in selectOption"
                  :key="item.value.enterpriseId"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item :label="languageSource.AdjustmentApply.boothCode" prop="boothCode">
              <el-select
                v-model="applyForm.boothCode"
                placeholder="请选择展位号"
                @change="exhibitionNumChange">
                <el-option
                  v-for="area in boothCodeOption"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11" >
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" >
              <el-input v-model="applyForm.positionNature" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item :label="languageSource.LocationLang.exhibitionArea" >
              <el-input v-model="applyForm.exhibitionArea" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11" >
            <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" >
              <el-input v-model="applyForm.exhibitionType" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item :label="languageSource.AdjustmentApply.adjustmentNumber" prop="adjustmentNumber">
              <el-select v-model="applyForm.adjustmentNumber" placeholder="请选择调整数量">
                <el-option
                  v-for="(session, index) in adjustNumOption"
                  :key="index"
                  :label="session.label"
                  :value="session.value"
                  :enterpriseName="session.enterpriseName"
                ></el-option>
              </el-select>
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
        <el-row :gutter="20">
          <el-col :span="11" v-if="adjustContentState">
            <el-form-item :label="languageSource.AdjustmentApply.adjustmentContent" prop="adjustmentContent">
              <el-select v-model="applyForm.adjustmentContent" placeholder="请选择专区" @change="contentChange">
                <el-option
                  v-for="session in adjustContentOption"
                  :key="session.value"
                  :label="session.label"
                  :value="session.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" v-if="businessNameState">
            <el-form-item :label="languageSource.AdjustmentApply.businessName" prop="businessName">
              <el-input
                placeholder="填写交易团名称"
                v-model="applyForm.businessName">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item :label="languageSource.AdjustmentApply.adjuestReson" prop="adjustmentReason">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="填写调整原因"
                v-model="applyForm.adjustmentReason" />
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item :label="languageSource.AdjustmentApply.uploadAnnex" prop="files" >
              <el-upload
                class="upload-demo"
                :action='config.api.uploadURL'
                name='files'
                :headers="{ 'Token': store.getters.token }"
                accept=".jpg, .png"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :before-upload="beforeAvatarUpload"
                :file-list="files"
                multiple>
                <el-button size="small" type="primary">{{languageSource.AdjustmentApply.uploadBtn}}</el-button>
                <span slot="tip"><span class="tip">只能上传jpg/png文件</span></span>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="applyForm.earnestMode !== '2'">
          <el-col :span="8" :offset="8">
            <el-form-item prop="makeSure">
              <el-checkbox v-model="applyForm.makeSure" ><span class="tip-text">{{languageSource.AdjustmentApply.tipMsg}}</span></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="20" v-if="!editState">
        <el-col :span="4" :offset="10">
          <el-button type="primary" @click="submitFunction" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.AdjustmentApply.applyBtn}}</el-button>
          <router-link :to="{ path: '/stallplan/adjustmentApplition?primarycolor=2b579a' }" ><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-else>
        <el-col :span="4" :offset="10">
          <el-button type="primary" @click="refuseSubmit" v-loading.fullscreen.lock="fullscreenLoading">{{languageSource.CommonLang.submit}}</el-button>
          <router-link :to="{ path: '/stallplan/adjustmentApplition?primarycolor=2b579a' }" ><el-button>{{languageSource.AdjustmentApply.backBtn}}</el-button></router-link>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../../scripts/framework/store';
export default {
  name: 'applyDialog',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline.vue')
  },
  props: {
    'updateRow': {
      'type': Object
    },
    'currentItem': {
      'type': Object
    }
  },
  data () {
    // let validateChangeNum = (rule, value, callback) => {
    //   let selectNum = parseInt(this.applyForm.adjustmentNumber);
    //   if (value.length === 0) {
    //     return callback(new Error(`请选择${selectNum}个需要调整的展位号`));
    //   }
    //   if (value.length > selectNum) {
    //     return callback(new Error(`调整数量为${selectNum}，只能选择${selectNum}个展位号`));
    //   }
    //   return callback();
    // };
    let validateNum = (rule, value, callback) => {
      let codeValue = this.applyForm.boothCode;
      if (codeValue === '' || codeValue === undefined) {
        return callback(new Error(`请选择展位号`));
      }
      return callback();
    };
    let validateFile = (rule, value, callback) => {
      let fileList = this.files;
      if (fileList.length <= 0) {
        return callback(new Error(`请选择文件`));
      }
      return callback();
    };
    return {
      config,
      store,
      'rules': {
        enterpriseName: [
          { required: true, validator: this.validateEnterpriseName, trigger: 'change' }
        ],
        boothCode: [
          { required: true, validator: validateNum, trigger: 'change' }
        ],
        adjustmentNumber: [
          { required: true, message: '请选择调整数量', trigger: 'change' }
        ],
        adjustmentContent: [
          { required: true, message: '请选择调整内容', trigger: 'change' }
        ],
        adjustmentReason: [
          { required: true, message: '请输入调整原因', trigger: 'change' }
        ],
        files: [
          { required: true, validator: validateFile, trigger: 'change' }
        ],
        makeSure: [
          { required: true, message: '请勾选', trigger: 'change' }
        // ],
        // changeNum: [
        //   { required: true, validator: validateChangeNum, trigger: 'blur' }
        ]
      },
      'applyForm': {
        'earnestMode': '2',
        'adjustmentNumber': '',
        // 'changeNum': [],
        'adjustmentContent': '',
        'adjustmentReason': '',
        'enterpriseName': '',
        'exhibitionArea': '',
        'positionNature': '',
        'exhibitionType': '',
        'makeSure': ''
      },
      'adjustNumOption': [], //调整数量
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
      ], //调整内容选项
      'changeNumData': [],
      'businessNameState': false, //交易团名称输入框状态
      'businessSelectItem': {}, //企业名称选中值
      'files': [], //上传文件列表框
      'boothCodeOption': [], //展位号选项
      'adjustContentState': true, //调整内容下拉框显示状态
      'selectItem': {}, //根据企业名称和展位号匹配到的记录
      'titleLable': '新增调整申请',
      'fullscreenLoading': false, //加载样式
      'editState': false, //编辑状态
      'currentRow': {},
      //国际化内容值
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      },
      selectLoading: false, //查询加载
      selectOption: [] //查询记录

    };
  },
  async created () {
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
  },
  mounted() {
    this.$nextTick(function () {
      this.checkUpdate();
    });
    // this.changeNumData = this.generateData();
  },
  computed: {
    checkState () {
      this.currentRow = this.currentItem;
      return this.currentItem ? '修改调整申请' : '新增调整申请';
    }
  },
  methods: {
    //判断是修改还是新增
    checkUpdate () {
      let scopeRow = this.$route.query.scopeRow;
      if (scopeRow && scopeRow.applicationId) {
        let fileId = this.$route.query.scopeRow.fileId;
        let param = { fileIds: fileId };
        this.fullscreenLoading = true;
        this.$http.get(this.config.api.getFileNameByIds, param)
          .then(res => {
            this.fullscreenLoading = false;
            let fileRow = [];
            for (let i = 0; i < res.length; i++) {
              let obj = {
                name: res[i].fileName,
                response: {
                  data: [res[i].fileId]
                }
              };
              fileRow.push(obj);
            }
            this.applyForm = { ...this.applyForm, ...scopeRow };
            this.files = fileRow;
            this.titleLable = '修改调整申请';
            this.businessSelectItem = {
              enterpriseId: scopeRow.enterpriseId,
              enterpriseName: scopeRow.enterpriseName
            };
            this.editState = true;
            this.handleSelect(scopeRow);
            this.exhibitionNumChange(scopeRow.boothCode);
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
        return callback(new Error('请输入企业名称'));
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
      if (this.boothCodeOption.length > 0) {
        this.clearEnterpriseForm();
      }
      this.$http.get(this.config.api.selectSchemeByCompanyId, params)
        .then(res => {
          let result = res.resultData;
          let showItem = [];
          for (let i = 0; i < result.length; i++) {
            showItem.push(this.creatSelectObj(result[i].boothCode, result[i].boothCode));
          }
          this.boothCodeOption = showItem;
        });
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
      let name = file.name;
      let suffix = name.substring(name.lastIndexOf(".") + 1, name.length);

      if (!(suffix === 'jpg' || suffix === 'png' || suffix === 'JPG' || suffix === 'PNG')) {
        this.$message.error('上传附件只能是 jpg/png 格式!');
        return false;
      } else if (file.size > 10485760) {
        this.$message.error('上传附件不能超过 10M!');
        return false;
      } else {
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
    handleChange (file, fileList) {
      this.files = fileList;
      if (fileList.length) {
        this.$refs.applyForm.clearValidate(['files']);
      }
    },
    //图片上传成功
    handleSuccess (res) {
      this.$refs.applyForm.clearValidate(['files']);
    },
    //提交方法
    submitFunction () {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          let fileIds = [];
          let files = this.files;
          for (let i = 0; i < this.files.length; i++) {
            if (files[i].response && files[i].response.data) {
              let item = files[i].response.data.join(',');
              fileIds.push(item);
            }
          }
          let data = {
            "adjustmentContent": this.applyForm.adjustmentContent,
            "adjustmentNumber": this.applyForm.adjustmentNumber,
            "adjustmentReason": this.applyForm.adjustmentReason,
            "boothCode": this.applyForm.boothCode,
            "enterpriseId": this.businessSelectItem.enterpriseId,
            "enterpriseName": this.businessSelectItem.enterpriseName,
            "fileId": fileIds.join(','),
            "oldSchemeId": this.selectItem.schemeId,
            "positionNature": this.applyForm.positionNature,
            "oldSchemeDetailId": this.selectItem.detailId,
            "exhibitionType": this.applyForm.exhibitionType,
            "exhibitionArea": this.applyForm.exhibitionArea
          };
          this.$http.postJson(this.config.api.startApply, data)
            .then(res => {
              this.$emit("reloadTable");
              this.$router.push({ path: '/stallplan/adjustmentApplition?primarycolor=2b579a' });
            });
        }
      });
    },
    //拒绝之后重新提交
    refuseSubmit () {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          let fileIds = [];
          let files = this.files;
          for (let i = 0; i < files.length; i++) {
            if (files[i].response && files[i].response.data) {
              let item = files[i].response.data.join(',');
              fileIds.push(item);
            }
          }
          let data = {
            "applicationId": this.applyForm.applicationId,
            "oldSchemeId": this.selectItem.schemeId,
            "exhibitionArea": this.applyForm.exhibitionArea,
            "exhibitionType": this.applyForm.exhibitionType,
            "adjustmentReason": this.applyForm.adjustmentReason,
            "adjustmentContent": this.applyForm.adjustmentContent,
            "adjustmentNumber": this.applyForm.adjustmentNumber,
            "boothCode": this.applyForm.boothCode,
            "fileId": fileIds.join(','),
            "workFlowParam": {
              "actId": this.currentRow.actId,
              "businessKey": this.applyForm.applicationId,
              "id": this.currentRow.id,
              "variables": {

              }
            }
          };
          this.$http.postJson(this.config.api.submitApply, data)
            .then(res => {
              this.$emit("reloadTable");
              this.$router.push({ path: '/stallplan/adjustmentApplition?primarycolor=2b579a' });
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
    //展位号选中改变
    exhibitionNumChange (value) {
      let params = {
        enterpriseId: this.businessSelectItem.enterpriseId,
        boothKind: value
      };
      this.applyForm.boothCode = value;
      this.$http.get(this.config.api.selectSchemeByCompanyId, params)
        .then(res => {
          let result = res.resultData;
          let showItem = result.filter(v => v.boothCode === value)[0];
          this.selectItem = showItem;
          this.applyForm.positionNature = showItem.positionNature;
          this.applyForm.exhibitionArea = showItem.exhibitionArea;
          this.applyForm.exhibitionType = showItem.exhibitionType;
          let adjustNumOption = []; //调整数量
          for (let j = 0; j < parseInt(result[0].digit); j++) {
            let item = j + 1;
            adjustNumOption.push(this.creatSelectObj(item, item));
          }
          this.adjustNumOption = adjustNumOption;
          this.positionChange(showItem.positionNature);
        });
    },
    //创建下拉框对象
    creatSelectObj (lable, value) {
      return {
        value: value,
        label: lable
      };
    },
    //根据展位选中值判断调整内容是否要显示
    positionChange (value) {
      this.adjustContentState = !(value === '品牌');
      if (value === '品牌') {
        this.businessNameState = false;
      }
    },
    //清除与选中企业相关的表单数据
    clearEnterpriseForm () {
      this.applyForm.positionNature = '';
      this.applyForm.exhibitionArea = '';
      this.applyForm.exhibitionType = '';
      this.applyForm.boothCode = '';
      this.applyForm.adjustmentNumber = '';
      this.boothCodeOption = [];
      this.adjustNumOption = [];
      this.adjustContentState = true;
      this.businessNameState = false;
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
</style>
