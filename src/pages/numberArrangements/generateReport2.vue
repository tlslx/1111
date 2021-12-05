<template>
  <div>
    <!-- 首页 -->
    <!-- form表单 -->
    <el-form :model="formData" size="small" :inline="true">
      <el-form-item label="商协会">
        <el-select :model="formData.ragion" value="" style="width: 150px;">
          <el-option label="全部" value="12"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区">
        <el-select :model="formData.ragion" value="" style="width: 150px;">
          <el-option label="全部" value="12"></el-option>
          <el-option label="ll" value="123"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对比条件">
        <el-select :model="formData.ragion" value="12" style="width: 150px;">
          <el-option label="方案一和方案二" value="12"></el-option>
          <el-option label="方案一和方案三" value="13"></el-option>
          <el-option label="方案二和方案三" value="23"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column align="center" label="商协会" prop="businessAssociation"></el-table-column>
      <el-table-column align="center" label="展区" prop="displayArea"></el-table-column>
      <el-table-column align="center" label="第123届品牌企业数" prop="brandEnterprise"></el-table-column>
      <el-table-column align="center" label="第123届品牌展位数" prop="brandBooth"></el-table-column>
      <el-table-column align="center" label="第124届品牌企业数" prop="brandEnterprise124"></el-table-column>
      <el-table-column align="center" label="第124届品牌展位数" prop="brandBooth124"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审安排企业数（方案1）" prop="arrangeBusiness"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审安排展位数（方案1）" prop="arrangeBooths"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审安排企业数（方案2）" prop="arrangeBusiness2"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审安排展位数（方案2）" prop="arrangeBooths2"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审申请企业数" prop="applicant"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审申请品牌展位数" prop="applyBooth"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审交易团推荐企业数" prop="recommendedEnterprise"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审交易团推荐企业申请展位数" prop="companiesBooth"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审交易团推荐达标企业数" prop="standardEnterprise"></el-table-column>
      <el-table-column align="center" label="2018年品牌评审商协会评审达标企业申请展位数" prop="standardBooth"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-button type="primary">下载</el-button>
    <el-button type="danger" @click="isShow = true">对比</el-button>
    <el-form :inline="true" style="float: right;">
      <el-form-item>
        <el-pagination
          style="margin-top: 5px;"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="paginationData.pageSize">
        </el-pagination>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">确定</el-button>
      </el-form-item>
    </el-form>
    <!-- 弹框 -->
    <el-dialog
      title="对比"
      :visible.sync="isShow"
      width="30%">
      <el-form :model="form" label-position="right" label-width="150px">
        <el-form-item label="请选择对比方案:">
          <el-select value = "1" style="width: 230px;">
            <el-option label="方案一" value="1"></el-option>
            <el-option label="方案二" value="2"></el-option>
            <el-option label="方案三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="和 ">
          <el-select value = "2" style="width: 230px;">
            <el-option label="方案一" value="1"></el-option>
            <el-option label="方案二" value="2"></el-option>
            <el-option label="方案三" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button type="primary" @click="isShow = false">确认</el-button>
        <el-button @click="isShow = false">取消</el-button>
      </div>
      <br><br>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      form: {},
      formData: {
        ragion: ""
      },
      tableData: [
        {
          businessAssociation: "华东",
          displayArea: "广东",
          brandEnterprise: "54",
          brandBooth: "6",
          brandEnterprise124: "54",
          brandBooth124: "78",
          arrangeBusiness: "8",
          arrangeBooths: "9",
          arrangeBusiness2: "64",
          arrangeBooths2: "78",
          applicant: "456",
          applyBooth: "56",
          recommendedEnterprise: "87",
          companiesBooth: "45",
          standardEnterprise: "15",
          standardBooth: "5"
        },
        {
          businessAssociation: "华东",
          displayArea: "广东",
          brandEnterprise: "",
          brandBooth: "",
          brandEnterprise124: "",
          brandBooth124: "",
          arrangeBusiness: "",
          arrangeBooths: "",
          arrangeBusiness2: "",
          arrangeBooths2: "",
          applicant: "",
          applyBooth: "",
          recommendedEnterprise: "",
          companiesBooth: "",
          standardEnterprise: "",
          standardBooth: ""
        }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style scoped>
/* aa {
 
} */
</style>

