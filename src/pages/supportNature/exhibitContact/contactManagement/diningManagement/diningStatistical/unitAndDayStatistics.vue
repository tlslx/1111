/**
* @file 按单位和天统计
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="按单位和天统计" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()" size="mini">设置达标标准</el-button>
        </el-form-item>

        <el-form-item label="一般性展位数量安排达标标准:" size="mini" label-width="240px">
          <el-input v-model="ruleForm.cecfCode" placeholder="100" class="numStandard" clearable>
          </el-input>
          <span class="numPercent">%</span>
        </el-form-item>

        <el-form-item label="贫困地区展位数量安排达标标准:" size="mini" label-width="240px">
          <el-input v-model="ruleForm.cecfCode" placeholder="100%" clearable></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="dialogVisibleData = true">数据导入</el-button>
        </el-form-item><br>

        <el-form-item label="届数:" size="mini" label-width="120px">
          <!-- 届数下拉框 -->
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易团:" size="mini" label-width="120px">
          <!-- 交易团下拉框 -->
          <el-select v-model="delegationId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.deptArr" :label="item.deptName"
            :value="item.deptCode" :key="item.deptCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否达标:" size="mini" label-width="120px">
          <!-- 是否达标下拉框 -->
          <el-select v-model="ruleForm.applyYear" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="达标" value="0"></el-option>
            <el-option label="不达标" value="1"></el-option>
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
            prop="exhibitionSession"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applyYear"
            label="交易团代码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationName"
            label="交易团（分团）名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cecfCode"
            label="一般性展位数量安排完成程度"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="贫困地区数量安排完成程度"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyArea"
            label="组展表彰指标-数量安排达标情况"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaName"
            label="手动修改达标情况"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upExhibitionNumber"
            label="手动修改原因"
            align="center">
          </el-table-column>
          <el-table-column fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
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
        <el-form :model="form">
          <el-form-item label="达标情况" label-width="140px">
            <el-select v-model="form.standardSituation">
              <el-option label="达标" value="0"></el-option>
              <el-option label="不达标" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原因" label-width="140px">
            <el-input v-model="form.reason" type="textarea" placeholder="特殊处理"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="数据导入" :visible.sync="dialogVisibleData" width="20%" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="导入Excel文件:" :label-width="formLabelWidth">
            <el-upload
              v-model="remittance"
              class="upload-demo"
              ref="upload"
              action="http://10.40.143.225:8052/api/checkPaymentNotification/uploadRemittance"
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
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="remittDialog">确 定</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "unitAndDayStatistics",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      radio: '1',
      expIds: [],
      userIds: [],
      fileList: [],
      nowUserId: "",
      isShow: false,
      remittance: '',
      categories: [],
      idsRow: [],
      currentPage: 1,
      total: 0,
      delegationId: "",
      ruleForm: {
        deptArr: [], // 交易团
        cecfCode: '', // 广交会编码
        applyYear: '', // 年份下拉框
        companyName: '', // 届数下拉框
        exhibitionSession: '', // 届数下拉框
        exhibitionSessionArr: []
      },
      uploadParams: {},
      form: {
        reason: '',
        standardSituation: ''
      },
      dialogVisible: false,
      formLabelWidth: '150px',
      dialogVisibleData: false,
      formAward: {
        checkboxGroup: []
      },
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
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["brandApply"]), // 品牌申请情况汇总
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团

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
    // 修改
    handleClick(row) {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
    remittDialog() {
      this.dialogVisibleData = false;
      // this.fileList = [];// 清空数组

      // let params = {
      //   fileIds: [],
      //   paymentNotificationId: this.form.paymentNotificationId
      // };
      // params.fileIds = this.fileListArr;

      // this.updateRemittances(params).then(res => {
      //   this.$message({
      //     type: "success",
      //     message: "更新成功!"
      //   });

      //   let freshParams = {};//刷新页面
      //   freshParams = this.checkParams;
      //   freshParams.status = this.ruleForm.status;// 到账状态
      //   freshParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
      //   freshParams.paymentInfoType = this.ruleForm.paymentInfoType;// 付款类型
      //   freshParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数
      //   freshParams.paymentNotificationId = this.ruleForm.paymentNotificationId;//订单号

      //   this.getCheckPaymentNotification(freshParams).then(respon => { // 刷新页面
      //     this.total = respon.total;
      //     this.tableData = respon.records;
      //   });
      // });
    },
    dialogCancel() {
      this.dialogVisibleData = false;
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
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
.tableTip .appliExhibition {
  float: left
}
.tableTip .downLoadXls {
  float: right;
  cursor: pointer;
}
.numStandard {
  position: relative;
}
.numPercent {
  top: 4%;
  left: 20%;
  position: absolute;
}
</style>
<style>
.modifyReach .el-select, .modifyReach .el-textarea {
  width: 60% !important;
}
</style>
