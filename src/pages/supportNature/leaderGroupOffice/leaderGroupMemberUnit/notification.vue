/**
 * @file 工作领导小组-通知报送
 * @author: weiwei
 * @date:2019/6/12
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="站内信" name="first">
      <el-form :model="mailForm" ref="mailForm">
        <el-form-item label="收件方：" prop="a">
          <el-select placeholder="请选择" v-model="mailForm.a" clearable>
            <el-option label="124" value=124></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题：" prop="b">
          <el-input placeholder="请输入" v-model="mailForm.b" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="c">
          <el-input type="textarea" placeholder="请输入" v-model="mailForm.c" clearable></el-input>
        </el-form-item>
        <el-form-item prop="d">
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="上传附件：" prop="d">
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSend('mailForm')">发 送</el-button>
          <el-button type="primary" @click="handleCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      mailForm: { a: '', b: '', c: '', d: '' },
      dialogVisible: false, // 上传图片的
      dialogImageUrl: '',
      fileList: []
    };
  },
  computed: {
    // ...mapGetters('exhibitContact', ['leaderListData']),
  },
  created() {

  },
  methods: {
    // ...mapActions('exhibitContact', ['getLeadershipList']),
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
    },
    handleSend(name) { // 发送按钮

    },
    handleCancel() { // 取消按钮

    }
  }
};
</script>
<style lang='less' scoped>

</style>
