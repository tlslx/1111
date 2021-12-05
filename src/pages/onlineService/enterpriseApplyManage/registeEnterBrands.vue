/**
 * @file 企业品牌登记
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业品牌登记" name="first" v-loading="loading">
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
        @to-boost="toBoost">
      </cust-table>
      <div class="add-brand-info">
        <el-form label-width="170px" :inline="true" :rules="rules" ref="brandInfo" :model="brandForm">
          <el-form-item label="品牌名称（中文）：" prop="brandNameCh">
            <el-input v-model="brandForm.brandNameCh" placeholder="请填写品牌中文名称" clearable maxlength="64"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称（英文）：" prop="brandNameEn">
            <el-input v-model="brandForm.brandNameEn" placeholder="请填写品牌英文名称" clearable maxlength="64"></el-input>
          </el-form-item>
          <el-form-item label="是否自有品牌：" prop="ownBrandStatus">
            <el-select v-model="brandForm.ownBrandStatus" placeholder="请选择是否自有品牌" clearable>
              <el-option v-for="item in yesOrNo" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否使用该品牌出口：" prop="useBrandStatus">
            <el-select v-model="brandForm.useBrandStatus" placeholder="请选择是否使用该品牌出口" clearable>
              <el-option v-for="item in yesOrNo" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 880px;" label="商标logo：" prop="brandLogo">
            <el-upload
              class="upload-brand-info"
              ref="brandUpload"
              :action="uploadUrl + ''"
              list-type="picture"
              accept="image/gif, image/jpeg, image/png"
              :on-preview="handlePreview"
              :on-remove="handleBrandRemove"
              :before-remove="beforeRemove"
              :on-success="logoUploadSuccessfully"
              :on-error="logoUploadFailed"
              :on-exceed="handleExceed"
              :before-upload="handleBeforeUpload"
              :file-list="fileList"
              :limit="imgLimit">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
            <span style="float: right;font-size: 12px;">- 格式：JPG, JPEG, PNG, GIF<br/>- 大小：不超过500kb<br/>- 建议图片长宽为150像素左右，以达到最佳显示效果</span>
            <el-dialog :visible.sync="brandLogoInfo.dialogVisible" title="图片预览">
              <img width="100%" :src="brandLogoInfo.dialogImageUrl" alt="企业LOGO">
            </el-dialog>
          </el-form-item>
        </el-form>
        <div class="brand-btn-info">
          <el-button type="primary" @click="submitForm('brandInfo')">提交</el-button>
          <el-button @click="reback">返回</el-button>
        </div>
      </div>
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img :src="imgSrc" width="100%">
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import custTable from "@/components/project/onlineService/common/custTable.vue";
export default {
  components: {
    "cust-table": custTable
  },
  data() {
    let checkContainCne = (rule, value, callback) => {
      let errors = [];
      let regOnlyEnglish = this.$store.state.common.CHECK_CONST_DATA.onlyBlank;
      if (regOnlyEnglish.test(value)) {
        errors.push(new Error("不允许只输入空格"));
      }
      callback(errors);
    };
    return {
      // 是否是格式正确的图片
      isJPG: true,
      // 图片大小是否符合规范
      isLt500Kb: true,
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addBrandFile',
      // 图片上传文件数最大限制
      imgLimit: 1,
      // 保存图片预览集合
      fileList: [],
      // 商标logo
      brandLogoInfo: {
        // 预览图片窗口图片地址
        dialogImageUrl: '',
        // 预览图片窗口默认隐藏
        dialogVisible: false
      },
      brandDisabled: false,
      activeName: 'first',
      loading: false,
      dialogVisible: false,
      yesOrNo: [
        {
          text: '否',
          value: '0'
        },
        {
          text: '是',
          value: '1'
        }
      ],
      imgSrc: "",
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [],
            "description": ""
          }
        ]
      },
      delParams: {
        "companyBrandId": "",
        "brandLogo": ""
      },
      brandForm: {
        companyId: this.$store.state.userInfo.companyId,
        brandNameCh: "",
        brandNameEn: "",
        ownBrandStatus: "",
        useBrandStatus: "",
        brandLogo: ""
      },
      cols: [
        {
          "prop": "sequence",
          "label": "序号"
        },
        {
          "prop": "brandNameCh",
          "label": "品牌中文名称"
        },
        {
          "prop": "brandNameEn",
          "label": "品牌英文名称"
        },
        {
          "prop": "ownBrandStatus",
          "label": "是否自有品牌"
        },
        {
          "prop": "useBrandStatus",
          "label": "是否使用该品牌出口"
        },
        {
          "prop": "brandLogo",
          "label": "商标logo",
          type: "img"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              prop: "del",
              label: "删除",
              style: "cursor: pointer;text-decoration: underline;color: red;"
            }
          ]
        }
      ],
      tableData: {
        data: []
      },
      rules: {
        brandNameCh: [
          { required: true, message: '请输入品牌名称（中文）', trigger: 'blur' },
          { validator: checkContainCne, trigger: 'blur' }
        ],
        brandNameEn: [
          { required: true, validator: this.checkBrandNameEn, trigger: 'blur' }
        ],
        ownBrandStatus: [
          { required: true, message: '请选择是否自有品牌', trigger: 'change' }
        ],
        useBrandStatus: [
          { required: true, message: '请选择是否使用该品牌出口', trigger: 'change' }
        ],
        brandLogo: [
          { required: true, message: '请上传商标logo', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    // 是/否状态
    this.searchParams.customQueryParams.forEach((value) => {
      value.values.push(this.$store.state.userInfo.companyId);
    });
    this.loading = true;
    this.getBrandByCompanyID(this.searchParams).then(res => {
      this.loading = false;
    }).catch(e => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getBrands'])
  },
  methods: {
    ...mapActions('corpDataManagement', ['getBrandByCompanyID', 'deleteBrands', 'addBrands']),
    ...mapActions('file', ['delFileInfo']),
    handleClick(tab, event) {},
    handleChange(val) {},
    // 校验品牌中文名称
    checkBrandNameCh(rule, value, callback) {
      let errors = [];
      if (value === '') {
        errors.push(new Error("请输入品牌中文名称"));
      }
      callback(errors);
    },
    // 校验品牌英文名称
    checkBrandNameEn(rule, value, callback) {
      let errors = [];
      // let notChinese = this.$store.state.common.CHECK_CONST_DATA.notChinese;
      let notChinese = this.$store.state.common.CHECK_CONST_DATA.notChAndNotStartByBlank;
      if (value === '') {
        errors.push(new Error("请输入品牌名称（英文）"));
      } else if (!notChinese.test(value)) {
        errors.push(new Error("不允许输入汉字，首位不可为空格"));
      }
      callback(errors);
    },
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addBrands(this.brandForm).then(res => {
            this.loading = false;
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.$refs[formName].resetFields();
            this.$refs['brandUpload'].clearFiles();
            this.getBrandByCompanyID(this.searchParams);
          }).catch(e => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            });
          });
        } else {
          this.loading = false;
          this.$message({
            showClose: true,
            message: '验证信息未通过',
            type: 'error'
          });
        }
      });
    },
    // 操作
    dealWithOperate(scope) {
      this.delParams.companyBrandId = scope.row.companyBrandId;
      this.delParams.brandLogo = scope.row.brandLogo;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数据
        this.deleteBrands(this.delParams).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getBrandByCompanyID(this.searchParams);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击查看大图
    toBoost(scope) {
      this.imgSrc = scope.row.imageUrl;
      this.dialogVisible = true;
    },
    // 上传前回调
    handleBeforeUpload(file) {
      this.isJPG = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
      this.isLt500Kb = file.size / 1024 < 500;
      if (!this.isJPG) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG/GIF 格式!');
      }
      if (!this.isLt500Kb) {
        this.$message.error('上传头像图片大小不能超过 500kb!');
      }
      return this.isJPG && this.isLt500Kb;
    },
    // logo-上传成功的回调
    logoUploadSuccessfully(response, file, fileList) {
      this.brandForm.brandLogo = response.data.fileId;
    },
    // logo-上传失败的回调
    logoUploadFailed(err, file, fileList) {

    },
    // 删除前回调
    beforeRemove(file, fileList) {
      if (this.isJPG && this.isLt500Kb) {
        return this.$confirm('确定移除' + file.name + '？');
      }
    },
    // 删除回调
    handleBrandRemove(file, fileList) {
      if (this.isJPG && this.isLt500Kb) {
        this.brandForm.brandLogo = '';
        this.deleteFile(file);
      }
    },
    // 删除文件
    deleteFile(file) {
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
    // 文件预览
    handlePreview(file) {
      this.brandLogoInfo.dialogImageUrl = file.url;
      this.brandLogoInfo.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.error('只能上传一张图片!');
    },
    // 返回
    reback() {
      this.$router.push({
        path: '/basEntInf',
        query: {
          type: 'comBraPatInf'
        }
      });
    }
  },
  watch: {
    // 监听表格数据
    getBrands(newVal) {
      this.tableData.data = JSON.parse(JSON.stringify(newVal));
    }
  }
};

</script>
<style scoped>
.add-brand-info {
  position: relative;
  left: 50%;
  margin-left: -440px;
  padding-top: 20px;
  width: 880px;
}
.el-form-item {
  margin-bottom: 20px;
  width: 420px;
}
.brand-btn-info {
  text-align: center;
}
</style>


