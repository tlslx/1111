<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="受理列表" name="first">
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
          <el-select v-model="ruleForm.acceptStatus" placeholder="请选择" style="width: 140px;">
            <el-option label="待受理" value="01"></el-option>
            <el-option label="已受理" value="02"></el-option>
            <el-option label="不受理" value="03"></el-option>
          </el-select>
        </el-form-item>
<!--01待受理、02已受理、03不受理、04提交展务科、05资质审核通过、06资质审核不通过、07预订待审核、08预订初审通过、09预订初审不通过、10预订复审通过、11预订复审不通过-->
        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-row class="btn-row">
          <el-button :disabled="multipleSelection.length < 1" type="primary" @click="submitZwk(2)">提交展务科</el-button>
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
            sortable
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
              <span v-if="scope.row.meetingStatus=='01'">待受理</span>
              <span v-else-if="scope.row.meetingStatus=='02'">已受理</span>
              <span v-else-if="scope.row.meetingStatus=='03'">不受理</span>
              <span v-else-if="scope.row.meetingStatus=='06'">资质审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.meetingStatus !== '01' && scope.row.meetingStatus !== '06'" @click="handleApprove(scope.row, scope.index)" type="text" size="mini">审批</el-button>
              <!--<el-button :disabled="scope.row.meetingStatus !== '01' && scope.row.meetingStatus !== '06'" @click="handleEdit(scope.row, scope.index)" type="text" size="mini">修改</el-button>-->
              <el-button :disabled="scope.row.meetingStatus !== '01' && scope.row.meetingStatus !== '06'" @click="submitZwk(1, scope.row)" type="text" size="mini">提交展务科</el-button>
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
    name: "acceptedList",
    data() {
      return {
        activeName: 'first',
        multipleSelection: [],
        pageInfo: {
          size: 10,
          current: 1,
          total: 0
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
        ruleForm: {
          companyName: '',
          applyDateBegin: '',
          applyDateEnd: '',
          acceptStatus: '01'
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
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listApplyAccept', data).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        }).catch(err => {
        });
      },
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 审批
      handleApprove(row, index) {
        this.$router.push({
          path: '/meetingRoomApprove',
          query: {
            meetingId: row.meetingId,
            taskId: row.taskId
          }
        });
      },
      // 提交展务科
      submitZwk(index, row) {
        let data = [];
        if (index === 2) {
          if (this.multipleSelection.length < 1) {
            this.$message({
              type: "error",
              message: "请先选中"
            });
            return;
          } else {
            this.multipleSelection.forEach((item) => {
              data.push({
                taskId: item.taskId,
                meetingId: item.meetingId
              });
            });
            this.zwk(data);
          }
        } else {
          data = [{
            taskId: row.taskId,
            meetingId: row.meetingId
          }];
          this.zwk(data);
        }
      },
      zwk(data) {
        this.$confirm('确定提交到展务科?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.baseApi + '/api/customservice/meetingRent/passToExhibition', {
            ids: JSON.stringify(data)
          }).then(res => {
            this.$message({
              type: "success",
              message: "成功提交到展务科"
            });
            this.init();
          });
        }).catch(() => {
        });
      },
      // 根据当前的状态判断是否能够勾选
      checkboxInit(row, index) {
        if (row.meetingStatus === '01' || row.meetingStatus === '06') {
          return true;
        } else {
          return false; //不可勾选
        }
      },
      // 修改
      // handleEdit(row, index) {
      //   this.$router.push({
      //     path: '/meetingRoomDetailEdit',
      //     query: {
      //       meetingId: row.meetingId,
      //       taskId: row.taskId
      //     }
      //   });
      // },
      // 跳转到会议室资质审核详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/meetingRoomAcceptedDetail',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 受理
      // acceptTheCase(row, index) {
      //   // this.multipleSelection
      //   let data = {
      //     meetingId: row.meetingId,
      //     meetingContentListStr: this.multipleSelection
      //   };
      //   this.$http.postJson(this.baseApi + '/api/customservice/meetingRent/applyAccept', data).then(res => {
      //     this.$message({
      //       type: "success",
      //       message: "受理成功"
      //     });
      //   }).catch(err => {
      //
      //   });
      // },
      resetForm() {
        this.ruleForm.acceptStatus = '01';
        this.ruleForm.companyName = '';
        this.ruleForm.applyDateBegin = '';
        this.ruleForm.applyDateEnd = '';
        this.dates = [];
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
  .blue-underline{
    color: #2b579a;
    text-decoration: underline;
  }
  .paging {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }
</style>
