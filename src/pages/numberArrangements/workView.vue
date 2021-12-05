<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部查看汇总" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-select v-model="queryForm.workCheckStatus" clearable>
            <el-option v-for="(item, key) in checkStatusOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="退回原因">
          <el-input placeholder="请输入" v-model.trim="queryForm.backReason" clearable></el-input>
        </el-form-item>
        <el-form-item label="情况分类">
          <el-select v-model="queryForm.backType" clearable>
            <el-option v-for="(item, index) in backTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptCode" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="queryForm.exhibitionPeriod" clearable>
            <el-option v-for="(item, index) in exhibitionPeriodOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起方">
          <el-select v-model="queryForm.applyRole" clearable>
            <el-option v-for="(item, key) in applyRoleOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="workViewData.records" v-loading="loading" border>
        <!-- <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column> -->
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="退回前品牌展位数" prop="lastBoothNumber" align="center"></el-table-column>
        <el-table-column label="退回品牌展位数" prop="backBoothNumber" align="center"></el-table-column>
        <el-table-column label="保留品牌展位数" prop="currentReserveNumber" align="center"></el-table-column>
        <!-- <el-table-column label="退回展位号" prop="currentChangeNumber" align="center"></el-table-column> -->
        <el-table-column label="发起方" prop="applyRole" align="center">
          <template slot-scope="scope">
            {{ scope.row.applyRole === '1' ? '企业' : (scope.row.applyRole === '2' ? '交易团' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="企业退回书附件" prop="attachment" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="handleFileDownload('attachment', scope.row.attachment)" v-if="scope.row.attachment">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="交易团确认书附件" prop="dealAffirmAttachment" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="handleFileDownload('dealAffirmAttachment', scope.row.dealAffirmAttachment)" v-if="scope.row.dealAffirmAttachment">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="情况分类" prop="backType" align="center">
          <template slot-scope="scope">
            {{ scope.row.backType | backTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="退回原因" prop="backReason" min-width="300px" align="center"></el-table-column>
        <el-table-column label="不通过原因" prop="noPassReason" align="center">
          <template slot-scope="scope">
            {{ scope.row.noPassReason }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核结果" prop="dealCheckStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.dealCheckStatus | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="工作部审核结果" prop="workCheckStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.workCheckStatus | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.dealCheckStatus === '1'">
              <el-button type="text" @click="handleOpenCheck(scope.row)" :disabled="handleDisabled(scope.row.workCheckStatus)">审核</el-button>
            </div>
          </template>
        </el-table-column>
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
          :total="workViewData.total">
        </el-pagination>
      </el-row>
      <!-- 审核弹框 -->
      <el-dialog title="审核" :visible.sync="isCheck" v-if="isCheck">
        <el-form class="checkForm" ref="checkForm" :model="checkData" :rules="rules">
          <el-form-item label="审核结果：" prop="workCheckStatus">
            <el-select v-model="checkData.workCheckStatus">
              <el-option v-for="(item, index) in checkResultOpts" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="不通过原因：" prop="workCheckOpinion" v-if="checkData.workCheckStatus === '2'" label-width='110px'>
            <el-input type="textarea" v-model="checkData.workCheckOpinion" :rows="4" maxlength="120"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="handleSubmit('checkForm')">提交</el-button>
          <el-button size="medium" @click="isCheck = false;">取消</el-button>
        </div>
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
      isCheck: false,
      cantonFairCodeOpts: [],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '审核通过' }, { value: '2', label: '审核未通过' }],
      checkResultOpts: [{ value: '1', label: '审核通过' }, { value: '2', label: '审核不通过' }],
      backTypeOpts: [{ value: 1, label: '全部退回' }, { value: 2, label: '部分退回' }],
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      exhibitionPeriodOpts: [],
      applyRoleOpts: [{ value: '1', label: '企业' }, { value: '2', label: '交易团' }],
      queryForm: {
        exhibitionArea: '',
        cantonFairCode: '',
        dealCheckStatus: '1',
        workCheckStatus: '',
        dealClusterId: '',
        companyName: '',
        backReason: '',
        applyRole: '',
        backType: '',
        exhibitionPeriod: ''
      },
      checkData: {
        boothAffirmId: '',
        dealCheckStatus: '',
        workCheckStatus: '',
        workCheckOpinion: '',
        applyRole: ''
      },
      rules: {
        workCheckStatus: [{ required: true, message: '请选择', trigger: 'change' }],
        workCheckOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核未通过';
        default:
          return '';
      }
    },
    backTypeFilter: value => {
      let val = value + '';
      switch (val) {
        case '1':
          return '全部退回';
        case '2':
          return '部分退回';
        default:
          return '';
      }
    }
  },
  computed: {
    ...mapGetters('enterpriseReturnApply', ['workViewData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        cantonFairCode: this.queryForm.cantonFairCode,
        dealCheckStatus: this.queryForm.dealCheckStatus,
        workCheckStatus: this.queryForm.workCheckStatus,
        dealClusterId: this.queryForm.dealClusterId,
        backReason: this.queryForm.backReason,
        companyName: this.queryForm.companyName,
        applyRole: this.queryForm.applyRole,
        backType: this.queryForm.backType,
        exhibitionPeriod: this.queryForm.exhibitionPeriod,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  async created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 展期
    this.exhibitionPeriodOpts = await kindo.dictionary.get('exhibitionPeriodNum');
    this.createdQuery();
  },
  methods: {
    ...mapActions('enterpriseReturnApply', ['postSummaryList', 'postBackBookCheckSubmit']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 工作部是否审核
    handleDisabled(status) {
      if (status === '0' || !status) {
        return false;
      } else {
        return true;
      }
    },
    // 打开审核弹框
    handleOpenCheck(row) {
      this.checkData = {
        boothAffirmId: row.boothAffirmId,
        dealCheckStatus: row.dealCheckStatus,
        workCheckStatus: '',
        workCheckOpinion: '',
        applyRole: row.applyRole
      };
      this.isCheck = true;
    },
    // 附件下载
    handleFileDownload(type, fileId) {
      window.open(`${process.env.API_NA_URL}/api/boothreturned/attachment/download?fileId=${fileId}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 提交
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let submitObj = {
            boothAffirmId: this.checkData.boothAffirmId,
            checkStatus: '',
            workCheckStatus: this.checkData.workCheckStatus,
            workCheckOpinion: this.checkData.workCheckOpinion,
            applyRole: this.checkData.applyRole
          };
          let dealSts = this.checkData.dealCheckStatus;
          let workSts = this.checkData.workCheckStatus;
          if (dealSts === '0') {
            submitObj.checkStatus = '0';
          } else if (dealSts === '1' && workSts === '0') {
            submitObj.checkStatus = '3';
          } else if (workSts === '1') {
            submitObj.checkStatus = '1';
          } else if (dealSts === '2' || workSts === '2') {
            submitObj.checkStatus = '2';
          } else {
            submitObj.checkStatus = '';
          }
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postBackBookCheckSubmit(submitObj).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message.success('提交成功');
            this.isCheck = false;
            this.createdQuery();
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 列表下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealCheckStatus=1&cantonFairCode=${this.queryForm.cantonFairCode}&companyName=${this.queryForm.companyName}&applyRole=${this.queryForm.applyRole}&dealClusterId=${this.queryForm.dealClusterId}&workCheckStatus=${this.queryForm.workCheckStatus}`;
      url = url.replace(/undefined/g, "");
      //window.open(`${process.env.API_NA_URL}/api/boothreturned/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
      window.open(`${process.env.API_NA_URL}/api/boothreturned/work/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
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
      this.postSummaryList(this.formQuery).then(() => {
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
.checkForm{
  width: 50%;
  min-width: 550px;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
