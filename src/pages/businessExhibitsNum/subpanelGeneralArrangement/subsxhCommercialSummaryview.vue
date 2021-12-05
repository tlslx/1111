<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会一般性展位数量方案汇总查看" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <!-- <el-form-item label="交易团">
            <el-select v-model="formData.delegationId" class="wid" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.companyCecfCode" clearable class="wid"></el-input>
            <!-- <el-select v-model="formData.companyCecfCode" class="wid" clearable>
              <el-option v-for="(item, index) in optioncode" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionAreaCode" class="wid" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formData.companyName" clearable class="wid"></el-input>
          </el-form-item>
          <!-- <el-form-item label="展位类型">
            <el-select v-model="formData" clearable>
              <el-option label value></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="布展类型">
            <el-select v-model="formData" clearable>
              <el-option label value></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="companyCecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业中文名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="海关编码" prop="customsCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="联系人" prop></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="申请数量" prop="boothNumber">
            <template slot-scope="scope">
              {{scope.row.boothNumber | paStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排特装数" prop="recommendSpecial">
            <template slot-scope="scope">
              {{scope.row.recommendSpecial | paStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排标摊数" prop="recommendStandard">
            <template slot-scope="scope">
              {{scope.row.recommendStandard | paStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排统一布展数" prop="recommendUnified">
            <template slot-scope="scope">
              {{scope.row.recommendUnified | paStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排卡车通道数" prop="recommendCentralchannel">
            <template slot-scope="scope">
              {{scope.row.recommendCentralchannel | paStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排总数" prop="recommendSumNumber">
            <template slot-scope="scope">
              {{scope.row.recommendSumNumber | paStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="申请粘连展位数量" prop="applyAdjoinNumber"></el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" size="small" class="formStyle" @click="handDownload">下载</el-button>
        </div>
        <!-- 分页 -->
        <div class="floatRight paginationTop">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="paginationData.pageSizes"
            :current-page="paginationData.currentPage"
            :pager-count="paginationData.pagerCount"
            :page-size="paginationData.pageSize"
          ></el-pagination>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      obj: {
        current: 1,
        size: 10,
        coceralId: "06"
      },
      formData: {
        delegationId: "",
        companyCecfCode: "",
        exhibitionAreaCode: ""
      },
      tableData: [],
      addForm: {},
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      optioncode: [],
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      token: "",
      activeName: "first"
    };
  },
  filters: {
    paStatus(val) {
      return parseInt(val);
    }
  },
  mounted() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.coceralId = this.$store.getters.userInfo.org.deptId;
      // this.obj.coceralName = this.$store.getters.userInfo.org.deptName;
    }
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "getlistPageRecommendCompany" // 商协会一般性展位数量方案汇总查看
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistPageRecommendCompany(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            let aopt = {
              label: getTable[i].companyCecfCode,
              value: getTable[i].companyCecfCode
            };
            this.optioncode.push(aopt);
          }
          let hash = {};
          this.optioncode = this.optioncode.reduce(function(item, next) {
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item;
          }, []);
          for (let i = 0; i < this.optioncode.length; i++) {
            if (this.optioncode[i].value === "" || this.optioncode[i].value == null) {
              this.optioncode.splice(i, 1);
            }
          }
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        coceralId: "06"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.coceralId = this.$store.getters.userInfo.org.deptId;
        // this.obj.coceralName = this.$store.getters.userInfo.org.deptName;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 下载
    handDownload() {
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&companyCecfCode=" + this.formData.companyCecfCode + "&delegationId=" + this.formData.delegationId + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode + "&coceralId=" + this.obj.coceralId + "&token=" + this.token;
      window.open(process.env.API_NA_URL + "/api/ordinaryRecommendCompany/coceral/download?current=" + url, "_parent");
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>

<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 220px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
