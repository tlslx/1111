/**
 * @file 业务办展位违规处理
 */
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
.el-table th>.cell, .el-table .cell{
  font-size: 12px;
}
</style>
<template>
  <el-container>
    <el-header>
      <span>业务办展位违规处理</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="届数：">
                <el-select v-model="sessionValue" placeholder="请选择" style="width:150px">
                  <el-option v-for="item in options" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
                <el-button type="primary" @click="searchOpinion" style="margin-left:15px">查询</el-button>
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
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" v-loading="loading" height="490" style="width: 100%">
          <el-table-column prop="companyName" label="参展单位" align="center" width="100"></el-table-column>
          <el-table-column prop="exhibitionAreaCode" label="展区" align="center" width="150"></el-table-column>
          <el-table-column prop="businessDelegationText" label="所属交易团" align="center" width="385"></el-table-column>
          <el-table-column prop="boothNo" label="展位号" align="center" width="160"></el-table-column>
          <el-table-column prop="boothNumber" label="展位数" align="center" width="210"></el-table-column>
          <el-table-column prop="exhibitionNum" label="届数" align="center" width="210"></el-table-column>
          <el-table-column prop="exhibitionSession" label="期数" align="center" width="120"></el-table-column>
          <el-table-column prop="opinion" label="处理意见" align="center" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="230">
            <template slot-scope="scope">
              <el-button type="text" @click="opinionModify(scope.$index, scope.row)">修改</el-button>
              <el-button type="text" @click="lookPrintDetail(scope.$index, scope.row, 0)">查看修改详情</el-button>
              <el-button type="text" @click="downloadForm(scope.row.fileId)">下载</el-button>
              <el-button type="text" @click="prinFile(scope.$index, scope.row)">打印</el-button>
              <el-button type="text" @click="lookPrintDetail(scope.$index, scope.row, 1)">查看打印详情</el-button>
              <el-button type="text" :disabled="scope.row.isNotificated === 1" @click="buildDecision(scope.$index, scope.row)">生成处理决定</el-button>
              <!-- <el-button type="text" @click="toNotice">处罚通知管理</el-button> -->
              <el-button type="text" @click="upHandleFile(scope.$index, scope.row)">上传处理决定书面文件</el-button>
              <el-button type="text" v-if="scope.row.processDecisionFileId!==null" @click="downHandleFile(scope.row.processDecisionFileId)">下载处理决定书面文件</el-button>
              <!-- <el-button type="text" @click="sendMessage">发送处理决定书到站内信</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="opinionEntry">处理意见录入</el-button>
        <!-- 翻页 -->
        <el-pagination style="float:right; margin-top:20px;" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-size="pageInfo.pageSize" :current-page="pageInfo.currentPage" :total="pageInfo.total">
        </el-pagination>
        <el-dialog title="上传处理决定书面文件" :visible.sync="upLoadjds">
          <el-upload style="margin-bottom: 20px;" class="upload-demo" ref="upload" :on-change="handleChange" :action="uploadUrl" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过2MB</div>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitUpload">提交</el-button>
          </div>
        </el-dialog>
      </template>
    </el-main>
  </el-container>
