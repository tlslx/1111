<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团审核企业申请/代企业申请调整企业展位数量" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="申请展区">
            <el-select v-model="formData.exhibitionArea" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formData.companyName" maxlength="24" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formData.cecfCode" maxlength="24" class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="调整原因">
            <el-select v-model="formData.adjustReason" class="widtwo" clearable>
              <el-option v-for="(item, index) in resonCheck" :key="index" :label="item.adjustReason" :value="item.adjustReason"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="formData.examineStatus" class="widtwo" clearable>
              <el-option label="未审核" value="0"></el-option>
              <el-option label="通过" value="1"></el-option>
              <el-option label="不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyName"></el-table-column>
          <el-table-column align="center" min-width="120" label="广交会编码" prop="cecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="原特装展位数" prop="originalRecommendSpecial"></el-table-column>
          <el-table-column align="center" min-width="120" label="原标摊展位数" prop="originalRecommendStandard"></el-table-column>
          <el-table-column align="center" min-width="120" label="申请调整后特装展位数" prop="adjustRecommendSpecial"></el-table-column>
          <el-table-column align="center" min-width="120" label="申请调整后标摊展位数" prop="adjustRecommendStandard"></el-table-column>
          <el-table-column align="center" min-width="120" label="调整原因" prop="adjustReason"></el-table-column>
          <el-table-column align="center" min-width="120" label="调整函" prop="material">
            <template slot-scope="scope">
              <el-button type="text" class="undline" v-if="scope.row.material" @click="clickAdjest(scope.row.material)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160" label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="undline" :disabled="scope.row.examineStatus === '1' || scope.row.examineStatus === '2'" @click="handAudit(scope.row)">审核</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="审核状态" prop="examineStatus">
            <template slot-scope="scope">
              {{scope.row.examineStatus | statusa}}
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="danger" class="formStyle" size="small" @click="isExhibit = true; fileFlag = false;">新增</el-button>
          <!-- <el-button type="danger" class="formStyle" @click="isExhibit = true">公布</el-button> -->
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
        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="isExhibit" v-if="isExhibit" :close-on-click-modal="false" @close="closeCheck" width="950px">
          <el-form :model="addForm" :inline="true" :rules="rules" ref="ruleForm" size="small" label-width="180px">
            <el-form-item label="企业名称" prop="companyName">
              <el-autocomplete placeholder="请输入" v-model.trim="addForm.companyName" class="widtwo" :fetch-suggestions="querySearch"></el-autocomplete>
            </el-form-item>
            <el-form-item label="广交会编码" prop="cecfCode">
              <el-input v-model.trim="addForm.cecfCode" class="widtwo" disabled maxlength="24"></el-input>
            </el-form-item>
            <el-form-item label="展区" prop="exhibitionArea">
              <el-select v-model="addForm.exhibitionArea" @change="exhiarea" class="widtwo" clearable>
                <el-option
                  v-for="(item, index) in localstora.exhibitionArea"
                  :key="index"
                  :label="item.exhibitionAreaName"
                  :value="item.exhibitionAreaCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品专区" prop="productType">
              <el-select v-model="addForm.productType" @change="prodtyp" class="widtwo" clearable>
                <el-option
                  v-for="(item, index) in optspe"
                  :key="index"
                  :label="item.specialAreaName"
                  :value="item.specialAreaCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="原特装展位数" prop="originalRecommendSpecial">
              <el-input v-model.trim="addForm.originalRecommendSpecial" disabled class="widtwo" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="原标摊展位数" prop="originalRecommendStandard">
              <el-input v-model.trim="addForm.originalRecommendStandard" disabled class="widtwo" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="申请调整后特装展位数" prop="adjustRecommendSpecial">
              <el-input v-model.trim="addForm.adjustRecommendSpecial" class="widtwo" :disabled="disabspec" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="申请调整后标摊展位数" prop="adjustRecommendStandard">
              <el-input v-model.trim="addForm.adjustRecommendStandard" class="widtwo" :disabled="disabstan" maxlength="5"></el-input>
            </el-form-item>
            <el-form-item label="调整原因" prop="adjustReason">
              <el-input v-model.trim="addForm.adjustReason" class="widtwo" maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="调整函" prop="material">
              <el-upload
                class="upload-demo"
                action=""
                ref="upload"
                :limit="1"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :http-request="uploadFileMethod">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handSure('ruleForm')" :disabled="disabspec && disabstan">保存</el-button>
              <el-button @click="handCancel">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog title="审核" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" width="500px">
          <el-form :model="checkForm" :rules="rulecheForm" ref="rulechecForm" size="small" label-width="120px">
            <el-form-item label="审核结果" prop="examineStatus">
              <el-select v-model="checkForm.examineStatus" class="widtwo" clearable>
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="不通过原因" prop="examineOpinion" v-if="checkForm.examineStatus === '2'">
              <el-input v-model="checkForm.examineOpinion" type="textarea" :rows="5" class="widtwo" maxlength="100"></el-input>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handServe('rulechecForm')">保存</el-button>
              <el-button @click="isShow = false">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const BASE_URL = process.env.API_NA_URL;
