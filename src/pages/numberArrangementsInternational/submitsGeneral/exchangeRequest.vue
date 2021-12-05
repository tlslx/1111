<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loadinga" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="提出退回申请" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="交易团">
            <el-input size="small" clearable class="inpu" maxlength="24" disabled v-model.trim="formInline.delegationName">
            </el-input>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="formInline.exhibitionAreaCode" clearable size="small" class="inpu">
              <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
            </el-select>
            <!-- <el-input maxlength="24" clearable class="inpu" size="small" v-model.trim="formInline.exhibitionAreaName">
            </el-input> -->
          </el-form-item>
          <el-form-item label="展期">
            <el-select size="small" class="inpu" v-model="formInline.exhibitionPeriod" clearable placeholder="请选择">
              <el-option v-for="(item, index) in this.exhibitionPeriod" :key="index" :value="item.value" :label="item.label"></el-option>
              <!-- <el-option label="">请选择</el-option> -->
              <!-- <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option> -->
            </el-select>
            <!-- <el-input maxlength="24" class="inpu" size="small" v-model.trim="formInline.exhibitionPeriod"></el-input> -->
          </el-form-item>
          <el-form-item label="展位类别">
            <el-select size="small" class="inpu" v-model="formInline.boothType" clearable placeholder="请选择">
              <!-- <el-option v-for="(item, index) in this.boothType" :key="index" :value="item.value" :label="item.label"></el-option> -->
              <!-- <el-option label="">请选择</el-option> -->
              <el-option label="一般性展位" value="1"></el-option>
              <el-option label="中央通道展位" value="2"></el-option>
            </el-select>
            <!-- <el-input maxlength="24" class="inpu" size="small" v-model.trim="formInline.boothType"></el-input> -->
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select size="small" class="inpu" v-model="formInline.checkStatus" clearable placeholder="请选择">
              <!-- <el-option label="">请选择</el-option> -->
              <el-option label="未审核" value="0"></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="falotas">
            <el-button type="primary" @click="handleQuery" class="btut">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="getTrad.records" border style="width: 100%">
          <el-table-column prop="delegationName" align="center" label="交易团" width="180">
          </el-table-column>
          <el-table-column prop="boothType" align="center" label="展位类别" width="180">
            <template slot-scope="scope">
              {{scope.row.boothType === '1' ? '一般性展位' : '中央通道展位' }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="exhibitionAreaName" label="展区">
          </el-table-column>
          <el-table-column align="center" prop="exhibitionPeriod" label="展期">
          </el-table-column>
          <el-table-column align="center" prop="refundNumber" label="退回展位数">
          </el-table-column>
          <el-table-column align="center" prop="refundReason" label="退回原因">
          </el-table-column>
          <el-table-column align="center" prop="checkStatus" label="审核状态">
            <template slot-scope="scope">
              {{scope.row.checkStatus === '0' ? '未审核' :(scope.row.checkStatus === '1' ? '审核通过' : '审核不通过')}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="examineOpinion" label="审核意见">
          </el-table-column>
        </el-table>
        <el-form :inline="true" style="float: right;">
          <el-form-item>
            <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper"
              :total="getTrad.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="getTrad.current" :page-size="getTrad.size">
            </el-pagination>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onBack" class="btut">新增退回</el-button>
        <el-dialog title="退回申请" @close="maskLayer" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm" :rules="rules" label-position="right" ref="ruleForm" label-width="100px">
            <el-form-item label="交易团" prop="delegationName">
                <el-select class="widths separation" disabled v-model="ruleForm.delegationCode">
                    <el-option v-for="item in this.delegation" :value="item.value" :label="item.label"
                      :key="item.value"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="展位类别" prop="boothType">
              <el-select class="widths separation" v-model="ruleForm.boothType">
                <el-option label="一般性展位" value="1"></el-option>
                <el-option label="中央通道" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展区" prop="exhibitionAreaName">
              <el-select class="widths separation" v-model="ruleForm.exhibitionAreaCode">
                <el-option v-for="(item, index) in this.exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
                <!-- <el-option value="1" label="2"></el-option> -->
              </el-select>
              <!-- <el-select class="widths separation" v-model="ruleForm.exhibitionAreaCode">
                <el-option v-for="item in localstora.exhibitionArea" :value="item.value" :label="item.text"
                  :key="item.value"></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="展期" prop="exhibitionPeriod">
              <el-select class="widths separation" v-model="ruleForm.exhibitionPeriod">
                <el-option v-for="(item, index) in this.exhibitionPeriod" :key="index" :value="item.value" :label="item.label"></el-option>
                <!-- <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="退回展位数" prop="refundNumber">
              <el-input class="widths separation" maxlength="10" v-model="ruleForm.refundNumber" @change="handelNumber">
              </el-input>
            </el-form-item>
            <el-form-item label="退回原因" prop="refundReason">
              <el-input maxlength="200" row="3" class="widths separation" type="textarea"
                v-model="ruleForm.refundReason"></el-input>
            </el-form-item>
            <el-form-item prop="type">
              <el-checkbox v-model="ruleDorm.type" value="1" @change="prohibit" checked name="type">明确并接受《广交会出口展退展位约束机制》
              </el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="isShow" style="padding: 10px 20px" @click="onSubmit('ruleForm')"
              v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
            <el-button @click="resetCancel('ruleForm')" style="padding: 10px 20px">取 消</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        let regRule = /[^\d\$]/g;
        if (!value) {
          this.isShow = true;
          return callback(new Error("输入不能为空"));
        } else if (regRule.test(value)) {
          this.isShow = true;
          return callback(new Error("请输入正整数"));
        }
        this.isShow = false;
        callback();
      };
      return {
        rules: {
          refundNumber: [{ validator: checkAge, trigger: "blur" }]
        },
        tableData: [
        ],
        exhibitionAreaOpts: [],
        exhibitionPeriod: [],
        boothType: [],
        delegation: [],
        isShow: false,
        loadinga: true,
        selecs: '',
        period: '',
        ruleDorm: {},
        fullscreenLoading: false,
        ruleForm: {
          delegationCode: '',
          delegationName: '',
          boothType: '',
          exhibitionPeriod: '',
          refundNumber: '',
          refundReason: '',
          exhibitionAreaCode: '',
          exhibitionAreaName: ''
        },
        pagaData: {
          current: 1,
          size: 10,
          delegationCode: "",
          total: 0
        },
        formInline: {
          delegationName: '',
          delegationCode: '',
          exhibitionPeriod: '',
          exhibitionAreaName: '',
          boothType: '',
          checkStatus: ''
        },
        localstora: {},
        dialogFormVisible: false,
        activeName: 'first'
      };
    },
    async created() {
      // this.exhibitionAreaOpts = await kindo.dictionary.get('areaOfExhibits'); // 展区
      this.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展区
      this.formInline.delegationName = this.$store.getters.userInfo.org.deptName;
      this.delegation = [{
        value: this.$store.getters.userInfo.org.deptCode,
        label: this.$store.getters.userInfo.org.deptName
      }];
    },
    mounted() {
      // 展区
      this.getexhibitionArea().then(res => {
        this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      // 交易团
      this.getdelegationDepartment().then(res => {
        this.localstora.delegation = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      // this.localstora = JSON.parse(localStorage.getItem("dictData"));
      this.formInline.delegationCode = this.$store.getters.userInfo.org.deptCode;
      this.pagaData.delegationCode = this.$store.getters.userInfo.org.deptCode;
      this.getTradingRefunds(this.pagaData).then(() => {
        this.loadinga = false;
      }).catch(e => {
      });
    },
    computed: {
      ...mapGetters("generalApplication", ["getTrad", "postTeam"]),
      formQuery() {
        return {
          // delegationName: this.formInline.delegationName,
          delegationCode: this.formInline.delegationCode,
          exhibitionPeriod: this.formInline.exhibitionPeriod,
          exhibitionAreaCode: this.formInline.exhibitionAreaCode,
          // exhibitionAreaName: this.formInline.exhibitionAreaName,
          boothType: this.formInline.boothType,
          checkStatus: this.formInline.checkStatus,
          current: this.pagaData.current,
          size: this.pagaData.size
        };
      }
    },
    methods: {
      ...mapActions("generalApplication", ["getTradingRefunds", "postTeamApplica"]),
      ...mapActions("nainformation", [
        "getexhibitionArea", // 展区
        "getdelegationDepartment" // 交易团
      ]),
      // 关闭遮罩层
      maskLayer() {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = "";
        }
        this.dialogFormVisible = false;
      },
      handelNumber() { },
      // 复选框
      prohibit(val) {
        if (val === true) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      },
      handleSizeChange() { },
      // 操作页面 分页
      handleCurrentChange(val) {
        this.pagaData.current = val;
        this.createdQuery();
      },
      // 初始化封装
      createdQuery() {
        this.loadinga = true;
        this.getTradingRefunds(this.formQuery).then(() => {
          this.loadinga = false;
        }).catch(e => {
          this.loadinga = false;
        });
      },
      // 查询
      handleQuery() {
        this.pagaData.current = 1;
        for (let key in this.exhibitionAreaOpts) {
          if (this.formInline.exhibitionAreaCode !== '') {
            if (this.exhibitionAreaOpts[key].exhibitionAreaCode === this.formInline.exhibitionAreaCode) {
              this.formInline.exhibitionAreaName = this.exhibitionAreaOpts[key].exhibitionAreaName;
            }
          } else {
            this.formInline.exhibitionAreaName = '';
          }
        }
        this.createdQuery();
      },
      // 新增退回
      onBack() {
        this.dialogFormVisible = true;
        this.ruleForm.delegationCode = this.$store.getters.userInfo.org.deptCode;
      },
      // 提交
      onSubmit(val) {
        // for (let key in this.localstora.exhibitionArea) {
        //   if (this.localstora.exhibitionArea[key].value === this.ruleForm.exhibitionAreaCode) {
        //     this.ruleForm.exhibitionAreaName = this.localstora.exhibitionArea[key].text;
        //   }
        // }
        for (let key in this.exhibitionAreaOpts) {
          if (this.ruleForm.exhibitionAreaCode !== '') {
            if (this.exhibitionAreaOpts[key].exhibitionAreaCode === this.ruleForm.exhibitionAreaCode) {
              this.ruleForm.exhibitionAreaName = this.exhibitionAreaOpts[key].exhibitionAreaName;
            }
          } else {
            this.ruleForm.exhibitionAreaName = '';
          }
        }
        for (let key in this.localstora.delegation) {
          if (this.localstora.delegation[key].deptCode === this.ruleForm.delegationCode) {
            this.ruleForm.delegationName = this.localstora.delegation[key].deptName;
          }
        }
        if (this.ruleForm.delegationCode === '') {
          this.$message("交易团不能为空");
        } else if (this.ruleForm.boothType === '') {
          this.$message("展位类别不能为空");
        } else if (this.ruleForm.exhibitionAreaCode === '') {
          this.$message("展区不能为空");
        } else if (this.ruleForm.exhibitionPeriod === '') {
          this.$message("展期不能为空");
        } else if (this.ruleForm.refundReason === '') {
          this.$message("退回原因不能为空");
        } else if (this.ruleForm.refundNumber < 1) {
          this.$message("退回展位数不能小于1");
        } else {
          this.postTeamApplica(this.ruleForm).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.fullscreenLoading = true;
            this.createdQuery();
            this.fullscreenLoading = false;
            this.$refs[val].resetFields();
            this.dialogFormVisible = false;
            for (let key in this.ruleForm) {
              this.ruleForm[key] = "";
            }
          }).catch(e => {
            this.fullscreenLoading = false;
            this.dialogFormVisible = true;
          });
        }
      },
      // 取消
      resetCancel(val) {
        this.$refs[val].resetFields();
        // this.ruleForm = {};
        this.dialogFormVisible = false;
        for (let key in this.ruleForm) {
          this.ruleForm[key] = "";
        }
      }
    }
  };
</script>
<style scoped>
  .widths {
    width: 300px
  }

  .btut {
    padding: 10px 20px;
  }

  .inpu {
    width: 150px;
  }

  .falotas {
    float: right
  }

  .separation {
    width: 300px;
    margin-top: 8px
  }
</style>