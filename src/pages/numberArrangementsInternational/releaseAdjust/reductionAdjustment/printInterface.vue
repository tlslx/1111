<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="打印调整函" name="first">
      <h1>一般性展位不等量  还原调整函</h1>
      <p>广交会工作部领导小猪办公室秘书处：</p>
      <p>经协商，第125届广交会，广东交易团与北京交易团就第125届广交会一般性展位等量/不等量调整申请如下：</p>
      <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column align="center" label="企业名称" prop="exhibitionPeriod">
      </el-table-column>
      <el-table-column align="center" label="展位数量" prop="boothTotal">
      </el-table-column>
      <el-table-column align="center" label="换入展区" prop="supportTotle">
      </el-table-column>
      <el-table-column align="center" label="换出展区" prop="exhibitionPeriod">
      </el-table-column>
      <el-table-column align="center" label="对方交易团" prop="boothTotal">
      </el-table-column>
      <el-table-column align="center" label="换出数量" prop="supportTotle">
      </el-table-column>
      <el-table-column align="center" label="换入数量" prop="boothTotal">
      </el-table-column>
    </el-table>
      <p>以上一般性展位等量/不等量调整申请经光交货工作领导小组办公室秘书处审核后生效（广交会工作领导小组办公室秘书处传真：020-89138550）</p>
      <p>特此备案。</p>
      <div>
        <div class="floatLeft">
          <el-form :model="form" label-width="80px">
            <el-form-item label="盖章">
              <span>广东交易团</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>2018-12-27</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span></span>
            </el-form-item>
            <el-form-item label="电话">
              <span></span>
            </el-form-item>
            <el-form-item label="传真">
              <span></span>
            </el-form-item>
          </el-form>
        </div>
        <div class="floatLeft">
          <el-form :model="form" label-width="80px">
            <el-form-item label="盖章">
              <span>北京交易团</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>2018-12-27</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span></span>
            </el-form-item>
            <el-form-item label="电话">
              <span></span>
            </el-form-item>
            <el-form-item label="传真">
              <span></span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div><el-button type="primary">打印</el-button></div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          exhibitionPeriod: "",
          boothTotal: "",
          supportTotle: ""
        }
      ],
      activeName: "first"
    };
  },
  methods: {
    ...mapActions("releaseAdjust", [])
  }
};
</script>
<style scoped>
.floatLeft {
  width: 50%;
  float: left;
  text-align: center;
}
</style>

