<template>
  <div v-loading.fullscreen="fullLoading">
    <!-- <el-button type="danger" @click="goBack">返回</el-button> -->
    <!-- form表单 -->
    <el-form :inline="true" :model="formData" size="small">
      <el-form-item label="">
        <el-select v-model="formData.aptitudeSource" placeholder="资质来源">
          <el-option label="请选择" value=""></el-option>
          <el-option label="本企业所有" value="1"></el-option>
          <el-option label="绝对控股子公司所有" value="2"></el-option>
          <el-option label="相对控股子公司所有" value="3"></el-option>
          <el-option label="绝对控股母公司所有" value="4"></el-option>
          <el-option label="绝对控股母公司的其他绝对控股子公司所有" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 50px;">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- tabel表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" label="海关编码">
        <template slot-scope="scope">
          <span>{{scope.row.customCode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="correlationCompanyName" label="企业名称"></el-table-column>
      <el-table-column align="center" prop="exhibitionAreaName" label="编码使用展区"></el-table-column>
      <el-table-column align="center" prop="aptitudeSource" label="资质来源">
        <template slot-scope="scope">
          {{ scope.row.aptitudeSource | aptitudeStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册登记证书">
        <template slot-scope="scope">
          <img :src="scope.row.customsCodeCertificate" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核结果" prop="checkResult">
        <template slot-scope="scope">
          <span>{{scope.row.checkResult | checkState }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" style="width: 300px;">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="isTransit(scope.row)">通过</el-button>
          <el-button type="primary" size="mini" @click="isNotransit(scope.row)">不通过</el-button>
          <el-button type="primary" size="mini" @click="handelEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handelDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="danger" @click="handelAdd">新增</el-button>
      <!-- 新增弹窗 -->
    <el-dialog :title="headTitle" width="500px" :visible.sync="isShow" @close="closeDialog">
      <el-card>
        <div>
          <el-form :model="formDat" label-width="150px">
            <el-form-item label="海关编码：">
              <el-input v-model.trim="formDat.customCode" maxlength="10" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来源：">
              <el-select v-model="formDat.aptitudeSource">
                <el-option label="本企业所有" value="1"></el-option>
                <el-option label="绝对控股子公司所有" value="2"></el-option>
                <el-option label="相对控股子公司所有" value="3"></el-option>
                <el-option label="绝对控股母公司所有" value="4"></el-option>
                <el-option label="绝对控股母公司的其他绝对控股子公司所有" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编码对应企业名称：">
              <el-input v-model.trim="formDat.correlationCompanyName" placeholder="请输入" maxlength="24"></el-input>
            </el-form-item>
            <el-form-item label="编码使用展区：">
              <el-select v-model="formDat.exhibitionArea">
                <el-option v-for="(item, index) in optionsAdd" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="海关编码登记证书：">
              <el-upload
                class="upload-demo"
                action="http://10.40.143.20:9003/api/applyCustomCode/update"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                auto-upload
                :on-exceed="handleExceed"
                :on-success="handelSucces"
                :file-list="fileList">
                <el-button size="small" type="primary" @click="handelUpload">点击上传</el-button>
                <span slot="tip" class="el-upload__tip" style="color: #f00;">（不超过500k）</span>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="handelServe">保存</el-button>
              <el-button @click="handelCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-dialog>
    <!-- 确认删除 -->
    <el-dialog title="提示" :visible.sync="isSureDel" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSureDel = false">取 消</el-button>
        <el-button type="primary" @click="isSureDeleta">确 定</el-button>
      </span>
    </el-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullLoading: true,
      getThrou: false, //通过按钮
      options: [
        { label: "全部", value: "" },
        { label: "家电", value: "a101" },
        { label: "家纺", value: "a102" },
        { label: "工程农机（室外）", value: "a103" }
      ],
      optionsAdd: [
        { label: "家电", value: "a101" },
        { label: "家纺", value: "a102" },
        { label: "工程农机（室外）", value: "a103" }
      ],
      headTitle: "",
      obj: {
        "brandApplyId": ""
      },
      objOne: {
        "brandApplyId": ""
      },
      isSureDel: false,
      queryData: [],
      fileList: [],
      isShow: false,
      tableData: [],
      editData: [],
      formDat: {
        customCode: "",
        aptitudeSource: "",
        correlationCompanyName: "",
        exhibitionAreaName: "",
        customsCodeCertificate: "",
        exhibitionArea: ""
      },
      formData: {
        aptitudeSource: ""
      }
    };
  },
  filters: {
    aptitudeStatus(value) {
      // 资质来源
      let val = value - 0;
      if (val === 1) {
        return "本企业所有";
      } else if (val === 2) {
        return "绝对控股子公司所有";
      } else if (val === 3) {
        return "相对控股子公司所有";
      } else if (val === 4) {
        return "绝对控股母公司所有";
      } else {
        return "绝对控股母公司的其他绝对控股子公司所有";
      }
    },
    checkState(value) {
      // let val = value - 0;
      if (value === "1") {
        return "审核通过";
      } else if (value === "0") {
        return "审核不通过";
      } else {
        return "未审核";
      }
    }
  },
  created() {
    // 获取公司的信息
    this.queryData = this.$router.history.current.query.dataType;
  },
  mounted() {
    this.objOne.brandApplyId = this.queryData.brandApplyId;
    this.getPage(this.objOne);
  },
  computed: {
    // ...mapGetters("tradeGroupAudit", ["resultData"])
  },
  methods: {
    ...mapActions("tradeGroupAudit", [
      "getauditCustomsCode",
      "getqueryIdCustomsCode", // 获取页面数据
      "deletcustomsCode",
      "addcustomsCode",
      "updateapplyCustomCode"
    ]),
      // 点击上传
    handelUpload() {
      // this.fileList.push(this.formDat.customsCodeCertificate);
    },
      // 关闭弹框
    closeDialog() {
      for (let key in this.formDat) {
        this.formDat[key] = '';
      }
      this.getPage(this.objOne);
      this.formData.aptitudeSource = "";
      // this.fileList = [];
    },
    // 通过
    isTransit(val) {
      this.getThrou = true;
      let dataTwo = {
        'brandApplyId': val.brandApplyId,
        'customId': val.customId,
        'checkResult': 1,
        'checkUserId': this.$store.getters.userInfo.userId,
        'checkUser': this.$store.getters.userInfo.userName
      };
      this.getauditCustomsCode(dataTwo).then(res => {
        this.getPage(this.objOne);
      }).catch(err => {
      });
    },
    // 不通过
    isNotransit(val) {
      this.getThrou = true;
      let dataTwo = {
        'brandApplyId': val.brandApplyId,
        'customId': val.customId,
        'checkResult': 0,
        'checkUserId': this.$store.getters.userInfo.userId,
        'checkUser': this.$store.getters.userInfo.userName
      };
      this.getauditCustomsCode(dataTwo).then(res => {
        this.getPage(this.objOne);
      }).catch(err => {
      });
    },
    // 页面初始化
    getPage(Url) {
      this.tableData = [];
      Url["brandApplyId"] = this.queryData.brandApplyId;
      this.getqueryIdCustomsCode(Url).then(res => {
        this.fullLoading = false;
        this.tableData = res.records;
      }).catch(e => {});
    },
      // 编辑
    handelEdit(edit) {
      this.editData = edit;
      this.headTitle = "编辑";
      this.isShow = true;
      this.formDat["brandApplyId"] = edit.brandApplyId;
      this.formDat["customId"] = edit.customId;
      this.formDat["customsCodeCertificate"] = edit.customsCodeCertificate;
      this.formDat = JSON.parse(JSON.stringify(edit));
    },
    // 取消新增
    handelCancel() {
      this.isShow = false;
      for (let key in this.formDat) {
        this.formDat[key] = '';
      }
      // this.getPage(this.objOne);
      this.formData.aptitudeSource = "";
    },
    // 新增弹窗
    handelAdd() {
      this.isShow = true;
      this.headTitle = "新增";
      // 清空表单中所有属性的值
      for (let key in this.formDat) {
        this.formDat[key] = '';
      }
      this.formData.aptitudeSource = "";
    },
      // 删除
    handelDel(del) {
      this.isSureDel = true;
      this.obj["brandApplyId"] = del.brandApplyId;
      this.obj["customId"] = del.customId;
    },
    // 确认删除
    isSureDeleta() {
      this.deletcustomsCode(this.obj).then(res => {
        this.isSureDel = false;
        this.getPage(this.objOne);
      }).catch(e => {});
    },
      // 编辑/新增
    handelServe() {
      if (this.formDat.brandApplyId) {
        if (this.formDat.customCode.length !== 10) {
          this.$message("海关编码不能少于十位数字");
        } else if (this.formDat.customCode.replace(/^([1-9][0-9]*)$/, "")) {
          this.$message("海关编码只能输入正整数");
        } else if (this.formDat.aptitudeSource === "") {
          this.$message("来源不能为空");
        } else if (this.formDat.correlationCompanyName === "") {
          this.$message("编码对应企业名称不能为空");
        } else if (this.formDat.exhibitionArea === "") {
          this.$message("编码使用展区不能为空");
        } else {
          this.updateapplyCustomCode(this.formDat).then(res => {
            this.getPage(this.objOne);
            // 清空表单中所有属性的值
            for (let key in this.formDat) {
              this.formDat[key] = '';
            }
            this.formData.aptitudeSource = "";
            this.isShow = false;
          }).catch(e => {});
        }
      } else {
        // 新增
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value === this.formDat.exhibitionArea) {
            this.formDat["exhibitionAreaName"] = this.options[i].label;
          }
        }
        if (this.formDat.customCode.length !== 10) {
          this.$message("海关编码不能少于十位数字");
        } else if (this.formDat.customCode.replace(/^([1-9][0-9]*)$/, "")) {
          this.$message("海关编码只能输入正整数");
        } else if (this.formDat.aptitudeSource === "") {
          this.$message("来源不能为空");
        } else if (this.formDat.correlationCompanyName === "") {
          this.$message("编码对应企业名称不能为空");
        } else if (this.formDat.exhibitionArea === "") {
          this.$message("编码使用展区不能为空");
        } else {
          this.obj["exhibitionAreaName"] = this.formDat.exhibitionAreaName;
          this.obj["customCode"] = this.formDat.customCode;
          this.obj["exhibitionArea"] = this.formDat.exhibitionArea;
          this.obj["correlationCompanyName"] = this.formDat.correlationCompanyName;
          this.obj["aptitudeSource"] = this.formDat.aptitudeSource;
          this.obj["customsCodeCertificate"] = "company/custom/1/13.png";
          this.obj["checkUserId"] = this.$store.getters.userInfo.userId;
          this.obj["checkUser"] = this.$store.getters.userInfo.userName;
          this.obj["brandApplyId"] = this.queryData.brandApplyId;
          this.addcustomsCode(this.obj).then(res => {
            this.getPage(this.objOne);
            this.formData.aptitudeSource = "";
            this.isShow = false;
          }).catch(e => {});
        }
      }
    },
    // 查询
    onSubmit() {
      this.objOne["aptitudeSource"] = this.formData.aptitudeSource;
      this.getPage(this.objOne);
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file, fileList) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前仅能上传一个文件`);
    },
    handelSucces(response, file, fileList) {},
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除${file.name}？`);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>

</style>


