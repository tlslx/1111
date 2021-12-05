/**
 * @file 企业发送邀请邮件
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="企业发送邀请邮件" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm" v-loading="loading">
        <el-form-item label="选择客户：" prop="emailList">
          <el-select v-model="customerData" multiple placeholder="请选择" @change="changeCus" clearable :disabled="disabled">
            <el-option v-for="item in getallcustomer" :key="item.email" :label="item.companyName" :value="item.email"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮件模板：" prop="emailModelId">
          <el-select v-model="ruleForm.emailModelId" placeholder="请选择" clearable :disabled="disabled" @change="changeModel">
            <el-option v-for="item in getallemail" :key="item.emailModelId" :label="item.emailTopic" :value="item.emailModelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参展企业名称：" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="" disabled clearable></el-input>
          <el-radio-group v-model="firmName" @change="firmChange" :disabled="disabled">
            <el-radio :label="0">填充公司中文名字</el-radio>
            <el-radio :label="1">填充公司英文名字</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="请输入" :disabled="disabled" clearable maxlength="48"></el-input>
          <el-radio-group v-model="contactName" @change="contactChange" :disabled="disabled">
            <el-radio :label="0">填充联系人中文名字</el-radio>
            <el-radio :label="1">填充联系人英文名字</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="参加广交会时间：">
          <div v-model="ruleForm.boothOneDate">
            <el-row class="date-row">
              <el-col :span="14">
                <el-checkbox v-model="checkedOne" @change="checkOne" :disabled="disabled">第一期：4月15日-4月19日</el-checkbox>
              </el-col>
              <el-col :span="10" v-if="isShow">
                展位号：<el-input v-model="ruleForm.boothOneNo" maxlength="128" placeholder="请输入" class="date-text" :disabled="disabled" clearable></el-input>
              </el-col>
            </el-row>
            <el-row class="date-row">
              <el-col :span="14">
                <el-checkbox v-model="checkedTwo" @change="checkTwo" :disabled="disabled">第二期：5月15日-5月19日</el-checkbox>
              </el-col>
              <el-col :span="10" v-if="isShowTwo">
                展位号：<el-input v-model="ruleForm.boothTwoNo" maxlength="128" placeholder="请输入" class="date-text" :disabled="disabled" clearable></el-input>
              </el-col>
            </el-row>
            <el-row class="date-row">
              <el-col :span="14">
                <el-checkbox v-model="checkedThree" @change="checkThree" :disabled="disabled">第三期：6月15日-6月19日</el-checkbox>
              </el-col>
              <el-col :span="10" v-if="isShowThree">
                展位号：<el-input v-model="ruleForm.boothThreeNo" maxlength="128" placeholder="请输入" class="date-text" :disabled="disabled" clearable></el-input>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="电话：" prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入" maxlength="16" :disabled="disabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="参展企业E-mail：" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入" maxlength="48" :disabled="disabled" clearable></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button type="success" class="btn" @click="preview">预览</el-button>
          <el-button type="danger" class="btn" @click="send('ruleForm')" :disabled="disabled">发送</el-button>
          <el-button class="btn" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="预览" :visible.sync="dialogFormVisible" :close="dialogClose">
        <dialog-form :form="preForm" :data="preData" :maildata="preMailData"></dialog-form>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import enterSendDialogForm from "@/components/project/onlineService/enterpriseServiceResearchManage/enterSendDialogForm.vue";
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
   // 注册表格、分页组件
  components: {
    "dialog-form": enterSendDialogForm
  },
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        return callback();
      } else {
        let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!str.test(value)) {
          return callback(new Error('请输入正确邮箱格式'));
        }
        return callback();
      }
    };
    return {
      // tab
      activeName: "first",
      // 判断 {新增：0   查看：1  编辑：2}
      isExpo: "0",
      // disabled
      disabled: false,
      // loading
      loading: true,
      // 弹框
      // dialogTableVisible: false,
      dialogFormVisible: false,
      // 选择客户数组
      customerData: [],
      // 弹框客户数组
      preData: [],
      // 弹框邮件数组
      preMailData: [],
      // 第一期展位号
      isShow: false,
      // 第二期展位号
      isShowTwo: false,
      // 第三期展位号
      isShowThree: false,
      // 第一期展勾选
      checkedOne: false,
      // 第二期勾选
      checkedTwo: false,
      // 第三期勾选
      checkedThree: false,
      // 填充联系人中文名字
      contactName: null,
      // 填充企业中文名称
      firmName: null,
      // 企业联系人暂存对象
      contactObj: {},
      // 表单
      ruleForm: {
        // 客户
        emailList: "",
        // 邮件模版
        emailModelId: "",
        // 联系人
        contact: "",
        // 联系电话
        tel: "",
        // 联系邮箱
        email: "",
        // 第一展位号
        boothOneNo: "",
        // 第二展位号
        boothTwoNo: "",
        // 第三展位号
        boothThreeNo: "",
        // 第二展位日期
        boothTwoDate: "",
       // 第三展位日期
        boothThreeDate: "",
        // 第一展位日期
        boothOneDate: "",
        // 企业名称
        companyName: ""
      },
      // 预览对象
      preForm: {},
      // 校验
      rules: {
        emailList: [{ required: true, message: "请选择", trigger: "blur" }],
        emailModelId: [{ required: true, message: "请选择", trigger: "change" }],
        email: [{ trigger: "blur", validator: validateEmail }]
      },
      // 传参
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "desc": true
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [localStorage.getItem("getComPanyId")],
            "description": ""
          }
        ]
      },
      // 邮件传参
      emailParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "desc": true
          }
        ],
        "customQueryParams": [
          {
            "name": "session",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('enterprisesInviteCustomers', ['getallcustomer', 'getallemail'])
  },
  mounted() {
    // 初始客户选项
    this.getCustomerAllListInfo(this.searchParams).then(res => {
      this.loading = false;
      // 预览客户数组暂存
      this.preData = res;
    });
    // 初始邮件选项
    this.getEmailModelAllListInfo(this.emailParams).then(res => {
      this.loading = false;
      // 预览邮件数组暂存
      this.preMailData = res;
    });
    // 假设公司id为1
    let companyId = localStorage.getItem("getComPanyId");
    // 初始企业与联系人，根据radio赋值
    this.getCompanyContactInfo(companyId).then(res => {
      // 暂存企业与联系人对象
      this.contactObj = res;
      // if (this.firmName === 0) {
      //   // 表单企业名称赋值
      //   this.ruleForm.companyName = this.contactObj.companyName;
      // } else {
      //   this.ruleForm.companyName = this.contactObj.companyNameEn;
      // }
    });
  },
  created() {
    // 获取届数
    this.getSessionInfo();
    // 判断不同页面 isExpo{1：查看 2：编辑 0：新增}
    if (this.$route.query.isExpo === "2") {
      this.getDetail();
    } else if (this.$route.query.isExpo === "1") {
      this.getDetail();
      this.disabled = true;
    } else {
      this.ruleForm = {};
    }
  },
  methods: {
    // 获取届数
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('enterprisesInviteCustomers', ['getCustomerAllListInfo', 'updateInvitationInfo', 'addInvitationInfo', 'getCompanyContactInfo', 'getInvitationDetailInfo', 'getEmailModelAllListInfo']),
    // 获取详情
    getDetail() {
      // 调详情接口
      this.getInvitationDetailInfo(this.$route.query.customerInvitationId).then(res => {
        this.ruleForm = res;
        // 转换
        this.traData();
        // 根据值存在，勾选checkbox
        if (res.boothOneDate) {
          this.checkedOne = true;
          this.isShow = true;
        } else {
          this.checkedOne = false;
        }
        // 根据值存在，勾选checkbox
        if (res.boothTwoDate) {
          this.checkedTwo = true;
          this.isShowTwo = true;
        } else {
          this.checkedTwo = false;
        }
        // 根据值存在，勾选checkbox
        if (res.boothThreeDate) {
          this.checkedThree = true;
          this.isShowThree = true;
        } else {
          this.checkedThree = false;
        }
      });
    },
    // 初始转换
    traData() {
      let emails = [];
      // 非新增页面进入转换
      if (this.ruleForm.emailList !== "") {
        emails = this.ruleForm.emailList.split(",");
      }
      this.customerData = emails;
    },
    // 客户选择改变
    changeCus(val) {
      let str = "";
      this.customerData = val;
      for (let i = 0; i < this.customerData.length; i++) {
        str = this.customerData[i] + ',' + str;
      }
      // 将选择的数组以逗号形式组成字符串
      this.ruleForm.emailList = str.substring(0, str.lastIndexOf(','));
    },
    // 邮件选择改变
    changeModel(val) {
      this.ruleForm.emailModelId = val;
    },
    // 第一期时间勾选
    checkOne(val) {
      this.isShow = !this.isShow;
      if (val) {
        this.ruleForm.boothOneDate = "4月15日-4月19日";
      } else {
        this.ruleForm.boothOneDate = "";
      }
    },
     // 第二期时间勾选
    checkTwo(val) {
      this.isShowTwo = !this.isShowTwo;
      if (val) {
        this.ruleForm.boothTwoDate = "5月15日-5月19日";
      } else {
        this.ruleForm.boothTwoDate = "";
      }
    },
    // 第三期时间勾选
    checkThree(val) {
      this.isShowThree = !this.isShowThree;
      if (val) {
        this.ruleForm.boothThreeDate = "6月15日-6月19日";
      } else {
        this.ruleForm.boothThreeDate = "";
      }
    },
    // 联系人改变中英文
    contactChange(val) {
      if (val === 0) {
        // 渲染
        this.$set(this.ruleForm, "contact", this.contactObj.businessContactsCh);
      } else {
        this.$set(this.ruleForm, "contact", this.contactObj.businessContactsEn);
      }
    },
    // 公司名称改变中英文
    firmChange(val) {
      if (val === 0) {
        this.$set(this.ruleForm, "companyName", this.contactObj.companyName);
      } else {
        this.$set(this.ruleForm, "companyName", this.contactObj.companyNameEn);
      }
    },
    // 预览
    preview() {
      this.preForm = JSON.parse(JSON.stringify(this.ruleForm));
      let emails = [];
      let str = "";
      // 将传进来的字符串转成数组
      if (this.preForm.emailList && this.preForm.emailList !== "") {
        emails = this.preForm.emailList.split(",");

        // 遍历客户数组
        this.preData.map(el => {
          emails.map(ele => {
            if (el.email === ele) {
              // 对应名称以逗号隔开显示
              str = el.companyName + ',' + str;
            }
          });
        });
        // 去除最后一个逗号
        this.preForm.emailList = str.substring(0, str.lastIndexOf(','));
      }
      // 遍历邮件数组
      this.preMailData.map(res => {
        if (res.emailModelId === this.preForm.emailModelId) {
          // 显示邮件模版内容
          this.preForm.emailModelId = res.emailTopic;
        }
      });
      this.dialogFormVisible = true;
    },
    dialogClose() {
      this.dialogFormVisible = false;
    },
    // 发送
    send(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendParam();
        } else {
          return false;
        }
      });
    },
    // 发送
    sendParam() {
      // loading
      this.loading = true;
      let data = this.ruleForm;
      // 去除空属性
      for (const key in data) {              // 去除对象内多余的空值key
        if (data[key] === '' || !data[key]) {
          delete data[key];
        }
      }
      // 定义data
      data.modifierId = this.$store.getters.userInfo.userId;
      data.modifierName = this.$store.getters.userInfo.userName;
      data.session = this.session;
      data.sendStatus = "1";
      data.companyId = localStorage.getItem("getComPanyId");
      // 新增提交
      if (this.$route.query.isExpo === "0") {
        let param = {
          "invitationInfo": data
        };
        this.addInvitationInfo(param).then(res => {
          this.loading = false;
          this.$router.push("/invitationList");
        });
      } else {
         // 编辑提交
        data.customerInvitationId = this.ruleForm.customerInvitationId;
        let params = {
          "invitationInfo": data
        };
        this.updateInvitationInfo(params).then(res => {
          this.loading = false;
          this.$router.push("/invitationList");
        });
      }
    },
    // 取消退出
    cancel() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
  margin-bottom:22px;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.btn {
  width: 120px;
  height: 40px;
}
.btn-select{
  margin: 5px 0;
}
.date-row{
  margin-bottom:12px;
}
.date-text{
  float: right;
  width: 100px;
}
/* .el-select-dropdown__item {
  width: 400px;
} */
</style>


