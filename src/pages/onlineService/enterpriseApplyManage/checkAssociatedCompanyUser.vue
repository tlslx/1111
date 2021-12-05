/**
 * @file 查看企业关联用户
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看企业关联用户" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <can-be-edit-table
        :loading="loading"
        :tableData="tableInfo"
        :tableTrData="tableTrData"
        @deal-with-diff-event="dealWithChangeStatusEvent"
      ></can-be-edit-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="授权管理展区：" :label-width="formLabelWidth" prop="region">
            <el-select v-model="regions" @change="changeRegions" multiple :multiple-limit="limitSelect" placeholder="请选择" clearable :disabled="isabled">
              <el-option
                v-for="item in dictionaryData.allowArea"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
              <!-- <el-option label="区域二"dictionaryData.allowArea value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handeCancel">取消</el-button>
          <el-button type="primary" @click="handenSure('form')" :disabled="isabled">确定</el-button>
        </div>
      </el-dialog>
      <div class="bottom-btn">
        <!-- <el-button type="danger" :dictionaryData="dictionaryData" @click="toAdd" class="btn-margin">添加子账户</el-button> -->
        <el-button type="warning" @click="toNew" class="btn-margin">新增子账户</el-button>
        <!-- <el-button type="primary" @click="toPass" class="btn-margin">同意子账户</el-button> -->
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/onlineService/common/canBeEditTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "checkAssociatedCompanyUser",
  components: {
    "can-be-edit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      formLabelWidth: "120px",
      companyId: this.$store.state.userInfo.companyId,
      isabled: false,
      postOptions: [], // 职位转换
      limitSelect: 10,
      subType: "",
      regions: [],
      form: {
        region: "",
        accountId: ""
      },
      rules: {
        region: [
          { required: true, message: '请选择授权管理展区', trigger: 'change' }
        ]
      },
      activeName: 0,
      dialogVisible: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "userName",
        data: [
          {
            prop: "userName",
            label: "姓名",
            value: "",
            // width: "50px",
            type: "input"
          },
          {
            prop: "department",
            label: "部门",
            value: "",
            // width: "60px",
            type: "input"
          },
          {
            prop: "allowArea",
            label: "授权展区",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "linkStatus",
            label: "绑定状态",
            value: "",
            // width: "120px",
            type: "select"
          }
        ],
        dictionary: {
          allowArea: []
        }
      },
      tableInfo: [],
      loading: false,
      dictionaryData: {
        allowArea: []
      },
      tableTrData: [
        {
          prop: "userName",
          label: "姓名",
          type: "string"
        },
        {
          prop: "gender",
          label: "性别",
          type: "string"
        },
        {
          prop: "department",
          label: "所属部门",
          type: "string"
        },
        {
          prop: "position",
          label: "职位",
          type: "string"
        },
        {
          prop: "email",
          label: "邮箱",
          type: "string"
        },
        {
          prop: "phone",
          label: "手机",
          type: "string"
        },
        {
          prop: "fixedTelephone",
          label: "固定电话",
          type: "string"
        },
        {
          prop: "allowArea",
          label: "授权管理展区",
          type: "select",
          userDefined: true
        },
        {
          type: "btn",
          show: true,
          prop: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: 'consent',
              label: '同意'
            },
            {
              type: 'remove',
              label: '不同意'
            },
            {
              type: 'agree',
              label: '同意解除'

            },
            {
              type: 'disAgree',
              label: '不同意解除'
            },
            {
              type: 'authoriz',
              label: '授权展区'
            },
            {
              type: 'viewAuthoriz',
              label: '查看展区'
            },
            {
              type: 'unbound',
              label: '解除绑定'
            }
          ]
        }
      ],
      tableData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      },
      // 传参
      searchParams: {
        companyId: this.$store.state.userInfo.companyId,
        userName: "",
        allowArea: "",
        linkStatus: "",
        department: "",
        pageStart: "1",
        pageSize: "10"
      }
    };
  },
  computed: {
    ...mapGetters("enterpriseRegister", ["asscompanyList"])
  },
  async beforeCreate() {
    this.dictionaryData.allowArea = await kindo.dictionary.get('exhibitionArea');
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.dictionaryData.allowArea.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.dictionaryData.allowArea.splice(deleteIndex, 1);
      }
    });
    this.postOptions = await kindo.dictionary.get('post'); // 职位字典
    for (let items in this.dictionaryData.allowArea) {
      this.searchParamsForm.dictionary.allowArea.push({ label: this.dictionaryData.allowArea[items].label, value: this.dictionaryData.allowArea[items].value });
    }
    this.searchParamsForm.dictionary.linkStatus = [
      {
        label: "待关联",
        value: "0"
      },
      {
        label: "已关联",
        value: "1"
      },
      {
        label: "取消关联待公司确认",
        value: "-1"
      }
    ];
  },
  mounted() {
    this.getData();

  },
  // watch: {

  // },
  methods: {
    ...mapActions("enterpriseRegister", [
      "personalApplyAssociationListCompanyInfo",
      "AllowAreaCancelInfo",
      "personalIsAgreeInfo",
      "postDeassociation", // 解除绑定
      "grantExhInfo" // 授权展区
    ]),
    getData() {
      this.loading = true;
      this.personalApplyAssociationListCompanyInfo(this.searchParams).then(response => {
        if (response.total > 0) {
          this.pageInfo.currentPage = response.current;
          this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 模糊查询
    selectParams() {
      // 查询字段去空格
      let val = $helper.trim(this.searchParamsForm.data[0].value);
      let dept = $helper.trim(this.searchParamsForm.data[1].value);
      let allowArea = $helper.trim(this.searchParamsForm.data[2].value);
      let state = $helper.trim(this.searchParamsForm.data[3].value);
      // 定义传参
      if (val !== "") {
        this.searchParams.userName = val;
      } else {
        this.searchParams.userName = "";
      }
      if (dept !== "") {
        this.searchParams.department = dept;
      } else {
        this.searchParams.department = "";
      }
      if (allowArea !== "") {
        this.searchParams.allowArea = allowArea;
      } else if (allowArea === {}) {
        this.searchParams.allowArea = "";
      } else {
        this.searchParams.allowArea = "";
      }
      if (state !== "") {
        this.searchParams.linkStatus = state;
      } else if (state === {}) {
        this.searchParams.linkStatus = "";
      } else {
        this.searchParams.linkStatus = "";
      }
      this.searchParams.pageStart = "1";

      this.getData();
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      this.personalApplyAssociationListCompanyInfo(this.searchParams)
        .then(res => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageStart = val;
      this.personalApplyAssociationListCompanyInfo(this.searchParams)
        .then(res => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 同意子账户跳转
    toPass() {
      this.$router.push("/individualApplyAssociatedList");
    },
    // 添加子账户跳转
    toAdd() {
      this.$router.push("/companyUsersAddSubaccounts");
    },
    // 新增子账户跳转
    toNew() {
      this.$router.push("/comUserAddSubaccount");
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.form.region = "";
    },
    // 弹出取消
    handeCancel() {
      this.dialogVisible = false;
      this.form.region = "";
      this.isabled = false;
    },
    // 多选授权管理展区转换
    changeRegions(val) {
      this.form.region = val.join(',');
    },
    // 同意弹出确定
    handenSure(formName) {
      let param = {
        personalApplyAssociationIsAgreeSession: {
          linkStatus: "1",
          accountId: this.form.accountId,
          allowArea: this.form.region,
          companyId: this.$store.state.userInfo.companyId
        }
      };
      if (this.subType === "add") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.personalIsAgreeInfo(param).then(res => {
              this.dialogVisible = false;
              this.personalApplyAssociationListCompanyInfo(this.searchParams);
            });
          }
        });
      } else if (this.subType === "edit") {
        let paramT = {
          "cancelSession": {
            "accountId": this.form.accountId,
            "companyId": this.$store.state.userInfo.companyId,
            "allowArea": this.form.region,
            "linkStatus": "1"
          }
        };
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.grantExhInfo(paramT).then(res => {
              this.dialogVisible = false;
              this.personalApplyAssociationListCompanyInfo(this.searchParams);
            });
          }
        });
      }


    },
    // 处理操作按钮事件
    dealWithChangeStatusEvent(operateItem, scope) {
      if (operateItem === "consent") {
        this.form.accountId = scope.row.accountId;
        this.subType = "add";
        this.dialogVisible = true;
      } else if (operateItem === "agree") {
        let param = {
          accountId: scope.row.accountId,
          companyId: this.$store.state.userInfo.companyId
        };
        this.$confirm("同意解除关联", "提示信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.postDeassociation(param).then(() => {
            this.personalApplyAssociationListCompanyInfo(this.searchParams);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
        scope.row.operateType = "text";
      } else if (operateItem === "disAgree") {
        let param = {
          accountId: scope.row.accountId,
          companyId: this.$store.state.userInfo.companyId,
          linkStatus: "0"
        };
        this.$confirm("不同意解除关联", "提示信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.postDeassociation(param).then(() => {
            this.personalApplyAssociationListCompanyInfo(this.searchParams);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
        scope.row.operateType = "text";
      } else if (operateItem === "remove") {
        let param = {
          personalApplyAssociationIsAgreeSession: {
            linkStatus: null,
            accountId: scope.row.accountId,
            // allowArea: this.form.region,
            companyId: this.$store.state.userInfo.companyId
          }
        };
        // 不同意
        this.personalIsAgreeInfo(param).then(() => {
          this.personalApplyAssociationListCompanyInfo(this.searchParams);
        });
        scope.row.operateType = "text";
      } else if (operateItem === "unbound") {
        let param = {
          personalApplyAssociationIsAgreeSession: {
            linkStatus: null,
            accountId: scope.row.accountId,
            // allowArea: this.form.region,
            companyId: this.$store.state.userInfo.companyId
          }
        };
        // 解除绑定
        this.personalIsAgreeInfo(param).then(() => {
          this.personalApplyAssociationListCompanyInfo(this.searchParams);
        });
        scope.row.operateType = "text";
      } else if (operateItem === "authoriz") {
        this.form.accountId = scope.row.accountId;
        this.regions = scope.row.allowAreaT.split(",");
        this.subType = "edit";
        this.dialogVisible = true;

      } else if (operateItem === "viewAuthoriz") {
        this.form.accountId = scope.row.accountId;
        this.regions = scope.row.allowArea.split(",");
        this.dialogVisible = true;
        this.isabled = true;
      }
    }
  },
  watch: {
    asscompanyList(newVal) {
      let _this = this;
      let trValue = _this.tableTrData;
      this.tableInfo = JSON.parse(JSON.stringify(newVal));
      let value = this.tableInfo;
      for (let j = 0; j < value.length; j++) {
        for (let k = 0; k < _this.postOptions.length; k++) {
          if (value[j].position === _this.postOptions[k].value) {
            value[j].position = _this.postOptions[k].label;
          }
        }
        value[j].operateType = 'text';
        for (let i = 0; i < trValue.length; i++) {
          if (value[j].linkStatus === '0') {
            value[j].consent = true;
            value[j].remove = true;
            value[j].class = 'primary';
          } else if (value[j].linkStatus === '-1') {
            value[j].agree = true;
            value[j].disAgree = true;
            value[j].class = 'primary';
          } else if (value[j].linkStatus === '1') {
            value[j].authoriz = true;
            value[j].viewAuthoriz = true;
            value[j].unbound = true;
            value[j].class = 'primary';
          }
        }

      }


      // for (let ele in _this.tableInfo) {
      //   if (_this.tableInfo[ele].linkStatus === "0") {
      //     for (let itemx in _this.tableTrData) {
      //       if (_this.tableTrData[itemx].type === "btn") {
      //         let arrey = [
      //           {
      //             prop: "consent",
      //             label: "同意",
      //             type: "text",
      //             class: "primary"
      //           },
      //           {
      //             prop: "remove",
      //             label: "不同意",
      //             type: "text",
      //             class: "warning"
      //           }
      //         ];
      //         _this.tableTrData[itemx].operations = arrey;
      //       }
      //     }
      //   } else if (_this.tableInfo[ele].linkStatus === "-1") {
      //     for (let itemx in _this.tableTrData) {
      //       if (_this.tableTrData[itemx].type === "btn") {
      //         let arrey = [
      //           {
      //             prop: "agree",
      //             label: "同意解除",
      //             type: "text",
      //             class: "primary"
      //           },
      //           {
      //             prop: "disAgree",
      //             label: "不同意解除",
      //             type: "text",
      //             class: "primary"
      //           }
      //         ];
      //         _this.tableTrData[itemx].operations = arrey;
      //       }
      //     }
      //   } else if (_this.tableInfo[ele].linkStatus === "1") {
      //     for (let i = 0; i < _this.tableTrData.length; i++) {
      //       if (_this.tableTrData[i].type === "btn") {
      //         let arrey = [
      //           {
      //             prop: "authoriz",
      //             label: "授权展区",
      //             type: "text",
      //             class: "primary"
      //           },
      //           {
      //             prop: "viewAuthoriz",
      //             label: "查看授权展区",
      //             type: "text",
      //             class: "primary"
      //           }
      //         ];
      //         _this.tableTrData[i].operations = arrey;
      //         // _this.$set(_this.tableTrData[i], 'operations', arrey);
      //         // _this.tableTrData[i].operations.push(arrey);
      //       }

      //     }
      //   }

      //   // ele.operateType = "text";
      //   // ele.isEdit = false;
      // }

    }
  }
};
</script>
<style scoped>
.bottom-btn {
  width: 100%;
}
.btn-margin {
  margin-top: 20px;
}
.pages {
  width: 60%;
  float: right;
}
</style>
