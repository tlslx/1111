/**
 * @file 投诉报障主项目字典
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="投诉报障主项目字典" name="first">
      <el-table border :data="listMainProjectDictionary" v-loading="loading">
        <el-table-column label="序号" prop="sequenceNum" align="center"></el-table-column>
        <el-table-column label="主项目代码" prop="mainProjectCode" align="center"></el-table-column>
        <el-table-column label="主项目名称" prop="mainProjectName" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
            <el-dialog :visible.sync="ruleModifyDialogVisible" width="70%">
              <el-form :model="queryForm" ref="queryForm" class="search-form-inline">
                <el-form-item label="主项目代码；">
                  <el-input clearable v-model="queryForm.mainProjectCode"></el-input>
                </el-form-item>
                <el-form-item label="主项目名称：">
                  <el-input clearable v-model="queryForm.mainProjectName"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="modifyHandleQuery('queryForm')">确认</el-button>
                  <el-button type="danger" @click="ruleModifyDialogVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form class="search-form-inline">
        <el-form-item>
          <el-button type="primary" @click="ruleDialogVisible = true">增加</el-button>
          <el-dialog :visible.sync="ruleDialogVisible" width="70%">
            <el-form :model="ruleForm" ref="ruleForm" class="search-form-inline">
              <el-form-item label="主项目代码；">
                <el-input clearable v-model="ruleForm.mainProjectCode"></el-input>
              </el-form-item>
              <el-form-item label="主项目名称：">
                <el-input clearable v-model="ruleForm.mainProjectName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button type="danger" @click="ruleDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      ruleDialogVisible: false,
      ruleModifyDialogVisible: false,
      queryForm: {
        mainProjectCode: '', // 主项目代码
        mainProjectName: '' // 主项目名称
      },
      ruleForm: {
        mainProjectCode: '', // 主项目代码
        mainProjectName: '' // 主项目名称
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    this.createdQuery();
  },
  computed: {
    ...mapGetters('dictionaryComplaintReportingMainItem', ['listMainProjectDictionary'])
  },
  methods: {
    ...mapActions('dictionaryComplaintReportingMainItem', ['selectListMainProjectDictionary', 'selectMainProjectDictionary', 'deleteMainProjectDictionaryInfo']),
    ...mapActions('dictionaryComplaintReportingMainItem', ['updateMainProjectDictionaryInfo', 'addMainProjectDictionaryInfo']),
    //修改
    modifyUser(row) {
      this.ruleModifyDialogVisible = true;
      let mainProjectId = row.mainProjectId;
      let _this = this;
      this.loading = true;
      this.selectMainProjectDictionary(mainProjectId).then(response => {
        _this.queryForm = response;
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    modifyHandleQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.updateMainProjectDictionaryInfo(this.queryForm).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.ruleModifyDialogVisible = false;
            this.createdQuery();
          });
        } else {
          return false;
        }
      });
    },
    // 删除
    deleteUser(row) {
      let mainProjectId = row.mainProjectId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteMainProjectDictionaryInfo(mainProjectId).then(response => {
          _this.selectListMainProjectDictionary().then(response2 => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
          });
          _this.loading = false;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 新增
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addMainProjectDictionaryInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.ruleDialogVisible = false;
            this.createdQuery();
          });
        } else {
          return false;
        }
      });
    },
    createdQuery() {
      this.loading = true;
      this.selectListMainProjectDictionary().then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>













