/**
 * @file 交易团分团撤回
 * @author: weiwei
 * @date:2019/6/1
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="报送人员信息撤回列表" name="second">
      <div class="above-table">报送人员信息撤回列表
        <el-button type="text" class="download">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border>

      </el-table>
      <el-pagination
        @size-change="handleSizeChangeTwo"
        @current-change="handleCurrentChangeTwo"
        :current-page="pageInfoDataTwo.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoDataTwo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </el-tab-pane>

    <el-tab-pane label="驻地信息撤回列表" name="third">
      <div class="above-table">驻地信息撤回列表
        <el-button type="text" class="download">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border>

      </el-table>
      <el-pagination
        @size-change="handleSizeChangeThr"
        @current-change="handleCurrentChangeThr"
        :current-page="pageInfoDataThr.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoDataThr.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="交易团秘书长以上参会人员信息撤回列表" name="fourth">
      <div class="above-table">驻地信息撤回列表
        <el-button type="text" class="download">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border>

      </el-table>
      <el-pagination
        @size-change="handleSizeChangeFo"
        @current-change="handleCurrentChangeFo"
        :current-page="pageInfoDataFo.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoDataFo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        pageInfoDataTwo: { currentPage: 1, pageSize: 10 },
        pageInfoDataThr: { currentPage: 1, pageSize: 10 },
        pageInfoDataFo: { currentPage: 1, pageSize: 10 }
      };
    },
    methods: {
      handleSizeChangeTwo(val) {
        this.pageInfoDataTwo.pageSize = val;
        // this.getAssociationList(this.paramsTwo); // tab2
      },
      handleCurrentChangeTwo(val) {
        this.pageInfoDataTwo.currentPage = val;
        // this.getAssociationList(this.paramsTwo); // tab2
      },
      handleSizeChangeThr(val) {
        this.pageInfoDataThr.pageSize = val;
        // this.getStationList(this.paramsThr); // tab3
      },
      handleCurrentChangeThr(val) {
        this.pageInfoDataThr.currentPage = val;
        // this.getStationList(this.paramsThr); // tab3
      },
      handleSizeChangeFo(val) {
        this.pageInfoDataFo.pageSize = val;
        // this.getGeneralList(this.paramsFo);
      },
      handleCurrentChangeFo(val) {
        this.pageInfoDataFo.currentPage = val;
        // this.getGeneralList(this.paramsFo);
      }
    }
  };
</script>
<style lang='less' scoped>
.el-tabs {
  .el-tab-pane {
    .above-table {
      position: relative;
      padding-bottom: 10px;
      /deep/ .el-button {
        position: absolute;
        &.download {
          right: 40px;
        }
        &.print {
          right: 0px;
        }
      }
    }
  }
}
</style>
