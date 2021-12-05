<template>
  <el-dialog
    :title="showTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="66%">
    <el-form ref="gear" :model="gear" :inline="false" label-position="left" label-width="120px" :rules="rules">
      <div v-if="currentType !== 'download'">
        <el-row :gutter="20" >
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.programName" prop="schemeName" >
              <el-input v-model="gear.schemeName" clearable class="common-style" :placeholder="languageSource.LocationLang.programNameTip"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionNumber" prop="sessionNumber">
              <el-input v-model="gear.sessionNumber" class="common-style" readonly ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionAreaName" >
              <el-select v-model="gear.exhibitionAreaName" clearable class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionAreaTip"
                @change="getSpecialArea">
                <el-option
                  v-for="area in exhibitionAreaRow"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionPeriod" prop="exhibitionPeriod">
              <el-select v-model="gear.exhibitionPeriod"
                clearable
                class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionTips"
                @change="getExhibitionArea"
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
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.centralChannel" prop="isCentralPassage">
              <el-radio-group v-model="gear.isCentralPassage" >
                <el-radio :disabled='radioState' v-for="(item, index) in radioArray" :label="item.value" :key="index">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item :label="languageSource.LocationLang.specialArea" prop="zhuanqu" >
              <el-select v-model="gear.zhuanqu" clearable class="common-style" :placeholder="languageSource.LocationLang.specialAreaTips">
                <el-option
                  v-for="session in specialAreaRow"
                  :key="session.value"
                  :label="session.label"
                  :value="session.label"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="exhibitionProperty">
              <el-select v-model="gear.exhibitionProperty" clearable class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionPropertyTips" @change="exhibitionChange">
                <el-option
                  v-for="area in exhibitionRow"
                  :key="area.value"
                  :label="area.label"
                  :value="area.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" prop="exhibitionKind" >
              <el-select v-model="gear.exhibitionKind" clearable class="common-style"
                :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips" >
                <el-option
                  v-for="session in exhibitionTypeRow"
                  :key="session.value"
                  :label="session.label"
                  :value="session.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="currentType === 'autoArrange'">
          <!-- <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item :label="languageSource.LocationLang.drawArrange"
                label-width="180px" prop="arrangeByDrawValue">
                <el-radio-group v-model="gear.arrangeByDrawValue"  >
                  <el-radio :label="1">从小到大</el-radio>
                  <el-radio :label="2">从大到小</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item :label="languageSource.LocationLang.exhibitionPositionNum"
                label-width="180px" prop="arrangeByBoothQuantityValue">
                <el-radio-group v-model="gear.arrangeByBoothQuantityValue"  >
                  <el-radio :label="1">从高到低</el-radio>
                  <el-radio :label="2">从低到高</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item :label="languageSource.LocationLang.exhibitionPositionSame"
                label-width="180px" prop="arrangeByCantonCodeOrRandomValue">
                <el-radio-group v-model="gear.arrangeByCantonCodeOrRandomValue"  >
                  <el-radio :label="1">广交会编码</el-radio>
                  <el-radio :label="2">随机</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item :label="languageSource.LocationLang.specialAreaArrange"
                label-width="180px" prop="arrangeByExhibitionBoothNumberValue">
                <el-radio-group v-model="gear.arrangeByExhibitionBoothNumberValue"  >
                  <el-radio label="1">从小到大</el-radio>
                  <el-radio label="2">从大到小</el-radio>
                  <el-radio label="3">随机</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-col :span="13" :offset="6">
            <el-form-item prop="makeSure" >
              <el-checkbox-group v-model="gear.makeSure">
                <el-checkbox name="makeSure" >
                  <span style="color: #606266;">{{languageSource.RuleSettingLang.ruleSetTips}}</span>
                </el-checkbox>
              </el-checkbox-group>
              <div v-for="(item, index) in rulesInfoArr" :key="index">
                <span class="tip-text" >{{item.label}}：{{item.text}}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="currentType === 'importFile'">
          <el-col :span="24">
            <el-form-item prop="files" >
              <el-upload
                ref="upload"
                accept=".xls, .xlsx"
                :limit="1"
                :action="config.api.uploadScheme"
                :headers="{ 'Token': store.getters.token }"
                :data="gear"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="file"
                :auto-upload="false">
                <el-button slot="trigger" type="primary">{{languageSource.LocationLang.selectFile}}</el-button>
                <span slot="tip"><span class="tip-margin">{{languageSource.RuleSettingLang.tips}}</span></span>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row :gutter="20">
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionNumber" prop="sessionNumber">
              <el-input v-model="gear.sessionNumber" class="common-style" readonly ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionAreaName" >
              <el-select v-model="gear.exhibitionAreaName" clearable class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionAreaTip"
                @change="getSpecialArea">
                <el-option
                  v-for="area in exhibitionAreaRow"
                  :key="area.value"
                  :label="area.label"
                  :value="area.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionPeriod" prop="exhibitionPeriod">
              <el-select v-model="gear.exhibitionPeriod"
                clearable
                class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionTips"
                @change="getExhibitionArea"
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
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.centralChannel" prop="isCentralPassage">
              <el-radio-group v-model="gear.isCentralPassage" >
                <el-radio :disabled='radioState' v-for="(item, index) in radioArray" :label="item.value" :key="index">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item :label="languageSource.LocationLang.specialArea" prop="zhuanqu" >
              <el-select v-model="gear.zhuanqu" clearable class="common-style" :placeholder="languageSource.LocationLang.specialAreaTips">
                <el-option
                  v-for="session in specialAreaRow"
                  :key="session.value"
                  :label="session.label"
                  :value="session.label"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="exhibitionProperty">
              <el-select v-model="gear.exhibitionProperty" clearable class="common-style"
                :placeholder="languageSource.LocationLang.exhibitionPropertyTips" @change="exhibitionChange">
                <el-option
                  v-for="area in exhibitionRow"
                  :key="area.value"
                  :label="area.label"
                  :value="area.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="col-style">
            <el-form-item :label="languageSource.AdjustmentApply.exhibitionType" prop="exhibitionKind" >
              <el-select v-model="gear.exhibitionKind" clearable class="common-style"
                :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips" >
                <el-option
                  v-for="session in exhibitionTypeRow"
                  :key="session.value"
                  :label="session.label"
                  :value="session.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="onGearSubmit" :disabled="uploadingState" :loading="downloadLoading">{{languageSource.CommonLang.confirm}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../../scripts/framework/store';
