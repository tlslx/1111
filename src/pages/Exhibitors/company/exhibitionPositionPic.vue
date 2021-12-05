/*
* @file 展位图纸
* @author: weiwei
* @date:2019/3/20
*/
<template>
  <div class="page-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="展位图纸" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="届数" size="mini" prop="exhibitionNum">
            <el-select  placeholder="请选择" v-model="queryForm.exhibitionNum">
              <el-option label="全部" value=""></el-option>
              <el-option label="125" value="125"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数" size="mini" prop="exhibitionSession">
            <el-select  placeholder="请选择" v-model="queryForm.exhibitionSession">
              <el-option label="全部" value=""></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展厅" size="mini" prop="">
            <el-select  placeholder="请选择" v-model="queryForm.exhibitionAreaCode">
              <el-option label="全部" value=""></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称" size="mini" prop="">
            <el-select  placeholder="请选择" v-model="queryForm.exhibitionAreaCode">
              <el-option label="全部" value=""></el-option>
              <el-option label="1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
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
      queryForm: {
        exhibitionNum: '',
        exhibitionSession: '',
        exhibitionAreaCode: ''
      },
      pageInfoData: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('exhibitionPosition', ['exhibitionPositionPlanData']),
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
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {

    },
    handleListQuery() { // 查询列表
      // this.getExhibitionPositionPlan(this.params);
    },
    routerPushPic() { // 查看展位图

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
    this.getExhibitionPositionPlan(this.params);
    // .then(res => {
    //   console.log(res, 'res');
    //   console.log(this.exhibitionPositionPlanData, 'exhibitionPositionPlanData');
    // });
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
