/**
 * @file 确认品牌展位数量
 * 修改人(张文建 2019-4-20  去除了第201行代码,增加了第332-334行代码)
 */
<template>
  <el-tabs v-model="activeName" v-loading="loading">
    <el-tab-pane label="品牌展位确认申请" name="first">
      <div v-if="!containExhibitionPeriod" style="padding: 15px 0;font-size: 17px;font-weight: bold;color: #d80c18;">当前时间不在品牌展位确认期内，不可确认参展，退出参展和编辑参展信息</div>
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <!-- <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label"> -->
            <el-option v-for="(item, key) in exhibitionAreaList" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="商协会">-->
          <!--<el-select v-model="queryForm.coceralId" clearable>-->
            <!--<el-option v-for="(item, key) in coceralList" :key="key" :value="item.value" :label="item.label"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="schemePublishList" v-loading="loading" border width="100%">
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="上届品牌展位数" prop="brandBoothNumber" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.brandBoothNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="上届大会收回品牌展位数" prop="violationBoothNum" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.schemePublish.violationBoothNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="本届可确认品牌展位数" prop="initialBoothNum" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.schemePublish.initialBoothNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="本届已确认品牌展位数" prop="affirmBoothNumber" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.affirm">
              <span>{{scope.row.affirm.affirmBoothNumber}}</span>
            </div>
            <div v-else>0</div>
          </template>
        </el-table-column>
        <el-table-column label="展位确认审核结果" prop="checkResult" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.affirm">
              <span v-if="scope.row.affirm.checkResult === '0'">未审核</span>
              <span v-if="scope.row.affirm.checkResult === '1'">审核通过</span>
              <span v-if="scope.row.affirm.checkResult === '2'">审核不通过</span>
              <span v-if="scope.row.affirm.checkResult === '3'">审核中</span>
            </div>
            <div v-else>
              <span>未确认参展</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请退回品牌展位数" prop="backBoothNum" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.backConfirmation">{{scope.row.backConfirmation.backBoothNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="展位退回审核结果" prop="checkStatus" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.backConfirmation">
              <span v-if="scope.row.backConfirmation.checkStatus === '0'">未审核</span>
              <span v-if="scope.row.backConfirmation.checkStatus === '1'">审核通过</span>
              <span v-if="scope.row.backConfirmation.checkStatus === '2'">审核不通过</span>
              <span v-if="scope.row.backConfirmation.checkStatus === '3'">审核中</span>
            </div>
            <div v-else>
              <span>未退回展位</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250" fixed="right">
          <template slot-scope="scope">
            <!-- 全部确认 -->
            <div v-if="scope.row.isConfirm === 0 || (scope.row.affirm && !scope.row.backConfirmation && scope.row.affirm.affirmBoothNumber === 0)">
              <el-button type="text" v-if="containExhibitionPeriod" :disabled="scope.row.confirmDisabled" @click="openConfirm(scope.row)"><span @mouseover="judgeConfirmIsBlack(scope.row)">确认参展</span></el-button>
              <el-button type="text" v-if="containExhibitionPeriod" :disabled="scope.row.quitDisabled" @click="openCancel(scope.row)"><span @mouseover="judgeQuitIsBlack(scope.row)">退出参展</span></el-button>
            </div>
            <div v-if="scope.row.isConfirm === 1">
              <div v-if="scope.row.schemePublish.initialBoothNum === scope.row.affirm.affirmBoothNumber">
                <el-button type="text" @click="hasConfirm(scope.row)">已确认</el-button>
                <el-button type="text" @click="onprint(scope.row)">打印确认申请表</el-button>
                <el-button type="text" @click="openEditPage(scope.row)">编辑</el-button>
              </div>
            </div>
            <!--  部分退回 -->
            <div v-if="scope.row.backConfirmation">
              <div v-if="scope.row.backConfirmation.backType === 2">
                <div v-if="scope.row.isConfirm === 1">
                  <el-button type="text" v-if="scope.row.schemePublish.initialBoothNum === scope.row.affirm.affirmBoothNumber" @click="hasConfirm(scope.row)">已确认</el-button>
                  <el-button type="text" v-if="scope.row.isConfirm === 1" @click="onprint(scope.row)">打印确认申请表</el-button>
                  <el-button v-if="scope.row.isConfirm === 1 && containExhibitionPeriod" type="text" @click="openEditPage(scope.row)">编辑</el-button>
                </div>
                <div v-if="!scope.row.backConfirmation.attachment">
                  <el-button type="text" @click="openPrint(scope.row)">打印退回展位申请书</el-button>
                  <el-button type="text" @click="openUpload(scope.row)">上传退回申请书(盖章件)</el-button>
                </div>
                <div v-if="scope.row.backConfirmation.attachment">
                  <el-button type="text" @click="openLookInfo(scope.row)">查看退回申请书(盖章件)</el-button>
                  <el-button type="text" @click="openEditApplication(scope.row)">上传退回申请书（盖章件）</el-button>
                </div>
              </div>
            </div>
            <!--  情况3 全部退回 -->
            <div v-if="scope.row.backConfirmation">
              <div v-if="scope.row.backConfirmation.backType === 1">
                <el-button  type="text" @click="revokeCancelApply(scope.row)">撤回退回申请</el-button>
                <!--<el-button  v-if="scope.row.isConfirm === 1" type="text" @click="openEditPage(scope.row)">编辑</el-button>-->
                <div v-if="!scope.row.backConfirmation.attachment">
                  <el-button  type="text" @click="openPrint(scope.row)">打印退回展位申请书</el-button>
                  <el-button  type="text" @click="openUpload(scope.row)">上传退回申请书(盖章件)</el-button>
                </div>

                <div v-if="scope.row.backConfirmation.attachment">
                  <el-button type="text" @click="openLookInfo(scope.row)">查看退回申请书(盖章件)</el-button>
                  <el-button type="text" @click="openEditApplication(scope.row)">上传退回申请书（盖章件）</el-button>
                </div>
              </div>
            </div>

          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-if="schemePublishList.length > 0" class="brand-confirm-num-btn">
        <el-button type="primary" @click="turnToPage()">下一步</el-button>
      </div> -->
      <el-dialog title="编辑申请书(盖章件)" :visible.sync="editApplyDialog" width="600px;">
        <div>
          <div>
            <el-form v-model="uploadForm" ref="uploadForm"  label-position="right" :inline="true"  label-width="180px">
              <div>
                <el-form-item label="已提交申请书名称:">
                  <a :href="showImgPath(viewFileForm.filePath)">{{viewFileForm.fileName}}</a>
                </el-form-item>
              </div>
              <el-form-item label="退回确认申请书附件:" prop="attachment">
                <el-upload
                  class="upload-demo"
                  v-model="uploadForm.attachment"
                  :headers="header"
                  :limit="1"
                  :action="uploadApi"
                  :on-exceed="templateExceed"
                  :before-upload="templateBeforeUpload"
                  :on-success="templateUploadSuccess"
                  :on-error="templateUploadError"
                  :file-list="files"
                  ref="fujianupload">
                  <el-button  slot="trigger" size="small" type="primary" style="padding: 0 30px;height: 30px">重新上传</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" @click="uploadApplyConfirm()">确认</el-button>
          <el-button type="info" @click="editApplyDialog = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="上传申请书(盖章件)" :visible.sync="addApplyDialog" width="600px;">
        <div>
          <div>
            <el-form v-model="uploadForm" ref="uploadForm" label-position="right" :inline="true"  label-width="180px">
              <el-form-item label="退回确认申请书附件:" prop="attachment">
                <el-upload
                  v-model="uploadForm.attachment"
                  class="upload-demo"
                  :headers="header"
                  :limit="1"
                  :action="uploadApi"
                  :on-exceed="templateExceed"
                  :before-upload="templateBeforeUpload"
                  :on-success="templateUploadSuccess"
                  :on-error="templateUploadError"
                  :file-list="addFilesList"
                  ref="fujianupload">
                  <el-button  slot="trigger" size="small" type="primary" style="padding: 0 30px;height: 30px">上传</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" @click="uploadApplyConfirm()">确认</el-button>
          <el-button type="info" @click="addApplyDialog = false">取消</el-button>
        </div>
      </el-dialog>


      <el-dialog title="查看申请书(盖章件)" :visible.sync="viewApplyDialog" width="600px;">
          <div>
            <el-form label-position="right" :inline="true"  label-width="190px">
              <div>
                <el-form-item label="已提交退回确认申请书名称:">
                  <a :href="showImgPath(viewFileForm.filePath)">{{viewFileForm.fileName}}</a>
                </el-form-item>
              </div>
            </el-form>
          </div>
        <div class="dialog-footer">
          <el-button type="info" @click="viewApplyDialog = false">关 闭</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    var boothNum = (rule, value, callback) => {
      let _this = this;
      const reg = /^(0|\+?[1-9][0-9]*)$/;
      if (value === '') {
        return callback(new Error('此项为必填项'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else if (_this.violationBoothNum !== 0 && value === _this.writeForm.brandBoothNumber) {
        return callback(new Error('请输入小于上届展区品牌展位数'));
      } else if (value > _this.writeForm.brandBoothNumber) {
        return callback(new Error('请输入小于上届展区品牌展位数'));
      } else {
        return callback();
      }
    };
    return {
      showNextStep: false,
      uploadApi: '',
      editApplyDialog: false,
      addApplyDialog: false,
      viewApplyDialog: false,
      containExhibitionPeriod: true, // 判断是否在参展期内
      loading: false,
      activeName: 'first',
      isConfirm: false, // 是否打开确认窗口
      currentInitialNum: 0,
      exhibitionAreaList: [],
      dealClusterList: [],
      cantonFairCodeList: [],
      coceralList: [],
      companyList: [],
      // 编辑
      files: [],
      // 新增
      addFilesList: [],
      filesDate: [],
      header: {
        Token: this.$store.state.token
      },
      // 查询表单
      queryForm: {
        exhibitionArea: '', // 展区id
        dealClusterId: '', // 交易团id
        cantonFairCode: '', // 广交会编码
        coceralId: '', // 商协会id
        companyId: this.$store.state.userInfo.companyId // 企业id 从用户登录的信息拿
      },
      viewFileForm: {
        fileName: '',
        filePath: ''
      },
      uploadForm: {
        boothAffirmId: '',
        attachment: ''
      },
      // 确认窗口填写表单
      writeForm: {
        schemePublish: {}
      },
      violationBoothNum: '', // 违规处理期内的展位数量
      exhibitionArea: '', // 展区id
      // 确认窗口填写校验规则
      writeFormRules: {
        initialBoothNum: [{ required: true, validator: boothNum, trigger: 'blur' }]
      },
      rules: {
        attachment: [
          { required: true, message: "附件不能为空", trigger: "blur" }
        ]
      },
      baseApi: process.env.API_OS_URL,
      companyInfo: [
        {
          key: 'companyId',
          label: '企业永久代码',
          value: ''
        },
        {
          key: 'companyName',
          label: '申请企业名称中文',
          value: ''
        },
        {
          key: 'companyNameEn',
          label: '申请企业名称英文',
          value: ''
        },
        {
          key: 'adressCh',
          label: '申请企业地址中文',
          value: ''
        },
        {
          key: 'adressEn',
          label: '申请企业地址英文',
          value: ''
        },
        {
          key: 'customsCode',
          label: '海关编码',
          value: ''
        },
        {
          key: 'legalPerson',
          label: '法定代表人',
          value: ''
        },
        {
          key: 'businessLicenceNo',
          label: '统一社会信用代码/营业执照号',
          value: ''
        },
        {
          key: 'importExportCode',
          label: '进出口企业代码',
          value: ''
        },
        {
          key: 'exportVolumeLast',
          label: '进出口企业代码',
          value: ''
        },
        {
          key: 'exhibitorContact',
          label: '参展联系人',
          value: ''
        },
        {
          key: 'exhibitorContactPhone',
          label: '参展联系人手机',
          value: ''
        },
        {
          key: 'postalCode',
          label: '邮政编码',
          value: ''
        }
      ]
    };
  },
  async beforeCreate() {
    this.exhibitionAreaList = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.exhibitionAreaList.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.exhibitionAreaList.splice(deleteIndex, 1);
      }
    });
    this.coceralList = await kindo.dictionary.get('coceral'); // 商协会
  },
  mounted() {
    this.toNext();
    this.uploadApi = this.baseApi + '/efOS/file/addFile';
    // let nowDate = new Date().getTime();
    // let limitDate = new Date('2019-06-06 23:59:59').getTime();
    // if (nowDate <= limitDate) {
    //   this.containExhibitionPeriod = true;
    // } else {
    //   this.containExhibitionPeriod = false;
    // }
    // this.getSchemePublish(this.queryForm).then(response => {
    //   // this.exhibitionAreaList = res.exhibitionAreaOpts;
    //   // this.coceralList = res.coceralOpts;
    // }).catch(e => {
    //   this.loading = false;
    // });
    // 获取届数
    this.getSessionInfo().then(res => {
      if (res.session) {
        let progressParam = {
          exhibitionNum: res.session,
          subKey: 'TIM_BRAND_EXHIBITION_POSITION_CONFIRM_1'
        };
        this.getProgressTimeInfo(progressParam).then(progressRes => {
          // 当前时间在参展时间段内可确认参展和编辑
          if (progressRes && progressRes.startTime && progressRes.endTime) {
            let startTime = new Date(progressRes.startTime).getTime();
            let endTime = new Date(progressRes.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
            let nowTime = new Date().getTime();
            if (nowTime >= startTime && nowTime <= endTime) {
              this.containExhibitionPeriod = true;
            } else {
              // 获取参展时间段
              let ruleParam = {
                exhibitionNum: res.session,
                subKey: 'TIM_BRAND_EXHIBITION_POSITION_CONFIRM_1',
                orgId: this.$store.state.userInfo.companyId
              };
              this.getRuleInfos(ruleParam).then(resp => {
                // 当前时间在参展时间段内可确认参展和编辑
                if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                  let ruleStartTime = new Date(resp[0].startTime).getTime();
                  let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                  let ruleNowTime = new Date().getTime();
                  if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                    this.containExhibitionPeriod = true;
                  } else {
                    this.containExhibitionPeriod = false;
                  }
                } else {
                  // 未拿到参展时间段也暂时可以确认参展和编辑
                  this.containExhibitionPeriod = false;
                }
              }).catch(e => {
                // 未拿到参展时间段也暂时可以确认参展和编辑
                this.containExhibitionPeriod = true;
              });
            }
          } else {
            // 未拿到参展时间段也暂时可以新增，编辑和删除展位
            this.containExhibitionPeriod = true;
          }
        }).catch(e => {
          // 未拿到参展时间段也暂时可以新增，编辑和删除展位
          this.containExhibitionPeriod = true;
        }).then(() => {
          this.getSchemePublish(this.queryForm).then(response => {
            // this.exhibitionAreaList = res.exhibitionAreaOpts;
            // this.coceralList = res.coceralOpts;
          }).catch(e => {
            this.loading = false;
          });
        });
      }
    });
    // 获取最新展览信息
    this.getExhibitStatusInfo(this.$store.state.userInfo.companyId);
  },
  watch: {
    'filesDate': {
      handler(val) {
        if (val) {
          this.viewFileForm.fileName = val.fileName;
          this.viewFileForm.filePath = val.fileId;
        } else {
          this.viewFileForm.fileName = '';
          this.viewFileForm.filePath = '';
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters('companyInfomation', ['schemePublishList']),
    ...mapGetters('enterExManagement', ['getStatus']),
    ...mapGetters('common', ['session', 'progressTimeArrange']), // 获取届数
    // 当届小于上届
    submitData() {
      return {
        exhibitionArea: this.exhibitionArea,
        companyId: this.queryForm.companyId,
        brandBoothNumber: this.writeForm.schemePublish.initialBoothNum // 当届展区品牌展位数
      };
    },
    // 当届等于上届
    equalSubmitData() {
      return {
        affirmBoothNumber: this.writeForm.schemePublish.initialBoothNum, // 当届展位数
        companyId: this.queryForm.companyId,
        companyName: this.writeForm.companyName,
        cantonFairCode: this.writeForm.cantonFairCode,
        exhibitionAreaName: this.writeForm.exhibitionAreaName,
        exhibitionArea: this.exhibitionArea,
        lastBoothNum: this.writeForm.brandBoothNumber // 上届展位数
      };
    }
  },
  methods: {
    ...mapActions('common', ['getSessionInfo', 'getRuleInfos', 'getProgressTimeInfo']),
    ...mapActions('companyInfomation', ['getSchemePublish', 'getSchemePublishConfirm', 'enterConfirmAddAffirm', 'getGeneralVenture', 'judgeGeneralStandIsBlack']),
    ...mapActions("onlineServiceHomePage", ["getReviewResultInfo"]),
    ...mapActions('enterExManagement', ['getExhibitStatusInfo', 'getAuditEnterProductInfo']),
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    // 修改人张文建  增加了showImgPath()方法。并修改了第200行代码
    showImgPath(path) {
      return this.baseApi + '/efOS/file/getImg?fileId=' + path;
    },
    // 下一步跳转到相关页面
    turnToPage() {
      this.getReviewResultInfo(this.$store.state.userInfo.companyId).then(res => {
        if (res.reviewResult === '资料未更新') {
          this.$confirm('您的企业资料尚未完善，请前往完善', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/basEntInf'
            });
          }).catch(() => {
          });
        } else {
          this.$router.push({
            path: '/enterExManagement'
          });
        }
      });
    },
    // 按条件跳转
    toNext() {
      this.getReviewResultInfo(this.$store.state.userInfo.companyId).then(res => {
        if (res.reviewResult === '资料未更新') {
          this.$confirm('您的企业资料尚未完善，请前往完善', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/basEntInf'
            });
          }).catch(() => {
          });
        }
      });
    },
    // 数据查询
    handleQuery() {
      this.loading = true;
      this.getSchemePublish(this.queryForm).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },

    // 点击提交
    handleSubmit() {
      let _this = this;
      this.$refs['writeForm'].validate((valid) => {
        if (valid) {
          if (_this.writeForm.schemePublish.initialBoothNum === _this.currentInitialNum) {
            _this.isConfirm = false; // 未修改本届展区品牌展位数
            return false;
          }
          if (parseInt(_this.submitData.brandBoothNumber) < parseInt(_this.writeForm.brandBoothNumber)) { // 当届小于上届
            _this.loading = true;
            // 获取退回数据
            _this.getSchemePublishConfirm(_this.submitData).then(() => {
              _this.loading = false;
              _this.$router.push({
                path: '/submitConfirmLetter',
                query: {
                  confirmData: _this.writeForm
                }
              });
            }).catch(e => {
              _this.loading = false;
            });
          } else if (parseInt(_this.submitData.brandBoothNumber) === parseInt(_this.writeForm.brandBoothNumber)) { // 当届等于上届
            _this.loading = true;
            _this.enterConfirmAddAffirm(_this.equalSubmitData).then(() => {
              _this.getSchemePublish(_this.queryForm).then(res => {
                _this.loading = false;
                _this.isConfirm = false;
              }).catch(e => {
                _this.loading = false;
                _this.isConfirm = false;
              });
            }).catch(e => {
              _this.loading = false;
            });
          } else {
            _this.isConfirm = false; // 其他情况
          }
        } else {
          _this.$message({
            showClose: true,
            message: '验证未通过',
            type: 'error'
          });
        }
      });

    },
    // 点击取消
    handleCancel() {
      this.isConfirm = false;
    },
    handleSubmitAdd() {
      this.uploadForm.attachment = '';
      this.addApplyDialog = true;
    },
    // 已确认
    hasConfirm(row) {
      let copyRow = JSON.stringify(row);
      this.$router.push({ path: '/brandBoothConfirm', query: { schemeDetail: copyRow, isView: true }});
    },
    // 确认参展是否是黑名单
    judgeConfirmIsBlack(row) {
      if (row.confirmDisabled) {
        this.$message.error('该企业在该展区为黑名单用户!');
      }
    },
    // 退出参展是否是黑名单
    judgeQuitIsBlack(row) {
      if (row.quitDisabled) {
        this.$message.error('该企业在该展区为黑名单用户!');
      }
    },
    // 处理确认参展黑白名单业务
    dealWithWhiteConfirm(row, punishInfos) {
      row.confirmDisabled = false;
      let searchParams = { "companyId": this.$store.state.userInfo.companyId, "exhibitTypeOne": row.exhibitionArea, "showStatus": "1" };
      this.getGeneralVenture(searchParams).then(resT => {
        if (resT == null || resT.length < 3) {
          this.$confirm('本展区的"现场展示展品"小于3个，请前往"我的展品"添加', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/enterExManagement'
            });
          }).catch(() => {
          });
        } else {
          let copyRow = JSON.stringify(row);
          if (punishInfos) {
            this.$router.push({ path: '/brandBoothConfirm', query: { schemeDetail: copyRow, isConfirm: true, maxNum: punishInfos[0].maxnum }});
          } else {
            this.$router.push({ path: '/brandBoothConfirm', query: { schemeDetail: copyRow, isConfirm: true }});
          }
        }
      });
    },
    // 确认参展
    openConfirm(row) {
      this.loading = true;
      this.judgeGeneralStandIsBlack({
        "exhibitionNum": this.session,
        "companyId": this.$store.state.userInfo.companyId,
        "exhibitionAreaCode": row.exhibitionArea,
        "ifflaunt": "02"
      }).then(res => {
        this.loading = false;
        if (res.isBlack === '1' || res.isBlack === 1) {
          if (res.punishInfos && res.punishInfos.length > 0) {
            let punishInfos = res.punishInfos;
            punishInfos.sort((x, y) => {
              return x.maxnum - y.maxnum;
            });
            if (punishInfos[0] && (punishInfos[0].maxnum === 0 || punishInfos[0].maxnum === '0')) {
              punishInfos.forEach((value, index, array) => {
                if (value.eventCode === '107' || value.eventCode === '117' || value.eventCode === '101') {
                  row.confirmDisabled = true;
                  this.$message.error('该企业在该展区为黑名单用户!');
                } else {
                  this.dealWithWhiteConfirm(row);
                }
              });
            } else if (punishInfos[0] && (punishInfos[0].maxnum !== 0 || punishInfos[0].maxnum !== '0')) {
              this.dealWithWhiteConfirm(row, punishInfos);
            }
          }
        } else {
          this.dealWithWhiteConfirm(row);
        }
      }).catch(e => {
        this.loading = false;
      });
    },
    // 退出参展 - 跳转到 提交品牌展位退回(全部退回)
    openCancel(row) {
      this.loading = true;
      this.judgeGeneralStandIsBlack({
        "exhibitionNum": this.session,
        "companyId": this.$store.state.userInfo.companyId,
        "exhibitionAreaCode": row.exhibitionArea
      }).then(res => {
        this.loading = false;
        if (res.isBlack === '1' || res.isBlack === 1) {
          let punishInfos = res.punishInfos;
          punishInfos.sort((x, y) => {
            return x.maxnum - y.maxnum;
          });
          if (punishInfos[0] && (punishInfos[0].maxnum === 0 || punishInfos[0].maxnum === '0')) {
            punishInfos.forEach((value, index, array) => {
              if (value.eventCode === '107' || value.eventCode === '117' || value.eventCode === '101') {
                row.quitDisabled = true;
                this.$message.error('该企业在该展区为黑名单用户!');
              } else {
                row.quitDisabled = false;
                let copyRow = JSON.stringify(row);
                this.$router.push({ path: '/submitConfirmLetter', query: { writeForm: copyRow, isAll: true }});
              }
            });
          } else if (punishInfos[0] && (punishInfos[0].maxnum !== 0 || punishInfos[0].maxnum !== '0')) {
            row.quitDisabled = false;
            let copyRow = JSON.stringify(row);
            this.$router.push({ path: '/submitConfirmLetter', query: { writeForm: copyRow, isAll: true, maxNum: punishInfos[0].maxnum }});
          }
        } else {
          row.quitDisabled = false;
          let copyRow = JSON.stringify(row);
          this.$router.push({ path: '/submitConfirmLetter', query: { writeForm: copyRow, isAll: true }});
        }
      }).catch(e => {
        this.loading = false;
      });
    },
    // 编辑
    openEditPage(row) {
      let copyRow = JSON.stringify(row);
      let boothAffirmId = '';
      if (row.backConfirmation) {
        boothAffirmId = row.backConfirmation.boothAffirmId;
      } else {
        boothAffirmId = row.affirm.boothAffirmId;
      }
      this.$router.push({ path: '/brandBoothConfirm', query: { schemeDetail: copyRow, isEdit: true, boothAffirmId: boothAffirmId }});
    },
    // 进入到打印页面,打印退回申请书
    openPrint(row) {
      let copyRow = JSON.stringify(row);
      this.$router.push({ path: '/printApplicationForm', query: { writeForm: copyRow, isList: true, isCancel: true }});
    },
    // 进入到打印页面，打印确认申请表
    onprint(row) {
      let companyInfoIsCompleted = true;
      // 获取企业信息，若打印表中关于企业信息的部分未完善请用户完善，做打印限制
      this.getBasicInfo(this.$store.state.userInfo.companyId).then(res => {
        if (res) {
          for (let i = 0; i < this.companyInfo.length; i++) {
            for (let key in res) {
              if (key === this.companyInfo[i].key) {
                this.companyInfo[i].value = res[key];
                if (this.companyInfo[i].value === '' || !this.companyInfo[i].value) {
                  this.$message({
                    showClose: true,
                    message: this.companyInfo[i].label + '为空，请完善企业资料信息',
                    type: 'error'
                  });
                  companyInfoIsCompleted = false;
                  setTimeout(() => {
                    this.$router.push({ path: '/basEntInf' });
                  }, 500);
                  return;
                }
              }
            }
          }
          if (companyInfoIsCompleted) {
            let copyRow = JSON.stringify(row);
            this.$router.push({ path: '/printApplicationForm', query: { writeForm: copyRow, isList: true, isFirm: true }});
          }
        }
      }).catch(e => {
        this.$message({
          showClose: true,
          message: '获取企业信息失败',
          type: 'error'
        });
      });
    },
    openUpload(row) {
      this.addFilesList = [];
      this.uploadForm.attachment = '';
      this.uploadForm.boothAffirmId = row.backConfirmation.boothAffirmId;
      this.addApplyDialog = true;
    },
    // 编辑确定
    uploadApplyConfirm() {
      if (this.uploadForm.attachment === '') {
        this.$message.error("请上传申请书!");
        return;
      } else {
        this.$http.postJson(this.baseApi + '/api/ordinaryCompanyDemandRecord/recodeAndReturnConfirmation', this.uploadForm).then((res) => {
          this.$message.success('申请书保存成功!');
          this.addApplyDialog = false;
          this.editApplyDialog = false;
          this.getSchemePublish(this.queryForm).then(resp => {
          }).catch(e => {
            this.loading = false;
          });
        }).catch((error) => {
          this.$message.success(error);
        });
      }

      // this.$refs['uploadForm'].validate((valid) => {
      //   if (valid) {
      //   }
      // });
    },
    // 查看申请书 - 预览申请书PDF
    openLookInfo(row) {
      this.viewApplyDialog = true;
      this.viewFileForm.fileName = row.backConfirmation.fileName;
      this.viewFileForm.filePath = row.backConfirmation.attachment;
    },
    // 撤回退回申请
    revokeCancelApply(row) {
      let _this = this;
      this.showDialogTips("确认撤回退回申请?").then(() => {
        let demandRecordId = '';
        if (row.companyDemandRecord) {
          demandRecordId = row.companyDemandRecord.demandRecordId;
        }
        _this.$http.postJson(this.baseApi + '/api/ordinaryCompanyDemandRecord/numberAffirmDelete', {
          boothAffirmId: row.backConfirmation.boothAffirmId,
          demandRecordId: demandRecordId
        }).then((resp) => {
          _this.$message.success('撤回成功!');
          _this.getSchemePublish(this.queryForm).then(res => {
          }).catch(e => {
            _this.loading = false;
          });
        }).catch((error) => {

        });
      }).catch(() => {});
    },
    // 编辑申请书
    openEditApplication(row) {
      this.uploadForm.boothAffirmId = row.backConfirmation.boothAffirmId;
      this.viewFileForm.fileName = row.backConfirmation.fileName;
      this.viewFileForm.filePath = row.backConfirmation.attachment;
      this.editApplyDialog = true;
    },
    /*
      申请书文件上传逻辑处理
     */
    templateExceed() {
      this.$message.error("只能上传一个文件!");
    },
    templateBeforeUpload(file) {
      // 进行pdf格式及大小验证
      let testPdf = file.type === "application/pdf";
      // 进行图片大小验证
      let testImage = /^image\/(jpeg|png|jpg)$/.test(file.type);
      if (!testImage && !testPdf) {
        this.$message.warning("上传的文件格式错误!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.warning("上传文件大小不能超过5MB!");
        return false;
      }
      return true;
    },
    templateUploadSuccess(res, file) {
      if (res.flag === '0') {
        this.$message.error('申请书(盖章件)上传失败');
      } else {
        this.filesDate = res.data;
        this.uploadForm.attachment = res.data.fileId.toString();
        this.$message.success("申请书(盖章件)上传成功!");
      }
    },
    templateUploadError() {
      this.$message.error("申请书(盖章件)上传错误!");
    },
    // 消息提示
    showDialogTips(tipMessage) {
      return this.$confirm(tipMessage, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      });
    }
  }
};
</script>
<style scoped>
.dialog-footer {
  text-align: center;
  padding: 10px;
}
.brand-confirm-num-btn {
  margin-top: 20px;
  text-align: center;
}
</style>
