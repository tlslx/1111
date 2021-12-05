/**
 * @file 编辑筹撤展期间联络员
 * @date:2019/5/10
 */
<template>
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="编辑筹撤展期间联络员" name="first">
        <el-form :model="editExhibitContactsForm" ref="editForm" :rules="rules" label-width="160px" style="width: 50%">
          <el-form-item label="单位全称" prop="workUnitName">
            <el-select placeholder="请输入" v-model="editExhibitContactsForm.workUnitName">
              <el-option v-for="item in this.userDeptInfoData" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展届" prop="exhibitionSessioin">
            <el-select placeholder="请输入" v-model="editExhibitContactsForm.exhibitionSessioin" clearable>
              <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :label="item.exhibitionNum"
              :value="item.exhibitionNum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展期" prop="exhibitionPeriod">
            <el-select placeholder="请输入" v-model="editExhibitContactsForm.exhibitionPeriod" clearable>
              <el-option label="第一期" value="1"></el-option>
              <el-option label="第二期" value="2"></el-option>
              <el-option label="第三期" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="declareContact">
            <el-input placeholder="请输入" v-model="editExhibitContactsForm.declareContact" clearable></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="liaisonPosition">
            <el-input placeholder="请输入" v-model="editExhibitContactsForm.liaisonPosition" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="liaisonPhone">
            <el-input placeholder="请输入" v-model="editExhibitContactsForm.liaisonPhone" clearable></el-input>
          </el-form-item>
           <el-form-item label="固定电话（广州）" prop="liaisonFixedTelephone">
            <el-input placeholder="请输入" v-model="editExhibitContactsForm.liaisonFixedTelephone" clearable></el-input>
          </el-form-item>
          <el-form-item label="固定地址（广州）" prop="liaisonAddress">
            <el-input placeholder="请输入" v-model="editExhibitContactsForm.liaisonAddress" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" @click="submitAdd('editForm')">确定</el-button>
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
      editExhibitContactsForm: { reportId: '', workUnitName: '', exhibitionSessioin: '', exhibitionPeriod: '', declareContact: '',
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
    this.getExhibitionNumListAll().then(() => {
      let row = this.$route.query.row;
      this.editExhibitContactsForm.reportId = row.reportId;
      this.editExhibitContactsForm.workUnitName = row.workUnitName;
      this.editExhibitContactsForm.deptId = row.deptId; // 默认公司id
      this.editExhibitContactsForm.exhibitionSessioin = row.exhibitionSessioin;
      this.editExhibitContactsForm.exhibitionPeriod = row.exhibitionPeriod;
      this.editExhibitContactsForm.declareContact = row.declareContact;
      this.editExhibitContactsForm.liaisonPosition = row.liaisonPosition;
      this.editExhibitContactsForm.liaisonPhone = row.liaisonPhone;
      this.editExhibitContactsForm.liaisonFixedTelephone = row.liaisonFixedTelephone;
      this.editExhibitContactsForm.liaisonAddress = row.liaisonAddress;
    }); // 获取展届
    this.getUserDeptData();
  },
  methods: {
    ...mapActions('exhibitContact', ['postEditLiaisonContactsList', 'getUserDeptData']),
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']),
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postEditLiaisonContactsList(this.editExhibitContactsForm).then(res => {
            this.$message.success('编辑成功');
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
      this.$message.success('已取消编辑');
      this.clearParams();
      // this.$router.push({ path: 'liaisonContacts' });
      this.$router.go(-1);
    },
    clearParams() {
      for (const key in this.editExhibitContactsForm) {
        this.editExhibitContactsForm[key] = '';
      }
    }
  }
};
</script>
<style lang='less' scoped>

</style>
