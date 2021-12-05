<style lang='less' scoped>
.wisd {
  width: 200px;
}
.flaxt {
  display: flex;
  flex: 1 1 0;
  // justify-content: center;
  // align-items: center;
}
</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品信息修改" name="first">
        <el-form :model="ruleForm" status-icon :rules="rules" :label-position="labelPosition" ref="ruleForm" style="margin-left:30%;margin-top:20px" label-width="120px" class="demo-ruleForm">
          <el-form-item label="展品中文名称：" prop="exhibits">
            <el-input  :clearable='true' class="wisd" v-model="ruleForm.exhibits"></el-input>
          </el-form-item>
          <el-form-item label="展品英文名称：" prop="checkPass">
            <el-input  :clearable='true' class="wisd" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item label="规格尺寸：" prop="dimension">
            <el-input class="wisd" :clearable='true' v-model.number="ruleForm.dimension"></el-input>
          </el-form-item>
          <el-form-item label="型号：" prop="version">
            <el-input class="wisd" :clearable='true' v-model.number="ruleForm.version"></el-input>
          </el-form-item>
          <el-form-item label="中文简介：" prop="age">
            <el-input class="wisd" type="textarea" :rows="3" v-model.number="ruleForm.introduc"></el-input>
          </el-form-item>
          <el-form-item label="英文简介：" prop="age">
            <el-input class="wisd" type="textarea" :rows="3" v-model.number="ruleForm.introducEnglish"></el-input>
          </el-form-item>
          <el-form-item label="展品照片：">
            <el-upload
              :action="urlImg"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :limit="3"
              :data="{ 'businessDelegationCode': delegationCode }"
              :on-exceed="handleExceed"
              :on-success="uploadImageSuccessImg"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <!-- <el-upload :file-list="imgList"
              class="upload-demo"
              :action="urlList"
              :on-preview="handlePreview"
              :on-success="uploadImageSuccessFile"
              :on-remove="handleRemovedel"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传文件</el-button>
             
            </el-upload> -->
            <!-- <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
            <el-button @click="resetForm(ruleForm)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    // let checkAge = (rule, value, callback) => {
    //     if (!value) {
    //       return callback(new Error('年龄不能为空'));
    //     }
    //   };
    return {
      activeName: 'first',
      urlImg: process.env.API_OS_URL + '/efOS/file/addThumb',
      // urlList: process.env.API_SN_URL + '/api/efSupExhManage/upload',
      dialogVisible: false,
      delegationCode: 260,
      labelPosition: 'right',
      ruleForm: {
        exhibits: '',
        checkPass: '',
        dimension: '',
        version: '',
        introduc: '',
        introducEnglish: ''
      },
      rules: {
        // exhibits: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { validator: validatePass, trigger: 'blur' }
        // ]
      },
      fileList: [],
      imgList: [],
      id: '',
      companyId: '',
      imageList: []
    };
  },
  created() {
    this.id = this.$route.query.data.exhibitId;
    this.companyId = this.$route.query.data.companyId;
    let obj = {
      exhibitId: this.id,
      companyId: this.companyId
    };
    this.handelModificaDetails(obj);
  },
  methods: {
    ...mapActions("managemen", [
      "getModificaDetails",         // 获取修改详情页面
      "postModificaDetailsSubmit",  // 获取修改详情页面(提交)
      "postDeleteImgag"             // 删除
    ]),
    handelModificaDetails(obj) {
      this.getModificaDetails(obj).then(res => {
        this.delegationCode = res.deptCode;
        this.ruleForm.exhibits = res.data.exhibitInfo.exhibitNameCh;
        this.ruleForm.checkPass = res.data.exhibitInfo.exhibitNameEn;
        this.ruleForm.dimension = res.data.exhibitInfo.exhibitSizeCh;
        this.ruleForm.version = res.data.exhibitInfo.exhibitModelCh;
        this.ruleForm.introduc = res.data.exhibitInfo.exhibitFeatureDescribeCh;
        this.ruleForm.introducEnglish = res.data.exhibitInfo.exhibitFeatureDescribeEn;
      });
    },
    // 删除图片
    handleRemove(file, fileList) {
      let imgList = file.response.data.split(',');
      let obj = {
        fileId: imgList[0]
      };
      this.postDeleteImgag(obj).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
      });
    },
    handleExceed(files, fileList) {
      this.$message.error('最多只能上传三张图片!');
    },
    // 图片上传成功
    uploadImageSuccessImg(file, fileList) {
      // this.imageList = [];
      let imgList = file.data.split(',');
      this.imageList.push({
        'imageS': imgList[1],
        'imageB': imgList[0]
      });
      if (this.imageList.length > 0) {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
      }
      // console.log(this.imageList);
    },
    // 文件上传成功
    // uploadImageSuccessFile(file, fileList) {
    // },
    // 删除文件
    // handleRemovedel(file, fileList) {
    // },  
    // handlePreview(file) {
    // },
    // beforeRemove(file, fileList) {},
    // handleExceed(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提交
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      let obj = {
        exhibitNameCh: this.ruleForm.exhibits,
        exhibitNameEn: this.ruleForm.checkPass,
        exhibitSizeCh: this.ruleForm.dimension,
        exhibitModelCh: this.ruleForm.version,
        exhibitFeatureDescribeCh: this.ruleForm.introduc,
        exhibitFeatureDescribeEn: this.ruleForm.introducEnglish,
        exhibitId: this.id,
        exhibitImgs: this.imageList
      };
      this.postModificaDetailsSubmit(obj).then(res => {
        this.$router.go(-1);
      });
    },
    // 取消
    resetForm() {
      // this.$refs[formName].resetFields();
      this.$router.go(-1);
    }
  }
};
</script>
