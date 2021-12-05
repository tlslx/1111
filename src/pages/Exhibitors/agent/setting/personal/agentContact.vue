<template>
  <div style="padding: 2%">
    <el-row>
      <el-col :span="24">
        <el-form :model="qryForm" :inline="true">
          <el-form-item label="联系人">
            <el-input v-model="qryForm.name" />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="qryForm.department" />
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="danger" @click="handleAdd(true)">新增</el-button>
      </el-col>
    </el-row>
    <el-row class="mt-20">
      <el-col :span="24">
        <el-table :data="records" border>
          <el-table-column prop="name" label="联系人">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.name"></el-input>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="job" label="职位">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.job"></el-input>
              <span v-else>{{scope.row.job}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.phone"></el-input>
              <span v-else>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fax" label="传真">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.fax"></el-input>
              <span v-else>{{scope.row.fax}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.department"></el-input>
              <span v-else>{{scope.row.department}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mail" label="电子邮箱">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.mail"></el-input>
              <span v-else>{{scope.row.mail}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fixed" label="固话">
            <template slot-scope="scope">
              <el-input v-if="scope.$index==updateForm.editIndex" v-model="updateForm.fixed"></el-input>
              <span v-else>{{scope.row.fixed}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.$index != updateForm.editIndex" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" v-if="scope.$index == updateForm.editIndex" @click="updateItem">保存</el-button>
              <el-button type="text" size="small" v-if="scope.$index == updateForm.editIndex" @click="handleEdit({}, null)">取消</el-button>
              <el-button type="text" size="small" v-if="scope.$index != updateForm.editIndex" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="mt-20">
      <el-col :span="24">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" prev-text="上一页" next-text="下一页" style="float: right" />
      </el-col>
    </el-row>
    <!-- 新增 -->
    <el-dialog title="新增联系人" :visible.sync="addFlag" v-if="addFlag">
      <el-form :model="addForm" ref="addForm" :rules="addFormRules" style="padding: 30px;">
        <el-form-item label="联系人" prop="name">
          <el-input v-model="addForm.name" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="job">
          <el-input v-model="addForm.job" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="addForm.fax" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="addForm.department" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="mail" type="email">
          <el-input v-model="addForm.mail" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="固话" prop="fixed">
          <el-input v-model="addForm.fixed" maxlength="255"></el-input>
        </el-form-item>
        <div :style="{textAlign: 'center'}">
          <el-button type="primary" :loading="loading" @click="addItem">保存</el-button>
          <el-button @click="handleAdd(false)">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: function () {
    return {
      addFormRules: {
        name: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        job: [{ required: true, message: '请输入职务', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        fax: [{ required: true, message: '请输入传真', trigger: 'blur' }],
        department: [
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        mail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        fixed: [{ required: true, message: '请输入固话', trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters('agent/settings/personal/agentContact', [
      'records',
      'pageInfo',
      'qryForm',
      'loading',
      'addForm',
      'updateForm',
      'addFlag'
    ])
  },
  mounted() {
    console.log(this.$store);
    this.getContactData();
  },
  methods: {
    ...mapActions('agent/settings/personal/agentContact', [
      'getContactData',
      'deleteContact',
      'addContact',
      'updateContact'
    ]),
    handleQuery() {
      this.getContactData();
    },
    //分页事件
    handleSizeChange(val) {
      this.$store.commit(
        'agent/settings/personal/agentContact/SET_SIZE',
        val
      );
      this.getContactData();
    },
    handleCurrentChange(val) {
      this.$store.commit(
        'agent/settings/personal/agentContact/SET_CURRENT',
        val
      );
      this.getContactData();
    },
    handleEdit(editIndex, row) {
      this.$store.commit('agent/settings/personal/agentContact/SLECT_ITEM', {
        ...row,
        editIndex
      });
    },
    handleDel(index, row) {
      const contactId = row.ifoExhibitionAgentContactId;
      this.$confirm('确定删除该条记录？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteContact({ contactId })
          .then(data => {
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: '删除失败！'
            });
          });
      });
    },
    handleAdd(addFlag) {
      if (addFlag) {
        this.$store.commit('agent/settings/personal/agentContact/OPEN_ADD_DIALOG');
      } else {
        this.$store.commit('agent/settings/personal/agentContact/CLOSE_ADD_DIALOG');
      }
      
    },
    addItem() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addContact()
            .then(() => {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            })
            .catch(() => {
              this.$message({
                message: '保存失败',
                type: 'error'
              });
            });
          return true;
        } else {
          return false;
        }
      });
    },
    updateItem() {
      this.updateContact()
        .then(() => {
          this.addFlag = false;
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }).catch(() => {
          this.$message({
            message: '保存失败',
            type: 'error'
          });
        });
    }
  }
};
</script>
<style scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
<style>
.app-body {
  height: 110vh;
}
</style>

