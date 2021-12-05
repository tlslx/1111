<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="收取企业定金情况" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="广交会编码">
          <el-select v-model="queryForm.cantonFairCode" clearable>
            <el-option v-for="(item, key) in cantonFairCodeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否收取订金">
          <el-select v-model="queryForm.isDepositGather" clearable>
            <el-option v-for="(item, key) in isDepositGatherOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyId" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="depositInfo.records" v-loading="loading" border>
        <el-table-column align="center" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="企业联系人" prop="businessContactsCh">
          <template slot-scope="scope">
            {{ scope.row.companyOtherInfo.businessContactsCh ? scope.row.companyOtherInfo.businessContactsCh : scope.row.companyOtherInfo.businessContactsEn }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系方式" prop="telephone">
          <template slot-scope="scope">
            {{ scope.row.companyOtherInfo.telephone ? scope.row.companyOtherInfo.telephone : scope.row.companyOtherInfo.phone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否收取企业订金" prop="isDepositGather">
          <template slot-scope="scope">
            {{ scope.row.isDepositGather === '0' ? '否' : (scope.row.isDepositGather === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openDeposit(scope.row)">订金登记</el-button>
            <el-button type="text" @click="goBackApply(scope.row)" :disabled="handleDisabled(scope.row.ifConfirm)">退回申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="primary" size="medium">下载</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="prev, pager, next, jumper, total"
            :total="depositInfo.total"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="登记" :visible.sync="isDeposit" v-if="isDeposit" width="500px">
        <el-form :model="dialogForm" ref="dialogForm" label-width="130px">
          <el-form-item label="是否收取企业订金">
            <el-select v-model="dialogForm.isDepositGather">
              <el-option v-for="(item, key) in isDepositGatherOpts" :key="key" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="submitConfirm">确认</el-button>
          <el-button type="info" size="medium" @click="cancelDeposited">取消</el-button>
        </div>
      </el-dialog>
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
      isDeposit: false,
      cantonFairCodeOpts: [],
      isDepositGatherOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      companyOpts: [],
      queryForm: {
        cantonFairCode: '', // 广交会编码
        isDepositGather: '', // 是否收取订金
        companyId: '' // 企业id
      },
      dialogForm: {
        publishId: '',
        isDepositGather: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('numberBrands', ['depositInfo']),
    // 查询数据
    formQuery() {
      return {
        cantonFairCode: this.queryForm.cantonFairCode,
        isDepositGather: this.queryForm.isDepositGather,
        companyId: this.queryForm.companyId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.loading = true;
    this.getDepositInfo({ current: 0, size: 0 }).then(res => {
      this.cantonFairCodeOpts = res.cantonFairCodeOpts;
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('numberBrands', ['getDepositInfo', 'postDepositInfoEdit']),
    // 打开订金登记
    openDeposit(row) {
      this.dialogForm.isDepositGather = row.isDepositGather ? row.isDepositGather : '';
      this.isDeposit = true;
      this.dialogForm.publishId = row.publishId;
    },
    // 确认
    submitConfirm() {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postDepositInfoEdit(`?publishId=${this.dialogForm.publishId}&isDepositGather=${this.dialogForm.isDepositGather}`).then(() => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          fullScreenloading.close();
        });
        this.$message.success('登记成功');
        this.isDeposit = false;
        this.createdQuery();
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 取消
    cancelDeposited() {
      this.isDeposit = false;
    },
    // 退回申请
    goBackApply(row) {
      this.$router.push({ path: '/backBoothsApply', query: { data: encodeURI(JSON.stringify(row)) }});
    },
    // 判断退回申请是否提交过
    handleDisabled(i) {
      if (i === '1') {
        return true;
      } else {
        return false;
      }
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getDepositInfo(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.utils-button, .pagination-container{
  margin-top: 20px;
}   
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
