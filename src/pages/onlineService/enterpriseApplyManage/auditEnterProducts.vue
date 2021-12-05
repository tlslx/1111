/**
 * @file 企业展品管理---审核企业展品
*/
<style scoped>
.sort-btns{
  width:100%;
  margin-bottom: 30px;
}
.page-bar{
  width: 60%;
  float: right;
}
.table-img {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业展品" name="first">
      <div class="sort-btns">
        展品名称：
        <el-input v-model="searchContent" clearable style="width:200px;" @change="getSearch" placeholder="请输入展品名称"></el-input>
        <el-button @click="getSearchData" type="primary">查询</el-button>
      </div>
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" v-loading="loading"
        @selection-change="handleSelectionChange" :header-cell-style="tableHeaderColor">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="exhibitNameCh" label="展品名称"></el-table-column>
        <el-table-column label="展品类别">
          <template slot-scope="scope">
            {{ scope.row.newExhibitTypeOne }}{{ scope.row.newExhibitTypeTwo}}{{ scope.row.newExhibitTypeThree }}
          </template>
        </el-table-column>
        <el-table-column prop="modifyDate" label="更新时间"></el-table-column>
        <el-table-column prop="exhibitImageId" label="展品图片">
           <template slot-scope="scope">
          <img :src="scope.row.imageUrl" class="table-img">
           </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" style="text-decoration: underline;" @click="handleEdit(scope.row)">开始审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:94%;padding:1% 3%;">
        <el-button @click="toAuditing" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">审核通过</el-button>
        <el-button @click="toAuditNOT" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">审核不通过</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  components: {
    'pagination': pagination
  },
  data() {
    return {
      activeName: "first",
      fullscreenLoading: false,
      searchContent: "",
      //设置table的loading变量
      loading: false,
      //批量审核按钮初始禁用
      disabled: true,
      dicTypeData: {},
       // 分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      tableData: [], // 表格数据
      multipleSelection: [], // 多选暂存数据
      // 审核传参
      selectData: [], // 批量审核通过暂存数据
      selectDataNot: [], // 批量审核不通过暂存数据
      // 传参需要
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "approveResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["3"],
            "description": ""
          }
        ],
        "pageIndex": 1,
        "pageSize": 10
      }
    };
  },
  created() {

    this.getExhibitCategorysInfo().then(res => {
      this.dicTypeData = res;
      // 初始列表
      this.getData();
    });
  },
  computed: {
    ...mapGetters('enterExManagement', ['getAudit', 'getopinion'])
    // ...mapGetters('typeData', ['dicTypeData'])
  },
  methods: {
    ...mapActions('enterExManagement', [
      'getAuditEnterProductInfo',
      'getExhibitCategorysInfo', // 获取展品类别
      'getOpinionInfo'
    ]),
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    },
    // 获取搜索输入的值
    getSearch(val) {
      this.searchContent = $helper.trim(val);
    },
    // 模糊查询刷新表格
    getSearchData() {
      if (this.searchContent !== "") {
        this.searchParams.customQueryParams = [
          {
            "name": "exhibitNameCh",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchContent],
            "description": ""
          },
          {
            "name": "approveResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["3"],
            "description": ""
          }
        ];
        this.searchParams.pageIndex = 1;
        this.getData();
      } else {
        this.searchParams.customQueryParams = [
          {
            "name": "approveResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["3"],
            "description": ""
          }
        ];
        this.getData();
      }
    },
    // 跳转审核页面并带上所需值
    handleEdit(row) {
      this.$router.push({
        path: "/auditOpinion",
        query: {
          row: row
        }
      });
    },
    // 审核通过
    toAuditing() {
      this.fullscreenLoading = true;
      let param = {
        "approveInfos": this.selectData
      };
      this.getOpinionInfo(param).then(reso => {
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000);
        this.getData();
      });
    },
    // 审核不通过
    toAuditNOT() {
      this.fullscreenLoading = true;
      let param = {
        "approveInfos": this.selectDataNot
      };
      this.getOpinionInfo(param).then(reso => {
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000);
        this.getData();
      });
    },
    // 分页事件
    handleSizeChange(val) {
      // 设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      // 设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageIndex = val;
      this.getData();
    },
    // 获取多选值并保留传参所需字段
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //批量时，若未选择数据，按钮禁用
      if (val.length >= 1) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      // 返回批量审核通过数据
      this.selectData = this.multipleSelection.map(el => {
        return {
          "oldExhibitId": el.oldExhibitId,
          "exhibitId": el.exhibitId,
          "approveResult": "1",
          "showStatus": "2",
          "modifierId": this.$store.getters.userInfo.userId,
          "modifierName": this.$store.getters.userInfo.userName,
          "approveExplain": null
        };
      });
      // 返回批量审核不通过数据
      this.selectDataNot = this.multipleSelection.map(el => {
        return {
          "oldExhibitId": el.oldExhibitId,
          "exhibitId": el.exhibitId,
          "approveResult": "2",
          "modifierId": this.$store.getters.userInfo.userId,
          "modifierName": this.$store.getters.userInfo.userName,
          "approveExplain": null
        };
      });
    },
    // 字典code转换
    getDicText(dicArray, dicValue) {
      let text = '';
      for (let i = 0; i < dicArray.length; i++) {
        if (dicArray[i].exhibitTypeId === dicValue) {
          text = dicArray[i].commcn;
        }
      }
      return text;
    },
    getData() {
      this.getAuditEnterProductInfo(this.searchParams).then(res => {
        let _this = this;
        res.records.forEach((value, index, array) => {
          let newexhibitTypeOne = '';
          let newexhibitTypeTwo = '';
          let newexhibitTypeThree = '';
          if (value.exhibitTypeOne) {
            newexhibitTypeOne = _this.getDicText(_this.dicTypeData.exhibit_type_one, value.exhibitTypeOne);
          } else {
            newexhibitTypeOne = '';
          }
          value.newExhibitTypeOne = newexhibitTypeOne;
          if (value.exhibitTypeTwo) {
            newexhibitTypeTwo = " " + '|' + " " + _this.getDicText(_this.dicTypeData.exhibit_type_two, value.exhibitTypeTwo);
          } else {
            newexhibitTypeTwo = '';
          }
          value.newExhibitTypeTwo = newexhibitTypeTwo;
          if (value.exhibitTypeThree) {
            newexhibitTypeThree = " " + '|' + " " + _this.getDicText(_this.dicTypeData.exhibit_type_three, value.exhibitTypeThree);
          } else {
            newexhibitTypeThree = '';
          }
          value.newExhibitTypeThree = newexhibitTypeThree;
          if (value.images && value.images[0] && value.images[0].imageB) {
            value.imageUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.images[0].imageB;
          }
        });
        this.tableData = res.records;
        this.pageInfo.currentPage = 1;
        this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });

    }
  }
};
</script>
