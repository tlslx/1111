<template>
  <div>
    <el-form :inline="true" :model="formInline" ref="formData" class="demo-form-inline">
      <el-form-item label="发送日期：" prop="sendDate">
        <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="formInline.sendDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="处理状态" prop="sendStatus">
        <el-select v-model="formInline.sendStatus" placeholder="请选择" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" tooltip-effect="dark" v-loading="loading" :header-cell-style="tableHeaderColor">
      <el-table-column prop="emailTopic" label="邮件模板"></el-table-column>
      <el-table-column prop="sendStatus" label="处理状态">
        <template slot-scope="scope">
          <span>{{ scope.row.sendStatus ? '已发送' : '发送失败' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sendDate" label="发送日期"></el-table-column>
      <el-table-column prop="sendResultDetail" label="发送明细">
        <template slot-scope="scope">
          已启动发送了{{ scope.row.sendResultDetail ? scope.row.sendResultDetail : '0' }}封邮件记录
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" type="text" class="btn-text" @click="handleExpo(scope.row)" v-if="scope.row.sendStatus === '1'">查看</el-button>
          <el-button size="mini" type="text" class="btn-text" @click="handleEdit(scope.row)" v-if="scope.row.sendStatus !== '1'">编辑</el-button>
          <el-button size="mini" type="text" class="btn-del" @click="handleDelete(scope.row)" v-if="scope.row.sendStatus !== '1'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="associa-recom-btn-container">
      <div class="btn-bar">
        <el-button type="danger" class="recommend-btn" @click="pass">维护客户信息</el-button>
      </div>
      <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
    </div>
  </div>
</template>
<script>
// 引入表格、分页组件
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  // 注册表格、分页组件
  components: {
    "cust-table": custTable,
    "pagination": pagination
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // form
      formInline: {
        sendDate: "",
        sendStatus: ""
      },
      // 发送状态选项
      options: [
        {
          value: '1',
          label: '已发送'
        },
        {
          value: '0',
          label: '发送失败'
        }
      ],
      // 设置table的loading变量
      loading: true,
      // 分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 20px 0;text-align: center;"
      },
      // 传参
      searchParams: {
        json: {
          "orderModelField": [
            {
              "orderByField": "",
              "desc": true
            }
          ],
          "customQueryParams": [
            {
              "name": "companyId",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": ["1"],
              "description": ""
            }
          ],
          "pageIndex": 0,
          "pageSize": 10
        },
        date: ""
      }
    };
  },
  computed: {
    ...mapGetters('enterprisesInviteCustomers', ['getinvit'])
  },
  created() {
    this.getData();
  },
  mounted() {
    this.formInline.sendDate = "";
  },
  methods: {
    ...mapActions('enterprisesInviteCustomers', ['getInvitationListInfo', 'deleteInvitationInfo']),
    // 初始
    getData() {
      let _this = this;
      _this.getInvitationListInfo(_this.searchParams).then(res => {
        // 初始刷新表格
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.tableData = res.records;
      }).catch(e => {
        // 初始化失败
        _this.loading = false;
      });
    },
     // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      this.getInvitationListInfo(this.searchParams).then(res => {

        //设置table的loading变量
        this.loading = false;
        this.tableData = res.records;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageIndex = val;
      this.getInvitationListInfo(this.searchParams).then(res => {

        //设置table的loading变量
        this.loading = false;
        this.tableData = res.records;
      });
    },
    // 查询
    onSubmit () {
      // 判断日期是否有值
      if (this.formInline.sendDate !== "" && this.formInline.sendDate) {
        // 日期转时间戳
        this.formInline.sendDate = new Date(this.formInline.sendDate).getTime();
        this.searchParams.date = this.formInline.sendDate;
      } else {
        this.searchParams.date = "";
      }
      // 判断发送状态
      if (this.formInline.sendStatus === "1") {
        // 定义传参
        this.searchParams.json.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          },
          {
            "name": "sendStatus",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.formInline.sendStatus],
            "description": ""
          }
        ];
      } else if (this.formInline.sendStatus === "0") {
        // 定义发送失败查询传参
        this.searchParams.json.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          },
          {
            "name": "sendStatus",
            "findType": "IS_NULL",
            "joinType": "And",
            "dataType": "Default",
            "values": [""],
            "description": ""
          }
        ];
      } else {
        // 定义无发送状态传参
        this.searchParams.json.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ];
      }
      this.loading = true;
      // 搜索查询
      this.getInvitationListInfo(this.searchParams).then(res => {
        // 查询成功
        this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.tableData = res.records;
      }).catch(e => {
        // 查询失败
        this.loading = false;
      });
    },
    // 新增 企业发送邮件
    add() {
      this.$router.push({
        path: "/enterprisesSendInvitations",
        query: {
          isExpo: "0"
        }
      });
    },
    // 维护客户信息
    pass() {
      this.$router.push("/maintainCustomerInfo");
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: "/enterprisesSendInvitations",
        query: {
          customerInvitationId: row.customerInvitationId,
          isExpo: "2"
        }
      });
    },
    // 查看
    handleExpo(row) {
      this.$router.push({
        path: "/enterprisesSendInvitations",
        query: {
          customerInvitationId: row.customerInvitationId,
          isExpo: "1"
        }
      });
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除传参
        let param = {
          customerInvitationId: row.customerInvitationId
        };
        this.deleteInvitationInfo(param).then(res => {
          // 删除成功
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.getData();
        });
      }).catch(() => {
        // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //添加表头样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    }
  }
};
</script>
<style scoped>
.associa-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
}
.btn-bar {
  display: table-cell;
  text-align: left;
  vertical-align: middle;
}
.recommend-btn {
  outline: none;
  border: 0;
}
.page-bar {
  display: table-cell;
  vertical-align: right;
}
.btn-del{
  text-decoration: underline;
  color: #ff0033;
}
.btn-text{
  text-decoration: underline;
}
</style>
