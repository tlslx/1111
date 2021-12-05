<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团审核企业提交申请" name="first">
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
            <el-table-column label="产品类别" prop="productType" align="center"></el-table-column>
            <el-table-column label="企业所属贫困县" prop="poorArea" align="center"></el-table-column>
            <el-table-column label="材料（企业来函等）" prop="material" align="center">
              <template slot-scope="scope">
                <a href="javascript:;" @click="handleMaterialDownload(scope.row.material)" v-if="scope.row.material">查看</a>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="checkStatus" align="center">
              <template slot-scope="scope">
                {{ scope.row.checkStatus | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.originator === '1'">
                  <el-button type="text" @click="handleDataPass('TZ', scope.row.adjustId)" :disabled="handleDisabled(scope.row.checkStatus)">通过</el-button>
                  <el-button type="text" @click="openPassDialog('TZ', scope.row.adjustId)" :disabled="handleDisabled(scope.row.checkStatus)">不通过</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="space-between" class="pagination-footer">
            <span class="add_btn">
              <el-button type="danger" size="medium" @click="openAddDialog('TZ')">新增</el-button>
            </span>
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
          <!-- 新增编辑弹窗 -->
          <el-dialog title="新增" :visible.sync="addDialog" v-if="addDialog">
            <el-form class="dialogForm" :model="addObj" ref="addForm" :rules="addRule" label-width="120">
              <el-form-item label="广交会编码：" prop="cecfCode">
                <el-select v-model="addObj.cecfCode" @change="val => handleGetCompany(val, 'TZ', addObj)">
                  <el-option v-for="(item, index) in cecfCodeOptsw" :key="index" :value="item.cantonCode" :label="item.cantonCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请展区：" prop="exhibitionArea">
                <el-select v-model="addObj.exhibitionArea" @change="val => handleGetRecommendNum(val, 'TZ', addObj)">
                  <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业名称：" prop="companyName">
                <el-input v-model="addObj.companyName" disabled></el-input>
              </el-form-item>
              <el-form-item label="原推荐特装数：" prop="originalRecommend">
                <el-input v-model="addObj.originalRecommend" disabled></el-input>
              </el-form-item>
              <el-form-item label="申请调整后推荐数：" prop="adjustedNumber">
                <el-input placeholder="请输入" v-model="addObj.adjustedNumber" maxlength="2"></el-input>
              </el-form-item>
              <el-form-item label="调整原因：" prop="adjustReason">
                <el-select v-model="addObj.adjustReason">
                  <el-option v-for="(item, index) in adjustReasonOpts" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品类别：" prop="productType">
                <el-input v-model="addObj.productType" disabled></el-input>
              </el-form-item>
              <el-form-item label="企业所属贫困县：" prop="poorArea">
                <el-input v-model="addObj.poorArea" disabled></el-input>
              </el-form-item>
              <el-form-item label="材料" prop="material">
                <el-upload ref="upload" action="" :limit="1" :on-change="(file, fileList) => handleFileChange(file, fileList, 'TZ')" :http-request="handleUploadFile" 
                :on-remove="handleFileRemove" :file-list="fileList" :auto-upload="false">
                  <el-button type="primary">选择文件</el-button>
                </el-upload>
              </el-form-item>
              <div class="dialog-footer">
                <el-button type="primary" size="medium" @click="handleAddSave('addForm', 'TZ')" :disabled="blackFlag">保存</el-button>
                <el-button size="medium" @click="addDialog = false;">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- 不通过弹框 -->
          <el-dialog title="提示" :visible.sync="isPass" v-if="isPass" width="550px">
            <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
              <el-form-item label="审核意见：" prop="examineOpinion">
                <el-input type="textarea" v-model="reasonForm.examineOpinion" :rows="4" maxlength="120"></el-input>
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
              <el-input placeholder="请输入" v-model.trim="queryFormTZ.companyName" clearable></el-input>
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
                <a href="javascript:;" @click="handleMaterialDownload(scope.row.material)" v-if="scope.row.material">查看</a>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="checkStatus" align="center">
              <template slot-scope="scope">
                {{ scope.row.checkStatus | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.originator === '1'">
                    <el-button type="text" @click="handleDataPass('BT', scope.row.adjustId)" :disabled="handleDisabled(scope.row.checkStatus)">通过</el-button>
                    <el-button type="text" @click="openPassDialog('BT', scope.row.adjustId)" :disabled="handleDisabled(scope.row.checkStatus)">不通过</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="space-between" class="pagination-footer">
            <span class="add_btn">
              <el-button type="danger" size="medium" @click="openAddDialog('BT')">新增</el-button>
            </span>
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
          <!-- 新增编辑弹窗 -->
          <el-dialog title="新增" :visible.sync="addDialogBT" v-if="addDialogBT">
            <el-form class="dialogForm" :model="addObjBT" ref="addFormBT" :rules="addRuleBT" label-width="120">
              <el-form-item label="广交会编码：" prop="cecfCode">
                <el-select v-model="addObjBT.cecfCode" @change="val => handleGetCompany(val, 'BT', addObjBT)">
                  <el-option v-for="(item, index) in cecfCodeOptsw" :key="index" :value="item.cantonCode" :label="item.cantonCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请展区：" prop="exhibitionArea">
                <el-select v-model="addObjBT.exhibitionArea" @change="val => handleGetRecommendNum(val, 'BT', addObjBT)">
                  <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="布展类型：" prop="exhibitionType">
                <el-select v-model="addObjBT.exhibitionType" @change="handleExhibitionTypeChange('BT', addObjBT)">
                  <el-option v-for="(item, index) in exhibitionTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业名称：" prop="companyName">
                <el-input v-model="addObjBT.companyName" disabled></el-input>
              </el-form-item>
              <el-form-item label="原推荐数：" prop="originalRecommend">
                <el-input v-model="addObjBT.originalRecommend" disabled></el-input>
              </el-form-item>
              <el-form-item label="现推荐数：" prop="adjustedNumber">
                <el-input placeholder="请输入" v-model="addObjBT.adjustedNumber" maxlength="2"></el-input>
              </el-form-item>
              <el-form-item label="产品类别：" prop="productType">
                <el-input v-model="addObjBT.productType" disabled></el-input>
              </el-form-item>
              <el-form-item label="企业所属贫困县：" prop="poorArea">
                <el-input v-model="addObjBT.poorArea" disabled></el-input>
              </el-form-item>
              <el-form-item label="材料" prop="material">
                <el-upload ref="uploads" action="" :limit="1" :on-change="(file, fileList) => handleFileChange(file, fileList, 'BT')" :http-request="handleUploadFiles" 
                :on-remove="handleFileRemove" :file-list="fileList" :auto-upload="false">
                  <el-button type="primary">选择文件</el-button>
                </el-upload>
              </el-form-item>
              <div class="dialog-footer">
                <el-button type="primary" size="medium" @click="handleAddSave('addFormBT', 'BT')" :disabled="blackFlag">保存</el-button>
                <el-button size="medium" @click="addDialogBT = false;">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- 不通过弹框 -->
          <el-dialog title="提示" :visible.sync="isPassBT" v-if="isPassBT" width="550px">
            <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
              <el-form-item label="审核意见：" prop="examineOpinion">
                <el-input type="textarea" v-model="reasonForm.examineOpinion" :rows="4" maxlength="120"></el-input>
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
    var needInts = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请确认企业名称与申请展区'));
      } else {
        return callback();
      }
    };
    var needIntBT = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请确认企业名称、申请展区及布展类型'));
      } else {
        return callback();
      }
    };
    var materialRule = (rule, value, callback) => {
      if (this.addObj.material === '') {
        return callback(new Error('请选择文件'));
      } else {
        return callback();
      }
    };
    var materialRuleBT = (rule, value, callback) => {
      if (this.addObjBT.material === '') {
        return callback(new Error('请选择文件'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      activeTab: 'TZ',
      loading: '',
      addDialog: false,
      addDialogBT: false,
      isPass: false,
      type: '',
      blackFlag: false, // 是否为黑名单企业
      currentDelegationId: '',
      exhibitionAreaOpts: [],
      cecfCodeOpts: [],
      companyOpts: [],
      cecfCodeOptsw: [],
      adjustReasonOpts: [{ value: '1', label: '企业申请退回特装展位' }, { value: '2', label: '替换退出特装企业' }, 
      { value: '3', label: '交易团调整安排方案' }, { value: '4', label: '展区展位数量变化引起的调整' }],
      // 特装
      tzData: {},
      queryFormTZ: {
        exhibitionArea: '',
        cecfCode: '',
        delegationId: this.$store.getters.userInfo.org.deptId,
        adjustReason: '',
        companyName: '',
        flag: '1'
      },
      // id临时存储
      idObj: {
        idOne: ''
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
      fileList: [],
      addObj: {
        delegationId: this.$store.getters.userInfo.org.deptId,
        cecfCode: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        companyId: '',
        companyName: '',
        originalRecommend: '', // 原推荐特装数
        adjustedNumber: '', // 调整数量
        adjustReason: '', // 调整理由
        productType: '', // 产品类别
        poorArea: '', // 贫困县
        exhibitionType: 'SPECIAL_BOOTH', // 布展类型
        material: '', // 材料
        originator: '2' // 发起方
      },
      addRule: {
        cecfCode: [{ required: true, message: '请选择', trigger: 'change' }],
        exhibitionArea: [{ required: true, message: '请选择', trigger: 'change' }],
        companyName: [{ required: true, message: '请填写广交会编码', trigger: 'blur' }],
        originalRecommend: [{ required: true, validator: needInts, trigger: 'blur' }],
        adjustedNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        adjustReason: [{ required: true, message: '请选择', trigger: 'change' }],
        material: [{ required: true, validator: materialRule, trigger: 'change' }]
      },
      // 标摊
      btData: {},
      isPassBT: false,
      queryFormBT: {
        exhibitionArea: '',
        cecfCode: '',
        delegationId: this.$store.getters.userInfo.org.deptId,
        companyName: '',
        flag: '2'
      },
      exhibitionTypeOpts: [{ value: 'UNIFICATION_BOOTH', label: '统一布展' }, { value: 'STANDARD_BOOTH', label: '标摊' }, { value: 'CENTER_CHANNELL_BOOTH', label: '中央通道' }],
      addObjBT: {
        delegationId: this.$store.getters.userInfo.org.deptId,
        cecfCode: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        companyId: '',
        companyName: '',
        originalRecommend: '', // 原推荐数
        adjustedNumber: '', // 现推荐数
        productType: '', // 产品类别
        poorArea: '', // 贫困县
        exhibitionType: '', // 布展类型
        material: '', // 材料
        originator: '2' // 发起方
      },
      addRuleBT: {
        cecfCode: [{ required: true, message: '请选择', trigger: 'change' }],
        exhibitionArea: [{ required: true, message: '请选择', trigger: 'change' }],
        companyName: [{ required: true, message: '请填写广交会编码', trigger: 'blur' }],
        exhibitionType: [{ required: true, message: '请选择', trigger: 'change' }],
        originalRecommend: [{ required: true, validator: needIntBT, trigger: 'blur' }],
        adjustedNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        material: [{ required: true, validator: materialRuleBT, trigger: 'change' }]
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
    ...mapGetters('companyDelegationApplyBoothNumber', ['ordinaryAdjustData']),
    ...mapGetters('dictionary', ['dictionaryData']),
    // 特装
    formQueryTZ() {
      return {
        exhibitionArea: this.queryFormTZ.exhibitionArea,
        cecfCode: this.queryFormTZ.cecfCode,
        delegationId: this.queryFormTZ.delegationId,
        adjustReason: this.queryFormTZ.adjustReason,
        companyName: this.queryFormTZ.companyName,
        exhibitionType: 'SPECIAL_BOOTH',
        flag: this.queryFormTZ.flag,
        current: this.pageInfoTZ.currentPage,
        size: this.pageInfoTZ.pageSize
      };
    },
    // 获取原推荐特装数、产品类别、贫困县
    originalRecommendNumTZData() {
      return {
        companyId: this.addObj.companyId,
        exhibitionArea: this.addObj.exhibitionArea,
        exhibitionType: 'SPECIAL_BOOTH'
      };
    },
    // 非特装
    formQueryBT() {
      return {
        exhibitionArea: this.queryFormBT.exhibitionArea,
        cecfCode: this.queryFormBT.cecfCode,
        delegationId: this.queryFormBT.delegationId,
        companyName: this.queryFormBT.companyName,
        exhibitionType: '',
        flag: this.queryFormBT.flag,
        current: this.pageInfoBT.currentPage,
        size: this.pageInfoBT.pageSize
      };
    },
    // 获取原推荐特装数、产品类别、贫困县
    originalRecommendNumBTData() {
      return {
        companyId: this.addObjBT.companyId,
        exhibitionArea: this.addObjBT.exhibitionArea,
        exhibitionType: this.addObjBT.exhibitionType
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.currentDelegationId = this.$store.getters.userInfo.org.deptId;
    // 获取交易团下属企业、广交会编码
    this.getcompanyInfoByDeleId({ delegationId: this.currentDelegationId }).then(res => {
      let list = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < list.length; i++) {
        if (list[i].cantonCode) {
          this.cecfCodeOptsw.push(list[i]);
        }
      }
    }).catch(e => {});
    this.createdQuery('TZ', this.formQueryTZ);
  },
  methods: {
    ...mapActions('companyDelegationApplyBoothNumber', ['getOrdinaryAdjustCompany', 'postOriginalRecommendNum', 'postAddBoothNumberApply',
      'postCheckByDelegation', 'postOrdinaryAdjustCompanyUpload', 'postIfBlackCompanyInfo']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getcompanyInfoByDeleId']),
    // 标签页切换
    handleTabClick(tab) {
      this.blackFlag = true;
      // 展区
      this.getexhibitionArea().then(res => {
        this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      // 获取交易团下属企业、广交会编码
      this.getcompanyInfoByDeleId({ delegationId: this.currentDelegationId }).then(res => {
        let list = JSON.parse(JSON.stringify(res));
        for (let i = 0; i < list.length; i++) {
          if (list[i].cantonCode !== '') {
            this.cecfCodeOptsw.push(list[i]);
          }
        }
      }).catch(e => {});
      if (tab.name === 'TZ') {
        this.createdQuery(tab.name, this.formQueryTZ);
      } else if (tab.name === 'BT') {
        this.createdQuery(tab.name, this.formQueryBT);
      }
    },
    // 是否可操作
    handleDisabled(status) {
      if (status === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 打开新增弹框
    openAddDialog(type) {
      if (type === 'TZ') {
        this.addObj = {
          delegationId: this.$store.getters.userInfo.org.deptId,
          cecfCode: '',
          exhibitionArea: '',
          exhibitionAreaName: '',
          companyId: '',
          companyName: '',
          originalRecommend: '',
          adjustedNumber: '',
          adjustReason: '',
          productType: '',
          poorArea: '',
          exhibitionType: 'SPECIAL_BOOTH',
          material: '',
          originator: '2'
        };
        this.addDialog = true;
      } else if (type === 'BT') {
        this.addObjBT = {
          delegationId: this.$store.getters.userInfo.org.deptId,
          cecfCode: '',
          exhibitionArea: '',
          exhibitionAreaName: '',
          companyId: '',
          companyName: '',
          originalRecommend: '', 
          adjustedNumber: '',
          productType: '', 
          poorArea: '', 
          exhibitionType: '', 
          material: '',
          originator: '2'
        };
        this.addDialogBT = true;
      }
    },
    // 获得企业名称
    handleGetCompany(val, type, obj) {
      for (let i = 0; i < this.cecfCodeOptsw.length; i++) {
        if (this.cecfCodeOptsw[i].cantonCode === val) {
          obj.companyId = this.cecfCodeOptsw[i].companyId;
          obj.companyName = this.cecfCodeOptsw[i].companyName;
        }
      }
      this.handleGetRecommendNum('', type, obj);
    },
    // 判断企业是否在黑名单中
    handleIfBlackCompany(type) {
      let data = {};
      if (type === 'TZ') {
        data = this.addObj;
      } else {
        data = this.addObjBT;
      }
      this.postIfBlackCompanyInfo({ companyId: data.companyId, exhibitionAreaCode: data.exhibitionArea }).then(res => {
        if (res.isBlack === '1') {
          this.blackFlag = true;
          this.$message.warning('该企业为黑名单企业，无法新增');
        } else {
          this.blackFlag = false;
        }
      }).catch(e => {});
    },
    // 获取原推荐数、产品类别、贫困县
    handleGetRecommendNum(val, type, obj) {
      let data;
      if (type === 'TZ') {
        data = this.originalRecommendNumTZData;
      } else if (type === 'BT') {
        data = this.originalRecommendNumBTData;
      }
      data.companyId = obj.companyId;
      if (val) {
        for (let i = 0; i < this.exhibitionAreaOpts.length; i++) {
          if (this.exhibitionAreaOpts[i].exhibitionAreaCode === val) {
            obj.exhibitionAreaName = this.exhibitionAreaOpts[i].exhibitionAreaName;
            break;
          }
        }
      }
      if (obj.companyId && obj.exhibitionArea && obj.exhibitionType) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.postOriginalRecommendNum(data).then(res => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          let resData = JSON.parse(JSON.stringify(res));
          // 获取原推荐数
          obj.originalRecommend = resData.originalRecommend;
          // 获取产品类别
          obj.productType = resData.productType;
          // 获取贫困县
          obj.poorArea = resData.poorArea;
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }
      if (obj.companyId && obj.exhibitionArea) {
        this.handleIfBlackCompany(type);
      }
    },
    handleExhibitionTypeChange(type, obj) {
      this.handleGetRecommendNum('', type, obj);
    },
    // 材料下载
    handleMaterialDownload(id) {
      window.open(`${process.env.API_NA_URL}/api/ordinaryAdjustCompany/download?fileId=${id}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 文件选择改变
    handleFileChange(file, fileList, type) {
      if (type === 'TZ') {
        this.addObj.material = file ? file.uid : '';
      } else {
        this.addObjBT.material = file ? file.uid : '';
      }
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
      }
    },
    // 文件自定义上传特装
    handleUploadFile(param) {
      let formData = new FormData();
      formData.append('file', param.file);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postOrdinaryAdjustCompanyUpload(formData).then(res => {
        this.$message.success('材料上传成功');
        this.addObj.material = res.fileId;
        this.postAddBoothNumberApply(this.addObj).then(() => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.$message.success('新增成功');
          this.addDialog = false;
          this.handleTabClick({ name: 'TZ' });
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 文件自定义上传非特装
    handleUploadFiles(param) {
      let formData = new FormData();
      formData.append('file', param.file);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postOrdinaryAdjustCompanyUpload(formData).then(res => {
        this.$message.success('材料上传成功');
        this.addObjBT.material = res.fileId;
        this.postAddBoothNumberApply(this.addObjBT).then(() => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.$message.success('新增成功');
          this.addDialogBT = false;
          this.handleTabClick({ name: 'BT' });
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 文件删除
    handleFileRemove(file) {
      this.$message.warning('文件已删除');
    },
    // 新增保存
    handleAddSave(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (type === 'BT') {
            this.$refs.uploads.submit();
          } else if (type === 'TZ') {
            this.$refs.upload.submit();
          }
        }
      });
    },
    // 审核通过
    handleDataPass(type, idOne) {
      let reasonData = this.reasonForm;
      reasonData.examineStatus = '1';
      reasonData.ownId = idOne;
      this.$confirm('确定审核通过吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postCheckByDelegation(reasonData).then(() => {
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
    openPassDialog(type, idOne) {
      this.idObj.idOne = idOne;
      this.reasonForm.examineOpinion = '';
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
          reasonData.examineStatus = '2';
          reasonData.ownId = this.idObj.idOne;
          this.postCheckByDelegation(reasonData).then(() => {
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
        this.createdQuery('TZ', this.formQueryTZ);
      } else if (type === 'BT') {
        this.pageInfoBT.currentPage = 1;
        this.createdQuery('BT', this.formQueryBT);
      }
    },
    // 操作页面
    handleCurrentChange(val, type) {
      if (type === 'TZ') {
        this.pageInfoTZ.currentPage = val;
        this.createdQuery('TZ', this.formQueryTZ);
      } else {
        this.pageInfoBT.currentPage = val;
        this.createdQuery('BT', this.formQueryBT);
      }
    },
    handleSizeChange(val, type) {
      if (type === 'TZ') {
        this.pageInfoTZ.pageSize = val;
        this.createdQuery('TZ', this.formQueryTZ);
      } else {
        this.pageInfoBT.pageSize = val;
        this.createdQuery('BT', this.formQueryBT);
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
.pagination-footer{
  margin-top: 20px;
}  
.dialogForm{
  width: 75%; 
  min-width: 250px; 
  margin: 0 auto;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
