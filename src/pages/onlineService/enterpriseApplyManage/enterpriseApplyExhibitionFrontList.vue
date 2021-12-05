/**
* @file 企业申请展区列表及状态
*/
<style scoped>
  .sort-btns {
    width: 100%;
  }

  .detail-name {
    color: rgb(26, 168, 235);
    cursor: pointer;
    text-decoration: underline;
  }

  .enter-table {
    width: 100%;
    margin-top: 20px;
  }

  .el-table td {
    text-align: center;
  }
</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="申请展区调整列表" name="first">
        <div class="sort-btns">
          海关商品编码：
          <el-input v-model.trim="hsCode" maxlength="20" style="width:200px;" @change="getSearch" clearable
            placeholder="海关商品编码"></el-input>
          <el-button @click="getSearchData" type="primary">查询</el-button>
        </div>
        <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" class="enter-table"
          :header-cell-style="tableHeaderColor" v-loading="loading">
          <el-table-column prop="hsCode" label="申请调整海关编码" align="center"></el-table-column>
          <el-table-column prop="propertyType" label="建议增加展区名称" align="center"></el-table-column>
          <el-table-column prop="approveStatus" label="审核状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.approveStatus | checkSta }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="toDetail(scope.row)" style="text-decoration: underline;">查看
              </el-button>
              <el-button v-if="unreviewed(scope.row.approveStatus)" size="mini" type="text" @click="handleEdit(scope.row)"
                 style="text-decoration: underline;">编辑
              </el-button>
              <el-button v-if="unreviewed(scope.row.approveStatus)" size="mini" type="text" style="color: red;text-decoration: underline;"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width:94%;padding:1% 3%;">
          <el-button type="danger" @click="toAdd" style="float:left;">添加</el-button>
          <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"></pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import pagination from "@/components/project/onlineService/common/pagination.vue";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    $helper
  } from "@/scripts/project/utils";
  export default {
    //引入分页组件
    components: {
      'pagination': pagination
    },
    data() {
      return {
        activeName: "first", // tab标题
        tableData: [], // 表格数据
        hsCode: "", // 模糊查询变量
        //设置table的loading变量
        loading: false,
        // 分页
        pageInfo: {
          "currentPage": 0,
          "pageSize": 10,
          "total": 0,
          "style": "padding: 10px 0;text-align: right;"
        },
        // 传参
        searchParams: {
          "hsCode": '',
          "companyId": this.$store.state.userInfo.companyId,
          "current": 0,
          "size": 10
        }
      };
    },
    created() {
      // 初始列表
      let url = encodeURI(JSON.stringify(this.searchParams));
      this.getCustomsProductList(url).then(res => {
        this.tableData = res.records;
        this.pageInfo.currentPage = res.current;
        this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
    },
    computed: {
      ...mapGetters('companyInfomation', ['getCustomsList', 'delCustomsGoods'])
    },
    filters: {
      checkSta(val) {
        switch (val) {
          case '0':
            return '未审核';
          case '1':
            return '审核通过';
          case '2':
            return '审核不通过';
          case '3':
            return '审核中';
          default:
            return '';
        }
      }
    },
    methods: {
      ...mapActions('companyInfomation', ['getCustomsProductList', 'postDelCustomsGoods']),
      // 重置查询分页参数
      initSearchParamsPageInfo() {
        this.searchParams.pageIndex = 0;
        this.searchParams.pageSize = 10;
      },
      // 可否编辑 :disabled="isShow(scope.row.approveStatus)"
      // isShow(aapoed) {
      //   if (aapoed === '1' || aapoed === '3') {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
      unreviewed(val) {
        if (val === '1' || val === '3') {
          return false;
        } else {
          return true;
        }
      },
      // 查询方法
      getData() {
        let url = encodeURI(JSON.stringify(this.searchParams));
        this.getCustomsProductList(url).then(res => {
          this.tableData = res.records;
          this.pageInfo.currentPage = 1;
          this.pageInfo.pageSize = 10;
          this.pageInfo.total = res.total;
        });
      },
      // 分页事件
      handleSizeChange(val) {
        //设置table的loading变量
        this.loading = true;
        this.pageInfo.pageSize = val;
        this.searchParams.pageSize = val;
        this.getCustomsProductList(encodeURI(JSON.stringify(this.searchParams))).then(res => {
          this.tableData = res.records;
          //设置table的loading变量
          this.loading = false;
        });
      },
      handleCurrentChange(val) {
        //设置table的loading变量
        this.loading = true;
        this.pageInfo.currentPage = val;
        this.searchParams.pageIndex = val;
        this.getCustomsProductList(encodeURI(JSON.stringify(this.searchParams))).then(res => {
          this.tableData = res.records;
          //设置table的loading变量
          this.loading = false;
        });
      },
      // 进入编辑页面
      handleEdit(row) {
        if (row.approveStatus === "1" || row.approveStatus === "3") {
          this.$message({
            type: 'info',
            message: '审核中或已通过的企业不可编辑'
          });
        } else {
          this.$router.push({
            path: "/applyCommodityCodeAdjustList",
            query: {
              row: row,
              isOp: "1"
            }
          });
        }
      },
      // 删除数据
      handleDelete(row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.approveStatus === "1" || row.approveStatus === "3") {
            this.$message({
              type: 'info',
              message: '审核中或已通过的企业不可删除'
            });
          } else {
            let param = row.adjustId;
            this.postDelCustomsGoods(param).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              // 删除数据后刷新列表页
              let url = encodeURI(JSON.stringify(this.searchParams));
              this.getCustomsProductList(url).then(reso => {
                this.tableData = reso.records;
                this.pageInfo.total = reso.total;
              });
            });
          }
        });
      },
      // 进入查看页面
      toDetail(row) {
        this.$router.push({
          path: "/applyCommodityCodeAdjustList",
          query: {
            row: row,
            isOp: "0"
          }
        });
      },
      // 进入新增
      toAdd() {
        this.$router.push({
          path: "/applyCommodityCodeAdjustList",
          query: {
            isOp: "2"
          }
        });
      },
      // 获取模糊查询的输入值
      getSearch(val) {
        this.hsCode = $helper.trim(val);
      },
      // 模糊查询
      getSearchData() {
        this.searchParams.hsCode = this.hsCode;
        this.searchParams.pageIndex = "1";
        this.getData(); // 刷新页面
      },
      //添加表头样式
      tableHeaderColor({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex === 0) {
          return "background-color: #f5f5f5;";
        }
      }
    }
  };

</script>
