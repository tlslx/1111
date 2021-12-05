<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室申请列表" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="主办单位:" size="mini">
          <el-input v-model.trim="ruleForm.companyName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="申请时间:" size="mini">
          <el-date-picker
            v-model="dates"
            type="daterange"
            align="right"
            unlink-panels
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2"
            style="width: 250px;">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.meetingStatus" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="待受理" value="01"></el-option>
            <el-option label="不受理" value="03"></el-option>
            <el-option label="受理中" value="07"></el-option>
            <el-option label="审核通过" value="10"></el-option>
            <el-option label="审核不通过" value="11"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="applyMeetingRoom">申请会议室</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column
            label="序号"
            type="index"
            width="60">
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
            prop="createDate"
            label="申请时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contactName"
            label="联系人"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="手机号"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="meetingStatus"
            label="状态"
            align="center"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.meetingStatus=='01'">待受理</span>
              <!--<span v-else-if="scope.row.meetingStatus=='02'">已受理</span>-->
              <span v-else-if="scope.row.meetingStatus=='03'">不受理</span>
              <span v-else-if="scope.row.meetingStatus=='07'">受理中</span>
              <span v-else-if="scope.row.meetingStatus=='10'">审核通过</span>
              <span v-else-if="scope.row.meetingStatus=='11'">审核不通过</span>
              <span v-else>受理中</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button v-if="Number(scope.row.meetingStatus)==3 || Number(scope.row.meetingStatus)==1" @click="handleEdit(scope.row, scope.$index)" type="text" size="mini">修改</el-button>
              <el-button v-if="Number(scope.row.meetingStatus)==3 || Number(scope.row.meetingStatus)==1" @click="handleRevocation(scope.row, scope.$index)" type="text" size="mini">撤销</el-button>
              <el-button v-if="Number(scope.row.meetingStatus)>9" @click="showResult(scope.row, scope.$index)" type="text" size="mini">审批结果</el-button>
              <el-button v-if="Number(scope.row.meetingStatus) === 10" @click="handlePay(scope.row, scope.$index)" type="text" size="mini">付款</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.current"
          :page-sizes="[5, 20, 50, 100]"
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
    name: "acceptedList",
    data() {
      return {
        activeName: 'first',
        pageInfo: {
          size: 5,
          current: 1,
          total: 0
        },
        ruleForm: {
          companyName: '',
          date: [],
          // applyDateBegin: '',
          // applyDateEnd: '',
          meetingStatus: '01'
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
        tableData: [],
        baseApi: process.env.API_FF_URL
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.tableData = [];
        let data = {
          current: this.pageInfo.current,
          size: this.pageInfo.size,
          applyDateBegin: this.dates[0] || null,
          applyDateEnd: this.dates[1] || null,
          meetingStatus: this.ruleForm.meetingStatus || null,
          companyName: this.ruleForm.companyName || null
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listMeetingApply', data).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        }).catch(err => {
        });
      },
      resetForm() {
        this.ruleForm.meetingStatus = '01';
        this.ruleForm.companyName = '';
        this.ruleForm.applyDateBegin = '';
        this.ruleForm.applyDateEnd = '';
        this.dates = [];
      },
      // 查询
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      // 撤销
      handleRevocation(row, index) {
        let params = {
          meetingId: row.meetingId
        };
        this.$confirm('此操作将删除这条申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.baseApi + '/api/customservice/meetingRent/deleteMeetingApply', params).then(res => {
            this.$message({
              type: "success",
              message: "撤销成功"
            });
            this.init();
          });
        }).catch(() => {
        });
      },
      // 审批结果
      showResult(row, index) {
        this.$router.push({
          path: '/meetingRoomApplyDetail',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 修改
      handleEdit(row, index) {
        this.$router.push({
          path: '/meetingRoomApply',
          query: {
            meetingId: row.meetingId,
            taskId: row.taskId,
            meetingStatus: row.meetingStatus
          }
        });
      },
      // 跳转到会议室资质审核详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/meetingRoomApplyDetail',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 跳转到付款
      handlePay(row, index) {
        this.$router.push({
          path: '/paymentList',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      applyMeetingRoom() {
        this.$router.push({
          path: '/meetingRoomApply'
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
