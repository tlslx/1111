<template>
  <el-dialog class="el-datagrid-picker-dialog" :title="dialogTitle" v-model="dialogVisible" width="50%" :modal="true" top="30px">
    <div class="el-datagrid-picker-container">
      <div class="left" v-if="treeUrl!==undefined" :style="{width:treeWidth+'%'}">
        <el-scrollbar :wrap-style="[{height: treeHeight + 'px'}]">
          <el-tree-view ref="tree" class="el-datagrid-picker-tree"
            iconCls="glyphicon glyphicon-folder-close" highlightCurrent 
            :url="treeUrl" :root-id="treeRootId" 
            :text-field="treeTextField" 
            :value-field="treeValueField" 
            :parent-field="treeParentField"
            @node-click="onTreeNodeClick"
            :expand-on-click-node="true" 
            :accordion="true" 
            :lazy="true" 
            :default-expand-keys="treeDefaultExpandKeys">
          </el-tree-view>
        </el-scrollbar>
      </div>
      <div class="right" :style="{width:rightWidth}">
        <el-input ref="keyword" v-model="keyword" 
          placeholder="输入关键字搜索" icon="search" 
          style="margin-bottom:8px;" @click="onQuery"></el-input>
        <el-datagrid ref="datagrid" 
          :height="datagridHeight" click-row-to-select 
          :pagination="pagination" 
          :query-params="queryParams" 
          :custom-params="customParams"
          :default-sort="defaultSort"
          :row-key="valueField" 
          :data-url="url" 
          @select="onSelect" 
          @load-success="onLoadSuccess" 
          @row-click="onRowClick" 
          @select-all="onSelectAll" 
          :single-select="!multiple">
          <el-table-column v-for="item in columns" 
            :key="item.field" 
            :prop="item.field" 
            :label="item.title" 
            :width="item.width" 
            :sortable="item.sortable ? 'custome' : false" 
            :formatter="item.formatter"></el-table-column>
        </el-datagrid>
        <div class="el-datagrid-picker__tags" v-if="multiple" ref="tags">
          <el-scrollbar :wrap-style="[{height:'115px'}]">
            <transition-group>
              <el-tag v-for="(item, index) in gridSelection" 
                  :key="item[valueField]" 
                  :closable="true" type="primary" 
                  @close="removeSelection(index)" close-transition>
                <span class="el-select__tags-text">{{ item[textField] }}</span>
              </el-tag>
            </transition-group>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onConfirmClick" type="info">确定</el-button>
      <el-button @click="onCancelClick">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import $ from "jquery";
