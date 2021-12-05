<template>
  <el-dialog class="el-tree-picker-dialog" :title="dialogTitle"
    v-model="dialogVisible" :visible.sync="dialogVisible" size="tiny" :modal="true" top="30px">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-scrollbar :wrap-style="[{height: '450px'}]">
      <el-tree-view ref="tree" :lazy="true" :url="url"
        :custom-params="treeQueryParams" :sort="sort"
        :multiple="multiple"
        :root-id="rootId" :text-field="textField" :value-field="valueField"
        :parent-field="parentField"
        iconCls="glyphicon glyphicon-folder-close" :accordion="true"
        :show-checkbox="showcheckbox"
        @node-click="onTreeNodeClick"
        :default-expand-keys="defaultExpandKeys"
        :expand-on-click-node="expandOnClickNode"
        :disabled="disabled" 
        :filter-node-method="filterNode">
      </el-tree-view>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onConfirmClick" type="info">确定</el-button>
      <el-button @click="onCancelClick">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PickerDialogBase from "../mixins/pickerDialogBase";
export default {
  name: "ElTreeDialog",
  mixins: [PickerDialogBase],
  props: {
    treeQueryParams: { type: Array, default: () => [] },
    sort: String,
    parentField: { type: String },
    rootId: String,
    defaultExpandKeys: Array,
    mergeCheckedNodes: { type: Boolean, default: false },
    showcheckbox: { type: Boolean, default: true },
    getchild: { type: Boolean, default: false },
    expandOnClickNode: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      checkedNodes: [],
      selectNode: [],
      filterText: ''
    };
  },
  methods: {
    onTreeNodeClick(data, node, component) {
      this.selectNode = [];
      if (data) {
        this.selectNode.push(data);
      }
    },
    onCancelClick() {
      this.dialogVisible = false;
    },
    onConfirmClick() {
      this.dialogVisible = false;
      if (this.showcheckbox) {
        this.$emit("selection-change", this.getCheckedNodes());
      } else {
        this.$emit("selection-click", this.getOneNodes());
      }
    },
    getOneNodes() {
      return this.selectNode;
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.deptName.indexOf(value) !== -1;
    },
    getCheckedNodes() {
      this.checkedNodes = [];
      let checkedNodes = this.$refs["tree"].getCheckedNodes();
      if (this.multiple && !this.mergeCheckedNodes) {
        if (this.getchild) {
          checkedNodes.forEach(node => {
            if (!this.isNewParentChecked(checkedNodes, node[this.valueField], node[this.parentField])) {
              this.checkedNodes.push(node);
            }
          });
          if (this.checkedNodes.length === 0) {
            kindo.util.alert("请先展开勾选子菜单", "提示", "warning");
          }
        } else {
          this.checkedNodes = checkedNodes;
        }
      } else {
        checkedNodes.forEach(node => {
          if (!this.isParentChecked(checkedNodes, node[this.parentField])) {
            this.checkedNodes.push(node);
          }
        });
      }
      return this.checkedNodes;
    },
    isParentChecked(checkedNodes, parentId) {
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        if (checkedNodes[i][this.valueField] === parentId) {
          return true;
        }
      }
      return false;
    },
    isNewParentChecked(checkedNodes, itemId, pId) {
      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        if (checkedNodes[i][this.parentField] === itemId || pId == null) {
          return true;
        }
      }
      return false;
    }
  },
  watch: {
    selection(newValue) {
      this.checkedNodes = [].concat(newValue);
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    dialogVisible(newValue) {
      this.filterText = '';
      if (newValue) {
        this.checkedNodes = [].concat(this.selection); // 为了选择后点取消后再次打开时恢复默认选中状态
        this.$nextTick(() => {
          // console.info(this.$refs["tree"]);
          this.$refs["tree"].setCheckedNodes(this.checkedNodes);
        });
      }
      // if (!this.showcheckbox) {
      //   if (newValue) {
      //     this.checkedNodes = [].concat(this.selection); // 为了选择后点取消后再次打开时恢复默认选中状态
      //     this.$nextTick(() => {
      //       // console.info(this.$refs["tree"]);
      //       this.$refs["tree"].setCheckedNodes(this.checkedNodes);
      //     });
      //   }
      // }
    }
  }
};
</script>

<style>
.el-tree-picker-dialog .el-dialog {
  width: 400px;
}
.el-tree-picker-dialog .el-dialog__body {
  padding: 8px;
}
.el-tree-picker-dialog .el-dialog__body .el-scrollbar {
  border: 1px solid #d1dbe5;
  box-sizing: border-box;
}
.el-tree-picker-dialog .el-dialog__body .el-tree {
  box-sizing: border-box;
  border: 0px;
  display: inline-block;
  min-width: 100%;
}
</style>
