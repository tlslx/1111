/**
 * @file 组展进度设置---新建组展单位标签
 */

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="新建组展单位标签" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="组展单位标签：" prop="unitTag">
          <el-input v-model="ruleForm.unitTag" maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item label="选择组展单位："></el-form-item>
        <el-form-item label="交易团：" prop="delegation">
          <el-select v-model="codeForm.delegation" placeholder="请选择交易团" clearable multiple>
            <el-option v-for="item in delegationOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会：" prop="coceral">
          <el-select v-model="codeForm.coceral" multiple clearable>
            <el-option v-for="item in coceralOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外贸中心：" prop="tradeCenter">
          <el-select v-model="codeForm.tradeCenter" multiple clearable>
            <el-option v-for="item in tradeCenterOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外贸司：" prop="tradeDevision">
          <el-select v-model="codeForm.tradeDevision" multiple clearable>
            <el-option v-for="item in tradeComOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业：" prop="companyIds">
          <div class="bm">
            <el-select v-model="codeForm.companyIds" multiple clearable collapse-tags>
              <el-option v-for="item in companyArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" @click="innerCompanyDialog = true" style="margin-left:10px">查询</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="toBack">取消</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="企业选择" :visible.sync="innerCompanyDialog" width="70%" :show-close="false">
        <components-checkCompanyList :showAble="innerCompanyDialog" @affirm-company="affirmCompany"
         :checkArray="codeForm.companyIds" @closeInnerCompany="closeInnerCompany"></components-checkCompanyList>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// vuex
import { mapGetters, mapActions } from "vuex";
import { getFTC, getJYT, getSXH, getWMS } from './dict_request';
import companyListCheck from "./components/companyListNature";
export default {
  components: {
    "components-checkCompanyList": companyListCheck
  },
  data() {
    return {
      innerCompanyDialog: false,
      // tab
      activeName: 'first',
      // 交易团数组
      delegationOption: [],
      // 商协会数组
      coceralOption: [],
      // 一选择的企业数组
      checkedCompany: [],
      //外贸中心
      tradeCenterOption: [],
      // 外贸司
      tradeComOption: [],
      //企业的公司
      companyArray: [],
      // 需要整合的对象
      codeForm: {
        // 交易团
        delegation: [],
        // 商协会
        coceral: [],
        // 企业
        firm: [],
        // 所有企业
        firmAll: false,
        // 外贸中心
        tradeCenter: [],
        // 外贸司
        tradeDevision: [],
        //企业列表
        companyIds: []
      },
      // 表单对象
      ruleForm: {
        // 组展单位标签
        unitTag: '',
        // 整合id数组
        orgIds: []
      },
      // 校验
      rules: {
        unitTag: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', [])
  },
  mounted() {
    // 获取字典
    let dicData = JSON.parse(localStorage.getItem('dictData'));

    // 企业数组赋值
    this.list = dicData.companyData;

    Promise.all([getFTC(), getJYT(), getSXH(), getWMS()])
      .then(([tco, jyt, sxh, wms]) => {
        for (let i in tco) {
          this.tradeCenterOption.push({
            value: i,
            label: tco[i]
          });
        }

        for (let i in jyt) {
          this.delegationOption.push({
            value: i,
            label: jyt[i]
          });
        }

        for (let i in sxh) {
          this.coceralOption.push({
            value: i,
            label: sxh[i]
          });
        }

        for (let i in wms) {
          this.tradeComOption.push({
            value: i,
            label: wms[i]
          });
        }
      }).catch(error => {
      });
  },
  methods: {
    ...mapActions('organizationProgress', ['addUnitTagInfo']),
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
    // 表单提交
    submitForm(formName) {
      
      // 整合id数组整合所有数组
      this.ruleForm.orgIds = [].concat(this.codeForm.coceral, this.codeForm.tradeCenter, this.codeForm.delegation, this.codeForm.tradeDevision, this.codeForm.firm, this.codeForm.companyIds);

      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.orgIds.length < 1) {
            this.$message({
              type: 'error',
              message: '请至少选择一个组展单位'
            });
          } else {
            // 新增
            this.addUnitTagInfo(this.ruleForm).then(res => {
              this.$message({
                type: 'success',
                message: '新增成功'
              });
              this.$router.push('/organizeLabelManagement');
            });
          }
        } else {
          // this.$message({
          //   type: 'error',
          //   message: '新增失败'
          // });
          return false;
        }
      });
    },
    // 取消返回列表页
    toBack() {
      this.$router.back();
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
