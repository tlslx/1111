/**
* @file 广交会-听众信息管理
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">{{source.language.audienceInfoManagement}}</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item :label="source.language.name" size="mini">
        <el-input v-model.trim="ruleForm.audienceName" :placeholder="source.language.pleaseEnterContent"></el-input>
      </el-form-item>
      <el-form-item :label="source.language.companyName" size="mini">
        <el-input v-model.trim="ruleForm.companyName" :placeholder="source.language.pleaseEnterContent"></el-input>
      </el-form-item>
      <el-form-item :label="source.language.isImportantClient" size="mini">
        <el-select v-model="ruleForm.isImportant" :placeholder="source.language.pleaseSelect">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="source.language.industry" size="mini">
        <el-select v-model="ruleForm.industryId" :placeholder="source.language.pleaseSelect" @change="industryChange">
          <el-option v-for="(profession,index) in industrys" :label="profession.industryName" :value="profession.industryId" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="source.language.exhibition" size="mini">
        <el-select v-model="ruleForm.exhibitionId" :placeholder="source.language.pleaseSelect">
          <el-option v-for="(exhibition,index) in exhibitions" :key="index" :label="exhibition.exhibitionName" :value="exhibition.exhibitionId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="handleSearch()">{{source.language.query}}</el-button>
        <el-button type="primary" @click="resetSearchForm()">{{source.language.reset}}</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" @click="handleAddAudience()">{{source.language.add}}</el-button>
      <el-button type="primary" @click="openImportDialog()">{{source.language.import}}</el-button>
      <el-button type="warning" :disabled="deleteBtn" @click="deleteMuitlAudience()">{{source.language.delete}}</el-button>
    </el-row>
    <template>
      <el-table
        ref="multipleTable"
        :data="audiencesData"
        class="table"
        border
        @select-all="handleTabSelectAll"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          fixed="left"
          width="80">
        </el-table-column>

        <el-table-column
          prop="audienceName"
          :label="source.language.name"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          :label="source.language.companyName"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="audiencePosition"
          :label="source.language.position"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="audienceMobile"
          :label="source.language.mobile"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="audienceEmail"
          :label="source.language.email"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="isImportant"
          :label="source.language.isImportantClient"
          width="150"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.isImportant ? "是": "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="industryName"
          :label="source.language.industry"
          align="center">
        </el-table-column>
        <el-table-column
          prop="exhibitionName"
          :label="source.language.exhibition"
          align="center">
        </el-table-column>
        <el-table-column
          :label="source.language.operation"
          align="center"
          fixed="right"
          width="160">
          <template slot-scope="scope">
            <el-button  type="text" size="mini" @click="handleUpdateAudience(scope.row, scope.index)">{{source.language.update}}</el-button>
            <el-button  type="text" size="mini" @click="handleDeleteAudience(scope.row, scope.index)">{{source.language.delete}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDatas"
        :prev-text="source.language.prvPage"
        :next-text="source.language.nextPage">
      </el-pagination>
    </template>

    <el-dialog :title="audienceDialogTitle" :visible.sync="addDialog" :close-on-click-modal="false"  width="450px">
      <el-form :model="addAudienceForm" label-position="right" ref="addAudienceForm" :rules="rules" label-width="110px">
        <el-form-item :label="source.language.name"  size="small" prop="audienceName">
          <el-input type="text" maxlength="50" v-model.trim="addAudienceForm.audienceName" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item  :label="source.language.companyName" size="small" prop="companyName">
          <el-input type="text" maxlength="50" v-model.trim="addAudienceForm.companyName" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item  :label="source.language.position" size="small" prop="audiencePosition">
          <el-input type="text" maxlength="32" v-model.trim="addAudienceForm.audiencePosition" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item  :label="source.language.mobile" size="small" prop="audienceMobile">
          <el-input v-model.trim="addAudienceForm.audienceMobile" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.email" size="small" prop="audienceEmail">
          <el-input v-model.trim="addAudienceForm.audienceEmail" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.industry" size="small" prop="industryId">
          <el-select v-model="addAudienceForm.industryId" placeholder="请选择" class="dialog_item" @change="addIndustryChange">
            <el-option label="为空" value=""></el-option>
            <el-option v-for="(profession,index) in industrys" :key="index" :label="profession.industryName" :value="profession.industryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="source.language.exhibition" size="small" prop="exhibitionId">
          <el-select v-model="addAudienceForm.exhibitionId" placeholder="请选择" class="dialog_item">
            <el-option label="为空" value=""></el-option>
            <el-option v-for="(exhibition,index) in exhibitions" :key="index" :label="exhibition.exhibitionName" :value="exhibition.exhibitionId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="source.language.isImportantClient" size="small" prop="isImportant">
          <el-select v-model="addAudienceForm.isImportant" placeholder="请选择" class="dialog_item">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="confirmAudienceForm()">{{source.language.confirm}}</el-button>
        <el-button @click="addDialog = false">{{source.language.cancel}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="source.language.import" :visible.sync="importDialog" :close-on-click-modal="false"  width="400px">
      <el-form  label-position="right" :inline="true"  label-width="110px">
        <el-form-item :label="source.language.attachment">
          <!--:show-file-list="false"-->
          <el-upload
            class="upload-demo"
            :headers="header"
            :action="uploadApi"
            :on-exceed="templateExceed"
            :before-upload="templateBeforeUpload"
            :on-remove="templateRemove"
            :on-success="templateUploadSuccess"
            :on-error="templateUploadError"
            :file-list="files"
            ref="fujianupload">
            <el-button  slot="trigger" size="small" type="primary" style="padding: 0 30px;height: 30px">{{source.language.import}}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <a :href="require('@/theme/framework/file/会议论坛听众导入模板.xlsx')"  style="margin-left: 20px">{{source.language.downloadTemplate}}</a>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="confirmCloseImport()">{{source.language.close}}</el-button>
      </div>
    </el-dialog>

    <!--查看重复数据列表-->
    <el-dialog :title="source.language.repeatInfoTips"  width="600px" :visible.sync="repeatListDialog" :close-on-click-modal="false">
      <el-table
        :data="repeatList"
        border
        @select-all="handleRepeatSelectAll"
        @selection-change="handleRepeatSelectionChange"
      >
        <el-table-column
          type="selection"
          width="60">
        </el-table-column>
        <el-table-column
          prop="audienceName"
          :label="source.language.name"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          :label="source.language.companyName"
          align="center">
        </el-table-column>
        <el-table-column
          prop="audienceMobile"
          :label="source.language.mobile"
          align="center">
        </el-table-column>
        <el-table-column
          :label="source.language.operation"
          align="center"
          fixed="right"
          width="160">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewAudience(scope.row, scope.$index)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleRepeatListSizeChange"
        @current-change="handleRepeatListCurrentChange"
        :current-page.sync="repeatForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="repeatForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="repeatTotal"
        :prev-text="source.language.prvPage"
        :next-text="source.language.nextPage">
      </el-pagination>
      <div class="dialog-footer">
        <el-button type="warning" :disabled="replaceBtn" @click="openReplace()">{{source.language.replaceOrgData}}</el-button>
        <el-button type="primary" :disabled="replaceBtn" @click="openKeep()">{{source.language.keepOrgData}}</el-button>
      </div>
    </el-dialog>

    <!--信息对比-->
    <el-dialog :title="source.language.repeatInfoCompare"  width="600px" :visible.sync="repeatDetailDialog" :close-on-click-modal="false">
      <div class="line">
        <div class="one"></div>
        <div class="two" style="color: blue;">{{source.language.originalData}}</div>
        <div class="two" style="color: red">{{source.language.newData}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.name}}</div>
        <div class="two">{{oldAudienceDetail.audienceName}}</div>
        <div class="two">{{newAudienceDetail.audienceName}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.companName}}</div>
        <div class="two">{{oldAudienceDetail.companyName}}</div>
        <div class="two">{{newAudienceDetail.companyName}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.position}}</div>
        <div class="two">{{oldAudienceDetail.audiencePosition}}</div>
        <div class="two">{{newAudienceDetail.audiencePosition}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.mobile}}</div>
        <div class="two">{{oldAudienceDetail.audienceMobile}}</div>
        <div class="two">{{newAudienceDetail.audienceMobile}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.email}}</div>
        <div class="two">{{oldAudienceDetail.audienceEmail}}</div>
        <div class="two">{{newAudienceDetail.audienceEmail}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.isImportantClient}}</div>
        <div class="two">{{oldAudienceDetail.isImportant}}</div>
        <div class="two">{{newAudienceDetail.isImportant}}</div>
      </div>
      <div class="line">
        <div class="one">{{source.language.industry}}</div>
        <div class="two">{{oldAudienceDetail.industryName}}</div>
        <div class="two">{{newAudienceDetail.industryName}}</div>
      </div>
      <div class="line" style="border-bottom: 1px solid #d6d6d6;">
        <div class="one">{{source.language.exhibition}}</div>
        <div class="two">{{oldAudienceDetail.exhibitionName}}</div>
        <div class="two">{{newAudienceDetail.exhibitionName}}</div>
      </div>
      <div class="dialog-footer">
        <el-button type="warning" @click="openReplace('id')">{{source.language.replaceOrgData}}</el-button>
        <el-button type="primary" @click="openKeep('id')">{{source.language.keepOrgData}}</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  import axios from 'axios';
  export default {
    name: "audienceInformationManage",
    mixins: [dialogMixin],
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (value == null || value === '') {
          return callback();
        }
        if (!MOBILE.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        } else {
          return callback();
        }
      };
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error('输入不能包含特殊字符'));
        } else {
          return callback();
        }
      };
      return {
        header: {
          Token: this.$store.state.token
        },
        addDialog: false,
        importDialog: false,
        repeatListDialog: false,
        repeatDetailDialog: false,
        replaceBtn: true,
        deleteBtn: true,

        files: [],
        downUrl: '',
        ruleForm: {
          audienceName: '',
          companyName: '',
          industryId: '',
          exhibitionId: '',
          isImportant: '',
          current: 1,
          size: 10
        },
        addAudienceForm: {
          audienceId: '',
          audienceName: '',
          audienceMobile: '',
          audienceEmail: '',
          companyName: '',
          audiencePosition: '',
          isImportant: '',
          exhibitionId: '',
          industryId: ''
        },
        isAdd: false,
        audienceDialogTitle: '新增听众信息',
        totalDatas: 0,
        audiencesData: [],
        industrys: [],
        exhibitions: [],
        audienceIds: [],
        repeatList: [],
        repeatTotal: 0,
        repeatForm: {
          current: 1,
          size: 10
        },

        oldAudienceDetail: {},
        newAudienceDetail: {},
        audienceTempIds: [],
        audienceTempId: '',
        source: {
          language: []
        },

        uploadApi: '',
        rules: {
          audienceName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ],
          audienceEmail: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          audienceMobile: [
            { required: false, validator: validateMobile, trigger: 'blur' }
          ],
          companyName: [
            { required: false, validator: validateSpecial, trigger: 'blur' }
          ],
          audiencePosition: [
            { required: false, validator: validateSpecial, trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.uploadApi = this.baseApi + "/api/customservice/forum/importAudience";
      this.downUrl = this.baseApi + "/api/customservice/forum/downloadAudienceTemplate";
      this.getIndustryList();
      // this.getExhibitionList();
      this.getAudienceList();
    },
    methods: {
      /*
         事件处理
       */
      handleTabSelectAll(val) {
        this.audienceIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.audienceIds.push(val[i].audienceId);
        }
        if (this.audienceIds.length <= 0) {
          this.deleteBtn = true;
        } else {
          this.deleteBtn = false;
        }
      },
      handleSelectionChange(val) {
        this.audienceIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.audienceIds.push(val[i].audienceId);
        }
        if (this.audienceIds.length <= 0) {
          this.deleteBtn = true;
        } else {
          this.deleteBtn = false;
        }
      },
      // 文件上传
      templateExceed() {
        this.$message.error("只能上传一个文件");
      },
      templateBeforeUpload(file) {
        // 格式及大小判断
        if (this.uploadFileTypeJuge(file)) {
          return true;
        } else {
          return false;
        }
      },
      templateRemove(file, fileList) {

      },
      templateUploadSuccess(res, file) {
        if (res.flag === "0") {
          this.$message.error(res.message);
          this.$refs.fujianupload.clearFiles();
        } else {
          this.$message.success("数据导入成功");
          this.$refs.fujianupload.clearFiles();
          this.getRepeatList();
          this.getAudienceList();
        }
      },
      templateUploadError() {
        this.$message.error("数据导入错误");
      },
      uploadFileTypeJuge(file) {
        // 进行pdf格式及大小验证 application/vnd.ms-excel
        let testXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        let testXls = file.type === "application/vnd.ms-excel";
        if (!testXlsx && !testXls) {
          this.$message.warning("文件格式上传错误!");
          return false;
        }
        const isLt1M = file.size / 1024 / 1024 < 0.2;
        if (!isLt1M) {
          this.$message.warning("上传文件不能超过1000行数据!");
          return false;
        }
        return true;
      },
      downloadTemplate() {
        axios.get(this.downUrl,
          {
            responseType: 'blob',
            headers: { Token: this.$store.state.token }
          }).then(function(response) {
            let blob = new Blob([response.data]);
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = '用户数据.xlsx'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          }).catch(function(error) {

          });
      },
      // 分页处理
      handleSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.getAudienceList();
      },
      handleCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.getAudienceList();
      },
      // 更新听众信息
      handleUpdateAudience(row, index) {
        if (this.$refs.addAudienceForm !== undefined) {
          this.$refs.addAudienceForm.resetFields();
        }
        this.addDialog = true;
        this.isAdd = false;
        this.audienceDialogTitle = "更新听众信息";
        this.getIndustryList();
        // this.getExhibitionList();
        this.addAudienceForm.audienceId = row.audienceId;
        this.getAudienceById(row.audienceId);
      },
      // 添加听众信息
      handleAddAudience() {
        if (this.$refs.addAudienceForm !== undefined) {
          this.$refs.addAudienceForm.resetFields();
        }
        this.addDialog = true;
        this.isAdd = true;
        this.getIndustryList();
        // this.getExhibitionList();
        this.resetAddAudienceForm();
        this.audienceDialogTitle = "添加听众信息";
      },
      // 单个删除听众
      handleDeleteAudience(row, index) {
        this.showDialogTips("确认删除该信息?").then(() => {
          this.deleteAudienceRequest(row.audienceId);
        }).catch(() => {});
      },
      // 批量删除听众
      deleteMuitlAudience() {
        this.showDialogTips("确认删除选中的听众信息?").then(() => {
          this.deleteAudienceRequest(this.audienceIds.join());
        }).catch(() => {});
      },
      // 重置表单
      resetSearchForm() {
        this.ruleForm.audienceName = '';
        this.ruleForm.companyName = '';
        this.ruleForm.industryId = '';
        this.ruleForm.exhibitionId = '';
        this.ruleForm.isImportant = '';
        this.ruleForm.current = 1;
      },
      // 重置新增的表单
      resetAddAudienceForm() {
        this.addAudienceForm.audienceMobile = '';
        this.addAudienceForm.audienceId = '';
        this.addAudienceForm.audienceName = '';
        this.addAudienceForm.audienceEmail = '';
        this.addAudienceForm.companyName = '';
        this.addAudienceForm.audiencePosition = '';
        this.addAudienceForm.isImportant = '';
        this.addAudienceForm.exhibitionId = null;
        this.addAudienceForm.industryId = null;
      },
      // 新增或者更新听众信息提交
      confirmAudienceForm() {
        this.$refs["addAudienceForm"].validate((valid) => {
          if (valid) {
            if (this.isAdd) {
              this.addAudienceInfo();
            } else {
              this.updateAudienceById();
            }
          }
        });
      },
      /*
        后台数据交互  0否  1是
       */
      industryChange(val) {
        this.exhibitions = [];
        this.getExhibitionList(val);
      },
      addIndustryChange(val) {
        this.exhibitions = [];
        this.getExhibitionList(val);
      },
      // 获取行业列表
      getIndustryList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listIndustry', { size: 50 }).then(res => {
          this.industrys = res.records;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取展区列表
      getExhibitionList(industryId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/listExhibitionSetAll', { industryId: industryId }).then(res => {
          this.exhibitions = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleSearch() {
        this.ruleForm.current = 1;
        this.getAudienceList();
      },
      // 获取听众列表
      getAudienceList(flag) {
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listAudience', this.ruleForm).then(res => {
          this.audiencesData = res.records;
          this.totalDatas = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取听众详情
      getAudienceById(audienceId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getAudience', { audienceId: audienceId }).then(res => {
          this.addAudienceForm.audienceName = res.audienceName;
          this.addAudienceForm.audienceEmail = res.audienceEmail;
          this.addAudienceForm.audienceMobile = res.audienceMobile;
          this.addAudienceForm.audiencePosition = res.audiencePosition;
          this.addAudienceForm.companyName = res.companyName;
          if (res.isImportant) {
            this.addAudienceForm.isImportant = '1';
          } else {
            this.addAudienceForm.isImportant = '0';
          }
          this.addAudienceForm.exhibitionId = res.exhibitionId;
          this.addAudienceForm.industryId = res.industryId;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 增加听众
      addAudienceInfo() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/saveAudience', this.addAudienceForm).then(res => {
          this.$message.success("新增成功");
          this.addDialog = false;
          this.getAudienceList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 更新听众
      updateAudienceById() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/updateAudience', this.addAudienceForm).then(res => {
          this.$message.success("更新成功");
          this.addDialog = false;
          this.getAudienceList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      deleteAudienceRequest(audienceIds) {
        this.$http.post(this.baseApi + '/api/customservice/forum/deleteAudiences', { audienceIds: audienceIds }).then(res => {
          this.$message.success("删除成功");
          this.getAudienceList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      openImportDialog() {
        this.importDialog = true;
      },
      // 导入数据
      importDataFromFile() {
        this.$http.post(this.baseApi + '/api/customservice/forum/importAudience').then(res => {
          this.$message.success("导入成功");
          this.getAudienceList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取重复列表
      getRepeatList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listRepeatAudience', this.repeatForm).then(res => {
          this.repeatList = res.records;
          this.repeatTotal = res.total;
          if (this.repeatList.length > 0) {
            this.repeatListDialog = true;
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取原始数据
      getOldAudienceDetail(audienceTempId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getAudienceByTempId', {
          audienceTempId: audienceTempId
        }).then(res => {
          this.oldAudienceDetail = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 查看重复信息
      viewAudience(row, index) {
        this.repeatDetailDialog = true;
        this.newAudienceDetail = row;
        this.audienceTempId = row.audienceTempId;
        this.getOldAudienceDetail(row.audienceTempId);
      },
      handleRepeatListSizeChange(pageSize) {
        this.repeatForm.size = pageSize;
        this.getRepeatList();
      },
      handleRepeatListCurrentChange(currentPage) {
        this.repeatForm.current = currentPage;
        this.getRepeatList();
      },
      handleRepeatSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleRepeatSelectionChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.audienceTempIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.audienceTempIds.push(val[i].audienceTempId);
        }
        if (this.audienceTempIds.length <= 0) {
          this.replaceBtn = true;
        } else {
          this.replaceBtn = false;
        }
      },
      openReplace(model) {
        if (model === 'id') {
          this.replaceOldData(this.audienceTempId);
        } else {
          this.replaceOldData(this.audienceTempIds.join());
        }
      },
      openKeep(model) {
        if (model === 'id') {
          this.keepOldData(this.audienceTempId);
        } else {
          this.keepOldData(this.audienceTempIds.join());
        }
      },
      // 替换数据
      replaceOldData(audienceTempIds) {
        this.$http.post(this.baseApi + '/api/customservice/forum/replaceAudience', {
          audienceTempIds: audienceTempIds
        }).then(res => {
          this.$message.success("替换成功");
          this.repeatDetailDialog = false;
          this.getRepeatList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 保留原来数据
      keepOldData(audienceTempIds) {
        this.$http.post(this.baseApi + '/api/customservice/forum/reservedAudience', {
          audienceTempIds: audienceTempIds
        }).then(res => {
          this.$message.success("保留成功");
          this.repeatDetailDialog = false;
          this.getRepeatList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      confirmCloseImport() {
        this.importDialog = false;
        this.getAudienceList();
      }
    }

  };
</script>

<style scoped>
  .container{
    margin: 10px;
  }
  .top_line{
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }
  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .line{
    display: flex;
    width: 580px;
    height: 35px;
    margin: 0 10px;
    align-items: center;
    border-top: 1px solid #d6d6d6;
  }
  .line .one{
    height: 35px;
    line-height: 35px;
    text-align: right;
    width: 30%;
    font-weight: bold;
    padding-right: 5px;
    border-right: 1px solid #d6d6d6;
    border-left: 1px solid #d6d6d6;
  }
  .line .two{
    height: 35px;
    line-height: 35px;
    text-align: center;
    width: 35%;
    border-right: 1px solid #d6d6d6;
  }
  .dialog_item{
    width: 230px;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .dialog-footer{
    text-align: center;
    margin-top: 10px;
  }
  .btn-row{
    margin-left: 20px;
    margin-bottom: 20px;
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
    width: 110px;
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
</style>
<style>
  .table{
    width: 95%;
    margin-left: 20px;
  }
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
  /*.el-input--mini .el-input__inner {*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*width: 180px;*/
  /*}*/
  /*.el-input--small .el-input__inner {*/
    /*height: 36px;*/
    /*line-height: 36px;*/
    /*width: 280px;*/
  /*}*/
  /*.el-select--mini .el-input  .el-input__inner{*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*width: 160px;*/
  /*}*/
  /*.el-select--small{*/
    /*line-height: 36px;*/
    /*width: 280px;*/
  /*}*/
  /*.el-select--small   .el-input  .el-input__inner{*/
    /*height: 36px;*/
    /*line-height: 36px;*/
    /*width: 280px;*/
  /*}*/
  /*.el-pagination .el-select .el-input .el-input__inner{*/
    /*height: 28px;*/
    /*line-height: 28px;*/
    /*width: 110px;*/
  /*}*/
  /*.el-form-item--mini .el-form-item__label{*/
    /*line-height: 20px;*/
  /*}*/
  /*.el-form-item--small .el-form-item__label{*/
    /*line-height: 18px;*/
  /*}*/
  /*.el-form-item--mini{*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*vertical-align: middle;*/
  /*}*/
  /*.el-form-item--small{*/
    /*height: 36px;*/
    /*line-height: 36px;*/
    /*vertical-align: middle;*/
  /*}*/

</style>

