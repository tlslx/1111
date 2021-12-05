<template>
    <!-- 默认标签页 -->
    <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
      <el-tab-pane label="工作部品牌评审规则设置" name="first">
      <!-- form表单 -->
        <el-form :inline="true" :model="formData" class="demo-form-inline" size="mini">
          <el-form-item label="项目">
            <el-select v-model="formData.setType" placeholder="请选择" @change="settype">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="细分项">
            <el-select v-model="formData.stage" placeholder="请选择" @change="stage">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              
            <el-button type="primary" @click="onSubmit"> 查询 </el-button>
          </el-form-item>
        </el-form>
        <div>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%;"
          size="small"
          align="center"
          border>
          <el-table-column align="center" prop="projectName" label="项目">
            <template slot-scope="scope">
              <div>{{scope.row.projectName}}&nbsp; ( 总分{{scope.row.totalScore}}分 )</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="itemName" label="细分项">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList == null">{{scope.row.itemName}}</div>
              <div v-else-if="scope.row.childrenList && scope.row.childrenList.length === 0">{{scope.row.itemName}}</div>
              <div v-else v-for="(item,index) in scope.row.childrenList" :key="index" :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">{{item.itemName}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="minScore" label="最小值">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList == null">{{scope.row.minScore}}</div>
              <div v-if="scope.row.childrenList && scope.row.childrenList.length === 0">{{scope.row.minScore}}</div>
              <div v-else v-for="(item,index) in scope.row.childrenList" :key="index" :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">{{item.minScore}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="maxScore" label="最大值">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList == null">{{scope.row.maxScore}}</div>
              <div v-if="scope.row.childrenList && scope.row.childrenList.length === 0">{{scope.row.maxScore}}</div>
              <div v-else v-for="(item,index) in scope.row.childrenList" :key="index" :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">{{item.maxScore}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList == null">{{scope.row.remark}}&nbsp;</div>
              <div v-if="scope.row.childrenList && scope.row.childrenList.length === 0">{{scope.row.remark}}&nbsp;</div>
              <div v-else v-for="(item,index) in scope.row.childrenList" :key="index"  :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">{{item.remark}}&nbsp;</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList == null">
                <el-button
                  @click="updateRow(scope.row)"
                  type="text"
                  size="small">
                  修改
                </el-button>
                <el-button
                  @click="deleteRow(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </div>
              <div v-if="scope.row.childrenList && scope.row.childrenList.length === 0">
                <el-button
                  @click="updateRow(scope.row)"
                  type="text"
                  size="small">
                  修改
                </el-button>
                <el-button
                  @click="deleteRow(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </div>
              <div v-else v-for="(item,index) in scope.row.childrenList" :key="index" :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                <el-button
                  @click="updateRow(item)"
                  type="text"
                  size="small">
                  修改
                </el-button>
                <el-button
                  @click="deleteRow(item)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 按钮 -->
        <el-button type="danger" @click="add" style="margin-bottom: 500px;">新增</el-button>
        <!-- <el-button type="primary">下载</el-button> -->
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="isShow" width="30%" @close='closeDialog' v-if="isShow">
          <el-card>
            <!-- <div slot="header">
              <span>新增</span>
            </div> -->
            <div>
              <el-form :model="formData" :rules="rules" status-icon>
                <el-form-item label="项目：" prop="setType" class="marginBor">
                  <el-select v-model="formData.setTypeOne" placeholder="请选择" @change="settypeOne">
                    <el-option
                      v-for="item in optionsOne"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目总分：" prop="total" class="marginBor">
                  <el-input @keyup.native="provingTwo" maxlength="3" max="100" v-model.trim="formData.total"></el-input>
                </el-form-item>
                
                <!-- <el-form-item label="细分项：" v-show="isAddTwo" prop="stage3" class="marginBor">
                  <el-select style="width: 280px;" v-model="formData.stage3" placeholder="请选择" @change="stage">
                    <el-option
                      v-for="item in optionsData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-button type="primary" size="mini" v-show="isAddTwo">删除</el-button>
                <el-form-item label="分值范围：" v-show="isAddTwo" class="marginBor" prop="max">
                  <el-input @keyup.native="provingTwo" maxlength="2" style="width: 105px;" v-model.trim="formData.min3"></el-input>
                  <span> 至 </span>
                  <el-input @keyup.native="provingTwo" maxlength="3" max="100" style="width: 105px;" v-model.trim="formData.max3"></el-input>
                </el-form-item> -->

                <el-form-item label="细分项：" v-show="isAdd" prop="stage" class="marginBor">
                  <el-select style="width: 280px;" v-model="formData.stage" placeholder="请选择" @change="stage">
                    <el-option
                      v-for="item in optionsData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                  <el-button type="primary" size="mini" v-show="isAdd" @click="delData">删除</el-button>
                  <!-- <el-button v-if="isAddTwo" type="primary" size="mini" v-show="isAdd" @click="delData">新增</el-button> -->
                </el-form-item>
                <el-form-item label="分值范围：" v-show="isAdd" class="marginBor" prop="max">
                  <el-input @keyup.native="provingTwo" maxlength="2" style="width: 105px;" v-model.trim="formData.min"></el-input>
                  <span> 至 </span>
                  <el-input @keyup.native="provingTwo" maxlength="3" max="100" style="width: 105px;" v-model.trim="formData.max"></el-input>
                </el-form-item>
                <el-form-item label="细分项：" prop="stage2" class="marginBor">
                  <el-select style="width: 280px;" v-model="formData.stage2">
                    <el-option
                      v-for="item in optionsData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button type="primary" size="mini" @click="addData" :disabled="isAdd">新增</el-button>
                </el-form-item>
                <el-form-item label="分值范围：" class="marginBor" prop="max2">
                  <el-input @keyup.native="provingTwo" maxlength="2" style="width: 105px;" v-model.trim="formData.min2"></el-input>
                  <span> 至 </span>
                  <el-input @keyup.native="provingTwo" maxlength="3" max="100" style="width: 105px;" v-model.trim="formData.max2"></el-input>
                </el-form-item>
                <el-form-item label="备注：" class="marginBor">
                  <el-input type="textarea" maxlength="128" rows="5" style="width: 280px;" v-model.trim='formData.remark'></el-input>
                </el-form-item>
                <el-form-item class="marginBor">
                  <el-button type="danger" @click="serveData">保存</el-button>
                  <el-button @click="isCansole">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-dialog>
        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="isShow2" width="30%" @close='closeDialogTwo'>
          <el-card>
            <!-- <div slot="header">
              <span>修改</span>
            </div> -->
            <div>
              <el-form :data="formData2">
                <el-form-item label="项目：">
                  <el-input v-model="formData2.projectName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="总分：">
                  <el-input v-model="formData2.totalScore" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="细分项：">
                  <el-input v-model="formData2.itemName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="最小值">
                  <el-input @keyup.native="proving" maxlength="2" v-model="formData2.minScore"></el-input>
                </el-form-item>
                <el-form-item label="最大值">
                  <el-input @keyup.native="proving" maxlength="3" max="100" v-model="formData2.maxScore"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" maxlength="200" rows="5" v-model="formData2.remark"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSure">确定</el-button>
                  <el-button @click="ofCansole">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-dialog>
        <!-- 确认删除 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>确定要删除该信息？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="isTrue">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      </el-tab-pane>
    </el-tabs>
