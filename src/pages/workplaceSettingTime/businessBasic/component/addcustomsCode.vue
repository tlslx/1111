<style lang="less" scoped>
.addCustoms {
  height: 100%;
  /deep/.el-form-item {
        margin-bottom: 20px;
      }
}
</style>
<template>
  <el-form ref="form" :model="form" label-width="160px" :rules="rules" class="addCustoms">
    <el-form-item label="海关编码" prop="customsCode">
      <el-input v-model.trim="form.customsCode" maxlength="10"></el-input>
    </el-form-item>
    <el-form-item label="来源:" prop="relationship">
      <el-select v-model="form.relationship" placeholder="请选来源:">
        <el-option
          v-for="item in relationshipDate"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="编码对应企业名称:" prop="relationshipName">
      <el-input v-model.trim="form.relationshipName" maxlength="150"></el-input>
    </el-form-item>
    <el-form-item label="编码使用展区:" prop="exhibitionArea">
      <el-select v-model="form.exhibitionArea" placeholder="请选使用展区:">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.exhibitionAreaName"
          :value="item.exhibitionAreaCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="海关编码登记证书:" prop="proofUrl" >
      <el-upload
        class="upload-dialog"
        :action="uploadUrl"
        :on-remove="handleRemove"
        :on-success="uploadSuccessfully"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        list-type="picture"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
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
  props: ['companyIdDate'],
  data() {
    let validateNum = (rule, value, callback) => {
      let str = /^.{10}$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确的海关编码,长度为10'));
      } else {
        return callback();
      }
    };
    return {
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile',
      fileList: [],
      options: [],
      form: {
        customsCode: "",
        relationship: '',
        relationshipName: '',
        attachment: ''
      },
      relationshipDate: [
        {
          value: 'ENTERPRISE',
          label: '本企业'
        },
        {
          value: 'SUBSIDARYCOMPANY',
          label: '全资子公司'
        },
        {
          value: 'HOLDCOMPANY',
          label: '控股子公司'
        }

      ],
      rules: {
        customsCode: [
          { required: true, message: '请输入海关编码', trigger: 'blur' },
          { trigger: 'blur', validator: validateNum }
        ],
        relationshipName: [
          { required: true, message: '请输入编码对应企业名称', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '请选择来源', trigger: 'change' }
        ],
        exhibitionArea: [
          { required: true, message: '请选择展区', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      'setcantonList'  //修改广交会编码
    ])
  },
  async created() {
    // this.options = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.options = newRes;
    }).catch(e => {});
    // this.form.businessDelegationId = this.$store.getters.userInfo.workDeptCode;
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getCustomadd" //新增海关编码
  
    ]),
    ...mapActions('nainformation', ['getexhibitionArea']),
    ...mapActions('file', ['delFileInfo']),
    onSubmit(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          for (let key in this.options) {
            if (form.exhibitionArea === this.options[key].value) {
              form.exhibitionAreaName = this.options[key].label;
            }
          }
          this.form.companyId = this.companyIdDate;
          if (form.attachment !== '') {
            this.getCustomadd(form).then((res) => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.closeModel();
            });
          } else {
            this.$message.error('请上传海关编码登记证书');
          }
        } else {
          return false;
        }
      });
    },
    closeModel() {
      this.fileList = [];
      this.$refs.form.resetFields();
      this.$emit("closeModal", false);
    },
    handleExceed() {
      this.$message.error('只能上传一张图片!');
    },
    //上传删除之前
    beforeRemove(file, fileList) {
      return this.$confirm('确定移除' + file.name + '？');
    },
    //上传成功
    uploadSuccessfully(response, file, fileList) {
      this.form.attachment = response.data.fileId;
    },
    //上传删除
    handleRemove(file, fileList) {
      if (file.response) {
        this.delFileInfo(file.response.data.fileId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: 'error'
          });
        });
      }
    }
  }
};
</script>