<template>
  <el-page ref="invitationTemplate">
    <template slot="header">
      <!--创建模板弹窗-->
      <el-dialog :title="tempId +'模板'" :close-on-click-modal="false" :visible.sync="dialogVisible" width="80%">
        <kindo-box title="以展团名义发邮件">
          <el-form :model="templateForm" :rules="templateRules" ref="templateForm" label-position="right" :disabled="isFormView">
            <el-form-item label="模板名称：" prop="templateName" label-width="120px">
              <el-input v-model="templateForm.templateName"></el-input>
            </el-form-item>
            <el-form-item label="标题：" prop="subject" label-width="120px" class="tempinput">
              <el-input v-model="templateForm.subject"></el-input>
            </el-form-item>
            <el-form-item label="模板类型：" prop="type" label-width="120px" class="tempinput">
              <el-select v-model="templateForm.type" placeholder="请选择" class="inputclass" @change="tempSelectChange">
                <el-option v-for="item in source.inviteTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模板内容：" label-width="120px" prop="value" ref="templateValue" class="tempinput" v-if="!isFormView&&!isShortMessage">
              <!--文本编辑器-->
              <tiny-editor v-model="templateForm.value"></tiny-editor>
            </el-form-item>
            <el-form-item label="模板内容：" label-width="120px" prop="textValue" ref="textMessageValue" class="tempinput" v-else-if="isFormView||isShortMessage">
              <!--短信文本框-->
              <el-input type="textarea" :disabled="isFormView" :rows="6" v-model="templateForm.textValue"></el-input>
            </el-form-item>
            <el-form-item label="邀请人类型：" prop="templateUserType" label-width="120px" class="tempinput">
              <el-select v-model="templateForm.templateUserType" placeholder="请选择" class="inputclass">
                <el-option v-for="item in source.inviterTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-row :gutter="20" class="tempinput">
            <el-col :span="2" :offset="3">
              <el-button @click="onCancel">取 消</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="onSubmit" :disabled="isFormView||isSubmitDisabled">确 定</el-button>
            </el-col>
          </el-row>
        </kindo-box>
      </el-dialog>
      <kindo-box title="邀请模板管理"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table ref="invitationTemplateTable" :url="api.get" :queryParam="tempForm">
          <el-table-column prop="templateName" show-overflow-tooltip label="模板名称" min-width="200"></el-table-column>
          <el-table-column prop="templateUserType" label="模板使用者类型" show-overflow-tooltip min-width="150" :formatter="templateUserTypeView"></el-table-column>
          <el-table-column prop="type" label="模板类型" show-overflow-tooltip min-width="150" :formatter="templateTypeView"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="modifierName" label="操作员" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column label="操作" width="200" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-right.edit type="text" title="修改" @click="onEdit(scope.row)">修改</el-button>
              <el-button v-right.delete type="text" title="删除" @click="onDel(scope.row)">删除</el-button>
              <el-button v-right.view type="text" title="查看" @click="onEdit(scope.row, true)">查看</el-button>
            </template>
          </el-table-column>
          <div slot="control">
            <el-button icon="el-icon-plus" type="primary" @click="createTemplate">创建模板</el-button>
          </div>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import tinyEditor from "@/components/framework/plugins/tinyEditor";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "invitationTemplate",
  mixins: [listPageBase],
  data() {
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error('不能包含特殊字符或空格'));
      } else {
        return callback();
      }
    };
    return {
      // pageId: "invitationTemplate",
      api: {
        get: kindo.config.api.importExbUrl + "/api/codeIfiInvitationTemplate/getListPage",
        insert: kindo.config.api.importExbUrl + "/api/codeIfiInvitationTemplate/add",
        delete: kindo.config.api.importExbUrl + "/api/codeIfiInvitationTemplate/deleteById",
        update: kindo.config.api.importExbUrl + "/api/codeIfiInvitationTemplate/updateById"
      },
      tempTableForms: {}, //模板管理表查询参数
      dialogVisible: false,
      //创建模板表单
      templateForm: {
        templateName: "",
        subject: "",
        value: "",
        textValue: "",
        type: "",
        inviterType: ""
      },
      _templateForm: {},
      templateRules: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
          { max: 50, message: "长度不能超过50个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ],
        subject: [
          { required: true, message: "请输入标题内容", trigger: "blur" },
          { max: 100, message: "长度不能超过100个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ],
        value: [
          { required: true, message: "请输入邮件内容", trigger: "blur" }
        ],
        textValue: [
          { required: true, message: "请输入短信内容", trigger: "blur" },
          { max: 500, message: "长度不能超过500个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择邀请方式", trigger: "change" }
        ],
        templateUserType: [
          { required: true, message: "请选择邀请人类型", trigger: "change" }
        ]
      },
      tempId: "",
      isFormView: false, //是否查看,
      source: {
        inviteTypeOptions: [{
          label: "短信",
          value: 2
        }, {
          label: "邮件",
          value: 1
        }],
        inviterTypeOptions: []
      },
      isShortMessage: false, //模板是否为短信
      isSubmitDisabled: false // 提交按钮灰化，防止重复提交
    };
  },
  computed: {
    tempForm: function () {
      return {
        queryParams: this.tempTableForms
      };
    }
  },
  async created() {
    // 读取数据字典-邀请人类型
    this.source.inviterTypeOptions = await kindo.dictionary.get('templateUserType');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.invitationTemplateTable.loadData();
    },
    // 表中模板类型过滤显示
    templateTypeView(row) {
      let label = row.type;
      if (row.type === 2) {
        label = "短信";
      } else if (row.type === 1) {
        label = "邮件";
      }
      return label;
    },
    // 表中模板使用者类型过滤显示
    templateUserTypeView(row) {
      let userTypelabel = row.templateUserType;
      for (let i = 0; i < this.source.inviterTypeOptions.length; i++) {
        if (this.source.inviterTypeOptions[i].value === row.templateUserType) {
          userTypelabel = this.source.inviterTypeOptions[i].label;
        }
      }
      return userTypelabel;
    },
    //创建模板
    createTemplate() {
      this.tempId = "创建";
      this.dialogVisible = true;
      this.isFormView = false;
      this.isShortMessage = false;
      this.isSubmitDisabled = false;
      this.templateForm = {
        templateName: "",
        subject: "",
        value: "",
        textValue: "",
        type: "",
        templateUserType: ""
      };
      this._templateForm = Object.assign({}, this.templateForm);
      this.$nextTick(function () {
        this.$refs.templateForm.clearValidate();
      });
    },
    //短信和邮件 模板不同
    tempSelectChange(val) {
      // 1表示邮件 2表示短信
      if (val === 2) {
        this.templateForm.textValue = "";
        this.isShortMessage = true;
        this.$nextTick(function () {
          this.$refs.textMessageValue.clearValidate();
        });
      } else if (val === 1) {
        this.templateForm.value = "";
        this.isShortMessage = false;
        this.$nextTick(function () {
          this.$refs.templateValue.clearValidate();
        });
      }
    },
    onEdit(row, isView = false) {
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.isFormView = isView;
      this.tempId = isView ? "查看" : "修改";
      this.tempSelectChange(row.type);
      this.templateForm = {
        id: row.id,
        templateName: row.templateName,
        subject: row.subject,
        value: row.value,
        textValue: row.value,
        type: row.type,
        templateUserType: row.templateUserType
      };
      this._templateForm = Object.assign({}, this.templateForm);
      this.$nextTick(function () {
        this.$refs.templateForm.clearValidate();
      });
    },
    onDel(row) {
      let params = {
        id: row.id
      };
      this.$confirm("您确认要删除所选数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.postJson(this.api.delete, params)
            .then(res => {
              this.$refs.invitationTemplateTable.reloadData();
              this.$message({
                type: "success",
                message: "删除成功"
              });
            }, err => {
              this.$message.error(err);
            });
        });
    },
    onSubmit() {
      //后台只能接收一个字段，textValue用于区别短信还是邮件的值，以及校验
      let newTemplateForm = {
        id: this.templateForm.id,
        templateName: this.templateForm.templateName,
        subject: this.templateForm.subject,
        value: this.isShortMessage ? this.templateForm.textValue : this.templateForm.value,
        type: this.templateForm.type,
        templateUserType: this.templateForm.templateUserType
      };
      let uri = this.tempId === "创建" ? this.api.insert : this.api.update;
      this.$refs.templateForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(uri, newTemplateForm).then(res => {
            this.isSubmitDisabled = false;
            this.dialogVisible = false;
            this.$refs.invitationTemplateTable.reloadData();
          }, err => {
            this.isSubmitDisabled = false;
            this.$message.error(err);
          });
        } else {
          return false;
        }
      });
    },
    onCancel() {
      let isUnsaved = false;
      for (let item in this.templateForm) {
        for (let tempItem in this._templateForm) {
          if (item === tempItem) {
            if (this.templateForm[item] !== this._templateForm[tempItem]) {
              isUnsaved = true;
              break;
            }
          }
        }
      }
      if (isUnsaved) {
        this.$confirm('检测到未保存的内容，确定离开？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dialogVisible = false;
        });
      } else {
        this.dialogVisible = false;
      }
    }
  },
  components: {
    tinyEditor
  }
};
</script>
<style>
.tempinput {
  margin-top: 20px;
}
</style>

