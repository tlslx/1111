<template>
  <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="交易团特定展位申报" name="first" v-loading.fullscreen="fullLoading"> -->
  <el-card style="padding-bottom: 24px">
    <!-- 表单 -->
    <el-form :inline="true" :model="formData" size="small">
      <el-form-item label="交易团">
        <el-select v-model="formData.delegationId" clearable>
          <el-option
            v-for="(item, index) in localstora.delegation"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="届数">
        <el-select v-model="formData.exhibitionSession" clearable>
          <el-option
            v-for="(item, index) in optionDelegation"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期数">
        <el-select v-model="formData.exhibitionPeriod" clearable>
          <el-option
            v-for="(item, index) in optionExhibition"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区">
        <el-select v-model="formData.exhibitionAreaCode" clearable>
          <el-option
            v-for="(item, index) in localstora.exhibitionArea"
            :key="index"
            :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="模板类型">
        <el-select v-model="formData.demandType" clearable>
          <el-option label="通用" value="ORDINARY"></el-option>
          <el-option label="铁石水疗" value="IRONSPA"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="申报项目">
        <el-select clearable v-model="formData.demandName" placeholder="请选择">
          <el-option v-for="(item, index) in demandNameOpts" :key="index" :label="item.demandName" :value="item.demandName"></el-option>
        </el-select>
        <!-- <el-input v-model.trim="formData.demandName" style="width: 215px" clearable></el-input> -->
      </el-form-item>
      <el-form-item class="floatRight">
        <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" size="small" border>
      <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
      <el-table-column align="center" min-width="120" label="申报项目" prop="demandName"></el-table-column>
      <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
      <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
        <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
      <el-table-column align="center" min-width="120" label="专区" prop="specialAreaName">
      </el-table-column>
      <el-table-column align="center" min-width="120" label="申报展位数" prop="boothNumber">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editTableData" ref="refedit" label-width="0px" :rules="editRule">
              <el-form-item prop="boothNumber">
                <el-input v-model.trim.number="editTableData.boothNumber" maxlength="2"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.boothNumber}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" min-width="120" label="模板类型" prop="demandType">
        <template slot-scope="scope">{{scope.row.demandType | checktus}}</template>
      </el-table-column> -->
      <!-- <el-table-column align="center" min-width="120" label="广交会编码" prop="companyCecfCode"></el-table-column>
      <el-table-column align="center" min-width="120" label="企业名称" prop="companyCn"></el-table-column> -->
      <el-table-column align="center" min-width="160" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
          <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
          <el-button type="text" @click="onDele(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 一堆按钮 -->
    <div class="paginationTop floatLeft">
      <!-- <el-button type="primary" size="small" class="formStyle">打印</el-button> -->
      <el-button type="primary" size="small" class="formStyle" @click="handleDownload">下载</el-button>
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
    <!-- </el-tab-pane>
  </el-tabs> -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
        return callback(new Error("必须大于等于0"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        current: 1,
        size: 10
      },
      ogod: {
        // "boothType": "1",
        // "delegationCode": "140",
        // "delegationId": "140",
        // "exhibitionAreaCode": "KITCHEN",
        // "exhibitionPeriod": "3"
        delegationId: "010",
        exhibitionAreaCode: "HD06",
        exhibitionPeriod: "3"
      },
      demandNameOpts: [],
      gcibd: {
        delegationId: "140"
      },
      editForm: {},
      editTableData: { boothNumber: "" },
      lastIndexPage: "",
      currency: true, // 通用
      // demandType: "ORDINARY", // 模板类型
      ironspa: "铁石装饰品/水疗",
      optspe: [],
      comccc: [], // 广交会编码
      dialogVisible: false,
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      // 表单绑定数据
      formData: {
        delegationId: "", // 交易团id
        demandName: "", // 申报名称
        exhibitionSession: "", // 届数
        exhibitionPeriod: "", // 期数
        exhibitionAreaCode: "", // 展区
        demandType: ""
      },
      // 表单规则
      rules: {
        demandName: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        exhibitionPeriod: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        exhibitionArea: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        exhibitionAreaCode: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        boothNumber: [{ validator: tynum, required: true, trigger: "change" }],
        companyCecfCode: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        companyCn: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        initialNumber: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        specialArea: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        specialAreaCode: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ]
      },
      // 编辑表单规则
      editRule: {
        boothNumber: [{ validator: tynum, required: true, trigger: "change" }]
      },
      // 新增时的表单数据
      addForm: {
        demandType: "ORDINARY",
        boothNumber: ""
      },
      // 届数
      optionDelegation: [],
      // 期数
      optionExhibition: [
        { label: "第一期", value: "1" },
        { label: "第二期", value: "2" },
        { label: "第三期", value: "3" }
      ],
      // 表格数据
      tableData: [],
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      fullLoading: false,
      activeName: "first"
    };
  },
  filters: {
    checktus(val) {
      switch (val) {
        case "IRONSPA":
          return "铁石水疗";
        case "ORDINARY":
          return "通用";
        default:
          return "其他";
      }
    },
    nper(data) {
      if (data === "1") {
        return "第一期";
      } else if (data === "2") {
        return "第二期";
      } else if (data === "3") {
        return "第三期";
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      this.ogod.delegationId = this.$store.getters.userInfo.org.deptId;
      this.gcibd.delegationId = this.$store.getters.userInfo.org.deptId;
      // this.obj.delegationCode = "456A4";
      // this.ogod.delegationId = "456A4";
      // this.gcibd.delegationId = "456A4";
    }
    //获取申报名称
    this.getlistOrdinaryDemand({ current: 0, size: 10, delegationId: this.$store.getters.userInfo.org.deptId, delegationName: this.$store.getters.userInfo.org.deptName, openStatus: "1" }).then(res => {
      let demData = JSON.parse(JSON.stringify(res));
      this.demandNameOpts = demData.records;
    });
    // this.usInfo = this.$store.getters.userInfo;
    // console.log(this.usInfo.org.deptId, "userinfo");
  },
  mounted() {
    this.getsysExhibitions().then(res => {
      // this.optionDelegation = JSON.parse(JSON.stringify(res.data));
      for (let i = 0; i < res.data.length; i++) {
        this.optionDelegation.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.optionDelegation = this.optionDelegation.sort(rul);
    });
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // this.getinitialOrdinaryDemand(this.ogod);
    this.getcompanyInfoByDeleId(this.gcibd)
      .then(res => {
        this.comccc = [];
        for (let i = 0; i < res.length; i++) {
          let gjhbm = {
            text: res[i].cantonCode,
            value: res[i].cantonCode
          };
          this.comccc.push(gjhbm);
        }
      })
      .catch(e => {});
      // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("specificAreaboothTradegroup", [
      "getinitDem", // 2.1获取各交易团各展区已申报基数内展位数
      "getCibd" // 根据交易团Id查询交易团下属企业id，名称，广交会编码
    ]),
    ...mapGetters("dictData", ["dictionaryData"]),
    addnum() {
      return (
        Number(this.getinitDem.initialNumber) + Number(this.addForm.boothNumber)
      );
    }
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "getlistOrdinaryDemand",
      "getinitialOrdinaryDemand", // 2.1获取各交易团各展区已申报基数内展位数
      "addordinaryDemandRecord", // 2.2交易团特定展位申报
      "getlistOrdinaryDemandRecord", // 2.3获取交易团申报特定展位列表
      "editordinaryDemandRecord", // 2.4编辑交易团申报特定展位信息
      "deleordinaryDemandRecord", // 2.5删除交易团申报的特定展位信息
      "getcompanyInfoByDeleId", // 根据交易团Id查询交易团下属企业id，名称，广交会编码
      "getoneTemplate" // 2根据交易团Id查询模板
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getsysExhibitions" // 获取所有展届信息
    ]),
    // 获取页面数据 ok
    getListPage(Url) {
      this.$http.get(`${process.env.API_NA_URL}/api/ordinaryDemandRecord/specialBooth/getTotalListPage`, Url)
      //this.getlistOrdinaryDemandRecord(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = getTable;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
        })
        .catch(e => {});
    },
    // 下载
    handleDownload() {
      let url = `delegationId=${this.formData.delegationId}&exhibitionPeriod=${this.formData.exhibitionPeriod}&exhibitionAreaCode=${this.formData.exhibitionAreaCode}&demandType=${this.formData.demandType}&demandName=${this.formData.demandName}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/ordinaryDemandRecord/specialBooth/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 查询
    onSearch() {
      this.obj = {
        current: 1,
        size: 10
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
    // change事件addform 通用
    afbootype() {
      if (this.addForm.demandType === "IRONSPA") {
        this.currency = false;
        this.addForm.exhibitionAreaCode = "HD06";
        this.addForm.boothNumber = "";
        this.addForm.initialNumber = this.getinitDem.initialNumber;
      } else if (this.addForm.demandType === "ORDINARY") {
        this.currency = true;
        this.addForm.exhibitionAreaCode = "";
        this.addForm.boothType = "";
      }
    },
    // 新增展区事件change
    addexha() {
      this.optspe = [];
      // 专区
      if (this.addForm.exhibitionAreaCode) {
        this.getexhibitionInfoByCode({ exhibitionAreaCode: this.addForm.exhibitionAreaCode }).then(res => {
          this.optspe = JSON.parse(JSON.stringify(res));
        }).catch(e => {});
      }
    },
    // change事件addForm 铁石水疗
    tssl() {
      if (this.addForm.boothType === "铁石装饰品") {
        this.ironspa = "铁石装饰品";
      } else if (this.addForm.boothType === "户外水疗设施") {
        this.ironspa = "水疗";
      }
    },
    // 广交会编码的change事件
    compcfc() {
      for (let key in this.getCibd) {
        if (this.addForm.companyCecfCode === this.getCibd[key].cantonCode) {
          this.addForm.companyCn = this.getCibd[key].companyNameCh;
        }
      }
    },
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editForm = val;
        this.editTableData.boothNumber = val.boothNumber;
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      this.editForm["delegationName"] = val.delegationName;
      // this.editForm["delegationCode"] = this.obj.delegationCode;
      // this.editForm["delegationId"] = val.delegationId;
      for (let key in this.localstora.delegation) {
        if (
          this.localstora.delegation[key].deptName === val.delegationName
        ) {
          this.editForm["delegationId"] = this.localstora.delegation[key].deptId;
          this.editForm["delegationCode"] = this.localstora.delegation[key].deptCode;
        }
      }
      this.editForm.boothNumber = this.editTableData.boothNumber;
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.editordinaryDemandRecord(this.editForm)
            .then(res => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["edit"] = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 删除
    onDele(val) {
      // let intId = {
      //   demandId: val.demandId,
      //   delegationRangeId: val.delegationRangeId,
      //   areaRangeId: val.areaRangeId
      // };
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleordinaryDemandRecord(val)
            .then(res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击新增
    newAdd() {
      this.dialogVisible = true;
      this.getinitialOrdinaryDemand(this.ogod);
      this.addForm = {
        demandType: "ORDINARY",
        boothNumber: ""
      };
    },
    // 撤回
    revocation() {},
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
.addstyle {
  margin: 20px 0;
}
.wid {
  width: 406px;
}
.divp {
  margin: 20px 50px;
  text-align: center;
}
</style>
