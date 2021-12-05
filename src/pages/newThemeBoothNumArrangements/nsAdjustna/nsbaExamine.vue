<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会查看展位安排结果" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionArea" @change="formChange" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品专区">
            <el-select v-model="formData.productType" class="widtwo" clearable>
              <el-option v-for="(item, index) in optspe" :key="index" :label="item.specialAreaName" :value="item.specialAreaCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.cecfCode" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formData.companyName" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="布展类型">
            <el-select v-model="formData.exhibitionType" class="widtwo" clearable>
              <el-option label="特装" value="SPECIAL_BOOTH"></el-option>
              <el-option label="统一布展" value="UNIFICATION_BOOTH"></el-option>
              <el-option label="标摊" value="STANDARD_BOOTH"></el-option>
              <el-option label="中央通道" value="CENTER_CHANNEL_BOOTH"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="产品专区" prop="productTypeName"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="cecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="布展类型" prop="exhibitionType">
            <template slot-scope="scope">
              {{scope.row.exhibitionType | suscstatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="原安排展位数" prop="beforePlanNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="调整展位数" prop="changeNumber">
            <template slot-scope="scope">
              {{scope.row.changeNumber | checkStatu}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="调整后展位数量" prop="planNumber">
            <template slot-scope="scope">
              {{scope.row.planNumber | checkStatu}}
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" size="small" @click="handDownload">下载</el-button>
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      obj: {
        current: "1",
        size: "10",
        coceralId: "06"
      },
      formData: {
        exhibitionArea: "",
        productType: "",
        cecfCode: "",
        companyName: "",
        exhibitionType: ""
      },
      tableData: [],
      optspe: [],
      addForm: {
        delegationSubId: "",
        authorizeStatus: ""
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      acredit: {
        recordId: "",
        authorizeStatus: ""
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      token: "",
      exhibitionArea: [], // 展区
      arr: [], // 新题材展区返回的数据
      activeName: "first"
    };
  },
  filters: {
    statusa(val) {
      if (val === "0") {
        return "未授权";
      } else if (val === "1") {
        return "已授权";
      }
    },
    suscstatus(val) {
      if (val === "SPECIAL_BOOTH") {
        return "特装";
      } else if (val === "UNIFICATION_BOOTH") {
        return "统一布展";
      } else if (val === "STANDARD_BOOTH") {
        return "标摊";
      } else if (val === "CENTER_CHANNEL_BOOTH") {
        return "中央通道";
      }
    },
    checkStatu(val) {
      if (val) {
        return parseInt(val);
      }
    }
  },
  created() {
    this.localstora.exhibitionArea = [];
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
    }
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
    // 展区
    this.getexhibitionArea().then(resa => {
      this.exhibitionArea = JSON.parse(JSON.stringify(resa));
      // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      // 新题材展区
      this.getexhibitionAreaDTOList().then(res => {
        this.arr = JSON.parse(JSON.stringify(res.records));
        this.arr.forEach((item, index, ar) => {
          if (item.isNewThemeArea) { // 是新题材
            for (let i = 0; i < this.exhibitionArea.length; i++) {
              if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                let exare = {
                  exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                  exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                };
                this.localstora.exhibitionArea.push(exare);
              }
            }
          }
        });
      });
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("thenewThemel", [
      "getcoceralWorkScheduleNumber" // 6.31 商协会查看新题材展位安排结果(展位数量调整)
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getexhibitionAreaDTOList" // 新题材展区
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getcoceralWorkScheduleNumber(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
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
        this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
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
    // 展区事件change
    formChange() {
      this.optspe = [];
      // 专区
      if (this.formData.exhibitionArea) {
        this.getexhibitionInfoByCode({ exhibitionAreaCode: this.formData.exhibitionArea }).then(res => {
          this.optspe = JSON.parse(JSON.stringify(res));
        }).catch(e => {});
      }
    },
    // 下载
    handDownload() {
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&companyName=${this.formData.companyName}&productType=${this.formData.productType}&cecfCode=${this.formData.cecfCode}&exhibitionType=${this.formData.exhibitionType}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/newthemeWorkScheduleNumber/coceral/download?current=" + url, "_parent");
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
  width: 300px;
}
.widtwo {
  width: 215px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
