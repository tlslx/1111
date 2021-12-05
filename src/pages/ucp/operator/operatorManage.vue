<template>
  <el-page ref="operator">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'? languageSource.CommonLang.add :child.action==='edit'? languageSource.CommonLang.edit : languageSource.CommonLang.view) + languageSource.CommonPayLang.collector" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form class="form_class" :model="child" :rules="childRules" ref="child" label-position="right" label-width="100px" :disabled="(child.action==='view'?true:false)" inline>
            <el-form-item :label="languageSource.CommonPayLang.collectorAccount" prop="operatorAccount">
              <el-input @blur="getAccount" @keyup.enter.native="getAccount" v-model="child.operatorAccount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.name" prop="operatorName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.operatorName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.mobilephone" prop="operatorMobile">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.operatorMobile" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.groupCategory" prop="operatorGroup">
              <el-dropdown-list class="inputclass" :placeholder="languageSource.CommonLang.select" v-model="child.operatorGroup" :url="api.getOperatorGroups" text-field="groupName" value-field="id" :params="{OrderModelField: [{OrderByField: 'groupName',asc: true}]}" :allow-create="false" :filterable="true" :clearable="true"></el-dropdown-list>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.upperAdmin" prop="upperAdmin">
              <el-select v-model="child.upperAdmin" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass">
                <el-option v-for="item in source.upperAdmins" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.collectProject" prop="cashierCategory">
              <el-select v-model="child.cashierCategory" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass">
                <el-option v-for="item in source.cashierCategories" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.sex" prop="sex">
              <el-select v-model="child.sex" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass">
                <el-option v-for="item in source.sex" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.email" prop="email">
              <el-input v-model="child.email" class="inputclass" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.idCard" prop="idCard">
              <el-input v-model="child.idCard" class="inputclass" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.state" prop="state">
              <el-switch active-color="#13ce66" inactive-color="#cccccc" v-model="child.state" active-value="1" inactive-value="2"></el-switch>
            </el-form-item>
            <el-input v-model="child.operatorUserId" style="display:none;"></el-input>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="child.action !=='view'" type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{ languageSource.CommonLang.confirm }}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonLang.cancel }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.collectorsManage" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.collectorAccount" prop="operatorAccount">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.operatorAccount" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.groupCategory" prop="operatorGroup">
            <el-dropdown-list class="inputclass" :placeholder="languageSource.CommonLang.select" v-model="forms.operatorGroup" :url="api.getOperatorGroups" text-field="groupName" value-field="id" :params="{OrderModelField: [{OrderByField: 'groupName',asc: true}]}" :allow-create="false" :filterable="true" :clearable="true"></el-dropdown-list>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.collectProject" prop="cashierCategory">
            <el-select v-model="forms.cashierCategory" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.cashierCategories" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" v-if="right('collectorManageQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('collectorManageReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.state" prop="state">
            <el-select v-model="forms.state" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange" :pageIndex="pageIndex">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="operatorAccount" :label="languageSource.CommonPayLang.collectorAccount" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorUsername" :label="languageSource.CommonPayLang.username" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorName" :label="languageSource.CommonPayLang.name" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorMobile" :label="languageSource.CommonPayLang.mobilephone" width="140" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorGroupName" :label="languageSource.CommonPayLang.groupCategory" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="upperAdmin" :label="languageSource.CommonPayLang.upperAdmin" width="100" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.upperAdmins,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="cashierCategory" :label="languageSource.CommonPayLang.collectProject" width="100" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.cashierCategories,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="state" :label="languageSource.CommonPayLang.state" width="110" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" inactive-color="#cccccc" v-model="scope.row.state" active-value="1" inactive-value="2" @change="updateStatus(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('collectorManageEdit')" @click="editList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.edit }}</el-button>
                <el-button type="text" v-if="right('collectorManageView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.view }}</el-button>
                <el-button type="text" v-if="right('collectorManageDelete')" @click="deleteData(scope.row)">{{ languageSource.CommonLang.delete }}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <div class="button_class">
                <el-upload :action="api.uploadUrl" accept=".xls,.xlsx" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :show-file-list="false" :headers="headers">
                  <el-button type="primary" icon="el-icon-plus" v-if="right('collectorManageImport')">{{ languageSource.CommonPayLang.import }}</el-button>
                </el-upload>
              </div>
              <div class="button_class">
                <el-button type="primary" icon="el-icon-plus" v-if="right('collectorManageBatchAdd')" @click="onAdd">{{ languageSource.CommonLang.add }}</el-button>
              </div>
              <div class="button_class">
                <el-button type="primary" icon="el-icon-plus" v-if="right('collectorManageBatchDelete')" @click="onDel">{{ languageSource.CommonLang.delete }}</el-button>
              </div>
              <div class="button_class">
                <el-button type="primary" icon="el-icon-plus" v-if="right('collectorManageBatchDisable')" @click="onStop">{{ languageSource.CommonPayLang.disable }}</el-button>
              </div>
              <div class="button_class">
                <el-button type="primary" icon="el-icon-plus" v-if="right('collectorManageBatchEnable')" @click="onEnable">{{ languageSource.CommonPayLang.enable }}</el-button>
              </div>
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>

