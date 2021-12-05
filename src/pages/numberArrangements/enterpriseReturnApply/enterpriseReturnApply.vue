<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="审核退回申请" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-select v-model="queryForm.cantonFairCode" clearable>
            <el-option v-for="(item, key) in cantonFairCodeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起方">
          <el-select v-model="queryForm.applyRole" clearable>
            <el-option v-for="(item, key) in applyRoleOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyName" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="reviewListData.records" v-loading="loading" border>
        <el-table-column label="企业名称" prop="companyName" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="goReturnDetails(scope.row.boothAffirmId)">{{ scope.row.companyName }}</a>
          </template>
        </el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展位数" prop="currentChangeNumber" align="center"></el-table-column>
        <el-table-column label="发起方" prop="applyRole" align="center">
          <template slot-scope="scope">
            {{ scope.row.applyRole === '1' ? '企业' : (scope.row.applyRole === '2' ? '交易团' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="退回书附件" prop="attachment" align="center"></el-table-column>
        <el-table-column label="退回原因" prop="backReason" align="center"></el-table-column>
        <el-table-column label="不通过原因" prop="checkOpinion" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.checkStatus === '2'">
              {{ scope.row.checkOpinion }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="backReason" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.applyRole !== '2'">
              <el-button type="text" @click="goPass(scope.row.boothAffirmId, '1')" v-if="scope.row.checkStatus === '0'">通过</el-button>
              <el-button type="text" @click="openPass(scope.row.boothAffirmId, '2')" v-if="scope.row.checkStatus === '0'">不通过</el-button>
            </div>
            <span v-if="scope.row.checkStatus === '1'">审核通过</span>
            <span v-if="scope.row.checkStatus === '2'">审核未通过</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="reviewListData.total">
        </el-pagination>
      </el-row>
      <!-- 不通过弹窗 -->
      <el-dialog title="不通过原因" :visible.sync="isPass" v-if="isPass" width="550px">
        <el-form :model="passObj" ref="noPassReasonForm" :rules="passReasonRule">
          <el-form-item label="审核意见：" prop="auditOpinion">
            <el-input v-model="passObj.auditOpinion" type="textarea" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="submitSave('noPassReasonForm')">保存</el-button>
            <el-button size="medium" @click="isPass = false;">取消</el-button>
          </div>
        </el-form>
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
      isPass: false,
      exhibitionAreaOpts: [],
      cantonFairCodeOpts: [],
      companyOpts: [],
      applyRoleOpts: [{ value: '1', label: '企业' }, { value: '2', label: '交易团' }],
      queryForm: {
        exhibitionArea: '',
        cantonFairCode: '',
        companyName: '',
        applyRole: ''
      },
      passObj: {
        boothAffirmId: '',
        auditOpinion: '',
        checkStatus: ''
      },
      passReasonRule: {
        auditOpinion: [{ required: true, message: '请填写不通过原因', trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('enterpriseReturnApply', ['reviewListData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        cantonFairCode: this.queryForm.cantonFairCode,
        companyName: this.queryForm.companyName,
        applyRole: this.queryForm.applyRole,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    passData() {
      return {
        boothAffirmId: this.passObj.boothAffirmId,
        checkStatus: this.passObj.checkStatus,
        checkOpinion: this.passObj.auditOpinion
      };
    }
  },
  created() {
    this.loading = true;
    this.postReviewList({ current: 0, size: 0 }).then(res => {
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.cantonFairCodeOpts = res.cantonFairCodeOpts;
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('enterpriseReturnApply', ['postReviewList', 'postRefundApplyOper']),
    // 前往退回申请详情页
    goReturnDetails(idNum) {
      this.$router.push({ path: '/returnApplyDetailsPage', query: { id: idNum }});
    },
    // 点击通过
    goPass(id, num) {
      this.passObj.boothAffirmId = id;
      this.passObj.checkStatus = num;
      this.loading = true;
      this.postRefundApplyOper(this.passData).then(() => {
        this.$message.success('操作成功');
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 不通过弹窗
    openPass(id, num) {
      this.passObj.auditOpinion = '';
      this.passObj.boothAffirmId = id;
      this.passObj.checkStatus = num;
      this.isPass = true;
    },
    // 不通过de弹窗保存按钮
    submitSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postRefundApplyOper(this.passData).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message.success('操作成功');
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
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.postReviewList(this.formQuery).then(() => {
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
