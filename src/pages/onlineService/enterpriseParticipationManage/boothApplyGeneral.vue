/**
 * @file 展位申请（一般性）
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="展位申请审修改" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="展位性质：" prop="boothNature">
          <el-select v-model="ruleForm.boothNature" placeholder="一般性展位">
            <el-option label="一般性展位" value="generalBooth"></el-option>
            <el-option label="品牌展位" value="brandBooth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionArea" style="position: relative;">
          <div style="display: flex;">
            <el-select v-model="ruleForm.exhibitionArea" placeholder="一般性展位">
              <el-option label="日用品展区" value="commodityBooth"></el-option>
              <el-option label="户外运动展区" value="digitalBooth"></el-option>
              <el-option label="数码产品展区" value="videoGameBooth"></el-option>
            </el-select>
            <span style="color: red;position: absolute;right: -550px;">
              若展区列表里没有你要申请的展位，请先在当届展品里
              登记至少三个目标展区下的产品
            </span>
          </div>
        </el-form-item>
        <el-form-item label="展品分类：" prop="exhibitCategory">
          <el-radio-group v-model="ruleForm.exhibitCategory">
            <el-radio label="视听及娱乐产品"></el-radio>
            <el-radio label="通讯产品"></el-radio>
            <el-radio label="其他电子消费产品"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主要展示产品：" prop="mainDisplayProducts">
          <div style="display: flex;">
            <el-select v-model="ruleForm.mainDisplayProducts" placeholder="数码娱乐产品">
              <el-option label="数码娱乐产品" value="digitalProducts"></el-option>
              <el-option label="影音游戏产品" value="videoGameProducts"></el-option>
            </el-select>
            <span style="color: red;position: absolute;right: -120px;">（至少选择一项）</span>
          </div>
        </el-form-item>
        <el-form-item label="产品HS编码：" prop="productHsCode">
          <el-input v-model="ruleForm.productHsCode" placeholder="823677365"></el-input>
        </el-form-item>
        <el-form-item label="申请数量及折合面积：" prop="applyQuantityArea">
          <div style="display: flex;justify-content: space-between;">
            <el-input
              v-model="ruleForm.applyQuantityArea"
              style="width: 45%;margin-right: 5%;"
              placeholder="67"
            ></el-input>
            <el-input v-model="ruleForm.applyQuantityArea" style="width: 45%;" placeholder="12m"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="上届展位数量及折合面积：" prop="lastApplyQuantityArea">
          <div style="display: flex;justify-content: space-between;">
            <el-input
              v-model="ruleForm.lastApplyQuantityArea"
              style="width: 45%;margin-right: 5%;"
              placeholder="45"
            ></el-input>
            <el-input
              v-model="ruleForm.lastApplyQuantityArea"
              style="width: 45%;"
              placeholder="22m"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="布展类型：" prop="exhibitType">
          <el-select v-model="ruleForm.exhibitType" placeholder="深圳团">
            <el-option label="统一布展" value="unifiedExhibit"></el-option>
            <el-option label="标摊" value="standardBooths"></el-option>
            <el-option label="绿色特装" value="greenSpecialAssembly"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否愿意接洽国内采购商：" prop="isContactBuyers">
          <el-radio-group v-model="ruleForm.isContactBuyers">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联营企业：" prop="consortium">
          <el-select v-model="ruleForm.consortium" placeholder="萌果科技">
            <el-option label="萌果科技" value="technology"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">确定</el-button>
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
        boothNature: "",
        exhibitionArea: "",
        exhibitCategory: "",
        mainDisplayProducts: "",
        productHsCode: "",
        applyQuantityArea: "",
        lastApplyQuantityArea: "",
        exhibitType: "",
        isContactBuyers: "",
        consortium: ""
      },
      rules: {
        boothNature: [
          { required: true, message: "请输入公司名称", trigger: "change" }
        ],
        exhibitionArea: [
          { required: true, message: "请输入企业广交会编码", trigger: "change" }
        ],
        exhibitCategory: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        mainDisplayProducts: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        productHsCode: [{ required: true, message: "请输入", trigger: "blur" }],
        applyQuantityArea: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        lastApplyQuantityArea: [
          { required: true, message: "请输入", trigger: "blur" }
        ],

        exhibitType: [{ required: true, message: "请选择", trigger: "change" }],
        isContactBuyers: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        consortium: [{ required: true, message: "请选择", trigger: "change" }]
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


