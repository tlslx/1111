<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部对特装审核" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="商会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="queryForm.boothType" clearable>
            <el-option v-for="item in boothTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核情况">
          <el-select v-model="queryForm.checkStatus" clearable>
            <el-option v-for="item in checkStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否品牌展位">
          <el-select v-model="queryForm.ifBrand" clearable>
            <el-option v-for="item in ifBrandOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="company_apply_table" :data="departList.records" v-loading="loading" border>
        <el-table-column label="商会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cecfCode" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展位类型" prop="boothType" align="center">
          <template slot-scope="scope">
            {{ scope.row.boothType | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团" prop="delegationName" align="center"></el-table-column>
        <el-table-column label="是否品牌展位" prop="ifBrand" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifBrand === 0 ? '否' : (scope.row.ifBrand === 1 ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="原特装数" prop="originalRecommend" align="center"></el-table-column>
        <el-table-column label="新特装数" prop="adjustedNumber" align="center"></el-table-column>
        <el-table-column label="是否超期更改" prop="isJoinOverdue" align="center">
          <template slot-scope="scope">
            {{ scope.row.isJoinOverdue === '0' ? '否' : (scope.row.isJoinOverdue === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="商会审核是否超期" prop="checkIsJoinOverdue" align="center">
          <template slot-scope="scope">
            {{ scope.row.checkIsJoinOverdue === '0' ? '否' : (scope.row.checkIsJoinOverdue === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="调整数量" prop="adjustNum" align="center"></el-table-column>
        <el-table-column label="调整原因" prop="adjustReason" align="center">
          <template slot-scope="scope">
            {{ scope.row.adjustReason | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="是否计入企业特装超期更改" prop="ifInCpOverdueAdjust" align="center" width="120">
          <template slot-scope="scope">
            <el-form>
              <el-form-item class="item-Num" prop="ifInCpOverdueAdjust">
                <el-select v-model="scope.row.ifInCpOverdueAdjust" :disabled="handleNoClick(scope.row.checkStatus)">
                  <el-option v-for="(item, index) in isJoinOverdueOpts" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="是否计入交易团特装调整笔数" prop="ifInDelegationOverdueAdjust" align="center" width="120">
          <template slot-scope="scope">
            <el-form>
              <el-form-item class="item-Num" prop="ifInDelegationOverdueAdjust">
                <el-select v-model="scope.row.ifInDelegationOverdueAdjust" :disabled="handleNoClick(scope.row.checkStatus)">
                  <el-option v-for="(item, index) in isJoinOverdueOpts" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="审核情况" prop="checkStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleDataPass(scope.row.adjustId, scope.row)" :disabled="handleDisabled(scope.row)">通过</el-button>
              <el-button type="text" @click="openPassDialog(scope.row.adjustId, scope.row)" :disabled="handleDisabled(scope.row)">不通过</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-footer">
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="departList.total">
        </el-pagination>
      </el-row>
      <!-- 不通过弹框 -->
      <el-dialog title="提示" :visible.sync="isPass" v-if="isPass" width="550px">
        <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
          <el-form-item label="审核意见：" prop="examineOpinion">
            <el-input type="textarea" v-model="reasonForm.examineOpinion" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handlePassSave('passReasonForm')">保存</el-button>
            <el-button size="medium" @click="isPass = false;">取消</el-button>
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
    return {
      activeName: 'first',
      loading: '',
      isPass: false,
      type: '',
      isJoinOverdueOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      ifBrandOpts: [{ value: 0, label: '否' }, { value: 1, label: '是' }],
      exhibitionAreaOpts: [],
      boothTypeOpts: [{ value: '01', label: '一般性展位' }, { value: '02', label: '品牌展位' }],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      coceralOpts: [],
      delegationOpts: [],
      companyOpts: [],
      adjustReasonOpts: [{ value: '1', label: '企业申请退回特装展位' }, { value: '2', label: '替换退出特装企业' }, 
      { value: '3', label: '交易团调整安排方案' }, { value: '4', label: '展区展位数量变化引起的调整' }],
      departList: [],
      queryForm: {
        exhibitionArea: '',
        coceralId: '',
        boothType: '',
        companyName: '',
        delegationId: '',
        checkStatus: '',
        ifBrand: ''
      },
      // id临时存储
      idObj: {
        idOne: '',
        idTwo: '',
        row: {}
      },
      // 审核弹框
      reasonForm: {
        ownId: '',
        examineStatus: '',
        examineOpinion: '',
        examineUserId: this.$store.getters.userInfo.userId,
        examineUserCn: this.$store.getters.userInfo.userName
      },
      reasonFormRule: {
        examineOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkFilter: value => {
      switch (value) {
        case '1':
          return '企业申请退回特装展位';
        case '2':
          return '替换退出特装企业';
        case '3':
          return '交易团调整安排方案';
        case '4':
          return '展区展位数量变化引起的调整';
        default:
          return;
      }
    },
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return;
      }
    },
    typeFilter: value => {
      switch (value) {
        case '01':
          return '一般性展位';
        case '02':
          return '品牌展位';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters('checkCompanyNumberReviews', ['departmentApplyData']),
    // 特装
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        coceralId: this.queryForm.coceralId,
        boothType: this.queryForm.boothType,
        delegationId: this.queryForm.delegationId,
        companyName: this.queryForm.companyName,
        checkStatus: this.queryForm.checkStatus,
        ifBrand: this.queryForm.ifBrand,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('checkCompanyNumberReviews', ['getDepartmentApplyList', 'postCheckByDepartment']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 是否已审核
    handleNoClick(id) {
      if (id === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 是否超期填写
    handleDisabled(row) {
      if ((row.ifInCpOverdueAdjust === '0' || row.ifInCpOverdueAdjust === '1') && (row.ifInDelegationOverdueAdjust === '0' || row.ifInDelegationOverdueAdjust === '1')) {
        if (row.checkStatus === '0') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 审核通过
    handleDataPass(idOne, row) {
      let reasonData = JSON.parse(JSON.stringify(this.reasonForm));
      let checkObj = {
        examineLog: {},
        ordinaryAdjustCompany: {}
      };
      let checkList = [];
      reasonData.examineStatus = '1';
      reasonData.ownId = idOne;
      this.$confirm('确定审核通过吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        checkObj.examineLog = reasonData;
        checkObj.ordinaryAdjustCompany = row;
        checkList.push(checkObj);
        this.postCheckByDepartment(checkList).then(() => {
          this.$message.success('操作成功');
          this.createdQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 打开审核弹框
    openPassDialog(idOne, row) {
      this.idObj.idOne = idOne;
      this.idObj.row = row;
      this.isPass = true;
    },
    // 不通过审核保存
    handlePassSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          let reasonData = JSON.parse(JSON.stringify(this.reasonForm));
          let checkObj = {
            examineLog: {},
            ordinaryAdjustCompany: {}
          };
          let checkList = [];
          reasonData.examineStatus = '2';
          reasonData.ownId = this.idObj.idOne;
          checkObj.examineLog = reasonData;
          checkObj.ordinaryAdjustCompany = this.idObj.row;
          checkList.push(checkObj);
          this.postCheckByDepartment(checkList).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('操作成功');
            this.isPass = false;
            this.createdQuery();
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        }
      });
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
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.departList = {};
      this.getDepartmentApplyList(this.formQuery).then(res => {
        this.loading = false;
        this.departList = JSON.parse(JSON.stringify(this.departmentApplyData));
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.add_btn{
  margin-left: 30px;
}
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.pagination-footer{
  margin-top: 20px;
}  
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
