<template class="table-style">
  <el-main>
    <p class="label-style">{{languageSource.AdjustmentApply.businessSelect}}</p>
      <el-table :data="tableData">
        <el-table-column
          :label="languageSource.AdjustmentApply.index"
          type="index"
          header-align="center"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.expcode" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cantonCode" :label="languageSource.LocationLang.programCode" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="chamberOfCommerce" :label="languageSource.AdjustmentApply.association" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="boothCode" :label="languageSource.AdjustmentApply.beforeBoothCode" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="adjustmentReason" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="160" header-align="center" align="center">
          <template slot-scope="scope" >
            <el-popover
            placement="right"
            trigger="hover"
            width="220"
            @hide='clearFileName'>
            <div class="filename-loading" v-if="fileNames.length <= 0">
              <i class="el-icon-loading" ></i>
            </div>
            <div v-for="(item, index) in fileNames" :key="index" v-else>
              <div class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</div>
            </div>
            <label
              slot="reference"
              @click="downloadFunc(scope.row.fileId)"
              @mouseenter="setPageItem(scope.row.fileId)"
              class="download-style">
              {{languageSource.AdjustmentApply.download}}
            </label>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtypeTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="160">
          <template slot-scope="scope" >
            <el-button type="text" @click="checkFunc(scope.row)" size="mini">{{languageSource.CommonLang.view}}</el-button>
          </template>
        </el-table-column>
      </el-table>

    <!-- <el-table :data="tableData">
      <el-table-column
        :label="languageSource.AdjustmentApply.index"
        type="index"
        header-align="center"
        align="center"
        width="60"></el-table-column>
      <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumberTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentReason" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="97" header-align="center" align="center">
        <template slot-scope="scope" >
          <el-popover
            placement="right"
            trigger="hover"
            width="220"
            @hide='clearFileName'>
            <div class="filename-loading" v-if="fileNames.length <= 0">
              <i class="el-icon-loading" ></i>
            </div>
            <div v-for="(item, index) in fileNames" :key="index" v-else>
              <div class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</div>
            </div>
            <label
              slot="reference"
              @click="downloadFunc(scope.row.fileId)"
              @mouseenter="setPageItem(scope.row.fileId)"
              class="download-style">
              {{languageSource.AdjustmentApply.download}}
            </label>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtypeTable" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column fixed="right" :label="languageSource.CommonLang.operation" min-width="97" header-align="center" align="center">
        <template slot-scope="scope" >
          <el-button type="text" @click="checkFunc(scope.row)" size="mini">{{languageSource.CommonLang.view}}</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </el-main>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'businessSelectTable',
  mixins: [listPageBase],
  props: ["tableData", 'languageSource'],
  data () {
    return {
      config,
      //文件名数据
      fileNames: []
    };
  },
  methods: {
    checkFunc (row) {
      let tag = this.$route.query.tag;
      let scopeRow = this.$route.query.scopeRow;
      let languageSource = this.languageSource;
      if (tag === "businessArrange" || (scopeRow.status === 4 && tag === "patchSchemeAdd")) {
        kindo.util.confirm(languageSource.AdjustmentApply.gotoDetailInfo, languageSource.CommonLang.tips, "warning", async () => {
          this.$router.push({ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: row, tag: 'patchSchemeArea', paramRow: scopeRow, paramTag: tag, right: 'review', pluginBtnState: true, addState: true, notValidateArray: ['checkProgressRule', 'isRepeatArranged'] }});
        });
      } else {
        this.$router.push({ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: row, tag: 'patchSchemeArea', paramRow: scopeRow, paramTag: tag, right: 'review', pluginBtnState: false, addState: false, notValidateArray: ['checkProgressRule', 'isRepeatArranged'] }});
      }
    },
    downloadFunc (id) {
      window.location.href = this.config.api.dowloadURL + '?fileIds=' + id;
    },
    //控制下载提示文件显示内容
    setPageItem (ids) {
      let param = { fileIds: ids };
      this.$http.get(this.config.api.getFileNameByIds, param)
        .then(res => {
          this.fileNames = res;
        });
    },
    //鼠标移出清除文件名数据
    clearFileName () {
      this.fileNames = [];
    }
  }
};
</script>

<style scoped>
.table-style {
  padding: 10px 0;
}
.label-style {
  color: #606266;
  margin-bottom: 10px;
}
.download-style {
  color: #2c579b;
  text-decoration: underline;
  cursor: pointer;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.filename-loading {
  text-align: center;
}
</style>
