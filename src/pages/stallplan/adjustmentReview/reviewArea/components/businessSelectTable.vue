<template class="table-style">
  <el-main>
    <p class="label-style">{{languageSource.AdjustmentApply.businessSelect}}</p>
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" header-align="center" align="center" width="60"></el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionArea" label="展区名称" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="positionNature" label="展位性质" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionType" label="布展类型" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentNumber" label="调整数量" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentContent" label="调整内容" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentReason" label="调整原因" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="fileId" label="附件" min-width="97" header-align="center" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover" width="220" @hide='clearFileName'>
            <div class="filename-loading" v-if="fileNames.length <= 0">
              <i class="el-icon-loading"></i>
            </div>
            <div v-for="(item, index) in fileNames" :key="index" v-else>
              <label class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</label>
            </div>
            <label slot="reference" @click="downloadFunc(scope.row.fileId)" @mouseenter="setPageItem(scope.row.fileId)" class="download-style">
              {{languageSource.AdjustmentApply.download}}
            </label>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="申请时间" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="description" label="审核状态" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="97" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="checkFunc(scope.row)">{{languageSource.CommonLang.view}}</el-button>
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
      <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaName" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionProperty" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionType" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumber" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContent" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="adjustmentReason" :label="languageSource.AdjustmentApply.adjuestReson" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annex" min-width="97" header-align="center" align="center">
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
              <label class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</label>
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
      <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtype" min-width="97" header-align="center" align="center"></el-table-column>
      <el-table-column fixed="right" :label="languageSource.CommonLang.operation" min-width="97" header-align="center" align="center">
        <template slot-scope="scope" >
          <el-button type="text" size="mini" @click="checkFunc(scope.row)">{{languageSource.CommonLang.view}}</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </el-main>
</template>

<script>
import config from '../../components';
export default {
  name: 'businessSelectTable',
  props: ["tableData", 'languageSource'],
  data() {
    return {
      config,
      //文件名数据
      fileNames: []
    };
  },
  created() {
    // this.source.quarter = await kindo.dictionary.get('languageType');
  },
  methods: {
    checkFunc(row) {
      this.$router.push({ path: '/stallplan/businessCheck?primarycolor=2b579a', query: { scopeRow: row, tag: 'reviewArea', paramRow: this.$route.query.scopeRow }});
    },
    downloadFunc(id) {
      window.open(this.config.api.dowloadURL + '?fileIds=' + id);
    },
    //控制下载提示文件显示内容
    setPageItem(ids) {
      let param = { fileIds: ids };
      this.$http.get(this.config.api.getFileNameByIds, param)
        .then(res => {
          this.fileNames = res;
        });
    },
    //鼠标移出清除文件名数据
    clearFileName() {
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
}
.filename-loading {
  text-align: center;
}
</style>
