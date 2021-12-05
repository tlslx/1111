<template>
  <el-page ref="collectRecords">
    <template slot="header">
      <kindo-box title="子系统退款订单管理" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="订单流水号" prop="flowNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.flowNo" class="inputclass" :clearable="true"></el-input>
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
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="flowNo" label="退款流水号" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="orderNum" label="原始订单号" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="orderDate" label="订单日期" align="center" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="orderAmount" label="订单金额" align="center" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="transType" label="交易类型" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.transTypes,row.transType)}" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="chargeCategory" label="收费类型" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.chargeCategorys,row.chargeCategory)}" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="exhibitCategory" label="展览类型" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitCategory,row.exhibitCategory)}" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="currency" label="币种" :formatter="kindo.ucpUtil.formatCurrency" align="center" width="80" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="transState" label="交易状态" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.transStates,row.transState)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sourceSys" label="订单来源" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="refundOrder(scope.row)">退款</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import request from "@/scripts/framework/http";
export default {
  data() {
    return {
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/order/transOrders/getRefundOrders",
        refundApplyUrl: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/onlineRefund"
      },
      forms: {
        flowNo: ""
      },
      formsRules: {
        flowNo: [
          { max: 30, message: "不能超过 30 个字符", trigger: "blur" }
        ]
      },
      source: {
        transTypes: kindo.ucpUtil.transTypes(),
        transStates: kindo.ucpUtil.transStates(),
        chargeCategorys: [{ value: "1", label: "预付款收款" }, { value: "2", label: "普通收款" }],
        exhibitCategory: []
      }
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
    this.source.exhibitCategory = await kindo.dictionary.get('exhibitType');
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
    refundOrder(row) {
      this
        .$confirm("您确定要申请退款吗？", "提示", { type: "warning" })
        .then(() => {
          this.$store.commit('pageLoading', true);
          request
            .postJson(this.api.refundApplyUrl, row)
            .then(data => {
              this.$store.commit('pageLoading', false);
              this.$message.success("申请退款操作成功，预计15个工作日到账，请耐心等待！");
            })
            .catch(error => {
              this.$store.commit('pageLoading', false);
              this.$message.error(error);
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.box_class {
  width: 400px !important;
}
.inputclass {
  width: 260px !important;
}
.el-form-item {
  margin-bottom: 20px;
}
</style>