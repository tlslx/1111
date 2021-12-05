<template>
  <div class="cropperWrapper">
    <vue-cropper ref="vueCropper" :img="imgUrl" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="autoCropWidth" :auto-crop-height="autoCropHeight" :center-box="option.centerBox" :high="option.high" :fixed="fixed" :fixedNumber="fixedNumber">
    </vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
  name: 'imgCut',
  components: { VueCropper },
  props: {
    imgUrl: { type: String, default: '' },
    autoCropWidth: { type: Number, default: 206 },
    autoCropHeight: { type: Number, default: 313 },
    fixed: { type: Boolean, default: false },
    fixedNumber: { type: Array, default: () => [3, 4] }
  },
  data() {
    return {
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
        centerBox: false,
        high: true
      }
    };
  }
};
</script>

<style lang="less" scoped>
.cropperWrapper {
  width: 500px;
  height: 500px;
  margin: 20px auto;
}
</style>

