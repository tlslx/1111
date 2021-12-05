/**
 * @file 区域及地方分团维护
 * @author: zhipeng + weiwei
 * @date:2019/4/12
 */
<template>
  <el-container>
    <el-header>
      <span>区域及地方分团维护</span>
    </el-header>
    <el-main>
      <el-col :span="10" style="border-right: 1px solid #ddd">
        <!-- :show-header = false -->
        <el-table :data="delegationMenuListLeftData.records" border height="500" highlight-current-row current-row-key="delegationId"
          :row-style="tableRowStyle" :cell-style="tableCellStyle" @row-click="handleRowClick" @current-change="handleRowCurrentChange"
          ref="delegationMenuListLeft">
          <el-table-column prop="delegationName" label="交易团"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button type="text"
              @click.native.stop="showEditAreaLeftDialog(scope.row.areaCode, scope.row.delegationId, scope.row.delegationName)">修改区域</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="设置区域" :visible.sync="editAreaLeftDialog">
          <el-form :model="editLeftParams">
            <el-form-item label="交易团名称">
              <el-input v-model="editLeftParams.delegationName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="区域名称">
              <el-select v-model="editLeftParams.areaId" placeholder="请选择">
                <el-option v-for="item in this.delegationAreaListSelectData" :key="item.areaId" :value="item.areaId" :label="item.areaName"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelEditLeft">取 消</el-button>
            <el-button type="primary" @click="submitEditLeft">确 定</el-button>
          </span>
        </el-dialog>

        <el-row type="flex" justify="end">
          <el-pagination
            @size-change="handleLeftSizeChange"
            @current-change="handleLeftCurrentChange"
            :current-page="pageInfoLeft.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoLeft.size"
            layout="prev, pager, next, jumper"
            :total="delegationMenuListLeftData.total">
          </el-pagination>
        </el-row>
      </el-col>

      <el-col :span="14">
        <el-tabs v-model="activeName">
          <el-tab-pane :label='delegationLabel' name="first">
            <el-row style="padding-bottom: 10px;">
              <el-form :model="savedFormData">
                <el-form-item label="保存的届数" prop="savedExhibitionNum">
                  <el-select v-model="savedFormData.savedExhibitionNum" style="width: 300px;">
                    <el-option v-for="item in this.saveExhibitonNumList" :key="item.value" :label="item.lable"
                    :value="item.value" @click.native="handleQueryList"></el-option>
                  </el-select>
                  <span v-show="beforeExhibitDisable">  查看往届</span>
                </el-form-item>
              </el-form>
            </el-row>
            <el-row style="padding-bottom: 10px;">
              <el-button type="primary" @click="addDialog = true" :disabled="!this.addParams.delegationId || beforeExhibitDisable">新增分团</el-button>
              <el-button style="float: right; margin-right: 10px;" type="text" :disabled="!this.addParams.delegationId"
                @click="downloadMainTableList">下载XLS</el-button>
            </el-row>

            <el-dialog title="新增分团" :visible.sync="addDialog">
              <el-form :model="addParams">
                <el-form-item label="分团名称">
                  <el-input v-model="addParams.subgropName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                  <el-input v-model="addParams.account" placeholder="请输入"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
              </span>
            </el-dialog>

            <el-table :data="delegationListMainData.records" border id="delegationListMain">
              <el-table-column prop="subgropName" label="分团名称"></el-table-column>
              <el-table-column prop="delegationName" label="交易团名称"></el-table-column>
              <!-- <el-table-column prop="areaName" label="所属区域"></el-table-column> -->
              <el-table-column prop="account" label="账号"></el-table-column>
              <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="showEditSubDialog(scope.row)" :disabled="beforeExhibitDisable">修改</el-button>
                  <!-- <el-button type="text" style="color: #F56C6C;" @click="handleDeleteSub(subgropCode)">删除</el-button> -->
                </template>
              </el-table-column>
              <el-table-column prop="" label="状态">
                <template slot-scope="scope">
                  <span>{{scope.row.state == 0 ? '禁用' : (scope.row.state == 1 ? '启用' : '')}}</span>
                </template>
              </el-table-column>
            </el-table>

            <el-dialog title="修改" :visible.sync="editSubDialog">
              <el-form :model="editSubParams">
                <el-form-item label="分团名称">
                  <el-input v-model="editSubParams.subgropName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                  <el-input v-model="editSubParams.account" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <el-form-item label="启用状态">
                  <el-select v-model="editSubParams.state" placeholder="请选择">
                    <el-option v-for="item in [{label: '启用', value: 1}, {label: '禁用', value: 0}]" :key="item.value" :label
                      ="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEditSub">取 消</el-button>
                <el-button type="primary" @click="submitEditSub">确 定</el-button>
              </span>
            </el-dialog>

            <el-row type="flex" justify="end">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfoData.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageInfoData.pageSize"
                layout="prev, pager, next, jumper"
                :total="delegationListMainData.total">
              </el-pagination>
            </el-row>

            <el-row type="flex" justify="end">
              <el-button type="primary" @click="saveCondition" :disabled="beforeExhibitDisable || delegationListMainData.records === []">保存历史记录</el-button>
            </el-row>

            <el-dialog title="选择展届" :visible.sync="selectExhibitionNumDialog">
              <el-form :model="saveConditionParams" ref="saveConditionForm" :rules="saveConditionRules">
                <el-form-item label="以往展届" prop="exhibitionNum">
                  <el-select v-model="saveConditionParams.exhibitionNum">
                    <el-option v-for="item in this.exhibitonNumList" :key="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSaveCondition">取 消</el-button>
                <el-button type="primary" @click="submitSaveCondition('saveConditionForm')">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-main>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import FileSaver from 'file-saver'; // 下载用
