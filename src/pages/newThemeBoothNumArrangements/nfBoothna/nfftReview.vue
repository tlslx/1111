<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审定展位数量安排结果" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <!-- <el-form-item label="企业类型">
            <el-select v-model="formData.companyType" class="widtwo" clearable>
              <el-option v-for="(item, index) in optspe" :key="index" :label="item.delegationSubName" :value="item.delegationSubId"></el-option>
            </el-select>
          </el-form-item> -->
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
          <el-form-item label="专区">
            <el-select v-model="formData.productType" class="widtwo" clearable>
              <el-option v-for="(item, index) in optspe" :key="index" :label="item.specialAreaName" :value="item.specialAreaCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则ID">
            <el-select v-model="formData.ruleId" class="widtwo" clearable>
              <el-option v-for="(item, index) in optionsId" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formData.companyName" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.cecfCode" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" border size="small" @selection-change="handleSelectionChange" @select-all="handleSelectionChange">
          <el-table-column align="center" min-width="55" fixed="left" :selectable="handleSelect" type="selection"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展品专区" prop="productTypeName"></el-table-column>
          <el-table-column label="展位类型" prop="boothType" min-width="120px" align="center">
            <template slot-scope="scope">
              <!-- {{ scope.row.boothType | boothTypeFilter }} -->
              {{ scope.row.boothType }}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="cecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业类型" prop="companyType">
            <template slot-scope="scope">{{scope.row.companyType | ctstatus}}</template>
          </el-table-column>
          <el-table-column label="交易团审核展位需求" prop="boothNumberDemand" min-width="180px" align="center"></el-table-column>
          <el-table-column label="布展类型" prop="boothTypeDemand" min-width="180px" align="center">
            <template slot-scope="scope">
              {{ scope.row.boothTypeDemand | typeFilter }}
            </template>
          </el-table-column>
          <el-table-column label="上届展位数" prop="boothNumberLast" min-width="120px" align="center"></el-table-column>
          <!--<el-table-column label="系统安排展位数" prop="systemBoothNumber" width="180px" align="center"></el-table-column>-->
          <el-table-column label="当届拟安排展位数" prop="scheduleNumber" min-width="180px" align="center"></el-table-column>
          <!--<el-table-column label="差异原因" prop="diffReason" width="150" align="center"></el-table-column>-->
          <el-table-column label="商协会核对状态" prop="coceralCheckStatus" min-width="160px" align="center">
            <template slot-scope="scope">
              {{ scope.row.coceralCheckStatus | statusFilter }}
            </template>
          </el-table-column>
          <!--<el-table-column label="商协会建议安排展位数" prop="coceralRecommendNumber" min-width="160px" align="center"></el-table-column>-->
          <el-table-column label="交易团审核" prop="clusterCheckStatus" min-width="120px" align="center">
            <template slot-scope="scope">
              {{ scope.row.clusterCheckStatus | statusFilter }}
            </template>
          </el-table-column>
          <el-table-column label="交易团是否推荐" prop="delegationIsRecommend" min-width="160px" align="center">
            <template slot-scope="scope">
              {{ scope.row.delegationIsRecommend | chooseListFilter }}
            </template>
          </el-table-column>
          <el-table-column label="商会是否推荐" prop="coceralIsRecommend" min-width="160px" align="center">
            <template slot-scope="scope">
              {{ scope.row.coceralIsRecommend | chooseListFilter }}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展区出口额参数" prop="amountExports"></el-table-column>
          <el-table-column align="center" min-width="120" label="国内销售额（万人民币）" prop="sellMoney"></el-table-column>
        <el-table-column label="宠物食品类对应出口额参数" prop="peetFoodExportVolume" min-width="220px" align="center"></el-table-column>
        <el-table-column label="唯一专属宠物用品类的HS编码（42010000）下出口额参数" prop="peetCodeExportVolume" min-width="220px" align="center"></el-table-column>
        <el-table-column label="是否提交有效行业相关资质证明材料" prop="isOfferEffectiveMaterial" min-width="220px" align="center">
          <template slot-scope="scope">
            {{ scope.row.isOfferEffectiveMaterial | chooseListFilter }}
          </template>
        </el-table-column>
        <el-table-column label="主要展示产品1" min-width="140px" prop="productOne" align="center"></el-table-column>
        <el-table-column label="主要展示产品2" min-width="140px" prop="productTwo" align="center"></el-table-column>
        <el-table-column label="符合规则ID" prop="ruleId" min-width="120px" align="center"></el-table-column>
        <el-table-column label="安排说明" prop="scheduleReason" width="180" align="center"></el-table-column>
        <el-table-column label="审定结果" prop="examineStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.examineStatus | statusFilters }}
          </template>
        </el-table-column>
        <el-table-column label="审定不通过原因" prop="examineOpinion" width="180" align="center"></el-table-column>
        <!--
          <el-table-column align="center" min-width="120" label="交易团推荐理由" prop="delegationRecommendReason"></el-table-column>
          <el-table-column align="center" min-width="120" label="商协会推荐理由" prop="coceralRecommendReason"></el-table-column>
          <el-table-column align="center" min-width="120" label="符合规则ID" prop="ruleId"></el-table-column>
          <el-table-column align="center" min-width="120" label="安排理由" prop="scheduleReason"></el-table-column>
          <el-table-column align="center" min-width="120" label="安排展位数量" prop="scheduleNumber"></el-table-column>
          -->
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="danger" class="formStyle" size="small" @click="isExhibit = true">审核</el-button>
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
        <!-- 审核 -->
        <el-dialog title="审核" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="500px">
          <el-form :model="addForm" :rules="rules" ref="ruleForm" size="small" label-width="120px">
            <el-form-item label="审核结果" prop="examineStatus">
              <el-select v-model="addForm.examineStatus" class="widtwo" @change="checkResult" clearable>
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="不通过原因" prop="examineOpinion" v-if="addForm.examineStatus === '2'">
              <el-input v-model.trim="addForm.examineOpinion" type="textarea" :rows="5" class="widtwo" maxlength="100"></el-input>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handSure('ruleForm')">保存</el-button>
              <el-button @click="isExhibit = false">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
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
        delegationId: "160"
      },
      formData: {
        companyType: "",
        exhibitionArea: "",
        productType: "",
        ruleId: "",
        companyName: "",
        cecfCode: ""
      },
      tableData: [],
      optspe: [],
      checkData: [],
      optionsId: [],
      disabledFlag: false,
      disCheckData: [],
      isExhibit: false,
      subny: true,
      addForm: {
        examineStatus: "",
        examineOpinion: ""
      },
      rules: {
        examineStatus: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        examineOpinion: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
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
      stra: "",
      exhibitionArea: [], // 展区
      arr: [], // 新题材展区返回的数据
      activeName: "first"
    };
  },
  filters: {
    statusa(val) {
      if (val === "ORDINARY") {
        return "一般性展位";
      } else if (val === "BRAND") {
        return "品牌";
      }
    },
    // 布展类型
    typeFilter: value => {
      switch (value) {
        case 'SPECIAL_BOOTH':
          return '特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        default:
          return;
      }
    },
    // 是否
    chooseListFilter: value => {
      switch (value) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    },
    // 商协会核对状态
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核不通过';
        case '3':
          return '未核对';
        default:
          return;
      }
    },
    // 外贸司审核状态
    statusFilters: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核不通过';
        case '3':
          return '未审定';
        default:
          return;
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
      size: "10",
      delegationId: "160"
    };
    this.localstora.exhibitionArea = [];
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
    }
    this.getListPage(this.obj);
    // let mate = this.$store.getters.userInfo.org.deptName;
    // this.stra = mate.substring(mate.length - 3, mate.length);
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
      "getlistNewthemePublish", // 5.4 查询新题材商协会复核展位数量安排通过的企业申请记录
      "updatecheckNewthemeFeedback" // 5.5 外贸司审定展位数量安排方案
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getexhibitionAreaDTOList" // 新题材展区
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistNewthemePublish(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = getTable;
          for (let i = 0; i < getTable.length; i++) {
            let data = {
              value: getTable[i].ruleId,
              text: getTable[i].ruleId
            };
            this.optionsId.push(data);
          }
          // 数组去重
          let hash = {};
          this.optionsId = this.optionsId.reduce(function(item, next) {
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item;
          }, []);
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "160"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
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
    handleSelect(row) {
      if (row.publicityStatus === '1') {
        return false;
      } else {
        return true;
      }
    },
    // 下载
    handDownload() {
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&delegationId=${this.formData.delegationId}&companyName=${this.formData.companyName}&productType=${this.formData.productType}&cecfCode=${this.formData.cecfCode}&companyType=${this.formData.companyType}&ruleId=${this.formData.ruleId}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/newthemePublish/download?current=" + url, "_parent");
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
    // 表格勾选时的事件 0.0
    handleSelectionChange(val) {
      this.checkData = [];
      if (val.length === 0) {
        this.checkData = [];
        this.disCheckData = [];
        this.subny = true;
      } else {
        for (let i = 0; i < val.length; i++) {
          let ynPas = {
            demandRecordId: val[i].demandRecordId
          };
          this.checkData.push(ynPas);
          this.disCheckData.push(val[i]);
          if (val[i].examineStatus !== "0") {
            this.subny = true;
            break;
          } else {
            this.subny = false;
          }
        }
      }
    },
    // 审核结果change事件
    checkResult() {
      if (this.checkData.length === 0) {
        this.$message({
          type: "error",
          message: "请勾选您要审核的数据"
        });
      } else {
        for (let i = 0; i < this.checkData.length; i++) {
          this.checkData[i]["examineStatus"] = this.addForm.examineStatus;
          this.checkData[i]["examineOpinion"] = this.addForm.examineOpinion;
        }
      }
    },
    // 是否禁用复选框事件 0.0
    // selecta(row, index) {
    //   // if (row.examineStatus === "1" || row.examineStatus === "2") {
    //   //   return false;
    //   // } else {
    //   //   return true;
    //   // }
    // },
    // 审核 确认
    handSure(datae) {
      for (let i = 0; i < this.checkData.length; i++) {
        this.checkData[i]["examineOpinion"] = this.addForm.examineOpinion;
      }
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updatecheckNewthemeFeedback(this.checkData)
            .then(res => {
              this.isExhibit = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.addForm.examineStatus = "";
              this.addForm.examineOpinion = "";
              this.getListPage(this.obj); // 调用初始加载页面方法
              this.checkData = [];
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
