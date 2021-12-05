<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部复审商协会提出的企业品牌展位数量调整安排建议方案" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="rescheduleInfoData.records" v-loading="loading" border>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="拟安排企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位数" prop="scheduleBoothNumber" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位号" prop="scheduleBooth" align="center"></el-table-column>
        <el-table-column label="是否设计岛型展位" prop="isIsland" align="center">
          <template slot-scope="scope">
            {{ scope.row.isIsland === 0 ? '否' : (scope.row.isIsland === 1 ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="安排理由" prop="scheduleReason" align="center" label-width="200"></el-table-column>
        <el-table-column label="批复" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handlePass(scope.row.scheduleId, '2')">通过</el-button>
            <el-button type="text" @click="handlePass(scope.row.scheduleId, '3')">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rescheduleInfoData.total">
        </el-pagination>
      </el-row>
      <!-- 通过不通过弹框 -->
      <el-dialog title="提示" :visible.sync="isPass" v-if="isPass" width="30%">
        <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
          <el-form-item label="审核意见：" prop="reviewOpinion">
            <el-input type="textarea" v-model="reasonForm.reviewOpinion" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handleSave('passReasonForm')">保存</el-button>
            <el-button size="medium" @click="isPass = false;">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      isPass: false,
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyName: ''
      },
      reasonForm: {
        scheduleId: '', // 安排id
        reviewResult: '', // 审核状态
        reviewOpinion: '' // 审核意见
      },
      reasonFormRule: {
        reviewOpinion: [{ required: true, message: '请填写审核意见', trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['rescheduleInfoData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyName: this.queryForm.companyName,
        reviewResult: '1',
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
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getRescheduleInfo', 'postUpdateRescheduleInfo']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 打开通过不通过弹框
    handlePass(id, status) {
      this.reasonForm = {
        scheduleId: id, // 安排id
        reviewResult: status, // 审核状态
        reviewOpinion: '' // 审核意见
      };
      this.isPass = true;
    },
    // 保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postUpdateRescheduleInfo(this.reasonForm).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('保存成功');
            this.isPass = false;
            this.createdQuery();
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        }
      });
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
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getRescheduleInfo(this.formQuery).then(() => {
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
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
