<template>
  <div class="addForm" v-loading="addFormLoading">
    <el-form :model="addForm" label-position="right" label-width="220px" ref='addForm' :rules="addFormRules">
      <el-form-item label="操作类型：" prop="operateType">
        <el-radio-group v-model="addForm.operateType">
          <el-radio :label="3">申请办证</el-radio>
          <el-radio :label="6">换证</el-radio>
          <el-radio :label="9">人员信息录入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="企业名称：" prop="enterpriceCode">
        <el-select v-model="addForm.enterpriceCode" placeholder="" class="inputWidth">
          <el-option v-for="item in enterpriceCodes" :key="item.key" :label="item.label" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" prop="userName">
        <el-input v-model="addForm.userName" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sexTypeCode">
        <el-radio-group v-model="addForm.sexTypeCode">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="证件类型：" prop="idcardTypeCode">
        <el-select v-model="addForm.idcardTypeCode" placeholder="" class="inputWidth" @change="handleChangeIdcardType">
          <el-option v-for="item in idcardTypeCodes" :key="item.id" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码：" prop="idcardNo">
        <el-input v-model="addForm.idcardNo" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="手机：" prop="cellPhone">
        <el-input v-model="addForm.cellPhone" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="E-Mail：" prop="email">
        <el-input v-model="addForm.email" class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="头像照片：" prop="badgePhotoUrl">
        <!-- {{'badgePhotoUrl:'+addForm.badgePhotoUrl}} -->
        <!-- <el-upload class="avatar-uploader" ref="badgePhotoUrl" :show-file-list="false" :action="api.uploadFile" :on-success="handleBadgeSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
          <img v-if="addForm.badgePhotoUrl" :src="api.getFile+addForm.badgePhotoUrl" class="avatar">
        </el-upload> -->
        <div class="cropperWrapper">
          <div class="btnBox">
            <label for="busiCardFileIdUpLoad" :class="kindo.config.theme==='red'? 'btn red':'btn blue'">点击上传照片</label>
            <input type="file" id='busiCardFileIdUpLoad' style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event,'busiCardFileId')">
          </div>
          <div class="imgBox">
            <img v-if="addForm.badgePhotoUrl" :src="addForm.badgePhotoShowUrl" class="avatar">
          </div>
        </div>
      </el-form-item>
      <el-form-item label="身份证照片(正面)：" prop="idcardFrontPhotoUrl">
        <el-upload class="avatar-uploader" ref="idcardFrontPhotoUrl" :show-file-list="false" :action="api.uploadFile" :on-success="handleIdCardFrontSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
          <img v-if="addForm.idcardFrontPhotoUrl" :src="api.getFile+addForm.idcardFrontPhotoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="身份证照片(反面)：" prop="idcardBackPhotoUrl">
        <el-upload class="avatar-uploader" ref="idcardBackPhotoUrl" :show-file-list="false" :action="api.uploadFile" :on-success="handleIdCardBackSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
          <img v-if="addForm.idcardBackPhotoUrl" :src="api.getFile+addForm.idcardBackPhotoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="工作证照片：" prop="busiCardFileId">
        <el-upload class="avatar-uploader" ref="busiCardFileId" :show-file-list="false" :action="api.uploadFile" :on-success="handleBusiCardFileIdSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="beforeUpload" accept="image/png,image/jpg,image/jpeg">
          <img v-if="addForm.busiCardFileId" :src="api.getFile+addForm.busiCardFileId" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="addForm.remark" class="inputWidth"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog title="照片裁剪" :visible.sync="imgCutDialog" append-to-body>
      <img-cut :imgUrl='imgCutUrl' ref="imgCut"></img-cut>
      <div slot="footer" class="dialog-footer">
        <el-button @click="imgCutDialog=false">关闭</el-button>
        <el-button type="primary" @click="comfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/scripts/framework/store';
