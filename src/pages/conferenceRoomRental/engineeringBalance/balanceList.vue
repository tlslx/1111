<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室结算列表" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="届数" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="123届" value="123"></el-option>
            <el-option label="124届" value="124"></el-option>
            <el-option label="125届" value="125"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
          <!--<el-button type="primary" @click="exportTable">导出</el-button>-->
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="届数"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="主办单位"
            align="center"
            width="220">
            <template slot-scope="scope">
              <span class="blue-underline" @click="goCompanyDetail(scope.row, scope.$index)">{{scope.row.companyName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="centerSum"
            label="中心总价"
            align="center"
            width="150">
          </el-table-column>

          <el-table-column
            prop="workPriceSum"
            label="工程公司总价"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contactName"
            label="申请人"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="手机号"
            align="center"
            width="100">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        pageInfo: {
          size: 10,
          current: 1,
          total: 0
        },
        ruleForm: {
          exhibitionSession: '125'
        },
        tableData: [],
        baseApi: process.env.API_FF_URL
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let data = {
          current: this.pageInfo.current,
          size: this.pageInfo.size,
          exhibitionSession: this.ruleForm.exhibitionSession
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listSumPay', data).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        });
      },
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      resetForm() {
        this.ruleForm.exhibitionSession = '';
        this.pageInfo.current = 1;
      },
      // // 导出
      // exportTable() {
      //   let data = {
      //     meetingId: row.mettingId
      //   };
      //   this.$http.post(this.baseApi + '', data).then(res => {
      //
      //   });
      // },
      // 跳转到会议室明细详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/balanceDetail',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      //分页事件
      handleSizeChange(val) {
        this.pageInfo.size = val;
        this.init();
      },
      handleCurrentChange(val) {
        this.pageInfo.current = val;
        this.init();
      }
    }
  };
</script>

<style scoped>
  .btn-row {
    margin: 10px;
  }
  .paging {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }
  .blue-underline{
    color: #0000ff;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
