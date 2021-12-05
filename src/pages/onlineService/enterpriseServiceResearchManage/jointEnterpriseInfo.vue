/**
 * @file 联合企业信息
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="联合企业信息" name="first">
      <el-form
        v-for="(item, index) in newArray"
        :key="index"
        :model="item.ruleForm"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-row style="margin:30px 0px 12px 0px">
          <el-col :span="8">
            <el-form-item label="类型：" prop="type">{{item.ruleForm.type === "2" ? '联合方': '申请方'}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactsPhone">{{item.ruleForm.contactsPhone}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">
              {{item.ruleForm.companyName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenceNo">{{item.ruleForm.businessLicenceNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">{{item.ruleForm.exhibitionArea}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="affiliatedTradingGroup">{{item.ruleForm.affiliatedTradingGroup}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="phase">{{item.ruleForm.phase}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">{{item.ruleForm.businessAssociation}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">{{item.ruleForm.boothNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本企业确认：" prop="companyConfirm">{{item.ruleForm.companyConfirm}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothKind">{{item.ruleForm.boothKind}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终审结果：" prop="finalResult">{{item.ruleForm.finalResult}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="exhibitionKind">{{item.ruleForm.exhibitionKind}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易团审核：" prop="panelAudit">{{item.ruleForm.panelAudit}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalPerson">{{item.ruleForm.legalPerson}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会审核：" prop="businessAssociationAudit">{{item.ruleForm.businessAssociationAudit}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contacts">{{item.ruleForm.contacts}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广交会审核：" prop="gjhAudit">{{item.ruleForm.gjhAudit}}</el-form-item>
          </el-col>
        </el-row>
        <div style="height:0px;border-top:1px black dashed;"/>
      </el-form>
      <el-form
        :model="rulesForm"
        :rules="rules"
        ref="rulesForm"
        label-width="200px"
        class="demo-ruleForm"
        >
        <el-row style="margin:30px 0px 0px">
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">
              <el-select v-model="rulesForm.companyName" placeholder="请选择">
                <el-option
                  v-for="item in selectCompany"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalPerson">
              <el-input v-model="rulesForm.legalPerson" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">
              <el-select v-model="rulesForm.exhibitionArea" placeholder="请选择">
                <el-option
                  v-for="item in dictionaryData.exhibitionArea"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contacts">
              <el-input v-model="rulesForm.contacts" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="phase">
              <el-select v-model="rulesForm.phase" placeholder="请选择">
                <el-option
                  v-for="item in dictionaryData.phase"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactsPhone">
              <el-input v-model="rulesForm.contactsPhone" placeholder="请输入" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">
              <el-select v-model="rulesForm.boothNo" placeholder="请输入">
                <el-option
                  v-for="item in dictionaryData.boothNo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenceNo">
              <el-input v-model="rulesForm.businessLicenceNo" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothKind">
              <el-select v-model="rulesForm.boothKind" placeholder="请选择">
                <el-option
                  v-for="item in dictionaryData.boothKind"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="tradingGroup">
              <el-select v-model="rulesForm.affiliatedTradingGroup" placeholder="请选择">
                <el-option
                  v-for="item in tradeList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="exhibitionKind">
              <el-select v-model="rulesForm.exhibitionKind" placeholder="请选择">
                <el-option
                  v-for="item in dictionaryData.exhibitionKind"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">
              <el-select v-model="rulesForm.businessAssociation" placeholder="请选择">
                <el-option
                  v-for="item in dictionaryData.businessAssociation"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="el-form-item-btn">
          <el-button v-show="formShow" class="add_btn" @click="addForm('ruleForm')">新增企业联合</el-button>
          <el-button class="btn1" @click="submitForm('ruleForm')">提交</el-button>
          <el-button class="btn2" @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from '@/scripts/project/utils';
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          return callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      formShow: true,
      tradeList: [],
      newArray: [],
      unionData: [],
      editType: "",
      activeName: "first",
      rulesForm: {
        exhibitionApplyId: "",
        affiliatedTradingGroup: "",
        createSession: "125",
        companyId: "",
        companyName: "",
        exhibitionArea: "",
        phase: "",
        boothNo: "",
        applyCode: "",
        boothKind: "",
        exhibitionKind: "",
        legalPerson: "",
        contacts: "",
        contactsPhone: "",
        businessLicenceNo: "",
        modifierId: "",
        modifierName: "",
        type: "2",
        applyCompanyId: "1",
        otherCompanyOpinion: "",
        businessAssociation: ""
      },
      rules: {
        // 表单验证
        phase: [
          {
            required: true, message: "请输入展期", trigger: "blur"
          },
          {
            max: 10, message: '展期超过长度', trigger: 'change'
          }
        ],
        applyCode: [
          {
            required: true, message: "请输入申请编号", trigger: "blur"
          },
          {
            max: 20, message: '申请编号超出长度', trigger: 'change'
          }
        ],
        legalPerson: [
          {
            required: true, message: "请输入法定联系人名称", trigger: "blur"
          },
          {
            max: 20, message: '法定联系人名称超出长度', trigger: 'change'
          }
        ],
        contacts: [
          {
            required: true, message: "请输入联系人", trigger: "blur"
          },
          {
            max: 20, message: '联系人超出长度', trigger: 'change'
          }
        ],
        contactsPhone: [
          {
            required: true, message: "请输入联系电话", trigger: "blur"
          },
          {
            validator: checkPhone, trigger: 'blur'
          }
        ],
        businessLicenceNo: [
          {
            required: true, message: "请输入企业营业执照注册号", trigger: "blur"
          },
          {
            max: 50, message: "企业营业执照注册号超出长度", trigger: 'change'
          }
        ]
      }
    };
  },
  created() {
    this.tradeList = JSON.parse(localStorage.getItem("dictData")).tradingGroup;
    this.selectCompanyNameByCompanyId();
    if (this.$route.params.editType === 'editbtn') {
      this.selectCompanyNameByCompanyId();
      this.$router.currentRoute.params.unionData.forEach((value, index) => {
        if (value.type === '联合方') {
          this.formShow = false;
          for (let key in value) {
            if (key !== 'type') {
              this.rulesForm[key] = value[key];
            }
          }
        }
      });
    }
    let newObject = {};
    newObject.ruleForm = this.$route.params.ruleForm;
    this.newArray.push(newObject);
    let _this = this;
    let dicData = JSON.parse(localStorage.getItem("dictData"));
    this.newArray.forEach((value, index, array) => {
      value.ruleForm.affiliatedTradingGroup = $helper.getDicText(dicData.tradingGroup, value.ruleForm.affiliatedTradingGroup);
      value.ruleForm.phase = $helper.getDicLabel(_this.dictionaryData.phase, value.ruleForm.phase);
      value.ruleForm.exhibitionArea = $helper.getDicLabel(_this.dictionaryData.exhibitionArea, value.ruleForm.exhibitionArea);
      value.ruleForm.boothNo = $helper.getDicLabel(_this.dictionaryData.boothNo, value.ruleForm.boothNo);
      value.ruleForm.boothKind = $helper.getDicLabel(_this.dictionaryData.boothKind, value.ruleForm.boothKind);
      value.ruleForm.exhibitionKind = $helper.getDicLabel(_this.dictionaryData.exhibitionKind, value.ruleForm.exhibitionKind);
      value.ruleForm.businessAssociation = $helper.getDicLabel(_this.dictionaryData.businessAssociation, value.ruleForm.businessAssociation);
    });
  },
  computed: {
    ...mapGetters('companyApplyUnionExhibition', ['companyApplyUnionExhibitionList', "selectCompany", "updateUnionExhibitionInfo"]),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  methods: {
    ...mapActions('companyApplyUnionExhibition', ['getCompanyApplyList', 'selectCompanyNameByCompanyId', "updateUnionExhibitionData"]),
    handleClick(tab, event) {},
    submitForm() {
      let _this = this;
      let dicData = JSON.parse(localStorage.getItem("dictData"));
      this.$refs["rulesForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          let currentArray = [];
          this.rulesForm.companyId = this.rulesForm.companyName;
          currentArray.push(this.rulesForm);
          this.newArray.forEach((value, index, array) => {
            value.ruleForm.affiliatedTradingGroup = $helper.getDicValue(dicData.tradingGroup, value.ruleForm.affiliatedTradingGroup);
            value.ruleForm.phase = $helper.getDicCode(_this.dictionaryData.phase, value.ruleForm.phase);
            value.ruleForm.exhibitionArea = $helper.getDicCode(_this.dictionaryData.exhibitionArea, value.ruleForm.exhibitionArea);
            value.ruleForm.boothNo = $helper.getDicCode(_this.dictionaryData.boothNo, value.ruleForm.boothNo);
            value.ruleForm.boothKind = $helper.getDicCode(_this.dictionaryData.boothKind, value.ruleForm.boothKind);
            value.ruleForm.exhibitionKind = $helper.getDicCode(_this.dictionaryData.exhibitionKind, value.ruleForm.exhibitionKind);
            value.ruleForm.businessAssociation = $helper.getDicCode(_this.dictionaryData.businessAssociation, value.ruleForm.businessAssociation);
            currentArray.push(value.ruleForm);
          });
          if (_this.$route.params.editType === 'passbtn') {
            this.$confirm("确认提交？", "提示信息", {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: "success",
              center: true
            }).then(() => {
              _this.getCompanyApplyList(currentArray).then(res => {
                _this.loading = false;
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                });
                this.$router.push({
                  name: "联合布展"
                });
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消成功'
              });
              this.$router.push({
                name: "联合布展"
              });
            });
          } else {
            this.$confirm("确认修改？", "提示信息", {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: "success",
              center: true
            }).then(() => {
              _this.updateUnionExhibitionData({ "applyUpdateSession": currentArray }).then(res => {
                _this.loading = false;
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.$router.push({
                  name: "联合布展"
                });
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '修改失败'
              });
            });
          } 
        } else {
          this.$message.error("您输入的信息有误");
        }
      });
    },
    // 增加一条数据并隐藏按钮
    addForm() {
      this.$refs["rulesForm"].validate((valid) => {
        if (valid) {
          let _this = this;
          let dicData = JSON.parse(localStorage.getItem("dictData"));
          // 深拷贝
          let temp = JSON.parse(JSON.stringify(this.rulesForm));
          temp.affiliatedTradingGroup = $helper.getDicText(dicData.tradingGroup, temp.affiliatedTradingGroup);
          temp.phase = $helper.getDicLabel(_this.dictionaryData.phase, temp.phase);
          temp.exhibitionArea = $helper.getDicLabel(_this.dictionaryData.exhibitionArea, temp.exhibitionArea);
          temp.boothNo = $helper.getDicLabel(_this.dictionaryData.boothNo, temp.boothNo);
          temp.boothKind = $helper.getDicLabel(_this.dictionaryData.boothKind, temp.boothKind);
          temp.exhibitionKind = $helper.getDicLabel(_this.dictionaryData.exhibitionKind, temp.exhibitionKind);
          temp.businessAssociation = $helper.getDicLabel(_this.dictionaryData.businessAssociation, temp.businessAssociation);
          temp.type = "2";
          let applyForm = {
            ruleForm: temp
          };
          this.newArray.push(applyForm);
          this.formShow = false;
        } else {
          this.$message.error("请输入必填项");
        }
      });
      // 重置表单数据
      this.$refs['rulesForm'].resetFields();
    },
    resetForm() {
      // 路由传参
      this.$router.push({
        name: "联合布展"
      });
      // 重置表单数据
      this.$refs['rulesForm'].resetFields();
    }
  }
};
</script>
<style scoped>
.el-form-item-btn {
  position: relative;
  left: 15%;
  margin-top: 50px;
}
.el-form-item {
  margin-bottom: 20px;
}
.btn1 {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
.add_btn {
  background-color: red;
  color: white;
  width: 120px;
  height: 40px;
}
</style>


