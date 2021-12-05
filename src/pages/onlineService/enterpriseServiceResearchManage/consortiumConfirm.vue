/**
 * @file 联合方确认
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="联合布展" name="first">
      <!-- {{getExhCom}} -->
      <el-form
        v-for="(item, index) in getExhCom"
        :key="index"
        :model="item"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
       >
        <el-row style="margin:30px 0px 12px 0px">
          <el-col :span="8">
            <el-form-item label="类型：" prop="type">
              {{ item.type }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactsPhone">
              {{ item.contactsPhone }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">
              {{ item.companyName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenceNo">
              {{ item.businessLicenceNo }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">
              {{ item.exhibitionArea }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="tradingGroup">
              {{ item.tradingGroup }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="phase">
              {{ item.phase }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">
              {{ item.businessAssociation }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">
              {{ item.boothNo }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本企业确认：" prop=""></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请编号：" prop="applyCode">
              {{ item.applyCode }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终审结果：" prop="approveResult">
              {{ item.approveResult }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothKind">
              {{ item.boothKind }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易团审核：" prop="tradeApproveResult">
              {{ item.tradeApproveResult }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="exhibitionKind">
              {{ item.exhibitionKind }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会审核：" prop="businessApproveResult">
              {{ item.businessApproveResult }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalPerson">
              {{ item.legalPerson }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广交会审核：" prop="cantonApproveResult">
              {{ item.cantonApproveResult }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contacts">
              {{ item.contacts }}
            </el-form-item>
          </el-col>
        </el-row>
        <div style="height:0px;border-top:1px black dashed;"/>
      </el-form>
      <div class="el-form-item-btn">
        <el-button
          class="comfirm_btn"
          @click="comfirmExh"
        >确认联合布展</el-button>
        <el-button class="reset_btn" @click="resetExh">取消联合布展</el-button>
        <el-button class="back" @click="backExh">返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      arr: [

      ],
      ruleForm: {
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
        tradeApproveResult: "",
        businessApproveResult: "",
        cantonApproveResult: "",
        approveResult: "",
        companyId: "",
        companyName: "",
        applyCompanyId: "",
        otherCompanyOpinion: ""
      },
      newData: [],
      initParams: {
        "unionExhibitionInfoSession":
        {
          "applyCode": this.$route.params.applyCode
        },
        "pageStart": "1",
        "pageSize": "10"
      }
    };
  },
  created() {
    this.getUnionExhibitionInfo(this.initParams);
  },
  computed: {
    ...mapGetters('enterpriseServiceResearchManage', ['getExhCom', 'getConfExhCom'])
  },
  methods: {
    ...mapActions('enterpriseServiceResearchManage', ['getUnionExhibitionInfo', 'getconfirmUnionExhibitionInfo']),
    handleClick(tab, event) {},
    comfirmExh () {
      this.$confirm('确认联合布展?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let confirmParams = {};
        this.getExhCom.forEach((value, index, array) => {
          confirmParams.applyCode = this.$route.params.applyCode;
          confirmParams.companyId = localStorage.getItem("getComPanyId");
          confirmParams.applyCompanyId = "1";
          confirmParams.otherCompanyOpinion = "1";
        });
        this.getconfirmUnionExhibitionInfo(confirmParams).then(res => {
          this.$message({
            type: 'success',
            message: '联合成功!'
          });
          this.$router.push({
            name: "联合布展"
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消联合'
        });
      });
    },
    resetExh() {
      this.$confirm('取消联合布展?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let confirmParams = {};
        this.getExhCom.forEach((value, index, array) => {
          confirmParams.applyCode = this.$route.params.applyCode;
          confirmParams.companyId = localStorage.getItem("getComPanyId");
          confirmParams.applyCompanyId = "1";
          confirmParams.otherCompanyOpinion = "0";
        });
        this.getconfirmUnionExhibitionInfo(confirmParams).then(res => {
          this.$message({
            type: 'success',
            message: '已取消联合!'
          });
          this.$router.push({
            name: "联合布展"
          });
        });
      });
    },
    backExh() {
      this.$router.push({
        name: "联合布展"
      });
    }
  }
};
</script>
<style scoped>
.el-form-item-btn {
  position: relative;
  left: 15%;
  margin-bottom: 50px;
  margin-top: 20px;
}
.comfirm_btn {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.reset_btn {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.back {
  background-color: white;
  width: 120px;
  height: 40px;
}
</style>


