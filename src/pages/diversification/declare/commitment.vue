/**
* @file 承诺书
* @author:wanglifeng
* @date:2019/1/14
*/
<template>
  <div>
    <p><span class="title">CF评选产品列表 </span><span class="title">承诺书</span></p>
    <hr>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item label="活动编号:" size="mini">
        <el-select v-model="ruleForm.activityCode">
          <el-option v-for="(item, index) in activeCodeOption" :label="item.activityCode" :value="item.activityCode" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="submitForm()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="padding: 10px 50px;">
      <el-col :span="5">
        <el-button type="text" size="small" @click="getDownloadPath(1)"><a download="最新承诺书.pdf">下载最新承诺书模板:{{fileName}}</a></el-button>
      </el-col>
      <el-col :span="8">
        <el-upload class="item-upload" :headers="header" :action="formUrl" accept="application/pdf" name="files" :data="uploadParams" :on-change="handleChange" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" show-file-list="false" :file-list="fileList">
          <el-button size="small" type="primary">上传承诺书</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="120">
        </el-table-column>
        <el-table-column prop="activityCode" label="活动编号" align="center" width="150">
        </el-table-column>
        <el-table-column prop="filePath" label="承诺书" align="center">
          <template slot-scope="scope">
            <span style="color: #2b579a;" @click="getDownloadPath(scope.row)">文件名：{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>
<script>
// import http from "@/scripts/framework/http";
export default {
  name: "perfectInformation",
  data() {
    return {
      fileId: '',
      tableData: [],
      activeCodeOption: [],
      ruleForm: {
        activityCode: ''
      },
      fileList: [],
      downloadUrl: '',
      filePath: '',
      fileName: '',
      formUrl: '',
      uploadParams: {},
      header: {
        Token: this.$store.state.token
      },
      baseApi: process.env.API_CF_URL
      // baseApi: 'http://192.168.1.116:9014'
    };
  },
  methods: {
    getActiveCodeOption() {
      this.$http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
        this.activeCodeOption = res.records;
        this.ruleForm.activityCode = res.records[0].activityCode;
        // this.fileId = res.records[0].filePath;
        this.init();
      }).catch(error => {
      });
    },
    init() {
      let params = {
        activityCode: this.ruleForm.activityCode
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/getCompanyCommitment', params).then(res => {
        this.tableData = res;
        this.fileId = res[0].filePath;
        this.downloadUrl = this.baseApi + '/api/customservice/cf/downloadFile/' + this.fileId;
      }).catch(error => {
      });
    },
    submitForm() {
      this.init();
    },
    getDownloadPath(row) {
      if (row === 1) {
        window.open(this.downloadUrl);
      } else {
        window.open(this.baseApi + '/api/customservice/cf/downloadFile/' + this.fileId);
      }
    },
    beforeUpload(file) {
      this.formUrl = this.baseApi + '/api/customservice/cf/saveCompanyCommitment';
      this.uploadParams.commitment = file;
      // this.uploadParams.cfCompanyId = file.type;
      this.uploadParams.activityCode = this.ruleForm.activityCode || this.tableData[0].activityCode;
      // this.uploadParams.remark = 'PDF上传';
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    uploadSuccess(response, file, fileList) {
      if (response.flag === '1') {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        this.init();
        this.fileList = [];
      } else {
        this.$message({
          type: "info",
          message: "上传失败"
        });
      }
    },
    uploadError(err, file, fileList) {
      this.$message({
        type: "info",
        message: "上传失败:" + err
      });
    }
  },
  mounted() {
    // this.formUrl = process.env.API_CF_URL + '/api/customservice/cf/saveCompanyCommitment';
    this.formUrl = this.baseApi + '/api/customservice/cf/saveCompanyCommitment';
    this.getActiveCodeOption();
  }
};
</script>
<style scoped>
.title {
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.item-upload {
  display: inline-block;
  margin-left: 30px;
}
</style>
