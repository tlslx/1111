<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看方案" name="first" v-loading.fullscreen="fullLoading">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionArea" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="交易团">
            <el-select v-model="formData.delegationId" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="展期">
            <el-select v-model="formData.exhibitionPeriod" clearable>
              <el-option v-for="(item, index) in exhibitionPeriod" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商会">
            <el-select v-model="formData.coceralId" clearable>
              <el-option
                v-for="(item, index) in localstora.businessAssociation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="formData.boothType" clearable>
              <el-option label="一般性展位" value="1"></el-option>
              <el-option label="中央通道展位" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border show-summary :summary-method="getSummaries">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" min-width="120" label="类别" prop="boothType">
            <template slot-scope="scope">{{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="商会" prop="coceralName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" :label="`${getCes - 1}届最终展位数/${getCes}届初始展位数`" prop="initNum"></el-table-column>
          <el-table-column align="center" min-width="120" label="等量调换" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="不等量调换" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="还原调整" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="退展位" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="新增展位" prop="boothNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="回收展位" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展位类型调整" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="其他调整" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" :label="`${getCes}届最终展位数`" prop="initialNumber"></el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" size="small" class="formStyle">下载</el-button>
        </div>
        <!-- 分页 -->
        <div class="floatRight paginationTop">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="paginationData.pageSizes"
            :current-page="paginationData.currentPage"
            :pager-count="paginationData.pagerCount"
            :page-size="paginationData.pageSize"
          ></el-pagination>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import editFormTable from "@/components/project/common/editFormTable";
export default {
  components: {
    editFormTable
  },
  data() {
    return {
      obj: {
        current: 1,
        size: 10,
        delegationCode: "140"
      },
      formData: {
        region: ""
      },
      optionS: [{ label: "", value: "5" }],
      fullLoading: false,
      checked: false, // 全选
      // 表格数据
      tableData: [],
      exhibitionPeriod: [], // 展期 字典
      opboothType: [], // 类别
      localstora: {
        exhibitionArea: [], // 展区
        businessAssociation: [] // 商协会
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      activeName: "first"
    };
  },
  filters: {
    nper(data) {
      if (data === "1") {
        return "第一期";
      } else if (data === "2") {
        return "第二期";
      } else if (data === "3") {
        return "第三期";
      }
    }
  },
  async created () {
    this.exhibitionPeriod = await kindo.dictionary.get("exhibitionPeriodNum");
    this.opboothType = await kindo.dictionary.get("exhibitionPositionType");
  },
  mounted() {
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationCode = this.$store.getters.userInfo.org.deptId;
    }
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 展届
    this.getcurrentExhibitionSession();
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"]),
    ...mapGetters("nainformation", ["getCes"])
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "getpublishListByDelegation" // 8.1交易团方案查看
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getassociationDepartment", // 商协会
      "getcurrentExhibitionSession" // 展届
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getpublishListByDelegation(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = res.records;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: 1,
        size: 10,
        delegationCode: "140"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationCode = this.$store.getters.userInfo.org.deptId;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 页面合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "--";
        }
        if (index === 7 || index === 8 || index === 9 || index === 6 || index === 12 || index === 13 || index === 11) {
          sums[index] = "0";
        }
        if (index === 1 || index === 3 || index === 2) {
          sums[index] = "--";
        }
      });
      return sums;
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    },
    onEdit() {},
    onServe() {}
  }
};
</script>
<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
</style>
