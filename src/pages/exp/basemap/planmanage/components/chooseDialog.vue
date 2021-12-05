<template>
  <div>
    <!--用户授权-->
    <el-dialog :title="language.choose" :close-on-click-modal="false" top="15px" :visible.sync="chooseVisible" width="60%">
      <el-form v-if="action==='select'" :model="child" :rules="childRules" ref="child"  onsubmit="return false;" label-position="right" label-width="110px" inline>
        <el-form-item :label="language.exhibitionNum" prop="exhibitionNum">
          <el-select v-model="child.exhibitionNum" @change="selectChange" :clearable="false" :placeholder="language.common.select" class="inputclass">
            <el-option v-for="item in source.expnum" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="language.exhibitionPeriodCode" prop="exhibitionPeriodCode">
          <el-select v-model="child.exhibitionPeriodCode" :clearable="false" :placeholder="language.common.select" class="inputclass">
            <el-option v-for="item in source.explist" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <kindo-table v-if="action!=='select'" ref="chooseTable" :cell-style="isCenter" :pagination="false" :height="350">
        <el-table-column prop="exhibitionNum" :label="language.expnum" min-width="200" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="exhibitionPeriodCode" :label="language.expcode" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="exhibitionAreaName" :label="language.areacode" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="pavilion" :label="language.hall" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="floor" :label="language.floor" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="standardBoothSize" :label="language.statis" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="exhibitionHallBoothsNumber" :label="language.boothnum" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="exhibitionAreaBoothsNumber" :label="language.areanum" min-width="200" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column :label="language.operation" width="120" align="center" fixed='right'>
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-delete" :title="language.delete" @click="delRowClick(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column> -->
      </kindo-table>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="chooseVisible = false">{{language.cancel}}</el-button>
        <el-button icon="el-icon-check" type="primary" v-if="action==='select'" @click="onSave()">{{language.next}}</el-button>
        <el-button icon="el-icon-check" type="primary" v-else @click="onPublish()">{{language.pubilsh}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
export default {
  name: 'choosedialog',
  mixins: [tableMixIn],
  props: {
    api: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      action: "",
      rowsdata: [],
      rowselect: [],
      // 弹出框
      child: {
        schemeId: "",
        exhibitionNum: "",
        exhibitionPeriodCode: ""
      },
      source: {
        explist: [],
        dataexplist: [],
        expnum: []
      },
      childRules: {
        exhibitionNum: [
          { required: true, message: this.language.common.select, trigger: "change" }
        ],
        exhibitionPeriodCode: [
          { required: true, message: this.language.common.select, trigger: "change" }
        ]
      },
      selectData: [],
      chooseVisible: false
    };
  },
  async created () {
    this._child = Object.assign({}, this.child);
    this.getall();
    // 读取数据字典
    this.source.explist = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
    this.source.dataexplist = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getadd() {
      this.onSave();
    },
    getchoose() {
      this.child = Object.assign({}, this._child);
      this.source.explist = [];
      this.selectData = [];
      // console.log(this.rowdata);
      // console.log(this.rowselect);
      if (this.rowselect.length > 0) {
        this.$refs.chooseTable.internalData = this.rowselect;
      } else {
        this.$refs.chooseTable.internalData = [];
      }
      this.action = "next";
      // this.onSave();
    },
    getall() {
      this.source.expnum = [];
      this.$http.get(this.api.getall).then(res => {
        if (res.length) {
          res.forEach((item, index) => {
            let params = {
              id: item.exhibitionId.toString(),
              label: item.exhibitionNum.toString(),
              value: item.exhibitionNum.toString()
            };
            this.source.expnum.push(params);
          });
        }
      });
    },
    // 下拉时更新表格
    selectChange(val, type) {
      if (!type) {
        this.child.exhibitionPeriodCode = "";
      }
      this.source.explist = [];
      if (val) {
        let _this = this;
        this.$http.get(this.api.getnum, { exhibitionNum: val, showFuture: "1" }).then(res => {
          if (res.length) {
            res.forEach((item, index) => {
              let params = {
                id: item.exhibitionPeriodId.toString(),
                label: kindo.dictionary.getLabel(_this.source.dataexplist, item.exhibitionPeriodDictCode),
                value: item.exhibitionPeriodDictCode.toString()
              };
              _this.source.explist.push(params);
            });
          }
        });
      }
    },
    delRowClick(rowIndex, row) {
      kindo.util.confirm(this.language.common.deleteConfirm, this.language.common.tips, "warning", async () => {
        this.$refs.chooseTable.internalData.splice(rowIndex, 1);
      });
    },
    // 点击下拉框
    handleSelect(item, table) {
      // 先检查是否重复
      if (this.$refs[table].internalData.length) {
        const inChecKeys = this.$refs[table].internalData.findIndex(
          temp => temp.name === item.value
        );
        if (inChecKeys !== -1) {
          kindo.util.alert(this.language.common.repeatedAddition, this.language.common.tips, "warning");
          return;
        }
      }
      let model = {
        name: item.value,
        code: item.code,
        compileId: ""
      };
      this.selectData.push(model);
      this.$refs[table].internalData = this.selectData;
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    // 可远程模糊可手填input框(名称)
    SearchAsyncName(queryString, callback) {
      if (queryString) {
        let params = {
          buttomGraphName: queryString
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
        this.$http.get(this.api.get, param).then(res => {
          this.restaurants = res.records.map(item => { 
            return { value: item.buttomGraphName, code: item.version }; 
          }) || [];
          callback(this.restaurants);
        });
      } else {
        // callback(arr);
      }
    },
    // 保存提交数据
    onSave() {
      this.action = "next";
      let ids = [];
      this.rowselect.map(item => {
        let rows = {
          schemeGraphId: item.schemeGraphId,
          exhibitionNum: item.exhibitionNum,
          exhibitionPeriodCode: item.exhibitionPeriodCode,
          exhibitionHallCode: item.exhibitionHallCode
        };
        ids.push(rows); 
      });
      let param = {
        schemeGraphs: ids
      };
      this.$http.postJson(this.api.getselect, param).then(res => {
        if (res.length) {
          this.$emit('showchoose', res);
        }
      });
    },
    onPublish() {
      let param = {
        schemeGraphs: this.rowselect
      };
      this.$http.postJson(this.api.checkExisted, param).then(res => {
        if (res.counter > 0) {
          kindo.util.confirm(this.language.common.publishConfirm, this.language.common.tips, "warning", async () => {
            this.buildpub();
          });
        } else {
          this.buildpub();
        }
      });
    },
    buildpub() {
      let param = {
        schemeGraphs: this.rowselect
      };
      this.$http.postJson(this.api.publish, param).then(res => {
        kindo.util.alert(this.language.common.successfully, this.language.common.tips, "success");
        this.$emit('reload');
        this.chooseVisible = false;
      });
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "select":
          return this.getadd();
        case "showchoose":
          return this.getchoose();
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>

</style>
