/**
* @file 完善企业信息
* @author:wanglifeng
* @date:2019/1/14
*/
<template>
  <div>
    <p><span class="title">完善企业信息</span><span class="color-red">*</span><span class="title2">为必填项</span></p>
    <hr>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-position="right" label-width="210px" class="demo-ruleForm">
      <section>
        <div class="line"><span class="title-left">企业基本信息</span></div>
        <el-form-item label="企业名称（中文）:" prop="companyNameCn" class="item" size="small">
          <el-input v-model="ruleForm.companyNameCn"></el-input>
        </el-form-item>
        <el-form-item label="企业名称（英文）:" prop="companyNameEn" class="item" size="small">
          <el-input v-model="ruleForm.companyNameEn"></el-input>
        </el-form-item>

        <el-form-item label="所属区域:" prop="cityCode" class="item" size="small">
          <el-select v-model="ruleForm.provinceCode" placeholder="请选择" style="width: 49%;" @change="provinceChange">
            <el-option v-for="(item, index) in cityOption" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
          </el-select>
          <el-select v-model="ruleForm.cityCode" placeholder="请选择" style="width: 49%;">
            <el-option v-for="(item, index) in cityOption2" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业类型:" prop="typeId" class="item" size="small">
          <el-select v-model="ruleForm.typeId" placeholder="请选择">
            <el-option v-for="(item, index) in categoryOption"  :label="item.itemText" :value="item.itemCode" :key="index"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="所属交易团:" class="item" size="small">
          <el-select v-model="ruleForm.tradingGroup" placeholder="请选择">
            <el-option v-for="(item, index) in internationalaOption" :label="item.itemText" :value="item.dataDictItemId" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业内部研发团队人数:" class="item" size="small">
          <el-input v-model="ruleForm.researchNumber"></el-input>
        </el-form-item>

        <div v-for="(item, index) in ruleForm.contactList" :key="index">
          <el-form-item :label="index==0?'联系人' + 1 + '（中文）：':'联系人' + 2 + '（中文）：'" :prop="`contactList.${index}.contactNameCn`" :rules="index==0?rules.contactNameCn:rules.contactNameCn2" class="item" size="small">
            <el-input v-model="item.contactNameCn"></el-input>
          </el-form-item>
          <el-form-item :label="index==0?'联系人' + 1 + '（英文）：':'联系人' + 2 + '（英文）：'" :prop="`contactList.${index}.contactNameEn`" :rules="index==0?rules.contactNameEn:rules.contactNameEn2" class="item" size="small">
            <el-input v-model="item.contactNameEn"></el-input>
          </el-form-item>
          <el-form-item label="性别:" class="item" size="small">
            <el-radio v-model="item.gender" label="0">男</el-radio>
            <el-radio v-model="item.gender" label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="邮箱:" class="item" :prop="`contactList.${index}.email`" :rules="index==0?rules.email:rules.email2" size="small">
            <el-input v-model="item.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" class="item" size="small" :prop="`contactList.${index}.tel`" :rules="rules.tel">
            <el-input v-model="item.areaCode" placeholder="区号" style="width: 25%;display: inline-block"></el-input><span style="width: 4%;">-</span>
            <el-input v-model.number="item.tel" placeholder="固定电话" style="width: 70%;display: inline-block"></el-input>
          </el-form-item>
          <el-form-item label="手机:" :prop="`contactList.${index}.mobile`" :rules="index==0?rules.mobile:rules.mobile2" class="item" size="small">
            <el-input v-model="item.mobile"></el-input>
          </el-form-item>

          <el-form-item label="联系地址:" :prop="`contactList.${index}.address`" :rules="index==0?rules.address:''" class="item2" size="small">
            <el-input v-model="item.address"></el-input>
          </el-form-item>
        </div>
      </section>

      <section>
        <div class="line"><span class="title-left">获奖信息</span></div>

        <el-form-item label="IF奖（个）:" class="item" size="small" prop="award.ifAward">
          <el-input v-model.number="ruleForm.award.ifAward"></el-input>
        </el-form-item>
        <el-form-item label="红点奖（个）:" class="item" size="small" prop="award.reddoAward">
          <el-input v-model.number="ruleForm.award.reddoAward"></el-input>
        </el-form-item>
        <el-form-item label="G-MARK奖（个）:" class="item" size="small" prop="award.gmarkAward">
          <el-input v-model.number="ruleForm.award.gmarkAward"></el-input>
        </el-form-item>
        <el-form-item label="IDEA奖（个）:" class="item" size="small" prop="award.ideaAward">
          <el-input v-model.number="ruleForm.award.ideaAward"></el-input>
        </el-form-item>
        <el-form-item label="中国创新设计红星奖（个）:" class="item" size="small" prop="award.redstarAward">
          <el-input v-model.number="ruleForm.award.redstarAward"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="其他国际设计奖（中文）:" class="item" size="small" prop="award.otherAwardCn">
            <el-input type="textarea" v-model="ruleForm.award.otherAwardCn" clearable maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="其他国际设计奖（英文）:" class="item" size="small" prop="award.otherAwardEn">
            <el-input type="textarea" v-model="ruleForm.award.otherAwardEn" clearable maxlength="100"></el-input>
          </el-form-item>
        </el-row>
      </section>

      <section>
        <div class="line"><span class="title-left">其他信息</span></div>

        <el-form-item label="所拥有的品牌（中文）:" class="item" size="small" prop="brandCn">
          <el-input v-model="ruleForm.brandCn"></el-input>
        </el-form-item>

        <el-form-item label="所拥有的品牌（英文）:" class="item" size="small" prop="brandEn">
          <el-input v-model="ruleForm.brandEn"></el-input>
        </el-form-item>

        <el-form-item label="外观设计专业数量（个）:" class="item" size="small" prop="designPatentNumber">
          <el-input v-model.number="ruleForm.designPatentNumber"></el-input>
        </el-form-item>
        <el-form-item label="实用新型专利数量（个）:" class="item" size="small" prop="utilitionPatentNumber">
          <el-input v-model.number="ruleForm.utilitionPatentNumber"></el-input>
        </el-form-item>

        <el-form-item label="发明专利数量（个）:" class="item" size="small" prop="inventionPatentNumber">
          <el-input v-model.number="ruleForm.inventionPatentNumber"></el-input>
        </el-form-item>
      </section>

      <el-form-item>
        <el-button type="primary" class="btn1" @click="submitForm('ruleForm')">确认</el-button>
        <!--<el-button class="btn2" @click="cancel">取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import http from "@/scripts/framework/http";
