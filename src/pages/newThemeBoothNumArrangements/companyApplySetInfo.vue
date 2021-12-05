<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="企业申请信息设置" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="届数">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, key) in exhibitionSessionOpts" :key="key" :value="item.exhibitionNum" :label="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限制条件">
          <el-select v-model="queryForm.limitCondition" clearable>
            <el-option v-for="(item, index) in limitConditionOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="companyApplyInfo.records" v-loading="loading" border>
        <el-table-column label="届数" prop="exhibitionSession" align="center"></el-table-column>
        <el-table-column label="限制条件" prop="limitCondition" align="center">
          <template slot-scope="scope">
            {{ scope.row.limitCondition | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleAddEdit('edit', scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleAddEdit('add')">新增</el-button>
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="companyApplyInfo.total">
        </el-pagination>
      </el-row>
      <!-- 新增编辑弹框 -->
      <el-dialog :title="diaTitle" :visible.sync="isCheck" v-if="isCheck">
        <el-form class="checkForm" ref="checkForm" :model="checkData" :rules="rules"> 
          <el-form-item label="届数：" prop="exhibitionSession">
            <el-select v-model="checkData.exhibitionSession" :disabled="handleDisabled(typeFlag)">
              <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :label="item.exhibitionNum" :value="item.exhibitionNum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="限制条件：" prop="limitCondition">
            <el-select v-model="checkData.limitCondition">
              <el-option v-for="(item, index) in limitConditionOpts" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="handleSave('checkForm')">确认</el-button>
          <el-button size="medium" @click="isCheck = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      diaTitle: '',
      isCheck: false,
      typeFlag: '',
      exhibitionSessionOpts: [],
      limitConditionOpts: [{ value: '1', label: '所有申请企业均提交所有材料' }, { value: '2', label: '新企业提交所有申请材料：老企业仅确认展位数' }],
      queryForm: {
        exhibitionSession: '',
        limitCondition: ''
      },
      checkData: {
        exhibitionSession: '',
        limitCondition: ''
      },
      rules: {
        exhibitionSession: [{ required: true, message: '请选择', trigger: 'change' }],
        limitCondition: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkFilter: value => {
      switch (value) {
        case '1': 
          return '所有申请企业均提交所有材料';
        case '2':
          return '新企业提交所有申请材料：老企业仅确认展位数';
        default:
          return '';    
      }
    }
  },
  computed: {
    ...mapGetters('newThemeCompanyApply', ['companyApplyInfo']),
    formQuery() {
      return {
        exhibitionSession: this.queryForm.exhibitionSession,
        limitCondition: this.queryForm.limitCondition,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  async created() {
    // 届数范围
    this.getsysExhibitions().then(res => {
      this.exhibitionSessionOpts = JSON.parse(JSON.stringify(res)).data;
    }).catch(e => {});
    // 限制条件
    this.limitConditionOpts = await kindo.dictionary.get('limitCondition');
    this.createdQuery();
  },
  methods: {
    ...mapActions('newThemeCompanyApply', ['getCompanyApplySetInfo', 'postCompanyApplySetInfoDelete', 'postCompanyApplySetInfoAdd', 'postCompanyApplySetInfoEdit']),
    ...mapActions('nainformation', ['getsysExhibitions']),
    // 是否可编辑
    handleDisabled(type) {
      if (type === 'edit') {
        return true;
      } else {
        return false;
      }
    },
    // 打开新增编辑弹框
    handleAddEdit(type, row) {
      if (type === 'add') {
        this.checkData = {
          exhibitionSession: '',
          limitCondition: ''
        };
        this.diaTitle = '新增';
        this.typeFlag = 'add';
      } else if (type === 'edit') {
        this.checkData = {
          infoSettingId: row.infoSettingId,
          exhibitionSession: row.exhibitionSession,
          limitCondition: row.limitCondition
        };
        this.diaTitle = '编辑';
        this.typeFlag = 'edit';
      }
      this.isCheck = true;
    },
    // 保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let submitData = this.checkData;
          if (this.typeFlag === 'add') {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postCompanyApplySetInfoAdd(submitData).then(res => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.isCheck = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          } else if (this.typeFlag === 'edit') {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postCompanyApplySetInfoEdit(submitData).then(res => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.isCheck = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        }
      });
    },
    // 删除
    handleDelete(row) {
      let id = row.infoSettingId;
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postCompanyApplySetInfoDelete({ infoSettingId: id }).then(() => {
          this.$message.success('删除成功');
          this.createdQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 列表下载
    handleDownload() {
      let url = `exhibitionSession=${this.queryForm.exhibitionSession}&limitCondition=${this.queryForm.limitCondition}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyApplyInfoSet/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getCompanyApplySetInfo(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
.checkForm{
  width: 50%;
  min-width: 550px;
  margin: 0 auto;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
