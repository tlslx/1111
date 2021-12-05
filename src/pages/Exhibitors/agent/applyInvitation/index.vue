<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="获取邀请函" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="姓名:" size="mini" prop="personName">
          <el-input v-model="ruleForm.personName"></el-input>
        </el-form-item>
        <el-form-item label="届数:" size="mini" prop="exhibitionNum">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option v-for="(item, index) in exhibitionNum" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数:" size="mini" prop="exhibitionSession">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="1" :value="1"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <div class="bm">
            <el-button type="primary" @click="queryPayment">查询</el-button>
            <el-button type="primary" @click="locationAdd">新增</el-button>
          </div>
        </el-row>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;">
          <!-- <el-table-column
            type="selection">
          </el-table-column> -->
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
            prop="crEnName"
            label="企业英文全称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyId"
            label="企业编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyAddressCh"
            label="企业地址"
            align="center">
          </el-table-column>
          <el-table-column
            prop="personName"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="crChName"
            label="所在国家/地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pidType"
            label="身份证件类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pidNo"
            label="身份证件号码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="printStatus"
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.printStatus==0">未打印</span>
              <span v-else-if="scope.row.printStatus==1">已打印</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right">
            <template slot-scope="scope">
              <el-button @click="handleWithDraw(scope.row, scope.$index)" type="text" size="small"
               :disabled="scope.row.printStatus==1">撤回</el-button>
              <el-button @click="handleDownload(scope.row, scope.$index)" type="text" size="small">下载</el-button>
              <el-button @click="handlePrint(scope.row, scope.$index)" type="text" size="small">预览</el-button>
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
            :total="total"></el-pagination>
        </div>
      </template>
      <!-- 图片预览 -->
      <el-dialog title="图片" :visible.sync="bigPicVisible">
        <img :src="bigPicUrl" alt="" width="100%" height="100%">
      </el-dialog>

      <!-- <el-dialog
        title="新增"
        :visible.sync="dialogTableVisible"
        :before-close="handleClose">
        <p class="remark" v-show="isShow">已达最大额度,不可再选。</p>
        <el-table :data="gridData" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="sex" label="性别">
            <template slot-scope="scope">
              <span v-if="scope.row.sex==0">女</span>
              <span v-else>男</span>
            </template>
          </el-table-column>
        </el-table>
        <p class="remark">邀请函额度已用{{this.totalLimit - this.availableLimit}}，总共{{this.totalLimit}}。</p>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button :disabled="addShow" type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </el-dialog> -->

    </el-tab-pane>
  </el-tabs>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "invitationCard",
  data() {
    return {
      bigPicUrl: "",
      bigPicVisible: false,
      activeName: 'first',
      ids: [],
      total: 0,
      form: {
        paymentNotificationId: ''
      },
      expIds: [],
      idsRow: [],
      userIds: [],
      fileList: [],
      gridData: [],
      isShow: false,
      addShow: false,
      tableData: [],
      arrParams: [],
      companyId: "",
      nowUserId: "",
      totalLimit: "",
      categories: [],
      remittance: '',
      ifoPersonId: [],
      limitLength: '', // 额度的长度
      currentPage: 1,
      uploadParams: {},
      creatorId: "test", // 创建人
      creatorName: "test", // 创建人
      availableLimit: "",
      dialogVisible: false,
      formLabelWidth: '120px',
      dialogTableVisible: false,
      ruleForm: {
        personName: '', // 姓名搜索框
        exhibitionNum: '', // 届数下拉框
        exhibitionSession: 1 // 期数下拉框
      },
      invitationParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        // "loginType": "0",
        // "loginId": 'aaa',
        "orderByField": "card.create_date"
      },
      orderByField: "ip.create_date" // 点击新增时的排序字段

    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
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

    this.getInvitations(Object.assign(this.invitationParams, this.ruleForm)).then(res => {
      this.total = res.total;
      this.tableData = res.records;

      this.tableData.forEach(item => {
        this.companyId = item.companyId;
      });
    });
  },
  methods: {
    ...mapActions("invitationCard", ["delete"]), // 撤回邀请函
    ...mapActions("invitationCard", ["getLimit"]), // 显示额度
    ...mapActions("invitationCard", ["addableList"]), // 可新增邀请函列表
    ...mapActions("invitationCard", ["getInvitations"]), // 查看付款通知书
    ...mapActions("invitationCard", ["updatePrintStatus"]), // 确定新增
    ...mapActions("invitationCard", ["createInvitationCard"]), // 修改打印状态

    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", 'downFileMethods']),
    // 搜索框查询
    queryPayment() {
      this.getInvitations(Object.assign(this.invitationParams, this.ruleForm)).then(res => {
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
    // handleSelection(selection, row) {
    //   this.ifoPersonId.push(row.ifoPersonId);
    // },
    // 撤回
    handleWithDraw(row, index) {
      let queryParams = {
        inviteCardId: row.infoInviteCardId
      };

      this.$confirm('此操作将永久撤回该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(queryParams).then(res => {
          this.$message({
            type: "success",
            message: "撤回成功!"
          });
        });

        let freshParams = {};
        freshParams = this.invitationParams;
        freshParams.personName = this.ruleForm.personName;// 姓名
        freshParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
        freshParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数

        this.getInvitations(freshParams).then(respon => {
          this.total = respon.total;
          this.tableData = respon.records;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      if (this.ifoPersonId.length > 0) {
        this.ifoPersonId.splice(0, this.ifoPersonId.length);
      }
      for (let item of val) {
        this.ifoPersonId.push(item.ifoPersonId);
      }
    },
    // 汇款水单
    paymentEdit(row, index) {
      this.dialogVisible = true;
      this.form.paymentNotificationId = row.paymentNotificationId;
    },
    // 下载
    handleDownload(row, index) {
      let downLoadfile = {
        fileId: row.inviteCardFileId
      };

      let url = '/api/ifoFile/get?fileId=' + downLoadfile.fileId;
      this.downFileMethods(url);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 点击新增页面
    locationAdd() {
      this.$router.push({
        path: "/agent_serve_company_list",
        query: {
          exhibitionNum: this.ruleForm.exhibitionNum,
          exhibitionSession: this.ruleForm.exhibitionSession
        }
      });
      // this.dialogTableVisible = true;

      // // 点击新增参数
      // let queryParams = {};
      // queryParams.orderByField = this.orderByField;
      // queryParams.size = this.invitationParams.size;
      // queryParams.isAsc = this.invitationParams.isAsc;
      // queryParams.current = this.invitationParams.current;
      // // queryParams.loginId = this.invitationParams.loginId;
      // // queryParams.loginType = this.invitationParams.loginType;
      // queryParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
      // queryParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数

      // this.addableList(queryParams).then(res => {
      //   this.limitLength = res.records.length;
      //   this.gridData = res.records;
      // }).then(res => {
      //   // 显示额度
      //   let showParams = {};
      //   // showParams.companyId = this.companyId;// 企业编码
      //   showParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
      //   showParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数

      //   this.getLimit(showParams).then(resp => {
      //     this.totalLimit = resp.totalLimit;
      //     this.availableLimit = resp.availableLimit;
      //   });

      //   let limitLength = this.limitLength;
      //   // this.availableLimit;// 可用额度

      //   if (this.ifoPersonId.length > limitLength) {
      //     this.isShow = true;
      //   }

      //   if (this.ifoPersonId.length || this.ifoPersonId.length > limitLength || this.availableLimit === 0) {
      //     this.addShow = true;
      //   }
      // });
    },
    // 确定新增
    confirmAdd() {
      this.dialogTableVisible = false;

      // 确定新增参数
      let queryParams = {
        userId: "",
        exhibitionNum: this.ruleForm.exhibitionNum, // 届数
        exhibitionSession: this.ruleForm.exhibitionSession // 期数
      };

      // 清空数组
      this.arrParams = [];
      this.ifoPersonId.forEach(item => {
        let currentParams = JSON.parse(JSON.stringify(queryParams));
        currentParams.userId = item;
        this.arrParams.push(currentParams);
      });

      this.createInvitationCard(this.arrParams).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        });

        this.dialogTableVisible = false;

        let freshParams = {};
        freshParams = this.invitationParams;
        freshParams.personName = this.ruleForm.personName;// 姓名
        freshParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
        freshParams.exhibitionSession = this.ruleForm.exhibitionSession;// 期数

        this.getInvitations(freshParams).then(respon => {
          this.total = respon.total;
          this.tableData = respon.records;
        });
      }).catch(e => {
        this.$message.error(e);
        return false;
      });
    },
    // 修改打印状态
    handlePrint(row, index) {
      this.bigPicUrl = process.env.API_POT_URL + `/api/ifoFile/getImg?fileId=${row.inviteCardFileId}`;
      this.bigPicVisible = true;
      // window.print("http://10.40.143.225:8052/api/ifoFile/getImg?fileId=5ce7ac7039eeb30b14a30070");
      // let queryParams = {
      //   inviteCardId: row.infoInviteCardId
      // };

      // this.updatePrintStatus(queryParams).then(res => {

      // });
    }


  }
};
</script>
<style scoped lang="less">
@import "../../../../theme/project/css/flex.less";
.remark{
  color:red;
  margin-left: 20px
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
.waterCertificate {
  float: left;
}
.upload-demo {
  float: left;
  padding: 0 0 0 20px;
  line-height: 40px
}

</style>
