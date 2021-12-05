<template>
  <el-page ref="enterpriseOperator">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'?source.comLanguage.add:child.action==='edit'?source.comLanguage.edit:source.comLanguage.view)+source.language.enterpriseOperator" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="80%">
        <kindo-box>
          <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="120px" inline>
            <el-form-item :label="source.language.enterpriseOperatorName" prop="operatorName">
              <el-input :disabled="child.action =='view'" auto-complete="off" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.operatorName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.enterpriseOperatorRechargeAccount" prop="account">
              <el-select :disabled="child.action =='view'" v-model="child.account" :clearable="true" :placeholder="source.language.selectRechargeAccount" class="inputclass">
                <el-option v-for="item in source.accounts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="source.language.mobilePhoneNum" prop="operatorTele">
              <el-input :disabled="child.action =='view'" auto-complete="off" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.operatorTele" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.idCard" prop="operatorIdCard">
              <el-input :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.operatorIdCard" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.payPassword" prop="payPassword" style="display:none">
              <el-input :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.payPassword" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.payPassword" prop="payPasswordShow">
              <el-input @compositionstart.native="pswCompositionstart" @compositionend.native="pswCompositionend" @input.native="dealInput($event)" @focus="clearPass" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.payPasswordShow" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.state" prop="accountState">
              <el-select :disabled="child.action =='view'" v-model="child.accountState" :clearable="true" :placeholder="source.language.selectState" class="inputclass">
                <el-option v-for="item in source.accountStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="child.action !=='view'" type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{source.comLanguage.confirm}}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{source.comLanguage.cancel}}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="source.language.enterpriseOperatorManage" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.enterpriseOperatorRechargeAccount" prop="account">
            <el-select v-model="forms.account" :placeholder="source.language.selectRechargeAccount" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.accounts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>    
          <el-form-item :label="source.language.mobilePhoneNum" prop="operatorTele">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.operatorTele" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.state" prop="accountState">
            <el-select v-model="forms.accountState" :placeholder="source.language.selectState" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.queryAccountStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>    
          <el-form-item>
            <el-button v-if="right('enterprise_operatorQuery')" icon="el-icon-search" type="primary" @click="onQuery">{{source.comLanguage.query}}</el-button>
            <el-button v-if="right('enterprise_operatorReset')" type="info" @click="onResetQuery">{{source.comLanguage.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="account" :label="source.language.enterpriseOperatorRechargeAccount" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorName" :label="source.language.enterpriseOperatorName" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorTele" :label="source.language.mobilePhoneNum" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorIdCard" :label="source.language.idCard" align="center" :formatter="formatIdCard" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="accountState" align="center" :label="source.language.state" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" inactive-color="#cccccc" v-model="scope.row.accountState" active-value="1" inactive-value="2" @change=updateStatus(scope.row)>
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="source.comLanguage.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button v-if="right('enterprise_operatorUpdate')" type="text" :title="source.comLanguage.edit" @click="editList(scope.row,'id', 'child', api.getbyid)">{{source.comLanguage.edit}}</el-button>
                <el-button v-if="right('enterprise_operatorView')" type="text" :title="source.comLanguage.view" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{source.comLanguage.view}}</el-button>
                <el-button v-if="right('enterprise_operatorDelete')" type="text" :title="source.comLanguage.delete" @click="deleteData(scope.row)">{{source.comLanguage.delete}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button type="primary" v-if="right('enterprise_operatorAdd')" icon="el-icon-plus" @click="onAdd">{{source.comLanguage.add}}</el-button>
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
      pageId: "enterprise_operator",
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/enterpriseOperator/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/enterpriseOperator/getSingleEnterpriseOperator",
        add: kindo.config.api.unifiedCollectUrl + "/api/enterpriseOperator/saveEnterpriseOperator",
        update: kindo.config.api.unifiedCollectUrl + "/api/enterpriseOperator/updateEnterpriseOperator",
        delete: kindo.config.api.unifiedCollectUrl + "/api/enterpriseOperator/deleteById",
        updateStatus: kindo.config.api.unifiedCollectUrl + "/api/enterpriseOperator/updateEnterpriseOperatorState",
        getAccountList: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getByUserId"
      },
      forms: {
        account: "",
        operatorTele: "",
        accountState: ""
      },
      // 弹出框
      child: {
        id: "",
        operatorName: "",
        account: "",
        operatorTele: "",
        operatorIdCard: "",
        payPassword: "",
        accountState: "",
        payPasswordShow: ""
      },
      formsRules: {},
      pswFlag: true,
      childRules: {},
      source: {
        accountStates: [],
        queryAccountStates: [],
        accounts: [],
        language: [],
        comLanguage: []
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

    this.source.accountStates = [{ value: '1', label: this.source.language.enable }, { value: '2', label: this.source.language.disable }];
    this.source.queryAccountStates = [{ value: '', label: this.source.language.all }, { value: '1', label: this.source.language.enable }, { value: '2', label: this.source.language.disable }];

    this.formsRules = {        
      operatorTele: [
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" }
      ]
    };

    this.childRules = {
      operatorName: [
        { required: true, message: this.source.language.fillEnterpriseOperatorName, trigger: 'blur' },
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" }
      ],
      account: [
        { required: true, message: this.source.language.selectRechargeAccount, trigger: 'blur' }
      ],
      operatorTele: [
        { required: true, message: this.source.language.fillMobilePhoneNum, trigger: 'blur' },
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" },
        { pattern: kindo.validate.pattern.iMobile, message: this.source.language.mobilPhoneError, trigger: 'blur' }
      ],
      operatorIdCard: [
        { required: true, message: this.source.language.fillIdCard, trigger: 'blur' },
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" },
        { pattern: kindo.validate.pattern.idCard, message: this.source.language.idCardError, trigger: 'blur' }
      ],
      payPasswordShow: [
        { required: true, message: this.source.language.fillPayPassword, trigger: 'blur' },
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" }
      ],
      accountState: [
        { required: true, message: this.source.language.selectState, trigger: 'blur' }
      ]
    };
  },
  mounted() {
    var _this = this;
    this.$http.get(this.api.getAccountList).then(
      function (res) {
        if (res) {
          let list = res.records;
          let accountsJson = [];
          for (let i = 0; i < list.length; i++) {
            accountsJson.push({ label: list[i].rechargeAccountNum, value: list[i].rechargeAccountNum });
          }
          _this.source.accounts = accountsJson;
        }
      }
    );   
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    pswCompositionstart() {
      this.pswFlag = false;
    },
    pswCompositionend() {
      this.pswFlag = true;
    },
    dealInput(event) {
      let _this = this;
      setTimeout(function() {
        if (_this.pswFlag) {
          let domTarget = event.target;
          let newPassword = domTarget.value;
          let oldPassword = _this.child.payPassword;
          // let deta = newPassword.length - oldPassword.length;

          let truePassword = "";
          let p = domTarget.selectionEnd;//光标结束时的位置

          for (let i = 0; i < newPassword.length; i++) {
            let c = newPassword.charAt(i);
            if (i < p && c !== '*') {
              truePassword += c;
            } else if (i < p && c === '*') {
              truePassword += oldPassword.charAt(i);
            } else {
              truePassword += oldPassword.substr(oldPassword.length - newPassword.length + p, newPassword.length - p);
              break;
            }
          }
          newPassword = truePassword.replace(/\S/g, '*');
          _this.child.payPassword = truePassword;
          _this.child.payPasswordShow = newPassword;
          // 解决在win8中光标总是到input框的最后	
          domTarget.selectionEnd = p;
          domTarget.selectionStart = p;
        }
      }, 0);
    },
    clearPass() {
      this.child.payPassword = "";
      this.child.payPasswordShow = "";
    },
    formatIdCard(row, column, cellValue, index) {
      return cellValue.substring(0, 6) + '********' + cellValue.substring(14);
    },
    deleteData(row) {
      let _this = this;
      this.child.action = 'delete';
      kindo.util.confirm(_this.source.language.deleteConfirm, undefined, undefined, () => {
        this.$http.postJson(this.api.delete, { id: row.id }).then((res) => {
          kindo.util.alert(_this.source.comLanguage.deleteSuccess, _this.source.comLanguage.tips, 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    editList(row, keyid, form, url) {
      this[form]['action'] = 'edit';
      this.getList(row, keyid, form, url);
      this.child.payPasswordShow = this.child.payPassword.replace(/\S/g, '*');
    },
    viewList(row, keyid, form, url) {
      this[form]['action'] = 'view';
      this.getList(row, keyid, form, url);
      this.child.payPasswordShow = this.child.payPassword.replace(/\S/g, '*');
    },
    getList(row, keyid, form, url) {
      kindo.util
        .promise(() => {
          this[form + 'Visible'] = true;
        })
        .then(() => {
          // 初始化，去除校验提示并清空实体
          this.$refs[form].resetFields();
        })
        .then(() => {
          let data = [];
          this.$http.get(url, { [keyid]: row[keyid] }).then(res => {
            data = res;
            // 根据ID查询数据
            for (let key in data) {
              if (this[form].hasOwnProperty(key) === true) {
                this[form][key] = data[key];
                if (Array.isArray(data[key])) {
                  this.$refs[form + 'Table'].internalData = data[key];
                  this['editexp'] = data['exhibitionPeriodNum'] + 1;
                }
              }
            }
            this.child.payPasswordShow = this.child.payPassword.replace(/\S/g, '*');
          });
        });
    },
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
          _this.$message.error(_this.source.language.opratorFail);
        });
    },
    // 保存提交数据
    diagsave() {
      if (this.child.payPassword && !kindo.validate.pattern.isPassword.test(this.child.payPassword)) {
        this.$message.error(this.source.comLanguage.passwordValidator);
        return;
      }
      this.$refs.child.validate(valid => {
        if (valid) {
          let url = "";
          if (this.child.action === 'add') {
            url = this.api.add;
          } else if (this.child.action === 'edit') {
            url = this.api.update;
          }
          this.child.payPassword = this.$md5(this.child.payPassword);
          this.$http.postJson(url, this.child).then(res => {
            this.childVisible = false;
            this.$refs.table.reloadData();
            kindo.util.alert(this.source.language.saveSuccess, "success");
          });
        }
      });
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
  margin-left: 20px;
}
</style>