import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
import request from "@/scripts/framework/http";
import store from '@/scripts/framework/store/index.js';
export default {
  name: "collectorManage",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "collectorManage",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/getSingleById",
        add: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/add",
        update: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/updateById",
        delete: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/deleteById",
        deletes: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/deleteByIds",
        updateStatus: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/updateState",
        uploadUrl: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/upload",
        enables: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/updateEnableStates",
        stops: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/updateStopStates",
        getOperatorGroups: kindo.config.api.unifiedCollectUrl + "/api/basicData/operatorGroup/getListAll",
        getInfoByAccount: kindo.config.api.baseUrl + "/api/sysUser/getSingleByAccount"
      },
      headers: { "Token": store.getters.token },
      forms: {
        state: "",
        operatorAccount: "",
        operatorGroup: "",
        cashierCategory: ""
      },
      // 弹出框
      child: {
        id: "",
        operatorAccount: "",
        operatorName: "",
        operatorMobile: "",
        operatorGroup: "",
        upperAdmin: "",
        cashierCategory: "",
        sex: "1",
        email: "",
        idCard: "",
        state: "1",
        operatorUserId: ""
      },
      formsRules: {},
      childRules: {},
      source: {
        states: [],
        upperAdmins: [],
        sex: [],
        cashierCategories: []
      },
      childVisible: false,
      multipleSelection: [],
      pageIndex: false
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

    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    let validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.invalidChar));
      } else {
        return callback();
      }
    };

    this.formsRules = {
      operatorAccount: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ]
    };

    this.childRules = {
      operatorAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.collectorAccount, trigger: "blur" },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      operatorName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.name, trigger: "blur" },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      operatorMobile: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.mobilephone, trigger: "change" },
        { pattern: kindo.validate.pattern.iMobile, message: this.languageSource.CommonPayLang.mobilePhoneNum + this.languageSource.CommonPayLang.illegal, trigger: 'blur' }
      ],
      operatorGroup: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.groupCategory, trigger: "change" }
      ],
      upperAdmin: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.upperAdmin, trigger: "change" }
      ],
      cashierCategory: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.collectProject, trigger: "change" }
      ],
      email: [
        { required: true, trigger: "blur", validator: this.checkDedicatedEmail }
      ],
      idCard: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.idCard, trigger: "blur" },
        { pattern: kindo.validate.pattern.creditLetterCode, message: this.languageSource.CommonPayLang.idCard + this.languageSource.CommonPayLang.illegal, trigger: 'blur' }
      ]
    };

    this.source.states = [{ value: "1", label: this.languageSource.CommonPayLang.enable }, { value: "2", label: this.languageSource.CommonPayLang.disable }];
    this.source.upperAdmins = [{ value: "1", label: "所属管理员1" }, { value: "2", label: "所属管理员2" }];
    this.source.sex = [{ value: "1", label: this.languageSource.CommonPayLang.male }, { value: "2", label: this.languageSource.CommonPayLang.female }];
    this.source.cashierCategories = await kindo.dictionary.get('cashierCategory');
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
          _this.$message.success(this.languageSource.CommonLang.operationSuccess);
          this.$refs.table.reloadData();
        })
        .catch(error => {
          _this.$message.error(error);
        });
    },
    getAccount() {
      this.$http.get(this.api.getInfoByAccount, { "account": this.child.operatorAccount }).then((data) => {
        this.child.operatorUserId = data.userId;
        this.child.operatorName = data.userName;
        this.child.operatorMobile = data.mobile;
        this.child.email = data.email;
        this.child.idCard = data.idCard;
        this.child.sex = data.sex;
      }).catch((data) => {
        kindo.util.confirm(this.languageSource.CommonPayLang.addCountConfirm, undefined, undefined, () => {

        }, () => {
          this.child.operatorAccount = "";
          this.childVisible = false;
            
        });
      });
    },
    // 保存提交数据
    diagsave() {
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
            kindo.util.alert(this.languageSource.CommonPayLang.dataSaveSuccess, "success");
          }).catch(error => {
            this.$message.error(error);
          });
        }
      });
    },
    handleBeforeUpload(file) {
      if (file.size >= 10 * 1024 * 1024) {
        this.$message({ message: this.languageSource.CommonPayLang.fileSizeNotExceed10MB, type: "warning" });
        return false;
      }
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (extension !== "xlsx" && extension !== "xls") {
        this.$message({ message: this.languageSource.CommonPayLang.excelFileOnly, type: "warning" });
        return false;
      }
      return true;
    },
    handleSuccess(response, file) {
      if (response.flag === "1") {
        this.$message({ message: this.languageSource.CommonPayLang.importSuccess });
        this.$refs.table.reloadData();
      } else {
        this.$message({ message: this.languageSource.CommonPayLang.importFail });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onDel() {
      this.commonRequest(this.api.deletes);
    },
    onStop() {
      this.commonRequest(this.api.stops);
    },
    onEnable() {
      this.commonRequest(this.api.enables);
    },
    commonRequest(url) {
      let title = (url === this.api.deletes) ? this.languageSource.CommonPayLang.confirmBatchDelete : (url === this.api.enables) ? this.languageSource.CommonPayLang.confirmBatchEnable : this.languageSource.CommonPayLang.confirmBatchDisable;
      let success = (url === this.api.deletes) ? this.languageSource.CommonPayLang.batchDeleteSuccess : (url === this.api.enables) ? this.languageSource.CommonPayLang.batchEnableSuccess : this.languageSource.CommonPayLang.batchDisableSuccess;
      let fail = (url === this.api.deletes) ? this.languageSource.CommonPayLang.batchDeleteFail : (url === this.api.enables) ? this.languageSource.CommonPayLang.batchEnableFail : this.languageSource.CommonPayLang.batchDisableFail;

      if (this.multipleSelection.length) {
        this.$confirm(title, this.languageSource.CommonLang.tips, { type: "warning" })
          .then(() => {
            request
              .postJson(url, this.multipleSelection)
              .then(data => {
                this.$message.success(success);
                this.onResetQuery();
              })
              .catch(error => {
                this.$message.error(fail);
              });
          });
      } else {
        this.$message({ message: this.languageSource.CommonPayLang.atLeastSelectOne });
      }
    },
    deleteData(row) {
      this.child.action = 'delete';
      kindo.util.confirm(this.languageSource.CommonPayLang.deleteWarning, undefined, undefined, () => {
        this.$http.postJson(this.api.delete, { id: row.id }).then((res) => {
          kindo.util.alert(this.languageSource.CommonLang.deleteSuccess, this.languageSource.CommonLang.tips, 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    checkDedicatedEmail(rule, value, callback) {
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === '') {
        return callback(this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.email);
      } else if (!reg.test(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.email + this.languageSource.CommonPayLang.invalid));
      } else {
        return callback();
      }
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
  width: 160px !important;
}
.button_class {
  display: inline-block;
  margin-left: 10px;
}
.form_class .el-form-item {
  margin-bottom: 20px;
}
</style>