export default {
  name: "perfectInformation",
  data() {
    const validateMobile = (rule, value, callback) => {
      let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
      if (value === "") {
        return callback(new Error("请输入手机号"));
      } else if (!MOBILE.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      } else {
        return callback();
      }
    };
    const validateMobile2 = (rule, value, callback) => {
      let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
      if (value !== "") {
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    // 验证0和正整数
    // const checkNumber = (rule, value, callback) => {
    //   if (!/^[+]{0,1}(\d+)$/i.test(value)) { //正整数正则
    //     return callback(new Error("请输入数字"));
    //   } else {
    //     return callback();
    //   }
    // };
    // 验证0和正整数 可以为空
    const checkNumber2 = (rule, value, callback) => {
      if (value !== "") {
        if (!/^[+]{0,1}(\d+)$/i.test(value)) { //正整数正则
          return callback(new Error("请输入数字"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    const checkEn = (rule, value, callback) => {
      if (!/^[a-zA-Z]*$/i.test(value)) { //英文正则
        return callback(new Error("请输入英文"));
      }
      return callback();
    };
    const checkCn = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5]+$/; //中文正则
      if (!reg.test(value)) {
        return callback(new Error("请输入中文"));
      }
      return callback();
    };
    const checkEn2 = (rule, value, callback) => {
      if (value !== '') {
        if (!/^[a-zA-Z]*$/i.test(value)) { //英文正则
          return callback(new Error("请输入英文"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    const checkCn2 = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5]+$/; //中文正则
      if (value !== '') {
        if (!reg.test(value)) {
          return callback(new Error("请输入中文"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    // const checkEmail = (rule, value, callback) => {
    //   let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; //Email正则
    //   if (!reg.test(value)) {
    //     return callback(new Error("请输入正确的邮箱"));
    //   }
    //   return callback();
    // };
    const checkEmail2 = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; //Email正则
      if (value !== '') {
        if (!reg.test(value)) {
          return callback(new Error("请输入正确的邮箱"));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    return {
      cityOption: [], // 城市列表
      cityOption2: [], // 城市列表2
      categoryOption: [], // 企业类别
      ruleForm: {
        companyNameCn: '',
        companyNameEn: '',
        tradingGroup: '', // 交易团
        researchNumber: '', // 研发人数
        provinceCode: '',
        cityCode: '',
        typeId: '', // 企业类型ID
        // districtId: '',
        contactList: [
          {
            contactId: null,
            contactNameCn: '', // 联系人中文
            contactNameEn: '', // 联系人英文
            email: '', // 邮箱
            gender: '0', // 性别
            areaCode: '', // 区号
            telephone: '', // 电话
            tel: '', // 电话
            mobile: '', // 手机
            address: '' // 地址
          },
          {
            contactId: null,
            contactNameCn: '', // 联系人中文
            contactNameEn: '',
            email: '',
            gender: '0',
            areaCode: '',
            telephone: '',
            tel: '',
            mobile: '',
            address: ''
          }
        ],
        // 获奖信息
        award: {
          ifAward: '',
          reddoAward: '', // 红点奖
          gmarkAward: '',
          ideaAward: '',
          redstarAward: '', // 红星奖
          otherAwardCn: '',
          otherAwardEn: ''
        },
        // 其他信息
        brandCn: '', // 品牌
        brandEn: '',
        designPatentNumber: '',
        utilitionPatentNumber: '',
        inventionPatentNumber: '' // 发明专利数量
      },
      internationalaOption: [],
      rules: {
        companyNameCn: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' },
          { min: 2, max: 25, message: '企业名称中文2-25个字符！', trigger: 'blur' },
          { required: true, validator: checkCn, trigger: 'blur' }
        ],
        companyNameEn: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' },
          { min: 2, max: 50, message: '企业名称英文不得超过50个字！', trigger: 'blur' },
          { required: true, validator: checkEn, trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        contactNameCn: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, validator: checkCn, trigger: 'blur' }
        ],
        contactNameCn2: [
          { required: false, validator: checkCn2, trigger: 'blur' }
        ],
        contactNameEn: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, validator: checkEn, trigger: 'blur' }
        ],
        contactNameEn2: [
          { required: false, validator: checkEn2, trigger: 'blur' }
        ],
        cityCode: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        email2: [
          { required: false, validator: checkEmail2, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        mobile2: [
          { required: false, validator: validateMobile2, trigger: 'blur' }
        ],
        tel: [
          { required: false, validator: checkNumber2, trigger: 'blur' }
        ],
        // tel2: [
        //   { required: false, validator: checkNumber2, trigger: 'blur' }
        // ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        award: {
          ifAward: [
            { required: false, validator: checkNumber2, trigger: 'blur' }
          ],
          reddoAward: [
            { required: false, validator: checkNumber2, trigger: 'blur' }
          ],
          gmarkAward: [
            { required: false, validator: checkNumber2, trigger: 'blur' }
          ],
          ideaAward: [
            { required: false, validator: checkNumber2, trigger: 'blur' }
          ],
          redstarAward: [
            { required: false, validator: checkNumber2, trigger: 'blur' }
          ],
          otherAwardCn: [
            { required: false, validator: checkCn2, trigger: 'blur' }
          ],
          otherAwardEn: [
            { required: false, validator: checkEn2, trigger: 'blur' }
          ]
        },
        brandCn: [{ required: false, validator: checkCn2, trigger: 'blur' }],
        brandEn: [{ required: false, validator: checkEn2, trigger: 'blur' }],
        designPatentNumber: [{ required: false, validator: checkNumber2, trigger: 'blur' }],
        utilitionPatentNumber: [{ required: false, validator: checkNumber2, trigger: 'blur' }],
        inventionPatentNumber: [{ required: false, validator: checkNumber2, trigger: 'blur' }]
      },
      // baseApi: 'http://192.168.1.116:9014',
      // baseApi2: 'http://192.168.1.110:8052'
      baseApi: process.env.API_CF_URL,
      baseApi2: process.env.API_DICT_URL
    };
  },
  methods: {
    init() {
      this.$http.get(this.baseApi + '/api/customservice/cf/getCfCompanyInfo').then(res => {
        let name;
        if (res) {
          for (name in this.ruleForm) {
            if (name === 'contactList') {
              for (let i = 0; i < this.ruleForm.contactList.length; i++) {
                for (let item in this.ruleForm.contactList[i]) {
                  this.ruleForm.contactList[i][item] = res.contactList[i][item];
                }
              }
            } else {
              this.ruleForm[name] = res[name];
            }

            for (let i = 0; i < this.ruleForm.contactList.length; i++) {
              if (this.ruleForm.contactList[i].telephone.split('-').length === 2) {
                this.ruleForm.contactList[i].areaCode = this.ruleForm.contactList[i].telephone.split('-')[0];
                this.ruleForm.contactList[i].tel = this.ruleForm.contactList[i].telephone.split('-')[1];
              } else {
                this.ruleForm.contactList[i].areaCode = '';
                this.ruleForm.contactList[i].tel = this.ruleForm.contactList[i].telephone.split('-')[0];
              }
            }
          }
        }
      }).catch(error => {
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.ruleForm.contactList.length; i++) {
            this.ruleForm.contactList[i].telephone = this.ruleForm.contactList[i].areaCode + '-' + this.ruleForm.contactList[i].tel;
          }
          const data = this.ruleForm;
          this.$http.postJson(this.baseApi + '/api/customservice/cf/saveCompanyInfo', data).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          }).catch(error => {
          });
        } else {
          this.$message({
            message: '有填写项不符合规则，请正确填写后再提交',
            type: 'error'
          });
          return false;
        }
      });
    },
    getArea() {
      this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=province').then(data => {
        this.cityOption = data.records;
        setTimeout(() => {
          if (this.ruleForm.provinceCode) {
            this.provinceChange();
          }
        }, 1000);
      }).catch(error => {
        this.ruleForm.provinceCode = '';
        this.ruleForm.cityCode = '';
      });
      // 获取企业类别
      this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=companyAttribute').then(data => {
        this.categoryOption = data.records;
      }).catch(err => {
        this.ruleForm.typeId = '';
      });
    },
    // 获取所属交易团
    getTradeGroup() {
      this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=tradingGroup').then(data => {
        this.internationalaOption = data.records;
      }).catch(err => {
      });
    },
    provinceChange() {
      this.$http.get(this.baseApi2 + '/api/sysDataDictItem/getChildDicItemList?dataDictItemId=' + this.ruleForm.provinceCode).then(data2 => {
        this.cityOption2 = data2.records;
        let first = false;
        this.cityOption2.forEach((item, index) => {
          if (item.dataDictItemId === this.ruleForm.cityCode) {
            first = true;
          }
        });
        if (!first) {
          this.ruleForm.cityCode = this.cityOption2[0].dataDictItemId;
        }
      }).catch(error => {
      });
    },
    cancel() {
      this.$route.go(-1);
    }
  },
  mounted() {
    this.init();
    this.getArea();
    this.getTradeGroup();
  }
};
</script>
<style scoped>
.title{
  font-size: 18px;
  font-weight: 600;
}
.color-red {
  color: #ff0000;
}
.item {
  display: inline-block;
  width: 47%;
}
.item2 {
  width: 96%;
}
.btn1 {
  background-color: #e04040;
  width: 150px;
  height: 40px;
  color: white;
  border-color: #e04040;
}
.btn2 {
  background-color: white;
  width: 150px;
  height: 40px;
}
.line{
  height: 10px;
  border-bottom: 1px solid #e6e6e6;
  width: 90%;
  margin: 20px auto;
}
.title-left{
  display: inline-block;
  height: 20px;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}

</style>
