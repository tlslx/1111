/**
 * @file 区域及地方分团维护(交易团)
 * @author: zhipeng + weiwei
 * @date:2019/4/12
 */
<template>
  <el-container>
    <el-header>
      <span>区域及地方分团维护(交易团)</span>
    </el-header>
    <el-main>
      <el-col :span="10" style="border-right: 1px solid #ddd">
        <!-- :show-header = false -->
        <el-table :data="delegationMenuListLeftData.records" border height="500" highlight-current-row
          :row-style="tableRowStyle" :cell-style="tableCellStyle" @row-click="handleRowClick" ref="delegationMenuListLeft">
          <el-table-column prop="delegationName" label="交易团"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
        </el-table>

        <el-row type="flex" justify="end">
          <el-pagination
            @size-change="handleLeftSizeChange"
            @current-change="handleLeftCurrentChange"
            :current-page="pageInfoLeft.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoLeft.size"
            layout="prev, pager, next, jumper"
            :total="delegationMenuListLeftData.total">
          </el-pagination>
        </el-row>
      </el-col>

      <el-col :span="14">
        <el-tabs v-model="activeName">
          <el-tab-pane :label='delegationLabel' name="first">
            <el-row style="padding-bottom: 10px;">
              <el-form :model="savedFormData">
                <el-form-item label="保存的届数" prop="savedExhibitionNum">
                  <el-select v-model="savedFormData.savedExhibitionNum" style="width: 300px;">
                    <el-option v-for="item in this.saveExhibitonNumList" :key="item.value" :label="item.lable"
                    :value="item.value" @click.native="handleQueryList"></el-option>
                  </el-select>
                  <span v-show="beforeExhibitDisable">  查看往届</span>
                </el-form-item>
              </el-form>
            </el-row>
            <el-row style="padding-bottom: 10px;">
              <!-- <el-button type="primary" @click="addDialog = true" :disabled="!this.addParams.delegationId || beforeExhibitDisable">新增分团</el-button> -->
              <el-button style="float: right; margin-right: 10px;" type="text" :disabled="!this.queryMainListParams.delegationId"
                @click="downloadMainTableList">下载XLS</el-button>
            </el-row>

            <el-table :data="delegationListMainData.records" border id="delegationListMain">
              <el-table-column prop="subgropName" label="分团名称"></el-table-column>
              <el-table-column prop="delegationName" label="交易团名称"></el-table-column>
              <el-table-column prop="account" label="账号"></el-table-column>
              <!-- <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="showEditSubDialog(scope.row)" :disabled="beforeExhibitDisable">修改</el-button>
                </template>
              </el-table-column> -->
              <el-table-column prop="" label="状态">
                <template slot-scope="scope">
                  <span>{{scope.row.state == 0 ? '禁用' : (scope.row.state == 1 ? '启用' : '')}}</span>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="end">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfoData.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageInfoData.pageSize"
                layout="prev, pager, next, jumper"
                :total="delegationListMainData.total">
              </el-pagination>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-main>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      delegationLabel: '',
      pageInfoLeft: { size: 10, current: 1 },
      currentDelegationId: '', // 暂存左侧交易团id
      pageInfoData: { pageSize: 10, currentPage: 1 },
      // 历史展届
      savedFormData: {
        savedExhibitionNum: null // 已保存之后的列表
      },
      beforeExhibitDisable: false // 往届时禁用
    };
  },
  computed: {
    // "delegationListLeftData", 不用 'delegationAreaListSelectData', 'exhibitonNumList',
    ...mapGetters("subEnterpriseManage", ['delegationMenuListLeftData',
      'delegationListMainData', 'saveExhibitonNumList']),
    queryMainListParams() { // params在请求里面传
      let params = {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize,
        delegationId: this.currentDelegationId
      };
      return params;
    },
    savedExhibitionNum() { // 以前展届
      return this.savedFormData.savedExhibitionNum;
    }
  },
  watch: {
    savedExhibitionNum(val) {
      if (val == null) {
        this.beforeExhibitDisable = false;
      } else {
        this.beforeExhibitDisable = true;
      }
    }
  },
  methods: {
    // 'getDelegationListLeft', 不用 'postDeleteSubGroup', 删除不用 'getSaveResult', 'getExhibitionNumList','getDelegationAreaListSelectLeft',
    // 'postUpdateDelegationArea', 'postAddSubGroup',
    ...mapActions('subEnterpriseManage', ['getDelegationListMain', 'postDelegationMenuListLeft',
      'getSavedExhibitionNumList', 'getSaveExceljyt']),
    handleQueryList() { // 查询main表单
      if (this.savedFormData.savedExhibitionNum) {
        this.queryMainListParams.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getDelegationListMain(this.queryMainListParams).then(() => { // 清空以前展届
        delete this.queryMainListParams.exhibitionNum;
      }).catch(() => {
        delete this.queryMainListParams.exhibitionNum;
      });
    },

    // 左侧table
    handleRowClick(row) { // 点击左侧一行
      this.savedFormData.savedExhibitionNum = null;
      // this.queryMainListParams.delegationId = row.delegationId; // 唯一id
      this.currentDelegationId = row.delegationId;
      this.getSavedExhibitionNumList(row.delegationId); // 拿到历史记录列表
      this.delegationLabel = row.delegationName + '(交易团)';
      // this.addParams.delegationId = row.delegationId; // 交易团id(新增)
      // this.addParams.delegationName = row.delegationName; // 交易团name
      this.getDelegationListMain(this.queryMainListParams);
    },
    tableRowStyle({ row, rowIndex }) {
      return 'cursor: pointer';
    },
    tableCellStyle({ row, rowIndex }) {
      return 'line-height: 16px;padding: 5px 0';
    },
    // 右侧table
    handleLeftSizeChange(val) {
      this.pageInfoLeft.size = val;
      this.postDelegationMenuListLeft(this.pageInfoLeft);// 刷新左侧列表
    },
    handleLeftCurrentChange(val) {
      this.pageInfoLeft.current = val;
      this.postDelegationMenuListLeft(this.pageInfoLeft);// 刷新左侧列表
    },

    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getDelegationListMain(this.queryMainListParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getDelegationListMain(this.queryMainListParams);
    },
    downloadMainTableList() { // 下载
      let params = {
        delegationId: this.queryMainListParams.delegationId
      };
      if (this.savedFormData.savedExhibitionNum) {
        params.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getSaveExceljyt(params); // 下载
    }
  },
  created() {
    this.postDelegationMenuListLeft(this.pageInfoLeft).then(res => { // 刷新左侧列表 用第一个id赋值去查
      if (this.delegationMenuListLeftData.records && this.delegationMenuListLeftData.records.length > 0) {
        let firstMainDataRow = this.delegationMenuListLeftData.records[0];
        // this.queryMainListParams.delegationId = firstMainDataRow.delegationId;
        this.currentDelegationId = firstMainDataRow.delegationId;
        this.delegationLabel = firstMainDataRow.delegationName + '管理';
        this.getDelegationListMain(this.queryMainListParams);
        this.$refs.delegationMenuListLeft.setCurrentRow(this.delegationMenuListLeftData.records[0]); // 默认选中
        this.getSavedExhibitionNumList(firstMainDataRow.delegationId); // 获取展届
      }
    });
  }
};
</script>
<style lang='less' scoped>
.el-header {
  border-bottom: 1px solid #ddd;
  span {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    height: 58px;
    line-height: 58px;
    display: block;
    float: left;
    border-bottom: 2px solid #2b579a;
  }
}
.el-main {
  .el-col {
    /deep/ .el-tabs__content {
      padding: 0 10px;
    }
  }
}
</style>
