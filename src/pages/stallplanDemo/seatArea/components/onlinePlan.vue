<template>
  <el-dialog
    :title="languageSource.LocationLang.onlineLabel"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">

    <kindo-box>
      <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="72px"
        @submit.native.prevent @keyup.enter.native="onQuery" >
        <el-row>
          <el-form-item :label="languageSource.AdjustmentApply.boothCodeTable">
            <el-input v-model="selectedCodes" readonly class="common-style"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item :label="languageSource.RuleSettingLang.enterpriseNameTable">
          <el-input v-model="searchForm.companyNameCh" class="common-style"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.exhibitsArea">
          <el-input v-model="searchForm.boothSpecialArea" class="common-style"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.reviewScore">
          <el-input v-model="searchForm.reviewScore" class="common-style"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.AdjustmentApply.businessDelegationTable">
          <el-input v-model="searchForm.businessDelegation" class="common-style"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.boothArea">
          <el-input v-model="searchForm.boothArea" class="common-style"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.mainCampProduct">
          <el-input v-model="searchForm.mainProductKeywordCh" class="common-style"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button type="info" @click="clearForm">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <!-- <div class="kindo-table">
        <el-table
          ref="onlineTable"
          v-loading="loading"
          :data="internalData"
          :height="672"
          element-loading-background="rgba(255, 255, 255, 0.5)"
          :row-style="tableRowClassName"
          @current-change="handleCurrentChange"
          :border="false"
          :highlight-current-row="false"
          :stripe="false"
          @selection-change="handleCurrentChange">
          <el-table-column
            type="index"
            align="center"
            width="60px"
            :fixed="true"
            :label="code"
            class-name="rowNumber"
          >
            <template slot-scope="scope">
              <span v-text="(currentPage - 1) * pageSize + scope.$index + 1"></span>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            v-if="showCheckbox"
            :label="languageSource.RuleSettingLang.enterpriseNameTable">
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
            prop="boothSpecialArea" align="center"
            :label="languageSource.LocationLang.exhibitsArea">
          </el-table-column>
          <el-table-column
            prop="score" align="center"
            :label="languageSource.LocationLang.reviewScore">
          </el-table-column>
          <el-table-column
            prop="boothArea" align="center"
            :label="languageSource.LocationLang.boothArea">
          </el-table-column>
          <el-table-column
            prop="boothNum" align="center"
            :label="languageSource.AdjustmentApply.boothNumTable">
          </el-table-column>
          <el-table-column
            prop="boothNo" align="center"
            :label="languageSource.LocationLang.arrangeNum">
            <template slot-scope="scope">
              {{ getPlanedNum(scope.row) }}
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-block">
          <span class="pages">{{alltotal}} {{totalPage}} </span>
          <el-pagination
            :total="total"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            @size-change="_internalSizeChange"
            @current-change="_internalCurrentChange"
            layout="total, sizes, prev, pager, next, jumper, ->, slot"
          ></el-pagination>
        </div>
      </div> -->
      <kindo-table
        ref="onlineTable"
        :url="config.api.getOnlinePlanTable"
        :queryParam="form"
        :row-style="tableRowClassName"
        @current-change="handleCurrentChange"
        :border="false"
        :highlight-current-row="false"
        :stripe="false"
        @selection-change="handleCurrentChange">
        <el-table-column
          type="selection"
          v-if="showCheckbox"
          :label="languageSource.RuleSettingLang.enterpriseNameTable">
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
          prop="boothSpecialArea" align="center"
          :label="languageSource.LocationLang.exhibitsArea">
        </el-table-column>
        <el-table-column
          prop="score" align="center"
          :label="languageSource.LocationLang.reviewScore">
        </el-table-column>
        <el-table-column
          prop="boothArea" align="center"
          :label="languageSource.LocationLang.boothArea">
        </el-table-column>
        <el-table-column
          prop="boothNum" align="center"
          :label="languageSource.AdjustmentApply.boothNumTable">
        </el-table-column>
        <el-table-column
          prop="boothNo" align="center"
          :label="languageSource.LocationLang.arrangeNum">
          <template slot-scope="scope">
            {{ getPlanedNum(scope.row) }}
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc" :disabled="submitBtnState">{{languageSource.LocationLang.distribution}}</el-button>
    </div>

    <el-dialog
      width="30%"
      :title="languageSource.AdjustmentApply.specialTitle"
      @close="clearSpecialForm"
      :visible.sync="specialAreaState"
      append-to-body>
        <el-form :model="gear" ref="gear" label-position="left" label-width="92px" :rules="rules" class="special-item">
          <el-form-item :label="languageSource.LocationLang.specialArea" prop="zhuanqu" >
            <el-select v-model="gear.zhuanqu" clearable  :placeholder="languageSource.LocationLang.specialAreaTips">
              <el-option
                v-for="session in specialAreaRow"
                :key="session.value"
                :label="session.label"
                :value="session.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer">
          <el-button @click="specialAreaState = false">{{languageSource.CommonLang.cancel}}</el-button>
          <el-button type="primary" @click="specialAreaSubmit" >{{languageSource.CommonLang.confirm}}</el-button>
        </span>
      </el-dialog>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'onlinePlan',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object,
      'default': {}
    },
    'selectedCodes': {
      'type': String,
      'default': ''
    },
    'showCheckbox': {
      'type': Boolean,
      'default': false
    },
    'exhibitionNum': 0,
    planedData: {
      'languageSource': {
        'type': Object,
        'default': {}
      }
    }
  },
  data () {
    return {
      config,
      'dialogVisible': false,
      specialAreaLegend: {},
      'searchForm': {
        companyNameCh: '',
        boothSpecialArea: '',
        reviewScore: '',
        businessDelegation: '',
        boothArea: '',
        mainProductKeywordCh: ''
      },
      'currentRow': {},
      '_forms': {},
      'specialAreaState': false,
      'gear': {
        zhuanqu: ''
      },
      'specialAreaRow': [],
      //校验规则
      'rules': {
        zhuanqu: []
      },
      specialAreaColors: {},
      submitBtnState: false,
      'internalData': [],
      loading: false,
      alltotal: '总页数',
      code: '序号',
      totalPage: 0,
      total: 0,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20, 30, 50, 100],
      pageSize: 10
    };
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    this.rules = {
      zhuanqu: [
        { required: true, message: this.languageSource.LocationLang.specialAreaTips, trigger: 'change' }
      ]
    };
    this.onQuery();
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  // mounted() {
    // this.$nextTick(function () {
    //   this.onResetQuery();
    // });
  // },
  updated () {
    if (this.$refs.onlineTable) {
      this.$refs.onlineTable.internalBorder = false;
      this.$refs.onlineTable.internalStripe = false;
    }
  },
  methods: {
    //查询方法
    onQuery () {
      if (this.$refs.onlineTable) {
        this.$refs.onlineTable.reloadData();
      }
      // let param = {
      //   ...this.searchForm,
      //   current: this.currentPage,
      //   size: this.pageSize
      // };
      // this.loading = true;
      // this.$http.get(this.config.api.getOnlinePlanTable, param)
      //   .then(res => {
      //     this.loading = false;
      //     this.internalData = res.records;
      //     this.total = res.total;
      //     this.currentPage = res.current;
      //     // this.pageSize = res.size;
      //     this.totalPage = Math.ceil(res.total / res.size);
      //   });
    },
    // 重置条件为空查询
    onResetQuery () {
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.onlineTable.reloadData();
      });
    },
    //确定
    submitFunc () {
      let currentRow = Object.assign(this.showCheckbox ? [] : {}, this.currentRow);
      if (this.showCheckbox ? !currentRow.length : !Object.keys(currentRow).length) {
        this.$message.error(this.languageSource.RuleSettingLang.selectOneMsg);
        return false;
      }
      // 选中企业已安排展位数之和与推荐展位数之和
      let [hasArrangeNum, recommendNum] = [0, 0];
      if (this.showCheckbox) {
        currentRow.forEach(item => {
          hasArrangeNum += this.getPlanedNum(item);
          recommendNum += item.boothNum;
        });
        if ((this.exhibitionNum + hasArrangeNum) !== recommendNum) {
          this.$message.error(this.languageSource.AdjustmentApply.landInfo);
          return false;
        }
      } else {
        hasArrangeNum = this.getPlanedNum(currentRow);
        recommendNum = currentRow.boothNum;
        if ((this.exhibitionNum + hasArrangeNum) > recommendNum) {
          this.$message.error(this.languageSource.LocationLang.onlineArrangeTips);
          return false;
        }
      }
      //如果存在专区记录则需要选择
      if (this.specialAreaRow.length > 0) {
        this.specialAreaState = true;
        return false;
      }

      this.dialogVisible = false;
      this.$emit('onlinePlan', currentRow);
    },
    clear () {
      this.$refs.searchForm.resetFields();
      this.searchForm = {};
    },
    cancel () {
      this.currentRow = {};
      this.dialogVisible = false;
    },
    //当前行点击
    handleCurrentChange(val) {
      if (!val) {
        return;
      }
      let arrangeNum = this.getPlanedNum(val);
      this.currentRow = val || [];
      this.submitBtnState = val.boothNum === arrangeNum;
    },
    //重置表单查询
    clearForm () {
      this.$refs.searchForm.resetFields();
      this.onResetQuery();
    },
    //获取已安排数量
    getPlanedNum (row) {
      const enterprise = row && this.planedData && this.planedData[row.companyId];
      if (!enterprise) {
        return 0;
      } else {
        const boothNo = enterprise.boothNo ? enterprise.boothNo.split(',') : [];
        const addBoothNo = enterprise.addBoothNo ? enterprise.addBoothNo.split(',') : [];
        const deleteBoothNo = enterprise.deleteBoothNo ? enterprise.deleteBoothNo.split(',') : [];
        return boothNo.length + addBoothNo.length - deleteBoothNo.length;
      }
    },
    // 根据不同的状态显示不同的颜色条
    tableRowClassName({ row, rowIndex }) {
      let arrangeNum = this.getPlanedNum(row);
      let colorValue = row.boothNum === arrangeNum ? '#cccccc' : (row.boothNum < arrangeNum ? '#f56c6c' : '#e6a23c');
      return { background: `${colorValue} !important` };
    },
    //根据展区获取专区信息
    getSpecialAreaFunc () {
      let scopeRow = this.$route.query.scopeRow;
      let param = {
        exhibitionNum: scopeRow.sessionNumber, // 展届
        exhibitionAreaCode: scopeRow.exhibitionAreaCode //展区编码
      };
      this.$http.get(this.config.api.getSpecialArea, param)
        .then(res => {
          let array = [];
          res.forEach(item => {
            let obj = {
              label: item.cname,
              value: item.specialAreaCode,
              color: item.specialAreaColor
            };
            array.push(obj);
          });
          this.specialAreaRow = array;
        });
    },
    //随机生成16进制的颜色
    randomColor() {
      const arrNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
      let [random, str] = [0, '#'];
      for (let i = 0; i < 6; i++) {
        random = Math.floor(Math.random() * 16);
        str += arrNum[random];
      }
      return str;
    },
    addSpecialInfo (enterprise, specicalArea) {
      let color = specicalArea.color;
      if (specicalArea.color.toLowerCase() === '#ffffff') {
        if (this.specialAreaColors[specicalArea.value]) {
          color = this.specialAreaColors[specicalArea.value];
        } else {
          color = this.randomColor();
          this.specialAreaColors[specicalArea.value] = color;
        }
      }
      if (this.specialAreaLegend[specicalArea.value] && this.specialAreaLegend[specicalArea.value].color) {
        color = this.specialAreaLegend[specicalArea.value].color;
      }
      enterprise.exhibitsSpecialArea = specicalArea.label;
      enterprise.exhibitsSpecialAreaCode = specicalArea.value;
      enterprise.exhibitsSpecialAreaColor = color;
    },
    //专区确定方法
    specialAreaSubmit () {
      this.$refs.gear.validate(valid => {
        if (valid) {
          const specicalArea = this.specialAreaRow.filter(item => item.label === this.gear.zhuanqu)[0];
          let currentRow = this.currentRow;
          if (this.showCheckbox) {
            currentRow.forEach(item => {
              this.addSpecialInfo(item, specicalArea);
            });
          } else {
            this.addSpecialInfo(currentRow, specicalArea);
          }


          this.specialAreaState = false;
          this.dialogVisible = false;
          this.$emit('onlinePlan', currentRow);
        }
      });
    },
    clearSpecialForm () {
      this.gear = {
        zhuanqu: ''
      };
      this.$refs.gear.resetFields();
    },
    _internalSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.onQuery();
    },
    _internalCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.onQuery();
    }
  }
};
</script>

<style scoped lang="scss">
.tip-text {
  color: #F56C6C
}
.tip-align {
  text-align: center;
}
.common-style {
  width: 180px;
}
.el-table__row .less-row {
  background: yellow !important ;
}

.special-item {
  margin-bottom: 20px;
}

.kindo-table {
  .equal-row {
    background: #cccccc;
  }
  .more-row {
    background: #f0f9eb;
  }
  .el-table th {
    padding: 9px 0;
    background-color: #f5f5f5;
  }
  .el-table th > .cell {
    text-align: center;
  }
  .el-table td {
    padding: 8px 0;
  }
  .el-pagination {
    white-space: pre;
    text-align: right;
    padding: 3px;
    background-color: #fff;
    border: 0px solid #ddd;
    border-top: 0px;
  }
  .mian-control {
    margin: 5px 0 0 8px;
    float: left;
  }
  .pages {
    float: right;
    margin-top: 8px;
    margin-left: 10px;
  }
  // .el-pager{
  //   display: none;
  // }
  .el-table--border {
    .rowNumber {
      .cell {
        padding: 0 2px;
      }
    }
  }
}
</style>
