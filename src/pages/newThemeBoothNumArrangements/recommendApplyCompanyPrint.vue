<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="打印商协会对对应申请企业推荐" name="first">
      <el-table class="recommend_table" :data="tableData.records" border width="75%">
        <el-table-column label="是否推荐" prop="isRecommend" min-width="110px" align="center">
          <template slot-scope="scope">
            {{ scope.row.isRecommend | chooseFilter }}
          </template>
        </el-table-column>
        <el-table-column label="广交会编码" prop="cecfCode" min-width="120px" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" min-width="110px" align="center"></el-table-column>
        <el-table-column label="交易团" prop="delegationName" min-width="90px" align="center"></el-table-column>
        <el-table-column label="企业类型" prop="companyType" min-width="110px" align="center">
          <template slot-scope="scope">
            {{ scope.row.companyType | companyTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展品专区" prop="productTypeName" min-width="110px" align="center"></el-table-column>
        <el-table-column label="企业海关编码审核情况" prop="customsCodeList" align="center" min-width="195px">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.customsCodeList">
              <div v-if="item.relationship === 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${scope.row.companyName})` }}</div>
              <div v-if="item.relationship !== 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${item.relationshipName})` }}</div>
              <div>{{ item.clusterCheckCustomsStatus === '1' ? '通过' : (item.clusterCheckCustomsStatus === '2' ? '不通过' : '') }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="主要展示产品" prop="mainProductCodeList" min-width="120px" align="center">
          <template slot-scope="scope">
            <div v-for="item in scope.row.mainProductCodeList">{{ item.productName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否上届参展" prop="ifLastJoin" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核展位需求" min-width="170px" prop="boothNumberDemand" align="center">
          <template slot-scope="scope">
            {{ scope.row.boothNumberDemand }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核布展类型" min-width="170px" prop="boothTypeDemand" align="center">
          <template slot-scope="scope">
            {{ scope.row.boothTypeDemand | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团推荐" min-width="120px" prop="recommendStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.recommendStatus === '0' ? '未推荐' : (scope.row.recommendStatus === '1' ? '已推荐' : '') }}
          </template>
        </el-table-column>
        <!--
        <el-table-column label="推荐安排展位数" prop="recommendNumber" min-width="160px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.recommendCommerce">{{ scope.row.recommendCommerce.recommendNumber }}</div>
          </template>
        </el-table-column>
        -->
        <el-table-column label="推荐理由" prop="recommendReason" align="center" min-width="200px">
          <template slot-scope="scope">
            <div v-if="scope.row.recommendCommerce">{{ scope.row.recommendCommerce.recommendReason }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
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
      tableData: {}
    };
  },
  filters: {
    // 企业类型
    companyTypeFilter: value => {
      let companyTypeOptsw = kindo.dictionary.get('companyType');
      for (let i = 0; i < companyTypeOptsw.length; i++) {
        if (value === companyTypeOptsw[i].value) {
          return companyTypeOptsw[i].label;
        }
      }
    },
    statusFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '未审核';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return;
      }
    },
    // 公司关系
    relationshipFilter: value => {
      switch (value) {
        case 'ENTERPRISE':
          return '本企业';
        case 'SUBSIDARYCOMPANY':
          return '全资子公司';
        case 'HOLDCOMPANY':
          return '控股子公司';  
        default:
          return;
      }
    },
    typeFilter: value => {
      switch (value) {
        case 'SPECIAL_BOOTH':
          return '绿色特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        default:
          return;
      }
    },
    chooseFilter: value => {
      let val = value + '';
      switch (val) {
        case '1':
          return '是';
        case '0':
          return '否';
        default:
          return;
      }
    }
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
