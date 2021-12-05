/**
* @file 展区一般性展位数量调整表
* @author:heli
* @date:2019/4/16
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展区一般性展位数量调整表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择" @change="onSelected">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易团:" size="mini">
          <!-- 交易团下拉框 -->
          <el-select v-model="delegationId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.deptArr" :label="item.deptName"
            :value="item.deptId" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="展区:" size="mini">
          <!-- 展区下拉框 -->
          <el-select v-model="ruleForm.exhibitionAreaCode" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionAreaArr" :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共查询到<span>{{number}}</span>条记录</p>
        <p class="downLoadXls" v-show="isShow" @click="downLoadTemplate">下载</p>
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
            prop="exhibitionAreaCode"
            label="会期"
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
            prop="boothNum"
            label="交易团"
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
            prop="reCh"
            label="不等量调换"
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
  name: "generalQuantityAdjustTable",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      number: '',
      isShow: false,
      expIds: [],
      idsRow: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      currentPage: 1,
      delegationId: "",
      total: 0,
      ruleForm: {
        deptArr: [],
        exhibitionAreaCode: '',
        exhibitionSession: '', // 届数下拉框
        exhibitionAreaArr: [],
        exhibitionSessionArr: []
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      boothParams: {
        size: 10,
        current: 1
      }
    };
  },
  mounted() {
    this.boothParams.applyYear = this.ruleForm.applyYear;
    this.boothParams.exhibitionSession = this.ruleForm.exhibitionSession;
    this.boothParams.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

    this.companyApply(this.boothParams).then(res => {
      this.total = res.total;
      this.number = res.records.length;

      for (let i = 0; i < res.records.length; i++) {
        this.tableData.push(res.records[i] || '');
      }
    });

    // 获取所有届数信息
    this.getListAll().then(res => {
      this.ruleForm.exhibitionSessionArr = res;
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      res.records.forEach(item => {
        this.ruleForm.deptArr.push(item);
      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["companyApply"]), // 用户列表查询
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取获取交易团

    // 搜索框查询
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.current = 1;
      params.applyYear = this.ruleForm.applyYear;
      params.exhibitionSession = this.ruleForm.exhibitionSession;
      params.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

      this.tableData = [];
      this.companyApply(params).then(res => {
        this.total = res.total;
        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
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
      this.boothParams.size = val;
      this.companyApply(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.companyApply(this.boothParams).then(res => {
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
    downLoadTemplate() {
      let downLoadParams = {
        applyYear: this.ruleForm.applyYear,
        exhibitionAreaCode: this.ruleForm.exhibitionAreaCode,
        exhibitionSession: this.ruleForm.exhibitionSession
      };

      kindo.util.getdown(`${process.env.API_NA_URL}/api/speciaAreaExternal/companyApply/download?${this.encodeSearchParams(downLoadParams)}`, '各展区企业申请情况统计.xls');
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
