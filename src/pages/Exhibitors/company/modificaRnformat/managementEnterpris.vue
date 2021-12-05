<style>
.wisd{
  width: 150px;
}
</style>
<template>
  <div>
    <el-tabs v-model="activeName" class="businessReview">
      <el-tab-pane label="管理企业信息" name="first"></el-tab-pane>
      <el-form :model="formInline" :label-position="labelPosition" :inline="true" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
        <el-form-item label="代理名称：" prop="name">
          <el-select size="mini" class="wisd" v-model="formInline.agentId" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in agent" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家/地区：" prop="region">
          <el-select size="mini" class="wisd" v-model="formInline.countryRegionId" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in complayNme" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否往届VIP展位：">
          <el-select size="mini" class="wisd" v-model="formInline.isPreVipBooth" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业英文名称：" prop="delivery">
          <el-input size="mini" class="wisd" v-model="formInline.companyNameEn"></el-input>
          <!-- <el-select size="mini" class="wisd" v-model="formInline.region" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="企业编码：" prop="type">
          <el-input size="mini" class="wisd" v-model="formInline.companyId"></el-input>
          <!-- <el-select size="mini" class="wisd" v-model="formInline.region" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="广交会编码：" prop="resource">
          <el-input size="mini" class="wisd" v-model="formInline.cantonCode"></el-input>
          <!-- <el-select size="mini" class="wisd" v-model="formInline.region" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="是否上传营业执照：" prop="desc">
          <el-select size="mini" class="wisd" v-model="formInline.isUploadLicense" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
          <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
        </el-form-item>
        <el-form-item label="是否申请展位：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.isAppliedBooth" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="届数：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.intentionExhSes" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in numberList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否曾获奖：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.isAward" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
            <!-- <el-option label="是" value=""></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="是否上传原产地证明：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.isUploadSource" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否获得展位：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.isGetBooth" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.session" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in bankDepositList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="历届参展记录：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.preExNum" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否往届参展企业：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.isPreCompany" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有不良记录：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.isBadRecord" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域：" prop="resource">
          <el-input size="mini" class="wisd" v-model="formInline.continent"></el-input>
          <!-- <el-select size="mini" class="wisd" v-model="formInline.continent" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="累计参展届数：" prop="resource">
          <el-input size="mini" class="wisd" v-model="formInline.sumOfNum"></el-input>
          <!-- <el-select size="mini" class="wisd" v-model="formInline.region" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="近三年参展记录次数：" prop="resource">
          <el-input size="mini" class="wisd" v-model="formInline.sumOfRecentThreeYear"></el-input>
          <!-- <el-select size="mini" class="wisd" v-model="formInline.region" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="代理审核情况：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.agentApprove" placeholder="请选择" :clearable='true'>
            <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核不通过" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展区：" prop="resource">
          <el-select size="mini" class="wisd" v-model="formInline.applyExArea" placeholder="请选择" :clearable='true'>
            <el-option v-for="(item, index) in applicatArea" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="companyNameCh" label="企业中文名称" align="center">
        </el-table-column>
        <el-table-column prop="companyNameEn" label="企业英文名称" align="center">
        </el-table-column>
        <el-table-column prop="crChName" label="国家/地区" align="center">
        </el-table-column>
        <el-table-column prop="isEnabled" label="状态" align="center">
          <template slot-scope="scope">
              {{ scope.row.isEnabled | statusFilter }}
            </template>
        </el-table-column>
        <el-table-column  label="操作" align="center" width="280">
          <template slot-scope="scope">
            <div class="bm bm-pc">
              <el-button type="text"  @click="compile(scope.row, scope.$index)" >编辑</el-button>
              <el-button type="text"  @click="onServe(scope.row, scope.$index, 'editref')">查看</el-button>
              <!-- :disabled="scope.row.examineStatus === '1'" -->
              <el-button  type="text" @click="account(scope.row)">启用此账户</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfoData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfoData.total">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      labelPosition: 'right',
      activeName: 'first',
      dataList: [],
      formInline: {
        agentId: '',             // 代理id：
        countryRegionId: '',     // 国家地区：
        isPreVipBooth: '',       // 是否往届vip展位：
        companyNameEn: '',       // 企业英文名称：
        companyId: '',           // 企业编码：
        cantonCode: '',          // 广交会编码：
        isUploadLicense: '',     // 是否上传营业执照：
        isAppliedBooth: '',      // 是否申请展位：
        intentionExhSes: '',     // 届数：
        isAward: '',             // 是否曾获奖：
        isUploadSource: '',      // 是否上传原产地证明：
        isGetBooth: '',          // 是否获得展位：
        session: '',             // 期数：
        preExNum: '',            // 历届参展记录：
        isPreCompany: '',        // 是否往届参展企业：
        isBadRecord: '',         // 是否有不良记录：
        continent: '',           // 区域：
        sumOfNum: '',            // 累计参展届数：
        sumOfRecentThreeYear: '',  // 近三年参展次数：
        agentApprove: '',        // 代理审核情况：
        applyExArea: '',         // 申请展区：
        current: 1,             // 当前页：必传
        size: 10,                // 每页条数：必传
        orderByField: 'company.create_date',        // 排序字段： 必传
        isAsc: false                // 排序方式：必传
      },
      rules: {},
      pageInfoData: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      },
      tableData: [],
      bankDepositList: [],   // 期数
      applicatArea: [],      // 展区
      complayNme: [],        // 国家
      agent: [],             // 招展代理
      numberList: []         // 获取所有届数
    };
  },
  filters: {
    statusFilter: value => {
      switch (value) {
        case 0:
          return '未审核';
        case 1:
          return '审核不通过';
        case 2:
          return '审核通过';
        default:
          return;
      }
    }
  },
  async created() {
    this.bankDepositList = await kindo.dictionary.get('ifoExhibitionSession'); // 期数
    this.applicatArea = await kindo.dictionary.get('ifoExhibitionArea');  // 展区
    // 查询国家
    this.getsearchCountries().then(res => {
      this.complayNme = [];
      res.forEach(el => {
        let obj = {
          label: el.crChName,
          value: el.countryRegionId
        };
        this.complayNme.push(obj);
      });
    });
    // 初始化数据
    this.handelGetEnterpriseQuery(this.formInline);
    // 获取所有招展代理
    this.getRecruitAgents().then(res => {
      this.agent = [];
      res.forEach(el => {
        let obj = {
          label: el.agentCh,
          value: el.exhibitionAgentId
        };
        this.agent.push(obj);
      });
      
    });
    // 获取所有届数
    this.getDataHuenumber().then(res => {
      this.numberList = [];
      res.forEach(el => {
        let obj = {
          label: el.exhibitionNum,
          value: el.exhibitionNum
        };
        this.numberList.push(obj);
      });
    });
  },
  methods: {
    ...mapActions("modificaRnformat", [
      "getEnterpriseQuery",   // 企业列表查询
      "getRecruitAgents"      // 获取所有招展代理
    ]),
    ...mapActions("managemeAgentnt", [
      "getsearchCountries",      // 查询国家
      "getDataHuenumber"         // 获取所有届数
    ]),
    // 初始化数据
    handelGetEnterpriseQuery(obj) {
      this.getEnterpriseQuery(obj).then(res => {
        // console.log(res, 'res8520');
        this.tableData = res.records;
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.total = res.total;
        
      });
    },
    // 查询
    submitForm() {
      this.handelGetEnterpriseQuery(this.formInline);
    },
    // 分页
    handleSizeChange(val) {
      this.formInline.size = val;
      this.handelGetEnterpriseQuery(this.formInline);
    },
    // 分页按钮
    handleCurrentChange(val) {
      this.formInline.current = val;
      this.handelGetEnterpriseQuery(this.formInline);
    },
    // 编辑
    compile(data) {
      this.$router.push({
        path: '/managementEnterpriseRnformat',
        query: data
      });
    },
    // 查看
    onServe(data) {
      this.$router.push({
        path: '/viewEnterprise',
        query: data
      });
    },
    // 启用此账户
    account() {}
  }
};
</script>
