<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="退回展位企业清单" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="申请展区">
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
        <el-form-item label="情况分类">
          <el-select v-model="queryForm.backType" clearable>
            <el-option v-for="item in backTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="退回原因">
          <el-input placeholder="请输入" v-model.trim="queryForm.backReason" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="returnBoothData.records" v-loading="loading" border>
        <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column>
        <el-table-column label="商会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="退回前品牌展位数" prop="lastBoothNumber" align="center"></el-table-column>
        <el-table-column label="退回品牌展位数" prop="changeBoothNumber" align="center"></el-table-column>
        <el-table-column label="保留品牌展位数" prop="currentReserveNumber" align="center"></el-table-column>
        <el-table-column label="企业退回申请书附件" prop="attachment" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleFileDownload('attachment', scope.row.attachment)" v-if="scope.row.attachment">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="交易团确认书附件" prop="dealAffirmAttachment" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleFileDownload('dealAffirmAttachment', scope.row.dealAffirmAttachment)" v-if="scope.row.dealAffirmAttachment">查看</el-button>
            <!-- <el-upload v-if="scope.row.dealAffirmAttachment"
              class="upload-demo floatLeft"
              action="" :show-file-list="false"
              :limit="1" :data="{boothAffirmId: scope.row.boothAffirmId, attachmentType: 2, applyRole: scope.row.applyRole, backConfirmationId: scope.row.backConfirmationId}"
              :before-upload="handleFileChange"
              :file-list="fileList"
              :http-request="uploadFileMethod">
              <el-button :disabled="handleWorkStatusDisabled(scope.row.workCheckStatus)" type="text">编辑</el-button>
            </el-upload> -->
            <!-- <el-button type="text" v-if="!scope.row.dealAffirmAttachment">上传</el-button> -->
            <!-- <el-upload v-if="!scope.row.dealAffirmAttachment"
              class="upload-demo floatLeft"
              action="" :show-file-list="false"
              :limit="1" :data="{boothAffirmId: scope.row.boothAffirmId, attachmentType: 2, applyRole: scope.row.applyRole, backConfirmationId: scope.row.backConfirmationId}"
              :before-upload="handleFileChange"
              :file-list="fileList"
              :http-request="uploadFileMethod">
              <el-button :disabled="handleWorkStatusDisabled(scope.row.workCheckStatus)" type="text">上传</el-button>
            </el-upload> -->
          </template>
        </el-table-column>
      <!--  <el-table-column label="退回展位号" prop="currentReserveNumber" align="center"></el-table-column> -->
        <el-table-column label="情况分类" prop="backType" align="center">
          <template slot-scope="scope">
            {{ scope.row.backType === 1 ? '全部退回' : '部分退回' }}
          </template>
        </el-table-column>
        <el-table-column label="退回原因" prop="backReason" align="center"></el-table-column>
        <!-- <el-table-column label="工作部审核结果" prop="workCheckStatus" align="center"></el-table-column> -->
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
          :total="returnBoothData.total">
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
      delegationOpts: [],
      companyOpts: [],
      backTypeOpts: [{ value: '1', label: '全部退回' }, { value: '2', label: '部分退回' }],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        caller: '1',
        coceralId: this.$store.getters.userInfo.org.deptId,
        companyName: '',
        backType: '',
        cantonFairCode: '',
        backReason: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['returnBoothData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        caller: this.queryForm.caller,
        coceralId: this.queryForm.coceralId,
        companyName: this.queryForm.companyName,
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
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getReturnBooth']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&coceralId=${this.queryForm.coceralId}&caller=${"1"}&companyName=${this.queryForm.companyName}&backType=${this.queryForm.backType}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/backArrange/exportReturnCompanyInfo/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 附件下载
    handleFileDownload(type, fileId) {
      window.open(`${process.env.API_NA_URL}/api/boothreturned/attachment/download?fileId=${fileId}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
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
    },
    //工作部审核结果,判断是否可以点击上传,编辑按钮
    handleWorkStatusDisabled(status) {
      if (status === '1' || status === '2') {
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
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getReturnBooth(this.formQuery).then(res => {
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
