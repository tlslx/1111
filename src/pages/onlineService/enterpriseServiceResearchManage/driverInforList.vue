/**
 * @file 司机人员信息列表
 * @author: llluj
 */
<style scoped>
  .driver-info-container {
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
    <el-tab-pane label="司机人员信息列表" name="0">
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
          :index="tableIndex"
          @deal-with-operate="dealWithOperate"
        ></cust-table>
        <div class="driver-info-container">
          <div class="btn-bar">
            <el-button type="primary" @click="addDriver">新增司机信息</el-button>
          </div>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"
          ></pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      activeName: 0,
      loading: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "enterpriceName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "driverName",
            label: "司机姓名",
            value: "",
            type: "input"
          },
          {
            prop: "idcardNo",
            label: "身份证号",
            value: "",
            type: "input"
          }
        ]
      },
      dictionary: {},
      cols: [
        {
          prop: "driverName",
          label: "司机姓名",
          type: "string"
        },
        {
          prop: "sexTypeCode",
          label: "性别",
          type: "string"
        },
        {
          prop: "idcardNo",
          label: "身份证号码",
          type: "string"
        },
        {
          prop: "enterpriceCode",
          label: "企业编号",
          type: "string"
        },
        {
          prop: "enterpriceName",
          label: "企业名称",
          type: "string"
        },
        {
          prop: "creatorName",
          label: "录入人",
          type: "string"
        },
        {
          prop: "createDate",
          label: "录入时间",
          type: "string"
        },
        {
          prop: "badgePhotoUrl",
          label: "头像",
          type: "img",
          containImage: true
        },
        {
          prop: "operation",
          type: "operator",
          fixed: "right",
          width: "100px",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "修改",
              prop: "edit"
            },
            {
              type: "underlineText",
              label: "删除",
              prop: "del"
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
    this.loading = true;
    this.getDriverList(this.initParams).then(res => {
      this.loading = false;
      this.pageInfo.total = res.total;
    }).catch(e => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters('enterApplyCardInfo', ['driverList']),
    tableData() {
      return {
        data: this.driverList
      };
    },
    // 表格排序属性设置
    tableIndex: function () {
      return (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize + 1;
    }
  },
  methods: {
    ...mapActions('enterApplyCardInfo', ['getDriverList', 'deleteDriverInfo']),
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
      this.getDriverList(this.searchParams).then(res => {
        this.pageInfo.total = res.total;
      });
    },
    dealWithOperate(scope, prop) {
      if (prop === 'del') {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.deleteDriverInfo(scope.row.driverId).then(res => {
            this.loading = false;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
            this.loading = false;
          }).then(() => {
            this.getDriverList(this.initParams).then(res => {
              this.pageInfo.total = res.total;
            });
          });
        });
      }
    },
    addDriver() {
      this.$router.push({
        path: '/registerModifyDriverInfo'
      });
    },
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
      this.getDriverList(_searchParams).then(res => {
        this.pageInfo.total = res.total;
      });
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
      this.getDriverList(_searchParams).then(res => {
        this.pageInfo.total = res.total;
      });
    }
  }
};
</script>

