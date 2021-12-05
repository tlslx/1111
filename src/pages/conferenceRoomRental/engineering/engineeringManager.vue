<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室管理" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="主办单位:" size="mini">
          <el-input v-model.trim="ruleForm.companyName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="申请时间:" size="mini">
          <el-date-picker
            v-model="ruleForm.dates"
            type="daterange"
            align="right"
            unlink-panels
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2"
            style="width: 260px;">
          </el-date-picker>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="主办单位"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span class="blue-underline" @click="goCompanyDetail(scope.row, scope.$index)">{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contactName"
            label="申请人"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="申请时间"
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="手机号"
            align="center"
            width="130">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button @click="submitTck" type="text" size="mini">提交统筹科</el-button>
              <el-button @click="confirmCollection(scope.row, scope.$index)" type="text" size="mini">确认收款</el-button>
              <el-button @click="setCosts(scope.row, scope.$index)" type="text" size="mini">费用设置</el-button>
              <el-button @click="handleCollection(scope.row, scope.$index)" type="text" size="mini">补录</el-button>
              <el-button @click="handleEdit(scope.row, scope.$index)" type="text" size="mini">会议室调整</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>

      <el-dialog
        title="收款凭证"
        :visible.sync="centerDialogVisible"
        width="450px"
        center>
        <el-form  label-position="right" :inline="true"  label-width="110px">
          <el-form-item label="上传凭证：">
            <el-upload
              class="upload-demo item-inline-block"
              :action="uploadApi"
              :headers="header"
              :data="postdata"
              :limit="3"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :on-remove="handleDelete"
              :on-exceed="exceed"
              accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
              :file-list="imgList"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip item-inline-block">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmPay">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        centerDialogVisible: false,
        // 上传
        uploadApi: '',
        header: { Token: this.$store.state.token },
        postdata: { code: 1 },
        imgList: [],
        attachmentList: [],
        uploadMeetingId: '',
        pageInfo: {
          size: 10,
          current: 1,
          total: 0
        },
        ruleForm: {
          companyName: '',
          dates: [],
          meetingStatus: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        textarea: '',
        tableData: [],
        baseApi: process.env.API_FF_URL
      };
    },
    mounted() {
      this.init();
      this.uploadApi = this.baseApi + '/api/customservice/forum/uploadFile';
    },
    methods: {
      init() {
        this.tableData = [];
        let data = {
          current: this.pageInfo.current,
          size: this.pageInfo.size,
          exhibitionSession: 125,
          meetingStartTime: this.ruleForm.dates[0] || null,
          meetingEndTime: this.ruleForm.dates[1] || null,
          companyName: this.ruleForm.companyName || null
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listMeetingFee', data).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        });
      },
      searchForm() {
        this.pageInfo.current = 1;
        this.init();
      },
      resetForm() {
        this.pageInfo.current = 1;
        this.ruleForm.meetingStatus = '01';
        this.ruleForm.companyName = '';
        this.ruleForm.meetingStartTime = '';
        this.ruleForm.meetingEndTime = '';
        this.ruleForm.dates = [];
      },
      // 提交统筹科
      submitTck(row, index) {
        let data = {
          meetingId: row.mettingId
        };
        this.$http.post(this.baseApi + '', data).then(res => {

        });
      },
      // 确认收款
      confirmCollection(row, index) {
        this.centerDialogVisible = true;
        this.uploadMeetingId = row.meetingId;
      },
      confirmPay() {
        let data = {
          meetingId: this.uploadMeetingId,
          fileIds: JSON.stringify(this.attachmentList)
        };
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/confirmPay', data).then(res => {
          this.$message({
            type: "success",
            message: "收款单据提交成功"
          });
        });
      },
      // 费用设置 跳转到明细详情
      setCosts(row, index) {
        this.$router.push({
          path: '/engineeringDetails',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 补录
      handleCollection(row, index) {
        this.$router.push({
          path: '/additionalDetails',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 会议室调整
      handleEdit(row, index) {
        this.$router.push({
          path: '/detailModification',
          query: {
            meetingId: row.meetingId
          }
        });
      },
      // 跳转到会议室明细详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/meetingRoomDetail',
          query: {
            meetingId: row.meetingId
          }
        });
      },

      // 确认收款 图片上传
      beforeUpload(file) {
        let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
        let testPdf = file.type === "application/pdf";
        if (!testPdf && !testFileType) {
          this.$message.warning("文件格式上传错误!");
          return false;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.warning("上传文件大小不能超过 5MB!");
          return false;
        }
        return true;
      },
      exceed(fileList) {
        //  上传的文件超过3个
        this.$message({
          message: '佐证材料不能超过3个',
          type: 'error'
        });
      },
      uploadSuccess(response, file, fileList) {
        if (response.data != null) {
          this.attachmentList.push({ meetingId: this.uploadMeetingId, fileName: file.name, filePath: response.data });
          this.imgList.push({
            name: file.name, url: this.baseApi + '/api/customservice/forum/viewImage/' + response.data
          });
        }
      },
      handleDelete(file, fileList) {
        let aaa = null;
        let bbb = null;
        this.attachmentList.forEach((item, index) => {
          if (file.name === item.fileName) {
            aaa = index;
          }
        });
        this.attachmentList.splice(aaa, 1);
        this.imgList.forEach((item, index) => {
          if (file.name === item.name) {
            bbb = index;
          }
        });
        this.imgList.splice(bbb, 1);
      },
      //分页事件
      handleSizeChange(val) {
        this.pageInfo.size = val;
        this.init();
      },
      handleCurrentChange(val) {
        this.pageInfo.current = val;
        this.init();
      }
    }
  };
</script>

<style scoped>
  .btn-row {
    margin: 10px;
  }
  .paging {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }
  .blue-underline{
    color: #0000ff;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
