/**
 * @file 企业及分团维护
 * @author: weiwei
 * @date:2019/5/8
 */
<template>
  <el-container>
    <el-header>
      <span>企业及分团维护</span>
    </el-header>
    <el-main>
      <el-form inline :model="queryFormInline" ref="queryFormInline" label-width="80px">
        <el-form-item label="交易团" prop="delegationId">
          <el-select placeholder="请选择" v-model="queryFormInline.delegationId" clearable @change="delegationChange">
            <el-option v-for="item in delegationAndSubOptions" :key="item.delegationId" :value="item.delegationId" :label="item.delegationName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分团" prop="subgroupId">
          <el-select placeholder="请选择" v-model="queryFormInline.subgroupId" :disabled="!queryFormInline.delegationId" clearable>
            <el-option v-for="item in subgroupOptions" :key="item.subgroupId" :value="item.subgroupId" :label="item.subgroupName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称" prop="companyName">
          <el-input placeholder="请输入" v-model="queryFormInline.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
          <el-button size="medium" @click="resetForm('queryFormInline')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="table-contain">
        <el-table border :data="subGroupCompanyListData.records" style="width: 100%">
          <el-table-column prop="companyCode" label="广交会编码"></el-table-column>
          <el-table-column prop="companyName" label="企业名称"></el-table-column>
          <el-table-column prop="cityName" label="城市"></el-table-column>
          <el-table-column prop="subgroupName" label="所属分团"></el-table-column>
          <el-table-column prop="assignType" label="指派类型">
            <template slot-scope="scope">
              {{ scope.row.assignType === 0 ? '按城市自动指派' : (scope.row.assignType === 1 ? '手动指派' : '')}}
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button v-right.edit type="text" @click="handleAssignCompToSubgroup(scope.row)">指派</el-button>
              <el-button v-right.edit v-if="scope.row.assignType" type="text" @click="handleCancelAssignCompanyToSubgroup(scope.row.companyId)">取消指派</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="指派交易团" :visible.sync="assignCompToSubgroupDiaVis" width="50%" @close="closeAssign">
          <el-form inline :model="assignForm" :rules="assignFormRules" ref="assignForm" label-width="60px">
            <el-form-item label="交易团" prop="delegationId">
              <el-select placeholder="请选择" v-model="assignForm.delegationId" clearable @change="assignDelegationChange">
                <el-option v-for="item in delegationAndSubOptions" :key="item.delegationId" :value="item.delegationId" :label="item.delegationName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分团" prop="subgroupId">
              <el-select placeholder="请选择" v-model="assignForm.subgroupId" :disabled="!assignForm.delegationId" clearable>
                <el-option v-for="item in assignSubgroupOptions" :key="item.subgroupId" :value="item.subgroupId" :label="item.subgroupName"
                @click.native="handleSelectOption(item.subgroupName)"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center;">
            <el-button v-right.edit type="primary" size="medium" @click="confirmAssign('assignForm')">确定</el-button>
            <el-button type="info" size="medium" @click="cancelAssign">取消</el-button>
          </div>
        </el-dialog>

        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfoData.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="subGroupCompanyListData.total">
          </el-pagination>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      pageId: 'compSubMaintain',
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      },
      queryFormInline: { delegationId: '', subgroupId: '', companyName: '' }, // 查询
      delegationAndSubOptions: [], // 二级联动-交易团数组
      subgroupOptions: [], // 二级联动-分团数组
      assignCompToSubgroupDiaVis: false, // 指派弹框
      assignSubgroupOptions: [],
      assignForm: { delegationId: '', subgroupId: '', subgropName: '', companyName: '', companyCode: '', companyId: '' },
      assignFormRules: {
        subgroupId: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters("subEnterpriseManage", ['delegationAndSubGroupData', 'subGroupCompanyListData']),
    queryFormParams() {
      return {
        delegationId: this.queryFormInline.delegationId,
        subgroupId: this.queryFormInline.subgroupId,
        companyName: this.queryFormInline.companyName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    assignFormParams() {
      return {
        subgroupId: this.assignForm.subgroupId,
        subgroupName: this.assignForm.subgroupName,
        companyName: this.assignForm.companyName,
        companyCode: this.assignForm.companyCode,
        companyId: this.assignForm.companyId
      };
    }
  },
  methods: {
    // 1.二级联动 2. 获取城市分团列表 3. 指派
    ...mapActions('subEnterpriseManage', ['getDelegationAndSubGroup', 'getSubGroupCompanyList', 'postAddCompanySubGroup',
      'postCancelAssignCompanyToSubgroup']),
    delegationChange(val) {
      this.delegationAndSubOptions.forEach(ele => {
        if (val === ele.delegationId) {
          this.subgroupOptions = ele.subgroups; // 二级联动-分团数组
          this.queryFormInline.subgroupId = '';
        }
      });
    },
    assignDelegationChange(val) { // 弹框二级联动
      this.delegationAndSubOptions.forEach(ele => {
        if (val === ele.delegationId) {
          this.assignSubgroupOptions = ele.subgroups; // 二级联动-分团数组
          this.assignForm.subgroupId = '';
        }
      });
    },
    handleQuery() { // 查询表单
      this.pageInfoData.currentPage = 1;
      this.pageInfoData.pageSize = 10;
      this.getSubGroupCompanyList(this.queryFormParams);
    },
    resetForm(formName) { // 重置查询
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getSubGroupCompanyList(this.queryFormParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getSubGroupCompanyList(this.queryFormParams);
    },
    handleSelectOption(subgroupName) {
      this.assignForm.subgroupName = subgroupName;
    },
    handleAssignCompToSubgroup(row) { // 点击指派 需要传参companyId
      this.assignForm.companyName = row.companyName;
      this.assignForm.companyCode = row.companyCode;
      this.assignForm.companyId = row.companyId;
      this.assignForm.delegationId = row.delegationId;
      this.delegationAndSubOptions.forEach(ele => {
        if (row.delegationId === ele.delegationId) {
          this.assignSubgroupOptions = ele.subgroups; // 二级联动-分团数组
          // this.assignForm.subgroupId = '';
          this.assignForm.subgroupId = row.subgroupId; // 二级联动-分团赋值
        }
      });
      this.assignCompToSubgroupDiaVis = true;
    },
    confirmAssign(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postAddCompanySubGroup(this.assignFormParams).then(res => {
            this.getSubGroupCompanyList(this.queryFormParams); // 查询表单
            this.$message.success('已指派成功!');
            this.assignCompToSubgroupDiaVis = false;
            this.closeAssign();
          }).catch(e => {
            this.$message.error('指派请求失败!');
          });
        } else {
          this.$message.error('请填写完整信息!');
          return false;
        }
      });
    },
    cancelAssign() {
      this.closeAssign();
      this.$message.info('已取消确认指派!');
    },
    closeAssign() {
      if (typeof this.assignForm === 'object') {
        for (let key in this.assignForm) { // 对象中的每一项清空
          this.assignForm[key] = "";
        }
      }
      this.assignCompToSubgroupDiaVis = false;
    },
    handleCancelAssignCompanyToSubgroup(companyId) { // 取消指派
      this.$confirm('此操作将取消指派, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postCancelAssignCompanyToSubgroup({ companyId }).then(() => {
          this.getSubGroupCompanyList(this.queryFormParams);
          this.$message.success('已取消指派');
        });
      }).catch(() => {
        this.$message.error('取消指派失败');
      });
    }
  },
  created() {
    // 二级联动
    this.getDelegationAndSubGroup().then(res => {
      this.delegationAndSubOptions = this.delegationAndSubGroupData; // 二级联动赋值
    });
    // 查询表单
    this.getSubGroupCompanyList(this.queryFormParams);
  }
};
</script>
<style lang='less' scoped>
.el-container {
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
    .table-contain {
      .pagination-contain {
        padding-top: 10px;
      }
    }
  }
}
</style>
