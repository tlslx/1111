<template>
  <div class="dataForm">
    <el-form ref="dataForm" :model="tableData" label-position="right" label-width="180px">
      <el-form-item label="企业名称：" prop="companyName">
        <el-select v-model="tableData.companyName" @change="handleCompanyChange" placeholder="请选择" style="width: 400px; ">
          <el-option
            v-for="item in tableData.options"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区：" prop="exhibitionAreaName">
        <el-select v-model="tableData.exhibitionAreaName" clearable style="width: 400px; ">
            <el-option v-for="(item, index) in tableData.exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaName" :label="item.exhibitionAreaName"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="广交会编码：" prop="cantonFairCode">
        <el-input v-model="tableData.cantonFairCode" disabled style="width: 400px; margin-top: 8px"></el-input>
      </el-form-item>
      <el-form-item label="交易团：" prop="dealClusterName">
        <el-input v-model="tableData.dealClusterName" disabled style="width: 400px; margin-top: 8px"></el-input>
      </el-form-item>
      <el-form-item label="展期：" prop="exhibitionPeriod">
        <el-input v-model="tableData.exhibitionPeriod" disabled style="width: 400px; margin-top: 8px">
        </el-input>
      </el-form-item>
      <el-form-item label="上届品牌展位数量：" prop="lastBoothNumber">
        <el-input v-model="tableData.lastBoothNumber" disabled style="width: 400px; margin-top: 8px"></el-input>
      </el-form-item>
      <el-form-item label="本届品牌展位数变化量：" prop="currentChangeNumber">
        <el-input v-model="tableData.currentChangeNumber" disabled style="width: 400px; margin-top: 8px"></el-input>
      </el-form-item>
      <el-form-item label="本届保留品牌展位数：" prop="currentReserveNumber">
        <el-input v-model="tableData.currentReserveNumber" disabled style="width: 400px; margin-top: 8px"></el-input>
      </el-form-item>
      <el-form-item label="情况分类：" prop="backType">
        <el-select placeholder="" v-model="tableData.backType" style="width: 400px; margin-top: 8px">
          <el-option label="全部退回" value="1"></el-option>
          <el-option label="部分退回" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退回原因：" prop="backReason">
        <el-input v-model="tableData.backReason" style="margin-top: 8px" type="textarea" rows="3" readonly></el-input>
      </el-form-item>
    </el-form>
    <p style="text-align: center;">关于退展位收费约束机制的时间机制</p>
    <textarea v-model="tableData.aboutDetails" id="" disabled cols="" style="background: #ebebeb; width: 100%" rows="5"></textarea>
    <div>
      <el-checkbox checked>本司已读并确认以上所述内容</el-checkbox>
    </div>
  </div>
</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      store,
      options: [],
      exhibitionAreaOpts: [],
      tableData: {}
    };
  },
  created() {
    this.tableData = JSON.parse(this.$route.query.data);
  },
  mounted() {
    this.$nextTick(() => {
      window.print();
    });
  }
};
</script>
<style scoped>
.dataForm{
  width: 70%;
  min-width: 800px;
  margin: 20px auto;
}  
</style>
