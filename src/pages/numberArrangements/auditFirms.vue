<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="交易团审核企业基本信息" name="first">
    <!-- form表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="企业名称">
          <el-input v-model.trim="formData.companyName" maxlength="24" class="wInSe"></el-input>
        </el-form-item>
        <el-form-item label="交易团">
          <el-input v-model.trim="formData.dealClusterName" maxlength="24" class="wInSe"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model.trim="formData.region" maxlength="24" class="wInSe"></el-input>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData.exhibitionArea" class="wInSe" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input v-model.trim="formData.cantonFairCode" maxlength="24" class="wInSe"></el-input>
        </el-form-item>
        <el-form-item label="审核情况">
          <el-select v-model="formData.checkStatus" class="wInSe" placeholder="请选择" clearable>
            <el-option label="请选择" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 50px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- tabel表格 -->
      <el-table :data="tableData" border  v-loading.fullscreen="fullLoading" style="width: 100%">
        <el-table-column align="center" prop="cantonFairCode" label="广交会编码"></el-table-column>
        <el-table-column align="center" prop="companyName" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="exhibitionAreaName" label="申请展区"></el-table-column><!-- 待定 -->
        <el-table-column align="center" prop="applyBoothNumber" label="申请展位数量"></el-table-column>
        <el-table-column align="center" prop="region" label="区域"></el-table-column>
        <el-table-column align="center" prop="dealClusterName" label="交易团"></el-table-column>
        <el-table-column align="center" prop="checkStatus" label="审核情况">
          <template slot-scope="scope">
            {{scope.row.checkStatus | tranStatus}}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="审核详情">
          <template slot-scope="scope">
            <span style="color: #0f0; cursor: pointer;" @click="dialogVisible = true">查看</span>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="scope.row.checkStatus !== '0'" @click="handelCheck(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination
            style="margin-top: 5px;"
            background
            layout="total, prev, pager, next, jumper"
            :total="paginationData.total"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :pager-count="paginationData.pagerCount"
            :page-size="paginationData.pageSize">
          </el-pagination>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullLoading: true,
      obj: {
        "pageIndex": 1,
        "pageSize": 10
      },
      objOne: {
        "customQueryParams": [
        ],
        "pageIndex": 1,
        "pageSize": 10  
      },
      localstora: {
        exhibitionArea: [] // 展区
      },
      dialogVisible: false,
      activeName: "first",
      isShow: false,
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      tableData: [],
      formData: {
        'companyName': "",
        'dealClusterName': "",
        'region': "",
        'exhibitionArea': "",
        'cantonFairCode': "",
        'checkStatus': ""
      }
    };
  },
  filters: {
    tranStatus(value) {
      let val = value - 0;
      if (val === 0) {
        return "未审核";
      } else if (val === 1) {
        return "审核通过";
      } else {
        return "审核不通过";
      }
    }
  },
  mounted() {
    this.getList(this.obj);
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("tradeGroupAudit", ["getqueryEnterpriseBrand"]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    // handleSizeChange(val) {
    //   this.obj["pageSize"] = val;
    //   this.getList(this.obj);
    // },
    handleCurrentChange(val) {
      this.objOne["pageIndex"] = val;
      this.getList(this.objOne);
    },
    handelCheck(val) {
      this.$router.push({ path: "/basicInformation", query: { dataType: val }});
    },
    handelAdd() {
      this.isShow = true;
    },
    handelServe() {
      this.isShow = false;
    },
    getList(url) {
      // 获取页面数据
      this.tableData = [];
      let getUrl = encodeURI(JSON.stringify(url));
      this.getqueryEnterpriseBrand(getUrl).then(res => {
        this.fullLoading = false;
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
        this.tableData = JSON.parse(JSON.stringify(res.records));
      }).catch(e => {});
    },
    onSubmit() {
      // 查询
      this.tableData = [];
      this.objOne = {
        "customQueryParams": [
        ],
        "pageIndex": 1,
        "pageSize": 10  
      };
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        if (this.formData[key[i]] !== "" && this.formData[key[i]] != null) {
          let aFist = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [
              this.formData[key[i]]
            ],
            "description": ""
          };
          this.objOne.customQueryParams.push(aFist);
        } else { 
          // console.log(1);
        }
      }
      this.getList(this.objOne);
    }
    // }
  }
};
</script>
<style scoped>
.wInSe{
  width: 210px;
}
</style>



