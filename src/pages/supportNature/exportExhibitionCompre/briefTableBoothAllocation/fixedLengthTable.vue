/**
* @file 展位分配简表
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位分配简表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="特殊资源" size="mini">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio v-model="radio" :label="1">定长简表</el-radio>
            <el-radio v-model="radio" :label="2">变长简表</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="文件格式:" size="mini">
          <el-input v-model="ruleForm.name" placeholder="|" clearable></el-input>
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
            label="交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="商会"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="排序方式"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="联系电话"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="联系手机"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="传真区号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="传真"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="邮件地址"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="联系人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="企业编码"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="海关编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="展位号码"
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
  name: "fixedLengthTable",
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
      ruleForm: {
        name: '',
        resource: 1
      },
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

    // 获取当届展会展期信息
    this.getCurrent().then(res => {
      this.ruleForm.exhibitionNum = res.exhibitionNum;
    });

    // 根据展届展期获取展区和专区的信息
    let param = {
      exhibitionNum: this.ruleForm.exhibitionNum
    };

    this.getAreas(param).then(res => {
      this.ruleForm.exhibitionAreaCode = res;
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      this.ruleForm.deptName = res.records;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["getCurrent"]), // 获取当届展会展期信息
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
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
