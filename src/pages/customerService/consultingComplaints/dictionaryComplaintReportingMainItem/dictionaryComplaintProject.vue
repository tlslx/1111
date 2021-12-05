/**
 * @file 投诉报障项目字典
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="投诉报障项目字典" name="first">
      <el-table border :data="listBarriersDictionary" v-loading="loading">
        <el-table-column label="序号" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="主项目代码" prop="mainProjectCode" align="center"></el-table-column>
        <el-table-column label="主项目名称" prop="mainProjectName" align="center"></el-table-column>
        <el-table-column label="所属主项目代码" prop="owmDepartmentCode" align="center"></el-table-column>
        <el-table-column label="所属主项目" prop="owmMainProject" align="center"></el-table-column>
        <el-table-column label="部门代码" prop="owmDepartmentCode" align="center"></el-table-column>
        <el-table-column label="部门名称" prop="owmDepartment" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
            <el-dialog :visible.sync="ruleModifyDialogVisible" width="70%">
              <el-form :model="queryForm" ref="queryForm" class="search-form-inline">
                <el-form-item label="项目代码：">
                  <el-input clearable v-model="queryForm.mainProjectCode"></el-input>
                </el-form-item>
                <el-form-item label="项目名称：">
                  <el-input clearable v-model="queryForm.mainProjectName"></el-input>
                </el-form-item>
                <el-form-item label="所属主项目：">
                  <el-select v-model="queryForm.owmMainProject" clearable>
                    <el-option v-for="item in owmMainProjects" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部门名称：">
                  <el-select v-model="queryForm.owmDepartment" clearable>
                    <el-option label="综合协调科（投诉报障处理）" value="1"></el-option>
                    <el-option label="证件科" value="2"></el-option>
                    <el-option label="行政科" value="3"></el-option>
                  </el-select>
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
              <el-form-item label="项目代码：">
                <el-input clearable v-model="ruleForm.mainProjectCode"></el-input>
              </el-form-item>
              <el-form-item label="项目名称：">
                <el-input clearable v-model="ruleForm.mainProjectName"></el-input>
              </el-form-item>
              <el-form-item label="所属主项目：">
                <el-select v-model="ruleForm.owmMainProject" clearable>
                  <el-option v-for="item in owmMainProjects" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名称：">
                <el-select v-model="ruleForm.owmDepartment" clearable>
                  <el-option label="综合协调科（投诉报障处理）" value="1"></el-option>
                  <el-option label="证件科" value="2"></el-option>
                  <el-option label="行政科" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addHandleQuery('ruleForm')">确认</el-button>
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
      owmMainProjects: [], // 所属主项目字典
      owmDepartments: [], // 部门名称字典
      queryForm: {
        mainProjectCode: '', // 项目代码
        mainProjectName: '', // 项目名称
        owmMainProject: '', // 所属主项目
        owmDepartment: '' //部门名称
      },
      ruleForm: {
        mainProjectCode: '', // 项目代码
        mainProjectName: '', // 项目名称
        owmMainProject: '', // 所属主项目
        owmDepartment: '' //部门名称
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    this.createdQuery();
    this.selectListMainProjectDictionary().then(response => {
      console.log(response.records[0].mainProjectName, "response.records[i].mainProjectName");
      for (let i in response.records) {
        this.owmMainProjects.push({
          value: i,
          label: response.records[i].mainProjectName
        });
      }
      console.log("222222");
      console.log("owmMainProjects", this.owmMainProjects);
      this.loading = false;
    }).catch(e => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters('dictionaryComplaintReportingMainItem', ['listBarriersDictionary'])

  },
  methods: {
    ...mapActions('dictionaryComplaintReportingMainItem', ['selectListBarriersDictionary', 'selectBarriersDictionary', 'deleteBarriersDictionaryInfo']),
    ...mapActions('dictionaryComplaintReportingMainItem', ['selectListMainProjectDictionary', 'updateBarriersDictionaryInfo', 'addBarriersDictionaryInfo']),
    //修改
    modifyUser(row) {
      this.ruleModifyDialogVisible = true;
      let barriersId = row.barriersId;
      let _this = this;
      this.loading = true;
      this.selectBarriersDictionary(barriersId).then(response => {
        _this.queryForm = response;
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    modifyHandleQuery() {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.updateBarriersDictionaryInfo(this.queryForm).then(res => {
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
        this.deleteBarriersDictionaryInfo(mainProjectId).then(response => {
          _this.selectListBarriersDictionary().then(response2 => {
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
    // 添加
    addHandleQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addBarriersDictionaryInfo(this.ruleForm).then(res => {
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
      this.selectListBarriersDictionary().then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>













