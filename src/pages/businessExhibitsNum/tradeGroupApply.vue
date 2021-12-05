<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团收集企业申请" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="company_apply_table" :data="ironStoneApplyList" v-loading="loading" :span-method="arraySpanMethod" border>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="专区" prop="productType" align="center">
           <template slot-scope="scope">
            {{ scope.row.productType === '1' ? '户外水疗设施' : (scope.row.productType === '2' ? '铁石装饰品' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="交易团" prop="delegationName" align="center"></el-table-column>
        <el-table-column label="展位数量" prop="boothNumber" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.demandRecordId">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row.demandRecordId)" :disabled="handleDisabled(scope.row.creatorType)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="danger" size="medium" @click="handleEdit('')">新增</el-button>
          <el-button type="primary" size="medium" @click="handleSubmit">汇总提交</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ironStoneApplyData.total">
        </el-pagination>
      </el-row>
      <!-- 新增编辑弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="editDialog" v-if="editDialog" :close-on-click-modal="false">
        <el-form class="dialogForm" :model="editObj" ref="editForm" :rules="editRule" label-width="120">
          <el-form-item label="企业名称：" prop="companyId">
            <el-select v-model="editObj.companyId" :disabled="isDisabled" @change="handleCompany">
              <el-option v-for="(item, index) in companyOptsw" :key="index" :value="item.companyId" :label="item.companyName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专区：" prop="productType">
            <el-select v-model="editObj.productType">
              <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易团：" prop="delegationName">
            <el-input v-model="editObj.delegationName" disabled></el-input>
          </el-form-item>
          <el-form-item class="form-box" label="展位数量：" prop="boothNumber">
            <el-input placeholder="请输入" v-model.trim.number="editObj.boothNumber" oninput="if(value.length>10)value=value.slice(0,10)" clearable></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handleConfirm('editForm')">确认</el-button>
            <el-button size="medium" @click="editDialog = false;">取消</el-button>
          </div>
        </el-form>
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
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      editDialog: false,
      isDisabled: false,
      dialogTitle: '',
      type: '',
      currentDelegationId: '', // 当前登录交易团id
      ironStoneApplyList: [],
      productTypeOpts: [{ value: '1', label: '户外水疗设施' }, { value: '2', label: '铁石装饰品' }],
      dealClusterOpts: [],
      companyOptsw: [], // 新增的企业数组
      queryForm: {
        productType: '',
        delegationId: this.$store.getters.userInfo.org.deptId,
        companyName: ''
      },
      editObj: {
        demandRecordId: '',
        companyId: '',
        cecfCode: '',
        city: '',
        isContacted: '',
        companyName: '',
        productType: '',
        delegationId: '',
        delegationName: '',
        boothNumber: '0'
      },
      editRule: {
        companyId: [{ required: true, message: '请选择', trigger: 'change' }],
        productType: [{ required: true, message: '请选择', trigger: 'change' }],
        delegationName: [{ required: true, message: '未从登录信息中获取到交易团名称', trigger: 'blur' }],
        boothNumber: [{ required: true, validator: needInt, trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('ironworkNumberArrangements', ['ironStoneApplyData']),
    formQuery() {
      return {
        productType: this.queryForm.productType,
        companyName: this.queryForm.companyName,
        delegationId: this.queryForm.delegationId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    updateData() {
      return {
        demandRecordId: this.editObj.demandRecordId,
        companyId: this.editObj.companyId,
        companyName: this.editObj.companyName,
        cecfCode: this.editObj.cecfCode,
        city: this.editObj.city,
        isContacted: this.editObj.isContacted,
        productType: this.editObj.productType,
        delegationId: this.editObj.delegationId,
        delegationName: this.editObj.delegationName,
        boothNumber: this.editObj.boothNumber,
        isAppend: 'I',
        operatorId: this.$store.getters.userInfo.userId,
        operator: this.$store.getters.userInfo.userName
      };
    }
  },
  created() {
    this.currentDelegationId = this.$store.getters.userInfo.org.deptId;
    this.currentDelegationName = this.$store.getters.userInfo.org.deptName;
    // 获取交易团下属企业
    this.getcompanyInfoByDeleId({ delegationId: this.currentDelegationId }).then(res => {
      this.companyOptsw = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  mounted() {
    this.createdQuery();
  },
  methods: {
    ...mapActions('ironworkNumberArrangements', ['postIronStoneApplyInfo', 'postAddIronStoneApplyInfo', 
      'postUpdateIronStoneApplyInfo', 'getDelIronStoneApplyInfo', 'postHydrotherapyStatus']),
    ...mapActions('nainformation', ['getcompanyInfoByDeleId']),
    // 是否可删除
    handleDisabled(id) {
      if (id === '1') {
        return false;
      } else {
        return true;
      }
    },
    // 企业改变
    handleCompany(val) {
      if (val && this.companyOptsw) {
        for (let i = 0; i < this.companyOptsw.length; i++) {
          if (this.companyOptsw[i].companyId === val) {
            this.editObj.companyName = this.companyOptsw[i].companyName;
            this.editObj.cecfCode = this.companyOptsw[i].cantonCode;
            this.editObj.city = this.companyOptsw[i].city;
            this.editObj.isContacted = this.companyOptsw[i].isContacted ? this.companyOptsw[i].isContacted : '0';
            return;
          }
        }
      } else {
        this.editObj.companyName = '';
        this.editObj.cecfCode = '';
        this.editObj.city = '';
        this.editObj.isContacted = '';
      }
    },
    // 新增or编辑
    handleEdit(row) {
      if (row === '') { // 新增
        this.editObj = {
          demandRecordId: '',
          companyId: '',
          cecfCode: '',
          city: '',
          isContacted: '',
          companyName: '',
          productType: '',
          delegationId: this.currentDelegationId,
          delegationName: this.currentDelegationName,
          boothNumber: '0'
        };
        this.type = 'add';
        this.dialogTitle = '新增';
        this.isDisabled = false;
      } else { // 编辑
        this.editObj = {
          demandRecordId: row.demandRecordId,
          companyId: row.companyId,
          cecfCode: '',
          city: '',
          isContacted: '',
          companyName: row.companyName,
          productType: row.productType,
          delegationId: this.currentDelegationId,
          delegationName: this.currentDelegationName,
          boothNumber: row.boothNumber ? row.boothNumber : '0'
        };
        this.handleCompany(row.companyId);
        this.type = 'edit';
        this.dialogTitle = '编辑';
        this.isDisabled = true;
      }
      this.editDialog = true;
    },
    // 确认
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postAddIronStoneApplyInfo(this.updateData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('新增成功');
              this.editDialog = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          } else if (this.type === 'edit') {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postUpdateIronStoneApplyInfo(this.updateData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('编辑成功');
              this.editDialog = false;
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
    handleDelete(id) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getDelIronStoneApplyInfo({ demandRecordId: id }).then(() => {
          this.$message.success('删除成功');
          this.createdQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消此次操作');
      });
    },
    // 合并行或列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.type === 'summary') {
        row.delegationName = row.name;
        if (columnIndex === 0) {
          return [0, 0];
        } else if (columnIndex === 1) {
          return [0, 0];
        } else if (columnIndex === 2) {
          return [1, 3];
        }
      }
    },
    // 汇总提交
    handleSubmit() {
      let demandRecordIdObj = {
        delegationId: this.$store.getters.userInfo.org.deptId,
        demandRecordIds: []
      };
      for (let i = 0; i < this.ironStoneApplyData.records.length; i++) {
        if (this.ironStoneApplyData.records[i].demandRecordId) {
          demandRecordIdObj.demandRecordIds.push(this.ironStoneApplyData.records[i].demandRecordId);
        } else {
          continue;
        }
      }
      this.$confirm('确定提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postHydrotherapyStatus(demandRecordIdObj).then(() => {
          this.$message.success('提交成功');
        }).catch(e => {

        });
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    // 添加尾部合计
    handleAddSummary(arr, listName, listNumber) {
      for (let i = 0; i < listName.length; i++) {
        let obj = {
          type: 'summary',
          name: '',
          boothNumber: ''
        };
        obj.name = listName[i];
        obj.boothNumber = listNumber[i];
        arr.push(obj);
      }
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.postIronStoneApplyInfo(this.formQuery).then(data => {
        this.loading = false;
        this.ironStoneApplyList = JSON.parse(JSON.stringify(data)).records;
        this.handleAddSummary(this.ironStoneApplyList, ['申请基数外展位小计：', '基数内铁石装饰品类别展位数：', '合计：'], [data.res.ironStoneApplySum, data.res.ironBaseStone, data.res.sumAll]);
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
.queryBtn{
  float: right;
}
.dialogForm{
  width: 75%; 
  min-width: 250px; 
  margin: 0 auto;
}
.pagination-footer{
  margin-top: 20px;
}  
.company_apply_table >>> .el-table__body .el-table__row:nth-last-child(1) .cell,
.company_apply_table >>> .el-table__body .el-table__row:nth-last-child(2) .cell,
.company_apply_table >>> .el-table__body .el-table__row:nth-last-child(3) .cell {
  text-align: right !important;
}
.form-box >>> input::-webkit-outer-spin-button,
.form-box >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.form-box >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
