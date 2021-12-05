<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="企业展位数量安排明细表（管理员）" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" @change="handleProductAreaQuery" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="(item, index) in productAreaOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="符合规则ID">
          <el-input placeholder="请输入" v-model="queryForm.fitRuleId" clearable></el-input>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cecfCode" clearable></el-input>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="primary" @click="openUpload">上传</el-button>
          <el-button type="primary" @click="handleDownload">下载</el-button>
        </el-form-item>
      </el-form>
      <div style="color: red; font-size: 16px; margin-bottom: 10px;">说明：系统安排展位数按照规则计算，可能与拟安排展位数不一致，不作为展位安排依据。</div>
      <el-table :data="boothArrangeData.records" ref="multipleTable" @select="handleSelectionChange"
      @select-all="handleSelectionChange"
      @selection-change="handleCheckedChange"
      :row-key="getRowKey" v-loading="loading" height="550" border>
        <el-table-column type="selection" :selectable="handleIsCheck" width="40px"></el-table-column>
        <el-table-column label="企业名称" fixed prop="companyName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展品专区" prop="productTypeName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="展位类型" prop="boothType" min-width="120px" align="center">
          <template slot-scope="scope">
            <!-- {{ scope.row.boothType | boothTypeFilter }} -->
            {{ scope.row.boothType }}
          </template>
        </el-table-column>
        <el-table-column label="交易团" prop="delegationName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cecfCode" min-width="120px" align="center"></el-table-column>
        <el-table-column label="企业类型" prop="companyType" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.companyType | companyTypeilter }}
          </template>
        </el-table-column>
        <el-table-column label="是否符合展位使用条件" prop="ifMeetCondition" min-width="180px" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifMeetCondition | chooseMeetFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核展位需求" prop="boothNumberDemand" min-width="180px" align="center">
          <template slot-scope="scope">
            {{ scope.row.boothNumberDemand }}
          </template>
        </el-table-column>
        <el-table-column label="布展类型" prop="boothTypeDemand" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.uploadBoothNumber === '1'">{{ 'STANDARD_BOOTH' | typeFilter }}</div>
            <div v-else>{{ scope.row.boothTypeDemand | typeFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上届展位数" prop="boothNumberLast" min-width="120px" align="center"></el-table-column>
        <el-table-column label="系统安排展位数" prop="systemBoothNumber" width="180px" align="center">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="systemBoothNumber" :rules="rules">
                <el-form-item class="item-Num" prop="systemBoothNumber">
                  <el-input placeholder="请输入" type="number" v-model.number="scope.row.systemBoothNumber" oninput="if(value.length>2)value=value.slice(0,2)" ></el-input>
                </el-form-item>
              </el-form>
            </div> -->
            <!-- <div v-if="!scope.row.edit && scope.row.systemBoothNumber !== null">{{ scope.row.systemBoothNumber }}</div>
            <div v-if="!scope.row.edit && !scope.row.systemBoothNumber">0</div> -->
            <div v-if="scope.row.systemBoothNumber !== null">{{ scope.row.systemBoothNumber }}</div>
            <div v-if="!scope.row.systemBoothNumber">0</div>
          </template>
        </el-table-column>
        <el-table-column label="当届拟安排展位数" prop="uploadBoothNumber" min-width="180px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="uploadBoothNumber" :rules="rules">
                <el-form-item class="item-Num" prop="uploadBoothNumber">
                  <el-input placeholder="请输入" v-model="scope.row.uploadBoothNumber" maxlength="8"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.uploadBoothNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="差异原因" prop="diffReason" width="150" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="diffReason" :rules="rules">
                <el-form-item class="item-Num" prop="diffReason">
                  <el-input placeholder="请输入" v-model="scope.row.diffReason" maxlength="120"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.diffReason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商协会核对状态" prop="coceralCheckStatus" min-width="160px" align="center">
          <template slot-scope="scope">
            {{ scope.row.coceralCheckStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="商协会建议安排展位数" prop="coceralRecommendNumber" min-width="160px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.newThemePlan">{{ scope.row.newThemePlan.coceralRecommendNumber }}</div>
          </template>
        </el-table-column>
        <el-table-column label="交易团审核" prop="clusterCheckStatus" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.clusterCheckStatus | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="交易团是否推荐" prop="recommendStatus" min-width="160px" align="center">
          <template slot-scope="scope">
            {{ scope.row.recommendStatus | chooseListFilter }}
          </template>
        </el-table-column>
        <el-table-column label="商会是否推荐" prop="coceralIsRecommend" min-width="160px" align="center">
          <template slot-scope="scope">
            {{ scope.row.coceralIsRecommend | chooseListFilter }}
          </template>
        </el-table-column>
        <el-table-column label="展区出口额参数" prop="exhibitionAreaExportVolume" min-width="220px" align="center"></el-table-column>
        <el-table-column label="国内销售额（万人民币）" prop="insideSale" min-width="260px" align="center"></el-table-column>
        <el-table-column label="宠物食品类对应出口额参数" prop="peetFoodExportVolume" min-width="220px" align="center"></el-table-column>
        <el-table-column label="唯一专属宠物用品类的HS编码（42010000）下出口额参数" prop="peetCodeExportVolume" min-width="220px" align="center"></el-table-column>
        <el-table-column label="是否提交有效行业相关资质证明材料" prop="isOfferEffectiveMaterial" min-width="220px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="isOfferEffectiveMaterial" :rules="rules" label-width="0px">
                <el-form-item class="item-Num" prop="isOfferEffectiveMaterial">
                  <el-select clearable v-model="scope.row.isOfferEffectiveMaterial">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.isOfferEffectiveMaterial | chooseListFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主要展示产品1" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.mainProductCodeList ? (scope.row.mainProductCodeList.length > 0 ? scope.row.mainProductCodeList[0].productName : '') : '' }}
          </template>
        </el-table-column>
        <el-table-column label="主要展示产品2" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.mainProductCodeList ? (scope.row.mainProductCodeList.length > 1 ? scope.row.mainProductCodeList[1].productName : '') : '' }}
          </template>
        </el-table-column>
        <el-table-column label="符合规则ID" prop="fitRuleId" min-width="120px" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="fitRuleId" :rules="rules">
                <el-form-item class="item-Num" prop="fitRuleId">
                  <el-input placeholder="请输入" v-model="scope.row.fitRuleId"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.fitRuleId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安排说明" prop="scheduleReason" width="180" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="scope.row" ref="scheduleReason" :rules="rules">
                <el-form-item class="item-Num" prop="scheduleReason">
                  <el-input placeholder="请输入" v-model="scope.row.scheduleReason" maxlength="120"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.scheduleReason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审定结果" prop="foreignCheckStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.foreignCheckStatus | statusFilters }}
          </template>
        </el-table-column>
        <el-table-column label="审定不通过原因" prop="foreignCheckOpinion" width="180" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="140px" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toEdit(scope.$index, scope.row)" :disabled="handleIsDisabled(scope.row.coceralCheckStatus)">编辑</el-button>
            <el-button type="text" @click="toSave(scope.$index, scope.row, rulesList)" :disabled="!scope.row.edit">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="danger" size="medium" @click="handleCheck">核对全部</el-button>
          <el-button type="danger" size="medium" @click="handleCheckByCoceral">发商协会核对</el-button>
          <el-button type="danger" size="medium" @click="handleCheckByForeign">提交审定</el-button>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="boothArrangeData.total">
        </el-pagination>
      </el-row>
      <!-- 核对 -->
      <el-dialog title="核对" :visible.sync="isCheck" v-if="isCheck">
        <el-table :data="boothArrangeCheckData" border>
          <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
          <el-table-column label="展品专区" prop="productTypeName" align="center"></el-table-column>
          <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
          <el-table-column label="系统安排展位数" prop="systemBoothNumber" align="center"></el-table-column>
          <el-table-column label="当届拟安排展位数" prop="uploadBoothNumber" align="center"></el-table-column>
          <el-table-column label="差异原因" prop="diffReason" width="180" align="center">
            <template slot-scope="scope">
              <div>
                <el-form :model="scope.row" :ref="`diffReason${scope.$index}`" :rules="rules">
                  <el-form-item class="item-Num" prop="diffReason">
                    <el-input placeholder="请输入" v-model="scope.row.diffReason" maxlength="120"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="toSave('', '', rulesCheck)">提交</el-button>
          <el-button size="medium" @click="isCheck = false;">取消</el-button>
        </div>
      </el-dialog>
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
            <a href="javascript:;" @click="handleDownloadFile">模板文件点击下载</a>
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
const BASE_URL = process.env.API_NA_URL;
export default {
  mixins: [listPageBase],
  data() {
    // var needInt = (rule, value, callback) => {
    //   const reg = /[^\d\$]/g;
    //   if (value === '') {
    //     return callback(new Error('请输入>=0的整数'));
    //   } else if (reg.test(value)) {
    //     return callback(new Error('请输入>=0的整数'));
    //   } else {
    //     return callback();
    //   }
    // };
    return {
      activeName: 'first',
      loading: '',
      isUp: false, // 上传弹框
      fileForm: {
        chooseFileName: '' // 文件选择名称
      },
      fileRule: {
        chooseFileName: [{ required: true, message: '请选择需上传的文件', trigger: 'change' }]
      },
      store,
      BASEURL: BASE_URL,
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      productAreaOpts: [],
      isCheck: false,
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      queryForm: {
        exhibitionArea: '',
        delegationId: '',
        companyName: '',
        productType: '',
        cecfCode: '',
        fitRuleId: ''
      },
      lastIndex: '', // 上一次的索引
      currentData: {}, // 当前的数据
      lastBoothArrangeData: {}, // 上一次的数据
      boothArrangeData: {},
      boothArrangeCheckData: [], // 核对数据
      checkData: {},
      // rulesList: ['systemBoothNumber', 'scheduleReason'],
      rulesList: ['scheduleReason'],
      rulesCheck: ['diffReason'],
      rules: {
        //systemBoothNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        scheduleReason: [{ required: true, message: '请输入', trigger: 'blur' }],
        diffReason: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    // 布展类型
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
    // 展位类型
    boothTypeFilter: value => {
      switch (value) {
        case 'ORDINARY':
          return '一般性';
        case 'BRAND':
          return '品牌';
        default:
          return;
      }
    },
    // 商协会核对状态
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核不通过';
        case '3':
          return '未核对';
        default:
          return;
      }
    },
    // 外贸司审核状态
    statusFilters: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核不通过';
        case '3':
          return '未审定';
        default:
          return;
      }
    },
    // 是否
    chooseListFilter: value => {
      switch (value) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    },
    // 是否符合
    chooseMeetFilter: value => {
      switch (value) {
        case '2':
          return '不符合';
        case '1':
          return '符合';
        default:
          return;
      }
    },
    // 企业类型
    companyTypeilter: value => {
      let companyTypeOptsw = kindo.dictionary.get('companyType');
      for (let i = 0; i < companyTypeOptsw.length; i++) {
        if (value === companyTypeOptsw[i].value) {
          return companyTypeOptsw[i].label;
        }
      }
    }
  },
  computed: {
    ...mapGetters('thenewThemel', ['boothArrangeDetail']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        delegationId: this.queryForm.delegationId,
        companyName: this.queryForm.companyName,
        productType: this.queryForm.productType,
        cecfCode: this.queryForm.cecfCode,
        fitRuleId: this.queryForm.fitRuleId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    getRowKey (row) { // 获取row的key值
      return row.demandRecordId;
    }
  },
  created() {
    this.originQuery();
  },
  methods: {
    ...mapActions('thenewThemel', ['getBoothArrangeDetailTable', 'postBoothArrangeDetailSave', 'postBoothArrangeDetailCheckCoceral', 'postboothArrangeDetailCheckForeignTrade', 'postBoothArrangeDetailTableUpload']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList']),
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.productAreaOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      } else {
        this.queryForm.productType = '';
        this.productAreaOpts = [];
      }
    },
    // 能否编辑保存
    handleIsDisabled(status) {
      if (status === '3' || status === '2') {
        return false;
      } else {
        return true;
      }
    },
    // 打开上传弹框
    openUpload() {
      this.fileForm.chooseFileName = '';
      this.isUp = true;
    },
    // 模板下载
    handleDownloadFile() {
      window.open(`${process.env.API_NA_URL}/api/newthemeRoleConfig/boothArrange/template/download?token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
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
      this.postBoothArrangeDetailTableUpload(formData).then(() => {
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
        this.fileForm.chooseFileName = '';
        this.$refs.upload.clearFiles();
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
    // 文件下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&delegationId=${this.queryForm.delegationId}&companyName=${this.queryForm.companyName}&productType=${this.queryForm.productType}&cecfCode=${this.queryForm.cecfCode}&fitRuleId=${this.queryForm.fitRuleId}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeRoleConfig/boothArrange/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 编辑
    toEdit(index, row) {
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.lastBoothArrangeData = JSON.parse(JSON.stringify(this.boothArrangeData));
        this.boothArrangeData.records[index]['edit'] = true;
        this.lastIndex = index;
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃本次编辑？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.boothArrangeData = JSON.parse(JSON.stringify(this.lastBoothArrangeData));
          for (let i = 0; i < this.boothArrangeData.records.length; i++) {
            this.boothArrangeData.records[i]['edit'] = false;
          }
          this.boothArrangeData.records[index]['edit'] = true;
          this.lastIndex = index;
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    toSave(index, row) {
      this.loading = true;
      let validArr = [];
      let flag = true;
      for (let i = 0; i < this.boothArrangeCheckData.length; i++) {
        if (this.$refs[`diffReason${i}`]) {
          this.$refs[`diffReason${i}`].validate(valid => {
            validArr.push(valid);
          });
        } else {
          continue;
        }
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        let submitArr = [];
        if (row !== '') { // 单条保存
          let submitObj = {
            demandRecordId: row.demandRecordId,
            diffReason: row.diffReason,
            planId: row.planId,
            scheduleReason: row.scheduleReason,
            systemBoothNumber: row.systemBoothNumber + '',
            uploadBoothNumber: row.uploadBoothNumber,
            boothTypeDemand: row.boothTypeDemand,
            isOfferEffectiveMaterial: row.isOfferEffectiveMaterial,
            fitRuleId: row.fitRuleId,
            companyConfirmId: row.companyConfirmId
          };
          submitArr.push(submitObj);
        } else { // 核对提交
          for (let i = 0; i < this.boothArrangeCheckData.length; i++) {
            let rows = this.boothArrangeCheckData[i];
            let submitObj = {
              demandRecordId: rows.demandRecordId,
              diffReason: rows.diffReason,
              planId: rows.planId,
              scheduleReason: rows.scheduleReason,
              systemBoothNumber: rows.systemBoothNumber + '',
              uploadBoothNumber: rows.uploadBoothNumber,
              boothTypeDemand: rows.boothTypeDemand,
              isOfferEffectiveMaterial: rows.isOfferEffectiveMaterial,
              fitRuleId: rows.fitRuleId,
              companyConfirmId: rows.companyConfirmId
            };
            submitArr.push(submitObj);
          }
        }
        let flagg = true;
        if (row === '') {
          for (let t = 0; t < submitArr.length; t++) {
            if (submitArr[t].diffReason === '') {
              flagg = false;
            }
          }
        }
        if (flagg) {
          this.postBoothArrangeDetailSave(submitArr).then(() => {
            this.loading = false;
            this.$message.success('操作成功');
            this.lastIndex === '';
            this.lastBoothArrangeData = {};
            this.lastBoothArrangeCheckData = [];
            this.isCheck = false;
            this.originQuery();
          }).catch(e => {
            this.loading = false;
          });
        } else {
          this.$message.warning('请将所有可填项填写完整');
          this.loading = false;
        }
      } else {
        this.$message.error('请确认所有可填项填写正确');
        this.loading = false;
      }
    },
    // 打开核对弹框
    handleCheck() {
      // 只过滤系统安排展位数与拟安排展位数不同或拟安排展位数为0的情况
      // 初始化
      this.boothArrangeCheckData = [];
      let cloneData = JSON.parse(JSON.stringify(this.currentData));
      for (let i = 0; i < cloneData.records.length; i++) {
        if ((cloneData.records[i].systemBoothNumber !== cloneData.records[i].uploadBoothNumber) || (cloneData.records[i].uploadBoothNumber === '0')) {
          this.boothArrangeCheckData.push(cloneData.records[i]);
        }
      }
      this.isCheck = true;
    },
    // 选中的数据获取
    handleCheckedChange(rows) {
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push(row);
          }
        });
      }
    },
    // 选中的数据索引获取
    handleSelectionChange(selection, row) {
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.boothArrangeData.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.demandRecordId === selection[i].demandRecordId) {
            this.selectData[this.pageInfo.currentPage - 1].push(index);
          }
        }
      });
    },
    // 判断是否选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 是否已经过外贸司审定
    handleIsCheck(row) {
      if (row.foreignCheckStatus === '3') {
        return true;
      } else {
        return false;
      }
    },
    // 发商协会核对
    handleCheckByCoceral() {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      let flag = true;
      let submitData = [];
      if (getList.length > 0) {
        for (let i = 0; i < getList.length; i++) {
          if ((getList[i].coceralCheckStatus !== '3' && getList[i].coceralCheckStatus !== '2') || getList[i].uploadBoothNumber === '') {
            flag = false;
            break;
          }
        }
        if (flag) {
          for (let i = 0; i < getList.length; i++) {
            let obj = {
              examineLog: {
                examineStatus: '0',
                ownId: getList[i].demandRecordId
              },
              feedbackLog: {
                ownId: getList[i].demandRecordId,
                coceralRecommendNumber: getList[i].uploadBoothNumber
              }
            };
            submitData.push(obj);
          }
          this.loading = true;
          this.postBoothArrangeDetailCheckCoceral(submitData).then(() => {
            this.$message.success('操作成功');
            this.originQuery();
          }).catch(e => {
            this.loading = false;
          });
        } else {
          this.$message.warning('请确认已勾选项的商协会审核状态均为“未核对”且当前拟安排展位数不为空');
        }
      } else {
        this.$message.warning('请至少勾选一项');
      }
    },
    // 发外贸司审定
    handleCheckByForeign() {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      let flag = true;
      let messageFlag = false;
      let submitData = [];
      if (getList.length > 0) {
        for (let i = 0; i < getList.length; i++) {
          if (getList[i].coceralCheckStatus === '3' || getList[i].coceralCheckStatus === '0') {
            flag = false;
            break;
          } else if (getList[i].coceralCheckStatus === '2') {
            messageFlag = true;
          }
        }
        if (flag) {
          for (let i = 0; i < getList.length; i++) {
            let obj = {
              examineStatus: '0',
              ownId: getList[i].demandRecordId
            };
            submitData.push(obj);
          }
          if (messageFlag) {
            this.$confirm('已勾选项中存在商协会审核不通过的数据,是否继续？', '注意', {
              confirmButtonText: '继续',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true;
              this.postboothArrangeDetailCheckForeignTrade(submitData).then(() => {
                this.$message.success('操作成功');
                this.originQuery();
              }).catch(e => {
                this.loading = false;
              });
            }).catch(() => {
              this.$message.info('已取消本次操作');
            });
          } else {
            this.loading = true;
            this.postboothArrangeDetailCheckForeignTrade(submitData).then(() => {
              this.$message.success('操作成功');
              this.originQuery();
            }).catch(e => {
              this.loading = false;
            });
          }
        } else {
          this.$message.warning('请确认已勾选项的商协会审核已有结果');
        }
      } else {
        this.$message.warning('请至少勾选一项');
      }
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList;
      this.pageInfo.currentPage = val;
      this.loading = true;
      this.getBoothArrangeDetailTable(this.formQuery).then(data => {
        this.loading = false;
        let resData = JSON.parse(JSON.stringify(this.boothArrangeDetail));
        for (let i = 0; i < resData.records.length; i++) {
          resData.records[i].edit = false;
          if (resData.records[i].newThemePlan) {
            resData.records[i].systemBoothNumber = resData.records[i].newThemePlan.systemBoothNumber;
            resData.records[i].uploadBoothNumber = resData.records[i].newThemePlan.uploadBoothNumber;
            resData.records[i].scheduleReason = resData.records[i].newThemePlan.scheduleReason;
            resData.records[i].planId = resData.records[i].newThemePlan.planId;
            resData.records[i].diffReason = resData.records[i].newThemePlan.diffReason;
          } else {
            resData.records[i].systemBoothNumber = '0';
            resData.records[i].uploadBoothNumber = '0';
            resData.records[i].scheduleReason = '';
            resData.records[i].planId = '';
            resData.records[i].diffReason = '';
          }
        }
        this.boothArrangeData = JSON.parse(JSON.stringify(resData));

        // 勾选上次已勾选的数据
        let arr = [];
        if (this.selectData[this.pageInfo.currentPage - 1]) {
          this.selectData[this.pageInfo.currentPage - 1].forEach((item, index) => {
            arr.push(this.boothArrangeData.records[item]);
          });
        }
        let setTime = new Promise((resolve, reject) => {
          resolve(arr);
        });
        Promise.all([setTime]).then((results) => {
          this.toggleSelection(arr);
        });
      }).catch(e => {
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 初始查询封装
    originQuery() {
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
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getBoothArrangeDetailTable(this.formQuery).then(data => {
        this.loading = false;
        let resData = JSON.parse(JSON.stringify(this.boothArrangeDetail));
        for (let i = 0; i < resData.records.length; i++) {
          resData.records[i].edit = false;
          if (resData.records[i].newThemePlan) {
            resData.records[i].systemBoothNumber = resData.records[i].newThemePlan.systemBoothNumber;
            resData.records[i].uploadBoothNumber = resData.records[i].newThemePlan.uploadBoothNumber;
            resData.records[i].scheduleReason = resData.records[i].newThemePlan.scheduleReason;
            resData.records[i].planId = resData.records[i].newThemePlan.planId;
            resData.records[i].diffReason = resData.records[i].newThemePlan.diffReason;
          } else {
            resData.records[i].systemBoothNumber = '0';
            resData.records[i].uploadBoothNumber = '';
            resData.records[i].scheduleReason = '';
            resData.records[i].planId = '';
            resData.records[i].diffReason = '';
          }
        }
        this.selectData = [];
        this.checkList = [];
        this.lastCheckData = [];
        this.lastIndex = '';
        this.currentData = JSON.parse(JSON.stringify(resData));
        this.boothArrangeData = JSON.parse(JSON.stringify(resData));
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
.queryBtn >>> .el-form-item__content{
  display: flex;
  justify-content: space-between;
  min-width: 300px;
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
