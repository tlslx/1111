/**
 * @file 展具管理
 */
<style scoped>
.exhibitionManagement-list {
  text-align: center;
}
.exhibitionManagement-btn-container {
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
  <el-page ref="exhibitionManagement">
    <template slot="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <search-param-link :searchParamsForm="item.searchParamsForm.data" :variate="item.searchParamsForm.variate" :dictionary="dictionaryData" @select-params="selectParams" @add-params="add">
          </search-param-link>
          <cust-table class="exhibitionManagement-list" :loading="loading" :cols="item.cols" :data="activeName === '0' ? adjustData : (activeName === '1') ? scheduleList : EnterList">
          </cust-table>
          <div class="exhibitionManagement-btn-container">
            <pagination class="page-bar" :style="{'text-align': activeName === '0' ? 'right' : 'center'}" :pageInfo="item.pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange">
            </pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-page>
</template>
<script>
import custTable from "@/components/project/customerService/common/custTable.vue";
import pagination from "@/components/project/customerService/common/pagination.vue";
import searchParamLinkage from "@/components/project/customerService/common/searchParamLinkage.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'exhibitionManagement',
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
      url: '',
      tabList: [
        {
          "label": "展具一级分类信息",
          "name": "0",
          "cols": [
            {
              "prop": "sequenceNum",
              "label": "序号"
            },
            {
              "prop": "typeNumber",
              "label": "类型编号"
            },
            {
              "prop": "typeName",
              "label": "类型名称"
            },
            {
              "prop": "layerName",
              "label": "图层名称"
            }
          ],
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "typeNumber",
            data: [
              {
                "prop": "typeNumber",
                "label": "类型编号",
                "value": "",
                "type": "input"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0
          },
          "searchParams": {
            "typeNumber": "",
            "current": 1,
            "size": 10
          }
        },
        {
          "label": "展具二级分类信息",
          "name": "1",
          "cols": [
            {
              "prop": "sequenceNum",
              "label": "序号"
            },
            {
              "prop": "typeName",
              "label": "类型名称"
            },
            {
              "prop": "secondTypeCode",
              "label": "二级类型编号"
            },
            {
              "prop": "secondTypeName",
              "label": "二级类型名称"
            }
          ],
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "typeName",
            data: [
              {
                "prop": "typeName",
                "label": "类型名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "secondTypeCode",
                "label": "二级类型编号",
                "value": "",
                "type": "input"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0
          },
          "searchParams": {
            "typeNumber": "",
            "secondTypeCode": "",
            "current": 1,
            "size": 10
          }
        },
        {
          "label": "展具/组成展材信息",
          "name": "2",
          "cols": [
            {
              "prop": "exhibitionNumber",
              "label": "展具编号"
            },
            {
              "prop": "exhibitionName",
              "label": "名称"
            },
            {
              "prop": "unitMeasurement",
              "label": "计量单位"
            },
            {
              "prop": "exhibitionQuantity",
              "label": "数量"
            },
            {
              "prop": "specification",
              "label": "规格"
            },
            {
              "prop": "length",
              "label": "长"
            },
            {
              "prop": "width",
              "label": "宽"
            },
            {
              "prop": "height",
              "label": "高"
            },
            {
              "prop": "isForm",
              "label": "是否为组成展具"
            },
            {
              "prop": "quantity",
              "label": "组成展材数量"
            },
            {
              "prop": "isMixture",
              "label": "是否合成"
            },
            {
              "prop": "isOverlapping",
              "label": "是否可重叠"
            },
            {
              "prop": "isLaminate",
              "label": "是否含层板"
            },
            {
              "prop": "layerSpacing",
              "label": "层距"
            },
            {
              "prop": "isFixed",
              "label": "是否固定"
            },
            {
              "prop": "isVisible",
              "label": "是否可视"
            },
            {
              "prop": "rendering",
              "label": "效果图"
            },
            {
              "prop": "constructionLegend",
              "label": "施工图例"
            },
            {
              "prop": "removeLegend",
              "label": "拆除图例"
            },
            {
              "prop": "scopeApplication",
              "label": "适用范围"
            }
          ],
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "exhibitionNumber",
            data: [
              {
                "prop": "exhibitionNumber",
                "label": "展具编号",
                "value": "",
                "type": "input"
              },
              {
                "prop": "exhibitionName",
                "label": "名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "isMixture",
                "label": "是否合成",
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
          "searchParams": {
            "exhibitionName": "",
            "exhibitionNumber": "",
            "isMixture": "",
            "current": 1,
            "size": 10
          }
        }
      ]
    };
  },
  created() {
    let _this = this;
    this.selectListByPage(this.tabList[0].searchParams).then(response => {
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
  },
  computed: {
    ...mapGetters('categoryManagement', ['listByPage', 'listByPageTwo', 'listAllTool']),
    ...mapGetters('dictionary', ['dictionaryData']),
    adjustData() {
      return {
        data: this.listByPage,
        selection: false
      };
    },
    scheduleList() {
      return {
        data: this.listByPageTwo,
        selection: false
      };
    },
    EnterList() {
      return {
        data: this.listAllTool,
        selection: false
      };
    }
  },
  methods: {
    ...mapActions('categoryManagement', ['selectListByPage', 'selectListByPageTwo', 'selectListAllTool']),
    handleClick() {
      let _this = this;
      this.tabIndex = parseInt(this.activeName);
      if (this.tabIndex === 0) {
        this.selectListByPage(this.tabList[this.tabIndex].searchParams).then(response => {
          _this.loading = false;
          if (response.total > 0) {
            this.tabList[this.tabIndex].pageInfo.currentPage = response.current;
            this.tabList[this.tabIndex].pageInfo.total = response.total;
          } else if (response.total === 0) {
            this.tabList[this.tabIndex].pageInfo.currentPage = 1;
            this.tabList[this.tabIndex].pageInfo.total = 0;
          }
        }).catch(e => {
          _this.loading = false;
        });
      } else if (this.tabIndex === 1) {
        this.selectListByPageTwo(this.tabList[this.tabIndex].searchParams).then(response => {
          _this.loading = false;
          if (response.total > 0) {
            this.tabList[this.tabIndex].pageInfo.currentPage = response.current;
            this.tabList[this.tabIndex].pageInfo.total = response.total;
          } else if (response.total === 0) {
            this.tabList[this.tabIndex].pageInfo.currentPage = 1;
            this.tabList[this.tabIndex].pageInfo.total = 0;
          }
        }).catch(e => {
          _this.loading = false;
        });
      } else {
        this.selectListAllTool(this.tabList[this.tabIndex].searchParams).then(response => {
          _this.loading = false;
          if (response.total > 0) {
            this.tabList[this.tabIndex].pageInfo.currentPage = response.current;
            this.tabList[this.tabIndex].pageInfo.total = response.total;
          } else if (response.total === 0) {
            this.tabList[this.tabIndex].pageInfo.currentPage = 1;
            this.tabList[this.tabIndex].pageInfo.total = 0;
          }
        }).catch(e => {
          _this.loading = false;
        });
      }
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      this.loading = true;
      this.tabList[this.tabIndex].pageInfo.pageSize = val;
      this.tabList[this.tabIndex].searchParams.size = val;
      if (this.tabIndex === 0) {
        this.selectListByPage(this.tabList[0].searchParams).then(res => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
      if (this.tabIndex === 1) {
        this.selectListByPageTwo(this.tabList[1].searchParams).then(res => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
      if (this.tabIndex === 2) {
        this.selectListAllTool(this.tabList[2].searchParams).then(res => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.loading = true;
      this.tabList[this.tabIndex].pageInfo.currentPage = val;
      this.tabList[this.tabIndex].searchParams.current = val;
      if (this.tabIndex === 0) {
        this.selectListByPage(this.tabList[0].searchParams).then(res => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
      if (this.tabIndex === 1) {
        this.selectListByPageTwo(this.tabList[1].searchParams).then(res => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
      if (this.tabIndex === 2) {
        this.selectListAllTool(this.tabList[2].searchParams).then(res => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
    },
    add() {
      if (this.tabIndex === 0) {
        this.url = 'addtopCategory';
      } else if (this.tabIndex === 1) {
        this.url = 'addTwoCategory';
      } else {
        this.url = 'addToolFormStuff';
      }
      this.$router.push('/' + this.url);
    },
    // 模糊查询
    selectParams() {
      this.loading = true;
      let _this = this;
      this.tabList[this.tabIndex].pageInfo.currentPage = 1;
      this.tabList[this.tabIndex].pageInfo.pageSize = 10;
      this.tabList[this.tabIndex].searchParams.current = 1;
      this.tabList[this.tabIndex].searchParams.size = 10;
      this.tabList[this.tabIndex].searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (this.tabIndex === 0) {
          if (formVal.prop === "typeNumber" && formVal.type === "input") {
            this.tabList[this.tabIndex].searchParams.typeNumber = formVal.value;
          }
        } else if (this.tabIndex === 1) {
          if (formVal.prop === "typeNumber" && formVal.type === "input") {
            this.tabList[this.tabIndex].searchParams.typeNumber = formVal.value;
          }
          if (formVal.prop === "secondTypeCode" && formVal.type === "input") {
            this.tabList[this.tabIndex].searchParams.secondTypeCode = formVal.value;
          }
        } else {
          if (formVal.prop === "exhibitionName" && formVal.type === "input") {
            this.tabList[this.tabIndex].searchParams.exhibitionName = formVal.value;
          }
          if (formVal.prop === "exhibitionNumber" && formVal.type === "input") {
            this.tabList[this.tabIndex].searchParams.exhibitionNumber = formVal.value;
          }
          if (formVal.prop === "isMixture" && formVal.type === "select") {
            this.tabList[this.tabIndex].searchParams.isMixture = formVal.value;
          }
        }
      });
      let obj = {
        current: 1,
        size: 10
      };
      let key = Object.keys(this.tabList[this.tabIndex].searchParams);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.tabList[this.tabIndex].searchParams[key[i]];
        if (bSecend !== "") {
          obj[aFirst] = bSecend;
        }
      }
      this.loading = true;
      if (this.tabIndex === 0) {
        this.selectListByPage(obj).then(res => {
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
      } else if (this.tabIndex === 1) {
        this.selectListByPageTwo(obj).then(res => {
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
      } else {
        this.selectListAllTool(obj).then(res => {
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
      }
    }
  }
};
</script>


