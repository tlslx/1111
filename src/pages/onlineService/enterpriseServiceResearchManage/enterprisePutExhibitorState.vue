/**
* @file 企业发布展商动态
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="发布展商动态" name="first">
      <el-form :model="ruleForm" :rules="rules" :disabled="disabled" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <!-- <div style="margin-left: 15%;">
          审核状态
          <span style="color: green;">审核通过</span>
        </div> -->
        <div class="hint">您当前可选择只发布中文或英文动态，也可中英文版同时发布。</div>
        <el-form-item label="标题（中文）：" prop="contentTitle">
          <el-input v-model="ruleForm.contentTitle" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="内容（中文）：" prop="contentText">
          <el-input :rows="4" type="textarea" v-model="ruleForm.contentText" maxlength="600"></el-input>
        </el-form-item>
        <!-- <div class="bottomHint">请输入10-600汉字「32/600」</div> -->
        <div class="hint">如果您希望同时发布英文版，请继续录入英文状态。</div>
        <el-form-item label="标题（英文）：" prop="contentTitleEn">
          <el-input v-model="ruleForm.contentTitleEn" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="内容（英文）：" prop="contentTextEn">
          <el-input :rows="4" type="textarea" v-model="ruleForm.contentTextEn" maxlength="1000"></el-input>
        </el-form-item>
        <!-- <div class="bottomHint">请输入0-1000字符「290/1000」</div> -->
        <el-form-item label="图片：" prop="imageEnclosure">
          <el-upload v-if="operateStatus !== 'select'" class="upload-basic-info" :action="uploadUrl + ''" list-type="picture-card"
            :disabled="picInfo.disabled" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess"
            :before-remove="beforeRemove" :file-list="fileList" :on-exceed="handleExceed" :before-upload="handleBeforeUpload"
            :limit="imgLimit">
            <i v-if="operateStatus !== 'select'" v-show="fileList.length < 1" class="el-icon-plus"></i>
          </el-upload>
          <span v-if="operateStatus !== 'select'" style="float: right;font-size: 12px;">- 格式：JPG, JPEG, GIF<br />-
            大小：不超过5mb<br />- 建议图片长宽为600像素左右，以达到最佳显示效果</span>
          <el-dialog title="图片预览" :visible.sync="picInfo.dialogVisible">
            <img width="100%" :src="picInfo.dialogImageUrl">
          </el-dialog>
          <img style="width: 100%;" v-if="operateStatus === 'select'" v-for="item in ruleForm.imageEnclosure" :src="item" alt="图片">
        </el-form-item>
        <!-- <el-form-item class="el-form-item-btn">
          <el-button type="danger" class="btn" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="warning" class="btn" @click="save">保存</el-button>
          <el-button class="btn" @click="resetForm">取消</el-button>
        </el-form-item> -->
      </el-form>
      <div class="el-form-item-btn">
        <el-button v-if="operateStatus !== 'select'" :disabled="disabled" type="danger" class="btn" @click="submitForm('ruleForm')">提交</el-button>
        <el-button v-if="operateStatus !== 'select'" :disabled="disabled" type="warning" class="btn" @click="save">保存</el-button>
        <el-button class="btn" @click="resetForm">返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        // tab
        activeName: "first",
        disabled: false,
        operateStatus: '',
        // 图片文件
        fileList: [],
        // 图片上传文件数最大限制
        imgLimit: 3,
        // 上传图片地址
        uploadUrl: process.env.API_OS_URL + '/efOS/file/addFiles',
        picInfo: {
          // 预览图片窗口图片地址
          dialogImageUrl: '',
          // 预览图片窗口默认隐藏
          dialogVisible: false
        },
        // 表单对象
        ruleForm: {
          // 标题
          contentTitle: "",
          // 内容
          contentText: "",
          // 标题英文
          contentTitleEn: "",
          // 内容英文
          contentTextEn: "",
          // 图片
          imageEnclosure: []
        },
        // 校验
        rules: {
          contentTitle: [{
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }],
          contentText: [{
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }]
          // contentTitleEn: [{ required: true, message: "", trigger: "blur" }],
          // contentTextEn: [{ required: true, message: "", trigger: "blur" }]
        }
      };
    },
    computed: {
      ...mapGetters('exhibitorDynamicInfo', ['getPubExh']), // 展商动态列表新增
      ...mapGetters('exhibitorDynamicInfo', ['modDynTra']) // 展商动态列表修改
    },
    mounted() {
      // 判断是否编辑页面并赋值
      if (this.$route.query.operateStatus === 'select') {
        this.disabled = true;
        this.operateStatus = 'select';
        this.ruleForm.contentTitle = this.$route.query.contentTitle;
        this.ruleForm.contentText = this.$route.query.contentText;
        this.ruleForm.contentTitleEn = this.$route.query.contentTitleEn;
        this.ruleForm.contentTextEn = this.$route.query.contentTextEn;
        let imgUrlList = this.$route.query.imageEnclosure.split(',');
        // console.log(imgUrlList);
        // let listImgUrl = [];
        // for (let item in imgUrlList) {
        //   let listImgUrl = {
        //     url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + imgUrlList
        //   };
        //   this.ruleForm.imageEnclosure[item].push(listImgUrl);
        // }
        // imgUrlList.forEach((element, index) => {
        //   let listImgUrl = {
        //     url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + element
        //   };
        //   // listImgUrl.push(process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + element);
        //   this.ruleForm.imageEnclosure.push(listImgUrl);
        //   // console.log(listImgUrl);
        //   // this.ruleForm.imageEnclosure = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.$route.query.imageEnclosure;
        // });
        let listImgUrl = [];
        imgUrlList.forEach((element, index) => {
          // let listImgUrl = {
          //   url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + element
          // };
          listImgUrl.push(process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + element);
          // this.ruleForm.imageEnclosure.push(listImgUrl);
          // console.log(listImgUrl);
          // this.ruleForm.imageEnclosure = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.$route.query.imageEnclosure;
        });
        this.ruleForm.imageEnclosure = listImgUrl;
        // console.log(this.ruleForm.imageEnclosure);
      } else if (this.$route.query.operateStatus === 'edit') {
        this.disabled = false;
        this.operateStatus = 'edit';
        this.ruleForm.contentTitle = this.$route.query.contentTitle;
        this.ruleForm.contentText = this.$route.query.contentText;
        this.ruleForm.contentTitleEn = this.$route.query.contentTitleEn;
        this.ruleForm.contentTextEn = this.$route.query.contentTextEn;
        // 图片预览
        this.fileList = [{
          url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.$route.query.imageEnclosure
        }];
      } else {
        this.disabled = false;
        this.operateStatus = 'add';
      }
    },
    methods: {
      ...mapActions('exhibitorDynamicInfo', ['getpublishNewStatusAndSave']), // 展商动态列表新增
      ...mapActions('exhibitorDynamicInfo', ['modificationDynamicTrade']), // 展商动态列表修改
      ...mapActions('file', ['delFileInfo']),
      // 文件预览
      handlePreview(file) {
        // console.log(file);
        this.picInfo.dialogImageUrl = file.url;
        this.picInfo.dialogVisible = true;
      },
      handleExceed(files, fileList) {},
      beforeRemove(file, fileList) {},
      // 上传图片成功
      handleSuccess(response, file, fileList) {
        // console.log(response, "66", file, "888", fileList, '555');
        for (let item in response.data) {
          this.ruleForm.imageEnclosure.push(response.data[item].fileId);
        }
        // this.ruleForm.imageEnclosure = response.data[0].fileId;
        // console.log(this.ruleForm.imageEnclosure, 'shangchuang');
      },
      // 上传类型设置
      handleBeforeUpload(file) {
        let isJPG = file.type === 'image/jpeg';
        let isLt5Mb = file.size / 1048576 < 5;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/GIF 格式!');
        }
        if (!isLt5Mb) {
          this.$message.error('上传头像图片大小不能超过 5Mb!');
        }
        return isJPG && isLt5Mb;
      },
      // 删除图片
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
      },
      // 取消按钮
      resetForm() {
        this.$router.back();
      },
      // 保存
      save() {
        let confirmParams = this.ruleForm;
        confirmParams.companyId = localStorage.getItem("getComPanyId");
        confirmParams.creatorId = this.$store.getters.userInfo.userId;
        confirmParams.operateType = "s";
        confirmParams.companyName = "软通";
        confirmParams.releaseStatus = "0";
        let strimageEnclosure = "";
        for (let item in confirmParams.imageEnclosure) {
          if (item > 0) {
            strimageEnclosure = strimageEnclosure + "," + confirmParams.imageEnclosure[item];
          } else {
            strimageEnclosure = confirmParams.imageEnclosure[item];
          }
        }
        confirmParams.imageEnclosure = strimageEnclosure;
        this.getpublishNewStatusAndSave(confirmParams).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          });
          // 判断是哪个页面进入的编辑页面
          if (this.$route.query.isAudit === "2") {
            this.$router.push("/checkExhibitorsApply");
          } else {
            this.$router.push("/dynamicListOperation");
          }
        });
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update();
          } else {
            return false;
          }
        });
      },
      // 判断是否编辑
      update() {
        // 编辑
        // console.log(this.$route.query.exhibitorDynamicId);
        if (this.$route.query.exhibitorDynamicId) {
          let confirmParams = this.ruleForm;
          confirmParams.exhibitorDynamicId = this.$route.query.exhibitorDynamicId;
          confirmParams.companyId = this.$route.query.companyId;
          // confirmParams.imageEnclosure = this.ruleForm.imageEnclosure.splice(',');
          confirmParams.companyName = this.$route.query.companyName;
          confirmParams.modifierId = this.$store.getters.userInfo.userId;
          confirmParams.modifierName = this.$store.getters.userInfo.userName;
          confirmParams.releaseStatus = "1";
          confirmParams.operateType = "p";
          // 编辑更新
          this.modificationDynamicTrade(confirmParams).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            });
            if (this.$route.query.isAudit === "2") {
              this.$router.push("/checkExhibitorsApply");
            } else {
              this.$router.push("/dynamicListOperation");
            }
          });
        } else {
          // 新增
          let confirmParams = this.ruleForm;
          this.ruleForm.companyId = localStorage.getItem("getComPanyId");
          this.ruleForm.imageEnclosure = this.ruleForm.imageEnclosure.join(',');
          this.ruleForm.creatorId = this.$store.getters.userInfo.userId;
          this.ruleForm.operateType = "p";
          this.ruleForm.companyName = "软通";
          this.ruleForm.numberSessions = "1";
          this.ruleForm.releaseStatus = "1";
          this.getpublishNewStatusAndSave(confirmParams).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            });
            this.$router.push("/dynamicListOperation");
          });
        }
      }
    }
  };

</script>
<style scoped>
  .el-form-item {
    width: 600px;
    position: relative;
    left: 20%;
    margin-bottom: 22px;
  }

  .hint {
    height: 50px;
    margin: 30px 0px;
    background: #f2f2f2;
    line-height: 50px;
    padding-left: 20%;
    color: rgb(0, 140, 255);
  }

  .bottomHint {
    width: 600px;
    position: relative;
    left: 20%;
    text-align: end;
  }

  .el-form-item-btn {
    position: relative;
    left: 30%;
    margin-top: 50px;
  }

  .btn {
    width: 120px;
    height: 40px;
  }

  .upload-basic-info {
    display: inline;
  }

</style>
