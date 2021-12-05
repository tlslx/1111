<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="对比差异比" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyCode" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, key) in coceralOpts" :key="key" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>  
        <el-form-item label="评分项">
          <el-select v-model="categoriesList" multiple collapse-tags clearable>
            <el-option v-for="(item, key) in categoriesOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="是否有差异">
          <el-select v-model="queryForm.isExportDiff" clearable>
            <el-option v-for="(item, key) in isExportDiffOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>   
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="trade-table" :data="diffRatioData.records" v-loading="loading" border>
        <el-table-column align="center" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="交易团" prop="dealClusterName"></el-table-column>
        <el-table-column align="center" label="申请展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="申请品牌展位数" prop="applyBoothNumber"></el-table-column>
        <el-table-column align="center" label="总分" prop="coceralTotalGrade"></el-table-column>
        <el-table-column key="1" align="center" :label="`是否符合品牌展位申请条件（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="boothApplyCondition">
          <template slot-scope="scope">
            {{ scope.row.boothApplyCondition === '0' ? '否' : (scope.row.boothApplyCondition === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column key="2" align="center" :label="`是否符合品牌展位申请条件（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="boothApplyConditionAnother">
          <template slot-scope="scope">
            {{ scope.row.boothApplyConditionAnother === '0' ? '否' : (scope.row.boothApplyConditionAnother === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否有差异" prop="isExportDiff">
          <template slot-scope="scope">
            {{ scope.row.isExportDiff === '0' ? '否' : (scope.row.isExportDiff === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="出口额" v-if="handleCategoriesQuery('1')">
          <el-table-column align="center" label="占所属大类出口额比例" prop="exportRatio"></el-table-column>
          <el-table-column key="1" align="center" :label="`商协会评分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="coceralExportScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`商协会评分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="coceralExportScoreAnother"></el-table-column>
          <el-table-column align="center" label="商协会评分差异分" prop="exportScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="行业自律" v-if="handleCategoriesQuery('2')">
          <el-table-column key="1" align="center" :label="`评分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="selfDisciplineScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`评分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="selfDisciplineScoreAnother"></el-table-column>
          <el-table-column align="center" label="评分差异分" prop="disciplineScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌建设" v-if="handleCategoriesQuery('3')">
          <el-table-column key='1' align="center" :label="`是否进入外贸转型升级基地（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="isUpgrade">
            <template slot-scope="scope">
              {{ scope.row.isUpgrade === 0 ? '否' : (scope.row.isUpgrade === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column key='2' align="center" :label="`是否进入外贸转型升级基地（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="isUpgradeAnother">
            <template slot-scope="scope">
              {{ scope.row.isUpgradeAnother === 0 ? '否' : (scope.row.isUpgradeAnother === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column key='4' align="center" label="是否有差异" prop="isUpgradeDiff">
            <template slot-scope="scope">
              {{ scope.row.isUpgradeDiff === 0 ? '否' : (scope.row.isUpgradeDiff === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column key='5' align="center" label="建设国际营销服务体系数量" prop="systemNumber"></el-table-column>
          <el-table-column key='6' align="center" :label="`是否参加境外品牌展（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="isJoinOutside">
            <template slot-scope="scope">
              {{ scope.row.isJoinOutside === 0 ? '否' : (scope.row.isJoinOutside === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column key='7' align="center" :label="`是否参加境外品牌展（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="isJoinOutsideAnother">
            <template slot-scope="scope">
              {{ scope.row.isJoinOutsideAnother === 0 ? '否' : (scope.row.isJoinOutsideAnother === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column key='9' align="center" label="是否有差异" prop="isJoinDiff">
            <template slot-scope="scope">
              {{ scope.row.isJoinDiff === 0 ? '否' : (scope.row.isJoinDiff === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column key='10' align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="brandBuildScore"></el-table-column>
          <el-table-column key='11' align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="brandBuildScoreAnother"></el-table-column>
          <el-table-column key='13' align="center" label="得分差异分" prop="brandBuildScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="专利与版权" v-if="handleCategoriesQuery('4')">
          <el-table-column align="center" label="发明专利数" prop="inventPatent"></el-table-column>
          <el-table-column align="center" label="实用新型专利数" prop="practicalPatent"></el-table-column>
          <el-table-column align="center" label="外观专利数" prop="appearancePatent"></el-table-column>
          <el-table-column align="center" label="版权数" prop="copyrightNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="patentsScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="patentsScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="patentsScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国家级高新技术企业" v-if="handleCategoriesQuery('5')">
          <el-table-column align="center" label="称号数" prop="newHighNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="newHighScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="newHighScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="newHighScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国家或行业标准" v-if="handleCategoriesQuery('6')">
          <el-table-column align="center" label="数量" prop="standardNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="standardScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="standardScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="standardScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="质量/环境管理体系认证" v-if="handleCategoriesQuery('7')">
          <el-table-column align="center" label="数量" prop="qualityNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="qualityScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="qualityScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="qualityScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="面向企业的行业认证" v-if="handleCategoriesQuery('8')">
          <el-table-column align="center" label="数量" prop="industryNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="industryScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="industryScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="industryScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="面向产品/生产线的行业认证" v-if="handleCategoriesQuery('9')">
          <el-table-column align="center" label="数量" prop="productionNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="productionScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="productionScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="productionScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境内商标" v-if="handleCategoriesQuery('10')">
          <el-table-column align="center" label="数量" prop="territoryNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="territoryScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="territoryScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="territoryScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境外商标" v-if="handleCategoriesQuery('11')">
          <el-table-column align="center" label="数量" prop="beyondNumber"></el-table-column>
          <el-table-column key="1" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.one)}）`" prop="beyondScore"></el-table-column>
          <el-table-column key="2" align="center" :label="`得分（方案${handlePlanFilter(confirmContrastObj.another)}）`" prop="beyondScoreAnother"></el-table-column>
          <el-table-column align="center" label="得分差异分" prop="beyondScoreDiff"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="广交会表现" prop="telephone"></el-table-column>
        <el-table-column align="center" label="是否使用母子公司资质" prop="isMotherChildAptitude">
          <template slot-scope="scope">
            {{ scope.row.isMotherChildAptitude === '0' ? '否' : (scope.row.isMotherChildAptitude === '1' ? '是' : '') }}
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="danger" size="medium" @click="openContrast">对比</el-button>
      <el-button class="utils-button" type="primary" size="medium" @click="handDownload">下载</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="diffRatioData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
      <!-- 保存弹框 -->
      <el-dialog title="对比" :visible.sync="contrastDialog" v-if="contrastDialog" width="550px">
        <el-form class="contrastForm" :model="contrastObj" ref="contrastForm" :rules="contrastRule" label-width="120">
          <el-form-item label="选择对比方案" prop="one">
            <el-select v-model="contrastObj.one">
              <el-option v-for="(item, index) in whichPlanOpts" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="和" prop="another">
            <el-select v-model="contrastObj.another">
              <el-option v-for="(item, index) in whichPlanOpts" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="danger" size="medium" @click="handleConfirmPlan('contrastForm')">确认</el-button>
            <el-button size="medium" @click="contrastDialog = false;">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    var planValid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择'));
      } else if (this.contrastObj.one === this.contrastObj.another) {
        return callback(new Error('对比方案不可相同'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      contrastDialog: false,
      exhibitionAreaOpts: [],
      coceralOpts: [],
      companyOpts: [],
      dealClusterOpts: [],
      categoriesOpts: [{ value: '1', label: '出口额' }, { value: '2', label: '行业自律' }, { value: '3', label: '品牌建设' }, { value: '4', label: '专利与版权' }, 
      { value: '5', label: '国家级高新技术企业' }, { value: '6', label: '国家或行业标准' }, { value: '7', label: '质量/环境管理体系认证' }, 
      { value: '8', label: '面向企业的行业认证' }, { value: '9', label: '面向产品/生产线的行业认证' }, { value: '10', label: '境内商标' }, 
      { value: '11', label: '境外商标' }],
      isExportDiffOpts: [{ value: '', label: '全部' }, { value: '0', label: '否' }, { value: '1', label: '是' }],
      whichPlanOpts: [{ value: 1, label: '方案一' }, { value: 2, label: '方案二' }, { value: 3, label: '方案三' }],
      queryForm: {
        exhibitionArea: '', // 展区id
        cantonFairCode: '', // 广交会编码
        coceralId: '', // 商协会id
        companyCode: '', // 企业id
        isExportDiff: '', // 是否有差异
        dealClusterId: '' // 交易团id
      },
      categoriesList: [],
      contrastObj: {
        one: 1,
        another: 2
      },
      confirmContrastObj: {
        one: 1,
        another: 2
      },
      contrastRule: {
        one: [{ required: true, validator: planValid, trigger: 'change' }],
        another: [{ required: true, validator: planValid, trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['diffRatioData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea, 
        cantonFairCode: this.queryForm.cantonFairCode,
        coceralId: this.queryForm.coceralId,
        companyCode: this.queryForm.companyCode, 
        isExportDiff: this.queryForm.isExportDiff,
        dealClusterId: this.queryForm.dealClusterId,
        one: this.contrastObj.one,
        another: this.contrastObj.another,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.loading = true;
    this.getContrastDiffRatioQuery().then(res => {
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('checkRecommendCompany', ['getContrastDiffRatioQuery', 'getContrastDiffRatio']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 评分项选择
    handleCategoriesQuery(typeId) {
      if (this.categoriesList.length > 0) {
        let index = this.categoriesList.indexOf(typeId);
        if (index !== -1) {
          return true;
        } else {
          false;
        }
      } else {
        return true;
      }
    },
    // 打开对比弹框
    openContrast() {
      this.contrastObj = {
        one: this.confirmContrastObj.one,
        another: this.confirmContrastObj.another
      };
      this.contrastDialog = true;
    },
    // 对比方案过滤
    handlePlanFilter(id) {
      switch (id) {
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:    
          return '三';
        default:
          return '';  
      }
    },
    // 对比方案确认
    handleConfirmPlan(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.getContrastDiffRatio(this.formQuery).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.confirmContrastObj.one = this.contrastObj.one;
            this.confirmContrastObj.another = this.contrastObj.another;
            this.contrastDialog = false;
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 下载
    handDownload() {
      // // // // let url = "exhibitionArea=" + this.queryForm.exhibitionArea + "&boothType=" + this.queryForm.boothType + "&exhibitionPeriod=" + this.queryForm.exhibitionPeriod + "&exhibitionAreaCode=" + this.queryForm.exhibitionAreaCode;
      // url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/businessAssociation/workDeptDiff/download?one=" + this.contrastObj.one + "&another=" + this.contrastObj.another + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getContrastDiffRatio(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.utils-button, .pagination-container{
  margin-top: 20px;
} 
.contrastForm >>> .el-form-item{
  margin-bottom: 22px !important;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
