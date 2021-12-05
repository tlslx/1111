<template>
  <!-- <el-tabs v-model="activeName" v-loading="loadinga"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="工作处汇总通知已通过的申请" name="first"></el-tab-pane> -->
  <div>
    <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
      <el-form-item label="展区">
        <el-select size="small" class="inpu" v-model="ruleForm.exhibitionAreaCode" clearable>
          <el-option v-for="(item, index) in this.exhibitionAreaOpts" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"
            :key="index"></el-option>
        </el-select>
        <!-- <el-input maxlength="24" clearable size="small" class="inpu" v-model.trim="ruleForm.exhibitionAreaName"></el-input> -->
      </el-form-item>
      <el-form-item label="交易团">
        <el-input size="small" maxlength="24" clearable  class="inpu" v-model.trim="ruleForm.delegationName" ></el-input>
        <!-- <el-select size="small" class="inpu" clearable v-model="ruleForm.delegationName"> -->
        <!-- <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option> -->
        <!-- </el-select> -->
      </el-form-item>
      <el-form-item label="展期">
        <el-select size="small" class="inpu" clearable v-model="ruleForm.exhibitionPeriod">
          <el-option v-for="(item, index) in this.exhibitionPeriod" :key="index" :value="item.value" :label="item.label"></el-option>
          <!-- <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="展位类别">
        <el-select size="small" class="inpu" clearable v-model="ruleForm.boothType">
          <el-option label="一般性展位" value="1"></el-option>
          <el-option label="中央通道" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知状态">
        <el-select size="small" class="inpu" v-model="ruleForm.noticeStatus">
          <!-- <el-option label="">请选择</el-option> -->
          <el-option label="所有" value="0"></el-option>
          <el-option label="已通知" value="1"></el-option>
          <el-option label="未通知" value="2"></el-option>
          <!-- <el-option label="审核不通过" value="2"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item class="but">
        <el-button type="primary" @click="handleQuery" class="btut">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" ref="multipleTable" @select="handleSelectionChange" @select-all="handleSelectionDhange"
      @selection-change="handleCheckedChange" border style="width: 100%">
      <el-table-column :selectable="checkBox" type="selection" width="55"></el-table-column>
      <el-table-column prop="delegationName" align="center" label="交易团">
      </el-table-column>
      <el-table-column prop="exhibitionPeriod" align="center" label="展期">
      </el-table-column>
      <el-table-column prop="exhibitionAreaName" align="center" label="展区">
      </el-table-column>
      <el-table-column prop="refundNumber" align="center" label="退回展位数">
      </el-table-column>
      <el-table-column prop="boothType" align="center" label="展位类别">
        <template slot-scope="scope">
          {{scope.row.boothType === '1' ? '一般性展位' : '中央通道展位' }}
        </template>
      </el-table-column>
      <el-table-column prop="refundReason" width="200" align="center" label="退回原因">
      </el-table-column>
      <el-table-column prop="noticeStatus" align="center" label="通知状态">
        <template slot-scope="scope">
          {{scope.row.noticeStatus === '1' ? '已通知' : '未通知'}}
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="notification" type="danger" style="padding: 10px 20px; margin-top: 20px">通知</el-button>
    <el-form :inline="true" style="float: right;">
      <el-form-item>
        <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper" :total="pageData.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageData.current"
          :page-size="pageData.size">
        </el-pagination>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%">
      <span>是否确认通知</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSuerd ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <!-- </el-tabs> -->
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    data() {
      return {
        activeName: "first",
        ruleForm: {
          noticeStatus: "0"
        },
        pageData: {
          current: 1,
          size: 10,
          total: 0
        },
        loadinga: true,
        lastCheckData: [], // 上次保存的值
        selectData: [], // 选中的数据索引
        checkList: [], // 临时选中的值
        refundId: [],  // 
        creatorId: "",  // 用户id
        creatorName: "", // 用户姓名
        lastIndex: "",
        getList: [],
        tableData: [],
        centerDialogVisible: false,
        exhibitionAreaOpts: [],
        exhibitionPeriod: []
      };
    },
    async created() {
      // this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
      // 展区
      this.getexhibitionArea().then(res => {
        let newRes = JSON.parse(JSON.stringify(res));
        this.exhibitionAreaOpts = newRes;
      }).catch(e => {});
      this.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    },
    mounted() {
      let appt = {
        current: 1,
        size: 10,
        checkStatus: 1,
        noticeStatus: 0
      };
      this.handleReceivData(appt);
    },
    computed: {
      ...mapGetters("generalApplication", ["getNotifi"]),
      formQuery() {
        return {
          noticeStatus: this.ruleForm.noticeStatus,
          boothType: this.ruleForm.boothType,
          exhibitionPeriod: this.ruleForm.exhibitionPeriod,
          delegationName: this.ruleForm.delegationName,
          exhibitionAreaName: this.ruleForm.exhibitionAreaName,
          exhibitionAreaCode: this.ruleForm.exhibitionAreaCode,
          checkStatus: 1,
          current: this.pageData.current,
          size: this.pageData.size
        };
      }
    },
    methods: {
      ...mapActions("generalApplication", ["getNotifiesApproved", "postNotifiesBpproved"]),
      ...mapActions('nainformation', ['getexhibitionArea']),
      // 接收后台数据
      handleReceivData(value) {
        this.getNotifiesApproved(value).then(res => {
          this.loadinga = false;
          let skb = JSON.parse(JSON.stringify(res.records));
          this.tableData = skb;
          this.pageData.current = res.current;
          this.pageData.size = res.size;
          this.pageData.total = res.total;
          let arr = [];
          if (this.selectData[this.pageData.current - 1]) {
            this.selectData[
              this.pageData.current - 1
            ].forEach((item, index) => {
              arr.push(this.tableData[item]);
            });
          }
          setTimeout(() => {
            this.toggleSelection(arr);
          }, 0);
        }).catch(e => { });
      },
      // 取消
      handleAway() { },
      // 确定
      handleSuerd() {     
        let objnotifi = {
          boothRefundList: [
          ],
          boothRefund: {
            creatorId: this.$store.getters.userInfo.userId,     // 动态获取 字符串格式
            creatorName: this.$store.getters.userInfo.userName     // 动态获取 字符串格式
          }
        };
        for (let i = 0, len = this.refundId.length; i < len; i++) {
          let listb = {
            "refundId": this.refundId[i]
          };
          objnotifi.boothRefundList.push(listb);
        }
        this.postNotifiesBpproved(objnotifi).then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.centerDialogVisible = false;
          let appd = {
            current: 1,
            size: 10,
            checkStatus: 1,
            noticeStatus: 0
          };
          this.handleReceivData(appd);
          this.selectData = [];
          this.getList = [];
        }).catch(e => { });
      },
      // 选中的数据获取
      handleCheckedChange(rows) {
        // this.creatorId = [];
        // this.creatorName = [];
        this.checkList = []; // 初始化，防止重复添加
        this.refundId = [];
        if (rows) {
          rows.forEach(row => {
            // 遍历已选择的数据
            if (row) {
              this.checkList.push(row.exhibitionAreaCode);
              this.refundId.push(row.refundId);
              // this.creatorId.push(row.creatorId);
              // this.creatorName.push(row.creatorName);
            }
          });
        }
      },
      handleSelectionDhange() { },
      // 选中的数据索引获取
      handleSelectionChange(selection, row) {
        this.selectData[this.pageData.current - 1] = []; // 初始化
        this.tableData.forEach((item, index) => {
          for (let i = 0; i < selection.length; i++) {
            // 遍历已选的数据重新填充数组
            if (item.refundId === selection[i].refundId) {
              // 补充：注意这里的判断必须要保证判断的值是唯一的（不一定要拿获取的值进行比较，比如ID值），不然遍历的时候会都添加进去
              this.selectData[this.pageData.current - 1].push(index);
            }
          }
        });
      },
      toggleSelection(rows) {
        // 判断是否选中
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSizeChange() { },
      // 操作页面 分页
      handleCurrentChange(val) {
        this.pageData.current = val;
        this.createdQuery();
      },
      // 查询
      handleQuery() {
        this.pageData.current = 1;
        for (let key in this.exhibitionAreaOpts) {
          if (this.ruleForm.exhibitionAreaCode !== '') {
            if (this.exhibitionAreaOpts[key].value === this.ruleForm.exhibitionAreaCode) {
              this.ruleForm.exhibitionAreaName = this.exhibitionAreaOpts[key].label;
            }
          } else {
            this.ruleForm.exhibitionAreaName = '';
          }
        }
        this.createdQuery();
      },
      // 查询封装
      createdQuery() {
        this.loading = true;
        this.handleReceivData(this.formQuery);
      },
      // 复选框禁用
      checkBox(row, index) {
        // console.log(row); 
        if (row.noticeStatus === '0') {
          return 1;
        } else {
          return 0;
        }
      },
      // 通知
      notification() {
        this.lastCheckData[this.pageData.current - 1] = this.checkList; // 保存当前页获取的值
        //降维 --- 二维数组降至一维数组
        this.getList = Array.prototype.concat.apply([], this.lastCheckData);
        if (this.getList.length === 0) {
          this.$message("请勾选");
          this.centerDialogVisible = false;
        } else {
          this.centerDialogVisible = true;
        }
      }
    }
  };
</script>
<style scoped>
  .but {
    float: right;
    /* margin-right: 190px; */
  }

  .inpu {
    width: 150px;
  }

  .btut {
    padding: 10px 20px !important;
  }

  .el-dialog__body {
    font-size: 14px;
  }
</style>