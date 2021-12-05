<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="外贸司查看汇总表" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="trade-table" :data="ironStoneReorderList" v-loading="loading" :span-method="arraySpanMethod" border>
        <el-table-column label="专区" prop="productType" align="center">
          <template slot-scope="scope">
            {{ scope.row.productType === '1' ? '户外水疗设施' : (scope.row.productType === '2' ? '铁石装饰品' : scope.row.productType) }}
          </template>
        </el-table-column>
        <el-table-column label="交易团" prop="delegationName" align="center"></el-table-column>
        <el-table-column label="基数内展位数" prop="inBoothNumber" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.inBoothNumber">{{ scope.row.inBoothNumber }}</div>
            <div v-if="!scope.row.inBoothNumber || scope.row.inBoothNumber === null">0</div>
          </template>
        </el-table-column>
        <el-table-column label="基数外新增展位数" prop="outBoothNumber" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.outBoothNumber">{{ scope.row.outBoothNumber }}</div>
            <div v-if="!scope.row.outBoothNumber || scope.row.outBoothNumber === null">0</div>
          </template>
        </el-table-column>
        <el-table-column label="合计展位数" prop="totalBoothNumber" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.totalBoothNumber">{{ scope.row.totalBoothNumber }}</div>
            <div v-if="!scope.row.totalBoothNumber || scope.row.totalBoothNumber === null">0</div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
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
      secondList: [], // 保存二维数组
      ironStoneReorderList: [],
      productTypeOpts: [{ value: '1', label: '户外水疗设施' }, { value: '2', label: '铁石装饰品' }],
      delegationOpts: [],
      queryForm: {
        productType: '',
        delegationId: ''
      }
    };
  },
  computed: {
    ...mapGetters('ironworkNumberArrangements', ['ironStoneReorderData']),
    formQuery() {
      return {
        productType: this.queryForm.productType,
        delegationId: this.queryForm.delegationId
      };
    }
  },
  created() {
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('ironworkNumberArrangements', ['postIronStoneReorderInfo']),
    ...mapActions('nainformation', ['getdelegationDepartment']),
    // 合并行或列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并行
      if (columnIndex === 0) {
        if (row.productType === '2' && rowIndex === 0) {
          return [this.secondList[0].length - 1, 1];
        } else if (row.productType === '2' && rowIndex !== 0) {
          return [0, 0];
        }
        let rowIndexVal;
        let rowLength;
        if (this.secondList.length > 2) { // 所有情况
          rowIndexVal = this.secondList[0].length;
          rowLength = this.secondList[1].length - 1;
        } else if (this.secondList[0][0].productType === '1') { // 只有户外
          rowIndexVal = 0;
          rowLength = this.secondList[0].length - 1;
        }
        if (row.productType === '1' && rowIndex === rowIndexVal) {
          return [rowLength, 1];
        } else if (row.productType === '1' && rowIndex !== rowIndexVal) {
          return [0, 0];
        }
      }
      // 合并小计合计
      if (row.delegationName === '小计' || row.delegationId === '合计') {
        if (row.delegationName === '小计') {
          row.productType = row.delegationName;
        } else if (row.delegationId === '合计') {
          row.productType = row.delegationId;
        }
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    // 查询
    handleQuery() {
      this.createdQuery();
    },
    // 小计求和封装
    handleSummary(arr) {
      let smallTotal = {
        inBoothNumber: '',
        outBoothNumber: '',
        totalBoothNumber: ''
      };
      for (let k in smallTotal) {
        smallTotal[k] = (() => {
          let sum = 0;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i][k]) {
              sum = sum + arr[i][k];
            }
          }
          return sum;
        })();
      }
      smallTotal.delegationName = '小计';
      arr.push(smallTotal);
    },
    // 下载
    handleDownload() {
      let url = `productType=${this.queryForm.productType}&delegationId=${this.queryForm.delegationId}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/ironStoneHydrotherapy/getIronStoneReorderInfo/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      // 小计插入
      // 户外水疗小计
      this.postIronStoneReorderInfo(this.formQuery).then(data => {
        this.loading = false;
        this.ironStoneReorderList = JSON.parse(JSON.stringify(data)).recordsList;
        // 计算铁石小计
        this.handleSummary(this.ironStoneReorderList[0]);
        // 计算水疗小计
        this.handleSummary(this.ironStoneReorderList[1]);
        // 降维
        if (this.ironStoneReorderList[0] && this.ironStoneReorderList[0].length < 2) {
          this.ironStoneReorderList.splice(0, 1);
        }
        if (this.ironStoneReorderList[1] && this.ironStoneReorderList[1].length < 2) {
          this.ironStoneReorderList.splice(1, 1);
        }
        this.secondList = this.ironStoneReorderList;
        let getList = Array.prototype.concat.apply([], this.ironStoneReorderList);
        this.ironStoneReorderList = getList;
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
