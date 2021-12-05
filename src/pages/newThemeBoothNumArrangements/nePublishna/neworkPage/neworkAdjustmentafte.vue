<template>
  <div v-loading.fullscreen="fullLoading">
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
        <el-form-item label="交易团">
          <el-select v-model="formData.delegationId" class="widtwo" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
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
        <el-form-item label="产品专区">
          <el-select v-model="formData.productType" class="widtwo" clearable>
            <el-option
              v-for="(item, index) in optspe"
              :key="index"
              :label="item.specialAreaName"
              :value="item.specialAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
         
        border
        size="small"
      >
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="产品专区" prop="productTypeName"></el-table-column>
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" min-width="120" label="原布展类型" prop="beforeExhibitionType">
          <template slot-scope="scope">{{scope.row.beforeExhibitionType | status}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="调整后布展类型" prop="exhibitionType">
          <template slot-scope="scope">{{scope.row.exhibitionType | status}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="原安排展位数" prop="beforePlanNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="调整后展位数" prop="planNumber"></el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <!-- <el-button type="danger" class="formStyle" @click="addExhibition">公布</el-button> -->
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
  </div>
</template>
<script>
// import Bus from "./bus.js";
import { mapActions, mapGetters } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      obj: {
        current: 1,
        size: 10
      },
      formData: {
        exhibitionArea: "",
        delegationId: "",
        companyName: "",
        exhibitionType: "",
        productType: ""
      },
      isExhibit: false, // 新增弹框的显布隐藏
      localstora: {
        exhibitionArea: [],
        delegation: []
      }, // 数据字典
      addForm: {
        delegationCode: "",
        inExhibitionArea: "",
        inExhibitionAreaCode: "",
        outExhibitionArea: "",
        outExhibitionAreaCode: "",
        exchangeNumber: ""
      },
      publishedForm: {
        publishWay: []
      },
      publishedGoOpts: ['广交会官网', '内部管理系统', '易捷通系统'],
      publishRules: {
        publishWay: [{ required: true, message: '请选择至少一项发布渠道', trigger: 'change' }]
      },
      isShow: false, // 发布弹框
      fullLoading: true, // 加载
      // shadow: true,
      lastIndexPage: "", // 上一个编辑的id
      intId: {
        intentId: ""
      }, // 删除参数
      saveScheme: [],
      usInfo: {}, // 用户信息
      // 表格数据
      tableData: [
        {
          exhibitionPeriod: "",
          boothTotal: "",
          supportTotle: ""
        }
      ],
      tableDataedit: [],
      dpara: {},
      optspe: [],
      // str: "",
      // stra: "",
      token: "",
      exhibitionArea: [], // 展区
      arr: [], // 新题材展区返回的数据
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      }
    };
  },
  filters: {
    status(val) {
      if (val === "SPECIAL_BOOTH") {
        return "特装";
      } else if (val === "UNIFICATION_BOOTH") {
        return "统一布展";
      } else if (val === "STANDARD_BOOTH") {
        return "标摊";
      } else if (val === "CENTER_CHANNEL_BOOTH") {
        return "中央通道";
      }
    }
  },
  created() {
    this.obj = {
      current: "1",
      size: "10"
    };
    this.localstora.exhibitionArea = [];
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
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
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // this.shadow = true;
    // let mate = this.$store.getters.userInfo.org.deptName;
    // this.str = mate.substring(mate.length - 2, mate.length);
    // this.stra = mate.substring(mate.length - 3, mate.length);
    // if (this.str === "协会") {
    //   this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
    // } else if (this.stra === "交易团") {
    //   this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
    //   this.formData.delegationId = this.$store.getters.userInfo.org.deptId;
    //   this.shadow = false;
    // }
    this.getListPage(this.obj);
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("thenewThemel", [
      "getpublishWorkScheduleNumber", // 8.234 公布后调整方案公布(展位数量公布管理)get获取
      "updatepublishWorkScheduleNumber" // 8.234 公布后调整方案公布(展位数量公布管理)post公布
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getexhibitionAreaDTOList" // 新题材展区
    ]),
    // 获取页面数据 ok
    getListPage(Url) {
      this.tableData = [];
      this.getpublishWorkScheduleNumber(Url)
        .then(res => {
          this.fullLoading = false;
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.size = res.size;
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询 ok
    onSearch() {
      this.obj = {
        current: "1",
        size: "10"
      };
      // if (this.str === "协会") {
      //   this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
      // } else if (this.stra === "交易团") {
      //   this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
      // }
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
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&delegationId=${this.formData.delegationId}&exhibitionType=${this.formData.exhibitionType}&productType=${this.formData.productType}&companyName=${this.formData.companyName}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/newthemeWorkScheduleNumber/publish/download?current=" + url, "_parent");
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
.widtwo {
  width: 215px;
}
.closCenter {
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
</style>


