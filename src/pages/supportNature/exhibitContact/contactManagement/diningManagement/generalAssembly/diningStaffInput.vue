/**
* @file 就餐人员录入
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="就餐人员录入" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="姓名" size="mini">
          <el-input v-model="formManual.isManual" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="单位" size="mini">
          <el-input v-model="formManual.isManual" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="所在单位" size="mini">
          <el-input v-model="formManual.isManual" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共查询到1条记录</p>
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
            label="单位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orgId"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothIlleagalNumber"
            label="身份证号码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothRemainNumber"
            label="证件号码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="isPassed"
            label="证件类型"
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
      <p class="submit_back">提示：单击人员所在行查看头像照片，双击改行增加该人员到名单中</p>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            label="选择"
            type="selection">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="单位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applyYear"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationName"
            label="参会职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="所在单位、部门及行政职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="参会期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="applyYear"
            label="就餐地点"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationName"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            prop="modifyReason"
            label="审核状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isManual==0">不达标</span>
              <span v-else-if="scope.row.isManual==1">达标</span>
            </template>
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

      <!--表单返回按钮-->
      <div class="submit_back">
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <el-button type="primary" @click="submitForm()">删除</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "diningStaffInput",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      total: 0,
      radio: '1',
      isShow: false,
      expIds: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      ruleForm: {
        exhibitionSession: '', // 届数下拉框
        exhibitionAreaCode: "",
        exhibitionAreaArr: []
      },
      formManual: {
        isManual: '',
        modifyReason: ''
      },
      formLabelWidth: '120px',
      boothParams: {
        size: 10,
        result: '',
        current: 1
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      logoUploadUrl: process.env.API_REPORT_URL + '/api/efSupIllegalRemainBoothSta/import'
    };
  },
  mounted() {
    // 违规使用或空置展位 查询
    this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["illegalRemainBoothEdit"]), // 修改标准值
    ...mapActions("enterpriseBooth", ["illegalRemainBoothUpdateStand"]), // 设置标准值
    ...mapActions("enterpriseBooth", ["efSupIllegalRemainBoothSta"]), // 违规使用或空置展位 查询

    // 搜索框查询
    submitForm() {
      // 违规使用或空置展位 查询
      this.boothParams.current = 1;

      this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    // 设置达标标准
    setStandarding() {
      let params = {
        'type': 'IllegalRemain'
      };

      this.illegalRemainBoothUpdateStand(params).then(res => {
        // 获取标准值
        if (res > 0) {
          // 刷新页面
          this.efSupIllegalRemainBoothSta(this.boothParams).then(resp => {
            this.tableData = resp.records;
            this.total = resp.total;
          });

          this.$message({
            type: 'success',
            message: '更新成功!'
          });
        } else {
          this.$message({
            type: 'false',
            message: '更新失败!'
          });
        }
      });

    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.efSupIllegalRemainBoothSta(this.boothParams).then(res => {
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
    handleEdit(index, row) {
      if (row.isManual != null) {
        this.formManual.isManual = row.isManual + '';
      } else {
        this.formManual.isManual = '';
      }
      this.formManual.modifyReason = row.modifyReason;
      this.formManual.exhibitionNum = row.exhibitionNum;
    },
    // 确定 修改
    confirmManual() {
      this.illegalRemainBoothEdit(this.formManual).then(res => {
        this.efSupIllegalRemainBoothSta(this.boothParams).then(resp => {
          this.total = resp.total;
          this.tableData = resp.records;
        });
      });

    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 跳转
    handleClick(row) {
      this.$router.push({
        path: '/applicationBoothEdit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
        orgId: this.boothParams.orgId,
        result: this.boothParams.result,
        exhibitionNum: this.boothParams.exhibitionNum
      };

      kindo.util.getdown(`${process.env.API_REPORT_URL}/api/efSupIllegalRemainBoothSta/download?${this.encodeSearchParams(downLoadParams)}`, '违规使用或空置展位.xls');
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
.submit_back{
  margin-top: 20px;
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
<style>
.modifyReach .el-input__inner,.modifyReach .el-textarea  {
  width: 60% !important;
}
</style>
