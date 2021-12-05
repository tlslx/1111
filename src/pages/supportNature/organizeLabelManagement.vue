/**
 * @file 组展进度设置---组展单位标签管理
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="组展单位标签管理" name="first">
      <div class="top-btn">
        <el-button type="primary" @click="toAdd" icon="el-icon-plus">新增组展单位标签</el-button>
        <el-button type="text" @click="toDownload" class="top-btns">下载</el-button>
        <!-- <el-button type="text" @click="toPrint" class="top-btns">打印</el-button> -->
      </div>
      <default-table class="table-margin" :cols="cols" :data="tableData" :loading="loading" :isSelectable="isSelectable" @deal-with-operate="dealWithOperate" @change-multiple-selection="handleSelectionChange"></default-table>
      <div class="bom-btn">
        <el-button type="primary" @click="toDelet" class="bom-btn-del">删除</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import defaultTable from '@/components/project/supportNature/defaultTable.vue';
import pagination from "@/components/project/common/pagination.vue";
import { getFTC, getJYT, getSXH, getWMS } from './dict_request';
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'default-table': defaultTable
  },
  data() {
    return {
      //字典
      dictionary: [],
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
          prop: "unitTag",
          label: "组展单位标签名称"
        },
        {
          prop: "orgId",
          label: "标签详情"
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
      },
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['queryunitTag'])
  },
  mounted() {
    this.loading = true;
    this.initTable();
  },
  methods: {
    ...mapActions('organizationProgress', ['queryUnitTagInfo', 'deleteUnitTagInfo']),
    // 初始数据
    getData() {
      return this.queryUnitTagInfo(this.queryParams).then(res => {
        // 分页
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        return res.records;
      });
    },
    // 填充表格数据
    initTable() {
      // let objCompany = {
      //   param: {
      //     "companyId": orgIds.join(),
      //     "pageSize": 1000,
      //     "pageStart": 1
      //   }
      // };
      Promise.all([this.getData(), this.getDict()]).then(([data, dict]) => {
        // console.log(dict);
        
        this.loading = false;
        data.forEach(item => {
          let orgId = [];
          item.orgIds.forEach(idx => {
            orgId.push(dict[idx]);
          });
          item.orgId = orgId.join(',');
        });
        this.tableData.data = data;
        // console.log(this.tableData.data);
        
      }).catch(error => {
        this.loading = false;
      });
    },
    // 新增点击事件
    toAdd() {
      // 跳转新增页面
      this.$router.push('/addLabelManagement');
    },
    isSelectable(row) {
      if (row.referredByRule === true) {
        return false;
      } else {
        return true;
      }
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
          let unitTags = this.multipleSelection;
          // 删除接口
          this.deleteUnitTagInfo(unitTags).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            // this.getData();
            this.loading = true;
            this.initTable();
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
      kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/tag/exportUnitTag`, '组展单位标签.xls');
    },
    // 多选事件
    handleSelectionChange(val) {
      this.multipleSelection = [];
      // 多选数组赋值
      val.map(el => {
        this.multipleSelection.push(el.unitTag);
      });
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.queryParams.size = val;
      this.initTable();
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.queryParams.current = val;
      this.initTable();
    },
    //操作方法
    dealWithOperate(scope, prop) {
      //编辑点击事件
      if (prop === 'edit') {
        // 跳转编辑页面并带值
        this.$router.push({
          path: '/editLabelManagement',
          query: {
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
          let unitTags = [scope.row.unitTag];
          // 删除接口
          this.deleteUnitTagInfo(unitTags).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            // this.getData();
            this.loading = true;
            this.initTable();
          });
        }).catch(() => { });
      }
      // }
    },
    getDict() {
      return Promise.all([getJYT(), getSXH(), getFTC(), getWMS()]).then(([bd, ba, ftc, ftd]) => Object.assign({}, bd, ba, ftc, ftd));
    }
  }
};
</script>
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
