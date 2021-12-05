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
        <div v-if="isAfter">
          <div v-for="(item,index) in numData" :key="index">
            <el-button type="text" @click="toRecord(item, index + 1)" class="top-btns" :class="item.clicked ? 'numSelectedStyle' : ''">修改记录{{ item.modifyIndex }}</el-button>
          </div>
        </div>
        <el-button type="text" @click="toStandard" class="top-btns" v-if="isAfter">基准进度表</el-button>
      </div>
      <!--
      <cust-table v-if="!isAfter" class="table-margin" :cols="cols" :data="custTableData" :loading="custloading" @deal-with-operate="dealWithCust"></cust-table>
      -->
      <edit-table v-if="isAfter" class="table-margin" :loading="loading" :rules="dateRules" :tableData="tableData" :tableTrData="tableTrData" @deal-with-operate="dealWithOperate" @deal-with-change-status-event="dealWithChangeStatusEvent" @start-picker-option="startPickerOptions" @end-picker-option="endPickerOptions" @deal-text-btn="dealTextBtn"></edit-table>
      <div class="bom-btn" v-if="!isAfter">
        <el-button type="primary" @click="toWatchBefore" class="bom-btn-del">查看与上届最新差异</el-button>
        <!-- <el-button type="danger" @click="toPublish" class="bom-btn-del">发布</el-button> -->
        <pagination class="page-bar" :pageInfo="pageInfoBefore" @handle-size-change="handleSizeBefore" @handle-current-change="handleCurrentBefore"></pagination>
      </div>
      <div class="bom-btn" v-if="isAfter">
        <el-button type="primary" @click="toWatch" class="bom-btn-del">查看与上届最新差异</el-button>
        <el-button type="danger" @click="toDiffer" class="bom-btn-del" :disabled="differDisabled">查看与基准进度表差异</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
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
    <el-tab-pane label="待发布计划" name="second">
       <div class="top-btn">
        <div class="top-session">
          第
          <el-select v-model="sessionw" placeholder="请选择届数" class="top-select" @change="sessionChangewait">
            <el-option v-for="item in sessionOption" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          届广交会出口展组展工作时间进度计划表
          <el-select v-model="publishStatus"  class="top-select" @change="allChange">
            <el-option v-for="item in isptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
       <!-- 待发布s -->
         <edit-table ref='currenttable' :loading="musloading" @select-row="sectionRow"  @change-all-selection="selectionChange" :tableData="tableDatas" :selection="true" :tableTrData="tableDatalist" class="table-margin"></edit-table>
        <div class="bom-btn">
         <el-button type="primary" @click="toPublish" class="bom-btn-del">发布</el-button>
         <pagination class="page-bar" :pageInfo="pageInfoWait" @handle-size-change="handleSizeChangewait" @handle-current-change="handleCurrentChangewait"></pagination>
      </div>
       <!--  e -->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from '@/components/project/common/custTable.vue';
