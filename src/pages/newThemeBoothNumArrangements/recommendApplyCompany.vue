<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="商协会推荐申请企业" name="first">
      <el-form :model="queryFormRo" :inline="true" label-width="90px">
        <el-form-item label="展区">
          <el-select v-model="queryFormRo.exhibitionArea" @change="handleProductAreaQuery" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品专区">
          <el-select v-model="queryFormRo.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryFormRo.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上届是否参展" label-width="120px">
          <el-select v-model="queryFormRo.ifLastJoin" clearable>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryFormRo.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryFormRo.cecfCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-select v-model="queryFormRo.isRecommend" clearable>
            <el-option v-for="item in isRecommendOptsw" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="recommend_table" :data="recommendDelegData.records" ref="multipleTable" height="550" :row-style="rowClass" v-loading="loading" border>
        <el-table-column fixed label="是否推荐" prop="isRecommend" min-width="60px" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="val => handleCheckedChange(val, scope.row, scope.$index)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column fixed label="广交会编码" prop="cecfCode" min-width="120px" align="center"></el-table-column>
        <el-table-column fixed label="企业名称" prop="companyName" min-width="120px" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="goCompanyInfo(scope.row.demandRecordId, scope.row.companyId)">{{ scope.row.companyName }}</a>
          </template>
        </el-table-column>
        <el-table-column label="交易团" prop="delegationName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="企业类型" prop="companyType" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.companyType | companyTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="展品专区" prop="productTypeName" min-width="120px" align="center"></el-table-column>
        <el-table-column label="企业海关编码审核情况" prop="customsCodeList" align="center" min-width="200px">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.customsCodeList">
              <div v-if="item.relationship === 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${scope.row.companyName})` }}</div>
              <div v-if="item.relationship !== 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${item.relationshipName})` }}</div>
              <div>{{ item.clusterCheckCustomsStatus === '1' ? '通过' : (item.clusterCheckCustomsStatus === '2' ? '不通过' : '') }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="主要展示产品" prop="mainProductCodeList" min-width="120px" align="center">
          <template slot-scope="scope">
            <div v-for="item in scope.row.mainProductCodeList">{{ item.productName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上届是否参展" prop="ifLastJoin" min-width="120px" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
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
        <el-table-column label="交易团是否推荐" prop="recommendStatus" min-width="140px" align="center">
          <template slot-scope="scope">
            {{ scope.row.recommendStatus | chooseFilter }}
          </template>
        </el-table-column>
        <!--
        <el-table-column label="商会推荐" align="center" min-width="120px">
          <template slot-scope="scope">
            <div>
              <el-form :model="scope.row" ref="isRecommends" :rules="rules">
                <el-form-item class="item-Num" prop="isRecommends">
                  <el-select v-model="scope.row.isRecommends" :disabled="handleDisabled(scope.row.isRecommend)">
                    <el-option v-for="item in isRecommendOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="推荐安排展位数" prop="recommendNumber" align="center" min-width="140px">
          <template slot-scope="scope">
            <div>
              <el-form :model="scope.row" ref="recommendNumber" :rules="rules">
                <el-form-item class="item-Num" prop="recommendNumber">
                  <el-input placeholder="请输入" type="number" v-model.number="scope.row.recommendNumber" :disabled="handleDisabled(scope.row.isRecommend)" oninput="if(value.length>2)value=value.slice(0,2)"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
        -->
        <el-table-column label="推荐理由" prop="recommendReason" align="center" width="800px">
          <template slot-scope="scope">
            <div class="reason_column">
              <span class="reason_check">
                <el-checkbox-group v-model="scope.row.reasonArray">
                  <el-checkbox :label="'1'">
                    相关产品出口额较大
                    <!--<span v-if="handleIsShow('1', scope.row)">_____</span>
                    <el-input v-if="!handleIsShow('1', scope.row)" type="number" v-model.number="scope.row.reasonOne" :disabled="handleDisabled(scope.row.isRecommend)" size="small" oninput="if(value>10)value=value.slice(0,10)" placeholder="请输入" style="width: 70px;"></el-input>
                    （万美元）-->
                  </el-checkbox>
                  <el-checkbox :label="'2'">
                    相关产品国内销售额较大
                    <span v-if="handleIsShow('2', scope.row)">_____</span>
                    <el-input v-if="!handleIsShow('2', scope.row)" type="number" v-model.number="scope.row.reasonTwo" size="small" oninput="if(value>10)value=value.slice(0,10)" placeholder="请输入" style="width: 70px;"></el-input>
                    （万元人民币）
                  </el-checkbox>
                  <el-checkbox :label="'3'" >有参加对应类别知名专业展的经验</el-checkbox>
                </el-checkbox-group>
              </span>
              <span class="reason_check">
                <el-checkbox-group v-model="scope.row.reasonArray">
                  <el-checkbox :label="'4'" >拥有自主知识产权</el-checkbox>
                  <el-checkbox :label="'5'" >拥有境外注册商标</el-checkbox>
                  <el-checkbox :label="'6'" >通过国际行业认证</el-checkbox>
                  <el-checkbox :label="'7'" >近两年参加过商务部组织对外经济合作和援助项目</el-checkbox>
                  <el-checkbox :label="'8'" >
                    其他
                    <span v-if="handleIsShow('8', scope.row)">________________</span>
                    <el-input v-if="!handleIsShow('8', scope.row)" v-model="scope.row.reasonEight" size="small" maxlength="120" placeholder="请输入" style="width: 150px;"></el-input>
                  </el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleRecommendSubmit">提交</el-button>
          <!--<el-button type="primary" size="medium" @click="handlePrint">打印</el-button>-->
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoRo.currentPage"
          :page-size="pageInfoRo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recommendDelegData.total">
        </el-pagination>
      </el-row>
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
      loading: '',
      store,
      exhibitionAreaOpts: [],
      productTypeOpts: [],
      companyOpts: [],
      delegationOpts: [],
      exhibitionTypeOpts: [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' },
      { value: 'CENTER_CHANNEL_BOOTH', label: '中央通道' }, { value: 'UNIFICATION_BOOTH', label: '统一布展' }],
      clusterCheckStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      // 企业推荐
      // isRecommendOpts: [{ value: '2', label: '不推荐' }, { value: '1', label: '推荐' }],
      isRecommendOptsw: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      recommendDelegData: [],
      companyTypeOpts: [],
      coceralOpts: [],
      checkList: [], // 临时选中的值
      selectRow: [],
      multipleSelection: [],
      queryFormRo: {
        exhibitionArea: '',
        productType: '',
        coceralId: this.$store.getters.userInfo.org.deptId,
        companyName: '',
        delegationId: '',
        ifLastJoin: '',
        cecfCode: '',
        isRecommend: ''
      },
      // rules: {
      //   recommendNumber: [{ required: true, message: '请输入', trigger: 'blur' }]
      //   isRecommends: [{ required: true, message: '请选择', trigger: 'blur' }]
      // },
      pageInfoRo: { currentPage: 1, pageSize: 10 }
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
    }
  },
  watch: {
    multipleSelection(data) {  //存储选中的row
      this.selectRow = [];
      for (let i = 0, l = data.length; i < l; i++) {
        if ((data[i].isRecommend === '1' && data[i].reasonArray.length === 0) || (data[i].isRecommend !== '1' && data[i].reasonArray.length > 0)) {
          this.selectRow.push(data[i].demandRecordId);
        } else if (data[i].isRecommend === '1' && data[i].reasonArray.length > 0) {
          let flag = this.handleSelectTable(data[i]);
          if (!flag) {
            this.selectRow.push(data[i].demandRecordId);
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('newThemeRecommendCompany', ['recommendCoceralData']),
    formQueryRo() {
      return {
        exhibitionArea: this.queryFormRo.exhibitionArea,
        productType: this.queryFormRo.productType,
        coceralId: this.queryFormRo.coceralId,
        companyName: this.queryFormRo.companyName,
        delegationId: this.queryFormRo.delegationId,
        ifLastJoin: this.queryFormRo.ifLastJoin,
        cecfCode: this.queryFormRo.cecfCode,
        isRecommend: this.queryFormRo.isRecommend,
        current: this.pageInfoRo.currentPage,
        size: this.pageInfoRo.pageSize
      };
    }
  },
  async created() {
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // // 获取新能源页面展区
    // this.getexhibitionArea().then(resa => {
    //   this.exhibitionArea = JSON.parse(JSON.stringify(resa));
    //   // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    //   // 新题材展区
    //   this.getexhibitionAreaDTOList().then(res => {
    //     this.arr = JSON.parse(JSON.stringify(res.records));
    //     this.arr.forEach((item, index, ar) => {
    //       if (item.isNewThemeArea) { // 是新题材
    //         for (let i = 0; i < this.exhibitionArea.length; i++) {
    //           if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
    //             let exare = {
    //               exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
    //               exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
    //             };
    //             this.exhibitionAreaOpts.push(exare);
    //           }
    //         }
    //       }
    //     });
    //   });
    // }).catch(e => {});
    this.exhibitionAreaOpts = [];
    // 获取商协会对应的展区
    this.getexhibitionAreaByAssociationId({ associationId: this.$store.getters.userInfo.org.deptId }).then(res => {
      for (let i = 0, l = res.length; i < l; i++) {
        if (res[i].exhibitionAreaName === '新能源' || res[i].exhibitionAreaName === '宠物用品') {
          this.exhibitionAreaOpts.push(res[i]);
        } else if (this.$store.getters.userInfo.org.deptCode !== '2' && this.$store.getters.userInfo.org.deptCode !== '4' && this.$store.getters.userInfo.org.deptCode !== '1') {
          this.exhibitionAreaOpts = [];
        }
      }
    }).catch(e => {});
    this.companyTypeOpts = await kindo.dictionary.get('companyType');
    if (this.$route.query.form) {
      this.queryFormRo = this.$route.query.form;
      this.pageInfoRo = this.$route.query.page;
    }
    this.createdQuery();
  },
  methods: {
    ...mapActions('newThemeRecommendCompany', ['getRecommendByCoceral', 'postRecommendCoceral']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList', 'getdelegationDepartment', 'getexhibitionAreaByAssociationId']),
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      this.queryFormRo.productType = '';
      this.productAreaOpts = [];
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          for (let i = 0, l = res.length; i < l; i++) {
            if (this.$store.getters.userInfo.org.deptCode === '2' && res[i].specialAreaName === '宠物食品') {
              this.productTypeOpts.push(res[i]);
            } else if (this.$store.getters.userInfo.org.deptCode === '4' && res[i].specialAreaName === '宠物用品') {
              this.productTypeOpts.push(res[i]);
            } else if (this.$store.getters.userInfo.org.deptCode === '1') {
              this.productTypeOpts.push(res[i]);
            }
          }
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }
    },
    // 前往企业详情
    goCompanyInfo(id, cid) {
      this.$router.push({ path: '/companyDetails', query: { idOne: id, idTwo: cid, form: this.queryFormRo, page: this.pageInfoRo }});
    },
    // 打印
    handlePrint() {
      let paramData = JSON.parse(JSON.stringify(this.recommendCoceralData));
      window.open(window.location.origin + '/#/recommendApplyCompanyPrint?data=' + encodeURI(JSON.stringify(paramData)));
    },
    // 下载
    handleDownload() {
      let url = `coceralCode=${this.$store.getters.userInfo.org.deptCode}&exhibitionArea=${this.queryFormRo.exhibitionArea}&productType=${this.queryFormRo.productType}&coceralId=${this.queryFormRo.coceralId}&companyName=${this.queryFormRo.companyName}&exhibitionType=${this.queryFormRo.exhibitionType}&cecfCode=${this.queryFormRo.cecfCode}&isRecommend=${this.queryFormRo.isRecommend}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyCheck/recommendByCoceral/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 布展类型选择
    // handleTypeDisabled(num, type) {
    //   if (type === 'TZ') {
    //     if (num < 2) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else if (type === 'BT') {
    //     if (num > 0) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }
    // },
    // 是否已推荐
    handleDisabled(status) {
      if (status === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 推荐理由选择
    handleIsShow(id, row) {
      if (row.reasonArray) {
        let index = row.reasonArray.indexOf(id);
        if (index === -1) {
          this.handleClear(id, row);
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    // 推荐理由清空
    handleClear(id, row) {
      switch (id) {
        case '2':
          row.reasonTwo = '';
          break;
        case '8':
          row.reasonEight = '';
          break;
        default:
          break;
      }
    },
    // 信息是否填写而进行推荐
    handleSelectTable(row) {
      if (row.reasonArray.length > 0) {
        // let indexOne = row.reasonArray.indexOf('1');
        let indexTwo = row.reasonArray.indexOf('2');
        let indexEight = row.reasonArray.indexOf('8');
        if (indexTwo === -1 && indexEight === -1) { // 需填写项都不存在
          return true;
        } else if ((indexTwo !== -1 && indexEight === -1) || (indexTwo === -1 && indexEight !== -1)) { // 存在一项需填写项
          if (row.reasonTwo !== '' || row.reasonEight !== '') {
            return true;
          } else {
            return false;
          }
        } else if (row.reasonTwo !== '' && row.reasonEight !== '') { // 存在两项需填写项
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 高亮样式
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.demandRecordId)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    handleCheckedChange(val, row, index) { // 选中的数据获取
      // this.checkList = []; // 初始化，防止重复添加
      // let obj = {
      //   newthemeRecommendDelegation: row
      // };
      // if (val) {
      //   obj.newthemeRecommendDelegation.isRecommend = '1';
      // } else {
      //   obj.newthemeRecommendDelegation.isRecommend = '0';
      // }
      // this.checkList.push(obj);
      // this.handleRecommend();
      // 记录勾选状态
      if (val) {
        this.recommendDelegData.records[index].isRecommend = '1';
      } else {
        this.recommendDelegData.records[index].isRecommend = '0';
      }
    },
    // 提交
    handleRecommendSubmit() {
      let flag = true;
      this.multipleSelection = [];
      for (let i = 0, l = this.recommendDelegData.records.length; i < l; i++) {
        if ((this.recommendDelegData.records[i].isRecommend === '1' && this.recommendDelegData.records[i].reasonArray.length === 0) || (this.recommendDelegData.records[i].isRecommend !== '1' && this.recommendDelegData.records[i].reasonArray.length > 0)) {
          flag = false;
          break;
        } else if (this.recommendDelegData.records[i].isRecommend === '1' && this.recommendDelegData.records[i].reasonArray.length > 0) {
          flag = this.handleSelectTable(this.recommendDelegData.records[i]);
          if (!flag) {
            break;
          }
        }
      }
      if (flag) {
        for (let i = 0, l = this.recommendDelegData.records.length; i < l; i++) {
          this.checkList.push({
            newthemeRecommendDelegation: this.recommendDelegData.records[i]
          });
        }
        this.handleRecommend();
      } else {
        this.multipleSelection = this.recommendDelegData.records;
        this.$message.warning('需同时填写推荐意见和推荐理由时方可提交推荐方案。');
      }
      
    },
    // 进行推荐
    handleRecommend() {
      // this.lastCheckData[this.pageInfoRo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      // let getList = Array.prototype.concat.apply([], this.lastCheckData);
      // if (getList.length > 0) {
      // 推荐理由整理
      this.loading = true;
      let reasonContentArr = ['相关产品出口额较大', '相关产品国内销售额较大', '有参加对应类别知名专业展的经验', '拥有自主知识产权', '拥有境外注册商标',
        '通过国际行业认证', '近两年参加过商务部组织对外经济合作和援助项目', '其他'];
      let index;
      let recommendData = [];
      for (let i = 0; i < this.checkList.length; i++) {
        let record = this.checkList[i].newthemeRecommendDelegation;
        let arr = [];
        if (record.reasonArray) {
          for (let t = 0; t < reasonContentArr.length; t++) {
            index = record.reasonArray.indexOf(t + 1 + '');
            if (t === 1 && index !== -1) { // 第二项理由存在
              arr.push(`${reasonContentArr[t]}${record.reasonTwo}（万元人民币）`);
            } else if (t === 7 && index !== -1) { // 第八项理由存在
              arr.push(`${reasonContentArr[t]}${record.reasonEight}`);
            } else if (index !== -1) {
              arr.push(`${reasonContentArr[t]}`);
            }
          }
          record.recommendReason = arr.join(',');
        }
        // 临时存储的传参
        let obj = {};
        let data = JSON.parse(JSON.stringify(this.checkList[i].newthemeRecommendDelegation));
        obj = {
          boothType: data.productType,
          boothTypeName: data.productTypeName,
          coceralId: data.coceralId,
          coceralCode: data.coceralCode,
          coceralName: data.coceralName,
          companyCecfCode: data.cecfCode,
          delegationId: data.delegationId,
          delegationCode: data.delegationCode,
          delegationName: data.delegationName,
          companyId: data.companyId,
          companyName: data.companyName,
          demandRecordId: data.demandRecordId,
          exhibitionAreaCode: data.exhibitionArea,
          exhibitionAreaName: data.exhibitionAreaName,
          exhibitionSession: data.exhibitionSession,
          // recommendNumber: data.recommendNumber,
          isRecommend: data.isRecommend,
          recommendReason: data.recommendReason,
          reasonArray: data.reasonArray.length > 1 ? data.reasonArray.join(',') : data.reasonArray[0],
          reasonOne: '',
          reasonTwo: data.reasonTwo,
          reasonEight: data.reasonEight
        };
        recommendData.push(obj);
      }
        // this.$confirm('确定将选择的所有企业进行推荐吗', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'wargning'
        // }).then(() => {
      this.postRecommendCoceral(recommendData).then(() => {
        this.$message.success('操作成功');
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
        // }).catch(() => {
        //   this.$message.info('已取消本次操作');
        // });
      // } else {
      //   this.$message.warning('请至少选择一项');
      // }
    },
    // 查询
    handleQuery() {
      this.pageInfoRo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfoRo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfoRo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getRecommendByCoceral(this.formQueryRo).then(data => {
        this.loading = false;
        let directiveData = JSON.parse(JSON.stringify(this.recommendCoceralData));
        for (let i = 0; i < directiveData.records.length; i++) {
          if (data.records[i].isRecommend === '0') {
            directiveData.records[i].checked = false;
          } else {
            directiveData.records[i].checked = true;
          }
          if (directiveData.records[i].recommendCommerce == null) {
            directiveData.records[i].reasonArray = [];
            directiveData.records[i].reasonOne = '';
            directiveData.records[i].reasonTwo = '';
            directiveData.records[i].reasonEight = '';
            directiveData.records[i].recommendReason = '';
          } else {
            // directiveData.records[i].recommendNumber = data.records[i].recommendCommerce.recommendNumber;
            // directiveData.records[i].isRecommends = data.records[i].recommendCommerce.isRecommend;
            if (data.records[i].recommendCommerce.reasonArray !== '' && data.records[i].recommendCommerce.reasonArray != null) {
              if (data.records[i].recommendCommerce.reasonArray.indexOf(',') === -1) {
                let list = [];
                list[0] = data.records[i].recommendCommerce.reasonArray;
                directiveData.records[i].reasonArray = list;
              } else {
                directiveData.records[i].reasonArray = data.records[i].recommendCommerce.reasonArray.split(',');
              }
            } else {
              directiveData.records[i].reasonArray = [];
            }
            directiveData.records[i].reasonOne = '';
            directiveData.records[i].reasonTwo = data.records[i].recommendCommerce.reasonTwo;
            directiveData.records[i].reasonEight = data.records[i].recommendCommerce.reasonEight;
            directiveData.records[i].recommendReason = data.records[i].recommendCommerce.recommendReason;
          }
        }
        this.checkList = [];
        this.recommendDelegData = directiveData;
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
.item-Num >>> input::-webkit-outer-spin-button,
.reason_check >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button,
.reason_check >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"],
.reason_check >>> input[type="number"] {
  -moz-appearance: textfield!important;
}
.recommend_table >>> .cell .reason_column {
  display: flex;
  justify-content: center;
  text-align: left;
}
.cell .reason_check{
  border-right: 1px solid #ebeef5;
  width: 50%;
  display:inline-block;
  margin: 0 10px;
}
.cell .reason_check:last-child{
  border: none;
}
.pagination-footer{
  margin-top: 20px;
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
