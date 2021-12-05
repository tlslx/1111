
<style scoped>
.pagger-container {
  padding: 10px 0;
}
.underline-red {
  margin: 0px 4px 0 0;
  cursor: pointer;
  text-decoration: underline;
  color: #d80c18;
}
.underline-blue {
  margin: 0px 4px 0 0;
  cursor: pointer;
  text-decoration: underline;
  color: #2b579a;
}
.table-img {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
</style>
<template>
  <div class="cust-table-root" v-loading="loading">
    <!-- <div class="title-content">{{title}}</div>
    <div class="something-container">
      <slot></slot>
    </div> -->
    <el-table :data="data.data" :id="data.id" stripe border size="mini" :show-summary="data.showSummary" :summary-method="getSummaries" @selection-change="handleSelectionChange" @select="selectRow" class="cust-table-table" :header-cell-style="tableHeaderColor">
      <template v-if="data.selection">
        <el-table-column type="selection" :selectable="isSelectable" width="55">
        </el-table-column>
      </template>
      <template v-if="index">
        <el-table-column type="index" :index="indexMethod" label="序号" width="50">
        </el-table-column>
      </template>
      <template v-for="(colItem, key) in cols">
        <template v-if="colItem.type === 'expand'">
          <el-table-column type="expand" :key="colItem.type">
            <template slot-scope="props1">
              <el-form label-position="left" inline class="inner-table-expand">
                <el-form-item :label="item1.label" v-for="(item1, key1) in colItem.info" :key="key1">
                  <span>{{ props1.row[key][key1] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="colItem.type === 'img'">
          <el-table-column v-if="colItem.multiPics" :key="key" :label="colItem.label" :width="colItem.width" :fixed="colItem.fixed" align="center">
            <template slot-scope="scope">
              <img v-for="imgUrl in scope.row[colItem.prop]" :key="imgUrl" :src="imgUrl" class="table-img" @click="toBigPic(imgUrl)">
            </template>
          </el-table-column>
          <el-table-column v-else-if="colItem.containImage" :key="key" :label="colItem.label" :width="colItem.width" :fixed="colItem.fixed" align="center">
            <template slot-scope="scope">
              <img :src="scope.row[colItem.prop]" class="table-img" @click="toBoost(scope)">
            </template>
          </el-table-column>
          <el-table-column v-else :key="key" :label="colItem.label" :width="colItem.width" :fixed="colItem.fixed" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl" class="table-img" @click="toBoost(scope)">
            </template>
          </el-table-column>
        </template>
        <template v-else-if="colItem.containMultiLine">
          <el-table-column :key="key" :label="colItem.label" :width="colItem.width" :fixed="colItem.fixed" align="center">
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row[colItem.prop]" :key="'multiline' + index">
                <div>{{item}}</div>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="colItem.type === 'operator'">
          <el-table-column :key="key" :label="colItem.label" :width="colItem.width" :fixed="colItem.fixed" align="center">
            <template slot-scope="scope">
              <!-- 改变文字状态开始 -->
              <template v-if="colItem.changeStatus">
                <span :class="scope.row.class" :style="scope.row.style" v-if="scope.row.canBeClick" @click="dealWithEvent(scope, colItem.prop)">{{ scope.row[colItem.prop] }}</span>
                <span :class="scope.row.class" :style="scope.row.style" v-else>{{ scope.row[colItem.prop] }}</span>
              </template>
              <!-- 改变文字状态结束 -->
              <!-- 根据不同条件显示不同按钮绑定不同点击事件开始 -->
              <template v-if="colItem.changeByCondition">
                <span v-for="btnValue in colItem.btns" :key="btnValue.type" v-show="scope.row[btnValue.type]" :class="scope.row.class" v-bind:data-src="scope[colItem.prop]" @click="dealWithDiffEvent(btnValue.type, scope, colItem.prop)">
                  <span v-if="btnValue.type==='download'?(!!scope.row[colItem.prop]):true"> {{ btnValue.label }} </span>
                </span>
              </template>
              <!-- 根据不同条件显示不同按钮绑定不同点击事件结束 -->
              <template v-else v-for="(btnItem, index) in colItem.btns">
                <cust-pic-view :key="index" v-if="btnItem.type === 'file'" :has-file="btnItem.hasFile(scope.row)" :file-param="btnItem.fileParam(scope.row)">
                </cust-pic-view>
                <span v-else-if="btnItem.type === 'underlineText'" :class="kindo.config.theme === 'blue' ? 'underline-blue': 'underline-red'" :key="index" :style="btnItem.style" @click="dealWithOperate(scope, btnItem.prop, btnItem.label)">
                  {{btnItem.label}}
                </span>
                <el-button v-else size="mini" :key="index" v-show="!btnItem.isShow || (btnItem.isShow && btnItem.isShow(scope.row))" :type="btnItem.type" @click="btnItem.onClick(scope.row)">
                  {{btnItem.label}}
                </el-button>
              </template>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="colItem.childs">
          <el-table-column :key="key" :prop="colItem.prop" :label="colItem.label" :width="colItem.width" :sortable="colItem.sortable" align="center">
            <el-table-column v-for="(colItem1, key1) in colItem.childs" :key="key1" :prop="colItem1.prop" :label="colItem1.label" :width="colItem1.width" :sortable="colItem1.sortable" align="center">
              <el-table-column v-for="(colItem2, key2) in colItem1.childs" :key="key2" :prop="colItem2.prop" :label="colItem2.label" :width="colItem2.width" :sortable="colItem2.sortable" align="center">
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </template>
        <template v-else-if="colItem.hoverLabel">
          <el-table-column :key="key" :prop="key" :label="colItem.label" :width="colItem.width" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" :key="key" :content="colItem.hoverLabel" placement="top-start">
                <span>{{scope.row[key]}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :key="key" :prop="colItem.prop" :label="colItem.label" :width="colItem.width" :sortable="colItem.sortable" align="center">
            <template slot-scope="scope">
              <span :style="colItem.style">{{scope.row[colItem.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: () => ""
    },
    data: {
      default: () => ({
        id: null,
        data: [],
        summaryArray: []
      })
    },
    cols: {
      default: () => { }
    },
    index: {
      type: [Boolean, Number],
      default: false
    },
    loading: false,
    isSelectable: {
      type: Function,
      default: () => {
        return true;
      }
    }
  },
  data() {
    return {
    };
  },
  created() {

  },
  mounted() {

  },
  watch: {
    data: {
      handler: function (newVal) {
        // this.$forceUpdate();

      },
      deep: true
    }
  },
  methods: {
    indexMethod(index) {
      if (this.index) {
        return index + this.index;
      }
    },
    getSummaries() {
      return this.data.summaryArray;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('change-multiple-selection', val);
    },
    selectRow(selection, row) {
    },
    dealWithOperate(scope, prop, value) {
      this.$emit('deal-with-operate', scope, prop, value);
    },
    // 改变状态
    dealWithEvent(scope, prop) {
      this.$emit('deal-with-event', scope, prop);
    },
    // 根据不同的按钮处理不同的事件
    dealWithDiffEvent(eventType, scope, prop) {
      this.$emit('deal-with-diff-event', eventType, scope, prop);
    },
    // 单图预览大图
    toBoost(scope) {
      this.$emit('to-boost', scope);
    },
    // 多图预览大图
    toBigPic(url) {
      this.$emit('to-show-big-pic', url);
    },
    // 添加表头样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    }
  }
};
</script>




