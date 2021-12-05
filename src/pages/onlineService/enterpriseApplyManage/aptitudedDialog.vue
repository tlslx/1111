<style scoped>
.btn_bar {
  padding: 10px;
  text-align: center;
}
.el-input__inner {
  width: 100%;
}
.el-form-item {
  margin-bottom: 20px;
}
.viewPic {
  width: 100px;
  height: 70px;
  margin-top: 10px;
}
</style>
<template>
  <div>
    <el-dialog :title="title" :visible.sync="aptitudedData.dialogFormVisible">
      <el-row :gutter="24">
        <el-form :model="formData" ref="roleForm">
          <!-- <template v-for="(item, index) in aptitudedData.formData"> -->
          <div v-for="(item, index) in aptitudedData.formData" :key="index">
            <el-col :span="12">
              <!-- {{formData[item.prop]}} -->
              <!-- {{item.value}} -->
              <template v-if="item.type === 'string'">
                <el-form-item v-if="!item.isshow" :label="item.label" :prop="item.prop" :key="index" :rules="item.rules" label-width="100px">
                  <el-input v-model="formData[item.prop]" :disabled="item.isshow"></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.isshow" :label="item.label" :prop="item.prop" :key="index" :rules="item.rules" label-width="100px">
                  <el-input v-model="item.value" :disabled="item.isshow"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'select' && item.prop === 'aptitudeSource'">
                <el-form-item v-if="!item.isshow" :label="item.label" :prop="item.prop" :key="index" :rules="item.rules" label-width="100px">
                  <el-select v-model="formData[item.prop]" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in companyRelationshipOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="item.value" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in companyRelationshipOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'select' && item.prop === 'patentName'">
                <el-form-item v-if="!item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="formData[item.prop]" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in patentTypeOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="item.value" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in patentTypeOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'select' && item.prop === 'correlationCompanyName'">
                <el-form-item v-if="!item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="formData[item.prop]" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in dictionaryData.correlationCompanyName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="item.value" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in dictionaryData.correlationCompanyName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'select' && item.prop === 'authenticationCategory'">
                <el-form-item v-if="!item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="formData[item.prop]" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in internationalPassCertificationTypeOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.isshow" :label="item.label" :prop="item.prop" :key="index" label-width="100px" :rules="item.rules">
                  <el-select v-model="item.value" placeholder="请选择" :disabled="item.isshow">
                    <el-option v-for="item in internationalPassCertificationTypeOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'date'">
                <el-form-item :label="item.label" :key="index" label-width="100px" :prop="item.prop" :rules="item.rules">
                  <el-date-picker v-model="formData[item.prop]" type="daterange" v-bind:data-label="formData[item.prop]" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'indate'">
                <el-form-item v-if="!item.isshow" :label="item.label" :key="index" label-width="100px" :prop="item.prop" :rules="item.rules">
                  <el-date-picker v-model="formData[item.prop]" :default-value="defaultDate" type="date" @change="changeInDate(item)" value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item v-else :label="item.label" :key="index" label-width="100px" :prop="item.prop">
                  <el-date-picker v-model="item.value" :disabled="item.isshow" type="date" @change="changeInDate(item)" value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.dialogType === 'file'">
                <el-form-item label-width="100px" :label="item.label" :key="index" :prop="item.prop" :rules="item.rules" :ref="item.prop">
                  <el-upload class="upload-brand-info" :action="uploadUrl" v-bind:data-label="item.prop" :on-success="(resp , file, fileList) => uploadDlOperatorSuccessfully(resp , file, fileList, item.prop)" :on-remove="(file, fileList) => handleRemoveFile(file, fileList, item.prop)" :on-exceed="handleExceed" :file-list="dlOperator[item.prop]" :limit="imgLimit">
                    <el-button v-show="item.isBntShow" size="small" type="primary">上传</el-button>
                  </el-upload>
                  <!-- <img :src="imageUrl" class="viewPic" v-show="item.isAdd"> -->
                  <!-- <el-dialog :visible.sync="brandLogoInfo.dialogVisible" title="图片预览">
                      <img width="100%" :src="brandLogoInfo.dialogImageUrl" alt="公司LOGO">
                    </el-dialog> -->
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'img' ">
                <el-form-item :label="item.label" :key="index" :prop="item.prop" label-width="100px" :rules="item.rules">
                  <el-upload class="upload-brand-info" ref="brandUpload" :action="uploadUrl + ''" v-bind:data-label="item.prop" list-type="picture" :on-preview="handlePreview" :on-success="(resp) => uploadSuccessfully(resp, item.prop)" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :file-list="fileList" :limit="imgLimit">
                    <el-button v-show="item.isBntShow" size="small" type="primary">上传</el-button>
                  </el-upload>
                  <img :src="formData[item.prop]" class="viewPic" v-show="item.isAdd">
                  <el-dialog :visible.sync="brandLogoInfo.dialogVisible" title="图片预览">
                    <img width="100%" :src="brandLogoInfo.dialogImageUrl" alt="公司LOGO">
                  </el-dialog>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'img' && item.isContain === true">
                <el-form-item :label="item.label" :key="index" :prop="item.prop" label-width="100px" :rules="item.rules">
                  <el-upload class="upload-brand-info" ref="brandUpload" :action="uploadUrl + ''" list-type="picture" :on-preview="handlePreview" :on-success="(resp) => uploadSuccessfully(resp, item.prop)" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :file-list="fileList" :limit="imgLimit">
                    <el-button v-show="item.isBntShow" size="small" type="primary">上传</el-button>
                  </el-upload>
                  <img :src="formData[item.prop]" class="viewPic" v-show="item.isAddT">
                  <el-dialog :visible.sync="brandLogoInfo.dialogVisible" title="图片预览">
                    <img width="100%" :src="brandLogoInfo.dialogImageUrl" alt="公司LOGO">
                  </el-dialog>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="12">
              <template v-if="item.type === 'btn'">
                <el-form-item :label="item.label" :key="index" prop="contentFile" label-width="100px">
                  <el-upload class="upload-brand-info" ref="brandUpload" :action="uploadUrl + ''" :on-preview="handlePreview" :on-success="uploadSuccessfully" :on-exceed="handleExceed" :before-upload="handleBefore" :file-list="fileList" :limit="imgLimit">
                    <el-button size="small" type="primary" v-show="item.isBntShow">上传</el-button>
                  </el-upload>
                </el-form-item>
              </template>
            </el-col>
          </div>
          <!-- </template> -->
        </el-form>
      </el-row>
      <div class="btn_bar">
        <el-button type="primary" @click="makeSure" v-show="btnShow">保存</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </div>
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img :src="imgSrc" width="100%">
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { $date } from "@/scripts/project/utils";
export default {
  name: "aptitudedInfo",
  props: ['aptitudedData', 'detailInfo', 'btnShow', 'title', "aptitudedRules"],
  data() {
    return {
      // 设置默认时间系统当前时间
      defaultDate: $date.format(new Date(), 'yyyy-MM-dd'),
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile',
      aptitudeKindOption: [],
      companyRelationshipOption: [],
      patentTypeOption: [],
      internationalPassCertificationTypeOption: [],
      fileList: [],
      dlOperator: {},
      imgLimit: 1,
      imageUrl: "",
      imageUrlT: "",
      fileId: this.aptitudedData.formData.idO,
      fileIdT: this.aptitudedData.formData.idT,
      newdate: '',
      newIndate: '',
      paramObject: {},
      rules: {},
      // 商标logo
      brandLogoInfo: {
        // 预览图片窗口图片地址
        dialogImageUrl: '',
        // 预览图片窗口默认隐藏
        dialogVisible: false
      },
      dialogVisible: false,
      imgSrc: "",
      formData: {}
    };
  },
  computed: {
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  async created() {
    this.aptitudeKindOption = await this.kindo.dictionary.get('aptitudeKind');
    this.companyRelationshipOption = await this.kindo.dictionary.get('companyRelationship');
    this.patentTypeOption = await this.kindo.dictionary.get('patentType');
    this.internationalPassCertificationTypeOption = await this.kindo.dictionary.get('internationalPassCertificationType');
  },
  mounted() {
    this.setData();

  },
  methods: {
    // 设置data变量
    setData() {
      let _this = this;
      (this.aptitudedData.formData).forEach(element => {
        if (element.btnType === 'edit') {
          for (let key in element) {
            if (element.prop === key) {
              if (element.dialogType === 'file' && element[key]) {
                const fileId = element[key].split('=')[1];
                _this.$set(_this.formData, element.prop, fileId);
                if (element.label.includes("证书") || element.prop.toLowerCase().includes('fileid')) {
                  _this.dlOperator[element.prop] = [{ name: element['fileNameCertificate'], uid: fileId, url: element[key] }];
                } else {
                  _this.dlOperator[element.prop] = [{ name: element['fileNameRelationship'], uid: fileId, url: element[key] }];
                }
              } else {
                _this.$set(_this.formData, element.prop, element[key]);
              }
            }
          }
        } else if (element.btnType !== 'edit') {
          _this.$set(_this.formData, element.prop, "");
        }
      });
    },
    makeSure() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          this.$emit('change-dialog-show', {
            show: false,
            makeSure: true,
            // fileIdS: this.fileId,
            // fileIdT: this.fileIdT,
            // fileId: this.fileId,
            // newIndate: this.newIndate,
            paramObject: this.formData

            // newdate: this.newdate
          });
        } else {
          this.$message({
            message: '输入有误',
            type: 'error'
          });
          return false;
        }
      });
    },
    cancel() {
      this.fileList = [];
      this.$emit('cancel_dialog-show', {
        show: false,
        makeSure: false
      });
    },
    // 文件预览
    handlePreview(file) {
      this.brandLogoInfo.dialogImageUrl = file.url;
      this.brandLogoInfo.dialogVisible = true;
    },
    // 上传类型设置
    handleBeforeUpload(file) {
      const fileTypeLimit = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf'];
      if (file.size > 3 * 1024 * 1024) {
        this.$message.error('上传文件大小不能超过 3MB!');
        return false;
      }
      if (!fileTypeLimit.includes(file.type)) {
        this.$message.error('上传文件只能为标准的 JPG/PNG/GIF/PDF 格式!');
        return false;
      }
      return true;
    },
    handleBefore(file) { },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    // 处理删除文件情况
    handleRemoveFile(file, fileList, prop) {
      this.formData[prop] = '';
    },
    // logo-上传成功的回调
    uploadSuccessfully(response, prop) {
      // 图片上传成功后清除图片校验
      if (this.$refs[prop]) {
        this.$refs[prop][0].clearValidate();
      }
      // 判断当前是不是新增弹出层
      for (let item in this.aptitudedData.formData) {
        this.aptitudedData.formData[item].isAdd = false;
      }
      let _this = this;
      // 赋值防止验证整个表单时该值仍然为空
      this.formData[prop] = response.data.fileId;
      _this.fileId = response.data.fileId;
    },
    uploadDlOperatorSuccessfully(resp, file, fileList, prop) {
      // 判断当前是不是新增弹出层
      for (let item in this.aptitudedData.formData) {
        this.aptitudedData.formData[item].isAdd = false;
      }
      // 赋值防止验证整个表单时该值仍然为空
      this.formData[prop] = resp.data.fileId;
      if (prop.toLowerCase().includes('certificate') || prop.toLowerCase().includes('fileid')) {
        this.formData['fileNameCertificate'] = file.name;
      } else {
        this.formData['fileNameRelationship'] = file.name;
      }
      this.dlOperator[prop] = [{ name: file.name, uid: resp.data.fileId }];
      this.$refs[prop].clearValidate();
    },
    Successfully(response, file, fileList) {
      // 判断当前是不是新增弹出层
      let _this = this;
      for (let item in this.aptitudedData.formData) {
        this.aptitudedData.formData[item].isAddT = false;
      }
      _this.fileIdT = response.data.fileId;
    },
    changeInDate(item) {
      this.newdate = item.value;
    },
    // 修改时间
    changeDate(item) {
      this.newIndate = item.value.join(',');
    }
  }
};
</script>

