/**
 * @file 组展进度设置---修改特例
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="修改特例" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="组展事项" style="font-weight:bold;"></el-form-item>
        <el-form-item label="组展事项：">
          <div>{{ruleForm.progressItemRule}}-{{ruleForm.progressSubitemRule}}-{{ruleForm.businessNode}}</div>
        </el-form-item>
        <el-form-item label="组展单位" style="font-weight:bold;" prop="unitType">
          <el-radio-group v-model="ruleForm.unitType" @change="unitTypeChange">
            <el-radio :label="1">交易团</el-radio>
            <el-radio :label="2">商协会</el-radio>
            <el-radio :label="3">企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="交易团：" prop="delegation" v-if="ruleForm.unitType === 1">
          <el-select v-model="codeForm.delegation" placeholder="请选择交易团" clearable multiple>
            <el-option v-for="item in delegationOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会：" prop="coceral" v-if="ruleForm.unitType === 2">
          <el-select v-model="codeForm.coceral" multiple clearable placeholder="请选择商协会">
            <el-option v-for="item in coceralOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已选企业：" prop="companyIds" v-if="ruleForm.unitType === 3">
          <div class="bm">
            <el-select v-model="codeForm.companyIds" multiple clearable collapse-tags>
              <el-option v-for="item in companyArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" @click="innerCompanyDialog = true" style="margin-left:10px">选择</el-button>
          </div>
        </el-form-item>
        <!-- <el-form-item label="企业：" prop="firm">
          <el-checkbox v-model="codeForm.firmAll" @change="firmAllChange">所有企业</el-checkbox>
          <div v-for="item in checkedCompany" :key="item.value" :label="item.text" :value="item.value">
            <span>企业名称：{{item.text}}</span>
            <span>广交会编码：{{item.value}}</span>
          </div>
          <el-button @click="addCompany" :disabled="disabled">+添加企业</el-button>
        </el-form-item> -->
        <el-form-item label="组展单位标签：" prop="unitTagPojo.unitTag">
          <el-input v-model="ruleForm.unitTagPojo.unitTag" maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item label="选择范围" style="font-weight:bold;"></el-form-item>
        <el-form-item label="展期：" prop="exhibitionSessions">
          <el-select v-model="ruleForm.exhSessionTagPojo.exhibitionSessions" @change="periodCodeChange" clearable>
            <el-option v-for="item in extension" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionAreaCodes">
          <el-select v-model="ruleForm.exhAreaTagPojo.exhibitionAreaCodes" @change="exhibitionAreaCodeChange" clearable>
            <el-option v-for="item in areaOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专区：" prop="exhRegionCodes">
          <el-select v-model="ruleForm.exhRegionTagPojo.exhRegionCodes" clearable>
            <el-option v-for="item in regionOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位号：" prop="propIds">
          <!-- <el-input v-model="ruleForm.boothTagPojo.boothTag" maxlength="10" clearable></el-input> -->
          <el-select v-model="ruleForm.boothTagPojo.propIds" clearable multiple>
            <el-option v-for="item in boothOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="范围标签：" prop="rangeTag">
          <el-input v-model="ruleForm.rangeTag" maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker v-model="startTime" type="date" :picker-options="startPickerOptions" format="yyyy/MM/dd" placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker v-model="endTime" type="date" :picker-options="endPickerOptions" format="yyyy/MM/dd" placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="toBack">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加企业" :visible.sync="dialogVisible">
        <el-input class="input-margin" v-model="search" placeholder="请根据企业名称或广交会编码搜索" clearable></el-input>
        <el-table ref="tables" :data="tables" style="width: 100%" @select-all="handleSelectionChange" @select="handleSelectionChange" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="企业名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-html="format(scope.row.text)"></span>
            </template>
          </el-table-column>
          <el-table-column label="广交会编码">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-html="format(scope.row.value)"></span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageInfo.currentPage" :page-size="5" layout="total, prev, pager, next" :total="pageInfo.total">
        </el-pagination>
        <div class="dialog-btn">
          <el-button type="danger" @click="addParams">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 企业的选择框 -->
      <el-dialog title="企业选择" :visible.sync="innerCompanyDialog" width="70%" :show-close="false">
        <components-checkCompanyList :unitTag="unitTagFlag" :orgIds="orgIds"  :showAble="innerCompanyDialog" @affirm-company="affirmCompany"
         :checkArray="codeForm.companyIds" @closeInnerCompany="closeInnerCompany"></components-checkCompanyList>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// vuex
import { mapGetters, mapActions } from "vuex";
import { getJYT, getSXH, getCCl } from "./dict_request";
import { $helper } from '@/scripts/project/utils';
import companyListCheck from "./components/companyListNature";
export default {
  components: {
    "components-checkCompanyList": companyListCheck
  },
  data() {
    // 弹框input校验只能输入0-100数字，最多两位小数
    // let validateNum = (rule, value, callback) => {
    //   if (value === '') {
    //     return callback();
    //   } else {
    //     let reg = /^(\d|[1-9]\d|100)(\.\d{1,2})?$/;
    //     if (!reg.test(value)) {
    //       return callback(new Error('请输入0-100的数，且最多两位小数'));
    //     }
    //     return callback();
    //   }
    // };
    return {
      unitTag: "",
      orgIds: [],
      unitTagFlag: false,
      innerCompanyDialog: false,
      companyArray: [],
      //展期
      exhibitionNum: '',
      // 展区code
      exhibitionAreaCode: '',
      periodCode: '',
      //展区专区字典
      currentDict: [],
      // tab
      activeName: 'first',
      // 添加企业按钮禁用变量
      disabled: false,
      progressDisabled: false,
      // 企业弹出层显示变量
      dialogVisible: false,
      // 企业字典数组
      list: [],
      // 交易团数组
      delegationOption: [],
      // 商协会数组
      coceralOption: [],
      extension: [
        {
          value: '1',
          label: '一期'
        },
        {
          value: '2',
          label: '二期'
        },
        {
          value: '3',
          label: '三期'
        }
      ],
      boothOption: [],
      areaOption: [],
      regionOption: [],
      // 一选择的企业数组
      checkedCompany: [],
      // 需要整合的对象
      codeForm: {
        // 交易团
        delegation: [],
        // 商协会
        coceral: [],
        // 企业
        firm: [],
        //企业的
        companyIds: [],
        // 所有企业
        firmAll: false
      },
      // 多选数组
      multipleSelection: [],
      selectData: [],
      arrChecked: [],
      // 企业弹出层表格数据
      tables: [],
      page: 1, // 页码
      // 分页信息
      pageInfo: {
        currentPage: 1,
        total: 0
      },
      // 搜索值
      search: '',
      unitTagName: '',
      endTime: '',
      startTime: '',
      // 表单对象
      ruleForm: {
        unitType: "",
        // 展位号
        boothTagPojo: {
          // 展位号已选择value
          propIds: []
        },
        // 展区
        exhAreaTagPojo: {
          // 展区已选择value
          exhibitionAreaCodes: []
        },
        // 专区
        exhRegionTagPojo: {
          // 专区已选择value
          exhRegionCodes: []
        },
        // 展期
        exhSessionTagPojo: {
          // 展期已选择value
          exhibitionSessions: []
        },
        // 计划完成时间
        endTime: '',
        // 计划开始时间
        startTime: '',
        // 判断Id
        progressRuleId: '',
        // 范围标签
        rangeTag: '',
        //组展事项
        progressItemRule: '',
        progressSubitemRule: '',
        businessNode: '',
        // 组展单位标签
        // 整合id数组
        unitTagPojo: {
          // 组展单位标签
          unitTag: '',
          // 标签组合Id
          orgIds: [],
          originalUnitTag: ''
        }
      },
      // 校验
      rules: {
        'unitTagPojo.unitTag': [
          { required: true, message: '请输入组展单位标签', trigger: 'blur' }
        ],
        rangeTag: [
          { required: true, message: '请输入范围标签', trigger: 'blur' }
        ]
      },
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', []),
    startPickerOptions() {
      return {
        disabledDate: (value) => {
          if (this.endTime) {
            if (value.getTime() > new Date(this.endTime).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    },
    endPickerOptions() {
      return {
        disabledDate: (value) => {
          if (this.startTime) {
            if (value.getTime() < new Date(this.startTime).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    }
  },
  async created() {
    this.getCompanys();
    //交易团数组赋值
    this.delegation = await getJYT();
    this.delegationOption = this.fullInOption(this.delegation);
    //商协会数组赋值
    this.coceral = await getSXH();
    this.coceralOption = this.fullInOption(this.coceral);
    this.exhibitionNum = this.$route.query.row.exhibitionNum;

    const extraId = this.$route.query.row.progressRuleExtraId;

    if (extraId) {
      const extraInfo = await this.getExtraInfo(extraId);
      //开始时间回显
      this.startTime = extraInfo.startTime;
    //结束时间回显
      this.unitTag = extraInfo.ruleUnitTag;
      this.endTime = extraInfo.endTime;
      this.exhibitionAreaCode = this.$route.query.row.exhibitionAreaCode;
      this.ruleForm.unitType = extraInfo.unitType;
      this.ruleForm.progressItemRule = extraInfo.progressItemRule;
      this.ruleForm.progressSubitemRule = extraInfo.progressSubitemRule;
      this.ruleForm.progressSubitemRule = extraInfo.progressSubitemRule;
      this.ruleForm.businessNode = extraInfo.businessNode;
      this.exhibitionAreaCode = extraInfo.exhAreaTagPojo.exhibitionAreaCodes[0];
      this.periodCode = extraInfo.exhSessionTagPojo.exhibitionSessions[0];
      await this.getZhanqi(this.exhibitionNum, this.periodCode, this.exhibitionAreaCode);
      await this.getZhanqiData(this.exhibitionNum, this.periodCode, '');

      //展期
      this.ruleForm.exhSessionTagPojo.exhibitionSessions = extraInfo.exhSessionTagPojo.exhibitionSessions[0];
      //展区
      this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes = extraInfo.exhAreaTagPojo.exhibitionAreaCodes[0];
      //专区
      this.ruleForm.exhRegionTagPojo.exhRegionCodes = extraInfo.exhRegionTagPojo.exhRegionCodes[0];

      const orgIds = extraInfo.unitTagPojo.orgIds;
      let objCompany = {
        param: {
          "companyId": orgIds.join(),
          "pageSize": 1000,
          "pageStart": 1
        }
      };
      await getCCl(objCompany).then(res => {
        this.companyArray = [];
        let array = res.records;
        for (let item of array) {
          this.companyArray.push({
            label: item.companyName,
            value: item.companyId
          });
        }
      });

      if (this.unitTag) {
        this.queryOrgIdByTagInfo(this.unitTag).then(res => {
          console.log(res);
          this.unitTagFlag = true;
          this.orgIds = res.slice(0);
          this.delegationOption = $helper.getArrayInfo(this.delegationOption, res);
          this.coceralOption = $helper.getArrayInfo(this.coceralOption, res);
        });
      } else {
        this.unitTagFlag = false;
        this.delegationOption = this.delegationOption;
        this.coceralOption = this.coceralOption;
      }
      // 回填操作
      orgIds.forEach(id => {
        if (this.delegation.hasOwnProperty(id)) {
          this.codeForm.delegation.push(id);
        } else if (this.coceral.hasOwnProperty(id)) {
          this.codeForm.coceral.push(id);
        } else {
          this.codeForm.companyIds.push(id);
        }
      });
    }
  },
  mounted() {
    this.ruleForm.rangeTag = this.$route.query.row.rangeTag;
    this.ruleForm.progressItemRule = this.$route.query.row.progressItemRule;
    this.ruleForm.progressSubitemRule = this.$route.query.row.progressSubitemRule;

    //组展单位标签回显
    this.ruleForm.unitTagPojo.unitTag = this.$route.query.row.unitTag;
    this.ruleForm.unitTagPojo.originalUnitTag = this.$route.query.row.unitTag;
    this.ruleForm.progressRuleExtraId = this.$route.query.row.progressRuleExtraId;
    //范围标签回显
    // this.ruleForm.rangeTag = this.$route.query.row.rangeTag;
  },
  methods: {
    ...mapActions('organizationProgress', ['modifyExtraInfo', 'getExtraInfo', 'queryOrgIdByTagInfo']),
    getCompanys() {
      
    },
    affirmCompany(param) {
      // console.log(param);
      this.innerCompanyDialog = false;
      this.companyArray.splice(0, this.companyArray.length);
      this.codeForm.companyIds.splice(0, this.codeForm.companyIds.length);
      if (param.length > 0) {
        for (let item of param) {
          let val = item.primary;
          this.companyArray.push({
            label: val.companyName,
            value: val.companyId
          });
          this.codeForm.companyIds.push(val.companyId);
        }
      }
    },
    closeInnerCompany(param) {
      this.innerCompanyDialog = param;
    },
    // 弹出层确认
    addParams() {
      let arr = [];
      arr = this.arrChecked.concat(this.selectData);
      // this.searchData();
      let obj = {};
      arr = arr.reduce((item, next) => {
        obj[next.value] ? '' : obj[next.value] = true && item.push(next);
        return item;
      }, []);
      // 企业数组去重整合
      this.codeForm.firm = arr.map(el => {
        return el.value;
      });
      // 已选择企业数组先置空
      this.checkedCompany = arr;
      // 弹出层隐藏
      this.dialogVisible = false;
      localStorage.removeItem('selection');
    },
    // value 搜索值
    // page 页码
    // 搜索方法
    searchData(value = '', page = 1) {
      if (value === '') {
        this.tables = this.list.slice((page - 1) * 5, page * 5);
        this.pageInfo.total = this.list.length;
      } else {
        let tables = this.list.filter((dataNews) => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).indexOf(value) > -1;
          });
        });
        this.pageInfo.total = tables.length;
        this.tables = tables.slice((page - 1) * 5, page * 5);
      }
      this.$nextTick(() => {
        if (JSON.parse(localStorage.getItem('selection'))) {
          let arrs = JSON.parse(localStorage.getItem('selection'));
          let checkedIndex = [];
          arrs.forEach(val => {
            if (val.currentpage === this.pageInfo.currentPage) {
              checkedIndex.push(val.index);
            }
          });
          this.arrChecked = arrs;
          let rows = [];
          checkedIndex.forEach(val => {
            rows.push(this.tables[val]);
          });
          rows.forEach(row => {
            this.$refs.tables.toggleRowSelection(row);
          });
        }
      });
      this.pageInfo.currentPage = page;
    },
    // 弹出层分页方法
    handleCurrentChange(val) {
      this.page = val;
      this.pageInfo.currentPage = val;
      // 如果搜索框有值得情况下
      this.searchData(this.search, val);
    },
    // 多选方法
    handleSelectionChange(selection, row) {
      this.selectData = selection;
      this.tables.map((el, dex) => {
        selection.map(ele => {
          if (el.value === ele.value) {
            ele.index = dex;
            ele.currentpage = this.pageInfo.currentPage;
            this.multipleSelection.push(ele);
          }
        });
      });
      let obj = {};
      this.multipleSelection = this.multipleSelection.reduce((item, next) => {
        obj[next.value] ? '' : obj[next.value] = true && item.push(next);
        return item;
      }, []);
      localStorage.setItem('selection', JSON.stringify(this.multipleSelection));
    },
    // 搜索计算
    format(val) {
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="red">' + this.search + '</font>');
      } else {
        return val;
      }
    },
    // 添加企业点击事件
    addCompany() {
      this.dialogVisible = true;
      this.multipleSelection = [];
      this.$nextTick(() => {
        this.searchData();
      });
    },
    //修改组展单位
    unitTypeChange() {
      this.codeForm.delegation = [];
      this.codeForm.coceral = [];
      this.codeForm.companyIds = [];
    },
    firmAllChange(val) {
      // 选择所有企业时，给企业字段赋值
      if (val === true) {
        this.disabled = true;
        this.codeForm.firm = this.list.map(el => {
          return el.value;
        });
        this.checkedCompany = [];
      } else {
        this.disabled = false;
        this.codeForm.firm = [];
      }
    },
    // 时间转换方法
    dateFmt(val) {
      let date = new Date(val);
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      return Y + '/' + M + '/' + D;
    },
    // 表单提交
    submitForm(formName) {
      let _this = this;
      if (_this.startTime) {
        _this.ruleForm.startTime = _this.dateFmt(_this.startTime);
      }
      if (_this.endTime) {
        _this.ruleForm.endTime = _this.dateFmt(_this.endTime);
      }
      _this.ruleForm.unitTagPojo.orgIds = _this.codeForm.coceral.concat(_this.codeForm.delegation, _this.codeForm.firm, _this.codeForm.companyIds);
      // 校验
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let flagUnit = false;
          let unitType = _this.ruleForm.unitType;
          let exhibitionSessions = _this.ruleForm.exhSessionTagPojo.exhibitionSessions;
          if (!unitType && !exhibitionSessions) {
            _this.$message({
              type: 'warning',
              message: '请选择组展单位类型或展期'
            });
            return false;
          }
          if (!exhibitionSessions && unitType) {
            if (unitType === 1) {
              if (!_this.codeForm.delegation.length) {
                _this.$message({
                  type: 'error',
                  message: '请选择交易团'
                });
                flagUnit = true;
                return false;
              }
            }
            if (unitType === 2) {
              if (!_this.codeForm.coceral.length) {
                _this.$message({
                  type: 'error',
                  message: '请选择商协会'
                });
                flagUnit = true;
                return false;
              }
            }
            if (unitType === 3) {
              if (!_this.codeForm.companyIds.length) {
                _this.$message({
                  type: 'error',
                  message: '请选择企业'
                });
                flagUnit = true;
                return false;
              }
            }
          }
          if (!flagUnit) {
            this.newRuleForm = this.deepClone(this.ruleForm);

            let session = this.newRuleForm.exhSessionTagPojo.exhibitionSessions;
            let areaCode = this.newRuleForm.exhAreaTagPojo.exhibitionAreaCodes;
            let regionCode = this.newRuleForm.exhRegionTagPojo.exhRegionCodes;
            //let regionCode = this.newRuleForm.exhRegionTagPojo.exhRegionCodes;
            this.newRuleForm.exhSessionTagPojo.exhibitionSessions = [];
            this.newRuleForm.exhSessionTagPojo.exhibitionSessions.push(session);

            this.newRuleForm.exhAreaTagPojo.exhibitionAreaCodes = [];
            this.newRuleForm.exhAreaTagPojo.exhibitionAreaCodes.push(areaCode);

            this.newRuleForm.exhRegionTagPojo.exhRegionCodes = [];
            this.newRuleForm.exhRegionTagPojo.exhRegionCodes.push(regionCode);

              // 新增
            _this.modifyExtraInfo(_this.newRuleForm).then(res => {
              _this.$message({
                type: 'success',
                message: '修改成功'
              });
              _this.$router.push({
                path: '/specialCaseList',
                query: {
                  progressRuleId: _this.ruleForm.progressRuleId,
                  unitTagName: _this.unitTagName
                }
              });
            });
          }
        } else {
          _this.$message({
            type: 'error',
            message: '修改失败'
          });
          return false;
        }
      });
    },
    deepClone(obj) {
      // 深拷贝
      let _obj = JSON.stringify(obj);
      let objClone = JSON.parse(_obj);
      return objClone;
    },
    // 取消返回列表页
    toBack() {
      this.$router.push({
        path: '/specialCaseList',
        query: {
          progressRuleId: this.ruleForm.progressRuleId,
          unitTagName: this.unitTagName
        }
      });
    },
    // 获取回显展区
    getZhanqiData(exhibitionNum, periodCode, exhibitionAreaCode) {
      let param2 = {
        exhibitionNum,
        periodCode, //展期
        exhibitionAreaCode //展区
      };
      return this.$http.get(this.baseApi + "/api/exp/exhibitionschemes/getAreas", param2).then(res => {
        res.forEach(element => {
          this.areaOption.push({
            value: element.exhibitionAreaCode,
            label: element.exhibitionAreaName,
            specialAreas: element.specialAreas
          });
        });
      });
    },
    //获取展区和专区
    getZhanqi(exhibitionNum, periodCode, exhibitionAreaCode) {
      this.regionOption = [];
      this.areaOption = [];
      let param = {
        exhibitionNum,
        periodCode, //展期
        exhibitionAreaCode //展区
      };

      return this.$http.get(this.baseApi + "/api/exp/exhibitionschemes/getAreas", param).then(res => {
        // const exhibitionAreas = [];
        // res.forEach(item => {
        //   const specialAreas = [];
        //   if (item.specialAreas) {
        //     item.specialAreas.forEach(sa => {
        //       specialAreas.push({
        //         value: sa.specialAreaCode,
        //         label: sa.languages[0].name
        //       });
        //     });
        //     this.regionOption = this.regionOption.concat(specialAreas);
        //   }
        //   exhibitionAreas.push({
        //     value: item.exhibitionAreaCode,
        //     label: item.exhibitionAreaText,
        //     specialAreas
        //   });
        // });
        // this.areaOption = this.areaOption.concat(exhibitionAreas);

        // console.log(this.areaOption, this.regionOption);
        res.forEach(element => {
          // this.areaOption.push({
          //   value: element.exhibitionAreaCode,
          //   label: element.exhibitionAreaText,
          //   specialAreas: element.specialAreas
          // });
          if (element.specialAreas) {
            element.specialAreas.forEach(sa => {
              this.regionOption.push({
                value: sa.specialAreaCode,
                label: sa.cname
              });
            });
          }
        });
      });
    },
    //展期change事件
    periodCodeChange() {
      this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes = '';
      this.ruleForm.exhRegionTagPojo.exhRegionCodes = '';
      this.getZhanqi(this.exhibitionNum, this.ruleForm.exhSessionTagPojo.exhibitionSessions, this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes);
      this.getZhanqiData(this.exhibitionNum, this.ruleForm.exhSessionTagPojo.exhibitionSessions, this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes);
    },
    //展区change事件
    exhibitionAreaCodeChange() {
      // this.ruleForm.exhRegionTagPojo.exhRegionCodes = '';
      // this.regionOption = [];
      // for (let i = 0; i < this.areaOption.length; i++) {
      //   if (this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes === this.areaOption[i].value) {
      //     this.regionOption = this.areaOption[i].specialAreas;
      //     break;
      //   }
      // }
      this.ruleForm.exhRegionTagPojo.exhRegionCodes = '';
      this.regionOption = [];
      for (let i = 0; i < this.areaOption.length; i++) {
        if (this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes === this.areaOption[i].value) {
          let Arry = this.areaOption[i].specialAreas;
          Arry.forEach(element => {
            this.regionOption.push({
              value: element.specialAreaCode,
              label: element.cname
            });
          });
          break;
        }
      }
    },
    fullInOption(obj) {
      const option = [];
      for (let key in obj) {
        option.push({
          label: obj[key],
          value: key
        });
      }
      return option;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../theme/project/css/flex.less";
.el-form-item {
  width: 50%;
  padding: 10px;
}
.dialog-btn {
  padding: 22px 0;
}
.input-margin {
  margin-bottom: 15px;
}
</style>
