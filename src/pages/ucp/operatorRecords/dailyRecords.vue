<template>
  <el-page ref="sysParamManage" >

    <!--
  -->
    <template slot="header">
      <kindo-box title="新增日结单" icon="fa-search">
      </kindo-box>

    </template>
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" :inline-message="true" label-width="35%" width="100%">

            <el-row>

              <el-col :span="12">
                <el-form-item label="收款员:" prop="userName">
                  <el-input v-model="ruleForm.userName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组别:" prop="operatorGroup">
                  <el-input v-model="ruleForm.operatorGroup" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="收款金额:" prop="collectAmount">
                  <el-input v-model="ruleForm.collectAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收款管理员:" prop="upperAdmin">
                  <el-input v-model="ruleForm.upperAdmin" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="缴款金额:" prop="handinAmount">
                  <el-input v-model="ruleForm.handinAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="退款金额:" prop="refundAmount">
                  <el-input v-model="ruleForm.refundAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="待缴款金额:" prop="pendHandinAmount">
                  <el-input v-model="ruleForm.pendHandinAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="日结余额合计:" prop="dailyBalanceAmount">
                  <el-input v-model="ruleForm.dailyBalanceAmount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注:" prop="remark">
                  <el-input v-model="ruleForm.remark" type="textarea" autosize></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>

              <el-col :span="12">

                <el-form-item>
                  <el-button type="primary" @click="onSave()" icon="glyphicon glyphicon-floppy-disk">保存</el-button>
                  <el-button icon="el-icon-close" @click="onCancel()">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </kindo-box>
      </el-page-data>
    </template>
</el-page>
</template>
<script>
import request from '@/scripts/framework/http';

export default {

  data() {
    var numberValidator = (rule, value, callback) => {
      if (isNaN(value)) {
        return callback(new Error('请输入有效的数字值'));
      } else if (value < 0) {
        return callback(new Error('请输入大于0的值'));
      } else {
        return callback();
      }
    };
    return {
      page: true,
      isRead: false,
      ruleForm: {
        userName: "",
        upperAdmin: "",
        handinAmount: "",
        operatorGroup: "",
        collectAmount: "",
        refundAmount: "",
        pendHandinAmount: "",
        dailyBalanceAmount: "",
        remark: ""
      },
      apiSaveUrl: kindo.config.api.unifiedCollectUrl + "/api/daily/record/add", //这里是路径，需要对应
      rules: {
        dailyBalanceAmount: [
          { required: true, message: "请输入日结余额", trigger: "blur" },
          { validator: numberValidator, trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.loadForm();
  },
  methods: {
    onSave() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this
          .$confirm("您确定要新增该日结单吗？", "提示", { type: "warning" })
          .then(() => {
            request.postJson(_this.apiSaveUrl, _this.ruleForm).then((data) => {
              _this.$message.success("保存成功!");
              _this.reset();
              window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();

            }).catch((error) => {
              _this.$message.error(error);
            });
          });
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$confirm("取消后当前页面数据将不会被保存，您确定要取消吗？", "提示", { type: "warning" }).then(() => {
        window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();
      });
    },
    reset() {
      this.ruleForm = {
        userName: "",
        upperAdmin: "",
        handinAmount: "",
        operatorGroup: "",
        collectAmount: "",
        refundAmount: "",
        pendHandinAmount: "",
        dailyBalanceAmount: "",
        remark: ""
      };
    },
    loadForm() {
      this.$http.get(kindo.config.api.unifiedCollectUrl + "/api/daily/record/init").then(data => {
        this.ruleForm.userName = data.userName;
        this.ruleForm.upperAdmin = data.upperAdmin;
        this.ruleForm.operatorGroup = data.operatorGroup;
        this.ruleForm.collectAmount = data.collectAmount;
        this.ruleForm.pendHandinAmount = data.pendHandinAmount;
        this.ruleForm.dailyBalanceAmount = data.dailyBalanceAmount;
        this.ruleForm.handinAmount = data.handinAmount;
        this.ruleForm.refundAmount = data.refundAmount;
        this.ruleForm.remark = data.remark;
      });
    }
  }
};
</script>

<style>
.icon-button {
  font-size: medium;
}
.el-form {
  margin-top: 30px;
}

.clearfix {
  line-height: 20px;
}
.box-card {
  width: 100%;
}
</style>