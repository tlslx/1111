<template>  
  <el-page ref="operatorGroupManage">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'?source.comLanguage.add:child.action==='edit'?source.comLanguage.edit:source.comLanguage.view)+' '+source.language.billConfig" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="80%">
        <kindo-box>
          <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="150px" inline>
            <el-form-item :label="source.language.billConfigBankName" prop="bankName">
              <el-input :placeholder="source.language.inputBillConfigBankName" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.bankName" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.billConfigBankCode" prop="bankCode">
              <el-select :disabled="child.action =='view'" v-model="child.bankCode" :clearable="true" :placeholder="source.language.inputBillConfigBankCode" class="inputclass">
                <el-option v-for="item in source.bankCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>            
            <el-form-item :label="source.language.nativeFtpUrl" prop="localPath">
              <el-input :placeholder="source.language.inputNativeFtpUrl" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.localPath" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.getFileMethod" prop="sourceType">
              <el-select :disabled="child.action =='view'" v-model="child.sourceType" :clearable="true" :placeholder="source.language.inputGetFileMethod" class="inputclass">
                <el-option v-for="item in source.sourceTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>            
            <el-form-item :label="source.language.oSOfFtp" prop="ftpOs">
              <el-select :disabled="child.action =='view'" v-model="child.ftpOs" :clearable="true" :placeholder="source.language.inputOSOfFtp" class="inputclass">
                <el-option v-for="item in source.ftpOss" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>            
            <el-form-item :label="source.language.ftpIpAddress" prop="ftpIp">
              <el-input :placeholder="source.language.inuptFtpIpAddress" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.ftpIp" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.ftpDir" prop="ftpFilePath">
              <el-input :placeholder="source.language.inputFtpDir" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.ftpFilePath" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.ftpPort" prop="ftpPort">
              <el-input :placeholder="source.language.InputFtpPort" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.ftpPort" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.ftpUserName" prop="ftpUserName">
              <el-input :placeholder="source.language.inputFtpUserName" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.ftpUserName" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.ftpPassword" prop="ftpPassword">
              <el-input :placeholder="source.language.inputFtpPassword" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.ftpPassword" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.billConfigFileName" prop="filename">
              <el-input :placeholder="source.language.inputBillConfigFileName" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.filename" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.readStartLine" prop="startRow">
              <el-input :placeholder="source.language.inputReadStartLine" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.startRow" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.splitChar" prop="splitChar">
              <el-input :placeholder="source.language.inputSplitChar" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.splitChar" class="inputclass"></el-input>
            </el-form-item>            
            <el-form-item :label="source.language.isEscape" prop="isEscape">
              <el-select :disabled="child.action =='view'" v-model="child.isEscape" :clearable="true" :placeholder="source.language.selectIsEscape" class="inputclass">
                <el-option v-for="item in source.isEscapes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>                 
            <el-form-item :label="source.language.amountUnit" prop="amountUnit">
              <el-select :disabled="child.action =='view'" v-model="child.amountUnit" :clearable="true" :placeholder="source.language.selectAmountUnit" class="inputclass">
                <el-option v-for="item in source.amountUnits" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>                 
            <el-form-item :label="source.language.billConfigDate" prop="dateFormat">
              <el-date-picker
                v-model="child.dateFormat"
                type="date"
                :disabled="child.action =='view'"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                :placeholder="source.language.selectBillConfigDate"
              ></el-date-picker>
            </el-form-item>                 
            <el-form-item :label="source.language.dateAddday" prop="dateAddday">
              <el-input :placeholder="source.language.inputDateAddday" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.dateAddday" class="inputclass"></el-input>
            </el-form-item>    
            <el-form-item :label="source.language.swiftTime" prop="swiftTime">
              <el-time-picker
                :disabled="child.action =='view'"
                @blur="(ev)=>ev.target.value = ev.target.value.trim()"
                v-model="child.swiftTime"
                format="HH:mm"
                value-format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                :placeholder="source.language.inputSwiftTime">
              </el-time-picker>
              <!-- <el-input placeholder="请输入扎帐时间" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.swiftTime" class="inputclass"></el-input> -->
            </el-form-item>    
            <el-form-item :label="source.language.timeSchedule" prop="timeSchedule">
              <el-input :placeholder="source.language.inputTimeSchedule" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.timeSchedule" class="inputclass"></el-input>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="child.action !=='view'" type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{source.comLanguage.confirm}}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{source.comLanguage.cancel}}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="source.language.billConfigManage" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
            <el-form-item :label="source.language.billConfigBankName" prop="bankName">
                <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.bankName" class="inputclass" :clearable="true"></el-input>
            </el-form-item>            
            <el-form-item>
                <el-button v-if="right('billConfigQuery')" icon="el-icon-search" type="primary" @click="onQuery">{{source.comLanguage.query}}</el-button>
                <el-button v-if="right('billConfigReset')" type="info" @click="onResetQuery">{{source.comLanguage.reset}}</el-button>
            </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="bankName" :label="source.language.billConfigBankName" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankCode" :label="source.language.billConfigBankCode" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="localPath" :label="source.language.nativeFtpUrl" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sourceType" :formatter="formatSourceType" :label="source.language.getFileMethod" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="ftpOs" :formatter="formatFtpOs" :label="source.language.oSOfFtp" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="ftpIp" :label="source.language.ftpIpAddress" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="ftpFilePath" :label="source.language.ftpDir" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="ftpPort" :label="source.language.ftpPort" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="ftpUserName" :label="source.language.ftpUserName" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="ftpPassword" :label="source.language.ftpPassword" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="filename" :label="source.language.billConfigFileName" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="startRow" :label="source.language.readStartLine" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="splitChar" :label="source.language.splitChar" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="isEscape" :formatter="formatIsEscape" :label="source.language.isEscape" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="amountUnit" :formatter="formatAmountUnit" :label="source.language.amountUnit" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="dateFormat" :label="source.language.billConfigDate" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="dateAddday" :label="source.language.dateAddday" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="swiftTime" :label="source.language.swiftTime" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="timeSchedule" :label="source.language.inputSwiftTime" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="source.comLanguage.creatorDate" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="modifyDate" :label="source.comLanguage.modifyDate" width="200" show-overflow-tooltip header-align="center"></el-table-column>   
            <el-table-column :label="source.comLanguage.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button v-if="right('billConfigUpdate')" type="text" :title="source.comLanguage.edit" @click="editList(scope.row,'id', 'child', api.getbyid)">{{source.comLanguage.edit}}</el-button>
                <el-button v-if="right('billConfigView')" type="text" :title="source.comLanguage.view" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{source.comLanguage.view}}</el-button>
                <el-button v-if="right('billConfigDelete')" type="text" :title="source.comLanguage.delete" @click="deleteList(scope.row,'id', 'child', api.delete)">{{source.comLanguage.delete}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <!-- <el-button v-if="right('billConfigAdd')"   type="primary"  icon="el-icon-plus" @click="onAdd">{{source.comLanguage.add}}</el-button> -->
              <el-button type="primary"  icon="el-icon-plus" @click="onAdd">{{source.comLanguage.add}}</el-button>
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import request from "@/scripts/framework/http";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "operator",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "billConfig",
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/basicData/billConfig/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/basicData/billConfig/getSingleById",
        add: kindo.config.api.unifiedCollectUrl + "/api/basicData/billConfig/add",
        update: kindo.config.api.unifiedCollectUrl + "/api/basicData/billConfig/updateById",
        delete: kindo.config.api.unifiedCollectUrl + "/api/basicData/billConfig/deleteById"
      },
      forms: {
        bankName: ""
      },
      // 弹出框
      child: {
        id: "",
        amountUnit: '', 
        bankCode: '',
        bankName: '', 
        dateAddday: '', 
        dateFormat: '', 
        filename: '', 
        ftpFilePath: '', 
        ftpIp: '', 
        ftpOs: '', 
        ftpPassword: '', 
        ftpPort: '', 
        ftpUserName: '',
        isEscape: '', 
        localPath: '', 
        sourceType: '', 
        splitChar: '', 
        startRow: '', 
        swiftTime: '', 
        timeSchedule: '' 
      },
      formsRules: {},
      childRules: {},
      source: {
        bankCodes: [
          { value: "ccb", label: "ccb" },
          { value: "icbc", label: "icbc" }
        ],
        sourceTypes: [
          { value: 1, label: "在本地文件中获取" },
          { value: 2, label: "去ftp目录下读取" },
          { value: 2, label: "从接口获取" }
        ],
        isEscapes: [{ value: 1, label: "是" }, { value: 2, label: "否" }],
        amountUnits: [{ value: "1", label: "元" }, { value: "2", label: "分" }],
        ftpOss: [{ value: "1", label: "linux" }, { value: "2", label: "windows" }],
        comLanguage: [],
        language: []
      },
      childVisible: false
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
    this._child = Object.assign({}, this.child);
    this.source.comLanguage = kindo.util.getLanguage('CommonLang');
    this.source.language = kindo.util.getLanguage('CommonPayLang');

    this.formsRules = {
      bankName: [
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" }
      ]
    };

    this.childRules = {
      bankName: [
        { required: true, message: this.source.language.inputBillConfigBankName, trigger: 'blur' },
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" }
      ],
      bankCode: [
        { required: true, message: this.source.language.inputBillConfigBankCode, trigger: 'blur' }
      ],
      localPath: [
        { max: 200, message: this.source.language.max200, trigger: "blur" }
      ],
      sourceType: [
        { required: true, message: this.source.language.inputGetFileMethod, trigger: 'blur' }
      ],
      ftpIp: [
        { max: 30, message: this.source.language.max30, trigger: "blur" }
      ],
      ftpFilePath: [
        { max: 30, message: this.source.language.max30, trigger: "blur" }
      ],
      ftpPort: [
        { max: 30, message: this.source.language.max30, trigger: "blur" }
      ],
      ftpUserName: [
        { max: 20, message: this.source.language.max20, trigger: "blur" }
      ],
      ftpPassword: [
        { max: 20, message: this.source.language.max20, trigger: "blur" }
      ],
      filename: [
        { max: 30, message: this.source.comLanguage.max30, trigger: "blur" }
      ],
      startRow: [
        { pattern: kindo.validate.pattern.integer, message: this.source.language.readStartLineOnlyNum, trigger: 'blur' },
        { max: 1, message: this.source.language.max1, trigger: "blur" }
      ],
      splitChar: [
        { max: 2, message: this.source.language.max2, trigger: "blur" }
      ],
      isEscape: [
        { required: true, message: this.source.language.selectIsEscape, trigger: 'blur' }
      ],
      amountUnit: [
        { required: true, message: this.source.language.selectAmountUnit, trigger: 'blur' }
      ],
      dateFormat: [
        { required: true, message: this.source.language.selectBillConfigDate, trigger: 'blur' }
      ],
      dateAddday: [ 
        { required: true, message: this.source.language.inputDateAddday, trigger: 'blur' },
        { pattern: kindo.validate.pattern.integer, message: this.source.language.addDayOnlyNum, trigger: 'blur' },
        { max: 1, message: this.source.language.max1, trigger: "blur" }
      ],
      swiftTime: [
        { required: true, message: this.source.language.inputSwiftTime, trigger: 'blur' },
        { max: 10, message: this.source.language.max10, trigger: "blur" }
      ],
      timeSchedule: [
        { required: true, message: this.source.language.inputTimeSchedule, trigger: 'blur' },
        { max: 20, message: this.source.language.max20, trigger: "blur" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$refs.table.loadData();
        }
      });
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    onAdd() {
      this.childVisible = true;
      // 初始化数据
      this.$nextTick(function () {
        this.child = Object.assign({}, this._child);
        this.child.action = 'add';
        this.$refs['child'].resetFields();
      });
    },
    updateStatus(row) {
      let _this = this;
      request
        .postJson(_this.api.updateStatus, row)
        .then(data => {
          _this.$message.success(_this.source.comLanguage.operationSuccess);
          this.$refs.table.reloadData();
        })
        .catch(error => {
          _this.$message.error(_this.source.comLanguage.opratorFail);
        });
    },
    // 保存提交数据
    diagsave() {
      let _this = this;
      this.$refs.child.validate(valid => {
        if (valid) {
          let url = "";
          if (this.child.action === 'add') {
            url = this.api.add;
          } else if (this.child.action === 'edit') {
            url = this.api.update;
          }
          this.$http.postJson(url, this.child).then(res => {
            this.childVisible = false;
            this.$refs.table.reloadData();
            kindo.util.alert(_this.source.language.saveSuccess, "success");
          });
        }
      });
    },
    formatSourceType(row, column, cellValue, index) {
      let sourceType = { 1: '在本地文件中获取', 2: '去ftp目录下读取', 3: '从接口中获取' };
      return sourceType[cellValue];
    },
    formatFtpOs(row, column, cellValue, index) {
      let ftpOs = { "1": 'linux', "2": 'windows' };
      return ftpOs[cellValue];
    },
    formatIsEscape(row, column, cellValue, index) {
      let isEscape = { 1: '是', 2: '否' };
      return isEscape[cellValue];
    },
    formatAmountUnit(row, column, cellValue, index) {
      let amountUnit = { "1": '元', "2": '分' };
      return amountUnit[cellValue];
    }
  }
};
</script>
<style lang="scss" scoped>
.shortclass {
  width: 140px !important;
  margin-right: 5px;
}
.inputclass {
  width: 300px !important;
}
.button_class {
  display: inline-block;
  margin-left: 20px;
}
</style>