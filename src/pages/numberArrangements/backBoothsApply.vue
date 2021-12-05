<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团退回展位" name="first">
      <el-form :model="formData" ref="formData" label-position="right" class="formData" :rules="rules" label-width="180px">
        <el-form-item label="企业名称：" prop="companyName">
          <el-input class="input-width" v-model="formData.companyName" disabled maxlength="24" value = "宝芝林"></el-input>
        </el-form-item>
        <el-form-item label="广交会编码：" prop="cantonFairCode">
          <el-input v-model="formData.cantonFairCode" disabled maxlength="20" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="交易团：" prop="dealClusterName">
          <el-input v-model="formData.dealClusterName" disabled maxlength="24" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionAreaName">
          <el-input v-model="formData.exhibitionAreaName"  disabled maxlength="10" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="展期：" prop="exhibitionPeriod">
          <el-input v-model="formData.exhibitionPeriod" disabled class="input-width">           
          </el-input>
        </el-form-item>
        <el-form-item label="退回展位数量：" prop="backBoothNumber">
          <el-input v-model="formData.backBoothNumber" maxlength="10" @change="backNumChange" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="本届保留品牌展位数：" prop="currentReserveNumber">
          <el-input v-model="formData.currentReserveNumber" disabled maxlength="10" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="情况分类：" prop="backType">
          <el-select placeholder="请选择" v-model="formData.backType" class="input-width" disabled>
            <el-option v-for="(item, key) in backTypeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退回原因：" prop="backReason">
          <el-input v-model="formData.backReason" class="input-width" maxlength="120" type = "textarea" rows="3" value="宝芝林"></el-input>
        </el-form-item>
        <el-form-item class="nonePrint">
          <el-button type="primary">上传确认书</el-button>
        </el-form-item>
      </el-form>
      <div class="textarea-form">
        <p>关于退展位收费约束机制的时间机制</p>
        <textarea class="textarea-bgc" rows="8">{{ aboutBackBooth }}</textarea>
        <div class="about-pay-confirm">
          <el-checkbox  v-model="checked">本司已读并确认以上所述内容</el-checkbox>
          <div class="nonePrint">
            <el-button type="danger" @click="handlePrint">打印模板</el-button>
          </div>
      </div>
      </div>
      <div class="about-pay-submit nonePrint">
        <el-button type="primary" @click="addBackConfirm('formData')" :disabled="!checked">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>  
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    var subtractNum = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (!value) {
        return callback(new Error('请输入退回展位数'));
      } else if (value - 0 === 0) {
        return callback(new Error('请输入大于0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入大于0的整数'));
      } else if (value > this.formData.lastBoothNumber) {
        return callback(new Error(`此项需小于等于上届品牌展位数(${this.formData.lastBoothNumber})`));
      } else {
        return callback();
      }
    };
    return {
      objData: {},
      getBackConfirmData: {},
      aboutBackBooth: '',
      backTypeOpts: [{ value: 1, label: "全部退回" }, { value: 2, label: "部分退回" }],
      formData: {
        companyName: "",
        cantonFairCode: "",
        dealClusterName: "",
        exhibitionAreaName: "",
        exhibitionPeriod: "",
        currentReserveNumber: "",
        backType: "",
        backReason: "",
        backBoothNumber: "",
        lastBoothNumber: ""
      },
      rules: {   
        backBoothNumber: [
          { required: true, validator: subtractNum, trigger: 'blur' }
        ],
        backType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        backReason: [
          { required: true, message: '请输入退回原因', trigger: 'change' }
        ]
      },
      activeName: "first",
      checked: true
    };
  },
  computed: {
    ...mapGetters('numberBrands', ['getBackConfirm', 'getExplainSetText']),
    backAddData() {
      return {
        boothAffirmId: this.getBackConfirmData.boothAffirmId,
        exhibitionSession: this.getBackConfirmData.exhibitionSession,
        dealClusterName: this.formData.dealClusterName,
        companyName: this.formData.companyName,
        exhibitionPeriod: this.formData.exhibitionPeriod,
        exhibitionArea: this.getBackConfirmData.exhibitionArea,
        exhibitionAreaName: this.formData.exhibitionAreaName,
        dealClusterId: this.getBackConfirmData.dealClusterId,
        cantonFairCode: this.formData.cantonFairCode,
        companyId: this.getBackConfirmData.companyId,
        companyCode: this.getBackConfirmData.companyCode,
        lastBoothNumber: this.formData.lastBoothNumber,
        currentChangeNumber: this.getBackConfirmData.currentChangeNumber,
        currentReserveNumber: this.formData.currentReserveNumber,
        backBoothNumber: this.formData.backBoothNumber,
        backType: this.formData.backType,
        backReason: this.formData.backReason,
        attachment: this.getBackConfirmData.attachment
      };
    }
  },
  created() {
    let fullScreenloading = this.$loading({ fullscreen: true });
    this.objData = JSON.parse(decodeURI(this.$route.query.data));
    // 初始化页面数据
    this.postBackConfirm(this.objData).then(res => {
      this.getBackConfirmData = JSON.parse(JSON.stringify(res));
      this.formData = {
        companyName: this.getBackConfirmData.companyName,
        cantonFairCode: this.getBackConfirmData.cantonFairCode,
        dealClusterName: this.getBackConfirmData.dealClusterName,
        exhibitionAreaName: this.getBackConfirmData.exhibitionAreaName,
        exhibitionPeriod: this.getBackConfirmData.exhibitionPeriod,
        currentReserveNumber: this.getBackConfirmData.lastBoothNumber - this.getBackConfirmData.backBoothNumber,
        backType: "",
        backReason: "",
        backBoothNumber: "",
        lastBoothNumber: this.getBackConfirmData.lastBoothNumber
      };
      // 获取退展位约束机制说明
      this.getExplainSet().then(data => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.aboutBackBooth = data.projectContent;
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    }).catch(e => {
      this.$nextTick(() => { 
        fullScreenloading.close();
      });
    });
  },
  methods: {
    ...mapActions('numberBrands', ['postBackConfirm', 'getExplainSet', 'postAddBackConfirm']),
    // 设置退回展位数事件
    backNumChange(val) {
      // 获取本届保留品牌展位数
      if (val !== '' && val > 0 && !(val > this.formData.lastBoothNumber)) {
        this.formData.currentReserveNumber = this.formData.lastBoothNumber - val;
      } else {
        this.formData.currentReserveNumber = '';
      }
      // 判断情况分类
      if (val - 0 !== this.formData.lastBoothNumber) {
        this.formData.backType = 2;
      } else {
        this.formData.backType = 1;
      }
    },
    // 打印模板
    handlePrint() {
      window.print();
    },
    // 提交
    addBackConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postAddBackConfirm(this.backAddData).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('申请提交成功');
            this.$router.push({ path: '/collectionDeposit' });
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 取消
    handleCancel() {
      this.$router.push({ path: '/collectionDeposit' });
    }
  }
};
</script>
<style scoped>
.formData{
  width: 50%;
  margin: 0 auto;
}
.input-width{
  width: 400px; 
  margin-top: 8px;
}
.textarea-form{
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
.textarea-form p{
  margin: 30px 0 20px;
}
.textarea-form .textarea-bgc{
  background: #ebebeb; 
  width: 100%;
}
.about-pay-confirm{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.about-pay-submit{
  text-align: center;
}
@media print{
  .nonePrint{
    display: none;
  }
}
</style>

