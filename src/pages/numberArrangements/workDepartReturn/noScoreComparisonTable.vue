<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="未安排企业评分比对表" name="first">
      <el-form :model="queryForm" :inline="true" label-width="">
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="item in coceralOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有境外商标">
          <el-select v-model="queryForm.isBeyond" clearable>
            <el-option v-for="item in isBeyondOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="scoreComparData.records" v-loading="loading" :default-sort = "{prop: 'regin', order: 'null'}" border>
        <el-table-column label="企业基本信息" align="center">
          <el-table-column label="地区" prop="region" align="center"></el-table-column>
          <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
          <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
          <el-table-column label="申请企业名称" prop="companyName" align="center"></el-table-column>
          <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
          <el-table-column label="海关编码" prop="companyCustomsCode" align="center"></el-table-column>
          <el-table-column label="企业属性" prop="companyAttribute" align="center"></el-table-column>
          <el-table-column label="企业类型" prop="companyType" align="center"></el-table-column>
          <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
          <el-table-column label="123届品牌展位数" align="center">
            <template slot-scope="scope">
              {{ (scope.row.previousBoothNumber && scope.row.previousBoothNumber.length > 1) ? scope.row.previousBoothNumber[scope.row.previousBoothNumber.length - 2] : '' }}
            </template>
          </el-table-column>
          <el-table-column label="124届品牌展位数" align="center">
            <template slot-scope="scope">
              {{ (scope.row.previousBoothNumber && scope.row.previousBoothNumber.length > 2) ? scope.row.previousBoothNumber[scope.row.previousBoothNumber.length - 1] : '' }}
            </template>
          </el-table-column>
          <el-table-column label="申请展位数" prop="applyBoothNumber" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="商会总分" sortable prop="coceralTotalGrade" align="center"></el-table-column>
        <el-table-column label="是否达标" prop="boothApplyCondition" align="center">
          <template slot-scope="scope">
            {{ scope.row.boothApplyCondition === '0' ? '否' : (scope.row.boothApplyCondition === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="出口额" align="center">
          <el-table-column label="评审当届出口额" sortable prop="exportAmount" align="center"></el-table-column>
          <el-table-column label="商会打分" sortable prop="coceralExportScore" align="center"></el-table-column>
          <el-table-column label="重新安排当届前一年度企业出口额" prop="lastExportAmount" align="center"></el-table-column>
          <el-table-column label="出口额增幅" prop="exportGrowth" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="行业自律" align="center">
          <el-table-column label="商会打分" prop="selfDisciplineScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="品牌建设" align="center">
          <el-table-column label="平台数量" prop="brandBuildNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="brandBuildScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="专利与版权" align="center">
          <el-table-column label="发明专利数" prop="inventPatent" align="center"></el-table-column>
          <el-table-column label="实用新型专利数" prop="practicalPatent" align="center"></el-table-column>
          <el-table-column label="外观专利数" prop="appearancePatent" align="center"></el-table-column>
          <el-table-column label="版权数" prop="copyrightNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="patentsScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="国家级高新技术企业" align="center">
          <el-table-column label="称号数" prop="newHighNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="newHighScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="国家或行业标准" align="center">
          <el-table-column label="数量" prop="standardNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="standardScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="质量、环境管理体系认证" align="center">
          <el-table-column label="数量" prop="qualityNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="qualityScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="面向企业的行业认证" align="center">
          <el-table-column label="数量" prop="industryNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="industryScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="面向产品或生产线的行业认证" align="center">
          <el-table-column label="数量" prop="productionNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="productionScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="境内商标" align="center">
          <el-table-column label="数量" prop="territoryNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="territoryScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="境外商标" align="center">
          <el-table-column label="数量" prop="beyondNumber" align="center"></el-table-column>
          <el-table-column label="商会打分" prop="beyondScore" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="广交会表现" prop="joinExpressionScore" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="scoreComparData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      exhibitionAreaOpts: [],
      coceralOpts: [],
      isBeyondOpts: [{ value: '', label: '全部' }, { value: '0', label: '是' }, { value: '1', label: '否' }],
      queryForm: {
        isBeyond: '',
        exhibitionArea: '',
        coceralId: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['scoreComparData']),
    formQuery() {
      return {
        isBeyond: this.queryForm.isBeyond,
        exhibitionArea: this.queryForm.exhibitionArea,
        coceralId: this.queryForm.coceralId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.loading = true;
    this.getScoreComparisonInfo({ current: 0, size: 0 }).then(res => {
      this.coceralOpts = res.coceralOpts;
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.dealClusterOpts = res.dealClusterOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('workDepartReturn', ['getScoreComparisonInfo']),
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getScoreComparisonInfo(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
</style>
