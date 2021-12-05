<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部汇总数据并安排展位数量" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="item in productTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="primary" @click="tableDialog = true;">申报</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="summaryIronStoneData.records" v-loading="loading" border>
        <el-table-column label="交易团" prop="delegationName" align="center"></el-table-column>
        <el-table-column label="展位类别" align="center">
          <template slot-scope="scope">
            一般性
          </template>
        </el-table-column>
        <el-table-column label="专区" prop="productType" align="center">
          <template slot-scope="scope">
            {{ scope.row.productType === '1' ? '户外水疗设施' : (scope.row.productType === '2' ? '铁石装饰品' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="展位数量" prop="totalBoothNumber" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-footer">
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="summaryIronStoneData.total">
        </el-pagination>
      </el-row>
      <!-- 汇总申报 -->
      <el-dialog title="汇总申报" :visible.sync="tableDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-table :data="IronStoneList" :span-method="arraySpanMethod" border>
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
              <div v-if="scope.row.productType === '1' || scope.row.productType === '2'">
                <el-form :model="scope.row" :ref="`insideNum${scope.$index}`" :rules="rules">
                  <el-form-item class="item-Num" prop="outBoothNumber">
                    <el-input v-model.trim.number="scope.row.outBoothNumber" @change="handleChange($event, scope.row)" oninput="if(value.length>10)value=value.slice(0,10)"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.outBoothNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合计展位数" prop="totalBoothNumber" align="center">
            <template slot-scope="scope">
              {{ scope.row.inBoothNumber + (scope.row.outBoothNumber - 0) }}
            </template>
          </el-table-column>
        </el-table>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="handleApply">申报</el-button>
          <el-button size="medium" @click="handleCancel">取消</el-button>
        </div>
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
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      tableDialog: false,
      IronStoneList: [],
      lastIronStoneList: [],
      secondList: [],
      productTypeOpts: [{ value: '1', label: '户外水疗设施专区' }, { value: '2', label: '铁石装饰品专区' }],
      delegationOpts: [],
      queryForm: {
        productType: '',
        delegationId: ''
      },
      rules: {
        outBoothNumber: [{ required: true, validator: needInt, trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('ironworkNumberArrangements', ['summaryIronStoneData']),
    formQuery() {
      return {
        productType: this.queryForm.productType,
        delegationId: this.queryForm.delegationId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
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
    ...mapActions('ironworkNumberArrangements', ['postSummaryIronStoneInfo', 'postUpdateBaseBoothNumberInfo']),
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
      if (row.delegationName === '小计' || row.exhibitionAreaName === '合计') {
        if (row.delegationName === '小计') {
          row.productType = row.delegationName;
        } else if (row.exhibitionAreaName === '合计') {
          row.productType = row.exhibitionAreaName;
        }
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    // 小计合计添加与编辑
    handleSummaryAddEdit(arr, type) {
      let secondlist = arr;
      // 计算铁石小计
      this.handleSummary(secondlist[0], type);
      let ironStoneSum;
      if (secondlist[0][0] && secondlist[0][0].productType === '2') {
        ironStoneSum = {
          inBoothNumber: secondlist[0][secondlist[0].length - 1].inBoothNumber,
          outBoothNumber: secondlist[0][secondlist[0].length - 1].outBoothNumber,
          totalBoothNumber: secondlist[0][secondlist[0].length - 1].totalBoothNumber
        };
      } else {
        ironStoneSum = {
          inBoothNumber: 0,
          outBoothNumber: 0,
          totalBoothNumber: 0
        };
      }
      // 计算水疗小计
      this.handleSummary(secondlist[1], type);
      let waterSum;
      if (secondlist[1][0] && secondlist[1][0].productType === '1') {
        waterSum = {
          inBoothNumber: secondlist[1][secondlist[1].length - 1].inBoothNumber,
          outBoothNumber: secondlist[1][secondlist[1].length - 1].outBoothNumber,
          totalBoothNumber: secondlist[1][secondlist[1].length - 1].totalBoothNumber
        };
      } else if (secondlist[0][0] && secondlist[0][0].productType === '1') {
        waterSum = {
          inBoothNumber: secondlist[0][secondlist[0].length - 1].inBoothNumber,
          outBoothNumber: secondlist[0][secondlist[0].length - 1].outBoothNumber,
          totalBoothNumber: secondlist[0][secondlist[0].length - 1].totalBoothNumber
        };
      } else {
        waterSum = {
          inBoothNumber: 0,
          outBoothNumber: 0,
          totalBoothNumber: 0
        };
      }
      // 降维
      if (secondlist[0] && secondlist[0].length < 2) {
        secondlist.splice(0, 1);
      }
      if (secondlist[1] && secondlist[1].length < 2) {
        secondlist.splice(1, 1);
      }
      if (type === 'add') { // 添加
        // 加入合计
        let sumAll = {
          exhibitionAreaName: '合计',
          productType: '',
          inBoothNumber: ironStoneSum.inBoothNumber + waterSum.inBoothNumber,
          outBoothNumber: ironStoneSum.outBoothNumber + waterSum.outBoothNumber,
          totalBoothNumber: ironStoneSum.totalBoothNumber + waterSum.totalBoothNumber
        };
        secondlist.push(sumAll);
      } else if (type === 'edit') { // 编辑
        // 修改合计
        secondlist[secondlist.length - 1].inBoothNumber = ironStoneSum.inBoothNumber + waterSum.inBoothNumber;
        secondlist[secondlist.length - 1].outBoothNumber = ironStoneSum.outBoothNumber + waterSum.outBoothNumber;
        secondlist[secondlist.length - 1].totalBoothNumber = ironStoneSum.totalBoothNumber + waterSum.totalBoothNumber;
      }
      this.secondList = secondlist;
      let getList = Array.prototype.concat.apply([], secondlist);
      this.IronStoneList = getList;
    },
    // 小计合计动态改变
    handleChange(val, row) {
      row.totalBoothNumber = row.inBoothNumber + row.outBoothNumber;
      this.handleSummaryAddEdit(this.secondList, 'edit');
    },
    // 申报
    handleApply() {
      let validList = [];
      for (let k in this.$refs) {
        this.$refs[k].validate(valid => {
          validList.push(valid);
        });
      }
      let index = validList.indexOf(false);
      if (index === -1) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        let listData = [];
        for (let i = 0, l = this.IronStoneList.length; i < l; i++) {
          let obj = {};
          if (this.IronStoneList[i].productType !== '小计' && this.IronStoneList[i].productType !== '合计') {
            obj = {
              delegationId: this.IronStoneList[i].delegationId,
              delegationName: this.IronStoneList[i].delegationName,
              productType: this.IronStoneList[i].productType,
              insideBoothNumber: this.IronStoneList[i].inBoothNumber,
              outsideBoothNumber: this.IronStoneList[i].outBoothNumber
            };
            listData.push(obj);
          }
        }
        this.postUpdateBaseBoothNumberInfo(listData).then(() => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.$message.success('申报成功');
          this.tableDialog = false;
          this.createdQuery();
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      } else {
        this.$message.warning('请确认填写正确');
      }
    },
    // 取消
    handleCancel() {
      this.tableDialog = false;
      this.IronStoneList = JSON.parse(JSON.stringify(this.lastIronStoneList));
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
    // 小计求和封装
    handleSummary(arr, type) {
      let smallTotal = {
        inBoothNumber: 0,
        outBoothNumber: 0,
        totalBoothNumber: 0
      };
      let length = 0;
      if (type === 'add') {
        length = arr.length;
      } else if (type === 'edit') {
        length = arr.length - 1;
      }
      for (let k in smallTotal) {
        smallTotal[k] = (() => {
          let sum = 0;
          for (let i = 0; i < length; i++) {
            if (arr[i][k]) {
              sum = sum + (arr[i][k] - 0);
            }
          }
          return sum;
        })();
      }
      smallTotal.delegationName = '小计';
      if (type === 'add') {
        arr.push(smallTotal);
      } else if (type === 'edit' && arr instanceof Array) {
        arr[arr.length - 1].inBoothNumber = smallTotal.inBoothNumber ? smallTotal.inBoothNumber : 0;
        arr[arr.length - 1].outBoothNumber = smallTotal.outBoothNumber ? smallTotal.outBoothNumber : 0;
        arr[arr.length - 1].totalBoothNumber = smallTotal.totalBoothNumber ? smallTotal.totalBoothNumber : 0;
      }
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.postSummaryIronStoneInfo(this.formQuery).then(data => {
        this.loading = false;
        this.IronStoneList = JSON.parse(JSON.stringify(data)).recordsList;
        this.handleSummaryAddEdit(this.IronStoneList, 'add');
        // 深拷贝另存
        this.lastIronStoneList = JSON.parse(JSON.stringify(this.IronStoneList));
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
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.pagination-footer{
  margin-top: 20px;
}  
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
