<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="查看审核推荐情况" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" @change="handleProductAreaQuery" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团审核结果" label-width="120px">
          <el-select v-model="queryForm.clusterCheckStatus" clearable>
            <el-option v-for="item in clusterCheckStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上届是否参展">
          <el-select v-model="queryForm.ifLastJoin" clearable>
            <el-option v-for="item in chooseOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团是否推荐" label-width="120px">
          <el-select v-model="queryForm.recommendStatus" clearable>
            <el-option v-for="item in chooseOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商会是否推荐">
          <el-select v-model="queryForm.isRecommend" clearable>
            <el-option v-for="item in chooseOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cecfCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="recommendWorkDepartData.records" v-loading="loading" height="550" border>
        <el-table-column fixed label="广交会编码" prop="cecfCode" min-width="120px" align="center"></el-table-column>
        <el-table-column fixed label="企业名称" prop="companyName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="delegationName" min-width="120px" align="center"></el-table-column>
        <!--
        <el-table-column label="系统登记海关编码" prop="customsCodeList" align="center" width="150px">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.customsCodeList">
              <div>{{ item.relationshipName | relationshipFilter }}{{ `:${item.customsCode}()` }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="企业类型" prop="companyType" align="center">
          <template slot-scope="scope">
            {{ scope.row.companyType | companyTypeFilter }}
          </template>
        </el-table-column>
        -->
        <el-table-column label="申请展区" prop="exhibitionAreaName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="申请专区" prop="productTypeName" min-width="120px" align="center"></el-table-column>
        <!--
        <el-table-column label="申请展位性质" prop="boothType" align="center"></el-table-column>
        -->
        <el-table-column label="申请数量" prop="boothNumber" min-width="120px" align="center"></el-table-column>
        <el-table-column label="布展类型" prop="exhibitionType" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.exhibitionType | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="上届是否参展" prop="ifLastJoin" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <!--
        <el-table-column label="上届展位数" prop="lastArrangeNum" align="center"></el-table-column>
        <el-table-column label="当届拟安排展位数" prop="scheduleNumber" align="center"></el-table-column>
        <el-table-column label="与上届展位安排差异数" align="center"></el-table-column>
        -->
        <el-table-column label="交易团审核结果" prop="clusterCheckStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.clusterCheckStatus | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核不通过原因" prop="clusterCheckOpinion" min-width="180px" align="center"></el-table-column>
        <el-table-column label="交易团审核展位数" prop="boothNumberDemand" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.clusterCheckStatus === '1'">{{ scope.row.boothNumberDemand }}</div>
          </template>
        </el-table-column>
        <el-table-column label="交易团审核布展类型" prop="boothTypeDemand" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.clusterCheckStatus === '1'">{{ scope.row.boothTypeDemand | typeFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column label="交易团是否推荐" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.recommendStatus | chooseFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团推荐理由" align="center" width="200px">
          <template slot-scope="scope">
            <div v-if="scope.row.recommendDelegation">{{ scope.row.recommendDelegation.recommendReason }}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column label="商会是否推荐" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.isRecommend | chooseFilter }}
          </template>
        </el-table-column>
        <el-table-column label="商会推荐理由" align="center" width="200px">
          <template slot-scope="scope">
            <div v-if="scope.row.recommendCommerce">{{ scope.row.recommendCommerce.recommendReason }}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        <!--
        <el-table-column label="商协会推荐展位数" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.recommendCommerce">{{ scope.row.recommendCommerce.recommendNumber }}</div>
            <div v-else></div>
          </template>
        </el-table-column>
        -->
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recommendWorkDepartData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      store,
      exhibitionAreaOpts: [],
      clusterCheckStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      chooseOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      companyOpts: [],
      productTypeOpts: [],
      delegationOpts: [],
      queryForm: {
        exhibitionArea: '',
        clusterCheckStatus: '',
        recommendStatus: '',
        ifLastJoin: '',
        companyName: '',
        productType: '',
        delegationId: '',
        isRecommend: '',
        cecfCode: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
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
    checkFilter: value => {
      switch (value) {
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
    // 是否
    chooseFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters('newThemeRecommendCompany', ['recommendWorkDepartData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        clusterCheckStatus: this.queryForm.clusterCheckStatus,
        recommendStatus: this.queryForm.recommendStatus,
        ifLastJoin: this.queryForm.ifLastJoin,
        companyName: this.queryForm.companyName,
        productType: this.queryForm.productType,
        delegationId: this.queryForm.delegationId,
        isRecommend: this.queryForm.isRecommend,
        cecfCode: this.queryForm.cecfCode,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.exhibitionAreaOpts = [];
    // 展区
    this.getexhibitionArea().then(resa => {
      this.exhibitionArea = JSON.parse(JSON.stringify(resa));
      // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      // 新题材展区
      this.getexhibitionAreaDTOList().then(res => {
        this.arr = JSON.parse(JSON.stringify(res.records));
        this.arr.forEach((item, index, ar) => {
          if (item.isNewThemeArea) { // 是新题材
            for (let i = 0; i < this.exhibitionArea.length; i++) {
              if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                let exare = {
                  exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                  exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                };
                this.exhibitionAreaOpts.push(exare);
              }
            }
          }
        });
      });
    }).catch(e => {});
    // 数组去重
    let hash = {};
    this.exhibitionAreaOpts = this.exhibitionAreaOpts.reduce(function(item, next) {
      hash[next.exhibitionAreaCode] ? '' : hash[next.exhibitionAreaCode] = true && item.push(next);
      return item;
    }, []);
    // 所属交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('newThemeRecommendCompany', ['getRecommendCheckWorkDepartment']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList']),
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      this.queryForm.productType = '';
      this.productTypeOpts = [];
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.productTypeOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }
    },
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&recommendStatus=${this.queryForm.recommendStatus}&companyName=${this.queryForm.companyName}&productType=${this.queryForm.productType}&isRecommend=${this.queryForm.isRecommend}&cecfCode=${this.queryForm.cecfCode}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyCheck/recommendStationCheckByWorkDepartment/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
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
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getRecommendCheckWorkDepartment(this.formQuery).then(data => {
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
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
</style>
