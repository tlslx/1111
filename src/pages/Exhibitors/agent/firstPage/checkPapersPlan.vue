<style lang="less" scoped>
@import '../../../../theme/project/css/flex.less';
</style>

<template>
  <div>
    <el-table :data="tableData">
      <el-table-column v-for="(item, index) in tableHead" :key="index"
        :prop="item.prop" :label="item.label" align="center"></el-table-column>
      <el-table-column prop="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="checkPapers(scope)" align="center">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" class="pagination-contain">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ruleForm.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      total: 0,
      ruleForm: {
        current: 1,
        size: 10,
        isAsc: false,
        orderByField: "create_date"
      },
      tableData: [],
      tableHead: [
        {
          prop: "exhibitionSessioin",
          label: "申请编辑单"
        },
        {
          prop: "exhibitionSessioin",
          label: "证件类型"
        },
        {
          prop: "exhibitionSessioin",
          label: "招展代理"
        },
        {
          prop: "exhibitionSessioin",
          label: "企业名称"
        },
        {
          prop: "exhibitionSessioin",
          label: "企业英文名称"
        },
        {
          prop: "exhibitionSessioin",
          label: "广交会编码"
        },
        {
          prop: "exhibitionSessioin",
          label: "届数"
        },
        {
          prop: "exhibitionSessioin",
          label: "期数"
        },
        {
          prop: "exhibitionSessioin",
          label: "开始日期"
        },
        {
          prop: "exhibitionSessioin",
          label: "结束日期"
        },
        {
          prop: "exhibitionSessioin",
          label: "人员"
        },
        {
          prop: "exhibitionSessioin",
          label: "证件照"
        },
        {
          prop: "exhibitionSessioin",
          label: "证件号码"
        },
        {
          prop: "exhibitionSessioin",
          label: "有效期"
        },
        {
          prop: "exhibitionSessioin",
          label: "扫描件"
        },
        {
          prop: "exhibitionSessioin",
          label: "领证地点"
        },
        {
          prop: "exhibitionSessioin",
          label: "初审状态"
        },
        {
          prop: "exhibitionSessioin",
          label: "复审状态"
        },
        {
          prop: "exhibitionSessioin",
          label: "制证状态"
        }
      ]
    };
  },
  methods: {
    ...mapActions("agent", ['getPapersPlan']),
    getPaperPlanList(param) {
      this.getPapersPlan(param).then(res => {
        if (res && res.records && res.records.length) {
          this.tableData = res.records;
          this.total = res.total;
        }
      });
    },
    checkPapers(param) {
      console.log(param);
      
    },
    handleSizeChange(val) {
      this.ruleForm.size = val;
      this.getPaperPlanList(this.ruleForm);
    },
    handleCurrentChange(val) {
      this.ruleForm.current = val;
      this.getPaperPlanList(this.ruleForm);
    }
  },
  async created() {
    this.getPaperPlanList(this.ruleForm);
  }
};
</script>
