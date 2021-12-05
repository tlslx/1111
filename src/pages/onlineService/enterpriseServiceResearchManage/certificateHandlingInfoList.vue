/**
 * @file 办证人员资料列表
 * @author: llluj
 */
<style scoped>
  .user-doc-container {
    display: table;
    padding: 10px 20px;
    width: 100%;
  }
  .btn-bar {
    display: table-cell;
    text-align: left;
    vertical-align: middle;
  }
  .page-bar {
    display: table-cell;
    vertical-align: middle;
    padding-right: 20px;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="办证人员资料列表" name="0">
      <div v-loading="loading">
        <search-param-link
          :searchParamsForm="searchParamsForm.data"
          :variate="searchParamsForm.variate"
          :dictionary="dictionary"
          @select-params="selectParams"
        ></search-param-link>
        <cust-table
          :cols="cols"
          :data="tableData"
          @deal-with-operate="dealWithOperate"
        ></cust-table>
        <div class="user-doc-container">
          <div class="btn-bar">
            <el-button type="primary" @click="addPersonDoc">新增</el-button>
          </div>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange">
          </pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "certificateHandlingInfoList",
  components: {
    "cust-table": custTable,
    "pagination": pagination,
    "search-param-link": searchParamLinkage
  },
  data() {
    return {
      activeName: 0,
      loading: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "",
        data: [
          {
            prop: "userName",
            label: "姓名",
            value: "",
            type: "input",
            width: "40px"
          },
          {
            prop: "idcardNo",
            label: "身份证号码",
            value: "",
            type: "input"
          },
          {
            prop: "enterpriceName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "enterpriceCode",
            label: "广交会编码",
            value: "",
            type: "input"
          }
        ]
      },
      dictionary: {},
      cols: [
        {
          prop: "enterpriceCode",
          label: "广交会编码",
          type: "string"
        },
        {
          prop: "enterpriceName",
          label: "企业名称",
          type: "string"
        },
        {
          prop: "userName",
          label: "姓名",
          type: "string"
        },
        {
          prop: "sexTypeCode",
          label: "性别",
          type: "string"
        },
        {
          prop: "idcardNo",
          label: "身份证号",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          fixed: "right",
          btns: [
            {
              type: "underlineText",
              prop: "edit",
              label: "修改"
            },
            {
              type: "underlineText",
              prop: "select",
              label: "查看"
            },
            {
              type: "underlineText",
              prop: "del",
              label: "删除"
            }
          ]
        }
      ],
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      initParams: {
        "isPage": true,
        "pageIndex": 1,
        "pageSize": 10,
        "orderModelField": [{
          "orderByField": "createDate",
          "asc": false
        }],
        "customQueryParams": [
        ]
      },
      searchParams: {}
    };
  },
  created() {
    this.getUserResourceInfo(this.initParams).then(res => {
      this.pageInfo.total = res.total;
    });
  },
  computed: {
    ...mapGetters('enterApplyExhibitCertiInfo', ['userResourceList']),
    tableData() {
      return {
        data: this.userResourceList
      };
    }
  },
  methods: {
    ...mapActions('enterApplyExhibitCertiInfo', ['getUserResourceInfo', 'deleteUserDocInfo']),
    // 修改每页展示条数
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        _searchParams = this.initParams;
        _searchParams.pageSize = val;
      } else {
        this.searchParams.pageSize = val;
        _searchParams = this.searchParams;
      }
      this.getUserResourceInfo(_searchParams);
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        this.initParams.pageIndex = val;
        _searchParams = this.initParams;
      } else {
        this.searchParams.pageIndex = val;
        _searchParams = this.searchParams;
      }
      this.getUserResourceInfo(_searchParams);
    },
    // 查询
    selectParams() {
      this.searchParams = JSON.parse(JSON.stringify(this.initParams));
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        let currentObject = {};
        if (String(formVal.value) !== 'null' && formVal.value !== '') {
          currentObject.name = formVal.prop;
          if (formVal.type === 'input') {
            currentObject.findType = 'LIKE';
          }
          if (formVal.type === 'select') {
            currentObject.findType = 'EQ';
          }
          currentObject.joinType = 'And';
          currentObject.values = [];
          currentObject.values.push($helper.trim(formVal.value));
          this.searchParams.customQueryParams.push(currentObject);
        }
      });
      this.searchParams.pageIndex = 1;
      this.pageInfo.currentPage = 1;
      this.getUserResourceInfo(this.searchParams);
    },
    // 处理表格操作
    dealWithOperate(scope, prop) {
      if (prop === 'edit') {
        this.$router.push({
          path: '/enterpriseRegistData',
          query: {
            pattern: 'edit',
            data: { ...scope.row }
          }
        });
      } else if (prop === 'select') {
        this.$router.push({
          path: '/enterpriseRegistData',
          query: {
            pattern: 'select',
            data: { ...scope.row }
          }
        });
      } else if (prop === 'del') {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.deleteUserDocInfo(scope.row.userId).then(res => {
            this.loading = false;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
            this.loading = false;
          }).then(() => {
            this.getUserResourceInfo(this.initParams).then(res => {
              this.pageInfo.total = res.total;
            });
          });
        });
      }
    },
    // 新增人员资料
    addPersonDoc() {
      this.$router.push({
        path: '/enterpriseRegistData'
      });
    }
  }
};
</script>

