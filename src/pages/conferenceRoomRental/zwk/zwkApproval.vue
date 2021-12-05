<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展务科审批" name="first">
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
            style="width: 260px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.acceptStatus" placeholder="请选择">
            <el-option label="待审批" value="04"></el-option>
            <el-option label="已审批" value="01"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm()">查询</el-button>
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
              <span class="blue-underline" @click="goCompanyDetail(scope.row, scope.index)">{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isVip"
            label="是否VIP企业"
            align="center"
            width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.isVip == 1">是</span>
              <span v-if="scope.row.isVip == 0">否</span>
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
            prop="meetingStatus"
            label="状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.meetingStatus=='04'">待审批</span>
              <span v-else-if="scope.row.meetingStatus=='01'">已审批</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.meetingStatus != '04'" @click="approval(scope.row, scope.$index)" type="text" size="mini">审批</el-button>
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
        title="是否VIP企业"
        :visible.sync="centerDialogVisible"
        width="400px"
        center>
        <div style="text-align: center">
          <el-row>
            <el-radio-group v-model="isVip">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleApprove">确 定</el-button>
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
          applyDateBegin: '',
          applyDateEnd: '',
          acceptStatus: '04'
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
        isVip: 0,
        meetingId: '',
        taskId: '',
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
          acceptStatus: this.ruleForm.acceptStatus
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listApplyConditionRepeat', data).then(res => {
          if (res.records.length > 0) {
            this.tableData = res.records;
            this.pageInfo.total = res.total;
          }
        }).catch(err => {
        });
      },
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      approval(row, index) {
        this.centerDialogVisible = true;
        this.meetingId = row.meetingId;
        this.taskId = row.taskId;
      },
      resetForm() {
        this.ruleForm.companyName = '';
        this.ruleForm.applyDateBegin = '';
        this.ruleForm.applyDateEnd = '';
        this.ruleForm.acceptStatus = '04';
        this.dates = [];
      },
      // 审批
      handleApprove () {
        let data = {
          meetingId: this.meetingId,
          taskId: this.taskId,
          isVip: this.isVip
        };
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/auditConditionRepeat', data).then(res => {
          this.$message({
            message: '已审批成功',
            type: 'success'
          });
          this.centerDialogVisible = false;
          this.init();
        });
      },
      // 跳转到会议室资质审核详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/zwkApprovalDetail',
          query: {
            meetingId: row.meetingId,
            taskId: row.taskId
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
