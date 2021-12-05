/**
 * @file 组展进度计划查看---组展进度计划查看
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
  height: auto;
  overflow-y: scroll;
}
.el-dialog__wrapper .el-dialog {
  height: auto;
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
        </div> -->
        <!-- <el-button type="text" @click="toStandard" class="top-btns" v-if="isAfter">基准进度表</el-button> -->
      </div>
      <cust-table v-if="!isAfter" class="table-margin" :cols="cols" :data="custTableData.data" :loading="custloading" @deal-with-operate="dealWithCust"></cust-table>
      <edit-table v-if="isAfter" class="table-margin" :loading="loading" :rules="dateRules" :tableData="tableData" :tableTrData="tableTrData" @deal-with-operate="dealWithOperate" @deal-with-change-status-event="dealWithChangeStatusEvent" @start-picker-option="startPickerOptions" @end-picker-option="endPickerOptions" @deal-text-btn="dealTextBtn"></edit-table>
      <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      <!-- <div class="bom-btn" v-if="!isAfter">
        <el-button type="primary" @click="toWatchBefore" class="bom-btn-del">查看与上届最新差异</el-button>
        <pagination class="page-bar" :pageInfo="pageInfoBefore" @handle-size-change="handleSizeBefore" @handle-current-change="handleCurrentBefore"></pagination>
      </div> -->
      <!-- <div class="bom-btn" v-if="isAfter">
        <el-button type="primary" @click="toWatch" class="bom-btn-del">查看与上届最新差异</el-button>
        <el-button type="danger" @click="toDiffer" class="bom-btn-del" :disabled="differDisabled">查看与基准进度表差异</el-button>
        <el-button type="primary" @click="lookOrganizeSubmit" class="bom-btn-del" :disabled="differDisabled">发布</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div> -->
      <!-- <el-dialog title="修改组展单位标签进度" :visible.sync="dialogFormVisible">
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
      </el-dialog> -->
      <!-- 查看当前行数据 -->
      <el-dialog title="查看详细" :visible.sync="lookCurrentDataDialog" width="70%">
        <el-table :data="lookDetailData" style="width: 100%">
          <el-table-column property="name" align="center" label="组展单位"></el-table-column>
          <el-table-column property="text" align="center" label="名称"></el-table-column>
          <el-table-column property="progressValue" align="center" label="完成进度" :formatter="tableColFormatter"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="lookCurrentDataDialog = false">取 消</el-button>
          <el-button type="primary" @click="lookCurrentDataDialog = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from '@/components/project/common/custTable.vue';
import pagination from '@/components/project/common/pagination.vue';
import editTable from '@/components/project/supportNature/editTable.vue';
import editTables from '@/components/project/supportNature/editTables.vue';
import { getFTC, getJYT, getSXH, getWMS } from './dict_request';
// import { $helper } from '@/scripts/project/utils';
// vuex
import { mapGetters, mapActions } from "vuex";
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
      dictMap: {},
      // tab标题
      tabTitle: '组展进度情况查阅',
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
      currentTabIndex: -1,
      // 假的最新一届
      // newSession: [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
      newSession: [],
      // 届数数组
      sessionOption: [],
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
      lookCurrentDataDialog: false, //查看当前行的数据
      lookDetailData: [],           //查看当前行的数据
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
          prop: 'progressValue',
          label: '完成进度(单位%)'
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
              label: '查看',
              style: 'cursor: pointer;text-decoration: underline;color: #409EFF;'
            }
          ]
        }
      ],
      // 发布前表格数据
      custTableData: {
        data: []
      },
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
          prop: "progressValue",
          label: "完成进度(单位%)",
          type: "btn",
          textBtn: true,
          show: true,
          fixed: 'right',
          oper: "修改",
          textData: [
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
        },
        // {
        //   prop: "progressValue",
        //   label: "完成进度",
        //   type: "btn",
        //   textBtn: true,
        //   show: true,
        //   fixed: 'right',
        //   oper: "修改"
        // },
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
              label: "查看",
              type: "text",
              class: "primary"
            },
            // {
            //   prop: "send",
            //   label: "发送提醒",
            //   type: "text",
            //   class: "warning"
            // },
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
      // 发布后表格数据
      tableData: [],
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
      },
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['queryplan'])
  },
  async created() {

    this.session = await this.currentSessionInfo().then(reso => reso.exhibitionNum);


    let exhibitions = await this.queryExhibitionNumInfo();

    // let newArr = Array.from(new Set([].concat(this.session, exhibitions))).sort((a, b) => a - b);
    exhibitions.forEach(item => {
      this.sessionOption.push(item.exhibitionNum);
    });
    const ftc = await getFTC();

    const wms = await getWMS();

    const jyt = await getJYT();

    const sxh = await getSXH();

    this.dictMap = {
      "外贸中心": ftc,
      "外贸司": wms,
      "交易团": jyt,
      "商协会": sxh
    };

    this.getData();
  },
  methods: {
    ...mapActions('organizationProgress', ['currentSessionInfo', 'worksAndDaysInfo', 'queryExhibitionNumInfo', 'queryPlanInfo', 'queryPlanInfoLook', 'publishPlanInfo', 'modifyAfterPublishInfo']),
    // 初始列表
    getData() {
      // 开始loading
      this.custloading = true;
      this.loading = true;
      this.BeforeParams.exhibitionNum = this.session;
      this.queryPlanInfoLook(this.BeforeParams).then(res => {
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
        this.custTableData.data = res.records;
        this.tableData = res.records;
        this.getBasicData(this.custTableData.data, this.custTableData.data[0].progressHistories.length - 1);
        this.currentTabIndex = this.custTableData.data[0].progressHistories.length - 1;   //当前tab所在的项
        // 发布后所需的修改次数数组
        let data = [];
        if (this.custTableData.data[0].progressHistories) {
          this.custTableData.data[0].progressHistories.map(el => {
            if (el.modifyIndex !== 0) {
              data.push({
                modifyIndex: el.modifyIndex
              });
            }
          });
        }
        this.numData = data;

        // 判断表格数据为发布前还是发布后
        if (this.custTableData.data.length > 0) {
          this.custTableData.data.forEach((value) => {
            if (value.progressHistories[0].modifyIndex === -1) {
              // 发布前表格以及tab标题
              this.isAfter = false;
              this.tabTitle = '组展进度情况查阅';
            } else {
              // 发布后表格以及tab标题
              this.isAfter = true;
              this.tabTitle = '组展进度情况查阅';
            }
          });
        }
        // this.custTableData.data = JSON.parse(JSON.stringify(this.custTableData.data));
        // this.tableData = JSON.parse(JSON.stringify(this.custTableData.data));
        // 结束loading
        this.loading = false;
        this.custloading = false;
        // this.baseData = JSON.parse(JSON.stringify(res.records));
        // 发布后可编辑表格属性定义
        this.tableData.forEach(ele => {
          ele.operateType = 'text';
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
      }).catch(e => {
        // 查询失败
        // 结束loading
        this.custloading = false;
        this.loading = false;
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
            if (value.progressHistories[newIndex].progressValue != null) {
              newprogressVal = value.progressHistories[newIndex].progressValue;
            } else {
              newprogressVal = 0;
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
      kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/see/ftc/export?exhibitionNum=${this.session}`, '查看组展进度计划(外贸中心).xls');
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
    // 发布
    toPublish() {
      let _this = this;
      // 开始loading
      _this.custloading = true;
      let param = {
        exhibitionNum: this.session
      };
      this.publishPlanInfo(param).then(res => {
        _this.$message({
          type: 'success',
          message: '发布成功'
        });
        _this.custloading = false;
        _this.getData();
      });
    },
    // 发布后分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.queryParams.size = val;
      _this.queryParams.exhibitionNum = this.session;
      _this.custloading = true;
      _this.BeforeParams.size = val;
      _this.BeforeParams.exhibitionNum = this.session;
      _this.getData();
    },
    // 发布后
    handleCurrentChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.currentPage = val;
      _this.queryParams.current = val;
      _this.queryParams.exhibitionNum = this.session;
      _this.custloading = true;
      _this.BeforeParams.current = val;
      _this.BeforeParams.exhibitionNum = this.session;
      _this.getData();
    },
    // 发布前分页事件
    // handleSizeBefore(val) {
    //   //设置table的loading变量
    //   let _this = this;
    //   _this.custloading = true;
    //   _this.pageInfoBefore.pageSize = val;
    //   _this.BeforeParams.size = val;
    //   _this.BeforeParams.exhibitionNum = this.session;
    //   _this.getData();
    // },
    // 发布前分页事件
    // handleCurrentBefore(val) {
    //   //设置table的loading变量
    //   let _this = this;
    //   _this.custloading = true;
    //   _this.pageInfoBefore.currentPage = val;
    //   _this.BeforeParams.current = val;
    //   _this.BeforeParams.exhibitionNum = this.session;
    //   _this.getData();
    // },
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

    //查看事件
    dealWithChangeStatusEvent(scope, operateItem) {
      this.lookDetailData = [];
      const pStas = scope.row.progressHistories[0].progressStas;
      pStas.forEach(item => {
        for (let key in this.dictMap) {
          if (this.dictMap[key].hasOwnProperty(item.orgId)) {
            this.lookDetailData.push({
              name: key,
              text: this.dictMap[key][item.orgId],
              progressValue: (item.progressValue == null ? "0" : item.progressValue) + "%"
            });
          }
        }
      });
      this.lookCurrentDataDialog = true;
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
      let param = {};
      if (this.orgTableData.data.length < 1) {
        param = {
          "exhibitionNum": this.session,
          "progressHistories": [
            {
              "endTime": editendTime,
              "progressHistoryId": scope.row.progressHistories[scope.row.curIndex].progressHistoryId,
              "startTime": editstartTime,
              "progressStas": scope.row.progressHistories[scope.row.curIndex].progressStas
            }
          ]
        };
      } else {
        param = {
          "exhibitionNum": this.session,
          "progressHistories": [
            {
              "endTime": editendTime,
              "progressHistoryId": scope.row.progressHistories[scope.row.curIndex].progressHistoryId,
              "startTime": editstartTime,
              "progressStas": this.orgTableData.data
            }
          ]
        };
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
    sendData(scope) {

    },
    // 点击修改tab事件
    toRecord(item, index) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.differDisabled = false;
        this.getBasicData(this.tableData, index);
        this.currentTabIndex = index;   //当前tab所在的项
      }, 1000);
    },
    // 点击基准进度表按钮事件
    toStandard() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getBasicData(this.tableData, 0);
        this.differDisabled = true;
        this.currentTabIndex = 0;   //当前tab所在的项
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
    dealTextBtn(scope, textItem) {
      if (textItem.prop === "edit") {
        //
        scope.row.textType = 'icon';
        // 获取字典
        let dicData = JSON.parse(localStorage.getItem('dictData'));
        // 企业数组赋值
        let list = dicData.companyData;
        // 交易团数组赋值
        let delegationOption = dicData.delegation;
        // 商协会数组赋值
        let coceralOption = dicData.coceral;
        let index = scope.row.progressHistories.length - 1;
        this.orgData = JSON.parse(JSON.stringify(scope.row.progressHistories[index].progressStas));
        let listTemp = {};
        let coceralTemp = {};
        let delegationTemp = {};
        list.map(el => {
          listTemp[el.value] = {
            text: el.text,
            name: '企业'
          };
        });
        delegationOption.map(elec => {
          delegationTemp[elec.value] = {
            text: elec.text,
            name: '交易团'
          };
        });
        coceralOption.map(ele => {
          coceralTemp[ele.value] = {
            text: ele.text,
            name: '商协会'
          };
        });
        let temp = {};
        temp = Object.assign(Object.assign(listTemp, delegationTemp), coceralTemp);
        this.orgData.map(dataval => {
          for (let itemTemp in temp) {
            if (dataval.orgId === itemTemp) {
              Object.assign(dataval, temp[itemTemp]);
            }
          }
          if (dataval.orgId === 'TC1') {
            dataval.name = '外贸中心';
          }
          if (dataval.orgId === 'TD1') {
            dataval.name = '外贸司';
          }
        });
        this.orgTableData.data = JSON.parse(JSON.stringify(this.orgData));
        this.dialogFormVisible = true;
      } else if (textItem.prop === "cancel") {
        scope.row.textType = 'text';
      } else {
        this.confirmValue(scope);
        scope.row.textType = 'text';
      }
    },
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
    // 修改
    // 发布前操作方法
    dealWithCust(scope, prop) {
      //编辑点击事件
      if (prop === 'edit') {
        // 跳转编辑页面并带值
        this.$router.push({
          path: '/revisionExhibition',
          query: {
            row: scope.row
          }
        });
      }
      //查看点击事件
      if (prop === 'watch') {
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
    tableColFormatter: (row, col) => {
      return !row.progressValue ? 0 : row.progressValue;
    },
    //发布
    lookOrganizeSubmit() {
      this.$message({
        message: '恭喜你，发布成功！',
        type: 'success'
      });
    }
  }
};
</script>
