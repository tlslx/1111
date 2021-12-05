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
        <el-button type="danger" size="small" class="formStyle" @click="addExhibition">公示</el-button>
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
      <!-- 公示/公布 -->
      <el-dialog title="公示" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="400px">
        <el-form :model="publishedForm" ref="publishedForm" :rules="publishRules" size="small" label-width="150px">
          <el-form-item label="发布至：" prop="publishWay">
            <el-checkbox-group v-model="publishedForm.publishWay">
              <div v-for="(item, index) in publishedGoOpts" :key="index">
                <el-checkbox :label="item" @change="handleChange"></el-checkbox><br>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="附件：">
            <el-button type="primary" size="medium">选取文件</el-button>
          </el-form-item>
        </el-form>
        <div class="closCenter">
          <el-button type="primary" size="medium" @click="submitPublish('publishedForm')">确认</el-button>
          <el-button type="info" size="medium" @click="isExhibit = false;">取消</el-button>
        </div>
      </el-dialog>
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
      isExhibit: false, // 新增弹框的显示隐藏
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
    this.localstora.exhibitionArea = [];
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
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("thenewThemel", [
      "getpublicityWorkScheduleNumber", // 7.234 公布后调整方案公示(展位数量公示管理)get获取
      "updatepublicityWorkScheduleNumber" // 7.234 公布后调整方案公示(展位数量公示管理)post公示
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
      this.getpublicityWorkScheduleNumber(Url)
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
      window.open(process.env.API_NA_URL + "/api/newthemeWorkScheduleNumber/publicity/download?current=" + url, "_parent");
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
    // 公示 change 事件
    handleChange() {
      // console.log(this.publishedForm, "publishedForm");
    },
    // 公示 确认
    submitPublish(fname) {
      this.$refs[fname].validate((valid) => {
        if (valid) {
          let publishparm = {
            current: 1,
            size: this.paginationData.total
          };
          this.getpublicityWorkScheduleNumber(publishparm)
          .then(res => {
            let parmdat = [];
            for (let i = 0; i < res.records.length; i++) {
              let pada = {
                demandRecordId: res.records[i].demandRecordId
              };
              parmdat.push(pada);
            }
            this.updatepublicityWorkScheduleNumber(parmdat).then(resa => {
              this.isExhibit = false;
              this.$message({
                message: "公示成功",
                type: "success"
              });
              this.getListPage(this.obj); // 调用初始加载页面方法
            }).catch(e => {
              this.$message({
                message: "已全部公示",
                type: "error"
              });
            });
          })
          .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 公示 按钮
    addExhibition() {
      this.isExhibit = true;
    },
    // 表格勾选时的事件
    handleSelectionChange(val) {
      this.saveScheme = [];
      if (val.length === 0) {
        this.saveScheme = [];
      } else {
        for (let i = 0; i < val.length; i++) {
          this.saveScheme.push(val[i].intentId);
        }
      }
    },
    // 是否禁用复选框事件
    // selecta(row, index) {
    //   if (row.otherDelegationConfirm === "3" || row.otherDelegationConfirm === "2") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
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


