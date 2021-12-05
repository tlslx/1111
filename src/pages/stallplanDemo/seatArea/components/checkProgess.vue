<template>
  <el-dialog
    :title="languageSource.CheckProgress.view"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-box>
      <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" label-position="left" label-width="106px"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item :label="languageSource.LocationLang.exhibitionNumberTable" >
          <el-input v-model="searchForm.sessionNumber" class="common-style" readonly ></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.exhibitionAreaTable" prop="exhibitionAreaName" >
          <el-select v-model="searchForm.exhibitionAreaName" clearable class="common-style"
            placeholder=""
            @change="getSpecialArea">
            <el-option
              v-for="area in exhibitionAreaRow"
              :key="area.value"
              :label="area.label"
              :value="area.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.exhibitionPeriodTable" prop="exhibitionPeriod">
          <el-select v-model="searchForm.exhibitionPeriod"
            clearable
            class="common-style"
            placeholder=""
            @change="getExhibitionArea"
          >
            <el-option
              v-for="area in exhibitionPeriodRow"
              :key="area.value"
              :label="area.label"
              :value="area.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.centralChannelTable" prop="isCentralPassage">
          <el-select v-model="searchForm.isCentralPassage" clearable class="common-style" placeholder="" >
            <el-option
              v-for="area in radioArray"
              :key="area.value"
              :label="area.label"
              :value="area.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.exhibitionPropertyTable" prop="boothKind">
          <el-select v-model="searchForm.boothKind" clearable class="common-style"
            placeholder="" @change="exhibitionChange">
            <el-option
              v-for="area in exhibitionRow"
              :key="area.value"
              :label="area.label"
              :value="area.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.AdjustmentApply.exhibitionTypeTable" prop="exhibitionKind" >
          <el-select v-model="searchForm.exhibitionKind" clearable class="common-style"
            placeholder="" >
            <el-option
              v-for="session in exhibitionTypeRow"
              :key="session.value"
              :label="session.label"
              :value="session.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.RuleSettingLang.enterpriseNameTable" prop="companyNameCh">
          <el-input v-model="searchForm.companyNameCh" clearable :maxlength="255" class="common-style"></el-input>
        </el-form-item>
        <el-form-item prop="schedule" :label="languageSource.LocationLang.isEnd">
          <el-select v-model="searchForm.schedule" clearable class="common-style" placeholder="" >
            <el-option
              v-for="area in isEndOption"
              :key="area.value"
              :label="area.label"
              :value="area.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button type="info" @click="clearForm">{{languageSource.CommonLang.reset}}</el-button>
          <el-button type="primary" @click="downLoadExcel">{{languageSource.CommonLang.export}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table
        ref="checkProgessTable"
        :url="config.api.getArrangeSchedulePage"
        :queryParam="form"
      >
        <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" header-align="center" align="center" min-width="80px"></el-table-column>
        <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable" header-align="center" align="center" min-width="80px"></el-table-column>
        <el-table-column prop="exhibitionKind" :label="languageSource.AdjustmentApply.exhibitionTypeTable" header-align="center" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="boothKind" :label="languageSource.LocationLang.exhibitionPropertyTable" header-align="center" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="isCentralPassage" :label="languageSource.LocationLang.centralChannelTable" header-align="center" align="center" min-width="130px">
          <template slot-scope="scope">
            {{ scope.row.isCentralPassage === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" header-align="center" align="center" min-width="90px"></el-table-column>
        <el-table-column prop="companyNameCh" :label="languageSource.RuleSettingLang.enterpriseNameTable"  header-align="center" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="chamberOfCommerce" :label="languageSource.CheckProgress.relevantCommerceChamber"  header-align="center" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="recommendedQuantity" :label="languageSource.CheckProgress.recommendTotal"  header-align="center" align="center" min-width="100px"></el-table-column>
        <el-table-column prop="arrangedBooth" :label="languageSource.CheckProgress.arrangeNumber"  header-align="center" align="center" min-width="100px">
        </el-table-column>
        <el-table-column prop="progress" :label="languageSource.CheckProgress.progress"  header-align="center" align="center" min-width="90px">
          <template slot-scope="scope">
            {{ getPlanedPercent(scope.row) }}
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{languageSource.AdjustmentApply.backBtn}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from 'xlsx';
export default {
  name: 'checkProgess',
  mixins: [listPageBase],
  props: ['languageSource', 'exhibitionPeriodNum', 'planedData', 'type', 'natures', 'regionOfExhibition', 'exhibitionTypeOption'],
  data () {
    return {
      config,
      'dialogVisible': false,
      'searchForm': {
        exhibitionAreaName: '',
        exhibitionAreaCode: '',
        schedule: '3',
        exhibitionKind: '',
        boothKind: '',
        isCentralPassage: '',
        companyNameCh: '',
        exhibitionPeriod: ''
      },
      '_forms': {},
      'schemeEnterpriseList': [],
      'isEndOption': [
        {
          label: '是',
          value: '2'
        }, {
          label: '否',
          value: '1'
        }, {
          label: '全部',
          value: '3'
        }
      ],
      'exhibitionAreaRow': [],
      'exhibitionPeriodRow': [], //接口查询的展期数据
      'exhibitionTypeRow': [], //布展类型选项数据
      'exhibitionRow': [], //展位性质数据
      'rules': {},
      'radioArray': [],
      'selectExhibitionRows': [], //接口查到的展区对应的布展类型数据
      'currentSession': '' //当前展届
    };
  },
  computed: {
    form: function () {
      let areaName = this.searchForm.exhibitionAreaName;
      if (!areaName || areaName === '') {
        return {
          queryParams: this.searchForm
        };
      }
      let formItem = areaName.split(',');
      let exhibitionAreaItem = {
        "exhibitionAreaName": formItem[0],
        "exhibitionAreaCode": formItem[1]
      };
      return {
        queryParams: { ...this.searchForm, ...exhibitionAreaItem }
      };
    }
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    let languageSource = this.languageSource;
    this.rules = {
      exhibitionAreaName: [
        { required: true, message: languageSource.LocationLang.exhibitionAreaTip, trigger: 'change' }
      ]
    };
  },
  methods: {
    //查询方法
    onQuery () {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.$refs.checkProgessTable.reloadData();
        }
      });
    },
    //计算检查安排进度百分百
    getPlanedPercent (row) {
      return `${(row.arrangedBooth * 100 / row.recommendedQuantity).toFixed(2)}%`;
    },
    //下载Excel
    downLoadExcel () {
      let pageData = $(".kindo-table");
      /* 从表格生成工作簿对象 */
      let tmp = pageData.find(".el-table__fixed")[1];
      let wb = XLSX.utils.table_to_book(tmp);
      // const percentStyle = {
      //   numFmt: "0.00%;\\(0.00%\\);\\-;@"
      // };
      // const sheet = wb.Sheets[wb.SheetNames[0]];
      // sheet['H2'].s = percentStyle;
      // sheet['H3'].s = percentStyle;
      // sheet['H4'].s = percentStyle;
      // sheet['H5'].s = percentStyle;
      // sheet['H6'].s = percentStyle;
      // sheet['H7'].s = percentStyle;
      // sheet['H8'].s = percentStyle;
      // sheet['H9'].s = percentStyle;
      // sheet['H10'].s = percentStyle;
      // sheet["L2"].v = percentStyle;
      // sheet['!cols'] = [{
      //   wpx: 70
      // }, {
      //   wpx: 70
      // }, {
      //   wpx: 70
      // }, {
      //   wpx: 180
      // }, {
      //   wpx: 70
      // }, {
      //   wpx: 70
      // }, {
      //   wpx: 70
      // }, {
      //   wpx: 70
      // }];
      /* 获取二进制字符串作为输出 */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "检查安排进度.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      return wbout;
    },
    //关闭弹框时清除方法
    clear () {
      this.$refs.searchForm.resetFields();
      this.exhibitionAreaRow = [];
      this.exhibitionPeriodRow = [];
      this.exhibitionTypeRow = [];
      this.clearForm();
    },
    cancel () {
      this.dialogVisible = false;
    },
    //重置表单查询
    clearForm () {
      this.$refs.searchForm.resetFields();
      this.searchForm = Object.assign({}, this._forms);
      this.searchForm.sessionNumber = this.currentSession;
      this.$nextTick(function() {
        this.$refs.checkProgessTable.reloadData();
      });
    },
    //获取展区对应的展期信息
    getSpecialArea (val) {
      //重新选择时清除数据
      if (this.exhibitionPeriodRow.length > 0) {
        this.searchForm.exhibitionPeriod = '';
        this.searchForm.exhibitionType = '';
        this.searchForm.isCentralPassage = '';
        this.searchForm.exhibitionProperty = '';
        this.searchForm.boothKind = '';
        this.searchForm.exhibitionKind = '';
        this.exhibitionPeriodRow = [];
        this.exhibitionTypeRow = [];
        this.selectExhibitionRows = [];
        this.radioArray = [];
      }
      if (!val || val === '') {
        return false;
      }
      let param = {
        exhibitionNum: this.currentSession, // 展届
        exhibitionAreaCode: val.split(',')[1]//展区编码
      };
      this.$http.get(this.config.api.getAuthPeriods, param)
        .then(res => {
          let exhibitionRow = [];
          res.forEach((item, index) => {
            let obj = {
              label: '第' + item + '期',
              value: item
            };
            exhibitionRow.push(obj);
          });
          this.exhibitionPeriodRow = exhibitionRow;
        });
    },
    //展位性质改变
    exhibitionChange (val) {
      if (!val || val === "") {
        this.exhibitionTypeRow = [];
        return false;
      }
      this.searchForm.exhibitionKind = '';
      if (val.indexOf('品牌') >= 0) {
        this.exhibitionTypeRow = this.selectExhibitionRows.filter(v => v.label.indexOf('特装') >= 0);
      } else if (val.indexOf('一般') >= 0) {
        this.exhibitionTypeRow = this.selectExhibitionRows.filter(v => v.label !== '中央通道');
      }
    },
    //获取展会界数
    getSessionNumber () {
      this.exhibitionRow = this.natures; //布展类型赋值
      this.$http.get(this.config.api.getsessionNumber)
        .then(res => {
          this.currentSession = res.exhibitionNum;
          this.searchForm.sessionNumber = res.exhibitionNum;
          this.getExhibitionAreaRow(res.exhibitionNum);
        });
    },
    //根据当前用户查询展区信息
    getExhibitionAreaRow (currentSession) {
      let param = {
        exhibitionNum: currentSession // 展届
      };
      this.$http.get(this.config.api.getAuthAreas, param)
        .then(res => {
          let areaRow = [];
          res.forEach((item, index) => {
            let itemValue = item.exhibitionAreaName + ',' + item.exhibitionAreaCode;
            let obj = {
              label: item.exhibitionAreaName,
              value: itemValue
            };
            areaRow.push(obj);
          });
          this.exhibitionAreaRow = areaRow;
        });
    },
    //根据展区展期信息查询布展类型信息
    getExhibitionArea (val) {
      //重新选择时清除数据
      if (this.radioArray.length > 0) {
        this.searchForm.isCentralPassage = '';
        this.searchForm.exhibitionProperty = '';
        this.searchForm.boothKind = '';
        this.searchForm.exhibitionKind = '';
        this.radioArray = [];
        this.selectExhibitionRows = [];
        this.exhibitionTypeRow = [];
      }
      //如果布展类型存在就清掉布展类型的数据
      if (this.searchForm.boothKind) {
        this.searchForm.boothKind = '';
      }
      if (!val || val === "") {
        this.radioArray = [];
        return false;
      }
      let param = {
        exhibitionNum: this.currentSession,
        exhibitionAreaCode: this.searchForm.exhibitionAreaName.split(',')[1],
        periodCode: val
      };
      this.$http.get(this.config.api.getHallInfo, param)
        .then(res => {
          let exhibitionTypes = res.exhibitionTypes; //布展类型数据
          let status = res.status; //是否中央通道选择状态 0：全部是非中央通道，1：全部是中央通道，2：两者都有，3：没有发布的图纸展位数据
          let rows = [];
          let radioTempArray = [];
          if (status === '0') {
            radioTempArray = [
              {
                label: '否',
                value: '0'
              }
            ];
          } else if (status === '1') {
            radioTempArray = [
              {
                label: '是',
                value: '1'
              }
            ];
          } else if (status === '2') {
            radioTempArray = [
              {
                label: '否',
                value: '0'
              }, {
                label: '是',
                value: '1'
              }
            ];
          } else if (status === '3') {
            this.radioState = true;
          }
          this.radioArray = radioTempArray;
          exhibitionTypes.forEach((item, index) => {
            let singleItem = this.exhibitionTypeOption.filter(v => v.value === item)[0];
            let obj = {
              label: singleItem.label,
              value: item
            };
            rows.push(obj);
          });
          this.selectExhibitionRows = rows;
        });
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