import imgCut from './imgCutUtil';
export default {
  name: 'addForm',
  components: { imgCut },
  props: {
    enterpriceCodes: { type: Array, default: [] },
    idcardTypeCodes: { type: Array, default: [] },
    action: { type: String, default: 'add' }
  },
  data() {
    return {
      api: {
        uploadFile: kindo.config.api.upms + "/api/fs/save",
        getFile: kindo.config.api.comsUrl + "/api/fs/view/"
      },
      store,
      addForm: this.$attrs.data ? { ...this.$attrs.data } : {},
      imgCutUrl: '',
      addFormRules: {
        enterpriceCode: [
          { required: true, message: '请选择企业编码', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sexTypeCode: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        cellPhone: [
          { pattern: this.$store.state.common.CHECK_CONST_DATA.telephone, message: '请输入正确的手机号码', trigger: 'change' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱', trigger: 'change' }
        ],
        idcardTypeCode: [
          { required: true, message: '请选择身份证类型', trigger: 'change' }
        ],
        idcardNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入合法的证件号码', trigger: 'blur' }
        ],
        badgePhotoUrl: [
          { required: true, message: '请选择头像', trigger: 'blur' }
        ],
        idcardFrontPhotoUrl: [
          { required: true, message: '请选择身份证正面照片', trigger: 'blur' }
        ],
        idcardBackPhotoUrl: [
          { required: true, message: '请选择身份证反面照片', trigger: 'blur' }
        ],
        busiCardFileId: [
          { required: true, message: '请选择工作证照片', trigger: 'blur' }
        ]
      },
      option: {
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 150,
        autoCropHeight: 200,
        centerBox: false,
        high: true
      },
      imgCutDialog: false,
      addFormLoading: false
    };
  },
  methods: {
    uploadImg(e, ref) {
      console.log(e.target.files);
      console.log(ref);
      const file = e.target.files[0];
      const imgReg = /\.(jpg|jpeg|png|JPG|PNG)$/;
      if (!imgReg.test(e.target.value)) {
        this.$message.error('图片类型必须是.jpeg,jpg,png中的一种');
        return false;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        let url;
        if (typeof ev.target.result === 'object') {
          url = window.URL.createObjectURL(new Blob([ev.target.result]));
        } else {
          url = ev.target.result;
        }
        console.log(url);
        this.imgCutUrl = url;
        this.imgCutDialog = true;
      };
      reader.readAsArrayBuffer(file);
    },
    handleChangeIdcardType(value) {
      console.log(value);
      let reg = '';
      let message = '请输入合法的证件号码';
      switch (value) {
        case 'IDCARD':
          reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          break;
        case 'PASSPORT':
          // 护照
          // 规则： 14/15开头 + 7位数字, G + 8位数字, P + 7位数字, S/D + 7或8位数字,等
          // 样本： 141234567, G12345678, P1234567
          reg = /^([a-zA-z]|[0-9]){5,17}$/;
          message = '请输入合法的证件号码,格式如G12345678';
          break;
        case 'MTPFTR':
          // 台湾居民来往大陆通行证
          // 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
          // 样本： 12345678 或 1234567890B
          reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
          message = '请输入合法的证件号码,格式如1234567890B';
          break;
        default:
          reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
          break;
      }
      this.addFormRules.idcardNo = [
        { required: true, message: '请输入证件号码', trigger: 'blur' },
        { pattern: reg, message: message, trigger: 'blur' }
      ];
    },
    //头像
    handleBadgeSuccess(res, file) {
      if (res.flag === '1') {
        // this.imageUrl.badgePhotoUrl = URL.createObjectURL(file.raw);
        // this.$message.success(this.source.language.uploadSuccess);
        this.addForm.badgePhotoUrl = res.data.original ? res.data.original.fileId : "";
        this.$refs.badgePhotoUrl.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.badgePhotoUrl.clearFiles();
      }
    },
    //身份证正面
    handleIdCardFrontSuccess(res, file) {
      if (res.flag === '1') {
        // this.imageUrl.idcardFrontPhotoUrl = URL.createObjectURL(file.raw);
        // this.$message.success(this.source.language.uploadSuccess);
        this.addForm.idcardFrontPhotoUrl = res.data.original ? res.data.original.fileId : "";
        this.$refs.idcardFrontPhotoUrl.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.idcardFrontPhotoUrl.clearFiles();
      }
      this.addFormLoading = false;
    },
    //身份证反面
    handleIdCardBackSuccess(res, file) {
      if (res.flag === '1') {
        // this.imageUrl.idcardBackPhotoUrl = URL.createObjectURL(file.raw);
        // this.$message.success(this.source.language.uploadSuccess);
        this.addForm.idcardBackPhotoUrl = res.data.original ? res.data.original.fileId : "";
        this.$refs.idcardBackPhotoUrl.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.idcardBackPhotoUrl.clearFiles();
      }
      this.addFormLoading = false;
    },
    //工作证明照
    handleBusiCardFileIdSuccess(res, file) {
      if (res.flag === '1') {
        // this.imageUrl.busiCardFileId = URL.createObjectURL(file.raw);
        // this.$message.success(this.source.language.uploadSuccess);
        this.addForm.busiCardFileId = res.data.original ? res.data.original.fileId : "";
        this.$refs.busiCardFileId.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.busiCardFileId.clearFiles();
      }
      this.addFormLoading = false;
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if (isJPG && isLt2M) {
        this.addFormLoading = true;
      }
      return isJPG && isLt2M;
    },
    cut() {
      this.imgCutDialog = true;
    },
    comfirm() {
      this.addFormLoading = true;
      console.log(this.$refs.imgCut);
      this.$refs.imgCut.$refs.vueCropper.getCropBlob(data => {
        console.log(data);
        const formData = new FormData();
        formData.append('file', data);
        this.$http.postFormData(this.api.uploadFile, formData)
          .then(res => {
            console.log(res);
            this.addForm.badgePhotoUrl = res.original.fileId;
            this.addForm.badgePhotoShowUrl = window.URL.createObjectURL(data);
            this.imgCutDialog = false;
            this.addFormLoading = false;
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addForm {
  .inputWidth {
    width: 280px;
  }
  .cropperWrapper {
    .btnBox {
      float: left;
      .btn {
        // display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0 10px 0 0;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        transition: all 0.2s ease;
        text-decoration: none;
        user-select: none;
      }
      .red {
        background-color: var(--red-outer-color-basis);
        border-color: var(--red-outer-color-basis);
      }
      .blue {
        background-color: var(--blue-outer-color-basis);
        border-color: var(--blue-outer-color-basis);
      }
    }
    .imgBox {
      float: left;
      margin: 0 0 0 10px;
      img {
        width: 150px;
        height: 200px;
        display: block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
      }
    }
  }
  /deep/ .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      color: #8c939d;
      width: 75px;
    }
    .avatar {
      width: 250px;
      height: 150px;
      display: block;
    }
  }
}
</style>


