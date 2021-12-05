<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="企业资质复核" name="first">
      <el-form :model="queryFormCheck" :inline="true" label-width="110px">
        <el-form-item label="展区">
          <el-select v-model="queryFormCheck.exhibitionArea" @change="handleProductAreaQuery">
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品专区">
          <el-select v-model="queryFormCheck.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属交易团">
          <el-select v-model="queryFormCheck.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团审核结果">
          <el-select v-model="queryFormCheck.clusterCheckStatus" clearable>
            <el-option v-for="item in clusterCheckStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团是否推荐" label-width="120px">
          <el-select v-model="queryFormCheck.recommendStatus" clearable>
            <el-option v-for="item in chooseOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商会是否推荐" label-width="120px">
          <el-select v-model="queryFormCheck.isRecommend" clearable>
            <el-option v-for="item in chooseOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryFormCheck.cecfCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryFormCheck.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="上届是否参展">
          <el-select v-model="queryFormCheck.ifLastJoin" clearable>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="queryFormCheck.checkStatus" clearable>
            <el-option v-for="item in checkStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery('check')">查询</el-button>
          <el-button type="primary" @click="openUpload">上传</el-button>
        </el-form-item>
      </el-form>
      <el-table class="trade-table" :data="checkAptitudeData.records" height="550" v-loading="loading" border>
        <!-- <el-table-column label="企业基本资料" align="center"> -->
        <el-table-column fixed label="广交会编码" prop="cecfCode" min-width="120px" align="center"></el-table-column>
        <el-table-column fixed label="企业名称" prop="companyName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="审核情况" prop="checkStatus" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="是否符合展位使用条件" prop="ifMeetCondition" min-width="120px" align="center">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.ifMeetCondition" @change="handleRadioChange(scope.row, '1')" label="1">符合</el-radio>
            <el-radio v-model="scope.row.ifMeetCondition" @change="handleRadioChange(scope.row, '2')" label="2">不符合</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="所属交易团" prop="delegationName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="交易团审核结果" prop="clusterCheckStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.clusterCheckStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="企业类型" prop="companyType" min-width="150px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="companyTypeCheck" :rules="checkRules">
                <el-form-item class="item-Num" prop="companyType">
                  <el-select v-model="scope.row.companyType">
                    <el-option v-for="(item, index) in companyTypeCheckOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="!scope.row.edit">{{ scope.row.companyType | companyTypeFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展品专区" prop="productTypeName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="主要展示产品" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.mainProductCodeList ? (scope.row.mainProductCodeList.length > 0 ? scope.row.mainProductCodeList[0].productName : '') : '' }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="主要展示产品2" align="center">
          <template slot-scope="scope">
            {{ scope.row.mainProductCodeList ? (scope.row.mainProductCodeList.length > 1 ? scope.row.mainProductCodeList[1].productName : '') : '' }}
          </template>
        </el-table-column> -->
        <el-table-column label="上届是否参展" min-width="120px" prop="ifLastJoin" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="上届展位数" prop="boothNumberLast" min-width="120px" align="center"></el-table-column>
        <el-table-column label="本届申请展位数" prop="boothNumber" min-width="140px" align="center"></el-table-column>
        <el-table-column label="本届申请布展类型" prop="exhibitionType" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.exhibitionType | typeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核展位需求" prop="boothNumberDemand" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.clusterCheckStatus === '1'">
              <div v-if="scope.row.boothNumberDemand">{{ scope.row.boothNumberDemand }}</div>
              <div v-if="!scope.row.boothNumberDemand">{{ scope.row.boothNumber }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="交易团审核布展类型" prop="boothTypeDemand" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.clusterCheckStatus === '1'">
              <div v-if="scope.row.boothTypeDemand">{{ scope.row.boothTypeDemand | typeFilter }}</div>
              <div v-if="!scope.row.boothTypeDemand">{{ scope.row.exhibitionType | typeFilter }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="营业执照" prop="enterpriseCheckStatus" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.enterpriseCheckStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="进出口资格证明" prop="certificateCheckStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.certificateCheckStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="已审核通过的海关编码" prop="checkedCustomsCode" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.customsCodeList" v-for="(item, index) in scope.row.customsCodeList">
              <div v-if="item.workCheckCustomsStatus === '1'">{{ item.customsCode }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column key="1" label="企业国内销售额（万人民币）" prop="salesVolume" min-width="120px" align="center"></el-table-column>
        <el-table-column key="2" label="企业总出口额参数" prop="totalExportVolume" min-width="120px" align="center"></el-table-column>
        <el-table-column key="3" label="企业展区出口额参数" prop="exhibitionAreaExportVolume" min-width="120px" align="center"></el-table-column>
        <el-table-column key="4" v-if="queryFormChange.exhibitionArea === 'CG06'" label="企业宠物食品类商品出口额参数" prop="peetFoodExportVolume" min-width="180px" align="center"></el-table-column>
        <el-table-column key="5" v-if="queryFormChange.exhibitionArea === 'CG06'" label="唯一专属宠物用品类的HS编码（42010000）下出口额参数" prop="peetCodeExportVolume" min-width="280px" align="center"></el-table-column>
        <el-table-column label="资质条件总数（商标、专利、行业认证）" prop="totalQualification" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.totalQualification }}</div>
          </template>
        </el-table-column>
        <el-table-column label="境外注册商标数" prop="outside" min-width="140px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.outside }}</div>
          </template>
        </el-table-column>
        <el-table-column label="专利证明数" prop="innovateProperty" min-width="140px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.innovateProperty }}</div>
          </template>
        </el-table-column>
        <el-table-column label="国际通行认证数" prop="international" min-width="140px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.international }}</div>
          </template>
        </el-table-column>
        <el-table-column label="国家高新技术企业" prop="highTechnology"  min-width="160px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.highTechnology }}</div>
          </template>
        </el-table-column>
        <el-table-column label="参与国家或行业标准制定" prop="standardInfo"  min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.standardInfo }}</div>
          </template>
        </el-table-column>
        <el-table-column label="近两年参加过的国际专业展" prop="history"  min-width="160px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.history }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="queryFormChange.exhibitionArea === 'NE01'" label="近两年参与商务部组织对外经济合作/援助项目" prop="actorProject"  min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qualification">{{ scope.row.qualification.actorProject }}</div>
          </template>
        </el-table-column>
        <el-table-column label="交易团是否推荐" prop="recommendStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.recommendStatus | chooseFilter }}
          </template>
        </el-table-column>
        <el-table-column label="商会是否推荐" prop="isRecommend" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.isRecommend | chooseFilter }}
          </template>
        </el-table-column>
        <el-table-column label="审核人" prop="checkPerson" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <div><el-button type="text" @click="goCheck(scope.row)">审核</el-button></div>
            <div><el-button type="text" @click="toEdit(scope.$index, scope.row)">编辑</el-button></div>
            <div><el-button type="text" @click="toSave(scope.$index, scope.row)" :disabled="!scope.row.edit">保存</el-button></div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleIfMeet('1')">批量符合</el-button>
          <el-button type="primary" size="medium" @click="handleIfMeet('2')">批量不符合</el-button>
          <el-button type="primary" size="medium" @click="handleCheckDownload">下载</el-button>
        </span>
        <el-pagination 
          @size-change="val => handleSizeChange(val, 'check')"
          @current-change="val => handleCurrentChange(val, 'check')"
          :current-page="pageInfoCheck.currentPage"
          :page-size="pageInfoCheck.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="checkAptitudeData.total">
        </el-pagination>
      </el-row>
      <!-- 上传 -->
      <el-dialog title="上传" :visible.sync="isUp" v-if="isUp">
        <el-form :model="fileForm" ref="fileForm" :rules="fileRule">
          <el-form-item label="文件选择：" prop="chooseFileName">
            <el-upload ref="upload" action="" accept=".xls, .xlsx" :http-request="handleUploadFile" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
              <el-input placeholder="请选择文件" v-model="fileForm.chooseFileName" readonly></el-input>
              <div slot="tip" class="el-upload__tip">只能上传 xls / xlsx 文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="模板下载：">
            <a href="javascript:;" @click="handleDownloadTemplate">模板文件点击下载</a>
          </el-form-item>
        </el-form>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="toUpload('fileForm')">上传</el-button>
          <el-button size="medium" @click="isUp = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      activeTab: '1',
      loading: '',
      store,
      // 上传
      isUp: false,
      fileForm: {
        chooseFileName: '' // 文件选择名称
      },
      fileRule: {
        chooseFileName: [{ required: true, message: '请选择需上传的文件', trigger: 'change' }]
      },
      //企业类型编辑
      companyTypeOpts: [],
      companyTypeCheckOpts: [],
      lastIndex: [],
      lastCheckAptitudeData: [],
      rulesList: ['companyTypeCheck'],
      checkRules: {
        companyType: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      // 展区交换
      queryFormChange: {
        exhibitionArea: 'NE01'
      },
      exhibitionAreaOpts: [],
      coceralOpts: [],
      companyOpts: [],
      exhibitionTypeOpts: [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' }, 
      { value: 'CENTER_CHANNEL_BOOTH', label: '中央通道' }, { value: 'UNIFICATION_BOOTH', label: '统一布展' }],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      productTypeOpts: [],
      ifMeetConditionOpts: [{ value: '1', label: '符合' }, { value: '2', label: '不符合' }],
      queryForm: {
        exhibitionArea: '',
        coceralId: '',
        companyName: '',
        exhibitionType: '',
        cecfCode: '',
        checkStatus: '',
        productType: '',
        ifMeetCondition: ''
      },
      // 复核
      delegationOpts: [],
      chooseList: [{ value: '否', label: '否' }, { value: '是', label: '是' }], // 是否选项
      selectList: [{ value: '否', label: '否' }, { value: '是', label: '是' }, { value: '无', label: '无' }], // 是否无选项
      isProductSameWithMaterialList: [{ value: '是', label: '是' }, { value: '否', label: '否' }, { value: '未提交产品资料', label: '未提交产品资料' }], // 企业登记展品是否与提交材料一致
      specificProveEvidenceList: [{ value: '企业增值税申报表', label: '企业增值税申报表' }, { value: '税务部门函件', label: '税务部门函件' }, 
      { value: '增值税发票', label: '增值税发票' }, { value: '其他无效证明', label: '其他无效证明' }, { value: '无', label: '无' }], // 具体证明材料
      chooseOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      clusterCheckStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      queryFormCheck: {
        exhibitionArea: 'NE01',
        clusterCheckStatus: '',
        recommendStatus: '',
        delegationId: '',
        productType: '',
        isRecommend: '',
        cecfCode: '',
        ifMeetCondition: '',
        companyName: '',
        ifLastJoin: '',
        checkStatus: ''
      },
      checkAptitudeData: {},
      checkCode: '', // 修改后的经审核后海关编码
      exhibitionArea: [],
      pageInfoCheck: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    // 企业类型
    companyTypeFilter: value => {
      let companyTypeOptsw = kindo.dictionary.get('companyType');
      for (let i = 0; i < companyTypeOptsw.length; i++) {
        if (value === companyTypeOptsw[i].value) {
          return companyTypeOptsw[i].label;
        }
      }
    },
    // 公司关系
    relationshipFilter: value => {
      switch (value) {
        case 'ENTERPRISE':
          return '本企业';
        case 'SUBSIDARYCOMPANY':
          return '全资子公司';
        case 'HOLDCOMPANY':
          return '控股子公司';  
        default:
          return;
      }
    },
    typeFilter: value => {
      switch (value) {
        case 'SPECIAL_BOOTH':
          return '绿色特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        default:
          return;
      }
    },
    statusFilter: value => {
      let val = value + '';
      switch (val) {
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
    // checkFilter: value => {
    //   let val = value + '';
    //   switch (val) {
    //     case '0':
    //       return '未审核';
    //     case '1':
    //       return '已审核';
    //     default:
    //       return;
    //   }
    // },
    // 是否
    chooseFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters('newThemeWorkDepartCheckNumber', ['boothUseCheckData', 'aptitudeCheckData']),
    formQueryCheck() {
      return {
        exhibitionArea: this.queryFormCheck.exhibitionArea,
        clusterCheckStatus: this.queryFormCheck.clusterCheckStatus,
        recommendStatus: this.queryFormCheck.recommendStatus,
        companyName: this.queryFormCheck.companyName,
        cecfCode: this.queryFormCheck.cecfCode,
        isRecommend: this.queryFormCheck.isRecommend,
        productType: this.queryFormCheck.productType,
        ifMeetCondition: this.queryFormCheck.ifMeetCondition,
        delegationId: this.queryFormCheck.delegationId,
        ifLastJoin: this.queryFormCheck.ifLastJoin,
        checkStatus: this.queryFormCheck.checkStatus,
        current: this.pageInfoCheck.currentPage,
        size: this.pageInfoCheck.pageSize
      };
    }
  },
  async created() {
    this.exhibitionAreaOpts = [];
    // 展区
    this.getexhibitionArea().then(resa => {
      this.exhibitionArea = JSON.parse(JSON.stringify(resa));
      // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      // 新题材展区
      this.getexhibitionAreaDTOList().then(res => {
        this.arr = JSON.parse(JSON.stringify(res.records));
        this.arr.forEach((item, index, ar) => {
          if (item.isNewThemeArea) { // 是新题材
            for (let i = 0; i < this.exhibitionArea.length; i++) {
              if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                let exare = {
                  exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                  exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                };
                this.exhibitionAreaOpts.push(exare);
              }
            }
          }
        });
      });
    }).catch(e => {});
    // 数组去重
    let hash = {};
    this.exhibitionAreaOpts = this.exhibitionAreaOpts.reduce(function(item, next) {
      hash[next.exhibitionAreaCode] ? '' : hash[next.exhibitionAreaCode] = true && item.push(next);
      return item;
    }, []);
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.handleProductAreaQuery(this.queryFormCheck.exhibitionArea);
    if (this.$route.query.form) {
      this.queryFormCheck = this.$route.query.form;
      this.pageInfoCheck = this.$route.query.page;
    }
    this.companyTypeOpts = await kindo.dictionary.get('companyType');
    this.originQuery('');
  },
  mounted() {
    this.$nextTick(() => {
      for (let i = 0, l = this.companyTypeOpts.length; i < l; i++) {
        if (this.companyTypeOpts[i].label === '生产企业' || this.companyTypeOpts[i].label === '外贸企业' || this.companyTypeOpts[i].label === '工贸企业') {
          this.companyTypeCheckOpts.push(this.companyTypeOpts[i]);
        }
      }
    });
  },
  methods: {
    ...mapActions('newThemeWorkDepartCheckNumber', ['getBoothUseCheckByWork', 'getAptitudeCheckByWorkDepartment',
      'postAptitudeCheckByWorkDepartmentAdd', 'postAptitudeCheckByWorkDepartmentUpdate', 'postDepartCheckFileUpload', 'postCheckBoothUsedByWorkDepart']),
    ...mapActions('newThemeCheckRecommendCompany', ['postSaveCompanyInfo']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList']),
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      this.queryForm.productType = '';
      this.queryFormCheck.productType = '';
      this.productTypeOpts = [];
      if (val) {
        // let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          // this.$nextTick(() => { 
          //   fullScreenloading.close();
          // });
          this.productTypeOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          // this.$nextTick(() => { 
          //   fullScreenloading.close();
          // });
        });
      }
    },
    // 符合状态改变
    handleRadioChange(row, status) {
      let submitObj = {
        demandRecordId: row.demandRecordId,
        ifMeetCondition: status
      };
      let submitList = [];
      submitList.push(submitObj);
      this.loading = true;
      this.postCheckBoothUsedByWorkDepart(submitList).then(() => {
        this.loading = false;
        this.$message.success('操作成功');
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 附件下载
    handleDownloadFile(id) {
      window.open(`${process.env.API_NA_URL}/api/file/get?fileId=${id}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 打开上传弹框
    openUpload() {
      this.fileForm.chooseFileName = '';
      this.isUp = true;
    },
    // 模板下载
    handleDownloadTemplate() {
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyCheck/aptitudeCheckByWorkDepartment/exportVolume/download?token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 文件改变
    handleChange(file, fileList) {
      this.fileForm.chooseFileName = file.name;
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);				
      const extension = testmsg === 'xls';
      const extension2 = testmsg === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
    },
    // 自定义上传方式
    handleUploadFile(param) {
      let formData = new FormData();
      formData.append('file', param.file);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postDepartCheckFileUpload(formData).then(() => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.$message.success('上传成功');
        this.isUp = false;
        this.originQuery();
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 文件上传
    toUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    // 前往审核
    goCheck(row) {
      this.$router.push({ path: '/newThemeCheckCompanyInfo', query: { row: row, form: this.queryFormCheck, page: this.pageInfoCheck }});
    },
    // 编辑
    toEdit(index, row) { 
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.lastCheckAptitudeData = JSON.parse(JSON.stringify(this.checkAptitudeData));
        this.checkAptitudeData.records[index]['edit'] = true;
        this.lastIndex = index;
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃本次编辑？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkAptitudeData = JSON.parse(JSON.stringify(this.lastCheckAptitudeData));
          for (let i = 0, l = this.checkAptitudeData.records.length; i < l; i++) {
            this.checkAptitudeData.records[i]['edit'] = false;
          }
          this.checkAptitudeData.records[index]['edit'] = true;
          this.lastIndex = index;
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    toSave(index, row) { 
      let validArr = [];
      let flag = [];
      for (let i = 0; i < this.rulesList.length; i++) {
        this.$refs[this.rulesList[i]].validate(valid => {
          validArr.push(valid);
        });
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag.push(true);
        } else {
          flag.push(false);
        }
      }
      if (!flag.includes(false)) {
        let saveCompanyData = {
          companyId: row.companyId,
          enterprisesType: row.companyType
        };
        this.loading = true;
        // 编辑保存
        this.postSaveCompanyInfo(saveCompanyData).then(() => {
          this.loading = false;
          this.checkAptitudeData.records[index]['edit'] = false; 
          this.$message.success('操作成功');
          this.lastIndex = '';
          this.createdQuery();
        }).catch(e => {
          this.loading = false;
        });
      } else {
        this.$message.error('请确认填写框填写正确');
      }
    },
    // 批量符合不符合
    handleIfMeet(type) {
      let recordData = JSON.parse(JSON.stringify(this.checkAptitudeData.records));
      let submitList = [];
      for (let i = 0, l = recordData.length; i < l; i++) {
        let obj = {
          demandRecordId: recordData[i].demandRecordId,
          ifMeetCondition: type
        };
        submitList.push(obj);
      }
      this.loading = true;
      this.postCheckBoothUsedByWorkDepart(submitList).then(() => {
        this.loading = false;
        this.$message.success('操作成功');
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 复核下载
    handleCheckDownload() {
      let url = `exhibitionArea=${this.queryFormCheck.exhibitionArea}&clusterCheckStatus=${this.queryFormCheck.clusterCheckStatus}&recommendStatus=${this.queryFormCheck.recommendStatus}&companyName=${this.queryFormCheck.companyName}&cecfCode=${this.queryFormCheck.cecfCode}&isRecommend=${this.queryFormCheck.isRecommend}&productType=${this.queryFormCheck.productType}&ifLastJoin=${this.queryFormCheck.ifLastJoin}&delegationId=${this.queryFormCheck.delegationId}&checkStatus=${this.queryFormCheck.checkStatus}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyCheck/aptitudeCheckByWorkDepartment/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 查询
    handleQuery(type) {
      this.pageInfoCheck.currentPage = 1;
      if (this.queryFormCheck.exhibitionArea === 'NE01') {
        this.queryFormChange.exhibitionArea = 'NE01';
      } else {
        this.queryFormChange.exhibitionArea = 'CG06';
      }
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val, type) {
      this.pageInfoCheck.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val, type) {
      this.pageInfoCheck.pageSize = val;
      this.createdQuery();
    },
    // 初始封装
    originQuery(type) {
      this.loading = true;
      this.createdQuery();
    },
    // 查询封装
    createdQuery(type) {
      this.loading = true;
      this.getAptitudeCheckByWorkDepartment(this.formQueryCheck).then(data => {
        this.$nextTick(() => {
          this.loading = false;
        });
        let resData = JSON.parse(JSON.stringify(this.aptitudeCheckData));
        for (let i = 0; i < resData.records.length; i++) {
          resData.records[i].edit = false;
        }
        this.lastIndex = '';
        this.checkAptitudeData = JSON.parse(JSON.stringify(resData));
      }).catch(e => {
        this.$nextTick(() => {
          this.loading = false;
        });
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
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.pagination-footer{
  margin-top: 20px;
}  
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
