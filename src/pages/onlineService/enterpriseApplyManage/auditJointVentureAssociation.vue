/**
* @file 联营企业管理---商协会审核联营企业列表
*/
<style scoped>
  .sort-btns{
  width:100%;
  margin-bottom: 30px;
}
.page-bar{
  width: 60%;
  float: right;
}
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会审核联营企业列表" name="first">
      <div class="sort-btns">
        联营企业名称：
        <el-input v-model="searchContent" style="width:200px;" clearable @change="getSearch" placeholder="请输入联营企业名称"></el-input>
        审核状态：
        <el-select @change='selectStatue' style="width:200px;" clearable v-model="approveStatus" placeholder="请选择审核状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button @click="getSearchData" type="primary">查询</el-button>
      </div>
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange"
        :header-cell-style="tableHeaderColor">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="nameCh" label="联营企业名称"></el-table-column>
        <el-table-column prop="addressCh" label="联营企业地址"></el-table-column>
        <el-table-column prop="legalPerson" label="法人代表"></el-table-column>
        <el-table-column prop="phone" label="联系电话（手机）"></el-table-column>
        <el-table-column prop="approveStatus" label="审核状态">
          <template slot-scope="scope">
            <span>{{scope.row.approveStatus==0?'审核中':scope.row.approveStatus==1?'审核通过':scope.row.approveStatus==2?'不通过':'待审核'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)" style="text-decoration: underline;">开始审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:94%;padding:1% 3%;">
        <el-button @click="toAuditing" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">审核通过</el-button>
        <el-button @click="toAuditNOT" :disabled="disabled" v-loading.fullscreen.lock="fullscreenLoading">审核不通过</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import pagination from "@/components/project/onlineService/common/pagination.vue";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    $helper
  } from "@/scripts/project/utils";
  export default {
    components: {
      'pagination': pagination
    },
    data() {
      return {
        options: [{
          value: '0',
          label: '审核中'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '不通过'
        }, {
          value: 'null',
          label: '待审核'
        }],
        activeName: "first",
        fullscreenLoading: false,
        searchContent: "", // 搜索模糊变量
        approveStatus: '', // 模糊查询变量
        //设置table的loading变量
        loading: false,
        //批量审核按钮初始禁用
        disabled: true,
        // 分页
        pageInfo: {
          "currentPage": 1,
          "pageSize": 10,
          "total": 0,
          "style": "padding: 10px 0;text-align: right;"
        },
        tableData: [], // 表格数据
        multipleSelection: [], // 多选暂存数据
        // 审核传参
        selectData: [],
        selectDataNot: [],
        // 传参需要
        searchParams: {
          "orderModelField": [{
            "orderByField": "",
            "asc": false
          }],
          "customQueryParams": [{
            "name": "businessDelegationResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          },
          {
            "name": "businessAssociationResult",
            "findType": "IS_NULL",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }],
          "pageIndex": 1,
          "pageSize": 10
        }
      };
    },
    created() {
      // 初始列表
      this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
        this.tableData = res.records;
        this.pageInfo.currentPage = 1;
        this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
      this.getData();
    },
    computed: {
      ...mapGetters('JointVentureManagement', ['getopinion'])
    },
    methods: {
      ...mapActions('JointVentureManagement', ['getAssociateEnterprisesInfo', 'approveAssociateEnterprisesInfo']),
      // 获取搜索输入的值
      getSearch(val) {
        this.searchContent = $helper.trim(val);
      },
      // 查询方法
      getData() {
        this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          this.pageInfo.currentPage = 1;
          this.pageInfo.pageSize = 10;
          this.pageInfo.total = res.total;
        });
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return "background-color: #f5f5f5;";
        }
      },
      // 下拉框选择审核状态value
      selectStatue(value) {
        this.approveStatus = value;
      },
      // 模糊查询刷新表格
      getSearchData() {
        if (this.searchContent !== "" || this.approveStatus !== '') {
          if (this.approveStatus === 'null') {
            this.searchParams.customQueryParams = [{
              "name": "nameCh",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.searchContent],
              "description": ""
            }, {
              "name": "approveStatus",
              "findType": "IS_NULL",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.approveStatus],
              "description": ""
            }, {
              "name": "businessDelegationResult",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": ["1"],
              "description": ""
            },
            {
              "name": "businessAssociationResult",
              "findType": "IS_NULL",
              "joinType": "And",
              "dataType": "Default",
              "values": ["1"],
              "description": ""
            }];
            this.getData(); // 刷新页面
          } else {
            this.searchParams.customQueryParams = [{
              "name": "nameCh",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.searchContent],
              "description": ""
            }, {
              "name": "approveStatus",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.approveStatus],
              "description": ""
            }, {
              "name": "businessDelegationResult",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": ["1"],
              "description": ""
            },
            {
              "name": "businessAssociationResult",
              "findType": "IS_NULL",
              "joinType": "And",
              "dataType": "Default",
              "values": ["1"],
              "description": ""
            }];
            this.getData(); // 刷新页面
          }
        } else {
          this.searchParams.customQueryParams = [{
            "name": "businessDelegationResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          },
          {
            "name": "businessAssociationResult",
            "findType": "IS_NULL",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }];
          this.getData();
        }
      },
      // 跳转审核页面并带上所需值
      handleEdit(row) {
        this.$router.push({
          path: "/auditVentureAssociation",
          query: {
            row: row
          }
        });
      },
      // 审核通过
      toAuditing() {
        this.fullscreenLoading = true;
        let param = {
          "associateEnterprisesInfos": this.selectData
        };
        this.approveAssociateEnterprisesInfo(param).then(reso => {
          this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
            this.tableData = res.records;
            this.pageInfo.currentPage = 1;
            this.pageInfo.pageSize = 10;
            this.pageInfo.total = res.total;
          });
        });
      },
      // 审核不通过
      toAuditNOT() {
        this.fullscreenLoading = true;
        let param = {
          "associateEnterprisesInfos": this.selectDataNot
        };
        this.approveAssociateEnterprisesInfo(param).then(reso => {
          this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
            this.tableData = res.records;
            this.pageInfo.currentPage = 1;
            this.pageInfo.pageSize = 10;
            this.pageInfo.total = res.total;
          });
        });
      },
      // 分页事件
      handleSizeChange(val) {
        //设置table的loading变量
        this.loading = true;
        this.pageInfo.pageSize = val;
        this.searchParams.pageSize = val;
        this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          //设置table的loading变量
          this.loading = false;
        });
      },
      handleCurrentChange(val) {
        //设置table的loading变量
        this.loading = true;
        this.pageInfo.currentPage = val;
        this.searchParams.pageIndex = val;
        this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          //设置table的loading变量
          this.loading = false;
        });
      },
      // 获取多选值并保留传参所需字段
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //批量时，若未选择数据，按钮禁用
        if (val.length >= 1) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
        // 返回批量审核通过数据
        this.selectData = this.multipleSelection.map(el => {
          return {
            "associateId": el.associateId,
            "approveStatus": "0",
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "type": "AS",
            "businessAssociationResult": "1",
            "approveExplain": null
          };
        });
        // 返回批量审核不通过数据
        this.selectDataNot = this.multipleSelection.map(el => {
          return {
            "associateId": el.associateId,
            "approveStatus": "2",
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "type": "AS",
            "businessAssociationResult": "2",
            "approveExplain": null
          };
        });
      }
    }
  };

</script>
