/**
 * @file 库存预警设置
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="库存预警设置" name="first">
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
          <el-select v-model="queryForm.area" collapse-tags multiple placeholder="可多选">
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
          <el-button type="danger" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listAll" style="width: 100%; margin-top: 20px" v-loading="loading">
        <el-table-column label="届数" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="展期" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="区域" prop="area" align="center"></el-table-column>
        <el-table-column label="库存" prop="stockNum" align="center"></el-table-column>
        <el-table-column label="预警值" prop="warmNum" align="center"></el-table-column>
        <el-table-column label="展材名称" prop="materialName" align="center"></el-table-column>
        <el-table-column label="展材数量" prop="materialQuantity" align="center"></el-table-column>
        <el-table-column label="展材预留数量" prop="materialKeepQuantity" align="center"></el-table-column>
        <el-table-column label="接受预警信息电话" prop="warmPhone" align="center"></el-table-column>
        <el-table-column label="操作人" prop="operation" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="预警消息列表" name="second">
      <el-table border :data="listAllInfomation" style="width: 100%; margin-top: 20px" v-loading="loading">
        <el-table-column v-if="isShow" label="" prop="schemeCode" align="center"></el-table-column>
        <el-table-column label="届数" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="期数" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="区域" prop="area" align="center"></el-table-column>
        <el-table-column label="预警时间" prop="warmDatetime" align="center"></el-table-column>
        <el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row)">详情</el-button>
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
      isShow: false,
      sessionNums: [], // 届数字典
      issueNums: [], // 展期字典
      areas: [], // 区域字典
      queryForm: {
        sessionNum: '', // 届数
        issueNum: '', // 展期
        area: '', // 区域
        warmNum: '' // 预警值
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListAll(this.stockAlertQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
    this.selectListAllInfomation().then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('stockAlert', ['listAll', 'listAllInfomation']),
    ...mapGetters('dictionary', ['dictionaryData']),
    stockAlertQuery() {
      return {
        issueNum: this.queryForm.issueNum,
        area: this.queryForm.area,
        sessionNum: this.queryForm.sessionNum,
        warmNum: this.queryForm.warmNum
      };
    }
  },
  methods: {
    ...mapActions('stockAlert', ['selectListAll', 'selectListAllInfomation', 'deleteById']),
    checkDetail(row) {
      console.log(row.warmInfomationId, "222");
      this.$router.push({
        path: '/detailStockAlert',
        // name: 'detailStockAlert',
        query: {
          id: row.warmInfomationId
        }
      });
    },
    deleteUser(row) {
      let stockWarmId = row.stockWarmId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteById(stockWarmId).then(response => {
          _this.selectListAll(this.stockAlertQuery).then(response2 => {
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
    handleClick(tab, event) {

    },
    handleAdd() {
      this.$router.push("/addstocKalert");
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
      this.selectListAll(this.stockAlertQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }

  }
};
</script>