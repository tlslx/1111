/**
 * @file 奖惩规则管理查看
 */
<template>
  <el-container>
    <el-header>
      <span>奖惩规则管理查看</span>
    </el-header>
    <el-main>
      <el-form :rules="rules" ref="tableData" :model="tableData" label-width="150px">
        <el-form-item label="事件类别">
          <el-col :span="8">
            <el-input v-model="tableData.ruleCode" disabled></el-input>
          </el-col>
        </el-form-item>
         <!-- collapse-tags -->
        <el-form-item label="认定条件">
          <el-col :span="12">
            <el-select v-model="rewordPunishConditionVal" multiple placeholder="请选择" width="380px" disabled>
              <el-option v-for="item in rdtiaojianVal" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="面向企业的措施">
          <el-col :span="8">
            <el-checkbox-group @change="lsCompanyOpCheck" v-model="lsCompanyOp">
              <el-checkbox disabled v-for="item in comPanyLabelArrVal" :label="item.value" :key="item.value" :value="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="lsCompanyOpOtherVal" :disabled="showCompanyOpOther"></el-input> -->
          </el-col>
        </el-form-item>

        <el-form-item label="面向企业所属交易团的措施">
          <el-col :span="8">
            <el-checkbox-group v-model="lsBSCompanyOp" @change="lsCompanyOpTSCheck">
              <el-checkbox disabled v-for="item in comPanyOPLabelArrVal" :label="item.value" :key="item.value" :value="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="companyBsOpOtherVal" :disabled="showCompanyBSTeamOpOther"></el-input> -->
          </el-col>
        </el-form-item>
        <el-row :gutter="100" type="flex" justify="space-between" style="margin-bottom:20px;">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row style="font-weight:700">企业展位申请</el-row>
              <el-row>
                <el-input type="textarea" v-model="tableData.boothApplyCode" :disabled="true">
                </el-input>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row style="font-weight:700">安排企业展位数量</el-row>
              <el-row>
                <el-input type="textarea" v-model="tableData.boothNumberCode" :disabled="true">
                </el-input>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row style="font-weight:700">安排企业展位位置</el-row>
              <el-row>
                <el-input type="textarea" v-model="tableData.boothPositionCode" :disabled="true">
                </el-input>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-row style="font-weight:700">交易团</el-row>
              <el-row>
                <el-input type="textarea" v-model="tableData.btoCode" :disabled="true">
                </el-input>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="处理程序" prop="processingProgram">
          <el-col :span="8">
            <el-input disabled type="textarea" prop="processingProgram" :autosize="{ minRows: 2, maxRows: 6}" v-model="tableData.processingProgram"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="处理期限" prop="limit">
          <el-col :span="8">
            <el-input disabled v-model="tableData.limit" maxlength="3" ></el-input>
          </el-col>
          <el-col :span="8" style="margin-left:10px">届</el-col>
        </el-form-item>
        <el-form-item label="认定依据" prop="cognizanceBasis">
          <el-col :span="12">
            <el-input type="textarea" disabled v-model="tableData.cognizanceBasis"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="danger" @click="rpRuleModifySubMit">提交</el-button> -->
          <el-button @click="backOut">返回</el-button>
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
</style>
<script>
import http from "@/scripts/framework/http";
export default {
  data() {
    var newReg1 = (rule, value, callback) => {
      if (Number.isInteger(Number(value)) && Number(value) > 0) {
        return callback();
      } else {
        return callback(new Error("请输入有效数字"));
      }
    };
    return {
      rules: {
        processingProgram: [    // 处理程序
          { required: true, message: '请输入处理程序', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
        limit: [
          { required: true, message: '请输入处理期限', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur' }
        ],
        cognizanceBasis: [
          { required: true, message: '请输入认定依据', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },

      rdtiaojian: [],
      rdtiaojianVal: [],
      rdtiaojianCodeArr: [],   //认定条件码集合

      comPanyLabelArr: [],    //企业措施
      comPanyLabelArrVal: [],  //企业措施

      comPanyOPLabelArr: [],    //交易团措施
      comPanyOPLabelArrVal: [],       //交易团措施

      //认定条件
      rewordPunishCondition: [],
      rewordPunishConditionVal: [],
      // 表单数据
      tableData: {
        limit: ""
      },
      //字典数组
      dictArray: {
        eventType: [],    //事件类别
        confirmCondition: [],   //认定条件
        companyOp: [],          //面向企业的措施
        companyBSteamOp: [],    //面向企业的交易团的措施
        boothApply: [],      //展位申请
        boothNumber: [],     //展位数量
        boothPosition: [],   //展位位置
        businessTeamOperation: []    //交易团
      },

      // 面向企业措施
      showCompanyOpOther: true,
      lsCompanyOpCodes: [],
      lsCompanyOpOtherVal: '',
      lsCompanyOpFiled: [],
      // lsCompanyOpVal: [], // 不加其他不用
      lsCompanyOp: [],
      lsBSCompanyOp: [],
      //面向企业交易团的措施
      showCompanyBSTeamOpOther: true,
      lsCompanyBSTeamOpCodes: [],
      companyBsOpOtherVal: '',
      lsCompanyBSTeamOpFiled: [],
      // lsCompanyBSTeamOpVal: [], // 不加其他不用
      baseApi: process.env.API_SN_URL,
      rlCode: ''
    };
  },
  created() {
    this.getDictionary();
    this.tableData = this.$route.query;
    //通过事件类别获取认定条件列表
    this.rpConCodesValuesArray = (this.tableData.rpConCodesValues === undefined ? [] : this.tableData.rpConCodesValues.split(','));

    this.tableData.rpConCodes = this.rewordPunishConditionVal;

    this.lsCompanyOp = this.tableData.companyOpCodesValue;
    this.lsBSCompanyOp = this.tableData.companyBSTeamOpCodesValue;

    //企业措施数据回填
    this.lsCompanyOpOtherVal = this.tableData.companyOpOtherVal;
    //交易团措施回填
    this.companyBsOpOtherVal = this.tableData.companyBsOpOtherVal;
    //企业其他
    //this.lsCompanyOpOtherVal = this.tableData.companyOpOther;
    //交易团其他
    //this.companyBsOpOtherVal = this.tableData.companyBsTeamOpOther;

    // setTimeout(() => {
    //   this.rendTJ();
    // }, 1000);

    this.lsCompanyOpCheck();   //判定其他显示隐藏
    this.lsCompanyOpTSCheck();
  },
  computed: {
  },
  methods: {
    //返回已选届数 奖惩规则列表
    backOut() {
      // this.$router.go(-1);
      this.$router.push({
        path: '/rpRuleList',
        query: { exhibitionNum: this.tableData.exhibitionNum }
      });
    },
    //修改提交
    // rpRuleModifySubMit() {
    //   for (let i = 0; i < this.lsCompanyOp.length; i++) {
    //     let element = this.lsCompanyOp[i];
    //     if (element === '10001' && this.lsCompanyOpOtherVal === '') {
    //       this.$message({
    //         message: '请填写面向企业措施的其他！',
    //         type: 'warning'
    //       });
    //       return false;
    //     }
    //   }
    //   for (let t = 0; t < this.lsBSCompanyOp.length; t++) {
    //     let element = this.lsBSCompanyOp[t];
    //     if (element === '10001' && this.companyBsOpOtherVal === '') {
    //       this.$message({
    //         message: '请填写面向企业所属交易团措施的其他！',
    //         type: 'warning'
    //       });
    //       return false;
    //     }
    //   }
    //   this.$refs.tableData.validate((valid) => {
    //     if (valid) {
    //       //处理类型
    //       //认定条件  转码
    //       this.tableData.rpConCodes = this.rewordPunishConditionVal;
    //       //面向企业的措施
    //       this.tableData.companyOpCodes = this.lsCompanyOp;
    //       //面向交易团的措施
    //       this.tableData.companyBSTeamOpCodes = this.lsBSCompanyOp;
    //       //企业其他
    //       this.tableData.companyOpOther = this.lsCompanyOpOtherVal;
    //       //交易团其他
    //       this.tableData.companyBsTeamOpOther = this.companyBsOpOtherVal;
    //       this.tableData.rpConCodes = (this.tableData.rpConCodes.length === 0) ? '' : this.tableData.rpConCodes.join(",");
    //       this.tableData.companyOpCodes = (this.tableData.companyOpCodes === undefined) ? '' : this.tableData.companyOpCodes.join(",");
    //       this.tableData.companyBSTeamOpCodes = (this.tableData.companyBSTeamOpCodes === undefined) ? '' : this.tableData.companyBSTeamOpCodes.join(",");
    //       this.tableData.ruleCode = this.tableData.ruleCodeValue;
    //       this.tableData.boothApplyCode = this.tableData.boothApplyCodeValue;
    //       this.tableData.boothNumberCode = this.tableData.boothNumberCodeValue;
    //       this.tableData.boothPositionCode = this.tableData.boothPositionCodeValue;
    //       this.tableData.btoCode = this.tableData.btoCodeValue;
    //       delete this.tableData.typeCode;
    //       this.newTableDate = this.deepClone(this.tableData);
    //       let params = JSON.stringify(this.newTableDate);
    //       http.postJson(this.baseApi + "/api/rpRule", params).then(data => {
    //         this.$message({
    //           message: '恭喜你，修改成功！',
    //           type: 'success'
    //         });
    //         setTimeout(this.backOut, 1000);
    //       }).catch(error => { });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    //面向企业其他
    lsCompanyOpCheck() {
      if (this.lsCompanyOp === undefined) {
        return;
      }

      let index = 0;
      let flag = 0;
      for (; index < this.lsCompanyOp.length; ++index) {
        if (this.lsCompanyOp[index] === '10001') {
          flag = 1;
          break;
        } else {
          flag = 0;
        }
      }

      if (flag === 0) {
        this.showCompanyOpOther = true;
        this.lsCompanyOpOtherVal = '';
      } else {
        this.showCompanyOpOther = false;
      }

    },
    //交易团其他
    lsCompanyOpTSCheck() {
      if (this.lsBSCompanyOp === undefined) {
        return;
      }

      let index = 0;
      let flag = 0;
      for (; index < this.lsBSCompanyOp.length; ++index) {
        let element = this.lsBSCompanyOp[index];
        if (element === '10001') {
          flag = 1;
          break;
        } else {
          flag = 0;
        }
      }

      if (flag === 0) {
        this.showCompanyBSTeamOpOther = true;
        this.companyBsOpOtherVal = '';
      } else {
        this.showCompanyBSTeamOpOther = false;
      }
    },
    //获取列表
    getRending(array, code) {
      let thisArr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (code === element.parentCode) {
          thisArr.push(
            {
              label: element.label,
              code: element.code
            }
          );
        }
      }
      return thisArr;
    },
    deepClone(obj) { // 深拷贝
      let _obj = JSON.stringify(obj);
      let objClone = JSON.parse(_obj);
      return objClone;
    },
    //获取字典
    getDictionary() {
      // 事件类别
      let paramsL = {
        dictCodes: '',
        eventCode: '',
        type: ''
      };
      http.get(this.baseApi + "/api/efSupEventType/selectDictByCodes", paramsL).then(data => {
        data.forEach(element => {
          this.dictArray.eventType.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });

      // 获取所有认定条件数据
      let params = {
        type: 1
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params).then(data => {
        data.forEach(element => {
          this.dictArray.confirmCondition.push({
            code: element.code,
            label: element.value,
            eventCode: element.eventCode
          });
        });

        this.rdtiaojianVal = [];

        //认定条件数据接收
        for (let index = 0; index < this.dictArray.confirmCondition.length; index++) {
          const element = this.dictArray.confirmCondition[index];

          if (element.eventCode === this.tableData.ruleCodeValue) {
            this.rewordPunishConditionVal.push(this.deepClone(element.code));

            let rdElement = {};
            rdElement.label = this.deepClone(element.label);
            rdElement.value = this.deepClone(element.code);
            this.rdtiaojianVal.push(rdElement);
          }
        }
      }).catch(error => { });

      // 获取面向企业的措施数据
      let params2 = {
        type: 2
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params2).then(data => {
        data.forEach(element => {
          this.dictArray.companyOp.push({
            code: element.code,
            label: element.value,
            eventCode: element.eventCode
          });
        });

        let index = 0;
        for (; index < this.dictArray.companyOp.length; ++index) {
          const element = this.dictArray.companyOp[index];
          if (element.eventCode === this.tableData.ruleCodeValue) {
            let rdElement = {};
            rdElement.label = element.label;
            rdElement.value = element.code;
            this.comPanyLabelArrVal.push(rdElement);
          }
        }
        // 不用其他了
        // this.comPanyLabelArrVal.push(
        //   {
        //     "label": "其他",
        //     "value": "10001"
        //   }
        // );

        // this.lsCompanyOpVal = this.comPanyLabelArrVal;
      }).catch(error => { });

      // 获取面向企业的交易团的措施的数据
      let params3 = {
        type: 3
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params3).then(data => {
        data.forEach(element => {
          this.dictArray.companyBSteamOp.push({
            code: element.code,
            label: element.value,
            eventCode: element.eventCode
          });
        });
        //获取面向交易团的措施
        let index = 0;
        for (; index < this.dictArray.companyBSteamOp.length; ++index) {
          const element = this.dictArray.companyBSteamOp[index];
          if (element.eventCode === this.tableData.ruleCodeValue) {
            let rdElement = {};
            rdElement.label = element.label;
            rdElement.value = element.code;
            this.comPanyOPLabelArrVal.push(rdElement);
          }
        }
        // this.comPanyOPLabelArrVal.push(
        //   {
        //     "label": "其他",
        //     "value": "10001"
        //   }
        // );

        // this.lsCompanyBSTeamOpVal = this.comPanyOPLabelArrVal;
      }).catch(error => { });

      // 获取企业展位数据
      let params4 = {
        type: 4
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params4).then(data => {
        data.forEach(element => {
          this.dictArray.boothApply.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });

      // 获取展位数量数据
      let params5 = {
        type: 5
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params5).then(data => {
        data.forEach(element => {
          this.dictArray.boothNumber.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });

      // 获取展位位置数据
      let params6 = {
        type: 6
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params6).then(data => {
        data.forEach(element => {
          this.dictArray.boothPosition.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });
      // 获取交易团数据
      let params7 = {
        type: 7
      };
      http.get(this.baseApi + "/api/efSupEventType/getAllByType", params7).then(data => {
        data.forEach(element => {
          this.dictArray.businessTeamOperation.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });

    }
  }
};
</script>

