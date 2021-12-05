/**
 * @file 违规展位处理意见修改
 */
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
.el-form-item .el-form-item {
  margin-bottom: 22px;
}
.el-form-item {
  margin-bottom: 22px;
}
</style>
<template>
  <el-container>
    <el-header>
      <span>处理意见审批-修改</span>
    </el-header>
    <el-main>
      <el-form
        ref="opinionForm"
        :rules="rules"
        :model="opinionForm"
        label-width="130px"
      >
        <el-form-item
          label="交送时间"
          prop="deliveryTime"
        >
          <el-col :span="8">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="opinionForm.deliveryTime"
              style="width: 100%;"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item
          label="交送情况"
          prop="deliveryStatus"
        >
          <el-col :span="8">
            <el-input v-model="opinionForm.deliveryStatus"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="展区"
          prop="exhibitionAreaCode"
        >
          <el-col :span="8">
            <el-select
              v-model="opinionForm.exhibitionAreaCode"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in exhArea"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="展馆展厅号"
          prop="hallNo"
        >
          <el-col :span="8">
            <el-input
              v-model="opinionForm.hallNo"
              maxlength="15"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="展位号"
          prop="boothNo"
        >
          <el-col :span="8">
            <el-input
              v-model="opinionForm.boothNo"
              @change='getNum'
            ></el-input>
          </el-col>
          <el-col :span="12" style="color:#ff0000; margin-left:15px;">备注：展位号可以用逗号分隔输入多个 如：1.2A15,1.2A16</el-col>
        </el-form-item>
        <el-form-item
          label="展位数"
          prop="boothNumber"
        >
          <el-col :span="8">
            <el-input :value="ctrNum" :disabled="true"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" style="margin-left:10px" @click="getMsgCompanyData">获取企业信息</el-button>
          </el-col>
        </el-form-item>
        <el-form-item
          label="参展单位"
          prop="companyId"
        >
          <el-col :span="8">
            <el-select
              v-model="opinionForm.companyId"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in companys"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="所属交易团"
          prop="businessDelegationCode"
        >
          <el-col :span="8">
           <el-input v-show='isd' v-model="opinionForm.businessDelegationCode" style="width:290px" :disabled="true"></el-input>
           <el-input v-model="DelegationCode" style="width:290px" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联营企业" prop="jointCompanyId">
          <el-col :span="8">
            <el-input v-model="jointCompanyIdsName" style="width:290px" :disabled="true"></el-input>
            <!-- <el-select v-model="opinionForm.jointCompanyId" placeholder="请选择" :disabled="true">
              <el-option v-for="item in jointCompanys" :key="item.code" :label="item.label" :value="item.code"></el-option>
            </el-select> -->
          </el-col>
        </el-form-item>
        <el-form-item
          label="主动查处"
          prop="activeInvestigation"
        >
          <el-col :span="8">
            <el-select
              v-model="opinionForm.activeInvestigation"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in activeInvestigation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col
            :span="12"
            style="margin-left:15px;"
          >是否为所属交易团主动报告查处</el-col>
        </el-form-item>
        <el-form-item
          label="实际使用企业"
          prop="enterpriseChecked"
        >
          <el-col :span="8">
            <el-select
              v-model="opinionForm.enterpriseChecked"
              placeholder="请选择"
              style="width:100%"
              @change="sjCompany"
            >
              <el-option
                v-for="item in activeInvestigation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col
            :span="12"
            style="color:#ff0000; margin-left:15px;"
          >备注：当实际使用企业填写超过三家时，自动生成附表</el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="18">
            <template>
              <el-table
                border
                :header-cell-style="tableHeaderColor"
                :data="opinionForm.companies"
                style="width: 100%"
              >
                <el-table-column
                  fixed="left"
                  prop="companyName"
                  label="企业名称"
                  align="center"
                  width="160"
                ></el-table-column>
                <el-table-column
                  fixed="left"
                  prop="boothNo"
                  label="实际使用展位号"
                  align="center"
                ></el-table-column>
                <el-table-column
                  fixed="left"
                  prop="exhibitionNum"
                  label="实际使用展位数"
                  align="center"
                  width="120"
                ></el-table-column>
                <el-table-column
                  fixed="left"
                  prop="profFname"
                  label="证明材料"
                  align="center"
                >
                  <template slot-scope="scope">
                    <!-- <a :href="handleSrc(scope.row.profFid)"
                       target="_blank"
                       class="buttonText">{{scope.row.profFname}}</a> -->
                    <el-button type="text" @click="handleSrc(scope.row.profFid)">{{scope.row.profFname}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                  width="170"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="modifyCompanyInfo(scope.$index, scope.row)"
                    >修改</el-button>
                    <el-button
                      type="text"
                      @click="deleteCompany(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                type="info"
                plain
                @click="addComPop"
                :disabled="sjComShow"
              >+添加展位实际使用企业</el-button>
              <!-- 添加企业信息 -->
              <el-dialog
                title="新建实际使用企业"
                :visible.sync="dialogFormVisible"
              >
                <el-form
                  ref="newCompanyForm"
                  :rules="newCompanyFormRule"
                  :model="newCompanyForm"
                  label-width="125px"
                >
                  <el-form-item
                    label="企业名称"
                    prop="companyName"
                  >
                    <el-input
                      v-model="newCompanyForm.companyName"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="实际使用展位号"
                    prop="boothNo"
                  >
                    <el-input
                      v-model="newCompanyForm.boothNo"
                      autocomplete="off"
                      @change="getlo"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="实际使用展位数"
                    prop="exhibitionNum"
                  >
                    <el-input :value="strNum" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="证明材料">
                    <el-upload
                      class="upload-demo"
                      :action="uploadUrl + ''"
                      multiple
                      :http-request="uploadZMFile"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :file-list="fileList"
                      ref="upload"
                      :auto-upload="false"
                    >
                      <el-button
                        size="small"
                        type="primary"
                      >点击上传</el-button>
                      <div
                        slot="tip"
                        class="el-upload__tip"
                      >只能上传word文件，且不超过2MB</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="addCompany"
                  >确 定</el-button>
                </div>
              </el-dialog>
              <!-- 修改企业信息 -->
              <el-dialog
                title="修改实际使用企业"
                center
                :visible.sync="dialogFormVisibleModify"
              >
                <el-form
                  ref="newCompanyForm"
                  :rules="newCompanyFormRule"
                  :model="newCompanyForm"
                  label-width="130px"
                >
                  <el-form-item
                    label="企业名称"
                    prop="companyName"
                  >
                    <el-input
                      v-model="newCompanyForm.companyName"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="实际使用展位号"
                    prop="boothNo"
                  >
                    <el-input
                      v-model="newCompanyForm.boothNo"
                      autocomplete="off"
                      @change="getcs"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="实际使用展位数"
                    prop="exhibitionNum"
                  >
                   <el-input :value="strNum" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="证明材料">
                    <el-upload
                      class="upload-demo"
                      :action="uploadUrl + ''"
                      multiple
                      :http-request="uploadModifyZMFile"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :file-list="fileList"
                      ref="upload"
                      :auto-upload="false"
                    >
                      <el-button
                        size="small"
                        type="primary"
                      >点击上传</el-button>
                      <div
                        slot="tip"
                        class="el-upload__tip"
                      >只能上传word文件，且不超过2MB</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button @click="dialogFormVisibleModify = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="modifyCompanySubmit"
                  >确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-col>
        </el-form-item>
        <el-form-item
          label="届数"
          prop="exhibitionNum"
        >
          <el-col :span="8">
            <el-select
              v-model="opinionForm.exhibitionNum"
              placeholder="请选择"
              style="width:100%"
              @change="getExhibitionNum"
            >
              <el-option
                v-for="item in sessionNum"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="期数"
          prop="exhibitionSession"
        >
          <el-col :span="8">
            <el-select
              v-model="opinionForm.exhibitionSession"
              placeholder="请选择"
              style="width:100%"
              @change="getexhibitionSession"
            >
              <el-option
                v-for="item in phaseNum"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="处理意见"
          prop="opinion"
        >
          <el-col :span="13">
            <el-input
              v-model="opinionForm.opinion"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="entrySubmit('opinionForm')"
          >提交</el-button>
          <el-button @click="cancleModify">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import http from "@/scripts/framework/http";
// import { $helper } from "@/scripts/project/utils";
import { mapActions } from "vuex";
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

    let boothNoValidator = (rule, value, callback) => {
      let validator = /^\d+.\d+[A-Z]\d+(,\d+.\d+[A-Z]\d+)*$/;
      if (!validator.test(value)) {
        return callback(new Error("请输入正确格式的展位号"));
      }
      return callback();
    };
    // let boothNoValidaNum = (rule, value, callback) => {
    //   let validator = /(^[0-9]{1,6}$)|(^[0-9]{1,6}[\.]{1}[0-9]{1,2}$)/;
    //   if (!validator.test(value)) {
    //     return callback(new Error("请输入6位整数或小数点最多两位"));
    //   }
    //   return callback();
    // };
    let hallNoValidator = (rule, value, callback) => {
      let validator = /^[0-9.]+$/;
      if (!validator.test(value)) {
        return callback(new Error("请输入正确格式的展馆展厅号"));
      }
      return callback();
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      companyInfo: [        //企业信息
        {
          companyName: '北京天地贸易有限公司',   //企业名称
          sjBoothNo: '001A023',                //实际使用展位号
          sjBoothNum: '5',                     //实际使用展位数
          proveFile: ''                        //证明材料
        }
      ],
      opinionForm: {                      //新增意见参数
        deliveryTime: '',                 //交送时间,date-time
        deliveryStatus: '',               //交送情况
        companyId: '',                    //参展单位,string
        exhibitionAreaCode: '',           //展区,string
        businessDelegationCode: '',       //所属交易团,string
        hallNo: '',                       //展馆展厅号,int
        boothNo: '',                      //展位号,int
        // exhibitionHallSum: '',            //展馆数量,int
        activeInvestigation: '',          //主动查处,int
        enterpriseChecked: '',            //实际使用企业
        jointCompanyId: '',               //联营企业
        boothNumber: '',                  //展位数
        companies: [
          {
            companyName: '',
            boothNo: '',
            exhibitionNum: '',
            profFname: ""
          }
        ],                    //处理意见相关公司
        exhibitionNum: '',                //届数,int
        exhibitionSession: '',            //期数,string
        opinion: ''                       //处理意见,string
      },
      //实际使用企业
      sjComShow: true,
      //表单验证
      rules: {
        deliveryTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],                                                                          //交送时间,date-time
        deliveryStatus: [
          { required: true, message: '请输入交送情况', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],                                                                          //交送情况
        companyId: [
          { required: true, message: '请选择参展单位', trigger: 'change' }
        ],                                                                          //参展单位,string
        exhibitionAreaCode: [
          { required: true, message: '请选择展区', trigger: 'change' }
        ],                                                                          //展区,string                                                                         //所属交易团,string
        hallNo: [
          { required: true, message: '请输入展厅号', trigger: 'blur' },
          { validator: hallNoValidator, trigger: 'blur' }
        ],                                                                          //展馆展厅号,int
        boothNo: [
          { required: true, message: '请输入展位号', trigger: 'blur' },
          { validator: boothNoValidator, trigger: 'blur' }
        ],                                                                          //展位号,int                                                                        //展馆数量,int
        activeInvestigation: [
          { required: true, message: '请选择', trigger: 'change' }
        ],                                                                          //主动查处,int
        enterpriseChecked: [
          { required: true, message: '请选择', trigger: 'change' }
        ],                                                                          //实际使用企业               //届数,int
        exhibitionSession: [
          { required: true, message: '请选择', trigger: 'change' }
        ],                //期数,string
        opinion: [
          { required: true, message: '请输入处理意见', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]                       //处理意见,string
      },
      fileList: [],              //证明材料
      dialogFormVisible: false,
      dialogFormVisibleModify: false,
      //企业展位号临时数组
      lsBoothNoArray: [],
      newCompanyForm: {
        // companyName: '',
        // boothNo: '',
        // exhibitionNum: '',
        // profFname: ''
      },
      newCompanyFormRule: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        boothNo: [
          { required: true, message: '请输入展位号', trigger: 'blur' },
          { validator: boothNoValidator, trigger: 'blur' }
        ],
        exhibitionNum: [
          { required: true, message: '请输入展位数', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur' }
        ]
      },
      modifyIndex: '',
      // 联营企业
      jointCompanys: [{
        code: '0770800837',
        label: '中山市仕春纺织进出口有限公司'
      }],
       //企业列表
      companys: [],
      //展区
      exhArea: [],
      //组展单位（交易团）
      businessDelegation: [],
      //是否主动查处
      activeInvestigation: [],
      //届数
      sessionNum: [],
      //字典数组
      dictArray: {
        companys: [], // 获取企业
        business: [], // 获取交易团
        companyId: ''
      },
      //期数
      phaseNum: [],
      isd: false,
      DelegationCode: '',
      jointCompanyIdsName: "",
      // 上传图片地址
      uploadUrl: process.env.API_SN_URL + '/api/file',
      baseApi: process.env.API_SN_URL,
      baseApL: process.env.API_BASE_URL,
      baseApC: process.env.API_OS_URL
    };
  },
  created() {
    this.activeInvestigation = [
      {
        label: '是',
        value: '1'
      }, {
        label: '否',
        value: '2'
      }
    ];
    this.phaseNum = [
      {
        label: '1',
        value: '1'
      }, {
        label: '2',
        value: '2'
      },
      {
        label: '3',
        value: '3'
      }
    ];
    this.getDictionary();
    this.getpost();
    // this.clist();
    // this.BoothType();
    //触发显示
    this.sjCompany();
    this.opinionForm = this.$route.query;
  },
  computed: {
    strNum: function() {
      let value = "";
      if (this.newCompanyForm.boothNo) {
        value = this.newCompanyForm.boothNo.split(',');
        return value.length;
      } else {
        return "";
      }
    },
    ctrNum: function() {
      let value = "";
      if (this.opinionForm.boothNo) {
        value = this.opinionForm.boothNo.split(',');
        return value.length;
      } else {
        return "";
      }
    }
  },
  watch: {
    exhArea(val) {
      if (val.length > 0) {
        // this.opinionForm = this.$route.query;
        // delete this.$route.query.exhibitionAreaCode;
        // this.opinionForm = this.$route.query;
        // this.opinionForm.exhibitionAreaCode = this.$route.query.exhibitionAreaValue;
        this.DelegationCode = this.opinionForm.businessDelegationText;
       //是否主动查处
        this.opinionForm.activeInvestigation = this.numToLabel(this.opinionForm.activeInvestigation);
        //实际使用企业
        this.opinionForm.enterpriseChecked = this.numToLabel(this.opinionForm.enterpriseChecked);
      }
    }
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getPunishNotificatonTemplateExport', "getMsgCompany"]), // 下载
    getMsgCompanyData() {
      let flag = false;
      let obj = {
        sessionNumber: this.opinionForm.exhibitionNum,
        exhibitionPeriod: this.opinionForm.exhibitionSession,
        exhibitionAreaCode: this.opinionForm.exhibitionAreaCode,
        boothNo: this.opinionForm.boothNo
      };
      let arr = [];
      for (let key in obj) {
        // console.log(key);
        if (!obj[key]) {
          flag = true;
          this.$message({
            type: "warning",
            message: "请先完成届数、期数、展区、展位号的选择和填写"
          }); 
          break;
        }
        arr.push(`${key}=${obj[key]}`);
      }
      // console.log(arr);
      
      if (!flag) {
        let str = arr.join('&');
        // console.log(str);
        
        this.getMsgCompany(str).then(res => {
          // console.log(res);
          this.handleMsgCompany(res);
        }); 
      }
    },
    handleMsgCompany(obj) {
      //处理参展单位
      this.companys = [{
        label: obj.companyNameCh,
        value: obj.companyId
      }];
      this.opinionForm.companyId = obj.companyId;
      //处理交易团
      this.DelegationCode = obj.businessDelegation;
      this.opinionForm.businessDelegationCode = obj.businessDelegationId;
      //处理联营企业
      let str = [];
      let arr = [];
      for (let item of obj.jointCompanies) {
        str.push(item.nameCh);
        arr.push(item.companyId);
      }
      str = str.join(","); arr = arr.join(",");
      this.opinionForm.jointCompanyId = arr;
      this.jointCompanyIdsName = str;
    },
    clist() {
      if (this.opinionForm.boothNo && this.opinionForm.exhibitionAreaCode) {
        this.opinionForm.companyId = '0770800837';
        this.opinionForm.businessDelegationCode = '6e8cd384320f4f8baa5dc6b81bd337a3';
        this.DelegationCode = '广东';
        this.opinionForm.jointCompanyId = '0770800837';
      } else {
        this.opinionForm.companyId = '';
        this.opinionForm.businessDelegationCode = '';
        this.DelegationCode = '';
        this.opinionForm.jointCompanyId = '';
      }
    },
    getNum() {
      let arr = this.opinionForm.boothNo.split(',');
      this.opinionForm.boothNumber = arr.length;
      // this.clist();
    },
    getlo(data) {
      let arrs = this.newCompanyForm.boothNo.split(',');
      this.newCompanyForm.exhibitionNum = arrs.length;
    },
    getcs() {
      let arry = this.newCompanyForm.boothNo.split(',');
      this.newCompanyForm.exhibitionNum = arry.length;
    },
    // 限制展位类型
    // BoothType() {
    //    // 获取所有限制展位类型
    //   http.get(this.baseApi + "/api/sysDataDictItem/findDicItemListBySupportLimitBoothType").then(res => {
    //     res.records.forEach(element => {
    //       this.ifflauntCode.push({
    //         code: element.itemCode,
    //         label: element.itemText
    //       });
    //     });
    //   }).catch(error => { });

    // },

    // 获取展位
    getpost() {
      this.opinionForm.exhibitionAreaCode = "";
      let data = {
        exhibitionNum: this.opinionForm.exhibitionNum,
        periodCode: this.opinionForm.exhibitionSession
      };
       // 获取所有展区
      http.get(this.baseApi + "/api/exp/exhibitionschemes/getAreas", data).then(res => {
        res.forEach(element => {
          this.exhArea.push({
            code: element.exhibitionAreaCode,
            label: element.exhibitionAreaName
          });
        });
      }).catch(error => { });
    },
     //获取字典
    getDictionary() {
       // 获取所有展届
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.sessionNum.push({
            code: element.exhibitionNum,
            label: element.exhibitionNum
          });
        });
      }).catch(error => { });
      // 获取企业
      // let params4 = {
      //   companyName: "", //可选，企业名称模糊查询
      //   cantonCode: "", //可选，广交会编码
      //   pageSize: "10", //分页信息
      //   pageStart: "1" //分页信息
      // };
      // params4 = encodeURI(JSON.stringify(params4));

      // http.get(this.baseApC + "/efOS/efOsCompanyInfo/getCompanyInfoOuterTwo?param=" + params4).then(data => {
      //   data.records.forEach(element => {
      //     this.dictArray.companys.push({
      //       code: element.companyId,
      //       label: element.companyName
      //     });
      //   });
      //   this.companys = this.dictArray.companys;
      // }).catch(error => { });
    },
    backOut() {
      this.$router.go(-1);
    },
    //提交
    entrySubmit(thisForm) {
      // this.$refs.opinionForm.validate((valid) => {
      //   if (valid) {
      //     if (this.opinionForm.companies.length > 0) {
      //       //是否主动查处
      //       this.opinionForm.activeInvestigation = this.labelToNum(this.opinionForm.activeInvestigation);
      //       //实际使用企业
      //       this.opinionForm.enterpriseChecked = this.labelToNum(this.opinionForm.enterpriseChecked);
      //       let params = JSON.stringify(this.opinionForm);
      //       http.postJson(this.baseApi + "/api/opinion", params).then(data => {
      //         this.$message('修改成功！');
      //         setTimeout(this.backOut, 1000);
      //       }).catch(error => { });
      //     } else {
      //       this.$message({
      //         message: '至少添加一个企业信息！',
      //         type: 'warning'
      //       });
      //     }
      //   } else {
      //     // console.log('error submit!!');
      //     return false;
      //   }
      // });

      this.$refs[thisForm].validate((valid) => {
        if (valid) {
          if (this.sjComShow === false) {   //是实际使用企业
            if (this.opinionForm.companies.length > 0) {
              //参展单位
              //企业
              // this.opinionForm.companyId = $helper.getDicCode(this.companys, this.opinionForm.companyId);

              let params = this.deepClone(this.opinionForm);

              //主动查处  1是2否
              if (params.activeInvestigation === "是") {
                params.activeInvestigation = "1";
              } else {
                params.activeInvestigation = "2";
              }

              //实际使用企业 1是2否
              if (params.enterpriseChecked === "是") {
                params.enterpriseChecked = "1";
              } else {
                params.enterpriseChecked = "2";
              }
              params = JSON.stringify(params);
              http.postJson(this.baseApi + "/api/opinion", params).then(data => {
                this.$message({
                  message: '恭喜你，修改成功！',
                  type: 'success'
                });
                this.goBack();
              }).catch(error => { });
            } else {
              this.$message({
                message: '至少添加一个企业信息！',
                type: 'warning'
              });
            }
          } else {
            //企业
            //this.opinionForm.companyId = $helper.getDicCode(this.companys, this.opinionForm.companyId);
            //展区

            let params = this.deepClone(this.opinionForm);

            // params.exhibitionAreaCode = $helper.getDicCode(this.exhArea, this.opinionForm.exhibitionAreaCode);

            //主动查处  1是2否
            if (params.activeInvestigation === "是") {
              params.activeInvestigation = "1";
            } else {
              params.activeInvestigation = "2";
            }

            //实际使用企业 1是2否
            if (params.enterpriseChecked === "是") {
              params.enterpriseChecked = "1";
            } else {
              params.enterpriseChecked = "2";
            }

            params = JSON.stringify(params);
            http.postJson(this.baseApi + "/api/opinion", params).then(data => {
              this.$message({
                message: '恭喜你，修改成功！',
                type: 'success'
              });
              this.goBack();
            }).catch(error => { });
          }
        } else {
          return false;
        }
      });
    },

    //取消修改
    cancleModify() {
      this.backOut();
    },
    goBack() {
      this.$router.go(-1);
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'doc';
      const extension2 = testmsg === 'docx';
      const isLt2M = file.size / 1024 / 1024 < 2 && file.size / 1024 / 1024 > 0; //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 doc、docx格式!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 2MB且不能为 0!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M;
    },
    uploadSuccess(response, file, fileList) {
      this.newCompanyForm.profFname = file.name;
    },
    //添加企业
    addCompany() {
      this.$refs.newCompanyForm.validate((valid) => {
        if (valid) {
          //判定展位号是否重复
          this.getAllComBoothNo();
          if (this.lsBoothNoArray.indexOf(this.newCompanyForm.boothNo) > -1) {
            this.$message({
              message: '实际使用展位号不能重复!',
              type: 'warning'
            });
          } else if (this.$refs.upload.uploadFiles.length > 0) {
            let file = this.$refs.upload.uploadFiles[0];
            let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
            const extension = testmsg.toUpperCase() === 'DOC';
            const extension2 = testmsg.toUpperCase() === 'DOCX';
            const isLt2M = (file.size / 1024 / 1024) < 2 && (file.size / 1024 / 1024) > 0;     //这里做文件大小限制
            if (!(extension || extension2)) {
              this.$message({
                message: '上传文件只能是 doc、docx格式!',
                type: 'warning'
              });
              return false;
            }

            if (!isLt2M) {
              this.$message({
                message: '上传文件大小不能超过 2MB且不能为 0!',
                type: 'warning'
              });
              return false;
            }

            this.$refs.upload.submit();   //执行文件上传
            //this.opinionForm.companies.push(this.deepClone(this.newCompanyForm));
          } else {
            this.$message({
              message: '请添加证明材料!',
              type: 'warning'
            });
          }
        } else {
          return false;
        }
      });
    },
    //上传证明材料
    uploadZMFile(item) {
      this.newCompanyForm.profFname = item.file.name;
      let formData = new FormData();
      formData.append('file', item.file);
      http.putFile(this.uploadUrl, formData).then(data => {
        this.newCompanyForm.profFid = data.fileId;            //文件id
        //this.opinionForm.companies.push(this.newCompanyForm);
        //this.newCompanyForm = {};
        //this.$refs.upload.clearFiles();
        this.dialogFormVisible = false;
        this.opinionForm.companies.push(this.deepClone(this.newCompanyForm));
      }).catch(error => { });
    },
    uploadModifyZMFile(item) {
      this.newCompanyForm.profFname = item.file.name;
      let formData = new FormData();
      formData.append('file', item.file);
      http.putFile(this.uploadUrl, formData).then(data => {
        this.newCompanyForm.profFid = data.fileId;            //文件id
        //this.opinionForm.companies.push(this.newCompanyForm);
        //this.newCompanyForm = {};
        //this.$refs.upload.clearFiles();
        this.dialogFormVisible = false;
        this.opinionForm.companies.splice(this.modifyIndex, 1);
        this.opinionForm.companies.push(this.deepClone(this.newCompanyForm));
      }).catch(error => { });
    },
    //删除企业
    deleteCompany(index, row) {
      this.$confirm('此操作将删除企业信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.opinionForm.companies.splice(index, 1);
      }).catch(() => {
      });
    },
    //修改企业信息
    modifyCompanyInfo(index, row) {
      this.newCompanyForm = this.deepClone(this.opinionForm.companies[index]);
      this.modifyIndex = index;
      this.dialogFormVisibleModify = true;
      let file = {};
      file.name = this.newCompanyForm.profFname;
      file.flag = 1;
      this.fileList = [];
      this.fileList.push(file);
    },
    //修改企业确定
    modifyCompanySubmit() {
      this.$refs.newCompanyForm.validate((valid) => {
        if (valid) {
          //判定展位号是否重复
          this.getAllComBoothNo();
          let nary = [];
          for (let index = 0; index < this.lsBoothNoArray.length; index++) {
            const element = this.lsBoothNoArray[index];
            if (this.newCompanyForm.boothNo === element) {
              nary.push(element);
            }
          }
          if (nary.length > 1) {
            this.$message({
              message: '实际使用展位号不能重复!',
              type: 'warning'
            });
          } else if (this.$refs.upload.uploadFiles.length > 0) {
            let file = this.$refs.upload.uploadFiles[0];
            if (file.flag === undefined) {
              //重新上传了文件 由SUBMIT触发UPLOAD操作进行数据上传
              let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
              const extension = testmsg.toUpperCase() === 'DOC';
              const extension2 = testmsg.toUpperCase() === 'DOCX';
              const isLt2M = (file.size / 1024 / 1024) < 2 && (file.size / 1024 / 1024) > 0;     //这里做文件大小限制
              if (!(extension || extension2)) {
                this.$message({
                  message: '上传文件只能是 doc、docx格式!',
                  type: 'warning'
                });
                return false;
              }

              if (!isLt2M) {
                this.$message({
                  message: '上传文件大小不能超过 2MB且不能为 0!',
                  type: 'warning'
                });
                return false;
              }

              this.$refs.upload.submit();   //执行文件上传
            } else {
              //没有修改文件的情况，不需要上传文件，但是需要上传数据
              this.opinionForm.companies.splice(this.modifyIndex, 1);
              this.opinionForm.companies.push(this.deepClone(this.newCompanyForm));
            }

            //this.opinionForm.companies[this.modifyIndex] = this.deepClone(this.newCompanyForm);
            //this.opinionForm.companies.splice(this.modifyIndex, 1);
            //this.opinionForm.companies.push(this.deepClone(this.newCompanyForm));

            this.dialogFormVisibleModify = false;
          } else {
            this.$message({
              message: '请添加证明材料!',
              type: 'warning'
            });
          }
        } else {
          return false;
        }
      });
    },
     // 获取届数
    getExhibitionNum(event) {
      this.opinionForm.exhibitionNum = event;
      if (this.exhArea.length > 1) {
        this.exhArea = [];
      }
      this.getpost();

    },
    // 获取期数
    getexhibitionSession(events) {
      this.opinionForm.exhibitionSession = events;
      if (this.exhArea.length > 1) {
        this.exhArea = [];
      }
      this.getpost();
    },
    //获取组展单位
    getUnitName() {
      // 获取交易团
      // let params5 = {
      //   companyId: this.opinionForm.companyId
      // };
      // http.get(this.baseApi + "/api/sysDepartment/getBusinessDelegation", params5).then(data => {
      //   let thisData = data.records;
      //   this.opinionForm.businessDelegationCode = thisData[0].deptId;
      //   this.DelegationCode = thisData[0].deptName;
      // }).catch(error => { });
      // this.clist();
    },

    //添加企业弹窗
    addComPop() {
      this.fileList = [];
      this.newCompanyForm = {};
      this.dialogFormVisible = true;
    },
    //获取所有企业展位号
    getAllComBoothNo() {
      this.lsBoothNoArray.splice(0, this.lsBoothNoArray.length);
      this.opinionForm.companies.forEach(item => {
        this.lsBoothNoArray.push(item.boothNo);
      });
    },
    //实际使用企业
    sjCompany() {
      if (this.opinionForm.enterpriseChecked === "是") {    //是
        this.sjComShow = false;
      } else {                                             //否
        this.sjComShow = true;
        //清空实际企业信息
        this.opinionForm.companies = [];
      }
    },

    numToLabel(code) {
      let currentLabel = '';
      if (code === 1) {
        currentLabel = '是';
      } else {
        currentLabel = '否';
      }
      return currentLabel;
    },
    labelToNum(label) {
      let thisCode = '';
      if (label === '是') {
        thisCode = 1;
      } else {
        thisCode = 2;
      }
      return thisCode;
    },
    handleSrc(preFileId) {
      // window.open(this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + preFileId);
      // let srcUrl = process.env.API_SN_URL + '/api/file?fileId=' + preFileId;
      // return srcUrl;
      this.getPunishNotificatonTemplateExport({ fileId: preFileId });
    },
    deepClone(obj) { // 深拷贝
      let _obj = JSON.stringify(obj);
      let objClone = JSON.parse(_obj);
      return objClone;
    },
    cancelNewModify() {
      this.dialogFormVisibleModify = false;
      this.fileList = [];
    }

  }
};
</script>