// import XLSX from 'xlsx';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      delegationLabel: '',
      addDialog: false,
      pageInfoLeft: { size: 10, current: 1 },
      editLeftParams: {
        delegationId: '',
        areaId: '',
        delegationName: '' // 显示交易团名称
      },
      currentRowIndex: '', // 存储当前选中的行的索引
      currentDelegationId: '', // 暂存左侧交易团id
      editAreaLeftDialog: false, // 左侧编辑区域的dialog
      pageInfoData: { pageSize: 10, currentPage: 1 },
      addParams: { // 新增分团
        account: '', // 账号
        delegationId: '', // 交易团id
        delegationName: '', // 交易团name
        exhibitionNum: 124,
        subgropId: '', // subgropCode: '',
        subgropName: '' // 分团名称
      },
      editSubParams: { // 编辑分团
        delegationId: '',
        delegationName: '',
        exhibitionNum: 124,
        subgropId: '', // subgropCode: '',
        subgropName: '',
        account: '',
        state: '' // 启用状态
      },
      editSubDialog: false,
      // 历史展届
      selectExhibitionNumDialog: false, // 选择展览届数弹框
      saveConditionParams: { // 保存查询条件
        exhibitionNum: ''
      },
      saveConditionRules: { // 验证选择展届
        exhibitionNum: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      savedFormData: {
        savedExhibitionNum: null // 已保存之后的列表
      },
      beforeExhibitDisable: false // 往届时禁用
    };
  },
  computed: {
    // "delegationListLeftData", 不用
    ...mapGetters("subEnterpriseManage", ['delegationMenuListLeftData',
      'delegationListMainData', 'delegationAreaListSelectData', 'exhibitonNumList',
      'saveExhibitonNumList']),
    queryMainListParams() { // params在请求里面传
      let params = {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize,
        delegationId: this.currentDelegationId
      };
      return params;
    },
    reEditLeftParams() { // 重定义编辑左侧区域
      return {
        delegationId: this.editLeftParams.delegationId,
        areaId: this.editLeftParams.areaId
      };
    },
    savedExhibitionNum() { // 以前展届
      return this.savedFormData.savedExhibitionNum;
    }
    // delegationId() {
    //  return this.queryMainListParams.delegationId;
    // }
  },
  watch: {
    savedExhibitionNum(val) {
      if (val == null) {
        this.beforeExhibitDisable = false;
      } else {
        this.beforeExhibitDisable = true;
      }
    }
    // 监听左侧table选中的delegationId
    // delegationId(curVal, oldVal) {
    //   if (curVal !== oldVal) {
    //     console.log(curVal, oldVal, 'curVal, oldVal');
    //     this.savedFormData.savedExhibitionNum = '';
    //   }
    // }
  },
  methods: {
    // 'getDelegationListLeft', 不用 'postDeleteSubGroup', 删除不用
    ...mapActions('subEnterpriseManage', ['getDelegationListMain',
      'postDelegationMenuListLeft', 'postAddSubGroup', 'getDelegationAreaListSelectLeft',
      'postUpdateSubGroupMain', 'postUpdateDelegationArea', 'getExhibitionNumList',
      'getSaveResult', 'getSavedExhibitionNumList', 'getSaveExceljyt']),
    handleQueryList() { // 查询main表单
      if (this.savedFormData.savedExhibitionNum) {
        this.queryMainListParams.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getDelegationListMain(this.queryMainListParams).then(() => { // 清空以前展届
        delete this.queryMainListParams.exhibitionNum;
      }).catch(() => {
        delete this.queryMainListParams.exhibitionNum;
      });
    },
    // 判断将要保存的届数, 是否之前已经保存了
    judgeExhibitNumHasBeenSaved(exhibitNum) {
      if (this.saveExhibitonNumList.length > 0) {
        let tempIndex = this.saveExhibitonNumList.findIndex(ele => {
          return ele.value === exhibitNum;
        });
        if (tempIndex === -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    saveCondition() { // 保存历史记录-弹出选择框
      this.getExhibitionNumList(); // 获取下拉框
      this.selectExhibitionNumDialog = true; // 展示选择展届弹框
    },
    submitSaveCondition(formName) { // 保存查询条件
      this.$refs[formName].validate(valid => {
        if (valid) { // 保存展届

          let ifSaved = this.judgeExhibitNumHasBeenSaved(this.saveConditionParams.exhibitionNum);
          if (ifSaved) {
            this.$confirm('该展届数已保存过, 是否覆盖数据?', '提示', {
              confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
            }).then(() => {
              this.getSaveResult(this.saveConditionParams.exhibitionNum).then(() => {
                this.saveConditionParams.exhibitionNum = '';
                this.selectExhibitionNumDialog = false;
                this.$message.success('保存历史记录成功');
                this.getSavedExhibitionNumList(this.queryMainListParams.delegationId); // 拿到历史记录列表
              });
            }).catch(() => {
              this.$message.info('已取消保存');
            });
          } else {
            this.getSaveResult(this.saveConditionParams.exhibitionNum).then(() => {
              this.saveConditionParams.exhibitionNum = '';
              this.selectExhibitionNumDialog = false;
              this.$message.success('保存历史记录成功');
              this.getSavedExhibitionNumList(this.queryMainListParams.delegationId); // 拿到历史记录列表
            });
          }

        } else {
          this.$message.error('请选择展届');
        }
      });
    },
    cancelSaveCondition() { // 取消保存
      this.saveConditionParams.exhibitionNum = '';
      this.selectExhibitionNumDialog = false;
    },
    // 左侧table
    handleRowCurrentChange(currentRow, oldCurrentRow) {
      if (currentRow) {
        this.currentRowIndex = currentRow.delegationId;
      }
    },
    handleRowClick(row) { // 点击左侧一行
      this.savedFormData.savedExhibitionNum = null;
      // this.queryMainListParams.delegationId = row.delegationId; // 唯一id
      this.currentDelegationId = row.delegationId;
      this.getSavedExhibitionNumList(row.delegationId); // 拿到历史记录列表
      this.delegationLabel = row.delegationName + '(交易团)';
      this.addParams.delegationId = row.delegationId; // 交易团id(新增)
      this.addParams.delegationName = row.delegationName; // 交易团name
      this.getDelegationListMain(this.queryMainListParams);
    },
    showEditAreaLeftDialog(areaId, delegationId, delegationName) {
      this.editAreaLeftDialog = true; // 编辑左侧区域弹框打开
      this.editLeftParams.areaId = areaId;
      this.editLeftParams.delegationId = delegationId;
      this.editLeftParams.delegationName = delegationName;
      // 获取列表下拉框
      this.getDelegationAreaListSelectLeft();
    },
    cancelEditLeft() {
      this.editLeftParams.delegationId = ''; // 选项置空
      this.editAreaLeftDialog = false;
    },
    submitEditLeft() {
      // 提交修改后，只需要刷新左侧菜单列表
      this.postUpdateDelegationArea(this.reEditLeftParams).then(() => {
        this.$message.success('修改区域成功');
        this.cancelEditLeft();
         // 刷新左侧菜单
        this.postDelegationMenuListLeft(this.pageInfoLeft).then(() => {
          this.delegationMenuListLeftData.records.forEach(ele => {
            if (ele.delegationId === this.currentRowIndex) {
              this.$refs.delegationMenuListLeft.setCurrentRow(ele);
            }
          });
        });
      });
    },
    tableRowStyle({ row, rowIndex }) {
      return 'cursor: pointer';
    },
    tableCellStyle({ row, rowIndex }) {
      return 'line-height: 16px;padding: 5px 0';
    },
    // 右侧table
    cancelAdd() { // 取消新增
      this.addParams.subgropName = '';
      this.addParams.account = '';
      this.addDialog = false;
    },
    submitAdd() { // 提交新增
      this.postAddSubGroup(this.addParams).then(res => {
        this.getDelegationListMain(this.queryMainListParams);
        this.addParams.subgropName = '';
        this.addParams.account = '';
        this.addDialog = false;
        this.$message.success('新增分团成功');
      });
    },
    // handleDeleteSub(subGroupCode) { // 删除交易团分团
    //   this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
    //     confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
    //   }).then(() => {
    //     this.postDeleteSubGroup(subGroupCode).then(() => {
    //       this.getDelegationListMain(this.queryMainListParams); // 刷新分团列表
    //       this.$message.success('删除成功');
    //     }).catch(() => {
    //       this.$message.error('删除失败');
    //     });
    //   }).catch(() => {
    //     this.$message.info('已取消删除');
    //   });
    // },
    showEditSubDialog(row) { // 修改交易团分团
      this.editSubParams.delegationId = row.delegationId;
      this.editSubParams.delegationName = row.delegationName;
      // this.editSubParams.subgropCode = row.subgropCode;
      this.editSubParams.subgropId = row.subgropId;
      this.editSubParams.subgropName = row.subgropName;
      this.editSubParams.account = row.account;
      this.editSubParams.state = row.state; // 启用状态
      this.editSubDialog = true;
    },
    cancelEditSub() {
      this.editSubDialog = false;
    },
    submitEditSub() {
      this.postUpdateSubGroupMain(this.editSubParams).then(res => {
        this.editSubDialog = false;
        this.getDelegationListMain(this.queryMainListParams); // 刷新分团列表
        this.$message.success('修改成功');
      });
    },
    handleLeftSizeChange(val) {
      this.pageInfoLeft.size = val;
      this.postDelegationMenuListLeft(this.pageInfoLeft);// 刷新左侧列表
    },
    handleLeftCurrentChange(val) {
      this.pageInfoLeft.current = val;
      this.postDelegationMenuListLeft(this.pageInfoLeft);// 刷新左侧列表
    },

    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getDelegationListMain(this.queryMainListParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getDelegationListMain(this.queryMainListParams);
    },
    downloadMainTableList() { // 下载
      /* generate workbook object from table */
      // var wb = XLSX.utils.table_to_book(document.querySelector('#delegationListMain'));
      // /* get binary string as output */
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      // try {
      //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.delegationLabel + '.xls');
      // } catch (e) {
      //   // if (typeof console !== 'undefined') console.log(e, wbout)
      //   this.$message.error('下载失败');
      // }
      // return wbout;
      let params = {
        delegationId: this.queryMainListParams.delegationId
      };
      if (this.savedFormData.savedExhibitionNum) {
        params.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getSaveExceljyt(params); // 下载
    }
  },
  created() {
    this.postDelegationMenuListLeft(this.pageInfoLeft).then(res => { // 刷新左侧列表 用第一个id赋值去查
      if (this.delegationMenuListLeftData.records && this.delegationMenuListLeftData.records.length > 0) {
        let firstMainDataRow = this.delegationMenuListLeftData.records[0];
        // this.queryMainListParams.delegationId = firstMainDataRow.delegationId;
        this.currentDelegationId = firstMainDataRow.delegationId;
        this.delegationLabel = firstMainDataRow.delegationName + '管理';
        this.addParams.delegationId = firstMainDataRow.delegationId; // 交易团id(新增)
        this.addParams.delegationName = firstMainDataRow.delegationName; // 交易团name
        this.getDelegationListMain(this.queryMainListParams);
        // console.log(this.$refs.delegationMenuListLeft, 'created');
        this.$refs.delegationMenuListLeft.setCurrentRow(this.delegationMenuListLeftData.records[0]); // 默认选中

        this.getSavedExhibitionNumList(firstMainDataRow.delegationId); // 获取展届
      }
    });


  }
};
</script>
<style lang='less' scoped>
.el-header {
  border-bottom: 1px solid #ddd;
  span {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    height: 58px;
    line-height: 58px;
    display: block;
    float: left;
    border-bottom: 2px solid #2b579a;
  }
}
.el-main {
  .el-col {
    /deep/ .el-tabs__content {
      padding: 0 10px;
    }
  }
}
</style>
