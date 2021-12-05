<template>
  <el-page ref="bankAccount">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'? languageSource.CommonLang.add :child.action==='edit'? languageSource.CommonLang.edit : languageSource.CommonLang.view) + languageSource.CommonPayLang.bankAccount" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="80px" :disabled="(child.action==='view'?true:false)" inline>
            <el-form-item :label="languageSource.CommonPayLang.bankName" prop="bankName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.bankName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.bankCard" prop="bankAccount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.bankAccount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.bankCode" prop="bankCode">
              <el-select v-model="child.bankCode" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass">
                <el-option v-for="item in source.bankCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.state" prop="state">
              <el-switch active-color="#13ce66" inactive-color="#cccccc" v-model="child.state" active-value="1" inactive-value="2"></el-switch>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="child.action !=='view'" type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{ languageSource.CommonLang.confirm }}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonLang.cancel }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.bankAccountManage" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.bankName" prop="bankName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.bankName" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.bankCard" prop="bankAccount">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="shortclass" v-model="forms.bankAccount" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.bankCode" prop="bankCode">
            <el-select v-model="forms.bankCode" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.bankCodes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" v-if="right('bankAccountQuery')" type="primary" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('bankAccountReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
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
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="bankName" :label="languageSource.CommonPayLang.bankName" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankAccount" :label="languageSource.CommonPayLang.bankCard" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankCode" :label="languageSource.CommonPayLang.bankCode" width="150" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.bankCodes,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="modifyDate" :label="languageSource.CommonLang.modifyDate" width="180" :formatter="(row) => row.modifyDate?kindo.util.formatDate(row.modifyDate):''" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="state" :label="languageSource.CommonPayLang.state" width="110" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" inactive-color="#cccccc" v-model="scope.row.state" active-value="1" inactive-value="2" @change="updateStatus(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('bankAccountEdit')" @click="editList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.edit }}</el-button>
                <el-button type="text" v-if="right('bankAccountView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.view }}</el-button>
                <el-button type="text" v-if="right('bankAccountDelete')" @click="deleteData(scope.row)">{{ languageSource.CommonLang.delete }}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" type="primary" v-if="right('bankAccountAdd')" @click="onAdd">{{ languageSource.CommonLang.add }}</el-button>
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
export default {
  name: "bankAccountManage",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "bankAccountManage",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/basicData/bankAccount/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/basicData/bankAccount/getSingleById",
        add: kindo.config.api.unifiedCollectUrl + "/api/basicData/bankAccount/add",
        update: kindo.config.api.unifiedCollectUrl + "/api/basicData/bankAccount/updateById",
        delete: kindo.config.api.unifiedCollectUrl + "/api/basicData/bankAccount/deleteById",
        updateStatus: kindo.config.api.unifiedCollectUrl + "/api/basicData/bankAccount/updateState"
      },
      forms: {
        state: "",
        bankName: "",
        bankAccount: "",
        bankCode: ""
      },
      // 弹出框
      child: {
        id: "",
        bankName: "",
        bankAccount: "",
        bankCode: "",
        state: "1"
      },
      childRules: {},
      formsRules: {},
      source: {
        states: [],
        bankCodes: []
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

    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    let validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.invalidChar));
      } else {
        return callback();
      }
    };

    this.childRules = {
      bankName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.bankName, trigger: "blur" },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      bankAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.bankCard, trigger: "blur" },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      bankCode: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.bankCode, trigger: "blur" }
      ]
    };
    this.formsRules = {
      bankName: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      bankAccount: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ]
    };

    this.source.states = [{ value: "1", label: this.languageSource.CommonPayLang.enable }, { value: "2", label: this.languageSource.CommonPayLang.disable }];
    this.source.bankCodes = await kindo.dictionary.get('collectBank');
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
          let _this = this;
          this.$http.postJson(url, this.child).then(res => {
            _this.childVisible = false;
            _this.$refs.table.reloadData();
            kindo.util.alert(this.languageSource.CommonPayLang.dataSaveSuccess, "success");
          }).catch(error => {
            _this.$message.error(error);
          });
        }
      });
    },
    deleteData(row) {
      this.child.action = 'delete';
      kindo.util.confirm(this.languageSource.CommonPayLang.deleteWarning, undefined, undefined, () => {
        this.$http.postJson(this.api.delete, { id: row.id }).then((res) => {
          kindo.util.alert(this.languageSource.CommonLang.deleteSuccess, this.languageSource.CommonLang.tips, 'success');
          this.$refs['table'].reloadData();
        });
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
</style>