<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团审核企业退回申请" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="发起方">
          <el-select v-model="queryForm.applyRole" clearable>
            <el-option v-for="(item, key) in applyRoleOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="交易团审核结果" label-width="120px">
          <el-select v-model="queryForm.dealCheckStatus" clearable>
            <el-option v-for="(item, key) in checkStatusOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复核结果" label-width="120px">
          <el-select v-model="queryForm.workCheckStatus" clearable>
            <el-option v-for="(item, key) in checkStatusOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="reviewListData.records" v-loading="loading" border>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.cantonFairCode">{{ scope.row.cantonFairCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="退回前品牌展位数" prop="lastBoothNumber" align="center"></el-table-column>
        <el-table-column label="退回品牌展位数" prop="backBoothNumber" align="center"></el-table-column>
        <el-table-column label="保留品牌展位数" prop="currentReserveNumber" align="center"></el-table-column>
        <!-- <el-table-column label="退回展位号" prop="backBooth" align="center"></el-table-column> -->
        <el-table-column label="发起方" prop="applyRole" align="center">
          <template slot-scope="scope">
            {{ scope.row.applyRole === '1' ? '企业' : (scope.row.applyRole === '2' ? '交易团' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="企业退回书附件" prop="attachment" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleFileDownload('attachment', scope.row.attachment)" v-if="scope.row.attachment">查看</el-button>
            <el-upload  v-if="scope.row.attachment"
              class="upload-demo floatLeft"
              action="" :show-file-list="false"
              :limit="1"
              :data="{ boothAffirmId: scope.row.boothAffirmId, attachmentType: 1, applyRole: scope.row.applyRole, backConfirmationId: scope.row.backConfirmationId }"
              :before-upload="handleFileChange"
              :file-list="fileList"
              :http-request="uploadFileMethod">
              <el-button :disabled="handleWorkStatusDisabled(scope.row.workCheckStatus)" type="text">编辑</el-button>
            </el-upload>
            <!-- <el-button type="text" v-if="!scope.row.attachment">上传</el-button> -->
            <el-upload  v-if="!scope.row.attachment"
              class="upload-demo floatLeft"
              action="" :show-file-list="false"
              :limit="1" :data="{boothAffirmId: scope.row.boothAffirmId, attachmentType: 1, applyRole: scope.row.applyRole, backConfirmationId: scope.row.backConfirmationId}"
              :before-upload="handleFileChange"
              :file-list="fileList"
              :http-request="uploadFileMethod">
              <el-button :disabled="handleWorkStatusDisabled(scope.row.workCheckStatus)" type="text">上传</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="交易团确认书附件" prop="dealAffirmAttachment" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleFileDownload('dealAffirmAttachment', scope.row.dealAffirmAttachment)" v-if="scope.row.dealAffirmAttachment">查看</el-button>
            <el-upload v-if="scope.row.dealAffirmAttachment"
              class="upload-demo floatLeft"
              action="" :show-file-list="false"
              :limit="1" :data="{boothAffirmId: scope.row.boothAffirmId, attachmentType: 2, applyRole: scope.row.applyRole, backConfirmationId: scope.row.backConfirmationId}"
              :before-upload="handleFileChange"
              :file-list="fileList"
              :http-request="uploadFileMethod">
              <el-button :disabled="handleWorkStatusDisabled(scope.row.workCheckStatus)" type="text">编辑</el-button>
            </el-upload>
            <!-- <el-button type="text" v-if="!scope.row.dealAffirmAttachment">上传</el-button> -->
            <el-upload v-if="!scope.row.dealAffirmAttachment"
              class="upload-demo floatLeft"
              action="" :show-file-list="false"
              :limit="1" :data="{boothAffirmId: scope.row.boothAffirmId, attachmentType: 2, applyRole: scope.row.applyRole, backConfirmationId: scope.row.backConfirmationId}"
              :before-upload="handleFileChange"
              :file-list="fileList"
              :http-request="uploadFileMethod">
              <el-button :disabled="handleWorkStatusDisabled(scope.row.workCheckStatus)" type="text">上传</el-button>
            </el-upload>
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
            {{ scope.row.dealCheckStatus | checkStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="复核结果" prop="workCheckStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.workCheckStatus | checkStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="backReason" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.applyRole !== '2'">
              <el-button type="text" @click="goReturnDetails(scope.row)" :disabled="handleDisabled(scope.row.dealCheckStatus)">审核</el-button>
            </div>
            <div v-if="scope.row.applyRole == '2'">
              <el-button type="text" @click="handleDeleteRow(scope.row)" :disabled="handleWorkDisabled(scope.row.workCheckStatus)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="goAddApply">新增申请</el-button>
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="reviewListData.total">
        </el-pagination>
      </el-row>
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
      fileList: [],
      exhibitionAreaOpts: [],
      cantonFairCodeOpts: [],
      companyOpts: [],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '审核通过' }, { value: '2', label: '审核不通过' }],
      applyRoleOpts: [{ value: '1', label: '企业' }, { value: '2', label: '交易团' }],
      queryForm: {
        exhibitionArea: '',
        cantonFairCode: '',
        companyName: '',
        applyRole: '',
        dealClusterId: this.$store.getters.userInfo.org.deptId,
        dealCheckStatus: '',
        workCheckStatus: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkStatusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核不通过';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters('enterpriseReturnApply', ['reviewListData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        cantonFairCode: this.queryForm.cantonFairCode,
        dealClusterId: this.queryForm.dealClusterId,
        companyName: this.queryForm.companyName,
        applyRole: this.queryForm.applyRole,
        dealCheckStatus: this.queryForm.dealCheckStatus,
        workCheckStatus: this.queryForm.workCheckStatus,
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
    this.createdQuery();
  },
  methods: {
    ...mapActions('enterpriseReturnApply', ['postReviewList', 'postBoothreturnedDelete', "postConfirmDetailUpload"]), // 3. 上传确认书
    ...mapActions('nainformation', ['getexhibitionArea']),
    // 是否已审核
    handleDisabled(status) {
      if (status === '0' || !status) {
        return false;
      } else {
        return true;
      }
    },
    //复核结果,判断是否可以点击上传,编辑按钮
    handleWorkStatusDisabled(status) {
      if (status === '1' || status === '2') {
        return true;
      } else {
        return false;
      }
    },
    handleWorkDisabled(status) {
      if (status === '0' || !status) {
        return false;
      } else {
        return true;
      }
    },
    // 前往发起申请页
    goAddApply() {
      this.$router.push({ path: '/returnApplyPage' });
    },
    // 前往退回申请详情页
    goReturnDetails(row) {
      let workSts = row.workCheckStatus;
      let fileId = row.attachment;
      this.$router.push({ path: '/returnApplyDetailsPage', query: { id: row.boothAffirmId, work: workSts, file: fileId, backConfirmationId: row.backConfirmationId }});
    },
    // 删除
    handleDeleteRow(row) {
      let obj = {
        boothAffirmId: row.boothAffirmId,
        exhibitionSession: row.exhibitionSession,
        dealAffirmAttachment: row.dealAffirmAttachment,
        backConfirmationId: row.backConfirmationId
      };
      this.postBoothreturnedDelete(obj).then(res => {
        this.createdQuery();
        this.$message.success('删除成功');
      }).catch(res => {
        this.$message.error('删除失败');
      });
    },
    // 列表下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&cantonFairCode=${this.queryForm.cantonFairCode}&companyName=${this.queryForm.companyName}&applyRole=${this.queryForm.applyRole}&dealCheckStatus=${this.queryForm.dealCheckStatus}&workCheckStatus=${this.queryForm.workCheckStatus}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/boothreturned/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 附件下载
    handleFileDownload(type, fileId) {
      window.open(`${process.env.API_NA_URL}/api/boothreturned/attachment/download?fileId=${fileId}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
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
      this.postReviewList(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // before
    handleFileChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
      }
    },
    // 上传确认书
    uploadFileMethod(param) {
    //  console.log(param, 'param');
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      formData.append('boothAffirmId', param.data.boothAffirmId);
      formData.append('attachmentType', param.data.attachmentType);
      formData.append('applyRole', param.data.applyRole);
      formData.append('backConfirmationId', param.data.backConfirmationId);
      // let fullScreenloading = this.$loading({ fullscreen: true });
      this.postConfirmDetailUpload(formData).then(res => {
        // this.$nextTick(() => {
        //   fullScreenloading.close();
        // });
        this.createdQuery();
        // this.formData.fileId = res.fileId;
        this.$message.success('上传成功');
        this.fileList = [];
      }).catch(e => {
        // this.$nextTick(() => {
        //   fullScreenloading.close();
        // });
        this.createdQuery();
        this.fileList = [];
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
