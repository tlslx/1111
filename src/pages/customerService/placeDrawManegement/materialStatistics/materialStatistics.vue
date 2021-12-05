/**
 * @file 材料统计
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="材料统计" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="届数">
          <el-select v-model="queryForm.sessionNum" clearable>
            <el-option label="第122期" value="1"></el-option>
            <el-option label="第123期" value="2"></el-option>
            <el-option label="第124期" value="3"></el-option>
            <el-option label="111" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="queryForm.issueNum" clearable>
            <el-option label="1期" value="1"></el-option>
            <el-option label="2期" value="2"></el-option>
            <el-option label="3期" value="3"></el-option>
            <el-option label="222" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展厅">
          <el-select v-model="queryForm.place" collapse-tags multiple placeholder="可多选">
            <el-option label="1.1" value="1"></el-option>
            <el-option label="1.2" value="2"></el-option>
            <el-option label="1.3" value="3"></el-option>
            <el-option label="A123" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展览名称">
          <el-input clearable v-model="queryForm.exhibitionName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :src="imgUrl" @click="openDraw">打开展厅图</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listAll" v-loading="loading">
        <el-table-column label="届数" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="展览名称" prop="exhibitionName" align="center"></el-table-column>
        <el-table-column label="展期" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="展厅" prop="place" align="center"></el-table-column>
        <el-table-column label="展区" prop="place" align="center"></el-table-column>
        <el-table-column label="截止时间" prop="operation" align="center"></el-table-column>
        <el-table-column label="展具类型" prop="syntheticMaterialName" align="center"></el-table-column>
        <el-table-column label="展材名称" prop="syntheticMaterialName" align="center"></el-table-column>
        <el-table-column label="展材规格" prop="syntheticMaterialSpecifications" align="center"></el-table-column>
        <el-table-column label="数量" prop="place" align="center"></el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="listAll.total">
      </el-pagination>
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
      sessionNums: [], // 届数字典
      issueNums: [], // 展期字典
      areas: [], // 展厅字典
      imgUrl: "",
      queryForm: {
        sessionNum: '', // 届数
        issueNum: '', // 展期
        place: '', // 展厅
        exhibitionName: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.selectListAll(this.materialStatisticsQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('materialStatistics', ['listAll']),
    ...mapGetters('dictionary', ['dictionaryData']),
    materialStatisticsQuery() {
      return {
        issueNum: this.queryForm.issueNum,
        place: this.queryForm.place,
        exhibitionName: this.queryForm.exhibitionName,
        sessionNum: this.queryForm.sessionNum,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  methods: {
    ...mapActions('materialStatistics', ['selectListAll']),
    openDraw() {

    },
    handleAdd() {
      this.$router.push("/addexhibitionTool");
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
      this.selectListAll(this.materialStatisticsQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>