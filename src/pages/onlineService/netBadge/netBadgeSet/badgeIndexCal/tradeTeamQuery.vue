<template>
  <div class="tradeTeamQueryBox">
    <kindo-box title="交易团证件指标查询">
      <kindo-table ref="tradeTable" :pageIndex='false' :span-method="objectSpanMethod" :pagination="false" v-loading="loading">
        <el-table-column label="展期" prop="exhibition" align="center" min-width="80"></el-table-column>
        <el-table-column label="参展商证" align="center" min-width="80">
          <el-table-column label="使用数" prop="exhibitorBadgeUse" align="center" min-width="80"></el-table-column>
          <el-table-column label="剩余数" prop="exhibitorBadgeLeft" align="center" min-width="80"></el-table-column>
        </el-table-column>
        <el-table-column label="参展代表证（出口展区）" align="center" min-width="80">
          <el-table-column label="使用数" prop="exhibitorDelegateBadgeUse" align="center" min-width="80"></el-table-column>
          <el-table-column label="剩余数" prop="exhibitorDelegateBadgeLeft" align="center" min-width="80"></el-table-column>
        </el-table-column>
        <el-table-column label="筹展证" align="center" min-width="80">
          <el-table-column label="使用数" prop="prepareExhibitionBadgeUse" align="center" min-width="80"></el-table-column>
          <el-table-column label="剩余数" prop="prepareExhibitionBadgeLeft" align="center" min-width="80"></el-table-column>
        </el-table-column>
        <el-table-column label="撤展证" align="center" min-width="80">
          <el-table-column label="使用数" prop="cancelExhibitionBadgeUse" align="center" min-width="80"></el-table-column>
          <el-table-column label="剩余数" prop="cancelExhibitionBadgeLeft" align="center" min-width="80"></el-table-column>
        </el-table-column>
        <el-table-column label="团部工作证" align="center" min-width="80">
          <el-table-column label="使用数" prop="tradeGroupWorkBadgeUse" align="center" min-width="80"></el-table-column>
          <el-table-column label="剩余数" prop="tradeGroupWorkBadgeLeft" align="center" min-width="80"></el-table-column>
        </el-table-column>
      </kindo-table>
    </kindo-box>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/badgeIndexCal/tradeTeamQuery",
      baseTestUrl: 'http://10.28.124.108:9001/',
      api: {
        getData: kindo.config.api.osUrl + '/api/tradeGroupBadgeIndex/getTradeGroupBadgeIndex'
      },
      tradeTableData: [],
      loading: false
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //合并表格最后两列
      if (columnIndex === 9 || columnIndex === 10) {
        if (rowIndex === 0) {
          return {
            rowspan: this.tradeTableData.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    buildTradeTableData(data) {
      const tradeTableData = [];
      let exhibition = '';
      data.forEach((d, index) => {
        if (d.exhibitionPeriodIndex === 1) {
          exhibition = '一期';
        }
        if (d.exhibitionPeriodIndex === 2) {
          exhibition = '二期';
        }
        if (d.exhibitionPeriodIndex === 3) {
          exhibition = '三期';
        }
        const tradeObj = {
          id: index + 1,
          exhibitionPeriodIndex: d.exhibitionPeriodIndex,
          exhibition: exhibition
        };
        //itemCode 1:参展商证 2:团部工作证  3:参展代表证 5:筹展证 6:撤展证
        d.bigBadgeType.forEach(item => {
          if (item.itemCode === '1') {
            tradeObj.exhibitorBadgeUse = item.hasUsingNum;
            tradeObj.exhibitorBadgeLeft = item.remainingNum;
          }
          if (item.itemCode === '2') {
            tradeObj.tradeGroupWorkBadgeUse = item.hasUsingNum;
            tradeObj.tradeGroupWorkBadgeLeft = item.remainingNum;
          }
          if (item.itemCode === '3') {
            tradeObj.exhibitorDelegateBadgeUse = item.hasUsingNum;
            tradeObj.exhibitorDelegateBadgeLeft = item.remainingNum;
          }
          if (item.itemCode === '5') {
            tradeObj.prepareExhibitionBadgeUse = item.hasUsingNum;
            tradeObj.prepareExhibitionBadgeLeft = item.remainingNum;
          }
          if (item.itemCode === '6') {
            tradeObj.cancelExhibitionBadgeUse = item.hasUsingNum;
            tradeObj.cancelExhibitionBadgeLeft = item.remainingNum;
          }
        });
        tradeTableData.push(tradeObj);
      });
      return tradeTableData;
    }
  },
  created() {
    this.loading = true;
  },
  mounted() {
    // const url = this.baseTestUrl + 'api/tradeGroupBadgeIndex/getTradeGroupBadgeIndex';
    const url = this.api.getData;
    this.$http.get(url)
      .then(res => {
        if (res && res.length > 0) {
          const tradeTableData = this.buildTradeTableData(res);
          this.tradeTableData = tradeTableData;
          this.$refs.tradeTable.internalData = tradeTableData;
          this.loading = false;
        }
      })
      .catch(err => {
        console.error(err);
        this.loading = false;
      });
  }
};
</script>
<style lang="less" scoped>
.tradeTeamQueryBox {
}
</style>
