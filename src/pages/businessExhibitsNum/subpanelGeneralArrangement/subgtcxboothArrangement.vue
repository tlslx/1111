<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="各团查询本团的一般性展位安排进度" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="展期">
            <el-select v-model="formData.exhibitionPeriod" clearable>
              <el-option label="第一期" value="1"></el-option>
              <el-option label="第二期" value="2"></el-option>
              <el-option label="第三期" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionAreaCode" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="非100%提交">
            <el-select v-model="formData" clearable>
              <el-option label value></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展位数（不含卡车通道展位）" prop="ordinaryNumber">
            <template slot-scope="scope">
              {{scope.row.ordinaryNumber == null ? "0" : scope.row.ordinaryNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="卡车通道展位数" prop="centerChannelNumber">
            <template slot-scope="scope">
              {{scope.row.centerChannelNumber == null ? "0" : scope.row.centerChannelNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="最终展位数" prop="boothNumberFinal">
            <template slot-scope="scope">
              {{scope.row.boothNumberFinal == null ? "0" : scope.row.boothNumberFinal}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐特装数" prop="recommendSpecial">
            <template slot-scope="scope">
              {{scope.row.recommendSpecial == null ? "0" : scope.row.recommendSpecial}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐标摊数" prop="recommendStandard">
            <template slot-scope="scope">
              {{scope.row.recommendStandard == null ? "0" : scope.row.recommendStandard}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐卡车通道数" prop="recommendCentralChannel">
            <template slot-scope="scope">
              {{scope.row.recommendCentralChannel == null ? "0" : scope.row.recommendCentralChannel}}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="交易团推荐统一布展数"></el-table-column> -->
          <el-table-column align="center" min-width="120" label="推荐总数">
            <template slot-scope="scope">
              {{Number(scope.row.recommendSpecial) + Number(scope.row.recommendStandard) + Number(scope.row.recommendCentralChannel)}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团未推荐数" prop="notRecommendNumber">
            <template slot-scope="scope">
              {{scope.row.notRecommendNumber == null ? "0" : scope.row.notRecommendNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐百分比" prop="recommendPercent">
            <template slot-scope="scope">
              {{scope.row.recommendPercent == null ? "0" : scope.row.recommendPercent}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展位位置安排进度（以预置到交易团为准）" prop="brandPositionSchedulePercent">
            <template slot-scope="scope">
              {{scope.row.brandPositionSchedulePercent == null ? "0" : scope.row.brandPositionSchedulePercent}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="企业展位位置安排进度（以预置到企业为准）" prop="companyPositionSchedulePercent">
            <template slot-scope="scope">
              {{scope.row.companyPositionSchedulePercent == null ? "0" : scope.row.companyPositionSchedulePercent}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="已预置展位数（以预置到企业为准）" prop="presetNumber">
            <template slot-scope="scope">
              {{scope.row.presetNumber == null ? "0" : scope.row.presetNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="剩余展位数（指未预置到企业为准）" prop="leftNumber">
            <template slot-scope="scope">
              {{scope.row.leftNumber == null ? "0" : scope.row.leftNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="实际安排特装数" prop="actualRecommendSpecial">
            <template slot-scope="scope">
              {{scope.row.actualRecommendSpecial == null ? "0" : scope.row.actualRecommendSpecial}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="实际安排标摊数" prop="actualRecommendStandard">
            <template slot-scope="scope">
              {{scope.row.actualRecommendStandard == null ? "0" : scope.row.actualRecommendStandard}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="实际安排卡车通道数" prop="actualRecommendCentralChannel">
            <template slot-scope="scope">
              {{scope.row.actualRecommendCentralChannel == null ? "0" : scope.row.actualRecommendCentralChannel}}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" min-width="120" label="100%提交"></el-table-column> -->
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" size="small" class="formStyle" @click="handDownload">下载</el-button>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      obj: {
        current: 1,
        size: 10,
        delegationId: "010"
      },
      formData: {
        exhibitionPeriod: "",
        exhibitionAreaCode: ""
      },
      tableData: [],
      addForm: {},
      localstora: {
        exhibitionArea: []
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      token: "",
      activeName: "first"
    };
  },
  mounted() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistSchedulePlan" // 交易团查看安排方案
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistSchedulePlan(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          // for (let i = 0; i < getTable.length; i++) {
          //   let aopt = {
          //     label: getTable[i].companyCecfCode,
          //     value: getTable[i].companyCecfCode
          //   };
          //   this.optioncode.push(aopt);
          // }
          // let hash = {};
          // this.optioncode = this.optioncode.reduce(function(item, next) {
          //   hash[next.value] ? '' : hash[next.value] = true && item.push(next);
          //   return item;
          // }, []);
          // for (let i = 0; i < this.optioncode.length; i++) {
          //   if (this.optioncode[i].value === "" || this.optioncode[i].value == null) {
          //     this.optioncode.splice(i, 1);
          //   }
          // }
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "010"
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
    // 下载
    handDownload() {
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&delegationId=" + this.obj.delegationId + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode + "&exhibitionPeriod=" + this.formData.exhibitionPeriod + "&token=" + this.token;
      window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/schedulePlan/download?current=" + url, "_parent");
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
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 300px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
