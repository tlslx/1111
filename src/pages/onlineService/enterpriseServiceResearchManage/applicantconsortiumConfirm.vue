/**
 * @file 申请方确认
 */
<template  >
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="联合布展" name="first">
      <el-form
        v-for="(item, index) in getUnionExhibition.data"
        :key="index"
        :model="item"
        ref="ruleForm"
        :dictionary="osDictionaryData"
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
            <el-form-item label="所属交易团：" prop="affiliatedTradingGroup">
              {{ item.affiliatedTradingGroup }}
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
          class="back_btn"
          @click="back"
        >返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from '@/scripts/project/utils';
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        exhibitionArea: "",
        businessAssociation: "",
        phase: "",
        boothNo: "",
        applyCode: "",
        boothKind: "",
        exhibitionKind: "",
        legalPerson: "",
        affiliatedTradingGroup: "",
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
    this.getUnionExhibitionInfo(this.initParams).then(res => {
      let temp = [];
      temp = JSON.parse(JSON.stringify(res.records));
      temp.forEach((value, index) => {
        value.approveResult = $helper.getDicLabel(this.osDictionaryData.approveResult, value.approveResult);
      });
    });
  },
  computed: {
    ...mapGetters('companyApplyUnionExhibition', ['getUnionExhibition']),
    ...mapGetters('dictionary', ['osDictionaryData'])
  },
  methods: {
    ...mapActions('companyApplyUnionExhibition', ['getUnionExhibitionInfo']),
    handleClick(tab, event) {},
    back() {
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
  margin-top: 50px;
}
.back_btn {
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
</style>


