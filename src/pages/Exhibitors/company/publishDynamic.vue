/*
* @file 发布展商动态
* @author: weiwei
* @date:2019/3/28
*/
<template>
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="发布展商动态" name="first">
        <el-form :model="publishParams" :rules="rules" label-width="140px">
          <div class="hint">您当前可选择只发布中文或英文动态，也可中英文版同时发布。</div>
          <el-form-item label="标题（中文）：" prop="contentTitle">
            <el-input v-model="publishParams.contentTitle" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="内容（中文）：" prop="contentText">
            <el-input :rows="4" type="textarea" v-model="publishParams.contentText" maxlength="600"></el-input>
          </el-form-item>

          <div class="hint">如果您希望同时发布英文版，请继续录入英文状态。</div>
          <el-form-item label="标题（英文）：" prop="contentTitleEn">
            <el-input v-model="publishParams.contentTitleEn" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="内容（英文）：" prop="contentTextEn">
            <el-input :rows="4" type="textarea" v-model="publishParams.contentTextEn" maxlength="1000"></el-input>
          </el-form-item>
          <el-form-item label="图片：" prop="imageEnclosure">
            <el-upload :action="API_POT_URL + '/api/ifoFile/addFiles'" list-type="picture-card"
              :data="this.uploadParams" :limit="3" accept="jpg, jpeg, png" :on-success="handleUploadSuccess" :on-remove="handleUploadRemove">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">
                <span>- 最多上传3张jpg/png/jpeg文件</span><br>
                <span>- 建议图片长宽为600像素左右，以达到最佳显示效果</span><br>
                <span>- 大小：不超过5mb</span><br>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-col type="flex" justify="end">
          <el-button type="danger" @click="submitAddList('p')">提 交</el-button>
          <el-button type="warning" @click="submitAddList('s')">保 存</el-button>
          <el-button @click="$router.push({ path: '/dynamicList' })">取 消</el-button>
        </el-col>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex"; //, mapGetters
export default {
  data() {
    let checkEn = function(rule, value, callback) {
      let errors = [];
      let regRule = /^[a-zA-Z0-9]+$/;
      if (!regRule.test(value) && value !== "") {
        errors.push(new Error("请输入英文"));
      }
      callback(errors);
    };
    return {
      API_POT_URL: process.env.API_POT_URL,
      activeName: "first",
      publishParams: {
        contentTitle: '',
        contentText: '',
        contentTitleEn: '',
        contentTextEn: '',
        imageEnclosure: ''
      },
      requireParams: {
        // companyId: 'aaa',
        companyName: '',
        creatorId: '',
        creatorName: '',
        operateType: ''
      },
      addFileIdList: [],
      rules: {
        contentTitle: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        contentText: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { max: 600, message: '长度在 600 个字符', trigger: 'blur' }
        ],
        contentTitleEn: [
          {
            required: true,
            // pattern: /^[A-Za-z]+$/,
            message: "请输入英文",
            trigger: "blur"
          },
          { validator: checkEn, trigger: "blur" }
        ],
        contentTextEn: [
          {
            required: true,
            max: 600,
            // pattern: /^[A-Za-z]+$/,
            message: "请输入英文",
            trigger: "blur"
          },
          { validator: checkEn, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    dynamicInfo() {
      let params = Object.assign({}, this.publishParams, this.requireParams);
      params.imageEnclosure = this.addFileIdList.join(',');
      return { dynamicInfo: params };
    },
    uploadParams() {
      let params = {
        creatorId: this.requireParams.creatorId,
        creatorName: this.requireParams.creatorName
      };
      return params;
    }
  },
  methods: {
    ...mapActions('exhibitorsDynamic', ['postAddExhibitors']),
    handleUploadSuccess(res, file, fileList) {
      // console.log(res, file, fileList, 'res, file, fileList');
      let item = file.response.data[0];
      this.addFileIdList.push(item);
    },
    handleUploadRemove(file, fileList) {
      // console.log(file, fileList, 'file, fileList');
      if (file.response) {
        let _item = file.response.data[0];
        this.addFileIdList.splice(this.addFileIdList.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        this.addFileIdList.splice(this.addFileIdList.findIndex(item => item === _item), 1);
      }
    },
    submitAddList(params) {
      let obj = Object.assign(this.dynamicInfo.dynamicInfo, { operateType: params });
      this.postAddExhibitors({ dynamicInfo: obj }).then(res => {
        this.$message.success('发布成功');
        this.$router.push({ path: '/dynamicList' });
      }).catch(e => {
        this.$message.error('发布失败');
      });
    }
  },
  filters: {

  },
  created() {

  }
};
</script>
<style lang='less' scoped>
.page-contain{
  .hint {
    height: 50px;
    // margin: 30px 0px;
    margin-bottom: 10px;
    background: #f2f2f2;
    line-height: 50px;
    padding-left: 20px;
    color: rgb(0, 140, 255);
  }
}
</style>
