<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
      <el-tab-pane label="整体安排" name="first">
        <el-card>
          <div id="deepStyle">
            <!-- form表单 -->
            <el-form :inline="true" :model="formData" class="demo-form-inline" size="small">
              <el-form-item label="设置类型">
                <el-select v-model="formData.setTheType" clearable @change="changeSetType">
                  <el-option
                    v-for="item in optionsSet"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="阶段">
                <el-select v-model="formData.stageName" clearable placeholder="请选择">
                  <el-option
                    v-for="item in optionsStage"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="截止日期2">
                <el-date-picker
                  v-model="formData.time"
                  type="date"
                  format="MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item> -->
              <el-form-item label="截止日期">
                <el-date-picker
                  clearable
                  v-model="formData.deadline"
                  type="date"
                  format="MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="primary" @click="handDownload">下载</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%;" size="small" align="center" border>
              <el-table-column align="center" min-width="120" prop="stageName" label="阶段">
                <template slot-scope="scope">
                  <div>{{scope.row.stageName}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="120" prop="itemName" label="子项">
                <template slot-scope="scope">
                  <div v-if="scope.row.childrenList.length === 0">{{scope.row.itemName}}</div>
                  <div
                    v-else
                    v-for="(item,index) in scope.row.childrenList"
                    :key="index"
                    :class="index < scope.row.childrenList.length - 1 ? borderBottom : null"
                  >{{item.itemName}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="120" label="截止日期">
                <template slot-scope="scope">
                  <div v-if="scope.row.childrenList.length === 0">
                    {{scope.row.deadline}}
                    <i
                      style="display: inline-block; margin-left: 10px;"
                      class="el-icon-date"
                    ></i>
                  </div>
                  <div
                    v-else
                    v-for="(item,index) in scope.row.childrenList"
                    :key="index"
                    :class="index < scope.row.childrenList.length - 1 ? borderBottom : null"
                  >
                    {{item.deadline}}
                    <i
                      style="display: inline-block; margin-left: 10px;"
                      class="el-icon-date"
                    ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="120" prop="remark" label="备注">
                <template slot-scope="scope">
                  <div v-if="scope.row.childrenList.length === 0">{{scope.row.remark}}</div>
                  <div
                    v-else
                    v-for="(item,index) in scope.row.childrenList"
                    :key="index"
                    :class="index < scope.row.childrenList.length - 1 ? borderBottom : null"
                  >{{item.remark}}&nbsp;</div>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="160" label="操作">
                <template slot-scope="scope">
                  <div v-if="scope.row.childrenList.length === 0">
                    <el-button @click="editRow(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                  </div>
                  <div
                    v-else
                    v-for="(item,index) in scope.row.childrenList"
                    :key="index"
                    :class="index < scope.row.childrenList.length - 1 ? borderBottom : null"
                  >
                    <el-button @click="editRow(item)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteRow(item)" type="text" size="small">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 按钮 -->
            <el-button type="danger" size="small" @click="add">新增</el-button>
            <el-button type="danger" size="small" @click="handelSure">确认</el-button>
            <!-- 新增弹窗 -->
            <el-dialog title="新增" width="600px" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" @close="closeDialog">
              <el-card>
                <!-- <div slot="header">
                  <span>新增</span>
                </div>-->
                <div>
                  <el-form :model="formDataTwo" :rules="rules" size="small" ref="ruleForm">
                    <el-form-item label="设置类型" prop="setTheType">
                      <el-select style="width: 280px;" v-model="formDataTwo.setTheType" clearable @change="changSet">
                        <el-option
                          v-for="item in optionsSet"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="阶段" prop="stageOne">
                      <el-select
                        v-model="formDataTwo.stageOne"
                        placeholder="请选择"
                        clearable
                        style="width: 280px;"
                        @change="changeStageAdd"
                      >
                        <el-option
                          v-for="item of optionsStageAdd"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 子项 -->
                    <div v-for="(item, index) in formDataTwo.data" :key="index">
                      <el-form-item :label="'子项' + index" :prop="'data.' + index + '.childOptions'" :rules="rules.childOptions">
                        <el-select
                          style="width: 280px;"
                          v-model="item.childOptions"
                          clearable
                        >
                          <el-option
                            v-for="(itemChild, indexChild) in item.options"
                            :key="indexChild"
                            :label="itemChild.label"
                            :value="itemChild.value"
                            :disabled="itemChild.disabled"
                          ></el-option>
                        </el-select>
                        <template>
                          <el-button
                          v-show="item.issShow"
                          type="primary"
                          size="mini"
                          :disabled="!otherRule.required"
                          @click="childClick(item, index)"
                        >新增</el-button>
                        <el-button
                          v-show="!item.issShow"
                          type="primary"
                          size="mini"
                          @click="childDele(item, index)"
                        >删除</el-button>
                        </template>
                      </el-form-item>
                      <el-form-item label="截止时间" :prop="'data.' + index + '.dateOne'" :rules="rules.dateOne">
                        <el-date-picker
                          v-model="item.dateOne"
                          type="date"
                          clearable
                          style="width: 280px;"
                          format="MM-dd"
                          @change="datePick"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                    <el-form-item label="备注">
                      <el-input type="textarea" clearable v-model="formDataTwo.remark" maxlength="128" style="width: 280px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="danger" @click="addSave('ruleForm')">保存</el-button>
                      <el-button @click="cancalAdd">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-dialog>
            <!-- 修改弹框 -->
            <el-dialog title="修改" :visible="isEditBox" width="500px" :close-on-click-modal="false" @close="closeEditBox">
              <el-card>
                <el-form :model="formDataEdit" size="small">
                  <el-form-item label="设置类型">
                    <el-select style="width: 280px;" clearable disabled v-model="formDataEdit.setTheType">
                      <el-option
                        disabled
                        v-for="item in optionsSet"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="阶段">
                    <el-select
                      disabled
                      clearable
                      v-model="formDataEdit.stageCode"
                      placeholder="请选择"
                      style="width: 280px;"
                    >
                      <el-option
                        v-for="item of optionsStage"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="子项">
                    <el-select
                      style="width: 280px;"
                      disabled
                      clearable
                      v-model="formDataEdit.itemCode"
                      @change="addChildren"
                    >
                      <el-option
                        v-for="(itemChild, indexChild) in optionsChildItem"
                        :key="indexChild"
                        :label="itemChild.label"
                        :value="itemChild.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="截止时间">
                    <el-date-picker
                      v-model="formDataEdit.deadline"
                      type="date"
                      clearable
                      style="width: 280px;"
                      value-format="MM-dd"
                      format="MM-dd"
                      @change="datePickEdit"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input type="textarea" clearable v-model="formDataEdit.remark" maxlength="128" style="width: 280px;"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="editServe">保存</el-button>
                    <el-button @click="isEditBox = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-dialog>
            <!-- 确认删除 -->
            <el-dialog title="提示" :visible.sync="isSureDel" :close-on-click-modal="false" width="500px">
              <span>确认删除？</span>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="isSureDel = false">取 消</el-button>
                <el-button size="small" type="primary" @click="isSureDeleta">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
      </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
import { $date } from "@/scripts/project/utils";
export default {
  data() {
    return {
      obj: {
        stageType: ""
      },
      isDisa: false,
      formDataEdit: {
        setTheType: "",
        stageCode: "",
        itemCode: "",
        deadline: "",
        remark: ""
      },
      fullLoading: true, // 页面加载
      deadlineEdit: "", //修改弹框的时间
      childAdd: true, // 控制子项是否插入
      childAddOne: false, //子项一
      childAddTwo: false, //子项二
      isAddif: true, // 第一个新增变删除
      isAddifOne: true, //子项一
      // isAddifTwo: true, //子项二
      isAddOne: true, //默认子项可修改 / 禁用
      isAddTwo: true, //子项一可修改 / 禁用
      isAddThree: true, //子项二可修改 / 禁用
      defaultEvent: true, //是否有子选项
      isEditBox: false, //修改弹框是否显示
      optionsChildOne: [],
      optionsChildTwo: [],
      optionsDate: [],
      optionsChild: [],
      optionsChildItem: [],
      isSureDel: false,
      borderBottom: {
        borderBottom: "1px solid #ebeef5"
      },
      isAdd: true,
      isShow: false,
      tableData: [],
      optionsSet: [
        { label: "请选择", value: "" },
        { label: "品牌评审时间点设置", value: "1" },
        { label: "品牌确认时间点设置", value: "2" }
        // { label: "一般性展位安排（重核、展区调整）时间点设置", value: "3" },
        // { label: "一般性展位安排（不重核、展区不调整）时间点设置", value: "4" },
        // { label: "外贸中心安排上届回收实际使用者得展位时间点设置", value: "5" },
        // { label: "安排上届回收用于组展表彰的一般性展位时间点设置", value: "6" },
        // { label: "企业新题材展位数量安排时间点设置", value: "7" },
        // { label: "补充联营企业活动时间点设置", value: "8" }
      ],
      optionsAll: [
        { label: "请选择", value: "" },
        { label: "企业申报品牌展位评审", value: "BRAND_COMPANY_APPLY" },
        { label: "交易团预审", value: "BRAND_DEAL_CLUSTER_CHECK" },
        { label: "交易团评分", value: "BRAND_DEAL_CLUSTER_GRADE" },
        { label: "交易团推荐", value: "BRAND_DEAL_CLUSTER_RECOMMEND" },
        { label: "商协会审核母子关系", value: "BRAND_COCERAL_CHECK_MC" },
        { label: "商协会提交评审分数", value: "BRAND_COCERAL_SUBMIT_GRADE" },
        { label: "工作小组抽样复核", value: "BRAND_WORK_DEPT_EXTRACT" },
        { label: "商协会调整评审分数", value: "BRAND_COCERAL_ADJUST_GRADE" },
        {
          label: "外贸司公示品牌展位数量",
          value: "BRAND_FOREIGN_TRADE_PUBLICITY"
        },
        {
          label: "外贸司公布品牌展位数量",
          value: "BRAND_FOREIGN_TRADE_PUBLISH"
        },
        {
          label: "商协会提出品牌展位数量安排初步方案",
          value: "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN"
        },
        { label: "企业确认品牌展位申请", value: "BRAND_AFFIRM_BOOTH_APPLY" },
        {
          label: "企业提交品牌展位退回申请",
          value: "BRAND_AFFIRM_COMMIT_BOOTH_BACK"
        },
        {
          label: "交易团审核退回展位",
          value: "BRAND_AFFIRM_DEAL_CLUSTER_BACK_APPLY"
        },
        {
          label: "商协会提出部分展位重新安排方案",
          value: "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN"
        },
        {
          label: "外贸中心复核商协会调整安排方案",
          value: "BRAND_AFFIRM_FOREIGN_TRADE_CENTRES_REVIEW_PLAN"
        },
        {
          label: "外贸司公示调整安排方案",
          value: "BRAND_AFFIRM_FOREIGN_TRADE_PUBLICITY"
        },
        {
          label: "外贸司公布调整安排方案",
          value: "BRAND_AFFIRM_FOREIGN_TRADE_PUBLISH"
        },
        {
          label: "交易团审核已确认参展的品牌的基本资料",
          value: "BRAND_AFFIRM_DEAL_CLUSTER_CHECK_BASE_DATA"
        }
      ],
      optionsStage: [],
      optionsStageOne: [
        { label: "请选择", value: "" },
        { label: "企业申报品牌展位评审", value: "BRAND_COMPANY_APPLY" },
        { label: "交易团预审", value: "BRAND_DEAL_CLUSTER_CHECK" },
        { label: "交易团评分", value: "BRAND_DEAL_CLUSTER_GRADE" },
        { label: "交易团推荐", value: "BRAND_DEAL_CLUSTER_RECOMMEND" },
        { label: "商协会审核母子关系", value: "BRAND_COCERAL_CHECK_MC" },
        { label: "商协会提交评审分数", value: "BRAND_COCERAL_SUBMIT_GRADE" },
        { label: "工作小组抽样复核", value: "BRAND_WORK_DEPT_EXTRACT" },
        { label: "商协会调整评审分数", value: "BRAND_COCERAL_ADJUST_GRADE" },
        {
          label: "外贸司公示品牌展位数量",
          value: "BRAND_FOREIGN_TRADE_PUBLICITY"
        },
        {
          label: "外贸司公布品牌展位数量",
          value: "BRAND_FOREIGN_TRADE_PUBLISH"
        },
        {
          label: "商协会提出品牌展位数量安排初步方案",
          value: "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN"
        }
      ],
      optionsStageTwo: [
        { label: "请选择", value: "" },
        { label: "企业确认品牌展位申请", value: "BRAND_AFFIRM_BOOTH_APPLY" },
        {
          label: "企业提交品牌展位退回申请",
          value: "BRAND_AFFIRM_COMMIT_BOOTH_BACK"
        },
        {
          label: "交易团审核退回展位",
          value: "BRAND_AFFIRM_DEAL_CLUSTER_BACK_APPLY"
        },
        {
          label: "商协会提出部分展位重新安排方案",
          value: "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN"
        },
        {
          label: "外贸中心复核商协会调整安排方案",
          value: "BRAND_AFFIRM_FOREIGN_TRADE_CENTRES_REVIEW_PLAN"
        },
        {
          label: "外贸司公示调整安排方案",
          value: "BRAND_AFFIRM_FOREIGN_TRADE_PUBLICITY"
        },
        {
          label: "外贸司公布调整安排方案",
          value: "BRAND_AFFIRM_FOREIGN_TRADE_PUBLISH"
        },
        {
          label: "交易团审核已确认参展的品牌的基本资料",
          value: "BRAND_AFFIRM_DEAL_CLUSTER_CHECK_BASE_DATA"
        }
      ],
      optionsStageAdd: [], // 新增时阶段下拉框绑定的数据
      optionsTwo: [],
      childValue: "",
      formData: {
        setTheType: "",
        stageName: "",
        expirationDate: "",
        deadline: ""
      },
      formDataTwo: {
        data: [
          { childOptions: "", dateOne: "", issShow: true, options: [] }
        ],
        setTheType: "",
        stageOne: "",
        dateOnePick: "", //子项默认时间绑定的值
        dateOnePickOne: "", //子项一时间绑定的值
        dateOnePickTwo: "", //子项二时间绑定的值
        childOptions: "", //子项默认绑定的值
        childOptionsOne: "", //子项一绑定的值
        childOptionsTwo: "", //子项二绑定的值
        dateOne: "", //子项默认时间绑定的值(无效值)
        dateTwo: "", //子项一时间绑定的值(无效值)
        dateThree: "" //子项二时间绑定的值(无效值)
      },
      rules: {
        setTheType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        stageOne: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        childOptions: [{ required: false, message: "该字段为必填项", trigger: "blur" }],
        dateOne: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      otherRule: { required: false, message: "该字段为必填项", trigger: "blur" },
      addNumber: "",
      addDataSubmit: {
        scheduleConfig: {
          stageType: "1",
          useScope: "1",
          stageCode: "BRAND_COMPANY_APPLY"
        },
        scheduleSetting: {
          deadline: "11-22",
          useScope: "1",
          childrenList: []
        }
      },
      childAddSubmit: {
        scheduleConfig: {
          stageType: "1",
          useScope: "1",
          stageCode: "BRAND_COMPANY_APPLY"
        },
        scheduleSetting: {
          useScope: "1",
          childrenList: []
        }
      },
      activeName: "first",
      setId: {
        settingId: ""
      }
    };
  },
  watch: {
    'formDataTwo.data': {
      handler(val) {
        for (let i = 0; i < val.length; i++) {
          for (let k = 0; k < this.optionsChild.length; k++) {
            if (this.optionsChild[k].value === val[i].childOptions) {
              this.optionsChild[k].disabled = false;
            }
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.optionsStage = this.optionsAll;
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("brandBooth", [
      "getlistScheduleConfig", //查询
      "addscheduleConfig", //新增
      "deletebyIdScheduleConfig", //删除
      "updatescheduleConfig", //修改
      "updateconfirm" // 确认
    ]),
    // xin 新增
    childClick(val, index) {
      if (this.formDataTwo.data.length < 3) {
        this.formDataTwo.data[index].issShow = false;
      } else if (this.formDataTwo.data.length < 2) {
        this.formDataTwo.data[index].issShow = true;
      }
      if (this.formDataTwo.data.length < 2) {
        this.formDataTwo.data.push({
          childOptions: "",
          key: Date.now(),
          dateOne: "",
          issShow: true,
          options: this.optionsChild
        });
      } else {
        this.formDataTwo.data.push({
          childOptions: "",
          key: Date.now(),
          dateOne: "",
          issShow: false,
          options: this.optionsChild
        });
      }
    },
    // xin 删除
    childDele(val, id) {
      for (let k = 0; k < this.optionsChild.length; k++) {
        if (this.optionsChild[k].value === val.childOptions) {
          this.optionsChild[k].disabled = false;
        }
      }
      let index = this.formDataTwo.data.indexOf(val);
      if (index !== -1) {
        this.formDataTwo.data.splice(index, 1);
      }
      if (this.formDataTwo.data.length === 2) {
        this.formDataTwo.data[0].issShow = true;
      }
    },
    // 新增时设置类型改变时触发的事件
    changSet() {
      // this.optionsStageAdd = [];
      this.formDataTwo.stageOne = "";
      if (this.formDataTwo.setTheType === "1") {
        this.optionsStageAdd = this.optionsStageOne;
        this.isDisa = true;
        // this.formData.stageName = "";
      } else if (this.formDataTwo.setTheType === "2") {
        this.optionsStageAdd = this.optionsStageTwo;
        this.isDisa = true;
        // this.formData.stageName = "";
      } else if (this.formDataTwo.setTheType === "") {
        this.optionsStageAdd = [];
        this.isDisa = false;
        // this.formData.stageName = "";
      }
    },
    // 保存修改
    editServe() {
      this.formDataEdit.deadline = this.deadlineEdit;
      if (this.formDataEdit.deadline == null) {
        this.$message("截止时间不能为空");
      } else {
        this.formDataEdit.childrenList = [];
        this.formDataEdit.deadline = this.deadlineEdit;
        this.updatescheduleConfig(this.formDataEdit)
          .then(res => {
            this.getListPage(this.obj);
            this.isEditBox = false;
          })
          .catch(e => {});
      }
    },
    // 修改时间
    datePickEdit(val) {
      this.deadlineEdit = val;
    },
    // 确认按钮
    handelSure() {
      this.updateconfirm().then(res => {
        this.getListPage(this.obj);
      }).catch(e => {
        this.$message("没有需要确认的时间节点");
      });
    },
    // 点击关闭修改弹框
    closeEditBox() {
      this.getListPage(this.obj);
      this.isEditBox = false;
      // 清空弹框
      for (let key in this.formDataEdit) {
        this.formDataEdit[key] = "";
      }
    },
    // 点击遮罩层 新增弹窗关闭
    closeDialog() {
      this.getListPage(this.obj);
      this.isShow = false;
      // 清空弹框
      // for (let key in this.formDataTwo) {
      //   this.formDataTwo[key] = "";
      // }
      this.formDataTwo = {
        data: [
          { childOptions: "", dateOne: "", issShow: true, options: [] }
        ],
        setTheType: "",
        stageOne: "",
        dateOnePick: "", //子项默认时间绑定的值
        dateOnePickOne: "", //子项一时间绑定的值
        dateOnePickTwo: "", //子项二时间绑定的值
        childOptions: "", //子项默认绑定的值
        childOptionsOne: "", //子项一绑定的值
        childOptionsTwo: "", //子项二绑定的值
        dateOne: "", //子项默认时间绑定的值(无效值)
        dateTwo: "", //子项一时间绑定的值(无效值)
        dateThree: "" //子项二时间绑定的值(无效值)
      };
      this.childAddSubmit.scheduleSetting.childrenList = [];
      // 新增弹框初始化
      this.childAdd = true; // 控制子项是否插入
      this.childAddOne = false; //子项一
      this.childAddTwo = false; //子项二
      this.isAddif = true; // 第一个新增变删除
      this.isAddifOne = true; //子项一
      // this.isAddifTwo = true; //子项二
      this.isAddOne = true; //默认子项可修改 / 禁用
      this.isAddTwo = true;
      this.isAddThree = true;
      this.defaultEvent = true; //是否有子选项
      this.childOptions = ""; //子项默认绑定的值
      this.childOptionsOne = ""; //子项一绑定的值
      this.childOptionsTwo = ""; //子项二绑定的值
      this.optionsChild = []; //默认子项的下拉选项置空
    },
    // 设置类型改变时触发
    changeSetType() {
      // this.formData.stageName = "";
      this.optionsStage = [];
      if (this.formData.setTheType === "1") {
        this.obj.stageType = this.formData.setTheType;
        this.optionsStage = this.optionsStageOne;
        this.isDisa = true;
        this.formData.stageName = "";
      } else if (this.formData.setTheType === "2") {
        this.obj.stageType = this.formData.setTheType;
        this.optionsStage = this.optionsStageTwo;
        this.isDisa = true;
        this.formData.stageName = "";
      } else if (this.formData.setTheType === "") {
        this.obj.stageType = this.formData.setTheType;
        this.optionsStage = this.optionsAll;
        this.isDisa = false;
        this.formData.stageName = "";
      }
      this.getListPage(this.obj);
    },
    // 修改
    editRow(val) {
      this.optionsChildItem = [
        { label: "方案一", value: "SCHEME_ONE" },
        { label: "方案二", value: "SCHEME_TWO" },
        { label: "方案三", value: "SCHEME_THREE" }
      ];
      let valData = JSON.parse(JSON.stringify(val));
      this.isEditBox = true;
      let newTime = new Date();
      let nowyear = newTime.getFullYear();
      this.deadlineEdit = valData.deadline;
      this.formDataEdit = valData;
      this.formDataEdit.deadline = nowyear + "-" + valData.deadline;
      // this.formDataEdit.setTheType = this.formData.setTheType;stageType
      this.formDataEdit.setTheType = valData.stageType;
      if (this.formDataEdit.setTheType === "1") {
        this.optionsStage = this.optionsStageOne;
      } else if (this.formDataEdit.setTheType === "2") {
        this.optionsStage = this.optionsStageTwo;
      }
    },
    // 查询
    onSearch() {
      // if (this.formData.setTheType === "9") {
      //   this.$emit("childValue", false);
      // }$date.format(this.formDataTwo.dateTwo, 'MM-dd');
      this.obj.stageCode = "";
      this.obj.deadline = "";
      this.obj.stageType = this.formData.setTheType;
      this.obj["stageCode"] = this.formData.stageName;
      if (!this.formData.deadline) {
        this.obj["deadline"] = this.formData.deadline;
      } else {
        this.obj["deadline"] = $date.format(this.formData.deadline, "MM-dd");
      }
      this.getListPage(this.obj);
    },
    // 下载
    handDownload() {
      let url = "stageCode=" + this.obj.stageCode + "&deadline=" + this.obj.deadline + "&stageType=" + this.obj.stageType;
      url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/ScheduleConfig/download?" + url + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 获取页面数据
    getListPage(Url) {
      this.tableData = [];
      this.getlistScheduleConfig(Url)
        .then(res => {
          this.fullLoading = false;
          let listData = JSON.parse(JSON.stringify(res));
          this.tableData = listData;
        })
        .catch(e => {});
    },
    // 新增
    add() {
      this.isShow = true;
      this.formDataTwo.setTheType = this.formData.setTheType;
      if (this.formDataTwo.setTheType === "1") {
        this.optionsStageAdd = this.optionsStageOne;
        this.isDisa = true;
        // this.formData.stageName = "";
      } else if (this.formDataTwo.setTheType === "2") {
        this.optionsStageAdd = this.optionsStageTwo;
        this.isDisa = true;
        // this.formData.stageName = "";
      } else if (this.formDataTwo.setTheType === "") {
        this.optionsStageAdd = [];
        this.isDisa = false;
        // this.formData.stageName = "";
      }
    },
    // 第一个新增按钮
    addDataDefault() {
      this.childAddOne = true; //子项一显示
      this.isAddif = false; //新增变保存
    },
    // 第一个删除按钮
    delDataDefault() {
      this.isAddOne = false; //默认子项删除
      this.childAdd = false; // div移除
    },
    // 第二个新增按钮
    addDataOne() {
      this.childAddTwo = true; //子项二显示
      this.isAddifOne = false; //新增-》保存
    },
    // 第二个删除按钮
    delDataOne() {
      this.isAddTwo = false; //子选项一删除
      this.childAddOne = false; // div移除
    },
    // 第三个删除按钮
    addDataTwo() {
      this.isAddThree = false; //子选项二删除
      this.childAddTwo = false; // div移除
    },
    // // 时间选择一
    datePick(val) {
      this.formDataTwo.dateOnePick = val;
    },
    // // 时间选择二
    // datePickOne(val) {
    //   this.formDataTwo.dateOnePickOne = val;
    // },
    // // 时间选择三
    // datePickTwo(val) {
    //   this.formDataTwo.dateOnePickTwo = val;
    // },
    // 新增 => 保存
    addSave(fname) {
      this.childAddSubmit.scheduleSetting.childrenList = [];
      this.$refs[fname].validate((valid) => {
        if (valid) {
          if (this.formDataTwo.data[0].childOptions === "") {
            this.addDataSubmit.scheduleConfig.stageType = this.formDataTwo.setTheType;
            this.addDataSubmit.scheduleConfig.stageCode = this.formDataTwo.stageOne;
            this.addDataSubmit.scheduleSetting.deadline = $date.format(
              this.formDataTwo.data[0].dateOne,
              "MM-dd"
            );
            this.addDataSubmit.scheduleSetting[
              "remark"
            ] = this.formDataTwo.remark;
            this.addscheduleConfig(this.addDataSubmit)
              .then(res => {
                this.isShow = false;
                this.obj = {};
                this.obj["stageType"] = this.formData.setTheType;
                this.getListPage(this.obj);
                this.formDataTwo = {
                  data: [
                    { childOptions: "", dateOne: "", issShow: true, options: [] }
                  ],
                  setTheType: "",
                  stageOne: "",
                  dateOnePick: "", //子项默认时间绑定的值
                  dateOnePickOne: "", //子项一时间绑定的值
                  dateOnePickTwo: "", //子项二时间绑定的值
                  childOptions: "", //子项默认绑定的值
                  childOptionsOne: "", //子项一绑定的值
                  childOptionsTwo: "", //子项二绑定的值
                  dateOne: "", //子项默认时间绑定的值(无效值)
                  dateTwo: "", //子项一时间绑定的值(无效值)
                  dateThree: "" //子项二时间绑定的值(无效值)
                };
              })
              .catch(e => {});
          } else {
            let a = 1;
            a;
            this.childAddSubmit.scheduleSetting.childrenList = [];
            if (this.formDataTwo.data.length === 1) {
              this.childAddSubmit.scheduleConfig.stageType = this.formDataTwo.setTheType;
              this.childAddSubmit.scheduleConfig.stageCode = this.formDataTwo.stageOne;
              this.childAddSubmit.scheduleSetting[
                "remark"
              ] = this.formDataTwo.remark;
              for (let j = 0; j < this.formDataTwo.data.length; j++) {
                let caSubmit = {
                  itemCode: this.formDataTwo.data[j].childOptions,
                  deadline: $date.format(
                    this.formDataTwo.data[j].dateOne,
                    "MM-dd"
                  ),
                  remark: this.formDataTwo.remark
                };
                this.childAddSubmit.scheduleSetting.childrenList.push(caSubmit);
              }
              this.addscheduleConfig(this.childAddSubmit).then(res => {
                this.isShow = false;
                this.obj = {};
                this.obj["stageType"] = this.formData.setTheType;
                this.getListPage(this.obj);
                this.formDataTwo = {
                  data: [
                    { childOptions: "", dateOne: "", issShow: true, options: [] }
                  ],
                  setTheType: "",
                  stageOne: "",
                  dateOnePick: "", //子项默认时间绑定的值
                  dateOnePickOne: "", //子项一时间绑定的值
                  dateOnePickTwo: "", //子项二时间绑定的值
                  childOptions: "", //子项默认绑定的值
                  childOptionsOne: "", //子项一绑定的值
                  childOptionsTwo: "", //子项二绑定的值
                  dateOne: "", //子项默认时间绑定的值(无效值)
                  dateTwo: "", //子项一时间绑定的值(无效值)
                  dateThree: "" //子项二时间绑定的值(无效值)
                };
              }).catch(e => {});
            } else if (this.formDataTwo.data.length === 2) {
              if (this.formDataTwo.data[0].childOptions === this.formDataTwo.data[1].childOptions) {
                this.$message({
                  type: "error",
                  message: "已存在重复子项"
                });
              } else {
                this.childAddSubmit.scheduleConfig.stageType = this.formDataTwo.setTheType;
                this.childAddSubmit.scheduleConfig.stageCode = this.formDataTwo.stageOne;
                this.childAddSubmit.scheduleSetting[
                  "remark"
                ] = this.formDataTwo.remark;
                for (let j = 0; j < this.formDataTwo.data.length; j++) {
                  let caSubmit = {
                    itemCode: this.formDataTwo.data[j].childOptions,
                    deadline: $date.format(
                      this.formDataTwo.data[j].dateOne,
                      "MM-dd"
                    ),
                    remark: this.formDataTwo.remark
                  };
                  this.childAddSubmit.scheduleSetting.childrenList.push(caSubmit);
                }
                this.addscheduleConfig(this.childAddSubmit).then(res => {
                  this.isShow = false;
                  this.obj = {};
                  this.obj["stageType"] = this.formData.setTheType;
                  this.getListPage(this.obj);
                  this.formDataTwo = {
                    data: [
                      { childOptions: "", dateOne: "", issShow: true, options: [] }
                    ],
                    setTheType: "",
                    stageOne: "",
                    dateOnePick: "", //子项默认时间绑定的值
                    dateOnePickOne: "", //子项一时间绑定的值
                    dateOnePickTwo: "", //子项二时间绑定的值
                    childOptions: "", //子项默认绑定的值
                    childOptionsOne: "", //子项一绑定的值
                    childOptionsTwo: "", //子项二绑定的值
                    dateOne: "", //子项默认时间绑定的值(无效值)
                    dateTwo: "", //子项一时间绑定的值(无效值)
                    dateThree: "" //子项二时间绑定的值(无效值)
                  };
                }).catch(e => {});
              }
            } else
            if (this.formDataTwo.data.length === 3) {
              if (this.formDataTwo.data[0].childOptions === this.formDataTwo.data[1].childOptions) {
                this.$message({
                  type: "error",
                  message: "已存在重复子项"
                });
              } else if (this.formDataTwo.data[0].childOptions === this.formDataTwo.data[2].childOptions) {
                this.$message({
                  type: "error",
                  message: "已存在重复子项"
                });
              } else if (this.formDataTwo.data[1].childOptions === this.formDataTwo.data[2].childOptions) {
                this.$message({
                  type: "error",
                  message: "已存在重复子项"
                });
              } else {
                this.childAddSubmit.scheduleConfig.stageType = this.formDataTwo.setTheType;
                this.childAddSubmit.scheduleConfig.stageCode = this.formDataTwo.stageOne;
                this.childAddSubmit.scheduleSetting[
                  "remark"
                ] = this.formDataTwo.remark;
                for (let j = 0; j < this.formDataTwo.data.length; j++) {
                  let caSubmit = {
                    itemCode: this.formDataTwo.data[j].childOptions,
                    deadline: $date.format(
                      this.formDataTwo.data[j].dateOne,
                      "MM-dd"
                    ),
                    remark: this.formDataTwo.remark
                  };
                  this.childAddSubmit.scheduleSetting.childrenList.push(caSubmit);
                }
                this.addscheduleConfig(this.childAddSubmit).then(res => {
                  this.isShow = false;
                  this.obj = {};
                  this.obj["stageType"] = this.formData.setTheType;
                  this.getListPage(this.obj);
                  this.formDataTwo = {
                    data: [
                      { childOptions: "", dateOne: "", issShow: true, options: [] }
                    ],
                    setTheType: "",
                    stageOne: "",
                    dateOnePick: "", //子项默认时间绑定的值
                    dateOnePickOne: "", //子项一时间绑定的值
                    dateOnePickTwo: "", //子项二时间绑定的值
                    childOptions: "", //子项默认绑定的值
                    childOptionsOne: "", //子项一绑定的值
                    childOptionsTwo: "", //子项二绑定的值
                    dateOne: "", //子项默认时间绑定的值(无效值)
                    dateTwo: "", //子项一时间绑定的值(无效值)
                    dateThree: "" //子项二时间绑定的值(无效值)
                  };
                }).catch(e => {});
              }
            }
          }
        }
      });
    },
    // 子项值改变事件
    addChildren() {
      this.optionsChildOne = [];
      this.optionsChildTwo = [];
      for (let i = 0; i < this.optionsChild.length; i++) {
        if (this.optionsChild[i].value !== this.formDataTwo.childOptions) {
          this.optionsChildOne.push(this.optionsChild[i]);
        }
      }
    },
    // 子项一值改变事件
    addChildrenOne() {
      this.optionsChildTwo = [];
      for (let i = 0; i < this.optionsChildOne.length; i++) {
        if (
          this.optionsChildOne[i].value !== this.formDataTwo.childOptions && this.optionsChildOne[i].value !== this.formDataTwo.childOptionsOne
        ) {
          this.optionsChildTwo.push(this.optionsChildOne[i]);
        }
      }
    },
    // 新增 => 取消
    cancalAdd() {
      this.isShow = false;
      this.formDataTwo = {
        data: [
          { childOptions: "", dateOne: "", issShow: true, options: [] }
        ],
        setTheType: "",
        stageOne: "",
        dateOnePick: "", //子项默认时间绑定的值
        dateOnePickOne: "", //子项一时间绑定的值
        dateOnePickTwo: "", //子项二时间绑定的值
        childOptions: "", //子项默认绑定的值
        childOptionsOne: "", //子项一绑定的值
        childOptionsTwo: "", //子项二绑定的值
        dateOne: "", //子项默认时间绑定的值(无效值)
        dateTwo: "", //子项一时间绑定的值(无效值)
        dateThree: "" //子项二时间绑定的值(无效值)
      };
    },
    // 删除
    deleteRow(val) {
      // val.settingId;
      this.isSureDel = true;
      this.setId.settingId = val.settingId;
    },
    // 删除 =》 确认
    isSureDeleta() {
      this.deletebyIdScheduleConfig(this.setId)
        .then(res => {
          this.getListPage(this.obj);
        })
        .catch(e => {});
      this.isSureDel = false;
    },
    // 新增阶段弹框
    changeStageAdd() {
      this.optionsChild = [];
      this.formDataTwo.childOptions = "";
      if (
        this.formDataTwo.stageOne === "BRAND_COCERAL_ADJUST_GRADE" || this.formDataTwo.stageOne === "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN" || this.formDataTwo.stageOne === "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN"
      ) {
        this.optionsChild = [
          { label: "方案一", value: "SCHEME_ONE" },
          { label: "方案二", value: "SCHEME_TWO" },
          { label: "方案三", value: "SCHEME_THREE" }
        ];
        this.formDataTwo.data[0].options = [
          { label: "方案一", value: "SCHEME_ONE" },
          { label: "方案二", value: "SCHEME_TWO" },
          { label: "方案三", value: "SCHEME_THREE" }
        ];
        this.otherRule.required = true;
        this.rules.childOptions[0].required = true;
        this.defaultEvent = false;
      } else {
        this.defaultEvent = true;
        this.otherRule.required = false;
        this.rules.childOptions[0].required = false;
        this.optionsChild = [];
        this.formDataTwo.data = [
          { childOptions: "", dateOne: "", issShow: true, options: [] }
        ];
      }
    }
  }
};
</script>
<style scoped>
.borderBottom {
  border-bottom: 1px solid #ebeef5;
}
#deepStyle >>> .el-table--small td,
.el-table--small th {
  padding: 0 !important;
}
#deepStyle >>> .el-table--small .cell,
.el-table--small th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0 !important;
  margin: 0 !important;
}
#deepStyle >>> .el-table--small .cell,
.el-table--small th div {
  padding: 0 !important;
}
#deepStyle >>> .el-table--small .cell {
  line-height: 5;
}
.btn {
  margin: 0;
}
</style>