import config from './index';
import axios from 'axios';
export default {
  name: 'gearDialog',
  mixins: [listPageBase],
  props: {
    'natures': {
      'type': Array,
      'required': true
    },
    'regionOfExhibition': {
      'type': Array,
      'required': true
    },
    'exhibitionPeriodNum': {
      'type': Array,
      'required': true
    },
    'exhibitionTypeOption': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    },
    'currentType': {
      'type': String
    }
  },
  data () {
    return {
      store,
      config,
      'rules': {},
      'dialogVisible': false,
      'gear': {
        schemeName: '',
        sessionNumber: '',
        exhibitionPeriod: '',
        exhibitionAreaName: '',
        exhibitionAreaCode: '',
        exhibitionProperty: '',
        isCentralPassage: '',
        exhibitionKind: '',
        makeSure: [],
        arrangeByDrawValue: '',
        arrangeByBoothQuantityValue: '',
        arrangeByCantonCodeOrRandomValue: '',
        arrangeByExhibitionBoothNumberValue: ''
      },
      'file': [],
      'exhibitionPeriodRow': [], //接口查询的展期数据
      'exhibitionAreaRow': [], //接口查询的展区数据
      'allSpecialAreaRow': [], //接口查询的专区数据汇总
      'specialAreaRow': [], //单个展区对应的专区数据
      'exhibitionTypeRow': [], //布展类型选项数据
      'uploadFileState': false, //文件上传失败状态
      'uploadingState': false, //文件上传状态
      'rulesInfoArr': [], //规则设置内容信息
      'currentSession': '', //当前届数信息
      'exhibitionState': '', //按展区专区安排排序规则
      'downloadLoading': false,
      'exhibitionRow': [], //展位性质数据
      'radioArray': [],
      'radioState': false, //是否存在展厅图状态
      'selectExhibitionRows': [] //接口查到的展区对应的布展类型数据
    };
  },
  computed: {
    showTitle () {
      this.exhibitionRow = this.natures;
      if (this.currentType === 'onlineArrange') {
        return this.languageSource.LocationLang.onlineArrange;
      } else if (this.currentType === 'autoArrange') {
        this.exhibitionRow = this.natures.filter(v => v.label.indexOf('一般性') >= 0);
        return this.languageSource.LocationLang.automaticArrange;
      } else if (this.currentType === 'importFile') {
        return this.languageSource.LocationLang.import;
      } else if (this.currentType === 'download') {
        return this.languageSource.LocationLang.downloadExcel;
      }
    }
  },
  created () {
    //校验国际化设置
    let languageSource = this.languageSource;
    this.rules = {
      schemeName: [
        { required: true, message: languageSource.LocationLang.programNameTip, trigger: 'change' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      ],
      exhibitionPeriod: [
        { required: true, message: languageSource.LocationLang.exhibitionTips, trigger: 'change' }
      ],
      exhibitionAreaName: [
        { required: true, message: languageSource.LocationLang.exhibitionAreaTip, trigger: 'change' }
      ],
      exhibitionProperty: [
        { required: true, message: languageSource.LocationLang.exhibitionPropertyTips, trigger: 'change' }
      ],
      isCentralPassage: [
        { required: true, message: languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
      ],
      exhibitionKind: [
        { required: true, message: languageSource.AdjustmentApply.exhibitionTypeTips, trigger: 'change' }
      ],
      makeSure: [
        { required: true, message: this.languageSource.AdjustmentApply.checkTips, trigger: 'change' }
      ],
      files: [{ required: true, message: languageSource.LocationLang.selectFileMsg, trigger: 'change' }],
      arrangeByDrawValue: [
        { required: true, message: this.languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
      ],
      arrangeByCantonCodeOrRandomValue: [
        { required: true, message: this.languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
      ],
      arrangeByBoothQuantityValue: [
        { required: true, message: this.languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
      ],
      arrangeByExhibitionBoothNumberValue: [
        { required: true, message: this.languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
      ]
    };
    //获取校验规则方法
    this.getRules();
  },
  methods: {
    //确定提交方法
    onGearSubmit () {
      this.$refs.gear.validate(valid => {
        if (valid) {
          if (this.radioState) {
            this.$message.error(this.languageSource.AdjustmentApply.dialogInfo);
            return false;
          }
          let gear = this.gear;
          let exhibitionAreaItem = gear.exhibitionAreaName.split(',');
          this.gear.isCentralPassage = (gear.isCentralPassage && gear.isCentralPassage !== '') ? gear.isCentralPassage : '0';
          this.gear.exhibitionAreaName = exhibitionAreaItem[0];
          this.gear.exhibitionAreaCode = exhibitionAreaItem[1];
          this.gear.reevaluationState = true;
          if (this.currentType === 'importFile') { //导入提交方法
            this.$refs.upload.submit();
          } else if (this.currentType === 'download') { //下载提交方法
            this.downloadLoading = true;
            let param = {
              sessionNumber: gear.sessionNumber,
              exhibitionPeriod: gear.exhibitionPeriod,
              exhibitionAreaName: exhibitionAreaItem[0],
              exhibitionAreaCode: exhibitionAreaItem[1],
              exhibitionProperty: gear.exhibitionProperty,
              boothSpecialArea: gear.zhuanqu,
              exhibitionKind: gear.exhibitionKind
            };
            const http = axios.create({
              headers: { Token: localStorage.getItem('USER_TOKEN') },
              responseType: 'blob',
              timeout: 60000
            });
            http.get(this.config.api.download, { params: param })
              .then(res => {
                this.dialogVisible = false;
                this.downloadLoading = false;
                let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
                if (window.navigator.msSaveOrOpenBlob) {
                  //如果是ie浏览器
                  navigator.msSaveBlob(blob, '位置安排方案模板.xls'); //下载路径为默认路径
                } else {
                  let downloadElement = document.createElement('a');
                  let href = window.URL.createObjectURL(blob); //创建下载的链接
                  downloadElement.href = href;
                  downloadElement.download = '位置安排方案模板.xls'; //下载后文件名
                  document.body.appendChild(downloadElement);
                  downloadElement.click(); //点击下载
                  document.body.removeChild(downloadElement); //下载完成移除元素
                  window.URL.revokeObjectURL(href); //释放掉blob对象
                }
              });
          } else if (this.currentType === 'autoArrange') { //自动安排提交方法
            this.downloadLoading = true;
            let params = {
              schemeName: gear.schemeName,
              sessionNumber: gear.sessionNumber,
              exhibitionPeriod: gear.exhibitionPeriod,
              exhibitionAreaName: exhibitionAreaItem[0],
              exhibitionAreaCode: exhibitionAreaItem[1],
              exhibitionProperty: gear.exhibitionProperty
              // arrangeByDrawValue: gear.arrangeByDrawValue,
              // arrangeByBoothQuantityValue: gear.arrangeByBoothQuantityValue,
              // arrangeByCantonCodeOrRandomValue: gear.arrangeByCantonCodeOrRandomValue,
              // arrangeByExhibitionBoothNumberValue: gear.arrangeByExhibitionBoothNumberValue
            };
            this.$http.post(this.config.api.autoArrange, params)
              .then((res) => {
                this.downloadLoading = false;
                let autoObj = { autoArrangeRow: res, exhibitionState: this.exhibitionState, ...this.gear };
                this.dialogVisible = false;
                this.$router.push({ path: '/stallplanDemo/seatArea?primarycolor=2b579a', query: { scopeRow: autoObj, tag: 'gearDialog', pluginBtnState: true, addState: true, notValidateArray: [] }});
              });
          } else { //在线安排提交方法
            this.dialogVisible = false;
            this.$router.push({ path: '/stallplanDemo/seatArea?primarycolor=2b579a', query: { scopeRow: this.gear, tag: 'gearDialog', pluginBtnState: true, addState: true, notValidateArray: [] }});
          }
        }
      });
    },
    //弹框关闭清除方法
    clear () {
      this.$refs.gear.resetFields();
      this.file = [];
      this.exhibitionAreaRow = [];
      this.exhibitionTypeRow = [];
      this.specialAreaRow = [];
      this.allSpecialAreaRow = [];
      this.exhibitionPeriodRow = [];
      this.radioArray = [];
      this.radioState = false; //是否存在展厅图状态
      this.selectExhibitionRows = [];
      this.gear = {
        schemeName: '',
        sessionNumber: '',
        exhibitionPeriod: '',
        exhibitionAreaName: '',
        exhibitionProperty: '',
        isCentralPassage: '',
        exhibitionKind: '',
        makeSure: []
      };
    },
    //文件删除方法
    handleRemove () {
      this.uploadFileState = false;
      this.rules.files = [{ required: true, message: this.languageSource.LocationLang.selectFileMsg, trigger: 'change' }];
    },
    //文件改变方法
    handleChange (file, fileList) {
      if (!this.uploadFileState && fileList.length) {
        this.rules.files = [];
        this.$refs.gear.clearValidate(['files']);
      } else {
        this.rules.files = [{ required: true, message: this.languageSource.LocationLang.selectFileMsg, trigger: 'change' }];
        this.uploadFileState = false;
      }
    },
    //文件上传成功
    handleSuccess (res) {
      this.uploadingState = false;
      if (res.errorCode === 'OTHER') {
        this.file = [];
        this.uploadFileState = true;
        this.$message.error(res.message);
      } else if (res.flag === '0') {
        this.file = [];
        this.uploadFileState = true;
        this.$message.error(this.languageSource.LocationLang.importFail);
      } else {
        this.dialogVisible = false;
        this.uploadFileState = false;
        res.data.reevaluationState = true;
        this.$router.push({ path: '/stallplanDemo/seatArea?primarycolor=2b579a',
          query: { scopeRow: res.data, tag: 'gearDialog', pluginBtnState: true, addState: true, notValidateArray: [] }});
      }
    },
    //获取展会界数
    getSessionNumber () {
      this.$http.get(this.config.api.getsessionNumber)
        .then(res => {
          this.currentSession = res.exhibitionNum;
          this.gear.sessionNumber = res.exhibitionNum;
          this.getExhibitionAreaRow(res.exhibitionNum);
        });
    },
    //根据展区展期信息查询布展类型信息
    getExhibitionArea (val) {
      let param = {
        exhibitionNum: this.currentSession,
        exhibitionAreaCode: this.gear.exhibitionAreaName.split(',')[1],
        periodCode: val
      };
      //重新选择时清除数据
      if (this.radioArray.length > 0) {
        this.gear.isCentralPassage = '';
        this.gear.exhibitionProperty = '';
        this.radioArray = [];
        this.selectExhibitionRows = [];
        this.exhibitionTypeRow = [];
        this.rules.isCentralPassage = [
          { required: true, message: this.languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
        ];
      }
      this.$http.get(this.config.api.getHallInfo, param)
        .then(res => {
          let exhibitionTypes = res.exhibitionTypes; //布展类型数据
          let status = res.status; //是否中央通道选择状态 0：全部是非中央通道，1：全部是中央通道，2：两者都有，3：没有发布的图纸展位数据
          let rows = [];
          let radioTempArray = [];
          this.radioState = false;
          if (status === '0') {
            radioTempArray = [
              {
                label: '否',
                value: '0'
              }
            ];
          } else if (status === '1') {
            radioTempArray = [
              {
                label: '是',
                value: '1'
              }
            ];
          } else if (status === '2') {
            radioTempArray = [
              {
                label: '否',
                value: '0'
              }, {
                label: '是',
                value: '1'
              }
            ];
          } else if (status === '3') {
            this.rules.isCentralPassage = [];
            this.$refs.gear.clearValidate(['isCentralPassage']);
            this.radioState = true;
          }
          this.radioArray = radioTempArray;
          exhibitionTypes.forEach((item, index) => {
            let singleItem = this.exhibitionTypeOption.filter(v => v.value === item)[0];
            let obj = {
              label: singleItem.label,
              value: item
            };
            rows.push(obj);
          });
          this.selectExhibitionRows = rows;
        });
    },
    //获取展区对应的展期信息
    getSpecialArea (val) {
      //重新选择时清除数据
      if (this.exhibitionPeriodRow.length > 0) {
        this.gear.exhibitionPeriod = '';
        this.gear.exhibitionKind = '';
        this.gear.isCentralPassage = '';
        this.gear.exhibitionProperty = '';
        this.exhibitionPeriodRow = [];
        this.exhibitionTypeRow = [];
        this.selectExhibitionRows = [];
        this.radioArray = [];
        this.rules.isCentralPassage = [
          { required: true, message: this.languageSource.RuleSettingLang.selectOneMsg, trigger: 'change' }
        ];
      }
      if (!val || val === '') {
        return false;
      }
      let param = {
        exhibitionNum: this.currentSession, // 展届
        exhibitionAreaCode: val.split(',')[1]//展区编码
      };
      this.$http.get(this.config.api.getAuthPeriods, param)
        .then(res => {
          let exhibitionRow = [];
          res.forEach((item, index) => {
            let obj = {
              label: '第' + item + '期',
              value: item
            };
            exhibitionRow.push(obj);
          });
          this.exhibitionPeriodRow = exhibitionRow;
        });
    },
    //展位性质改变
    exhibitionChange (val) {
      if (!val || val === "") {
        this.exhibitionTypeRow = [];
        return false;
      }
      this.gear.exhibitionKind = '';
      if (val.indexOf('品牌') >= 0) {
        this.exhibitionTypeRow = this.selectExhibitionRows.filter(v => v.label.indexOf('特装') >= 0);
      } else if (val.indexOf('一般') >= 0) {
        this.exhibitionTypeRow = this.selectExhibitionRows.filter(v => v.label !== '中央通道');
      }
    },
    //获取自动安排记录
    getRules () {
      this.$http.get(this.config.api.getRules)
        .then(res => {
          let arrangeByBoothObj = {
            label: res.arrangeByBoothQuantity,
            text: res.arrangeByBoothQuantityValue === 1 ? '从高到低' : '从低到高'
          };
          let arrangeByCantonObj = {
            label: res.arrangeByCantonCodeOrRandom,
            text: res.arrangeByCantonCodeOrRandomValue === 1 ? '广交会编码' : '随机'
          };
          let arrangeByDrawObj = {
            label: res.arrangeByDraw,
            text: res.arrangeByDrawValue === 1 ? '从小到大' : '从大到小'
          };
          let text = '';
          if (res.arrangeByExhibitionBoothNumberValue === '1') {
            text = '从小到大';
            this.exhibitionState = 'esc';
          } else if (res.arrangeByExhibitionBoothNumberValue === '2') {
            text = '从大到小';
            this.exhibitionState = 'desc';
          } else if (res.arrangeByExhibitionBoothNumberValue === '3') {
            text = '随机';
            this.exhibitionState = 'esc';
          }
          let arrangeByExhibitionObj = {
            label: res.arrangeByExhibitionBoothNumber,
            text: text
          };
          this.rulesInfoArr.push(arrangeByDrawObj); //按交易团抽签号安排
          this.rulesInfoArr.push(arrangeByBoothObj); //按展位数量
          this.rulesInfoArr.push(arrangeByCantonObj); //展位数量相同
          this.rulesInfoArr.push(arrangeByExhibitionObj); //按展区/专区的展位编号
        });
    },
    //根据当前用户查询展区信息
    getExhibitionAreaRow (currentSession) {
      let param = {
        exhibitionNum: currentSession // 展届
      };
      this.$http.get(this.config.api.getAuthAreas, param)
        .then(res => {
          let areaRow = [];
          res.forEach((item, index) => {
            let itemValue = item.exhibitionAreaName + ',' + item.exhibitionAreaCode;
            let obj = {
              label: item.exhibitionAreaName,
              value: itemValue
            };
            areaRow.push(obj);
          });
          this.exhibitionAreaRow = areaRow;
        });
    }
  }
};
</script>

<style scoped>
.common-style {
  width: 100%;
}
.tip-text {
  color: #e6a23c;
}
.tip-margin {
  margin-left: 10px;
}
.col-style {
  display: inline;
}
</style>
