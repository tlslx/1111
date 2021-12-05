/**
* @file 往届曾用餐人员查询
* @author:heli
* @date:2019/5/7
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="往届曾用餐人员查询" name="first">
      <el-form :inline="true" :model="boothParams" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="boothParams.pastDinersNumber" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="展期:" size="mini">
          <!-- 交易团下拉框 -->
          <el-select v-model="boothParams.pastDinersPeriodsNumber" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="一期" value="1"></el-option>
            <el-option label="二期" value="2"></el-option>
            <el-option label="三期" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="单位:" size="mini" label-width="70px">
          <el-input v-model="boothParams.pastDinersUnitPosition" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="姓名:" size="mini" label-width="70px">
          <el-input v-model="boothParams.pastDinersName" placeholder="请输入" clearable></el-input>
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
            label="选择"
            type="selection">
          </el-table-column>
          <el-table-column
            prop="pastDinersNumber"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pastDinersName"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pastDinersParticipation"
            label="参会职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pastDinersUnitPosition"
            label="所在单位、部门及行政职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pastDinersPeriodsNumber"
            label="参会期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="diningPlace"
            label="就餐地点"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pastDinersRemarks"
            label="备注"
            align="center">
          </el-table-column>
          <el-table-column
            prop="updateStatus"
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isManual==0">不达标</span>
              <span v-else-if="scope.row.isManual==1">达标</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
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
              :total="total">
            </el-pagination>
          </div>
      </template>
      <el-button type="primary" @click="batchDelete(scope.$index, scope.row)" size="small" class="batchDelete">批量删除</el-button>

      <el-dialog class="modifyReach" title="修改达标情况" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="formManual">
          <el-form-item label="达标情况" label-width="140px">
            <el-select v-model="formManual.isManual">
              <el-option label="不达标" value="0"></el-option>
              <el-option label="达标" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原因" label-width="140px">
            <el-input v-model="formManual.modifyReason" type="textarea" placeholder="特殊处理"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmManual">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog class="modifyReach" title="设置达标标准" :visible.sync="dialogVisibleSet" width="40%" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="积极配合大会业务办开展各类调研:" size="mini" label-width="330px">
            <el-select v-model="form.surveyValue" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否按时、高质量报送本团当届工作总结:" size="mini" label-width="330px">
            <el-select v-model="form.workValue" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleSet = false">取 消</el-button>
          <el-button type="primary" @click="setStandarding">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "inquirFromPrevDiners",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      total: 0,
      radio: '1',
      idsRow: [],
      expIds: [],
      userIds: [],
      isShow: false,
      nowUserId: "",
      categories: [],
      ruleForm: {
        workValue: '',
        surveyValue: '',
        exhibitionPeriod: '',
        exhibitionAreaCode: "",
        exhibitionAreaArr: [], // 展区下拉框
        exhibitionSessionArr: []
      },
      form: {
        workValue: '',
        surveyValue: ''
      },
      formManual: {
        isManual: '',
        modifyReason: '',
        staSurveyWorkInfoId: ''
      },
      dialogVisible: false,
      dialogVisibleSet: false,
      formLabelWidth: '150px',
      boothParams: {
        size: 10,
        current: 1,
        pastDinersName: '',
        pastDinersNumber: '',
        pastDinersUnitPosition: '',
        pastDinersPeriodsNumber: ''
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      logoUploadUrl: process.env.API_REPORT_URL + '/api/efSupSurveyInfoSta/import'
    };
  },
  mounted() {
    // 当届工作总结,开展调研情况
    this.efSupSurveyInfoSta(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });

    // 获取所有届数信息
    this.getListAll().then(res => {
      this.ruleForm.exhibitionSessionArr = res;
    });

    // 获取标准值
    let standingParams = {
      type: 'SupSurveyInfo'
    };

    this.getStanding(standingParams).then(res => {
      res.records.forEach(item => {
        if (item.item === "workValue") {
          if (item.value === "1") {
            this.ruleForm.workValue = '是';
          } else {
            this.ruleForm.workValue = '否';
          }
        }

        if (item.item === "surveyValue") {
          if (item.value === "1") {
            this.ruleForm.surveyValue = '是';
          } else {
            this.ruleForm.surveyValue = '否';
          }
        }

      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["edit"]), // 修改标准值
    ...mapActions("enterpriseBooth", ["getStanding"]), // 获取标准值
    ...mapActions("enterpriseBooth", ["updateStand"]), // 设置标准值
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
    ...mapActions("enterpriseBooth", ["efSupSurveyInfoSta"]), // 当届工作总结,开展调研情况

    // 搜索框查询
    submitForm() {
      this.efSupSurveyInfoSta(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.boothParams.size = val;
      this.efSupSurveyInfoSta(this.boothParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.boothParams.current = val;
      this.efSupSurveyInfoSta(this.boothParams).then(res => {
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
    // 修改
    handleEdit(index, row) {
      this.dialogVisibleSet = true;

      if (row.isManual != null) {
        this.formManual.isManual = row.isManual + '';
      } else {
        this.formManual.isManual = '';
      }
      this.formManual.modifyReason = row.modifyReason;
      this.formManual.staSurveyWorkInfoId = row.staSurveyWorkInfoId;
    },
    // 编辑
    handleDelete(index, row) {

    },
    // 确定 修改
    confirmManual() {
      this.edit(this.formManual).then(res => {
        this.efSupSurveyInfoSta(this.boothParams).then(resp => {
          this.total = resp.total;
          this.tableData = resp.records;
        });
      });

      this.dialogVisible = false;
    },
    // 设置达标标准
    setStandarding() {
      let params = {
        'type': 'SupSurveyInfo',
        'workValue': this.form.workValue,
        'surveyValue': this.form.surveyValue
      };

      let standingParams = {
        type: 'SupSurveyInfo'
      };

      this.updateStand(params).then(res => {
        // 获取标准值
        if (res > 0) {
          this.getStanding(standingParams).then(respon => {
            if (this.form.workValue === "1") {
              this.ruleForm.workValue = '是';
            } else {
              this.ruleForm.workValue = '否';
            }

            if (this.form.surveyValue === "1") {
              this.ruleForm.surveyValue = '是';
            } else {
              this.ruleForm.surveyValue = '否';
            }

            // 当届工作总结,开展调研情况
            this.efSupSurveyInfoSta(this.boothParams).then(resp => {
              this.tableData = resp.records;
              this.total = resp.total;
            });

            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          }).catch(e => {
            this.$message.error(e);
            return false;
          });
        } else {
          this.$message({
            type: 'false',
            message: '更新失败!'
          });
        }
      });

      this.dialogVisibleSet = false;
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改
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

      kindo.util.getdown(`${process.env.API_REPORT_URL}/api/efSupSurveyInfoSta/download?${this.encodeSearchParams(downLoadParams)}`, '工作总结提交及配合调研情况.xls');
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
.batchDelete{
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
.tableTip {
  display: flex;
  justify-content: flex-end
}
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
  text-decoration: none
}
</style>
<style>
.modifyReach .el-select, .modifyReach .el-textarea {
  width: 60% !important;
}
</style>
