/*
* @file 查看展位安排
* @author: weiwei
* @date:2019/3/20
*/
<template>
  <div class="page-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="查看展位安排" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="届数" size="mini" prop="exhibitionNum">
            <el-select v-model="queryForm.exhibitionNum" placeholder="请选择" @change="getAreasFun">
              <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :value="item.exhibitionNum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数" size="mini" prop="exhibitionSession">
            <el-select v-model="queryForm.exhibitionSession" placeholder="请选择" @change="getAreasFun">
              <!-- <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionPeriodNum" :value="item.exhibitionPeriodNum"></el-option> -->
              <el-option v-for="item in this.exhibitionSessionList" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请展区" size="mini" prop="exhibitionAreaCode">
            <!-- <el-select  placeholder="请选择" v-model="queryForm.exhibitionAreaCode">
              <el-option label="全部" value=""></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select> -->
            <el-select v-model="queryForm.exhibitionAreaCode" placeholder="请选择">
              <el-option v-for="(item, index) in this.exAreaOptions" :label="item.label"
                :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
          <!-- exhibitionAreaCode -->
        </el-form>
        <el-table :data="exhibitionPositionPlanData.records">
          <el-table-column prop="boothArrangeNum" label="展位号" align="center"></el-table-column>
          <el-table-column prop="exhibitionNum" label="届数" align="center"></el-table-column>
          <el-table-column prop="exhibitionSession" label="期数" align="center"></el-table-column>
          <el-table-column prop="exhibitionAreaCode" label="展区" align="center" :formatter="handleMethods">
            <!-- <template slot-scope="scope">
              {{ scope.row.exhibitionAreaCode | exhibitionAreaCodeFilter }}
            </template> -->
          </el-table-column>
          <el-table-column prop="applyProductNames" label="主要展品" align="center"></el-table-column>
          <el-table-column prop="layout" label="布展类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.layout | layoutFilter }}
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page = pageInfoData.currentPage
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="prev, pager, next, jumper"
            :total="exhibitionPositionPlanData.total">
          </el-pagination>
        </el-row>
        <el-button type="primary" @click="routerPushPic">查看展位图</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      activeName: "first",
      exAreaOptions: [],
      exhibitionSessionList: [1, 3],
      queryForm: {
        exhibitionNum: '',
        exhibitionSession: 1,
        exhibitionAreaCode: ''
      },
      pageInfoData: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('exhibitionPosition', ['exhibitionPositionPlanData']),
    ...mapGetters('inviteCustom', ['exhibitonNumListAll']),
    // 查询列表传参
    params() {
      let paramsData = {
        "customQueryParams": [
          // {
          //   "findType": "EQ",
          //   "joinType": "And",
          //   "name": "company_id",
          //   "values": [
          //     "aaa"
          //   ]
          // },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "dispatch_status",
            "values": [
              "2"
            ]
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "public_status",
            "values": [
              "1"
            ]
          }
        ],
        "orderModelField": [
          {
            "asc": false,
            "orderByField": "create_date"
          }
        ],
        "pageIndex": this.pageInfoData.currentPage,
        "pageSize": this.pageInfoData.pageSize
      };
      if (this.queryForm.exhibitionNum) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "exhibition_num",
          "values": [
            this.queryForm.exhibitionNum
          ]
        });
      }
      if (this.queryForm.exhibitionSession) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "exhibition_session",
          "values": [
            this.queryForm.exhibitionSession
          ]
        });
      }
      if (this.queryForm.exhibitionAreaCode) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "exhibition_area_code",
          "values": [
            this.queryForm.exhibitionAreaCode
          ]
        });
      }
      return paramsData;
    }
  },
  methods: {
    ...mapActions('exhibitionPosition', ['getExhibitionPositionPlan']),
    ...mapActions('inviteCustom', ["getExhibitionNumListAll"]),
    // ...mapActions("enterpriseBooth", ["getAreas"]),
    ...mapActions("commonStore", ["getExhibitionPlace"]),
    handleMethods(row, column, cellValue, index) {
      for (let i = 0; i < this.exAreaOptions.length; i++) {
        const ele = this.exAreaOptions[i];
        if (ele.exhibitionAreaCode === cellValue) {
          return ele.exhibitionAreaName;
        }
      }
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getExhibitionPositionPlan(this.params);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getExhibitionPositionPlan(this.params);
    },
    handleListQuery() { // 查询列表
      this.getExhibitionPositionPlan(this.params);
    },
    routerPushPic() { // 查看展位图
      this.$router.push('/exhibitionPositionPic');
    },
    getAreasFun() {
      let obj = {
        exhibitionNum: this.queryForm.exhibitionNum,
        periodCode: this.queryForm.exhibitionSession,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          this.queryForm.exhibitionAreaCode = "";
          this.exAreaOptions = [];
          for (let item of res) {
            this.exAreaOptions.push({
              label: item.exhibitionAreaNameCh,
              value: item.exhibitionAreaCode
            });
          }
        }
      });
    }
  },
  filters: {
    layoutFilter: value => {
      switch (value) {
        case 0:
          return '光地';
        case 1:
          return '标摊';
        case 2:
          return '豪摊';
        default:
          '';
      }
    }
  },
  created() {
    this.getExhibitionNumListAll().then(res => {
      for (let i = 0; i < this.exhibitonNumListAll.length; i++) {
        const ele = this.exhibitonNumListAll[i];
        if (ele.current) {
          this.queryForm.exhibitionNum = ele.exhibitionNum;
          return;
        }
      }
    }).then(() => {
      this.getAreasFun();
    }).then(() => {
      this.getExhibitionPositionPlan(this.params);
    });
  }
};
</script>
<style lang='less' scoped>
.page-container {
  .table {
    padding: 0 10px;
  }
  .pagination-contain {
    padding: 0 10px;
  }
}
</style>
