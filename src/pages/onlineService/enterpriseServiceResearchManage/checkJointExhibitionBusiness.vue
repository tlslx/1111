/**
 * @file 审核联合布展(商协会)
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="商协会审核联合布展业务" name="first">
      <el-form
        v-for="(item, index) in getUnionExhibition.data"
        :key=index
        :model="item"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-row style="margin:30px 0px 12px 0px">
          <el-col :span="8">
            <el-form-item label="类型：" prop="type">{{item.type}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactsPhone">{{item.contactsPhone}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">{{item.companyName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenceNo">{{item.businessLicenceNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">{{item.exhibitionArea}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="tradingGroup">{{item.affiliatedTradingGroup}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="phase">{{item.phase}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">{{item.businessAssociation}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">{{item.boothNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本企业确认：" prop="companyConfirm">{{item.companyConfirm}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请编号：" prop="applyCode">{{item.applyCode}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终审结果：" prop="approveResult">{{item.approveResult}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothKind">{{item.boothKind}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易团审核：" prop="tradeApproveResult">{{item.tradeApproveResult}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="exhibitionKind">{{item.exhibitionKind}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会审核：" prop="businessApproveResult">{{item.businessApproveResult}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalPerson">{{item.legalPerson}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广交会审核：" prop="cantonApproveResult">{{item.cantonApproveResult}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contacts">{{item.contacts}}</el-form-item>
          </el-col>
        </el-row>
        <div style="height:0px;border-top:1px black dashed;"/>
      </el-form>
      <el-form :model="ruleFormExh">
        <div class="approve_explain">
          <span class="approve">审核意见:</span>
          <el-input
            type="textarea"
            placeholder="请输入审批意见"
            :rows="6"
            v-model="ruleFormExh.approveExplain"
            >
          </el-input>
        </div>
        <div class="el-form-item-btn"> 
          <el-button class="btn1" @click="submitForm(ruleFormExh.approveExplain)">通过</el-button>
          <el-button class="btn2" @click="resetForm(ruleFormExh.approveExplain)">不通过</el-button>
          <el-button class="back" @click="backForm()">返回</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      ruleFormExh: {
        approveExplain: ""
      },
      // 查询传参需要
      initParams: {
        "unionExhibitionInfoSession": {
          "applyCode": ''
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 审核不通过接口传参
      reviewParams: {
        "reviewUnionExhibition": { 
          "exhibitionApplyId": '',
          "businessApproveResult": "0",
          "approveResult": "0", 
          "approveExplain": "",
          "type": "7", 
          "modifierId": "11111",
          "businessId": ''
        }
      },
      // 审核通过接口传参
      passParams: {
        "reviewUnionExhibition": { 
          "exhibitionApplyId": '', 
          "businessApproveResult": "1",
          "approveResult": "3", 
          "approveExplain": "",
          "type": "7", 
          "modifierId": "11111",
          "businessId": ''
        }
      }
    };
  },
  created() {
    if (this.$route.params) {
      this.initParams.unionExhibitionInfoSession.applyCode = this.$route.params.applyCode;
      this.reviewParams.reviewUnionExhibition.exhibitionApplyId = this.$route.params.exhibitionApplyId;
      this.reviewParams.reviewUnionExhibition.businessId = this.$route.params.applyCode;
      this.passParams.reviewUnionExhibition.exhibitionApplyId = this.$route.params.exhibitionApplyId;
      this.passParams.reviewUnionExhibition.businessId = this.$route.params.applyCode;
    }
    this.getUnionExhibitionInfo(this.initParams);
  },
  computed: {
    ...mapGetters('companyApplyUnionExhibition', ['getUnionExhibition', 'reviewUnionExhibitionInfo'])
  },
  methods: {
    handleClick(tab, event) {},
    ...mapActions('companyApplyUnionExhibition', ['getUnionExhibitionInfo', 'reviewUnionExhibitionData']),
    // 通过
    submitForm(approveExplain) {
      this.passParams.reviewUnionExhibition.approveExplain = approveExplain;
      this.reviewUnionExhibitionData(this.passParams).then(res => {
        this.$message({
          type: 'info',
          message: '审核通过'
        });
        this.$router.push({
          name: "商协会审核联合布展"
        });
      });
    },
    // 不通过
    resetForm(approveExplain) {
      this.reviewParams.reviewUnionExhibition.approveExplain = approveExplain;
      this.reviewUnionExhibitionData(this.reviewParams).then(res => {
        this.$message({
          type: 'info',
          message: '审核不通过'
        });
        this.$router.push({
          name: "商协会审核联合布展"
        });
      });
    },
    // 返回
    backForm() {
      this.$router.push({
        name: "商协会审核联合布展"
      });
    }
  }
};
</script>
<style scoped>
.el-form-item__label{
  width: inherit;
}
.el-form-item-btn {
  position: relative;
  left: 15%;
  margin-bottom: 50px;
}
.approve_explain {
  width: 60%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}
.approve {
  width: 15%;
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
.back {
  background-color: white;
  width: 120px;
  height: 40px;
}
</style>


