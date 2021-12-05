<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="查看商协会提交方案" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyCode" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, key) in coceralOpts" :key="key" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>  
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="trade-table" :data="submitPlanData.records" v-loading="loading" border>
        <el-table-column align="center" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="交易团" prop="dealClusterName"></el-table-column>
        <el-table-column align="center" label="商协会" prop="coceralName"></el-table-column>
        <el-table-column align="center" label="申请展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="申请品牌展位数" prop="applyBoothNumber"></el-table-column>
        <el-table-column align="center" label="总分" prop="coceralTotalGrade"></el-table-column>
        <el-table-column align="center" label="是否符合品牌展位申请条件" prop="boothApplyCondition">
          <template slot-scope="scope">
            {{ scope.row.boothApplyCondition === '0' ? '否' : (scope.row.boothApplyCondition === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="出口额">
          <el-table-column align="center" label="占所属大类出口额比例" prop="exportRatio"></el-table-column>
          <el-table-column align="center" label="商协会评分" prop="coceralExportScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="行业自律">
          <el-table-column align="center" label="评分" prop="selfDisciplineScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌建设">
          <el-table-column align="center" label="是否进入外贸转型升级基地" prop="isUpgrade">
            <template slot-scope="scope">
              {{ scope.row.isUpgrade === 0 ? '否' : (scope.row.isUpgrade === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="建设国际营销服务体系数量" prop="systemNumber"></el-table-column>
          <el-table-column align="center" label="是否参加境外品牌展" prop="isJoinOutside">
            <template slot-scope="scope">
              {{ scope.row.isJoinOutside === 0 ? '否' : (scope.row.isJoinOutside === 1 ? '是' : '') }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="brandBuildScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="专利与版权">
          <el-table-column align="center" label="发明专利数" prop="inventPatent"></el-table-column>
          <el-table-column align="center" label="实用新型专利数" prop="practicalPatent"></el-table-column>
          <el-table-column align="center" label="外观专利数" prop="appearancePatent"></el-table-column>
          <el-table-column align="center" label="版权数" prop="copyrightNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="patentsScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国家级高新技术企业">
          <el-table-column align="center" label="称号数" prop="newHighNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="newHighScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国家或行业标准">
          <el-table-column align="center" label="数量" prop="standardNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="standardScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="质量/环境管理体系认证">
          <el-table-column align="center" label="数量" prop="qualityNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="qualityScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="面向企业的行业认证">
          <el-table-column align="center" label="数量" prop="industryNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="industryScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="面向产品/生产线的行业认证">
          <el-table-column align="center" label="数量" prop="productionNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="productionScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境内商标">
          <el-table-column align="center" label="数量" prop="territoryNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="territoryScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境外商标">
          <el-table-column align="center" label="数量" prop="beyondNumber"></el-table-column>
          <el-table-column align="center" label="得分" prop="beyondScore"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="广交会表现" prop="telephone"></el-table-column>
        <el-table-column align="center" label="是否使用母子公司资质" prop="isMotherChildAptitude">
          <template slot-scope="scope">
            {{ scope.row.isMotherChildAptitude === '0' ? '否' : (scope.row.isMotherChildAptitude === '1' ? '是' : '') }}
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="danger" size="medium" @click="saveOpen">保存</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="submitPlanData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
      <!-- 保存弹框 -->
      <el-dialog title="保存" :visible.sync="saveDialog" v-if="saveDialog" width="30%">
        <el-form class="saveForm" :model="saveObj" ref="saveForm" :rules="saveRule">
          <el-form-item label="商协会：" prop="coceralId">
            <el-select v-model="saveObj.coceralId" @change="handleSaveCoceralChange">
              <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保存为：" prop="whichPlan">
            <el-select v-model="saveObj.whichPlan" @change="handleSaveCoceralChange">
              <el-option v-for="(item, index) in whichPlanOpts" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <p>上次保存时间：{{ saveObj.lastDate }}</p>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handleSave('saveForm')">保存</el-button>
            <el-button size="medium" @click="saveDialog = false;">取消</el-button>
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
      saveDialog: false,
      exhibitionAreaOpts: [],
      coceralOpts: [],
      companyOpts: [],
      delegationOpts: [],
      whichPlanOpts: [{ value: 1, label: '方案一' }, { value: 2, label: '方案二' }, { value: 3, label: '方案三' }],
      queryForm: {
        exhibitionArea: '', // 展区id
        cantonFairCode: '', // 广交会编码
        coceralId: '', // 商协会id
        companyCode: '', // 企业id
        dealClusterId: '' // 交易团id
      },
      saveObj: {
        coceralId: '',
        whichPlan: 1,
        lastDate: ''
      },
      saveRule: {
        coceralId: [{ required: true, message: '请选择', trigger: 'change' }],
        whichPlan: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['submitPlanData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea, 
        cantonFairCode: this.queryForm.cantonFairCode,
        coceralId: this.queryForm.coceralId,
        companyCode: this.queryForm.companyCode, 
        dealClusterId: this.queryForm.dealClusterId,
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
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.loading = true;
    this.getSeeSubmitPlanQuery().then(res => {
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('checkRecommendCompany', ['getSeeSubmitPlanQuery', 'getSeeSubmitPlan', 'getLastSaveTime', 'postWorkDeptSave']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 打开保存弹框
    saveOpen() {
      this.saveObj = {
        coceralId: '',
        whichPlan: 1,
        lastDate: '无'
      };
      this.saveDialog = true;
    },
    // 保存商协会改变
    handleSaveCoceralChange(val) {
      if (val !== '') {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getLastSaveTime(this.saveObj).then(res => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.saveObj.lastDate = res;
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }
    },
    // 点击保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postWorkDeptSave(this.saveObj).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('保存成功');
            this.saveDialog = false;
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
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getSeeSubmitPlan(this.formQuery).then(() => {
        this.loading = false;
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
.utils-button, .pagination-container{
  margin-top: 20px;
} 
.saveForm >>> .el-form-item{
  margin-bottom: 22px !important;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
