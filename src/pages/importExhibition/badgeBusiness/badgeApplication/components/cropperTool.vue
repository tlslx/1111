<template>
  <div id="picCropper">
    <el-button type="primary" @click="dialogCropperVisible = true">{{language.photoManagementTool}}</el-button>
    <el-dialog :title="language.setPicture" :visible.sync="dialogCropperVisible" append-to-body width="60%">
      <kindo-box>
        <el-row>
          <el-col>
            <div class="cropperclass">
              <vue-cropper ref='cropper' :guides="true" :view-mode="2" :aspect-ratio="aspectRatio" :crop-box-resizable="cropBoxResizable" :autoCrop="true" :drag-mode="dragMode" :auto-crop-area="0.5" :min-container-width="200" :min-container-height="200" :background="false" :rotatable="true" :src="imgUrl" alt="Source Image" :img-style="{ 'width': '420px', 'height': '300px' }">
              </vue-cropper>
            </div>
            <img id="test" class="cropimgclass" :src="cropImg" alt="Cropped Image" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="buttonclass">
          <el-col :span="3" :offset="1">
            <el-button round type="primary" @click="rotate">{{language.rotate}}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button round type="primary" @click="cropImage">{{language.screenshot}}</el-button>
          </el-col>
          <el-col :span="3" :offset="6">
            <el-button round type="primary" @click="getImageData">{{language.confirm}}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button round type="info" @click="closePicCropper">{{language.cancel}}</el-button>
          </el-col>
        </el-row>
      </kindo-box>
    </el-dialog>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
export default {
  components: {
    VueCropper
  },
  props: {
    imgUrl: {
      type: String,
      default: () => {
        return "";
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      pasteImg: "",
      dialogCropperVisible: false,
      dragMode: "none",
      aspectRatio: 1.4,
      cropBoxResizable: true,
      imgSrc: "",
      cropImg: ""
    };
  },
  methods: {
    // 截图
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    // 旋转图片
    rotate() {
      this.$refs.cropper.rotate(90);
    },
    // 上传图片，此功能暂时不用
    setImage(file, fileList) {
      var _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function (e) {
        _this.imgSrc = this.result;
        _this.$refs.cropper.replace(this.result);
      };
    },
    // 点击确定按钮时，获取裁剪后的图片信息
    getImageData() {
      this.$emit("getImageData", this.cropImg);
      this.dialogCropperVisible = false;
    },
    closePicCropper() {
      this.dialogCropperVisible = false;
    }
  },
  mounted() {
    var _this = this;
    document.onpaste = function (e) {
      var items = ((e.clipboardData || window.clipboardData).items) || [];
      var file = null;
      if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      if (!file) {
        return;
      }
      let reader = new FileReader();
      reader.onload = function (_e) {
        _this.imgUrl = _e.target.result;
        _this.$refs.cropper.replace(_e.target.result);
      };
      reader.readAsDataURL(file);
    };
  }
};

</script>
<style scoped>
.cropperclass {
  width: 400px;
  border: 0px solid gray;
  display: inline-block;
}
.cropimgclass {
  width: 210px;
  height: 150px;
  border: 0px solid gray;
}
.buttonclass {
  margin-top: 10px;
}
</style>