export default {
  data() {
    let tynum = (rule, value, callback) => {
      if (!Number.isInteger(value - 0) && value !== '') {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0 && value !== '') {
        return callback(new Error("必须大于等于0"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        current: "1",
        size: "10",
        delegationId: "010"
      },
      url: BASE_URL,
      formData: {
        exhibitionArea: "",
        companyName: "",
        cecfCode: "",
        adjustReason: "",
        examineStatus: ""
      },
      options: [],
      restaurant: [], // 带建议的输入框  企业
      tableData: [],
      optionsub: [],
      uploadList: [],
      disabstan: true,
      disabspec: true,
      isExhibit: false,
      isShow: false,
      // 新增
      addForm: {
        companyName: "",
        cecfCode: "",
        exhibitionArea: "",
        productType: "",
        originalRecommendSpecial: "",
        originalRecommendStandard: "",
        adjustRecommendSpecial: "",
        adjustRecommendStandard: "",
        adjustReason: ""
      },
      // 审核
      checkForm: {
        examineStatus: "",
        examineOpinion: ""
      },
      setForm: {}, // 设置优先级
      // 新增 校验
      rules: {
        companyName: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        // cecfCode: [{ required: false, message: "该字段为必填项", trigger: "blur" }],
        exhibitionArea: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        productType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        // originalRecommendSpecial: [{ required: false, validator: tynum, trigger: "change" }],
        // originalRecommendStandard: [{ required: false, validator: tynum, trigger: "change" }],
        adjustRecommendSpecial: [{ validator: tynum, trigger: "change" }],
        adjustRecommendStandard: [{ validator: tynum, trigger: "change" }],
        adjustReason: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
        // material: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      optspe: [],
      // 审核 校验
      rulecheForm: {
        examineStatus: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        examineOpinion: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      publishedGoOpts: ['广交会官网', '内部管理系统', '易捷通系统'],
      publishRules: {
        publishWay: [{ required: true, message: '请选择至少一项发布渠道', trigger: 'change' }]
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      resonCheck: [],
      acredit: {
        recordId: "",
        authorizeStatus: ""
      },
      urlid: {},
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      stra: "",
      token: "",
      fileFlag: false, // 文件是否上传
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
        return "通过";
      } else if (val === "2") {
        return "不通过";
      }
    }
  },
  created() {
    this.obj = {
      current: "1",
      size: "10",
      delegationId: "010"
    };
    this.localstora.exhibitionArea = [];
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    // let mate = this.$store.getters.userInfo.org.deptName;
    // this.stra = mate.substring(mate.length - 3, mate.length);
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
    }
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
    //获取当前页面公司名称数据
    this.$http.get(`${process.env.API_NA_URL}/api/newthemeAdjustCompany/getCompanyList?dealClusterId=${this.$store.getters.userInfo.org.deptId}`).then((res) => {
      this.options = res;
      this.options.forEach(element => {
        let data = {
          "value": element.companyName,
          "address": element.companyId
        };
        this.restaurant.push(data);
      });
    }).catch(e => {});
    this.getListPage(this.obj);
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"]),
    ...mapGetters("thenewThemel", ["uploadNac"])
  },
  methods: {
    ...mapActions("thenewThemel", [
      "addnewthemeAdjustCompany", // 6.41 企业/交易团申请新题材展位调整 新增
      "addcheckAdjustCompany", // 6.42 交易团审核企业调整申请
      "getnewthemeAdjustCompany", // 6.43 交易团根据企业名称、展区、产品专区获取企业的展位申请数 新增前的判断条件
      "getlistNewthemeAdjustCompany", // 6.44 企业/交易团查询新题材展位安排
      "updatenewthemeAdjustCompany", // 6.45 企业/交易团编辑新题材展位调整
      "uploadnewthemeAdjustCompany", // 6.46 上传调整函
      "downloadnewthemeAdjustCompany" // 6.47 下载调整函
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getexhibitionAreaDTOList" // 新题材展区
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistNewthemeAdjustCompany(Url)
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
              adjustReason: getTable[i].adjustReason
            };
            this.resonCheck.push(data);
          }
          // 数组去重
          let hasd = {};
          this.resonCheck = this.resonCheck.reduce(function(item, next) {
            hasd[next.adjustReason] ? '' : hasd[next.adjustReason] = true && item.push(next);
            return item;
          }, []);
        })
        .catch(e => {});
    },
    // 企业可选建议搜索
    querySearch(queryString, cb) {
      let restaurant = this.restaurant;
      let results = queryString ? restaurant.filter(this.createFilte(queryString)) : restaurant;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 企业调用的方法
    createFilte(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);//实现模糊查询
      };
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "010"
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
    // 下载
    handDownload() {
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&delegationId=${this.obj.delegationId}&examineStatus=${this.formData.examineStatus}&adjustReason=${this.formData.adjustReason}&companyName=${this.formData.companyName}&cecfCode=${this.formData.cecfCode}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/newthemeAdjustCompany/boothNumberAdjust/download?current=" + url, "_parent");
    },
    // 关闭新增 弹框
    closeCheck() {
      this.disabstan = true;
      this.disabspec = true;
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
    },
    // 审核 按钮
    handAudit(val) {
      this.isShow = true;
      this.checkForm["demandRecordId"] = val.demandRecordId;
    },
    // 审核 保存
    handServe(famea) {
      this.$refs[famea].validate((vald) => {
        if (vald) {
          this.addcheckAdjustCompany(this.checkForm)
            .then(res => {
              this.isShow = false;
              this.$message({
                message: "确认成功",
                type: "success"
              });
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 新增 展区 change
    exhiarea() {
      if (this.addForm.companyName && this.addForm.exhibitionArea && this.addForm.productType) {
        let exhpro = {
          delegationId: this.$store.getters.userInfo.org.deptId,
          companyName: this.addForm.companyName,
          exhibitionArea: this.addForm.exhibitionArea,
          productType: this.addForm.productType
        };
        this.getnewthemeAdjustCompany(exhpro).then(res => {
          this.addForm.cecfCode = res.cecfCode;
          this.addForm["companyId"] = res.companyId;
          this.addForm["demandRecordId"] = res.demandRecordId;
          this.addForm.originalRecommendSpecial = res.originalRecommendSpecial;
          this.addForm.originalRecommendStandard = res.originalRecommendStandard;
          if (res.exhibitionType === "STANDARD_BOOTH") {
            this.disabstan = false;
            this.disabspec = true;
          } else if (res.exhibitionType === "SPECIAL_BOOTH") {
            this.disabstan = true;
            this.disabspec = false;
          }
        }).catch(e => {
          this.disabstan = true;
          this.disabspec = true;
        });
      }
      this.optspe = [];
      // 专区
      if (this.addForm.exhibitionArea) {
        this.getexhibitionInfoByCode({ exhibitionAreaCode: this.addForm.exhibitionArea }).then(res => {
          this.optspe = JSON.parse(JSON.stringify(res));
        }).catch(e => {});
      }
    },
    // 新增 专区 change
    prodtyp() {
      let tynum = (rule, value, callback) => {
        if (!Number.isInteger(value - 0) && value !== '') {
          return callback(new Error("请输入合法字符"));
        } else if (value < 0 && value !== '') {
          return callback(new Error("必须大于等于0"));
        } else {
          return callback();
        }
      };
      if (this.addForm.companyName && this.addForm.exhibitionArea && this.addForm.productType) {
        let exhpro = {
          delegationId: this.$store.getters.userInfo.org.deptId,
          companyName: this.addForm.companyName,
          exhibitionArea: this.addForm.exhibitionArea,
          productType: this.addForm.productType
        };
        this.getnewthemeAdjustCompany(exhpro).then(res => {
          this.addForm.cecfCode = res.cecfCode;
          this.addForm["companyId"] = res.companyId;
          this.addForm["demandRecordId"] = res.demandRecordId;
          this.addForm["productTypeName"] = res.productTypeName;
          this.addForm.originalRecommendSpecial = res.originalRecommendSpecial;
          this.addForm.originalRecommendStandard = res.originalRecommendStandard;
          if (res.exhibitionType === "STANDARD_BOOTH") {
            this.disabstan = false;
            this.disabspec = true;
            this.rules.adjustRecommendSpecial = [];
            this.rules.adjustRecommendStandard = [{ validator: tynum, trigger: "change" }];
          } else if (res.exhibitionType === "SPECIAL_BOOTH") {
            this.disabstan = true;
            this.disabspec = false;
            this.rules.adjustRecommendSpecial = [{ validator: tynum, trigger: "change" }];
            this.rules.adjustRecommendStandard = [];
          }
        }).catch(e => {
          this.disabstan = true;
          this.disabspec = true;
        });
      }
    },
    // 文件移除
    handleRemove(file, fileList) {
      this.$refs.upload.clearFiles();
      this.urlid = '';
      this.fileFlag = false;
    },
    // 文件改变
    handleChange(file, fileList) {
      // let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);				
      // const extension = testmsg === 'xls';
      // const extension2 = testmsg === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      // if (!extension && !extension2) {
      //   this.$message({
      //     message: '上传文件只能是 xls、xlsx格式!',
      //     type: 'warning'
      //   });
      //   fileList.splice(0, fileList.length);
      // }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
      }
    },
    // 自定义文件上传
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.urlid = formData;
      this.fileFlag = true;
    },
    // 新增 确认
    handSure(datae) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.addForm["delegationId"] = this.$store.getters.userInfo.org.deptId;
      this.addForm["delegationName"] = this.$store.getters.userInfo.org.deptName;
      this.addForm["originator"] = "DELEGATION";
      for (let i = 0; i < this.localstora.exhibitionArea.length; i++) {
        if (this.addForm.exhibitionArea === this.localstora.exhibitionArea[i].exhibitionAreaCode) {
          this.addForm["exhibitionAreaName"] = this.localstora.exhibitionArea[i].exhibitionAreaName;
        }
      }
      if (this.fileFlag) {
        this.uploadnewthemeAdjustCompany(this.urlid).then(res => {
          this.addForm.material = res.fileId;
          // if (this.addForm.material !== "") {
          //   this.rules.material[0].required = false;
          // } else {
          //   this.rules.material[0].required = true;
          // }
          this.$refs[datae].validate((vald) => {
            if (vald) {
              this.addnewthemeAdjustCompany(this.addForm)
                .then(resa => {
                  this.$nextTick(() => {
                    fullScreenloading.close();
                  });
                  this.isExhibit = false;
                  this.$message({
                    message: "新增成功",
                    type: "success"
                  });
                  this.disabstan = true;
                  this.disabspec = true;
                  this.$refs.upload.clearFiles();
                  this.getListPage(this.obj); // 调用初始加载页面方法
                  for (const key in this.addForm) {
                    this.addForm[key] = "";
                  }
                })
                .catch(e => {
                  this.$nextTick(() => {
                    fullScreenloading.close();
                  });
                });
            } else {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              return false;
            }
          });
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      } else {
        this.addForm.material = '';
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.addnewthemeAdjustCompany(this.addForm)
              .then(resa => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.isExhibit = false;
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.disabstan = true;
                this.disabspec = true;
                this.getListPage(this.obj); // 调用初始加载页面方法
                for (const key in this.addForm) {
                  this.addForm[key] = "";
                }
              })
              .catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
          } else {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            return false;
          }
        });
      }
    },
    // 新增 取消
    handCancel() {
      this.isExhibit = false;
      this.disabstan = true;
      this.disabspec = true;
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
    },
    // 调整函下载
    clickAdjest(val) {
      if (val) {
        window.open(this.url + "/api/newthemeAdjustCompany/download?fileId=" + val, "_parent");
      } else {
        this.$message({
          type: "error",
          message: "调整函下载失败！"
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
