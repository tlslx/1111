/**
 * @file 新增筹撤展期间联络员
 * @date:2019/5/10
 */
<template>
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="新增筹撤展期间联络员" name="first">
        <el-form :model="addExhibitContactsForm" ref="addForm" :rules="rules" label-width="160px" style="width: 50%">
          <el-form-item label="单位全称" prop="workUnitName">
            <el-select placeholder="请输入" v-model="addExhibitContactsForm.workUnitName" clearable>
              <el-option v-for="item in this.userDeptInfoData" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展届" prop="exhibitionSessioin">
            <el-select placeholder="请输入" v-model="addExhibitContactsForm.exhibitionSessioin" clearable>
              <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :label="item.exhibitionNum"
              :value="item.exhibitionNum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展期" prop="exhibitionPeriod">
            <el-select placeholder="请输入" v-model="addExhibitContactsForm.exhibitionPeriod" clearable>
              <el-option label="第一期" value="1"></el-option>
              <el-option label="第二期" value="2"></el-option>
              <el-option label="第三期" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="declareContact">
            <el-input placeholder="请输入" v-model="addExhibitContactsForm.declareContact" clearable></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="liaisonPosition">
            <el-input placeholder="请输入" v-model="addExhibitContactsForm.liaisonPosition" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="liaisonPhone">
            <el-input placeholder="请输入" v-model="addExhibitContactsForm.liaisonPhone" clearable></el-input>
          </el-form-item>
           <el-form-item label="固定电话（广州）" prop="liaisonFixedTelephone">
            <el-input placeholder="请输入" v-model="addExhibitContactsForm.liaisonFixedTelephone" clearable></el-input>
          </el-form-item>
          <el-form-item label="固定地址（广州）" prop="liaisonAddress">
            <el-input placeholder="请输入" v-model="addExhibitContactsForm.liaisonAddress" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" @click="submitAdd('addForm')">确定</el-button>
        <el-button type="info" size="medium" @click="cancelAdd">取消</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    let telephone = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.telephone;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入正确格式的电话号码"));
      }
      return callback();
    };
    return {
      activeName: 'first',
      addExhibitContactsForm: { workUnitName: '', exhibitionSessioin: '', exhibitionPeriod: '', declareContact: '',
        liaisonPosition: '', liaisonPhone: '', liaisonFixedTelephone: '', liaisonAddress: '' },
      rules: {
        liaisonPhone: [{ validator: telephone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['userDeptInfoData']),
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll'])
  },
  created() {
    this.getExhibitionNumListAll(); // 获取展届
    this.getUserDeptData().then(() => {
      if (this.userDeptInfoData.length > 0) {
        this.addExhibitContactsForm.workUnitName = this.userDeptInfoData[0].label;
        this.addExhibitContactsForm.deptId = this.userDeptInfoData[0].value;
      }
    });
  },
  methods: {
    ...mapActions('exhibitContact', ['postAddLiaisonContactsList', 'getUserDeptData']),
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']),
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postAddLiaisonContactsList(this.addExhibitContactsForm).then(res => {
            this.$message.success('新增成功');
            this.clearParams();
            // this.$router.push({ path: 'liaisonContacts' });
            this.$router.go(-1);
          });
        } else {
          this.$message.error('请将表单写完整');
        }
      });
    },
    cancelAdd() {
      this.$message.success('已取消新增');
      this.clearParams();
      // this.$router.push({ path: 'liaisonContacts' });
      this.$router.go(-1);
    },
    clearParams() {
      for (const key in this.addExhibitContactsForm) {
        this.addExhibitContactsForm[key] = '';
        this.addExhibitContactsForm.workUnitName = this.userDeptInfoData[0].label;
        this.addExhibitContactsForm.deptId = this.userDeptInfoData[0].value;
      }
    }
  }
};
</script>
<style lang='less' scoped>

</style>
