/**
 * @file 常用文件管理
 */
<template>
  <el-container>
    <el-header>
      <span>常用文件管理</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="届数：">
                <el-select v-model="exhibitionNum" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in exhibitionSession" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
                <el-button type="primary" style="margin-left:15px" @click="queryList">查询</el-button>
                <el-button @click="clearOpinion" style="margin-left:15px">清空</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>
              <el-button @click="exportExcel" type="text">下载XLS</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" style="width: 100%" id="out-table">
          <el-table-column fixed="left" align="center" width="50">
            <template>
              <el-checkbox></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="fileTitle" label="文件标题" align="center"></el-table-column>
          <el-table-column prop="fileType" label="文件类别" align="center" width="210"></el-table-column>
          <el-table-column prop="createDate" label="上传时间" align="center" width="210"></el-table-column>
          <el-table-column prop="creatorName" label="上传人" align="center" width="210"></el-table-column>
          <el-table-column prop="cnt" label="下载次数" align="center" width="210"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-button type="text" @click="seeDownloadDetail(scope.$index, scope.row)">查看下载明细</el-button>
              <el-button type="text" @click="downloadFile(scope.row.fileId, scope.row.fileExId)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" @click="uploadPop" style="margin-top: 15px;">上传文件</el-button>
            <!-- <el-button type="danger">下载</el-button> -->
            <!-- 上传文件 -->
            <el-dialog title="上传文件" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="文件标题">
                  <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="展届">
                  <el-select v-model="sessionValue" placeholder="请选择" style="width:150px">
                    <el-option v-for="item in exhibitionSession" :key="item.code" :label="item.label" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文件类别">
                  <el-select v-model="form.type" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in fileType" :key="item.code" :label="item.label" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="添加文件">
                  <el-upload class="upload-demo" ref="upload" :action="uploadUrl + ''" :before-remove="beforeRemove" :before-upload="beforeUpload" :on-change="handleChange" :file-list="fileList" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">添加文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传word文件，且不超过2MB</div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button @click="cancelUpload">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="18">
            <el-pagination style="float:right; margin-top:20px;" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-size="pageInfo.pageSize" :current-page="pageInfo.currentPage" :total="pageInfo.total">
            </el-pagination>
          </el-col>
        </el-row>

      </template>
    </el-main>
  </el-container>
</template>

<style>
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-header > span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  height: 58px;
  line-height: 58px;
  display: block;
  float: left;
  border-bottom: 2px solid #2b579a;
}
.el-table th > .cell,
.el-table .cell {
  font-size: 12px;
}
</style>

<script>
import http from "@/scripts/framework/http";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
// 引入导出Excel表格依赖
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: '',
        type: ''
      },
      fileList: [],
      sessionValue: "126",
      tableData: [],
      //文件类型
      fileType: [],
      //表单验证
      rule: {},
      //页面信息
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      //届数
      exhibitionSession: [],
      exhibitionNum: "126",
      uploadUrl: process.env.API_SN_URL + '/api/file',
      baseApi: process.env.API_SN_URL,
      baseApFile: process.env.API_COMS_URL
    };
  },
  created() {
    this.getDictionary();
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"]),
    downloadParams() {
      return {
        exhibitionNum: this.sessionValue
      };
    }
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getFileManageExport', 'getFileManageTableRow']), // 1.下载 2.单行文件下载
    getDictionary() {
       // 获取所有展届撒大声地
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.exhibitionSession.push({
            code: element.exhibitionNum,
            label: element.exhibitionNum
          });
        });
      }).catch(error => { });
    },
    list() {
      let params = {
        dictCode: 'efSupFileType'
      };
      http.get(this.baseApFile + "/api/sysDataDictItem/findDicItemList", params).then(data => {
        data.records.forEach(element => {
          let newElement = {};
          newElement.code = element.itemCode;
          newElement.label = element.itemText;
          this.fileType.push(newElement);
        });
        this.getCommfileList();
      }).catch(error => { });
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //获取常用文件列表
    getCommfileList() {
      let params = {
        current: this.pageInfo.currentPage,
        exhibitionNum: this.exhibitionNum,
        size: this.pageInfo.pageSize
      };
      http.get(this.baseApi + "/api/fileManage/list", params).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index];
          //文件类型
          element.fileType = element.fileType + "";
          if (element.fileType != null && element.fileType !== "") {
            element.fileType = $helper.getDicLabel(this.fileType, element.fileType);
          } else {
            element.fileType = '-';
          }
        }
      }).catch(error => { });
    },
    queryList() { // 查询按钮
      this.getCommfileList();
    },
    clearOpinion() {
      this.exhibitionNum = '',
      this.getCommfileList();
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'doc';
      const extension2 = testmsg === 'docx';
      const isLt2M = file.size / 1024 / 1024 < 2;     //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 doc、docx格式!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M;
    },
    //显示上传文件表单
    uploadPop() {
      this.dialogFormVisible = true;
    },
    // 上传文件发生改变
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift();
      }
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'doc';
      const extension2 = testmsg === 'docx';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是word格式!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
      }
    },
    //上传文件
    submitUpload() {
      let formData = new FormData();
      formData.append("file", this.$refs.upload.uploadFiles[0].raw);
      http.putFile(this.uploadUrl, formData).then(data => {
        let fileData = data;
        let params = JSON.stringify({
          fileId: fileData.fileId,
          exhibitionNum: this.sessionValue,
          fileTitle: this.form.title,
          fileType: this.form.type
        });
        http.put(this.baseApi + "/api/fileManage", params).then(data1 => {
          this.$message({
            message: '恭喜你，上传成功!',
            type: 'success'
          });
          this.cancelUpload(); // 封装成清空表单
        }).catch(error => { });
      }).catch(error => { });
    },
    cancelUpload() {
      this.dialogFormVisible = false;
      this.getCommfileList();
      for (let key in this.form) { // 清空上传表单
        this.form[key] = '';
      }
      this.fileList = [];
    },
    //下载文件
    downloadFile(_fileId, _fileExId) {
      // window.open(this.baseApi + "/api/fileManage?fileId=" + row.fileId + "&fileExId=" + row.fileExId + "&unitId=1");
      // this.getCommfileList();
      this.getFileManageTableRow({ fileId: _fileId, fileExId: _fileExId, unitId: '111' });
    },
    //查看下载明细
    seeDownloadDetail(index, row) {
      this.$router.push({
        path: '/downloadDetail',
        query: row
      });
    },

    //翻页
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getCommfileList();
    },

    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      // var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      // /* 获取二进制字符串作为输出 */
      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array"
      // });
      // try {
      //   FileSaver.saveAs(
      //     //Blob 对象表示一个不可变、原始数据的类文件对象。
      //     //Blob 表示的不一定是JavaScript原生格式的数据。
      //     //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      //     //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     //设置导出文件名称
      //     "sheetjs.xlsx"
      //   );
      // } catch (e) {
      //   // if (typeof console !== "undefined") {
      //   // }
      // }
      // return wbout;
      this.getFileManageExport(this.downloadParams);
    }
  },
  mounted() {

    this.list();
  }
};
</script>

