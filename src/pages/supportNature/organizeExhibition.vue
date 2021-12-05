/**
 * @file 组展进度设置---发布组展进度计划
 */
<style scoped>
.table-margin {
  margin: 10px 0;
}
.top-select {
  width: 200px;
  margin: 0 5px;
}
.top-btns {
  float: right;
  text-decoration: underline;
  color: #409eff;
}
.numSelectedStyle {
  color: #f56c6c;
}
.top-session {
  float: left;
  display: flex;
}
.top-btn {
  width: 96%;
  height: 40px;
  line-height: 40px;
}
.bom-btn-del {
  float: left;
  margin: 20px 10px;
}
.bom-btn {
  width: 96%;
  padding: 0 2%;
}
.org-input {
  width: 200px;
}
.el-dialog__wrapper /deep/ .el-dialog {
  width: 88%;
  height: 70%;
  overflow-y: scroll;
}
.el-form-item {
  margin-bottom: 22px;
}
</style>
 <template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="tabTitle" name="first">
      <div class="top-btn">
        <div class="top-session">
          第
          <el-select v-model="session" placeholder="请选择届数" class="top-select" @change="sessionChange">
            <el-option v-for="item in sessionOption" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          届广交会出口展组展工作时间进度计划表
        </div>
        <el-button type="text" @click="toDownload" class="top-btns">下载</el-button>
        <!-- <el-button type="text" @click="toPrint" class="top-btns">打印</el-button> -->
        <!-- <div v-if="isAfter">
          <div v-for="(item,index) in numData" :key="index">
            <el-button type="text" @click="toRecord(item, index + 1)" class="top-btns" :class="item.clicked ? 'numSelectedStyle' : ''">修改记录{{ item.modifyIndex }}</el-button>
          </div>
        </div>
        <el-button type="text" @click="toStandard" class="top-btns" v-if="isAfter">基准进度表</el-button> -->
      </div>
      <!-- <cust-table v-if="!isAfter" ref='currenttable' class="table-margin" @change-multiple-selection="selectionChange" :cols="cols" :data="custTableData" :loading="custloading" @deal-with-operate="dealWithCust"></cust-table> -->
      <edit-table v-if="!isAfter" ref='currenttable' class="table-margin" 
        :isSelectable="isSelectable" :rules="dateRules" 
        @select-row="sectionRow" 
        @change-all-selection="selectionChange"
       
        :selection="true" :tableTrData="tableTrData" :tableData="tableData" :loading="custloading" 
        @deal-with-change-status-event="dealWithCust" 
        @start-picker-option="startPickerOptions" 
        @end-picker-option="endPickerOptions"></edit-table>
      <!-- <edit-table v-if="isAfter" class="table-margin" :loading="loading" :rules="dateRules" :tableData="tableData" :tableTrData="tableTrData" @deal-with-operate="dealWithOperate" @deal-with-change-status-event="dealWithChangeStatusEvent" @start-picker-option="startPickerOptions" @end-picker-option="endPickerOptions" @deal-text-btn="dealTextBtn"></edit-table> -->
      <div class="bom-btn" v-if="!isAfter">
        <!-- <el-button type="primary" @click="toWatchBefore" class="bom-btn-del">查看与上届最新差异</el-button> -->
        <el-button type="danger" @click="toPublish" class="bom-btn-del">提交</el-button>
        <el-button type="primary" @click="reductionF" class="bom-btn-del">还原</el-button>
        <pagination class="page-bar" :pageInfo="pageInfoBefore" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
        <!-- <pagination class="page-bar" :pageInfo="pageInfoBefore" @handle-size-change="handleSizeBefore" @handle-current-change="handleCurrentBefore"></pagination> -->
      </div>
      <!-- <div class="bom-btn" v-if="isAfter">
        <el-button type="primary" @click="toWatch" class="bom-btn-del">查看与上届最新差异</el-button>
        <el-button type="danger" @click="toDiffer" class="bom-btn-del" :disabled="differDisabled">查看与基准进度表差异</el-button>
      </div> -->
      <el-dialog title="修改组展单位标签进度" :visible.sync="dialogFormVisible">
        <edit-tables :tableData="orgTableData"></edit-tables>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="查看与上届最新差异" :visible.sync="toWatchVisible">
        <el-table :data="watchData" style="width: 100%">
          <el-table-column prop="progressItemRule" label="组展事项" width="100"></el-table-column>
          <el-table-column prop="progressSubitemRule" label="子项" width="200"></el-table-column>
          <el-table-column prop="businessNode" label="具体业务环节" width="200"></el-table-column>
          <el-table-column label="计划开始时间">
            <el-table-column prop="startTime" label="本届" width="100"></el-table-column>
            <el-table-column prop="minus2StartTime" label="上届" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="计划完成时间">
            <el-table-column prop="endTime" label="本届" width="100"></el-table-column>
            <el-table-column prop="minus2EndTime" label="上届" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="工作日">
            <el-table-column prop="workdayVal" label="本届"></el-table-column>
            <el-table-column prop="minus2Workday" label="上届"></el-table-column>
          </el-table-column>
          <el-table-column label="自然日">
            <el-table-column prop="naturedayVal" label="本届"></el-table-column>
            <el-table-column prop="minus2Naturalday" label="上届"></el-table-column>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="查看与基准进度表差异" :visible.sync="toBaseVisible">
        <el-table :data="baseData" style="width: 100%">
          <el-table-column prop="progressItemRule" label="组展事项" width="100"></el-table-column>
          <el-table-column prop="progressSubitemRule" label="子项" width="200"></el-table-column>
          <el-table-column prop="businessNode" label="具体业务环节" width="200"></el-table-column>
          <el-table-column label="计划开始时间">
            <el-table-column prop="startTimee" label="基准" width="100"></el-table-column>
            <el-table-column prop="startTime" label="修改" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="计划完成时间">
            <el-table-column prop="endTimee" label="基准" width="100"></el-table-column>
            <el-table-column prop="endTime" label="修改" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="工作日">
            <el-table-column prop="workdayVale" label="基准"></el-table-column>
            <el-table-column prop="workdayVal" label="修改"></el-table-column>
          </el-table-column>
          <el-table-column label="自然日">
            <el-table-column prop="naturedayVale" label="基准"></el-table-column>
            <el-table-column prop="naturedayVal" label="修改"></el-table-column>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from '@/components/project/common/custTable.vue';
