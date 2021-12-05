<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会复核展位数量安排" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" label-width="140px" size="small">
          <el-form-item label="申请展区">
            <el-select v-model="formData.exhibitionArea" size="small" @change="formChange" class="widtwo" clearable>
              <el-option v-for="(item, index) in localstora.exhibitionArea" :key="index" :label="item.exhibitionAreaName" :value="item.exhibitionAreaCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易团">
            <el-select v-model="formData.delegationId" size="small" class="widtwo" clearable>
              <el-option v-for="(item, index) in localstora.delegation" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
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
            <el-input v-model.trim="formData.companyName" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="展品专区">
            <el-select v-model="formData.productType" class="widtwo" clearable>
              <el-option v-for="(item, index) in optspe" :key="index" :label="item.specialAreaName" :value="item.specialAreaCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model="formData.cecfCode" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="交易团是否推荐">
            <el-select v-model="formData.delegationIsRecommend" class="widtwo" clearable>
              <el-option label="推荐" value="1"></el-option>
              <el-option label="未推荐" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="符合规则ID">
            <el-select v-model="formData.ruleId" class="widtwo" clearable>
              <el-option v-for="(item, index) in optionsId" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
            <el-button class="formStyle" type="primary" @click="handDownload">下载</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" @select="handleSelectionChange" @select-all="handleSelectionChange" border>
          <el-table-column type="selection" width="40px"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展品专区" prop="productTypeName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
            <template slot-scope="scope">{{scope.row.boothType | obstatusa}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="cecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业类型" prop="companyType">
            <template slot-scope="scope">{{scope.row.companyType | ctstatus}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团审核布展类型" prop="boothTypeDemand">
            <template slot-scope="scope">{{scope.row.boothTypeDemand | suscstatus}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团审核展位需求" prop="boothNumberDemand"></el-table-column>
          <el-table-column align="center" min-width="120" label="上届展位数" prop="boothNumberLast"></el-table-column>
          <el-table-column align="center" min-width="120" label="本届拟安排展位数" prop="scheduleNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="建议安排展位数" prop="coceralRecommendNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="商协会是否推荐" prop="coceralIsRecommend">
            <template slot-scope="scope">
              {{scope.row.coceralIsRecommend | bachestatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团是否推荐" prop="delegationIsRecommend">
            <template slot-scope="scope">
              {{scope.row.delegationIsRecommend | chestatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="规则id" prop="ruleId"></el-table-column>
          <el-table-column align="center" min-width="120" label="审核状态" prop="examineStatus">
            <template slot-scope="scope">
              {{scope.row.examineStatus | statusa}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="undline" @click="handPass(scope.row)">通过</el-button>
              <el-button type="text" class="undline" @click="handNpass(scope.row)">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" size="small" class="formStyle" @click="onFeedback">反馈工作部</el-button>
          <el-button type="primary" size="small" class="formStyle" @click="handlePass">通过</el-button>
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
        <el-dialog title="审核" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="500px">
          <el-form :model="addForm" :rules="rules" :inline="true" ref="ruleForm" size="small" label-width="140px">
            <el-form-item label="建议安排展位数" prop="coceralRecommendNumber">
              <el-input v-model.trim.number="addForm.coceralRecommendNumber" maxlength="5" class="wid"></el-input>
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
        size: "10",
        coceralId: "06"
      },
      backObj: {
        current: "1",
        size: "",
        coceralId: "06"
      },
      token: "",
      checkList: [], // 临时选中的值
      backArry: [],
      formData: {
        exhibitionArea: "",
        delegationId: "",
        coceralIsRecommend: "",
        companyName: "",
        productType: "",
        cecfCode: "",
        delegationIsRecommend: "",
        ruleId: ""
      },
      tableData: [],
      optspe: [],
      optionsId: [],
      isExhibit: false,
      statusData: {
        demandRecordId: "",
        examineStatus: "",
        coceralRecommendNumber: ""
      },
      addForm: {
        coceralRecommendNumber: ""
      },
      rules: {
        coceralRecommendNumber: [{ validator: tynum, required: true, trigger: "change" }]
      },
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
      comtype: [], // 企业类型
      str: "",
      acredit: {
        recordId: "",
        authorizeStatus: ""
      },
      exhibitionArea: [], // 展区
      arr: [], // 新题材展区返回的数据
      activeName: "first"
    };
  },
  filters: {
    statusa(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "审核通过";
      } else if (val === "2") {
        return "审核不通过";
      }
    },
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
    suscstatus(val) {
      if (val === "SPECIAL_BOOTH") {
        return "绿色特装";
      } else if (val === "UNIFICATION_BOOTH") {
        return "统一布展";
      } else if (val === "STANDARD_BOOTH") {
        return "标摊";
      } else if (val === "CENTER_CHANNEL_BOOTH") {
        return "中央通道";
      }
    }
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  async beforeCreate() {
    this.comtype = await kindo.dictionary.get('companyType');
  },
  created() {
    this.obj = {
      current: "1",
      size: "10",
      coceralId: "06"
    };
    this.localstora.exhibitionArea = [];
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
      this.backObj["coceralId"] = this.$store.getters.userInfo.org.deptId;
    }
    this.getListPage(this.obj);
    // let mate = this.$store.getters.userInfo.org.deptName;
    // this.str = mate.substring(mate.length - 2, mate.length);
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
  methods: {
    ...mapActions("thenewThemel", [
      "getnewthemePublish", // 5.1 商协会查询新题材工作部根据规则生成或上传的企业申请记录(商协会复核展位数量安排通过的企业申请记录)
      "updatenewthemePublish", // 5.2 商协会复核展位数量安排通过的企业申请记录
      "updatenewthemeFeedback" // 5.3 商协会复核完成反馈工作部
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getexhibitionAreaDTOList" // 新题材展区
    ]),
    // 是否可勾选
    // handleSelect(row) {
    //   if (row.examineStatus === '1') {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    // 获取页面数据
    getListPage(Url) {
      this.getnewthemePublish(Url)
        .then(res => {
          // this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = getTable;
          this.backObj.size = res.total;
          for (let i = 0; i < getTable.length; i++) {
            let data = {
              value: getTable[i].ruleId,
              text: getTable[i].ruleId
            };
            this.optionsId.push(data);
          }
          // 数组去重
          let hash = {};
          this.optionsId = this.optionsId.reduce(function (item, next) {
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item;
          }, []);
          this.checkList = [];
        })
        .catch(e => { });
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
    handleSelectionChange(rows) { // 选中的数据获取
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push({
              demandRecordId: row.demandRecordId,
              examineStatus: '1'
            });
          }
        });
      }
      // console.log(this.checkList);
    },
    // 批量通过
    handlePass() {
      if (this.checkList.length > 0) {
        this.$confirm("请确认将已勾选数据进行通过操作？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.updatenewthemePublish(this.checkList).then(res => {
              this.$message({
                message: "通过成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            }).catch(e => { });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消通过"
            });
          });
      } else {
        this.$message.warning('请至少勾选一项');
      }
    },
    // 下载
    handDownload() {
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&coceralId=${this.obj.coceralId}&exhibitionArea=${this.formData.exhibitionArea}&delegationId=${this.formData.delegationId}&coceralIsRecommend=${this.formData.coceralIsRecommend}&companyName=${this.formData.companyName}&productType=${this.formData.productType}&cecfCode=${this.formData.cecfCode}&delegationIsRecommend=${this.formData.delegationIsRecommend}&ruleId=${this.formData.ruleId}&token=${this.token}`;
      let aurl = process.env.API_NA_URL + "/api/newthemePublish/coceral/download?current=" + url;
      window.open(aurl, "_parent");
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
    // 点击通过按钮
    handPass(val) {
      this.statusData.demandRecordId = val.demandRecordId;
      this.statusData.examineStatus = "1";
      this.$confirm("确认通过？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let list = [];
          list.push(this.statusData);
          this.updatenewthemePublish(list).then(res => {
            this.$message({
              message: "通过成功！",
              type: "success"
            });
            this.getListPage(this.obj);
          }).catch(e => { });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消通过"
          });
        });
    },
    // 点击不通过按钮
    handNpass(val) {
      this.statusData.demandRecordId = val.demandRecordId;
      this.statusData.examineStatus = "2";
      this.isExhibit = true;
    },
    // 不通过 保存
    handSeave(fname) {
      this.statusData.coceralRecommendNumber = this.addForm.coceralRecommendNumber;
      let list = [];
      list.push(this.statusData);
      this.$refs[fname].validate((valid) => {
        if (valid) {
          this.updatenewthemePublish(list).then(res => {
            this.isExhibit = false;
            this.$message({
              message: "不通过成功",
              type: "success"
            });
            for (let key in this.addForm) {
              this.addForm[key] = "";
            }
            this.getListPage(this.obj); // 调用初始加载页面方法
          }).catch(e => { });
        } else {
          return false;
        }
      });
    },
    // 审核 取消
    handCancel() {
      this.isExhibit = false;
      this.addForm.coceralRecommendNumber = "";
    },
    // 反馈工作部
    onFeedback() {
      this.backArry = [];
      this.$confirm("确认反馈工作部？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getnewthemePublish(this.backObj).then(res => {
            for (let i = 0; i < res.records.length; i++) {
              let oarr = {
                demandRecordId: res.records[i].demandRecordId,
                examineStatus: res.records[i].examineStatus,
                coceralRecommendNumber: res.records[i].coceralRecommendNumber
              };
              this.backArry.push(oarr);
            }
            this.updatenewthemeFeedback(this.backArry).then(resa => {
              this.$message({
                message: "反馈工作部成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            }).catch(e => { });
          }).catch(e => { });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消反馈工作部"
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
