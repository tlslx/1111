<template>
  <div>
    <el-form :inline="true" :model="ruleForm">
      <el-form-item label="届数:" size="mini" prop="exhibitionNum">
        <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
          <el-option v-for="(item, index) in exhibitionNum" :key="index"
            :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期数:" size="mini" prop="exhibitionSession">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option label="1" :value="1"></el-option>
          <el-option label="3" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款类型:" size="mini" prop="paymentInfoType">
        <el-select v-model="ruleForm.paymentInfoType" placeholder="请选择">
          <el-option v-for="(item, index) in paymentInfoTypeArray" :key="index"
            :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到账状态:" size="mini" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option v-for="(item, index) in payStateArray" :key="index"
            :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号:" size="mini" prop="paymentNotificationId">
        <el-input v-model="ruleForm.paymentNotificationId"></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="queryPayment()">查询</el-button>
      </el-form-item>
    </el-form>
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
          prop="paymentNotificationId"
          label="付款通知订单号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="exhibitionNum"
          label="届数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="exhibitionSession"
          label="期数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="展位费用"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="到账状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未支付</span>
            <span v-else-if="scope.row.status==1">部分支付</span>
            <span v-else-if="scope.row.status==2">已核销</span>
            <span v-else-if="scope.row.status==3">价格</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="paymentInfoType"
          label="付款类型"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.paymentInfoType==0">首款</span>
            <span v-else-if="scope.row.paymentInfoType==1">尾款</span>
            <span v-else-if="scope.row.paymentInfoType==2">全额</span>
            <span v-else-if="scope.row.paymentInfoType==3">早鸟补单</span>
            <span v-else-if="scope.row.paymentInfoType==4">其他情况</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="汇款水单"
          align="center">
          <template slot-scope="scope">
            <el-button @click="paymentEdit(scope.row, scope.$index)" type="text" size="small" :disabled="isShow">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="pointUpload(scope.row, scope.$index)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="danger" @click="pointsUpload">下载</el-button>
      <div class="block" style="float:right; margin-top:10px;" >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"></el-pagination>
      </div>
    </template>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="水单证明:" :label-width="formLabelWidth">
          <el-upload
            v-model="remittance"
            class="upload-demo"
            ref="upload"
            :action="url"
            multiple
            :data="uploadParams"
            :on-remove="handleRemove"
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
        <el-button type="primary" @click="remittDialog" :disabled="confirmFlag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      paymentInfoTypeArray: [],
      payStateArray: [],
      confirmFlag: false,
      url: process.env.API_POT_URL + "/api/checkPaymentNotification/uploadRemittance",
      ids: [],
      total: 0,
      form: {
        paymentNotificationId: ''
      },
      expIds: [],
      idsRow: [],
      userIds: [],
      fileIds: [],
      fileList: [],
      isShow: true,
      tableData: [],
      nowUserId: "",
      categories: [],
      remittance: '',
      currentPage: 1,
      fileListArr: [],
      uploadParams: {},
      creatorId: "test", // 创建人
      creatorName: "test", // 创建人
      dialogVisible: false,
      notificationFileId: '',
      formLabelWidth: '120px',
      ruleForm: {
        status: '', // 状态下拉框
        exhibitionNum: '', // 届数下拉框
        paymentInfoType: '', // 付款类型下拉框
        exhibitionSession: 1, // 期数下拉框
        paymentNotificationId: ''
      },
      checkParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        "agentSelectType": "0",
        // "loginType": "0",
        // "loginId": 'aaa',
        "orderByField": "ipn.create_date"
      }

    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
    // paymentInfoTypeArray() {
    //   return kindo.dictionary.get("ifoPaymentType");
    // },
    // payStateArray() {
    //   return kindo.dictionary.get("ifoPaymentStatus");
    // }
  },
  async created() {
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }

    this.paymentInfoTypeArray = await kindo.dictionary.get("ifoPaymentType");
    this.payStateArray = await kindo.dictionary.get("ifoPaymentStatus");

    let queryParams = {};
    queryParams = this.checkParams;
    queryParams.status = this.ruleForm.status;// 到账状态
    queryParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
    queryParams.paymentInfoType = this.ruleForm.paymentInfoType;// 付款类型
    queryParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数
    queryParams.paymentNotificationId = this.ruleForm.paymentNotificationId;//订单号

    this.getCheckPaymentNotification(queryParams).then(res => {
      res.records.forEach(item => {
        this.notificationFileId = item.notificationFileId;

        //判断下载文件按钮是否置灰
        if (item.notificationFileId == null) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      });

      this.total = res.total;
      this.tableData = res.records;
    });
  },
  methods: {
    ...mapActions("payNotification", ["getRemittance"]), // 查看付款通知书付款水单
    ...mapActions("payNotification", ["updateRemittances"]), // 编辑汇款水单
    ...mapActions("payNotification", ["getCheckPaymentNotification"]), // 查看付款通知书

    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", "downFileMethods"]),
    // 搜索框查询
    queryPayment() {
      let queryParams = {};
      queryParams = this.checkParams;
      queryParams.status = this.ruleForm.status;// 到账状态
      queryParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
      queryParams.paymentInfoType = this.ruleForm.paymentInfoType;// 付款类型
      queryParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数
      queryParams.paymentNotificationId = this.ruleForm.paymentNotificationId;//订单号

      this.getCheckPaymentNotification(queryParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.json.PageSize = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.json.PageIndex = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.ids.push(row.notificationFileId);
    },
    // 批量下载
    pointsUpload() {
      if (this.ids.length === 0) {
        this.$message({
          type: "info",
          message: "请至少选择一个付款通知订单"
        });
      } else {
        this.fileIds = this.ids;
        let url = '/api/ifoFile/multiGet?fileIds=' + this.fileIds;
        this.downFileMethods(url);
      }
    },
    // 修改
    // handleEdit(row, index) {
    //   this.$router.push({
    //     path: '/applicationBoothEdit',
    //     query: {
    //       data: row.boothApplyId
    //     }
    //   });
    // },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 汇款水单
    paymentEdit(row, index) {
      this.dialogVisible = true;
      this.form.paymentNotificationId = row.paymentNotificationId;

      let queryParams = {
        paymentNotificationId: row.paymentNotificationId
      };

      // 编辑接口
      this.getRemittance(queryParams).then(res => {
        res.forEach(item => {
          let files = {};
          files.fileId = item.fileId;
          files.name = item.remittanceFileName;
          files.remittanceInfoId = item.remittanceInfoId;
          files.paymentNotificationId = row.paymentNotificationId;
          this.fileList.push(files);
        });
      });
    },
    dialogCancel() {
      this.dialogVisible = false;
      this.fileList = [];// 清空数组
    },
    // handlePreview(file) {
    //   let downLoadfile = {
    //     fileId: file.fileId
    //   };

    //   let url = 'http://10.40.143.225:8052/api/ifoFile/get?fileId=' + downLoadfile.fileId;
    //   window.open(url, '_blank');
    // },
    remittDialog() {
      this.dialogVisible = false;
      // this.fileList = [];// 清空数组

      let params = {
        fileIds: [],
        paymentNotificationId: this.form.paymentNotificationId
      };
      if (this.fileList.length > 0) {
        this.fileList.forEach((item, index) => {
          params.fileIds.push(item.fileId);
        });
      }
      // params.fileIds = this.fileListArr;

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
          //初始列表数据
          if (this.fileList.length > 0) {
            this.fileList.splice(0, this.fileList.length);
          }
        });
      });
    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        let queryParams = {
          paymentNotificationId: this.form.paymentNotificationId
        };
        //成功后调查询接口查id
        this.getRemittance(queryParams).then(reponse => {
          if (this.fileList.length > 0) {
            this.fileList.splice(0, this.fileList.length);
          }
          reponse.forEach(item => {
            let files = {};
            files.fileId = item.fileId;
            files.name = item.remittanceFileName;
            files.remittanceInfoId = item.remittanceInfoId;
            files.paymentNotificationId = this.form.paymentNotificationId;
            this.fileList.push(files);
          });
          this.confirmFlag = false;
        });
      }
    },
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleRemove(file, fileList) {
      if (this.fileList.length > 0) {
        this.fileList.forEach((item, index) => {
          if (file.fileId === item.fileId) {
            this.fileList.splice(index, 1);
          }
        });
      }
      // fileList.forEach(item => {
      //   this.fileListArr.push(item.fileId);
      // });
    },
    beforeUpload(file) {
      this.confirmFlag = true;
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
    // 单行下载
    pointUpload() {
      let downLoadfile = {
        fileId: param
      };
      let url = '/api/ifoFile/get?fileId=' + downLoadfile.fileId;
      this.downFileMethods(url);
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
.waterCertificate {
  float: left;
}
.upload-demo {
  float: left;
  padding: 0 0 0 20px;
  line-height: 40px
}
</style>

<style>
.payNotificate .el-upload-list__item {
  width: 140%
}
</style>
