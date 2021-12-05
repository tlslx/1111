<style scoped>
.marlet {
  margin-left: 230px;
}
</style>

<template>
  <div style="margin-left: 200px">
    <el-form :model="ruleForm" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="企业名称：">
        <!-- <template></template>  :rules="rules"-->
        <span>{{ruleForm.companyName}}</span>
      </el-form-item>
      <el-form-item label="企业广交会编码：">
        <!-- <template></template> -->
        <span>{{ruleForm.cantonCode}}</span>
      </el-form-item>
      <el-form-item label="交易团：">
        <!-- <template slot-scope="scope"> -->
        <span>{{ruleForm.businessDelegationId}}</span>
        <!-- </template> -->
      </el-form-item>
      <el-form-item label="商协会：">
        <!-- <template></template> -->
        <span>{{ruleForm.businessAssociation}}</span>
      </el-form-item>
      <el-form-item label="海关商品编码：">
        <!-- <template></template> -->
        <span>{{ruleForm.hsCode}}</span>
      </el-form-item>
      <el-form-item label="对应商品名称：">
        <!-- <template></template> -->
        <span>{{ruleForm.exhibitsName}}</span>
      </el-form-item>     
      <el-form-item label="建议原因：">
        <el-input
          type="textarea"
          style="width: 35%"
          :rows="5"
          v-model="ruleForm.addExhibitionArea"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="审核建议：">
       <el-input
          type="textarea"
          style="width: 35%"
          :rows="5"
          maxlength="100"
          placeholder="请输入内容"
          v-model="ruleForm.approveExplain"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="this.$router.history.current.query.id !==1">
        <el-button type="primary" @click="submitForm(ruleForm)">审核通过</el-button>
        <el-button @click="resetForm">审核不通过</el-button>
        <el-button type="danger" @click="clickBack">返回</el-button>
      </el-form-item>
      <el-button class="marlet" v-else type="danger" @click="clickReturn">返回</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        companyName: "",
        cantonCode: "",
        businessDelegationId: "",
        businessAssociation: "",
        hsCode: "",
        exhibitsName: "",
        addExhibitionArea: "",
        approveStatus: "",
        adjustId: "",
        approveExplain: ""
      }
    };
  },
  created() {
    this.ruleForm.approveStatus = this.$router.history.current.query.data.approveStatus;
    this.ruleForm.adjustId = this.$router.history.current.query.data.adjustId;
    this.ruleForm.companyName = this.$router.history.current.query.data.companyName;
    this.ruleForm.cantonCode = this.$router.history.current.query.data.cantonCode;
    this.ruleForm.businessDelegationId = this.$router.history.current.query.data.businessDelegationId;
    this.ruleForm.businessAssociation = this.$router.history.current.query.data.businessAssociation;
    this.ruleForm.hsCode = this.$router.history.current.query.data.hsCode;
    this.ruleForm.exhibitsName = this.$router.history.current.query.data.exhibitsName;
    this.ruleForm.addExhibitionArea = this.$router.history.current.query.data.addExhibitionArea;
  },
  computed: {
    ...mapGetters("companyInfomation", ["postAreaAdjust"])
  },
  methods: {
    ...mapActions("companyInfomation", ["postReviewAreaAdjustment"]),
    // 审核通过
    submitForm(add) {
      this.$confirm("审核通过, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          if (this.$router.history.current.query.id === 2) {
            this.ruleForm.businessDelegationStatus = "1";
            // this.ruleForm.approveExplain = 
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          } else if (this.$router.history.current.query.id === 3) {
            this.ruleForm.businessAssociationStatus = "1";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          } else if (this.$router.history.current.query.id === 4) {
            this.ruleForm.workDepartmentStatus = "1";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          } else if (this.$router.history.current.query.id === 5) {
            this.ruleForm.foreignTradeStatus = "1";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    },
    // 审核不通过
    resetForm(form) {
      this.$confirm("审核不通过, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          if (this.$router.history.current.query.id === 2) {
            this.ruleForm.businessDelegationStatus = "2";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          } else if (this.$router.history.current.query.id === 3) {
            this.ruleForm.businessAssociationStatus = "2";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          } else if (this.$router.history.current.query.id === 4) {
            this.ruleForm.workDepartmentStatus = "2";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          } else if (this.$router.history.current.query.id === 5) {
            this.ruleForm.foreignTradeStatus = "2";
            this.postReviewAreaAdjustment(this.ruleForm)
              .then(res => {
                this.$router.go(-1);
              })
              .catch();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    },
    // 返回
    clickBack() {
      this.$router.go(-1);
    },
    clickReturn() {
      this.$router.go(-1);
    }
  }
};
</script>
