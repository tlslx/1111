/**
* @file 承运商-人证申请列表
* @author:zhangwenjian
* @date: 2019/3/18
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">承运商人证申请列表</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <<el-option v-for="(exhibition,index) in exhibitionSessions" :key="index" :label="'第' + exhibition.exhibitionNum + '届'"
                      :value="exhibition.exhibitionNum"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人证类型" size="mini">
        <el-select v-model="ruleForm.cardType" placeholder="请选择">
          <el-option label="搬运证" value="01"></el-option>
          <el-option label="驻会服务证" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.applyStatus" placeholder="请选择">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核不通过" value="2"></el-option>
          <el-option label="审核中" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" @click="resetRuleForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" @click="openAddDialog()">新增</el-button>
    </el-row>
    <template>
      <el-table
        ref="multipleTable"
        :data="listDatas"
        class="table"
        border
        @select-all="handleListSelectAll"
        @selection-change="handleListSelectChange"
        style="width: 100%;">

        <el-table-column
          type="selection"
          width="50">
        </el-table-column>

        <el-table-column
          prop="exhibitionSession"
          label="届数"
          width="90"
          align="center">
          <template slot-scope="scope">
            <span>第{{scope.row.exhibitionSession}}届</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="人证类型"
          align="center"
          width="190">
          <template slot-scope="scope">
            <span>{{scope.row.cardType === '01' ? '搬运证' : '驻会服务证'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus === '0'">待审核</span>
            <span v-else-if="scope.row.applyStatus === '3'">审核通过</span>
            <span v-else-if="scope.row.applyStatus === '2'">审核不通过</span>
            <span v-else-if="scope.row.applyStatus === '1'">审核中</span>
            <span v-else>审核中</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="240">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.applyStatus === '2'"  size="mini" @click="openUpdateDialog(scope.row, scope.$index)">修改</el-button>
            <el-button type="text" v-else-if="scope.row.applyStatus === '0'"  size="mini" @click="openUpdateDialog(scope.row, scope.$index)">修改</el-button>
            <el-button type="text" v-else  size="mini" :disabled="true" @click="openUpdateDialog(scope.row, scope.$index)">修改</el-button>
            <el-button type="text" v-if="scope.row.applyStatus === '0'" size="mini" @click="cancelCertificate(scope.row, scope.$index)">撤销</el-button>
            <el-button type="text" v-else :disabled="true"  size="mini" @click="cancelCertificate(scope.row, scope.$index)">撤销</el-button>
            <el-button type="text" size="mini" @click="lookUpCertificateInfo(scope.row, scope.$index)">查看</el-button>
            <el-button type="text" v-if="scope.row.applyStatus === '3'"  size="mini" @click="downLoadReturnReceipt(scope.row, scope.$index)">下载回持</el-button>
            <el-button type="text" v-else  :disabled="true" size="mini" @click="downLoadReturnReceipt(scope.row, scope.$index)">下载回持</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleListSizeChange"
        @current-change="handleListCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </template>

    <!--完善人证信息弹框-->
    <el-dialog title="人证信息" width="450px" :visible.sync="addCertificateDialog" :close-on-click-modal="false">
      <el-form :model="addCertificateForm" ref="addCertificateForm" class="demo-form-inline" style="margin-right: 15px" label-width="110px" :rules="rules">
        <el-form-item label="证件类型:" size="small" prop="cardType">
          <el-select v-model="addCertificateForm.cardType" placeholder="请选择">
            <el-option label="搬运证" value="01"></el-option>
            <el-option label="驻会服务证" value="02"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:" size="small" prop="name">
          <el-input maxlength="32" v-model.trim="addCertificateForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" size="small" prop="idCard">
          <el-input maxlength="18" v-model.trim="addCertificateForm.idCard" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="证件照片:" size="medium" prop="cardImage">
          <el-upload
            v-model="addCertificateForm.cardImage"
            class="avatar-uploader"
            :action="imgUploadApi"
            :headers="{
              Token: this.$store.state.token
            }"
            :on-preview="handlePreview"
            accept=".jpg,.jpeg,.png"
            :data="uploadImgData"
            :show-file-list="false"
            :on-success="handleCertificateSuccess"
            :before-upload="beforeCertificateUpload">
            <el-popover
              v-if="ctfImageUrl"
              placement="right"
              width="370"
              trigger="hover">
              <img alt='' :src="ctfImageUrl" style="width: 360px;height: 260px"/>
              <img alt='' slot="reference" :src="ctfImageUrl" class="avatar"/>
            </el-popover>
            <i v-if="!ctfImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证照片:" size="medium" prop="idCardImage">
          <el-upload
            v-model="addCertificateForm.idCardImage"
            class="avatar-uploader"
            :headers="{
              Token: this.$store.state.token
            }"
            :action="imgUploadApi"
            :data="uploadImgData"
            accept=".jpg,.jpeg,.png"
            :show-file-list="false"
            :on-preview="handlePreview"
            :on-success="handleIdcardSuccess"
            :before-upload="beforeIdcardUpload">
            <el-popover
              v-if="idImageUrl"
              placement="right"
              width="370"
              trigger="hover">
              <img alt='' :src="idImageUrl" style="width: 360px;height: 260px"/>
              <img alt='' slot="reference" :src="idImageUrl" class="avatar"/>
            </el-popover>
            <i v-if="!idImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="附件:" size="medium">
          <el-upload
            class="upload-demo"
            :action="imgUploadApi"
            :headers="{
              Token: this.$store.state.token
            }"
            :data="uploadMateriData"
            accept=".jpg,.jpeg,.png,.pdf"
            :on-success="handleAttachmentSuccess"
            :before-upload="beforeAttachmentUpload"
            :on-preview="handleAttachmentPreview"
            :on-remove="handleAttachmentRemove"
            multiple
            :limit="5"
            :on-exceed="handleAttachmentExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">浏览</el-button>
            <div slot="tip" class="el-upload__tip"><span style="color: red">*</span>只能上传jpeg/jpg/png/pdf文件!</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmSendRequest()">提交</el-button>
        <el-button @click="addCertificateDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="人证信息" width="450px" :visible.sync="seeCertificateDialog" :close-on-click-modal="false">
      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">证件类型:</span>
        </el-col>
        <el-col :span="17">
          <span>{{certificateDetail.cardType === '01' ? '搬运证' : '驻会服务证'}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">姓名:</span>
        </el-col>
        <el-col :span="17">
          <span>{{certificateDetail.name}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">身份证号:</span>
        </el-col>
        <el-col :span="17">
          <span>{{certificateDetail.idCard}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">证件照片:</span>
        </el-col>
        <el-col :span="17">
          <img :src="showImg(certificateDetail.cardImage)" @click="showImgDialog(certificateDetail.cardImage)" class="img">
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">身份证照片:</span>
        </el-col>
        <el-col :span="17">
          <img :src="showImg(certificateDetail.idCardImage)" @click="showImgDialog(certificateDetail.idCardImage)" class="img">
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="7">
          <span class="itemtitle">附件:</span>
        </el-col>
        <el-col :span="17">
          <a style="display: block" target="_blank" v-for="(attachment,index) in certificateDetail.attachmentList" :key="index" :href="showImg(attachment.filePath)">{{attachment.fileName}}</a>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button type="primary" @click="seeCertificateDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" width="550px">
      <img style="width: 100%;height: 360px"  :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "carrierCertificatesApplyList",
    mixins: [dialogMixin],
    data() {
      const validateIdCard = (rule, value, callback) => {
        let IDCARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!IDCARD.test(value)) {
          return callback(new Error("请输入正确的身份证号码"));
        } else {
          return callback();
        }
      };
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`@#$%^&]/im;
        let regCn = /[#￥【】]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error("输入不能包含特殊字符!"));
        } else {
          return callback();
        }
      };
      return {
        listDatas: [],
        listTotal: 0,
        addCertificateDialog: false,
        seeCertificateDialog: false,
        dialogVisible: false,
        dialogImageUrl: '',

        uploadImgData: {
          code: 1
        },
        uploadMateriData: {
          code: 2
        },

        imgUploadApi: '',
        attachmentApi: '',

        ctfImageUrl: '',
        idImageUrl: '',

        fileList: [],
        isUpdate: false,

        ruleForm: {
          exhibitionSession: '',
          cardType: '',
          applyStatus: '',
          current: 1,
          size: 10
        },
        addCertificateForm: {
          exhibitionSession: '',
          cardType: '',
          name: '',
          idCard: '',
          cardImage: '',
          idCardImage: '',
          attachmentList: []
        },
        certificateDetail: {
          attachmentList: []
        },
        rules: {
          exhibitionSession: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cardType: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          cardImage: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          idCardImage: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          idCard: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateIdCard, trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_MB_URL,
        baseApi3: process.env.API_EXP_URL,
        exhibitionSessions: [],
        currentExhibitionSession: '',
        currentYear: ''
      };
    },
    mounted() {
      this.getCurrentSession();
      this.getExhibitionSessions();
      this.imgUploadApi = this.baseApi + '/api/customservice/multiBusi/uploadFile';
    },
    methods: {
      getCurrentSession() {
        this.$http.get(this.baseApi3 + '/api/exp/exhibitions/current').then(res => {
          this.currentExhibitionSession = res.exhibitionNum;
          this.currentYear = res.exhibitionYear;
          this.ruleForm.exhibitionSession = res.exhibitionNum;
          // 表单的默认展届值
          this.addCertificateForm.exhibitionSession = res.exhibitionNum;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getExhibitionSessions() {
        this.$http.get(this.baseApi3 + '/api/exp/exhibitions/getListAll').then(res => {
          this.exhibitionSessions = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 下载回持
      downLoadReturnReceipt(row, index) {

      },
      showImgDialog(path) {
        if (path !== '' && path != null) {
          this.dialogVisible = true;
          this.dialogImageUrl = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
        }
      },
      showImg(path) {
        let url = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
        return url;
      },
      /*
        搜索及条件重置
      */
      searchForumList(flag) {
        // 分页重置
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/carrier/listManCard', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getCertificateInfo(manCardId) {
      },
      // 重置搜索表单
      resetRuleForm() {
        this.ruleForm.exhibitionSession = '125';
        this.ruleForm.cardType = '';
        this.ruleForm.applyStatus = '';
        this.ruleForm.current = 1;
      },
      openUpdateDialog(row, index) {
        if (this.$refs.addCertificateForm !== undefined) {
          this.$refs.addCertificateForm.resetFields();
        }
        this.fileList = [];
        this.isUpdate = true;
        for (let item in row) {
          this.addCertificateForm[item] = row[item];
        }
        this.addCertificateForm.attachmentList = [];
        this.ctfImageUrl = this.showImg(this.addCertificateForm.cardImage);
        this.idImageUrl = this.showImg(this.addCertificateForm.idCardImage);
        for (let i = 0, length = row.attachmentList.length; i < length; i++) {
          let params = {
            name: row.attachmentList[i].fileName,
            url: row.attachmentList[i].filePath
          };
          let paramsMy = {
            fileName: row.attachmentList[i].fileName,
            filePath: row.attachmentList[i].filePath
          };
          this.addCertificateForm.attachmentList.push(paramsMy);
          this.fileList.push(params);
        }
        this.addCertificateDialog = true;
      },
      openAddDialog() {
        this.isUpdate = false;
        if (this.$refs.addCertificateForm !== undefined) {
          this.$refs.addCertificateForm.resetFields();
        }
        this.resetAddCertificateForm();
        this.addCertificateDialog = true;
      },
      resetAddCertificateForm() {
        for (let item in this.addCertificateForm) {
          this.addCertificateForm[item] = '';
        }
        this.fileList = [];
        this.ctfImageUrl = '';
        this.idImageUrl = '';
        this.addCertificateForm.exhibitionSession = this.currentExhibitionSession;
        this.addCertificateForm.attachmentList = [];
      },
      // 撤销
      cancelCertificate(row, index) {
        this.showDialogTips("确认撤销?").then(() => {
          this.$http.post(this.baseApi + '/api/customservice/carrier/cancelManCard', { manCardId: row.manCardId }).then(res => {
            this.$message.success("撤销成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      confirmSendRequest() {
        if (this.isUpdate) {
          this.updateRequest();
        } else {
          this.addRequest();
        }
      },
      addRequest() {
        this.$refs.addCertificateForm.validate((valid) => {
          if (valid) {
            delete this.addCertificateForm.operType;
            this.addCertificateForm.exhibitionSession = this.addCertificateForm.exhibitionSession + '';
            this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveManCard', this.addCertificateForm).then(res => {
              this.$message.success("新增成功!");
              this.addCertificateDialog = false;
              this.searchForumList();
            }).catch(error => {
              this.$message.error(error);
            });
          }
        });
      },
      updateRequest() {
        this.$refs.addCertificateForm.validate((valid) => {
          if (valid) {
            this.addCertificateForm.exhibitionSession = this.addCertificateForm.exhibitionSession + '';
            this.$http.postJson(this.baseApi + '/api/customservice/carrier/updateManCard', this.addCertificateForm).then(res => {
              this.$message.success("修改成功!");
              this.addCertificateDialog = false;
              this.searchForumList();
            }).catch(error => {
              this.$message.error(error);
            });
          }
        });
      },
      lookUpCertificateInfo(row, index) {
        for (let item in row) {
          this.certificateDetail[item] = row[item];
        }
        this.seeCertificateDialog = true;
      },
      /*
       文件上传
      */
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 证件照片
      handleCertificateSuccess(res, file) {
        if (res.flag === '1') {
          this.ctfImageUrl = this.showImg(res.data);
          this.addCertificateForm.cardImage = res.data;
        } else {
          this.$message.error("图片上传失败!");
        }
      },
      beforeCertificateUpload(file) {
        return this.imageUploadFileType(file);
      },
      // 身份证照片
      handleIdcardSuccess(res, file) {
        if (res.flag === '1') {
          this.idImageUrl = this.showImg(res.data);
          this.addCertificateForm.idCardImage = res.data;
        } else {
          this.$message.error(res.message);
        }
      },
      beforeIdcardUpload(file) {
        return this.imageUploadFileType(file);
      },
      // 附件材料
      handleAttachmentSuccess(res, file) {
        if (res.flag === '1') {
          let successfile = {
            fileName: file.name,
            filePath: res.data
          };
          this.addCertificateForm.attachmentList.push(successfile);
        } else {
          this.$message.error(res.message);
        }
      },
      beforeAttachmentUpload(file) {
        return this.uploadFileTypeJuge(file);
      },
      handleAttachmentPreview() {

      },
      handleAttachmentRemove(file, fileList) {
        this.addCertificateForm.attachmentList = [];
        fileList.forEach((item, index) => {
          if (item.response) {
            // 测试
            let params = {
              fileName: item.name,
              filePath: item.response.data
            };
            this.addCertificateForm.attachmentList.push(params);
          } else {
            // 测试
            let params = {
              fileName: item.name,
              filePath: item.url
            };
            this.addCertificateForm.attachmentList.push(params);
          }
        });
      },
      handleAttachmentExceed() {
        this.$message.error("最多只能上传5个文件!");
      },
      // 进行pdf格式及大小验证
      uploadFileTypeJuge(file) {
        let testPdf = file.type === "application/pdf";
        // 进行图片大小验证
        let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);

        if (!testFileType && !testPdf) {
          this.$message.warning("上传的文件格式错误!");
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.warning("上传文件大小不能超过 5MB!");
          return false;
        }
        return true;
      },
      // 图片大小及格式判断
      imageUploadFileType(file) {
        // 进行图片大小验证
        let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
        if (!testFileType) {
          this.$message.warning("上传的文件格式错误!");
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.warning("上传文件大小不能超过 2MB!");
          return false;
        }
        return true;
      },
      /*
        选择及分页事件处理
      */
      // 列表选择事件
      handleListSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleListSelectChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        // for (let i = 0, length = val.length; i < length; i++) {
        //
        // }
      },
      // 论坛列表分页
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchForumList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchForumList();
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 10px 10px 10px 20px;
  }

  .top_line {
    border-bottom: 1px solid #cdcdcd;
  }

  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }

  .btn-row {
    margin-bottom: 20px;
  }
  .dialog-footer {
    text-align: center;
    padding: 0 0 20px 0;
  }

  .pagination {
    text-align: right;
    margin: 10px;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 110px;
    height: 110px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
  .img{
    width: 130px;
    height: 90px;
  }
  .item{
    margin: 20px 0;
  }
  .itemtitle{
    display: inline-block;
    vertical-align: top;
    width: 110px;
    text-align: right;
  }

</style>
<style lang="scss" scoped>
  /deep/.el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
    width: 180px;
  }
  /deep/.el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--mini .el-input  .el-input__inner{
    height: 40px;
    line-height: 40px;
    width: 160px;
  }
  /deep/.el-select--small{
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--small   .el-input  .el-input__inner{
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-pagination .el-select .el-input .el-input__inner{
    height: 28px;
    line-height: 28px;
    width: 100px;
  }
  /deep/.el-form-item--mini .el-form-item__label{
    line-height: 20px;
  }
  /deep/.el-form-item--small .el-form-item__label{
    line-height: 18px;
  }
  /deep/.el-form-item--mini{
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }
  /deep/.el-form-item--small{
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
  }
  /deep/.el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  /deep/.el-table__header tr,
  /deep/.el-table__header th {
    padding: 0;
    height: 42px;
  }
  /deep/.el-table__body tr,
  /deep/.el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
<style>
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
