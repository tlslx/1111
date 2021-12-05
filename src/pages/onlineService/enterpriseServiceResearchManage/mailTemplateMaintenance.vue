/**
 * @file 邮件模版维护
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="邮件模版维护" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :cols="cols"
        :data="tableData"
        :loading="loading"
        @deal-with-operate="dealWithOperate"
      ></cust-table>
      <div class="associa-recom-btn-container">
       <div class="btn-bar">
          <el-button class="recommend-btn" @click="pass">新增</el-button>
        </div>
        <pagination
          class="page-bar"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
// vuex
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "vipCheckReviewResultsReception",
  components: {
    "search-param-link": searchParamLinkage,
    "cust-table": custTable,
    "pagination": pagination
  },
  data() {
    return {
      // tab
      activeName: "0",
      // 字典
      dictionary: {},
      // 设置table的loading变量
      loading: true,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "emailTopic",
        data: [
          {
            prop: "session",
            label: "届数",
            value: "",
            type: "input"
          },
          {
            prop: "emailTopic",
            label: "模版名称",
            value: "",
            type: "input"
          }
        ]
      },
      // 表头数据
      cols: [
        {
          prop: "session",
          label: "届数"
        },
        // {
        //   prop: "emailModelId",
        //   label: "模版编号"
        // },
        {
          prop: "emailTopic",
          label: "模版名称"
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
            "desc": true
          }
        ],
        "customQueryParams": [],
        "pageIndex": 0,
        "pageSize": 10
      },
      // 分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      },
      // 初始表格
      tableData: {
        data: []
      }
    };
  },
  watch: {
    getmail(newVal) {
      this.tableData.data = newVal;
    }
  },
  computed: {
    ...mapGetters('enterprisesInviteCustomers', ['getmail'])
  },
  created() {
    // 初始
    this.getData();
  },
  methods: {
    ...mapActions('enterprisesInviteCustomers', ['getEmailModelListInfo', 'deleteEmailModelInfo']),
    // 搜索查询
    selectParams() {
      // 判断搜索栏是否有值
      // 届数搜索框和ID搜索框有值
      if (this.searchParamsForm.data[0].value !== "" && this.searchParamsForm.data[1].value !== "") {
        // 搜索框的值去空
        this.searchParamsForm.data[1].value = $helper.trim(this.searchParamsForm.data[1].value.replace(/%/g, ""));
        this.searchParamsForm.data[0].value = $helper.trim(this.searchParamsForm.data[0].value.replace(/%/g, ""));

        // 设置传参
        this.searchParams.customQueryParams = [
          {
            "name": "emailTopic",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchParamsForm.data[1].value],
            "description": ""
          },
          {
            "name": "session",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchParamsForm.data[0].value],
            "description": ""
          }
        ];
        this.searchParams.pageIndex = "0";
      } else if (this.searchParamsForm.data[0].value === "" && this.searchParamsForm.data[1].value !== "") {
        // ID搜索框有值
        // 搜索框的值去空
        this.searchParamsForm.data[1].value = $helper.trim(this.searchParamsForm.data[1].value.replace(/%/g, ""));
        // 设置传参
        this.searchParams.customQueryParams = [
          {
            "name": "emailTopic",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchParamsForm.data[1].value],
            "description": ""
          }
        ];
        this.searchParams.pageIndex = "0";
      } else if (this.searchParamsForm.data[0].value !== "" && this.searchParamsForm.data[1].value === "") {
        // 届数搜索框有值
        // 搜索框的值去空
        this.searchParamsForm.data[0].value = $helper.trim(this.searchParamsForm.data[0].value.replace(/%/g, ""));
        // 设置传参
        this.searchParams.customQueryParams = [
          {
            "name": "session",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchParamsForm.data[0].value],
            "description": ""
          }
        ];
        this.searchParams.pageIndex = "0";
      } else {
        // 届数搜索框和ID搜索框无值
        // 设置传参
        this.searchParams.customQueryParams = [];
        this.searchParams.pageIndex = "0";
      }
      // 搜索查询
      let _this = this;
      _this.getEmailModelListInfo(_this.searchParams).then(res => {
        // 查询成功
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        // 查询失败
        _this.loading = false;
      });
    },
    // 初始
    getData() {
      let _this = this;
      // 调接口，初始表格
      _this.getEmailModelListInfo(_this.searchParams).then(res => {
        // 查询成功
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        // 查询失败
        _this.loading = false;
      });
    },
    // 新增
    pass() {
      // 新增跳转
      this.$router.push("/emailTemplate");
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.searchParams.pageSize = val;
      _this.getEmailModelListInfo(_this.searchParams).then(res => {

        //设置table的loading变量
        _this.loading = false;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.currentPage = val;
      _this.searchParams.pageIndex = val;
      _this.getEmailModelListInfo(_this.searchParams).then(res => {

        //设置table的loading变量
        _this.loading = false;
      });
    },
    //操作方法
    dealWithOperate(scope, prop) {
      //编辑点击事件
      if (prop === "edit") {
        // 跳转页面并带去id
        this.$router.push({
          path: "/emailTemplate",
          query: {
            emailModelId: scope.row.emailModelId
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
          // 删除参数
          let param = {
            "emailModelId": scope.row.emailModelId
          };
          // 删除接口
          this.deleteEmailModelInfo(param).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            this.getData();
          });
        }).catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
  background-color: rgb(0, 132, 255);
  padding: 10px 40px;
  color: #fff;
  outline: none;
  border: 0;
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>
