/**
 * @file 奖惩信息修改
 */
<template>
  <el-container>
    <el-header>
      <span>奖惩信息修改</span>
      <el-button @click="goBack" style="float: right; margin-top: 15px;">返回</el-button>
    </el-header>
    <el-main>
      <el-form ref="summaryForm" :rules="rule" :model="summaryForm" label-width="110px" style="padding-top:23px">
        <el-form-item label="届数：" prop="exhibitionNum">
          <el-select v-model="summaryForm.exhibitionNum" placeholder="请选择" style="width:150px" @change="changlevel">
            <el-option v-for="(item, i) in exhibitionSession" :key="i" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：" prop="orgId">
          <el-select v-model="summaryForm.orgId" placeholder="请选择" style="width:150px" disabled>
            <!-- <el-option v-for="item in companyInfo.companys" :key="item.code" :label="item.label" :value="item.code"></el-option> -->
            <el-option v-for="item in companyArray" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
          <el-button size="small" type="primary" icon="el-icon-search" @click="showInnerCompanyDialog" style="margin-left: 10px;"></el-button>
        </el-form-item>

        <el-dialog title="选择企业" :visible.sync="innerCompanyDialog" width="70%" @close="closeInnerCompany">
          <el-form :model="innerSearchData" :inline="true">
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="innerSearchData.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchInnerCompany">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="companyInfo.companys" border>
            <el-table-column width="35px">
              <template slot-scope="scope">
                <div style="width: 16px;overflow-x: hidden;">
                  <el-radio :label="scope.$index" v-model="radio" @change.native="handleFillCompany(scope.row)"></el-radio>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="企业ID"></el-table-column>
            <el-table-column prop="label" label="企业名称"></el-table-column>
          </el-table>
          <el-row type="flex" justify="end">
            <el-pagination
              @size-change="innerSizeChange"
              @current-change="innerCurrentChange"
              :current-page="pageInfoInnerData.pageStart"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageInfoInnerData.pageSize"
              layout="prev, pager, next, jumper"
              :total="companyInfo.total">
            </el-pagination>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeInnerCompany">关 闭</el-button>
          </span>
        </el-dialog>

        <el-form-item label="所属交易团">
          <el-input v-show='rover' v-model="summaryForm.unitId" style="width:290px" :disabled="true"></el-input>
          <el-input v-model="unitName" style="width:290px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="展区" prop="exhibitionAreaCode">
          <el-select v-model="summaryForm.exhibitionAreaCode" placeholder="请选择" style="width:290px" @change="changeExhibitionAreaCode">
            <el-option v-for="item in exhArea" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专区" prop="specialAreaCode">
          <el-select v-model="summaryForm.specialAreaCode" placeholder="请选择" style="width:290px" >
            <el-option v-for="item in speAreaArray" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最大安排数" prop="maxnum">
          <el-input v-model="summaryForm.maxnum" style="width:290px" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="限制展位类型" prop="ifflaunt">
          <el-select v-model="summaryForm.ifflaunt" placeholder="请选择" style="width:290px">
            <el-option v-for="item in ifflauntCode" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件类别" prop="rpTypeCode">
          <el-select v-model="summaryForm.rpTypeCode" placeholder="请选择" style="width:290px" @change="selectRelativeData">
            <el-option v-for="item in eveType" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认定条件" prop="rpConCodeList">
          <el-select v-model="summaryForm.rpConCodeList" multiple placeholder="请选择" style="width:290px">
            <el-option v-for="item in reCondition" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颁布单位" prop="issueId">
          <el-select v-model="summaryForm.issueId" filterable placeholder="请选择" style="width:290px">
            <el-option v-for="item in issueIdList" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中心联络部门" prop="deptId">
          <el-select v-model="summaryForm.deptId" filterable placeholder="请选择" style="width:290px">
            <el-option v-for="item in deptIdList" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理期限" prop="limit">
          <el-input v-model="summaryForm.limit" style="width:290px" maxlength="3"></el-input>
          <span style="margin-left: 10px">届</span>
        </el-form-item>
        <el-form-item label="认定依据" prop="cognizanceBasis">
          <el-input v-model="summaryForm.cognizanceBasis" maxlength="255" type="textarea" style="width:290px"></el-input>
        </el-form-item>
        <el-form-item label="起始届数" prop="start">
          <el-select v-model="summaryForm.start" placeholder="请选择" style="width:290px">
            <el-option v-for="item in exhibitionSession" :key="item.code" :label="item.label" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="entrySubmit">提交</el-button>
          <el-button @click="cancleEntry">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<style>
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-header > span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  height: 58px;
  line-height: 58px;
  display: block;
  float: left;
  border-bottom: 2px solid #2b579a;
}
.el-table th>.cell, .el-table .cell{
  font-size: 12px;
}
</style>
<script>
import http from "@/scripts/framework/http";
import { $helper } from "@/scripts/project/utils";
export default {
  data() {
    var newReg1 = (rule, value, callback) => {
      let num = /^[0-9]*[1-9][0-9]*$/;
      if (!num.test(value)) {
        return callback(new Error("只能输入正整数"));
      } else {
        return callback();
      }
    };

    let newReg2 = (rule, value, callback) => {
      if (value < this.summaryForm.exhibitionNum) {
        return callback(new Error("起始届数不能小于当前届数"));
      } else {
        return callback();
      }
    };
    return {
      companyArray: [],
      summaryForm: {
        exhibitionNum: '',    //届数
        maxnum: '', // 最大安排数
        ifflaunt: '', // 限制展位类型
        unitId: '',              //所属交易团
        orgId: '',               //企业名称
        exhibitionAreaCode: '',  //展区
        specialAreaCode: '',       //专区
        rpTypeCode: '',          //事件类别
        rpConCodes: '',          //认定条件
        rpConCodeList: '',       //认定
        issueId: '',             //颁布单位
        deptId: '',              //中心联络部门
        cognizanceBasis: '',     //认定依据
        limit: '',                //处理期限
        start: ''                //起始届数
      },
      rule: {
        exhibitionNum: [
          { required: true, message: '请选择届数', trigger: 'change' }
        ],
        orgId: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        exhibitionAreaCode: [
          { required: true, message: '请选择展区', trigger: 'change' }
        ],
        rpTypeCode: [
          { required: true, message: '请选择事件类别', trigger: 'change' }
        ],
        rpConCodeList: [
          { required: true, message: '请选择认定条件', trigger: 'blur' }
        ],
        issueId: [
          { required: true, message: '请选择颁布单位', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择中心联络部门', trigger: 'change' }
        ],
        limit: [
          { required: true, message: '请输入处理期限', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur' }
        ],
        start: [
          { required: true, message: '请选择起始届数', trigger: 'change' },
          { validator: newReg2, trigger: 'change' }
        ],
        maxnum: [
          { required: true, message: '请输入最大安排数', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur' }
        ],
        ifflaunt: [
          { required: true, message: '请选择限制展位类型', trigger: 'change' }
        ]
      },
       //字典数组
      dictArray: {
        eventType: [],   //事件类别
        confirmCondition: [], //认定条件
        confirmConditions: [], //认定条件
        issueIdList: [], // 颁布单位 中心联络部门
        companys: [], // 获取企业
        business: [], // 获取交易团
        companyId: ''
      },
      rover: false,
      unitName: '',
      //企业列表
      companyInfo: {
        companys: [],
        total: 0
      },
      radio: '',
      innerCompanyDialog: false, // 查询企业弹框
      pageInfoInnerData: { // 选择企业的分页
        pageStart: 1,
        pageSize: 10
      },
      innerSearchData: { companyName: '' }, // 弹框 企业名称
      //届数
      exhibitionSession: [],
      //展区
      exhArea: [],
      //专区(全)
      speArea: new Map(),
      //专区（单个展区内所有专区）
      speAreaArray: [],
      ifflauntCode: [],
      //事件类别
      eveType: [],
      //认定条件
      reCondition: [],
      arry: [],
      //颁布单位
      issueIdList: [],
      //中心联络部
      deptIdList: [],
      //所属交易团（交易团）
      businessDelegation: [],
      baseApi: process.env.API_SN_URL,
      baseApL: process.env.API_BASE_URL,
      baseApC: process.env.API_OS_URL
    };
  },
  created() {
    this.BoothType();
    this.getpost();
    this.getDictionary();
    this.getCompany(); // 点按钮获取企业
    this.getAllblist();
  },
  computed: {
    orgId() {
      return this.summaryForm.orgId;
    }
  },
  watch: {
    exhArea(val) {
      if (val.length > 0) {
        this.summaryForm = this.$route.query;   //接收参数
        this.companyArray = [{ code: this.summaryForm.orgId, label: this.summaryForm.companyName }]; // 下拉框展示
        this.summaryForm.rpConCodeList = this.$route.query.rpConCodeList;
        this.unitName = this.$route.query.businessDelegationText;
        this.exhibitionNums = this.$route.query.exhibitionNum;
        delete this.$route.query.exhibitionNum.rpTypeCode;
        this.summaryForm.rpTypeCode = this.$route.query.ruleCodeValue;
      }
    },
    orgId(val) {
      this.getUnitName();
    }
  },
  methods: {
    deepClone(obj) {
      // 深拷贝
      let _obj = JSON.stringify(obj);
      let objClone = JSON.parse(_obj);
      return objClone;
    },
    getAllblist() {
       // 获取所有认定条件数据
      let params2 = {
        type: 1
      };
      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params2);
        // data.forEach(element => {
        //   this.dictArray.confirmConditions.push({
        //     code: element.code,
        //     label: element.value
        //   });
        // });
    },
    // 回显
    bsList() {
       //根据事件类别和届数查询 认定条件和处理期限
      let params0 = {
        exhibitionNum: this.$route.query.exhibitionNum,
        ruleCode: this.$route.query.ruleCodeValue
      };
      return http.get(this.baseApi + "/api/rpRecord/getLimit", params0);
        // let rpArray = (data.rpConCodes).split(',');
        // let retArray = [];

        // rpArray.forEach(item => {
        //   let reValue = $helper.getDicLabel(this.dictArray.confirmConditions, item);
        //   let element = {};
        //   element.code = this.deepClone(item);
        //   element.label = this.deepClone(reValue);
        //   retArray.push(element);
        //   this.reCondition = retArray;
        // });
    },
    getBSList() {
      Promise.all([this.getAllblist(), this.bsList()]).then(([allType, bslist]) => {
        allType.forEach(element => {
          this.dictArray.confirmConditions.push({
            code: element.code,
            label: element.value
          });
        });
        if (bslist == null) {
          return;
        }
        let rpArray = (bslist.rpConCodes).split(',');
        let retArray = [];
        rpArray.forEach(item => {
          let reValue = $helper.getDicLabel(this.dictArray.confirmConditions, item);
          let element = {};
          element.code = this.deepClone(item);
          element.label = this.deepClone(reValue);
          retArray.push(element);
          this.reCondition = retArray;
        });
      });
    },
     // 获取展位
    getpost() {
      let data = {
        exhibitionNum: this.$route.query.exhibitionNum
      };
       // 获取所有展区
      http.get(this.baseApi + "/api/exp/exhibitionschemes/getAreas", data).then(res => {
        this.speArea.clear();
        res.forEach(element => {
          let speAreaArr = [];
          this.exhArea.push({
            code: element.exhibitionAreaCode,
            label: element.exhibitionAreaName
          });
          //塞入展区中的专区
          if (element.specialAreas != null) {
            element.specialAreas.forEach(element2 => {
              speAreaArr.push({
                code: element2.specialAreaCode,
                label: element2.cname
              });
            });
            this.speArea.set(element.exhibitionAreaCode + '', speAreaArr);
          }
        });
        this.speAreaArray = this.speArea.get(this.$route.query.exhibitionAreaCode + '');
      }).catch(error => {});
    },

    // 展区变化事件
    changeExhibitionAreaCode(val) {
      this.speAreaArray = this.speArea.get(val + '');
      this.summaryForm.specialAreaCode = '';
    },

     // 限制展位类型
    BoothType() {
       // 获取所有限制展位类型
      http.get(this.baseApi + "/api/sysDataDictItem/findDicItemListBySupportLimitBoothType").then(res => {
        res.records.forEach(element => {
          this.ifflauntCode.push({
            code: element.itemCode,
            label: element.itemText
          });
        });
      }).catch(error => { });

    },
     //获取字典
    getDictionary() {
       // 获取起始届数
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.exhibitionSession.push({
            code: element.exhibitionNum,
            label: element.exhibitionNum
          });
        });
      }).catch(error => { });
      // 事件类别
      let params = {
        dictCodes: '',
        eventCode: '',
        type: ''
      };
      http.get(this.baseApi + "/api/efSupEventType/selectDictByCodes", params).then(data => {
        data.forEach(element => {
          this.dictArray.eventType.push({
            code: element.code,
            label: element.value
          });
        });
        this.eveType = this.dictArray.eventType;
      }).catch(error => { });
       // 获取所有认定条件数据
      let params2 = {
        type: 1
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params2).then(data => {
        data.forEach(element => {
          this.dictArray.confirmCondition.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });
      // 获取颁布单位和中心单位
      let params3 = {
        CustomQueryParams: [
          {
            FindType: "EQ",
            Name: "parentId",
            Values: [
              "8a706d0898954e4c910fb73769bd4ae9"
            ]
          },
          {
            FindType: "EQ",
            Name: "state",
            Values: [
              "1"
            ]
          }
        ],
        OrderModelField: [
          {
            OrderByField: "deptCode",
            asc: true
          }
        ]
      };
      params3 = encodeURI(JSON.stringify(params3));
      http.get(this.baseApL + "/api/sysDepartment/getListAll?json=" + params3).then(data => {
        data.records.forEach(element => {
          this.dictArray.issueIdList.push({
            code: element.deptId,
            label: element.deptName
          });
        });
      }).catch(error => { });
      // 获取颁布单位
      this.issueIdList = this.dictArray.issueIdList;
      // 获取中心联络部门
      this.deptIdList = this.dictArray.issueIdList;
    },
    // 获取企业的请求
    getCompany(_companyName) {
      // 获取企业
      this.dictArray.companys = [];
      let params4 = {
        companyName: _companyName || '', //可选，企业名称模糊查询
        cantonCode: "", //可选，广交会编码
        pageSize: this.pageInfoInnerData.pageSize, // pageSize: "10", //分页信息
        pageStart: this.pageInfoInnerData.pageStart //分页信息
      };
      params4 = encodeURI(JSON.stringify(params4));
      http.get(this.baseApC + "/efOS/efOsCompanyInfo/getCompanyInfoOuterTwo?param=" + params4).then(data => {
        data.records.forEach(element => {
          this.dictArray.companys.push({
            code: element.companyId,
            label: element.companyName
          });
        });
        this.companyInfo.companys = this.dictArray.companys;
        this.companyInfo.total = data.total;
      }).catch(error => { });
    },
    // 打开查询企业弹框
    showInnerCompanyDialog() {
      // this.getCompany(); // 点按钮获取企业
      this.innerCompanyDialog = true; // 打开查询企业弹框
    },
    searchInnerCompany() { // 弹框内查询企业
      this.radio = '';
      this.pageInfoInnerData.pageStart = 1;
      this.getCompany(this.innerSearchData.companyName); // 查询企业
    },
    innerSizeChange(val) {
      this.radio = '';
      this.pageInfoInnerData.pageSize = val;
      this.getCompany(this.innerSearchData.companyName); // 查询企业
    },
    innerCurrentChange(val) {
      this.radio = '';
      this.pageInfoInnerData.pageStart = val;
      this.getCompany(this.innerSearchData.companyName); // 查询企业
    },
    handleFillCompany(row) { // 选中单行 赋值
      this.summaryForm.orgId = row.code;
      this.companyArray = [{ code: row.code, label: row.label }]; // 下拉框展示
    },
    // 关闭查询企业弹框
    closeInnerCompany() {
      this.innerCompanyDialog = false;
      this.innerSearchData.companyName = '';
    },
    //提交
    entrySubmit() {
      if (this.summaryForm.orgId === "") {
        this.$message({
          message: '请选择企业！',
          type: 'warning'
        });
      } else {
        this.$refs.summaryForm.validate((valid) => {
          if (valid) {
            // this.summaryForm.unitId = $helper.getDicCode(this.businessDelegation, this.summaryForm.unitId);
            //企业名称
            // this.summaryForm.orgId = $helper.getDicCode(this.companys, this.summaryForm.orgId);
            //事件类别
            // this.summaryForm.rpTypeCode = $helper.getDicCode(this.eveType, this.summaryForm.rpTypeCode);
            //颁布单位
            // this.summaryForm.issueId = $helper.getDicCode(this.issueIdList, this.summaryForm.issueId);
            //中心联络部门
            // this.summaryForm.deptId = $helper.getDicCode(this.deptIdList, this.summaryForm.deptId);

            // this.summaryForm.ifflaunt = this.summaryForm.ifflauntValue;
            this.summaryForm.status = 0;    //待审核状态
            let params = JSON.stringify(this.summaryForm);
            http.postJson(this.baseApi + "/api/rpRecord", params).then(data => {
              this.$message({
                message: '恭喜你，修改成功！',
                type: 'success'
              });
              this.goBack();
            }).catch(error => { });
          }
        });
      }
    },
    //取消录入
    cancleEntry() {
      this.goBack();
    },
    //获取所属交易团
    getUnitName() {
      let params5 = {
        companyId: this.summaryForm.orgId
      };
      http.get(this.baseApi + "/api/sysDepartment/getBusinessDelegation", params5).then(data => {
        let thisData = data;
        this.summaryForm.unitId = thisData.deptId;
        this.unitName = thisData.deptName;
      }).catch(error => { });
    },
    goBack() {
      this.$router.go(-1);
    },
    changlevel(levels) {
      this.summaryForm.exhibitionNum = levels;
      if (this.exhArea.length > 1) {
        this.exhArea = [];
      }
      this.getpost();
    },
    //事件类别change事件
    selectRelativeData(event) {
      //根据事件类别和届数查询 认定条件和处理期限
      let params = {
        exhibitionNum: this.summaryForm.exhibitionNum,
        ruleCode: event
      };
      http.get(this.baseApi + "/api/rpRecord/getLimit", params).then(data => {
        if (data == null) {
          return;
        }
        let rpArray = (data.rpConCodes).split(',');
        let retArray = [];

        rpArray.forEach(item => {
          let reValue = $helper.getDicLabel(this.dictArray.confirmCondition, item);
          let element = {};
          element.code = item;
          element.label = reValue;
          retArray.push(element);
        });

        this.reCondition = retArray;
        this.summaryForm.limit = data.limit;

        //认定条件判定
        let codeArray = [];
        let isClear = false;
        for (let index = 0; index < this.reCondition.length; index++) {
          const element = this.reCondition[index].code;
          codeArray.push(element);
        }
        for (let index = 0; index < this.summaryForm.rpConCodeList.length; index++) {
          const element = this.summaryForm.rpConCodeList[index];
          let indexOfVal = codeArray.indexOf(element);
          if (indexOfVal > 0) {
            isClear = true;
          } else {
            isClear = false;
          }
        }
        if (!isClear) {
          this.summaryForm.rpConCodeList = [];
        }

        //认定依据
        this.summaryForm.cognizanceBasis = data.cognizanceBasis;
      }).catch(error => { });
    }
  },
  mounted() {
    let currCode = $helper.getDicCode(this.eveType, this.summaryForm.rpTypeCode);
    this.selectRelativeData(currCode);
    this.bsList();
    this.getBSList();
  }

};
</script>

