<template>
  <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="设置模板" name="first" v-loading.fullscreen="fullLoading"> -->
  <el-card style="padding-bottom: 24px">
    <!-- 表单 -->
    <el-form :inline="true" :model="formData" size="small">
      <el-form-item label="交易团">
        <el-select v-model="formData.delegationId" clearable>
          <!-- <el-option label="江苏" value="1"></el-option> -->
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
      <el-form-item v-if="false" label="专区">
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
      <el-table-column align="center" min-width="120" label="申报项目" prop="demandName"></el-table-column>
      <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
      <!-- <el-table-column align="center" min-width="120" label="专区" prop="specialAreaName"></el-table-column> -->
      <el-table-column align="center" min-width="120" label="展位类别" prop="boothType">
        <template slot-scope="scope">{{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}</template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
        <template slot-scope="scope">
          {{scope.row.exhibitionPeriod | nper}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="申报交易团" prop="delegationName" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" min-width="120" label="申报类型" prop="demandType">
        <template slot-scope="scope">
          {{scope.row.demandType | checktus}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="140" label="限制最大可申报展位数" prop="inputRule"></el-table-column>
      <el-table-column align="center" min-width="120" label="是否启用" prop="openStatus">
        <template slot-scope="scope">
          {{scope.row.openStatus === "1" ? "是" : "否"}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
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
        <el-form-item label="申报项目 ：" prop="demandName" class="addstyle">
          <el-input v-model.trim="addForm.demandName" class="wid"></el-input>
        </el-form-item>
        <el-form-item label="申报类型 ：" prop="demandType" class="addstyle">
          <el-select v-model="addForm.demandType" clearable @change="aedemandt"  class="wid">
            <el-option label="通用" value="ORDINARY"></el-option>
            <el-option label="铁石水疗" value="IRONSPA"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区 ：" prop="exhibitionArea" class="addstyle">
          <el-select v-model="addForm.exhibitionArea" class="wid"  multiple collapse-tags clearable @change="addexha">
            <el-checkbox :indeterminate="isExhAreIndeterminate" v-model="checkExhAreAll" @change="handleCheckExhAreAllChange" v-show="!isShow" style="margin-left: 15px">全选</el-checkbox>
            <el-option v-for="(item, index) in exhibitionAreaOption" v-show="!isShow" :key="index" :label="item.exhibitionAreaName" :value="item.exhibitionAreaCode"></el-option>
            <el-option v-show="isShow" label="铁石水疗" value="HD06"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="false" label="专区 ：" prop="specialArea" class="addstyle">
          <el-select :disabled="addForm.exhibitionArea.length > 1" v-model="addForm.specialArea" class="wid" clearable>
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
            <!--<el-option v-show="isShow" label="一般性展位" value="1"></el-option>
            <el-option v-show="!isShow" label="中央通道展位" value="2"></el-option>-->
            <!-- jcrao 修改于 6.21一般性（1）中的问题6 a问题：展位类别可选项应增加“一般性展位”可选项 -->
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道展位" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数 ：" prop="exhibitionPeriod" class="addstyle">
          <el-select v-model="addForm.exhibitionPeriod" clearable class="wid">
            <!--<el-option v-show="isShow" label="第一期" value="1"></el-option>
            <el-option v-show="isShow" label="第二期" value="2"></el-option>
            <el-option label="第三期" value="3"></el-option>-->
            <!-- jcrao 修改于 6.21一般性（1）中的问题6 b问题：期数根据展区自动生成 -->
            <el-option label="第一期" value="1"></el-option>
            <el-option label="第二期" value="2"></el-option>
            <el-option label="第三期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报交易团 ：" prop="delegationId" class="addstyle">
          <el-select v-model="addForm.delegationId" @change="handleCheckedDelegationChange" multiple collapse-tags clearable class="wid">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 15px">全选</el-checkbox>
            <el-option v-for="(item, index) in localstora.delegation" :label="item.deptName" :value="item.deptId" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限制最大可申报展位数 ：" prop="inputRule" class="addstyle" label-width="180px">
          <el-input v-model.trim.number="addForm.inputRule" class="wid" maxlength="2"></el-input>
        </el-form-item>
        <el-form-item label="备注 ：" prop="remark" class="addstyle">
          <el-input type="textarea" v-model="addForm.remark" class="wid" :rows="4" maxlength="120"></el-input>
        </el-form-item>
        <div class="acentsty">
          <el-button type="primary" @click="addSubmit('ruleForm')">保存</el-button>
          <el-button @click="handcancle">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
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
      if (!Number.isInteger(value - 0) && value !== 0) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0 && Number(value) === 0) {
        return callback(new Error("必须大于0"));
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
      // 申报交易团支持多选
      isIndeterminate: false,
      checkAll: false,
      // 新增页面展区支持多选
      isExhAreIndeterminate: false,
      checkExhAreAll: false,
      isExhibit: false,
      checked: true, // 默认启用
      addtit: "新增",
      optionS: [], // 专区
      optspe: [], // 专区 add
      arry: [],
      isShow: false, // 通用与水疗
      addForm: {
        demandName: "",
        openStatus: "1",
        demandType: "",
        exhibitionArea: [],
        specialArea: "",
        boothType: "",
        exhibitionPeriod: "",
        delegationId: [],
        delegationName: [],
        inputRule: "",
        businessType: "2",
        isCpName: "",
        remark: ""
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
        // specialArea: [
        //   { required: true, message: "该字段为必填项", trigger: "blur" }
        // ],
        boothType: [
          { required: true, message: "该字段为必填项", trigger: "blur" }
        ],
        exhibitionPeriod: [
          { required: true, message: "请选择展区", trigger: "change" }
        ],
        delegationId: [
          { required: true, message: "该字段为必填项", trigger: "change" }
        ],
        inputRule: [
          { validator: tynum, trigger: "change" }
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
      isSeave: true, // 保存限制
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
      "getcurrentExhibitionPeriod", // 展期
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
    // 申报交易团多选功能
    // 子选项组选择事件
    handleCheckedDelegationChange(val) {
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.localstora.delegation.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.localstora.delegation.length;
    },
    // 子选项全选事件
    handleCheckAllChange(val) {
      let list = [];
      for (let i = 0, l = this.localstora.delegation.length; i < l; i++) {
        list.push(this.localstora.delegation[i].deptId);
      }
      this.addForm.delegationId = val ? list : [];
      this.isIndeterminate = false;
    },
    //新增页面展区多选功能
    //新增页面展区子选项全选事件
    handleCheckExhAreAllChange(val) {
      let list = [];
      for (let i = 0, l = this.exhibitionAreaOption.length; i < l; i++) {
        list.push(this.exhibitionAreaOption[i].exhibitionAreaCode);
      }
      this.addForm.exhibitionArea = val ? list : [];
      this.isExhAreIndeterminate = false;
    },
    // 新增展区子选项选择事件
    addexha(val) {
      let checkedCount = val.length;
      this.checkExhAreAll = checkedCount === this.exhibitionAreaOption.length;
      this.isExhAreIndeterminate = checkedCount > 0 && checkedCount < this.exhibitionAreaOption.length;
      this.arry = [];
      this.optspe = [];
      this.addForm.specialArea = '';
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          if (this.addForm.exhibitionArea[i] !== "HD06" && this.addForm.demandType === "ORDINARY") {
            if (this.addForm.exhibitionArea[i]) {
              this.getexhibitionInfoByCode({ exhibitionAreaCode: this.addForm.exhibitionArea[i] }).then(res => {
                //this.arry.push(JSON.parse(JSON.stringify(res)));
                if (res.length > 0) {
                  for (let j = 0; j < res.length; j++) {
                    this.arry.push(res[j]);
                  }
                }
              }).catch(e => {});
            }
          } else if (this.addForm.exhibitionArea[i] === "HD06" && this.addForm.demandType === "IRONSPA") {
            this.arry.push(
              { specialAreaName: "户外水疗设施", specialAreaCode: "1" },
              { specialAreaName: "铁石装饰品", specialAreaCode: "2" }
            );
          }
          if (this.addForm.exhibitionArea[0]) {
            this.getcurrentExhibitionPeriod({ exhibitionAreaCode: this.addForm.exhibitionArea[0] }).then(res => {
              this.addForm.exhibitionPeriod = JSON.parse(JSON.stringify(res)) + '';
            }).catch(e => {});
          } else {
            this.addForm.exhibitionPeriod = '';
          }
        }
        // for (let i = 0; i < this.arry.length; i++) {
        //   for (let j = 0; j < this.arry[i].length; j++) {
        //     console.log(this.arry[i], 'i');
        //     console.log(this.arry[i][j], 'i j');
        //     this.optspe.push(this.arry[i][j]);
        //   }
        // }
        for (let i = 0, len = this.arry.length; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            if (this.arry[i] === this.arry[j]) {
              arry.splice(j, 1);
              len--;
              j--;
            }
          }
        }
        this.optspe = this.arry;
      }
    },
    // 新增申报类型的change事件
    aedemandt() {
      if (this.addForm.demandType === "ORDINARY") {
        this.isShow = false;
        this.addForm.boothType = "";
        this.addForm.exhibitionPeriod = "";
        this.addForm.exhibitionArea = [];
        this.addForm.specialArea = "";
      } else {
        this.isShow = true;
        this.addForm.boothType = "";
        this.addForm.exhibitionPeriod = "";
        this.addForm.exhibitionArea = [];
        this.addForm.specialArea = "";
      }
    },
    // 编辑
    onEdit(val) {
      this.isExhibit = true;
      this.addtit = "编辑";
      if (val.demandType === "ORDINARY") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      this.addForm = {
        demandId: val.demandId,
        demandName: val.demandName,
        openStatus: val.openStatus,
        demandType: val.demandType,
        exhibitionArea: val.exhibitionArea ? val.exhibitionArea.split(',') : [],
        specialArea: val.specialArea,
        boothType: val.boothType,
        exhibitionPeriod: val.exhibitionPeriod,
        delegationId: val.delegationId ? val.delegationId.split(',') : [],
        delegationName: val.delegationName ? val.delegationName.split(',') : [],
        inputRule: val.inputRule,
        businessType: "2",
        isCpName: val.isCpName,
        remark: val.remark
      };
      if (this.addForm.delegationId[this.addForm.delegationId.length - 1] === '') {
        this.addForm.delegationId.pop();
      }
      if (this.addForm.delegationId.length > 0 && this.addForm.delegationId.length !== this.localstora.delegation.length) {
        this.isIndeterminate = true;
      } else {
        this.isIndeterminate = false;
      }
      if (this.addForm.delegationId.length === this.localstora.delegation.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      if (this.addForm.exhibitionArea[this.addForm.exhibitionArea.length - 1] === '') {
        this.addForm.exhibitionArea.pop();
      }
      if (this.addForm.exhibitionArea.length > 0 && this.addForm.exhibitionArea.length !== this.localstora.exhibitionArea.length) {
        this.isExhAreIndeterminate = true;
      } else {
        this.isExhAreIndeterminate = false;
      }
      if (this.addForm.exhibitionArea.length === this.localstora.exhibitionArea.length) {
        this.checkExhAreAll = true;
      } else {
        this.checkExhAreAll = false;
      }
      for (let i = 0; i < this.addForm.exhibitionArea.length; i++) {
        if (this.addForm.exhibitionArea[i] !== "HD06" && this.addForm.demandType === "ORDINARY") {
          if (this.addForm.exhibitionArea) {
            this.getexhibitionInfoByCode({ exhibitionAreaCode: this.addForm.exhibitionArea[i] }).then(res => {
              this.optspe = JSON.parse(JSON.stringify(res));
              this.isSeave = true;
            }).catch(e => {});
          }
        } else if (this.addForm.exhibitionArea[i] === "HD06" && this.addForm.demandType === "IRONSPA") {
          this.optspe = [
            { specialAreaName: "户外水疗设施", specialAreaCode: "1" },
            { specialAreaName: "铁石装饰品", specialAreaCode: "2" }
          ];
          this.isSeave = true;
        }
      }
    },
    // 新增
    addae() {
      this.isExhibit = true;
      this.addtit = "新增";
      this.addForm = {
        demandId: '',
        demandName: "",
        openStatus: "1",
        demandType: "",
        exhibitionArea: [],
        specialArea: "",
        boothType: "",
        exhibitionPeriod: "",
        delegationId: [],
        delegationName: [],
        inputRule: "",
        businessType: "2",
        isCpName: "",
        remark: ""
      };
      this.isSeave = true;
    },
    // 新增/编辑 =》 保存 未完成
    addSubmit(fname) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      // debugger;
      // 展区/交易团
      this.addData = {
        demandId: this.addForm.demandId,
        demandName: this.addForm.demandName,
        openStatus: this.addForm.openStatus,
        demandType: this.addForm.demandType,
        //exhibitionArea: this.addForm.exhibitionArea,
        areaRangeList: [],
        specialArea: this.addForm.specialArea,
        boothType: this.addForm.boothType,
        exhibitionPeriod: this.addForm.exhibitionPeriod,
        delegationRangeList: [],
        inputRule: this.addForm.inputRule,
        businessType: this.addForm.businessType,
        isCpName: this.addForm.isCpName,
        remark: this.addForm.remark
      };
      for (let i = 0, l = this.addForm.delegationId.length; i < l; i++) {
        for (let key = 0, len = this.localstora.delegation.length; key < len; key++) {
          if (
            this.localstora.delegation[key].deptId === this.addForm.delegationId[i]
          ) {
            let obj = {
              delegationName: this.localstora.delegation[key].deptName,
              delegationId: this.localstora.delegation[key].deptId,
              delegationCode: this.localstora.delegation[key].deptCode
            };
            this.addData.delegationRangeList.push(obj);
          }
        }
      }
      for (let i = 0; i < this.addForm.exhibitionArea.length; i++) {
        if (this.addForm.exhibitionArea[i] === "HD06") {
          let objhd = {
            exhibitionAreaName: "铁石水疗",
            exhibitionArea: "HD06"
          };
          this.addData.areaRangeList.push(objhd);
          //this.addData["exhibitionAreaName"] = "铁石水疗";
        } else {
          for (let key in this.localstora.exhibitionArea) {
            if (
              this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.exhibitionArea[i]
            ) {
              //this.addData["exhibitionAreaName"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
              let exhObj = {
                exhibitionAreaName: this.localstora.exhibitionArea[key].exhibitionAreaName,
                exhibitionArea: this.localstora.exhibitionArea[key].exhibitionAreaCode
              };
              this.addData.areaRangeList.push(exhObj);
            }
          }
        }
      }
      // for (let key in this.addForm.exhibitionArea) {
      //   if (
      //     this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.exhibitionArea[i]
      //   ) {
      //     this.addData["exhibitionAreaName"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
      //   }
      // }
      // if (this.addForm.exhibitionArea === "HD06") {
      //   this.addData["exhibitionAreaName"] = "铁石水疗";
      // }
      // 专区
      for (const key in this.optspe) {
        if (this.addForm.specialArea === this.optspe[key].specialAreaCode) {
          this.addData["specialAreaName"] = this.optspe[key].specialAreaName;
          this.addData.areaRangeList.push({ 'specialArea': this.optspe[key].specialAreaCode, 'specialAreaName': this.optspe[key].specialAreaName });
        }
      }
      // 是否输入企业名称
      if (this.addForm.demandType === "1") {
        this.addData.isCpName = "1";
        // 申报名称
        // this.addForm["demandName"] = "铁石水疗";
      } else {
        this.addData.isCpName = "0";
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
              this.editordinaryDemand(this.addData).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
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
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
            } else {
              // 新增
              this.addordinaryDemand(this.addData).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
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
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
            }
          } else {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
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