</template>
<script>
// let ddata = JSON.parse(window.localStorage.getItem('dictData'));
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullLoading: true,
      isAddTwo: false,
      borderBottom: {
        borderBottom: "1px solid #ebeef5"
      },
      trueMassage: {},
      dialogVisible: false,
      obj: {
        "data": {
        },
        "errorCode": "NONE",
        "flag": "string",
        "message": "string"
      },
      search: true,
      isAdd: false,
      isShow: false,
      isShow2: false,
      tableData: [],
      options: [],
      optionsData: [],
      options1: [
        { label: '全部', value: "" },
        { label: '出口额', value: "EXPORT_VOLUME" },
        { label: '境内外商标注册', value: "DF_TRADEMARK_REGIST" },
        { label: '品牌建设', value: "BRAND_CONSTRUCTION" },
        { label: '研发创新和自主知识产权', value: "INNOVATE_PROPERTY" },
        { label: '国际通行认证', value: "INTEL_PASS_CERTIFIED" },
        { label: '行业自律', value: "INDUSTRY_DISCIPLINE" },
        { label: '广交会参展表现', value: "EXH_PERFORMANCE" }
      ],
      optionsOne: [
        { label: '出口额', value: "EXPORT_VOLUME" },
        { label: '境内外商标注册', value: "DF_TRADEMARK_REGIST" },
        { label: '品牌建设', value: "BRAND_CONSTRUCTION" },
        { label: '研发创新和自主知识产权', value: "INNOVATE_PROPERTY" },
        { label: '国际通行认证', value: "INTEL_PASS_CERTIFIED" },
        { label: '行业自律', value: "INDUSTRY_DISCIPLINE" },
        { label: '广交会参展表现', value: "EXH_PERFORMANCE" }
      ],
      optionsTwo: [
        { label: "", value: "EXPORT_VOLUME" },
        { value: "DF_TRADEMARK_REGIST", label: [
          { label: "境内商标", value: "DF_TRADEMARK_REGIST_IN" },
          { label: "境外商标", value: "DF_TRADEMARK_REGIST_OUT" }
        ] },
        { label: "", value: "BRAND_CONSTRUCTION" },
        { value: "INNOVATE_PROPERTY", label: [
          { label: "专利与版权", value: "INNOVATE_PROPERTY_PATENT" },
          { label: "国家或行业标准", value: "INNOVATE_PROPERTY_STANDARD" },
          { label: "高新技术企业", value: "INNOVATE_PROPERTY_HIGH_NEW" }
        ] },
        { value: "INTEL_PASS_CERTIFIED", label: [
          { label: "质量、环境管理体系认证", value: "INTEL_PASS_CERTIFIED_QUALITY_ ENVIRONMENT" },
          { label: "面向企业的行业认证", value: "INTEL_PASS_CERTIFIED_FACE_COMPANY" },
          { label: "面向产品或生产线的行业认证", value: "INTEL_PASS_CERTIFIED_FACE_PRODUCT" }
        ] },
        { label: "", value: "INDUSTRY_DISCIPLINE" },
        { label: "", value: "EXH_PERFORMANCE" }
      ],
      options2: [
        { label: "", value: "EXPORT_VOLUME" },
        { value: "DF_TRADEMARK_REGIST", label: [
          { label: "境内外商标注册" },
          { label: "境内商标", value: "DF_TRADEMARK_REGIST_IN" },
          { label: "境外商标", value: "DF_TRADEMARK_REGIST_OUT" }
        ] },
        { label: "", value: "BRAND_CONSTRUCTION" },
        { value: "INNOVATE_PROPERTY", label: [
          { label: "研发创新和自主知识产权" },
          { label: "专利与版权", value: "INNOVATE_PROPERTY_PATENT" },
          { label: "国家或行业标准", value: "INNOVATE_PROPERTY_STANDARD" },
          { label: "高新技术企业", value: "INNOVATE_PROPERTY_HIGH_NEW" }
        ] },
        { value: "INTEL_PASS_CERTIFIED", label: [
          { label: "国际通行认证" },
          { label: "质量、环境管理体系认证", value: "INTEL_PASS_CERTIFIED_QUALITY_ ENVIRONMENT" },
          { label: "面向企业的行业认证", value: "INTEL_PASS_CERTIFIED_FACE_COMPANY" },
          { label: "面向产品或生产线的行业认证", value: "INTEL_PASS_CERTIFIED_FACE_PRODUCT" }
        ] },
        { label: "", value: "INDUSTRY_DISCIPLINE" },
        { label: "", value: "EXH_PERFORMANCE" }
      ],
      options3: [
        { label: "交易团", value: "31" },
        { label: "商协会", value: "32" },
        { label: "企业", value: "33" }
      ],
      formData: {
        user: "",
        seting: "",
        setType: "",
        setTypeOne: "",
        stage: "",
        total: "",
        remark: "",
        min: "",
        max: "",
        min2: "",
        max2: "",
        stage2: ""
      },
      rules: {
        setType: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        total: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        max2: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        max: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        stage2: [
          { required: false, message: '必填项', trigger: 'blur' }
        ],
        stage: [
          { required: false, message: '必填项', trigger: 'blur' }
        ]
      },
      formData2: {},
      activeName: "first"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions("brandWorkDepartment", [
      "getbrandEvaluationRules",
      "deletereviewRules",
      "updatebasedPrimaryKey",
      // "getqueryReviewRuleSettings",
      "getaddWorkDepartmentBrand"
    ]),
    proving() {
      this.formData2.minScore = this.formData2.minScore.replace(/[^\.\d]/g, '');
      this.formData2.minScore = this.formData2.minScore.replace('.', '');
      this.formData2.maxScore = this.formData2.maxScore.replace(/[^\.\d]/g, '');
      this.formData2.maxScore = this.formData2.maxScore.replace('.', '');
    },
    provingTwo() {
      this.formData.max2 = this.formData.max2.replace(/[^\.\d]/g, '');
      this.formData.max2 = this.formData.max2.replace('.', '');
      this.formData.min2 = this.formData.min2.replace(/[^\.\d]/g, '');
      this.formData.min2 = this.formData.min2.replace('.', '');
      this.formData.max = this.formData.max.replace(/[^\.\d]/g, '');
      this.formData.max = this.formData.max.replace('.', '');
      this.formData.min = this.formData.min.replace(/[^\.\d]/g, '');
      this.formData.min = this.formData.min.replace('.', '');
      this.formData.total = this.formData.total.replace(/[^\.\d]/g, '');
      this.formData.total = this.formData.total.replace('.', '');
    },
    closeDialog() {
      this.isAdd = false;
      this.options = [];
      this.optionsData = [];
      // 清空表单中所有属性的值
      for (let key in this.formData) {
        this.formData[key] = '';
      }
      this.getList();
      this.formData.setType = "";
      this.formData.stage = "";
    },
    closeDialogTwo() {
      // 清空表单中所有属性的值
      for (let key in this.formData2) {
        this.formData2[key] = '';
      }
      this.getList();
      this.formData.setType = "";
      this.formData.stage = "";
    },
    handleClose() {},
    getList() {
      // 获取所有数据
      this.obj = {
        "data": {
        },
        "errorCode": "NONE",
        "flag": "string",
        "message": "string"
      };
      this.getbrandEvaluationRules(this.obj).then(res => {
        this.fullLoading = false;
        this.tableData = res.records;
      }).catch(e => {});
    },
    deleteRow(dadd) {
      // 删除
      if (!this.isShow2 && !this.isShow) {
        this.dialogVisible = true;
        this.obj['reviewRuleId'] = dadd.reviewRuleId;
        this.deletereviewRules(this.obj).then(res => {
        }).catch(e => {});
      }
      
    },
    isTrue() {
      this.dialogVisible = false;
      this.tableData = [];
      this.getList();
    },
    updateRow(val) {
      // 修改
      this.formData2 = val;
      if (!this.isShow) {
        this.isShow2 = true;
      }
    },
    handleSure() {
      // 修改
      this.obj['reviewRuleId'] = this.formData2.reviewRuleId;
      this.obj['minScore'] = this.formData2.minScore;
      this.obj['maxScore'] = this.formData2.maxScore;
      this.obj['totalScore'] = this.formData2.totalScore;
      this.obj['remark'] = this.formData2.remark;
      if (Number(this.formData2.minScore) >= Number(this.formData2.maxScore)) {
        this.$message('修改失败！最小值应小于最大值');
      } else if (Number(this.formData2.maxScore) > Number(this.formData2.totalScore)) {
        this.$message('修改失败！最大值应小于等于总分');
      } else {
        this.isShow2 = false;
        this.updatebasedPrimaryKey(this.obj).then(res => {
          this.tableData = [];
          this.getList();
        }).catch(e => {});
      }
    },
    onSubmit() {
      // 查询
      this.obj = {};
      for (let i = 0; i < this.options.length; i++) {
        if ((this.options[i].value + "") === (this.formData.stage + "")) {
          this.obj['itemCode'] = this.options[i].value;
        }
      }
      this.obj['projectCode'] = this.formData.setType;
      this.search = false;
      this.getSearch(this.obj);
    },
    getSearch(datt) {
      // 查询
      if (datt.projectCode === "") {
        this.getList();
      } else {
        let _this = this;
        this.tableData = [];
        this.getbrandEvaluationRules(datt).then(res => {
          if (res.total === 0) {
            this.tableData = [];
          } else {
            _this.tableData = res.records;
          }
          _this.search = true;
        }).catch(e => {});
      }
    },
    settypeOne(valOne) {
      this.optionsData = [];
      this.formData.stage = "";
      this.formData.stage2 = "";
      let _this = this;
      for (let i = 0; i < this.optionsTwo.length; i++) {
        if (this.optionsTwo[i].value === valOne) {
          this.optionsData = this.optionsTwo[i].label;
          this.optionsData === "" ? _this.rules.stage2[0].required = false : _this.rules.stage2[0].required = true;
          this.optionsData === "" ? _this.rules.stage[0].required = false : _this.rules.stage[0].required = true;
        }
      }
    },
    settype(val) {
      this.options = [];
      this.formData.stage = "";
      this.formData.stage2 = "";
      let _this = this;
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].value === val) {
          this.options = this.options2[i].label;
          this.options === "" ? _this.rules.stage2[0].required = false : _this.rules.stage2[0].required = true;
        }
      }
    },
    add() {
      if (!this.isShow2) {
        this.isShow = true;
      }
    },
    addData() {
      if (this.formData.stage2) {
        this.isAdd = true;
      }
    },
    isCansole() {
      this.isAdd = false;
      this.isShow = false;
      this.optionsData = [];
      // 清空表单中所有属性的值
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
    ofCansole() {
      this.isShow2 = false;
      // 清空表单中所有属性的值
      for (let key in this.formData2) {
        this.formData2[key] = '';
      }
      this.getList();
    },
    delData() {
      this.isAdd = false;
      this.formData.stage = "";
      this.formData.min = "";
      this.formData.max = "";
    },
    serveData() {
      // 新增
      let aFirst = "";
      let datra = {};
      let bSecend = "";
      let cThrid = "";
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].value === this.formData.setTypeOne) {
          aFirst = this.options1[i].label;
        }
      }
      for (let j = 0; j < this.optionsData.length; j++) {
        if (this.optionsData[j].value === this.formData.stage) {
          bSecend = this.optionsData[j].label;
        }
      }
      for (let k = 0; k < this.optionsData.length; k++) {
        if (this.optionsData[k].value === this.formData.stage2) {
          cThrid = this.optionsData[k].label;
        }
      }
      // for (let l = 0; l < this.optionsData.length; l++) {
      //   if (this.optionsData[l].value === this.formData.stage3) {
      //     dd = this.optionsData[l].label;
      //   }
      // }
      // console.log(!this.formData.setTypeOne && !this.formData.min2 && !this.formData.max2);
      if (!this.formData.setTypeOne) {
        this.$message("项目不能为空");
      } else
      if (!this.formData.total) {
        this.$message("项目总分不能为空");
      } else
      if (this.formData.total > 100) {
        this.$message("项目总分最大不超过100分");
      } else
      if (!this.formData.min2) {
        this.$message("最小值不能为空");
      } else
      if (!this.formData.max2) {
        this.$message("最大值不能为空");
      } else
      if (Number(this.formData.min2) >= Number(this.formData.max2)) {
        this.$message("最小值不应大于最大值");
      } else
      if (Number(this.formData.max2) > Number(this.formData.total) || Number(this.formData.max) > Number(this.formData.total) || Number(this.formData.max3) > Number(this.formData.total)) {
        this.$message("最大值不应大于总分");
      } else
      if (Number(this.formData.max2) + Number(this.formData.min2) > Number(this.formData.total) || Number(this.formData.max) + Number(this.formData.min) > Number(this.formData.total)) {
        this.$message("最小值最大值之和不应大于总分");
      } else {
        if (!this.formData.stage2) {
          datra = {
            "projectCode": this.formData.setTypeOne,
            "projectName": aFirst,
            "totalScore": this.formData.total,
            "minScore": this.formData.min2,
            "maxScore": this.formData.max2,
            "remark": this.formData.remark
          };
        } else if (this.formData.stage2 && !this.formData.stage) {
          datra = {
            "projectCode": this.formData.setTypeOne,
            "projectName": aFirst,
            "totalScore": this.formData.total,
            "minScore": 0,
            "maxScore": 0,
            "remark": this.formData.remark,
            "childrenList": [
              {
                "itemCode": this.formData.stage2,
                "itemName": cThrid,
                "totalScore": 10,
                "minScore": this.formData.min2,
                "maxScore": this.formData.max2,
                "remark": this.formData.remark
              }
            ]
          };
        } else if (this.formData.stage && this.formData.stage2) {
          datra = {
            "projectCode": this.formData.setTypeOne,
            "projectName": aFirst,
            "totalScore": this.formData.total,
            "minScore": 0,
            "maxScore": 0,
            "remark": this.formData.remark,
            "childrenList": [
              {
                "itemCode": this.formData.stage2,
                "itemName": bSecend,
                "totalScore": 10,
                "minScore": this.formData.min,
                "maxScore": this.formData.max,
                "remark": this.formData.remark
              },
              {
                "itemCode": this.formData.stage,
                "itemName": cThrid,
                "totalScore": 10,
                "minScore": this.formData.min2,
                "maxScore": this.formData.max2,
                "remark": this.formData.remark
              }
            ]
          };
        } 
        // else {
        //   datra = {
        //     "projectCode": this.formData.setTypeOne,
        //     "projectName": aFirst,
        //     "totalScore": this.formData.total,
        //     "minScore": 0,
        //     "maxScore": 0,
        //     "remark": this.formData.remark,
        //     "childrenList": [
        //       {
        //         "itemCode": this.formData.stage2,
        //         "itemName": bSecend,
        //         "totalScore": 10,
        //         "minScore": this.formData.min,
        //         "maxScore": this.formData.max,
        //         "remark": this.formData.remark
        //       },
        //       {
        //         "itemCode": this.formData.stage,
        //         "itemName": cThrid,
        //         "totalScore": 10,
        //         "minScore": this.formData.min2,
        //         "maxScore": this.formData.max2,
        //         "remark": this.formData.remark
        //       },
        //       {
        //         "itemCode": this.formData.stage3,
        //         "itemName": dd,
        //         "totalScore": 10,
        //         "minScore": this.formData.min3,
        //         "maxScore": this.formData.max3,
        //         "remark": this.formData.remark
        //       }
        //     ]
        //   };
        // }
        this.isShow = false;
        this.isAdd = false;
        // 增加
        this.tableData = [];
        this.getaddWorkDepartmentBrand(datra).then(res => {
          this.getList();
          // 清空表单中所有属性的值
          for (let key in this.formData) {
            this.formData[key] = '';
          }
        }).catch(e => {
          this.getList();
        });
        // 清空表单中所有属性的值
        for (let key in this.formData) {
          this.formData[key] = '';
        }
        this.optionsData = [];
      }
    },
    stage(vel) {
      this.formData.stage = vel;
    }
  }
};
</script>
<style scoped>
.marginBor {
  margin-bottom: 25px;
}
.el-tab-pane >>> input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none; 
    margin: 0; 
}
.el-tab-pane >>> input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none; 
    margin: 0; 
}
.borderBottom{
  border-bottom: 1px solid #ebeef5;
}
.el-tab-pane >>> .el-table td, .el-table th{
  padding: 0 !important;
}
.el-tab-pane >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding: 0 !important;
  margin: 0 !important;
}
.el-tab-pane >>> .el-table .cell, .el-table th div{
  padding: 0 !important; 
}
.el-tab-pane >>> .el-table .cell{
  line-height: 5;
}
</style>

