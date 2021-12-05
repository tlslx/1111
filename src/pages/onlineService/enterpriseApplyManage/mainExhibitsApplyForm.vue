<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="主展展品申请单" name="first">
      <el-form class="mainExhibitsForm" :model="mainExhibitsData" ref="mainExhibitsForm" :rules="mainExhibitsRules" label-width="200px">
        <el-form-item label="展位性质：" prop="boothType">
          <el-select v-model="mainExhibitsData.boothType" class="select-width">
            <el-option v-for="(item, key) in boothTypeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionArea">
          <el-select v-model="mainExhibitsData.exhibitionArea" @change="handleExhibitionChange" class="select-width">
            <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品分类：" prop="productType">
          <el-radio-group v-model="mainExhibitsData.productType">
            <el-radio v-for="(item, key) in productTypeOpts" :key="key" :label="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主要展示产品：" prop="productId">
          <div class="dangerInfo">(至少选一项)</div>
          <el-select class="small-select-width" v-model="mainExhibitsData.productIdOne" @change="handleChangeOne" clearable>
            <el-option v-for="(item, key) in productIdOneOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-select class="small-select-width" v-model="mainExhibitsData.productIdTwo" @change="handleChangeTwo" clearable>
            <el-option v-for="(item, key) in productIdTwoOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品HS编码：" prop="hscode">
          <el-input placeholder="请输入8位数的海关编码" v-model="mainExhibitsData.hscode" class="input-width" maxlength="8" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请数量及折合面积：" prop="boothNumber">
          <el-input placeholder="请输入申请数量" v-model.number="mainExhibitsData.boothNumber" @blur="handleBoothNumBlur" class="input-width"></el-input>
          <el-input placeholder="自动计算折合面积" v-model="mainExhibitsData.boothAcreage" @blur="handleAcreageBlur" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="上届展位数量及折合面积：">
          <el-input v-model="mainExhibitsData.boothNumberLast" class="input-width" disabled></el-input>
          <el-input v-model="mainExhibitsData.boothAcreageLast" class="input-width" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品最大外形尺寸（m）：" v-if="isMechanical" prop="productSize">
          <el-input placeholder="请输入长" v-model.number="mainExhibitsData.productLong" class="input-width" clearable></el-input>
          <el-input placeholder="请输入宽" v-model.number="mainExhibitsData.productWidth" class="input-width" clearable></el-input>
          <el-input placeholder="请输入高" v-model.number="mainExhibitsData.productHeight" class="input-width" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品最大重量（kg）：" v-if="isMechanical" prop="productWeight">
          <el-input placeholder="请输入产品最大重量" v-model="mainExhibitsData.productWeight" class="input-width" clearable></el-input>
        </el-form-item>
        <el-form-item label="布展类型：">
          <el-select v-model="mainExhibitsData.exhibitionType" class="select-width" disabled>
            <el-option v-for="(item, key) in exhibitionTypeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否愿意接洽国内采购商：">
          <el-radio-group v-model="mainExhibitsData.isContacted" @change="handleIsContracted">
            <el-radio v-for="(item, key) in isContactedOpts" :key="key" :label="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展会期间开展的内贸业务：" v-if="isContractFlag">
          <el-radio-group v-model="mainExhibitsData.isCarryOut">
            <el-radio v-for="(item, key) in isCarryOutOpts" :key="key" :label="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="我司参展展品为：" v-if="isContractFlag">
          <el-checkbox-group v-model="mainExhibitsData.joinProductType">
            <el-checkbox v-for="(item, key) in joinProductTypeOpts" :key="key" :label="item" name="joinProductType"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--
        <el-form-item label="联营企业：">
          <a class="dangerInfo" href="javascript:;" v-if="false">添加</a>
          <el-select v-model="mainExhibitsData.unionId" class="select-width">
            <el-option v-for="(item, key) in list" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        -->
      </el-form>
      <div class="footer">
        <el-button type="primary" size="medium" @click="submitApplyConfirm('mainExhibitsForm')">确定</el-button>
        <el-button type="danger" size="medium" @click="goBack">取消</el-button>
      </div>
      <el-dialog title="提示" :visible.sync="isPrompt" width="20%">
        <p class="promptWords">您的申请已提交成功,确认是否打印此申请？</p>
        <div class="dia-footer">
          <el-button type="primary" size="medium" @click="isPrompt = false;">确定</el-button>
          <el-button type="danger" size="medium" @click="isPrompt = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    // hs编码校验 - 8位数的编码
    var hscodeCheck = (rule, value, callback) => {
      const reg = /^\d{8}$/;
      if (!value) {
        return callback(new Error('此项不得为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('请填写8位数字'));
      } else {
        return callback();
      }
    };
    // 产品尺寸校验 - 包含0的正数，可保留两位小数
    var productSizeCheck = (rule, value, callback) => {
      const reg = /^((0|\+?[1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (this.mainExhibitsData.productLong === '' || this.mainExhibitsData.productWidth === '' || this.mainExhibitsData.productHeight === '') {
        return callback(new Error('产品尺寸任一项都不得为空'));
      } else if (!reg.test(this.mainExhibitsData.productLong) || !reg.test(this.mainExhibitsData.productWidth) || !reg.test(this.mainExhibitsData.productHeight)) {
        return callback(new Error('产品尺寸任一项都为>=0且可保留两位小数的数'));
      } else {
        return callback();
      }
    };
    // 产品重量校验 - 包含0的整数，可保留两位小数
    var productWeightCheck = (rule, value, callback) => {
      const reg = /^((0|\+?[1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (this.mainExhibitsData.productWeight === '') {
        return callback(new Error('产品重量不得为空'));
      } else if (!reg.test(this.mainExhibitsData.productWeight)) {
        return callback(new Error('产品重量为>=0且可保留两位小数的数'));
      } else {
        return callback();
      }
    };
    // 主要出口展品
    var exhibitCheck = (rule, value, callback) => {
      if (this.mainExhibitsData.productIdOne === '' && this.mainExhibitsData.productIdTwo === '') {
        return callback(new Error('请至少选择一项主要出口展品'));
      } else {
        return callback();
      }
    };
    // 申请数量与折合面积校验
    var numArea = (rule, value, callback) => {
      const reg = /^(0|\+?[1-9][0-9]*)$/;
      if (this.mainExhibitsData.boothNumber === '' || this.mainExhibitsData.boothAcreage === '') {
        return callback(new Error('请填写申请数量与折合面积'));
      } else if (!reg.test(this.mainExhibitsData.boothNumber)) {
        this.mainExhibitsData.boothNumber = '';
        this.mainExhibitsData.boothAcreage = '';
        return callback(new Error('申请数量需>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      isPrompt: false,
      boothTypeOpts: [],
      exhibitionAreaOpts: [{ value: 'TG04', label: '运动服及休闲服' }, { value: 'MA02', label: '大型机械及设备' }],
      productTypeOpts: [],
      productIdOneOpts: [],
      productIdTwoOpts: [],
      exhibitionTypeOpts: [{ value: '2', label: '绿色特装' }],
      isContactedOpts: ['是', '否'],
      isCarryOutOpts: ['由外贸人员兼顾', '由内贸业务人员专项负责'],
      joinProductTypeOpts: ['全面面向境外市场', '外销设计，但也可兼顾境内销售', '有部分主要针对境内市场'],
      isMechanical: false, // 是否为大型机械等
      isContractFlag: false, // 是否愿意接洽国内采购商
      mainExhibitsData: {
        boothType: '', // 展位性质
        exhibitionArea: '', // 展区id
        productType: '', // 展品分类
        productId: '', // 主要出口展品
        productIdOne: '',
        productIdTwo: '',
        hscode: '', // 产品HS编码
        boothNumber: '', // 申请数量
        boothAcreage: '', // 申请折合面积
        boothNumberLast: 0, // 上届申请数量
        boothAcreageLast: 0, // 上届折合面积
        productLong: '', // 产品尺寸-长
        productWidth: '', // 产品尺寸-宽
        productHeight: '', // 产品尺寸-高
        productWeight: '', // 产品重量
        exhibitionType: '2', // 布展类型
        isContacted: '否', // 是否愿意接洽国内采购商
        isCarryOut: '由外贸人员兼顾', // 展位期间开展的内贸业务
        joinProductType: [] // 我司参展
      },
      mainExhibitsRules: {
        boothType: [{ required: true, message: '请选择展位性质', trigger: 'change' }],
        exhibitionArea: [{ required: true, message: '请选择展区', trigger: 'change' }],
        productType: [{ required: true, message: '请选择展品分类', trigger: 'change' }],
        productId: [{ required: true, validator: exhibitCheck, trigger: 'change' }],
        hscode: [{ required: true, validator: hscodeCheck, trigger: 'blur' }],
        productSize: [{ required: true, validator: productSizeCheck, trigger: 'blur' }],
        productWeight: [{ required: true, validator: productWeightCheck, trigger: 'blur' }],
        boothNumber: [{ required: true, validator: numArea, trigger: 'blur' }],
        isContacted: [{ required: true, trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters('companyInfomation', ['getBrandFlag']),
    submitAddData() {
      return {
        boothType: this.mainExhibitsData.boothType,
        productType: this.mainExhibitsData.productType,
        hscode: this.mainExhibitsData.hscode,
        boothNumber: this.mainExhibitsData.boothNumber,
        boothAcreage: this.mainExhibitsData.boothAcreage,
        boothNumberLast: this.mainExhibitsData.boothNumberLast,
        boothAcreageLast: this.mainExhibitsData.boothAcreageLast,
        productLong: this.mainExhibitsData.productLong,
        productWidth: this.mainExhibitsData.productWidth,
        productHeight: this.mainExhibitsData.productHeight,
        productWeight: this.mainExhibitsData.productWeight,
        exhibitionType: this.mainExhibitsData.exhibitionType,
        exhibitionArea: this.mainExhibitsData.exhibitionArea,
        isContacted: this.mainExhibitsData.isContacted === '否' ? 0 : 1,
        isCarryOut: this.mainExhibitsData.isCarryOut === '由外贸人员兼顾' ? 0 : 1,
        joinProductType: '',
        productId: ''
      };
    }
  },
  created() {
    let fullScreenloading = this.$loading({ fullscreen: true });
    // 展位性质判断
    this.getSchemePublishBrandFlag({ companyId: localStorage.getItem("getComPanyId") }).then(res => {
      this.$nextTick(() => {
        fullScreenloading.close();
      });
      if (res) {
        this.boothTypeOpts = [{ value: '0', label: '一般性展位' }, { value: '1', label: '品牌展位' }];
      } else {
        this.boothTypeOpts = [{ value: '0', label: '一般性展位' }];
      }
    }).catch(e => {
      this.$nextTick(() => {
        fullScreenloading.close();
      });
    });
  },
  methods: {
    ...mapActions('companyInfomation', ['getSchemePublishBrandFlag', 'postSchemePublishSubmit']),
    // 主要出口展品选择事件
    handleChangeOne(val) {
      if (val) {
        for (let i = 0; i < this.productIdOneOpts.length; i++) {
          if (this.productIdOneOpts[i].value === val) {
            this.mainExhibitsData.productNameOne = this.productIdOneOpts[i].label;
            break;
          }
        }
      } else {
        this.mainExhibitsData.productNameOne = '';
      }
    },
    handleChangeTwo(val) {
      if (val) {
        for (let i = 0; i < this.productIdTwoOpts.length; i++) {
          if (this.productIdTwoOpts[i].value === val) {
            this.mainExhibitsData.productNameTwo = this.productIdTwoOpts[i].label;
            break;
          }
        }
      } else {
        this.mainExhibitsData.productNameTwo = '';
      }
    },
    // 展区更换事件
    handleExhibitionChange(val) {
      this.mainExhibitsData.productType = '';
      this.mainExhibitsData.productIdOne = '';
      this.mainExhibitsData.productIdTwo = '';
      if (val === 'MA02' || val === 'MA07' || val === 'MA08' || val === 'VS04') {
        this.isMechanical = true;
        this.productTypeOpts = ['大型设备1', '大型设备2', '大型设备3'];
        this.productIdOneOpts = [{ value: '11', label: '主要出口展品11' }, { value: '12', label: '主要出口展品12' }, { value: '13', label: '主要出口展品13' }];
        this.productIdTwoOpts = [{ value: '21', label: '主要出口展品21' }, { value: '22', label: '主要出口展品22' }, { value: '23', label: '主要出口展品23' }];
      } else if (val === 'TG04') {
        this.isMechanical = false;
        this.productTypeOpts = ['运动服饰1', '运动服饰2', '运动服饰3'];
        this.productIdOneOpts = [{ value: '31', label: '主要出口展品31' }, { value: '32', label: '主要出口展品32' }, { value: '33', label: '主要出口展品33' }];
        this.productIdTwoOpts = [{ value: '41', label: '主要出口展品41' }, { value: '42', label: '主要出口展品42' }, { value: '43', label: '主要出口展品43' }];
      } else {
        this.isMechanical = false;
        this.productTypeOpts = [];
        this.productIdOneOpts = [];
        this.productIdTwoOpts = [];
      }
    },
    // 申请数量鼠标离开事件
    handleBoothNumBlur() {
      if (this.mainExhibitsData.exhibitionArea === 'MA02') {
        this.mainExhibitsData.boothAcreage = this.mainExhibitsData.boothNumber * 9;
      } else {
        this.mainExhibitsData.boothAcreage = this.mainExhibitsData.boothNumber * 8;
      }
    },
    // 折合面积鼠标离开事件
    handleAcreageBlur() {
      if (this.mainExhibitsData.exhibitionArea === 'MA02') {
        this.mainExhibitsData.boothNumber = Math.floor(this.mainExhibitsData.boothAcreage / 9);
      } else {
        this.mainExhibitsData.boothNumber = Math.floor(this.mainExhibitsData.boothAcreage / 8);
      }
    },
    // 是否愿意接洽国内采购商
    handleIsContracted(val) {
      let flag = val === '是' ? 1 : 0;
      if (flag) {
        this.isContractFlag = true;
        this.mainExhibitsData.isCarryOut = '由外贸人员兼顾';
      } else {
        this.isContractFlag = false;
        this.mainExhibitsData.isCarryOut = '';
        this.mainExhibitsData.joinProductType = [];
      }
    },
    // 点击确定
    submitApplyConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          if (this.mainExhibitsData.productIdOne !== '' && this.mainExhibitsData.productIdTwo !== '') {
            this.submitAddData.productId = `${this.mainExhibitsData.productIdOne},${this.mainExhibitsData.productIdTwo}`;
          } else {
            this.submitAddData.productId = this.mainExhibitsData.productIdOne ? this.mainExhibitsData.productIdOne : this.mainExhibitsData.productIdTwo;
          }
          this.submitAddData.joinProductType = this.mainExhibitsData.joinProductType ? this.mainExhibitsData.joinProductType.join(',') : '';
          let submitAddArr = [];
          for (let k in this.submitAddData) {
            submitAddArr.push(`${k}=${this.submitAddData[k]}`);
          }
          let submitAddDatas = submitAddArr.join('&');
          this.postSchemePublishSubmit(submitAddDatas).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.isPrompt = true;
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 点击取消
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.mainExhibitsForm{
  width: 50%;
  margin: 0 auto;
}
.mainExhibitsForm >>> .el-form-item{
  margin-bottom: 22px!important;
}
.dangerInfo{
  color: red;
}
.select-width{
  width: 260px;
}
.input-width, .small-select-width{
  width: 200px;
}
.footer{
  text-align: center;
  margin-top: 40px;
}
.promptWords{
  text-align: center;
}
.dia-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
