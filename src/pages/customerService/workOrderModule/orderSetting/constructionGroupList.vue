/**
 * @file 施工组列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="施工组列表" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="施工组">
          <el-input clearable v-model="queryForm.constructionGroup"></el-input>
        </el-form-item>
        <el-form-item label="施工单位名称">
          <el-select v-model="queryForm.constructionGroupName" clearable>
            <el-option label="日不落重工" value="1"></el-option>
            <el-option label="月不拉重工" value="2"></el-option>
            <el-option label="日月颠倒重工" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责的展区">
          <el-select v-model="queryForm.area" clearable>
            <el-option label="全部" value="1"></el-option>
            <el-option label="部分" value="2"></el-option>
            <el-option label="小部分" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listGroup" v-loading="loading">
        <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
        <el-table-column label="施工组" prop="constructionGroup" align="center"></el-table-column>
        <el-table-column label="施工单位名称" prop="constructionGroupName" align="center"></el-table-column>
        <el-table-column label="施工人员" prop="constructionNames" align="center"></el-table-column>
        <el-table-column label="联系方式" prop="noAccountPhone" align="center"></el-table-column>
        <el-table-column label="负责的展厅" prop="area" align="center"></el-table-column>
        <el-table-column label="负责的展区" prop="hall" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="detailUser(scope.row)">详情</el-button>
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="listGroup.total">
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
      constructionGroupNames: [], 
      areas: [],
      constructionName: '', 
      queryForm: {
        constructionGroup: '', 
        constructionGroupName: '', 
        area: '' 
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListGroup(this.constructionGroupQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('orderSetting', ['listGroup']),
    ...mapGetters('dictionary', ['dictionaryData']),
    constructionGroupQuery() {
      return {
        constructionGroup: this.queryForm.constructionGroup,
        constructionGroupName: this.queryForm.constructionGroupName,
        area: this.queryForm.area,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  methods: {
    ...mapActions('orderSetting', ['selectListGroup', 'deleteGroupInfo']),
    detailUser(row) {
      this.$router.push({
        path: '/constructionGroupDetails',
        query: {
          id: row.constructionGroupId 
        }
      });
    },
    deleteUser(row) {
      let constructionGroupId = row.constructionGroupId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteGroupInfo(constructionGroupId).then(response => {
          _this.selectListGroup(this.constructionGroupQuery).then(response2 => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
          });
          _this.loading = false;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleAdd() {
      this.$router.push("/constructionGroupSetting");
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
      this.selectListGroup(this.constructionGroupQuery).then(() => {
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












