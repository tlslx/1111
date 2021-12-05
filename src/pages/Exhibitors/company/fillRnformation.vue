<style lang="less">
#exhibi_addud {
    .el-collapse-item__header{
      background-color: rgba(	100,149,237,1) !important;
      color: #FFFFFF;
      padding-left: 30px;
      font-family: 'Arial Normal', 'Arial';
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .tabs{
      margin-left: 80px;
      margin-right: 80px;
    }
    .li-style{
      list-style:none;
      cursor:pointer;
    }
    .remarke{
      margin-left: 40px;
      color: red;
    }
    .saveBtn{
      float: right;
      margin-right: 10%;
    }
    .saveBtnT{
      float: right;
      margin-right: 1%;
    }
    .inline-item{
      display: inline-block;
      width: 33%;
      margin-left: 8%;
    }
    .colum-item-left {
      display: inline-block;
      width: 66%;
      margin-left: 16%;
    }
    .colum-item-right {
      display: inline-block;
      width: 66%;
      // margin-left: 8%;
    }
    .fileName{
      display: inline-block;
      width: 70%;
    }
    .checkbox-item{
      display: inline-block;
      width: 33%;
      margin-left: 0;
    }
    .btn-style{
      text-align: center;
      padding-bottom: 20px;
    }
    .el-dialog{
      width:50%;
      margin-left: 60%;
    }
    .submint-div{
      width: 100%;
    }
    .submint-btn{
      float: right;
      height: 50px;
      line-height: 50px;
      padding: 0px;
    }
    .clsa:hover {
      color:black;
    }
  }
</style>

<template>
  <div id="exhibi_addud">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="填写其它信息" name="first">

      <el-collapse v-model="tables">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="submint-div">
            招展代理规模
            <el-button  type="text" v-on:click.native.stop="submit('baseInfForm')" class="submint-btn clsa" v-if="true">保存</el-button>
            </div>
          </template>
          <el-form :model="formInlineList" :rules="rules" ref="formInlineList" :disabled="false">
            <el-row>
              <el-form-item label="届数:" class="inline-item" size="small" prop="interWitnessNum" label-width="140px">
                
                <el-select v-model="formInlineList.number" clearable placeholder="请选择">
                  <el-option
                    v-for="item in numbersed"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标摊展位数量:" class="inline-item" size="small" prop="prizeNum" label-width="140px">
                <el-input v-model="formInlineList.standard"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="期数:" class="inline-item" size="small" prop="interWitnessNum" label-width="140px">
                <el-select v-model="formInlineList.values" clearable placeholder="请选择">
                  <el-option
                    v-for="item in bankDepositList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="豪摊展位数量:" class="inline-item" size="small" prop="prizeNum" label-width="140px">
                <el-input v-model="formInlineList.booths"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="光地展位数量:" class="inline-item" size="small" prop="interWitnessNum" label-width="140px">
                <el-input v-model="formInlineList.interWitnessNum"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item  name="2">
          <template slot="title">
            <div class="submint-div">
            基本信息
            <el-button  type="text" v-on:click.native.stop="submitList('baseInfForm')" class="submint-btn clsa" v-if="true">保存</el-button>
            </div>
          </template>
          <el-form :model="identForm" :rules="ruleForm" ref="identForm" :disabled="false">
            <el-row>
              <el-form-item label="开户行:" class="inline-item" size="small" prop="interWitnessNum" label-width="140px">
                <el-input v-model="identForm.bankdeposit"></el-input>
              </el-form-item>
              <el-form-item label="账号:" class="inline-item" size="small" prop="prizeNum" label-width="140px">
                <el-input v-model="identForm.account"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="开户行地址:" class="inline-item" size="small" prop="interWitnessNum" label-width="140px">
                <el-input v-model="identForm.bankadres"></el-input>
              </el-form-item>
              <el-form-item label="swifcode:" class="inline-item" size="small" prop="prizeNum" label-width="140px">
                <el-input v-model="identForm.swifcode"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    
  </el-tabs>
    <!-- @click="onSubmit" @click="increase" @click="onSubmit" -->
    <!-- <div style="margin-left:35%">

      <el-button type="primary" >查询</el-button>
      <el-button type="primary" >新增</el-button>
    </div> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      tables: ['1'],
      numbersed: [],
      bankDepositList: [],
      identForm: {
        bankdeposit: '',
        account: '',
        bankadres: '',
        swifcode: ''
      },
      formInlineList: {
        booths: '',
        interWitnessNum: '',
        standard: '',
        number: '',
        values: '1'
      },
      id: '',
      ruleForm: {},
      rules: {}
    };
  },
  async created() {
    this.id = localStorage.getItem('exhibitionAgentId');
    this.bankDepositList = await kindo.dictionary.get('ifoExhibitionSession');
    this.getDataHuenumber().then(res => {
      let numbers = '';
      this.numbersed = [];
      res.forEach(el => {
        if (el.current) {
          this.formInlineList.number = el.exhibitionNum;
          numbers = el.exhibitionNum;
        }
        let obj = {
          label: el.exhibitionNum,
          value: el.exhibitionNum
        };
        this.numbersed.push(obj);
      });
      if (numbers) {

        let objOne = {
          "customQueryParams": [
          ]
        };
        let obj = {
          "exhibition_agent_id": this.id,
          "exhibition_num": numbers,
          "exhibition_session": this.formInlineList.values
        };
        let key = Object.keys(obj);
        for (let i = 0; i < key.length; i++) {
          if (obj[key[i]] !== "" && obj[key[i]] != null) {
            let aFist = {
              "name": key[i],
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [
                obj[key[i]]
              ],
              "description": ""
            };
            objOne.customQueryParams.push(aFist);
          }
        }
        let objList = encodeURI(JSON.stringify(objOne));
        this.getAdministratorsAgent(objList).then(resed => {
          // console.log(resed, 'res999');
          resed.forEach(el => {
            if (el.layout === 0) {
              this.formInlineList.interWitnessNum = el.boothNum;
            } else if (el.layout === 1) {
              this.formInlineList.standard = el.boothNum;
            } else if (el.layout === 2) {
              this.formInlineList.booths = el.boothNum;
            }
          });
        });
      }
    });
  },
  methods: {
    ...mapActions("managemeAgentnt", [
      "getDataHuenumber",         // 获取届数
      "postAdministratorAgent",   // 管理员新增代理规模
      "getAdministratorsAgent"    // 管理员查看代理规模
    ]),
    // 保存
    submitList(data) {
      // this.$refs['identForm'].validate((valid) => {});
      let obj = {
        "exhibitionAgentId": this.id,
        "openBank": this.identForm.bankdeposit,       // 开户行
        "openAddr": this.identForm.bankadres,    //开户行地址
        "openAccount": this.identForm.account, //银行账号
        "swifcode": this.identForm.swifcode    //swiftcode
      };
      this.postAdministratorAgent(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.identForm = {};
        this.$refs[data].resetFields();
      });
    },
    submit(data) {
      // this.$refs['formInlineList'].validate((valid) => {});
      let obj = {
        "exhibitionAgentId": this.id,
        "exhibitionNum": this.formInlineList.number,
        "exhibitionSession": this.formInlineList.values,
        "boothNumOfLayoutZero": this.formInlineList.interWitnessNum,
        "boothNumOfLayoutOne": this.formInlineList.standard,
        "boothNumOfLayoutTwo": this.formInlineList.booths
      };
      this.postAdministratorAgent(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.formInlineList = {};
        this.$refs[data].resetFields();
      });
    },
    handleClick() {}
  }
};
</script>
