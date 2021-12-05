<template>
  <el-container>
     <el-dialog :title="language.inquiry" :visible.sync="consultVisible" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <kindo-box>
          <el-form ref="consultForm" :model="consultForm" size="small" onsubmit="return false;" label-width="110px" inline>
            <el-form-item :label="language.departname">
              <el-autocomplete v-model="consultForm.departmentName" :fetch-suggestions="SearchAsyncName" :placeholder="language.inputPlaceholder" @select="(item)=>{handleSelect(item,'consultTable')}"></el-autocomplete>
            </el-form-item>
          </el-form>
        </kindo-box>
        <kindo-box>
         <kindo-table :cell-style="isCenter" :pagination="false" ref="consultTable">
           <el-table-column prop="name" :label="language.departname" header-align="center"></el-table-column>
           <el-table-column :label="language.operation" min-width="120" align="center" fixed='right'>
             <template slot-scope="scope">
               <el-button type="text" icon="el-icon-delete" :title="language.delete" @click="delRowClick(scope.$index, scope.row)"></el-button>
             </template>
           </el-table-column>
         </kindo-table>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="consultVisible = false">{{language.cancel}}</el-button>
          <el-button type="primary" @click="onSubmitConsult()">{{language.confirm}}</el-button>
        </div>
      </el-dialog>
  </el-container>
</template>
<script>
import common from '@/components/project/mixins/common';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'consultDialog',
  mixins: [common, listPageBase],
  data() {
    return {
      consultVisible: false,
      selectData: [],
      rowData: [],
      action: '',
      consultForm: {   
        departmentName: '' 
      }
    };
  },
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
  async created () {
    this._consultForm = Object.assign({}, this.consultForm);
  },
  methods: {
    getConsult() {
      this.$nextTick(function () {
        this.consultForm = Object.assign({}, this._consultForm);
        this.selectData = [];
        this.$refs.consultTable.internalData = [];
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
          kindo.util.alert(this.language.repeatedAddition, this.language.tips, "warning");
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
        // let params = {
        //   deptName: queryString
        // };
        // let param = {
        //   json: {
        //     customQueryParams: params,
        //     page: {
        //       current: 1,
        //       size: 10
        //     }
        //   }
        // };

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
    // 意见征询提交
    onSubmitConsult() {
      if (!this.$refs.consultTable.internalData.length) {
        kindo.util.alert(this.language.increaseDepartment, this.language.tips, "warning");
        return;
      }
      let ids = [];
      let templateGraphIds = [];
      let names = [];
      this.$refs.consultTable.internalData.map(item => {
        names.push(item.name.split('(')[0]);
        ids.push(item.id);

      });
      this.rowData.map(item => {
        templateGraphIds.push(item.templateGraphId);
      });
      let params = { orgIds: ids, orgNames: names, templateGraphIds: templateGraphIds };
      this.$http.postJson(this.api.askAdvice, params).then(res => {
        this.consultVisible = false;
        this.$emit('reload');
        kindo.util.alert(this.language.submittedSuccessfully, "success");
      }).catch(_ => {
        kindo.util.alert(this.language.submissionFailed, "warning");
      });
    },
    delRowClick(rowIndex, row) {
      kindo.util.confirm(this.language.confirmDelete, this.language.tips, "warning", async () => {
        this.$refs.consultTable.internalData.splice(rowIndex, 1);
      });
    }
  },
  watch: {
    // consultVisible(val, oldVal) {
    //   if (val === true) {
    //     this.getConsult();
    //   }
    // }
    "action"(value) {
      switch (value) {
        case "consult":
          return this.getConsult();
        default:
          return "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

