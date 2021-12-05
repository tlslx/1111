/**
 * @file 申请关联公司用户
 */
<style scoped>
.widsts {
  width: 55%;
}
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <!-- 修改人: 李康   关联公司用户 改为 关联企业用户 -->
    <el-tab-pane label="关联企业用户" name="0" v-loading = "loading">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :data="tableData"
        :cols="cols"
        :loading="loading"
        @deal-with-event="dealWithEvent"
      ></cust-table>
      <!-- <el-dialog title="申请关联" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
          <el-form-item label=" 所属部门：">
            <el-input maxlength="20" v-model="form.department" class="widsts"></el-input>
          </el-form-item>
          <el-form-item label="职位：">
            <el-input
              maxlength="20"
              v-model="form.position"
              class="widsts"
              style="margin-left: 30px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="固定电话：">
            <el-input maxlength="20" v-model="form.telephone" class="widsts"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handeCancel">取消</el-button>
          <el-button type="primary" @click="handeSure(form)">确定</el-button>
        </div>
      </el-dialog> -->
      <pagination
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      rules: {
        department: [
          { required: true, message: "请输入所属部门", trigger: "blur" }
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入固定电话", trigger: "blur" }
        ]
      },
      activeName: 0,
      loading: true,
      accountId: this.$store.state.userInfo.companyId,
      dialogFormVisible: false,
      toCompanyId: "",
      formLabelWidth: "100",
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "companyId",
            label: "企业广交会编码",
            value: "",
            type: "input",
            width: "125px"
          }
        ]
      },
      aaa: "申请关联",
      // 查询
      selectParam: {
        applyRelatedCompanyInquirySession: {
          accountId: this.$store.state.userInfo.companyId,
          cantonCode: "",
          companyName: ""
        },
        pageStart: "1",
        pageSize: "10"
      },
      form: {
        department: "", // 所属部门
        position: "", //  职位
        telephone: "" //  电话
      },
      cols: [
        {
          prop: "companyName",
          label: "企业名称",
          type: "string"
        },
        {
          prop: "cantonCode",
          label: "企业广交会编码",
          type: "string"
        },
        {
          prop: "businessDelegationId",
          label: "所属交易团",
          type: "string"
        },
        {
          prop: "linkStatus",
          label: "操作",
          changeStatus: true,
          type: "operator"
        }
      ],
      tableData: {
        data: []
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      }
    };
  },
  computed: {
    ...mapGetters("personalRegister", [
      "associatedCompanyUser",
      "applyForAssociationData"
    ])
  },
  created() {
    // let _this = this;
    // this.queryAssociatedCompanyUser(this.selectParam).then(res => {
    //   _this.loading = false;
    //   if (res.total > 0) {
    //     this.pageInfo.total = res.total;
    //   } else if (res.total === 0) {
    //     this.pageInfo.currentPage = 1;
    //     this.pageInfo.total = 0;
    //   }
    // }).catch(e => {
    //   _this.loading = false;
    // });
    this.getDate();
  },
  methods: {
    ...mapActions("personalRegister", [
      "queryAssociatedCompanyUser",
      "applyForAssociationInfo",
      "personalApplyAssociationOneInfo"
    ]),
    ...mapActions("enterpriseRegister", ["AllowAreaCancelInfo", "getSingleByIdInfo"]),
    // 搜索组件返回的数据
    selectParams() {
      // let _this = this;
      this.pageInfo.currentPage = 1;
      // let temp = this.selectParam;
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "companyId") {
          this.selectParam.applyRelatedCompanyInquirySession.cantonCode = formVal.value.replace(/\s+/g, "");
        } else if (formVal.prop === "companyName") {
          this.selectParam.applyRelatedCompanyInquirySession.companyName = formVal.value.replace(/\s+/g, "");
        }
      });
      // this.queryAssociatedCompanyUser(temp).then(res => {
      //   _this.loading = false;
      //   if (res.total > 0) {
      //     this.pageInfo.total = res.total;
      //   } else if (res.total === 0) {
      //     this.pageInfo.currentPage = 1;
      //     this.pageInfo.total = 0;
      //     this.tableData = res.records;
      //   }
      // }).catch(e => {
      //   _this.loading = false;
      // });
      this.getDate();
    },
    // 取消
    handeCancel() {
      this.dialogFormVisible = false;
      this.form = {};
    },
    // 确定
    handeSure(form) {
      let _this = this;
      _this.$refs["form"].validate(valid => {
        if (valid) {
          _this.$confirm("确认申请", "提示信息", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let param = {
              applyForAssociationSession: {
                accountId: this.accountId,
                companyId: this.toCompanyId,
                linkStatus: "0",
                department: _this.form.department,
                position: _this.form.position,
                fixedTelephone: _this.form.telephone
              }
            };
            _this.applyForAssociationInfo(param).then(res => {
              _this.$message.success("申请成功");
              _this.dialogFormVisible = false;
              _this.form = {};
              this.getDate();
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      });
    },
    // 修改人 李康   注释了24-45行 增加了249及253--279行     主要功能 去除申请关联的弹框
    // 申请联合布展
    dealWithEvent(scope, prop) {
      let _this = this;
      if (scope.row.linkStatus === "申请关联") {
        this.dialogFormVisible = true;
        this.toCompanyId = scope.row.companyId;
        _this.$confirm("确认申请", "提示信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let param = {
            applyForAssociationSession: {
              accountId: this.accountId,
              companyId: this.toCompanyId,
              linkStatus: "0"
              // department: _this.form.department,
              // position: _this.form.position,
              // fixedTelephone: _this.form.telephone
            }
          };
          _this.applyForAssociationInfo(param).then(res => {
            _this.$message.success("申请成功");
            _this.dialogFormVisible = false;
            _this.form = {};
            this.getDate();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else if (scope.row.linkStatus === "取消关联") {
        let param = {
          cancelSession: {
            accountId: this.accountId,
            companyId: scope.row.companyId,
            linkStatus: null
          }
        };
        this.$confirm("取消关联", "提示信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.AllowAreaCancelInfo(param).then(() => {
            // this.message
            this.getDate();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else if (scope.row.linkStatus === "取消申请") {
        let param = {
          cancelSession: {
            accountId: this.accountId,
            companyId: scope.row.companyId,
            linkStatus: null
          }
        };
        this.$confirm("取消申请", "提示信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.AllowAreaCancelInfo(param).then(() => {
            // this.message
            this.getDate();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
      // let _this = this;
      // this.$confirm('申请成功', '提示信息', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   let param = {
      //     "applyForAssociationSession": {
      //       "accountId": "40c9088f46724f558ea39cf1c0684900",
      //       "companyId": scope.row.companyId,
      //       "linkStatus": "0"
      //     }
      //   };
      // _this.loading = true;
      // this.applyForAssociationInfo(param).then(res => {
      //   this.$message.success("申请成功");
      //   _this.loading = false;
      //   this.queryAssociatedCompanyUser(this.selectParam);
      // });
      // }).catch(() => {
      //   _this.loading = false;
      // });
    },
    // 修改页面展示条数
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.selectParam.pageSize = val;
      this.getDate();
      // this.queryAssociatedCompanyUser(this.selectParam).then(res => {
      //   this.loading = false;
      // }).catch(e => {
      //   this.loading = false;
      // });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.selectParam.pageStart = val;
      this.getDate();
      // this.queryAssociatedCompanyUser(this.selectParam);
    },
    // 查询列表
    getDate() {
      let _this = this;
      _this.tableData.data = [];
      _this.loading = true;
      this.selectParam.pageSize = this.pageInfo.pageSize;
      this.selectParam.pageStart = this.pageInfo.currentPage;
      // let selectParam = {
      //   applyRelatedCompanyInquirySession: {
      //     accountId: this.$store.state.userInfo.companyId,
      //     cantonCode: "",
      //     companyName: ""
      //   },
      //   pageStart: "1",
      //   pageSize: "10"
      // };
      let selectParam = {
        "personalApplyAssociationListSession": {
          "accountId": this.$store.state.userInfo.companyId
        },
        "pageStart": "1",
        "pageSize": "10"
      };
      this.personalApplyAssociationOneInfo(selectParam).then(res => {
        // for (let i = 0; i < res.records.length; i++) {
        //   if (res.records[i].linkStatus != null) {
        //     _this.tableData.data = [JSON.parse(JSON.stringify(res.records[i]))];
        //     _this.pageInfo.currentPage = 1;
        //     _this.pageInfo.total = 1;
        //   }
        // }

        if (res) {
          // 根据交易团ID转换交易团名称
          if (res.businessDelegationId) {
            this.getSingleByIdInfo(res.businessDelegationId).then(resM => {
              res.businessDelegationId = resM.fullName;
            });
          }
          _this.tableData.data.push(res);
          _this.pageInfo.currentPage = 1;
          _this.pageInfo.total = 1;
        } else {
          _this.queryAssociatedCompanyUser(_this.selectParam).then(resT => {
            _this.pageInfo.total = resT.total;
            for (let i = 0; i < resT.records.length; i++) {
             // 根据交易团ID转换交易团名称
              // if (resT.records && resT.records[i].businessDelegationId) {
              //   this.getSingleByIdInfo(resT.records[i].businessDelegationId).then(resM => {
              //     resT.records[i].businessDelegationId = resM.fullName;
              //   });
              // }
              _this.tableData.data.push(resT.records[i]);
            }

          });
        }
        _this.loading = false;
      });
    },
    handleClick() {}
  },
  watch: {
    "tableData.data"(newVal) {
      if (newVal && newVal.length > 0) {
        // this.tableData.data = JSON.parse(JSON.stringify(newVal));
        // for (let i = 0; i < newVal.length; i++) {
        //   if (newVal[i].linkStatus != null) {
        //     this.tableData.data = [JSON.parse(JSON.stringify(newVal[i]))];
        //   }
        // }
        this.tableData.data.forEach((value, index) => {
          if (value.linkStatus == null) {
            value.linkStatus = "申请关联";
            value.class = "underline-red";
            value.canBeClick = true;
          } else if (value.linkStatus === "0") {
            value.linkStatus = "取消申请";
            value.class = "underline-red";
            value.canBeClick = true;
          } else if (value.linkStatus === "-1") {
            value.linkStatus = "待公司确认取消关联";
          } else {
            value.linkStatus = "取消关联";
            value.class = "underline-red";
            value.canBeClick = true;
          }
        });
      }
    }
  }
};
</script>

