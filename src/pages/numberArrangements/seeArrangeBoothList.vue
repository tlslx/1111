<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看待安排展位数" name="first">
      <div>
        <el-form :model="queryForm" :inline="true">
          <el-form-item label="是否已足额提交安排展位数" label-width="200px">
            <el-select v-model="queryForm.ifConfirmAll" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
            </el-select>
        <!--    <el-select v-model="queryForm.ifConfirmAll" clearable>
                  <el-option v-for="(item, index) in ifConfirmAll" :key="index" :value="item.ifConfirmAll" :label="item.ifConfirmAll"></el-option>
                </el-select>
        -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="selectNumberArrangedList.records" v-loading="loading" border>
          <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
          <el-table-column label="待安排展位数" prop="arrangedBoothNumber" align="center"></el-table-column>
          <el-table-column label="已提交安排展位数" prop="scheduleBoothNumber" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="space-between" class="pagination-footer">
          <span class="add_btn">
            <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
          </span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="selectNumberArrangedList.total">
          </el-pagination>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      coceralOpts: [],
      ifConfirmAll: '',
      backTypeOpts: [{ value: '1', label: '全部退回' }, { value: '2', label: '部分退回' }],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyName: '',
        coceralId: this.$store.getters.userInfo.org.deptId,
        ifConfirmAll: '',
        backType: '',
        cantonFairCode: '',
        backReason: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['boothReorderData', 'selectNumberArrangedList']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyName: this.queryForm.companyName,
        coceralId: this.queryForm.coceralId,
        ifConfirmAll: this.queryForm.ifConfirmAll,
        backType: this.queryForm.backType,
        cantonFairCode: this.queryForm.cantonFairCode,
        backReason: this.queryForm.backReason,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    if (this.$store.getters.userInfo.org.parentName.indexOf('商协会') !== -1 || this.$store.getters.userInfo.org.parentName.indexOf('商会') !== -1) {
      this.coceralOpts = {
        label: this.$store.getters.userInfo.org.deptName,
        value: this.$store.getters.userInfo.org.deptCode
      };
      this.queryForm.coceralId = this.$store.getters.userInfo.org.deptId;
    } else {
      // 商协会
      this.getassociationDepartment().then(res => {
        this.coceralOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
    }
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getBoothReorder', 'getSelectNumberArrangedList']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    //下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&companyName=${this.queryForm.companyName}&coceralId=${this.queryForm.coceralId}&backType=${this.queryForm.backType}&cantonFairCode=${this.queryForm.cantonFairCode}&backReason=${this.queryForm.backReason}&deptId=${this.$store.getters.userInfo.org.deptId}&deptName=${this.$store.getters.userInfo.org.deptName}&deptType=${this.$store.getters.userInfo.org.deptType}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/backArrange/selectNumberArrangedList/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
      //kindo.util.getdown(`${process.env.API_NA_URL}/api/backArrange/selectNumberAffirmList/download?${url}`);
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getSelectNumberArrangedList(this.formQuery).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
</style>
