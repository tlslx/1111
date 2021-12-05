<template>
  <!-- <div> -->
    <!-- 首页 -->
  <el-tabs v-model="activeName" @tab-click="handleClick" :inline="true">
    <el-tab-pane label="交易团推荐品牌候选企业" name="first">
      <!-- form表单 -->
      <el-form :model="formData" size="small" :inline="true">
        <el-form-item label="企业出口额得分">
          <el-select :model="formData.ragion" value="12" style="width: 150px;">
            <el-option label="≥X分" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="境外商标得分">
          <el-select :model="formData.ragion" value="12" style="width: 150px;">
            <el-option label="≥Y分" value="12"></el-option>
            <el-option label="ll" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总分">
          <el-select :model="formData.ragion" value="12" style="width: 150px;">
            <el-option label="≥Z分" value="12"></el-option>
            <el-option label="ll" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会">
          <el-select :model="formData.ragion" value="12" style="width: 150px;">
            <el-option label="北京泰利华远" value="12"></el-option>
            <el-option label="ll" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select :model="formData.ragion" value="12" style="width: 150px;">
            <el-option label="北京泰利华远" value="12"></el-option>
            <el-option label="ll" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐状态">
          <el-select :model="formData.ragion" value="12" style="width: 150px;">
            <el-option label="全部" value="12"></el-option>
            <el-option label="已推荐" value="123"></el-option>
            <el-option label="未推荐" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="" width="50">
          <template slot-scope="">
            <el-checkbox v-model="tableData.checked"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="推荐状态" prop="recommendedState"></el-table-column>
        <el-table-column align="center" label="企业基本信息">
          <el-table-column align="center" label="推荐编号" prop="recommendedNumber" width="100"></el-table-column>
          <el-table-column align="center" label="交易团" prop="international" width="100"></el-table-column>
          <el-table-column align="center" label="商协会" prop="businessAssociation" width="100"></el-table-column>
          <el-table-column align="center" label="展区" prop="displayArea" width="100"></el-table-column>
          <el-table-column align="center" label="广交会编码" prop="cantonCoding" width="100"></el-table-column>
          <el-table-column align="center" label="申请企业名称" prop="companyName" width="100"></el-table-column>
          <el-table-column align="center" label="企业属性" prop="enterpriseProperty" width="100"></el-table-column>
          <el-table-column align="center" label="企业类型" prop="companyType" width="100"></el-table-column>
          <el-table-column align="center" label="海关编码" prop="customsCode" width="100"></el-table-column>
          <el-table-column align="center" label="申请展位数" prop="boothsApplied" width="100"></el-table-column>
          <el-table-column align="center" label="上届品牌展位数" prop="lastStand" width="100"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="总分" prop="totalPoints"></el-table-column>
        <el-table-column align="center" label="出口额">
          <el-table-column align="center" label="出口额占所属大类出口额比例" prop="proportionExports" width="150"></el-table-column>
          <el-table-column align="center" label="按比例计算后的出口额项目得分" prop="exportScore" width="150"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌建设项目得分" prop="buildingProject"></el-table-column>
        <el-table-column align="center" label="研发创新和自主知识产权">
          <el-table-column align="center" label="专利与版权得分" prop="patentsCopyrights" width="120"></el-table-column>
          <el-table-column align="center" label="国家级高新技术得分" prop="advancedTechnology" width="120"></el-table-column>
          <el-table-column align="center" label="国家/行业标准得分" prop="industrialStandard" width="120"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国际通行认证">
          <el-table-column align="center" label="质量、环境管理体系认证项目得分" prop="environmentalManagement" width="150"></el-table-column>
          <el-table-column align="center" label="面向企业的行业认证项目得分" prop="businessOriented" width="150"></el-table-column>
          <el-table-column align="center" label="面向产品或生产线的行业认证项目得分" prop="productOriented" width="150"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境内外商标">
          <el-table-column align="center" label="境内商标得分" prop="churchyard" width="120"></el-table-column>
          <el-table-column align="center" label="境外商标得分" prop="overseas" width="120"></el-table-column>
        </el-table-column>
          <el-table-column align="center" label="是否达标" prop="reachStandard" width="120"></el-table-column>
          <el-table-column align="center" label="授权子公司名称" prop="subsidiaryCorporation" width="120"></el-table-column>
          <el-table-column align="center" label="备注" prop="remarks" width="120"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-checkbox @click="handelCheck" style="margin-left: 18px;">全选</el-checkbox>
      <el-button type="primary" @click="handelAdd" style="margin-left: 10px;">推荐</el-button>
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
          checked: false,
          recommendedState: "",
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
          checked: false,
          recommendedState: "",
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

