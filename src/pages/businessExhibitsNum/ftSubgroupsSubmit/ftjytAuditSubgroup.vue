<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团审核分团数量安排方案" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="企业名称">
            <el-input v-model.trim="formData.companyName" class="widtwo" clearable maxlength="24"></el-input>
          </el-form-item>
          <el-form-item label="商会">
            <el-select v-model="formData.coceralId" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.businessAssociation"
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
          <!--<el-form-item label="是否商会会员">
            <el-select v-model="formData.isCoceralVip" class="widtwo" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.companyCecfCode" class="widtwo" clearable maxlength="24"></el-input>
            <!-- <el-select v-model="formData.companyCecfCode" class="widtwo" clearable>
              <el-option v-for="(item, index) in optioncode" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="布展类型">
            <el-select v-model="formData.exhibitionTypes" clearable>
              <el-option label="绿色特装" value="SPECIAL_BOOTH"></el-option>
              <el-option label="标摊" value="STANDARD_BOOTH"></el-option>
              <el-option label="统一布展" value="UNIFICATION_BOOTH"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否品牌企业">
            <el-select v-model="formData.isBrandCompany" class="widtwo" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="安排情况">
            <el-select v-model="formData.schedulePlan" class="widtwo" clearable>
              <el-option label="已安排" value="1"></el-option>
              <el-option label="未安排" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle floatlaf" type="primary" @click="onSearch">查询</el-button>
            <!-- <el-upload
              class="impfloat floatlaf"
              :action="`${url}/api/ordinaryRecommendBranch/import`"
              :limit="1">
              <el-button class="formStyle" type="primary">导入</el-button>
            </el-upload> -->
            <!-- <el-upload
              class="impfloat flotle"
              action=""
              :limit="1"
              :http-request="uploadFileMethod">
              <el-button class="formStyle" type="primary">导入</el-button>
            </el-upload> -->
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" @selection-change="handleSelection" border>
          <el-table-column type="selection" :selectable="isSelectable" width="55"></el-table-column>
          <el-table-column align="center" min-width="120" label="分团" prop="delegationSubName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="cecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业中文名称" prop="companyName"></el-table-column>
          <el-table-column align="center" label="期数" min-width="120" prop="exhibitionPeriod">
            <template slot-scope="scope">
              {{scope.row.exhibitionPeriod | exhiPer}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="申请数量"  prop="boothNumber"></el-table-column>
          <el-table-column align="center" label="申请布展类型" min-width="120" prop="exhibitionType">
            <template slot-scope="scope">
              {{scope.row.exhibitionType | status}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否统一布展" min-width="120" prop="isUnified">
            <template slot-scope="scope">
              {{scope.row.exhibitionType === "UNIFICATION_BOOTH" ? "是" : "否"}}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" min-width="120" label="粘连申请数量" prop="applyAdjoinNumber"></el-table-column> -->
          <el-table-column align="center" min-width="120" label="产品类别" prop="productType"></el-table-column>
          <el-table-column align="center" min-width="120" label="所属贫困县" prop="poorArea"></el-table-column>
          <el-table-column align="center" min-width="120" label="上届安排特装数" prop="lastSpecialNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="特装推荐数" prop="recommendSpecial"></el-table-column>
          <el-table-column align="center" min-width="120" label="标摊推荐数" prop="recommendStandard"></el-table-column>
          <el-table-column align="center" min-width="120" label="统一布展推荐数" prop="recommendUnified"></el-table-column>
          <el-table-column align="center" min-width="120" label="一般性展位安排总数" prop="recommendSumNumber"></el-table-column>
          <!-- <el-table-column align="center" min-width="120" label="商会" prop="coceralName"></el-table-column> -->
          <!-- <el-table-column align="center" min-width="120" label="布展类型" prop=""></el-table-column> -->
          <!-- <el-table-column align="center" min-width="120" label="企业永久编码" prop="companyId"></el-table-column> -->
          <!-- <el-table-column align="center" min-width="120" label="展区代码" prop="exhibitionArea"></el-table-column> -->
          <el-table-column align="center" label="中央通道推荐数" min-width="120" prop="recommendCentralchannel"></el-table-column>
          <el-table-column align="center" label="分团推荐粘连数" min-width="120" prop="applyAdjoinNumber"></el-table-column>
          <!-- <el-table-column align="center" min-width="120" label="贫困地区展位数量" prop></el-table-column> -->
          <!--<el-table-column align="center" min-width="120" label="是否商会会员" prop="isCoceralVip">
            <template slot-scope="scope">
              {{scope.row.isCoceralVip === "1" ? "是" : "否"}}
            </template>
          </el-table-column>-->
          <!-- <el-table-column align="center" min-width="120" label="是否品牌企业" prop="isBrandCompany">
            <template slot-scope="scope">
              {{scope.row.isBrandCompany === "1" ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="安排情况" prop="schedulePlan">
            <template slot-scope="scope">
              {{scope.row.schedulePlan === "1" ? "已安排" : "未安排"}}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="交易团审核情况" min-width="120" prop="examineStatus">
            <template slot-scope="scope">
              {{scope.row.examineStatus | exmStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="text" :disabled="scope.row.examineStatus === '1'" @click="nPass(scope.row)">通过</el-button>
              <el-button type="text" :disabled="scope.row.examineStatus === '1'" @click="yPass(scope.row)">不通过</el-button> -->
              <el-button type="text" :disabled="scope.row.examineStatus === '1' || scope.row.examineStatus === '3'" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" :disabled="isSelectStatus" size="small" class="formStyle" @click="nPass">批量通过</el-button>
          <el-button type="primary" :disabled="isSelectStatus" size="small" class="formStyle" @click="yPass">批量不通过</el-button>
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
        <!-- 通过弹框 -->
        <el-dialog title="审核" v-loading="loading" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="500px" center>
          <el-form :model="addtForm" :rules="rules" ref="ruleForm" size="small" label-width="160px">
            <el-form-item v-show="ralShow" label="特装展位数" prop="recommendSpecial">
              <el-input v-model.trim.number="addtForm.recommendSpecial" class="widtwo"></el-input>
            </el-form-item>
            <el-form-item v-show="rrdShow" label="标摊展位数" prop="recommendStandard">
              <el-input v-model.trim.number="addtForm.recommendStandard" class="widtwo"></el-input>
            </el-form-item>
            <el-form-item v-show="redShow" label="统一布展数" prop="recommendUnified">
              <el-input v-model.trim.number="addtForm.recommendUnified" class="widtwo"></el-input>
            </el-form-item>
            <el-form-item v-show="relShow" label="中央通道数" prop="recommendCentralchannel">
              <el-input v-model.trim.number="addtForm.recommendCentralchannel" class="widtwo"></el-input>
            </el-form-item>
            <el-form-item v-show="aerShow" label="交易团推荐粘连展位数" prop="applyAdjoinNumber">
              <el-input v-model.trim.number="addtForm.applyAdjoinNumber" class="widtwo"></el-input>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    let tynum = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error("该字段为必填项"));
      // } else
      if (!Number.isInteger(value - 0)) {
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
        delegationId: "010"
      },
      loading: false,
      isSelectStatus: false, //用于判断是否按钮是否可选的状态
      multipleSelection: [], //多选数据放置
      url: process.env.API_NA_URL,
      formData: {
        companyName: "",
        coceralId: "",
        exhibitionAreaCode: "",
        isCoceralVip: "",
        companyCecfCode: "",
        productType: "",
        exhibitionTypes: "",
        delegationSubId: "",
        isBrandCompany: "",
        schedulePlan: ""
      },
      tableData: [],
      isExhibit: false,
      isnoDia: false,
      addtForm: {
        recommendSpecial: "",
        recommendStandard: "",
        recommendUnified: "",
        recommendCentralchannel: "",
        applyAdjoinNumber: ""
      },
      addForm: {},
      ralShow: false, //特装展位数 是否显示
      rrdShow: false, //标摊展位数 是否显示
      redShow: false, //统一布展数 是否显示
      relShow: false, //中央通道数 是否显示
      aerShow: false, //粘连申请数量 是否显示
      rules: {
        recommendSpecial: [{ validator: tynum, trigger: "change" }],
        recommendStandard: [{ validator: tynum, trigger: "change" }],
        recommendUnified: [{ validator: tynum, trigger: "change" }],
        recommendCentralchannel: [{ validator: tynum, trigger: "change" }],
        applyAdjoinNumber: [{ validator: tynum, trigger: "change" }]
      },
      rulesnp: {
        examineOpinion: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      pastb: {
        branchId: "",
        examineStatus: "",
        examineOpinion: ""
      },
      optioncode: [],
      localstora: {
        exhibitionArea: [],
        businessAssociation: []
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      optionsub: [],
      activeName: "first"
    };
  },
  filters: {
    status(val) {
      if (val === "SPECIAL_BOOTH") {
        return "绿色特装";
      } else if (val === "UNIFICATION_BOOTH") {
        return "统一布展";
      } else if (val === "STANDARD_BOOTH") {
        return "标摊";
      } else if (val === "CENTER_CHANNEL_BOOTH") {
        return "中央通道";
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
    exmStatus(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "审核通过";
      } else if (val === "2") {
        return "审核不通过";
      } else if (val === "3") {
        return "已修改";
      }

    }
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  mounted() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取交易团下分团的数据
    this.getsysDepartment({
      deptType: "30",
      parentId: this.$store.getters.userInfo.org.deptId
    }).then(res => {
      this.optionsub = JSON.parse(JSON.stringify(res));
     // console.log(this.optionsub);
    }).catch(e => {});
    // this.getsubCluster({
    //   delegationId: this.$store.getters.userInfo.org.deptId
    // }).then(res => {
    //   this.optionsub = JSON.parse(JSON.stringify(res));
    // }).catch(e => {});
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "getlistPageRecommendBranch", // 查询分团提交的一般性展位安排 1
      "updateRecommendBranch", // 分团编辑设置的一般性展位安排 1
      "addcheckApply", // 交易团审核分团提交的申请
      "uploadordinaryRecommendBranch", // 上传
      "getsysDepartment" // 分团 固定 deptType = 30;
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getassociationDepartment", // 商协会
      "getsubCluster" // 获取交易团下分团的数据
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistPageRecommendBranch(Url)
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
    isSelectable(row, index) {
      //console.log(row);
      if (row.examineStatus === "1" || row.examineStatus === "3") {
        return false;
      } else {
        return true;
      }
    },
    // 表格多选框选中事件
    handleSelection(rows) {
      //console.log(rows);
      this.multipleSelection = rows;
      /*
      if (this.multipleSelection.length > 0) {
        this.isSelectStatus = false;
      } else {
        this.isSelectStatus = true;
      }
      */
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "010"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        if (key[i] === "exhibitionAreaCode") {
          aFirst = "exhibitionArea";
        } else if (key[i] === "companyCecfCode") {
          aFirst = "cecfCode";
        }
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 导入（上传）
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.uploadordinaryRecommendBranch(formData).then(res => {
        this.$message({
          type: "success",
          message: "导入成功"
        });
      }).catch(e => {});
    },
    // 编辑
    edit(val) {
      //console.log(val);
      this.addForm = val;
      console.log(this.addForm, 'this.addForm');
      if (val.exhibitionArea === "MA02") { //大型机械及设备
        this.redShow = true;
        this.addtForm.recommendUnified = val.recommendUnified;
      } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "HD06" || val.exhibitionArea === "VS04") { //工程农机（室内,室外）铁石装饰品及户外水疗设施 车辆
        this.redShow = true;
        this.addtForm.recommendUnified = val.recommendUnified;
        this.ralShow = true;
        this.addtForm.recommendSpecial = val.recommendSpecial;
      } else {
        this.rrdShow = true;
        this.addtForm.recommendStandard = val.recommendStandard;
        this.ralShow = true;
        this.addtForm.recommendSpecial = val.recommendSpecial;
      }
      this.relShow = true;
      this.addtForm.recommendCentralchannel = val.recommendCentralchannel;
      this.aerShow = true;
      this.addtForm.applyAdjoinNumber = val.applyAdjoinNumber;
      this.isExhibit = true;
    },
    // 不通过
    yPass(val) {
      /*
      this.getlistPageRecommendBranch({
        current: 1,
        //current: this.obj.current,
        size: this.paginationData.pageSize,
        delegationId: this.$store.getters.userInfo.org.deptId
      })
        .then(res => {
          let getTable = JSON.parse(JSON.stringify(res.records));
          if (getTable.length > 0) {
            for (let i = 0; i < getTable.length; i++) {
              getTable[i].examineStatus = "2";
            }
            this.addcheckApply(getTable).then(ress => {
              this.isnoDia = false;
              this.$message({
                message: "不通过成功",
                type: "success"
              });
              // this.pastb = {
              //   branchId: "",
              //   examineStatus: "",
              //   examineOpinion: ""
              // };
              this.getListPage(this.obj); // 调用初始加载页面方法
            }).catch(e => {});
          } else {
            this.$message.warning('暂无数据');
          }
        })
        .catch(e => {});
      */
      if (this.multipleSelection.length > 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.multipleSelection[i].examineStatus = "2";
        }
        this.addcheckApply(this.multipleSelection).then(ress => {
          this.isnoDia = false;
          this.$message({
            message: "不通过成功",
            type: "success"
          });
          this.getListPage(this.obj); // 调用初始加载页面方法
        }).catch(e => {});
      } else {
        this.$message.warning('暂无数据');
      }
    },
    // bu通过 编辑 保存
    handSeave(fname) {
      this.loading = true;
      // this.addForm["recommendSpecial"] = this.addtForm.recommendSpecial;
      // this.addForm["recommendStandard"] = this.addtForm.recommendStandard;
      // this.addForm["recommendUnified"] = this.addtForm.recommendUnified;
      // this.addForm["recommendCentralchannel"] = this.addtForm.recommendCentralchannel;
      // this.addForm["applyAdjoinNumber"] = this.addtForm.applyAdjoinNumber;
      let keys = Object.keys(this.addtForm);
      for (let i = 0; i < keys.length; i++) {
        let aFirst = keys[i];
        this.addForm[aFirst] = this.addtForm[keys[i]];
      }
      console.log(this.addtForm, 'addtForm');
      console.log(this.addForm, 'addForm');
      this.$refs[fname].validate((valid) => {
        if (valid) {
          if (this.addForm.branchId == null || this.addForm.branchId === 'null') {
            this.$http.postJson(`${process.env.API_NA_URL}/api/ordinaryRecommendBranch/add`, this.addForm).then(res => {
              this.isExhibit = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.loading = false;
            }).catch(e => {});
          } else {
          // if (this.addtForm.recommendSpecial <= this.addForm.recommendSpecial) {
            this.updateRecommendBranch(this.addForm).then(res => {
              this.isExhibit = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.loading = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
              // this.pastb = {
              //   branchId: this.addForm.branchId,
              //   examineStatus: "1",
              //   examineOpinion: ""
              // };
              // this.addcheckApply(this.pastb).then(resp => {
              //   this.$message({
              //     message: "通过成功",
              //     type: "success"
              //   });
              //   this.addForm = {};
              //   this.addtForm.recommendSpecial = "";
              //   this.pastb = {
              //     branchId: "",
              //     examineStatus: "",
              //     examineOpinion: ""
              //   };
              //   this.getListPage(this.obj); // 调用初始加载页面方法
              // }).catch(e => {});
            }).catch(e => {
              this.loading = false;
            });
          }
          // } else {
          //   this.$message({
          //     type: "error",
          //     message: "最终粘连数应小于等于特装展位数"
          //   });
          // }
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    // bu通过 取消
    handCancel() {
      this.isExhibit = false;
      this.addtForm.recommendSpecial = "";
    },
    // 通过
    nPass(val) {
      // this.isnoDia = true;
      // this.pastb.branchId = val.branchId;
      // this.pastb.examineStatus = "1";
      // this.$refs[fnamen].validate((valid) => {
      //   if (valid) {
      /*
      this.$confirm('是否确认通过', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getlistPageRecommendBranch({
          current: 1,
          size: this.paginationData.pageSize,
          delegationId: this.$store.getters.userInfo.org.deptId
        })
          .then(res => {
            let getTable = JSON.parse(JSON.stringify(res.records));
            console.log(getTable);
            if (getTable.length > 0) {
              for (let i = 0; i < getTable.length; i++) {
                getTable[i].examineStatus = "1";
              }
              this.addcheckApply(getTable).then(resa => {
                this.isnoDia = false;
                this.$message({
                  message: "通过成功",
                  type: "success"
                });
                // this.pastb = {
                //   branchId: "",
                //   examineStatus: "",
                //   examineOpinion: ""
                // };
                this.getListPage(this.obj); // 调用初始加载页面方法
              }).catch(e => {});
            } else {
              this.$message.warning('暂无数据');
            }
          })
          .catch(e => {});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通过'
        });
      });
      */
      this.$confirm('是否确认通过', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.multipleSelection.length > 0) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.multipleSelection[i].examineStatus = "1";
          }
          this.addcheckApply(this.multipleSelection).then(resa => {
            this.isnoDia = false;
            this.$message({
              message: "通过成功",
              type: "success"
            });
            this.getListPage(this.obj); // 调用初始加载页面方法
          }).catch(e => {});
        } else {
          this.$message.warning('暂无数据');
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通过'
        });
      });
    },
    // 通过 保存
    // handnoSeave(fnamen) {
    //   this.pastb.examineStatus = "1";
    //   // this.$refs[fnamen].validate((valid) => {
    //   //   if (valid) {
    //   this.$confirm('是否确认通过', '审核', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.addcheckApply(this.pastb).then(res => {
    //       this.isnoDia = false;
    //       this.$message({
    //         message: "通过成功",
    //         type: "success"
    //       });
    //       this.pastb = {
    //         branchId: "",
    //         examineStatus: "",
    //         examineOpinion: ""
    //       };
    //       this.getListPage(this.obj); // 调用初始加载页面方法
    //     }).catch(e => {});
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消通过'
    //     });
    //   });

    //   //   } else {
    //   //     return false;
    //   //   }
    //   // });
    // },
    // 通过 取消
    handnoCancel() {
      this.isnoDia = false;
      this.pastb = {
        branchId: "",
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
.impfloat {
  margin-left: 10px;
  display: inline-block;
}
.floatlaf {
  float: left;
}
</style>