export default {
  name: "ElDatagridDialog",
  props: {
    url: { type: String, required: true },
    valueField: { type: String, required: true },
    textField: { type: String, required: true },
    treeGridRelateKey: { type: String },
    treeUrl: { type: String },
    treeValueField: { type: String },
    treeTextField: { type: String },
    treeParentField: { type: String, default: "parentId" },
    treeRootId: String,
    treeDefaultExpandKeys: Array,
    columns: Array,
    multiple: { type: Boolean, default: true },
    pagination: { type: Boolean, default: true },
    selection: {},
    customParams: {},
    dialogTitle: { type: String, default: "选择器" },
    defaultQueryParams: {}
  },
  data() {
    return {
      keyword: "",
      treeId: "",
      datagridHeight: this.multiple ? 300 : 400,
      queryParams: [],
      defaultSort: {},
      dialogVisible: false,
      gridData: null,
      gridSelection: null,
      treeHeight: this.multiple ? 467 : 460,
      treeWidth: 26,
      isAddEnterQueryEvent: false,
      treeGridRelateKeyName: this.treeGridRelateKey
    };
  },
  mounted() {
    this.setQueryParams();
  },
  methods: {
    onQuery() {
      this.setQueryParams();
    },
    onCancelClick() {
      this.dialogVisible = false;
    },
    onConfirmClick() {
      this.dialogVisible = false;
      this.$emit("selection-change", this.gridSelection);
    },
    onSelect(selection, row) {
      if (this.multiple) {
        this.toggleRowSelection(row);
      } else {
        this.gridSelection = [row];
      }
    },
    onSelectAll(selection) {
      if (this.multiple) {
        if (selection.length > 0) {
          this.gridData.forEach(row => {
            let index = this.getSelectionIndex(row);
            if (index === -1) {
              this.gridSelection.push(row);
            }
          });
        } else {
          this.gridData.forEach(row => {
            let index = this.getSelectionIndex(row);
            if (index > -1) {
              this.gridSelection.splice(index, 1);
            }
          });
        }
      }
    },
    onLoadSuccess(data) {
      this.gridData = data;
      if (this.dialogVisible) {
        this.clearSelection();
        this.setSelection();
      }
    },
    onRowClick(row, event, column) {
      if (event.target.className.indexOf("el-checkbox") > -1) {
        return;
      }
      if (this.multiple) {
        this.toggleRowSelection(row);
      } else {
        this.gridSelection = [row];
      }
    },
    onTreeNodeClick(data, node, component) {
      let $node = $(component.$el);
      if (this.treeId === data[this.treeValueField]) {
        this.treeId = "";
        $node.removeClass("is-current");
      } else {
        this.treeId = data[this.treeValueField];
        $node.addClass("is-current");
      }
      this.setQueryParams();
    },
    clearSelection() {
      if (this.$refs["datagrid"]) {
        this.$refs["datagrid"].clearSelection();
      }
    },
    toggleRowSelection(row) {
      let index = this.getSelectionIndex(row);
      if (index > -1) {
        this.gridSelection.splice(index, 1);
      } else {
        this.gridSelection.push(row);
      }
    },
    setSelection() {
      if (typeof this.gridSelection === 'undefined' || this.gridSelection == null) {
        return;
      }
      this.gridSelection.forEach(row => {
        for (let i = 0, len = this.gridData.length; i < len; i++) {
          if (this.gridData[i][this.valueField] === row[this.valueField]) {
            this.$refs["datagrid"].toggleRowSelection(this.gridData[i], true);
            break;
          }
        }
      });
    },
    getSelectionIndex(row) {
      for (let i = 0, len = this.gridSelection.length; i < len; i++) {
        if (this.gridSelection[i][this.valueField] === row[this.valueField]) {
          return i;
        }
      }
      return -1;
    },
    removeSelection(index) {
      let row = this.gridSelection[index];
      for (let i = 0, len = this.gridData.length; i < len; i++) {
        if (this.gridData[i][this.valueField] === row[this.valueField]) {
          this.$refs["datagrid"].toggleRowSelection(this.gridData[i]);
          break;
        }
      }
      this.gridSelection.splice(index, 1);
    },
    setQueryParams() {
      this.queryParams = [];

      if (this.$utility.isNotEmpty(this.defaultQueryParams)) {
        this.queryParams = this.queryParams.concat(this.defaultQueryParams);
      }
      if (!String.isNullOrEmpty(this.keyword)) {
        this.queryParams.push({
          Name: this.textField,
          FindType: "LIKE",
          Values: [this.keyword]
        });
      }
      // console.info(this.treeGridRelateKeyName);
      if (String.isNullOrEmpty(this.treeGridRelateKeyName)) {
        this.treeGridRelateKeyName = this.treeValueField;
      }
      if (!String.isNullOrEmpty(this.treeId)) {
        this.queryParams.push({
          Name: this.treeGridRelateKeyName,
          FindType: "IN",
          Values: [this.treeId]
        });
      } else if (!String.isNullOrEmpty(this.treeRootId)) {
        this.queryParams.push({
          Name: this.treeGridRelateKeyName,
          FindType: "IN",
          Values: [this.treeRootId]
        });
      }
    }
  },
  computed: {
    rightWidth() {
      if (!String.isNullOrEmpty(this.treeUrl)) {
        return 100 - this.treeWidth + "%";
      } else {
        return "100%";
      }
    }
  },
  watch: {
    selection(newValue) {
      this.gridSelection = [].concat(newValue);
    },
    dialogVisible(newValue) {
      if (newValue && this.gridData != null) {
        this.gridSelection = [].concat(this.selection); // 为了选择后点取消后再次打开时恢复默认选中状态
        this.clearSelection();
        this.setSelection();
      }
      if (!this.isAddEnterQueryEvent) {
        this.$nextTick(() => {
          this.$refs["keyword"].$el.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
              this.onQuery();
            }
          });
          this.isAddEnterQueryEvent = true;
        });
      }
      if (newValue) {
        this.setQueryParams();
      }
    },
    queryParams: {
      deep: true,
      handler(newValue) {
        if (this.$refs["datagrid"]) {
          this.$refs["datagrid"].refresh();
        }
      }
    }
  }
};
</script>

<style>
.el-datagrid-picker-dialog .el-dialog {
  width: 850px;
  margin-left: -425px;
  transform: translateX(0px);
}
.el-datagrid-picker-dialog .el-dialog__body {
  padding: 8px;
}

.el-datagrid-picker-dialog .el-datagrid-picker__tags {
  margin-top: 8px;
  padding: 0px;
  box-sizing: border-box;
}
.el-datagrid-picker-dialog .el-datagrid-picker__tags .el-scrollbar {
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.el-datagrid-picker-dialog .el-datagrid-picker__tags .el-scrollbar__wrap {
  height: 115px;
}
.el-datagrid-picker-dialog .el-datagrid-picker__tags .el-scrollbar__view {
  padding: 3px 6px 3px 0px;
  box-sizing: border-box;
}

.el-datagrid-picker-dialog .el-datagrid-picker__tags .el-tag {
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  margin: 3px 0 3px 6px;
}

.el-datagrid-picker-container {
  box-sizing: border-box;
  overflow: hidden;
}
.el-datagrid-picker-container::after {
  content: "";
  clear: both;
}
.el-datagrid-picker-container .left {
  width: 26%;
  float: left;
  box-sizing: border-box;
  padding-right: 8px;
  border-radius: 3px;
}
.el-datagrid-picker-container .right {
  float: left;
  width: 74%;
}
.el-datagrid-picker-container .left .el-scrollbar {
  border: 1px solid #d1dbe5;
  box-sizing: border-box;
}
.el-datagrid-picker-tree {
  box-sizing: border-box;
  border: 0px;
  display: inline-block;
  min-width: 100%;
}
</style>
