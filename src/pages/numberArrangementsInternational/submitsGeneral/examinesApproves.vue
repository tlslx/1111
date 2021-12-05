<template>
  <div>
    <!-- <el-tabs v-model="activeName" v-loading="loadinga" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="审批退回申请" name="first"></el-tab-pane> -->

    <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
      <el-form-item label="展区">
        <!-- <el-input maxlength="24" clearable size="small" class="inpu" v-model.trim="ruleForm.exhibitionAreaName">
        </el-input> -->
        <el-select v-model="ruleForm.exhibitionAreaCode" clearable size="small" class="inpu">
          <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易团">
        <el-input size="small" class="inpu" clearable maxlength="24" v-model="ruleForm.delegationName"></el-input>
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
      <el-form-item label="审核状态">
        <el-select size="small" class="inpu" v-model="ruleForm.checkStatus" clearable placeholder="请选择">
          <!-- <el-option label="">请选择</el-option> -->
          <el-option label="未审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="审核不通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="but">
        <el-button type="primary" @click="onSubmit" class="btut">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="delegationName" align="center" label="交易团">
      </el-table-column>
      <el-table-column prop="exhibitionPeriod" align="center" label="展期">
      </el-table-column>
      <el-table-column prop="exhibitionAreaName" align="center" label="展区">
      </el-table-column>
      <el-table-column prop="boothType" width="120" align="center" label="展位类别">
        <template slot-scope="scope">
          {{scope.row.boothType === '1' ? '一般性展位' : '中央通道展位'}}
        </template>
      </el-table-column>
      <el-table-column prop="refundNumber" align="center" width="120" label="退回展位数">
      </el-table-column>
      <el-table-column prop="refundReason" align="center" width="200" label="退回原因">
      </el-table-column>
      <el-table-column prop="checkStatus" align="center" width="120" label="审核状态">
        <template slot-scope="scope">

          {{scope.row.checkStatus === '0' ? '未审核' :(scope.row.checkStatus === '1' ? '审核通过' : '审核不通过')}}
        </template>
      </el-table-column>
      <el-table-column prop="deposit" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handeldeposit(scope.row)">通过
          </el-button>
          <el-button size="mini" type="text" @click="handelAdit(scope.row)">不通过</el-button>
        </template>
        <!-- <template slot-scope="scope">
        <el-button type="text" size="mini" @click="handeldeposit(scope.row.boothAffirmId)">通过
        </el-button>
        <el-button size="mini" type="text" @click="handelAdit(scope.row.boothAffirmId)">不通过</el-button>
      </template> -->
      </el-table-column>
      <el-table-column prop="examineOpinion" width="200" align="center" label="不通过原因">
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handDownload">下载</el-button>
    <el-form :inline="true" style="float: right;">
      <el-form-item>
        <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper"
          :total="pagaData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pagaData.current" :page-size="pagaData.size">
        </el-pagination>
      </el-form-item>
    </el-form>
    <el-dialog title="审核" :visible.sync="dialogVisible" width="500px" @close="handelCure">
      <el-form :model="form">
        <el-form-item label="是否计入基数" :label-width="formLabelWidth">
          <el-select clearable v-model="form.isSubscription" style="width: 120px">
            <el-option label="是" value="YES"></el-option>
            <el-option label="否" value="NO"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handelSure" class="btut">确 定</el-button>
        <el-button @click="handelDure" class="btut">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="审核" height="300" :visible.sync="dialogVisi" width="500px" @close="handelBure">
      <el-form :model="form">
        <el-form-item label="不通过原因：">
          <el-input type="textarea" row="3" v-model="formInline.coceralName" maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handelFure" class="btut">确 定</el-button>
        <el-button @click="handelAure" class="btut">取 消</el-button>
      </span>
    </el-dialog>
    <!-- </el-tabs> -->
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    data() {
      return {
        exhibitionAreaOpts: [],
        exhibitionPeriod: [],
        activeName: "first",
        formInline: {
          coceralName: ""
        },
        ruleForm: {
          // delegationName: '',
          // boothType: '',
          // exhibitionPeriod: '',
          // refundNumber: '',
          // refundReason: '',
          // exhibitionAreaName: ''
        },
        loadinga: true,
        tableData: [
        ],
        list: {},
        listap: {},
        objSub: {},
        pagaData: {
          current: 1,
          size: 10,
          total: 0
        },
        form: {
          isSubscription: ""
        },
        token: "",
        dialogVisible: false, // 通过
        dialogVisi: false, // 不通过
        formLabelWidth: '120'
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
      this.token = localStorage.getItem("USER_TOKEN");
    },
    mounted() {
      this.handelReceivingData(this.pagaData);
    },
    computed: {
      ...mapGetters("generalApplication", ["getAppli", "postRetur"])
    },
    methods: {
      ...mapActions("generalApplication", ["getApplicationReturning", "postApplicationReturn"]),
      ...mapActions('nainformation', ['getexhibitionArea']),
      // 接收后台数据
      handelReceivingData(val) {
        this.getApplicationReturning(val).then(res => {
          this.loadinga = false;
          // console.log(res);
          this.tableData = res.records;
          this.pagaData.current = res.current;
          this.pagaData.size = res.size;
          this.pagaData.total = res.total;
        }).catch(e => { });
      },
      // 查询
      onSubmit() {
        if (this.ruleForm.exhibitionAreaCode !== '') {
          for (let key in this.exhibitionAreaOpts) {
            if (this.exhibitionAreaOpts[key].value === this.ruleForm.exhibitionAreaCode) {
              this.ruleForm.exhibitionAreaName = this.exhibitionAreaOpts[key].label;
            }
          }
        } else {
          this.ruleForm.exhibitionAreaName = '';
        }
        this.objSub = {
          delegationName: this.ruleForm.delegationName,
          boothType: this.ruleForm.boothType,
          exhibitionPeriod: this.ruleForm.exhibitionPeriod,
          checkStatus: this.ruleForm.checkStatus,
          exhibitionAreaCode: this.ruleForm.exhibitionAreaCode,
          exhibitionAreaName: this.ruleForm.exhibitionAreaName,
          current: 1,
          size: 10
        };
        this.handelReceivingData(this.objSub);
      },
      // 下载
      handDownload() {
        let url = "delegationName=" + this.objSub.delegationName + "&boothType=" + this.objSub.boothType + "&exhibitionPeriod=" + this.objSub.exhibitionPeriod + "&checkStatus=" + this.objSub.checkStatus + "&exhibitionAreaCode=" + this.objSub.exhibitionAreaCode + "&exhibitionAreaName=" + this.objSub.exhibitionAreaName;
        url = url.replace(/undefined/g, "");
        window.open(process.env.API_NA_URL + "/api/ordinaryBoothRefund/boothRefundList/download?" + url + "&token=" + this.token, "_parent");
      },
      // 通过
      handeldeposit(val) {
        this.dialogVisible = true;
        this.list = val;
      },
      // 通过确定
      handelSure() {
        if (this.form.isSubscription === "") {
          this.$message("请选择");
        } else {
          let obj = {
            boothRefund: {
              refundId: this.list.refundId,
              baseNumberStatus: this.form.isSubscription
            },
            examineLog: {
              operationType: "BOOTH_REFUND_APPLY",
              ownId: this.list.refundId,
              examineUserId: this.$store.getters.userInfo.userId,  // 动态获取值
              examineUserCn: this.$store.getters.userInfo.userName, // 动态获取值
              examineStatus: "1",  // 动态获取值状态1通过2不通过
              examineOpinion: "",
              examineOrg: "WORK_DEPTMENT",
              examineOrgCn: "工作处"
            }
          };
          this.postApplicationReturn(obj).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.handelReceivingData(this.pagaData);
          }).catch(e => { });
        }
      },
      // 通过取消
      handelDure() {
        this.dialogVisible = false;
        this.form.isSubscription = "";
      },
      // 不通过
      handelAdit(val) {
        this.dialogVisi = true;
        this.listap = val;
      },
      // 不通过确定
      handelFure() {
        if (this.formInline.coceralName === "") {
          this.$message("请填写不通过原因");
        } else {
          let objac = {
            boothRefund: {
              refundId: this.listap.refundId,
              baseNumberStatus: "no"
            },
            examineLog: {
              operationType: "BOOTH_REFUND_APPLY",
              ownId: this.listap.refundId,
              examineUserId: this.$store.getters.userInfo.userId,  // 动态获取值
              examineUserCn: this.$store.getters.userInfo.userName, // 动态获取值
              examineStatus: "2",  // 动态获取值状态1通过2不通过
              examineOpinion: this.formInline.coceralName,  // 动态获取值
              examineOrg: "WORK_DEPTMENT",
              examineOrgCn: "工作处"
            }
          };
          this.postApplicationReturn(objac).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.dialogVisi = false;
            this.handelReceivingData(this.pagaData);
          }).catch(e => { });
        }
      },
      // 
      handleSizeChange() { },
      // 分页
      handleCurrentChange(current) {
        let objBub = {
          delegationName: this.ruleForm.delegationName,
          boothType: this.ruleForm.boothType,
          exhibitionPeriod: this.ruleForm.exhibitionPeriod,
          checkStatus: this.ruleForm.checkStatus,
          exhibitionAreaName: this.ruleForm.exhibitionAreaName,
          current: current,
          size: 10
        };
        this.handelReceivingData(objBub);
      },
      // 不通过取消
      handelAure() {
        this.dialogVisi = false;
        this.formInline.coceralName = "";
      },
      // 通过关闭弹窗
      handelCure() {
        this.form.isSubscription = "";
      },
      // 不通过关闭弹窗
      handelBure() {
        this.formInline.coceralName = "";
      }
    }
  };
</script>
<style scoped>
  .btut {
    padding: 10px 20px !important;
  }

  .inpu {
    width: 150px;
  }

  .but {
    float: right;
    /* margin-right: 190px; */
  }
</style>