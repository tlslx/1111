/**
 * @file 组展进度设置---特例详情列表
 */

<style scoped>
.table-margin {
  margin: 10px 0;
}
.top-btns {
  float: right;
  text-decoration: underline;
  color: #409eff;
}
.top-btn {
  width: 96%;
  padding: 0 2%;
}
.bom-btn-del {
  margin: 20px 0;
}
.bom-btn {
  width: 96%;
  padding: 0 2%;
}
.dialog-btn {
  margin-left: 120px;
  padding-bottom: 22px;
}
.page-bar {
  float: right;
}
</style>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="组展进度特例管理" name="first">
      <div class="top-btn">
        <el-button type="primary" @click="toAdd" icon="el-icon-plus">新增特例</el-button>
        <el-button type="text" @click="toDownload" class="top-btns">下载</el-button>
        <!-- <el-button type="text" @click="toPrint" class="top-btns">打印</el-button> -->
      </div>
      <cust-table class="table-margin" :cols="cols" :data="tableData" :loading="loading" @deal-with-operate="dealWithOperate" @change-multiple-selection="handleSelectionChange"></cust-table>
      <div class="bom-btn">
        <el-button type="primary" @click="toDelet" class="bom-btn-del">删除</el-button>
        <!-- <el-button @click="toBack" class="bom-btn-del">返回</el-button> -->
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/common/custTable.vue";
import pagination from "@/components/project/common/pagination.vue";
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'cust-table': custTable
  },
  data() {
    return {
      // tab
      activeName: 'first',
      // loading
      loading: false,
      // 分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      },
      // 表头数据
      cols: [
        {
          prop: "progressItemRule",
          label: "组展事项"
        },
        {
          prop: "unitTag",
          label: "组展单位标签"
        },
        {
          prop: "rangeTag",
          label: "范围标签"
        },
        {
          prop: "startTime",
          label: "开始时间"
        },
        {
          prop: "endTime",
          label: "结束时间"
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
              style: "cursor: pointer;text-decoration: underline;color: #67c23a;"
            },
            {
              type: "underlineText",
              prop: "del",
              label: "删除",
              style:
                "cursor: pointer;text-decoration: underline;color: #f56c6c;margin: 0px 8px;"
            }
          ]
        }
      ],
      // 表格数据
      tableData: {
        // 可多选
        selection: true,
        data: []
      },
      // 多选暂存数组
      multipleSelection: [],
      // 初始传参
      queryParams: {
        current: "1",
        size: "10"
        // exhibitionNum: '125'
        // progressRuleId: this.$route.query.progressRuleId
      },
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['queryextra'])
  },
  created() {
    // 初始
    this.getData();
  },
  methods: {
    ...mapActions('organizationProgress', ['queryExtraInfo', 'removeExtraInfo']),
    // 初始数据
    getData() {
      // 开始loading
      this.loading = true;
      // 查询
      this.queryExtraInfo(this.queryParams).then(res => {

        // 查询成功
        // 结束loading
        this.loading = false;
        // 分页
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
          // res.records.forEach(item => {
          //   if (!item.progressValue) {
          //     item.progressValue = '0%';
          //   } else {
          //     item.progressValue += '%';
          //   }
          // });
          res.records.forEach(item => {
            if (!item.progressItemRule) {
              item.progressItemRule = '-';
            } else {
              item.progressItemRule = item.progressItemRule + '-' + item.progressSubitemRule + '-' + item.businessNode;
            }
          });
          this.tableData.data = res.records;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        // 查询失败
        // 结束loading
        _this.loading = false;
      });
    },
    // 新增点击事件
    toAdd() {
      // 跳转新增页面
      this.$router.push({
        path: '/addSpecialCaseList',
        // 传由组展计划列表带来的规则Id和完成判断
        query: {
          progressRuleId: this.$route.query.progressRuleId,
          unitTagName: this.$route.query.unitTagName
        }
      });
    },
    // 多选删除
    toDelet() {
      // 判断多选数组是否有值
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除参数
          let extras = this.multipleSelection;
          // 删除接口
          this.removeExtraInfo(extras).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            this.getData();
          });
        }).catch(() => { });
      } else {
        // 多选数组为空
        this.$message({
          type: 'error',
          message: '请至少选择一条数据'
        });
      }
    },
    // 打印
    toPrint() { },
    // 下载
    toDownload() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/extra/export`, '组展进度特例.xls');
    },
    // 多选事件
    handleSelectionChange(val) {
      this.multipleSelection = [];
      // 多选数组赋值
      val.map(el => {
        this.multipleSelection.push(el.progressRuleExtraId);
      });
    },
    // 分页事件
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.queryParams.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.queryParams.current = val;
      this.getData();
    },
    // 取消返回列表页
    // toBack() {
    //   this.$router.push('/organizeExhibition');
    // },
    //操作方法-修改
    dealWithOperate(scope, prop) {
      //编辑点击事件
      if (prop === 'edit') {
        // 跳转编辑页面并带值
        this.$router.push({
          path: '/editSpecialCaseList',
          query: {
            // unitTagName: scope.row.unitTag,
            row: scope.row
          }
        });
      }
      //删除点击事件
      if (prop === 'del') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除参数
          let extras = [scope.row.progressRuleExtraId];
          // 删除接口
          this.removeExtraInfo(extras).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            this.getData();
          });
        }).catch(() => { });
      }
    }
  }
};
</script>

