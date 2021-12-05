/**
 * @file 公司资料审核list---工作部审核
 */
 <style scoped>
  .btn-text{
    text-decoration: underline;
  }
  .btn-textnot{
    text-decoration: underline;
  }
  .enter-download-btn {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0!important;
    padding: 0!important;
  }
  .enter-preview-btn {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0!important;
    padding: 5px 0!important;
  }
  .audit-result-form-dialog >>> .el-dialog {
    width: 600px;
  }
  .audit-result-form-dialog >>> .el-dialog__body {
    padding-bottom: 7px;
  }
  .audit-result-form-btn {
    margin-bottom: 25px;
    text-align: center;
  }
  .audit-result-table-dialog >>> .el-textarea {
    width: 100%;
  }
  .audit-table-operate-bar {
    padding: 15px 0;
    text-align: center;
  }
  .audit-table-operate-comfirm-bar {
    padding-bottom: 15px;
    text-align: center;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="企业重要信息修改审核" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="toSearch"
      ></search-param-link>
      <!-- @sort-by-up="sortUpByModifyDate"
      @sort-by-down="sortDownByModifyDate" -->
      <el-table :data="tableData" border :header-cell-style="tableHeaderColor" v-loading="loading">
        <el-table-column prop="cantonCode" label="广交会编码"></el-table-column>
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="colComment" label="修改内容"></el-table-column>
        <el-table-column prop="oldContent" label="由">
          <template slot-scope="scope">
            {{ getOldContent(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="newContent" label="改成">
          <template slot-scope="scope">
            {{ getNewContent(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column label="证明文件" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.proofUrl" @click.native="download(scope.row)" type="text" size="small">
              下载
            </el-button>
            <el-button v-if="showPreviewButton(scope.row)" @click.native="reviewOnline(scope.row)" type="text" size="small">
              在线预览
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="modifyDate" label="提交时间"></el-table-column>
        <el-table-column label="交易团初审" prop="deleApproveResult">
          <template slot-scope="scope">
            <template v-if="scope.row.deleApproveResult === '不通过'">
              <span v-if="scope.row.approveExplain && scope.row.approveExplain !== ''">不通过，原因：{{ scope.row.approveExplain }}</span>
              <span v-else>不通过</span>
            </template>
            <template v-else>{{ scope.row.deleApproveResult }}</template>
          </template>
        </el-table-column>
        <el-table-column label="大会审核" width="200" fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.colname === 'import_export_code' || scope.row.colname === 'business_licence_no'"><span>交易团通过即生效</span></template>
            <template v-else-if="scope.row.deleApproveResult === '不通过'"><span></span></template>
            <template v-else>
               <template v-if="scope.row.approveResult === '待审核' && scope.row.deleApproveResult === '通过'">
                <el-button @click.native="auditPass(scope.row)" type="text" size="small" class="btn-text">
                  审核通过
                </el-button>
                <el-button @click.native="auditNoPass(scope.row)" type="text" size="small" class="btn-textnot">
                  审核不通过
                </el-button>
              </template>
              <template v-else-if="scope.row.approveResult === '不通过'">
                <span v-if="scope.row.approveExplain && scope.row.approveExplain !== ''">不通过，原因：{{ scope.row.approveExplain }}</span>
                <span v-else>不通过</span>
              </template>
              <template v-else>{{ scope.row.approveResult }}</template>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
      <!-- 单个审核重要信息修改的数据开始 -->
      <el-dialog class="audit-result-form-dialog" title="审核窗口" :auditInfo="auditInfo" :visible.sync="auditResultDialogVisible">
        <el-form ref="auditResultForm" :model="auditResultForm" :rules="rules" label-width="80px">
          <el-form-item label="审核说明" prop="approveExplain">
            <el-input style="width: 480px;" type="textarea" maxlength="500" :autosize="{ minRows: 4 }" placeholder="审核说明" v-model="auditResultForm.approveExplain"></el-input>
          </el-form-item>
        </el-form>
        <div class="audit-result-form-btn">
          <el-button type="primary" @click="confirmReason">确认</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </div>
      </el-dialog>
      <!-- 单个审核重要信息修改的数据结束 -->
      <!-- 批量审核企业中文名称和企业简称开始 -->
      <el-dialog class="audit-result-table-dialog" title="审核窗口" :auditTableInfo="auditTableInfo" :visible.sync="auditTableResultDialogVisible" v-loading="batchingLoading">
        <el-table border :data="getBatchAuditImportInfo" size="mini" :header-cell-style="tableHeaderColor">
          <el-table-column prop="cantonCode" label="广交会编码"></el-table-column>
          <el-table-column prop="companyName" label="企业名称"></el-table-column>
          <el-table-column prop="colComment" label="修改内容"></el-table-column>
          <el-table-column prop="oldContent" label="由">
            <template slot-scope="scope">
              {{ getOldContent(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column prop="newContent" label="改成">
            <template slot-scope="scope">
              {{ getNewContent(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column label="证明文件">
            <template slot-scope="scope">
              <el-button class="btn-text enter-download-btn" v-if="scope.row.proofUrl" @click.native="download(scope.row)" type="text" size="small">
                下载
              </el-button>
              <el-button class="btn-text enter-preview-btn" v-if="showPreviewButton(scope.row)" @click.native="reviewOnline(scope.row)" type="text" size="small">
                在线预览
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="modifyDate" label="提交时间"></el-table-column>
          <el-table-column label="交易团初审状态" width="200">
            <template slot-scope="scope">
              <template v-if="scope.row.approveResult === '不通过'">
                <span v-if="scope.row.approveExplain && scope.row.approveExplain !== ''">不通过，原因：{{ scope.row.approveExplain }}</span>
                <span v-else>不通过</span>
              </template>
              <template v-else>{{ scope.row.approveResult }}</template>
            </template>
          </el-table-column>
          <!-- <el-table-column label="大会审核">
            <template slot-scope="scope">
              <template v-if="scope.row.colname === 'import_export_code' || scope.row.colname === 'business_licence_no'"><span>交易团通过即生效</span></template>
              <template v-else-if="scope.row.approveResult === '不通过'"><span></span></template>
              <template v-else>
                <template v-if="scope.row.ifdeal === '不通过'">
                  <span v-if="scope.row.approveExplain && scope.row.approveExplain !== ''">不通过，原因：{{ scope.row.approveExplain }}</span>
                  <span v-else>不通过</span>
                </template>
                <template v-else>{{ scope.row.ifdeal }}</template>
              </template>
            </template>
          </el-table-column> -->
        </el-table>
        <div class="audit-table-operate-bar">
          <el-radio v-model="batchAuditPassStatus" label="1" @change="auditTablePass">通过</el-radio>
          <el-radio v-model="batchAuditPassStatus" label="2" @change="auditTableNotPass">不通过</el-radio>
        </div>
        <el-form v-if="batchAuditNoPassForm" class="audit-table-result-form" ref="auditTableResultForm" :model="auditTableResultForm" :rules="rules" label-width="80px">
          <el-form-item label="审核说明" prop="approveExplain">
            <el-input type="textarea" maxlength="500" :autosize="{ minRows: 4 }" placeholder="审核说明" v-model="auditTableResultForm.approveExplain"></el-input>
          </el-form-item>
        </el-form>
        <div class="audit-table-operate-comfirm-bar">
          <el-button type="primary" size="mini" @click="confirmBatchAudit">确认</el-button>
          <el-button type="primary" size="mini" @click="cancelBatchAudit">取消</el-button>
        </div>
      </el-dialog>
      <!-- 批量审核企业中文名称和企业简称结束 -->
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img v-if="isImg" :src="imgSrcBig" width="100%">
        <!-- <a v-else :href="previewHref"></a> -->
        <!-- <iframe :src="previewHref" frameborder="0"></iframe> -->
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "search-param-link": searchParamLinkage,
    "pagination": pagination
  },
  data() {
    return {
      // 文件下载base地址
      baseApi: process.env.API_OS_URL,
      // 审核原因弹出框默认不显示
      auditResultDialogVisible: false,
      // 审核对象数据
      auditInfo: {},
      // 审核原因model
      auditResultForm: {
        approveExplain: ''
      },
      rules: {
        approveExplain: [
          { required: true, message: '请输入审核原因', trigger: 'blur' }
        ]
      },
      // 是否需要显示批量审核不通过输入框
      batchAuditNoPassForm: false,
      batchingLoading: false,
      // 批量审核企业中文名称和企业简称
      batchAuditPassStatus: '',
      // 审核企业中文名称和企业简称弹出框默认不显示
      auditTableResultDialogVisible: false,
      // 批量审核企业中文名称和企业简称数据
      auditTableInfo: {},
      // 批量审核不通过企业中文名称和企业简称原因model
      auditTableResultForm: {
        approveExplain: ''
      },
      // 默认为预览图片
      isImg: true,
      //  预览文件路径href
      previewHref: '',
      // 大图地址
      imgSrcBig: '',
      // 默认不显示大图
      dialogVisible: false,
      // 按修改内容排序
      editContent: '',
      // tab
      activeName: 0,
      //
      isDele: true,
      // 未审核
      isAudit: true,
      // 设置table的loading变量
      loading: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "ifdeal",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            type: "input",
            width: "115px"
          },
          {
            prop: "cantonCode",
            label: "广交会编码",
            value: "",
            type: "input",
            width: "115px"
          },
          {
            prop: "ifdeal",
            label: "审核状态",
            value: "",
            type: "select",
            width: "115px"
          },
          {
            prop: "isAsc",
            label: "按申请时间排序",
            value: "",
            type: "select",
            width: "115px"
          },
          {
            prop: "colname",
            label: "按修改内容筛选",
            value: "",
            type: "select",
            width: "115px"
          },
          {
            prop: "deleApproveResult",
            label: "按交易团初审筛选",
            value: "",
            type: "select",
            width: "125px"
          },
          {
            prop: "businessDelegationId",
            label: "按交易团筛选",
            value: "",
            type: "select",
            width: "115px"
          }
        ]
      },
      // 表格数据
      tableData: [],
      // 字典
      dictionary: {
        "ifdeal": [
          {
            value: "0",
            label: "审核不通过"
          },
          {
            value: "1",
            label: "审核通过"
          },
          {
            value: 'null',
            label: "待审核"
          }
        ],
        "colname": [
          {
            value: "company_name",
            label: "企业名称（中文）"
          },
          {
            value: "company_name_en",
            label: "企业名称（英文）"
          },
          {
            value: 'customs_code',
            label: "海关编码"
          },
          {
            value: "import_export_code",
            label: "进出口代码"
          },
          {
            value: 'business_licence_no',
            label: "企业统一社会信用代码"
          },
          {
            value: 'enterprise_abbreviation',
            label: "企业简称"
          }
        ],
        "isAsc": [
          {
            value: "1",
            label: "按申请时间升序"
          },
          {
            value: "0",
            label: "按申请时间倒序"
          }
        ],
        "deleApproveResult": [
          {
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "通过"
          }
        ],
        "businessDelegationId": []
      },
      // 初始化分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 20px 0;text-align: center;"
      },
      // 传参
      searchParams: {
        "companyImportColumnSelectSession": {},
        "pageStart": "1",
        "pageSize": "10"
      }
    };
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getWorkImportCompany', 'getBatchAuditImportInfo']),
    ...mapGetters('common', ['commonDeleData'])
  },
  created() {
    // 初始列表
    this.searchParams.companyImportColumnSelectSession.ifdeal = 'null';
    // this.searchParams.companyImportColumnSession.auditResults = '2';
    this.searchParamsForm.data.forEach((value) => {
      if (value.prop === 'ifdeal') {
        value.value = 'null';
      }
    });
    this.getDeleInfos().then(() => {
      this.dictionary.businessDelegationId = this.commonDeleData;
    });
    this.loading = true;
    this.getWorkImportCompanyInfo(this.searchParams).then(res => {
      this.loading = false;
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = 10;
      this.tableData = res.records;
      this.pageInfo.total = res.total;
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('corpDataManagement', ['getWorkImportCompanyInfo', 'getreviewCompanyImportInfo', 'getBatchImportCompanyInfo', 'batchAuditCompanyNameAndAbbreviation']),
    ...mapActions('file', ['downloadFileInfo', 'selectFileInfo']),
    ...mapActions('common', ['getDeleInfos']),
    // 获取“由”的信息
    getOldContent(row) {
      if (row.oldContent && row.oldContent !== '') {
        return row.oldContent.replace('-', '');
      } else {
        return row.oldContent;
      }
    },
    // 获取“改成”的信息
    getNewContent(row) {
      if (row.newContent && row.newContent !== '') {
        return row.newContent.replace('-', '');
      } else {
        return row.newContent;
      }
    },
    // 是否显示在线预览按钮
    showPreviewButton(row) {
      if (row.proofUrlName && row.proofUrlName !== '') {
        let fileTypeName = '';
        let index = row.proofUrlName.lastIndexOf('.');
        if (index > -1) {
          fileTypeName = row.proofUrlName.substring(index + 1, row.proofUrlName.length);
          if (fileTypeName === 'jpg' || fileTypeName === 'jpeg' || fileTypeName === 'png' || fileTypeName === 'bmp' || fileTypeName === 'gif'
          // || fileTypeName === 'pdf'
          // || fileTypeName === 'PDF'
          || fileTypeName === 'JPG' || fileTypeName === 'JPEG' || fileTypeName === 'PNG' || fileTypeName === 'BMP' || fileTypeName === 'GIF') {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    },
    // 是否显示工作部审核一栏
    showAuditStatus() {},
    // 在线预览
    reviewOnline(row) {
      if (row.proofUrl && row.proofUrl !== '') {
        let fileTypeName = '';
        let index = row.proofUrlName.lastIndexOf('.');
        if (index > -1) {
          fileTypeName = row.proofUrlName.substring(index + 1, row.proofUrlName.length);
          if (fileTypeName === 'jpg' || fileTypeName === 'jpeg' || fileTypeName === 'png' || fileTypeName === 'bmp' || fileTypeName === 'gif'
          || fileTypeName === 'JPG' || fileTypeName === 'JPEG' || fileTypeName === 'PNG' || fileTypeName === 'BMP' || fileTypeName === 'GIF') {
            this.isImg = true;
            this.imgSrcBig = process.env.API_OS_URL + "/efOS/file/getImgByUrl?fileId=" + row.proofUrl + '&fileUrl=exhibitor_amend';
          }
          //  else if (fileTypeName === 'pdf' || fileTypeName === 'PDF') {
          //   this.isImg = false;
            // this.previewHref = process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + row.proofUrl;
            // this.selectFileInfo(row.proofUrl).then((res) => {
            //   this.previewHref = res.fileContent;
            // });
          // }
          this.dialogVisible = true;
        } else {
          this.dialogVisible = false;
        }
      }
    },
    // 下载
    download(row) {
      let url = this.baseApi + '/efOS/file/downloadFileByUrl?fileId=' + row.proofUrl + '&fileUrl=exhibitor_amend';
      if (row.proofUrl !== '') {
        window.open(url);
      } else {
        this.$message({
          showClose: true,
          message: '图片地址为空',
          type: 'error'
        });
      }
    },
    // 按申请时间升序排序
    // sortUpByModifyDate() {
    //   let params = {
    //     "companyImportColumnSelectSession": {
    //       "isAsc": "1"
    //     },
    //     "pageStart": "1",
    //     "pageSize": this.pageInfo.pageSize
    //   };
    //   this.searchParamsForm.data[2].value = "";
    //   this.loading = true;
    //   this.getWorkImportCompanyInfo(params).then(res => {
    //     //设置table的loading变量
    //     this.loading = false;
    //     this.tableData = res.records;
    //     this.pageInfo.total = res.total;
    //   });
    // },
    // // 按申请时间降序排序
    // sortDownByModifyDate() {
    //   let params = {
    //     "companyImportColumnSelectSession": {
    //     },
    //     "pageStart": "1",
    //     "pageSize": this.pageInfo.pageSize
    //   };
    //   this.searchParamsForm.data[2].value = "";
    //   this.loading = true;
    //   this.getWorkImportCompanyInfo(params).then(res => {
    //     //设置table的loading变量
    //     this.loading = false;
    //     this.tableData = res.records;
    //     this.pageInfo.total = res.total;
    //   });
    // },
    // 审核通过
    auditPass(row) {
      if (row.colname === 'company_name' || row.colname === 'enterprise_abbreviation') {
        this.auditTableResultDialogVisible = true;
        this.batchAuditPassStatus = '';
        this.batchAuditNoPassForm = false;
        if (row.createDate) {
          this.getBatchImportCompanyInfo(row.createDate);
        }
      } else {
        this.$confirm('您是否确认审核通过, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          let param = {
            "approveInfoSessions":
            {
              "businessId": row.modifyImportId,
              // "approveResult": "1",
              "approveExplain": "",
              // "deleApproveResult": "1",
              "ifdeal": "1",
              "auditResults": "3",
              "colname": row.colname,
              "cantonCode": row.cantonCode,
              "companyId": row.companyId,
              "newContent": row.newContent
            }
          };
          this.getreviewCompanyImportInfo(param).then(res => {
            this.loading = false;
            this.$message({
              type: 'success',
              message: '审核成功'
            });
            // 初始列表
            this.getWorkImportCompanyInfo(this.searchParams).then(reso => {
              this.tableData = reso.records;
              this.pageInfo.currentPage = 1;
              this.pageInfo.pageSize = 10;
              this.pageInfo.total = reso.total;
            });
          }).catch(e => {
            this.$message({
              showClose: true,
              message: '审核失败',
              type: 'error'
            });
          });
        }).catch(() => {
        });
      }
    },
    // 点击审核不通过按钮
    auditNoPass(row) {
      if (row.colname === 'company_name' || row.colname === 'enterprise_abbreviation') {
        this.auditTableResultDialogVisible = true;
        this.batchAuditPassStatus = '';
        this.auditTableResultForm.approveExplain = '';
        this.batchAuditNoPassForm = false;
        if (row.createDate) {
          this.getBatchImportCompanyInfo(row.createDate);
        }
      } else {
        this.auditResultDialogVisible = true;
        this.auditResultForm.approveExplain = '';
        this.auditInfo = row;
      }
    },
    // 审核不通过
    auditPassNot(row) {
      this.$refs['auditResultForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          let param = {
            "approveInfoSessions":
            {
              "businessId": row.modifyImportId,
              "ifdeal": "0",
              "auditResults": "0",
              // "approveResult": "0",
              "approveExplain": row.approveExplain,
              // "deleApproveResult": "0",
              "colname": row.colname,
              "cantonCode": row.cantonCode,
              "companyId": row.companyId,
              "newContent": row.newContent
            }
          };
          this.getreviewCompanyImportInfo(param).then(res => {
            this.loading = false;
            this.$message({
              type: 'success',
              message: '审核成功'
            });
            this.auditResultDialogVisible = false;
            // 初始列表
            this.getWorkImportCompanyInfo(this.searchParams).then(reso => {
              this.tableData = reso.records;
              this.pageInfo.currentPage = 1;
              this.pageInfo.pageSize = 10;
              this.pageInfo.total = reso.total;
            });
          }).catch(e => {
            this.auditResultDialogVisible = false;
            this.$message({
              showClose: true,
              message: '审核失败',
              type: 'error'
            });
          });
        }
      });
    },
    // 确认填写审核不通过的审核原因
    confirmReason() {
      this.auditInfo['approveExplain'] = this.auditResultForm.approveExplain;
      this.auditPassNot(this.auditInfo);
    },
    // 取消审核不通过
    cancel() {
      this.auditResultDialogVisible = false;
      this.auditResultForm.approveExplain = '';
    },
    // 批量审核通过企业中文名称和企业简称
    batchAuditPass(row) {
      let param = {
        "updateSession": []
      };
      this.getBatchAuditImportInfo.forEach((value, index) => {
        param.updateSession.push({
          "modifyImportId": value.modifyImportId,
          "approveExplain": "",
          "ifdeal": "1",
          "auditResults": "3",
          "colname": value.colname,
          "cantonCode": value.cantonCode,
          "companyId": value.companyId,
          "newContent": value.newContent
        });
      });
      this.auditTableResultDialogVisible = false;
      this.batchingLoading = true;
      this.batchAuditCompanyNameAndAbbreviation(param).then(res => {
        this.batchingLoading = false;
        this.$message({
          type: 'success',
          message: '审核成功'
        });
        this.auditTableResultDialogVisible = false;
        // 初始列表
        this.getWorkImportCompanyInfo(this.searchParams).then(response => {
          this.tableData = response.records;
        });
      }).catch(e => {
        this.batchingLoading = false;
        this.$message({
          showClose: true,
          message: '审核失败',
          type: 'error'
        });
      });
    },
    // 批量审核不通过企业中文名称和企业简称
    batchAuditNotPass() {
      this.$refs['auditTableResultForm'].validate((valid) => {
        if (valid) {
          let param = {
            "updateSession": []
          };
          this.getBatchAuditImportInfo.forEach((value, index) => {
            param.updateSession.push({
              "modifyImportId": value.modifyImportId,
              "ifdeal": "0",
              "auditResults": "0",
              "approveExplain": this.auditTableResultForm.approveExplain,
              "colname": value.colname,
              "cantonCode": value.cantonCode,
              "companyId": value.companyId,
              "newContent": value.newContent
            });
          });
          this.batchingLoading = true;
          this.batchAuditCompanyNameAndAbbreviation(param).then(res => {
            this.batchingLoading = false;
            this.$message({
              type: 'success',
              message: '审核成功'
            });
            this.auditTableResultDialogVisible = false;
            // 初始列表
            this.getWorkImportCompanyInfo(this.searchParams).then(response => {
              this.tableData = response.records;
            });
          }).catch(e => {
            this.batchingLoading = false;
            this.auditTableResultDialogVisible = false;
            this.$message({
              showClose: true,
              message: '审核失败',
              type: 'error'
            });
          });
        }
      });
    },
    // 批量通过企业中文名称和企业简称
    auditTablePass() {
      this.batchAuditNoPassForm = false;
    },
    // 批量不通过企业中文名称和企业简称
    auditTableNotPass() {
      this.batchAuditNoPassForm = true;
    },
    // 确认填写批量审核企业中文名称和企业简称不通过原因
    confirmBatchAudit() {
      if (this.batchAuditPassStatus === '1') {
        this.batchAuditPass();
      } else if (this.batchAuditPassStatus === '2') {
        this.auditTableInfo['approveExplain'] = this.auditTableResultForm.approveExplain;
        this.batchAuditNotPass();
      } else {
        this.$message.error('请勾选审核状态');
      }

    },
    // 取消批量审核企业中文名称和企业简称
    cancelBatchAudit() {
      this.batchAuditPassStatus = '';
      this.auditTableResultDialogVisible = false;
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      // let _this = this;
      // 刷新页面
      this.getWorkImportCompanyInfo(this.searchParams).then(res => {
        //设置table的loading变量
        this.loading = false;
        this.tableData = res.records;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageStart = val;
      // let _this = this;
      // 刷新页面
      this.getWorkImportCompanyInfo(this.searchParams).then(res => {
        //设置table的loading变量
        this.loading = false;
        this.tableData = res.records;
      });
    },
    // 查询
    toSearch() {
      // let _this = this;
      this.loading = true;
      // 新建临时对象
      let currentObject = {};
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.value !== '') {
          if (formVal.prop === 'companyName') {
            currentObject["companyName"] = formVal.value;
          }
          if (formVal.prop === 'cantonCode') {
            currentObject["cantonCode"] = formVal.value;
          }
          if (formVal.prop === 'ifdeal') {
            currentObject["ifdeal"] = formVal.value;
          }
          if (formVal.prop === 'isAsc') {
            currentObject['isAsc'] = formVal.value;
          }
          if (formVal.prop === 'colname') {
            currentObject['colname'] = formVal.value;
          }
          if (formVal.prop === 'deleApproveResult') {
            currentObject['deleApproveResult'] = formVal.value;
          }
          if (formVal.prop === 'businessDelegationId') {
            currentObject['businessDelegationId'] = formVal.value;
          }
        }
      });
      // 合并有值对象，作为传参
      this.searchParams.companyImportColumnSelectSession = currentObject;
      // 刷新表格
      this.getWorkImportCompanyInfo(this.searchParams).then(res => {
        if (this.searchParamsForm.data[2].value) {
          this.isAudit = false;
        }
        //设置table的loading变量
        this.loading = false;
        this.tableData = res.records;
        this.pageInfo.total = res.total;
      });
    },
    //添加表头样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    }
  }
};
</script>

