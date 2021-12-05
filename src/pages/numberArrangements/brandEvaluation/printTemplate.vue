<template>
  <!-- <div> -->
    <!-- 首页 -->
  <el-tabs v-model="activeName" @tab-click="handleClick" :inline="true">
    <el-tab-pane label="打印模板效果图" name="first">
      <p style="font-size: 18px; text-align: center; font-weight: 600;">广交会品牌展位评审交易团推荐企业打印报送表</p>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="企业基本信息">
          <el-table-column align="center" label="推荐编号" prop="recommendCode" width="100"></el-table-column>
          <el-table-column align="center" label="交易团" prop="dealClusterName" width="100"></el-table-column>
          <el-table-column align="center" label="商协会" prop="coceralName" width="100"></el-table-column>
          <el-table-column align="center" label="展区" prop="exhibitionAreaName" width="100"></el-table-column>
          <el-table-column align="center" label="广交会编码" prop="cantonFairCode" width="100"></el-table-column>
          <el-table-column align="center" label="申请企业名称" prop="companyName" width="100"></el-table-column>
          <el-table-column align="center" label="企业属性" prop="companyAttribute" width="100"></el-table-column>
          <el-table-column align="center" label="企业类型" prop="companyType" width="100"></el-table-column>
          <el-table-column align="center" label="海关编码" prop="customCode" width="100"></el-table-column>
          <el-table-column align="center" label="申请展位数" prop="applyBoothNumber" width="100"></el-table-column>
          <el-table-column align="center" label="上届品牌展位数" prop="lastBoothNumber" width="100"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="总分" prop="totalScore"></el-table-column>
        <el-table-column align="center" label="出口额">
          <el-table-column align="center" label="出口额占所属大类出口额比例" prop="exportRatio" width="150"></el-table-column>
          <el-table-column align="center" label="按比例计算后的出口额项目得分" prop="exportRatioScore" width="150"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌建设项目得分" prop="brandBuildScore"></el-table-column>
        <el-table-column align="center" label="研发创新和自主知识产权">
          <el-table-column align="center" label="专利与版权得分" prop="patentScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家级高新技术得分" prop="newHighScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家/行业标准得分" prop="standardScore" width="120"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国际通行认证">
          <el-table-column align="center" label="质量、环境管理体系认证项目得分" prop="qualityScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向企业的行业认证项目得分" prop="industryScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向产品或生产线的行业认证项目得分" prop="productionScore" width="150"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境内外商标">
          <el-table-column align="center" label="境内商标得分" prop="territoryScore" width="120"></el-table-column>
          <el-table-column align="center" label="境外商标得分" prop="beyondScore" width="120"></el-table-column>
        </el-table-column>
          <el-table-column align="center" label="是否达标" prop="isStandard" width="120"></el-table-column>
          <el-table-column align="center" label="授权子公司名称" prop="correlationCompanyName" width="120"></el-table-column>
          <el-table-column align="center" label="备注" prop="remarks" width="120"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-button type="danger" @click="handelAdd" style="margin-left: 10px;">提交推荐</el-button>
      <el-button type="primary" @click="handelAdd" style="margin-left: 10px;">下载/打印</el-button>
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
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      formData: {
        ragion: ""
      },
      tableData: [
        {
          recommendedNumber: "",
          international: "",
          businessAssociation: "",
          displayArea: "",
          cantonCoding: "",
          companyName: "",
          enterpriseProperty: "",
          companyType: "",
          customsCode: "",
          boothsApplied: "",
          lastStand: "",
          totalPoints: "",
          proportionExports: "",
          exportScore: "",
          buildingProject: "",
          patentsCopyrights: "",
          advancedTechnology: "",
          industrialStandard: "",
          environmentalManagement: "",
          businessOriented: "",
          productOriented: "",
          churchyard: "",
          overseas: "",
          reachStandard: "",
          subsidiaryCorporation: "",
          remarks: ""
        },
        {
          recommendedNumber: "",
          international: "",
          businessAssociation: "",
          displayArea: "",
          cantonCoding: "",
          companyName: "",
          enterpriseProperty: "",
          companyType: "",
          customsCode: "",
          boothsApplied: "",
          lastStand: "",
          totalPoints: "",
          proportionExports: "",
          exportScore: "",
          buildingProject: "",
          patentsCopyrights: "",
          advancedTechnology: "",
          industrialStandard: "",
          environmentalManagement: "",
          businessOriented: "",
          productOriented: "",
          churchyard: "",
          overseas: "",
          reachStandard: "",
          subsidiaryCorporation: "",
          remarks: ""
        }
      ],
      activeName: "first"
    };
  },
  methods: {
    handleCurrentChange() {},
    handleSizeChange() {},
    handelAdd() {},
    handleClick() {},
    handelCheck() {

    }
  }
};
</script>
<style scoped>
/* aa {
 font-weight: 600;
} */
</style>

