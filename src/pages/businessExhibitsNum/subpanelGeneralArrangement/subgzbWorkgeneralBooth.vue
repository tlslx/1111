<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工作部查看修改安排方案" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
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
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionAreaCode" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.companyCecfCode" clearable class="widtwo"></el-input>
            <!-- <el-select v-model="formData.companyCecfCode" class="widtwo" clearable>
              <el-option v-for="(item, index) in optioncode" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="formData.companyName" clearable class="widtwo"></el-input>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" size="small" style="width: 100%" border>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="companyCecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业中文名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
            <template slot-scope="scope">
              {{scope.row.exhibitionPeriod | exhiPer}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="申请数量" prop="boothNumber"></el-table-column>
          <!-- <el-table-column align="center" label="布展类型" prop></el-table-column>
          <el-table-column align="center" label="是否统一布展" prop></el-table-column> -->
          <el-table-column align="center" min-width="120" label="上届是否绿色特装" prop="lastIsGreenSpecial">
            <template slot-scope="scope">
              {{scope.row.lastIsGreenSpecial | ynStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="所属贫困县" prop="poorArea">
            <template slot-scope="scope">
              <div v-if="scope.row.editpk">
                <el-form :model="poorform" :rules="poorule" ref="pooref" label-width="0px">
                  <el-form-item prop="poorArea">
                    <el-select v-model="poorform.poorArea" clearable>
                      <el-option label="岐山" value="岐山"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.poorArea}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="产品类别" prop="productType">
            <template slot-scope="scope">
              <div v-if="scope.row.editpk">
                <el-form :model="poorform" :rules="poorule" ref="pooref" label-width="0px">
                  <el-form-item prop="productType">
                    <!-- <el-input v-model.trim="poorform.productType"></el-input> -->
                    <el-select v-model="poorform.productType" clearable>
                      <el-option label="家用电器" value="HT02"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.productType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团安排特装数" prop="recommendSpecial">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="recommendSpecial">
                    <el-input v-model="editform.recommendSpecial"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendSpecial}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团安排标摊数" prop="recommendStandard">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="recommendStandard">
                    <el-input v-model="editform.recommendStandard"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendStandard}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="统一布展数" prop="recommendUnified">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="recommendUnified">
                    <el-input v-model="editform.recommendUnified"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendUnified}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="卡车通道安排数" prop="recommendCentralchannel">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="recommendCentralchannel">
                    <el-input v-model="editform.recommendCentralchannel"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendCentralchannel}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团安排总数" prop="recommendSumNumber">
          </el-table-column>
          <el-table-column align="center" min-width="120" label="粘连展位数量" prop="examineAdjoinNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.editzl">
                <el-form :model="zlform" :rules="zlrule" ref="zlref" label-width="0px">
                  <el-form-item prop="examineAdjoinNumber">
                    <el-input v-model.trim.number="zlform.examineAdjoinNumber" maxlength="5"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.examineAdjoinNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="品牌粘连审核" prop="brandAdhesionResult">
            <template slot-scope="scope">
              {{scope.row.brandAdhesionResult | statusc}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="审核粘连数量" prop="adhesionNumberResult">
            <!-- <template slot-scope="scope">
              {{scope.row.adhesionNumberResult | statusc}}
            </template> -->
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" min-width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                :disabled="scope.row.examineStatus === '1'"
                @click="onEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'editref')">保存</el-button>
              <!-- <el-button type="text" v-if="!scope.row.editzl" @click="setedit(scope.row, scope.$index)">设置粘连性</el-button>
              <el-button type="text" v-else @click="setSeave(scope.row, scope.$index, 'zlref')">保存粘连性</el-button>
              <el-button type="text" v-if="!scope.row.editpk" @click="pooedit(scope.row, scope.$index)">贫困地区</el-button>
              <el-button type="text" v-else @click="pooSeave(scope.row, scope.$index, 'pooref')">保存贫困地区</el-button> -->
            </template>
          </el-table-column>
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
        exhibitionAreaCode: "",
        companyCecfCode: "",
        companyName: ""
      },
      tableData: [],
      optioncode: [],
      isExhibit: false,
      addForm: {},
      // 编辑规则
      editrule: {
        recommendSpecial: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendStandard: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendUnified: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendCentralchannel: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      editform: {
        recommendSpecial: "",
        recommendStandard: "",
        recommendUnified: "",
        recommendCentralchannel: ""
      },
      zlform: { applyAdjoinNumber: "" },
      zlrule: {
        applyAdjoinNumber: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      poorform: {
        productType: "",
        poorArea: ""
      },
      poorule: {
        productType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        poorArea: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      zldisabl: true,
      pkdisabl: true,
      cancelAdd: false,
      tybzdisable: false,
      chnace: {},
      lastIndexPage: "",
      lastSetedit: "",
      lastPooedit: "",
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
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
    statusc(val) {
      if (val === "1") {
        return "通过";
      } else if (val === "2") {
        return "不通过";
      } else {
        return "未审核";
      }
    },
    exhiPer(val) {
      let value = val - 0;
      if (value === 1) {
        return "第一期";
      } else if (value === 2) {
        return "第二期";
      } else if (value === 3) {
        return "第三期";
      }
    },
    ynStatus(val) {
      let value = val - 0;
      if (value === 1) {
        return "是";
      } else if (value === 0) {
        return "否";
      }
    }
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  mounted() {
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
    // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "addordinaryDeadlineConfig", // 工作部查看安排方案
      "updaterecommendCompany", // 交易团编辑设置的一般性展位安排
      "getadjoinRecommendCompany", // 交易团/分团设置粘连性
      "getpoorRecommendCompany" // 交易团/分团设置贫困地区
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.addordinaryDeadlineConfig(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
            getTable[i]["editzl"] = false;
            getTable[i]["editpk"] = false;
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
            if (this.optioncode[i].value === "") {
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
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&companyCecfCode=" + this.formData.companyCecfCode + "&delegationId=" + this.formData.delegationId + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode + "&companyName=" + this.formData.companyName + "&token=" + this.token;
      window.open(process.env.API_NA_URL + "/api/ordinaryRecommendCompany/workSchedulePlan/download?current=" + url, "_parent");
    },
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editform["recommendId"] = val.recommendId;
        this.editform.recommendSpecial = val.recommendSpecial;
        this.editform.recommendStandard = val.recommendStandard;
        this.editform.recommendUnified = val.recommendUnified;
        this.editform.recommendCentralchannel = val.recommendCentralchannel;
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
    // 编辑 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updaterecommendCompany(this.editform)
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
    // 设置粘连性
    setedit(val, valId) {
      this.paramd = {
        companyId: val.companyId,
        exhibitionArea: val.exhibitionArea
      };
      this.getadjoinRecommendCompany(this.paramd).then(res => {
        if (res === "exist") {
          if (this.lastSetedit === "" || this.lastSetedit === valId) {
            this.zlform["recommendId"] = val.recommendId;
            this.zlform.applyAdjoinNumber = val.applyAdjoinNumber;
            this.tableData[valId]["editzl"] = true;
            this.lastSetedit = valId;
          } else {
            this.$confirm("是否放弃本次修改")
              .then(() => {
                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i]["editzl"] = false;
                }
                this.tableData[valId]["editzl"] = true;
                this.lastSetedit = valId;
              })
              .catch(() => {
                this.$message.info("已取消本次操作");
              });
          }
        } else {
          this.$message({
            type: "error",
            message: res
          });
        }
      }).catch(e => {});
    },
    // 保存粘连性
    setSeave(val, valId, datae) {
      this.lastSetedit = "";
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updaterecommendCompany(this.zlform)
            .then(res => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["editzl"] = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 贫困地区
    pooedit(val, valId) {
      this.paramd = {
        companyName: val.companyName,
        exhibitionAreaName: val.exhibitionAreaName
      };
      this.getpoorRecommendCompany(this.paramd).then(res => {
        if (res === "success") {
          if (this.lastPooedit === "" || this.lastPooedit === valId) {
            this.poorform["recommendId"] = val.recommendId;
            this.poorform.productType = val.productType;
            this.poorform.poorArea = val.poorArea;
            this.tableData[valId]["editpk"] = true;
            this.lastPooedit = valId;
          } else {
            this.$confirm("是否放弃本次修改")
              .then(() => {
                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i]["editpk"] = false;
                }
                this.tableData[valId]["editpk"] = true;
                this.lastPooedit = valId;
              })
              .catch(() => {
                this.$message.info("已取消本次操作");
              });
          }
        } else {
          this.$message({
            type: "error",
            message: res
          });
        }
      }).catch(e => {});
    },
    // 保存贫困地区
    pooSeave(val, valId, datae) {
      this.lastPooedit = "";
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updaterecommendCompany(this.poorform)
            .then(res => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["editzl"] = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
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
