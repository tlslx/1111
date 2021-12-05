<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会审核粘连数界面" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="企业名称">
            <el-input v-model="formData.companyName" class="widtwo"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商会">
            <el-select v-model="formData.coceralId" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.businessAssociation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item> -->
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
          <el-form-item label="是否商会会员">
            <el-select v-model="formData.isCoceralVip" class="widtwo" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-select v-model="formData.companyCecfCode" class="widtwo" clearable>
              <el-option v-for="(item, index) in optioncode" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="布展类型">
            <el-select v-model="formData.productType" clearable>
              <el-option label value></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分团">
            <el-select v-model="formData.delegationSubId" clearable>
              <el-option label value></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="是否品牌企业">
            <el-select v-model="formData.isBrandCompany" class="widtwo" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="安排情况">
            <el-select v-model="formData.schedulePlan" class="widtwo" clearable>
              <el-option label="全部" value="1"></el-option>
              <el-option label="部分" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
            <!-- <el-button class="formStyle" type="primary">导入</el-button> -->
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="商会" prop="coceralName"></el-table-column>
          <!-- <el-table-column align="center" min-width="120" label="布展类型" prop=""></el-table-column> -->
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业永久编码" prop="companyId"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="companyCecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区代码" prop="exhibitionAreaCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="特装展位数" prop="recommendSpecial"></el-table-column>
          <el-table-column align="center" min-width="120" label="标摊展位数" prop="recommendStandard"></el-table-column>
          <el-table-column align="center" min-width="120" label="统一布展数" prop="recommendUnified"></el-table-column>
          <el-table-column align="center" min-width="120" label="中央通道数" prop="recommendCentralchannel"></el-table-column>
          <el-table-column align="center" min-width="120" label="粘连申请数量" prop="applyAdjoinNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="贫困地区展位数量" prop></el-table-column>
          <el-table-column align="center" min-width="120" label="产品类别" prop="productType"></el-table-column>
          <el-table-column align="center" min-width="120" label="所属贫困县" prop="poorArea"></el-table-column>
          <el-table-column align="center" min-width="120" label="是否商会会员" prop="isCoceralVip">
            <template slot-scope="scope">
              {{scope.row.isCoceralVip === "1" ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="是否品牌企业" prop="isBrandCompany">
            <template slot-scope="scope">
              {{scope.row.isBrandCompany === "1" ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排情况" prop="schedulePlan">
            <template slot-scope="scope">
              {{scope.row.schedulePlan === "1" ? "全部" : "部分"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" :disabled="scope.row.examineStatus === '1' || scope.row.examineStatus === '2'" @click="yPass(scope.row)">通过</el-button>
              <el-button type="text" :disabled="scope.row.examineStatus === '1' || scope.row.examineStatus === '2'" @click="nPass(scope.row)">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <!-- <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" @click="isExhibit = true">下载</el-button>
        </div> -->
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
        <!-- 通过弹框 -->
        <el-dialog title="审核" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="500px" center>
          <el-form :model="addtForm" :rules="rules" :inline="true" ref="ruleForm" size="small" label-width="140px">
            <el-form-item label="最终粘连数" prop="examineAdjoinNumbe">
              <el-input v-model.trim.number="addtForm.examineAdjoinNumbe" class="widtwo"></el-input>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handSeave('ruleForm')">保存</el-button>
              <el-button @click="handCancel">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!-- 不通过弹框 -->
        <el-dialog title="审核" :visible.sync="isnoDia" v-if="isnoDia" :close-on-click-modal="false" width="500px" center>
          <el-form :model="pastb" :rules="rulesnp" :inline="true" ref="npruleForm" size="small" label-width="140px">
            <el-form-item label="不通过原因" prop="examineOpinion">
              <el-input type="textarea" v-model.trim="pastb.examineOpinion" :rows="5" class="widtwo"></el-input>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handnoSeave('npruleForm')">保存</el-button>
              <el-button @click="handnoCancel">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    let tynum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
        return callback(new Error("必须大于0"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        current: 1,
        size: 10,
        coceralId: "06",
        coceralName: "食品协会"
      },
      formData: {},
      tableData: [],
      isExhibit: false,
      isnoDia: false,
      addtForm: {
        examineAdjoinNumbe: ""
      },
      addForm: {},
      rules: {
        examineAdjoinNumbe: [{ validator: tynum, required: true, trigger: "change" }]
      },
      rulesnp: {
        examineOpinion: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      pastb: {
        recommendId: "",
        examineStatus: "",
        examineOpinion: ""
      },
      optioncode: [],
      localstora: {
        exhibitionArea: []
      },
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
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  mounted() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.coceralId = this.$store.getters.userInfo.org.deptId;
      this.obj.coceralName = this.$store.getters.userInfo.org.deptName;
    }
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "getlistRecommendCompany", // 查询交易团设置的一般性展位安排
      "updaterecommendCompany", // 交易团编辑设置的一般性展位安排
      "updatecoceralCheck" // 商协会审核粘连数界面
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistRecommendCompany(Url)
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
        size: "10",
        coceralId: "06",
        coceralName: "食品协会"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.coceralId = this.$store.getters.userInfo.org.deptId;
        this.obj.coceralName = this.$store.getters.userInfo.org.deptName;
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
    // 通过
    yPass(val) {
      this.addForm = val;
      this.isExhibit = true;
    },
    // 通过 保存
    handSeave(fname) {
      this.addForm["examineAdjoinNumbe"] = this.addtForm.examineAdjoinNumbe;
      this.$refs[fname].validate((valid) => {
        if (valid) {
          if (this.addtForm.examineAdjoinNumbe <= this.addForm.recommendSpecial) {
            this.updaterecommendCompany(this.addForm).then(res => {
              this.isExhibit = false;
              this.pastb = {
                recommendId: this.addForm.recommendId,
                examineStatus: "1",
                examineOpinion: ""
              };
              this.updatecoceralCheck(this.pastb).then(resp => {
                this.$message({
                  message: "通过成功",
                  type: "success"
                });
                this.addForm = {};
                this.addtForm.examineAdjoinNumbe = "";
                this.pastb = {
                  recommendId: "",
                  examineStatus: "",
                  examineOpinion: ""
                };
                this.getListPage(this.obj); // 调用初始加载页面方法
              }).catch(e => {});
            }).catch(e => {});
          } else {
            this.$message({
              type: "error",
              message: "最终粘连数应小于等于特装展位数"
            });
          }
        } else {
          return false;
        }
      });
    },
    // 通过 取消
    handCancel() {
      this.isExhibit = false;
      this.addtForm.examineAdjoinNumbe = "";
    },
    // 不通过
    nPass(val) {
      this.isnoDia = true;
      this.pastb.recommendId = val.recommendId;
    },
    // 不通过 保存
    handnoSeave(fnamen) {
      this.pastb.examineStatus = "2";
      this.$refs[fnamen].validate((valid) => {
        if (valid) {
          this.updatecoceralCheck(this.pastb).then(res => {
            this.isnoDia = false;
            this.$message({
              message: "不通过成功",
              type: "success"
            });
            this.pastb = {
              recommendId: "",
              examineStatus: "",
              examineOpinion: ""
            };
            this.getListPage(this.obj); // 调用初始加载页面方法
          }).catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 不通过 取消
    handnoCancel() {
      this.isnoDia = false;
      this.pastb = {
        recommendId: "",
        examineStatus: "",
        examineOpinion: ""
      };
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
