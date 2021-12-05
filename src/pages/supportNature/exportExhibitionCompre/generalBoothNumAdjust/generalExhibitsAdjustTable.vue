/**
* @file 交易团一般性展位数调整表
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团一般性展位数调整表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择" @change="onSelected">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易团:" size="mini">
          <el-select v-model="deptName" placeholder="请选择">
            <el-option v-for="item in ruleForm.deptName" :label="item.deptName"
            :value="item.deptName" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调整类别:" size="mini">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="等量" value="0"></el-option>
            <el-option label="不等量" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共12条统计结果</p>
        <p class="downLoadXls" v-show="isShow">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="会期"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="调整类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="商协会"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="初始核定数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="等量调换"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="对方交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="不等量调换"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="对方交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="不等量期限"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="还原调整"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="退回及重安排"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="新增及挖潜"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="回收及重安排"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="展位类别调整"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="其它调整"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="一般性不含中央通道展位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="中央通道展位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="本届一般性展位数核定数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="品牌展位数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="本届最终展位核定数"
            align="center">
          </el-table-column>
        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "generalExhibitsAdjustTable",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      radio: '1',
      isShow: false,
      expIds: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      currentPage: 1,
      total: 0,
      deptName: "",
      ruleForm: {
        deptName: [], // 交易团
        specialArea: '', // 专区下拉框
        exhibitionNum: '', // 展区下拉框
        exhibitionArea: '', // 届数下拉框
        exhibitionSession: '', // 期数下拉框
        exhibitionAreaCode: [],
        exhibitionSessionArr: []
      },
      exhibitionAreaCode: '',
      formLabelWidth: '120px',
      formAward: {
        checkboxGroup: []
      },
      boothParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        "loginType": "0",
        "loginId": 'aaa',
        "orderByField": "apply.create_date"
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    this.getApplicationBooth(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });

    // 获取所有届数信息
    this.getListAll().then(res => {
      this.ruleForm.exhibitionSessionArr = res;
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      this.ruleForm.deptName = res.records;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("numberBooth", ["getApplicationBooth"]), // 用户列表查询

    // 搜索框查询
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.specialArea = this.ruleForm.specialArea;
      params.exhibitionNum = this.ruleForm.exhibitionNum;
      params.exhibitionArea = this.ruleForm.exhibitionArea;
      params.exhibitionSession = this.ruleForm.exhibitionSession;

      this.getApplicationBooth(params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    // 展区事件
    onSelected() {
      // 根据展届展期获取展区和专区的信息
      let params = {
        exhibitionNum: this.ruleForm.exhibitionSession
      };

      this.getAreas(params).then(res => {
        this.ruleForm.exhibitionAreaArr = res;

        if (this.ruleForm.exhibitionSession === '') {
          this.ruleForm.exhibitionAreaArr = [];
        }
      });
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.json.PageSize = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.json.PageIndex = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.ids.push(row.userId);
      if (row.userType === "0") {
        this.expIds.push(row.userId);
      } else if (row.userType === "1") {
        this.userIds.push(row.userId);
      }
      this.nowUserId = this.$store.getters.userInfo.userId;

    },
    // 跳转到用户新增页面
    locationAdd() {
      this.$router.push('/applicationBoothAdd');
    },
    // 修改
    handleEdit(row, index) {
      this.$router.push({
        path: '/applicationBoothEdit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style scoped>
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
}
.title{
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.btn-row{
  margin: 10px;
}
.dialog-footer{
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.check-item{
  margin: 10px;
}
.dialog-userList {
  padding-bottom: 10px;
  height: 32px;
}
.li_style {
  float: left;
  list-style: none;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 10px;
  margin-right: 5px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
}
.tableTip .appliExhibition {
  float: left
}
.tableTip .downLoadXls {
  float: right;
}
</style>
