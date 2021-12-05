<template>
  <el-page ref="plangroup">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :childApi="config.api" :language="source.planLanguage" v-on:childByValue="childByValue" @reload="onChild" ref="childDialog"/>
      <view-dialog :childApi="config.api" :language="source.planLanguage" @reload="onChild" ref="viewDialog"/>
      <!--按钮栏-->
      <kindo-box :title="source.planLanguage.schemegroup" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.planLanguage.schemegroup" prop="schemeGroupName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" :placeholder="source.planLanguage.inputcontent" v-model="forms.schemeGroupName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.planLanguage.expnum" prop="exhibitionNum">
            <!-- <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="shortclass" placeholder="请输入内容" v-model="forms.exhibitionNum"></el-input> -->
            <el-select v-model="forms.exhibitionNum" :placeholder="source.planLanguage.select" @change="selectExhibitionNum">
              <el-option v-for="item in source.exhibitionNum" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.planLanguage.expcode" prop="exhibitionPeriodCode">
            <!-- <el-select v-model="forms.exhibitionPeriodCode" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.exhibitionPeriodCode" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <el-select v-model="forms.exhibitionPeriodCode" :placeholder="source.planLanguage.selectexpcode" @focus="selectExhibitionPeriodNum(forms.exhibitionNum)" >
              <el-option v-for="item in source.exhibitionPeriodNums" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.planLanguage.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.planLanguage.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="config.api.get" :queryParam="form">
            <el-table-column :label="source.planLanguage.schemegroupname" prop="schemeGroupName" min-width="100px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="source.planLanguage.expnum" prop="exhibitionNum" min-width="80px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="source.planLanguage.expcode" prop="exhibitionPeriodCode" header-align="center" width="80px"
            :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionPeriodNum,row.exhibitionPeriodCode)}">
            </el-table-column>
            <el-table-column :label="source.planLanguage.boothscale" prop="boothsNumber" min-width="60px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="source.planLanguage.selectexphall" prop="schemeGroupHallList"  min-width="100px" show-overflow-tooltip header-align="center"
            :formatter="formatExhibitionHall">
            </el-table-column>
            <el-table-column :label="source.planLanguage.status" prop="status"  min-width="60px" show-overflow-tooltip header-align="center"
            :formatter="(row, column, value) => kindo.dictionary.getLabel(source.status, value)">
            </el-table-column>
            <el-table-column :label="source.planLanguage.progress" prop="progress"  min-width="60px" show-overflow-tooltip header-align="center"
            :formatter="formatProgress">
            </el-table-column>
            <el-table-column :label="source.planLanguage.operation" width="120" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" v-if="right('view')" @click="onAction('view','view',scope.row)">{{source.planLanguage.viewgroup}}</el-button>
                <el-button type="text" v-if="right('del')" @click="onDelete(scope.row)">{{source.planLanguage.delete}}</el-button>
                <!-- <el-button type="text" icon="el-icon-view" title="查看" @click="onAction('view','view',scope.row)"></el-button>
                <el-button type="text" icon="el-icon-delete" title="删除" @click="onDelete(scope.row)"></el-button> -->
              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" v-if="right('add')" @click="onAction('add','child')" type="primary" size="small">{{source.planLanguage.add}}</el-button>
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import exhibitionPeriod from "@/components/project/mixins/exhibitionPeriods";
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './components';
export default {
  name: "extension",
  mixins: [tableMixIn, exhibitionPeriod, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'viewDialog': () => import('./components/viewDialog')
  },
  data() {
    return {
      pageId: "plangroup",
      config,
      action: "",
      editexp: 1, // 默认展期统计数
      forms: {
        schemeGroupName: "",
        exhibitionPeriodCode: "",
        exhibitionNum: ""
      },
      source: {
        planLanguage: [],
        exhibitionPeriodCode: [],
        status: []
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);

    // 读取国际化
    this.source.planLanguage = kindo.util.getLanguage('PlanMapLang');
    // this.source.exhibitionPeriodCode = await kindo.dictionary.get('exhibitionPeriodNum');

    const tmpStatus = [this.source.planLanguage.calculating, this.source.planLanguage.completed];
    tmpStatus.forEach((s, i) => {
      this.source.status.push({
        value: i + 1 + "",
        label: s
      });
    });
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    onQuery() {
      this.$refs.table.loadData();
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    onChild() {
      this.$refs.table.reloadData();
    },
    childByValue(childValue) {
      if (childValue !== undefined) {
        this.$refs['viewDialog']['viewVisible'] = true;
        this.$refs['viewDialog']['rowdata'] = childValue;
        this.$refs['viewDialog']['action'] = 'view';
        this.$refs['viewDialog']['isFetching'] = true;
      }
    },
    // 可远程模糊可手填input框(名称)
    SearchAsyncName(queryString, callback) {
      if (queryString) {
        let params = {
          dataDictId: 'b2b795bcb356424495e4cb276315d7f2',
          itemText: queryString
        };
        let param = {
          json: {
            customQueryParams: params,
            page: {
              current: 1,
              size: 10
            }
          }
        };

        this.$http.get(kindo.config.api.upms + '/api/sysDataDictItem/getDicItemPage', param).then(res => {
          this.diclist = res.records.map(item => { 
            return { value: item.itemText, code: item.itemCode }; 
          }) || [];
          callback(this.diclist);
        });
      } else {
        // callback(arr);
      }
    },
    handleSelect(item) {
      this.forms.exhibitionAreaCode = item.code;
    },
    formatExhibitionHall(row, column, cellValue, index) {
      if (cellValue !== undefined && cellValue.length > 0) {
        let exhibtitionHallStr = "";
        for (let i = 0, len = cellValue.length; i < len; i++) {
          let item = cellValue[i];
          if (i === 0) {
            exhibtitionHallStr += item.exhibitionHallCode;
          } else {
            exhibtitionHallStr += ' - ' + item.exhibitionHallCode;
          }
        }
        return exhibtitionHallStr;
      } else {
        return "---";
      }
    },
    formatStatus(row, column, cellValue, index) {
      if (cellValue !== undefined && cellValue.length > 0) {
        let exhibtitionHallStr = "";
        for (let i = 0, len = cellValue.length; i < len; i++) {
          let item = cellValue[i];
          if (i === 0) {
            exhibtitionHallStr += item.exhibitionHallCode;
          } else {
            exhibtitionHallStr += ' - ' + item.exhibitionHallCode;
          }
        }
        return exhibtitionHallStr;
      } else {
        return "---";
      }
    },
    formatProgress(row, column, cellValue, index) {
      if (cellValue !== undefined) {
        return kindo.util.toPercent(cellValue, 2, '%');
      } else {
        return "0%";
      }
    },
    onDelete(row) {
      this.deleteOne(
            row,
            "schemeGroupId",
            "table",
            this.config.api.delete
          );
    },
    // 公用触发方法
    onAction(action, form, row) {
      this.$refs[form + 'Dialog']['action'] = '';
      this.$nextTick(function () {
        this.$refs[form + 'Dialog']['action'] = action;
        if (this.delDictSelection) {
          this.$refs[form + 'Dialog']['rowselect'] = this.delDictSelection;
        }
        if (row) {
          this.$refs[form + 'Dialog']['rowdata'] = row;
        }
        this.$refs[form + 'Dialog'][form + 'Visible'] = true;
        if (action === 'view') {
          this.$refs[form + 'Dialog']['exhibitionPeriodCode'] = this.source.exhibitionPeriodNum;
          this.$refs[form + 'Dialog']['isFetching'] = true;
        }
      });
    }
  },
  watch: {
    "forms.exhibitionNum"(value) {
      this.forms.exhibitionPeriodCode = "";
      // 初始化 exhibitionPeriod 中的展届值
      this.child.exhibitionNum = value;
    }
  }
};
</script>
<style lang="scss" scoped>

</style>