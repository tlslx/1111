/**
 * @file 成交统计录入（编码）
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="成交统计录入表" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="240px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="企业广交会编码：" prop="enterpriseGjhCode">
          <el-input v-model="ruleForm.enterpriseGjhCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业名称：" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="摊位号：" prop="boothNo">
          <el-select v-model="ruleForm.boothNo" placeholder="【第一期】2.C240">
            <el-option label="【第一期】2.C240" value="first"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家：" prop="country">
          <el-select v-model="ruleForm.country" placeholder="【AUT】奥地利">
            <el-option label="【AUT】奥地利" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品代码：" prop="commodityCode">
          <div style="display: flex;">
            <el-input v-model="ruleForm.commodityCode" placeholder="请输入"></el-input>
            <span style="color: red;position: absolute;right: -90px;">选择商品代码</span>
          </div>
        </el-form-item>

        <el-form-item class="el-time" label="短单（3个月以内）：成交金额：" prop="shortCjAmount">
          <div style="display: flex;">
            <el-input v-model="ruleForm.shortCjAmount" placeholder="请输入"></el-input>
            <span style="color: red;position: absolute;right: -50px;">万美元</span>
          </div>
        </el-form-item>

        <el-form-item class="el-time" label="订单数：" prop="shortCjOrderAmount">
          <el-input v-model="ruleForm.shortCjOrderAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="el-time" label="中单（3-6个月以内）：成交金额：" prop="middleCjAmount">
          <div style="display: flex;">
            <el-input v-model="ruleForm.middleCjAmount" placeholder="请输入"></el-input>
            <span style="color: red;position: absolute;right: -50px;">万美元</span>
          </div>
        </el-form-item>
        <el-form-item class="el-time" label="订单数：" prop="middleCjOrderAmount">
          <el-input v-model="ruleForm.middleCjOrderAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="el-time" label="长单（6个月以上）：成交金额：" prop="longCjAmount">
          <div style="display: flex;">
            <el-input v-model="ruleForm.longCjAmount" placeholder="请输入"></el-input>
            <span style="color: red;position: absolute;right: -50px;">万美元</span>
          </div>
        </el-form-item>
        <el-form-item class="el-time" label="订单数：" prop="longCjOrderAmount">
          <el-input v-model="ruleForm.longCjOrderAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">提交</el-button>
          <el-button class="btn2" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        enterpriseGjhCode: "",
        companyName: "",
        boothNo: "",
        country: "",
        commodityCode: "",
        shortCjAmount: "",
        shortCjOrderAmount: "",
        middleCjAmount: "",
        middleCjOrderAmount: "",
        longCjAmount: "",
        longCjOrderAmount: ""
      },
      rules: {
        enterpriseGjhCode: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        boothNo: [{ required: true, message: "", trigger: "change" }],
        country: [{ required: true, message: "", trigger: "change" }],
        commodityCode: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style scoped>
.el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
}
.el-time {
  width: 500px;
  position: relative;
  left: 27%;
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


