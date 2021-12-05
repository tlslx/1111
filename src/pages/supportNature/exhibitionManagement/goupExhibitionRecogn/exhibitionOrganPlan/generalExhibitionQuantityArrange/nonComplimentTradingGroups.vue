/**
* @file 一般性展位数量安排环节达标
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="一般性展位数量安排环节达标" name="first">

      <div class="tableTip">
        <p class="appliExhibition">不符合表彰条件的交易团</p>
        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            prop="exhibitionSession"
            label="一般性展位数量安排方案提交节点"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applyYear"
            label="未按时完成交易团"
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
  name: "nonComplimentTradingGroups",
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
      delegationId: "",
      ruleForm: {
        deptArr: [], // 交易团
        cecfCode: '', // 广交会编码
        applyYear: '', // 年份下拉框
        companyName: '', // 届数下拉框
        exhibitionSession: '', // 届数下拉框
        exhibitionAreaCode: "",
        exhibitionAreaArr: [], // 展区下拉框
        exhibitionSessionArr: []
      },
      formLabelWidth: '120px',
      formAward: {
        checkboxGroup: []
      },
      boothParams: {
        size: 10,
        current: 1
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    this.boothParams.cecfCode = this.ruleForm.cecfCode;
    this.boothParams.applyYear = this.ruleForm.applyYear;
    this.boothParams.delegationId = this.delegationId;
    this.boothParams.companyName = this.ruleForm.companyName;
    this.boothParams.exhibitionSession = this.ruleForm.exhibitionSession;
    this.boothParams.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

    this.brandApply(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
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
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["brandApply"]), // 品牌申请情况汇总
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团

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
    // 高级查询
    advancedQuery() {
      this.delegationId = '';
      this.ruleForm.exhibitionAreaCode = '';
      this.ruleForm.cecfCode = '';
      this.ruleForm.companyName = '';
      this.isShow = !this.isShow;
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
    },
    // 申请减少
    applicationReduce() {
      let params = {};
      params = this.boothParams;
      params.cecfCode = this.ruleForm.cecfCode;
      params.applyYear = this.ruleForm.applyYear;
      params.delegationId = this.delegationId;
      params.companyName = this.ruleForm.companyName;
      params.exhibitionSession = this.ruleForm.exhibitionSession;
      params.exhibitionAreaCode = this.ruleForm.exhibitionAreaCode;

      this.brandApply(params).then(res => {
        let tableArr = [];

        res.records.forEach(item => {
          if (item.ownReduceUpExhibitionNumber < 0) {
            tableArr.push(item);
          }
        });
        this.total = res.total;
        this.tableData = tableArr;
      });
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
