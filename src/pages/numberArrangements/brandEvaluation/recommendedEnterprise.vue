<template>
  <div>
    <!-- 首页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="交易团推荐品牌企业筛选条件配置" name="first">
        <!-- 表格 -->
        <el-table :data="filterList.records" border v-loading="loading">
          <el-table-column align="center" prop="itemName" label="得分项"></el-table-column>
          <el-table-column align="center" prop="conditionCode" label="条件">
            <template slot-scope="scope">
              {{ scope.row.conditionCode == '>' ? '大于' : (scope.row.conditionCode == '>=' ? '大于等于' : '') }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="score" label="分值"></el-table-column>
          <el-table-column align="center" prop="conditionType" label="分类">
            <template slot-scope="scope">
              {{ scope.row.conditionType == '1' ? '筛选条件' : (scope.row.conditionType == '2' ? '评审达标' : '') }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="编辑" :visible.sync="isEdit" v-if="isEdit" width="30%">
      <el-form :model="editData" ref="editForm" :rules="rules">
        <el-form-item label="得分项:">
          <el-select v-model="editData.configId" disabled>
            <el-option v-for="(item, key) in configIdOpts" :key='key' :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条件:">
          <el-select v-model="editData.conditionCode">
            <el-option v-for="item in conditionCodeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分值:" prop="score">
          <el-input v-model.number="editData.score" clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave('editForm')">保存</el-button>
        <el-button type="info" @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /^(0|\+?[1-9][0-9]*)$/;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      loading: '',
      activeName: "first",
      isEdit: false,
      configIdOpts: [],
      conditionCodeOpts: [{ value: '>', label: '大于' }, { value: '>=', label: '大于等于' }],
      editData: {
        conditionCode: ">",
        configId: "",
        score: '',
        conditionType: ''
      },
      rules: {
        score: [{ required: true, validator: needInt, trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters('brandEvaluation', ['filterList'])
  },
  created() {
    this.loading = true;
    this.getReviewFilterList().then(res => {
      this.loading = false;
      this.configIdOpts = res.configIdList;
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('brandEvaluation', ['getReviewFilterList', 'postReviewFilterUpdate']),
    // 编辑
    handleEdit(row) {
      this.editData.configId = row.configId;
      this.editData.conditionCode = row.conditionCode;
      this.editData.score = row.score;
      this.editData.conditionType = row.conditionType;
      this.isEdit = true;
    },
    // 保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postReviewFilterUpdate(this.editData).then(() => {
            this.getReviewFilterList().then(res => {
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                fullScreenloading.close();
              });
              this.configIdOpts = res.configIdList;
              this.handleCancel();
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
          });
        } else {
          this.$message.error('请将表单填写完整');
        }
      });
    },
    //取消
    handleCancel() {
      this.editData = {
        conditionCode: ">",
        configId: "",
        score: ''
      };
      this.isEdit = false;
    }
  }
};
</script>
<style scoped>
.dialog-footer{
  text-align:center; 
  padding-bottom:12px;
}  
</style>