</template>
<script>
import http from "@/scripts/framework/http";
import { mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  data() {
    return {
      loading: true,
      form: {},
      hideCol: false,
      options: [],
      sessionValue: "126",
      tableData: [],
      total: 10,
      upLoadjds: false,
      upLoadOpinionID: "",
      fileList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dictArray: {
        companys: [],
        exhibitionArea: [],
        businessDelegations: []
      },
      uploadUrl: process.env.API_SN_URL + "/api/opinion/uploadProcessDecision",
      baseApi: process.env.API_SN_URL
    };
  },
  created() {
     // 获取全部展区
    this.Allbusinesslist();
    this.getDictionary();
  },
  computed: {
    downloadParams() {
      return {
        exhibitionNum: this.sessionValue
      };
    }
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getBusinessExhibitPositionOpinionExport', 'getPunishNotificatonZGBExport', 'getPunishNotificatonTempExport']), // 下载
    // 获取展区
    Allbusinesslist() {
      http.get(this.baseApi + "/api/sysDataDictItem/findDicItemListByExhibitionArea").then(data => {
        data.records.forEach(element => {
          this.dictArray.exhibitionArea.push({
            code: element.itemCode,
            label: element.itemText
          });
        });
      }).catch(error => { });

    },
     //获取字典
    getDictionary() {
      // 获取所有展届
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.options.push({
            code: element.exhibitionNum,
            label: element.exhibitionNum
          });
        });
      }).catch(error => { });

    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //读取数据
    getData() {
      let params = {
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize,
        isAsc: false,                           //是否正序排序
        orderByField: 'opinion.create_date',    //排序字段
        exhibitionNum: this.sessionValue
      };
      http.get(this.baseApi + "/api/opinion/list", params).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index];
          element.exhibitionAreaValue = element.exhibitionAreaCode;
        //   element.companyValue = $helper.getDicLabel(this.dictArray.companys, element.companyId);   //参展单位
          element.exhibitionAreaCode = $helper.getDicLabel(this.dictArray.exhibitionArea, element.exhibitionAreaCode);    //展区
        //   element.businessDelegationCode = $helper.getDicLabel(this.dictArray.businessDelegations, element.businessDelegationCode);    //交易团
        }
      }).catch(error => { });
    },
    //查询处理意见
    searchOpinion() {
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    // 清空意见
    clearOpinion() {
      this.sessionValue = '';
      this.getData();
    },
    //生成处理决定
    buildDecision(index, row) {
      localStorage.setItem("opinionlist_exh", this.sessionValue);
      this.$router.push({
        path: '/template',
        query: {
          row, sessionValue: this.sessionValue
        }
      });
    },
    //处罚通知管理
    // toNotice() {
    //   this.$router.push('/opinionNoticManage');
    // },
    //查看修改详情
    seeModifyDetail(index, row) {
      this.$router.push({
        path: '/opinionModifyDetail',
        query: row
      });
    },
    //下载
    downloadForm(_fileId) {
     // window.open(this.baseApi + "/api/file?fileId=" + row.fileId);
      this.getPunishNotificatonTempExport({ fileId: _fileId });
    },
    // 上传文件发生改变
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift();
      }
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'pdf';
      // const extension2 = testmsg === 'docx';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: '上传文件只能是pdf格式!',
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
      // return extension || extension2 && isLt2M;
    },
    //上传处理决定书面文件
    upHandleFile(index, row) {
      //打开弹窗
      this.upLoadOpinionID = row.opinionId;
      this.upLoadjds = true;
    },
    // 移除文件
    handleRemove(file, fileList) {
    },
    //上传
    submitUpload() {
      if (this.$refs.upload.uploadFiles.length > 0) {
        this.upLoadjds = false;
        let formData = new FormData();
        formData.append("opinionId", this.upLoadOpinionID);
        formData.append("file", this.$refs.upload.uploadFiles[0].raw);
        http.postJson(this.uploadUrl, formData).then(data => {
          this.$message.success("上传成功！");
          //清空容器
          this.fileList = [];
          //重载列表
          this.getData();
        }).catch(error => { });
      } else {
        this.$message.warning("请添加文件再提交！");
      }
    },
    //下载处理决定书
    downHandleFile(processDecisionFileId) {
      // window.open(this.baseApi + "/api/file?fileId=" + row.processDecisionFileId);
      this.getPunishNotificatonTempExport({ fileId: processDecisionFileId });
    },
    //发送处理决定书到站内信
    sendMessage() {
      this.$message({
        showClose: true,
        message: '发送成功！',
        type: 'success'
      });
    },
    //翻页
    handleCurrentChange(current) {
      this.pageInfo.currentPage = current;
      this.getData();
    },
    // 下载
    exportExcel() {
      this.getBusinessExhibitPositionOpinionExport(this.downloadParams);
    },
    //处理意见录入
    opinionEntry() {
      this.$router.push({
        path: '/opinionEntry'
      });
    },
     //修改处理意见
    opinionModify(index, row) {
      this.$router.push({
        path: '/opinionModify',
        query: row
      });
    },
    //查看打印或修改详情
    lookPrintDetail(index, row, type) {
      if (type === 0) {   //修改详情
        let params = {
          opinionId: row.opinionId,
          type: 0     //0修改详情，1打印详情
        };
        http.get(this.baseApi + "/api/opinion/getHistory", params).then(data => {
          this.$router.push({
            path: '/opinionModifyDetail',
            query: { data: data }
          });
        }).catch(error => { });

      } else {            //打印详情
        let params = {
          opinionId: row.opinionId,
          type: 1     //0修改详情，1打印详情
        };
        http.get(this.baseApi + "/api/opinion/getHistory", params).then(data => {
          this.$router.push({
            path: '/opinionPrintDetail',
            query: { data: data }
          });
        }).catch(error => { });
      }
    },
     //打印
    prinFile(index, row) {
      // window.open(this.baseApi + "/api/file?fileId=" + row.excelFileId);
      // let thisObj = this.baseApi + "/api/file?fileId=" + row.excelFileId;
      // this.printExcel(thisObj);

      //增加打印记录
      let params = JSON.stringify({
        opinionId: row.opinionId
      });
      window.open(window.location.origin + "/#/oprintContent?data=" + encodeURI(JSON.stringify(row)));
      http.put(this.baseApi + "/api/opinion/addPrintHistory", params).then(data => {
        this.$message({
          message: '恭喜你，打印成功！',
          type: 'success'
        });
      }).catch(error => { });
    }
  },
  updated() {
    this.loading = false;
  },
  mounted() {
    this.getData();
    let item = localStorage.getItem("opinionlist_exh");
    if (item != null) {
      this.sessionValue = item;
      localStorage.removeItem("opinionlist_exh");
    }
  }
};
</script>

