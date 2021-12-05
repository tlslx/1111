/*
* @file 企业重要信息修改详情
* @author: weiwei
* @date:2019/6/10
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业重要信息修改" name="first">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="修改项:" prop="colname">
          <el-select placeholder="请选择" v-model="queryForm.colname" clearable>
            <el-option v-for="item in historyModifyDetailData.colnameChOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="historyModifyDetailData.res" border>
        <el-table-column prop="colnameCh" label="修改项" align="center"></el-table-column>
        <el-table-column prop="oldContent" label="旧内容" align="center"></el-table-column>
        <el-table-column prop="newContent" label="新内容" align="center"></el-table-column>
      </el-table>
      <el-row style="padding-top: 10px;">
        <el-button type="primary" @click="showVerify">审核</el-button>
      </el-row>

      <el-dialog title="审核" :visible.sync="verifyDialog" width="70%" :show-close="false" @close="handleVerifyClose">
        <el-form :model="verifyForm">
          <el-form-item label="审核:" size="small" prop="approveStatus">
            <el-select style="width: 90%" v-model="verifyForm.approveStatus">
              <el-option v-for="item in this.verifyOpt" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="submitVerify">审 核</el-button>
          <el-button @click="verifyDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      pageInfoData: { currentPage: 1, pageSize: 10 },
      queryForm: {
        colname: ''
      },
      historyModifyId: '', // 修改项的id
      verifyDialog: false,
      verifyForm: { approveStatus: '1' },
      verifyOpt: [{ label: '通过', value: '1' }, { label: '不通过', value: '2' }]
    };
  },
  computed: {
    ...mapGetters('settingReview', ['historyModifyDetailData']),
    queryParams() {
      let obj = this.queryForm;
      obj.modifyId = this.historyModifyId;
      return obj;
    }
  },
  methods: {
    ...mapActions('settingReview', ['getHistoryModifyDetail', 'postApproveCoModify']),
    handleListQuery() {
      this.getHistoryModifyDetail(this.queryParams);
    },
    showVerify() {
      this.verifyDialog = true;
    },
    handleVerifyClose() {
      this.verifyDialog = false;
      this.verifyForm.approveStatus = '1'; // 复原
    },
    submitVerifyFunction() {
      this.postApproveCoModify(this.queryParams).then(() => {
        this.$message.success('审核成功');
        this.verifyDialog = false;
      }).catch(() => {
        this.$message.error('审核失败');
      });
    },
    submitVerify() {
      this.$confirm('确认提交, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.submitVerifyFunction();
      }).catch(() => {
        this.$message.info('取消审核');
        this.verifyDialog = false;
      });
    }
  },
  created() {
    this.historyModifyId = this.$route.query.historyModifyId;
    this.getHistoryModifyDetail(this.queryParams);
  }
};
</script>
<style lang='less' scoped>

</style>