import pagination from '@/components/project/common/pagination.vue';
import editTable from '@/components/project/supportNature/editTable.vue';
import editTables from '@/components/project/supportNature/editTables.vue';
import http from "@/scripts/framework/http";
// import { $helper } from '@/scripts/project/utils';
// import { mapGetters, mapActions } from "vuex";
import { mapActions } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'cust-table': custTable,
    'edit-table': editTable,
    'edit-tables': editTables
  },
  data() {
    // 弹框input校验只能输入0-100数字，最多两位小数
    let validateNum = (rule, value, callback) => {
      if (value === '') {
        return callback();
      } else {
        let reg = /^(\d|[1-9]\d|100)(\.\d{1,2})?$/;
        if (!reg.test(value)) {
          return callback(new Error('请输入0-100的数，且最多两位小数'));
        }
        return callback();
      }
    };
    return {
      //字典
      currentDict: [],
      // tab标题
      tabTitle: '组展进度计划设置',
      // 判断发布前后变量 true：发布后
      isAfter: false,
      // 查看与基准进度表差异按钮禁用
      differDisabled: false,
      // tab
      activeName: 'first',
      // 可编辑表格loading
      loading: false,
      // 发布前表格loading
      custloading: false,
      // 届数
      session: '',
      // 假的最新一届
      // newSession: [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
      newSession: [],
      // 届数数组
      sessionOption: [],
      // 表格选中数据
      multipleSelection: [],
      baseApi: process.env.API_SN_URL,
      // 暂存org数组
      orgData: [],
      // 发布前分页数据
      pageInfoBefore: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      // 发布前初始传参
      BeforeParams: {
        current: "1",
        size: "10",
        exhibitionNum: ""
      },
      // 发布前表头数据
      cols: [
        {
          prop: 'progressItemRule',
          label: '组展事项'
        },
        {
          prop: 'progressSubitemRule',
          label: '子项'
        },
        {
          prop: 'businessNode',
          width: "200px",
          label: '具体业务环节'
        },
        {
          prop: 'startTime',
          width: "120px",
          label: '计划开始时间'
        },
        {
          prop: 'endTime',
          width: "120px",
          label: '计划完成时间'
        },
        {
          prop: 'workdayVal',
          label: '工作日'
        },
        {
          prop: 'naturedayVal',
          label: '自然日'
        },
        {
          prop: 'comment',
          label: '备注'
        },
        {
          prop: 'minus2StartTime',
          label: '计划开始时间（同比去年）'
        },
        {
          prop: 'minus2EndTime',
          label: '计划完成时间（同比去年）'
        },
        {
          prop: 'minus2Workday',
          label: '工作日'
        },
        {
          prop: 'minus2Naturalday',
          label: '自然日'
        },
        {
          prop: 'minus1StartTime',
          label: '计划开始时间（环比上届）'
        },
        {
          prop: 'minus2EndTime',
          label: '计划完成时间（环比上届）'
        },
        {
          prop: 'minus1Workday',
          label: '工作日'
        },
        {
          prop: 'minus1Naturalday',
          label: '自然日'
        },
        {
          prop: 'finishJudgement',
          label: '完成判断(%)'
        },
        {
          prop: 'progressValue',
          label: '完成进度'
        },
        {
          prop: 'operation',
          type: 'operator',
          label: '操作',
          fixed: 'right',
          btns: [
            {
              type: 'underlineText',
              prop: 'edit',
              label: '查看'
            }
          ]
        }
      ],
      // 发布前表格数据
      custTableData: {
        selection: true,
        data: []
      },
      // 发布后表格数据
      tableData: [],
      // 修改次数数组
      numData: [],
      // 发布后表头数据
      tableTrData: [
        {
          prop: "progressItemRule",
          label: "组展事项",
          type: "string"
        },
        {
          prop: "progressSubitemRule",
          label: "子项",
          type: "string"
        },
        {
          prop: "businessNode",
          label: "具体业务环节",
          width: "200px",
          type: "string"
        },
        {
          prop: "startTime",
          label: "计划开始时间",
          width: "200px",
          start: true,
          format: "yyyy/MM/dd",
          type: "datepicker"
        },
        {
          prop: "endTime",
          label: "计划完成时间",
          width: "200px",
          format: "yyyy/MM/dd",
          type: "datepicker"
        },
        {
          prop: "workdayVal",
          label: "工作日",
          type: "string"
        },
        {
          prop: 'naturedayVal',
          label: '自然日',
          type: "string"
        },
        {
          prop: "comment",
          label: "备注",
          type: "string"
        },
        {
          prop: 'minus2StartTime',
          label: '计划开始时间（同比去年）',
          width: "120px",
          type: "string"
        },
        {
          prop: 'minus2EndTime',
          label: '计划完成时间（同比去年）',
          width: "120px",
          type: "string"
        },
        {
          prop: 'minus2Workday',
          label: '工作日',
          type: "string"
        },
        {
          prop: 'minus2Naturalday',
          label: '自然日',
          type: "string"
        },
        {
          prop: 'minus1StartTime',
          label: '计划开始时间（环比上届）',
          width: "120px",
          type: "string"
        },
        {
          prop: 'minus2EndTime',
          label: '计划完成时间（环比上届）',
          width: "120px",
          type: "string"
        },
        {
          prop: 'minus1Workday',
          label: '工作日',
          type: "string"
        },
        {
          prop: 'minus1Naturalday',
          label: '自然日',
          type: "string"
        },
        {
          prop: "finishJudgement",
          label: "完成判断",
          type: "string"
        },
        {
          prop: "progressValue",
          label: "完成进度(单位%)",
          width: "120px",
          type: "btn",
          textBtn: true,
          show: true,
          fixed: 'right',
          oper: "修改"
        },
        {
          type: "btn",
          label: "操作",
          fixed: "right",
          width: "120px",
          show: true,
          changeStatus: true,
          operations: [
            {
              prop: "edit",
              label: "修改",
              type: "text",
              class: "primary"
            },
            {
              prop: "confirm",
              type: "icon",
              iconName: "el-icon-check",
              class: "confirm"
            },
            {
              prop: "cancel",
              type: "icon",
              iconName: "el-icon-close",
              class: "cancel"
            }
          ]
        }
      ],
      // 发布后分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      // 发布后初始传参
      queryParams: {
        current: "1",
        size: "10",
        exhibitionNum: ""
      },
      // 修改弹窗
      dialogFormVisible: false,
      toBaseVisible: false,
      toWatchVisible: false,

      watchData: [],
      baseData: [],
      dateRules: {
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择完成时间', trigger: 'change' }
        ]
      },
      // 弹出层表格数据
      orgTableData: {
        rules: {
          progressValue: [
            { validator: validateNum, trigger: 'blur' }
          ]
        },
        data: [],
        trData: [
          {
            prop: 'name',
            label: '组展单位',
            editable: false
          },
          {
            prop: 'text',
            label: '名称',
            editable: false
          },
          {
            prop: 'progressValue',
            label: '完成进度',
            editable: true,
            type: 'input',
            width: '220px',
            maxlength: '5'
          }
        ]
      }
    };
  },
  computed: {
    // ...mapGetters('organizationProgress', ['queryplan'])
  },
  created() {
    //获取字典
    this.getDiction();
  },
  mounted() {
  },
  methods: {
    ...mapActions('organizationProgress', ['currentSessionInfo', 'worksAndDaysInfo', 'queryExhibitionNumInfo', 'queryPlanInfo', 'submithPlanInfo', 'modifyAfterPublishInfo']),
    getDiction() {
      if (this.$route.query.exhibitionNum !== undefined) {
        let examh = this.$route.query.exhibitionNum;
        let currentPg = this.$route.query.currentPage;
        let _this = this;
        _this.currentSessionInfo().then(function (reso) {
          _this.newSession.push(reso.exhibitionNum);
        // 获取当前届数
          http.get(_this.baseApi + "/api/exp/exhibitions/getListAll").then(res => {
          // 有往届数组时，合并最新届数
            if (res.length > 0) {
              let newArr = [];
              res.forEach(element => {
                newArr.push(element.exhibitionNum);
              });
              _this.sessionOption = [...new Set(newArr.concat(_this.newSession))];
              let arrs = [];
              for (let i = 0; i <= _this.sessionOption.length; i++) {
                if (_this.sessionOption[i] >= _this.newSession[0]) {
                  arrs.push(_this.sessionOption[i]);
                }
              }
              _this.sessionOption = arrs;
              _this.session = examh;
            // 初始列表
              _this.getDataQuery(currentPg);
            } else {
            // 无往届时，届数选择框只为最新数组
              _this.sessionOption = _this.newSession;
              _this.session = examh;
            // 初始列表
              _this.getDataQuery(currentPg);
            }
          });
        });
      } else {
        let _this = this;
        _this.currentSessionInfo().then(function (reso) {
          _this.newSession.push(reso.exhibitionNum);
        // 获取当前届数
          let currentExe = reso.exhibitionNum;
          http.get(_this.baseApi + "/api/exp/exhibitions/getListAll").then(res => {
          // 有往届数组时，合并最新届数
            if (res.length > 0) {
              let newArr = [];
              res.forEach(element => {
                newArr.push(element.exhibitionNum);
              });
              _this.sessionOption = [...new Set(newArr.concat(_this.newSession))];
              let arrs = [];
              for (let i = 0; i <= _this.sessionOption.length; i++) {
                if (_this.sessionOption[i] >= _this.newSession[0]) {
                  arrs.push(_this.sessionOption[i]);
                }
              }
              _this.sessionOption = arrs;
              _this.session = currentExe;
            // 初始列表
              _this.getData();
            } else {
            // 无往届时，届数选择框只为最新数组
              _this.sessionOption = _this.newSession;
              _this.session = currentExe;
            // 初始列表
              _this.getData();
            }
          });
        });
      }
    },
    // 初始列表
    getData() {
      let _this = this;
      // 开始loading
      _this.custloading = true;
      _this.loading = true;
      _this.BeforeParams.exhibitionNum = this.session;
      this.queryPlanInfo(_this.BeforeParams).then(res => {
        // 查询成功
        // 分页
        if (res.total > 0) {
          this.pageInfoBefore.currentPage = res.current;
          this.pageInfoBefore.total = res.total;
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfoBefore.currentPage = 1;
          this.pageInfoBefore.total = 0;
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.tableData = res.records;
        this.getBasicData(this.tableData, this.tableData[0].progressHistories.length - 1);
        this.watchData = res.records;
        // let tranData = this.tableData;
        // this.tableData.forEach((element, index) => {
        //   if (element.finishJudgement === '人工判断') {
        //     if (element.progressHistories[index].progressValue === 100) {
        //       element.progressValue = '已完成';
        //     } else {
        //       element.progressValue = '未完成';
        //     }
        //   } else if (element.finishJudgement === '系统判断') {
        //     if (element.progressHistories[index].progressValue) {
        //       element.progressValue = element.progressValue + '%';
        //     } else {
        //       element.progressValue = 0 + '%';
        //     }
        //   }
        // });
        // 发布后所需的修改次数数组
        let data = [];
        if (this.tableData[0].progressHistories) {
          this.tableData[0].progressHistories.map(el => {
            if (el.modifyIndex !== 0) {
              data.push({
                modifyIndex: el.modifyIndex
              });
            }
          });
        }
        this.numData = data;
        // 判断表格数据为发布前还是发布后
        if (this.tableData.length > 0) {
          this.tableData.forEach((value) => {
            if (value.progressHistories[0].modifyIndex === -2) {
              // 发布前表格以及tab标题
              this.isAfter = false;
              this.tabTitle = '组展进度计划设置';
            } else {
              // 发布后表格以及tab标题
              this.isAfter = true;
              this.tabTitle = '组展进度计划查看';
            }
          });
        }
        // 结束loading
        _this.loading = false;
        _this.custloading = false;
        // this.baseData = JSON.parse(JSON.stringify(res.records));
        // 发布后可编辑表格属性定义
        this.tableData.map((ele) => {
          if (ele.isInSetting !== 1) {
            ele.operateType = 'other';
          } else {
            ele.operateType = 'text';
          }
          ele.textType = 'text';
          ele.isEdit = false;
          ele.operating = true;
          let now = new Date();
          if (this.dateFmt(ele.startTime) < this.dateFmt(now) && ele.startTime != null) {
            ele.dateDisabled = true;
          } else {
            ele.dateDisabled = false;
          }
        });
        //默认选中
        this.defaultChecked();
      }).catch(e => {
        // 查询失败
        // 结束loading
        _this.custloading = false;
        _this.loading = false;
      });
    },
    getDataQuery(currentPage) {
      let _this = this;
      // 开始loading
      _this.custloading = true;
      _this.BeforeParams.exhibitionNum = this.session;
      _this.BeforeParams.current = currentPage;
      this.queryPlanInfo(_this.BeforeParams).then(res => {
        // 查询成功
        // 分页
        if (res.total > 0) {
          this.pageInfoBefore.currentPage = res.current;
          this.pageInfoBefore.total = res.total;
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfoBefore.currentPage = 1;
          this.pageInfoBefore.total = 0;
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.tableData = res.records;
        this.watchData = res.records;
        this.getBasicData(this.tableData, this.tableData[0].progressHistories.length - 1);
        // 发布后所需的修改次数数组
        let data = [];
        if (this.tableData[0].progressHistories) {
          this.tableData[0].progressHistories.map(el => {
            if (el.modifyIndex !== 0) {
              data.push({
                modifyIndex: el.modifyIndex
              });
            }
          });
        }
        this.numData = data;
        // 判断表格数据为发布前还是发布后
        if (this.tableData.length > 0) {
          this.tableData.forEach((value) => {
            if (value.progressHistories[0].modifyIndex === -2) {
              // 发布前表格以及tab标题
              this.isAfter = false;
              this.tabTitle = '组展进度计划设置';
            } else {
              // 发布后表格以及tab标题
              this.isAfter = true;
              this.tabTitle = '组展进度计划查看';
            }
          });
        }
        _this.custloading = false;
        // 发布后可编辑表格属性定义
        this.tableData.map((ele) => {
          if (ele.isInSetting !== 1) {
            ele.operateType = 'other';
          } else {
            ele.operateType = 'text';
          }
          ele.textType = 'text';
          ele.isEdit = false;
          ele.operating = true;
          let now = new Date();
          if (this.dateFmt(ele.startTime) < this.dateFmt(now) && ele.startTime != null) {
            ele.dateDisabled = true;
          } else {
            ele.dateDisabled = false;
          }
        });
        //默认选中
        this.defaultChecked();
      }).catch(e => {
        // 查询失败
        // 结束loading
        _this.custloading = false;
      });
    },
    getBasicData(data, newIndex) {
      if (data && data.length > 0) {
        data.forEach((value, index, array) => {
          let newstartTime = '';
          let newendTime = '';
          let newprogressVal = '';
          let newworkday = '';
          let newnatureday = '';
          if (value.progressHistories) {
            newstartTime = value.progressHistories[newIndex].startTime;
            newendTime = value.progressHistories[newIndex].endTime;
            newworkday = value.progressHistories[newIndex].workday;
            newnatureday = value.progressHistories[newIndex].naturalday;
            if (value.finishJudgement === '系统判断') {
              if (value.progressHistories[newIndex].progressValue != null) {
                newprogressVal = value.progressHistories[newIndex].progressValue;
                value.nums = value.progressHistories[newIndex].progressValue;
              } else {
                newprogressVal = 0;
                value.nums = 0;
              }
            } else if (value.finishJudgement === '人工判断') {
              if (value.progressHistories[newIndex].progressValue === 100) {
                newprogressVal = '已完成';
              } else {
                newprogressVal = '未完成';
              }
            }
          } else {
            newstartTime = '';
            newendTime = '';
            newprogressVal = '';
            newnatureday = '';
            newworkday = '';
          }
          value.startTime = newstartTime;
          value.endTime = newendTime;
          value.naturedayVal = newnatureday;
          value.workdayVal = newworkday;
          value.progressValue = newprogressVal;
          value.curIndex = 0;
        });
      }
    },
    // 届数改变
    sessionChange(val) {
      localStorage.setItem('session', val);
      // 传参改变，刷新表格
      this.BeforeParams.exhibitionNum = val;
      this.queryParams.exhibitionNum = val;
      this.session = val;
      this.getData();
    },
    // 时间转换方法
    dateFmt(val) {
      let date = new Date(val);
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      return Y + '/' + M + '/' + D;
    },
    // 打印
    toPrint() { },
    // 下载
    toDownload() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/rule/export4set?exhibitionNum=${this.session}`, '组展进度计划.xls');
    },
    // 查看与上届最新差异
    toWatch() {
      this.toWatchVisible = true;
    },
    // 查看与基准进度表差异
    toDiffer() {
      this.baseData = JSON.parse(JSON.stringify(this.tableData));
      this.baseData.map(el => {
        let newstartTime = '';
        let newendTime = '';
        let newworkday = '';
        let newnatureday = '';
        if (el.progressHistories) {
          newstartTime = el.progressHistories[0].startTime;
          newendTime = el.progressHistories[0].endTime;
          newworkday = el.progressHistories[0].workday;
          newnatureday = el.progressHistories[0].naturalday;
        }
        el.startTimee = newstartTime;
        el.endTimee = newendTime;
        el.naturedayVale = newnatureday;
        el.workdayVale = newworkday;
      });
      this.toBaseVisible = true;
    },
    // 发布前查看与上届最新差异
    toWatchBefore() {
      this.toWatchVisible = true;
    },
    // 提交
    toPublish() {
      this.$confirm('您确定提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        // 开始loading
        _this.custloading = true;
        let param = {
          exhibitionNum: this.session
        };
        this.submithPlanInfo(param).then(res => {
          _this.$message({
            type: 'success',
            message: "恭喜你,提交成功!"
          });
          _this.custloading = false;
          _this.getData();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 发布后分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.custloading = true;
      _this.pageInfoBefore.pageSize = val;
      _this.BeforeParams.size = val;
      // _this.queryPlanInfo(_this.BeforeParams).then(res => {
      //   let tranData = JSON.parse(JSON.stringify(res.records));
      //   this.tableData = JSON.parse(JSON.stringify(tranData));
      //   this.watchData = JSON.parse(JSON.stringify(tranData));
      //   this.defaultChecked(); //复选框默认选中
      //   // 发布后可编辑表格属性定义
      //   this.tableData.map((ele) => {
      //     if (ele.isInSetting !== 1) {
      //       ele.operateType = 'other';
      //     } else {
      //       ele.operateType = 'text';
      //     }
      //     ele.textType = 'text';
      //     ele.isEdit = false;
      //     ele.operating = true;
      //     let now = new Date();
      //     if (this.dateFmt(ele.startTime) < this.dateFmt(now) && ele.startTime != null) {
      //       ele.dateDisabled = true;
      //     } else {
      //       ele.dateDisabled = false;
      //     }
      //   });
      //   //设置table的loading变量
      //   _this.custloading = false;
      // });
      _this.getData();
    },
    // 发布后
    handleCurrentChange(val) {

      //设置table的loading变量
      let _this = this;
      _this.custloading = true;
      _this.pageInfoBefore.currentPage = val;
      _this.BeforeParams.current = val;
      // _this.queryPlanInfo(_this.BeforeParams).then(res => {
      //   let tranData = JSON.parse(JSON.stringify(res.records));
      //   this.tableData = JSON.parse(JSON.stringify(tranData));
      //   this.watchData = JSON.parse(JSON.stringify(tranData));
      //   this.defaultChecked(); //复选框默认选中
      //   // 发布后可编辑表格属性定义
      //   this.tableData.map((ele) => {
      //     if (ele.isInSetting !== 1) {
      //       ele.operateType = 'other';
      //     } else {
      //       ele.operateType = 'text';
      //     }
      //     ele.textType = 'text';
      //     ele.isEdit = false;
      //     ele.operating = true;
      //     let now = new Date();
      //     if (this.dateFmt(ele.startTime) < this.dateFmt(now) && ele.startTime != null) {
      //       ele.dateDisabled = true;
      //     } else {
      //       ele.dateDisabled = false;
      //     }
      //   });
      //   //设置table的loading变量
      //   _this.custloading = false;
      // });
      _this.getData();
    },
    // 发布前分页事件
    handleSizeBefore(val) {
      //设置table的loading变量
      let _this = this;
      _this.custloading = true;
      _this.pageInfoBefore.pageSize = val;
      _this.BeforeParams.size = val;
      _this.queryPlanInfo(_this.BeforeParams).then(res => {
        let tranData = JSON.parse(JSON.stringify(res.records));
        this.tableData = JSON.parse(JSON.stringify(tranData));
        this.defaultChecked(); //复选框默认选中
        //设置table的loading变量
        _this.custloading = false;
      });
    },
    // 发布前分页事件
    handleCurrentBefore(val) {
      //设置table的loading变量
      let _this = this;
      _this.custloading = true;
      _this.pageInfoBefore.currentPage = val;
      _this.BeforeParams.current = val;
      _this.queryPlanInfo(_this.BeforeParams).then(res => {
        let tranData = JSON.parse(JSON.stringify(res.records));
        this.tableData = JSON.parse(JSON.stringify(tranData));
        this.watchData = JSON.parse(JSON.stringify(tranData));
        this.defaultChecked(); //复选框默认选中
        //设置table的loading变量
        _this.custloading = false;
      });
    },
    // 查看特例详情
    dealWithOperate(scope, prop) {
      //查看点击事件
      if (prop === 'detail') {
        // 跳转查看页面并带值
        this.$router.push({
          path: '/specialCaseList',
          query: {
            progressRuleId: scope.row.progressRuleId,
            unitTagName: scope.row.unitTag,
            finishJudgement: scope.row.finishJudgement
          }
        });
      }
    },
    // 发布后表格处理操作按钮事件
    dealWithChangeStatusEvent(scope, operateItem) {
      if (operateItem.prop === "edit") {
        scope.row.isEdit = true;
        scope.row.operateType = 'icon';
        if (scope.row.finishJudgement === '人工判断') {
          scope.row.isAI = true;
        } else {
          scope.row.isAI = false;
        }
      } else if (operateItem.prop === 'confirm') {
        if (!scope.row.endTime || !scope.row.startTime) {
          this.$message({
            type: 'error',
            message: '开始或完成时间不可为空'
          });
        } else {
          this.editData(scope);
          scope.row.isEdit = false;
          scope.row.operateType = 'text';
        }
      } else if (operateItem.prop === 'cancel') {
        scope.row.isEdit = false;
        scope.row.operateType = 'text';
      } else {
        this.sendData(scope);
      }
    },
    // 发布后修改数据
    editData(scope) {
      let editstartTime = null;
      let editendTime = null;
      if (scope.row.endTime) {
        editendTime = this.dateFmt(scope.row.endTime);
      }
      if (scope.row.startTime) {
        editstartTime = this.dateFmt(scope.row.startTime);
      }
      if (scope.row.startTime) {
        editstartTime = this.dateFmt(scope.row.startTime);
      }
      let param = {};
      // if (this.orgTableData.data.length < 1) {
      //   param = {
      //     "progressRuleId": scope.row.progressRuleId,
      //     "exhibitionNum": this.session,
      //     "progressHistories": [
      //       {
      //         "endTime": editendTime,
      //         "progressHistoryId": scope.row.progressHistories[scope.row.curIndex].progressHistoryId,
      //         "startTime": editstartTime,
      //         "progressStas": scope.row.progressHistories[scope.row.curIndex].progressStas
      //       }
      //     ]
      //   };
      // } else {
      //   param = {
      //     "progressRuleId": scope.row.progressRuleId,
      //     "exhibitionNum": this.session,
      //     "progressHistories": [
      //       {
      //         "endTime": editendTime,
      //         "progressHistoryId": scope.row.progressHistories[0].progressHistoryId,
      //         "startTime": editstartTime,
      //         "progressStas": this.orgTableData.data
      //       }
      //     ]
      //   };
      // }
      param = {
        "progressRuleId": scope.row.progressRuleId,
        "exhibitionNum": this.session,
        "progressHistories": [
          {
            "endTime": editendTime,
            "progressHistoryId": scope.row.progressHistories[scope.row.curIndex].progressHistoryId,
            "startTime": editstartTime,
            "progressValue": scope.row.progressValue
          }
        ]
      };
      let progressValue = param.progressHistories[0].progressValue;

      if (progressValue === "未完成") {
        param.progressHistories[0].progressValue = 0;
      } else if (progressValue === "已完成") {
        param.progressHistories[0].progressValue = 100;
      }
      this.modifyAfterPublishInfo(param).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.getData();
      });
    },
    // 发布后发送提醒
    sendData(scope) { },
    // 点击修改tab事件
    toRecord(item, index) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.differDisabled = false;
        this.getBasicData(this.tableData, index);
      }, 1000);
    },
    // 点击基准进度表按钮事件
    toStandard() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getBasicData(this.tableData, 0);
        this.differDisabled = true;
      }, 1000);
    },
    // 开始时间控件change事件
    startPickerOptions(scope, prop) {
      if (scope.startTime != null && scope.endTime != null) {
        let param = {
          startTime: this.dateFmt(scope.startTime),
          endTime: this.dateFmt(scope.endTime)
        };
        this.worksAndDaysInfo(param).then(res => {
          scope.naturedayVal = res.naturalday;
          scope.workdayVal = res.workday;
        });
      }
    },
    // 结束时间控件change事件
    endPickerOptions(scope, prop) {
      if (scope.startTime != null && scope.endTime != null) {
        let param = {
          startTime: this.dateFmt(scope.startTime),
          endTime: this.dateFmt(scope.endTime)
        };
        this.worksAndDaysInfo(param).then(res => {
          scope.naturedayVal = res.naturalday;
          scope.workdayVal = res.workday;
        });
      }
    },
    // 完成进度修改事件
    // dealTextBtn(scope, textItem) {
    //   if (textItem.prop === "edit") {
    //     scope.row.textType = 'icon';
    //     this.orgTableData.data.splice(0, this.orgTableData.data.length);
    //     let index = scope.row.progressHistories.length - 1;
    //     this.orgData = JSON.parse(JSON.stringify(scope.row.progressHistories[index].progressStas));
    //     for (let i = 0; i < this.orgData.length; i++) {
    //       const element = this.orgData[i];
    //       for (let j = 0; j < this.currentDict.length; j++) {
    //         const thisDict = this.currentDict[j];
    //         if (element.orgId === thisDict.value) {
    //           this.orgTableData.data.push({
    //             name: thisDict.parentName,
    //             text: thisDict.label,
    //             progressValue: (element.progressValue == null ? "0" : element.progressValue)
    //           });
    //         }
    //       }
    //     }
    //     this.dialogFormVisible = true;
    //   } else if (textItem.prop === "cancel") {
    //     scope.row.textType = 'text';
    //   } else {
    //     this.confirmValue(scope);
    //     scope.row.textType = 'text';
    //   }
    // },
    //计算完成进度平均值
    confirmValue(scope) {
      let hasArr = JSON.parse(JSON.stringify(this.orgTableData.data));
      let num = 0;
      hasArr.map(el => {
        num += Number(el.progressValue);
      });
      scope.row.progressValue = (num / hasArr.length).toFixed(2) + '%';
    },
    // 弹框确认
    confirm() {
      this.dialogFormVisible = false;
    },
    //默认选中方法
    defaultChecked() {
      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index];
        if (element.isInSetting === 1) {
          this.multipleSelection.push(element);
          this.$refs.currenttable.selectionRow(index);
        }
      }
    },

    isSelectable(row) {
      if (row.initStatus === 1) {
        return true;
      } else {
        return false;
      }
    },

    //修改判定
    // 发布前操作方法
    dealWithCust(scope, operateItem) {
      //编辑点击事件
      if (operateItem.prop === 'edit') {
        // 跳转编辑页面并带值    跳转到修改界面
        if (scope.row.initStatus === 1) {
          this.$router.push({
            path: '/revisionExhibition',
            query: {
              row: scope.row,
              exhibitionNum: this.session,
              currentPage: this.pageInfoBefore.currentPage
            }
          });
        } else if (scope.row.initStatus === 2) { //非初始状态已提交--在当前页进行修改
          scope.row.isEdit = true;
          scope.row.operateType = 'icon';
          if (scope.row.finishJudgement === '人工判断') {
            scope.row.isAI = true;
          } else {
            scope.row.isAI = false;
          }
        } else {

          this.$message({
            message: '该数据无法进行修改！',
            type: 'warning'
          });
        }
      } else if (operateItem.prop === 'confirm') {     //修改确定
        if (!scope.row.endTime || !scope.row.startTime) {
          this.$message({
            type: 'error',
            message: '开始或完成时间不可为空'
          });
        } else if (scope.row.endTime < scope.row.startTime) {
          this.$message({
            type: 'error',
            message: '完成时间不能小于开始时间'
          });
        } else {
          this.editData(scope);   //发布后修改
          scope.row.isEdit = false;
          scope.row.operateType = 'text';
        }
      } else if (operateItem.prop === 'cancel') {      //修改取消
        scope.row.isEdit = false;
        scope.row.operateType = 'text';
      }
      //查看点击事件
      if (operateItem.prop === 'watch') {
        // 跳转查看页面并带值
        this.$router.push({
          path: '/specialCaseList',
          query: {
            progressRuleId: scope.row.progressRuleId,
            unitTagName: scope.row.unitTag,
            finishJudgement: scope.row.finishJudgement
          }
        });
      }
    },
    //复选框选中事件
    selectionChange(val) {
      //释放修改按钮
      this.multipleSelection = val;
      if (val.length > 0) {
        //修改参数
        let par = [];
        for (let index = 0; index < this.multipleSelection.length; index++) {
          const element = this.multipleSelection[index];
          element.isInSetting = 1;
          element.operateType = 'text';//释放修改按钮
          par.push({
            progressRuleId: element.progressRuleId,
            isInSetting: element.isInSetting,
            progressHistories: [
              {
                progressHistoryId: element.progressHistories[0].progressHistoryId
              }
            ]
          });
        }
        // 20190522 处理表格不刷新问题
        this.tableData = [...this.multipleSelection];
        let params = JSON.stringify(par);
        http.postJson(this.baseApi + "/api/progress/rule/isInSetting", params).then(data => {
        }).catch(error => { });
      } else {
        let noPar = [];
        for (let index = 0; index < this.tableData.length; index++) {
          const element = this.tableData[index];
          element.isInSetting = 0;    //释放修改按钮
          element.operateType = 'other';   //关闭修改按钮
          noPar.push({
            progressRuleId: element.progressRuleId,
            isInSetting: element.isInSetting,
            progressHistories: [
              {
                progressHistoryId: element.progressHistories[0].progressHistoryId
              }
            ]
          });
        }
        // 20190522 处理表格不刷新问题
        this.tableData = [...this.tableData];
        let params2 = JSON.stringify(noPar);
        http.postJson(this.baseApi + "/api/progress/rule/isInSetting", params2).then(data => {
        }).catch(error => { });
      }
    },
    // // 复选框数据变化
    // selectionAll(val) {
    //    //释放修改按钮
    //   this.multipleSelection = val;
    //   console.log(val);
    //   if (val.length) {
    //     this.$nextTick(function () {
    //       //修改参数
    //       for (let index = 0; index < this.multipleSelection.length; index++) {
    //         const element = this.multipleSelection[index];
    //         element.isInSetting = 1;
    //         element.operateType = 'text';//释放修改按钮
    //       }
    //       // 全部取消选中
    //       if (this.multipleSelection.length === 0) {
    //         for (let index = 0; index < this.tableData.length; index++) {
    //           const element = this.tableData[index];
    //           element.isInSetting = 0;    //释放修改按钮
    //           element.operateType = 'other';   //关闭修改按钮
    //         }
    //       }
    //     });
    //   }
    // },
    //单个勾选
    sectionRow(selection, row) {
      let thisIndex = selection.indexOf(row);
      if (thisIndex === -1) {   //取消选中
        row.operateType = 'other';//关闭修改按钮
        let param = JSON.stringify([{
          progressRuleId: row.progressRuleId,
          isInSetting: '0',
          progressHistories: [
            {
              progressHistoryId: row.progressHistories[0].progressHistoryId
            }
          ]
        }]);
        http.postJson(this.baseApi + "/api/progress/rule/isInSetting", param).then(data => {
        }).catch(error => { });
      } else if (thisIndex > -1) {
        row.operateType = 'text';//释放修改按钮
        let param = JSON.stringify([{
          progressRuleId: row.progressRuleId,
          isInSetting: '1',
          progressHistories: [
            {
              progressHistoryId: row.progressHistories[0].progressHistoryId
            }
          ]
        }]);
        http.postJson(this.baseApi + "/api/progress/rule/isInSetting", param).then(data => {
        }).catch(error => { });
      }
    },
    //还原
    reductionF() {
      this.$confirm('还原到最后的提交记录,您确定还原吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = JSON.stringify({
          "exhibitionNum": this.session
        });
        http.postJson(this.baseApi + "/api/progress/rule/revert", params).then(data => {
          this.$message({
            message: '恭喜你，还原成功！',
            type: 'success'
          });
          //初始化列表
          setTimeout(() => {
            this.getData();
          }, 1000);
        }).catch(error => { });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消还原'
        });
      });
    }
  }
};
</script>

