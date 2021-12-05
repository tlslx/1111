/**
* @file 申请不合格原因查询
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="申请不合格原因查询" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="交易团:" size="mini">
          <!-- 交易团下拉框 -->
          <el-select v-model="boothParams.delegationId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.deptArr" :label="item.deptName"
            :value="item.deptId" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码:" size="mini">
          <el-input v-model="boothParams.cecfCode" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核状态:" size="mini">
          <!-- 审核状态下拉框 -->
          <el-select v-model="boothParams.status" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共查询到<span>{{total}}</span>条记录</p>
        <p class="downLoadXls" v-show="isShow" @click="downLoad">下载</p>
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
            prop="delegationName"
            label="交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cecfCode"
            label="广交会编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="企业中文名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">未审核</span>
              <span v-else-if="scope.row.status==1">审核通过</span>
              <span v-else-if="scope.row.status==2">审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="reason"
            label="原因"
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
  name: "unqualifiedApplica",
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
      total: 0,
      ruleForm: {
        deptArr: [], // 交易团
        exhibitionNum: '', // 展区下拉框
        exhibitionArea: '' // 届数下拉框
      },
      formLabelWidth: '120px',
      boothParams: {
        size: 10,
        current: 1,
        status: '',
        cecfCode: '',
        delegationId: ""
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    // 展位申请不合格原因查询
    this.exhibitionApplyNo(this.boothParams).then(res => {
      this.total = res.total;

      for (let i = 0; i < res.records.length; i++) {
        this.tableData.push(res.records[i] || '');
      }
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      res.records.forEach(item => {
        this.ruleForm.deptArr.push(item);
      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["exhibitionApplyNo"]), // 展位申请不合格原因查询
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团

    // 搜索框查询
    submitForm() {
     // 展位申请不合格原因查询
      this.tableData = [];
      this.boothParams.current = 1;

      this.exhibitionApplyNo(this.boothParams).then(res => {
        this.total = res.total;
        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
      });
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.exhibitionApplyNo(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.exhibitionApplyNo(this.boothParams).then(res => {
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
        delegationId: this.delegationId,
        status: this.ruleForm.status,
        cecfCode: this.ruleForm.cecfCode
      };

      kindo.util.getdown(`${process.env.API_NA_URL}/api/speciaAreaExternal/exhibitionApplyNo/download?${this.encodeSearchParams(downLoadParams)}`, '申请不合格原因查询.xls');
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
.tableTip .appliExhibition span {
  margin: 0 4px
}
.tableTip .downLoadXls {
  float: right;
  cursor: pointer
}
</style>
