<template>
  <el-dialog
    :title="languageSource.AdjustmentApply.seatAdjust"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-box>
      <el-form :inline="true"  label-position="left" label-width="55px" >
        <el-row>
          <el-form-item :label="languageSource.AdjustmentApply.boothCodeTable">
            <el-input v-model="selectedCodes" readonly class="common-style"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </kindo-box>

    <kindo-box>
      <el-table
        :data="tableData"
        v-loading="loadingState"
        highlight-current-row
        @row-click="handleCurrentChange">
        <el-table-column
          :label="languageSource.AdjustmentApply.index"
          type="index"
          header-align="center"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="companyNameCh" align="center"
          :label="languageSource.RuleSettingLang.enterpriseNameTable">
        </el-table-column>
        <el-table-column
          prop="businessDelegation" align="center"
          :label="languageSource.AdjustmentApply.businessDelegationTable">
        </el-table-column>
        <el-table-column
          prop="boothNo" align="center"
          :label="languageSource.AdjustmentApply.beforeBoothCode">
        </el-table-column>
        <el-table-column
          prop="exhibitionAreaName" align="center"
          :label="languageSource.LocationLang.exhibitionAreaNameTable">
        </el-table-column>
        <el-table-column
          prop="adjustmentNumber" align="center"
          :label="languageSource.AdjustmentApply.boothNumTable">
        </el-table-column>
        <el-table-column
          prop="adjustmentNumber" align="center"
          :label="languageSource.AdjustmentApply.adjustmentNumberTable">
        </el-table-column>
        <el-table-column
          prop="adjustedBoothNo" align="center"
          :label="languageSource.LocationLang.afterBoothCode">
        </el-table-column>
      </el-table>
    </kindo-box>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc">{{languageSource.AdjustmentApply.adjust}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'seatAdjustment',
  mixins: [listPageBase],
  props: ['languageSource', 'selectedCodes'],
  data () {
    return {
      config,
      'dialogVisible': false,
      'currentRow': {},
      'tableData': [],
      'loadingState': false
    };
  },
  methods: {
    setTableData (data, tag, adjustedRows) {
      this.loadingState = true;
      this.$http.postJson(config.api.getAdjustEnterpriseList, JSON.stringify(data))
        .then(res => {
          this.loadingState = false;
          res.forEach(item => {
            let adjustRow = adjustedRows[item.companyId + item.boothNo];
            if (adjustRow && adjustRow.adjustedBoothNo && adjustRow.boothNo === item.boothNo) {
              item.adjustedBoothNo = adjustRow.adjustedBoothNo;
            }
          });
          this.tableData = res;
        });
    },
    //确定
    submitFunc () {
      let languageSource = this.languageSource;
      let currentRow = Object.assign({}, this.currentRow);
      let selectItem = this.selectedCodes.split(',');
      if (!currentRow || !Object.keys(currentRow).length) {
        this.$message.error(languageSource.RuleSettingLang.selectOneMsg);
        return false;
      }
      if (selectItem.length !== currentRow.adjustmentNumber) {
        this.$message.error(languageSource.AdjustmentApply.adjustMentTips);
        return false;
      }
      this.dialogVisible = false;
      currentRow.boothCode = currentRow.adjustedBoothNo ? currentRow.adjustedBoothNo : currentRow.boothNo;
      currentRow.adjustedBoothNo = this.selectedCodes;
      this.$emit('seatAdjustment', currentRow);
    },
    clear () {
      this.currentRow = {};
    },
    cancel () {
      this.currentRow = {};
      this.dialogVisible = false;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>

<style scoped>
.tip-text {
  color: #F56C6C
}
.tip-align {
  text-align: center;
}
.common-style {
  width: 180px;
}
</style>
