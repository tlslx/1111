/**
 * @file 工作部确认VIP企业名单
 */
<style scoped>
  .vip-enterprise-list {
    text-align: center;
  }
  .vip-enterprise-btn-container {
    display: table;
    padding: 20px;
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
    padding-right: 40px;
  }
</style>
<template>
  <el-page ref="comfirmVipEnterprise">
    <template slot="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <search-param-link :searchParamsForm="item.searchParamsForm.data"
            :variate="item.searchParamsForm.variate"
            :dictionary="dictionaryData"
            @select-params="selectParams">
          </search-param-link>
          <cust-table class="vip-enterprise-list"
            :loading="loading"
            :cols="item.cols"
            :data="activeName === '0' ? adjustData : scheduleEnterList"
            @change-multiple-selection="changeMultipleSelection">
          </cust-table>
          <div class="vip-enterprise-btn-container">
            <div class="btn-bar" v-if="activeName === '0'">
              <el-button type="danger" :disabled="multipleSelection.length <= 0" @click="deleteData">删除</el-button>
            </div>
            <pagination
              class="page-bar"
              :style="{'text-align': activeName === '0' ? 'right' : 'center'}"
              :pageInfo="item.pageInfo"
              @handle-size-change="handleSizeChange"
              @handle-current-change="handleCurrentChange">
            </pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-page>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: 'comfirmVipEnterprise',
  components: {
    'cust-table': custTable,
    'pagination': pagination,
    'search-param-link': searchParamLinkage
  },
  data() {
    return {
      activeName: '0',
      tabIndex: 0,
      loading: true,
      tabList: [
        {
          "label": "调整VIP企业名单",
          "name": "0",
          "cols": [
            {
              "prop": "exhibitionArea",
              "label": "展区"
            },
            {
              "prop": "cantonCode",
              "label": "广交会企业编码"
            },
            {
              "prop": "businessAssociation",
              "label": "商协会"
            },
            {
              "prop": "businessDelegation",
              "label": "交易团"
            },
            {
              "prop": "companyName",
              "label": "企业名称"
            },
            {
              "prop": "recommendSource",
              "label": "推荐来源",
              "style": "color: #2d92ec;"
            },
            // {
            //   "prop": "operate",
            //   "label": "操作",
            //   "type": "operator",
            //   "btns": [
            //     {
            //       "type": "underlineText",
            //       "label": "新增",
            //       "style": "text-decoration: underline;color: #ff0000;"
            //     }
            //   ]
            // },
            {
              "prop": "comments",
              "label": "备注"
            }
          ],
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "companyName",
            data: [
              {
                "prop": "companyName",
                "label": "企业名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "businessAssociation",
                "label": "商协会",
                "value": "",
                "type": "select"
              },
              {
                "prop": "businessDelegation",
                "label": "交易团",
                "value": "",
                "type": "select"
              },
              {
                "prop": "exhibitionArea",
                "label": "展区",
                "value": "",
                "type": "select"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0
          },
          "initParams": {
            "orderModelField": [
              {
                "orderByField": "",
                "asc": false
              }
            ],
            "customQueryParams": [
              {
                "name": "session",
                "findType": "EQ",
                "joinType": "And",
                "values": []
              }
            ],
            "pageIndex": 1,
            "pageSize": 10
          },
          searchParams: {}
        },
        {
          "label": "VIP企业参展名单",
          "name": "1",
          "cols": [
            {
              "prop": "sequenceNum",
              "label": "序号"
            },
            {
              "prop": "exhibitionArea",
              "label": "展区"
            },
            {
              "prop": "cantonCode",
              "label": "广交会企业编码"
            },
            {
              "prop": "businessAssociation",
              "label": "商协会"
            },
            {
              "prop": "businessDelegation",
              "label": "交易团"
            },
            {
              "prop": "companyName",
              "label": "企业名称"
            },
            {
              "prop": "recommendSource",
              "label": "甄选情况"
            }
          ],
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "companyName",
            data: [
              {
                "prop": "companyName",
                "label": "企业名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "businessAssociation",
                "label": "商协会",
                "value": "",
                "type": "select"
              },
              {
                "prop": "businessDelegation",
                "label": "交易团",
                "value": "",
                "type": "select"
              },
              {
                "prop": "exhibitionArea",
                "label": "展区",
                "value": "",
                "type": "select"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0
          },
          "initParams": {
            "orderModelField": [
              {
                "orderByField": "",
                "asc": false
              }
            ],
            "customQueryParams": [
              {
                "name": "session",
                "findType": "EQ",
                "joinType": "And",
                "values": []
              }
            ],
            "pageIndex": 1,
            "pageSize": 10
          },
          searchParams: {}
        }
      ],
      // 多选表格
      multipleSelection: []
    };
  },
  created() {
    let _this = this;
    this.getSessionInfo().then(res => {
      this.tabList.forEach((value, index, array) => {
        value.initParams.customQueryParams.forEach((paraValue, paraIndex, paraArray) => {
          if (paraValue.name === 'session') {
            paraValue.values[0] = res.session;
          }
        });
      });
      this.selectVIPEnterList(this.tabList[0].initParams).then(response => {
        _this.loading = false;
        if (response.total > 0) {
          this.tabList[0].pageInfo.currentPage = response.current;
          this.tabList[0].pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.tabList[0].pageInfo.currentPage = 1;
          this.tabList[0].pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    });
  },
  computed: {
    ...mapGetters('generateVIP', ['vipCompanyInfoList']),
    ...mapGetters('common', ['session']),
    ...mapGetters('dictionary', ['dictionaryData']),
    adjustData() {
      return {
        data: this.vipCompanyInfoList,
        selection: true
      };
    },
    scheduleEnterList() {
      return {
        data: this.vipCompanyInfoList,
        selection: false
      };
    }
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['selectVIPEnterList']),
    ...mapActions('confirmEnterList', ['deleteVIPEnterList']),
    handleClick() {
      this.tabIndex = parseInt(this.activeName);
      // this.tabList[this.tabIndex].pageInfo.currentPage = 1;
      // this.tabList[this.tabIndex].pageInfo.pageSize = 10;
      // this.tabList[this.tabIndex].searchParams.pageIndex = 1;
      // this.tabList[this.tabIndex].searchParams.pageSize = 10;
      this.selectVIPEnterList(this.tabList[this.tabIndex].searchParams).then(res => {
        this.tabList[this.tabIndex].pageInfo.total = res.total;
      });
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      this.loading = true;
      this.tabList[this.tabIndex].pageInfo.pageSize = val;
      let _searchParams = {};
      if (!this.tabList[this.tabIndex].searchParams.customQueryParams) {
        _searchParams = this.tabList[this.tabIndex].initParams;
        _searchParams.pageSize = val;
      } else {
        this.tabList[this.tabIndex].searchParams.pageSize = val;
        _searchParams = this.tabList[this.tabIndex].searchParams;
      }
      this.selectVIPEnterList(_searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.loading = true;
      this.tabList[this.tabIndex].pageInfo.currentPage = val;
      let _searchParams = {};
      if (!this.tabList[this.tabIndex].searchParams.customQueryParams) {
        this.tabList[this.tabIndex].initParams.pageIndex = val;
        _searchParams = this.tabList[this.tabIndex].initParams;
      } else {
        this.tabList[this.tabIndex].searchParams.pageIndex = val;
        _searchParams = this.tabList[this.tabIndex].searchParams;
      }
      this.selectVIPEnterList(_searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    addData() {
      this.addVIPEnterInfo.dialogVisible = true;
    },
    // 查询
    selectParams() {
      this.loading = true;
      let _this = this;
      this.tabList[this.tabIndex].pageInfo.currentPage = 1;
      this.tabList[this.tabIndex].pageInfo.pageSize = 10;
      this.tabList[this.tabIndex].searchParams = JSON.parse(JSON.stringify(this.tabList[this.tabIndex].initParams));
      this.tabList[this.tabIndex].searchParams.pageIndex = 1;
      this.tabList[this.tabIndex].searchParams.pageSize = 10;
      this.tabList[this.tabIndex].searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        let currentObject = {};
        if (formVal.value !== '') {
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
          this.tabList[this.tabIndex].searchParams.customQueryParams.push(currentObject);
        }
      });
      this.selectVIPEnterList(this.tabList[this.tabIndex].searchParams).then(res => {
        _this.loading = false;
        if (res.total > 0) {
          this.tabList[this.tabIndex].pageInfo.currentPage = res.current;
          this.tabList[this.tabIndex].pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.tabList[this.tabIndex].pageInfo.currentPage = 1;
          this.tabList[this.tabIndex].pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 选择多个checkbox
    changeMultipleSelection(val) {
      this.multipleSelection = val;
    },
    // 删除事件
    deleteData() {
      this.deleteVIPEnterList(this.multipleSelection).then(res => {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.selectVIPEnterList(this.tabList[this.tabIndex].searchParams).then(response => {
            this.tabList[this.tabIndex].searchParams.pageIndex = 1;
            this.tabList[this.tabIndex].searchParams.pageSize = 10;
            this.tabList[this.tabIndex].pageInfo.currentPage = 1;
            this.tabList[this.tabIndex].pageInfo.pageSize = 10;
            this.tabList[this.tabIndex].pageInfo.total = response.total;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    }
  }
};
</script>


