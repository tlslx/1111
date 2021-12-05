/**
 * @file 组展进度设置---调整组展进度计划
 */
 <template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="调整组展进度计划" name="first">
      <div class="top-btn">
          <div class="top-session">
            第
            <el-select v-model="session" placeholder="请选择届数" class="top-select" @change="sessionChange">
              <el-option
                v-for="item in sessionOption"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            届广交会出口展组展工作时间进度计划表
          </div>
        <el-button type="text" @click="toDownload" class="top-btns">下载</el-button>
        <el-button type="text" @click="toPrint" class="top-btns">打印</el-button>
        <div v-for="(item,index) in numData" :key="index">
          <el-button type="text" @click="toRecord(index + 1)" class="top-btns">修改记录{{ item }}</el-button>
        </div>
        <el-button type="text" @click="toStandard" class="top-btns">基准进度表</el-button>
      </div>
      <edit-table
        class="table-style"
        :loading="loading"
        :tableData="tableData"
        :tableTrData="tableTrData"
        @deal-with-operate="dealWithOperate"
        @picker-option="startPickerOptions"
        @deal-with-change-status-event="dealWithChangeStatusEvent"
      ></edit-table>
      <div class="bom-btn">
        <el-button type="primary" @click="toWatch" class="bom-btn-del">查看与上届最新差异</el-button>
        <el-button type="danger" @click="toPublish" class="bom-btn-del" :disabled="differDisabled">查看与基准进度表差异</el-button>
        <pagination
          class="page-bar"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import editTable from '@/components/project/supportNature/editTable.vue';
import pagination from '@/components/project/common/pagination.vue';
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'edit-table': editTable
  },
  data () {
    return {
      // tab
      activeName: 'first',
      // loading
      loading: false,
      differDisabled: false,
      // 届数
      session: '',
      newSession: [7],
      // 届数数组
      sessionOption: [],
      numData: [],
      // 表头数据
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
          width: "100px",
          type: "string"
        },
        {
          prop: "startTime",
          label: "计划开始时间",
          width: "200px",
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
        // {
        //   prop: "y",
        //   label: "121届计划完成时间（同比去年）",
        //   width: "240px",
        //   type: "string"
        // },
        // {
        //   prop: "z",
        //   label: "工作日",
        //   type: "string"
        // },
        // {
        //   prop: "yy",
        //   label: "122届计划完成时间（环比上届）",
        //   width: "240px",
        //   type: "string"
        // },
        // {
        //   prop: "r",
        //   label: "工作日",
        //   type: "string"
        // },
        {
          prop: "finishJudgement",
          label: "完成判断",
          type: "string"
        },
        {
          prop: "progressValue",
          label: "完成进度",
          type: "number",
          maxlength: "3"
        },
        {
          type: "btn",
          label: "特例详情",
          fixed: "right",
          show: true,
          unChangeStatus: true,
          operator: {
            type: "text",
            textArray: [
              {
                prop: "detail",
                label: "查看",
                style: "cursor: pointer;text-decoration: underline;color: #409EFF;"
              }
            ]
          }
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
              prop: "send",
              label: "发送提醒",
              type: "text",
              class: "warning"
            },
            {
              prop: "confirm",
              type: "icon",
              iconName: "el-icon-check",
              class: "confirm"
            }
          ]
        }
      ],
      // 分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      // 初始传参
      queryParams: {
        current: "1",
        size: "10",
        exhibitionNum: "1"
      },
      // 表格数据
      tableData: []
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['queryplan']),
    startPickerOptions(scope, prop) {
      // let _this = this;
      return {
        disabledDate: (value) => {
          // if (_this.dateForm.endTime) {
          //   if (value.getTime() > new Date(_this.dateForm.endTime).getTime()) {
          //     return true;
          //   }
          // }
          // return false;
        }
      };
    }
  },
  created() {
    // 获取届数
    // 获取届数
    this.queryExhibitionNumInfo().then(res => {
      if (res.length > 0) {
        let newArr = JSON.parse(JSON.stringify(res));
        this.sessionOption = [...new Set(newArr.concat(this.newSession))];
        this.session = this.sessionOption[0];
      } else {
        this.sessionOption = this.newSession;
        this.session = 1;
      }
    });
    // 初始列表
    this.getData();
  },
  watch: {
    // 监听表格数据
    queryplan(newVal) {
      this.tableData = JSON.parse(JSON.stringify(newVal));
      this.tableData.map((ele) => {
        ele.operateType = 'text';
        ele.isEdit = false;
        ele.operating = true;
        if (ele.finishJudgement === '系统判断') {
          ele.inputDisabled = true;
        } else {
          ele.inputDisabled = false;
        }
      });
    }
  },
  methods: {
    ...mapActions('organizationProgress', ['queryExhibitionNumInfo', 'queryPlanInfo', 'modifyAfterPublishInfo']),
    // 初始列表
    getData() {
      let _this = this;
      // 开始loading
      _this.loading = true;
      this.queryPlanInfo(_this.queryParams).then(res => {
        // 查询成功
        // 结束loading
        _this.loading = false;
        // 分页
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        let data = [];
        if (res.records[0].progressHistories) {
          res.records[0].progressHistories.map(el => {
            if (el.modifyIndex !== 0) {
              data.push(el.modifyIndex);
            }
          });
        }
        this.numData = data;
      }).catch(e => {
        // 查询失败
        // 结束loading
        _this.loading = false;
      });
    },
    // 届数改变
    sessionChange(val) {
      // 传参改变，刷新表格 // this.queryParams
      this.queryParams.exhibitionNum = val;
      this.session = val;
      this.getData();
    },
    // 时间转换
    dateFmt(val) {
      let date = new Date(val);
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      return Y + '/' + M + '/' + D;
    },
    // 打印
    toPrint () {},
    // 下载
    toDownload () {},
    // 查看与上届最新差异
    toWatch () {},
    // 查看与基准进度表差异
    toPublish () {},
    dealWithOperate(scope, prop) {
      // if (prop === "detail") {
      // }
    },
    // 处理操作按钮事件
    dealWithChangeStatusEvent(scope, operateItem) {
      if (operateItem.prop === "edit") {
        scope.row.isEdit = true;
        scope.row.operateType = 'icon';
      } else if (operateItem.prop === 'confirm') {
        this.editData(scope);
        scope.row.isEdit = false;
        scope.row.operateType = 'text';
      } else {
        this.sendData(scope);
      }
    },
    // 修改数据
    editData(scope) {
      let param = {
        "exhibitionNum": this.session,
        "progressHistories": [
          {
            "endTime": this.dateFmt(scope.row.endTime),
            "progressHistoryId": scope.row.progressHistories[0].progressHistoryId,
            "progressValue": scope.row.progressValue / 100,
            "startTime": this.dateFmt(scope.row.startTime)
          }
        ]
      };
      this.modifyAfterPublishInfo(param).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.getData();
      });
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.queryParams.size = val;
      _this.queryPlanInfo(_this.queryParams).then(res => {
        //设置table的loading变量
        _this.loading = false;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.currentPage = val;
      _this.queryParams.current = val;
      _this.queryPlanInfo(_this.queryParams).then(res => {
        //设置table的loading变量
        _this.loading = false;
      });
    },
    // 发送提醒
    sendData(scope) {},
    toRecord(index) {},
    toStandard() {
      this.differDisabled = true;
    }
  }
};
</script>
<style scoped>
.table-style {
  margin: 10px 0;
}
.top-select {
  width:200px;
  margin: 0 5px;
}
.top-btns {
  float: right;
  text-decoration: underline;
  color: #409EFF;
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
</style>
