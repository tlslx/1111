<template>
  <el-page ref="collectRecords">
    <template slot="header">
      <!-- 对话框 -->
      <el-dialog title="驳回说明" top="30px" :visible.sync="childVisible" width="50%">
         <kindo-box>
           <el-form class="form_class" :model="child" ref="child" label-position="right" label-width="80px" inline>
              <el-form-item label="驳回原因" prop="approveRemark">
                  <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.approveRemark" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item prop="id" hidden>
                  <el-input v-model="child.id" class="inputclass" type="hidden"></el-input>
              </el-form-item>
           </el-form>
         </kindo-box>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="diagsave"><i class="glyphicon glyphicon-floppy-disk"></i>确定</el-button>
            <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>取消</el-button>
          </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box title="日结单审核" icon="fa-search">
        <el-form :model="forms" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="收款员" prop="operatorAccount">
            <el-dropdown-list class="inputclass" placeholder="请选择" v-model="forms.operatorAccount" :url="api.getOperator" text-field="operatorName" value-field="id" :params="{OrderModelField: [{OrderByField: 'id',asc: true}]}" :allow-create="false" :filterable="true" :clearable="true"></el-dropdown-list>
          </el-form-item>
          <el-form-item label="日结单号" prop="handinFlowNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.handinFlowNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" prop="approveState">
             <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-form-item>
          <el-form-item label="缴款日期" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button type="info" @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange" :pageIndex="pageIndex">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="dailyFlowNo" label="日结单号" width="150" align="center" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column prop="userName" label="收款员" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="operatorGroup" label="组别" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="upperAdmin" label="收款管理员" align="center" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="collectAmount" label="收款金额" align="center" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="handinAmount" label="缴款金额" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" label="退款金额" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="pendHandinAmount" label="待缴款金额" align="center" width="80" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="dailyBalanceAmount" label="日结余额" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
             <el-table-column prop="createDate" label="日结日期" width="180" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" label="备注" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text"  @click="enSure(scope.row)">确认</el-button>
                <el-button type="text"  @click="refuse(scope.row)">驳回</el-button>
              </template>
            </el-table-column>
          </kindo-table>
          <div slot="control">
            <div class="button_class">
              <el-button icon="el-icon-plus" @click="onInsure">确认</el-button>
            </div>
            <div class="button_class">
              <el-button icon="el-icon-plus" @click="onRefuse">驳回</el-button>
            </div>
          </div>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import request from "@/scripts/framework/http";
export default {
  name: "remitRecords",
  mixins: [tableMixIn],
  data() {
    return {
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/daily/record/getListPage",
        getOperator: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/getAllList",
        updateStatus: kindo.config.api.unifiedCollectUrl + "/api/daily/record/updateStatus",
        ensureByIds: kindo.config.api.unifiedCollectUrl + "/api/daily/record/ensureByIds",
        refuseByIds: kindo.config.api.unifiedCollectUrl + "/api/daily/record/refuseByIds"
      },
      // 弹出框
      child: {
        id: "",
        approveRemark: ""
      },
      forms: {
        operatorAccount: "",
        handinFlowNo: "",
        approveState: "",
        createDate: ""
      },
      source: {
        approveStates: [{ value: "1", label: "已审核" }, { value: "2", label: "未审核" }, { value: "3", label: "已驳回" }]
      },
      childVisible: false,
      multipleSelection: [],
      pageIndex: false
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    this._child = Object.assign({}, this.child);
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$refs.table.loadData();
        }
      });
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    onClick(row) {
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    enSure(row) {
      kindo.util.confirm('确认要审核通过该条记录吗？', undefined, undefined, () => {
        this.$http.postJson(this.api.updateStatus, { id: row.id, approveState: 1 }).then((res) => {
          kindo.util.alert('审核成功', '提示', 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    refuse(row) {
      this.childVisible = true;
      // 初始化数据
      this.$nextTick(function () {
        this.child = Object.assign({}, this._child);
        this.$refs['child'].resetFields();
        this.child.id = row.id;
      });
    },
    commonRequest(url, warningMsg) {
      var i;
      if (this.multipleSelection.length) {
        let _this = this;
        for (i = 0; i < this.multipleSelection.length; i++) {
          this.multipleSelection[i].approveRemark = this.child.approveRemark;
        }
        _this
          .$confirm("您确定要批量" + warningMsg + "吗？", "提示", { type: "warning" })
          .then(() => {
            request
              .postJson(url, _this.multipleSelection)
              .then(data => {
                this.childVisible = false;
                _this.$message.success("批量" + warningMsg + "成功！");
                _this.onResetQuery();
              })
              .catch(error => {
                _this.$message.error("抱歉，批量" + warningMsg + "失败！");
              });
          });
      } else {
        this.$message({ message: "请至少选择一条记录" });
      }
    },
    onInsure() {
      this.commonRequest(this.api.ensureByIds, "审核");
    },
    onRefuse() {
      this.childVisible = true;
      this.$nextTick(function () {
        this.child = Object.assign({}, this._child);
        this.$refs['child'].resetFields();
        this.child.id = "";
      });
    },
    diagsave() {
      var dataId = this.child.id;
      var approveRemark = this.child.approveRemark;
      if (dataId !== "") {
        kindo.util.confirm('确认要驳回该条记录吗？', undefined, undefined, () => {
          this.$http.postJson(this.api.updateStatus, { id: dataId, approveState: 3, "approveRemark": approveRemark }).then((res) => {
            this.childVisible = false;
            kindo.util.alert('驳回成功', '提示', 'success');
            this.$refs['table'].reloadData();
          });
        });
      } else {
        this.commonRequest(this.api.refuseByIds, "驳回");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shortclass {
  width: 140px !important;
  margin-right: 5px;
}
.inputclass {
  width: 160px !important;
}
.button_class {
  display: inline-block;
  margin-left: 10px;
}
</style>