/**
 * @file 维护客户信息
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="维护客户信息" name="0">
      <div class="btn-bar">
        公司名称:
        <el-input v-model="searchContent" class="search-text" @change="getSearch" palceholder="请输入" clearable></el-input>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="danger" class="recommend-btn" @click="pass">添加客户</el-button>
      </div>
      <cust-table :cols="cols" :data="tableData" :loading="loading"
        @deal-with-operate="dealWithOperate"></cust-table>
      <div class="associa-recom-btn-container">
        <el-button type="primary" @click="toBack">返回</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
// vuex
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "pagination": pagination
  },
  data() {
    return {
      activeName: 0,
      loading: true,
      searchContent: "",
      // 分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 20px 0;text-align: center;"
      },
      // 表头数据
      cols: [
        {
          prop: "companyName",
          label: "公司名称",
          type: "string"
        },
        {
          prop: "country",
          label: "国别地区",
          type: "string"
        },
        {
          prop: "email",
          label: "邮件地址",
          type: "string"
        },
        {
          prop: "purchaser",
          label: "采购商名",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              prop: "edit",
              label: "修改",
              style: "cursor: pointer;text-decoration: underline;color: green;"
            },
            {
              type: "underlineText",
              prop: "del",
              label: "删除",
              style:
                "cursor: pointer;text-decoration: underline;color: red;margin: 0px 8px;"
            }
          ]
        }
      ],
      // 传参
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "values": [localStorage.getItem("getComPanyId")]
          }
        ],
        "pageIndex": 0,
        "pageSize": 10
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters('enterprisesInviteCustomers', ['getcustomer']),
    // 表格赋值
    tableData() {
      return {
        data: this.getcustomer
      };
    }
  },
  methods: {
    ...mapActions('enterprisesInviteCustomers', ['getCustomerInfo', 'deleteCustomerInfo']),
    // 初始
    getData() {
      let _this = this;
      _this.getCustomerInfo(_this.searchParams).then(res => {
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 新增
    pass() {
      this.$router.push("/addCustomerInfo");
    },
    toBack() {
      this.$router.push("/invitationList");
    },
    // 获取搜索输入的值
    getSearch(val) {
      this.searchContent = $helper.trim(val);
      // this.searchContent = val.replace(/%/g, "");
    },
    // 查询
    onSubmit() {
      // 输入框有值
      if (this.searchContent !== "") {
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "values": [localStorage.getItem("getComPanyId")]
          },
          {
            "name": "companyName",
            "findType": "LIKE",
            "joinType": "And",
            "values": [this.searchContent]
          }
        ];
        this.searchParams.pageIndex = "0";
      } else {
        // 输入框为空
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "values": [localStorage.getItem("getComPanyId")]
          }
        ];
        this.searchParams.pageIndex = "0";
      }
      // 刷新表格
      this.getData();
    },
    //操作方法
    dealWithOperate(scope, prop) {
      //编辑点击事件
      if (prop === "edit") {
        this.$router.push({
          path: "/addCustomerInfo",
          query: {
            customerId: scope.row.customerId
          }
        });
      }
      //删除点击事件
      if (prop === "del") {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            "customerId": scope.row.customerId
          };
          this.deleteCustomerInfo(param).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getData();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.searchParams.pageSize = val;
      _this.getCustomerInfo(_this.searchParams).then(res => {

        //设置table的loading变量
        _this.loading = false;
        // this.tableData = res.records;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.currentPage = val;
      _this.searchParams.pageIndex = val;
      _this.getCustomerInfo(_this.searchParams).then(res => {

        //设置table的loading变量
        _this.loading = false;
        // this.tableData = res.records;
      });
    }
  }
};
</script>
<style scoped>
.btn-bar {
  padding: 1%;
}
.recommend-btn {
  float: right;
}
.page-bar {
  width: 80%;
  float: right;
}
.search-text{
  width: 200px;
}
.associa-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
}
</style>
