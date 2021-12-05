<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="收取订金通知" name="first">
      <el-table border v-loading="loading">
        <el-table-column label="编号" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="交易团" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="参展企业名称" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="广交会编码" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="期数" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展区" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展位数" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展位号" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="所属贫困县" align="center" prop="exhibitionSession"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">通过</el-button>
          <el-button type="primary" size="medium">不通过</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="0">
        </el-pagination>
      </el-row>
      <!-- 新增编辑弹框 -->
      <el-dialog :title="diaTitle" :visible.sync="isSet" v-if="isSet">
        <el-form class="setForm" :model="addEditData" ref="setForm" :rules="setRule" label-width="160px">
          <el-form-item label="审核意见：" prop="exportUpperLimit">
            <el-input type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" >确认</el-button>
          <el-button size="medium" @click="isSet = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      // 弹框
      diaTitle: '',
      isSet: false,
      addEditData: {
        settlementType: ''
      },
      settlementTypeOpts: [],
      labelTitle: '',
      setRule: {

      },
      // 查询条件
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      productTypeOpts: [],
      boothTypeOpts: [{ value: '1', label: '品牌展位' }, { value: '2', label: '一般性展位' }],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      pageInfo: { current: 1, size: 10 }
    };
  },
  filters: {
    boothTypeFilter: value => {
      let val = value + '';
      switch (val) {
        case '1':
          return '品牌展位';
        case '2':
          return '一般性展位';
        default:
          return;    
      }
    }
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "delegationApply"
    ]),
    formQuery() {
      return {
        exhibitionSession: this.queryForm.exhibitionSession,
        delegationId: this.queryForm.delegationId,
        exhibitionAreaCode: this.queryForm.exhibitionAreaCode,
        boothType: this.queryForm.boothType,
        companyName: this.queryForm.companyName,
        current: this.queryForm.current,
        size: this.queryForm.size
      };
    }
  },
  created() {
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getexhibitionInfoByCode", // 获取专区
      "getexhibitionArea" // 获取展区
    ]),
    // 根据展区查询专区
    handleExhibitionAreaChange(val) {
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
    // 查询
    handleQuery() {
      this.pageInfo.current = 1;
    },
    // 操作页面
    handleSizeChange(val) {
      this.pageInfo.current = val;
    },
    handleCurrentChange(val) {
      this.pageInfo.size = val;
    },
    // 查询封装
    createdQuery() {
      
    }
  }
};
</script>
<style scoped>
.pagination-container{
  float: right;
}
.queryBtn{
  margin-bottom: 20px;
}
.setForm{
  width: 70%;
  min-width: 550px;
  margin: 0 auto;
}
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}    
.form-box{
  width: 50%;
  padding: 0 10px;
  box-sizing: border-box;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>