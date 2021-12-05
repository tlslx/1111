/**
 * @file 标准展位展具配置管理
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="标准展位展具配置管理" name="first">
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
        <el-form-item label="展区编号">
          <el-input v-model="queryForm.exhibitionAreaNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="展区名称">
          <el-input v-model="queryForm.exhibitionAreaName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listByPage" v-loading="loading" highlight-current-row>
        <el-table-column label="届数" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="期数" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="展区编号" prop="exhibitionAreaNumber" align="center"></el-table-column>
        <el-table-column label="展区名称" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="标准展位长度（毫米）" prop="standardBoothLength" align="center"></el-table-column>
        <el-table-column label="标准展位宽度（毫米）" prop="standardBoothWidth" align="center"></el-table-column>
        <el-table-column label="展具配置费限额（元）" prop="configurationFeeLimit" align="center"></el-table-column>
        <el-table-column label="默认配置方案" prop="defaultSchemeName" align="center"></el-table-column>
        <el-table-column label="方案编码" prop="schemeCode" align="center"></el-table-column>
        <el-table-column label="方案名称" prop="programName" align="center"></el-table-column>
        <el-table-column label="配置效果图" prop="rendering" align="center"></el-table-column>
        <el-table-column label="效果图" prop="configurationDiagram" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
            <el-button type="text" @click="checkDetail(scope.row)">详情</el-button>
            <el-button type="text" @click="copeUser(scope.row)">复制</el-button>
          </template>
        </el-table-column>
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
      isShow: false,
      sessionNums: [], // 届数字典
      issueNums: [], // 展期字典
      places: [], // 展区字典
      queryForm: {
        issueNum: '', // 期数
        sessionNum: '', // 届数
        exhibitionAreaNumber: '',
        exhibitionAreaName: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListByPage(this.shemeQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('sheme', ['listByPage']),
    ...mapGetters('dictionary', ['dictionaryData']),
    shemeQuery() {
      return {
        issueNum: this.queryForm.issueNum,
        exhibitionAreaName: this.queryForm.exhibitionAreaName,
        sessionNum: this.queryForm.sessionNum,
        exhibitionAreaNumber: this.queryForm.exhibitionAreaNumber,
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
    ...mapActions('sheme', ['selectListByPage']),
    checkDetail(row) {
      console.log(row.schemeCode, "222");
      this.$router.push({
        path: '/detailSheme',
        query: {
          id: row.schemeCode
        }
      });
    },
    modifyUser(row) {
      console.log(row.schemeCode, "222");
      this.$router.push({
        path: '/modifySheme',
        query: {
          id: row.schemeCode
        }
      });
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
      this.selectListByPage(this.shemeQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>



