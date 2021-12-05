<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="商协会审核" name="first">
      <el-tabs type="border-card" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="审核特装展位数量调整申请" name='TZ'>
          <el-form :model="queryFormTZ" :inline="true">
            <el-form-item label="申请展区">
              <el-select v-model="queryFormTZ.exhibitionArea" clearable>
                <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广交会编码">
              <el-input placeholder="请输入" v-model.trim="queryFormTZ.cecfCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否列入特装超期更改" label-width="180px">
              <el-select v-model="queryFormTZ.isJoinOverdue" clearable>
                <el-option v-for="(item, index) in isJoinOverdueOpts" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input placeholder="请输入" v-model.trim="queryFormTZ.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="调整原因">
              <el-select v-model="queryFormTZ.adjustReason" clearable>
                <el-option v-for="(item, index) in adjustReasonOpts" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="queryBtn">
              <el-button type="primary" @click="handleQuery('TZ')">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table class="company_apply_table" :data="tzData.records" v-loading="loading" border>
            <el-table-column label="广交会编码" prop="cecfCode" align="center"></el-table-column>
            <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
            <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
            <el-table-column label="原推荐特装数" prop="originalRecommend" align="center"></el-table-column>
            <el-table-column label="申请调整后推荐数" prop="adjustedNumber" align="center"></el-table-column>
            <el-table-column label="调整原因" prop="adjustReason" align="center">
              <template slot-scope="scope">
                {{ scope.row.adjustReason | checkFilter }}
              </template>
            </el-table-column>
            <el-table-column label="是否特装超期更改" prop="isJoinOverdue" align="center">
              <template slot-scope="scope">
                {{ scope.row.isJoinOverdue === '0' ? '否' : (scope.row.isJoinOverdue === '1' ? '是' : '') }}
              </template>
            </el-table-column>
            <el-table-column label="审核是否特装超期更改" prop="checkIsJoinOverdue" align="center">
              <template slot-scope="scope">
                <el-form>
                  <el-form-item class="item-Num" prop="checkIsJoinOverdue">
                    <el-select v-model="scope.row.checkIsJoinOverdue" :disabled="handleNoClick(scope.row.checkStatus)">
                      <el-option v-for="(item, index) in isJoinOverdueOpts" :key="index" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="产品类别" prop="productType" align="center"></el-table-column>
            <el-table-column label="企业所属贫困县" prop="poorArea" align="center"></el-table-column>
            <el-table-column label="材料（企业来函等）" prop="material" align="center">
              <template slot-scope="scope">
                <a href="javascript:;" v-if="scope.row.material">查看</a>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="checkStatus" align="center">
              <template slot-scope="scope">
                {{ scope.row.checkStatus | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.checkStatus === '0'">
                  <el-button type="text" @click="handleDataPass('TZ', scope.row.adjustId, scope.row)" :disabled="handleDisabled(scope.row.checkIsJoinOverdue, scope.row.checkStatus)">通过</el-button>
                  <el-button type="text" @click="openPassDialog('TZ', scope.row.adjustId, scope.row)" :disabled="handleDisabled(scope.row.checkIsJoinOverdue, scope.row.checkStatus)">不通过</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" class="pagination-footer">
            <el-pagination 
              @size-change="val => handleSizeChange(val, 'TZ')"
              @current-change="val => handleCurrentChange(val, 'TZ')"
              :current-page="pageInfoTZ.currentPage"
              :page-size="pageInfoTZ.pageSize"
              :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="ordinaryAdjustData.total">
            </el-pagination>
          </el-row>
          <!-- 不通过弹框 -->
          <el-dialog title="提示" :visible.sync="isPass" v-if="isPass" width="550px">
            <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
              <el-form-item label="审核意见：" prop="examineOpinion">
                <el-input type="textarea" v-model="reasonForm.examineOpinion" :rows="4" maxlength="60"></el-input>
              </el-form-item>
              <div class="dialog-footer">
                <el-button type="primary" size="medium" @click="handlePassSave('TZ', 'passReasonForm')">保存</el-button>
                <el-button size="medium" @click="isPass = false;">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="审核非特装展位数量调整申请" name="BT">
          <el-form :model="queryFormBT" :inline="true">
            <el-form-item label="申请展区">
              <el-select v-model="queryFormBT.exhibitionArea" clearable>
                <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广交会编码">
              <el-input placeholder="请输入" v-model.trim="queryFormBT.cecfCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input placeholder="请输入" v-model.trim="queryFormBT.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery('BT')">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table class="company_apply_table" :data="btData.records" v-loading="loading" border>
            <el-table-column label="广交会编码" prop="cecfCode" align="center"></el-table-column>
            <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
            <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
            <el-table-column label="布展类型" prop="exhibitionType" align="center">
              <template slot-scope="scope">
                {{ scope.row.exhibitionType | exhibitionTypeFilter }}
              </template>
            </el-table-column>
            <el-table-column label="原推荐数" prop="originalRecommend" align="center"></el-table-column>
            <el-table-column label="现推荐数" prop="adjustedNumber" align="center"></el-table-column>
            <el-table-column label="产品类别" prop="productType" align="center"></el-table-column>
            <el-table-column label="企业所属贫困县" prop="poorArea" align="center"></el-table-column>
            <el-table-column label="材料（企业来函等）" prop="material" align="center">
              <template slot-scope="scope">
                <a href="javascript:;" v-if="scope.row.material">查看</a>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="checkStatus" align="center">
              <template slot-scope="scope">
                {{ scope.row.checkStatus | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.checkStatus === '0'">
                  <el-button type="text" @click="handleDataPass('BT', scope.row.adjustId, scope.row)" :disabled="handleDisabled('', scope.row.checkStatus)">通过</el-button>
                  <el-button type="text" @click="openPassDialog('BT', scope.row.adjustId, scope.row)" :disabled="handleDisabled('', scope.row.checkStatus)">不通过</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" class="pagination-footer">
            <el-pagination 
              @size-change="val => handleSizeChange(val, 'BT')"
              @current-change="val => handleCurrentChange(val, 'BT')"
              :current-page="pageInfoBT.currentPage"
              :page-size="pageInfoBT.pageSize"
              :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="ordinaryAdjustData.total">
            </el-pagination>
          </el-row>
          <!-- 不通过弹框 -->
          <el-dialog title="提示" :visible.sync="isPassBT" v-if="isPassBT" width="550px">
            <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
              <el-form-item label="审核意见：" prop="examineOpinion">
                <el-input type="textarea" v-model="reasonForm.examineOpinion" :rows="4" maxlength="60"></el-input>
              </el-form-item>
              <div class="dialog-footer">
                <el-button type="primary" size="medium" @click="handlePassSave('BT', 'passReasonForm')">保存</el-button>
                <el-button size="medium" @click="isPassBT = false;">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
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
      activeTab: 'TZ',
      loading: '',
      isPass: false,
      type: '',
      isJoinOverdueOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      exhibitionAreaOpts: [],
      cecfCodeOpts: [],
      companyOpts: [],
      adjustReasonOpts: [{ value: '1', label: '企业申请退回特装展位' }, { value: '2', label: '替换退出特装企业' }, 
      { value: '3', label: '交易团调整安排方案' }, { value: '4', label: '展区展位数量变化引起的调整' }],
      // 特装
      tzData: {},
      queryFormTZ: {
        exhibitionArea: '',
        cecfCode: '',
        isJoinOverdue: '',
        coceralId: this.$store.getters.userInfo.org.deptId,
        adjustReason: '',
        companyName: '',
        flag: '1'
      },
      // id临时存储
      idObj: {
        idOne: '',
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
      // 标摊
      btData: {},
      isPassBT: false,
      cecfCodeOptsBT: [],
      queryFormBT: {
        exhibitionArea: '',
        cecfCode: '',
        coceralId: this.$store.getters.userInfo.org.deptId,
        companyName: '',
        flag: '2'
      },
      pageInfoTZ: { currentPage: 1, pageSize: 10 },
      pageInfoBT: { currentPage: 1, pageSize: 10 }
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
    exhibitionTypeFilter: value => {
      switch (value) {
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        case 'SPECIAL_BOOTH':
          return '特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
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
    }  
  },
  computed: {
    ...mapGetters('checkCompanyNumberReviews', ['ordinaryAdjustData']),
    // 特装
    formQueryTZ() {
      return {
        exhibitionArea: this.queryFormTZ.exhibitionArea,
        cecfCode: this.queryFormTZ.cecfCode,
        coceralId: this.queryFormTZ.coceralId,
        isJoinOverdue: this.queryFormTZ.isJoinOverdue,
        adjustReason: this.queryFormTZ.adjustReason,
        companyName: this.queryFormTZ.companyName,
        exhibitionType: 'SPECIAL_BOOTH',
        flag: this.queryFormTZ.flag,
        current: this.pageInfoTZ.currentPage,
        size: this.pageInfoTZ.pageSize
      };
    },
    // 标摊
    formQueryBT() {
      return {
        exhibitionArea: this.queryFormBT.exhibitionArea,
        cecfCode: this.queryFormBT.cecfCode,
        coceralId: this.queryFormBT.coceralId,
        companyName: this.queryFormBT.companyName,
        exhibitionType: '',
        flag: this.queryFormBT.flag,
        current: this.pageInfoBT.currentPage,
        size: this.pageInfoBT.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery('TZ', this.formQueryTZ);
  },
  methods: {
    ...mapActions('checkCompanyNumberReviews', ['getOrdinaryAdjustCompany', 'postCheckByDelegation']),
    ...mapActions('nainformation', ['getexhibitionArea']),
    // 标签页切换
    handleTabClick(tab) {
      // 展区
      this.getexhibitionArea().then(res => {
        this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      if (tab.name === 'TZ') {
        this.createdQuery(tab.name, this.formQueryTZ);
      } else if (tab.name === 'BT') {
        this.createdQuery(tab.name, this.formQueryBT);
      }
    },
    // 是否已审核
    handleNoClick(id) {
      if (id === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 是否超期填写
    handleDisabled(status, id) {
      if (status === '') {
        if (id === '0') {
          return false;
        } else {
          return true;
        }
      } else if (status === '0' || status === '1') {
        if (id === '0') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 审核通过
    handleDataPass(type, idOne, row) {
      let reasonData = this.reasonForm;
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
        this.postCheckByDelegation(checkList).then(() => {
          this.$message.success('操作成功');
          if (type === 'TZ') {
            this.createdQuery(type, this.formQueryTZ);
          } else if (type === 'BT') {
            this.createdQuery(type, this.formQueryBT);
          }
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 打开审核弹框
    openPassDialog(type, idOne, row) {
      this.idObj.idOne = idOne;
      this.idObj.row = row;
      if (type === 'TZ') {
        this.isPass = true;
      } else if (type === 'BT') {
        this.isPassBT = true;
      }
    },
    // 不通过审核保存
    handlePassSave(type, formName) {
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
          this.postCheckByDelegation(checkList).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('操作成功');
            if (type === 'TZ') {
              this.isPass = false;
              this.createdQuery('TZ', this.formQueryTZ);
            } else if (type === 'BT') {
              this.isPassBT = false;
              this.createdQuery('BT', this.formQueryBT);
            }
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 查询
    handleQuery(type) {
      if (type === 'TZ') {
        this.pageInfoTZ.currentPage = 1;
        this.createdQuery(type, this.formQueryTZ);
      } else if (type === 'BT') {
        this.pageInfoBT.currentPage = 1;
        this.createdQuery(type, this.formQueryBT);
      }
    },
    // 操作页面
    handleCurrentChange(val, type) {
      if (type === 'TZ') {
        this.pageInfoTZ.currentPage = val;
        this.createdQuery(type, this.formQueryTZ);
      } else if (type === 'BT') {
        this.pageInfoBT.currentPage = val;
        this.createdQuery(type, this.formQueryBT);
      }
    },
    handleSizeChange(val, type) {
      if (type === 'TZ') {
        this.pageInfoTZ.pageSize = val;
        this.createdQuery(type, this.formQueryTZ);
      } else if (type === 'BT') {
        this.pageInfoBT.pageSize = val;
        this.createdQuery(type, this.formQueryBT);
      }
    },
    // 查询封装
    createdQuery(type, formQuery) {
      this.loading = true;
      this.btData = {};
      this.tzData = {};
      this.getOrdinaryAdjustCompany(formQuery).then(data => {
        this.loading = false;
        if (type === 'TZ') {
          this.tzData = JSON.parse(JSON.stringify(this.ordinaryAdjustData));
        } else if (type === 'BT') {
          this.btData = JSON.parse(JSON.stringify(this.ordinaryAdjustData));
        }
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
