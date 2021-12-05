/**
* @file 各单位填报人信息
* @author:heli
* @date:2019/6/3
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="各单位填报人信息" name="first">
      <el-form :inline="true" :model="boothParams" class="demo-ruleForm">
        <el-form-item label="单位名称:" size="mini">
          <el-input v-model="boothParams.orgName" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="联系人:" size="mini">
          <el-input v-model="boothParams.reporterName" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="电话:" size="mini">
          <el-input v-model="boothParams.reporterPhone" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共查询到111条记录</p>
        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            prop="orgName"
            label="单位名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reporterName"
            label="联系人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reporterPhone"
            label="电话"
            align="center">
          </el-table-column>
        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="boothParams.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="boothParams.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"></el-pagination>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "applicantsInformation ",
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
      total: 0,
      delegationId: "",
      formLabelWidth: '230px',
      boothParams: {
        size: 10,
        current: 1,
        orgName: '',
        reporterName: '',
        reporterPhone: ''
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  methods: {
    ...mapActions("enterpriseBooth", ["brandApply"]), // 品牌申请情况汇总

    // 搜索框查询
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.current = 1;
      params.cecfCode = this.ruleForm.cecfCode;
      params.applyYear = this.ruleForm.applyYear;
      params.delegationId = this.delegationId;
      params.companyName = this.ruleForm.companyName;
      params.exhibitionSession = this.ruleForm.exhibitionSession;
      params.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

      this.brandApply(params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    downLoadList() { // 上传
      this.dialogVisible = true;
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.brandApply(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.brandApply(this.boothParams).then(res => {
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
    },
    /**
   * 拼接对象为请求字符串
   * @param {Object} obj - 待拼接的对象
   * @returns {string} - 拼接成的请求字符串
   */
    encodeSearchParams(obj) {
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    },
    // 下载模板
    downLoad() {
      let downLoadParams = {
        cecfCode: this.ruleForm.cecfCode,
        applyYear: this.ruleForm.applyYear,
        companyName: this.ruleForm.companyName,
        delegationId: this.delegationId,
        exhibitionSession: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: this.ruleForm.exhibitionAreaCode
      };

      kindo.util.getdown(`${process.env.API_NA_URL}/api/speciaAreaExternal/companyApply/download?${this.encodeSearchParams(downLoadParams)}`, '品牌申请情况汇总.xls');
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
.submit_back{
  margin-top: 20px;
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
.down_btn {
  float: right;
  cursor: pointer;
}
.tableTip .appliExhibition {
  float: left
}
.tableTip .downLoadXls {
  float: right;
  cursor: pointer;
}
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
  text-decoration: none
}
</style>
