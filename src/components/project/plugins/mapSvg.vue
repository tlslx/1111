<template>
  <div class="contents">
    <div class="wrap_box" id="body_box">
      <div class="top_box">
        <div class="qwe">
          <!--工具箱-->
          <div class="brush_box" id="brush_box" style="display:none;">
            <div class="brush_width" id="brushWidth">
              <a alt="18" href="javascript:;">
                <i class="font_min">A</i>
              </a>
              <a alt="24" href="javascript:;">
                <i class="font_midd">A</i>
              </a>
              <a alt="36" href="javascript:;">
                <i class="font_max">A</i>
              </a>
            </div>
            <div class="brush_line" id="brushLine">
              <a alt="1" href="javascript:;">
                <i class="line_midd"></i>
              </a>
              <a alt="0" href="javascript:;">
                <i class="line_max"></i>
              </a>
            </div>
            <!-- <div class="brush_color">
              <el-color-picker @change="colorChange" :predefine="predefineColors" v-model="areaColor"></el-color-picker>
            </div> -->
            <div class="brush_value">
              <span class="demonstration">角度</span>
              <input type="range" class="crop-range" id="skewX-control" value="-18" min="-36" max="0" step="1">
              <!-- <el-slider @change="valueChange" min="-50" max="-18" v-model="areaValue"></el-slider> -->
            </div>
          </div>
          <div id="zwibbler">
            <canvas id="onlineStand"></canvas>
          </div>
          <!-- 已分配展区信息 -->
          <div class="tooltip" :class="{'hide': tooltip.hidden}" ref="tooltip">
            <div class="title">
              <el-row>
                <el-col :span="6">展厅编号：</el-col><el-col :span="12">{{tooltip.code}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">展区名称：</el-col><el-col :span="12">{{tooltip.name}}</el-col>
              </el-row>
            </div>
          </div>
          <div class="tools" id="tools">
            <ul>
              <li class="helpcom" v-if="costom"><em class="help" id="help" @click="getHelp" title="帮助"></em></li>
              <li class="opencom" v-if="costom&&onexport"><em class="open" id="open" title="导出"></em></li>
              <li class="savecom" v-if="costom&&onsave"><em class="save" id="save" title="保存"></em></li>
              <li v-if="costom"><em class="pick" id="pick" title="选择工具"></em></li>
              <li v-if="costom"><em class="graph" id="graph" title="矩形工具"></em></li>
              <li v-if="costom"><em class="rectangle" id="rectangle" title="方形工具"></em></li>
              <li v-if="costom"><em class="text" id="text" title="文本输入"></em></li>
              <!-- <li v-if="costom"><em class="zindexup" id="zindexup" title="上一层"></em></li>
              <li v-if="costom"><em class="zindexdown" id="zindexdown" title="下一层"></em></li> -->
              <li><em class="zoombig" id="zoombig" title="放大"></em></li>
              <li><em class="zoomsmall" id="zoomsmall" title="缩小"></em></li>
              <li v-if="costom"><em class="delete" id="delete" title="删除"></em></li>
              <!-- <li v-if="costom"><em class="return" id="return" title="撤回"></em></li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
    <map-dialog @loaddata="onChild" :api="api" :language="language" ref="mapDialog"/>
    <!--插件帮助提示-->
    <el-dialog title="插件帮助提示" :close-on-click-modal="false" top="15px" :visible.sync="helpVisible" width="30%">
      <div>
        <p>基础元素不可拖动位置,只有新增元素可以拖动</p>
        <p>按住Ctrl + 滚动鼠标滚轴可以放大和缩小插件图片；按住Alt + 鼠标移动可以拖拽插件。</p>
        <p><img src="@/theme/project/images/icon1.png" alt="" class="vertical">用于选择插件上元素。</p>
        <p><img src="@/theme/project/images/icon2.png" alt="" class="vertical">用于创建一个矩形元素。</p>
        <p><img src="@/theme/project/images/icon13.png" alt="" class="vertical">用于创建一个方形元素。</p>
        <p><img src="@/theme/project/images/icon3.png" alt="" class="vertical">用于修改文本输入。</p>
        <p><img src="@/theme/project/images/icon7.png" alt="" class="vertical">用于放大视图插件。</p>
        <p><img src="@/theme/project/images/icon8.png" alt="" class="vertical">用于缩小视图插件。</p>
        <p><img src="@/theme/project/images/icon12.png" alt="" class="vertical">用于删除单个或多个元素。</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="helpVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
import $ from "jquery";
import { fabricExt } from '@/components/project/plugins/fabric.extend.js';
// let zwibbler = require("../../../../static/scripts/zwibbler.js");
export default {
  name: "mapSvg",
  components: {
    'mapDialog': () => import('./mapDialog.vue')
  },
  props: {
    title: { type: String },
    imgurl: { type: String, default: '' },
    costom: { type: Boolean, default: false },
    height: { type: Number, default: 750 },
    onexport: { type: Boolean, default: false },
    onsave: { type: Boolean, default: false },
    ondelete: { type: Boolean, default: false },
    api: {
      type: Object,
      default: () => {
        return {};
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
      action: "",
      rowdata: {},
      canvas: [],
      tooltip: {
        hidden: true,
        lastCode: '',
        lastName: '',
        code: '',
        name: '',
        enterprise: {}
      },
      helpVisible: false,
      bodyHeightBefor: "", // 全屏前的body高度
      countPage: "", // 初始化时canvas画布总页数
      fontSize: 20, // 初始化字体大小
      lineSize: "", // 初始化边框大小
      // areaColor: "#ffffff", // 初始化刷子颜色
      treecount: 0,
      treeheight: 86,
      pathwidth: 400,
      pathheight: 450,
      textwidth: 360,
      textheight: 298,
      matrixcount: 0,
      matrixwidth: 1432,
      matrixheight: 110,
      collectionArr: {
        width: 1432,
        height: 460
      },
      textctionArr: {
        width: 1180,
        height: 386
      },
      treemenuArr: [],
      areaValue: 50,
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#5615c7',
        '#c71585',
        '#c7151b'
      ],
      data: {
        "id": "001",
        "name": "方案一",
        "groupName": "方案一的组合名称",
        "version": "1.0",
        "status": "1",
        "period": "1",
        "session": "1",
        "template": {
          "id": "00101",
          "name": "模板图一",
          "version": "1.0",
          "status": "1",
          "stands": [
            {
              code: "1.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1127,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "2.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1293,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "3.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              width: 153,
              height: 182,
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              xCoord: 1459,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "4.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              width: 153,
              height: 182,
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              xCoord: 1627,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "5.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              width: 153,
              height: 182,
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              xCoord: 1790,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "1.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1129,
              yCoord: 1227,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "2.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1293,
              yCoord: 1227,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "3.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1460,
              yCoord: 1227,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "4.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1627,
              yCoord: 1227,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "5.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1794,
              yCoord: 1227,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "6.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1324,
              yCoord: 715,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "7.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 94,
              xCoord: 1521,
              yCoord: 715,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "8.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1661,
              yCoord: 715,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "9.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2284,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "10.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2452,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "11.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2620,
              yCoord: 1492,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "9.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2285,
              yCoord: 1284,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "10.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2452,
              yCoord: 1284,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "11.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2615,
              yCoord: 1284,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "9.3",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2284,
              yCoord: 1080,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "10.3",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2452,
              yCoord: 1080,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "11.3",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2618,
              yCoord: 1080,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "12.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2692,
              yCoord: 544,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "13.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2861,
              yCoord: 544,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "12.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2692,
              yCoord: 754,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "13.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 2860,
              yCoord: 754,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "14.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1410,
              yCoord: 2665,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "15.1",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1576,
              yCoord: 2665,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "14.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1411,
              yCoord: 2417,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "15.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1575,
              yCoord: 2417,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "16.2",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1810,
              yCoord: 2417,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "14.3",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1412,
              yCoord: 2165,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "15.3",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1577,
              yCoord: 2165,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "16.3",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1810,
              yCoord: 2165,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "14.4",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1411,
              yCoord: 1912,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "15.4",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1576,
              yCoord: 1912,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "16.4",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 153,
              height: 182,
              xCoord: 1812,
              yCoord: 1912,
              isIsland: 1,
              hasBorders: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }, {
              code: "1.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1262,
              yCoord: 1452,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "2.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1428,
              yCoord: 1452,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "3.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1595,
              yCoord: 1452,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "4.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1760,
              yCoord: 1452,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "5.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1910,
              yCoord: 1452,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "1.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1386,
              yCoord: 908,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "2.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 150,
              height: 30,
              xCoord: 1485,
              yCoord: 908,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "3.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1720,
              yCoord: 908,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }, {
              code: "5.1Y",
              type: "2",
              line: "1",
              name: "",
              level: "",
              color: '#ffffff',
              radius: "",
              vertexCoord: -18,
              width: 80,
              height: 30,
              xCoord: 1988,
              yCoord: 908,
              isIsland: 1,
              hasBorders: true,
              hasControls: true,
              lockMovementX: false,
              lockMovementY: false
            }
          ],
          "texts": [ // 图注结束
            {
              "type": "3",
              "code": "1.1",
              "name": "1.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1183.2592592592594,
              "yCoord": 1638.3703703703704,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "1.2",
              "name": "1.2",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1185.6296296296298,
              "yCoord": 1373.5802469135804,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "2.1",
              "name": "2.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1350.8395061728395,
              "yCoord": 1638.9135802469136,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "2.2",
              "name": "2.2",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1349.2592592592594,
              "yCoord": 1373.0864197530864,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "3.1",
              "name": "3.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1517.0493827160492,
              "yCoord": 1638,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "3.2",
              "name": "3.2",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1516.4691358024688,
              "yCoord": 1374.3703703703704,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "4.1",
              "name": "4.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1682.8395061728397,
              "yCoord": 1638.0493827160494,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "4.2",
              "name": "4.2",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1684.0493827160492,
              "yCoord": 1374,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "5.1",
              "name": "5.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1847.2592592592594,
              "yCoord": 1638,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "5.2",
              "name": "5.2",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1850.049382716049,
              "yCoord": 1372.6666666666667,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "6.1",
              "name": "6.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1380,
              "yCoord": 862,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "7.1",
              "name": "7.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1578,
              "yCoord": 770,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "8.1",
              "name": "8.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1716.6000000000001,
              "yCoord": 862.2,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "9.1",
              "name": "9.1",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2340.469135802469,
              "yCoord": 1638.3703703703704,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "9.2",
              "name": "9.2",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2340.4691358024693,
              "yCoord": 1429.5802469135801,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "9.3",
              "name": "9.3",
              "level": "",
              "width": 45,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2339.669135802469,
              "yCoord": 1227.18024691358,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "10.1",
              "name": "10.1",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2500.58024691358,
              "yCoord": 1637.4197530864199,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "10.2",
              "name": "10.2",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2500.6296296296296,
              "yCoord": 1431.20987654321,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "10.3",
              "name": "10.3",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2501.259259259259,
              "yCoord": 1227.1604938271605,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "11.1",
              "name": "11.1",
              "level": "",
              "width": 61.6640625,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2670.0493827160494,
              "yCoord": 1636.79012345679,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "11.2",
              "name": "11.2",
              "level": "",
              "width": 61.6640625,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2662.8395061728397,
              "yCoord": 1430.2098765432097,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "11.3",
              "name": "11.3",
              "level": "",
              "width": 61.6640625,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2666.4691358024693,
              "yCoord": 1225.5802469135804,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "12.1",
              "name": "12.1",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2739.62962962963,
              "yCoord": 900.3703703703702,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "12.2",
              "name": "12.2",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2738.20987654321,
              "yCoord": 692.6296296296297,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "13.1",
              "name": "13.1",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2906.469135802469,
              "yCoord": 901.5802469135803,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "13.2",
              "name": "13.2",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "#000",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 2908.6296296296296,
              "yCoord": 690.5802469135803,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "14.1",
              "name": "14.1",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1458.4227899914176,
              "yCoord": 2810.4247705816333,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.16666666666666666,
              "zoomY": 0.16666666666666666,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "14.2",
              "name": "14.2",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1460.7044299201161,
              "yCoord": 2562.068264342774,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.16666666666666666,
              "zoomY": 0.16666666666666666,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "14.3",
              "name": "14.3",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1460.1002178649237,
              "yCoord": 2311.599128540305,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "14.4",
              "name": "14.4",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1460.2861292665216,
              "yCoord": 2058.38779956427,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "15.1",
              "name": "15.1",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1624.3529411764705,
              "yCoord": 2811.7007988380537,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.16666666666666666,
              "zoomY": 0.16666666666666666,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "15.2",
              "name": "15.2",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1623.3769063180825,
              "yCoord": 2562.6259985475676,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.16666666666666666,
              "zoomY": 0.16666666666666666,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "15.3",
              "name": "15.3",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1626.397966594045,
              "yCoord": 2310.2047930283225,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "15.4",
              "name": "15.4",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1624.5388525780684,
              "yCoord": 2058.38779956427,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "16.2",
              "name": "16.2",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1859.1590413943352,
              "yCoord": 2563.044299201162,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.16666666666666666,
              "zoomY": 0.16666666666666666,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "16.3",
              "name": "16.3",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1858.7872185911401,
              "yCoord": 2311.4132171387073,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }, {
              "type": "3",
              "code": "16.4",
              "name": "16.4",
              "level": "",
              "width": 63,
              "height": 40.68,
              "color": "rgb(0,0,0)",
              "radius": "",
              "vertexCoord": 0,
              "xCoord": 1860.971677559913,
              "yCoord": 2057.7835875090777,
              "font": 36,
              "scaleX": 1,
              "scaleY": 1,
              "zoomX": 0.41666666666666663,
              "zoomY": 0.41666666666666663,
              "hasBorders": false,
              "hasControls": false,
              "lockMovementX": true,
              "lockMovementY": true
            }]
        }
      }
    };
  },
  mounted() {
    if (this.costom) {
      this.initData();
      this.bindEvent();
    }
  },
  methods: {
    // 获取视图
    getView() {
      if (this.imgurl) {
        if (this.canvas.length !== 0) {
          this.canvas.addBackground('static/img/logo.png', this.costom);
          this.$nextTick(function () {
            this.loadData();
          });
        } else {
          this.initData();
          this.bindEvent();
        }
      }
    },
    // 初始化
    initData() {
      this.canvas = new fabricExt.Canvas('onlineStand', {
        width: 1080,
        height: this.height,
        hoverCursor: 'defaultCursor'
      });
      // var text = new fabricExt.Text('展\n览\n展\n期', { left: 2200, top: 1100, fontSize: 20 });
      // this.canvas.add(text);

      if (this.costom) {
        // $(".qwe").css("height", $(window).height() - 102);
        // this.canvas.drawGraph(this.data.template.stands);
        // this.canvas.drawGraph(this.data.template.texts);
        // this.imgurl = 'static/img/map.svg';
      }
      if (this.imgurl.indexOf("null") !== -1) {
        this.canvas.addBackground('static/img/logo.png', this.costom);
        this.canvas.addEventListener(this.costom);
        // this.imgurl = 'static/img/logo.png';
        // this.canvas.addBackground = null;
        // this.canvas.addEventListener = null;
      } else {
        if (!this.costom) {
          this.canvas.addBackground(this.imgurl, this.costom);
        }
        // this.canvas.addBackground(this.imgurl, this.costom);
        this.canvas.addEventListener(this.costom);
      }
      if (this.costom) {
        this.showEnterpriseDetail();
      }
      // 选中默认文字和边框
      $(".brush_width a:eq(1)").addClass("current");
      $(".brush_line a:eq(0)").addClass("current");
      // 选中颜色
      // $(".show_color i").css("background-color", this.areaColor);
      this.bodyHeightBefor = $("body").height(); // 全屏前的body高度
      // this.zwibblerNew.setZoom(0.35); // 缩放画板（可用于缩放背景图）
    },
    loadData() {
      if (this.imgurl.indexOf("null") !== -1) {
        this.canvas.endEventListener(this.costom);
      } else {
        this.canvas.addBackground(this.imgurl, this.costom);
        this.canvas.addEventListener(this.costom);
      }
    },
    // 预加载数据
    resetData() {
      this.canvas.reset();
      this.canvas.clear();
      this.canvas.setZoom(1);
      this.canvas.addBackground(this.imgurl, this.costom);
      let url = this.api.getinit;
      let params = {};
      if (this.rowdata.exhibitionNum && this.rowdata.exhibitionPeriodCode) {
        params = {
          exhibitionNum: this.rowdata.exhibitionNum,
          exhibitionPeriodCode: this.rowdata.exhibitionPeriodCode
        };
      }
      if (this.rowdata.graphId) {
        url = this.api.getbyid;
        params = {
          graphId: this.rowdata.graphId
        };
      }
      this.$http.get(url, params).then(res => {
        if (res) {
          // 优先级先渲染图形再文字
          let stands = [];
          let standsother = [];
          let texts = [];
          let textsother = [];
          // 按高度排序 res.template.stands
          res.template.stands = this.canvas.getByHeights(res.template.stands);
          // console.log(res.template.stands);
          res.template.stands.forEach(stand => {
            if (stand.type === '3' && stand.level === '2') {
              texts.push(stand);
            } else if (stand.type === '3') {
              textsother.push(stand);
            } else if (stand.type === '1') {
              stands.push(stand);
            } else {
              standsother.push(stand);
            }
          });
          this.canvas.drawGraph(stands);
          this.canvas.drawGraph(standsother);
          this.canvas.drawGraph(textsother);
          if (texts) {
            this.canvas.drawGraph(texts);
          }
          const picList = this.canvas.getPicDatas('esc');
          const planList = this.canvas.getAllDatas('esc');
          // 先删除再添加图注
          this.canvas.planExhibition(6, picList);
          this.canvas.planExhibition(10, 'row', planList);
        }
      });
      // .catch(e => {
      //   this.canvas.drawGraph(this.data.template.stands);
      //   this.canvas.drawGraph(this.data.template.texts);
      // });
    },
    // 预修改数据
    modifyData() {
      this.canvas.reset();
      this.canvas.clear();
      this.canvas.setZoom(1);
      this.canvas.addBackground(this.imgurl, this.costom);
      let url = this.api.getinit;
      this.$http.get(url).then(res => {
        if (res) {
          let stands = [];
          let standsother = [];
          let texts = [];
          let textsother = [];
          res.template.stands.forEach(stand => {
            stand.hasBorders = stand.hasControls = true;
            stand.lockMovementX = stand.lockMovementY = false;
            stand.selectable = true;
            if (stand.type === '3') {
              stand.level = '2';
            } else {
              stand.name = '';
            }
            if (stand.type === '3' && stand.level === '2') {
              texts.push(stand);
            } else if (stand.type === '3') {
              textsother.push(stand);
            } else if (stand.type === '1') {
              stands.push(stand);
            } else {
              standsother.push(stand);
            }
          });
          this.canvas.drawGraph(stands);
          this.canvas.drawGraph(standsother);
          this.canvas.drawGraph(textsother);
          if (texts) {
            this.canvas.drawGraph(texts);
          }
        }
      });
    },
    saveinfoList(jsonlist) {
      let url = this.api.saveinfo;
      let params = {};
      if (this.rowdata.graphId) {
        params = {
          graphId: this.rowdata.graphId,
          json: jsonlist
        };
      } else if (this.rowdata.graphName && this.rowdata.exhibitionNum && this.rowdata.exhibitionPeriodCode) {
        params = {
          graphName: this.rowdata.graphName,
          exhibitionNum: this.rowdata.exhibitionNum,
          exhibitionPeriodCode: this.rowdata.exhibitionPeriodCode,
          json: jsonlist
        };
      } else {
        kindo.util.alert('请先选择届数和期数', '提示', 'warning');
        return false;
      }
      this.$http.postJson(url, params).then(res => {
        kindo.util.alert('保存成功', '提示', 'success');
        this.$router.push({
          path: '/flatmanage'
        });
      });
    },
    editinfoList(jsonlist) {
      let url = this.api.saveinfo;
      jsonlist.forEach(stand => {
        stand.hasBorders = stand.hasControls = false;
        stand.lockMovementX = stand.lockMovementY = true;
        stand.selectable = false;
        if (stand.type === '3') {
          stand.level = '2';
        } else {
          stand.name = '';
        }
        if (stand.type === '2') {
          stand.type = '1';
        }
        stand.sid = '';
      });
      let params = {
        json: jsonlist
      };
      // console.log(jsonlist);
      this.$http.postJson(url, params).then(res => {
        kindo.util.alert('保存成功', '提示', 'success');
        // this.$router.push({
        //   path: '/flatmanage'
        // });
      });
    },
    getHelp() {
      this.helpVisible = true;
    },
    onChild(row) {
      let _this = this;
      const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
      const checkAllList = _this.canvas.getObjects();
      if (checkedList.length > 0) {
        if (checkedList[0].exhibition.type === '3') {
          row.sid = checkedList[0].exhibition.sid;
          // _this.canvas.planExhibition(8, row);
          _this.canvas.planExhibition(5, row, checkAllList);
        } else if (checkedList[0].exhibition.name !== '') {
          row.sid = checkedList[0].exhibition.sid;
          _this.canvas.planExhibition(5, row, checkAllList);
        } else if (checkedList[0].exhibition.type === '2') {
          // 修改图新建文元素
          row.sid = this.$utility.newGuid();
          _this.canvas.planExhibition(9, row, checkedList);
          _this.canvas.planExhibition(8, row, checkedList);
          // checkedList[0] = newcheckList;
        } else {
          // 创建新图文元素
          row.sid = this.$utility.newGuid();
          let newcheckList = _this.canvas.createStand(row, checkedList[0]);
          // _this.canvas.planExhibition(9, row, checkedList);
          _this.canvas.planExhibition(8, row, checkedList);
          checkedList[0] = newcheckList;
        }
        // 更新同类颜色
        if (row.areaColor) {
          checkedList.forEach(stand => {
            let value = {
              name: stand.name,
              color: row.areaColor
            };
            _this.canvas.planExhibition(1, value, _this.canvas.getObjects());
          });
        }
        if (this.action !== 'modify') {
          const picList = _this.canvas.getPicDatas('esc');
          const planList = _this.canvas.getAllDatas('esc');
          // 先删除再添加图注
          // console.log(planList);
          _this.canvas.planExhibition(6, picList);
          _this.canvas.planExhibition(10, row, planList);
        }
        // 重新排列文字顺序
        _this.canvas.changeModel();
      } else {
        _this.canvas.planExhibition(8, row);
      }
    },
    // 事件绑定
    bindEvent() {
      // 当选择节点改变时调用
      let _this = this;
      
      // 选择工具
      _this.activePickTool();

      // 矩形工具
      _this.activeJuxingTool();

      // 方形工具
      _this.activeFangxingTool();

      // 文本工具
      _this.activeuseTextTool();

      // 笔刷工具
      _this.activeBrushTool();

      if ((navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/))) {
        document.getElementsByClassName('crop-range')[0].style.height = '6px';
      }
      if (navigator.userAgent.toLowerCase().match(/chrome\/([\d.]+)/)) {
        document.getElementsByClassName('crop-range')[0].style.background = 'linear-gradient(to right, #409EFF, #409EFF 100%, #f0f0f0 100%)';
      }
      
      // 上一层
      $("#zindexup").click(function () {
        _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        // let nodeid = _this.zwibblerNew.getSelectedNodes();
        // let ids = "";
      });
      // 下一层
      $("#zindexdown").click(function () {
        _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        // let nodeid = _this.zwibblerNew.getSelectedNodes();
        // let ids = "";
      });
      // 放大
      $("#zoombig").click(function () {
        // _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        let zoom = _this.canvas.getZoom();
        zoom = zoom * 1.5;
        if (zoom > 1.265625) {
          zoom = 1.265625;
        }
        // console.log(zoom);
        _this.canvas.setZoom(zoom);
      });
      // 缩小
      $("#zoomsmall").click(function () {
        // _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        let zoom = _this.canvas.getZoom();
        zoom = zoom / 1.5;
        if (zoom < 0.16666666666666666) {
          zoom = 0.16666666666666666;
        }
        // console.log(zoom);
        _this.canvas.setZoom(zoom);
      });
      // 返回
      $("#return").click(function () {
        _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
      });
      // 删除
      $("#delete").click(function () {
        // _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
        if (!checkedList || !checkedList.length) {
          kindo.util.alert('请先选中展区', '提示', 'warning');
          return false;
        }
        _this.canvas.planExhibition(6, checkedList);
      });
      // 保存
      $("#save").click(function () {
        const saveList = _this.canvas.getExhibitionByPropName('checked', true);
        if (saveList && saveList.length > 0) {
          kindo.util.alert('请先确保未选择展区', '提示', 'warning');
          return false;
        }
        const checkedList = _this.canvas.getAllExhibitions('esc');
        // const checkedList = _this.canvas.getExhibitionByPropName('hoverCursor', "pointer");
        let hasEditInfo = false;
        checkedList.forEach(item => {
          if (!item.code && !item.level) {
            hasEditInfo = true;
            return true;
          }
        });
        if (hasEditInfo) {
          kindo.util.alert('请先完成所有数据填写', '提示', 'warning');
          return;
        }
        let newarry = _this.canvas.saveinfo(checkedList);
        if (_this.action === 'modify') {
          _this.editinfoList(newarry);
        } else {
          _this.saveinfoList(newarry);
        }
        // _this.canvas.downLoad(new Date().getTime() + ".svg");
      });
      $('#skewX-control').val(-18);
      $('#skewX-control').change(function() {
        const skewX = this.value;
        const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
        if (!checkedList || !checkedList.length) {
          kindo.util.alert('请先选中展区', '提示', 'warning');
          return false;
        }
        _this.canvas.planExhibition(3, skewX, checkedList);
      });
      // 打开加载
      $("#open").click(function () {
        _this.canvas.reset();
        let title = '第' + _this.rowdata.exhibitionNum + '届中国进出口商品交易会（第' + _this.rowdata.exhibitionPeriodCode + '期）';
        let row = {
          color: '#000',
          code: '',
          name: title,
          ename: '',
          font: 55,
          level: '1',
          left: 1800,
          top: 150
        };
        _this.canvas.planExhibition(8, row);
        setTimeout(() => {
          _this.canvas.downLoad(new Date().getTime() + ".svg");
          const checkedList = _this.canvas.getExhibitionByPropName('name', title);
          // 删除标题
          // console.log(checkedList);
          _this.canvas.planExhibition(6, checkedList);
        }, 1000);
      });
    },
    activePickTool() {
      let _this = this;
      // 选择控制
      $("#pick").click(function () {
        _this.toolAddClass($(this));
        _this.hideTool($("#brush_box"));
      });
    },
    // 未选择创建文字,已选中编辑文字
    activeuseTextTool() {
      let _this = this;
      $("#text").click(function () {
        // let haschcek = false;
        // _this.toolAddClass($(this));
        _this.hideTool($("#text_box"));
        // _this.fontSize = $(this).attr("alt");
        const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
        // if (!checkedList || !checkedList.length) {
        //   haschcek = true;
        // }
        if (checkedList.length !== 1) {
          kindo.util.alert('请选择一个展区', '提示', 'warning');
          return false;
        }
        if (checkedList[0].level) {
          kindo.util.alert('只能选择一个展区', '提示', 'warning');
          return false;
        }
        // if (checkedList[0].exhibition.type === '1') {
        //   kindo.util.alert('只能选择一个展区', '提示', 'warning');
        //   return false;
        // }
        _this.createText(checkedList[0]);
        // if (haschcek) {
        //   let param = {
        //     code: '',
        //     name: ''
        //   };
        //   _this.createText(param);
        // } else {
        //   if (checkedList.length !== 1) {
        //     kindo.util.alert('只能选择一个展区', '提示', 'warning');
        //     return false;
        //   }
        //   if (checkedList[0].level) {
        //     alert('只能选择一个展区');
        //     return false;
        //   }
        //   _this.createText(checkedList[0]);
        // }
      });
    },
    activeJuxingTool() {
      let _this = this;
      // 矩形
      $("#graph").click(function () {
        // _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        _this.createJuxing(1);
      });
    },
    activeFangxingTool() {
      let _this = this;
      // 方形
      $("#rectangle").click(function () {
        // _this.toolAddClass($(this));
        _this.hideTool($("#hide_box"));
        _this.createJuxing(2);
      });
    },
    activeBrushTool() {
      let _this = this;
      // 字体大小
      $("#brushWidth a").click(function () {
        $(this)
          .addClass("current")
          .siblings()
          .removeClass("current");
        _this.fontSize = $(this).attr("alt");
        const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
        if (!checkedList || !checkedList.length) {
          kindo.util.alert('请先选中展区', '提示', 'warning');
          return false;
        }
        _this.canvas.planExhibition(4, _this.fontSize, checkedList);
      });

      // 边框大小
      $("#brushLine a").click(function () {
        $(this)
          .addClass("current")
          .siblings("a")
          .removeClass("current");
        const line = $(this).attr("alt");
        const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
        if (!checkedList || !checkedList.length) {
          kindo.util.alert('请先选中展区', '提示', 'warning');
          return false;
        }
        _this.canvas.planExhibition(2, line, checkedList);
      });

      // 改变颜色
      // $("#brushColor i").click(function () {
      //   _this.areaColor = $(this).css("background-color");
      //   $("#showBrushColor i").css("background-color", _this.areaColor);
      //   const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
      //   if (!checkedList || !checkedList.length) {
      //     kindo.util.alert('请先选中展区');
      //     return false;
      //   }
      //   _this.canvas.planExhibition(1, _this.areaColor, checkedList);
      // });
    },
    activeTextTool() {
      let _this = this;
      // 文本颜色
      $("#textColor i").click(function () {
        _this.thisTextColor = $(this).css("background-color");
        $("#showTextColor i").css("background-color", _this.thisTextColor);

        // 改变文本的颜色
        // _this.zwibblerNew.setColour(_this.thisTextColor, _this.thisTextColor);
      });

      // 文本size
      $("#textSize").change(function () {
        // _this.Properties["fontSize"] = $(this).val() * 5;
        // _this.zwibblerNew.setNodeProperty(
        //   _this.zwibblerNew.getSelectedNodes(),
        //   "fontSize",
        //   _this.Properties["fontSize"]
        // );
      });
    },
    colorChange(v) {
      let _this = this;
      if (v) {
        _this.areaColor = v;
      } else {
        _this.areaColor = '#ffffff';
      }
      const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
      const checkAllList = _this.canvas.getObjects();
      if (!checkedList || !checkedList.length) {
        kindo.util.alert('请先选中展区', '提示', 'warning');
        return false;
      }
      checkedList.forEach(stand => {
        let value = {
          name: stand.name,
          color: _this.areaColor
        };
        _this.canvas.planExhibition(1, value, checkAllList);
      });
    },
    valueChange(v) {
      let _this = this;
      const skewX = v;
      const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
      if (!checkedList || !checkedList.length) {
        kindo.util.alert('请先选中展区', '提示', 'warning');
        return false;
      }
      _this.canvas.planExhibition(3, skewX, checkedList);
    },
    // 创建目录树，不能重复
    createTree() {
      let _this = this;
      let trees = []; // 最终数组
      let temp = {};
      // 合并同类项
      _this.treemenuArr.map(item => {
        if (!temp[item.name]) {
          trees.push(item);
          temp[item.name] = true;
        }
      });
      trees.map(item => {
        _this.treemenuArr.map(treeitem => {
          if (treeitem.name === item.name && treeitem.code !== item.code) {
            item.code += "," + treeitem.code;
          }
        });
      });
      _this.treecount = 0;
      for (let i = 0; i < trees.length; i++) {
        _this.createMenu(trees[i].name, trees[i].code, trees[i].color);
      }
    },
    // 创建一个矩形组
    createJuxing(type) {
      let _this = this;
      if (_this.matrixcount !== 0) {
        if (_this.matrixcount % 5 === 0) {
          _this.collectionArr.width = _this.collectionArr.width - _this.matrixwidth + 726;
          _this.collectionArr.height = _this.collectionArr.height + _this.matrixheight;

          // _this.textctionArr.width = _this.textctionArr.width - _this.matrixwidth + 10;
          // _this.textctionArr.height = _this.textctionArr.height + _this.matrixheight;
        } else {
          _this.collectionArr.width = _this.collectionArr.width + 168;
          // _this.textctionArr.width = _this.textctionArr.width + 42;
        }
      } else if (type === 2) {
        _this.collectionArr.width = _this.matrixwidth - 7;
      } else {
        _this.collectionArr.width = _this.matrixwidth;
      }
      _this.collectionArr.fillStyle = '#ffffff'; // _this.chagefillStyle()
      _this.matrixcount++;
      let newpathArr = _this.createPath(_this.collectionArr, type);
      _this.canvas.addStand(newpathArr);
      _this.canvas.changeModel();
    },
    // 创建菜单目录,可扩展
    createMenu(name, code, color) {
      let _this = this;
      if (_this.treecount !== 0) {
        if (_this.treecount % 1 === 0) {
          _this.pathArr.width = _this.pathwidth;
          _this.pathArr.height = _this.pathArr.height + _this.treeheight;

          _this.textArr.width = _this.textwidth;
          _this.textArr.height = _this.textArr.height + _this.treeheight;

          _this.titleArr.width = _this.textwidth;
          _this.titleArr.height = _this.titleArr.height + _this.treeheight;
        } else {
          _this.pathArr.width = _this.pathArr.width + 115.5;
          _this.textArr.width = _this.textArr.width + 115.5;
          _this.titleArr.width = _this.titleArr.width + 115.5;
        }
      } else {
        _this.pathArr.width = _this.pathwidth;
      }
      _this.pathArr.fillStyle = color;
      _this.pathArr.combox = true; // 正方形
      _this.textArr.combox = true; // 正方形
      _this.titleArr.combox = true; // 正方形
      _this.pathArr.text = "";
      _this.textArr.text = code;
      _this.titleArr.text = name;
      _this.treecount++;
    },
    // 自定义创建图形
    createPath(obj, type) {
      let pathwidth = 153;
      let pathheight = 94;
      // 判断是否正方形
      if (type === 3) {
        pathwidth = 153;
        pathheight = 153;
      } else if (type === 2) {
        pathwidth = 153;
        pathheight = 182;
      }
      let pathArr = {
        code: "",
        type: "2", // 1固定 2拖动 3标识
        line: "1", // 0虚线 1实线
        color: obj.fillStyle,
        name: "",
        level: "",
        width: pathwidth,
        height: pathheight,
        radius: "",
        vertexCoord: -18,
        xCoord: obj.width,
        yCoord: obj.height,
        hasBorders: true, // 去掉边框
        hasControls: true, // 去掉控制
        lockMovementX: false, // 横行移动锁定
        lockMovementY: false // 纵向移动锁定
      };
      return pathArr;
    },
    // 自定义创建文字
    createText(info) {
      // console.log(this.action);
      this.$refs.mapDialog.mapVisible = true;
      this.$refs.mapDialog.action = '';
      this.$nextTick(function () {
        if (this.action === 'modify') {
          this.$refs.mapDialog.action = "edit";
          this.$refs.mapDialog.rowdata = info;
        } else {
          this.$refs.mapDialog.action = "add";
          this.$refs.mapDialog.rowdata = info;
        }
      });
    },
    // 随机填充色
    chagefillStyle() {
      return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    },
    // 已分配展区的企业鼠标移上去显示企业信息
    showEnterpriseDetail () {
      const _this = this;
      const tooltip = this.$refs.tooltip;
      this.canvas.on({
        'mouse:over': function(options) {
          const target = options.target;
          if (target && _this.tooltip.lastName !== target.name && target.name !== '' && target.code !== '') {
            if (target._objects) {
              return false;
            }
            // && target.planInfo
            _this.tooltip.code = target.code;
            _this.tooltip.name = target.name;
            // if (target.violateRules) {
            //   _this.tooltip.tableData = [];
            //   Object.values(target.violateRules).forEach(rule => {
            //     _this.tooltip.tableData.push({
            //       rule: rule.violation,
            //       result: rule.state
            //     });
            //   });
            // } else {
            //   _this.tooltip.tableData = [];
            // }
            // 鼠标移至已分配的展区时显示信息
            _this.tooltip.hidden = false;
            tooltip.style.top = options.e.clientY + "px";
            let clientWidth = document.body.clientWidth;
            clientWidth / 2 > options.e.clientX
              ? tooltip.style.left = `${options.e.clientX}px`
              : tooltip.style.left = `${options.e.clientX - 10}px`;
            _this.tooltip.lastCode = target.code;
            _this.tooltip.lastName = target.name;
          }
        },
        'mouse:move': function(options) {
          // 隐藏显示的已分配的展区信息
          const target = options.target;
          if (!target) { //  || !target.planInfo
            _this.tooltip.hidden = true;
            _this.tooltip.lastCode = null;
            _this.tooltip.lastName = null;
          }
        }
      });
    },
    toolAddClass(obj) {
      obj.addClass("current");
      obj
        .parent("li")
        .siblings()
        .find("em")
        .removeClass("current");
    },
    toolRemoveClass(obj) {
      obj.removeClass("current");
    },
    hideTool(obj) {
      if ($("#brush_box:visible").length > 0) {
        $("#brush_box").hide();
        // return false;
      }

      if ($("#hide_box:visible").length > 0) {
        $("#hide_box").hide();
        return false;
      }

      if ($("#text_box:visible").length > 0) {
        $("#text_box").hide();
        return false;
      }

      if (obj) {
        obj.show();
      }
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "add":
          return this.getView();
        case "auto":
          return this.resetData();
        case "modify":
          return this.modifyData();
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.contents {
  float: left;
  height: 98.5%;
  width: 99%;
  margin-left: 0.4%;
  margin-right: 0.4%;
}
.top_box {
  background: #fff;
  margin: 0px 25px 0px 25px;
}
.wrap_box {
  background: #ebebeb;
  padding: 25px 0px 55px 0px;
  position: relative;
}
#zwibbler {
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
  border: 1px solid #d4d4d4;
}

.savecom {
  position: absolute;
  left: 60px;
  top: 10px;
}
.opencom {
  position: absolute;
  left: 120px;
  top: 10px;
}
.helpcom {
  position: absolute;
  left: 10px;
  top: 10px;
}
/*笔刷*/
.brush_box {
  z-index: 20;
  background-color: #fff;
  width: 380px;
  height: 50px;
  left: 32%;
  bottom: 53px;
  position: absolute;
  border-bottom: 4px solid #344e31;
}
.brush_box .brush_width {
  width: 100px;
  height: 50px;
  position: absolute;
  left: 10px;
  top: 0px;
}
.brush_box .brush_width a {
  cursor: pointer;
  border: 1px solid #fff;
  width: 25px;
  height: 25px;
  display: inline-block;
  margin-top: 12px;
  margin-left: 2px;
  color: #333;
}
/*.brush_box .brush_width a{cursor:pointer;border:1px solid #fff;width: 25px;height: 25px;display: inline-block;margin-top: 12px;margin-left: 2px;}*/
.brush_box .brush_width a:hover {
  border: 1px solid #aaaaaa;
  color: #ff6600;
}
.brush_box .brush_width a.current {
  border: 1px solid #aaaaaa;
  background-color: #aaaaaa;
}
.brush_box .brush_width i {
  background-color: none;
  position: absolute;
}
.brush_box .brush_width .brush_min {
  width: 6px;
  height: 6px;
  border-radius: 6px 6px;
  top: 23px;
  left: 12px;
}
.brush_box .brush_width .brush_midd {
  width: 8px;
  height: 8px;
  border-radius: 8px 8px;
  top: 22px;
  left: 46px;
}
.brush_box .brush_width .brush_max {
  width: 10px;
  height: 10px;
  border-radius: 10px 10px;
  top: 21px;
  left: 76px;
}
.brush_box .brush_width .font_min {
  width: 6px;
  height: 6px;
  top: 14px;
  left: 10px;
  font-size: 16px;
  text-decoration: none;
  font-style: normal;
  font-family: "Microsoft YaHei";
}
.brush_box .brush_width .font_midd {
  width: 8px;
  height: 8px;
  top: 10px;
  left: 42px;
  font-size: 20px;
  text-decoration: none;
  font-style: normal;
  font-family: "Microsoft YaHei";
}
.brush_box .brush_width .font_max {
  width: 10px;
  height: 10px;
  top: 8px;
  left: 73px;
  font-size: 24px;
  text-decoration: none;
  font-style: normal;
  font-family: "Microsoft YaHei";
}

.brush_box .brush_line {
  width: 70px;
  height: 50px;
  position: absolute;
  left: 110px;
  top: 0px;
}
.brush_box .brush_line a {
  cursor: pointer;
  border: 1px solid #fff;
  width: 25px;
  height: 25px;
  display: inline-block;
  margin-top: 12px;
  margin-left: 2px;
}
.brush_box .brush_line a:hover {
  background-color: #ccc;
}
.brush_box .brush_line a.current {
  background-color: #ccc;
}
.brush_box .brush_line i {
  background-color: none;
  position: absolute;
}
.brush_box .brush_line .line_min {
  width: 24px;
  height: 24px;
  top: 13px;
  left: 8px;
  font-size: 16px;
  border: 0px solid #aaaaaa;
}
.brush_box .brush_line .line_midd {
  width: 24px;
  height: 24px;
  top: 13px;
  left: 3px;
  font-size: 16px;
  border: 1px solid #aaaaaa;
}
.brush_box .brush_line .line_max {
  width: 24px;
  height: 24px;
  top: 13px;
  left: 35px;
  font-size: 16px;
  border: 1px dashed #aaaaaa;
}
.brush_box .brush_value {
  width: 160px;
  height: 50px;
  position: absolute;
  left: 200px;
  top: 0px;
}
.brush_box .demonstration {
  float:left;
  display:block;
  width: 40px;
  margin-top:16px;
}
.brush_box #skewX-control{
  width:100px;
  float:left;
  margin-top:23px;
  margin-top:14px\0;
}

.brush_box .brush_color {
  width: 160px;
  height: 50px;
  position: absolute;
  left: 180px;
  top: 0px;
}
.brush_box .brush_color .show_color {
  width: 50px;
  height: 50px;
  float: left;
}
.brush_box .brush_color .show_color i {
  width: 37px;
  height: 37px;
  float: left;
  margin-top: 6px;
  margin-left: 3px;
  border: 1px solid #000;
}
.brush_box .brush_color .select_color {
  width: 110px;
  height: 50px;
  float: left;
}
.brush_box .brush_color .select_color i {
  width: 12px;
  height: 12px;
  float: left;
  margin-top: 5px;
  margin-right: 2px;
  border: 1px solid #000;
  padding: 2px;
  cursor: pointer;
}
.brush_box .brush_color .select_color i:hover {
  border: 1px solid #fff;
}

/*文本*/
.text_box {
  z-index: 20;
  background-color: #fff;
  width: 260px;
  height: 50px;
  left: 37%;
  bottom: 63px;
  position: absolute;
  border-bottom: 4px solid #344e31;
}
.text_color {
  width: 160px;
  height: 50px;
  float: right;
  margin-top: -50px;
}
.text_color .show_color {
  width: 50px;
  height: 50px;
  float: left;
}
.text_color .show_color i {
  width: 37px;
  height: 37px;
  float: left;
  margin-top: 6px;
  margin-left: 3px;
  border: 1px solid #000;
}
.text_color .select_color {
  width: 110px;
  height: 50px;
  float: left;
}
.text_color .select_color i {
  width: 12px;
  height: 12px;
  float: left;
  margin-top: 5px;
  margin-right: 2px;
  border: 1px solid #000;
  padding: 2px;
}
.text_color .select_color i:hover {
  border: 1px solid #fff;
}

/*工具*/
.tools {
  position: absolute;
  height: 60px;
  width: 100%;
  background: linear-gradient(#ffffff, #eef3fa);
  left: 0px;
}
.tools ul {
  width: auto;
  text-align: center;
  height: 50px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
}
.tools li {
  display: inline;
}
.tools li em {
  cursor: pointer;
  width: 50px;
  height: 40px;
  display: inline-block;
}
.tools li em.pick {
  background: url(./../../../theme/project/images/icon1.png) no-repeat center;
}
.tools li em.pick.current {
  background: url(./../../../theme/project/images/icon1.png) no-repeat center
    #dddddd;
}
.tools li em.graph {
  background: url(./../../../theme/project/images/icon2.png) no-repeat center;
}
.tools li em.graph.current {
  background: url(./../../../theme/project/images/icon2.png) no-repeat center
    #dddddd;
}
.tools li em.rectangle {
  background: url(./../../../theme/project/images/icon13.png) no-repeat center;
}
.tools li em.rectangle.current {
  background: url(./../../../theme/project/images/icon13.png) no-repeat center
    #dddddd;
}
.tools li em.text {
  background: url(./../../../theme/project/images/icon3.png) no-repeat center;
}
.tools li em.text.current {
  background: url(./../../../theme/project/images/icon3.png) no-repeat center
    #dddddd;
}
.tools li em.brush {
  background: url(./../../../theme/project/images/icon4.png) no-repeat center;
}
.tools li em.brush.current {
  background: url(./../../../theme/project/images/icon4.png) no-repeat center
    #dddddd;
}
.tools li em.zindexup {
  background: url(./../../../theme/project/images/icon5.png) no-repeat center;
}
.tools li em.zindexup.current {
  background: url(./../../../theme/project/images/icon5.png) no-repeat center
    #dddddd;
}
.tools li em.zindexdown {
  background: url(./../../../theme/project/images/icon6.png) no-repeat center;
}
.tools li em.zindexdown.current {
  background: url(./../../../theme/project/images/icon6.png) no-repeat center
    #dddddd;
}
.tools li em.zoombig {
  background: url(./../../../theme/project/images/icon7.png) no-repeat center;
}
.tools li em.zoombig.current {
  background: url(./../../../theme/project/images/icon7.png) no-repeat center
    #dddddd;
}
.tools li em.zoomsmall {
  background: url(./../../../theme/project/images/icon8.png) no-repeat center;
}
.tools li em.zoomsmall.current {
  background: url(./../../../theme/project/images/icon8.png) no-repeat center
    #dddddd;
}
.tools li em.return {
  background: url(./../../../theme/project/images/icon9.png) no-repeat center;
}
.tools li em.return.current {
  background: url(./../../../theme/project/images/icon9.png) no-repeat center
    #dddddd;
}
.tools li em.delete {
  background: url(./../../../theme/project/images/icon12.png) no-repeat center;
}
.tools li em.delete.current {
  background: url(./../../../theme/project/images/icon12.png) no-repeat center
    #dddddd;
}
.tools li em.open {
  background: url(./../../../theme/project/images/icon10.png) no-repeat center;
}
.tools li em.save {
  background: url(./../../../theme/project/images/icon11.png) no-repeat center;
}
.tools li em.help {
  background: url(./../../../theme/project/images/icon14.png) no-repeat center;
}
.vertical {
  width: 18px;
  vertical-align: middle;
  margin-right:8px;
}
/deep/ .el-color-picker__trigger {
  margin-top: 6px;
  border: 0px;
}
.hide {
  display: none;
}
.tooltip {
  position: fixed;
  background-color: white;
  z-index: 998;
  width: 280px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 3px #00000085;
}
  /* input range */
  .crop-range {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 160px;
 
    background-color: #f0f0f0;
    cursor: pointer;
    appearance: none;
    border-radius: 10px;
    outline: none;
    /* 公用滑条样式 */
    @mixin track-style {
      height: 6px;
      border-radius: 3px;
      appearance: none;  //去除自带的滑条样式
    }
    /* 公用滑块样式 */
    @mixin thumb-style {
      box-shadow: 0 .125em .125em #666666;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border: 4px solid #409EFF;
      border-radius: 50%;
      box-sizing: border-box;
      appearance: none; //去除自带的滑块样式
    }
    &::-ms-track { //ie滑条
      @include track-style;
      border-color: transparent; //去除原有边框
      color: transparent; //去除轨道内的竖线
      padding: 10px 0;
      background-color: #fff;
    }
    &::-webkit-slider-runnable-track { //chrome滑条
      @include track-style;
    }
    &::moz-range-track {//firefox滑条
      @include track-style;
      outline: none;
      background-color: #fff;
    }
    &::-ms-fill-lower {//ie滑条已填充部分
      border-radius: 10px;
      background: #409EFF;
    }
    &::-ms-fill-upper {//ie滑条未填充部分
      border-radius: 10px;
      background: #f0f0f0;
    }
    &::-moz-range-progress {//firefox滑条渐变
      outline: none;
      height: 6px;
      background: linear-gradient(to right, #409EFF, #409EFF 100%, #f0f0f0);
      border-radius: 3px;
    }
    &::-ms-thumb {//ie滑块
      @include thumb-style;
      margin-top: -3px;
      border-radius: 50%;
    }
    &::-moz-range-thumb {//firefox滑块
      @include thumb-style;
      margin-top: -7px;
    }
    &::-webkit-slider-thumb {//chrome滑块
      @include thumb-style;
      margin-top: -7px;
    }
    &::-moz-focus-outer { //firefox去input range 的outline
      border: 0;
    }
  }
</style>

