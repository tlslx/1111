<template>
  <div>
    <!--征询意见-->
    <el-dialog :title="language.inquiry" :close-on-click-modal="false" top="15px" :visible.sync="consultVisible" width="60%">
      <el-form :model="child" ref="child" onsubmit="return false;" label-width="110px" inline>
        <el-form-item :label="language.departname" prop="searchname">
          <el-autocomplete v-model="child.searchname" :fetch-suggestions="SearchAsyncName" :placeholder="language.common.input" @select="(item)=>{handleSelect(item,'consultTable')}"></el-autocomplete>
        </el-form-item>
        <!-- <el-button icon="el-icon-search" type="primary" @click="onSearch">查询</el-button> -->
      </el-form>
      <kindo-table ref="consultTable" :pagination="false" :height="350">
        <el-table-column prop="name" :label="language.departname" min-width="350" show-overflow-tooltip header-align="center"></el-table-column>
        <el-table-column :label="language.operation" width="120" align="center" fixed='right'>
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-delete" :title="language.delete" @click="delRowClick(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </kindo-table>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="consultVisible = false">{{language.cancel}}</el-button>
        <el-button icon="el-icon-check" type="primary" @click="onSave()">{{language.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
export default {
  name: 'consultdialog',
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
      // 弹出框
      child: {
        searchname: ""
      },
      source: {
      },
      selectData: [],
      consultVisible: false
    };
  },
  async created () {
    this._child = Object.assign({}, this.child);
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getadd() {
      this.child = Object.assign({}, this._child);
      this.selectData = [];
      this.$refs.consultTable.internalData = [];
    },
    delRowClick(rowIndex, row) {
      kindo.util.confirm(this.language.common.deleteConfirm, this.language.common.tips, "warning", async () => {
        this.$refs.consultTable.internalData.splice(rowIndex, 1);
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
        id: item.id
      };
      this.selectData.push(model);
      this.$refs[table].internalData = this.selectData;
    },
    // 可远程模糊可手填input框(名称)
    SearchAsyncName(queryString, callback) {
      if (queryString) {
        let params = {
          "orderModelField": [
            {
              "orderByField": "deptCode",
              "asc": true
            }
          ],
          "customQueryParams": [
            {
              "name": "state",
              "findType": "EQ",
              "values": ["1"]
            },
            {
              "name": "deptName",
              "findType": "LIKE",
              "values": [queryString]
            }
          ]
        };
        let param = {
          json: params
        };
        this.$http.get(this.api.getdept, param).then(res => {
          this.restaurants = res.records.map(item => { 
            return { value: item.deptName + '(' + item.parentName + ')', id: item.deptId }; 
          }) || [];
          callback(this.restaurants);
        });
      } else {
        // callback(arr);
      }
    },
    // 保存提交数据
    onSave() {
      if (!this.$refs.consultTable.internalData.length) {
        kindo.util.alert(this.language.common.increaseDepart, this.language.common.tips, "warning");
        return;
      }
      let ids = [];
      let sids = [];
      let wids = [];
      let names = [];
      this.$refs.consultTable.internalData.map(item => {
        names.push(item.name.split('(')[0]);
        ids.push(item.id);
      });
      let rows = this.rowselect;
      rows.map(item => {
        sids.push(item.schemeGraphId);
      });
      rows.map(item => {
        wids.push(item.workflowId);
      });
      let param = {
        schemeGraphId: rows.map(item => item.schemeGraphId).toString(),
        businessKey: rows.map(item => item.workflowId).toString(),
        departmentIds: ids,
        departmentNames: names
      };
      this.$http.postJson(this.api.submit, param).then(res => {
        this.consultVisible = false;
        this.$emit('reload');
        kindo.util.alert(this.language.common.successfully, this.language.common.tips, "success");
      });
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "selectcon":
          return this.getadd();
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>

</style>
