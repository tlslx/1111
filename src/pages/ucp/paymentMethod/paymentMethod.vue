<template>
  <el-page ref="paymentMethod">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'?source.comLanguage.add:child.action==='edit'?source.comLanguage.edit:source.comLanguage.view)+source.language.paymentMethod" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="42%">
        <kindo-box>
          <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="80px" inline>
            <el-form-item :label="source.language.paymentMethodName" prop="name">
              <el-input :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.name" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.paymentMethodCode" prop="code">
              <el-input :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.code" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="source.language.state" prop="state">
              <el-select :disabled="child.action =='view'" v-model="child.state" :clearable="true" :placeholder="source.language.selectState" class="inputclass">
                <el-option v-for="item in source.states" :key="item.value" :label="item.label" :value="item.value">
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
      <kindo-box :title="source.language.paymentMethodManage" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="120px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.paymentMethodName" prop="name">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.name" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.state" prop="state">
            <el-select v-model="forms.state" :placeholder="source.language.selectState" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.queryStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="right('paymentMethodQuery')" icon="el-icon-search" type="primary" @click="onQuery">{{source.comLanguage.query}}</el-button>
            <el-button v-if="right('paymentMethodReset')" type="info" @click="onResetQuery">{{source.comLanguage.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="name" :label="source.language.paymentMethodName" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="code" :label="source.language.paymentMethodCode" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="modifierName" align="center" :label="source.comLanguage.modifierName" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="modifyDate" align="center" :label="source.comLanguage.modifyDate" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="state" align="center" :label="source.language.state" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <el-switch active-color="#13ce66" inactive-color="#cccccc" v-model="scope.row.state" active-value="2" inactive-value="1" @change=updateStatus(scope.row)>
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="source.comLanguage.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button v-if="right('paymentMethodUpdate')" type="text" :title="source.comLanguage.edit" @click="editList(scope.row,'id', 'child', api.getbyid)">{{source.comLanguage.edit}}</el-button>
                <el-button v-if="right('paymentMethodView')" type="text" :title="source.comLanguage.view" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{source.comLanguage.view}}</el-button>
                <el-button v-if="right('paymentMethodDelete')" type="text" :title="source.comLanguage.delete" @click="deleteData(scope.row)">{{source.comLanguage.delete}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button v-if="right('paymentMethodAdd')"  type="primary"  icon="el-icon-plus" @click="onAdd">{{source.comLanguage.add}}</el-button>
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
      pageId: "paymentMethod",
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/unitedCollect/basicData/listPaymentMethod",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/unitedCollect/basicData/getSinglePaymentById",
        add: kindo.config.api.unifiedCollectUrl + "/api/unitedCollect/basicData/savePaymentMethod",
        update: kindo.config.api.unifiedCollectUrl + "/api/unitedCollect/basicData/updatePaymentMethod",
        delete: kindo.config.api.unifiedCollectUrl + "/api/unitedCollect/basicData/deleteById",
        updateStatus: kindo.config.api.unifiedCollectUrl + "/api/unitedCollect/basicData/updatePaymentMethodState"
      },
      forms: {
        state: "",
        name: ""
      },
      // 弹出框
      child: {
        id: "",
        name: "",
        code: "",
        state: ""
      },
      formsRules: {},
      childRules: {},
      source: {
        states: [],
        queryStates: [],
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
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.source.language.invalidChar));
      } else {
        return callback();
      }
    };

    let _this = this;
    this._forms = Object.assign({}, this.forms);
    this._child = Object.assign({}, this.child);
    this.source.comLanguage = kindo.util.getLanguage('CommonLang');
    this.source.language = kindo.util.getLanguage('CommonPayLang');

    this.source.states = [{ value: '1', label: this.source.language.disable }, { value: '2', label: this.source.language.enable }];
    this.source.queryStates = [{ value: '', label: this.source.language.all }, { value: '1', label: this.source.language.disable }, { value: '2', label: this.source.language.enable }];

    this.formsRules = {        
      name: [
        { max: 50, message: _this.source.comLanguage.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ]
    };

    this.childRules = {        
      name: [
        { required: true, message: _this.source.language.fillPaymentMethodName, trigger: "blur" },
        { max: 50, message: _this.source.comLanguage.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      code: [
        { required: true, message: _this.source.language.fillPaymentMethodCode, trigger: "blur" },
        { max: 30, message: _this.source.language.max30, trigger: "blur" }
      ],
      state: [
        { required: true, message: _this.source.language.selectState, trigger: "change" }
      ]
    };

  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
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