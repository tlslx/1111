<template>
  <!-- <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="打印交易团推荐" name="first"> -->
  <div>
    <div style="text-align: center;">
      <h3>第{{tableData.records[0].exhibitionSession}}届广交会__（新能源/宠物用品）企业审核推荐表</h3>
      <h3>（{{currentDelegation}}交易团）</h3>
    </div>
    <el-table class="recommend_table" :data="tableData.records" border width="75%">
      <el-table-column label="是否推荐" prop="recommendStatus" min-width="110px" align="center">
        <template slot-scope="scope">
          {{ scope.row.recommendStatus | chooseFilter }}
        </template>
      </el-table-column>
      <el-table-column label="广交会编码" min-width="120px" prop="cecfCode" align="center"></el-table-column>
      <el-table-column label="企业名称" min-width="110px" prop="companyName" align="center"></el-table-column>
      <el-table-column label="海关编码" prop="customsCodeList" min-width="200px" align="center">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.customsCodeList">
            <div v-if="item.relationship === 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${scope.row.companyName})` }}</div>
            <div v-if="item.relationship !== 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${item.relationshipName})` }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="国内销售额" min-width="120px" prop="salesVolume" align="center"></el-table-column>
      <el-table-column label="企业类型" min-width="110px" prop="companyType" align="center">
        <template slot-scope="scope">
          {{ scope.row.companyType | companyTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
      <el-table-column label="展品专区" prop="productTypeName" min-width="110px" align="center"></el-table-column>
      <el-table-column label="申请布展类型" prop="exhibitionType" min-width="120px" align="center">
        <template slot-scope="scope">
          {{ scope.row.exhibitionType | typeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="申请数量" prop="boothNumber" min-width="110px" align="center"></el-table-column>
      <el-table-column label="审核情况" prop="clusterCheckStatus" min-width="110px" align="center">
        <template slot-scope="scope">
          {{ scope.row.clusterCheckStatus | statusFilter }}
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
      <el-table-column label="交易团审核展位需求" prop="boothNumberDemand" min-width="180px" align="center">
        <template slot-scope="scope">
          {{ scope.row.boothNumberDemand }}
        </template>
      </el-table-column>
      <el-table-column label="交易团审核布展类型" prop="boothTypeDemand" min-width="180px" align="center">
        <template slot-scope="scope">
          {{ scope.row.boothTypeDemand | typeFilter }}
        </template>
      </el-table-column>
      <!--
      <el-table-column label="是否推荐" prop="isRecommend" align="center" min-width="120px">
        <template slot-scope="scope">
          <div v-if="scope.row.recommendDelegation">{{ scope.row.recommendDelegation.isRecommend | chooseFilter }}</div>
        </template>
      </el-table-column>
      -->
      <el-table-column label="推荐理由" prop="recommendReason" align="center" width="200px">
        <template slot-scope="scope">
          <div v-if="scope.row.recommendDelegation">{{ scope.row.recommendDelegation.recommendReason }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
    <!-- </el-tab-pane>
  </el-tabs> -->
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
      tableData: {},
      currentDelegation: this.$store.getters.userInfo.org.deptName
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
