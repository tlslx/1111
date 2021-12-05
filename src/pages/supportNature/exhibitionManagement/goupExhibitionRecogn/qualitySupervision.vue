/**
* @file 展品质量监督工作执行情况
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展品质量监督工作执行情况" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item size="mini">
          <el-button type="primary" size="mini" @click="dialogVisibleSet = true">设置达标标准</el-button>
        </el-form-item>

        <el-form-item label="本团质检情况报告:" size="mini" label-width="130px">
          <el-input v-model="ruleForm.reportValue" disabled></el-input>
        </el-form-item>

        <el-form-item label="本团质检小组成员名单:" size="mini" label-width="160px">
          <el-input v-model="ruleForm.memberValue" disabled></el-input>
        </el-form-item>

        <el-form-item label="质检部门审核材料:" size="mini" label-width="130px">
          <el-input v-model="ruleForm.materialValue" disabled></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="dialogVisibleData = true">数据导入</el-button>
        </el-form-item><br>

        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="boothParams.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易团:" size="mini">
          <!-- 交易团下拉框 -->
          <el-select v-model="boothParams.orgId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.deptArr" :label="item.deptName"
            :value="item.deptCode" :key="item.deptCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否达标:" size="mini">
          <!-- 是否达标下拉框 -->
          <el-select v-model="boothParams.result" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="不达标" value="0"></el-option>
            <el-option label="达标" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否承担本团企业展品质量与贸易纠纷投诉调解处理责任:" size="mini" label-width="280px">
          <el-select v-model="boothParams.isQualityTradeDuty" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">各交团达标情况</p>
        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="exhibitionNum"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orgId"
            label="交易团代码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="交易团（分团）名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="isQualityReportProvided"
            label="本团质检情况报告"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isQualityReportProvided==0">不符合</span>
              <span v-else-if="scope.row.isQualityReportProvided==1">符合</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isQualityMemberProvided"
            label="本团质检小组成员名单"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isQualityMemberProvided==0">不符合</span>
              <span v-else-if="scope.row.isQualityMemberProvided==1">符合</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isQualityMaterialProvided"
            label="质检部门审核材料"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isQualityMaterialProvided==0">不符合</span>
              <span v-else-if="scope.row.isQualityMaterialProvided==1">符合</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isPassed"
            label="组展表彰指标-质量监管达标情况"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isPassed==0">不达标</span>
              <span v-else-if="scope.row.isPassed==1">达标</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isQualityTradeDuty"
            label="是否承担本团企业展品质量与贸易纠纷投诉调解处理责任"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isQualityTradeDuty==0">否</span>
              <span v-else-if="scope.row.isQualityTradeDuty==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isManual"
            label="手动修改达标情况"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isManual==0">不达标</span>
              <span v-else-if="scope.row.isManual==1">达标</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="modifyReason"
            label="手动修改原因"
            align="center">
          </el-table-column>
          <el-table-column fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
      </template>

      <el-dialog class="modifyReach" title="修改达标情况" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="formManual">
          <el-form-item label="达标情况" label-width="140px">
            <el-select v-model="formManual.isManual">
              <el-option label="不达标" value="0"></el-option>
              <el-option label="达标" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原因" label-width="140px">
            <el-input v-model="formManual.modifyReason" type="textarea" placeholder="特殊处理"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"  @click="confirmManual">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog class="modifyReach" title="设置达标标准" :visible.sync="dialogVisibleSet" width="30%" :before-close="handleClose">
        <el-form :model="propForm">
          <el-form-item label="本团质检情况报告:" size="mini" label-width="210px">
            <el-select v-model="propForm.reportValue" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="本团质检小组成员名单:" size="mini" label-width="210px">
            <el-select v-model="propForm.memberValue" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="质检部门审核材料:" size="mini" label-width="210px">
            <el-select v-model="propForm.materialValue" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleSet = false">取 消</el-button>
          <el-button type="primary" @click="setStandarding">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="数据导入" :visible.sync="dialogVisibleData" width="30%" :before-close="handleClose">
        <el-form :model="propForm">
          <el-form-item label="导入Excel文件:" :label-width="formLabelWidth">
            <el-upload
              v-model="remittance"
              class="upload-demo"
              ref="upload"
              :action="logoUploadUrl + ''"
              multiple
              accept=".xls,.xlsx"
              list-type='text'
              :data="uploadParams"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :on-exceed="onMaterialExceed"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleData = false;">取 消</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "qualitySupervision",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      radio: '1',
      isShow: false,
      expIds: [],
      userIds: [],
      fileList: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      currentPage: 1,
      remittance: '',
      total: 0,
      ruleForm: {
        deptArr: [], // 交易团
        reportValue: '',
        memberValue: '',
        materialValue: '',
        exhibitionSession: '', // 届数下拉框
        exhibitionAreaCode: "",
        exhibitionAreaArr: [], // 展区下拉框
        exhibitionSessionArr: []
      },
      propForm: {
        reportValue: '',
        memberValue: '',
        materialValue: ''
      },
      formManual: {
        isManual: '',
        modifyReason: '',
        qualitySuperviseId: ''
      },
      uploadParams: {},
      dialogVisible: false,
      formLabelWidth: '120px',
      dialogVisibleSet: false,
      dialogVisibleData: false,
      boothParams: {
        orgId: "",
        size: 10,
        result: '',
        current: 1,
        exhibitionNum: '',
        isQualityTradeDuty: ''
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      logoUploadUrl: process.env.API_REPORT_URL + '/api/efSupWorkSuperviseSta/import'
    };
  },
  mounted() {
    // 根据展届展期获取展区和专区的信息
    this.efSupWork(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });

    // 获取所有届数信息
    this.getListAll().then(res => {
      this.ruleForm.exhibitionSessionArr = res;
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      res.records.forEach(item => {
        this.ruleForm.deptArr.push(item);
      });
    });

    // 获取标准值
    let standingParams = {
      type: 'WorkSuperviseSta'
    };

    this.superviseGetStanding(standingParams).then(res => {
      res.records.forEach(item => {
        if (item.item === "reportValue") {
          if (item.value === "1") {
            this.ruleForm.reportValue = '是';
          } else {
            this.ruleForm.reportValue = '否';
          }
        }

        if (item.item === "memberValue") {
          if (item.value === "1") {
            this.ruleForm.memberValue = '是';
          } else {
            this.ruleForm.memberValue = '否';
          }
        }

        if (item.item === "materialValue") {
          if (item.value === "1") {
            this.ruleForm.materialValue = '是';
          } else {
            this.ruleForm.materialValue = '否';
          }
        }

      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["supWorkSuperviseEdit"]), // 修改
    ...mapActions("enterpriseBooth", ["superviseGetStanding"]), // 修改标准值
    ...mapActions("enterpriseBooth", ["superviseUpdateStand"]), // 设置标准值
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["efSupWork"]), // 展品质量监督工作执行情况 查询

    // 搜索框查询
    submitForm() {
      // 根据展届展期获取展区和专区的信息
      this.boothParams.current = 1;

      this.efSupWork(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    handlePreview(file) {

    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");

        // 刷新页面
        this.efSupWork(this.boothParams).then(resp => {
          this.tableData = resp.records;
          this.total = resp.total;
        });
        this.dialogVisibleData = false;
      }
    },
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleRemove(file, fileList) {

    },
    beforeUpload(file) {

    },
    onMaterialExceed() {

    },
    // 设置达标标准
    setStandarding() {
      let params = {
        'type': 'WorkSuperviseSta',
        'reportValue': this.propForm.reportValue,
        'memberValue': this.propForm.memberValue,
        'materialValue': this.propForm.materialValue
      };

      let standingParams = {
        type: 'WorkSuperviseSta'
      };

      this.superviseUpdateStand(params).then(res => {
        // 获取标准值
        if (res > 0) {
          this.superviseGetStanding(standingParams).then(respon => {
            if (this.propForm.reportValue === "1") {
              this.ruleForm.reportValue = '是';
            } else {
              this.ruleForm.reportValue = '否';
            }

            if (this.propForm.memberValue === "1") {
              this.ruleForm.memberValue = '是';
            } else {
              this.ruleForm.memberValue = '否';
            }

            if (this.propForm.materialValue === "1") {
              this.ruleForm.materialValue = '是';
            } else {
              this.ruleForm.materialValue = '否';
            }

            // 刷新页面
            this.efSupWork(this.boothParams).then(resp => {
              this.tableData = resp.records;
              this.total = resp.total;
            });

            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          }).catch(e => {
            this.$message.error(e);
            return false;
          });
        } else {
          this.$message({
            type: 'false',
            message: '更新失败!'
          });
        }
      });

      this.dialogVisibleSet = false;
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.efSupWork(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.efSupWork(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.ids.push(row.userId);
      if (row.userType === "0") {
        this.expIds.push(row.userId);
      } else if (row.userType === "1") {
        this.userIds.push(row.userId);
      }
      this.nowUserId = this.$store.getters.userInfo.userId;

    },
    // 跳转到用户新增页面
    locationAdd() {
      this.$router.push('/applicationBoothAdd');
    },
    // 修改
    handleEdit(index, row) {
      this.dialogVisible = true;

      if (row.isManual != null) {
        this.formManual.isManual = row.isManual + '';
      } else {
        this.formManual.isManual = '';
      }
      this.formManual.modifyReason = row.modifyReason;
      this.formManual.qualitySuperviseId = row.qualitySuperviseId;
    },
    // 确定 修改
    confirmManual() {
      this.tableData = [];

      this.supWorkSuperviseEdit(this.formManual).then(res => {
        this.efSupWork(this.boothParams).then(resp => {
          this.total = resp.total;
          this.tableData = resp.records;
          for (let i = 0; i < resp.records.length; i++) {
            this.tableData.push(resp.records[i]);
          }
        });
      });

      this.dialogVisible = false;
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改
    handleClick(row) {
      this.$router.push({
        path: '/applicationBoothEdit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    /**
   * 拼接对象为请求字符串
   * @param {Object} obj - 待拼接的对象
   * @returns {string} - 拼接成的请求字符串
   */
    encodeSearchParams(obj) {
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    },
    // 下载模板
    downLoad() {
      let downLoadParams = {
        orgId: this.boothParams.orgId,
        result: this.boothParams.result,
        exhibitionNum: this.boothParams.exhibitionNum,
        isQualityTradeDuty: this.boothParams.isQualityTradeDuty
      };

      kindo.util.getdown(`${process.env.API_REPORT_URL}/api/efSupWorkSuperviseSta/download?${this.encodeSearchParams(downLoadParams)}`, '展品质量监督工作执行情况.xls');
    }
  }
};
</script>
<style scoped>
.lines{
  margin-bottom: 20px
}
.title{
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.btn-row{
  margin: 10px;
}
.dialog-footer{
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.check-item{
  margin: 10px;
}
.dialog-userList {
  padding-bottom: 10px;
  height: 32px;
}
.li_style {
  float: left;
  list-style: none;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 10px;
  margin-right: 5px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
}
.tableTip .appliExhibition {
  float: left
}
.tableTip .downLoadXls {
  float: right;
  cursor: pointer;
}
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
  text-decoration: none
}
</style>
<style>
.modifyReach .el-select, .modifyReach .el-textarea {
  width: 60% !important;
}
</style>
