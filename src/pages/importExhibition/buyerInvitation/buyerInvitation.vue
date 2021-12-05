<template >
  <el-page ref="buyerInvitation">
    <template slot="header">
      <!--增加潜在采购商弹框-->
      <el-dialog :title="potentialFormId + '潜在采购商'" :close-on-click-modal="false" :visible.sync="dialogVisible" width="45%">
        <kindo-box>
          <el-form :model="potentialBuyerForm" :rules="potentialBuyerRules" :inline-message="true" ref="potentialBuyerForm" label-position="right" label-width="120px">
            <el-form-item label="被邀请人姓名：" prop="name">
              <el-input v-model="potentialBuyerForm.name" class="buyerinput"></el-input>
            </el-form-item>
            <el-form-item label="被邀请人邮箱：" prop="mail">
              <el-input v-model="potentialBuyerForm.mail" class="buyerinput"></el-input>
            </el-form-item>
            <el-form-item label="被邀请人手机：" prop="phonenumber">
              <el-input v-model="potentialBuyerForm.phonenumber" class="buyerinput"></el-input>
            </el-form-item>
            <el-form-item label="被邀请人企业：" prop="enterpriseName">
              <el-input v-model="potentialBuyerForm.enterpriseName" class="buyerinput"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onCancel">取 消</el-button>
              <el-button type="primary" @click="onSubmit" :disabled="isSubmitDisabled">确 定</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>
      <kindo-box title="采购商邀请"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="我的潜在采购商信息" name="potentialBuyerInfo">
            <!--按钮-->
            <el-form inline ref="buyerForms" :rules="buyerRules" :model="buyerForms" label-position="right">
              <el-form-item label="姓名" label-width="80px" prop="name">
                <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="buyerForms.name" placeholder="请输入" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item label="手机" label-width="80px" prop="phonenumber">
                <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="buyerForms.phonenumber" placeholder="请输入" maxlength="11" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="onBuyerQuery">查询</el-button>
                <el-button type="info" @click="onResetBuyerQuery">重置</el-button>
              </el-form-item>
            </el-form>
            <!--潜在采购商表 -->
            <kindo-box>
              <kindo-table ref="buyerInvitationTable" :url="api.getBuyer" :queryParam="buyerForm" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="phonenumber" label="手机号" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column prop="mail" label="邮箱" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column prop="enterpriseName" label="企业名称" show-overflow-tooltip min-width="200"></el-table-column>
                <el-table-column label="操作" width="200" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button v-right.edit type="text" title="修改" @click="onEdit(scope.row)">修改</el-button>
                  </template>
                </el-table-column>
                <div slot="control">
                  <el-button icon="el-icon-plus" type="primary" @click="addPotentialBuyer">增加潜在采购商</el-button>
                </div>
              </kindo-table>
            </kindo-box>
            <!--批量发送邀请-->
            <kindo-box>
              <el-form :model="sendInviteForm" inline ref="sendInviteForm" label-position="right" label-width="105px">
                <el-form-item label="邀请方式">
                  <el-select v-model="sendInviteForm.invitValue" placeholder="请选择" @change="invitMethodChange" class="inputclass">
                    <el-option v-for="item in source.invitMethodOptions" :title="item.label" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="模板">
                  <el-select v-model="sendInviteForm.tempValue" filterable placeholder="请先选择邀请方式" class="inputclass">
                    <el-option v-for="item in source.templateOptions" :title="item.label" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="1px">
                  <el-button type="primary" @click="sendInvitation">发送邀请</el-button>
                </el-form-item>
              </el-form>
            </kindo-box>
          </el-tab-pane>

          <el-tab-pane label="已发送邀请" name="sentInvitation">
            <!--按钮-->
            <el-form inline ref="sentForms" :model="sentForms" :rules="sentRules" label-position="right">
              <el-form-item label="展届" label-width="80px" prop="session">
                <el-input v-model="sentForms.session" placeholder="默认最新一届" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item label="姓名" label-width="80px" prop="contactName">
                <el-input v-model="sentForms.contactName" placeholder="请输入" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item label="手机" label-width="80px" prop="phonenumber">
                <el-input v-model="sentForms.phonenumber" placeholder="请输入" maxlength="11" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="onSentQuery">查询</el-button>
                <el-button type="info" @click="onResetSentQuery">重置</el-button>
              </el-form-item>
            </el-form>
            <!--已发送邀请表-->
            <kindo-box>
              <kindo-table ref="sentInvitationTable" :url="api.getSent" :queryParam="sentForm" :pagination="false">
                <el-table-column prop="session" label="展届" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="contactName" label="姓名" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="phonenumber" label="手机号" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column prop="mail" label="邮箱" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column prop="enterpriseName" label="企业名称" show-overflow-tooltip min-width="200"></el-table-column>
                <el-table-column prop="invitationType" label="邀请方式" show-overflow-tooltip min-width="100" :formatter="inviteTypeView"></el-table-column>
                <el-table-column prop="templateName" label="模板" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="invitationDate" label="发送时间" show-overflow-tooltip min-width="170"></el-table-column>
                <el-table-column label="操作" width="150" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button v-right.edit type="text" @click="resend(scope.row, scope.$index)" :disabled="scope.row.isResendDisabled" v-if="!scope.row.isShowTimer">重新发送</el-button>
                    <span v-else>{{scope.row.countDown}}s</span>
                  </template>
                </el-table-column>
              </kindo-table>
            </kindo-box>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "buyerInvitation",
  mixins: [listPageBase],
  data() {
    let checkTelephone = (rule, value, callback) => {
      if (kindo.validate.mobile(value)) {
        return callback();
      } else {
        return callback(new Error("请输入正确的电话号码"));
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (kindo.validate.email(value)) {
        return callback();
      } else {
        return callback(new Error("请输入正确的邮箱地址"));
      }
    };
    var validateInterger = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error('只能是数字'));
      }
    };
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error('不能包含特殊字符或空格'));
      } else {
        return callback();
      }
    };
    return {
      // pageId: "buyerInvitation",
      api: {
        getBuyer: kindo.config.api.importExbUrl + "/api/infoIfiPotentiaBuyer/getListPage", //查询潜在采购商
        getInvitMethod: kindo.config.api.importExbUrl + "/api/codeIfiInvitationTemplate/getInvitationType", //查询邀请方式
        getTemplate: kindo.config.api.importExbUrl + "/api/codeIfiInvitationTemplate/getTemplateByInvitation", //查询模板
        getSent: kindo.config.api.importExbUrl + "/api/infoIfiInvitationRecord/getListPage", //查询已发送邀请
        insert: kindo.config.api.importExbUrl + "/api/infoIfiPotentiaBuyer/savePotentiaBuyer", //新增潜在采购商
        update: kindo.config.api.importExbUrl + "/api/infoIfiPotentiaBuyer/updatePotentiaBuyer", //修改潜在采购商,
        sendInvit: kindo.config.api.importExbUrl + "/api/infoIfiPotentiaBuyer/sendMessage", //发送邀请
        resend: kindo.config.api.importExbUrl + "/api/infoIfiInvitationRecord/saveInvitationRecord" // 重新发送
      },
      activeName: "potentialBuyerInfo",
      //采购商查询参数
      buyerForms: {
        name: "",
        phonenumber: ""
      },
      //已发送邀请查询参数
      sentForms: {
        session: "",
        contactName: "",
        phonenumber: ""
      },
      source: {
        invitMethodOptions: [{
          label: "短信",
          value: 2
        }, {
          label: "邮件",
          value: 1
        }],
        templateOptions: []
      },
      sentInvitTable: [],
      dialogVisible: false,
      potentialBuyerForm: {
        name: "",
        mail: "",
        phonenumber: "",
        enterpriseName: ""
      },
      _potentialBuyerForm: {},
      //新增潜在采购商，表单校验
      potentialBuyerRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 20, message: "长度不能超过20个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { max: 50, message: "长度不能超过50个字符", trigger: "blur" },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { max: 11, message: "长度不能超过11个字符", trigger: "blur" },
          { validator: checkTelephone, trigger: 'blur' }
        ],
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { max: 100, message: "长度不能超过100个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ]
      },
      potentialFormId: "", //判断是新增还是修改,
      sendInvitSelection: [], //批量发送邀请
      sendInviteForm: {
        invitValue: "",
        tempValue: ""
      },
      // 潜在采购商表，查询条件校验
      buyerRules: {
        name: [
          { max: 20, message: "长度不能超过 20 个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ],
        phonenumber: [
          { max: 11, message: "长度不能超过 11 个字符", trigger: "blur" },
          { validator: validateInterger, trigger: 'blur' }
        ]
      },
      //已发送邀请表，查询条件校验
      sentRules: {
        session: [
          { max: 11, message: "长度不能超过 11 个字符", trigger: "blur" },
          { validator: validateInterger, trigger: 'blur' }
        ],
        contactName: [
          { max: 50, message: "长度不能超过 50 个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ],
        phonenumber: [
          { max: 11, message: "长度不能超过 11 个字符", trigger: "blur" },
          { validator: validateInterger, trigger: 'blur' }
        ]
      },
      isSubmitDisabled: false
    };
  },
  computed: {
    buyerForm: function () {
      return {
        queryParams: this.buyerForms
      };
    },
    sentForm: function () {
      return {
        queryParams: this.sentForms
      };
    }
  },
  async created() {
    this._buyerForms = Object.assign({}, this.buyerForms);
    this._sentForms = Object.assign({}, this.sentForms);
  },
  mounted() {
    this.$nextTick(function () {
      this.onBuyerQuery();
    });
  },
  methods: {
    handleClick(tab) {
      if (tab.name === "potentialBuyerInfo") {
        this.onBuyerQuery();
      } else if (tab.name === "sentInvitation") {
        this.onSentQuery();
      }
    },
    //查询条件重置为空
    onResetBuyerQuery() {
      this.buyerForms = Object.assign({}, this._buyerForms);
      this.$nextTick(function () {
        this.$refs.buyerInvitationTable.reloadData();
      });
    },
    onResetSentQuery() {
      this.sentForms = Object.assign({}, this._sentForms);
      this.$nextTick(function () {
        this.$refs.sentInvitationTable.reloadData();
      });
    },
    onBuyerQuery() {
      this.$refs.buyerInvitationTable.loadData();
    },
    onSentQuery() {
      this.$refs.sentInvitationTable.loadData();
    },
    //先选邀请方式，然后去查模板
    invitMethodChange(val) {
      this.queryTemplate(val);
    },
    //查模板
    queryTemplate(typeValue) {
      let _this = this;
      let params = {
        json: {
          customQueryParams: {
            type: typeValue
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.source.templateOptions = [];
      this.sendInviteForm.tempValue = "";
      this.$http.get(this.api.getTemplate, params)
        .then(res => {
          let tempData = res.records;
          tempData.forEach(item => {
            _this.source.templateOptions.push({
              label: item.templateName,
              value: item.id
            });
          });
        });
    },
    // 表中邀请方式过滤显示
    inviteTypeView(row) {
      let label = row.invitationType;
      if (row.invitationType === 2) {
        label = "短信";
      } else if (row.invitationType === 1) {
        label = "邮件";
      }
      return label;
    },
    sendInvitation(row) {
      let buyerList = [];
      // 批量发送邀请，需先勾选数据
      if (!row.id) {
        if (this.sendInvitSelection.length === 0) {
          this.$message({
            message: "请选择数据",
            type: "warning"
          });
          return;
        }
        for (let i = 0; i < this.sendInvitSelection.length; i++) {
          buyerList.push({
            id: this.sendInvitSelection[i].id,
            templateId: this.sendInviteForm.tempValue,
            name: this.sendInvitSelection[i].name,
            phonenumber: this.sendInvitSelection[i].phonenumber,
            mail: this.sendInvitSelection[i].mail,
            enterpriseName: this.sendInvitSelection[i].enterpriseName
          });
        }
      } else {
        buyerList = [{
          id: row.id,
          templateId: this.sendInviteForm.tempValue,
          name: row.name,
          phonenumber: row.phonenumber,
          mail: row.mail,
          enterpriseName: row.enterpriseName
        }];
      }
      // 发送邀请时，需要先选邀请方式和模板
      if (!this.sendInviteForm.invitValue) {
        this.$message({
          message: "请选择邀请方式",
          type: "warning"
        });
        return;
      } else if (!this.sendInviteForm.tempValue) {
        this.$message({
          message: "请选择模板",
          type: "warning"
        });
        return;
      }
      this.$http.postJson(this.api.sendInvit, buyerList)
        .then(res => {
          this.$message({
            type: "success",
            message: "发送邀请成功"
          });
          this.$refs.buyerInvitationTable.reloadData();
        }, err => {
          this.$message.error(err);
        });
    },
    handleSelectionChange(val) {
      this.sendInvitSelection = val;
    },
    //新增潜在采购商
    addPotentialBuyer() {
      this.potentialFormId = "新增";
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.potentialBuyerForm = {
        name: "",
        mail: "",
        phonenumber: "",
        enterpriseName: ""
      };
      this._potentialBuyerForm = Object.assign({}, this.potentialBuyerForm);
      this.$nextTick(function () {
        this.$refs.potentialBuyerForm.clearValidate();
      });
    },
    onEdit(row) {
      this.potentialFormId = "修改";
      this.dialogVisible = true;
      this.isSubmitDisabled = false;
      this.potentialBuyerForm = {
        name: row.name,
        mail: row.mail,
        phonenumber: row.phonenumber,
        enterpriseName: row.enterpriseName,
        id: row.id
      };
      this._potentialBuyerForm = Object.assign({}, this.potentialBuyerForm);
      this.$nextTick(function () {
        this.$refs.potentialBuyerForm.clearValidate();
      });
    },
    onSubmit() {
      let uri = this.potentialFormId === "新增" ? this.api.insert : this.api.update;
      this.$refs.potentialBuyerForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(uri, this.potentialBuyerForm).then(res => {
            this.isSubmitDisabled = false;
            this.dialogVisible = false;
            this.$refs.buyerInvitationTable.reloadData();
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
      for (let item in this.potentialBuyerForm) {
        for (let buyerItem in this._potentialBuyerForm) {
          if (item === buyerItem) {
            if (this.potentialBuyerForm[item] !== this._potentialBuyerForm[buyerItem]) {
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
    },
    // 重新发送
    resend(row, index) {
      let _this = this;
      let params = {
        id: row.id,
        session: row.session,
        contactName: row.contactName,
        mail: row.mail,
        enterpriseName: row.enterpriseName,
        invitationType: row.invitationType,
        templateId: row.templateId
      };
      //控制重新发送按钮，避免重复点击
      row.isResendDisabled = true;
      this.$refs.sentInvitationTable.internalData.splice(index, 1, row);
      this.$http.post(this.api.resend, params)
        .then(res => {
          //当前操作列点重新发送后，显示倒计时60s，60s后才能重新发送邀请
          row.countDown = 60; // 倒计时时间60s
          row.countTimer = null; // 定时器读秒
          row.isShowTimer = true; // 显示读秒数
          row.countTimer = setInterval(() => {
            row.countDown--;
            if (row.countDown === 0) {
              clearInterval(row.countTimer);
              row.countTimer = null;
              row.isShowTimer = false;
              row.countDown = 60;
              row.isResendDisabled = false;
            }
            //倒计时更新到表
            _this.$refs.sentInvitationTable.internalData.splice(index, 1, row);
          }, 1000);
          this.$refs.sentInvitationTable.reloadData();
        });
    }
  }
};
</script>
<style>
.buyer-elcol {
  margin-left: 25px;
}
.buyerinput {
  width: 200px;
}
.el-select-dropdown__item {
  width: 160px;
}
</style>

