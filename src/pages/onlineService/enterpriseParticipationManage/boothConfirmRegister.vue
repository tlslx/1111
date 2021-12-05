/**
 * @file 展位确认登记
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位确认登记" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <!-- <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
      ></cust-table> -->
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="tableHeaderColor">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="exhibitionPeriod"
          label="展期"
          width="110">
        </el-table-column>
        <el-table-column
          prop="exhibitionArea"
          label="展区"
          width="130">
        </el-table-column>
        <el-table-column
          prop="boothNo"
          label="展位号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="boothNature"
          label="展位性质"
          width="110">
        </el-table-column>
        <el-table-column
          prop="area"
          label="面积"
          width="110">
        </el-table-column>
        <el-table-column
          prop="boothType"
          label="布展类型"
          width="110">
        </el-table-column>
        <el-table-column
          prop="boothManager"
          label="展位负责人"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.boothManager" placeholder="请输入" v-if="scope.row.showDemand"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.tel" placeholder="请输入" v-if="scope.row.showDemand"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="consortium"
          label="联营企业"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-select v-model="scope.row.consortium" placeholder="请选择" v-if="scope.row.showDemand">
              <el-option label="不联营" value="0"></el-option>
              <el-option v-for="item in consortiums" :key="item.associateId" :label="item.nameCh" :value="item.associateId">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <!-- 全选之后操作 -->
      <el-form :inline="true" :model="searchAll" class="demo-form-inline">
        <el-form-item label="展位负责人">
          <el-input v-model="searchAll.boothManager" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchAll.tel" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联营企业">
          <el-select v-model="searchAll.consortium" placeholder="请选择">
            <el-option label="不联营" value="0"></el-option>
            <el-option v-for="item in consortiums" :key="item.associateId" :label="item.nameCh" :value="item.associateId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 分页 -->
      <pagination
        class="page-bar"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
      <!-- 刷选之后的操作 -->
      <div class="associa-recom-btn-container">
        <div class="btn-bar">
          <el-button class="success-btn" @click="confirm">确定</el-button>
          <el-button class="recommend-btn" @click="print">打印展位责任书</el-button>
          <el-button class="success-btn" @click="download">下载展位责任书</el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    // "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    "pagination": pagination
  },
  data() {
    return {
      data: [
        {
          exhibitionPeriod: "124",
          exhibitionArea: "大型重工业用品",
          boothNo: "C.2240",
          boothNature: "一般性",
          area: "12m",
          boothType: "标摊",
          boothManager: "",
          tel: "",
          consortium: "",
          operation: "",
          showDemand: false
        },
        {
          exhibitionPeriod: "124",
          exhibitionArea: "大型重工业用品",
          boothNo: "C.2240",
          boothNature: "一般性",
          area: "12m",
          boothType: "标摊",
          boothManager: "",
          tel: "",
          consortium: "",
          operation: "",
          showDemand: false
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 100,
        style: "padding: 20px 0;text-align: center;"
      },
      dictionary: {},
      activeName: 0,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "exhibitionPeriod",
            label: "展期",
            value: "",
            type: "input"
          },
          {
            prop: "boothNature",
            label: "展位性质",
            value: "",
            type: "input"
          }
        ]
      },
      searchAll: {
        boothManager: "",
        tel: "",
        consortium: ""
      },
      consortiums: this.consortium,
      multipleSelection: [],
      param: { "companyId": "1" }
      // cols: [
      //   {
      //     prop: "exhibitionPeriod",
      //     label: "展期",
      //     type: "string"
      //   },
      //   {
      //     prop: "exhibitionArea",
      //     label: "展区",
      //     type: "string"
      //   },
      //   {
      //     prop: "boothNo",
      //     label: "展位号",
      //     type: "string"
      //   },
      //   {
      //     prop: "boothNature",
      //     label: "展位性质",
      //     type: "string"
      //   },
      //   {
      //     prop: "area",
      //     label: "面积",
      //     type: "string"
      //   },
      //   {
      //     prop: "boothType",
      //     label: "布展类型",
      //     type: "string"
      //   },
      //   {
      //     prop: "boothManager",
      //     label: "展位负责人",
      //     type: "string"
      //   },
      //   {
      //     prop: "tel",
      //     label: "手机号",
      //     type: "string"
      //   },
      //   {
      //     prop: "consortium",
      //     label: "联营企业",
      //     type: "string"
      //   },
      //   {
      //     prop: "operation",
      //     type: "string",
      //     label: "操作"
      //   }
      // ]
    };
  },
  created() {
    let _this = this;
    let params = encodeURI(JSON.stringify(_this.param));
    this.getAssociateNameListS(params).then(res => {
      _this.consortiums = res;
      // console.log(_this.consortiums, "res");
    });
  },
  computed: {
    ...mapGetters('companyInfomation', ['getAssoc']),
    optionData() {
      return {
        data: this.getAssoc
      };
    }
  },
  methods: {
    ...mapActions('companyInfomation', ["getAssociateNameListS"]),
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val, "val");
      //隐藏所有输入框
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        element.showDemand = false;
      }
      //遍历所选数据，释放输入框
      for (let index = 0; index < val.length; index++) {
        const element = val[index];
        element.showDemand = true;
      }
    },
    confirm() {},
    print() {},
    download() {},
    // 添加表头样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    },
    // 查询操作
    selectParams() {},
    // 分页操作
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style scoped>
.associa-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
  margin-top: 30px;
}
.btn-bar {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.recommend-btn {
  background-color: #E6A23C;
  color: #fff;
  outline: none;
  border: 0;
}
.success-btn {
  background-color: #409EFF;
  color: #fff;
  outline: none;
  border: 0;
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
.demo-form-inline {
  margin-top: 10px;
}
</style>
