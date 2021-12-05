/**
 * @file 展材管理
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展材管理" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="届数">
          <el-select v-model="queryForm.sessionNum" clearable>
            <el-option label="第122期" value="1"></el-option>
            <el-option label="第123期" value="2"></el-option>
            <el-option label="第124期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数">
          <el-select v-model="queryForm.issueNum" clearable>
            <el-option label="1期" value="1"></el-option>
            <el-option label="2期" value="2"></el-option>
            <el-option label="3期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.place" clearable>
            <el-option label="A区" value="A"></el-option>
            <el-option label="B区" value="B"></el-option>
            <el-option label="C区" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listByPage" v-loading="loading">
        <el-table-column label="届数" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="期数" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="展区" prop="place" align="center"></el-table-column>
        <el-table-column label="展材名称" prop="syntheticMaterialName" align="center"></el-table-column>
        <el-table-column label="展材编号" prop="exhibitionNumber" align="center"></el-table-column>
        <el-table-column label="展材规格" prop="syntheticMaterialSpecifications" align="center"></el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="listByPage.total">
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
      places: [], // 展区字典
      syntheticMaterialName: '',
      exhibitionNumber: '',
      syntheticMaterialSpecifications: '',
      queryForm: {
        issueNum: '', // 期数
        sessionNum: '', // 届数
        place: '' // 申请展区
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.selectListByPage(this.exhibitionToolQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('exhibitionToolManagement', ['listByPage']),
    ...mapGetters('dictionary', ['dictionaryData']),
    exhibitionToolQuery() {
      return {
        issueNum: this.queryForm.issueNum,
        place: this.queryForm.place,
        sessionNum: this.queryForm.sessionNum,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  // async beforeCreate() {
  //   this.sessionNums = await kindo.dictionary.get('sessionNums'); // 届数
  //   this.issueNums = await kindo.dictionary.get('issueNums'); // 展期
  //   this.places = await kindo.dictionary.get('places'); // 展区
  // },
  methods: {
    ...mapActions('exhibitionToolManagement', ['selectListByPage']),
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
      this.selectListByPage(this.exhibitionToolQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>