import pagination from '@/components/project/common/pagination.vue';
import editTable from '@/components/project/supportNature/editTable.vue';
import editTables from '@/components/project/supportNature/editTables.vue';
import { getFTC, getJYT, getSXH, getWMS } from './dict_request';
import http from "@/scripts/framework/http";
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
      publishStatus: 0,
      isptions: [{
        value: 0,
        label: '全部'
      },
      {
        value: 1,
        label: '未发布'
      },
      {
        value: 2,
        label: '已发布'
      }],
      //字典
      dictMap: {},
      // tab标题
      tabTitle: '发布组展进度计划',
      // 判断发布前后变量 true：发布后
      isAfter: false,
      // 查看与基准进度表差异按钮禁用
      differDisabled: false,
      // tab
      activeName: 'second',
      // 可编辑表格loading
      loading: false,
      // 发布前表格loading
      custloading: false,
      musloading: false,
      // 届数
      session: '',
      currentTabIndex: -1,
      // 假的最新一届
      // newSession: [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
      newSession: [],
      // 届数数组
      sessionOption: [],
      // 表格选中数据
      multipleSelection: [],
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
          label: '完成判断'
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
       // 待发布前分页数据
      pageInfoWait: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
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
      // 待发布初始传参
      waitParams: {
        current: "1",
        size: "10",
        exhibitionNum: "",
        publishStatus: 0
      },
      // 修改弹窗
      dialogFormVisible: false,
      toBaseVisible: false,
      toWatchVisible: false,
      // 发布后表格数据
      tableData: [],
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
      },
       // 待发布表头数据
      tableDatalist: [
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
          prop: 'minus1EndTime',
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
          prop: "publishStatus",
          label: "是否发布",
          type: "string"
        },
        {
          prop: "progressValue",
          label: "完成进度(%)",
          type: "string"
          // textBtn: true,
          // show: true,
          // fixed: 'right',
          // oper: "修改",
          // textData: [
          //   {
          //     prop: "edit",
          //     label: "修改",
          //     type: "text",
          //     class: "primary"
          //   },
          //   {
          //     prop: "confirm",
          //     type: "icon",
          //     iconName: "el-icon-check",
          //     class: "confirm"
          //   },
          //   {
          //     prop: "cancel",
          //     type: "icon",
          //     iconName: "el-icon-close",
          //     class: "cancel"
          //   }
          // ]
        }
      ],
      tableDatas: [],
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['queryplan'])
  },
  async created() {

    this.session = await this.currentSessionInfo().then(reso => reso.exhibitionNum);
    this.sessionw = await this.currentSessionInfo().then(reso => reso.exhibitionNum);
    let exhibitions = await this.queryExhibitionNumInfo();

    // this.sessionOption = Array.from(new Set([].concat(this.session, exhibitions))).sort((a, b) => a - b);
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
    this.getWaitData();
  },
  methods: {
    ...mapActions('organizationProgress', ['currentSessionInfo', 'worksAndDaysInfo', 'queryExhibitionNumInfo', 'queryPlanInfo', 'queryPlanInfoLook', 'publishPlanInfo', 'modifyAfterPublishInfo', 'query4PlanInfosub']),
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
        this.tableData = res.records;
        let tranData = res.records;
        this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
        this.currentTabIndex = tranData[0].progressHistories.length - 1;   //当前tab所在的项
        // 发布后所需的修改次数数组
        let data = [];
        if (tranData[0].progressHistories) {
          tranData[0].progressHistories.map(el => {
            if (el.modifyIndex !== 0) {
              data.push({
                modifyIndex: el.modifyIndex
              });
            }
          });
        }
        this.numData = data;

        // 判断表格数据为发布前还是发布后
        if (tranData.length > 0) {
          tranData.forEach((value) => {
            if (value.progressHistories[0].modifyIndex === -1) {
              // 发布前表格以及tab标题
              this.isAfter = false;
              this.tabTitle = '发布组展进度计划';
            } else {
              // 发布后表格以及tab标题
              this.isAfter = true;
              this.tabTitle = '组展进度计划查看';
            }
          });
        }
        this.tableData = JSON.parse(JSON.stringify(tranData));
        // 结束loading
        this.loading = false;
        this.custloading = false;
        this.watchData = JSON.parse(JSON.stringify(tranData));
        // 发布后可编辑表格属性定义
      }).catch(e => {
        // 查询失败
        // 结束loading
        this.custloading = false;
        this.loading = false;
      });
    },
    // 初始化待发布列表
    getWaitData() {
      // 开始loading
      this.musloading = true;
      this.waitParams.exhibitionNum = this.sessionw;
      this.waitParams.publishStatus = this.publishStatus;
      // 已发布计划列表
      this.query4PlanInfosub(this.waitParams).then(res => {
        // 查询成功
        // 分页
        if (res.total > 0) {
          this.pageInfoWait.currentPage = res.current;
          this.pageInfoWait.total = res.total;
        } else if (res.total === 0) {
          this.pageInfoWait.currentPage = 1;
          this.pageInfoWait.total = 0;
        }
        this.tableDatas = res.records;
        this.getBasicDatalist(this.tableDatas, this.tableDatas[0].progressHistories.length - 1);
        this.musloading = false;
         //默认选中
        this.defaultChecked();
      }).catch(e => {
        // 查询失败
        // 结束loading
        this.musloading = false;
      });
    },
    tableColFormatter: (row, col) => {
      return !row.progressValue ? 0 : row.progressValue;
    },
    getBasicDatalist(data, newIndex) {
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
              } else {
                newprogressVal = 0;
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
          if (value.publishStatus === 2) {
            value.publishStatus = '是';
          } else {
            value.publishStatus = '否';
          }
        });
      }
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
              } else {
                newprogressVal = 0;
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
      kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/rule/export?exhibitionNum=${this.session}`, '组展进度计划发布.xls');
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
      this.$confirm('您确定发布吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        // 开始loading
        _this.musloading = true;
        let param = {
          exhibitionNum: this.sessionw
        };
        this.publishPlanInfo(param).then(res => {
          _this.$message({
            type: 'success',
            message: "恭喜你,发布成功!"
          });
          _this.musloading = false;
          _this.getWaitData();
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
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.queryParams.size = val;
      _this.queryParams.exhibitionNum = this.session;
      _this.queryPlanInfoLook(_this.queryParams).then(res => {
        let tranData = JSON.parse(JSON.stringify(res.records));
        this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
        this.tableData = JSON.parse(JSON.stringify(tranData));
        this.watchData = JSON.parse(JSON.stringify(tranData));
        // 发布后可编辑表格属性定义
        this.tableData.map((ele) => {
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
        //设置table的loading变量
        _this.loading = false;
      });
    },
    // 发布后
    handleCurrentChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.currentPage = val;
      _this.queryParams.current = val;
      _this.queryParams.exhibitionNum = this.session;
      _this.queryPlanInfoLook(_this.queryParams).then(res => {
        let tranData = JSON.parse(JSON.stringify(res.records));
        this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
        this.tableData = JSON.parse(JSON.stringify(tranData));
        this.watchData = JSON.parse(JSON.stringify(tranData));
        // 发布后可编辑表格属性定义
        this.tableData.map((ele) => {
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
        //设置table的loading变量
        _this.loading = false;
      });
    },
    // 发布前分页事件
    handleSizeBefore(val) {
      //设置table的loading变量
      let _this = this;
      _this.pageInfoBefore.pageSize = val;
      _this.BeforeParams.size = val;
      _this.getData();
      // _this.queryPlanInfoLook(_this.BeforeParams).then(res => {
      //   let tranData = JSON.parse(JSON.stringify(res.records));
      //   this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
      //   this.custTableData.data = JSON.parse(JSON.stringify(tranData));
      //   this.watchData = JSON.parse(JSON.stringify(tranData));
      //   //设置table的loading变量
      //   _this.custloading = false;
      // });
    },
    // 发布前分页事件
    handleCurrentBefore(val) {
      //设置table的loading变量
      let _this = this;
      _this.pageInfoBefore.currentPage = val;
      _this.BeforeParams.current = val;
      _this.getData();
      // _this.queryPlanInfoLook(_this.BeforeParams).then(res => {
      //   let tranData = JSON.parse(JSON.stringify(res.records));
      //   this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
      //   this.custTableData.data = JSON.parse(JSON.stringify(tranData));
      //   this.watchData = JSON.parse(JSON.stringify(tranData));
      //   //设置table的loading变量
      //   _this.custloading = false;
      // });
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
      // this.numData.map(el => {
      //   debugger;
      //   if (el.modifyIndex === item.modifyIndex) {
      //     item.clicked = true;
      //     return item;
      //   } else {
      //     item.clicked = false;
      //   }
      // });
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
     // 待发布届数
    sessionChangewait(val) {
      localStorage.setItem('sessionw', val);
      // 传参改变，刷新表格
      this.waitParams.exhibitionNum = val;
      this.sessionw = val;
      this.getWaitData();
    },
     //默认选中方法
    defaultChecked() {
      for (let index = 0; index < this.tableDatas.length; index++) {
        const element = this.tableDatas[index];
        if (element.isInTimeTable === 1) {
          this.multipleSelection.push(element);
          this.$refs.currenttable.selectionRow(index);
        }
      }
    },
    allChange(val) {
      this.waitParams.publishStatus = val,
      this.waitParams.current = '1';
      this.publishStatus = val;
      this.getWaitData();
    },
     // 发布后
    handleCurrentChangewait(val) {
      let _this = this;
      _this.pageInfoWait.currentPage = val;
      _this.waitParams.current = val;
      _this.getWaitData();
      _this.defaultChecked(); //复选框默认选中
    },
     // 待发布后分页事件
    handleSizeChangewait(val) {
      //设置table的loading变量
      let _this = this;
      _this.pageInfoWait.pageSize = val;
      _this.waitParams.size = val;
      // 待发布
      _this.getWaitData();
      _this.defaultChecked(); //复选框默认选中
    },
     //单个勾选
    sectionRow(selection, row) {
      let thisIndex = selection.indexOf(row);
      if (thisIndex === -1) {   //取消选中
        row.operateType = 'other';//关闭修改按钮
        let param = JSON.stringify([{
          progressRuleId: row.progressRuleId,
          isInTimeTable: '0'
        }]);
        http.postJson(this.baseApi + "/api/progress/rule/isInTimeTable", param).then(data => {
        }).catch(error => { });
      } else if (thisIndex > -1) {
        let param2 = JSON.stringify([{
          progressRuleId: row.progressRuleId,
          isInTimeTable: '1'
        }]);
        http.postJson(this.baseApi + "/api/progress/rule/isInTimeTable", param2).then(data => {
        }).catch(error => { });
      }
    },
    //复选框选中事件
    selectionChange(val) {
      //释放修改按钮
      this.multipleSelection = val;
      if (val.length > 0) {
        this.$nextTick(function () {
          //修改参数
          let par = [];
          for (let index = 0; index < this.multipleSelection.length; index++) {
            const element = this.multipleSelection[index];
            element.isInTimeTable = 1;
            element.operateType = 'text';//释放修改按钮
            par.push({
              progressRuleId: element.progressRuleId,
              isInTimeTable: element.isInTimeTable,
              progressHistories: [
                {
                  progressHistoryId: element.progressHistories[0].progressHistoryId
                }
              ]
            });
          }
          let params = JSON.stringify(par);
          http.postJson(this.baseApi + "/api/progress/rule/isInTimeTable", params).then(data => {
          }).catch(error => { });

          // // 全部取消选中
          // if (this.multipleSelection.length === 0) {
          //   let noPar = [];
          //   for (let index = 0; index < this.tableDatas.length; index++) {
          //     const element = this.tableDatas[index];
          //     element.isInTimeTable = 0;    //释放修改按钮
          //     element.operateType = 'other';   //关闭修改按钮
          //     noPar.push({
          //       progressRuleId: element.progressRuleId,
          //       isInTimeTable: element.isInTimeTable
          //     });
          //   }
          //   let params2 = JSON.stringify(noPar);
          //   http.postJson(this.baseApi + "/api/progress/rule/isInTimeTable", params2).then(data => {
          //   }).catch(error => { });
          // }
        });
      } else if (this.multipleSelection.length === 0) {
         // 全部取消选中
        let noPar = [];
        for (let index = 0; index < this.tableDatas.length; index++) {
          const element = this.tableDatas[index];
          element.isInTimeTable = 0;    //释放修改按钮
          element.operateType = 'other';   //关闭修改按钮
          noPar.push({
            progressRuleId: element.progressRuleId,
            isInTimeTable: element.isInTimeTable
          });
        }
        let params2 = JSON.stringify(noPar);
        http.postJson(this.baseApi + "/api/progress/rule/isInTimeTable", params2).then(data => {
        }).catch(error => { });
      }
    }
  }
};
</script>
