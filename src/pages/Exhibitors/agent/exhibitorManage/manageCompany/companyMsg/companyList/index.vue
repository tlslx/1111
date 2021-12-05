<style lang="less" scoped>
@import "../../../../../../../theme/project/css/flex.less";
#company-list {

}
</style>

<template>
  <div id="company-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="企业列表" name="index">
        <div class="bm bm-pj">
          <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
            <el-form-item label="企业名称:" size="mini" placeholder="请选择">
              <el-input v-model="ruleForm.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="国家/地区:" size="mini" placeholder="请选择">
              <el-select v-model="ruleForm.delegationAreaCode" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in deptArr" :key="item.label"
                :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </div>
        <!-- 表格 -->
        <div class="bm bm-pc bm-ver">
          <el-table
            :data="tableData">
            <el-table-column v-for="item in tableHead" :key="item.prop"
              :formatter="formatterRow"
              :label="item.label"
              :prop="item.prop"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="250">
              <template slot-scope="scope">
                <el-button @click="gotoEdit(scope.row.gjhId)" type="text" size="small">编辑</el-button>
                <el-button @click="deleThis(scope.row.gjhId)" type="text" size="small">删除</el-button>
                <!-- <el-button @click="completeMsg(scope.row.gjhId)" type="text" size="small">完善公司信息</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="bm bm-pj" style="margin-top: 10px">
            <el-button type="primary" size="small" @click="submitForm()">导出</el-button>
            <div class="block bm bm-ac" style="float:right; margin-top:10px;" >
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "index",
      deptArr: [
        {
          label: "1",
          value: "国内"
        },
        {
          label: "2",
          value: "国外"
        }
      ],
      ruleForm: {
        companyName: "",
        delegationAreaCode: ""
      },
      // 表头
      tableHead: [
        {
          label: "企业中文名称",
          prop: "companyCN"
        },
        {
          label: "企业英文名称",
          prop: "companyEN"
        },
        {
          label: "国家/地区",
          prop: "place"
        },
        {
          label: "广交会编码",
          prop: "gjhId"
        },
        {
          label: "注册时间",
          prop: "registerTime"
        },
        {
          label: "审核状态",
          prop: "checkState"
        }
      ],
      //企业表格数据
      tableData: [
        {
          companyCN: '软通动力',
          companyEN: "ifonsort",
          place: "NANJIN",
          gjhId: "123456",
          registerTime: "2019.13.5",
          checkState: "1"
        },
        {
          companyCN: '软通动力',
          companyEN: "ifonsort",
          place: "NANJIN",
          gjhId: "123456",
          registerTime: "2019.13.8",
          checkState: "0"
        },
        {
          companyCN: '软通动力',
          companyEN: "ifonsort",
          place: "NANJIN",
          gjhId: "123456",
          registerTime: "2019.13.6",
          checkState: "1"
        },
        {
          companyCN: '软通动力',
          companyEN: "ifonsort",
          place: "NANJIN",
          gjhId: "123456",
          registerTime: "2019.13.7",
          checkState: "0"
        }
      ],
      currentPage: 1, //当前页
      total: 0 //总页数
    };
  },
  methods: {
    formatterRow(row, column, cellValue, index) {
      // console.log("lie", row, column);
      let prop = column.property;
      if (prop === "checkState") {
        let value = row[prop];
        if (value === "1") {
          return "";
        } else {
          return "未审核";
        }
      } else {
        return row[prop];
      }
    },
    submitForm() {
      console.log(this.ruleForm);
    },
    gotoEdit(param) {
      // console.log("bianji", param);
      this.$router.push("/agent_company_completeMsg/" + param);
    },
    deleThis(param) {
      console.log("shanchu", param);
    },
    completeMsg(param) {
      console.log("wanshan", param);
    },
    // 分页 页面显示数据量切换
    handleSizeChange(param) {
      console.log("页面显示", param);
      
    },
    handleCurrentChange(param) {
      console.log("页面显示2", param);
    }
  }
};
</script>
