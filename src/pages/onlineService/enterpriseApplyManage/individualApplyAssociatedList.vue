/**
 * @file 个人用户申请关联列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="个人用户申请关联列表" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :cols="cols"
        :data="tableData"
        :loading="loading"
        @deal-with-operate="dealWithOperate"
      ></cust-table>
      <div class="bottom-btn">
        <el-button type=primary @click="toBack" class="btn">返回</el-button>
        <pagination
          :pageInfo="pageInfo"
          class="page"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"></pagination>
      </div>
      <el-dialog title="选择展区" :visible.sync="dialogVisible">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="授权管理展区：">
            <el-select v-model="allowArea" placeholder="请选择" @change="allowAreaChange">
              <el-option v-for="item in options" :key="item.value"
                :label="item.text" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" :disabled="disabled" @click="toConfirm" class="dialog-btn">确定</el-button>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
// vuex
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "checkAssociatedCompanyUser",
  components: {
    "search-param-link": searchParamLinkage,
    "cust-table": custTable,
    "pagination": pagination
  },
  data() {
    return {
      activeName: 0,
      form: {},
      options: [],
      dialogVisible: false,
      disabled: true,
      allowArea: "",
      // 搜索框联动设置
      searchParamsForm: {
        variate: "userName",
        data: [
          {
            prop: "userName",
            label: "姓名",
            value: "",
            width: "60px",
            type: "input"
          }
        ]
      },
      cols: [
        {
          prop: "userName",
          label: "姓名"
        },
        {
          prop: "gender",
          label: "性别"
        },
        {
          prop: "email",
          label: "邮箱"
        },
        {
          prop: "phone",
          label: "手机"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              prop: "edit",
              label: "同意",
              style: "cursor: pointer;text-decoration: underline;color: #2d92ec;"
            },
            {
              type: "underlineText",
              prop: "del",
              label: "不同意",
              style:
                "cursor: pointer;text-decoration: underline;color: red;margin: 0px 8px;"
            }
          ]
        }
      ],
      // 设置table的loading变量
      loading: false,
      accountId: "",
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 20px 0;text-align: center;"
      },
      // 传参
      searchParams: {
        "companyId": localStorage.getItem("getComPanyId"),
        "userName": "",
        "pageStart": "1",
        "pageSize": "10"
      },
      tableData: {
        data: []
      }
    };
  },
  computed: {
    ...mapGetters('enterpriseRegister', ['assiciationList'])
  },
  created() {
    let dictData = JSON.parse(localStorage.getItem('dictData'));
    this.options = dictData.allowArea.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));
    this.getData();
  },
  methods: {
    ...mapActions('enterpriseRegister', ['personalApplyAssociationListInfo', 'personalIsAgreeInfo']),
    // 操作
    dealWithOperate(scope, prop) {
      if (prop === "edit") {
        this.dialogVisible = true;
        this.accountId = scope.row.accountId;
      } else {
        this.loading = true;
        let param = {
          "personalApplyAssociationIsAgreeSession":
          {
            "linkStatus": null,
            "companyId": localStorage.getItem("getComPanyId"),
            "accountId": scope.row.accountId
          }
        };
        this.personalIsAgreeInfo(param).then(res => {
          this.$message({
            type: 'success',
            message: '不同意关联!'
          });
          this.getData();
          this.loading = false;
        });
      }
    },
    allowAreaChange() {
      if (this.allowArea === "") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    toConfirm() {
      let param = {
        "personalApplyAssociationIsAgreeSession":
        {
          "linkStatus": "1",
          "accountId": this.accountId,
          "companyId": localStorage.getItem("getComPanyId"),
          "allowArea": this.allowArea
        }
      };
      // 调接口
      this.personalIsAgreeInfo(param).then(res => {
        this.dialogVisible = false;
        this.$message({
          type: 'success',
          message: '同意关联成功!'
        });
        this.getData();
      });
    },
    // 获取数据方法
    getData() {
      this.loading = true;
      this.personalApplyAssociationListInfo(this.searchParams).then(response => {
        // 查询成功
        if (response.total > 0) {
          this.pageInfo.currentPage = response.current;
          this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.loading = false;
      }).catch(e => {
         // 查询失败
        this.loading = false;
      });
    },
    // 搜索查询
    selectParams() {
      // 查询字段去空格
      let val = $helper.trim(this.searchParamsForm.data[0].value);
      // 定义传参
      if (val !== "") {
        this.searchParams.userName = val;
      } else {
        this.searchParams.userName = "";
      }
      this.getData();
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.searchParams.pageSize = val;
      _this.personalApplyAssociationListInfo(_this.searchParams).then(res => {

        //设置table的loading变量
        _this.loading = false;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.currentPage = val;
      _this.searchParams.pageStart = val;
      _this.personalApplyAssociationListInfo(_this.searchParams).then(res => {

        //设置table的loading变量
        _this.loading = false;
      });
    },
    toBack() {
      this.$router.back();
    }
  },
  watch: {
    assiciationList(newVal) {
      this.tableData.data = newVal;
    }
  }
};
</script>
<style scoped>
.bottom-btn{
  width: 96%;
  padding: 0 2%;
}
.btn{
  width: 120px;
  height: 40px;
  float: left;
  margin-top: 20px;
}
.page{
  float: right;
}
.dialog-btn{
  margin: 10px;
}
</style>
