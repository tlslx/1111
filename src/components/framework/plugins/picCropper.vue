<template>
  <div id="picCropper" >
    <el-button type="primary" @click="dialogCropperVisible = true">设置图片</el-button>
    <el-dialog title="设置图片" :visible.sync="dialogCropperVisible" append-to-body width="60%" style="min-width:700px">
      <div>
        <div style="width: 400px; height:298px; border: 0px solid gray; display: inline-block;">
          <vue-cropper ref='cropper' :guides="true" :view-mode="2" :aspect-ratio="aspectRatio" :crop-box-resizable="cropBoxResizable"
            :autoCrop="true" :drag-mode="dragMode" :auto-crop-area="0.5" :min-container-width="200"
            :min-container-height="200" :background="false" :rotatable="true" :src="imgSrc" alt="Source Image"
            :img-style="{ 'width': '420px', 'height': '300px' }">
          </vue-cropper>
        </div>
        <img id="test" :src="cropImg" style="width: 210px; height: 150px; border: 0px solid gray" alt="Cropped Image" />
        <br />
        <div style="padding: 20px 10px 40px 0px;">
          <div style="width:420px;margin-left:0px;float:left">
            <el-upload style="margin-left:1px;float:left" class="avatar-uploader" action="" :show-file-list="false"
              :auto-upload="false" :on-change="setImage">
              <!-- <img id="giftImg" v-if="imageUrl" :src="imageUrl" class="avatar"> !-->
              <el-button round type="primary" slot="trigger">选择图片</el-button><span>（支持QQ截图，Ctrl + V）</span>
            </el-upload>
            <el-button round type="primary" @click="rotate" v-if="imgSrc != ''" style="margin-right:10px;margin-left:20px;">旋转</el-button>
            <el-button round type="primary" @click="cropImage" v-if="imgSrc != ''" style="margin-right: 10px;">截图</el-button>
          </div>
          <div style="float:right">
            <el-button round type="primary" @click="getImageData" style="margin-right: 10px;margin-left:30px;">确定</el-button>
            <el-button round type="info" @click="closePicCropper" v-if="imgSrc != ''" style="margin-right: 5px;">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import VueCropper from "vue-cropperjs";
  export default {
    components: {
      VueCropper
    },
    data() {
      return {
        pasteImg: "",
        dialogCropperVisible: false,
        dragMode: "none",
        aspectRatio: 1.4,
        cropBoxResizable: true,
        imgSrc: "data:image/jpeg;base64,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",
        cropImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJREFUeNo8zjsOxCAMBFB/KEAUFFR0Cbng3nQPw68ArZdAlOZppPFIBhH5EAB8b+Tlt9MYQ6i1BuqFaq1CKSVcxZ2Acs6406KUgpt5/LCKuVgz5BDCSb13ZO99ZOdcZGvt4mJjzMVKqcha68iIePB86GAiOv8CDADlIUQBs7MD3wAAAABJRU5ErkJggg%3D%3D"
      };
    },
    methods: {
      cropImage() {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      rotate() {
        // guess what this does :)
        this.$refs.cropper.rotate(90);
      },
      setImage(file, fileList) {
        var _this = this;
        // this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function (e) {
          _this.imgSrc = this.result;
          _this.$refs.cropper.replace(this.result);
        };
      },
      getImageData() {
        this.$emit("getImageData", this.cropImg);
        this.dialogCropperVisible = false;
      },
      closePicCropper() {
        var _this = this;
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        if (items.length > 0 && items[0].kind === "file") {
          // let blob = items[0].getAsFile();
          let reader = new FileReader();
          // let filename = new Date().getTime() + ".png";
          reader.onload = function (e) {
            var base64 = e.target.result;
            base64 = base64.replace(/^data:image\/(png|jpg);base64,/, "");
            _this.imgSrc = base64;
            _this.$refs.cropper.replace(base64);
          };
        }
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
          // alert('粘贴内容非图片！');
          return;
        }
        let reader = new FileReader();
        reader.onload = function (_e) {
          _this.imgSrc = _e.target.result;
          _this.$refs.cropper.replace(_e.target.result);
        };
        reader.readAsDataURL(file);
      };
    }
  };

</script>
