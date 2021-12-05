/**
* @file 按展区查询展位申请情况
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="按展区查询展位申请情况" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="展期:" size="mini">
          <!-- 展期下拉框 -->
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="一期"></el-option>
            <el-option label="二期" value="二期"></el-option>
            <el-option label="三期" value="三期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区:" size="mini">
          <!-- 展区下拉框 -->
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="家居用品" value="家居用品"></el-option>
            <el-option label="日用陶瓷" value="日用陶瓷"></el-option>
            <el-option label="卫浴设备" value="卫浴设备"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">各展区企业申请情况统计</p>
        <p class="downLoadXls">下载</p>
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
            label="期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="展区名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="申请企业数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="审核通过的企业数量"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="申请展位数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="申请展位面积"
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
  name: "searchForBooth",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      isShow: false,
      expIds: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      currentPage: 1,
      total: 0,
      ruleForm: {
        specialArea: '', // 专区下拉框
        exhibitionNum: '', // 展区下拉框
        exhibitionArea: '', // 届数下拉框
        exhibitionSession: '' // 期数下拉框
      },
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
      }
    };
  },
  mounted() {
    this.getApplicationBooth(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });
  },
  methods: {
    ...mapActions("numberBooth", ["getApplyInfo"]), // 用户列表查询
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
