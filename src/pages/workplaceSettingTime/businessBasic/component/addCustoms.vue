<style lang="less" scoped>
.addCustoms {
  height: 100%;
  /deep/.el-form-item {
        margin-bottom: 20px;
      }
}
</style>
<template>
  <el-form ref="form" :model="form" label-width="120px" :rules="rules" class="addCustoms">
    <el-form-item label="广交会编码" prop="cantonCode">
      <el-input :disabled="disabled" v-model.trim="form.cantonCode" maxlength="7"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(form)">保存</el-button>
      <el-button @click="closeModel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "addCustoms",
  props: ['companyId', 'newcafe'],
  data() {
    let validateNum = (rule, value, callback) => {
      let str = /^[A-Za-z0-9]{3}([A-Z]){1}[A-Za-z0-9]{3}$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确的广交会编码,第四位为大写字母,长度为7个字符'));
      } else {
        return callback();
      }
    };
    return {
      disabled: false,
      form: {
        cantonCode: "",
        businessDelegationId: ''
      },
      rules: {
        cantonCode: [
          { required: true, message: '请输入广交会编码', trigger: 'blur' },
          { trigger: 'blur', validator: validateNum }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      'setcantonList'  //修改广交会编码
    ])
  },
  watch: {
    'newcafe': {
      handler(val) {
        if (val && val.length > 0) {
          this.form.cantonCode = val;
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      immediate: true
    }
  },
  created() {
    this.form.businessDelegationId = this.$store.getters.userInfo.workDeptCode;
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getSetCantonCode", //修改广交会编码
      'getCheckCantonCode'  //广交会编码判重

    ]),
    onSubmit(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.companyId = this.companyId;
          let newCode;
          let newlength;
          if (this.$store.getters.userInfo.org.deptType === "30") { //分团取上级团的deptCode
            newCode = this.$store.getters.userInfo.org.parentCode;
            newlength = form.cantonCode.slice(0, this.$store.getters.userInfo.org.parentCode.length);
          } else {
            newCode = this.$store.getters.userInfo.workDeptCode;
            newlength = form.cantonCode.slice(0, this.$store.getters.userInfo.workDeptCode.length);
          }
          if (this.disabled === false) {
            if (newCode === newlength) {
              this.getCheckCantonCode(this.form.cantonCode).then((res) => {
                this.getSetCantonCode(form).then((newres) => {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.closeModel();
                });
              });
            } else {
              this.$message.error('广交会编码必须与交易团编码一致!');
            }
          } else {
            this.$message.error('请重新提交修改广交会编码申请!');
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    closeModel() {
      this.$refs.form.resetFields();
      this.$emit("closeModal", false);
    }
  }
};
</script>

