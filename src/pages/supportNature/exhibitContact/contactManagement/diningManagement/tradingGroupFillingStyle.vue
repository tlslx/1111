/**
* @file 交易团填报样式
* @author:heli
* @date:2019/5/29
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团填报样式" name="first">
      <p>备选人员列表</p>
      <div class="tableTip">
        <el-form :inline="true" :model="ruleForm" class="appliExhibition">
          <el-form-item label="姓名:" size="mini">
            <el-input v-model="ruleForm.eatName" placeholder="请输入内容" clearable></el-input>
          </el-form-item>

          <el-form-item size="mini">
            <el-button type="primary" @click="submitForm()">搜索</el-button>
          </el-form-item>

          <el-form-item size="mini">
            <el-button type="primary" @click="dialogApplyVisible = true">提交大会秘书处</el-button>
          </el-form-item>
        </el-form>

        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          style="width: 100%;"
          @select="handleSelectionChange">
          <el-table-column label="选择" width="56">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.$index" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="eatName"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="eatParticipation"
            label="参会职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="eatUnitAdministrativePosition"
            label="所在单位、部门及行政职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="eatCertificateType"
            label="本届证件类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="eatIdNumber"
            label="进馆证件号码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="usedMeals"
            label="往届曾用餐"
            align="center">
          </el-table-column>
          <el-table-column
            prop="participantsNumber"
            label="本届参会期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationRemarks"
            label="备注"
            align="center">
          </el-table-column>
        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="boothParams.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="boothParams.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </template>

      <p class="personList">第XXX届广交会就餐人员名单</p>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            prop="applicationName"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationParticipation"
            label="参会职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationUnitAdministrativePosition"
            label="所在单位、部门及行政职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationCertificateType"
            label="本届证件类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationIdNumber"
            label="进馆证件号码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="numberParticipants"
            label="本届参会期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationRemarks"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationStatus"
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isPassed==0">不达标</span>
              <span v-else-if="scope.row.isPassed==1">达标</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">取消撤回</el-button>
            </template>
          </el-table-column>
        </el-table>
          <div class="block" style="float:right; margin-top:10px;" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="boothParams.current"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="boothParams.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
      </template>
      <el-button type="primary" @click="submitForm()">保存</el-button>

      <el-dialog class="modifyReach" title="提交申请" :visible.sync="dialogApplyVisible" width="40%" :before-close="handleClose">
        <el-form :model="applyForm">
          <el-form-item label="填报人姓名:" label-width="180px">
            <el-input v-model="applyForm.reporterName" placeholder="请输入内容" required clearable style="width: 60%;"></el-input>
          </el-form-item>

          <el-form-item label="手机号码:" label-width="180px">
            <el-input v-model="applyForm.reporterPhone" placeholder="请输入内容" required clearable style="width: 60%;"></el-input>
          </el-form-item>

          <el-form-item label="期数:" label-width="180px">
            <el-checkbox-group v-model="applyForm.participantsNumber">
              <el-checkbox label="一期" name="type"></el-checkbox>
              <el-checkbox label="二期" name="type"></el-checkbox>
              <el-checkbox label="三期" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="参会职务" label-width="180px">
            <el-select v-model="applyForm.eatParticipation">
              <el-option label="团长" value="0"></el-option>
              <el-option label="副团长" value="1"></el-option>
              <el-option label="秘书长" value="2"></el-option>
              <el-option label="副秘书长" value="3"></el-option>
              <el-option label="工作人员" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在单位、部门及行政职务" label-width="180px">
            <el-input v-model="applyForm.eatUnitAdministrativePosition" placeholder="请输入内容" required clearable style="width: 60%;"></el-input>
          </el-form-item>

          <el-form-item label="单位证明" label-width="180px">
            <el-button type="primary" @click="dialogVisibleData = true">上传附件</el-button>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogApplyVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogApplyVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="上传附件" :visible.sync="dialogVisibleData" width="30%" :before-close="handleClose">
        <el-form :model="applyForm">
          <el-form-item label="导入jpg图片:" :label-width="formLabelWidth">
            <el-upload
              v-model="remittance"
              class="upload-demo"
              ref="upload"
              :action="logoUploadUrl + ''"
              multiple
              accept=".jpg"
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
  name: "tradingGroupFillingStyle",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      radio: '',
      isShow: false,
      expIds: [],
      userIds: [],
      nowUserId: "",
      fileList: [],
      categories: [],
      remittance: '',
      idsRow: [],
      total: 0,
      uploadParams: {},
      delegationId: "",
      formLabelWidth: '120px',
      dialogVisibleData: false,
      dialogApplyVisible: false,
      ruleForm: {
        eatName: ''
      },
      applyForm: {
        reporterName: '',
        reporterPhone: '',
        eatParticipation: '',
        participantsNumber: '',
        eatUnitAdministrativePosition: ''
      },
      boothParams: {
        type: [],
        size: 10,
        current: 1
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      logoUploadUrl: process.env.API_REPORT_URL + '/api/efSupSurveyInfoSta/import'
    };
  },
  mounted() {
    this.boothParams.cecfCode = this.ruleForm.cecfCode;
    this.boothParams.applyYear = this.ruleForm.applyYear;
    this.boothParams.delegationId = this.delegationId;
    this.boothParams.companyName = this.ruleForm.companyName;
    this.boothParams.exhibitionSession = this.ruleForm.exhibitionSession;
    this.boothParams.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

    this.brandApply(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["brandApply"]), // 品牌申请情况汇总


    handlePreview(file) {

    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");

        // 当届工作总结,开展调研情况


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
    getTemplateRow(index, row) { //获取选中数据
      this.templateSelection = row;
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.brandApply(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.brandApply(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 跳转到用户新增页面
    locationAdd() {
      this.$router.push('/applicationBoothAdd');
    },
    // 修改
    handleEdit(row, index) {
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
        cecfCode: this.ruleForm.cecfCode,
        applyYear: this.ruleForm.applyYear,
        companyName: this.ruleForm.companyName,
        delegationId: this.delegationId,
        exhibitionSession: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: this.ruleForm.exhibitionAreaCode
      };

      kindo.util.getdown(`${process.env.API_NA_URL}/api/speciaAreaExternal/companyApply/download?${this.encodeSearchParams(downLoadParams)}`, '品牌申请情况汇总.xls');
    },
    // 申请减少
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.cecfCode = this.ruleForm.cecfCode;
      params.applyYear = this.ruleForm.applyYear;
      params.delegationId = this.delegationId;
      params.companyName = this.ruleForm.companyName;
      params.exhibitionSession = this.ruleForm.exhibitionSession;
      params.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

      this.brandApply(params).then(res => {
        let tableArr = [];

        res.records.forEach(item => {
          if (item.ownReduceUpExhibitionNumber < 0) {
            tableArr.push(item);
          }
        });
        this.total = res.total;
        this.tableData = tableArr;
      });
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
.personList {
  margin-top: 50px;
}
</style>

<style>
.modifyReach .el-select {
  width: 60% !important;
}
</style>
