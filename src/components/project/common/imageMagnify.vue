/*eslint-disable*/
<template>
  <div class="magnify">
    <div class="preview-box" @mousemove="move($event)" @mouseout="out" ref="previewBox">
      <img width="100%" :src="previewImg" alt="" class="previewImg" :style="smallStyle">
      <div class="hover-box" ref="hoverBox" :style="hoverStyle"></div>
    </div>
    <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox" :style="imgStyle">
      <img :src="zoomImg" alt="" ref="bigImg">
    </div>
  </div>
</template>

<script>
  const offset = (el) => {
    let curretel = el;
    let top = curretel.offsetTop;
    let left = curretel.offsetLeft;
    while (curretel.offsetParent) {
      curretel = curretel.offsetParent;
      top += curretel.offsetTop;
      left += curretel.offsetLeft;
    }
    return {
      left: left,
      top: top
    };
  };

  export default {
    name: 'imageMagnify',
    props: {
      previewImg: {
        type: String,
        default: ''
      },
      zoomImg: {
        type: String,
        default: ''
      },
      smlimgHeight: {
        type: Number,
        default: 100
      },
      hoverHeight: {
        type: Number,
        default: 100
      },
      bigimgHeight: {
        type: Number,
        default: 520
      },
      leftDistance: {
        type: Number,
        default: 520
      }
    },
    data () {
      return {
        zoomVisiable: false,
        hoverVisiable: false,
        smallStyle: {
          width: this.smlimgHeight + 'px',
          height: this.smlimgHeight + 'px'
        },
        hoverStyle: {
          width: this.hoverHeight + 'px',
          height: this.hoverHeight + 'px'
        },
        imgStyle: {
          width: this.bigimgHeight + 'px',
          height: this.bigimgHeight + 'px',
          left: this.leftDistance + 'px'
        }
      };
    },
    methods: {
      out () {
        this.zoomVisiable = false;
      },
      move (ev) {
        this.init();
        // 鼠标距离屏幕距离
        let moveX = ev.clientX;
        let moveY = ev.clientY;
        // 大盒子距离顶部的距离
        let offsetLeft = offset(this.oPreviewBox).left;

        let offsetTop = offset(this.oPreviewBox).top;
        let left = moveX - offsetLeft - this.houverWidth / 2;
        let top;
        if (this.scroll > 0) {
          top = moveY - offsetTop + this.scroll - this.houverHeight / 2;
        } else {
          top = moveY - offsetTop - this.houverHeight / 2;
        }
        let maxWidth = this.pWidth - this.houverWidth;
        let maxHeight = this.pWidth - this.houverHeight;
        left = left < 0 ? 0 : left > maxWidth ? maxWidth : left;
        top = top < 0 ? 0 : top > maxHeight ? maxHeight : top;
        let percentX = left / (maxWidth);
        let percentY = top / (maxHeight);
        this.oHoverBox.style.left = left + 'px';
        this.oHoverBox.style.top = top + 'px';
        this.oBigImg.style.left = percentX * (this.bWidth - this.imgWidth) + 'px';
        this.oBigImg.style.top = percentY * (this.bHeight - this.imgHeight) + 'px';
        this.$emit('move', ev);
        this.zoomVisiable = true;
      },
      init () {
        this.oHoverBox = this.$refs.hoverBox;
        this.oPreviewBox = this.$refs.previewBox;
        this.oBigImg = this.$refs.bigImg;
        this.imgBox = this.$refs.zoomBox;
        this.houverWidth = this.oHoverBox.offsetWidth;
        this.houverHeight = this.oHoverBox.offsetHeight;
        this.pWidth = this.oPreviewBox.offsetWidth;
        this.pHeight = this.oPreviewBox.offsetHeight;
        this.imgWidth = this.oBigImg.offsetWidth;
        this.imgHeight = this.oBigImg.offsetHeight;
        this.bWidth = this.imgBox.offsetWidth;
        this.bHeight = this.imgBox.offsetHeight;
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      }
    }
  };
</script>

<style  scoped>
  .magnify {
    position: relative;
  }

  .magnify .preview-box {
    width: 100%;
    height: 100%;
    border: 1px solid #dededd;
    position: relative
  }
  .magnify .preview-box .previewImg{
    /*width: 448px;*/
    /*height: 446px;*/
    overflow: hidden;
  }

  .magnify .preview-box:hover .hover-box {
    display: block;
  }

  .magnify .preview-box .hover-box {
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    border: 1px solid #afafaf;
    cursor: move;
    user-select: none
  }

  .magnify .zoom-box {
    overflow: hidden;
    position: absolute;
    border: 1px solid #afafaf;
    top: -2px;
    z-index: 998;
  }
  .magnify .zoom-box img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: -500px;
    z-index: 999;
  }
</style>
