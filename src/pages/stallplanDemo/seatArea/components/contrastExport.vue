<template>
  <el-dialog
    :title="languageSource.LocationLang.contrastExport"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-table
      ref="contrastTable"
      :pagination='false'
      :loading="loadingState"
    >
      <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable" min-width="115" header-align="center" align="center" ></el-table-column>
      <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" min-width="108" header-align="center" align="center" ></el-table-column>
      <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="108" header-align="center" align="center" ></el-table-column>
      <el-table-column prop="exhibitionKind" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="108" header-align="center" align="center" ></el-table-column>
      <el-table-column prop="isCentralPassage" :label="languageSource.LocationLang.centralChannelTable" min-width="118" header-align="center" align="center" >
        <template slot-scope="scope">
          {{ scope.row.isCentralPassage === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="currentInfo" :label="currentSchemeName" min-width="108" header-align="center" align="center" >
        <el-table-column prop="currentInfo.sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="currentInfo.companyNameCh" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="currentInfo.association" :label="languageSource.AdjustmentApply.association" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="currentInfo.businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="currentInfo.boothNo" :label="languageSource.AdjustmentApply.boothCodeTable" min-width="108" header-align="center" align="center" ></el-table-column>
      </el-table-column>
      <el-table-column prop="historyInfo" :label="historySchemeName" min-width="108" header-align="center" align="center" >
        <el-table-column prop="historyInfo.sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="historyInfo.companyNameCh" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="historyInfo.association" :label="languageSource.AdjustmentApply.association" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="historyInfo.businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="108" header-align="center" align="center" ></el-table-column>
        <el-table-column prop="historyInfo.boothNo" :label="languageSource.AdjustmentApply.boothCodeTable" min-width="108" header-align="center" align="center" ></el-table-column>
      </el-table-column>
    </kindo-table>

    <!-- <el-tabs v-model="currentActive" type="card" @tab-click="handleClick" v-loading.fullscreen.lock="loadingState">
      <el-tab-pane :label="title1" name="tab1">
        <kindo-table
          ref="firstTable"
          :pagination='false'
        >
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="115" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="companyNameCh" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="boothKind" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="108"  header-align="center" align="center" ></el-table-column>
          <el-table-column prop="boothNo" :label="languageSource.AdjustmentApply.boothCodeTable" min-width="108"  header-align="center" align="center" ></el-table-column>
        </kindo-table>
      </el-tab-pane>
      <el-tab-pane :label="title2" name="tab2" >
        <kindo-table
          ref="secondTable"
          :pagination='false'
        >
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="115" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="companyNameCh" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="108" header-align="center" align="center" ></el-table-column>
          <el-table-column prop="boothKind" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="108"  header-align="center" align="center" ></el-table-column>
          <el-table-column prop="boothNo" :label="languageSource.AdjustmentApply.boothCodeTable" min-width="108"  header-align="center" align="center" ></el-table-column>
        </kindo-table>
      </el-tab-pane>
    </el-tabs> -->

    <div slot="footer" class="dialog-footer" >
      <el-button @click="cancel">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc" :loading="btnLoading" >{{languageSource.CommonLang.confirm}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './index';
import axios from 'axios';
export default {
  name: 'contrastExport',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      'dialogVisible': false,
      'resultData': [],
      'loadingState': false,
      'currentActive': "tab1",
      'title1': '',
      'title2': '',
      'btnLoading': false,
      'contrastParams': {},
      'currentSchemeName': '',
      'historySchemeName': ''
    };
  },
  methods: {
    //查询返回值数据
    query (contrastParams) {
      this.contrastParams = contrastParams;
      this.loadingState = true;
      this.$http.get(this.config.api.getCompareSchemeData, contrastParams)
        .then(res => {
          this.loadingState = false;
          this.resultData = res;
          let params = contrastParams.schemeIds.split(',');
          let currentRow = res.filter(v => v.schemeId === params[0])[0];
          let historyRow = res.filter(v => v.schemeId === params[1])[0];
          let currentData = currentRow.paSchemeEnterpriseList;
          let historyData = historyRow.paSchemeEnterpriseList;
          let tableData = [];
          this.currentSchemeName = currentRow.schemeName;
          this.historySchemeName = historyRow.schemeName;
          if (currentData.length > historyData.length) {
            currentData.forEach((item, index) => {
              let itemObj = {
                exhibitionPeriod: currentRow.exhibitionPeriod,
                exhibitionAreaName: currentRow.exhibitionAreaName,
                exhibitionProperty: currentRow.exhibitionProperty,
                boothKind: currentRow.boothKind,
                isCentralPassage: currentRow.isCentralPassage,
                exhibitionKind: item.exhibitionKind,
                currentInfo: {
                  sessionNumber: item.sessionNumber,
                  companyNameCh: item.companyNameCh,
                  association: item.association,
                  businessDelegation: item.businessDelegation,
                  boothNo: item.boothNo
                },
                historyInfo: {
                  sessionNumber: historyData[index] ? historyData[index].sessionNumber : "",
                  companyNameCh: historyData[index] ? historyData[index].companyNameCh : "",
                  association: historyData[index] ? historyData[index].association : "",
                  businessDelegation: historyData[index] ? historyData[index].businessDelegation : "",
                  boothNo: historyData[index] ? historyData[index].boothNo : ""
                }
              };
              tableData.push(itemObj);
            });
          } else {
            historyData.forEach((item, index) => {
              let itemObj = {
                exhibitionPeriod: historyRow.exhibitionPeriod,
                exhibitionAreaName: historyRow.exhibitionAreaName,
                exhibitionProperty: historyRow.exhibitionProperty,
                boothKind: historyRow.boothKind,
                isCentralPassage: historyRow.isCentralPassage,
                exhibitionKind: item.exhibitionKind,
                currentInfo: {
                  sessionNumber: currentData[index] ? currentData[index].sessionNumber : "",
                  companyNameCh: currentData[index] ? currentData[index].companyNameCh : "",
                  association: currentData[index] ? currentData[index].association : "",
                  businessDelegation: currentData[index] ? currentData[index].businessDelegation : "",
                  boothNo: currentData[index] ? currentData[index].boothNo : ""
                },
                historyInfo: {
                  sessionNumber: item.sessionNumber,
                  companyNameCh: item.companyNameCh,
                  association: item.association,
                  businessDelegation: item.businessDelegation,
                  boothNo: item.boothNo
                }
              };
              tableData.push(itemObj);
            });
          }
          this.$refs.contrastTable.internalData = tableData;
          // this.title1 = res[0].schemeName;
          // this.title2 = res[1].schemeName;
          // let tempArr = res[0].paSchemeEnterpriseList;
          // let paSchemeEnterpriseList = [];
          // tempArr.forEach(item => {
          //   item.sessionNumber = res[0].sessionNumber;
          //   item.exhibitionPeriod = res[0].exhibitionPeriod;
          //   item.exhibitionAreaName = res[0].exhibitionAreaName;
          //   item.exhibitionProperty = res[0].exhibitionProperty;
          //   paSchemeEnterpriseList.push(item);
          // });
          // this.$refs.firstTable.internalData = paSchemeEnterpriseList;
        });
    },
    //确定
    submitFunc () {
      const http = axios.create({
        headers: { Token: localStorage.getItem('USER_TOKEN') },
        responseType: 'blob',
        timeout: 60000
      });
      this.btnLoading = true;
      http.get(this.config.api.exportCompareScheme, { params: this.contrastParams })
        .then(res => {
          this.dialogVisible = false;
          this.btnLoading = false;
          let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          if (window.navigator.msSaveOrOpenBlob) {
            //如果是ie浏览器
            navigator.msSaveBlob(blob, '方案对比表.xls'); //下载路径为默认路径
          } else {
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = '方案对比表.xls'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          }
        });
    },
    clear () {
      this.resultData = [];
      this.loadingState = false;
      this.currentActive = "tab1";
      this.title1 = '';
      this.title2 = '';
      this.contrastParams = {};
    },
    cancel () {
      this.dialogVisible = false;
    },
    //tab切换点击
    handleClick (val) {
      this.currentActive = val.name;
      let currentObj = this.resultData[1];
      let tempArr = currentObj.paSchemeEnterpriseList;
      let paSchemeEnterpriseList = [];
      tempArr.forEach(item => {
        item.sessionNumber = currentObj.sessionNumber;
        item.exhibitionPeriod = currentObj.exhibitionPeriod;
        item.exhibitionAreaName = currentObj.exhibitionAreaName;
        item.exhibitionProperty = currentObj.exhibitionProperty;
        paSchemeEnterpriseList.push(item);
      });
      this.$refs.secondTable.internalData = paSchemeEnterpriseList;
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
.filename-loading {
  text-align: center;
}
</style>
