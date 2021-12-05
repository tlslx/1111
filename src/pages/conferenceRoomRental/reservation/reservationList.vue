<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室预订列表" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="80px">
        <el-form-item label="主办单位:" size="mini">
          <el-input v-model.trim="ruleForm.companyName" placeholder="请输入内容" style="width: 150px;"></el-input>
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
            :picker-options="pickerOptions"
            style="width: 260px;">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.acceptStatus" placeholder="请选择">
            <el-option label="待预订" value="05"></el-option>
            <el-option label="待初审" value="07"></el-option>
            <el-option label="初审通过" value="08"></el-option>
            <el-option label="初审不通过" value="09"></el-option>
            <el-option label="复审通过" value="10"></el-option>
            <el-option label="复审不通过" value="11"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="主办单位"
            align="center"
            width="200">
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
            label="申请人"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="手机号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="auditContent"
            label="驳回原因"
            align="center">
          </el-table-column>
          <el-table-column
            prop="meetingStatus"
            label="状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.meetingStatus=='05'">待预订</span>
              <span v-else-if="scope.row.meetingStatus=='07'">待初审</span>
              <span v-else-if="scope.row.meetingStatus=='08'">初审通过</span>
              <span v-else-if="scope.row.meetingStatus=='09'">初审不通过</span>
              <span v-else-if="scope.row.meetingStatus=='10'">复审通过</span>
              <span v-else-if="scope.row.meetingStatus=='11'">复审不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.meetingStatus != '05' && scope.row.meetingStatus != '09'" @click="reservation(scope.row, scope.$index)" type="text" size="mini">预订</el-button>
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
          applyDateBegin: '',
          applyDateEnd: '',
          acceptStatus: '05'
        },
        pickerOptions: {
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
        isVipRadio: 1,
        isVipInput: '',
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
          companyName: this.ruleForm.companyName || null,
          applyDateBegin: this.dates[0] || null,
          applyDateEnd: this.dates[1] || null,
          acceptStatus: this.ruleForm.acceptStatus || null
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listMeetingDestine', data).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        }).catch(err => {
        });
      },
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      resetForm() {
        this.ruleForm.companyName = '';
        this.ruleForm.applyDateBegin = '';
        this.ruleForm.applyDateEnd = '';
        this.ruleForm.acceptStatus = '05';
        this.dates = [];
      },
      // 预订跳转
      reservation(row, index) {
        this.$router.push({
          path: '/reservationDetail',
          query: {
            meetingId: row.meetingId,
            taskId: row.taskId,
            edit: true
          }
        });
      },
      // 跳转到会议室预订详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/reservationDetail',
          query: {
            meetingId: row.meetingId,
            taskId: row.taskId
          }
        });
      },
      // 分页事件
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
