<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="录入展位调整" name="first" v-loading.fullscreen="fullLoading">
      <el-card style="padding-bottom: 24px">
        <div class="bgPink">
          <p>操作说明：</p>
          <p class="pStyle">1.等量调换，在“A交易团调整展区”选择A交易团换入展区，在“B交易团调整展区”选择B交易团换入展区，“调整展位数”填写交换数量（正数）</p>
          <p class="pStyle">2.不等量调换，在“A交易团调整展区”选择A交易团换入展区，在“B交易团调整展区”选择无，“调整展位数”填写交换数量（正数）</p>
          <p class="pStyle">3.只涉及一个交易团的展位调整（退展位/新增展位/其他），只填写“A交易团、A交易团调整展区”，“B交易团、B交易团调整展区”均选择无，“调整展位数”可填正数（新增展位）或负数（退展位）。</p>
        </div>
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
            <el-select v-model="formData.exhibitionAreaCode" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位类型">
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
        <el-table
          :data="tableData"
          style="width: 100%"
           
          border
          size="small"
          show-summary
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" min-width="120" fixed="left" type="selection" width="55"></el-table-column>
          <el-table-column align="center" min-width="120" label="展位类别" prop="boothType">
            <template slot-scope="scope">
              {{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="序号" prop="serialNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="录入日期" prop="createDate">
            <!-- <template slot-scope="scope">
              {{scope.row.createDate | credat}}
            </template> -->
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="调整展位数" prop="adjustNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="tabdat" :rules="editRules" ref="editRef">
                  <el-form-item prop="adjustNumber" label-width="0px">
                    <el-input v-model.trim="tabdat.adjustNumber" maxlength="8"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.adjustNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="调整类型" prop="adjustType">
            <template slot-scope="scope">
              {{scope.row.adjustType | adjustTypeAdjust}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="与之互调的交易团" prop="adjustDelegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="计入基数" prop="isJoinBase">
            <template slot-scope="scope">
              {{scope.row.isJoinBase === "YES" ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展位来源" prop="boothSource">
            <template slot-scope="scope">
              {{scope.row.boothSource === "1" ? "人工录入" : "系统生成"}}
            </template>
          </el-table-column> 
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                @click="onEdit(scope.row, scope.$index)"
              >修改</el-button>
              <el-button type="text" v-else @click="onSave(scope.row, scope.$index, 'editRef')">保存</el-button>
              <el-button type="text" @click="handele(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="danger" size="small" class="formStyle" @click="isExhibit = true">新增</el-button>
          <el-button type="danger" size="small" class="formStyle" @click="delBoth">删除</el-button>
          <el-button type="primary" size="small" class="formStyle" @click="handDownload">下载</el-button>
        </div>
        <!-- 分页 -->
        <div class="floatRight paginationTop">
          <el-pagination
            background
            small
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
        <!-- 新增弹框 -->
        <el-dialog :title="handtit" @close="closeadd" :visible.sync="isExhibit" :close-on-click-modal="false" width="950px">
          <el-form :model="addForm" :rules="addRules" ref="addRef" :inline="true" size="small" label-width="150px">
            <el-form-item label="调整类型 ：" prop="adjustType">
              <el-select v-model="addForm.adjustType" clearable @change="atChange" class="wid">
                <el-option label="还原调整" value="RESTORE"></el-option>
                <el-option label="等量调换" value="EQUAL_EXCHANGE"></el-option>
                <el-option label="不等量调换" value="UNEQUAL_EXCHANGE"></el-option>
                <el-option label="退回展位" value="REFUND"></el-option>
                <el-option label="新增展位" value="NEW_EXHIBITION"></el-option>
                <el-option label="展位类别调整" value="TYPE_EXCHANGE"></el-option>
                <el-option label="回收展位" value="RECOVERY"></el-option>
                <el-option label="其他" value="OTHER"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展位类别 ：" prop="boothType">
              <el-select v-model="addForm.boothType" clearable class="wid">
                <el-option label="一般性展位" value="1"></el-option>
                <el-option label="中央通道展位" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="A交易团 ：" prop="delegationId">
              <el-select v-model="addForm.delegationId" clearable @change="Adelecode" class="wid">
                <el-option
                  v-for="(item, index) in localstora.delegation"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="A交易团调整展区 ：" prop="inAreaCode">
              <el-select v-model="addForm.inAreaCode" clearable class="wid">
                <el-option
                  v-for="(item, index) in localstora.exhibitionArea"
                  :key="index"
                  :label="item.exhibitionAreaName"
                  :value="item.exhibitionAreaCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="B交易团 ：" prop="otherDelegationId">
              <el-select v-model="addForm.otherDelegationId" :disabled="!addRules.otherDelegationId[0].required" clearable class="wid">
                <el-option
                  v-for="(item, index) in optionDelegationB"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="B交易团调整展区 ：" prop="outAreaCode">
              <el-select v-model="addForm.outAreaCode" :disabled="!addRules.outAreaCode[0].required" clearable class="wid">
                <el-option
                  v-for="(item, index) in optionExhibitionB"
                  :key="index"
                  :label="item.exhibitionAreaName"
                  :value="item.exhibitionAreaCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单号 ：" prop="orderNo">
              <el-input v-model.trim="addForm.orderNo" maxlength="12" class="wid"></el-input>
            </el-form-item>
            <el-form-item label="调整展位数 ：" prop="exchangeNumber">
              <el-input v-model="addForm.exchangeNumber" maxlength="10" class="wid"></el-input>
            </el-form-item>
            <el-form-item label="计入基数 ：" prop="isJoinBase">
              <el-select v-model="addForm.isJoinBase" clearable class="wid">
                <el-option label="是" value="YES"></el-option>
                <el-option label="否" value="NO"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展位来源 ：" prop="boothSource">
              <el-select v-model="addForm.boothSource" clearable class="wid">
                <el-option label="人工录入" value="1"></el-option>
                <!-- <el-option label="系统生成" value="0"></el-option> -->
              </el-select>
            </el-form-item>
            <div class="cente">
              <el-button type="primary" @click="addSubmit('addRef')">提交</el-button>
              <el-button @click="isExhibit = false">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
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
        exhibitionAreaCode: "",
        boothType: ""
      },
      addForm: {
        boothType: "",
        outAreaCode: "",
        orderNo: "",
        exchangeNumber: "",
        delegationId: "",
        adjustType: "",
        inAreaCode: "",
        isJoinBase: "",
        otherDelegationId: "",
        boothSource: "1"
      },
      addRules: {
        boothType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        outAreaCode: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        // orderNo: [{ validator: tynum, required: true, trigger: "blur" }],
        orderNo: [
          { required: true, message: "请输入正确的单号", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(\d{3})-(\d{8})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的单号"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        exchangeNumber: [{ validator: tynum, required: true, trigger: "blur" }],
        delegationId: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        adjustType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        inAreaCode: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        isJoinBase: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        otherDelegationId: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        boothSource: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      editRules: {
        adjustNumber: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      // B交易团
      optionDelegationB: [],
      // B展区
      optionExhibitionB: [],
      saveScheme: [],
      isExhibit: false,
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      // 删除绑定数据id
      delid: {
        adjustRecordId: ""
      },
      // 表格数据
      tableData: [],
      lastIndexPage: "",
      tabdat: {
        adjustRecordId: "",
        adjustNumber: "",
        boothSource: "1"
      },
      handtit: "新增调整",
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      fullLoading: true,
      activeName: "first"
    };
  },
  mounted() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      this.optionExhibitionB = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
      this.optionDelegationB = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // this.getlistAdjustDemand().then(res => {
    //   if (res.records.length !== 0) {
    //     let id = { adjustDemandId: res.records[0].adjustDemandId };
    //     this.getlistAreaCode(id).then(resarea => {
    //       for (let j = 0; j < resarea.records.length; j++) {
    //         this.localstora.exhibitionArea = JSON.parse(JSON.stringify(resarea.records));
    //         this.optionExhibitionB = JSON.parse(JSON.stringify(resarea.records));
    //       }
    //     }).catch(e => {});
    //     this.getlistDelegation(id).then(resde => {
    //       for (let j = 0; j < resde.records.length; j++) {
    //         this.localstora.delegation = JSON.parse(JSON.stringify(resde.records));
    //         this.optionDelegationB = JSON.parse(JSON.stringify(resde.records));
    //       }
    //     }).catch(e => {});
    //   }
    // }).catch(e => {});
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    // this.optionDelegationB = this.optionDelegationB.concat(
    //   this.localstora.delegation
    // );
    // this.optionExhibitionB = this.optionExhibitionB.concat(
    //   this.localstora.exhibitionArea
    // );
    this.getListPage(this.obj);
  },
  filters: {
    adjustTypeAdjust(val) {
      switch (val) {
        case "REFUND":
          return "退回展位";
        case "NEW_EXHIBITION":
          return "新增展位";
        case "EQUAL_EXCHANGE":
          return "等量调换";
        case "RECOVERY":
          return "回收展位";
        case "TYPE_EXCHANGE":
          return "展位类别调整";
        case "UNEQUAL_EXCHANGE":
          return "不等量调换";
        case "RESTORE_EXCHANGE_EQUAL":
          return "还原调整（等量调换）";
        case "RESTORE_EXCHANGE_UNEQUAL":
          return "还原调整（还原）";
        case "OTHER":
          return " 其他";
        default:
          return "";
      }
    },
    credat(val) {
      let value = val.slice(0, 10);
      return value;
    }
  },
  // watch: {
  //   addForm: {
  //     handler(newName, oldName) {
  //       console.log(newName, oldName, "222");
  //       this.getentryBoothAdjustment(newName).then(res => {
  //         console.log(res, "res");
  //       }).catch(e => {});
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistEntryBoothAdjustment", // 查询录入的展位调整
      "addentryBoothAdjustment", // 新增录入展位调整
      "updateentryBoothAdjustment", // 修改录入展位调整调换记录
      "deletentryBoothAdjustment", // 删除录入展位调整调换记录
      "deletbatchEntryBoothAdjustment", // 批量删除录入展位调整调换记录
      "getentryBoothAdjustment" // 工作部人工录入还原调整时,获取可还原列表
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistEntryBoothAdjustment(Url)
        .then(res => {
          this.fullLoading = false;
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
      let url = "delegationId=" + this.formData.delegationId + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode + "&adjustType=" + this.formData.adjustType + "&boothSource=1";
      url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/scheduleRecord/download?" + url + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 调整类型 change事件
    atChange() {
      if (this.addForm.adjustType === "EQUAL_EXCHANGE") { // 等量调换
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
        this.addRules.outAreaCode[0].required = true;
        this.addRules.otherDelegationId[0].required = true;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else if (this.addForm.adjustType === "UNEQUAL_EXCHANGE") { // 不等量调换
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
        this.addForm.outAreaCode = "";
        this.addRules.outAreaCode[0].required = false;
        this.addRules.otherDelegationId[0].required = true;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else if (this.addForm.adjustType === "REFUND") { // 退回展位
        let tynum = (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error("该字段为必填项"));
          } else if (!Number.isInteger(value - 0)) {
            return callback(new Error("请输入合法字符"));
          } else if (value >= 0) {
            return callback(new Error("必须小于0"));
          } else {
            return callback();
          }
        };
        this.addForm.outAreaCode = "";
        this.addForm.otherDelegationId = "";
        this.addRules.outAreaCode[0].required = false;
        this.addRules.otherDelegationId[0].required = false;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else if (this.addForm.adjustType === "NEW_EXHIBITION") { // 新增展位
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
        this.addForm.outAreaCode = "";
        this.addForm.otherDelegationId = "";
        this.addRules.outAreaCode[0].required = false;
        this.addRules.otherDelegationId[0].required = false;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else if (this.addForm.adjustType === "TYPE_EXCHANGE") { // 展位类别调整 // 交易团一样 展区不一样
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
        // this.addForm.outAreaCode = "";
        if (this.addForm.delegationId) {
          this.addForm.otherDelegationId = this.addForm.delegationId;
        }
        this.addRules.outAreaCode[0].required = true;
        this.addRules.otherDelegationId[0].required = false;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else if (this.addForm.adjustType === "RECOVERY") { // 回收展位 // 
        let tynum = (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error("该字段为必填项"));
          } else if (!Number.isInteger(value - 0)) {
            return callback(new Error("请输入合法字符"));
          } else if (value >= 0) {
            return callback(new Error("必须小于0"));
          } else {
            return callback();
          }
        };
        this.addForm.outAreaCode = "";
        this.addForm.otherDelegationId = "";
        this.addRules.outAreaCode[0].required = false;
        this.addRules.otherDelegationId[0].required = false;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else
      if (this.addForm.adjustType === "RESTORE") { // 还原调整
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
        // if () {}
        // this.addForm.outAreaCode = "";
        // this.addForm.otherDelegationCode = "";
        this.addRules.outAreaCode[0].required = true;
        this.addRules.otherDelegationId[0].required = true;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else if (this.addForm.adjustType === "OTHER") { // 其他
        let tynum = (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error("该字段为必填项"));
          } else if (!Number.isInteger(value - 0)) {
            return callback(new Error("请输入合法字符"));
          } else {
            return callback();
          }
        };
        this.addForm.outAreaCode = "";
        this.addForm.otherDelegationId = "";
        this.addRules.outAreaCode[0].required = false;
        this.addRules.otherDelegationId[0].required = false;
        this.addRules.exchangeNumber[0].validator = tynum;
      } else {
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
        this.addRules.outAreaCode[0].required = true;
        this.addRules.otherDelegationId[0].required = true;
        this.addRules.exchangeNumber[0].validator = tynum;
      }
    },
    // A交易团change事件
    Adelecode() {
      if (this.addForm.adjustType === "TYPE_EXCHANGE") { 
        this.addForm.otherDelegationId = this.addForm.delegationId;
      }
    },
    // 提交 新增
    addSubmit(datae) {
      this.$refs[datae].validate((vald) => {
        if (vald) {
          // this.addForm["otherDelegationId"] = this.addForm.otherDelegationCode;
          // this.addForm["delegationId"] = this.addForm.delegationCode;
          // 交易团
          for (let key in this.localstora.delegation) {
            if (this.localstora.delegation[key].deptId === this.addForm.otherDelegationId) {
              this.addForm["otherDelegationName"] = this.localstora.delegation[key].deptName;
              this.addForm["otherDelegationCode"] = this.localstora.delegation[key].deptCode;
            }
            if (this.localstora.delegation[key].deptId === this.addForm.delegationId) {
              this.addForm["delegationName"] = this.localstora.delegation[key].deptName;
              this.addForm["delegationCode"] = this.localstora.delegation[key].deptCode;
            }
          }
          // 展区
          for (let key in this.localstora.exhibitionArea) {
            if (this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.inAreaCode) {
              this.addForm["inArea"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
            }
            if (this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.outAreaCode) {
              this.addForm["outArea"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
            }
          }
          if (this.addForm.adjustType === "RESTORE") {
            this.getentryBoothAdjustment(this.addForm).then(res => {
              // console.log(res, "res");
            }).catch(e => {});
          } else {
            this.addentryBoothAdjustment(this.addForm)
              .then(res => {
                this.isExhibit = false;
                this.getListPage(this.obj);
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                for (let key in this.addForm) {
                  this.addForm[key] = "";
                }
                this.addForm.boothSource = "1";
              })
              .catch(e => {});
          }
        }
      });
    },
    // 关闭新增弹框
    closeadd() {
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
      this.addForm.boothSource = "1";
    },
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.tabdat.adjustRecordId = val.adjustRecordId;
        this.tabdat.adjustNumber = val.adjustNumber;
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
    // 编辑 =》 保存
    onSave(val, valId, datae) {
      this.lastIndexPage = "";
      this.tableData[valId]["edit"] = false;
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updateentryBoothAdjustment(this.tabdat)
            .then(res => {
              this.getListPage(this.obj); // 调用初始加载页面方法
              this.$message({
                message: "保存成功！",
                type: "success"
              });
            })
            .catch(e => {});
        }
      });
    },
    // 删除
    handele(val) {
      this.delid.adjustRecordId = val.adjustRecordId;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletentryBoothAdjustment(this.delid)
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
    // 表格勾选时的事件
    handleSelectionChange(val) {
      this.saveScheme = [];
      if (val.length === 0) {
        this.saveScheme = [];
      } else {
        for (let i = 0; i < val.length; i++) {
          let adjrec = {
            adjustRecordId: ""
          };
          adjrec.adjustRecordId = val[i].adjustRecordId;
          this.saveScheme.push(adjrec);
        }
      }
    },
    // 批量删除
    delBoth() {
      // let flag = true;
      if (this.saveScheme.length === 0) {
        this.$message("请勾选您要删除的数据");
      } else {
        this.$confirm("确认删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.deletbatchEntryBoothAdjustment(this.saveScheme)
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
        // this.deletbatchEntryBoothAdjustment(this.saveScheme)
        //   .then(res => {
        //     this.$message({
        //       message: "删除成功！",
        //       type: "success"
        //     });
        //     this.getListPage(this.obj);
        //   })
        //   .catch(e => {});
      }
    },
    // 页面合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '--';
        }
        if (index === 1 || index === 3 || index === 4 || index === 8 || index === 10) {
          sums[index] = "--";
        }

      });
      return sums;
    },
    // 撤回
    revocation() {},
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
.bgPink {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #ffc0cb;
}
.wid {
  width: 300px;
}
.cente {
  text-align: center;
  padding-bottom: 20px;
}
.pStyle {
  word-break: normal;
  white-space: pre-warp;
  word-wrapL: break-word;
}
</style>


