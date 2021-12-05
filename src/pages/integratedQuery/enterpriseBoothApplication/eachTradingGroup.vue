/**
* @file 各交易团各展区申请情况汇总
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="各交易团各展区申请情况汇总" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="交易团:" size="mini">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="一期"></el-option>
            <el-option label="二期" value="二期"></el-option>
            <el-option label="三期" value="三期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="家居用品" value="家居用品"></el-option>
            <el-option label="日用陶瓷" value="日用陶瓷"></el-option>
            <el-option label="卫浴设备" value="卫浴设备"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报结果:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.exhibitionSession"></el-input>
        </el-form-item>
        <el-form-item label="企业中文名称:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.exhibitionSession"></el-input>
        </el-form-item>
        <a class="advancedSearch" href="javascript:;">高级查询</a>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <hr>

        <el-form-item label="广交会编码:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.exhibitionSession"></el-input>
        </el-form-item>
        <el-form-item label="产品大类:" size="mini">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="一期"></el-option>
            <el-option label="二期" value="二期"></el-option>
            <el-option label="三期" value="三期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品专区:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="家居用品" value="家居用品"></el-option>
            <el-option label="日用陶瓷" value="日用陶瓷"></el-option>
            <el-option label="卫浴设备" value="卫浴设备"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主要产品:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.exhibitionSession"></el-input>
        </el-form-item>
        <el-form-item label="地区:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="东部" value="东部"></el-option>
            <el-option label="西部" value="西部"></el-option>
            <el-option label="沿海" value="沿海"></el-option>
          </el-select>
        </el-form-item>
        <!---->
        <el-form-item label="是否领导小组成员:" size="mini">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否中央通道展位:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新题材:" size="mini">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否统一布展:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否重点关注展区:" size="mini">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共12条统计结果</p>
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
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="广交会编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="产品大类"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="展品专区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="主要产品"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="是否领导小组成员"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="是否中央通道展位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="是否新题材"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="是否统一布展"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="是否重点关注展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="展区名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="展品专区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="企业编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="广交会编码"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="企业名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="上届展位数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="申请展位数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="上届展位面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="申请展位面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="是否有联营企业"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="联营企业1"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="联营企业2"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="会员证号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="企业类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="企业属性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="主要展示产品1"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="主要展示产品2"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话区号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="电话"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="手机"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="传真"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="Emial"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="联系人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="海关编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="进出口企业代码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="布展类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="海外商标国家数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="发明专利数"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="实用新型专利数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="外观设计专利数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="国际认证书"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="国家级奖励数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="列入（中国高科技出口产品目录）"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="上年度出口额"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="是否愿意接洽国内买家"
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
  name: "eachTradingGroup",
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
    ...mapActions("numberBooth", ["getApplyInfo", "getApplicationBooth"]), // 用户列表查询
    // ...mapActions("numberBooth", ["getApplicationBooth"]),
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
