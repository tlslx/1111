<style scoped>
.el-select {
  width: 100%;
}
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane v-loading="loading" label="基本信息" name="first">
      <el-form
        ref="baseInfo"
        :model="baseInfo"
        :rules="formRules"
        label-width="20%"
        :disabled="!editable"
      >
        <el-row>
          <el-form-item label="城市:" prop="city" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.city" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="地址:" prop="address" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.address" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="邮政编码:" prop="postalCode" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.postalCode" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="网址:" prop="url" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.url" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="机构性质:" prop="orgType" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-select v-model="baseInfo.orgType" placeholder="请选择">
                <el-option
                  v-for="orgType in orgTypeArray"
                  :key="orgType.itemCode"
                  :label="orgType.itemText"
                  :value="orgType.itemCode"
                />
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="代理名称简称:" prop="agentShort" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.agentShort" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="营业执照号:" prop="licenseNo" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.licenseNo" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="税号:" prop="taxNo" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input v-model="baseInfo.taxNo" />
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="代理简介:" prop="agentIntroduce" required>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
              <el-input
                v-model="baseInfo.agentIntroduce"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
              />
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="2" :offset="4">
          <el-button
            type="primary"
            class="submit_btn"
            icon="el-icon-download"
            :disabled="!editable"
            @click="saveForm()"
          >保存</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button
            class="edit_btn"
            icon="el-icon-edit"
            :loading="false"
            @click="edit"
          >{{ editable?'取消':'编辑' }}</el-button>
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
        city: [
          { required: true, message: '请输入城市名称', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        postalCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        url: [
          {
            type: 'url',
            required: true,
            message: '请输入网址',
            trigger: 'blur'
          },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        orgType: [
          { required: true, message: '请选择机构性质', trigger: 'blur' }
        ],
        agentShort: [
          { required: true, message: '请输入代理名称简称', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        licenseNo: [
          { required: true, message: '请输入营业执照号', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        taxNo: [
          { required: true, message: '请输入税号', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ],
        agentIntroduce: [
          { required: true, message: '请填写代理简介', trigger: 'blur' },
          { max: 255, message: '长度不能超过255个字符', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('agent/settings/personal/baseInfo', [
      'baseInfo',
      'loading',
      'editable',
      'orgTypeArray'
    ])
  },
  async mounted() {
    await this.getOrgTypeArray();
    await this.getBaseInfo();
  },
  methods: {
    ...mapActions('agent/settings/personal/baseInfo', ['getBaseInfo', 'saveBaseInfo', 'getOrgTypeArray']),
    saveForm() {
      this.$refs.baseInfo.validate(valid => {
        if (valid) {
          this.saveBaseInfo().then(
            () =>
              this.$message({
                message: '保存成功',
                type: 'success'
              })
          ).catch(err => {
            this.$message({
              message: '保存失败',
              type: 'error'
            });
          });
        } else {
          return false;
        }
      });
    },
    edit() {
      this.$store.commit('agent/settings/personal/baseInfo/EDIT', !this.editable);
    }
  }
};
</script>

