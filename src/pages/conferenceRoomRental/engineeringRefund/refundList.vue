<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室退款列表" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="主办单位:" size="mini">
          <el-input v-model="ruleForm.companyName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="申请人:" size="mini">
          <el-input v-model="ruleForm.contactName"></el-input>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.meetingStatus" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="待审批" value="1"></el-option>
            <el-option label="审批通过" value="2"></el-option>
            <el-option label="审批不通过" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            type="index"
            width="55">
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
            prop="contactName"
            label="申请人"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="申请时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="手机号"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="meetingStatus"
            label="状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.meetingStatus=='1'">待审批</span>
              <span v-else-if="scope.row.meetingStatus=='2'">审批通过</span>
              <span v-else-if="scope.row.meetingStatus=='3'">审批不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button @click="refund(scope.row, scope.$index)" type="text" size="mini">退款</el-button>
              <el-button @click="refundRecord(scope.row, scope.$index)" type="text" size="mini">退款</el-button>
            </template>
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

      <el-dialog
        title="收款凭证"
        :visible.sync="centerDialogVisible"
        width="450px"
        center>
        <el-row>
          <span style="width: 80px;">上传凭证：</span>
          <el-upload
            type="textarea"
            v-model="textarea">

          </el-upload>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmPay">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        centerDialogVisible: false,
        pageInfo: {
          size: 10,
          current: 1,
          total: 0
        },
        ruleForm: {
          companyName: '',
          date: [],
          status: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dates: [],
        textarea: '',
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
          exhibitionSession: 125,
          meetingStatus: this.ruleForm.meetingStatus || null,
          contactName: this.ruleForm.contactName || null,
          companyName: this.ruleForm.companyName || null
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
        this.ruleForm.companyName = '';
        this.ruleForm.contactName = '';
        this.ruleForm.meetingStatus = '';
      },
      // 退款
      refund(row, index) {
        this.$router.push({
          path: '/refund',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 退款记录
      refundRecord(row) {
        this.$router.push({
          path: '/refundRecord',
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
