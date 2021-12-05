/**
 * @file 筹撤展期间联络员管理
 * @date:2019/5/8
 */
<template>
<!-- 筹撤展期间联络员管理 -->
  <div class="page-contain">
    <el-form :inline="true" :model="queryFormInline" ref="queryFormInline" class="query-form-inline">
      <el-form-item label="单位名称" prop="workUnitName">
        <el-input placeholder="请输入" v-model="queryFormInline.workUnitName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-contain">
      <span>广交会组展业务联络员联系表</span>
      <div class="above-table">
        <el-button v-right.exp type="text" class="download" @click="downloadList">下载XLS</el-button>
      </div>
      <el-table border :data="liaisonContactsListData.records">
        <el-table-column prop="workUnitName" label="单位全称"></el-table-column>
        <el-table-column prop="exhibitionSessioin" label="展届"></el-table-column>
        <el-table-column prop="exhibitionPeriod" label="展期"></el-table-column>
        <el-table-column prop="declareContact" label="联络员姓名"></el-table-column>
        <el-table-column prop="liaisonPosition" label="职务"></el-table-column>
        <el-table-column prop="liaisonPhone" label="手机"></el-table-column>
        <el-table-column prop="liaisonFixedTelephone" label="固定电话（广州）"></el-table-column>
        <el-table-column prop="liaisonAddress" label="联系地址（广州）"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.reportId" @click="handleRouterPushEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-button v-right.add class="newAddBtn" type="primary" @click="handleRouterPushNew">新增筹撤展期间联系人</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="liaisonContactsListData.total">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      queryFormInline: { workUnitName: '' },
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['liaisonContactsListData']),
    queryParams() {
      return {
        workUnitName: this.queryFormInline.workUnitName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getLiaisonContactsList(this.queryParams);
  },
  methods: {
    ...mapActions('exhibitContact', ['getLiaisonContactsList']),
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupGroupContactMain/download?${this.encodeSearchParams(this.queryFormInline)}`);
    },
    handleQuery() {
      this.pageInfoData.currentPage = 1;
      this.pageInfoData.pageSize = 10;
      this.getLiaisonContactsList(this.queryParams); // 查询表单
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getLiaisonContactsList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getLiaisonContactsList(this.queryParams);
    },
    handleRouterPushNew() {
      this.$router.push({ path: '/addLiaisonContacts' });
    },
    handleRouterPushEdit(row) {
      this.$router.push({ path: '/editLiaisonContacts', query: { row }});
    },
    encodeSearchParams(obj) { // 下载用
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    }
  }
};
</script>
<style lang='less' scoped>
.page-contain {
  padding-top: 10px;
  .pagination-contain {
    position: relative;
    padding: 10px 0;
    .newAddBtn {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
.above-table {
  position: relative;
  height: 30px;
  /deep/ .el-button {
    position: absolute;
    &.download {
      right: 0px;
    }
  }
}
</style>

