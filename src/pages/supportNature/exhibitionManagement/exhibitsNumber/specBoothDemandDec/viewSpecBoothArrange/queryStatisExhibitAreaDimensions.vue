/**
* @file 查询统计(展区维度)【工作部管理员】
* @author:heli
* @date:2019/6/5
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查询统计" name="first">
      <el-form :inline="true" :model="boothParams" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="boothParams.exhibitionNum" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="展区:" size="mini">
          <!-- 展区下拉框 -->
          <el-select v-model="boothParams.exhibitionAreaCode" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionAreaArr" :label="item.itemText" :value="item.itemCode" :key="item.itemCode"></el-option>
          </el-select>
        </el-form-item>

       <el-form-item label="申报类型:" size="mini">
          <!-- 申报类型下拉框 -->
          <el-select v-model="boothParams.declareType" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="制定展位数量" value="0"></el-option>
            <el-option label="不限制展位数量" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调查方案名称:" size="mini">
          <!-- 调查方案名称下拉框 -->
          <el-input v-model="boothParams.surveySchemeName" clearable></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p @click="downLoad">下载</p>
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
            prop="exihibitionNum"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaName"
            label="展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="declareType"
            label="申报类型"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.declareType==0">不限制展位数量</span>
              <span v-else-if="scope.row.declareType==1">限制展位数量</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="surveySchemeName"
            label="调研方案"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applyNum"
            label="申报总数"
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
              :total="total">
            </el-pagination>
          </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "queryStatisExhibitAreaDimensions",
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
        exhibitionAreaArr: [],
        exhibitionSessionArr: []
      },
      formLabelWidth: '120px',
      boothParams: {
        size: 10,
        current: 1,
        declareType: '',
        exhibitionNum: '',
        surveySchemeName: '',
        exhibitionAreaCode: ''
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    // 列表展示
    this.getStaticsOfExhibitionArea(this.boothParams).then(res => {
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

    // 获取所有届数信息
    this.getListAll().then(res => {
      this.ruleForm.exhibitionSessionArr = res;
    });

    // 根据字典获取展区
    this.findDicItemListByExhibiArea().then(res => {
      this.ruleForm.exhibitionAreaArr = res.records;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["getStaticsOfExhibitionArea"]), // 列表展示
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["findDicItemListByExhibiArea"]), // 根据字典获取展区

    // 搜索框查询
    submitForm() {
      // 列表查询
      this.tableData = [];
      this.boothParams.current = 1;

      this.getStaticsOfExhibitionArea(this.boothParams).then(res => {
        this.total = res.total;
        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
      });

    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.getStaticsOfExhibitionArea(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.getStaticsOfExhibitionArea(this.boothParams).then(res => {
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
        applyYear: this.ruleForm.applyYear,
        delegationId: this.delegationId,
        companyName: this.ruleForm.companyName,
        exhibitionAreaCode: this.ruleForm.exhibitionAreaCode,
        exhibitionSession: this.ruleForm.exhibitionSession
      };

      kindo.util.getdown(`${process.env.API_NA_URL}/api/speciaAreaExternal/exhibitionApplyNoReason/download?${this.encodeSearchParams(downLoadParams)}`, '各团各展区申请企业不合格原因查询.xls');
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
.tableTip {
  display: flex;
  justify-content: flex-end
}
</style>
