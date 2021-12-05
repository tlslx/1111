<template>
  <el-container>
    <el-header>
      <headline :label="languageSource.LocationLang.onlineLabel" />
    </el-header>
    <el-main class="p-b-n" v-loading.fullscreen.lock="fullscreenLoading">
      <el-form :inline="true" :model="searchForm" label-position="left">
        <el-form-item class="m-b-n" :label="languageSource.LocationLang.exportCode">
          <el-input v-model="searchForm.code" clearable ></el-input>
        </el-form-item>
        <el-form-item class="m-b-n" :label="languageSource.RuleSettingLang.enterpriseNameTable">
          <el-input v-model="searchForm.companyNameCh" clearable ></el-input>
        </el-form-item>
        <el-form-item class="m-b-n" :label="languageSource.LocationLang.programCode" >
          <el-input v-model="searchForm.cantonCode" clearable ></el-input>
        </el-form-item>
        <el-form-item class="m-b-n" :label="languageSource.LocationLang.exhibitionHall">
          <el-select v-model="exhibitionHall" clearable placeholder="请先选择展厅" @change="switchExhibitionHall">
            <el-option
              v-for="(session, index) in exhibitionArray"
              :key="index"
              :label="session.exhibitionHallCode"
              :value="session.exhibitionHallCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button type="primary" @click="canvasToSvg">{{languageSource.CommonLang.export}}</el-button>
          <el-button type="primary" @click="helpState = true" >{{languageSource.LocationLang.help}}</el-button>
          <el-button type="info" @click="canvasReset">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
        <el-row>
          <el-col :span="4">
            <div class="zoomInput">
              <el-input v-model='zoom.show' :max="zoom.max" :min="zoom.min" @change="numChange">
                <el-button icon="el-icon-minus" slot="prepend" size="small" :disabled="zoom.disabledReduce" style="padding: 7px 12px;" @click="handleChange(zoom.defaultZoom - zoom.step)" ></el-button>
                <el-button icon="el-icon-plus" slot="append" size="small" :disabled="zoom.disabledAdd" style="padding: 7px 12px;" @click="handleChange(zoom.defaultZoom + zoom.step)"></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="el-menu-toolbar" :class="border">
        <img class="collapse-img" :src="icon.collapse" @click="toggle">
        <table :class="collapse">
          <tr>
            <td @click="onlinePlanFunc" :class="{'hide': (arrangeShwo ? operationShow : true)}" v-if="right('onlinePlan')">
              <template>
                <img :src="icon.onlinePlan">
                <div>{{languageSource.LocationLang.onlineLabel}}</div>
              </template>
            </td>
          </tr>
          <tr @click="removePlaned" :class="{'hide': (arrangeShwo ? operationShow : true)}" v-if="right('remove')">
            <td>
              <template>
                <img :src="icon.remove">
                <div>{{languageSource.LocationLang.reomveArrange}}</div>
              </template>
            </td>
          </tr>
          <tr>
            <td @click="seatAdjustment" :class="{'hide': arrangeShwo}" v-if="right('changePng')">
              <template>
                <img :src="icon.changePng">
                <div>{{languageSource.AdjustmentApply.seatAdjust}}</div>
              </template>
            </td>
          </tr>
         <!-- <tr>
            <td @click="checkProgressFunc">
              <template>
                <img :src="icon.progress">
                <div>{{languageSource.CheckProgress.view}}</div>
              </template>
            </td>
          </tr>-->
          <tr>
            <td @click="contrastFunc" v-if="right('contrast')">
              <template>
                <img :src="icon.contrast">
                <div>{{languageSource.LocationLang.schemeComparison}}</div>
              </template>
            </td>
          </tr>
          <tr>
            <td @click="showContrast" v-if="right('contrastExport')">
              <template>
                <img :src="icon.contrastExport">
                <div>{{languageSource.LocationLang.contrastExport}}</div>
              </template>
            </td>
          </tr>
         <!-- <tr>
            <td  v-if="right('specialArea')">
              <template>
                <img :src="icon.specialArea">
                <div>{{languageSource.LocationLang.specialArealabel}}</div>
              </template>
            </td>
          </tr>-->
         <!-- <tr>
            <td>
              <template>
                <img :src="icon.passageway">
                <div>{{languageSource.LocationLang.passagewaylabel}}</div>
              </template>
            </td>
          </tr>-->
          <tr>
            <td @click="validateChannelFunc" v-if="right('toList') && this.exhibitionProperty === '品牌展位'">
              <template>
                <img :src="icon.toList">
                <div>{{languageSource.LocationLang.passagewayTable}}</div>
                <!--<div>{{languageSource.LocationLang.createTable}}</div>-->
              </template>
            </td>
          </tr>
          <tr>
            <td @click="switchShowDesc(2)"  v-if="right('mainProduct')">
              <template>
                <img :src="icon.mainProduct">
                <div>{{languageSource.LocationLang.mainProductlabel}}</div>
              </template>
            </td>
          </tr>
          <tr>
            <td @click="switchShowDesc(4)" v-if="right('secondLevel')">
              <template>
                <img :src="icon.secondLevel">
                <div>{{languageSource.LocationLang.secondLevellabel}}</div>
              </template>
            </td>
          </tr>
          <tr>
            <td @click="switchShowDesc(6)"  v-if="right('business')">
              <template>
                <img :src="icon.business">
                <div>{{languageSource.LocationLang.businessLabel}}</div>
              </template>
            </td>
          </tr>
          <tr>
            <td @click="showInfoFunc"  v-if="right('selectType')">
              <template>
                <img :src="icon.selectType">
                <div>{{languageSource.LocationLang.selectTypeLabel}}</div>
              </template>
            </td>
          </tr>
          <tr>
            <td @click="helpState = true" v-if="right('help')">
              <template>
                <img :src="icon.helpPng">
                <div>{{languageSource.LocationLang.help}}</div>
              </template>
            </td>
          </tr>
        </table>
      </div>
      <div >
        <div class="canvas-box" ref="canvasBox">
          <canvas v-for="(item, index) in exhibitionArray" :key="index" :ref="item.exhibitionHallCode"></canvas>
        </div>
      </div>
      <!-- 已分配展位信息 -->
      <div class="tooltip" :class="{'hide': tooltip.hidden}" ref="tooltip">
        <!-- 标准展位 -->
        <div v-if="!tooltip.island">
          <div class="title">
          <el-row>
            <el-col :span="5">{{languageSource.AdjustmentApply.boothCode}}</el-col><el-col :span="7">{{tooltip.code}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">{{languageSource.RuleSettingLang.enterpriseName}}</el-col><el-col :span="10">{{tooltip.enterprise.companyNameCh}}</el-col>
            <el-col :span="4">{{languageSource.AdjustmentApply.businessDelegation}}</el-col><el-col :span="5">{{tooltip.enterprise.businessDelegation}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">{{languageSource.LocationLang.programName}}</el-col><el-col :span="10">{{tooltip.enterprise.schemeName}}</el-col>
            <el-col :span="4">{{languageSource.AdjustmentApply.association}}</el-col><el-col :span="5">{{tooltip.enterprise.mainProductKeywordCh}}</el-col>
          </el-row>
        </div>
        <div class="title" :class="{'hide': tooltip.hideContrast}">
          <el-row>
            <el-col :span="10">{{languageSource.LocationLang.contrastInfo}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">{{languageSource.RuleSettingLang.enterpriseName}}</el-col><el-col :span="10">{{ tooltip.contrastScheme.companyNameCh}}</el-col>
            <el-col :span="4">{{languageSource.AdjustmentApply.businessDelegation}}</el-col><el-col :span="5">{{tooltip.contrastScheme.businessDelegation}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">{{languageSource.LocationLang.programName}}</el-col><el-col :span="10">{{tooltip.contrastScheme.schemeName}}</el-col>
            <el-col :span="4">{{languageSource.AdjustmentApply.association}}</el-col><el-col :span="5">{{tooltip.contrastScheme.mainProductKeywordCh}}</el-col>
          </el-row>
        </div>
        </div>
        <!-- 岛型展位 -->
        <div v-if="tooltip.island">
          <el-row>
            <el-col :span="5">{{languageSource.LocationLang.programName}}</el-col><el-col :span="10">{{tooltip.enterprise.schemeName}}</el-col>
          </el-row>
          <div v-for="(item, index) in tooltip.islandData" class="island-row" :key="index">
            <el-row>
              <el-col :span="5">{{languageSource.RuleSettingLang.enterpriseName}}</el-col>
              <el-col :span="10">{{item.enterprise.companyNameCh}}</el-col>
              <el-col :span="4">{{languageSource.AdjustmentApply.businessDelegation}}</el-col>
              <el-col :span="5">{{item.enterprise.businessDelegation}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">{{languageSource.AdjustmentApply.boothCode}}</el-col>
              <el-col :span="10">{{item.code}}</el-col>
              <el-col :span="4">{{languageSource.AdjustmentApply.association}}</el-col>
              <el-col :span="5">{{item.enterprise.mainProductKeywordCh}}</el-col>
            </el-row>
          </div>
        </div>
        <div>
          <el-table :data="tooltip.tableData" border style="width: 100%">
            <el-table-column fixed prop="rule" :label="languageSource.LocationLang.breakRules" align="center" width="260"></el-table-column>
            <el-table-column fixed prop="result" :label="languageSource.AdjustmentApply.reviewResult" align="center">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.result" type="success" class="btn-style" icon="el-icon-check" circle size="mini"></el-button>
                <el-button v-if="scope.row.result" type="danger" class="btn-style" icon="el-icon-close" circle size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 在线安排展位弹出框 -->
      <online-plan
        ref="onlinePlan"
        @onlinePlan="onlinePlan"
        :languageSource="languageSource"
        :selectedCodes="selectedCodes"
        :showCheckbox="showCheckbox"
        :exhibitionNum="exhibitionNum"
        :planedData="planedData"
      />

      <!-- 检查安排进度 -->
      <!-- <check-progress
        ref="checkProgress"
        :exhibitionPeriodNum="exhibitionPeriodNum"
        :languageSource="languageSource"
        :planedData="planedData"
        type="seatArea"
      /> -->

      <!-- 方案对比 -->
      <contrast
        ref="contrast"
        @contrast="contrastSureFunc"
        :regionOfExhibition="regionOfExhibition"
        :languageSource="languageSource"
        type="seatArea"
      />

      <!-- 生成列表 -->
      <create-table
        ref="createTable"
        :languageSource="languageSource"
      />

      <!-- 选择位置展示类型 -->
      <show-booth-info
        ref="showBoothInfo"
        @boothInfo='boothInfoFunc'
        :languageSource="languageSource"
      />

      <!-- 方案对比导出弹框 -->
      <contrast-export
        ref="contrastExport"
        :languageSource="languageSource"
      />

      <!-- 方案交换弹框 -->
      <seat-change
        ref="seatChange"
        @seatAdjustment="seatChangeFunc"
        :languageSource="languageSource"
        :selectedCodes="selectedCodes"
        :planedData="planedData"
      />

      <!-- 插件图操作帮助提示信息 -->
      <el-dialog
        width="50%"
        :title="languageSource.LocationLang.helpTitle"
        :visible.sync="helpState">
        <div>
          <p>{{languageSource.LocationLang.tipsOne}}</p>
          <p>{{languageSource.LocationLang.tipsTwo}}</p>
          <p>{{languageSource.LocationLang.tipsThree}}</p>
          <p>{{languageSource.LocationLang.tipsFourth}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="helpState = false" >{{languageSource.CommonLang.close}}</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  // import { exhibitionData } from './data';
  import axios from 'axios';
  import { fabric4Ex } from './fabric.extend.js';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  import * as img from "@/../static/img/stallplan";
  import config from './index';
  import bridge from './bridge';
  import JsPDF from 'jspdf';
  const http = axios.create({
    headers: { Token: localStorage.getItem('USER_TOKEN') },
    timeout: 60000
  });
  export default {
    name: 'gear',
    mixins: [listPageBase],
    components: {
      'headline': () => import('../../components/headline'),
      // 'checkProgress': () => import('./checkProgess.vue'),
      'onlinePlan': () => import('./onlinePlan.vue'),
      'contrast': () => import('./contrast.vue'),
      'createTable': () => import('./createTable.vue'),
      'showBoothInfo': () => import('./showBoothInfo.vue'),
      'contrastExport': () => import('./contrastExport.vue'),
      'seatChange': () => import('./seatAdjustment.vue')
    },
    props: {
      'languageSource': {
        'type': Object
      },
      'currentPagId': {
        'type': String
      }
    },
    data() {
      return {
        'pageId': this.currentPagId,
        tooltip: {
          hidden: true,
          hideContrast: true,
          island: false,
          lastCode: '',
          code: '',
          enterprise: {},
          contrastScheme: {},
          tableData: [],
          islandData: []
        },
        config,
        operationShow: false,
        isClose: false,
        collapse: '',
        border: '',
        queryParams: {},
        icon: {
          collapse: img['collapseOpen'],
          onlinePlan: img['onlinePlanBlue'],
          progress: img['progressBlue'],
          contrast: img['contrastBlue'],
          contrastExport: img['contrastExportGray'],
          specialArea: img['specialAreaBlue'],
          passageway: img['passagewayBlue'],
          toList: img['toListBlue'],
          mainProduct: img['mainProductBlue'],
          secondLevel: img['secondLevelBlue'],
          business: img['businessBlue'],
          selectType: img['selectTypeBlue'],
          remove: img['removeBlue'],
          changePng: img['icon'],
          helpPng: img['helpBlue']
        },
        hasContrasted: false,
        selectedCodes: '',
        showCheckbox: false,
        exhibitionNum: 0,
        planedData: {},
        'searchForm': {},
        //展区
        'regionOfExhibition': [],
        //展期
        'exhibitionPeriodNum': [],
        contrastObj: {},
        //加载样式
        fullscreenLoading: false,
        currentCanvas: {}, // 当前操作的canvas对象
        currentCanvasCode: '',
        allCanvas: {},
        arrangeShwo: true, //商协会位置安排展位交换安排状态
        schemaInfo: {},
        autoPlanIndex: 0,
        exhibitionProperty: '',
        adjustedRows: {}, //调整后的展位信息
        helpState: false, //插件操作帮助提示弹框
        canvasWidth: 0,
        allHallData: {},
        num: 0,
        zoom: {
          min: 1,
          max: 20,
          step: 0.1,
          show: '100%',
          defaultZoom: 1,
          disabledAdd: false,
          disabledReduce: true
        },
        exhibitionHall: "",
        exhibitionArray: [] //展厅数据
      };
    },
    async beforeCreate () {
      //读取数据字典
      this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
      this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    },
    beforeMount () {
      // 获取方案用于规则校验及反显的相关数据
      this.fullscreenLoading = true;
      this.getRuleValidateData()
      .then(ruleValidateData => {
        this.ruleValidateData = ruleValidateData.data.data;
      });
    },
    mounted () {
      this.queryParams = this.$route.query;
      this.exhibitionProperty = this.queryParams.scopeRow.exhibitionProperty;
      this.operationShow = this.queryParams.pluginBtnState !== true;
      this.arrangeShwo = this.queryParams.tag === 'patchSchemeAdd' ? !(this.queryParams.tag === 'patchSchemeAdd' && this.queryParams.addState) : this.queryParams.tag !== 'businessArrange';

      const _this = this;
      // 初始化展厅
      this.getExpHalls()
      .then(res => {
        _this.exhibitionArray = res.data.data.exhibitionHalls || [];
        // 若当前展去只存在一个展厅,则默认加载,否则选择展厅后加载
        if (_this.exhibitionArray.length === 1) {
          this.currentCanvasCode = this.exhibitionArray[0].exhibitionHallCode;
          this.getBaseMapData(this.currentCanvasCode)
          .then(response => {
            this.exhibitionHall = this.currentCanvasCode;
            this.allHallData[this.currentCanvasCode] = response.data.data;
            this.currentCanvas = this.init(this.currentCanvasCode, response.data.data);
            this.fullscreenLoading = false;
          });
          return;
        }
        this.fullscreenLoading = false;
      });

      document.body.addEventListener('mousemove', (event) => {
        if (event.target.tagName !== 'CANVAS') {
          _this.tooltip.hidden = true;
          _this.tooltip.lastCode = null;
        }
      });


      /*window.addEventListener('resize', () => {
        if (_this.currentCanvas && _this.currentCanvas.dispose) {
          _this.currentCanvas.dispose();
          _this.currentCanvas = this.init(this.currentCanvasKey, this.allHallData[this.currentCanvasKey]);
        }
      });*/
    },
    methods: {
      //获取展厅数据
      getExpHalls() {
        const scopeRow = this.$route.query.scopeRow;
        const params = {
          exhibitionNum: scopeRow.sessionNumber,
          periodCode: scopeRow.exhibitionPeriod,
          isCentralChannel: scopeRow.isCentralPassage,
          exhibitionAreaCode: scopeRow.exhibitionAreaCode
        };
        return http.get(this.config.api.getExpHalls, { params: params });
      },
      //获取底图信息记录
      getBaseMapData(exhibitionHallCode) {
        const scopeRow = this.$route.query.scopeRow;
        const params = {
          exhibitionNum: scopeRow.sessionNumber,
          periodCode: scopeRow.exhibitionPeriod,
          exhibitionAreaCode: scopeRow.exhibitionAreaCode,
          exhibitionHallCode: exhibitionHallCode
        };
        return http.get(this.config.api.getExpBoothInfo, { params: params });
      },
      // 获取方案规则校验所需要的数据
      getRuleValidateData() {
        const scopeRow = this.$route.query.scopeRow;
        let params = {
          exhibitionAreaName: scopeRow.exhibitionAreaName,
          exhibitionAreaCode: scopeRow.exhibitionAreaCode,
          schemeId: scopeRow.schemeId,
          sessionNumber: scopeRow.sessionNumber,
          isCentralPassage: scopeRow.isCentralPassage,
          exhibitionPeriod: scopeRow.exhibitionPeriod,
          exhibitionProperty: scopeRow.exhibitionProperty,
          exhibitionKind: scopeRow.exhibitionKind
        };
        return http.get(this.config.api.getCheckData, { params: params });
      },
      getBlackInfo(companyId) {
        let sessionNumber = this.$route.query.scopeRow.sessionNumber;
        return this.$http.get(this.config.api.getBlackInfo, {
          companyId: companyId,
          exhibitionNum: Number(sessionNumber),
          exhibitionAreaCode: this.$route.query.scopeRow.exhibitionAreaCode
        });
      },
      getIcon (id) {
        return this.$http.get(`${this.config.api.getIcon}/${id}?gridBucket=BOOTH_CAD`);
      },
      getHallDrawData (exhibitionHallCoordinates = []) {
        const xArray = exhibitionHallCoordinates.map(item => item.pointX);
        const yArray = exhibitionHallCoordinates.map(item => item.pointY);
        const [xMin, xMax] = [Math.min(...xArray), Math.max(...xArray)];
        const [yMin, yMax] = [Math.min(...yArray), Math.max(...yArray)];
        return {
          width: xMax - xMin,
          height: yMax - yMin
        };
      },
      // 页面初始化
      init(canvasKey, exhibitionHallData) {
        this.canvasWidth = this.$refs.canvasBox.clientWidth || this.canvasWidth;
        const width = this.canvasWidth;
        const hall = this.getHallDrawData(exhibitionHallData.exhibitionHallCoordinates);
        const height = width * hall.height / hall.width;
        this.$refs.canvasBox.style.height = `${height}px`;
        const canvas = new fabric4Ex.Canvas(this.$refs[canvasKey][0], { width, height });
        if (!this.allCanvas[canvasKey]) {
          this.allCanvas[canvasKey] = canvas;
        }
        canvas.schemaInfo = {
          exhibitionAreaName: this.queryParams.scopeRow.exhibitionAreaName,
          exhibitionAreaCode: this.queryParams.scopeRow.exhibitionAreaCode,
          exhibitionProperty: this.queryParams.scopeRow.exhibitionProperty
        };
        canvas.getBlackInfo = this.getBlackInfo;
        canvas.downloadIconUrl = this.config.api.downloadFile;
        canvas.getIcon = this.getIcon;
        canvas.isNotValidated = this.queryParams.notValidateArray;
        canvas.drawGraph(exhibitionHallData, !this.operationShow);
        canvas.ruleValidateData = this.ruleValidateData;
        canvas.addEventListener();
        this.showEnterpriseDetail(canvas);
        this.invertDifferentSchemas(canvas);
        if (this.queryParams.tag === 'gearDialog') { //显示自动安排和导入的信息
          this.showAutoPlan(canvas);
          this.showImportPlan(canvas);
        }
        if (this.queryParams.addState && (this.queryParams.tag === 'businessArrange'
          || this.queryParams.tag === 'patchSchemeAdd')) { //显示商协会位置安排企业信息
          this.showPatchAddInfo(canvas, this.queryParams.scopeRow.selectData, true);
        }
        if (this.queryParams.addState) {
          this.fullscreenLoading = false;
          this.showValidateRule();
        } else {
          this.getDetail(canvas);
        }
        return canvas;
      },
      // 显示导入安排的展位
      showImportPlan (canvas) {
        let languageSource = this.languageSource;
        if (this.queryParams.scopeRow && this.queryParams.scopeRow.paSchemeEnterpriseList) {
          let notExistCodes = [];
          this.queryParams.scopeRow.paSchemeEnterpriseList.forEach((item) => {
            const boothNos = item.boothNo.split(',');
            // 过滤掉不可操控的展位
            const exhibitions = canvas.getExhibitionByCodes(boothNos).filter(
              exhibition => exhibition.selectable);
            const findCodes = exhibitions.map(exhibition => exhibition.code);
            notExistCodes = notExistCodes.concat(
              boothNos.filter(boothNo => findCodes.indexOf(boothNo) === -1));
            canvas.invertPlaned(item, exhibitions);
          });
          canvas.invertIslandExhibitions(
            canvas._objects.filter(item => item.selectable && item.type === 'island'));
          if (notExistCodes.length) {
            this.$emit("disableBtn");
            kindo.util.confirm(
              `${notExistCodes.join(',')}${languageSource.AdjustmentApply.boothNoExistInfo}`,
              languageSource.CommonLang.tips, 'error');
          }
          this.initPlanedData(this.queryParams.scopeRow.paSchemeEnterpriseList);
          this.showValidateRule();
          bridge.$emit('data-to-checkeing', this.planedData);
        }
      },
      // 显示自动安排的展位
      showAutoPlan (canvas) {
        if (this.queryParams.scopeRow && this.queryParams.scopeRow.autoArrangeRow) {
          const scopeRow = this.queryParams.scopeRow;
          const enterpriseRows = scopeRow.autoArrangeRow;
          const allExhibitions = canvas.getAbleExhibitions(scopeRow.exhibitionState).filter(
            item => !item.exhibition.isIsland);
          const length = allExhibitions.length;
          let currentIndex = 0;
          enterpriseRows.forEach(item => {
            currentIndex += item.boothNum;
            if (currentIndex < this.autoPlanIndex) {
              return;
            } else {
              currentIndex = currentIndex - this.autoPlanIndex;
              this.autoPlanIndex = 0;
            }
            const exhibitions = allExhibitions.filter(
              (object, index) => index < currentIndex && index >= currentIndex - item.boothNum);
            canvas.planExhibition(item, exhibitions);
          });
          this.autoPlanIndex = length > currentIndex ? currentIndex : length;
          this.setPlanData(canvas);
          this.showValidateRule();
          bridge.$emit('data-to-checkeing', this.planedData);
        }
      },
      // 反显与当前方案不同展位性质及布展类型的已提交方案数据
      invertDifferentSchemas(canvas) {
        this.ruleValidateData && this.ruleValidateData.paSchemeList
        && this.ruleValidateData.paSchemeList.forEach(schema => {
          let enterpriseList = schema.paSchemeEnterpriseList || [];
          // 根据公司和专区分组
          const group = {};
          enterpriseList.forEach(enterprise => {
            const key = enterprise.companyId + enterprise.exhibitsSpecialAreaCode;
            if (group[key]) {
              group[key].boothNo += `,${enterprise.boothNo}`;
            } else {
              group[key] = enterprise;
            }
          });
          Object.values(group).forEach((item) => {
            const exhibitions = canvas.getExhibitionByCodes(item.boothNo.split(','));
            item['schemeName'] = schema.schemeName;
            canvas.invertOtherPlaned(item, exhibitions.filter(exh => !exh.planInfo));
          });
        });
        const islandExhibitions = canvas._objects.filter(item => item.type === 'island'
              && item.split && item.split.length && item.split[0].planInfo);
        canvas.invertIslandExhibitions(islandExhibitions);
        islandExhibitions.forEach(item => {
          item.setOptions({
            selectable: false,
            hoverCursor: 'not-allowed',
            isInverted: true
          });
        });
      },
      // 切换展厅
      switchExhibitionHall(code) {
        this.fullscreenLoading = true;
        this.currentCanvasCode = code;
        if (this.allCanvas[code]) {
          this.currentCanvas = this.allCanvas[code];
          this.exhibitionArray.forEach(item => {
            const element = this.$refs[item.exhibitionHallCode][0];
            element.style.display = 'none';
          });
          this.$refs[code][0].style.display = 'inline';
          this.$refs[code][0].parentElement.style.display = 'inline';
          this.fullscreenLoading = false;
        } else {
          this.getBaseMapData(code)
          .then(res => {
            this.allHallData[code] = res.data.data;
            this.currentCanvas = this.init(code, res.data.data);
            this.exhibitionArray.forEach(item => {
              const element = this.$refs[item.exhibitionHallCode][0];
              element.style.display = 'none';
            });
            this.$refs[code][0].style.display = 'inline';
            this.$refs[code][0].parentElement.style.display = 'inline';
            this.fullscreenLoading = false;
          });
        }
      },
      initPlanedData (schemaDetailList = []) {
        schemaDetailList.forEach(item => {
          this.planedData[item.companyId] = item;
        });
      },
      dealArray (str) {
        const array = str.split(',');
        const setArray = new Set(array);
        return [...setArray].filter(item => item.length);
      },
      // 设置分配信息
      setPlanData (canvas = this.currentCanvas) {
        const currentPlanedData = canvas.getEnterpeisePlanedData();
        const currentCompanyIds = Object.keys(currentPlanedData);
        const plantedCompanyIds = Object.keys(this.planedData);
        for (const key in this.planedData) {
          this.planedData[key].addBoothNo = this.planedData[key].addBoothNo || '';
          this.planedData[key].deleteBoothNo = this.planedData[key].deleteBoothNo || '';
          if (currentCompanyIds.indexOf(key) + 1) {
            this.planedData[key].addBoothNo += `,${currentPlanedData[key].addBoothNo || ''}`;
            this.planedData[key].deleteBoothNo += `,${currentPlanedData[key].deleteBoothNo || ''}`;
          } else {
            const current = this.planedData[key];
            const boothNos = current.boothNo || current.addBoothNo;
            if (boothNos) {
              const findExhibition = canvas.getExhibitionByCodes(boothNos.split(','));
              this.planedData[key].deleteBoothNo += `,${findExhibition.map(item => item.code).join(
                ',')}`;
            }
          }
          this.planedData[key].addBoothNo = this.dealArray(this.planedData[key].addBoothNo).join(
            ',');
          this.planedData[key].deleteBoothNo = this.dealArray(
            this.planedData[key].deleteBoothNo).join(',');
        }
        for (const key in currentPlanedData) {
          if (plantedCompanyIds.indexOf(key) + 1 === 0) {
            this.planedData[key] = currentPlanedData[key];
          }
        }
        bridge.$emit('data-to-checkeing', this.planedData);
      },
      showDetail (canvas) {
        let enterpriseList = this.schemaInfo.paSchemeEnterpriseList || [];
        enterpriseList.forEach((item) => {
          const exhibitions = canvas.getExhibitionByCodes(item.boothNo.split(','));
          exhibitions.length && canvas.invertPlaned(item, exhibitions);
        });
        canvas.invertIslandExhibitions(
          canvas._objects.filter(item => item.selectable && item.type === 'island'));
        this.showValidateRule();
        if (this.queryParams.schemaValue) {
          this.contrastObj = this.queryParams.schemaValue;
          canvas.contrastSchema(this.queryParams.schemaValue);
          this.icon.contrastExport = img['contrastExportBlue'];
          this.hasContrasted = true;
        }
        this.fullscreenLoading = false;
      },
      showValidateRule() {
        const ruleRelatedData = {};
        Object.values(this.allCanvas).forEach(canvas => {
          const current = canvas.getRuleRelatedData();
          ruleRelatedData.allValidateRule = current.allValidateRule;
          if (ruleRelatedData.violateRuleList) {
            const violateRuleList = current.violateRuleList;
            Object.keys(violateRuleList).forEach(key => {
              if (ruleRelatedData.violateRuleList[key]) {
                Object.keys(violateRuleList[key]).forEach(innerKey => {
                  if (ruleRelatedData.violateRuleList[key][innerKey]) {
                    const code = ruleRelatedData.violateRuleList[key][innerKey].code;
                    ruleRelatedData.violateRuleList[key][innerKey].code = code + ","
                      + violateRuleList[key][innerKey].code;
                  } else {
                    ruleRelatedData.violateRuleList[key][innerKey] = violateRuleList[key][innerKey];
                  }
                });
              } else {
                ruleRelatedData.violateRuleList[key] = violateRuleList[key];
              }
            });
          } else {
            ruleRelatedData.violateRuleList = current.violateRuleList;
          }
        });
        this.$emit("validate", ruleRelatedData);
      },
      //获取相关详情记录
      getDetail (canvas) {
        this.fullscreenLoading = true;
        if (Object.keys(this.schemaInfo).length) {
          this.showDetail(canvas);
          return;
        }
        let scopeRow = this.$route.query.scopeRow;
        let right = this.$route.query.right;
        let params = {};
        let url = '';
        //位置安排申请查看详情
        if (right === 'seatApplyView') {
          params = { 'json': { "schemeId": scopeRow.schemeId }};
          url = this.config.api.getApproveDetails;
        } else if (right === 'seatApplyReview') { //位置安排审核查看详情
          params = {
            'json': {
              "schemeId": scopeRow.schemeId,
              "taskEntities": [{
                "curActId": scopeRow.curActId ? scopeRow.curActId
                  : scopeRow.taskEntities[0].curActId
              }]
            }
          };
          url = this.config.api.getApproveReviewDetails;
        } else if (right === 'patchSchemeView') { //位置调整申请查看
          params = {
            'json': {
              "schemeId": this.$route.query.scopeRow.schemeId,
              "schemaStatus": this.$route.query.scopeRow.schemaStatus
            }
          };
          url = this.config.api.reviewArrangementGetDetail;
        } else if (right === 'patchSchemeReview') { //位置调整审核查看
          params = {
            'json': {
              "schemeId": this.$route.query.scopeRow.schemeId,
              "taskEntities": [{
                "curActId": scopeRow.curActId ? scopeRow.curActId
                  : scopeRow.taskEntities[0].curActId
              }]
            }
          };
          url = this.config.api.reviewArrangementGetReviewDetail;
        }
        this.$http.get(url, params)
        .then((res) => {
          if (right === 'seatApplyView' || right === 'seatApplyReview') {
            this.schemaInfo = res.schema;
            this.initPlanedData(res.schema.paSchemeEnterpriseList);
            this.showDetail(canvas);
          } else {
            let listData = res.list;
            this.showPatchAddInfo(canvas, listData, false);
          }
        });
      },
      toggle () {
        this.isClose = !this.isClose;
        this.collapse = this.isClose ? 'hide' : '';
        this.border = this.isClose ? 'border-none' : '';
        this.icon.collapse = this.isClose ? img['collapseClose'] : img['collapseOpen'];
      },
      onQuery() {
        this.currentCanvas.onResetQuery();
        const num = this.currentCanvas.onQuery(this.searchForm);
        if (!num) {
          this.$message({
            message: this.languageSource.LocationLang.noAccordCode,
            type: 'info'
          });
        }
      },
      //导出插件展厅图
      canvasToSvg () {
        if (this.queryParams.tag === 'gearDialog' || this.queryParams.tag === 'businessArrange') {
          this.$message.warning(this.languageSource.AdjustmentApply.exportPageMsg);
          return false;
        }
        //导出canvas图片为PDF文件
        let contentWidth = this.currentCanvas.width;
        let contentHeight = this.currentCanvas.height;
        let pageHeight = contentWidth / 592.28 * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 595.28;
        let imgHeight = 592.28 / contentWidth * contentHeight;
        let pageData = this.currentCanvas.toDataURL('image/jpeg', 1.0);
        let PDF = new JsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          //如果页面数据过长则下载成多个页面
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        //保存为PDF文件
        PDF.save(this.queryParams.scopeRow.schemeName + '.pdf');
      },
      canvasReset() {
        this.fullscreenLoading = true;
        this.searchForm = {};
        this.currentCanvas.reset();
        this.currentCanvas.changeShowModel(1);
        this.currentCanvas.onResetQuery();

        this.icon.contrastExport = img['contrastExportGray'];
        this.currentCanvas.removeContrast(this.queryParams.scopeRow.schemeId);
        if (this.hasContrasted) {
          this.hasContrasted = false;
          this.invertDifferentSchemas(this.currentCanvas);
        }
        this.fullscreenLoading = false;
      },
      //在线安排点击方法
      onlinePlanFunc() {
        const checkedList = this.currentCanvas.getExhibitionByPropName('checked', true);
        const hasIsland = checkedList.some(item => item.exhibition.isIsland);
        if (hasIsland && checkedList.some(item => !item.exhibition.isIsland)) {
          this.$message({
            message: this.languageSource.AdjustmentApply.selectOneTips,
            type: 'warning'
          });
          return;
        }
        if (!checkedList || !checkedList.length) {
          this.$message({
            message: this.languageSource.LocationLang.selectCodeTips,
            type: 'warning'
          });
          return;
        }
        this.showCheckbox = hasIsland;
        const codes = [];
        this.exhibitionNum = 0;
        checkedList.forEach(item => {
          codes.push(item.code);
          this.exhibitionNum += (hasIsland ? item.split.length : 1);
        });
        this.selectedCodes = codes.join(',');
        this.$refs.onlinePlan.dialogVisible = true;
        this.$refs.onlinePlan.specialAreaLegend = this.currentCanvas.specialAreaLegend;
        this.$refs.onlinePlan.onResetQuery();
        this.$refs.onlinePlan.getSpecialAreaFunc();
      },
      onlinePlan(enterprises) {
        const checkedList = this.currentCanvas.getExhibitionByPropName('checked', true);
        const scopeRow = this.$route.query.scopeRow;
        if (this.showCheckbox) { // 分配岛型展位
          enterprises.forEach(item => {
            item.exhibitionKind = scopeRow.exhibitionKind;
          });
          this.currentCanvas.planIslandExhibition(enterprises, checkedList);
        } else { // 分配标准展位
          enterprises.exhibitionKind = scopeRow.exhibitionKind;
          this.currentCanvas.planExhibition(enterprises, checkedList);
        }
        this.setPlanData();
        this.showValidateRule();
      },
      removePlaned () {
        const result = this.currentCanvas.removeExhibition();
        if (!result) {
          this.$message({
            message: this.languageSource.LocationLang.removeCodeTips,
            type: 'warning'
          });
        } else {
          this.setPlanData();
          this.showValidateRule();
        }
      },
      //检查安排进度点击方法
      checkProgressFunc () {
        this.$refs.checkProgress.dialogVisible = true;
        this.$refs.checkProgress.onResetQuery();
      },
      //方案对比点击方法
      contrastFunc () {
        this.$refs.contrast.dialogVisible = true;
        this.$refs.contrast.onResetQuery();
      },
      //方案对比点确定之后方法
      contrastSureFunc (schemaValue) {
        this.currentCanvas.removeContrast(this.queryParams.scopeRow.schemeId);
        this.currentCanvas.contrastSchema(schemaValue);
        this.icon.contrastExport = img['contrastExportBlue'];
        this.hasContrasted = true;
        this.contrastObj = schemaValue;
      },
      //显示对比导出弹框方法
      showContrast () {
        if (!this.hasContrasted) {
          this.$message({
            message: this.languageSource.LocationLang.contrastExportTips,
            type: 'warning'
          });
          return;
        }
        let scopeRow = this.$route.query.scopeRow;
        let params = { schemeIds: scopeRow.schemeId + ',' + this.contrastObj.schemeId };
        this.$refs.contrastExport.dialogVisible = true;
        this.$refs.contrastExport.query(params);
      },
      //创建列表点击方法
      /*creatTableFunc () {
        this.$refs.createTable.dialogVisible = true;
      },*/
      validateChannelFunc (flag = false) {
        if (this.exhibitionProperty === '品牌展位') {
          Object.values(this.allCanvas).forEach(canvas => {
            flag && (canvas.showChannelvalidate = false);
            canvas.mainChannelValidate();
          });
          this.showValidateRule();
        }
      },
      //显示展位信息方法
      showInfoFunc () {
        this.$refs.showBoothInfo.dialogVisible = true;
      },
      //选择显示内容:1：企业名称、2：主营产品、3:一级展品
      //4：二级展品 5:三级展品 6:交易团
      switchShowDesc (modelIndex) {
        this.currentCanvas.changeShowModel(modelIndex);
      },
      //已分配展位的企业鼠标移上去显示企业信息
      showEnterpriseDetail (canvas) {
        const _this = this;
        const tooltip = this.$refs.tooltip;
        canvas.on({
          'mouse:over': function(options) {
            const target = options.target;
            if (target && target.planInfo && _this.tooltip.lastCode !== target.code) {
              _this.tooltip.island = false;
              // 岛型展位显示
              if (target.type === 'island') {
                const enterpriseInfo = target.get('enterpriseInfo');
                _this.tooltip.islandData = [];
                _this.tooltip.island = true;
                Object.values(enterpriseInfo).forEach(item => {
                  _this.tooltip.islandData.push(item);
                });
              }
              _this.tooltip.code = target.code;
              _this.tooltip.enterprise = target.planInfo.enterprise;
              if (!target.planInfo.enterprise.schemeName) {
                _this.tooltip.enterprise.schemeName = _this.queryParams.scopeRow.schemeName;
              }
              // 显示对比方案信息
              if (target.contrastSchema) {
                _this.tooltip.hideContrast = false;
                _this.tooltip.contrastScheme = target.contrastSchema;
              } else {
                _this.tooltip.hideContrast = true;
              }
              if (target.violateRules) {
                _this.tooltip.tableData = [];
                Object.values(target.violateRules).forEach(rule => {
                  _this.tooltip.tableData.push({
                    rule: rule.violation,
                    result: rule.state
                  });
                });
              } else {
                _this.tooltip.tableData = [];
              }
              //鼠标移至已分配的展位时显示信息
              _this.tooltip.hidden = false;
              tooltip.style.top = options.e.clientY + "px";
              let clientWidth = document.body.clientWidth;
              clientWidth / 2 > options.e.clientX
                ? tooltip.style.left = `${options.e.clientX}px`
                : tooltip.style.left = `${options.e.clientX - 400}px`;
              _this.tooltip.lastCode = target.code;
            }
          },
          'mouse:move': function(options) {
            //隐藏显示的已分配的展位信息
            const target = options.target;
            if (!target || !target.planInfo) {
              _this.tooltip.hidden = true;
              _this.tooltip.lastCode = null;
            }
          },
          'mouse:wheel': function() {
            _this.tooltip.hidden = true;
            _this.tooltip.lastCode = null;
          }
        });
      },
      //选择的展位模式类型 0: 未选则; 1: 模式1; 2: 模式2
      boothInfoFunc (type) {
        this.currentCanvas.changePlanedShowModel(Number(type));
      },
      //展位调整方法
      seatAdjustment () {
        const checkedList = this.currentCanvas.getExhibitionByPropName('checked', true);
        if (!checkedList || !checkedList.length) {
          this.$message({
            message: this.languageSource.LocationLang.selectCodeTips,
            type: 'warning'
          });
          return;
        }
        this.selectedCodes = checkedList.map(item => item.get('code')).join(',');
        this.$refs.seatChange.dialogVisible = true;
        let selectData = this.queryParams.scopeRow.selectData;
        //传选择的企业信息
        this.$refs.seatChange.setTableData(selectData, this.queryParams.tag, this.adjustedRows);
      },
      //展位交换方法
      seatChangeFunc (row) {
        let allValues = Object.values(this.allCanvas);
        let exhibitions = [];
        let codeCanvas = this.currentCanvas;
        allValues.filter(item => {
          if (item.getExhibitionByCodes(row.boothCode.split(',')).length > 0) {
            exhibitions = item.getExhibitionByCodes(row.boothCode.split(','));
            codeCanvas = item;
          }
        });
        // this.currentCanvas.getExhibitionByCodes(row.boothCode.split(','));
        const afterExhibitions = this.currentCanvas.getExhibitionByCodes(row.adjustedBoothNo.split(','));
        codeCanvas.removeExhibition(exhibitions);
        // this.currentCanvas.removeExhibition(exhibitions);
        this.currentCanvas.invertPlaned(row, afterExhibitions);
        this.adjustedRows[row.companyId + row.boothNo] = { adjustedBoothNo: row.adjustedBoothNo, boothNo: row.boothNo };
        this.setPlanData();
        this.showValidateRule();
      },
      //显示位置安排或者调整申请查看显示企业信息
      showPatchAddInfo (canvas, listData, addState) {
        this.$http.postJson(config.api.getAdjustEnterpriseList, JSON.stringify(listData))
          .then(enterpriseRes => {
            enterpriseRes.forEach((item) => {
              // let boothNo = item.adjustedBoothNo ? item.boothNo + ',' + item.adjustedBoothNo : item.boothNo;
              const exhibitions = canvas.getExhibitionByCodes(item.boothNo.split(','));
              if (item.adjustedBoothNo && item.adjustedBoothNo !== '') {
                exhibitions.forEach((enterItem, index) => {
                  exhibitions[index].set('fill', '#999999');
                });
                const afterCodeExhibitions = canvas.getExhibitionByCodes(item.adjustedBoothNo.split(','));
                canvas.invertPlaned(item, afterCodeExhibitions);
                canvas.renderAll();
              }
              // canvas.invertPlaned(item, exhibitions);
            });
            this.planedData = canvas.getEnterpeisePlanedData();
            this.showValidateRule();
            if (!addState) {
              this.fullscreenLoading = false;
            }
          });
      },
      //插件图增加减少按钮点击方法
      handleChange (zoom) {
        this.zoom.defaultZoom = Number(zoom.toFixed(2));
        this.zoom.show = `${Math.floor(this.zoom.defaultZoom * 100)}%`;
        this.currentCanvas.zoomCanvas(this.zoom.defaultZoom);
        if (this.zoom.defaultZoom === this.zoom.min) {
          this.zoom.disabledReduce = true;
          this.zoom.disabledAdd = false;
        } else if (this.zoom.defaultZoom === this.zoom.max) {
          this.zoom.disabledReduce = false;
          this.zoom.disabledAdd = true;
        } else {
          this.zoom.disabledReduce = false;
          this.zoom.disabledAdd = false;
        }
      },
      //放大缩小数量输入改变
      numChange (zoom) {
        // 输入非数字,所输入的数字不在最大最小值之间
        if (isNaN(Number(zoom)) || zoom > this.zoom.max || zoom < this.zoom.min) {
          this.zoom.show = `${Math.floor(this.zoom.defaultZoom * 100)}%`;
          return;
        }
        this.handleChange(zoom);
      }
    }
  };
</script>

<style scoped>
  .p-b-n {
    padding-bottom: 0px;
  }
  .operate {
    width: 100%;
    border-left: 1px solid #797979;
    border-top: 1px solid #797979;
  }
  .operate td {
    padding: 8px;
    font-size: 12px;
    text-align: center;
    border-right: 1px solid #797979;
    border-bottom: 1px solid #797979;
  }
  .canvas-box {
    height: 500px;
    border: 1px solid #797979;
    /*border-top: none;*/
  }
  .el-menu-toolbar {
    position: absolute;
    right: 0;
    border: 1px solid #e4e4e4;
    z-index: 999;
    border-radius: 4px;
    background-color: white;
  }
  table {
    padding: 10px 0;
  }
  tr {
    text-align: center;
    font-size: 12px;
  }
  td {
    padding: 5px 0;
    cursor: pointer;
  }
  .collapse-img {
    margin-left: -17px;
    margin-top: 10px;
    cursor: pointer;
    float: left;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    background-color: white;
    padding: 12px 5px;
    border-right: none;
  }
  .hide {
    display: none;
  }
  .border-none {
    border: none !important;
  }
  .tooltip {
    position: fixed;
    background-color: white;
    z-index: 2222;
    width: 460px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 3px #00000085;
  }
  .title {
    padding: 5px;
    font-size: 16px;
  }
  el-row {
    padding: 5px;
  }
  .btn-style {
    width: 40px;
    height: 40px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .island-row {
    padding: 5px 0;
    word-wrap: break-word;
    word-break: break-all;
  }

  .zoomInput input {
    text-align: center !important;
  }
</style>
