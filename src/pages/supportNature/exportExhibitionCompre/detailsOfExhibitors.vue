/**
* @file 参展企业信息详情
* @author:heli
* @date:2019/4/17
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="参展企业信息详情" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="ruleForm.periodCode" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="一期"></el-option>
            <el-option label="二期" value="二期"></el-option>
            <el-option label="三期" value="三期"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份:" size="mini">
          <!-- 年份下拉框 -->
          <el-select v-model="exhibitionAreaCode" placeholder="请选择">
            <el-option v-for="item in ruleForm.exhibitionAreaCode" :label="item.exhibitionAreaCode"
            :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <hr class="lines">

        <el-form-item label="交易团:" size="mini">
          <!-- 交易团下拉框 -->
          <el-select v-model="ruleForm.periodCode" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="一期"></el-option>
            <el-option label="二期" value="二期"></el-option>
            <el-option label="三期" value="三期"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="展区:" size="mini">
          <!-- 展区下拉框 -->
          <el-select v-model="exhibitionAreaCode" placeholder="请选择">
            <el-option v-for="item in ruleForm.exhibitionAreaCode" :label="item.exhibitionAreaCode"
            :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
          </el-select>
        </el-form-item>

        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="申请减少"></el-radio>
        </el-radio-group><br>

        <el-form-item label="广交会编码:" size="mini">
          <!-- 广交会编码下拉框 -->
          <el-select v-model="ruleForm.periodCode" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="一期"></el-option>
            <el-option label="二期" value="二期"></el-option>
            <el-option label="三期" value="三期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="mini">
          <!-- 企业名称下拉框 -->
          <el-select v-model="exhibitionAreaCode" placeholder="请选择">
            <el-option v-for="item in ruleForm.exhibitionAreaCode" :label="item.exhibitionAreaCode"
            :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <p class="downLoadXls">提示：展位分配信息</p>
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
            label="展区名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="展位列表"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="类型"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="数量"
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
  name: "detailsOfExhibitors",
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
        resource: '',
        periodCode: '', // 展期下拉框
        exhibitionNum: '', // 展届下拉框
        exhibitionAreaCode: [] // 展区下拉框
      },
      exhibitionAreaCode: "",
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
  },
  methods: {
    ...mapActions("numberBooth", ["getApplicationBooth"]), // 用户列表查询
    ...mapActions("enterpriseBooth", ["getCurrent"]), // 获取当届展会展期信息
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
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
.lines{
  margin-bottom: 20px
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
</style>
