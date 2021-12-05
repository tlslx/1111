/**
 * @file 企业资料管理---审核企业资料
*/
<style scoped>
.sort-btns{
  width:100%;
  margin-bottom: 30px;
}
.page-bar{
  width: 60%;
  float: right;
}
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业资料" name="first">
      <div class="sort-btns">
        企业名称
        <el-input style="margin: 0 10px;width: 180px;" v-model="searchContent" @change="getSearch" clearable placeholder="请输入企业名称"
        onkeyup="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\. @~（）_《》。？?【】：：:;]/g,'')"></el-input>
        <el-button @click="getSearchData" type="primary">查询</el-button>
      </div>
      <el-table border ref="multipleTable" :data="tableData" style="width: 100%" v-loading="loading"
        @selection-change="handleSelectionChange" :header-cell-style="tableHeaderColor">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="companyName" label="企业名称（中文）"></el-table-column>
        <el-table-column prop="customsCode" label="海关编码"></el-table-column>
        <el-table-column prop="businessDelegationId" label="所属交易团"></el-table-column>
        <el-table-column prop="importExportCode" label="进出口代码"></el-table-column>
        <el-table-column prop="businessLicenceNo" label="营业执照号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" style="text-decoration: underline;" @click="handleEdit(scope.row)">开始审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:94%;padding:1% 3%;">
        <el-button @click="toAuditing" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">审核通过</el-button>
        <el-button @click="toAuditNOT" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">审核不通过</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  components: {
    'pagination': pagination
  },
  data() {
    return {
      // tab
      activeName: "first",
      // loading确认调接口
      fullscreenLoading: false,
      // 查询字段
      searchContent: "",
      // 设置table的loading变量
      loading: false,
      // 批量审核按钮初始禁用
      disabled: true,
      // 分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      // 表格数据
      tableData: [],
      multipleSelection: [], // 多选暂存数据
      // 审核传参
      selectData: [], // 批量审核通过暂存数据
      selectDataNot: [], // 批量审核不通过暂存数据
      // 传参需要
      searchParams: {
        "pageStart": "1",
        "pageSize": "10",
        "companyName": "",
        "approveResult": null
      }
    };
  },
  created() {
    // 初始列表
    this.loading = true;
    this.getCompanyInfo(this.searchParams).then(res => {
      this.loading = false;
      this.tableData = res.records;
      this.pageInfo.total = res.total;
    }).catch(e => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getcompany'])
  },
  methods: {
    ...mapActions('corpDataManagement', ['getCompanyInfo', 'reviewCompanyDocs', 'modifyCompanyInfos']),
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    },
    // 获取搜索输入的值
    getSearch(val) {
      this.searchContent = $helper.trim(val);
    },
    // 查询
    getSearchData() {
      this.searchParams.companyName = this.searchContent;
      this.getCompanyInfo(this.searchParams).then(res => {
        this.tableData = res.records;
        this.pageInfo.total = res.total;
      });
    },
    // 跳转审核页面并带上所需值
    handleEdit(row) {
      this.$router.push({
        path: "/audComAll",
        query: {
          row: row
        }
      });
    },
    // 审核通过
    toAuditing() {
      // loading开始
      this.fullscreenLoading = true;
      if (this.multipleSelection.length > 0) {
        this.selectData = JSON.parse(JSON.stringify(this.multipleSelection));
        this.selectData.forEach((value, index, array) => {
          value.approveResult = '1';
        });
      }
      // let currentObject = {};
      // currentObject.updateCompanyInfoSession = this.selectData;
      // 开始审核
      this.modifyCompanyInfos(this.selectData).then(reso => {
        // loading结束
        this.fullscreenLoading = false;
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审核成功'
        });
        this.getCompanyInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        });
      }).catch(e => {
        this.fullscreenLoading = false;
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 审核不通过
    toAuditNOT() {
      // loading开始
      this.fullscreenLoading = true;
      if (this.multipleSelection.length > 0) {
        this.selectData = JSON.parse(JSON.stringify(this.multipleSelection));
        this.selectData.forEach((value, index, array) => {
          value.approveResult = '0';
        });
      }
      // let currentObject = {};
      // currentObject.updateCompanyInfoSession = this.selectData;
      // 开始审核
      this.modifyCompanyInfos(this.selectData).then(() => {
        // loading结束
        this.fullscreenLoading = false;
      }).then(response => {
        this.$message({
          type: 'success',
          message: '审核成功'
        });
        this.getCompanyInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        });
      }).catch(e => {
        this.fullscreenLoading = false;
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 设置每页显示条数
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      this.getCompanyInfo(this.searchParams).then(res => {
        this.tableData = res.records;
        this.pageInfo.total = res.total;
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 设置当前页
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageStart = val;
      this.getCompanyInfo(this.searchParams).then(res => {
        this.tableData = res.records;
        this.pageInfo.total = res.total;
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 获取多选值并保留传参所需字段
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //批量时，若未选择数据，按钮禁用
      if (val.length >= 1) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>
