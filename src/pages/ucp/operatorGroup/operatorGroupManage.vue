<template>
  <el-page ref="operatorGroupManage">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="(child.action==='add'?languageSource.CommonLang.add:child.action==='edit'?languageSource.CommonLang.edit:languageSource.CommonLang.view)+languageSource.CommonPayLang.group" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="42%">
        <kindo-box>
          <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="80px" inline>
            <el-row>
              <el-form-item :label="languageSource.CommonPayLang.groupName" prop="groupName">
                <el-input :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.groupName"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item :label="languageSource.CommonPayLang.remark" prop="remark">
                <el-input type="textarea" :disabled="child.action =='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.remark" style="width:360px"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="child.action !=='view'" type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>{{languageSource.CommonLang.confirm}}</el-button>
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{languageSource.CommonLang.cancel}}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.groupManage" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.groupName" prop="groupName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.groupName" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column :label="languageSource.CommonPayLang.groupName" prop="groupName" show-overflow-tooltip header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.remark" prop="remark" show-overflow-tooltip header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.creatorName" prop="creatorName" show-overflow-tooltip header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.creatorDate" prop="createDate" show-overflow-tooltip header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('groupEdit')"  @click="editList(scope.row,'id', 'child', api.getbyid)">{{languageSource.CommonLang.edit}}</el-button>
                <el-button type="text" v-if="right('groupView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{languageSource.CommonLang.view}}</el-button>
                <el-button type="text" v-if="right('groupDel')" @click="deleteData(scope.row)">{{languageSource.CommonLang.delete}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" type="primary" v-if="right('groupAdd')" @click="onAdd">{{languageSource.CommonLang.add}}</el-button>
            </div>`
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "operator",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "operatorGroupManage",
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/basicData/operatorGroup/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/basicData/operatorGroup/getSingleById",
        add: kindo.config.api.unifiedCollectUrl + "/api/basicData/operatorGroup/add",
        update: kindo.config.api.unifiedCollectUrl + "/api/basicData/operatorGroup/updateById",
        delete: kindo.config.api.unifiedCollectUrl + "/api/basicData/operatorGroup/deleteById"
      },
      forms: {
        groupName: ""
      },
      // 弹出框
      child: {
        id: "",
        groupName: "",
        remark: ""
      },
      formsRules: {
      },
      childRules: {
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
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    let validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.invalidChar));
      } else {
        return callback();
      }
    };
    this._forms = Object.assign({}, this.forms);
    this._child = Object.assign({}, this.child);
    this.formsRules = { groupName: [{ max: 30, message: this.languageSource.CommonPayLang.max30, trigger: "blur" }, { validator: validateSpecialChars, trigger: 'blur' }] }; 
    this.childRules = { groupName: [
          { required: true, message: this.languageSource.CommonPayLang.groupNameRequired, trigger: "blur" },
          { max: 30, message: this.languageSource.CommonPayLang.max30, trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
    ],
      remark: [
          { max: 100, message: this.languageSource.CommonPayLang.max100, trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
      ] };
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
            kindo.util.alert(this.languageSource.CommonPayLang.saveSuccess, "success");
          });
        }
      });
    },
    deleteData(row) {
      this.child.action = 'delete';
      kindo.util.confirm(this.languageSource.CommonPayLang.deleteConfirm + "?", undefined, undefined, () => {
        this.$http.postJson(this.api.delete, { id: row.id }).then((res) => {
          kindo.util.alert(this.languageSource.CommonLang.deleteSuccess, this.languageSource.CommonLang.tip, 'success');
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