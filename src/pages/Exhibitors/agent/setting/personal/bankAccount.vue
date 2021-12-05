<style scoped>
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane v-loading="loading" label="代理银行账号" name="first">
      <el-form ref="bankAccount" :model="bankAccount" :rules="formRules" label-width="20%" :disabled="!editable">
        <el-row>
          <el-form-item label="开户行:" prop="openBank" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="bankAccount.openBank" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="账号:" prop="openAccount" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="bankAccount.openAccount" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="开户行地址:" prop="openAddr" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="bankAccount.openAddr" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="swifcode:" prop="swifcode" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="bankAccount.swifcode" />
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="primary" class="submit_btn" icon="el-icon-download" :disabled="!editable" @click="saveForm()">保存</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button class="edit_btn" icon="el-icon-edit" :loading="false" @click="edit">{{ editable?'取消':'编辑' }}</el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      activeName: 'first',
      formRules: {
        openBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        openAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        openAddr: [
          { required: true, message: '请输入开户行地址', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        swifcode: [
          { required: true, message: '请输入swifcode', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('agent/settings/personal/bankAccount', [
      'bankAccount',
      'loading',
      'editable'
    ])
  },
  mounted() {
    this.getBankAccount();
  },
  methods: {
    ...mapActions('agent/settings/personal/bankAccount', ['getBankAccount', 'saveBankAccount']),
    saveForm() {
      this.$refs.bankAccount.validate(valid => {
        if (valid) {
          this.saveBankAccount().then(() => this.$message({
            message: '保存成功',
            type: 'success'
          })).catch(err => this.$message({
            message: '保存失败',
            type: 'error'
          }));
        } else {
          return false;
        }
      });
    },
    edit() {
      this.$store.commit('agent/settings/personal/bankAccount/EDIT', !this.editable);
    }
  }
};
</script>

