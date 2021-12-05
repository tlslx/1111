/**
 * @file 城市及分团维护
 * @author: weiwei
 * @date:2019/5/7
 */
<template>
  <el-container>
    <el-header>
      <span>城市及分团维护</span>
    </el-header>
    <el-main>
      <el-form inline :model="queryFormInline" ref="queryFormInline" label-width="60px">
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
        <el-form-item label="城市" prop="cityName">
          <el-input placeholder="请输入" v-model="queryFormInline.cityName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
          <el-button size="medium" @click="resetForm('queryFormInline')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="table-contain">
        <el-table border :data="delegationListMainData.records" style="width: 100%">
          <el-table-column prop="cityName" label="城市"></el-table-column>
          <el-table-column prop="subgroupName" label="所属分团"></el-table-column>
          <el-table-column prop="operate" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleAssignCityToSubgroup(scope.row.cityId, scope.row.cityName, scope.row.delegationId, scope.row.subgroupId)">分派</el-button>
              <el-button v-if="scope.row.subgroupId" type="text" @click="handleCancelAssignCityToSubgroup(scope.row.cityId)">取消分派</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="分派交易团" :visible.sync="assignCityToSubgroupDiaVis" width="50%" @close="closeAssign">
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
            <el-button type="primary" size="medium" @click="confirmAssign('assignForm')">确定</el-button>
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
            :total="delegationListMainData.total">
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
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      },
      queryFormInline: { delegationId: '', subgroupId: '', cityName: '' }, // 查询
      delegationAndSubOptions: [], // 二级联动-交易团数组
      subgroupOptions: [], // 二级联动-分团数组
      assignCityToSubgroupDiaVis: false, // 分派弹框
      assignSubgroupOptions: [],
      assignForm: { delegationId: '', subgroupId: '', subgroupName: '', cityId: '', cityName: '' },
      assignFormRules: {
        subgroupId: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters("subEnterpriseManage", ['delegationAndSubGroupData', 'delegationListMainData']),
    queryFormParams() {
      return {
        delegationId: this.queryFormInline.delegationId,
        subgroupId: this.queryFormInline.subgroupId,
        cityName: this.queryFormInline.cityName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    assignFormParams() {
      return {
        subgroupId: this.assignForm.subgroupId,
        subgroupName: this.assignForm.subgroupName,
        cityId: this.assignForm.cityId,
        cityName: this.assignForm.cityName
      };
    }
  },
  methods: {
    // 1.二级联动 2. 获取城市分团列表 3. 分派
    ...mapActions('subEnterpriseManage', ['getDelegationAndSubGroup', 'getDelegationListMain', 'postAssignCityToSubgroup',
      'postCancelAssignCityToSubgroup']),
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
      this.getDelegationListMain(this.queryFormParams);
    },
    resetForm(formName) { // 重置查询
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getDelegationListMain(this.queryFormParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getDelegationListMain(this.queryFormParams);
    },
    handleAssignCityToSubgroup(cityId, cityName, delegationId, subgroupId) { // 点击分派 需要传参cityId
      this.assignForm.cityId = cityId;
      this.assignForm.cityName = cityName;
      this.assignForm.delegationId = delegationId;
      this.delegationAndSubOptions.forEach(ele => {
        if (delegationId === ele.delegationId) {
          this.assignSubgroupOptions = ele.subgroups; // 二级联动-分团数组
          this.assignForm.subgroupId = subgroupId; // 二级联动-分团赋值
        }
      });
      this.assignCityToSubgroupDiaVis = true;
    },
    handleCancelAssignCityToSubgroup(cityId) { // 取消分派
      this.$confirm('此操作将取消分派, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postCancelAssignCityToSubgroup({ cityId }).then(() => {
          this.getDelegationListMain(this.queryFormParams);
          this.$message.success('已取消分派');
        });
      }).catch(() => {
        this.$message.error('取消分派失败');
      });
    },
    handleSelectOption(subgroupName) {
      this.assignForm.subgroupName = subgroupName;
    },
    confirmAssign(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postAssignCityToSubgroup(this.assignFormParams).then(res => {
            this.getDelegationListMain(this.queryFormParams); // 查询表单
            this.$message.success('已分派成功!');
            this.assignCityToSubgroupDiaVis = false;
            this.closeAssign();
          }).catch(e => {
            this.$message.error('分派请求失败!');
          });
        } else {
          this.$message.error('请填写完整信息!');
          return false;
        }
      });
    },
    cancelAssign() {
      this.closeAssign();
      this.$message.info('已取消分派!');
    },
    closeAssign() {
      if (typeof this.assignForm === 'object') {
        for (let key in this.assignForm) { // 对象中的每一项清空
          this.assignForm[key] = "";
        }
      }
      this.assignCityToSubgroupDiaVis = false;
    }
  },
  created() {
    // 二级联动
    this.getDelegationAndSubGroup().then(res => {
      this.delegationAndSubOptions = this.delegationAndSubGroupData; // 二级联动赋值
    });
    // 查询表单
    this.getDelegationListMain(this.queryFormParams);
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
