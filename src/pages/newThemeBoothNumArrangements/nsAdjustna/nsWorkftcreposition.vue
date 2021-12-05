<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸中心调整重新安排方案" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" label-width="150px" size="small">
          <el-form-item label="申请展区">
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
          <el-form-item label="商协会是否推荐">
            <el-select v-model="formData.coceralIsRecommend" class="widtwo" clearable>
              <el-option label="未推荐" value="0"></el-option>
              <el-option label="推荐" value="1"></el-option>
              <el-option label="不推荐" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formData.companyName" maxlength="24" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="展品专区">
            <el-select v-model="formData.productType" class="widtwo" clearable>
              <el-option v-for="(item, index) in optspe" :key="index" :label="item.specialAreaName" :value="item.specialAreaCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.cecfCode" maxlength="24" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="交易团是否推荐">
            <el-select v-model="formData.delegationIsRecommend" class="widtwo" clearable>
              <el-option label="推荐" value="1"></el-option>
              <el-option label="未推荐" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
            <el-button class="formStyle" type="primary" @click="handDownload">下载</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border @selection-change="handleSelectionChange">
          <el-table-column align="center" min-width="55" fixed="left" type="selection"></el-table-column>
          <el-table-column align="center" min-width="120" label="展品专区" prop="productTypeName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
            <template slot-scope="scope">
              {{scope.row.boothType | obstatusa}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="cecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业类型" prop="companyType">
            <template slot-scope="scope">{{scope.row.companyType | ctstatus}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团审核布展类型" prop="boothTypeDemand">
            <template slot-scope="scope">
              {{scope.row.boothTypeDemand | suscstatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团审核展位需求" prop="boothNumberDemand"></el-table-column>
          <el-table-column align="center" min-width="120" label="上届展位数" prop="boothNumberLast"></el-table-column>
          <el-table-column align="center" min-width="120" label="本届拟安排展位数" prop="scheduleNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="交易团审核" prop="clusterCheckStatus">
            <template slot-scope="scope">
              {{scope.row.clusterCheckStatus | checkstatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团是否推荐" prop="delegationIsRecommend">
            <template slot-scope="scope">
              {{scope.row.delegationIsRecommend | chestatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="商协会是否推荐" prop="coceralIsRecommend">
            <template slot-scope="scope">
              {{scope.row.coceralIsRecommend | bachestatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展区出口额参数（万美元）" prop="amountExports"></el-table-column>
          <el-table-column align="center" min-width="120" label="国内销售额（万人民币）" prop="sellMoney"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="原特装展位数" prop="originalRecommendSpecial"></el-table-column>
          <el-table-column align="center" min-width="120" label="原标摊展位数" prop="originalRecommendStandard"></el-table-column>
          <el-table-column align="center" min-width="120" label="申请调整后特装展位数" prop="adjustRecommendSpecial">
            <template slot-scope="scope">
              <div v-if="scope.row.edit && scope.row.exhibitionType === 'SPECIAL_BOOTH'">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="adjustRecommendSpecial">
                    <el-input v-model.trim.number="editform.adjustRecommendSpecial" maxlength="5"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.adjustRecommendSpecial}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="申请调整后标摊展位数" prop="adjustRecommendStandard">
            <template slot-scope="scope">  
              <div v-if="scope.row.edit && scope.row.exhibitionType === 'STANDARD_BOOTH'">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="adjustRecommendStandard">
                    <el-input v-model.number.trim="editform.adjustRecommendStandard" maxlength="5"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.adjustRecommendStandard}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="调整原因" prop="adjustReason">
            <template slot-scope="scope">  
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="adjustReason">
                    <el-input v-model.trim="editform.adjustReason" maxlength="100"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.adjustReason}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="调整函" prop="material">
            <template slot-scope="scope">
              <el-button type="text" class="undline" v-if="scope.row.material" @click="clickAdjest(scope.row.material)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="主要展品1" prop="productOne"></el-table-column>
          <el-table-column align="center" min-width="120" label="主要展品2" prop="productTwo"></el-table-column>
          <el-table-column align="center" min-width="120" label="安排说明" prop="scheduleReason"></el-table-column>
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                class="undline"
                :disabled="scope.row.coceralNoticeStatus !== '未发送商协会' || scope.row.foreignTradeExaminestatus !== '未提交' || scope.row.foreignCenterExamineStatus === '1' || scope.row.foreignCenterExamineStatus === '2' || scope.row.exhibitionType === 'UNIFICATION_BOOTH' || scope.row.exhibitionType === 'CENTER_CHANNEL_BOOTH'"
                @click="onEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" class="undline" v-else @click="onServe(scope.row, scope.$index, 'editref')">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" size="small" :disabled="subny" @click="handSure">通过</el-button>
          <el-button type="primary" class="formStyle" size="small" :disabled="subny" @click="isExhibit = true">不通过</el-button>
          <el-button type="primary" class="formStyle" size="small" :disabled="subjg" @click="handSubmit">提交审核结果</el-button>
          <el-button type="primary" class="formStyle" size="small" :disabled="sendba" @click="handView">发商协会查看</el-button>
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
        <!-- 审核 不通过 -->
        <el-dialog title="审核" :visible.sync="isExhibit" v-if="isExhibit" :close-on-click-modal="false" width="500px">
          <el-form :model="addForm" :rules="rules" :inline="true" ref="ruleForm" size="small" label-width="140px">
            <el-form-item label="不通过原因" prop="examineOpinion">
              <el-input v-model.trim="addForm.examineOpinion" type="textarea" :rows="5" class="widtwo" maxlength="200"></el-input>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handSeave('ruleForm')">保存</el-button>
              <el-button @click="handCancel">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import tradingGroupauditActualuserVue from '../../numberArrangementsInternational/actualUserCall/tradingGroupauditActualuser.vue';
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
        current: "1",
        size: "10"
      },
      formData: {
        exhibitionArea: "",
        delegationId: "",
        coceralIsRecommend: "",
        companyName: "",
        productType: "",
        cecfCode: "",
        delegationIsRecommend: ""
      },
      tableData: [],
      optspe: [],
      checkData: [], // 打钩存储数据
      subCheck: [], // 提交结果 数据
      isExhibit: false,
      sendba: true, // 发送商协会
      subny: true, // 通过 不通过
      subjg: true, // 提交审核结果
      addForm: {
        examineOpinion: ""
      },
      editform: {
        adjustRecommendSpecial: "",
        adjustRecommendStandard: "",
        adjustReason: ""
      },
      rules: {
        examineOpinion: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      editrule: {
        adjustRecommendSpecial: [{ validator: tynum, required: true, trigger: "blur" }],
        adjustRecommendStandard: [{ validator: tynum, required: true, trigger: "blur" }],
        adjustReason: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      lastIndexPage: "",
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      // 审核
      checkForm: {
        foreignCenterExamineStatus: "",
        examineOpinion: ""
      },
      token: "",
      exhibitionArea: [], // 展区
      arr: [], // 新题材展区返回的数据
      activeName: "first"
    };
  },
  filters: {
    // 交易团
    chestatus(val) {
      if (val === "0") {
        return "未推荐";
      } else if (val === "1") {
        return "推荐";
      } else if (val === "2") {
        return "推荐";
      }
    },
    // 商协会
    bachestatus(val) {
      if (val === "1") {
        return "推荐";
      } else if (val === "2") {
        return "不推荐";
      } else if (val === "0") {
        return "未推荐";
      }
    },
    obstatusa(val) {
      if (val === "01") {
        return "一般性展位";
      } else if (val === "02") {
        return "品牌";
      }
    },
    // 企业类型
    ctstatus: val => {
      let comtype = kindo.dictionary.get('companyType');
      for (let i = 0; i < comtype.length; i++) {
        if (val === comtype[i].value) {
          return comtype[i].label;
        }
      }
    },
    checkstatus(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "通过";
      } else if (val === "2") {
        return "不通过";
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
    }
  },
  created() {
    this.localstora.exhibitionArea = [];
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
    this.getcurrentExhibitionSession(); // 展届
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
    ...mapGetters("dictData", ["dictionaryData"]),
    ...mapGetters("nainformation", ["getCes"])
  },
  methods: {
    ...mapActions("thenewThemel", [
      "updatecheckPlanNewthemePublish", // 6.11 外贸中心审核调整重新安排方案
      "getnewthemeWorkScheduleNumber", // 6.12 外贸中心调整重新安排方案 获取
      "updatenewthemeWorkScheduleNumber", // 6.13 外贸中心提交审核结果
      "addnewthemeWorkScheduleNumber", // 6.14 外贸中心发商协会查看
      "updatepnewthemeWorkScheduleNumber" // 6.15 外贸中心调整方案 编辑
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getcurrentExhibitionSession", // 展届
      "getexhibitionAreaDTOList" // 新题材展区
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getnewthemeWorkScheduleNumber(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
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
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&delegationId=${this.formData.delegationId}&coceralIsRecommend=${this.formData.coceralIsRecommend}&delegationIsRecommend=${this.formData.delegationIsRecommend}&companyName=${this.formData.companyName}&productType=${this.formData.productType}&cecfCode=${this.formData.cecfCode}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/newthemeWorkScheduleNumber/download?current=" + url, "_parent");
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
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editform["demandRecordId"] = val.demandRecordId;
        this.editform.adjustReason = val.adjustReason;
        if (val.exhibitionType === "SPECIAL_BOOTH") {
          this.editform["adjustRecommendSpecial"] = val.adjustRecommendSpecial;
          this.editform["originalRecommendSpecial"] = val.originalRecommendSpecial;
          delete this.editform.adjustRecommendStandard;
        } else if (val.exhibitionType === "STANDARD_BOOTH") {
          this.editform["adjustRecommendStandard"] = val.adjustRecommendStandard;
          this.editform["originalRecommendStandard"] = val.originalRecommendStandard;
          delete this.editform.adjustRecommendSpecial;
        }
        this.editform["delegationId"] = val.delegationId;
        this.editform["delegationName"] = val.delegationName;
        this.editform["exhibitionArea"] = val.exhibitionArea;
        this.editform["companyId"] = val.companyId;
        this.editform["cecfCode"] = val.cecfCode;
        this.editform["exhibitionAreaName"] = val.exhibitionAreaName;
        this.editform["exhibitionType"] = val.exhibitionType;
        this.editform["companyName"] = val.companyName;
        this.editform["ehibitionAreaName"] = val.ehibitionAreaName;
        this.editform["productType"] = val.productType;
        this.editform["productTypeName"] = val.productTypeName;
        // this.editform["adjustReason"] = val.adjustReason;
        // this.editform["scheduleReason"] = val.scheduleReason;
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.editform["demandRecordId"] = val.demandRecordId;
            this.editform.adjustReason = val.adjustReason;
            if (val.exhibitionType === "SPECIAL_BOOTH") {
              this.editform["adjustRecommendSpecial"] = val.adjustRecommendSpecial;
              this.editform["originalRecommendSpecial"] = val.originalRecommendSpecial;
              delete this.editform.adjustRecommendStandard;
            } else if (val.exhibitionType === "STANDARD_BOOTH") {
              this.editform["adjustRecommendStandard"] = val.adjustRecommendStandard;
              this.editform["originalRecommendStandard"] = val.originalRecommendStandard;
              delete this.editform.adjustRecommendSpecial;
            }
            this.editform["delegationId"] = val.delegationId;
            this.editform["delegationName"] = val.delegationName;
            this.editform["exhibitionArea"] = val.exhibitionArea;
            this.editform["companyId"] = val.companyId;
            this.editform["cecfCode"] = val.cecfCode;
            this.editform["exhibitionAreaName"] = val.exhibitionAreaName;
            this.editform["exhibitionType"] = val.exhibitionType;
            this.editform["companyName"] = val.companyName;
            this.editform["ehibitionAreaName"] = val.ehibitionAreaName;
            this.editform["productType"] = val.productType;
            this.editform["productTypeName"] = val.productTypeName;
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
          this.updatepnewthemeWorkScheduleNumber(this.editform)
            .then(res => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["edit"] = false;
              for (let key in this.editform) {
                this.editform[key] = "";
              }
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 调整函的下载
    clickAdjest(val) {
      if (val) {
        window.open(process.env.API_NA_URL + "/api/newthemeAdjustCompany/download?fileId=" + val, "_parent");
      } else {
        this.$message({
          type: "error",
          message: "调整函下载失败！"
        });
      }
    },
    // 表格勾选时的事件 0.0
    handleSelectionChange(val) {
      this.subCheck = [];
      this.checkData = [];
      if (val.length === 0) {
        this.subCheck = [];
        this.checkData = [];
        this.sendba = true;
        this.subny = true;
        this.subjg = true;
      } else {
        for (let i = 0; i < val.length; i++) {
          let ynPas = {
            demandRecordId: val[i].demandRecordId
          };
          let checkSub = {
            demandRecordId: val[i].demandRecordId,
            foreignCenterExamineStatus: val[i].foreignCenterExamineStatus
          };
          this.checkData.push(ynPas);
          this.subCheck.push(checkSub);
        }
        for (let i = 0; i < val.length; i++) {
          if (val[i].coceralNoticeStatus === "未发送商协会") {
            if (val[i].originator === "DELEGATION" || val[i].originator === "FOREIGN_TRADE_CENTER" || val[i].originator === "COMPANY") {
              this.sendba = false;
            } else {
              this.sendba = true;
            }
            // break;
          } else {
            this.sendba = true;
            break;
          }
        }
        for (let i = 0; i < val.length; i++) {
          if (val[i].foreignTradeExaminestatus === "未提交") {
            if (val[i].foreignCenterExamineStatus === "1" || val[i].foreignCenterExamineStatus === "2") {
              this.subjg = false;
            } else {
              this.subjg = true;
              break;
            }
            // break;
          } else {
            this.subjg = true;
            break;
          }
        }
        for (let i = 0; i < val.length; i++) {
          if (val[i].foreignCenterExamineStatus === "0" || val[i].foreignCenterExamineStatus === "" || val[i].foreignCenterExamineStatus == null) {
            this.subny = false;
            // break;
          } else {
            this.subny = true;
            break;
          }
        }
      }
    },
    // 审核 通过
    handSure() {
      if (this.checkData.length === 0) {
        this.$message({
          type: "error",
          message: "请勾选您要通过的数据"
        });
      } else {
        for (let i = 0; i < this.checkData.length; i++) {
          this.checkData[i]["foreignCenterExamineStatus"] = "1";
          this.checkData[i]["examineOpinion"] = "";
          if (this.$store.getters.userInfo.userId) {
            this.checkData[i]["examineUserId"] = this.$store.getters.userInfo.userId;
          }
          if (this.$store.getters.userInfo.userName) {
            this.checkData[i]["examineUserCn"] = this.$store.getters.userInfo.userName;
          }
        }
        this.$confirm('是否确认通过？', '审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updatecheckPlanNewthemePublish(this.checkData).then(res => {
            this.$message({
              type: 'success',
              message: '确认通过成功!'
            });
            this.subCheck = [];
            this.checkData = [];
            this.getListPage(this.obj); // 调用初始加载页面方法
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });          
        });
      }
    },
    // 不通过 保存
    handSeave(datae) {
      if (this.checkData.length === 0) {
        this.$message({
          type: "error",
          message: "请勾选您要不通过的数据"
        });
      } else {
        for (let i = 0; i < this.checkData.length; i++) {
          this.checkData[i]["foreignCenterExamineStatus"] = "2";
          this.checkData[i]["examineOpinion"] = this.addForm.examineOpinion;
          if (this.$store.getters.userInfo.userId) {
            this.checkData[i]["examineUserId"] = this.$store.getters.userInfo.userId;
          }
          if (this.$store.getters.userInfo.userName) {
            this.checkData[i]["examineUserCn"] = this.$store.getters.userInfo.userName;
          }
        }
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.updatecheckPlanNewthemePublish(this.checkData)
              .then(res => {
                this.isExhibit = false;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.subCheck = [];
                this.checkData = [];
                this.addForm.examineOpinion = "";
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {});
          } else {
            return false;
          }
        });
      }
    },
    // 不通过 取消
    handCancel() {
      this.isExhibit = false;
      this.addForm.examineOpinion = "";
    },
    // 提交审核结果 jieguo
    handSubmit() {
      if (this.subCheck.length === 0) {
        this.$message({
          type: "error",
          message: "请勾选您要提交审核的数据"
        });
      } else {
        this.$confirm('是否确认提交审核结果？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updatenewthemeWorkScheduleNumber(this.subCheck).then(res => {
            this.$message({
              type: 'success',
              message: '确认提交审核结果成功!'
            });
            this.subCheck = [];
            this.checkData = [];
            this.getListPage(this.obj);
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交审核结果'
          });          
        });
      }
    },
    // 发商协会查看
    handView() {
      if (this.checkData.length === 0) {
        this.$message({
          type: "error",
          message: "请勾选您要发商协会查看的数据"
        });
      } else {
        this.$confirm('是否确认发商协会查看？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addnewthemeWorkScheduleNumber(this.checkData).then(res => {
            this.$message({
              type: 'success',
              message: '确认发商协会查看成功!'
            });
            this.checkData = [];
            this.getListPage(this.obj);
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发商协会查看'
          });          
        });
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
.undline {
  text-decoration: underline;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
