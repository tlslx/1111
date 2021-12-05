/**
 * @file 库存增减
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="库存增减" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="届数">
          <el-select v-model="queryForm.sessionNum" clearable>
            <el-option label="第122期" value="1"></el-option>
            <el-option label="第123期" value="2"></el-option>
            <el-option label="第124期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="queryForm.issueNum" clearable>
            <el-option label="1期" value="1"></el-option>
            <el-option label="2期" value="2"></el-option>
            <el-option label="3期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="queryForm.area" clearable>
            <el-option label="1.1" value="1"></el-option>
            <el-option label="1.2" value="2"></el-option>
            <el-option label="1.3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警值">
          <el-input clearable v-model="queryForm.warmNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listAll" v-loading="loading">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="届数" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="期数" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="区域" prop="area" align="center"></el-table-column>
        <el-table-column label="库存" prop="stockNum" align="center"></el-table-column>
        <el-table-column label="预警值" prop="warmNum" align="center"></el-table-column>
        <el-table-column label="展材名称" prop="materialName" align="center"></el-table-column>
        <el-table-column label="展材数量" prop="materialQuantity" align="center"></el-table-column>
        <el-table-column label="展材预留数量" prop="materialKeepQuantity" align="center"></el-table-column>
        <el-table-column label="接受预警信息电话" prop="warmPhone" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      sessionNums: [], //届数字典
      issueNums: [], // 展期字典
      areas: [], // 区域字典
      syntheticMaterialName: '',
      exhibitionNumber: '',
      syntheticMaterialSpecifications: '',
      queryForm: {
        sessionNum: '', // 届数
        issueNum: '', // 展期
        area: '', // 区域
        warmNum: '' //预警值
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListAll(this.stockFluQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('stockFlu', ['listAll']),
    ...mapGetters('dictionary', ['dictionaryData']),
    stockFluQuery() {
      return {
        sessionNum: this.queryForm.sessionNum,
        issueNum: this.queryForm.issueNum,
        area: this.queryForm.area,
        warmNum: this.queryForm.warmNum
      };
    }
  },
  // async beforeCreate() {
  //   this.sessionNums = await kindo.dictionary.get('sessionNums'); // 届数
  //   this.issueNums = await kindo.dictionary.get('issueNums'); // 展期
  //   this.areas = await kindo.dictionary.get('areas'); // 区域
  // },
  methods: {
    ...mapActions('stockFlu', ['selectListAll', 'deleteById']),
    deleteUser(row) {
      let stockModifyId = row.stockModifyId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteById(stockModifyId).then(response => {
          _this.selectListAll(this.stockFluQuery).then(response2 => {
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
      this.$router.push("/addStockFlu");
    },
    handleQuery() {
      this.loading = true;
      this.selectListAll(this.stockFluQuery).then(() => {
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












