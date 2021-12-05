<template>
  <el-tabs v-model="activeName">
      <el-tab-pane label="申请展位数量调整" name="first">
        <el-form :model="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item style="margin:30px 0px 12px 0px" label="展位性质：" prop="boothNature">
           <!-- <el-select v-model="ruleForm.boothNature" disabled>
              <el-option label="一般性展位" value="一般性展位"></el-option>
             <el-option label="品牌展位" value="一般性展位"></el-option> -->
             <!-- </el-select> -->
            <el-input v-model="ruleForm.boothNature" disabled placeholder="一般性展位"></el-input>
          </el-form-item>
          <el-form-item label="展区：" class='martoped' prop="exhibitionArea" style="position: relative;">
            <el-select v-model="ruleForm.exhibitionArea" disabled>
              <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class='martoped' label="现推荐数量：" prop="recommendedQuantity">
            <el-input v-model="ruleForm.recommendedQuantity" disabled  maxlength="10"></el-input>
          </el-form-item>
          <el-form-item class='martoped' label="调整后数量：" prop="adjustNum">
            <el-input-number v-model="ruleForm.adjustNum" disabled :max='1000' :min="1">
            </el-input-number>
          </el-form-item>
          <el-form-item class='martoped' label="调整原因：" prop="adjustReason" v-if="isShow">
            <el-select v-model="ruleForm.adjustReason" disabled>
              <el-option label="企业申请退回特装展位" value="1"></el-option>
              <el-option label="替换退出特装企业" value="2"></el-option>
              <el-option label="交易团调整安排方案" value="3"></el-option>
              <el-option label="展区展位数量变化引起的调整" value="4"></el-option>
            </el-select>
            <!-- <el-input :rows="4" type="textarea" maxlength="120" v-model="ruleForm.adjustReason"></el-input> -->
          </el-form-item>
          <el-form-item class='martoped' label="布展类型：" prop="boothType">
            <el-select v-model="ruleForm.boothType" disabled>
              <el-option label="特装" value="SPECIAL_BOOTH"></el-option>
              <el-option label="标摊" value="STANDARD_BOOTH"></el-option>
              <el-option label="中央通道" value="CENTER_CHANNEL_BOOTH"></el-option>
              <el-option label="统一布展" value="UNIFICATION_BOOTH"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class='martoped' label="打印上传：" prop="printUpload">
            <el-button type="primary" disabled>打印</el-button>
            <el-upload class="upload-demo" disabled  :action='action'
               :limit="1"
              :file-list="fileList">
              <el-button type="primary" disabled>上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="el-form-item-btn martoped">
            <el-button class="submitbtn" v-if='false'>提交</el-button>
            <el-button class="submitbtn" @click="resetForm">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
  </el-tabs>
</template>
<script>
      import { mapGetters, mapActions } from 'vuex';
      export default {
        data() {
          return {
            isData: {
              companyId: this.id
            },
            action: process.env.API_OS_URL + '/efOS/file/addFile',
            fileList: [],
            delegationId: '',
            isShow: false,
            exhibitionAreaOpts: [],
            activeName: 'first',
            exhibitionAreaName: '',
            // material: {},
            id: '',
            addDat: [],
            urlName: '',
            ruleForm: {
              boothNature: "一般性展位",
              exhibitionArea: '',
              recommendedQuantity: '',
              adjustNum: 1,
              adjustReason: '',
              boothNo: '',
              boothType: ''
            }
            // rules: {
            //   exhibitionArea: [{ required: true, message: "请选择", trigger: "change" }],
            //   adjustNum: [{ required: true, message: "调整数量不能为空", trigger: "blur" }],
            //   boothNo: [{ required: true, message: "请输入", trigger: "blur" }],
            //   boothType: [{ required: true, message: "请选择", trigger: "blur" }]
            // }
          };
        },
        created() {
          this.exhibitionAreaOpts = this.osDictionaryData.exhibitionAreaOpts;
          this.addDat = this.$router.history.current.query.val;
          if (this.addDat.exhibitionType === 'SPECIAL_BOOTH') {
            this.isShow = true;
          } else {
            this.isShow = false;
          }
          this.ruleForm = this.$router.history.current.query.val;
          this.ruleForm.exhibitionArea = this.addDat.exhibitionArea;
          this.ruleForm.recommendedQuantity = this.addDat.originalRecommend;
          this.ruleForm.adjustNum = this.addDat.adjustedNumber;
          this.ruleForm.boothType = this.addDat.exhibitionType;
          this.ruleForm.adjustReason = this.addDat.adjustReason;
          let fileed = {
            fileId: this.addDat.material
          };
          this.selectFileInfo(fileed).then(addted => {
            let objed = {
              name: addted.fileName
            };
            this.fileList.push(objed);
          }).catch();
        },
        computed: {
          ...mapGetters("dictionary", ["osDictionaryData"])
        },
        methods: {
          ...mapActions('boothAdjustApply', ['postRecommended', 'postNewlyAddedBooths']),
          ...mapActions('file', ['addFileInfo', 'delFileInfo', 'selectFileInfo']),
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
</style>
