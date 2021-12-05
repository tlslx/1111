<style lang="less" scoped>
@import '../../../theme/project/css/flex.less';
</style>

<template>
  <div>
    <el-table ref="peopleTable" :data="tableData" >
      <el-table-column v-for="(item, index) in tableHead" :key="index" 
        :prop="item.prop" :label="item.label" align="center" :formatter="formatterRow">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="getPapersDetail(scope.row.applyId)">操作详情</el-button>
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

    <!-- 人员详情 -->
    <el-dialog
      title="人员详情"
      :visible.sync="showFlag"
      width="80%"
      :show-close="false">
      <el-row :gutter="10">
        <el-col :span="12"><div>证件类型:<span>{{ detailObj.badgeTypeName ? detailObj.badgeTypeName : "" }}</span></div></el-col>
        <el-col :span="12"><div>开始日期:{{ detailObj.effectStartDate ? detailObj.effectStartDate : "" }}<span></span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>届数:<span>{{ detailObj.exhibitionSessioin ? detailObj.exhibitionSessioin : "" }}</span></div></el-col>
        <el-col :span="12"><div>结束日期:<span>{{ detailObj.effectEndDate ? detailObj.effectEndDate : "" }}</span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>期数:<span>{{ detailObj.exhibitionPeriod ? detailObj.exhibitionPeriod : "" }}</span></div></el-col>
      </el-row>
      <hr style="padding: 0 20px;color:#e6e6fa" />
      <el-row :gutter="10">
        <el-col :span="12"><div>人员:<span>{{ detailObj.applyUserName ? detailObj.applyUserName : "" }}</span></div></el-col>
        <el-col :span="12"><div>身份证件号码:<span>{{ detailObj.badgeNo ? detailObj.badgeNo : "" }}</span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>招展代理:<span></span></div></el-col>
        <el-col :span="12"><div>身份证明文件:<span>{{ detailObj.badgeTypeName ? detailObj.badgeTypeName : "" }}</span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>企业名称:<span>{{ detailObj.badgeTypeName ? detailObj.badgeTypeName : "" }}</span></div></el-col>
        <el-col :span="12"><div>有效期开始时间:<span></span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>企业英文名称:<span>{{ detailObj.badgeTypeName ? detailObj.badgeTypeName : "" }}</span></div></el-col>
        <el-col :span="12"><div>有效期结束时间:<span></span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>广交会编码:<span>{{ detailObj.badgeTypeName ? detailObj.badgeTypeName : "" }}</span></div></el-col>
        <el-col :span="12"><div>证件号码:<span></span></div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>证件照:</div></el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :span="12"><div>扫描件:</div></el-col>

      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    searchObj: {
      type: Object,
      default: function() {
        return {};
      },
      required: false
    }
  },
  data() {
    return {
      showFlag: false,
      API_POT_URL: process.env.API_POT_URL,
      detailObj: {},
      ruleForm: {
        current: 1,
        size: 10,
        orderByField: "create_date",
        isAsc: false
      },
      total: 0,
      tableData: [],
      tableHead: [
        {
          prop: "exhibitionSessioin",
          label: "届数"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "applyUserName",
          label: "姓名"
        },
        {
          prop: "sex",
          label: "性别"
        },
        {
          prop: "idcardFrontPhotoUrl",
          label: "个人证件照"
        },
        {
          prop: "initialStatusDesc",
          label: "初审状态"
        },
        {
          prop: "reviewStatusDesc",
          label: "复审状态"
        },
        {
          prop: "bagdeMakeStatusDesc",
          label: "制证状态"
        },
        {
          prop: "badgeNo",
          label: "证件号码"
        },
        {
          prop: "invalidDesc",
          label: "不通过原因"
        }
      ]
    };
  },
  watch: {
    searchObj: {
      handler: function() {
        this.getTableData(this.ruleForm);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("certificateManage", ["badgeApplyPlan", "getPeoplePapersDetail"]),
    formatterRow(row, column, cellValue, index) {
      let prop = column.property;
      let value = row[prop];
      // console.log(value);
      
      if (prop === "sex") {
        if (value === "1") {
          return "男";
        } else if (value === "0") {
          return "女";
        }
      } else if (prop === "idcardFrontPhotoUrl") {
        if (value) {
          return (
            <img src={this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + value}/>
          );  
        } else {
          return "";
        }
      } else {
        return row[prop];
      }
    },
    //查看详情
    getPapersDetail(param) {
      // this.showFlag = true;
      // this.detailObj = param;
      // console.log(param);
      this.getPeoplePapersDetail(param).then(res => {
        console.log(res);
        
      });
    },
    //获取表格Data
    getTableData(param) {
      this.badgeApplyPlan(param).then(res => {
        // console.log(res);
        if (res && res.records && res.records.length > 0) {
          this.tableData = res.records;
          this.total = res.total;
        }
      });
    },
    handleSizeChange(val) {
      this.ruleForm.size = val;
      this.getTableData(this.ruleForm);
    },
    handleCurrentChange(val) {
      this.ruleForm.current = val;
      this.getTableData(this.ruleForm);
    }
  },
  created() {
    this.getTableData(this.ruleForm);
  }
};
</script>
