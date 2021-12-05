/**
 * @file 组展进度设置---新增特例
 */
<style scoped lang="less">
@import '../../theme/project/css/flex.less';
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
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="新增特例" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="组展事项" style="font-weight:bold;"></el-form-item>
        <el-form-item label="选择组展事项：">
          <el-button @click="showExhDialog" :disabled="exeMatter" v-if="sxShow">请选择</el-button>
          <div v-if="!sxShow">{{progressItemRule}}<i @click="sxDelete" style="margin-left:10px; color: #ff0000;" class="el-icon-delete"></i></div>
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
          <el-select v-model="ruleForm.boothTagPojo.propIds" clearable multiple>
            <el-option v-for="item in boothOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="范围标签：" prop="rangeTag">
          <el-input v-model="ruleForm.rangeTag" maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker v-model="startTime" type="date" clearable :picker-options="startPickerOptions" format="yyyy/MM/dd" placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker v-model="endTime" type="date" clearable :picker-options="endPickerOptions" format="yyyy/MM/dd" placeholder="选择结束日期">
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
        <el-pagination @current-change="handleCurrentChange2" :current-page.sync="pageInfo2.currentPage" :page-size="5" layout="total, prev, pager, next" :total="pageInfo2.total">
        </el-pagination>
        <div class="dialog-btn">
          <el-button type="danger" @click="addParams">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 组展事项弹窗 -->
      <el-dialog title="请选择组展事项" width="70%" :visible.sync="exeMatterDialog">
        <!-- 展届选择 -->
        第&nbsp;&nbsp;<el-select v-model="session" placeholder="请选择届数" class="top-select" @change="sessionChange" style="width:120px">
          <el-option v-for="(item, index) in sessionOption" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>&nbsp;&nbsp;届
        <el-table border :data="tableData" style="margin-top:20px;" :loading="loading">
          <el-table-column label="" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.row.progressRuleId" v-model="exeMatterRadio" @change.native="getExeMatterRow(scope.$index, scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="progressItemRule" align="center" label="组展事项" width="150"></el-table-column>
          <el-table-column prop="progressSubitemRule" align="center" label="子项" width="200"></el-table-column>
          <el-table-column prop="businessNode" align="center" label="具体业务环节"></el-table-column>
        </el-table>
        <!-- 翻页 -->
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sxChoose">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 企业的选择框 -->
      <el-dialog title="企业选择" :visible.sync="innerCompanyDialog" width="70%" :show-close="false">
        <components-checkCompanyList :unitTag="unitTagFlag" :orgIds="orgIds" :delegationOption='delegationOption' :showAble="innerCompanyDialog" @affirm-company="affirmCompany"
         :checkArray="codeForm.companyIds" @closeInnerCompany="closeInnerCompany"></components-checkCompanyList>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// vuex
import { mapGetters, mapActions } from "vuex";
import { $helper } from '@/scripts/project/utils';
import pagination from '@/components/project/common/pagination.vue';
import companyListCheck from "./components/companyListNature";
import { getJYT, getSXH } from "./dict_request";
export default {
  components: {
    'pagination': pagination,
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
      delegationOptions: [],
      coceralOptions: [],
      //展区专区字典
      currentDict: [],
      //展届
      exhibitionNum: '',
      loading: false,
      // tab
      activeName: 'first',
      // 添加企业按钮禁用变量
      disabled: false,
      // 完成进度禁用变量
      progressDisabled: false,
      // 企业弹出层显示变量
      dialogVisible: false,
      // 企业字典数组
      list: [],
      // 选择组展事项
      exeMatter: false,
      // 组展事项弹窗
      exeMatterDialog: false,
      // 组展事项表格数据
      tableData: [],
      // 组展事项单选按钮
      exeMatterRadio: '',
      //组展事项名称
      progressItemRule: '',
      //组展事项按钮显示
      sxShow: true,
      session: '',
      //新展届
      newSession: [],
      //展届
      sessionOption: [],
      // 组展事项分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      BeforeParams: {
        current: "1",
        size: "10",
        exhibitionNum: ""
      },
      queryParams: {
        current: "1",
        size: "10",
        exhibitionNum: ""
      },
      // 交易团数组
      delegationOption: [],
      // 商协会数组
      coceralOption: [],
      // 展期选项
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
      // 展位选项
      boothOption: [],
      // 展区选项
      areaOption: [],
      // 专区选项
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
        //已选企业
        companyIds: [],
        // 所有企业
        firmAll: false
      },
      // 多选数组
      multipleSelection: [],
      // 当前页勾选数组
      selectData: [],
      // 所有页面已勾选数组
      arrChecked: [],
      // 企业弹出层表格数据
      tables: [],
      // 页码
      page: 1,
      // 分页信息
      pageInfo2: {
        currentPage: 1,
        total: 0
      },
      // 搜索值
      search: '',
      // 结束时间
      endTime: '',
      // 开始时间
      startTime: '',
      // 表单对象
      ruleForm: {
        //组织单位
        unitType: "",
        // 事项ID
        progressRuleId: '',
        // 展位号
        boothTagPojo: {
          // 展位号已选择value
          propIds: []
        },
        // 展区
        exhAreaTagPojo: {
          // 展区已选择value
          exhibitionAreaCodes: ""
        },
        // 专区
        exhRegionTagPojo: {
          // 专区已选择value
          exhRegionCodes: []
        },
        // 展期
        exhSessionTagPojo: {
          // 展期已选择value
          exhibitionSessions: ""
        },
        // 计划完成时间
        endTime: '',
        // 计划开始时间
        startTime: '',
        unitTag: '',
        // 判断Id
        // 组展单位标签
        // 整合id数组
        unitTagPojo: {
          // 组展单位标签
          unitTag: '',
          // 标签组合Id
          orgIds: []
        }
      },
      unitTagName: '',
      // 校验
      rules: {
        'unitTagPojo.unitTag': [
          { required: true, message: '请输入组展单位标签', trigger: 'blur' }
        ],
        // unitType: [
        //   { required: true, message: "请选择组织单位类型", trigger: "change" }
        // ],
        rangeTag: [
          { required: true, message: '请输入范围标签', trigger: 'blur' }
        ]
      },
      baseApi: process.env.API_SN_URL
    };
  },
  watch: {
    // 监听搜索
    search(newVal) {
      if (!newVal) {
        this.page = 1;
      }
      this.searchData(newVal, this.page);
    }
  },
  computed: {
    ...mapGetters('organizationProgress', []),
    // 时间控件开始时间小于结束时间
    startPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.endTime) {
            if (value.getTime() > new Date(_this.endTime).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    },
    // 结束时间大于开始时间
    endPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.startTime) {
            if (value.getTime() < new Date(_this.startTime).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    }
  },
  async created() {
    // 获取上个页面带来的完成判断字段并赋值
    //交易团数组赋值
    this.delegationOption = await getJYT().then(res => this.fullInOption(res));
    this.delegationOptions = await getJYT().then(res => this.fullInOption(res));
    //商协会数组赋值
    this.coceralOption = await getSXH().then(res => this.fullInOption(res));
    this.coceralOptions = await getSXH().then(res => this.fullInOption(res));
  },
  methods: {
    ...mapActions('organizationProgress', ['currentSessionInfo', 'worksAndDaysInfo', 'queryExhibitionNumInfo', 'queryPlanInfo', 'queryPlanInfoLook', 'queryPlanInfoLookEx', 'publishPlanInfo', 'modifyAfterPublishInfo']),
    ...mapActions('organizationProgress', ['addExtraInfo', 'queryOrgIdByTagInfo']),
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
      // // 企业数组去重整合
      // this.codeForm.firm = this.arrChecked.map(el => {
      //   return el.value;
      // });
      // // 已选择企业数组先置空
      // this.checkedCompany = this.arrChecked;
    },
    // value 搜索值
    // page 页码
    // 搜索方法
    searchData(value = '', page = 1) {
      if (value === '') {
        this.tables = this.list.slice((page - 1) * 5, page * 5);
        this.pageInfo2.total = this.list.length;
      } else {
        let tables = this.list.filter((dataNews) => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).indexOf(value) > -1;
          });
        });
        this.pageInfo2.total = tables.length;
        this.tables = tables.slice((page - 1) * 5, page * 5);
      }
      // 切换分页记住勾选项
      this.$nextTick(() => {
        if (JSON.parse(localStorage.getItem('selection'))) {
          let arrs = JSON.parse(localStorage.getItem('selection'));
          let checkedIndex = [];
          arrs.forEach(val => {
            if (val.currentpage === this.pageInfo2.currentPage) {
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
      this.pageInfo2.currentPage = page;
    },
    // 弹出层分页方法
    handleCurrentChange2(val) {
      this.page = val;
      this.pageInfo2.currentPage = val;
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
            ele.currentpage = this.pageInfo2.currentPage;
            this.multipleSelection.push(ele);
          }
        });
      });
      // 去重
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
      if (this.ruleForm.progressRuleId === "") {
        this.$message({
          message: '请选择组展事项！',
          type: 'warning'
        });
      } else {
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
            // if (!_this.codeForm.unitType) {
            //   _this.$message({
            //     type: 'error',
            //     message: '请至少选择一个组展单位'
            //   });
            // } else {
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
                    type: 'warning',
                    message: '请选择交易团'
                  });
                  flagUnit = true;
                  return false;
                }
              }
              if (unitType === 2) {
                if (!_this.codeForm.coceral.length) {
                  _this.$message({
                    type: 'warning',
                    message: '请选择商协会'
                  });
                  flagUnit = true;
                  return false;
                }
              }
              if (unitType === 3) {
                if (!_this.codeForm.companyIds.length) {
                  _this.$message({
                    type: 'warning',
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
              this.newRuleForm.exhSessionTagPojo.exhibitionSessions = [];
              this.newRuleForm.exhSessionTagPojo.exhibitionSessions.push(session);

              this.newRuleForm.exhAreaTagPojo.exhibitionAreaCodes = [];
              this.newRuleForm.exhAreaTagPojo.exhibitionAreaCodes.push(areaCode);

              this.newRuleForm.exhRegionTagPojo.exhRegionCodes = [];
              this.newRuleForm.exhRegionTagPojo.exhRegionCodes.push(regionCode);

              //this.ruleForm.exhSessionTagPojo.exhibitionSessions = this.ruleForm.exhSessionTagPojo.exhibitionSessions;
              //this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes = this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes;
              // 新增
              _this.addExtraInfo(_this.newRuleForm).then(res => {
                _this.$message({
                  type: 'success',
                  message: '新增成功'
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
            // }
          } else {
            _this.$message({
              type: 'error',
              message: '新增失败'
            });
            return false;
          }
        });
      }
    },
    deepClone(obj) { // 深拷贝
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
    getBasicData(data, newIndex) {
      let array = [].concat(data);
      if (array.length) {
        array.forEach(value => {
          let newstartTime = '';
          let newendTime = '';
          // let newprogressVal = '';
          let newworkday = '';
          let newnatureday = '';
          if (value.progressHistories) {
            newstartTime = value.progressHistories[newIndex].startTime;
            newendTime = value.progressHistories[newIndex].endTime;
            newworkday = value.progressHistories[newIndex].workday;
            newnatureday = value.progressHistories[newIndex].naturalday;
          } else {
            newstartTime = '';
            newendTime = '';
            newprogressVal = '';
            newnatureday = '';
            newworkday = '';
          }
          value.startTime = newstartTime;
          value.endTime = newendTime;
          value.naturedayVal = newnatureday;
          value.workdayVal = newworkday;
          value.curIndex = 0;
        });
      }
    },
    //获取事项数据
    getData() {
      this.loading = true;
      this.BeforeParams.exhibitionNum = this.session;
      //获取全部
      this.queryPlanInfoLookEx(this.BeforeParams).then(res => {
        // console.log(222);
        
        // 查询成功
        // 分页
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        let tranData = JSON.parse(JSON.stringify(res.records));
        if (tranData.length) {
          this.getBasicData(tranData, tranData[0].progressHistories.length - 1); 
        }
        this.tableData = JSON.parse(JSON.stringify(tranData));
        // console.log(this.tableData);
        
        // 结束loading
        this.loading = false;

      }).catch(e => {
        // 查询失败
        // 结束loading
        this.loading = false;
      });
    },
    //组展事项选择
    showExhDialog() {
      this.exeMatterDialog = true;
      Promise.all([this.currentSessionInfo(), this.queryExhibitionNumInfo()])
        .then(([reso, exhNumsInThePast]) => {
          this.session = reso.exhibitionNum;
          // this.sessionOption = Array.from(new Set([].concat(this.session, exhNumsInThePast))).sort((a, b) => a - b);
          exhNumsInThePast.forEach(element => {
            this.sessionOption.push(element.exhibitionNum);
          });
          this.getData();
        });
    },
    //组展事项确定
    sxChoose() {
      if (this.progressItemRule !== "") {
        this.exeMatterDialog = false;
        this.sxShow = false;
        //获取展区和专区
        this.getZhanqi(this.exhibitionNum, '', '');
      } else {
        this.$message({
          message: '请选择组展事项！',
          type: 'warning'
        });
      }
      this.getCompanys();  //获取交易团、单位
      this.codeForm.delegation = [];
      this.codeForm.coceral = [];
      this.codeForm.companyIds = [];
    },
    //组展单位变化
    unitTypeChange() {
      this.codeForm.delegation = [];
      this.codeForm.coceral = [];
      this.codeForm.companyIds = [];
    },
    //组展事项单选
    getExeMatterRow(index, row) {
      this.progressItemRule = row.progressItemRule;
      this.ruleForm.progressRuleId = row.progressRuleId;
      this.unitTag = row.unitTag;
      this.exhibitionNum = row.exhibitionNum;
    },
    getCompanys() {
      if (this.unitTag) {
        this.unitTagFlag = true;
        this.queryOrgIdByTagInfo(this.unitTag).then(res => {
          this.orgIds = res.slice(0);
          this.delegationOption = $helper.getArrayInfo(this.delegationOption, res);
          this.coceralOption = $helper.getArrayInfo(this.coceralOption, res);
        });
      } else {
        this.delegationOption = this.delegationOption;
        this.coceralOption = this.coceralOption;
      }
    },
    // 删除事项
    sxDelete() {
      this.sxShow = true;
      this.progressItemRule = ""; // 清空名称
      this.exeMatterRadio = "";   // 清空值
      this.ruleForm.progressRuleId = "";
      this.delegationOption = this.delegationOptions;
      this.coceralOption = this.coceralOptions;
      
      //企业的重置
      this.unitTagFlag = false;
      this.orgIds = [];
      this.codeForm.companyIds = [];
      this.companyArray = [];

    },
    //选择展届
    sessionChange(val) {
      // 传参改变，刷新表格
      this.BeforeParams.exhibitionNum = val;
      this.queryParams.exhibitionNum = val;
      this.session = val;
      this.getData();
    },
    //分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      let _this = this;
      _this.loading = true;
      _this.pageInfo.pageSize = val;
      _this.queryParams.exhibitionNum = this.session;
      _this.queryParams.size = val;
      _this.queryPlanInfoLook(_this.queryParams).then(res => {
        let tranData = JSON.parse(JSON.stringify(res.records));
        this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
        this.tableData = JSON.parse(JSON.stringify(tranData));
        // 发布后可编辑表格属性定义
        this.tableData.map((ele) => {
          ele.operateType = 'text';
          ele.textType = 'text';
          ele.isEdit = false;
          ele.operating = true;
          let now = new Date();
          if (this.dateFmt(ele.startTime) < this.dateFmt(now) && ele.startTime != null) {
            ele.dateDisabled = true;
          } else {
            ele.dateDisabled = false;
          }
        });
        //设置table的loading变量
        _this.loading = false;
      });
    },
    // 组展事项弹窗分页事件
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.queryParams.exhibitionNum = this.session;
      this.queryParams.current = val;
      this.queryPlanInfoLook(this.queryParams).then(res => {
        let tranData = JSON.parse(JSON.stringify(res.records));
        this.getBasicData(tranData, tranData[0].progressHistories.length - 1);
        this.tableData = JSON.parse(JSON.stringify(tranData));
        // 发布后可编辑表格属性定义
        this.tableData.map((ele) => {
          ele.operateType = 'text';
          ele.textType = 'text';
          ele.isEdit = false;
          ele.operating = true;
          let now = new Date();
          if (this.dateFmt(ele.startTime) < this.dateFmt(now) && ele.startTime != null) {
            ele.dateDisabled = true;
          } else {
            ele.dateDisabled = false;
          }
        });
        //设置table的loading变量
        this.loading = false;
      });
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
    },
    //获取展区和专区
    getZhanqi(exhibitionNum, periodCode, exhibitionAreaCode) {
      this.regionOption = [];
      this.areaOption = [];
      let param = {
        exhibitionNum: this.session,
        periodCode: periodCode, //展期
        exhibitionAreaCode: exhibitionAreaCode  //展区
      };

      this.$http.get(this.baseApi + "/api/exp/exhibitionschemes/getAreas", param).then(res => {
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
        res.forEach(element => {
          this.areaOption.push({
            value: element.exhibitionAreaCode,
            label: element.exhibitionAreaName,
            specialAreas: element.specialAreas
          });
          if (element.specialAreas) {
            element.specialAreas.forEach(sa => {
              this.regionOption.push({
                value: sa.specialAreaCode,
                label: sa.cname
              });
            });
          }
        });
      }).catch(error => { });
    },
    //展期change事件
    periodCodeChange() {
      this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes = '';
      this.ruleForm.exhRegionTagPojo.exhRegionCodes = '';
      this.getZhanqi(this.exhibitionNum, this.ruleForm.exhSessionTagPojo.exhibitionSessions, this.ruleForm.exhAreaTagPojo.exhibitionAreaCodes);
    },
    //展区change事件
    exhibitionAreaCodeChange() {
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
    }
  }
};
</script>
