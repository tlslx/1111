/**
* @file CF奖评选活动信息
* @author:wanglifeng
* @date:2019/1/30
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="CF奖评选活动信息" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="ruleForm.activityCode" placeholder="请选择">
            <el-option v-for="(item, index) in activityCodes" :key="index" :label="item.activityCode" :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row class="btn-row">
        <el-button type="primary" @click="openAddDig()">新增</el-button>
      </el-row>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="序号"
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="activityCode"
            label="活动编号"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="activityName"
            label="活动名称"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop=""
            label="产品征集起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.proColStart}}-{{scope.row.proColEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="资质审核起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.checkStart}}-{{scope.row.checkEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="初评起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.firstGradeStart}}-{{scope.row.firstGradeEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="初评公示起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.showFirstStart}}-{{scope.row.showFirstEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="寄送起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.sendGoodsStart}}-{{scope.row.sendGoodsEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="终评起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.finalGradeStart}}-{{scope.row.finalGradeEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="终评公示起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.showFinalStart}}-{{scope.row.showFinalEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="采购商投票起止时间"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.purchaseVoteFirstStart}}-{{scope.row.purchaseVoteFirstEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button @click="openUpdateDig(scope.row, scope.index)" type="text" size="small">修改</el-button>
              <el-button @click="handleDelete(scope.row, scope.index)" type="text" size="small">{{scope.row.isEnable==0?'禁用':'启用'}}</el-button>
              <el-button @click="handleUpload(scope.row, scope.index)" type="text" size="small">上传承诺书模板</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="ruleForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="ruleForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalDatas"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>
      <!--<el-row class="btn-row">-->
        <!--<el-button type="primary" @click="dialogProduct = true">新增</el-button>-->
        <!--<el-button type="primary" @click="handleImports">一键导入</el-button>-->
        <!--<el-button type="primary" @click="dialogAwardSetting = true">奖项设置</el-button>-->
      <!--</el-row>-->
      <!--CF奖活动信息弹窗-->
      <el-dialog title="CF奖活动信息" :visible.sync="dialogActivity" :close-on-click-modal="false">
        <el-form :model="formActivity" label-width="120px" :rules="rules" ref="formActivity">
          <el-form-item label="活动编号" style="width: 49%;display: inline-block" prop="activityCode">
            <!--<el-input v-model="formActivity.cfActivityId" v-show="false"></el-input>-->
            <el-input v-model.number="formActivity.activityCode" autocomplete="off" :disabled="!isAdd"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" style="width: 49%;display: inline-block" prop="isEnable">
            <el-radio v-model="formActivity.isEnable" label="0">是</el-radio>
            <el-radio v-model="formActivity.isEnable" label="1">否</el-radio>
          </el-form-item>
          <el-form-item label="活动名称" prop="activityName">
            <el-input v-model="formActivity.activityName" autocomplete="off" style="width: 348px;"></el-input>
          </el-form-item>
          <el-form-item label="产品征集时间" prop="proCol">
            <el-date-picker
              v-model="formActivity.proCol"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="资质审核时间" prop="checkStart">
            <el-date-picker
              v-model="formActivity.checkStart"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="checkStartOptions"
              :default-value="checkStartDefault"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="初评时间" prop="firstGrade">
            <el-date-picker
              v-model="formActivity.firstGrade"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="firstGradeOptions"
              :default-value="firstGradeDefault">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="初评公示时间" prop="showFirst">
            <el-date-picker
              v-model="formActivity.showFirst"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="showFirstOptions"
              :default-value="showFirstDefault">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="寄送实物时间" prop="sendGoods">
            <el-date-picker
              v-model="formActivity.sendGoods"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="sendGoodsOptions"
              :default-value="sendGoodsDefault">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="终评时间" prop="finalGrade">
            <el-date-picker
              v-model="formActivity.finalGrade"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="finalGradeOptions"
              :default-value="finalGradeDefault">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="终评公示时间" prop="showFinal">
            <el-date-picker
              v-model="formActivity.showFinal"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="showFinalOptions"
              :default-value="showFinalDefault">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="采购商投票时间" prop="purchaseVote">
            <el-date-picker
              v-model="formActivity.purchaseVote"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="purchaseVoteOptions"
              :default-value="purchaseVoteDefault">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formActivity.description" type="textarea" autocomplete="off" style="width: 348px;" maxlength="220"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSave(formActivity)">确 定</el-button>
          <el-button @click="dialogActivity = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--上传承诺书弹窗-->
      <el-dialog title="承诺书模板" :visible.sync="dialogAwardSetting" :close-on-click-modal="false">
        <el-form :inline="true" :model="dialogruleForm">
          <el-row>
            <el-form-item label="承诺书模板" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                :headers="header"
                ref="upload"
                limit="1"
                :action="uploadApi"
                accept="application/pdf"
                :data="uploadParams"
                :on-exceed="onMaterialExceed"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :file-list="fileList"
                auto-upload="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-row>
          <el-row>
            <span style="color: red;margin-left: 20px">*</span>
            <span>承诺文件只能上传pdf文件格式,且文件大小不能超过5M</span>
          </el-row>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogAwardSetting = false">确 定</el-button>
          <el-button @click="dialogAwardSetting = false">取 消</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import http from "@/scripts/framework/http";
export default {
  name: "exhibitionAreaManagement",
  data() {
    let checkNum = (rule, value, callback) => {
      let regRule = /^[0-9]*$/;
      if (!regRule.test(value)) {
        return callback(new Error("请输入数字类型"));
      }
      return callback();
    };
    return {
      uploadApi: '',
      uploadParams: {

      },
      header: {
        Token: this.$store.state.token
      },
      isAdd: false,
      totalDatas: 0,
      activityCodes: [],
      activeName: 'first',
      tableData: [],
      formActivity: {
        cfActivityId: '',
        activityName: '',      
        activityCode: '',
        proCol: [],
        checkStart: [],
        firstGrade: [],
        showFirst: [],
        sendGoods: [],
        finalGrade: [],
        showFinal: [],
        purchaseVote: [],
        description: '',
        isEnable: '0'
      },
      proColDefault: '',
      checkStartDefault: '',
      firstGradeDefault: '',
      showFirstDefault: '',
      sendGoodsDefault: '',
      finalGradeDefault: '',
      showFinalDefault: '',
      purchaseVoteDefault: '',
      currentDate: new Date(),
      checkStartOptions: {
        disabledDate: time => {
          if (this.formActivity.proCol.length > 0) {
            this.checkStartDefault = this.currentDate;
            this.checkStartDefault.setMonth(parseInt(this.formActivity.proCol[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.proCol[1]).getTime();
          } else {
            return true;
          }
        }
      },
      firstGradeOptions: {
        disabledDate: time => {
          if (this.formActivity.checkStart.length > 0) {
            this.firstGradeDefault = this.currentDate;
            this.firstGradeDefault.setMonth(parseInt(this.formActivity.checkStart[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.checkStart[1]).getTime();
          } else {
            return true;
          }
        }
      },
      showFirstOptions: {
        disabledDate: time => {
          if (this.formActivity.firstGrade.length > 0) {
            this.showFirstDefault = this.currentDate;
            this.showFirstDefault.setMonth(parseInt(this.formActivity.firstGrade[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.firstGrade[1]).getTime();
          } else {
            return true;
          }
        }
      },
      sendGoodsOptions: {
        disabledDate: time => {
          if (this.formActivity.showFirst.length > 0) {
            this.sendGoodsDefault = this.currentDate;
            this.sendGoodsDefault.setMonth(parseInt(this.formActivity.showFirst[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.showFirst[1]).getTime();
          } else {
            return true;
          }
        }
      },
      finalGradeOptions: {
        disabledDate: time => {
          if (this.formActivity.sendGoods.length > 0) {
            this.finalGradeDefault = this.currentDate;
            this.finalGradeDefault.setMonth(parseInt(this.formActivity.sendGoods[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.sendGoods[1]).getTime();
          } else {
            return true;
          }
        }
      },
      showFinalOptions: {
        disabledDate: time => {
          if (this.formActivity.finalGrade.length > 0) {
            this.showFinalDefault = this.currentDate;
            this.showFinalDefault.setMonth(parseInt(this.formActivity.finalGrade[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.finalGrade[1]).getTime();
          } else {
            return true;
          }
        }
      },
      purchaseVoteOptions: {
        disabledDate: time => {
          if (this.formActivity.firstGrade.length > 0 && this.formActivity.finalGrade.length > 0) {
            this.purchaseVoteDefault = this.currentDate;
            this.purchaseVoteDefault.setMonth(parseInt(this.formActivity.firstGrade[1].split('-')[1]) - 1);
            return time.getTime() < new Date(this.formActivity.firstGrade[1]).getTime() || time.getTime() > new Date(this.formActivity.finalGrade[1]).getTime();
          } else {
            return true;
          }
        }
      },
      rules: {
        activityCode: [
          { required: true, message: '请输入活动编号', trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        activityName: [
          { required: true, message: '请输入活动名称', trigger: "blur" }
        ],
        proCol: [
          { required: true, message: '请选择产品征集时间', trigger: 'blur' }
        ],
        checkStart: [
          { required: true, message: '请选择资质审核时间', trigger: 'blur' }
        ],
        firstGrade: [
          { required: true, message: '请选择初评时间', trigger: 'blur' }
        ],
        showFirst: [
          { required: true, message: '请选择初评公示时间', trigger: 'blur' }
        ],
        sendGoods: [
          { required: true, message: '请选择寄送实物时间', trigger: 'blur' }
        ],
        finalGrade: [
          { required: true, message: '请选择终评时间', trigger: 'blur' }
        ],
        showFinal: [
          { required: true, message: '请选择终评公示时间', trigger: 'blur' }
        ],
        purchaseVote: [
          { required: true, message: '请选择采购商投票时间', trigger: 'blur' }
        ],
        isEnable: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ]
      },
      ruleForm: {
        activityCode: '',
        size: 10,
        current: 1
      },
      lastActivityCode: '',
      currentActivityCode: '',
      dialogActivity: false, // 产品列表弹窗
      dialogAwardSetting: false, // 奖项设置弹窗
      formLabelWidth: '120px',
      fileList: [],
      dialogruleForm: {
        files: ''
      },
      // baseApi: API_CF_URL
      baseApi: process.env.API_CF_URL
    };
  },
  mounted() {
    this.uploadApi = this.baseApi + '/api/customservice/cf/saveCompanyCommitment';
    this.init();
  },
  methods: {
    init() {
      http.get(this.baseApi + '/api/customservice/cf/listCfActivity').then(res => {
        this.activityCodes = res.records;
        this.getActivityList();
      }).catch(error => {
        this.$message.error(error);
      });
    },
    // 获取活动列表
    getActivityList() {
      http.get(this.baseApi + '/api/customservice/cf/allListCfActivity', this.ruleForm).then(res => {
        this.tableData = res.records;
        this.totalDatas = res.total;
      }).catch(error => {
        this.$message.error(error);
      });
    },
    handleSizeChange(pageSize) {
      this.ruleForm.size = pageSize;
      this.getActivityList();
    },
    handleCurrentChange(currentPage) {
      this.ruleForm.current = currentPage;
      this.getActivityList();
    },
    beforeUpload(file) {
      // this.dialogruleForm.files = file;
      // 进行pdf格式及大小验证
      let testPdf = file.type === "application/pdf";
      if (!testPdf) {
        this.$message.warning("文件格式上传错误!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过5MB!");
        return false;
      }
      this.uploadParams.commitment = file;
      this.uploadParams.activityCode = this.currentActivityCode;
      return true;
    },
    onMaterialExceed() {
      this.$message.error("只能上传一份承诺书！");
    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("承诺书上传失败");
      } else {
        this.$message.success("承诺书上传成功");
      }
    },
    uploadError() {
      this.$message.success("承诺书上传失败");
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    submitForm() {
      let params = {
        activityCode: this.ruleForm.activityCode,
        size: this.size,
        current: this.current
      };
      http.get(this.baseApi + '/api/customservice/cf/allListCfActivity', params).then(res => {
        this.tableData = res.records;
        this.totalDatas = res.total;
      }).catch(error => {});
    },
    resetForm() {
      this.ruleForm.activityCode = '';
    },
    openAddDig() {
      // 初始化值
      this.dialogActivity = true;
      this.isAdd = true;
      this.resetDialogForm();
    },
    resetDialogForm() {
      this.formActivity.cfActivityId = '';
      this.formActivity.activityCode = '';
      this.formActivity.activityName = '';
      this.formActivity.proCol = [];
      this.formActivity.checkStart = [];
      this.formActivity.firstGrade = [];
      this.formActivity.showFirst = [];
      this.formActivity.sendGoods = [];
      this.formActivity.finalGrade = [];
      this.formActivity.showFinal = [];
      this.formActivity.purchaseVote = [];
      this.formActivity.isEnable = '0';
      this.formActivity.description = '';
    },
    openUpdateDig(row, index) {
      this.dialogActivity = true;
      this.isAdd = false;
      let params = {
        activityCode: row.activityCode
      };
      http.get(this.baseApi + '/api/customservice/cf/getCfActivityByCode', params).then(res => {
        this.formActivity.cfActivityId = res.cfActivityId;
        this.formActivity.activityCode = res.activityCode;
        this.formActivity.activityName = res.activityName;
        this.formActivity.proCol = [res.proColStart, res.proColEnd];
        this.formActivity.checkStart = [res.checkStart, res.checkEnd];
        this.formActivity.firstGrade = [res.firstGradeStart, res.firstGradeEnd];
        this.formActivity.showFirst = [res.showFirstStart, res.showFirstEnd];
        this.formActivity.sendGoods = [res.sendGoodsStart, res.sendGoodsEnd];
        this.formActivity.finalGrade = [res.finalGradeStart, res.finalGradeEnd];
        this.formActivity.showFinal = [res.showFinalStart, res.showFinalEnd];
        this.formActivity.purchaseVote = [res.purchaseVoteFirstStart, res.purchaseVoteFirstEnd];
        this.formActivity.isEnable = res.isEnable + '';
        this.formActivity.description = res.description;
      });
    },
    // 新增或修改
    handleSave(row) {
      this.$refs["formActivity"].validate((valid) => {
        if (valid) {
          let cfActivityId = row.cfActivityId;
          let data = {};

          data.activityCode = row.activityCode;
          data.activityName = row.activityName;
          data.description = row.description;
          data.isEnable = row.isEnable;

          if (row) {
            let proColTime = row.proCol;
            if (proColTime.length > 0) {
              data.proColStart = proColTime[0];
              data.proColEnd = proColTime[1];
            }

            let checkStartTime = row.checkStart;
            if (checkStartTime.length > 0) {
              data.checkStart = checkStartTime[0];
              data.checkEnd = checkStartTime[1];
            }

            let firstGradeTime = row.firstGrade;
            if (firstGradeTime.length > 0) {
              data.firstGradeStart = firstGradeTime[0];
              data.firstGradeEnd = firstGradeTime[1];
            }

            let showFirstTime = row.showFirst;
            if (showFirstTime.length > 0) {
              data.showFirstStart = showFirstTime[0];
              data.showFirstEnd = showFirstTime[1];
            }

            let sendGoodsTime = row.sendGoods;
            if (sendGoodsTime.length > 0) {
              data.sendGoodsStart = sendGoodsTime[0];
              data.sendGoodsEnd = sendGoodsTime[1];
            }

            let finalGradeTime = row.finalGrade;
            if (finalGradeTime.length > 0) {
              data.finalGradeStart = finalGradeTime[0];
              data.finalGradeEnd = finalGradeTime[1];
            }

            let showFinalTime = row.showFinal;
            if (showFinalTime.length > 0) {
              data.showFinalStart = showFinalTime[0];
              data.showFinalEnd = showFinalTime[1];
            }

            let purchaseVoteTime = row.purchaseVote;
            if (purchaseVoteTime.length > 0) {
              data.purchaseVoteFirstStart = purchaseVoteTime[0];
              data.purchaseVoteFirstEnd = purchaseVoteTime[1];
            }
          }
          row.isEnable = data.isEnable;
          let url;
          if (cfActivityId == null || cfActivityId === '') {
            url = this.baseApi + '/api/customservice/cf/saveCfActivity';
          } else {
            url = this.baseApi + '/api/customservice/cf/updateCfActivity';
            data.cfActivityId = cfActivityId;
          }
          // 进行日期的判断
          let flag = this.judgeTimeisPass(data);
          if (flag) {
            http.postJson(url, data).then(res => {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.dialogActivity = false;
              this.getActivityList();
            }).catch(err => {
              this.$message.error(err);
            });
          }
        } else {
          return false;
        }
      });
    },
    // 删除
    handleDelete(row, index) {
      let msg = row.isEnable ? "确认启用该活动?" : "确认禁用该活动?";
      this.showDialogTips(msg).then(() => {
        let isEnable = row.isEnable;
        if (isEnable === 0) {
          isEnable = 1;
        } else {
          isEnable = 0;
        }
        let data = {
          cfActivityId: row.cfActivityId,
          isEnable: isEnable
        };
        row.isEnable = isEnable;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data;'
          }
        };
        http.post(this.baseApi + '/api/customservice/cf/saveCfActivityIsEnable', data, config).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }).catch(err => {
          this.$message.error(err);
        });
      }).catch(() => {});
    },
    // 上传
    handleUpload(row, index) {
      this.dialogAwardSetting = true;
      this.currentActivityCode = row.activityCode;
    },
    judgeTimeisPass(dates) {
      if (dates.proColEnd == null) {
        this.$message.error("产品征集时间未选择");
        return false;
      }
      if (dates.checkStart == null) {
        this.$message.error("资质审核时间未选择");
        return false;
      }
      if (dates.firstGradeStart == null) {
        this.$message.error("初评时间未选择");
        return false;
      }
      if (dates.showFirstStart == null) {
        this.$message.error("初评公示时间未选择");
        return false;
      }
      if (dates.sendGoodsStart == null) {
        this.$message.error("寄送实物时间未选择");
        return false;
      }
      if (dates.finalGradeStart == null) {
        this.$message.error("终评时间未选择");
        return false;
      }
      if (dates.showFinalStart == null) {
        this.$message.error("终评公示时间未选择");
        return false;
      }
      if (dates.purchaseVoteFirstStart == null) {
        this.$message.error("采购商投票时间未选择");
        return false;
      }
      let flag = false;
      if (this.timeCompare(dates.proColEnd, dates.checkStart)) {
        if (this.timeCompare(dates.checkEnd, dates.firstGradeStart)) {
          if (this.timeCompare(dates.firstGradeEnd, dates.showFirstStart)) {
            if (this.timeCompare(dates.showFirstEnd, dates.sendGoodsStart)) {
              if (this.timeCompare(dates.sendGoodsEnd, dates.finalGradeStart)) {
                if (this.timeCompare(dates.finalGradeEnd, dates.showFinalStart)) {
                  if (this.timeCompare(dates.purchaseVoteFirstEnd, dates.finalGradeEnd)) {
                    if (this.timeCompare(dates.firstGradeStart, dates.purchaseVoteFirstStart)) {
                      flag = true;
                    } else {
                      this.$message.error("采购商投票时间必须在初评与终评时间之间");
                    }
                  } else {
                    this.$message.error("采购商投票时间必须在初评与终评时间之间");
                  }
                } else {
                  this.$message.error("终评公示时间必须在终评时间之后");
                }
              } else {
                this.$message.error("终评时间必须在寄送实物时间之后");
              }
            } else {
              this.$message.error("寄送实物时间必须在初评公示时间之后");
            }
          } else {
            this.$message.error("初评公示时间必须在初评时间之后");
          }
        } else {
          this.$message.error("初评时间必须在资质审核时间之后");
        }
      } else {
        this.$message.error("资质审核时间必须在产品征集时间之后");
      }
      return flag;
    },
    timeCompare (time1, time2) {
      if (time1 != null && time2 != null && time1.length > 0 && time2.length > 0) {
        let timedata1 = time1.split('-');
        let timedata2 = time2.split('-');
        for (let i = 0; i < timedata1.length; i++) {
          if (parseInt(timedata1[i]) > parseInt(timedata2[i])) {
            return false;
          }
          if (parseInt(timedata1[i]) < parseInt(timedata2[i])) {
            return true;
          }
        }
        return true;
      } else {
        this.$message.error("存在为空的时间选项未填");
        return false;
      }
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
.title{
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.btn-row{
  margin-top: 10px;
}
.dialog-footer{
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.paging{
  margin: 10px auto;
  text-align: center;
}
</style>
