/**
 * @file 企业申请联合布展业务
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="申请联合布展业务" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        :dictionary="osDictionaryData"
        class="demo-ruleForm"
      >
        <!-- <el-form-item style="margin:30px 0px 12px 0px" label="企业名称：" prop="companyId">
          <el-input v-model="ruleForm.companyName" placeholder="请选择">
          </el-input>
        </el-form-item> -->
        <el-form-item label="展区：" prop="exhibitionArea">
          <el-select v-model="ruleForm.exhibitionArea" placeholder="请选择">
            <el-option
              v-for="item in osDictionaryData.exhibitionArea"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期：" prop="phase">
          <el-select v-model="ruleForm.phase" placeholder="请选择">
            <el-option
              v-for="item in osDictionaryData.phase"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位号：" prop="boothNo">
          <el-select v-model="ruleForm.boothNo" placeholder="请选择">
            <el-option
              v-for="item in osDictionaryData.boothNo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="申请编号：" prop="applyCode">
          <el-input v-model="ruleForm.applyCode" placeholder="请输入"></el-input>
        </el-form-item> -->
        <el-form-item label="展位类型：" prop="boothKind">
          <el-select v-model="ruleForm.boothKind" placeholder="请选择">
            <el-option
              v-for="item in osDictionaryData.boothKind"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布展类型：" prop="exhibitionKind">
          <el-select v-model="ruleForm.exhibitionKind" placeholder="请选择">
            <el-option
              v-for="item in osDictionaryData.exhibitionKind"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="法定联系人：" prop="legalPerson">
          <el-input v-model="ruleForm.legalPerson" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts">
          <el-input v-model="ruleForm.contacts" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contactsPhone">
          <el-input v-model="ruleForm.contactsPhone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="营业执照注册号：" prop="businessLicenceNo">
          <el-input v-model="ruleForm.businessLicenceNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属交易团：" prop="tradingGroup">
          <el-select v-model="ruleForm.affiliatedTradingGroup" placeholder="请选择">
            <el-option
              v-for="item in dictData.tradingGroup"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会：" prop="businessAssociation">
          <el-select v-model="ruleForm.businessAssociation" placeholder="请选择">
            <el-option
              v-for="item in osDictionaryData.businessAssociation"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">下一步</el-button>
          <el-button class="btn2" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
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
      dictData: [],
      initParams: {
        "unionExhibitionInfoSession":
        {
          "applyCode": this.$route.params.applyCode
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      centerDialogVisible: false,
      editType: "",
      fileList: [],
      activeName: "first",
      ruleForm: {
        createSession: "125",
        companyId: localStorage.getItem("getComPanyId"),
        applyCompanyId: "1",
        type: "1",
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
        companyName: "",
        affiliatedTradingGroup: "",
        exhibitionApplyId: "",
        otherCompanyOpinion: "",
        businessAssociation: ""
      },
      businessList: [],
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
    let _this = this;
    this.selectCompanyNameByCompanyId();
    if (localStorage.getItem("dictData")) {
      this.dictData = JSON.parse(localStorage.getItem("dictData"));
    }
    this.editType = this.$route.params.type;
    // 判断按钮类别
    if (this.$route.params.type === 'editbtn') {
      this.selectCompanyNameByCompanyId();
      this.getUnionExhibitionInfo(this.initParams).then(res => {
        res.records.forEach((value, index) => {
          if (value.type === '申请方') {
            for (let key in value) {
              if (key !== 'type') {
                this.ruleForm[key] = value[key];
              }
            }
          }
        });
        _this.ruleForm.affiliatedTradingGroup = $helper.getDicValue(_this.dictData.tradingGroup, _this.ruleForm.affiliatedTradingGroup);
        _this.ruleForm.phase = $helper.getDicCode(_this.osDictionaryData.phase, _this.ruleForm.phase);
        _this.ruleForm.exhibitionArea = $helper.getDicCode(_this.osDictionaryData.exhibitionArea, _this.ruleForm.exhibitionArea);
        _this.ruleForm.boothNo = $helper.getDicCode(_this.osDictionaryData.boothNo, _this.ruleForm.boothNo);
        _this.ruleForm.boothKind = $helper.getDicCode(_this.osDictionaryData.boothKind, _this.ruleForm.boothKind);
        _this.ruleForm.exhibitionKind = $helper.getDicCode(_this.osDictionaryData.exhibitionKind, _this.ruleForm.exhibitionKind);
        _this.ruleForm.businessAssociation = $helper.getDicCode(_this.osDictionaryData.businessAssociation, _this.ruleForm.businessAssociation);
      });
    }
  },
  computed: {
    ...mapGetters('dictionary', ['osDictionaryData']),
    ...mapGetters('companyApplyUnionExhibition', ['getUnionExhibition', 'selectCompany'])
  },
  methods: {
    ...mapActions('companyApplyUnionExhibition', ['getUnionExhibitionInfo', 'selectCompanyNameByCompanyId']),
    submitForm() {
      let temp = JSON.parse(JSON.stringify(this.ruleForm));
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 路由传参
          this.$router.push({
            name: "联合企业信息",
            params: {
              ruleForm: temp,
              unionData: this.getUnionExhibition.data,
              editType: this.editType
            }
          });
        } else {
          this.$message.error("您输入的信息有误");
        }
      });
    },
    resetForm() {
      // 重置表单数据
      // this.$refs['ruleForm'].resetFields();
      this.$router.push({
        name: "联合布展"
      });
    },
    handleClick(tab, event) {}
  }
};
</script>
<style scoped>
.el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
  margin: 20px 0px 5px;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
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
</style>


