<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="各展区企业申请情况统计" name="first">
      <div class="tableTip">
        <p class="appliExhibition">共查询到<span>{{applyInfoByExhibitionArea.total}}</span>条记录</p>
        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>
      <el-table :data="applyInfoByExhibitionArea.records" border>
        <el-table-column
          prop="exhibitionNumber"
          label="届数"
          align="center">
        </el-table-column>
        <el-table-column prop="exhibitionPeriod" label="展期" align="center"></el-table-column>
        <el-table-column prop="coceralName" label="相关商会" align="center"></el-table-column>
        <el-table-column
          prop="exhibitionAreaName"
          label="展区名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="applyCompanyCount"
          label="申请企业数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="applyExhSeatCount"
          label="申请展位数量"
          align="center">
        </el-table-column>
        <el-table-column prop="ringRatioIncOrDec" label="环比增减量" align="center"></el-table-column>
        <el-table-column prop="yearOnYearIncOrDec" label="同比增减量" align="center"></el-table-column>
        <el-table-column prop="boothNumScale" label="展区规模" align="center"></el-table-column>
        <el-table-column prop="exhibitionRate" label="展位满足率" align="center"></el-table-column>
        <el-table-column prop="exhibitionRateChange" label="同比展位需求满足率变化" align="center"></el-table-column>
        <el-table-column prop="brandBoothCount" label="品牌展位申请数量" align="center"></el-table-column>
        <el-table-column prop="ordinaryBoothNumber" label="一般性展位申请数量" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="applyInfoByExhibitionArea.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "eachExhibitionArea",
  data() {
    return {
      activeName: 'first',
      pageInfoData: {
        currentPage: 1, pageSize: 10
      }
    };
  },
  computed: {
    ...mapGetters("enterpriseBooth", ['applyInfoByExhibitionArea']),
    queryFormParams() {
      return {
        // delegationId: this.queryFormInline.delegationId,
        // subgroupId: this.queryFormInline.subgroupId,
        // cityName: this.queryFormInline.cityName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getQueryApplyInfoByExhibitionArea(this.queryFormParams);
  },
  methods: {
    ...mapActions('enterpriseBooth', ['getQueryApplyInfoByExhibitionArea']),
    ...mapActions("downTotal", ["add3DownMangeList"]),
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getQueryApplyInfoByExhibitionArea(this.queryFormParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getQueryApplyInfoByExhibitionArea(this.queryFormParams);
    },
    // 下载模板
    downLoad() {
      // kindo.util.getdown(`${process.env.API_SN_URL}/api/report/businessDelegationAndArea/export`, '各交易团各展区申请情况汇总.xls');
      this.add3DownMangeList().then(res => {
        this.$message({
          message: "下载已创建成功，请到下载管理模块查看",
          type: 'success'
        });
      });
    }
  }
};
</script>
<style lang='less' scoped>

.tableTip .appliExhibition {
  float: left
}
.tableTip .appliExhibition span {
  margin: 0 4px
}
.tableTip .downLoadXls {
  float: right;
  cursor: pointer
}
</style>
