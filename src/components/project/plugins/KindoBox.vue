<template>
  <div class="box">
    <!-- title 区域 -->
    <div
      v-if="title"
      class="title"
    >
      <div class="title-control">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="title" name="first"></el-tab-pane>
        </el-tabs>
        <!-- <i
          v-if="icon"
          :class="icon"
        ></i>
        <span class="subtitle" v-html="title"></span> -->

        <!-- 更多区域-控制 -->
        <div :class="isOverWidth ? 'over-control':'more-control'">
          <el-button
            type="text"
            @click="isExpanded = !isExpanded"
            v-show="isMore"
          >
            <i :class="isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            <span v-text="isExpanded ? exphide : expshow"></span>
          </el-button>
        </div>

        <!-- 主要区域-控制 -->
        <div class="mian-control">
          <slot name="control"> </slot>
        </div>
      </div>
    </div>
    <div
      v-else
      class="title"
    >
      <div class="notitle-control">
        <!-- 更多区域-控制 -->
        <div :class="isOverWidth ? 'over-control':'more-control'">
          <el-button
            type="text"
            @click="isExpanded = !isExpanded"
            v-show="isMore"
          >
            <i :class="isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            <span v-text="isExpanded ? exphide : expshow"></span>
          </el-button>
        </div>

        <!-- 主要区域-控制 -->
        <div class="mian-control">
          <slot name="control"> </slot>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- 主要区域 -->
    <div class="main">
      <slot></slot>
    </div>

    <!-- 更多区域 -->
    <el-collapse-transition>
      <div
        class="more"
        v-show="isExpanded"
      >
        <slot name="more"></slot>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
export default {
  name: "kindo-box",
  props: {
    title: {
      type: String,
      default() {}
    },

    icon: {
      type: String,
      default() {}
    }
  },

  data() {
    return {
      activeName: "first",
      exphide: '收起筛选',
      expshow: '高级筛选',
      isMore: false,
      isExpanded: false,
      isOverWidth: false
    };
  },

  mounted() {
    this.$nextTick(function() {
      this.isMore = !!this.$slots.more;
      this.computeStyle();
    });
  },
  created() {
    let _this = this;
    let that = _this;
    let language = kindo.cache.get('language');
    if (language === 'en') {
      this.exphide = 'Hide';
      this.expshow = 'More';
    }
    this.resizeHandler = function () {
      that.computeStyle();
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  methods: {
    computeStyle() {
      let clientWidth = document.body.clientWidth;
      if (clientWidth < 1130) {
        this.isOverWidth = true;
      } else {
        this.isOverWidth = false;
      }
    }
  }
};
</script>

<style scoped>
.box {
  min-width: 0;
  border: 0;
  border-radius: 5px;
  box-shadow: 1.5px 2.6px 24px 0 rgba(0, 35, 136, 0.08);
  background-color: #fff;
  padding: 0 20px 4px 20px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.box .main{
 padding-top: 4px;
}
.box .title .title-control {  
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 40px;
  /* margin: 0 0 6px 0; */
  /* border-bottom: 1px solid #ebebeb; */
}
.box .title .notitle-control {
  font-size: 16px;
  margin: 8px 0 8px 0;
  float: right;
}

.box .title .title-control i {
  font-size: 16px;
  width: 16px;
  height: 16px;
  margin: 0 0px 0 0;
}
.box .title .title-control .subtitle {
  position: relative;
  display: inline-block;
}
.box .title .title-control .subtitle::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background-color: #2b57a4;
}
.box .title .mian-control,
.box .title .more-control {
  margin: 0 0 0 8px;
  float: right;
}


.more-control .el-button{
  position: absolute;
  right: 15px;
  top: 54px;
}
.box .title .more-control i,
.box .title .more-control span {
  height: 18px;
  line-height: 18px;
  font-size: 13px;
  color: #1d8ce0;
  text-decoration: none;
  margin: 0;
}

.over-control {
  margin: 0 0 0 8px;
  float: right;
}
.over-control .el-button{
  float: right;
  margin-right: 15px;
}
.box .title .over-control i,
.box .title .over-control span {
  height: 18px;
  line-height: 18px;
  font-size: 13px;
  color: #1d8ce0;
  text-decoration: none;
  margin: 0;
}
.box .main {
  transition: all 0.3s;
}
.clearfix:after { 
  content:"\200B"; display:block; height:0; clear:both; 
} 
.clearfix {
  *zoom:1;
}/*IE/7/6*/
</style>