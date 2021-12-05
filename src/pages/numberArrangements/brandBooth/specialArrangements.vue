<template>
  <!-- 默认标签页 -->
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="特殊安排" name="first">
      <div id="deepStyle">
        <!-- form表单 -->
        <el-form :inline="true" :model="formData" class="demo-form-inline" size="mini">
          <el-form-item label="设置类型">
            <el-select v-model="formData.setTheType" placeholder="请选择" @change="changeSetType">
              <el-option
                v-for="item in optionsSet"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段">
            <el-select v-model="formData.stageName" placeholder="请选择">
              <el-option
                v-for="item in optionsStage"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-date-picker
              v-model="formData.deadline"
              type="date"
              format="MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设置对象">
            <el-select v-model="formData.setObject" placeholder="请选择" @change="changeSetObj">
              <el-option
                v-for="item in optionsObj"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用主体">
            <el-select v-model="formData.useTheme" placeholder="请选择">
              <el-option
                v-for="item in optionsUse"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="primary" @click="onSubmit">下载</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          style="width: 100%;"
          size="small"
          align="center"
          border>
          <el-table-column align="center" prop="stageName" label="阶段"></el-table-column>
          <el-table-column align="center" prop="itemName" label="子项">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList.length === 0">{{scope.row.itemName}}</div>
              <div
                v-else
                v-for="(item, index) in scope.row.childrenList"
                :key="index"
                :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                {{item.itemName}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="useScope" label="设置对象">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList.length === 0">{{scope.row.useScope | statusSetObj}}</div>
              <div
                v-else
                v-for="(item, index) in scope.row.childrenList"
                :key="index"
                :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                {{item.useScope | statusSetObj}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="useScopeObjectId" label="使用主体">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList.length === 0">{{scope.row.useScopeObjectId}}</div>
              <div
                v-else
                v-for="(item, index) in scope.row.childrenList"
                :key="index"
                :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                {{item.useScopeObjectId}}&nbsp;
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="截止日期">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList.length === 0">
                {{ scope.row.deadline }}
                <i style="display: inline-block; margin-left: 10px;" class="el-icon-date"></i>
              </div>
              <div  
                v-else
                v-for="(item, index) in scope.row.childrenList"
                :key="index"
                :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                {{item.deadline}}
                <i style="display: inline-block; margin-left: 10px;" class="el-icon-date"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList.length === 0">
                {{ scope.row.remark }}
              </div>
              <div  
                v-else
                v-for="(item, index) in scope.row.childrenList"
                :key="index"
                :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                {{item.remark}}&nbsp;
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.childrenList.length === 0">
                <el-button
                  @click="editDataRow(scope.row)"
                  type="text"
                  size="small">
                  修改
                </el-button>
                <el-button
                  @click="delDataRow(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </div>
              <div  
                v-else
                v-for="(item, index) in scope.row.childrenList"
                :key="index"
                :class="index < scope.row.childrenList.length - 1 ? borderBottom : null">
                <el-button
                  @click="editDataRow(item)"
                  type="text"
                  size="small">
                  修改
                </el-button>
                <el-button
                  @click="delDataRow(item)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 按钮 -->
        <el-button type="danger" @click="add">新增</el-button>
        <el-button type="danger" @click="handelSure">确认</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="isShow" width="500px" @close="closeDialog">
          <el-card>
            <div>
              <el-form :model="formDataTwo">
                <el-form-item label="设置类型">
                  <el-select
                    v-model="formDataTwo.setTheType"
                    style="width: 280px;"
                    @change="changeSet">
                    <el-option
                      v-for="item in optionsSet"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="阶段">
                  <el-select
                    v-model="formDataTwo.sectionType"
                    placeholder="请选择"
                    style="width: 280px;"
                    @change="sectionTypeSet">
                    <el-option
                      v-for="item in optionsStageAdd"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- 子项 -->
                <el-form-item label="子项" v-show="isAddOne">
                  <el-select style="width: 280px;" v-model="formDataTwo.childOptions" @change="addChildren">
                    <el-option
                      v-for="(itemChild, indexChild) in optionsChild"
                      :key="indexChild"
                      :label="itemChild.label"
                      :value="itemChild.value"
                      >
                    </el-option>
                  </el-select>
                  <el-button type="primary" v-if="isAddif" size="mini" :disabled="defaultEvent" @click="addDataDefault">新增</el-button>
                  <el-button type="primary" v-else size="mini" v-show="isAddOne" @click="delDataDefault">删除</el-button>
                </el-form-item>
                <el-form-item label="截止时间" v-show="isAddOne">
                  <el-date-picker
                    v-model="formDataTwo.dateOne"
                    type="date"
                    style="width: 280px;"
                    format="MM-dd"
                    @change="datePick"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <!-- 子项一 -->
                <div v-if="childAddOne">
                  <el-form-item label="子项一" v-show="isAddTwo">
                    <el-select style="width: 280px;" v-model="formDataTwo.childOptionsOne" @change="addChildrenOne">
                      <el-option
                        v-for="(itemChildOne, indexChildOne) in optionsChildOne"
                        :key="indexChildOne"
                        :label="itemChildOne.label"
                        :value="itemChildOne.value"
                        >
                      </el-option>
                    </el-select>
                    <el-button type="primary" v-if="isAddifOne" size="mini" @click="addDataOne">新增</el-button>
                    <el-button type="primary" v-else size="mini" class="btn" v-show="isAddTwo" @click="delDataOne">删除</el-button>
                  </el-form-item>
                  <el-form-item label="截止时间" v-show="isAddTwo">
                    <el-date-picker
                      style="width: 280px;"
                      v-model="formDataTwo.dateTwo"
                      type="date"
                      format="MM - dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <!-- 子项二 -->
                <div v-if="childAddTwo">
                  <el-form-item label="子项二" v-show="isAddThree">
                    <el-select style="width: 280px;" v-model="formDataTwo.childOptionsTwo">
                      <el-option
                        v-for="(itemChild, indexChild) in optionsChildTwo"
                        :key="indexChild"
                        :label="itemChild.label"
                        :value="itemChild.value">
                      </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" v-show="isAddThree" @click="addDataTwo">删除</el-button>
                  </el-form-item>
                  <el-form-item label="截止时间" v-show="isAddThree">
                    <el-date-picker
                      type="date"
                      style="width: 280px;"
                      v-model="formDataTwo.dateThree"
                      format="MM - dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
                <el-form-item label="设置对象">
                  <el-select v-model="formDataTwo.setObject" placeholder="请选择" style="width: 280px;" @change="changeObjAdd">
                    <el-option
                      v-for="item in optionsObject"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="使用主体">
                  <el-select v-model="formDataTwo.useTheme" placeholder="请选择" style="width: 280px;">
                    <el-option
                      v-for="item in optionsUseAdd"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="formDataTwo.remark" maxlength="128" style="width: 280px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="addServe">保存</el-button>
                  <el-button @click="isShow = false">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog title="修改" :visible="isEditBox" width="500px" @close="closeEditBox">
          <el-card>
            <el-form :model="formDataEdit">
              <el-form-item label="设置类型">
                <el-select style="width: 280px;" disabled v-model="formDataEdit.stageType">
                  <el-option
                    disabled
                    v-for="item in optionsSet"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="阶段">
                <el-select
                  disabled
                  v-model="formDataEdit.stageCode"
                  placeholder="请选择"
                  style="width: 280px;">
                  <el-option
                    v-for="item of optionsStageEdit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="editChildIte" label="子项">
                <el-select style="width: 280px;" disabled v-model="formDataEdit.itemCode" @change="addChildren">
                  <el-option
                    v-for="(itemChild, indexChild) in optionsChildEdit"
                    :key="indexChild"
                    :label="itemChild.label"
                    :value="itemChild.value"
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="截止时间">
                <el-date-picker
                  v-model="formDataEdit.deadline"
                  type="date"
                  style="width: 280px;"
                  value-format="MM-dd"
                  format="MM-dd"
                  @change="datePickEdit"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="设置对象">
                  <el-select disabled v-model="formDataEdit.useScope" placeholder="请选择" style="width: 280px;" @change="changeObjAdd">
                    <el-option
                      v-for="item in optionsObj"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="使用主体">
                  <el-select disabled v-model="formDataEdit.useScopeObjectId" placeholder="请选择" style="width: 280px;">
                    <el-option
                      v-for="item in optionsUseAdd"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="formDataEdit.remark" maxlength="128" style="width: 280px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="editServe">保存</el-button>
                <el-button @click="isEditBox = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-dialog>
        <!-- 确认删除 -->
        <el-dialog title="提示" :visible.sync="isSureDel" width="500px">
          <span>确认删除？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isSureDel = false">取 消</el-button>
            <el-button type="primary" @click="isSureDeleta">确 定</el-button>
          </span>
        </el-dialog>
      </div>
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
        specialSchedule: "1"
      },
      // 删除传参
      setId: {
        settingId: ""
      },
      fullLoading: true, // 页面加载
      editChildIte: false, //是否有子项
      // 修改select
      optionsStageEdit: [],
      optionsChildEdit: [],
      isEditBox: false, //修改
      isSureDel: false, // 确认删除提示框
      // 没有子项时新增时候的添加传输数据
      addDataSubmit: {
        "scheduleConfig": {
          "stageType": "1",
          "stageCode": "BRAND_COMPANY_APPLY"
        },
        "scheduleSetting": {
          "useScope": "2",
          "useScopeObjectId": "交易团5",
          "deadline": "11-22",
          "childrenList": []
        }
      },
      // 有子项时新增时候的添加传输数据
      childAddSubmit: {
        "scheduleConfig": {
          "stageType": "1",
          "stageCode": "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN"
        },
        "scheduleSetting": {
          "childrenList": []
        }
      },
      // 编辑的数据绑定
      formDataEdit: {
        stageType: "",
        stageCode: "",
        itemCode: "",
        deadline: "",
        useScope: "",
        useScopeObjectId: "",
        remark: ""
      },
      //设置对象
      optionsObj: [
        { label: "所有", value: "" },
        { label: "交易团", value: "2" },
        { label: "商协会", value: "3" },
        { label: "企业", value: "4" }
      ],
      optionsObject: [
        { label: "交易团", value: "2" },
        { label: "商协会", value: "3" },
        { label: "企业", value: "4" }
      ],
      optionsUseAdd: [], //使用主体下拉框
      childAddOne: false, //子项一
      childAddTwo: false, //子项二
      isAddif: true, // 第一个新增变删除
      isAddifOne: true, //子项一
      isAddOne: true, //默认子项可修改 / 禁用
      isAddTwo: true, //子项一可修改 / 禁用
      isAddThree: true, //子项二可修改 / 禁用
      defaultEvent: true, //是否有子选项
      // 新增绑定数据
      formDataTwo: {
        setTheType: "", // 新增设置类型
        sectionType: "", //新增阶段
        childOptions: "", //默认子项
        dateOne: "", //默认截止时间
        dateOnePick: "", // change时的截止时间
        childOptionsOne: "", //子项一
        dateTwo: "", //截止时间一
        childOptionsTwo: "", //子项二
        dateThree: "", //截止时间二
        setObject: "", //新增设置对象
        useTheme: "" //新增使用主体
      },
      // 默认新增子项
      optionsChild: [],
      // 新增阶段绑定数据
      optionsStageAdd: [],
      // 使用主体
      optionsUse: [
        { label: "请选择", value: "" },
        { label: "交易团1", value: "交易团1" },
        { label: "交易团2", value: "交易团2" },
        { label: "商协会1", value: "商协会1" },
        { label: "商协会2", value: "商协会2" },
        { label: "企业1", value: "企业1" },
        { label: "企业2", value: "企业2" }
      ],
      optionsStage: [], //阶段选项
      optionsDate: [], //截止日期
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
        { label: "外贸司公示品牌展位数量", value: "BRAND_FOREIGN_TRADE_PUBLICITY" },
        { label: "外贸司公布品牌展位数量", value: "BRAND_FOREIGN_TRADE_PUBLISH" },
        { label: "商协会提出品牌展位数量安排初步方案", value: "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN" }
      ],
      optionsStageTwo: [
        { label: "请选择", value: "" },
        { label: "企业确认品牌展位申请", value: "BRAND_AFFIRM_BOOTH_APPLY" },
        { label: "企业提交品牌展位退回申请", value: "BRAND_AFFIRM_COMMIT_BOOTH_BACK" },
        { label: "交易团审核退回展位", value: "BRAND_AFFIRM_DEAL_CLUSTER_BACK_APPLY" },
        { label: "商协会提出部分展位重新安排方案", value: "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN" },
        { label: "外贸中心复核商协会调整安排方案", value: "BRAND_AFFIRM_FOREIGN_TRADE_CENTRES_REVIEW_PLAN" },
        { label: "外贸司公示调整安排方案", value: "BRAND_AFFIRM_FOREIGN_TRADE_PUBLICITY" },
        { label: "外贸司公布调整安排方案", value: "BRAND_AFFIRM_FOREIGN_TRADE_PUBLISH" },
        { label: "交易团审核已确认参展的品牌的基本资料", value: "BRAND_AFFIRM_DEAL_CLUSTER_CHECK_BASE_DATA" }
      ],
      valueOne: "",
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
      // 子项样式
      borderBottom: {
        borderBottom: "1px solid #ebeef5"
      },
      isAdd: false,
      isShow: false,
      tableData: [
        {
          section: "",
          subkey: "",
          setObject: "交易团",
          mainConsuming: "广东",
          deadline: "9月24日",
          remark: "企业可提前两天申报"
        },
        {
          section: "",
          subkey: "",
          setObject: "",
          mainConsuming: "",
          deadline: "9月24日",
          remark: "企业可提前两天申报"
        }
      ],
      options: [],
      optionsOne: [
        { label: "请选择", value: "" },
        { label: "品牌评审时间点设置", value: "1" },
        { label: "品牌确认时间点设置", value: "2" },
        { label: "一般性展位安排（重核、展区调整）时间点设置", value: "3" },
        { label: "一般性展位安排（不重核、展区不调整）时间点设置", value: "4" },
        { label: "外贸中心安排上届回收实际使用者得展位时间点设置", value: "5" },
        { label: "安排上届回收用于组展表彰的一般性展位时间点设置", value: "6" },
        { label: "企业新题材展位数量安排时间点设置", value: "7" },
        { label: "补充联营企业活动时间点设置", value: "8" },
        { label: "特殊安排", value: "9" }
      ],
      optionsTwo: [],
      options2: [
        { label: "请选择", value: "" },
        { label: "出口额", value: "11" },
        { label: "境内外商标注册", value: "12" },
        { label: "品牌建设", value: "13" },
        { label: "研发创新和自主知识产权", value: "14" },
        { label: "国际通行认证", value: "15" },
        { label: "行业自律", value: "16" },
        { label: "广交会参展表现", value: "17" }
      ],
      childValueTwo: "",
      formData: {
        deadline: "", //截止日期
        setObject: "", //设置对象
        useTheme: "", //使用主体
        setTheType: "", //设置类型
        stageName: "", //阶段
        user: "",
        seting: "",
        setType: "1",
        stage: "11"
      },
      activeName: "first"
    };
  },
  mounted() {
    this.optionsState = this.optionsStateOne;
    this.getListPage(this.obj);
  },
  // 设置对象过滤器
  filters: {
    statusSetObj(val) {
      // 设置对象
      let value = val - 0;
      if (value === 1) {
        return "所有";
      } else if (value === 2) {
        return "交易团";
      } else if (value === 3) {
        return "商协会";
      } else {
        return "企业";
      }
    }
  },
  methods: {
    ...mapActions("brandBooth", [
      "getlistScheduleConfig", // 获取
      "addscheduleConfig", // 添加
      "deletebyIdScheduleConfig", //删除
      "updatescheduleConfig", //修改
      "updateconfirm" // 确认
    ]),
    // 修改时间
    datePickEdit(val) {
      this.deadlineEdit = val;
    },
    // 确认按钮
    handelSure() {
      this.updateconfirm(this.obj).then(res => {
        this.getListPage(this.obj);
      }).catch(e => {
        this.$message("没有需要确认的时间节点");
      });
    },
    // 设置类型改变时触发
    changeSetType() {
      this.optionsStage = [];
      this.formData.stageName = "";
      if (this.formData.setTheType === "1") {
        this.optionsStage = this.optionsStageOne;
      } else if (this.formData.setTheType === "2") {
        this.optionsStage = this.optionsStageTwo;
      }
    },
    //修改
    editDataRow(val) {
      let valData = JSON.parse(JSON.stringify(val));
      this.isEditBox = true;
      let newTime = new Date();
      let nowyear = newTime.getFullYear();
      this.deadlineEdit = valData.deadline;
      // this.deadlineEdit = $date.format(this.formDataEdit.deadline, 'MM-dd');
      this.formDataEdit = valData;
      this.formDataEdit.deadline = nowyear + "-" + valData.deadline;
      this.optionsStageEdit = [];
      if (this.formDataEdit.stageType === "1") {
        this.optionsStageEdit = this.optionsStageOne;
      } else if (this.formDataEdit.stageType === "2") {
        this.optionsStageEdit = this.optionsStageTwo;
      }
      this.optionsChildEdit = [];
      if (this.formDataEdit.stageCode === "BRAND_COCERAL_ADJUST_GRADE" || this.formDataEdit.stageCode === "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN" || this.formDataTwo.sectionType === "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN") {
        this.optionsChildEdit = [
          { label: "方案一", value: "SCHEME_ONE" },
          { label: "方案二", value: "SCHEME_TWO" },
          { label: "方案三", value: "SCHEME_THREE" }
        ];
        this.editChildIte = true;
      }
      // this.formDataEdit.stageType = this.formData.setTheType;
    },
    // 保存修改
    editServe() {
      this.formDataEdit.deadline = this.deadlineEdit;
      if (this.formDataEdit.deadline == null) {
        this.$message("截止时间不能为空");
      } else {
        this.updatescheduleConfig(this.formDataEdit).then(res => {
          this.getListPage(this.obj);
        }).catch(e => {});
        this.isEditBox = false;
      }
    },
    // 删除当前行数据
    delDataRow(val) {
      this.isSureDel = true;
      this.setId.settingId = val.settingId;
    },
    // 删除 =》 确认
    isSureDeleta() {
      this.deletebyIdScheduleConfig(this.setId).then(res => {
        this.getListPage(this.obj);
      }).catch(e => {});
      this.isSureDel = false;
    },
    // 关闭弹窗事件
    closeEditBox() {
      this.isEditBox = false;
      // this.deadlineEdit = "";
      // 清空弹框
      for (let key in this.formDataEdit) {
        this.formDataEdit[key] = '';
      }
      this.getListPage(this.obj);
    },
    // 新增阶段change改变事件
    sectionTypeSet() {
      this.optionsChild = [];
      this.formDataTwo.childOptions = "";
      if (this.formDataTwo.sectionType === "BRAND_COCERAL_ADJUST_GRADE" || this.formDataTwo.sectionType === "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN" || this.formDataTwo.sectionType === "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN") {
        this.optionsChild = [
          { label: "方案一", value: "SCHEME_ONE" },
          { label: "方案二", value: "SCHEME_TWO" },
          { label: "方案三", value: "SCHEME_THREE" }
        ];
        this.defaultEvent = false;
      } else {
        this.defaultEvent = true;
      }
    },
    // 查询设置对象change改变事件
    changeSetObj() {
      this.optionsUse = [
        { label: "请选择", value: "" },
        { label: "交易团1", value: "交易团1" },
        { label: "交易团2", value: "交易团2" },
        { label: "商协会1", value: "商协会1" },
        { label: "商协会2", value: "商协会2" },
        { label: "企业1", value: "企业1" },
        { label: "企业2", value: "企业2" }
      ];
      this.formData.useTheme = "";
      if (this.formData.setObject === "1") {
        this.optionsUse = [{ label: "请选择", value: "" }];
      } else if (this.formData.setObject === "2") {
        this.optionsUse = [
          { label: "请选择", value: "" },
          { label: "交易团1", value: "交易团1" },
          { label: "交易团2", value: "交易团2" }
        ];
      } else if (this.formData.setObject === "3") {
        this.optionsUse = [
          { label: "请选择", value: "" },
          { label: "商协会1", value: "商协会1" },
          { label: "商协会2", value: "商协会2" }
        ];
      } else if (this.formData.setObject === "4") {
        this.optionsUse = [
          { label: "请选择", value: "" },
          { label: "企业1", value: "企业1" },
          { label: "企业2", value: "企业2" }
        ];
      }
    },
    // 新增设置对象change改变事件
    changeObjAdd() {
      this.optionsUseAdd = [{ label: "请选择", value: "" }];
      // this.formDataTwo.useTheme = "";
      for (let key = 0; key < this.formDataTwo.length; key++) {
        this.formDataTwo[key] = "";
      }
      if (this.formDataTwo.setObject === "1") {
        this.optionsUseAdd = [{ label: "请选择", value: "" }];
      } else if (this.formDataTwo.setObject === "2") {
        this.optionsUseAdd = [
          // { label: "请选择", value: "" },
          { label: "交易团1", value: "交易团1" },
          { label: "交易团2", value: "交易团2" }
        ];
      } else if (this.formDataTwo.setObject === "3") {
        this.optionsUseAdd = [
          // { label: "请选择", value: "" },
          { label: "商协会1", value: "商协会1" },
          { label: "商协会2", value: "商协会2" }
        ];
      } else if (this.formDataTwo.setObject === "4") {
        this.optionsUseAdd = [
          // { label: "请选择", value: "" },
          { label: "企业1", value: "企业1" },
          { label: "企业2", value: "企业2" }
        ];
      }
    },
    // 新增设置类型改变时触发
    changeSet() {
      this.formDataTwo.sectionType = "";
      this.optionsStageAdd = [];
      if (this.formDataTwo.setTheType === "1") {
        this.optionsStageAdd = this.optionsStageOne;
      } else if (this.formDataTwo.setTheType === "2") {
        this.optionsStageAdd = this.optionsStageTwo;
      }
    },
    // 新增弹框关闭事件
    closeDialog() {
      this.getListPage(this.obj);
      this.isShow = false;
      // 清空弹框
      for (let key in this.formDataTwo) {
        this.formDataTwo[key] = '';
      }
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
    // 新增 => 保存按钮
    addServe() {
      if (this.formDataTwo.setTheType === "") {
        this.$message("设置类型不能为空");
      } else if (this.formDataTwo.sectionType === "") {
        this.$message("阶段不能为空");
      } else if (this.formDataTwo.setObject === "") {
        this.$message("设置对象不能为空");
      } else if (this.formDataTwo.useTheme === "") {
        this.$message("使用主体不能为空");
      } else if (
        (this.formDataTwo.sectionType === "BRAND_COCERAL_ADJUST_GRADE" || this.formDataTwo.sectionType === "BRAND_COCERAL_BOOTH_PRELIMINARY_PLAN" || this.formDataTwo.sectionType === "BRAND_AFFIRM_COCERAL_PART_ANEW_PLAN") && this.formDataTwo.childOptions === ""
      ) {
        this.$message("子项不能为空");
      } else if (this.formDataTwo.dateOnePick == null) {
        this.$message("截止日期不能为空");
      } else {
        this.valueOne = 1;
        this.childAddSubmit.scheduleSetting.childrenList = [];
        if (this.formDataTwo.childOptions === "") {
          this.addDataSubmit.scheduleConfig.stageType = this.formDataTwo.setTheType;
          this.addDataSubmit.scheduleConfig.stageCode = this.formDataTwo.sectionType;
          this.addDataSubmit.scheduleSetting.deadline = $date.format(this.formDataTwo.dateOne, 'MM-dd');
          this.addDataSubmit.scheduleSetting.useScope = this.formDataTwo.setObject;
          this.addDataSubmit.scheduleSetting.useScopeObjectId = this.formDataTwo.useTheme;
          this.addDataSubmit.scheduleSetting["remark"] = this.formDataTwo.remark;
          this.addscheduleConfig(this.addDataSubmit).then(res => {
            this.isShow = false;
            this.getListPage(this.obj);
          }).catch(e => {});
        } else {
          // if (this.formDataTwo.childOptions === "") {
          //   this.$message("子项不能为空");
          // }
          this.childAddSubmit.scheduleConfig.stageType = this.formDataTwo.setTheType;
          this.childAddSubmit.scheduleConfig.stageCode = this.formDataTwo.sectionType;
          this.childAddSubmit.scheduleSetting["useScope"] = this.formDataTwo.setObject;
          this.childAddSubmit.scheduleSetting["useScopeObjectId"] = this.formDataTwo.useTheme;
          let caSubmit = {};
          let caSubmitOne = {};
          let caSubmitTwo = {};
          if (this.formDataTwo.childOptions && !this.formDataTwo.childOptionsOne && !this.formDataTwo.childOptionsTwo) {
            caSubmit["itemCode"] = this.formDataTwo.childOptions;
            caSubmit["deadline"] = $date.format(this.formDataTwo.dateOne, 'MM-dd');
            // caSubmit["useScope"] = this.formDataTwo.setObject;
            // caSubmit["useScopeObjectId"] = this.formDataTwo.useTheme;
            caSubmit["remark"] = this.formDataTwo.remark;
            this.childAddSubmit.scheduleSetting.childrenList.push(caSubmit);
          } else if (this.formDataTwo.childOptions && this.formDataTwo.childOptionsOne && !this.formDataTwo.childOptionsTwo) {
            caSubmit["itemCode"] = this.formDataTwo.childOptions;
            caSubmit["deadline"] = $date.format(this.formDataTwo.dateOne, 'MM-dd');
            // caSubmit["useScope"] = this.formDataTwo.setObject;
            // caSubmit["useScopeObjectId"] = this.formDataTwo.useTheme;
            caSubmit["remark"] = this.formDataTwo.remark;
            this.childAddSubmit.scheduleSetting.childrenList.push(caSubmit);
            caSubmitOne["itemCode"] = this.formDataTwo.childOptionsOne;
            caSubmitOne["deadline"] = $date.format(this.formDataTwo.dateTwo, 'MM-dd');
            // caSubmitOne["useScope"] = this.formDataTwo.setObject;
            // caSubmitOne["useScopeObjectId"] = this.formDataTwo.useTheme;
            caSubmitOne["remark"] = this.formDataTwo.remark;
            this.childAddSubmit.scheduleSetting.childrenList.push(caSubmitOne);
          } else if (this.formDataTwo.childOptions && this.formDataTwo.childOptionsOne && this.formDataTwo.childOptionsTwo) {
            caSubmit["itemCode"] = this.formDataTwo.childOptions;
            caSubmit["deadline"] = $date.format(this.formDataTwo.dateOne, 'MM-dd');
            // caSubmit["useScope"] = this.formDataTwo.setObject;
            // caSubmit["useScopeObjectId"] = this.formDataTwo.useTheme;
            caSubmit["remark"] = this.formDataTwo.remark;
            this.childAddSubmit.scheduleSetting.childrenList.push(caSubmit);
            caSubmitOne["itemCode"] = this.formDataTwo.childOptionsOne;
            caSubmitOne["deadline"] = $date.format(this.formDataTwo.dateTwo, 'MM-dd');
            // caSubmitOne["useScope"] = this.formDataTwo.setObject;
            // caSubmitOne["useScopeObjectId"] = this.formDataTwo.useTheme;
            caSubmitOne["remark"] = this.formDataTwo.remark;
            this.childAddSubmit.scheduleSetting.childrenList.push(caSubmitOne);
            caSubmitTwo["itemCode"] = this.formDataTwo.childOptionsTwo;
            caSubmitTwo["deadline"] = $date.format(this.formDataTwo.dateThree, 'MM-dd');
            // caSubmitTwo["useScope"] = this.formDataTwo.setObject;
            // caSubmitTwo["useScopeObjectId"] = this.formDataTwo.useTheme;
            caSubmitTwo["remark"] = this.formDataTwo.remark;
            this.childAddSubmit.scheduleSetting.childrenList.push(caSubmitTwo);
          } else {
            this.$message("输入错误 请重新输入");
          }
          this.addscheduleConfig(this.childAddSubmit).then(res => {
            this.isShow = false;
            // this.obj = {};
            // this.obj["specialSchedule"] = this.formData.setTheType;
            this.getListPage(this.obj);
          }).catch(e => {});
        }
      }
    },
    // 新增
    add() {
      this.optionsStageAdd = [];
      this.isShow = true;
      // this.formDataTwo.setTheType = this.formData.setTheType;
    },
    // 第一个新增按钮
    addDataDefault() {
      this.childAddOne = true; //子项一显示
      this.isAddif = false; //新增变保存
    },
    // 第一个删除按钮
    delDataDefault() {
      this.isAddOne = false; //默认子项禁用
    },
    // 第二个新增按钮
    addDataOne() {
      this.childAddTwo = true; //子项二显示
      this.isAddifOne = false; //新增-》保存
    },
    // 第二个删除按钮
    delDataOne() {
      this.isAddTwo = false; //子选项一禁用
      this.childAddOne = false; // div移除
    },
    // 第三个删除按钮
    addDataTwo() {
      this.isAddThree = false; //子选项二禁用
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
    //子项改变事件
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
        if (this.optionsChildOne[i].value !== this.formDataTwo.childOptions && this.optionsChildOne[i].value !== this.formDataTwo.childOptionsOne) {
          this.optionsChildTwo.push(this.optionsChildOne[i]);
        }
      }
    },
    // 查询
    onSearch() {
      // if (this.formData.setTheType !== "9") {
      //   this.$emit("childValueTwo", true);
      // }
      this.obj["stageType"] = this.formData.setTheType;
      this.obj["stageCode"] = this.formData.stageName;
      // this.obj["deadline"] = this.formData.deadline;
      // this.obj["deadline"] = $date.format(this.formData.deadline, 'MM-dd');
      if (!this.formData.deadline) {
        this.obj["deadline"] = this.formData.deadline;
      } else {
        this.obj["deadline"] = $date.format(this.formData.deadline, 'MM-dd');
      }
      this.obj["useScope"] = this.formData.setObject;
      this.obj["useScopeObjectId"] = this.formData.useTheme;
      this.getListPage(this.obj);
    },
    // 页面加载
    getListPage(Url) {
      this.tableData = [];
      this.getlistScheduleConfig(Url).then(res => {
        this.fullLoading = false;
        // this.tableData = JSON.parse(JSON.stringify(res));
        //
        // let tempRes = [];
        this.tableData = [];
        let ress = JSON.parse(JSON.stringify(res));
        ress.forEach(element => {
          // 有childrenlist
          if (element.childrenList.length) {
            let childlist = JSON.parse(JSON.stringify(element.childrenList));
            element.childrenList = [];
            let setData = new Set();
            childlist.forEach(item => {
              setData.add(item.useScope);
            });
            // useScope 值
            let useData = Array.from(setData);
            // 根据use 生成其余的element
            let tempReaData = [];
            let tempEle = JSON.parse(JSON.stringify(element));
            useData.forEach((itemUse) => {
              tempEle.childrenList = [];
              let tempObj = {};
              tempObj.father = element;
              tempObj.useScope = itemUse;
              tempReaData.push(tempObj);
            });
            // 
            let currentTempReaData = JSON.parse(JSON.stringify(tempReaData));
            let currentTempReaData2 = JSON.parse(JSON.stringify(tempReaData));
            for (let i = 0; i < currentTempReaData.length; i++) {
              let tempTemp = [];
              for (let j = 0; j < childlist.length; j++) {
                if (childlist[j].useScope === currentTempReaData[i].useScope) {
                  tempTemp.push(childlist[j]);
                }
              }
              currentTempReaData2[i].father.childrenList = tempTemp;
            }
            // this.tableData = [];
            for (let itemV of currentTempReaData2) {
              this.tableData.push(itemV.father);
            }
          } else {
            // this.tableData = [];
            // 没有childrenlist
            this.tableData.push(element);
          }
        });
        // this.getListPage(this.obj);
      }).catch(e => {});
    },
    onSubmit() {},
    settype(val) {
      this.formData.setType = val;
    },
    addData() {
      this.isAdd = true;
    },
    delData() {
      this.isAdd = false;
    },
    serveData() {
      this.isAdd = false;
    },
    stage(vel) {
      this.formData.stage = vel;
    }
  }
};
</script>
<style scoped>
.borderBottom{
  border-bottom: 1px solid #ebeef5;
}
#deepStyle >>> .el-table--small td, .el-table--small th{
  padding: 0 !important;
}
#deepStyle >>> .el-table--small .cell, .el-table--small th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding: 0 !important;
  margin: 0 !important;
}
#deepStyle >>> .el-table--small .cell, .el-table--small th div{
  padding: 0 !important; 
}
#deepStyle >>> .el-table--small .cell{
  line-height: 5;
}
.btn {
  margin: 0;
}
</style>


