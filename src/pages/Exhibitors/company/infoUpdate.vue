**
* @file 信息修改记录
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="信息修改记录" name="second">
      <el-form :inline="true" :model="searchForm" class="demo-ruleForm" border>
        <el-form-item label="审核状态:" prop="state">
          <el-select  placeholder="请选择" v-model="searchForm.state">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="初审未通过" value="1"></el-option>
            <el-option label="初审通过" value="2"></el-option>
            <el-option label="终审未通过" value="3"></el-option>
            <el-option label="终审通过" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableForm" style="width: 100%;">
        <el-table-column
          prop="applyModifyTime"
          label="申请修改信息时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="approveStatus"
          label="初审状态"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.approveStatus | approveStatusFilters }}
          </template>
        </el-table-column>
        <el-table-column
          prop="finalApproveStatus"
          label="终审状态"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.finalApproveStatus | finalApproveStatusFilters }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="toDetail(scope.row, scope.index)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "second",
      searchForm: { state: "" },
      tableForm: []
    };
  },
  created() {
    // 信息修改记录初始化
    this.submitSearch(); // 查询接口
  },
  filters: {
    approveStatusFilters: value => {
      if (!value) {
        return '0';
      }
      let approveStatusArray = [{ value: '0', label: '未审核' }, { value: '1', label: '不通过' }, { value: '2', label: '初审通过' }];
      for (let i = 0; i < approveStatusArray.length; i++) {
        let item = approveStatusArray[i];
        if (value.toString() === item.value.toString()) {
          return item.label;
        }
      }
    },
    finalApproveStatusFilters: value => {
      if (!value) {
        return '0';
      }
      let finalApproveStatusArray = [{ value: '0', label: '未审核' }, { value: '1', label: '不通过' }, { value: '2', label: '终审通过' }];
      for (let i = 0; i < finalApproveStatusArray.length; i++) {
        let item = finalApproveStatusArray[i];
        if (value.toString() === item.value.toString()) {
          return item.label;
        }
      }
    }
  },
  methods: {
    ...mapActions('companyInfo', ['getCompanyUpdateHistoryInfo']),   // 查看企业信息修改记录
    // 跳转到信息修改详情页
    toDetail(row, index) {
      this.$router.push({
        path: '/updateInfoDet',
        query: {
          data: JSON.stringify(row.historyModifyId)
        }
      });
    },
    // 查询按钮
    submitSearch() {
      let tableParam = {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "type",
            "values": [
              "1"
            ]
          }
          // {
          //   "findType": "EQ",
          //   "joinType": "And",
          //   "name": "object_id",
          //   "values": [
          //     "aaa" // "0007898572"
          //   ]
          // }
        ],
        "orderModelField": [
          {
            "asc": false,
            "orderByField": "apply_modify_time"
          }
        ]
      };
      let state = this.searchForm.state;
      switch (state) {
        case '0':
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "approveStatus", "values": ["0"]
          });
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "finalApproveStatus", "values": ["0"]
          });
          break;
        case '1':
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "approveStatus", "values": ["1"]
          });
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "finalApproveStatus", "values": ["0"]
          });
          break;
        case '2':
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "approveStatus", "values": ["2"]
          });
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "finalApproveStatus", "values": ["0"]
          });
          break;
        case '3':
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "approveStatus", "values": ["2"]
          });
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "finalApproveStatus", "values": ["1"]
          });
          break;
        case '4':
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "approveStatus", "values": ["2"]
          });
          tableParam.customQueryParams.push({
            "findType": "EQ", "joinType": "And", "name": "finalApproveStatus", "values": ["2"]
          });
          break;
        default:
          break;
      }
    // 信息修改记录初始化
      this.getCompanyUpdateHistoryInfo(tableParam).then(res => {
        this.tableForm = res;
      });
    }
  }
};
</script>
<style lang='less' scoped>

</style>
