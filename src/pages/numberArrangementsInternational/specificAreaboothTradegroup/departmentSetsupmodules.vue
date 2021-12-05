<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="设置模板" name="first" v-loading.fullscreen="fullLoading">
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
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionArea" clearable @change="exhspe">
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
              <!-- <el-option label="铁石水疗" value="HD06"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="专区">
            <el-select v-model="formData.specialArea" clearable>
              <el-option
                v-for="(item, index) in optionS"
                :key="index"
                :label="item.specialAreaName"
                :value="item.specialAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申报类型">
            <el-select v-model="formData.demandType" clearable>
              <el-option label="通用" value="ORDINARY"></el-option>
              <el-option label="铁石水疗" value="IRONSPA"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位类别">
            <el-select v-model="formData.boothType" clearable>
              <el-option label="一般性展位" value="1"></el-option>
              <el-option label="中央通道展位" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="申报名称" prop="demandName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="专区" prop="specialAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展位类别" prop="boothType">
            <template slot-scope="scope">{{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
            <template slot-scope="scope">
              {{scope.row.exhibitionPeriod | nper}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="申报交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="申报类型" prop="demandType">
            <template slot-scope="scope">
              {{scope.row.demandType | checktus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="申报展位填写规则" prop="inputRule"></el-table-column>
          <el-table-column align="center" min-width="120" label="是否启用" prop="openStatus">
            <template slot-scope="scope">
              {{scope.row.openStatus === "1" ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onEdit(scope.row)"
              >编辑</el-button>
              <el-button type="text" @click="handele(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" size="small" class="formStyle" @click="addae">新增</el-button>
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
        <!-- 新增/编辑弹框 -->
        <el-dialog :title="addtit" :visible.sync="isExhibit" v-if="isExhibit" :close-on-click-modal="false" width="500px" @close="closeae">
          <el-form :model="addForm" :rules="rules" ref="ruleForm" size="small" label-width="160px">
            <el-form-item label="启用 ：">
              <el-checkbox v-model="addForm.openStatus" true-label="1" false-label="0"></el-checkbox>
            </el-form-item>
            <el-form-item label="申报名称 ：" prop="demandName" class="addstyle">
              <el-input v-model.trim="addForm.demandName" class="wid" clearable></el-input>
            </el-form-item>
            <el-form-item label="申报类型 ：" prop="demandType" class="addstyle">
              <el-select v-model="addForm.demandType" clearable @change="aedemandt"  class="wid">
                <el-option label="通用" value="ORDINARY"></el-option>
                <el-option label="铁石水疗" value="IRONSPA"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展区 ：" prop="exhibitionArea" class="addstyle">
              <el-select v-model="addForm.exhibitionArea" class="wid" clearable @change="addexha">
                <el-option
                  v-for="(item, index) in exhibitionAreaOption"
                  v-show="!isShow"
                  :key="index"
                  :label="item.exhibitionAreaName"
                  :value="item.exhibitionAreaCode"
                ></el-option>
                <el-option v-show="isShow" label="铁石水疗" value="HD06"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专区 ：" prop="specialArea" class="addstyle">
              <el-select v-model="addForm.specialArea" class="wid" clearable>
                <el-option
                  v-for="(item, index) in optspe"
                  :key="index"
                  :label="item.specialAreaName"
                  :value="item.specialAreaCode"
                ></el-option>
                <!-- <el-option v-show="isShow" label="户外水疗设施" value="1"></el-option>
                <el-option v-show="isShow" label="铁石装饰品" value="2"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="展位类别 ：" prop="boothType" class="addstyle">
              <el-select v-model="addForm.boothType" clearable class="wid">
                <el-option v-show="isShow" label="一般性展位" value="1"></el-option>
                <el-option v-show="!isShow" label="中央通道展位" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期数 ：" prop="exhibitionPeriod" class="addstyle">
              <el-select v-model="addForm.exhibitionPeriod" clearable class="wid">
                <el-option v-show="isShow" label="第一期" value="1"></el-option>
                <el-option v-show="isShow" label="第二期" value="2"></el-option>
                <el-option label="第三期" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申报交易团 ：" prop="delegationId" class="addstyle">
              <el-select v-model="addForm.delegationId" clearable class="wid">
                <el-option
                  v-for="(item, index) in localstora.delegation"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申报展位填写规则 ：" prop="inputRule" class="addstyle">
              <el-input v-model.trim.number="addForm.inputRule" class="wid" maxlength="2"></el-input>
            </el-form-item>
            <div class="acentsty">
              <el-button type="primary" @click="addSubmit('ruleForm')">保存</el-button>
              <el-button @click="handcancle">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
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
      formData: {
        delegationId: "",
        exhibitionArea: "",
        specialArea: "",
        demandType: "",
        boothType: ""
      },
      isExhibit: false,
      checked: true, // 默认启用
      isSeave: true, // 新增保存时候使用
      addtit: "新增",
      optionS: [], // 专区
      optspe: [], // 专区 add
      isShow: false, // 通用与水疗
      addForm: {
        demandName: "",
        openStatus: "1",
        demandType: "",
        exhibitionArea: "",
        specialArea: "",
        boothType: "",
        exhibitionPeriod: "",
        delegationId: "",
        inputRule: "",
        businessType: "2",
        isCpName: ""
      },
      rules: {
        demandName: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        demandType: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        exhibitionArea: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        specialArea: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        boothType: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        exhibitionPeriod: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        delegationId: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        inputRule: [
          { validator: tynum, required: true, trigger: "change" }
        ]
      },
      fullLoading: false,
      tableData: [],
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [] // 交易团
      },
      exhibitionAreaOption: [], // 展区无铁石
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
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
  mounted() {
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // this.getexhibitionInfoByCode();
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      this.exhibitionAreaOption = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < this.exhibitionAreaOption.length; i++) {
        if (this.exhibitionAreaOption[i].exhibitionAreaCode === "HD06") {
          this.exhibitionAreaOption.splice(i, 1);
        }
      }
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // for (let i = 0; i < this.localstora.exhibitionArea.length; i++) {
    //   if (this.localstora.exhibitionArea[i].exhibitionAreaCode === "HD06") {
    //     delete this.localstora.exhibitionArea[i];
    //   }
    // }
  },
  computed: {
    ...mapGetters("specificAreaboothTradegroup", [
      "getexIbc", // 专区字典
      "getlistDem" // 1.2获取工作部设置模板列表
    ]),
    ...mapGetters("dictData", [
      "dictionaryData"
    ])
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "addordinaryDemand", // 1.1新增工作部设置模板
      "getlistOrdinaryDemand", // 1.2获取工作部设置模板列表 ok
      "editordinaryDemand", // 1.3编辑工作部设置模板
      "deleordinaryDemand", // 1.4删除工作部设置模板
      "getexhibitionInfoByCode" // 专区的数据字典
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistOrdinaryDemand(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {});
    },
    // 查询
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
    // 展区的change事件search
    exhspe() {
      this.optionS = [];
      if (this.formData.exhibitionArea) {
        this.getexhibitionInfoByCode({ exhibitionAreaCode: this.formData.exhibitionArea }).then(res => {
          this.optionS = JSON.parse(JSON.stringify(res));
        }).catch(e => {});
      }
    },
    // 新增的展区change事件
    addexha() {
      this.optspe = [];
      if (this.addForm.exhibitionArea !== "HD06" && this.addForm.demandType === "ORDINARY") {
        if (this.addForm.exhibitionArea) {
          this.getexhibitionInfoByCode({ exhibitionAreaCode: this.addForm.exhibitionArea }).then(res => {
            this.optspe = JSON.parse(JSON.stringify(res));
          }).catch(e => {});
        }
      } else if (this.addForm.exhibitionArea === "HD06" && this.addForm.demandType === "IRONSPA") {
        this.optspe = [
          { specialAreaName: "户外水疗设施", specialAreaCode: "1" },
          { specialAreaName: "铁石装饰品", specialAreaCode: "2" }
        ];
      }
    },
    // 新增申报类型的change事件
    aedemandt() {
      if (this.addForm.demandType === "ORDINARY") {
        this.isShow = false;
        this.addForm.boothType = "";
        this.addForm.exhibitionPeriod = "";
        this.addForm.exhibitionArea = "";
        this.addForm.specialArea = "";
      } else {
        this.isShow = true;
        this.addForm.boothType = "";
        this.addForm.exhibitionPeriod = "";
        this.addForm.exhibitionArea = "";
        this.addForm.specialArea = "";
      }
    },
    // 编辑
    onEdit(val) {
      this.isExhibit = true;
      this.addtit = "编辑";
      this.addForm = val;
      this.isSeave = true;
    },
    // 新增
    addae() {
      this.isExhibit = true;
      this.addtit = "新增";
      this.isSeave = true;
    },
    // 新增/编辑 =》 保存 未完成
    addSubmit(fname) {
        // 展区/交易团
      for (let key in this.localstora.delegation) {
        if (
          this.localstora.delegation[key].deptId === this.addForm.delegationId
        ) {
          this.addForm["delegationName"] = this.localstora.delegation[key].deptName;
        }
      }
      for (let key in this.localstora.exhibitionArea) {
        if (
          this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.exhibitionArea
        ) {
          this.addForm["exhibitionAreaName"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
        }
      }
      if (this.addForm.exhibitionArea === "HD06") {
        this.addForm["exhibitionAreaName"] = "铁石水疗";
      }
      // 专区
      for (const key in this.optspe) {
        if (this.addForm.specialArea === this.optspe[key].specialAreaCode) {
          this.addForm["specialAreaName"] = this.optspe[key].specialAreaName;
        }
      }
      // 是否输入企业名称
      if (this.addForm.demandType === "1") {
        this.addForm.isCpName = "1";
        // 申报名称
        // this.addForm["demandName"] = "铁石水疗";
      } else {
        this.addForm.isCpName = "0";
        // 申报名称
        // this.addForm["demandName"] = "通用";
      }
      // 展届 ???
      // this.addForm["exhibitionSessioin"] = "123";
      if (this.isSeave) {
        this.$refs[fname].validate((valid) => {
          if (valid) {
            this.isSeave = false;
            if (this.addtit === "编辑") {
              this.editordinaryDemand(this.addForm).then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.isExhibit = false;
                this.getListPage(this.obj);
                for (let key in this.addForm) {
                  this.addForm[key] = "";
                }
                this.addForm.businessType = "2";
              }).catch(e => {});
            } else {
              // 新增
              this.addordinaryDemand(this.addForm).then(res => {
                this.isExhibit = false;
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.getListPage(this.obj);
                for (let key in this.addForm) {
                  this.addForm[key] = "";
                }
                this.addForm.openStatus = "1";
                this.addForm.businessType = "2";
              }).catch(e => {});
            }
          } else {
            return false;
          }
        });
      }
      // }
    },
    // 关闭弹框
    closeae() {
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
      this.addForm.openStatus = "1";
      this.addForm.businessType = "2";
      this.getListPage(this.obj);
    },
    // 取消 新增/编辑
    handcancle() {
      this.isExhibit = false;
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
      this.addForm.openStatus = "1";
      this.addForm.businessType = "2";
      this.getListPage(this.obj);
    },
    // 删除
    handele(val) {
      let intId = {
        demandId: val.demandId,
        delegationRangeId: val.delegationRangeId,
        areaRangeId: val.areaRangeId
      };
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleordinaryDemand(intId)
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
  margin:20px 0;
}
.wid {
  width: 250px;
}
.acentsty {
  text-align: center;
  padding: 20px;
}
</style>
