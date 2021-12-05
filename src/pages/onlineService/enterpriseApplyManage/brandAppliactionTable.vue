/**
 * @file 品牌展位申请列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="品牌展位申请列表" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="期数">
          <el-select v-model="queryForm.phase" clearable>
            <el-option v-for="item in exhibitionPeriodNum" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="届数">
          <el-input clearable v-model="queryForm.exhibitionSession"></el-input>
        </el-form-item>
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionArea" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核情况">
          <el-select v-model="queryForm.checkStatus" clearable>
            <el-option v-for="item in checkStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="brandApplyData.records" v-loading="loading">
        <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展品专区" prop="exhibitsCategory" align="center"></el-table-column>
        <el-table-column label="展位类型" prop="boothType" align="center"></el-table-column>
        <el-table-column label="期数" prop="phase" align="center"></el-table-column>
        <el-table-column label="申请数量" prop="applyBoothNumber" align="center"></el-table-column>
        <el-table-column label="申请面积" prop="exhibitArea" align="center"></el-table-column>
        <el-table-column label="联营企业" prop="companyName" align="center"></el-table-column>
        <el-table-column label="审核情况" prop="checkStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.checkStatus === '0' ? '未审核' : (scope.row.checkStatus === '1' ? '审核通过' : '不通过') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row.brandApplyId)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteBrandData(scope.row.brandApplyId)">删除</el-button>
            <el-button type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span>
          <el-button type="primary" size="medium" @click="brandAdd">新增</el-button>
          <el-button type="primary" size="medium" @click="goAptitudeTable">已上传资质信息查看</el-button>
        </span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="brandApplyData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      exhibitionAreaOpts: [],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '审核通过' }, { value: '2', label: '不通过' }],
      exhibitionPeriodNum: [], // 展期字典
      exhibitionArea: [], // 展区字典
      queryForm: {
        phase: '', // 期数
        exhibitionSession: '', // 届数
        exhibitionArea: '', // 申请展区
        checkStatus: '' // 审核情况
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('companyInfomation', ['brandApplyData']),
    ...mapGetters('dictionary', ['dictionaryData']),
    brandApplyQuery() {
      return {
        exhibitionSession: this.queryForm.exhibitionSession,
        exhibitionArea: this.queryForm.exhibitionArea,
        checkStatus: this.queryForm.checkStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize,
        companyId: this.$store.state.userInfo.companyId
      };
    }
  },
  async beforeCreate() {
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    this.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.exhibitionArea.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.exhibitionArea.splice(deleteIndex, 1);
      }
    });
  },
  created() {
    this.loading = true;
    this.getBrandApplyQuery(this.brandApplyQuery).then(res => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('companyInfomation', ['getBrandApplyQuery', 'getDelBrandApply']),
    // 根据申请Id删除申请表
    deleteBrandData(id) {
      this.$confirm('确定要删除此项吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getDelBrandApply({ brandApplyId: id }).then(() => {
          this.$message.success('删除成功');
          this.createdQuery();
        }).catch(() => {
          this.$message.error('删除失败');
        });
      }).catch(() => {
        this.$message.info('已取消此操作');
      });
    },
    // 品牌展位申请表新增
    brandAdd() {
      this.$router.push({ path: '/applyListing' });
    },
    goAptitudeTable() {
      this.$router.push({ path: '/aptitudedTable' });
    },
    // 编辑
    handleEdit(id) {
      this.$router.push({ path: '/brandApplyFormEdit', params: { id: id }});
    },
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.getBrandApplyQuery(this.brandApplyQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
</style>
