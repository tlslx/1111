/**
* @file 违规使用或空置展位
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="违规使用或空置展位" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item size="mini">
          <el-button type="primary"  @click="dialogVisibleSet = true" size="mini">设置达标标准</el-button>
        </el-form-item>

        <el-form-item label="展位违规展位数量<" size="mini" label-width="140px">
          <el-input v-model="form.illeagalValue" placeholder="0" disabled clearable></el-input>
        </el-form-item>

        <el-form-item label="展位空置展位数量<" size="mini" label-width="140px">
          <el-input v-model="form.remainValue" placeholder="0" disabled clearable></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="dialogVisibleData = true">数据导入</el-button>
        </el-form-item><br>

        <el-form-item label="届数:" size="mini" label-width="120px">
          <!-- 届数下拉框 -->
          <el-select v-model="boothParams.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易团:" size="mini" label-width="120px">
          <!-- 交易团下拉框 -->
          <el-select v-model="boothParams.orgId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.deptArr" :label="item.deptName"
            :value="item.deptCode" :key="item.deptCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否达标:" size="mini" label-width="120px">
          <!-- 是否达标下拉框 -->
          <el-select v-model="boothParams.result" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="不达标" value="0"></el-option>
            <el-option label="达标" value="1"></el-option>
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
            prop="boothIlleagalNumber"
            label="展位违规展位数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothRemainNumber"
            label="展位空置展位数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="isPassed"
            label="组展表彰指标-展位违规空置达标情况"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isPassed==0">不达标</span>
              <span v-else-if="scope.row.isPassed==1">达标</span>
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
          <el-button type="primary" @click="confirmManual">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog class="modifyReach" title="设置达标标准" :visible.sync="dialogVisibleSet" width="30%" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="展位违规展位数量<" size="mini" label-width="170px">
            <el-input v-model="form.illeagalValue" onkeypress="return event.keyCode>=48&&event.keyCode<=57" placeholder="0"></el-input>
          </el-form-item>

          <el-form-item label="展位空置展位数量<" size="mini" label-width="170px">
            <el-input v-model="form.remainValue" onkeypress="return event.keyCode>=48&&event.keyCode<=57" placeholder="0"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleSet = false">取 消</el-button>
          <el-button type="primary" @click="setStandarding">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="数据导入" :visible.sync="dialogVisibleData" width="30%" :before-close="handleClose">
        <el-form :model="form">
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
  name: "illegalUse",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      total: 0,
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
      ruleForm: {
        deptArr: [], // 交易团
        exhibitionSession: '', // 届数下拉框
        exhibitionAreaCode: "",
        exhibitionAreaArr: [], // 展区下拉框
        exhibitionSessionArr: []
      },
      form: {
        illeagalValue: '',
        remainValue: ''
      },
      formManual: {
        orgId: '',
        isManual: '',
        modifyReason: '',
        exhibitionNum: ''
      },
      uploadParams: {},
      dialogVisible: false,
      dialogVisibleSet: false,
      formLabelWidth: '120px',
      dialogVisibleData: false,
      boothParams: {
        orgId: "",
        size: 10,
        result: '',
        current: 1,
        exhibitionNum: ''
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      logoUploadUrl: process.env.API_REPORT_URL + '/api/efSupIllegalRemainBoothSta/import'
    };
  },
  mounted() {
    // 违规使用或空置展位 查询
    this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
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
    ...mapActions("enterpriseBooth", ["illegalRemainBoothEdit"]), // 修改标准值
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["illegalRemainBoothUpdateStand"]), // 设置标准值
    ...mapActions("enterpriseBooth", ["efSupIllegalRemainBoothSta"]), // 违规使用或空置展位 查询

    // 搜索框查询
    submitForm() {
      // 违规使用或空置展位 查询
      this.boothParams.current = 1;

      this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
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

        // 违规使用或空置展位 查询
        this.efSupIllegalRemainBoothSta(this.boothParams).then(resp => {
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
        'type': 'IllegalRemain',
        'illeagalValue': this.form.illeagalValue,
        'remainValue': this.form.remainValue
      };

      this.illegalRemainBoothUpdateStand(params).then(res => {
        // 获取标准值
        if (res > 0) {
          // 刷新页面
          this.efSupIllegalRemainBoothSta(this.boothParams).then(resp => {
            this.tableData = resp.records;
            this.total = resp.total;
          });

          this.$message({
            type: 'success',
            message: '更新成功!'
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
      this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
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
      this.formManual.exhibitionNum = row.exhibitionNum;
    },
    // 确定 修改
    confirmManual() {
      this.illegalRemainBoothEdit(this.formManual).then(res => {
        this.efSupIllegalRemainBoothSta(this.boothParams).then(resp => {
          this.total = resp.total;
          this.tableData = resp.records;
        });
      });

      this.dialogVisible = false;
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 跳转
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
        exhibitionNum: this.boothParams.exhibitionNum
      };

      kindo.util.getdown(`${process.env.API_REPORT_URL}/api/efSupIllegalRemainBoothSta/download?${this.encodeSearchParams(downLoadParams)}`, '违规使用或空置展位.xls');
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
.modifyReach .el-input__inner,.modifyReach .el-textarea  {
  width: 60% !important;
}
</style>
