<!-- 
  整体布局
  包含整个窗体各部分高度设置
 -->
<template>
  <div class="el-layout" :style="getStyle()">
    <div class="el-layout-item top">
      <slot name="top"></slot>
    </div>
    <div class="el-layout-item center" :style="getCenterStyle()">
      <slot name="center" :height="centerHeight"></slot>
    </div>
    <div class="el-layout-item left" :style="getLeftStyle()" v-if="leftWidth > 0">
      <slot name="left" :height="centerHeight"></slot>
    </div>
    <div class="el-layout-item bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElLayout",
  props: {
    fit: { type: Boolean, default: true },
    height: {},
    leftWidth: { type: Number, default: 0 },
    rightWidth: { type: Number, default: 0 }
  },
  data() {
    return {
      layoutHeight: this.height,
      topHeight: 0,
      centerHeight: 0,
      bottomHeight: 0
    };
  },
  methods: {
    getStyle() {
      return {
        height: this.layoutHeight + "px"
      };
    },
    getLeftStyle() {
      return {
        width: this.leftWidth + "px",
        height: this.centerHeight + "px",
        top: this.topHeight + "px"
      };
    },
    getCenterStyle() {
      return {
        "margin-left": this.leftWidth + "px",
        "margin-right": this.rightWidth + "px",
        height: this.centerHeight + "px"
      };
    },
    computeStyle() {
      let height = 0;
      if (this.$el.parentNode.tagName === "BODY") {
        height = window.document.documentElement.clientHeight;
      } else {
        height = this.$el.parentNode.offsetHeight;
      }
      this.layoutHeight = height;
      this.topHeight = this.getItemHeight("top");
      this.bottomHeight = this.getItemHeight("bottom");
      this.centerHeight = height - this.topHeight - this.bottomHeight;
    },
    getItemHeight(itemName) {
      for (let i = 0, len = this.$el.childNodes.length; i < len; i++) {
        let node = this.$el.childNodes[i];
        if (
          this.hasClass(node.classList, "el-layout-item") 
          && this.hasClass(node.classList, itemName)
        ) {
          return node.offsetHeight;
        }
      }
      return 0;
    },
    hasClass(classList, className) {
      if (typeof classList === 'undefined') {
        return false;
      }
      for (let i = 0, len = classList.length; i < len; i++) {
        if (classList[i] === className) {
          return true;
        }
      }
      return false;
    },
    resize() {
      this.computeStyle();
    }
  },
  created() {
    if (this.fit) {
      let _this = this;
      this.resizeHandler = function() {
        _this.computeStyle();
      };
      window.addEventListener("resize", this.resizeHandler);
    }
  },
  mounted() {
    this.computeStyle();
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  }
};
</script>

<<style>
.el-layout{
  position: relative;
}

.el-layout .el-layout-item{
  overflow: hide;
  box-sizing: border-box;
}

.el-layout>.el-layout-item.left{
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: auto;
}

</style>
