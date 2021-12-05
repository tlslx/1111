<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室预订审核" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="80px" class="demo-ruleForm">
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
            :picker-options="pickerOptions2"
            style="width: 260px;">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.acceptStatus" placeholder="请选择" style="width: 150px;">
            <el-option label="待初审" value="07"></el-option>
            <el-option label="初审通过" value="08"></el-option>
            <el-option label="初审不通过" value="09"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-row class="btn-row">
          <el-button :disabled="multipleSelection.length<1" type="primary" @click="handlePass">通过</el-button>
          <el-button :disabled="multipleSelection.length !== 1" type="primary" @click="handleReject">驳回</el-button>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            disabled='true'
            :selectable="checkboxInit"
            width="55">
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
              <span v-if="scope.row.meetingStatus=='07'">待初审</span>
              <span v-else-if="scope.row.meetingStatus=='11'">复审不通过</span>
              <span v-else-if="scope.row.meetingStatus=='08'">初审通过</span>
              <span v-else-if="scope.row.meetingStatus=='09'">初审不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.meetingStatus !== '07' && scope.row.meetingStatus !== '11'" @click="handlePass(1, scope.row)" type="text" size="mini">通过</el-button>
              <el-button :disabled="scope.row.meetingStatus !== '07' && scope.row.meetingStatus !== '11'" @click="handleReject(1, scope.row)" type="text" size="mini">驳回</el-button>
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

      <!-- 驳回原因 -->
      <el-dialog title="驳回原因" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="填写驳回原因" :label-width="120" prop="auditContent">
            <el-input v-model="form.auditContent" autocomplete="off" placeholder="驳回原因不能为空"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="rejectcars">确 定</el-button>
        </div>
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
        dialogFormVisible: false,
        multipleSelection: [],
        pageInfo: {
          size: 10,
          current: 1,
          total: 0
        },
        ruleForm: {
          companyName: '',
          applyDateBegin: '',
          applyDateEnd: '',
          acceptStatus: '07'
        },
        dates: [],
        form: {
          auditContent: '',
          meetingIds: [],
          taskIds: []
        },
        rules: {
          auditContent: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ]
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
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listFirstAuditDestine', data).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        }).catch(err => {
        });
      },
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      // 根据当前的状态判断是否能够勾选
      checkboxInit(row, index) {
        if (row.meetingStatus === '07') {
          return true;
        } else {
          return false; //不可勾选
        }
      },
      resetForm() {
        this.ruleForm.companyName = '';
        this.dates = [];
        this.ruleForm.applyDateBegin = '';
        this.ruleForm.applyDateEnd = '';
        this.ruleForm.acceptStatus = '07';
      },
      // 跳转到会议室审核详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/reservationReviewDetail',
          query: {
            meetingId: row.meetingId,
            taskId: row.taskId
          }
        });
      },
      // 通过
      handlePass(index, row) {
        let data = [];
        let data2 = [];
        if (index !== 1) {
          this.multipleSelection.forEach(item => {
            data.push(item.taskId);
            data2.push(item.meetingId);
          });
          let params = {
            taskIds: data.join(),
            auditFlag: 1,
            meetingIds: data2.join()
          };
          this.$confirm('确认执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.auditCondition(params);
          }).catch();
        } else {
          data.push(row.taskId);
          data2.push(row.meetingId);
          let params = {
            taskIds: data.join(),
            auditFlag: 1,
            meetingIds: data2.join()
          };
          this.$confirm('确认执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.auditCondition(params);
          }).catch();
        }
      },
      // 驳回
      handleReject(index, row) {
        this.form.taskIds = [];
        this.form.meetingIds = [];
        if (index !== 1) {
          this.form.taskIds.push(this.multipleSelection[0].taskId);
          this.form.meetingIds.push(this.multipleSelection[0].meetingId);
          this.dialogFormVisible = true;
          this.form.auditContent = '';
        } else {
          this.form.taskIds.push(row.taskId);
          this.form.meetingIds.push(row.meetingId);
          this.dialogFormVisible = true;
          this.form.auditContent = '';
        }
      },
      // 驳回
      rejectcars() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let params = {
              auditFlag: 0,
              taskIds: this.form.taskIds.join(),
              meetingIds: this.form.meetingIds.join(),
              auditContent: this.form.auditContent
            };
            this.auditCondition(params);
          } else {
            return false;
          }
        });
      },
      // 通过或驳回的请求
      auditCondition(params) {
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/firstAuditDestine', params).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
          this.dialogFormVisible = false;
          this.init();
        });
      },
      // 表格选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
