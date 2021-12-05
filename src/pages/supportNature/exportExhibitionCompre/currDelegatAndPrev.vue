/**
* @file 按交易团统计一般性展位申请情况
* @author:heli
* @date:2019/4/17
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="按交易团统计一般性展位申请情况" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" v-show="isShow">
        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="boothParams.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份:" size="mini">
          <!-- 年份下拉框 -->
          <el-select v-model="boothParams.applyYear" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="2019" value="2019"></el-option>
          </el-select>
        </el-form-item>

        <a class="advancedSearch" href="javascript:;" @click="advancedQuery">高级查询</a>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <hr class="lines" v-show="isShow">

        <el-form-item label="交易团:" size="mini" v-show="isShow">
          <!-- 交易团下拉框 -->
          <el-select v-model="boothParams.delegationId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.deptArr" :label="item.deptName"
            :value="item.deptId" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="期数:" size="mini" v-show="isShow">
          <!-- 期数下拉框 -->
          <el-select v-model="boothParams.exhibitionPeriod" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="1"></el-option>
            <el-option label="二期" value="2"></el-option>
            <el-option label="三期" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共查询到<span>{{total}}</span>条记录</p>
        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            prop="exhibitionNum"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationAreaName"
            label="地区"
            align="center">
          </el-table-column>
          <!-- <el-table-column
            prop="applyYear"
            label="年份"
            align="center">
          </el-table-column> -->
          <el-table-column
            prop="delegationName"
            label="交易团"
            align="center">
          </el-table-column>
          <el-table-column
            prop="currentExhApplyNumber"
            label="本届申请总数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lastExhBoothNumber"
            label="上届申请总数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="incrementBoothNumber"
            label="申请数增量"
            align="center">
          </el-table-column>
          <el-table-column align="center" label="第1期">
            <el-table-column
              prop="boothInfoOfSessionOne.boothNumber"
              label="申请数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="boothInfoOfSessionOne.initialNumber"
              label="展位核定数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="boothInfoOfSessionOne.rate"
              label="满足率"
              align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="第2期">
            <el-table-column
              prop="boothInfoOfSessionTwo.boothNumber"
              label="申请数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="boothInfoOfSessionTwo.initialNumber"
              label="展位核定数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="boothInfoOfSessionTwo.rate"
              label="满足率"
              align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="第3期">
            <el-table-column
              prop="boothInfoOfSessionThree.boothNumber"
              label="申请数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="boothInfoOfSessionThree.initialNumber"
              label="展位核定数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="boothInfoOfSessionThree.rate"
              label="满足率"
              align="center">
            </el-table-column>
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
  name: "currDelegatAndPrev",
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
        exhibitionSessionArr: []
      },
      exhibitionAreaCode: "",
      formLabelWidth: '120px',
      boothParams: {
        size: 10,
        current: 1,
        applyYear: '',
        delegationId: "",
        exhibitionPeriod: '', // 展期下拉框
        exhibitionSession: '' // 届数下拉框
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    // 用户列表查询
    this.applyContrast(this.boothParams).then(res => {
      this.total = res.total;

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
    ...mapActions("enterpriseBooth", ["applyContrast"]), // 用户列表查询
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取获取交易团
    ...mapActions("downTotal", ["addDownMangeList"]),
    // 搜索框查询
    submitForm() {
       // 用户列表查询
      this.tableData = [];
      this.boothParams.current = 1;

      this.applyContrast(this.boothParams).then(res => {
        this.total = res.total;
        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
      });

    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.applyContrast(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.applyContrast(this.boothParams).then(res => {
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
      // let downLoadParams = {
      //   delegationId: this.delegationId,
      //   applyYear: this.ruleForm.applyYear,
      //   exhibitionPeriod: this.ruleForm.exhibitionPeriod,
      //   exhibitionSession: this.ruleForm.exhibitionSession
      // };

      // kindo.util.getdown(`${process.env.API_NA_URL}/api/speciaAreaExternal/applyContrast/download?${this.encodeSearchParams(downLoadParams)}`, '本届各团展位申请情况与上届对比查询.xls');
      this.addDownMangeList().then(res => {
        this.$message({
          message: "下载已创建成功，请到下载管理模块查看",
          type: 'success'
        });
      });
    },
    // 高级查询
    advancedQuery() {
      this.delegationId = '';
      this.ruleForm.exhibitionPeriod = '';
      this.isShow = !this.isShow;
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
.tableTip .appliExhibition span {
  margin: 0 4px
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
