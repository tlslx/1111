/**
 * @file VIP企业提供采购商汇总信息
 */
<template>
  <div class="vip-suminfo">
    <el-tabs v-model="activeName">
      <el-tab-pane label="VIP企业推荐汇总信息" name="first">
        <search-param-link
          :searchParamsForm="searchParamsForm.data"
          :variate="searchParamsForm.variate"
          @select-params="selectParams"
        ></search-param-link>
        <el-table :data="tableData" :header-cell-style="tableHeaderColor" :border=true
          stripe style="width: 100%" v-loading="loading">
          <el-table-column align="center" prop="purchaserName" label="公司名称"></el-table-column>
          <el-table-column align="center" prop="newCountoryRegion" label="国家/地区"></el-table-column>
          <el-table-column align="center" prop="purchaseIntention" label="采购意向"></el-table-column>
          <el-table-column align="center" prop="purchaseAgentName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="purchaseAgentPassport" label="护照号码"></el-table-column>
          <el-table-column align="center" prop="newPurchaseAgentPost" label="职务"></el-table-column>
          <el-table-column align="center" prop="purchaseAgentEmail" label="E-mail"></el-table-column>
          <el-table-column align="center" prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="toEdit(scope.row)" style="text-decoration: underline;">修改</el-button>
              <el-button style="color: red;text-decoration: underline;" size="small" type="text" @click="toDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="associa-recom-btn-container">
          <div class="btn-bar">
            <el-button @click="recommendBuyers" class="btn_recommend" size="medium">推荐采购商</el-button>
          </div>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange">
          </pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import pagination from "@/components/project/onlineService/common/pagination.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import { $helper } from '@/scripts/project/utils';
import { mapGetters, mapActions } from "vuex";
export default {
  // 引入的分页组件
  components: {
    'pagination': pagination,
    "search-param-link": searchParamLinkage
  },

  data() {
    return {
      activeName: "first", // tab标题
      //设置table的loading变量
      loading: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "purchaserName",
        data: [
          {
            prop: "purchaserName",
            label: "公司名称",
            value: "",
            type: "input"
          }
        ]
      },
      // 分页初始
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      tableData: [], // 存储表格数据的数组
      // 传参
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [localStorage.getItem("getComPanyId")],
            "description": ""
          }
        ],
        "pageIndex": 0,
        "pageSize": 10
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters('vipEnterManagement', ['getRecosum', 'deletePur'])
  },
  methods: {
    ...mapActions('vipEnterManagement', ['getRecoSumInfo', 'deletePurchaserInfo']),
    // 模糊查询
    selectParams() {
      // 查询字段去空格
      let val = $helper.trim(this.searchParamsForm.data[0].value);
      // 定义传参
      if (val !== "") {
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [localStorage.getItem("getComPanyId")],
            "description": ""
          },
          {
            "name": "purchaserName",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [val],
            "description": ""
          }
        ];
      } else {
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ];
      }
      this.getData();
    },
    //初始数据
    getData() {
      //获取字典数据
      let dicData = JSON.parse(localStorage.getItem('dictData'));
      // 初始列表获取数据并改变分页数据
      this.getRecoSumInfo(this.searchParams).then(res => {
        this.tableData = res.records;
        this.pageInfo.currentPage = 1;
        this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
        if (res.records && res.records.length > 0) {
          res.records.forEach((value, index, array) => {
            let newcountoryRegion = '';
            let newpurchaseAgentPost = '';
            if (value.countoryRegion) {
              newcountoryRegion = $helper.getDicText(dicData.countryDic, value.countoryRegion);
            } else {
              newcountoryRegion = '';
            }
            value.newCountoryRegion = newcountoryRegion;
            if (value.purchaseAgentPost) {
              newpurchaseAgentPost = $helper.getDicText(dicData.post, value.purchaseAgentPost);
            } else {
              newpurchaseAgentPost = '';
            }
            value.newPurchaseAgentPost = newpurchaseAgentPost;
          });
        }
      });
    },

    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    },
    // 跳转推荐采购商表单页
    recommendBuyers() {
      this.$router.push("/recommendBuyers");
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      // 跳转页数加载页面
      // 初始列表获取数据并改变分页数据
      this.getRecoSumInfo(this.searchParams).then(res => {
        //获取字典数据
        let dicData = JSON.parse(localStorage.getItem('dictData'));
        this.tableData = res.records;
        if (res.records && res.records.length > 0) {
          res.records.forEach((value, index, array) => {
            let newcountoryRegion = '';
            let newpurchaseAgentPost = '';
            if (value.countoryRegion) {
              newcountoryRegion = $helper.getDicText(dicData.countryDic, value.countoryRegion);
            } else {
              newcountoryRegion = '';
            }
            value.newCountoryRegion = newcountoryRegion;
            if (value.purchaseAgentPost) {
              newpurchaseAgentPost = $helper.getDicText(dicData.post, value.purchaseAgentPost);
            } else {
              newpurchaseAgentPost = '';
            }
            value.newPurchaseAgentPost = newpurchaseAgentPost;
          });
        }
        //设置table的loading变量
        this.loading = false;
      });
    },
    // 同上
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageIndex = val;
      this.getRecoSumInfo(this.searchParams).then(res => {
        //获取字典数据
        let dicData = JSON.parse(localStorage.getItem('dictData'));
        this.tableData = res.records;
        if (res.records && res.records.length > 0) {
          res.records.forEach((value, index, array) => {
            let newcountoryRegion = '';
            let newpurchaseAgentPost = '';
            if (value.countoryRegion) {
              newcountoryRegion = $helper.getDicText(dicData.countryDic, value.countoryRegion);
            } else {
              newcountoryRegion = '';
            }
            value.newCountoryRegion = newcountoryRegion;
            if (value.purchaseAgentPost) {
              newpurchaseAgentPost = $helper.getDicText(dicData.post, value.purchaseAgentPost);
            } else {
              newpurchaseAgentPost = '';
            }
            value.newPurchaseAgentPost = newpurchaseAgentPost;
          });
        }
        //设置table的loading变量
        this.loading = false;
      });
    },
    // 删除数据
    toDelete(val) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          purchaserId: val.purchaserId
        };
        this.deletePurchaserInfo(param).then(res => {
          this.$message.success("删除成功");
          this.getData();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 进入编辑页面，带上某行数据
    toEdit(val) {
      this.$router.push({
        path: "/recommendBuyers",
        query: val
      });
    }
  }
};
</script>
<style scoped>
.vip-suminfo .el-table {
  text-align: center;
}
.btn_recommend {
  background: #ff6600;
  color: white;
  margin: 20px 0px;
  height: 40px;
  padding: 0px 30px;
}
.associa-recom-btn-container {
  display: table;
  padding: 10px 2%;
  width: 96%;
}
.btn-bar {
  display: table-cell;
  text-align: left;
  vertical-align: middle;
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>



