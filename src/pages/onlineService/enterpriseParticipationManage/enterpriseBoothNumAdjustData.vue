<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="申请展位数量调整" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="展位性质：" prop="boothNature">
          <el-input v-model="ruleForm.boothNature" disabled placeholder="一般性展位" ></el-input>
        </el-form-item>
        <el-form-item
          label="展区："
          class="martoped"
          prop="exhibitionArea"
          style="position: relative;"
        >
          <el-select v-model="ruleForm.exhibitionArea" @change="hanesExhibition" :disabled="isDisAbeled">
            <el-option
              v-for="(item, key) in exhibitionAreaOpts"
              :key="key"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="martoped" label="展位号：" prop="boothNo" >
          <el-input v-model="ruleForm.boothNo"  maxlength="10" :disabled="isDisAbeled"></el-input>
        </el-form-item>
        <el-form-item class="martoped" label="原推荐数量：" prop="recommendedQuantity" >
          <el-input v-model="ruleForm.recommendedQuantity" disabled maxlength="10"></el-input>
        </el-form-item>
        <el-form-item class="martoped" label="调整后数量：" prop="adjustNum" >
          <el-input-number
            :disabled="isDisAbeled"
            v-model.number="ruleForm.adjustNum"
            :step="1"
            :max="1000"
            @change="handleChange"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <!-- <el-form-item class='martoped' label="展位号：" prop="boothNo">
          <el-input maxlength="10" v-model="ruleForm.boothNo"></el-input>
        </el-form-item>-->
        <el-form-item class="martoped" label="现布展类型：" prop="nowBoothType" >
          <el-select v-model="ruleForm.nowBoothType" @change="hanesChange" :disabled="isDisAbeled">
            <el-option label="特装" value="SPECIAL_BOOTH"></el-option>
            <el-option label="中央通道" value="CENTER_CHANNEL_BOOTH"></el-option>
            <el-option label="标摊" value="STANDARD_BOOTH"></el-option>
            <el-option label="统一布展" value="UNIFICATION_BOOTH"></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.finalBoothType" placeholder="标摊"></el-input> -->
        </el-form-item>
        <el-form-item class="martoped" label="调整原因：" prop="adjustReason" v-if="isShow" >
          <el-select v-model="ruleForm.adjustReason" :disabled="isDisAbeled">
            <el-option label="企业申请退回特装展位" value="1"></el-option>
            <el-option label="替换退出特装企业" value="2"></el-option>
            <el-option label="交易团调整安排方案" value="3"></el-option>
            <el-option label="展区展位数量变化引起的调整" value="4"></el-option>
          </el-select>
          <!-- <el-input :rows="4" type="textarea" maxlength="120" v-model="ruleForm.adjustReason"></el-input> -->
        </el-form-item>
        <el-form-item class="martoped" label="调整后布展类型：" prop="finalBoothType" >
          <el-select v-model="ruleForm.finalBoothType" @change="hanesChange" :disabled="isDisAbeled">
            <el-option label="特装" value="SPECIAL_BOOTH"></el-option>
            <el-option label="中央通道" value="CENTER_CHANNEL_BOOTH"></el-option>
            <el-option label="标摊" value="STANDARD_BOOTH"></el-option>
            <el-option label="统一布展" value="UNIFICATION_BOOTH"></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.finalBoothType" placeholder="标摊"></el-input> -->
        </el-form-item>
        <el-form-item class="martoped mimeograph" label="打印上传：" prop="uploadFile" >
          <el-button type="primary" @click="handeStamp" style="float: left; margin-right: 30px;">打印</el-button>
          <el-upload
            :disabled="isDisAbeled"
            class="upload-demo"
            :on-preview="handlePreview"
            :on-change="handleFileChange"
            :action="action"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-success="uploadSuccessfully"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button type="primary" class="mimeograph" v-show="!isDisAbeled">上传</el-button>
          </el-upload>
          <!-- <el-button size="small"  @click='uploading' type="primary">点击上传</el-button> -->
          <!-- {{ fileList }} -->
        </el-form-item>
        <el-form-item class="el-form-item-btn martoped">
          <el-button class="submitbtn mimeograph" @click="submitForm(ruleForm)" v-show="!isDisAbeled">提交</el-button>
          <el-button class="resetbtn mimeograph" @click="resetForm(ruleForm)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    var needFile = (rule, value, callback) => {
      if (this.fileList.length === 0) {
        return callback(new Error('请选择附件'));
      } else {
        return callback();
      }
    };
    return {
      isData: {
        companyId: this.id
        // exhibitionType: ''
      },
      action: process.env.API_OS_URL + "/efOS/file/addFile",
      fileList: [],
      delegationId: "",
      isShow: false,
      exhibitionAreaOpts: [],
      activeName: "first",
      exhibitionAreaName: "",
      isDisAbeled: false,
      // material: {},
      id: "",
      adjustId: "",
      addDat: [],
      isDataised: {
        // exhibitionType: ''
      },
      urlName: "",
      ruleForm: {
        boothNature: "一般性展位",
        exhibitionArea: "",
        recommendedQuantity: "",
        adjustNum: "",
        adjustReason: "",
        boothNo: "",
        nowBoothType: "",
        finalBoothType: ""
      },
      rules: {
        exhibitionArea: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        adjustNum: [
          { required: true, message: "调整数量不能为空", trigger: "blur" }
        ],
        finalBoothType: [{ required: true, message: "请选择", trigger: "change" }],
        uploadFile: [{ required: true, validator: needFile, trigger: "change" }],
        adjustReason: [{ required: true, message: "请选择", trigger: "change" }],
        boothNo: [{ required: true, message: "请输入", trigger: "blur" }],
        nowBoothType: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  async beforeCreate() {
    this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 字典数据--展区
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.exhibitionAreaOpts.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.exhibitionAreaOpts.splice(deleteIndex, 1);
      }
    });
  },
  created() {
    // this.exhibitionAreaOpts = this.osDictionaryData.exhibitionAreaOpts;
    this.id = this.$router.history.current.query.id;
    this.delegationId = this.$router.history.current.query.delegationId;
    if (this.$router.history.current.query.dataIs === "修改") {
      this.addDat = this.$router.history.current.query.val;
      this.adjustId = this.addDat.adjustId;
      if (this.addDat.exhibitionType === "SPECIAL_BOOTH") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      for (let cidian in this.exhibitionAreaOpts) {
        if (
          this.exhibitionAreaOpts[cidian].value === this.addDat.exhibitionArea
        ) {
          this.exhibitionAreaName = this.exhibitionAreaOpts[cidian].label;
        }
      }
      this.id = this.addDat.companyId;
      (this.delegationId = this.addDat.delegationId),
        (this.ruleForm.exhibitionArea = this.addDat.exhibitionArea);
      this.ruleForm.recommendedQuantity = this.addDat.originalRecommend;
      this.ruleForm.adjustNum = this.addDat.adjustedNumber;
      if (this.addDat.exhibitionType === "特装") {
        this.ruleForm.finalBoothType = "SPECIAL_BOOTH";
      } else if (this.addDat.exhibitionType === "标摊") {
        this.ruleForm.finalBoothType = "STANDARD_BOOTH";
      } else if (this.addDat.exhibitionType === "中央通道") {
        this.ruleForm.finalBoothType = "CENTER_CHANNEL_BOOTH";
      } else {
        this.ruleForm.finalBoothType = "UNIFICATION_BOOTH";
      }
      this.ruleForm.adjustReason = this.addDat.adjustReason;
      this.urlName = this.addDat.material;
      let fileed = {
        fileId: this.addDat.material
      };
      if (fileed.fileId) {
        this.selectFileInfo(fileed)
          .then(addted => {
            let objed = {
              name: addted.fileName
            };
            this.fileList.push(objed);
          })
          .catch();
      }
    } else if (this.$router.history.current.query.dataIs === "查看") {
      this.isDisAbeled = true;
      this.addDat = this.$router.history.current.query.val;
      this.adjustId = this.addDat.adjustId;
      if (this.addDat.exhibitionType === "SPECIAL_BOOTH") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      for (let cidian in this.exhibitionAreaOpts) {
        if (
          this.exhibitionAreaOpts[cidian].value === this.addDat.exhibitionArea
        ) {
          this.exhibitionAreaName = this.exhibitionAreaOpts[cidian].label;
        }
      }
      this.id = this.addDat.companyId;
      (this.delegationId = this.addDat.delegationId),
        (this.ruleForm.exhibitionArea = this.addDat.exhibitionArea);
      this.ruleForm.recommendedQuantity = this.addDat.originalRecommend;
      this.ruleForm.adjustNum = this.addDat.adjustedNumber;
      if (this.addDat.exhibitionType === "特装") {
        this.ruleForm.finalBoothType = "SPECIAL_BOOTH";
      } else if (this.addDat.exhibitionType === "标摊") {
        this.ruleForm.finalBoothType = "STANDARD_BOOTH";
      } else if (this.addDat.exhibitionType === "中央通道") {
        this.ruleForm.finalBoothType = "CENTER_CHANNEL_BOOTH";
      } else {
        this.ruleForm.finalBoothType = "UNIFICATION_BOOTH";
      }
      this.ruleForm.adjustReason = this.addDat.adjustReason;
      this.urlName = this.addDat.material;
      let fileed = {
        fileId: this.addDat.material
      };
      if (fileed) {
        this.selectFileInfo(fileed)
          .then(addted => {
            let objed = {
              name: addted.fileName
            };
            this.fileList.push(objed);
          })
          .catch();
      }
    }
  },
  computed: {
    ...mapGetters("dictionary", ["osDictionaryData"])
  },
  methods: {
    ...mapActions("boothAdjustApply", [
      "postRecommended",
      "postNewlyAddedBooths",
      "postNewModification"
    ]),
    ...mapActions("file", ["addFileInfo", "delFileInfo", "selectFileInfo"]),
    // 提交
    submitForm(dataVal) {
      let objedwsd = {
        companyId: this.id,
        delegationId: this.delegationId,
        exhibitionArea: this.ruleForm.exhibitionArea,
        exhibitionType: this.ruleForm.finalBoothType,
        adjustReason: this.ruleForm.adjustReason,
        exhibitionAreaName: this.exhibitionAreaName,
        originalRecommend: this.ruleForm.recommendedQuantity,
        adjustedNumber: this.ruleForm.adjustNum,
        material: this.urlName,
        originator: "1"
      };
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.$router.history.current.query.dataIs === "修改") {
            objedwsd.adjustId = this.adjustId;
            this.postNewModification(objedwsd)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              })
              .catch(e => {});
          } else {
            this.postNewlyAddedBooths(objedwsd)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              })
              .catch(e => {});
          }
        }
      });
    },
    // 打印
    handeStamp() {
      window.print();
    },
    // 文件改变
    handleFileChange(file) {
      this.fileList = [];
      let list = [];
      list.push(file);
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        if (arr.indexOf(list[i].uid) === -1) {
          arr.push(list[i].uid);
          this.fileList.push(list[i]);
        }
      }
    },
    // 上传成功的文件
    uploadSuccessfully(response, file, fileList) {
      this.urlName = response.data.fileId;
    },
    handlePreview() {},
    // 删除文件方法
    handleRemove(file, fileList) {
      this.fileList = [];
      this.delFileInfo(this.urlName)
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: "error"
          });
        });
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 改变展区
    hanesExhibition(value) {
      if (value) {
        this.isData.exhibitionArea = value;
      }
      this.isData.exhibitionType = this.isDataised.exhibitionType;
      // console.log(this.isData, 'this.isData');
      if (this.isData.exhibitionArea && this.isData.exhibitionType) {
        this.postRecommended(this.isData)
          .then(res => {
            this.ruleForm.recommendedQuantity = res.originalRecommend;
          })
          .catch(e => {});
      }
      for (let zidian in this.exhibitionAreaOpts) {
        if (this.exhibitionAreaOpts[zidian].value === value) {
          this.exhibitionAreaName = this.exhibitionAreaOpts[zidian].label;
        }
      }
    },
    // 改变布展类型
    hanesChange(val) {
      if (val === "SPECIAL_BOOTH") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      // this.isDataised = {};
      this.isDataised.exhibitionType = val;
      // console.log(this.isDataised, 'this.isDataised');
      this.hanesExhibition();
    },
    handleChange(val) {},
    // 取消
    resetForm() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.martoped {
  margin-top: 20px;
}

.el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
}

.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.mimeograph_dy {
    display: none;
    float: left;
    margin-right: 30px;
  }
.submitbtn {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}

.resetbtn {
  background-color: white;
  width: 120px;
  height: 40px;
}

@media print {
  .mimeograph {
    display: none;
  }


  .edit-text {
    display: none;
  }

  .noprint {
    display: none;
  }
}

@page {
  margin: 0;
}
</style>
