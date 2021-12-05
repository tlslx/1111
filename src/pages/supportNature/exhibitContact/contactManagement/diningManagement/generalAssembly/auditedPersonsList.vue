/**
* @file 待审核人员列表
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="待审核人员列表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="姓名" size="mini">
          <el-input v-model="ruleForm.applicationName" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="单位" size="mini">
          <el-input v-model="ruleForm.applicationOrgName" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="所在单位" size="mini">
          <el-input v-model="ruleForm.applicationUnitAdministrativePosition" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="审核状态:" size="mini">
          <el-select v-model="ruleForm.applicationStatus" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="通过" value="0"></el-option>
            <el-option label="不通过" value="1"></el-option>
            <el-option label="待审核" value="2"></el-option>
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
            label="选择"
            type="selection">
          </el-table-column>
          <el-table-column
            prop="applicationOrgName"
            label="单位"
            align="center">
          </el-table-column>
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
            label="本届申请证件"
            align="center">
          </el-table-column>
          <el-table-column
            prop="certificate"
            label="单位工作证明"
            align="center">
          </el-table-column>
          <el-table-column
            prop="numberParticipants"
            label="参会期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="diningLocation"
            label="就餐地点"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationRemarks"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applicationStatus"
            label="审核状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isManual==0">不达标</span>
              <span v-else-if="scope.row.isManual==1">达标</span>
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
            :total="total"></el-pagination>
        </div>
      </template>

      <el-dialog title="上传组展表彰公布结果" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="上传组展表彰结果:" :label-width="formLabelWidth">
            <el-upload
              v-model="remittance"
              class="upload-demo"
              ref="upload"
              action="http://10.40.143.225:8052/api/checkPaymentNotification/uploadRemittance"
              multiple
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
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="remittDialog">确 定</el-button>
        </span>
      </el-dialog>

      <!--表单返回按钮-->
      <div class="submit_back">
        <el-button type="primary" @click="submitForm()">审核通过</el-button>
        <el-button type="primary" @click="submitForm()">审核不通过</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "auditedPersonsList ",
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
      remittance: '',
      categories: [],
      idsRow: [],
      total: 0,
      delegationId: "",
      ruleForm: {
        applicationName: '',
        applicationStatus: '',
        applicationOrgName: '',
        applicationUnitAdministrativePosition: ""
      },
      uploadParams: {},
      form: {
        reason: '',
        standardSituation: ''
      },
      dialogVisible: false,
      formLabelWidth: '230px',
      boothParams: {
        size: 10,
        current: 1
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  methods: {
    ...mapActions("enterpriseBooth", ["brandApply"]), // 品牌申请情况汇总

    // 搜索框查询
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.current = 1;
      params.cecfCode = this.ruleForm.cecfCode;
      params.applyYear = this.ruleForm.applyYear;
      params.delegationId = this.delegationId;
      params.companyName = this.ruleForm.companyName;
      params.exhibitionSession = this.ruleForm.exhibitionSession;
      params.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

      this.brandApply(params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    downLoadList() { // 上传
      this.dialogVisible = true;
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
    handleEdit(row, index) {
      this.$router.push({
        path: '/applicationBoothEdit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    remittDialog() {
      this.dialogVisible = false;
      this.fileList = [];// 清空数组

      let params = {
        fileIds: [],
        paymentNotificationId: this.form.paymentNotificationId
      };
      params.fileIds = this.fileListArr;

      this.updateRemittances(params).then(res => {
        this.$message({
          type: "success",
          message: "更新成功!"
        });

        let freshParams = {};//刷新页面
        freshParams = this.checkParams;
        freshParams.status = this.ruleForm.status;// 到账状态
        freshParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
        freshParams.paymentInfoType = this.ruleForm.paymentInfoType;// 付款类型
        freshParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数
        freshParams.paymentNotificationId = this.ruleForm.paymentNotificationId;//订单号

        this.getCheckPaymentNotification(freshParams).then(respon => { // 刷新页面
          this.total = respon.total;
          this.tableData = respon.records;
        });
      });
    },
    dialogCancel() {
      this.dialogVisible = false;
      this.fileList = [];// 清空数组
    },
    handlePreview(file) {
      let downLoadfile = {
        fileId: file.fileId
      };

      let url = 'http://10.40.143.225:8052/api/ifoFile/get?fileId=' + downLoadfile.fileId;
      window.open(url, '_blank');
    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
      }
    },
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleRemove(file, fileList) {
      fileList.forEach(item => {
        this.fileListArr.push(item.fileId);
      });
    },
    beforeUpload(file) {
      this.uploadParams.creatorId = this.creatorId;
      this.uploadParams.remittance = this.remittance;
      this.uploadParams.creatorName = this.creatorName;
      this.uploadParams.paymentId = this.form.paymentNotificationId;

      return true;
    },
    onMaterialExceed() {

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.fileList = [];// 清空数组
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
.submit_back{
  margin-top: 20px;
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
.down_btn {
  float: right;
  cursor: pointer;
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
