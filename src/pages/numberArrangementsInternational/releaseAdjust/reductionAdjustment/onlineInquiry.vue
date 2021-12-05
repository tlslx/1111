<template>
  <div v-loading.fullscreen="fullLoading" class="pad-b">
    <el-card style="padding-bottom: 24px">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" size="small" label-width="130px">
        <el-form-item label="对方交易团">
          <el-select v-model="formData.otherDelegationCode" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="formData.boothType" clearable>
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道展位" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整类型">
          <el-select v-model="formData.adjustType" clearable>
            <el-option label="还原调整" value="RESTORE_EXCHANGE_UNEQUAL"></el-option>
            <el-option label="等量调换" value="EQUAL_EXCHANGE"></el-option>
            <el-option label="不等量调换" value="UNEQUAL_EXCHANGE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本团换入展位类别">
          <el-select v-model="formData.inAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本团换出展位类别">
          <el-select v-model="formData.outAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="届数">
          <el-select v-model="formData.exhibitionSession" clearable>
            <el-option
              v-for="(item, index) in formOptionOne"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column align="center" min-width="120" label="编号" prop="orderNo"></el-table-column>
        <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
          <template slot-scope="scope">
            {{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="对方交易团" prop="otherDelegationName">
        </el-table-column>
        <el-table-column align="center" min-width="120" label="本团换入展位类别" prop="inArea">
        </el-table-column>
        <el-table-column align="center" min-width="120" label="本团换入展位数" prop="inNumber">
        </el-table-column>
        <el-table-column align="center" min-width="120" label="本团换出展位类别" prop="outArea">
        </el-table-column>
        <el-table-column align="center" min-width="120" label="本团换出展位数" prop="outNumber">
        </el-table-column>
        <el-table-column align="center" min-width="120" label="调整类型" prop="adjustType">
          <template slot-scope="scope">
            {{scope.row.adjustType | adjustTypeAdjust}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="生效情况" prop="examineStatus">
          <template slot-scope="scope">
            {{scope.row.examineStatus | checkState}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="备注" prop="remark">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="top">
              <div slot="content" style="width: 200px;">{{scope.row.remark}}</div>
              <div class="remarkStyle">{{scope.row.remark}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" min-width="120" label="备注" prop="remark">
        </el-table-column> -->
      </el-table>
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
  </div>
</template>
<script>
import { mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      obj: {
        pageIndex: 1,
        pageSize: 10,
        delegationId: "140"
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      }, // 数据字典
      formData: {
        otherDelegationCode: "",
        inAreaCode: "",
        outAreaCode: "",
        adjustType: ""
      },
      formOptionOne: [],
      fullLoading: true, // 加载
      // 表格数据
      tableData: [],
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      }
    };
  },
  mounted() {
    // this.getlistAdjustDemand().then(res => {
    //   if (res.records.length !== 0) {
    //     let id = { adjustDemandId: res.records[0].adjustDemandId };
    //     this.getlistDelegation(id).then(resde => {
    //       for (let j = 0; j < resde.records.length; j++) {
    //         this.localstora.delegation = JSON.parse(JSON.stringify(resde.records));
    //       }
    //     }).catch(e => {});
    //   }
    // }).catch(e => {});
    // 展届
    this.getsysExhibitions().then(res => {
      // this.formOptionOne = JSON.parse(JSON.stringify(res.data));
      for (let i = 0; i < res.data.length; i++) {
        this.formOptionOne.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.formOptionOne = this.formOptionOne.sort(rul);
    });
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    // // 交易团
    // this.getdelegationDepartment().then(res => {
    //   this.localstora.delegation = JSON.parse(JSON.stringify(res));
    // }).catch(e => {});
    this.getListPage(this.obj);
  },
  filters: {
    checkState(value) {
      if (value === "1") {
        return "通过";
      } else if (value === "2") {
        return "不通过";
      } else if (value === "0") {
        return "未审核";
      } else {
        return "待确认";
      }
    },
    adjustTypeAdjust(val) {
      switch (val) {
        case "REFUND":
          return "退回展位";
        case "NEW_EXHIBITION":
          return "新增展位";
        case "EQUAL_EXCHANGE":
          return "等量调换";
        case "RECOVERY":
          return "回收展位";
        case "TYPE_EXCHANGE":
          return "展位类别调整";
        case "UNEQUAL_EXCHANGE":
          return "不等量调换";
        case "RESTORE_EXCHANGE_EQUAL":
          return "还原调整（等量调换）";
        case "RESTORE_EXCHANGE_UNEQUAL":
          return "还原调整（还原）";
        case "OTHER":
          return " 其他";
        default:
          return "";
      }
    }
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistAllScheduleApply" // 线上记录查询
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getsysExhibitions", // 获取所有展届信息
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据 ok
    getListPage(Url) {
      this.fullLoading = true;
      this.tableData = [];
      this.getlistAllScheduleApply(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {});
    },
    // 查询 ok
    onSearch() {
      this.obj = {
        delegationId: "140",
        current: "1",
        size: "10"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
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
    // 编辑
    computEdit() {},
    // 删除
    computDele() {},
    // 撤回
    revocation() {},
    // 分条/页
    handleSizeChange(val) {
      this.obj.pageSize = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.pageIndex = val;
      this.getListPage(this.obj);
    }
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
.pad-b {
  padding: 5px;
}
.remarkStyle {
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; 
}
</style>


