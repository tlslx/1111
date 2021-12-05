<template>
  <el-datagrid ref="dg" class="el-treegrid"
    :data="gridData"
    :height="height"
    :query-params="queryParams"
    :row-key="rowKey"
    :default-sort="defaultSort"
    :base-url="baseUrl"
    :data-url="dataUrl"
    :delete-url="deleteUrl"
    :pagination="false"
    :row-class-name="rowClassName"
    :data-load-handler="dataLoadHandler"
    :loaded-scroll-top="false"
    :show-checkbox="showCheckbox"
    @load-success="onLoadSuccess"
    @delete-success="onDeleteSuccess">
    <slot></slot>
  </el-datagrid>
</template>

<script>
export default {
  name: "ElTreegrid",
  props: {
    height: {},
    rowKey: String,
    parentKey: String,
    rootId: "",
    baseUrl: "",
    dataUrl: {},
    deleteUrl: "",
    defaultSort: {},
    data: { type: Array, default: () => [] },
    lazy: { type: Boolean, default: false },
    defaultCollapse: { type: Boolean, default: true },
    defaultExpandKeys: { type: Array, default: () => [] },
    showCheckbox: { type: Boolean, default: false },
    treeQueryParams: {},
    leafField: { type: String, default: "isLeaf" },
    leafFieldValues: { type: Array, default: () => ["1"] }
  },
  data() {
    return {
      queryParams: [],
      originalData: this.data || [],
      gridData: [],
      gridDataMap: {},
      deleteRows: [],
      treegrid: true,
      loadingNode: null,
      expandKeys: this.defaultExpandKeys || []
    };
  },
  created() {
    this.initTreegridData();
    if (this.lazy) {
      this.initQueryParams();
    }
    this.$root.$on("reloadDatagrid", datagrid => {
      if (datagrid === this.$vnode.data.ref) {
        this.reload();
      }
    });
  },
  methods: {
    load() {
      this.gridData = [];
      this.gridDataMap = {};
      this.loadingNode = null;
      this.initQueryParams();
    },
    loadNode(row) {
      if (typeof row === "string") {
        this.loadingNode = this.gridDataMap[row];
        this.initQueryParams(row);
      } else {
        this.loadingNode = this.getNode(row);
        this.initQueryParams(row[this.rowKey]);
      }
    },
    reload() {
      this.load();
    },
    refresh() {
      this.load();
    },
    delete(row) {
      this.$refs["dg"].delete(row);
    },
    getDeleteRows(id, startIndex = 0) {
      let node = this.gridDataMap[id];
      let index = this.getGridDataIndex(id);
      this.deleteRows.push({
        rowKey: id,
        index: index
      });

      if (node.children) {
        node.children.forEach(item => {
          index++;
          this.getDeleteRows(item[this.rowKey], index);
        });
      }
    },
    onLoadSuccess(data) {
      this.$emit("load-success", data);
    },
    onDeleteSuccess() {
      //      for (let i = this.deleteRows.length - 1; i >= 0; i--) {
      //        this.gridData.splice(this.deleteRows[i].index, 1)
      //      }
      this.refresh();
      this.deleteRows = [];
      this.$emit("delete-success");
    },
    initQueryParams(parentId) {
      let tempQueryParams = [];
      if (!String.isNullOrEmpty(parentId)) {
        tempQueryParams = [
          { Name: this.parentKey, FindType: "EQ", Values: [parentId] }
        ];
      } else if (!String.isNullOrEmpty(this.rootId)) {
        tempQueryParams = [
          { Name: this.parentKey, FindType: "EQ", Values: [this.rootId] }
        ];
      } else {
        tempQueryParams = [
          { Name: this.parentKey, FindType: "IS_NULL", Values: [] }
        ];
      }
      tempQueryParams = tempQueryParams.concat(this.treeQueryParams);
      this.queryParams = tempQueryParams;
    },
    dataLoadHandler(data) {
      if (this.loadingNode != null) {
        this.appendTreegridData(data);
        this.loadingNode = null;
        // 加载默认展开节点
        for (let i = 0; i < data.length; i++) {
          let e = data[i];
          let key = e[this.rowKey];
          if (this.$utility.isInArray(this.expandKeys, key)) {
            let node = this.getNode(e);
            this.toggleNodeCollapse(node);
            this.loadNode(key);
            return;
          }
        }
      } else {
        this.originalData = data;
        this.initTreegridData();
        // 加载展开顶级节点
        for (let i = 0; i < data.length; i++) {
          let e = data[i];
          let key = e[this.rowKey];
          if (this.$utility.isInArray(this.expandKeys, key)) {
            let node = this.getNode(e);
            this.toggleNodeCollapse(node);
            this.loadNode(key);
            return;
          }
        }
      }
    },
    onNodeIconClick(row) {
      let node = this.getNode(row);
      this.toggleNodeCollapse(node);
      let id = row[this.rowKey];
      if (node.collapse) {
        this.$utility.removeArrayItem(this.expandKeys, id);
        this.$emit("collapse-row", row);
      } else {
        // 关闭其他同级节点
        let parentNodes = [];
        let parentId = row[this.parentKey];
        if (parentId === this.rootId) {
          for (let i = 0; this.gridData.length > i; i++) {
            let tempNode = this.gridData[i];
            if (parentId === tempNode[this.parentKey]) {
              parentNodes.push(tempNode);
            }
          }
        } else {
          let parentNode = this.getNode(parentId);
          if (!this.$utility.isEmpty(parentNode)) {
            parentNodes = parentNode.children;
          }
        }
        parentNodes.forEach(e => {
          var tempId = e[this.rowKey];
          if (id !== tempId) {
            this.getNode(e).collapse = true;
            this.$utility.removeArrayItem(this.expandKeys, tempId);
          }
        });

        if (!this.$utility.isInArray(this.expandKeys, id)) {
          this.expandKeys.push(id);
        }
        this.$emit("expand-row", row);
      }
      if (this.lazy && !node.children) {
        this.loadNode(row);
      } else {
        this.gridData = [].concat(this.gridData);
      }
    },
    toggleNodeCollapse(node, isChild = false) {
      node.collapse = !node.collapse;
    },
    rowLevel(row) {
      return this.getNode(row).level;
    },
    getNode(row) {
      let _row = row;
      if (typeof _row === "string") {
        return this.gridDataMap[_row];
      } else {
        if (!this.$utility.isEmpty(_row.row)) {
          _row = _row.row;
        }
        return this.gridDataMap[_row[this.rowKey]];
      }
    },
    rowClassName(row) {
      if (this.isParentCollapse(row)) {
        return "el-treegrid-tr hide";
      } else {
        return "el-treegrid-tr";
      }
    },
    isCollapse(row) {
      let node = this.getNode(row);
      let isParentCollapse = this.isParentCollapse(row);
      return isParentCollapse || node.collapse;
    },
    hasChildren(row) {
      let node = this.getNode(row);
      if (node.children == null || typeof node.children === 'undefined') {
        if (this.lazy) {
          if (
            this.$utility.isInArray(this.leafFieldValues, row[this.leafField])
          ) {
            // if (row[this.leafField] == "1") {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        return node.children.length !== 0;
      }
    },
    isParentCollapse(row) {
      let isCollapse = false;
      let node = this.getNode(row);
      while (!String.isNullOrEmpty(node.parent)) {
        node = this.gridDataMap[node.parent];
        if (node.collapse) {
          isCollapse = true;
          break;
        }
      }
      return isCollapse;
    },
    initTreegridData() {
      this.gridDataMap = {};
      let gridData = [];
      if (!this.originalData) {
        return gridData;
      }
      this.originalData.forEach(item => {
        this.appendItem(gridData, item, "", 0);
      });
      this.gridData = gridData;
    },
    appendTreegridData(data) {
      let id = this.loadingNode[this.rowKey];
      this.gridDataMap[id].children = data;
      this.gridDataMap[id].hasChildren = data.length !== 0;

      if (data.length === 0) {
        this.gridData = [].concat(this.gridData);
        return;
      }

      let index = this.getGridDataIndex(id);
      if (index !== -1) {
        data.forEach(item => {
          index++;
          let itemIndex = this.getGridDataIndex(item[this.rowKey], index);
          if (itemIndex === -1) {
            this.gridData.splice(index, 0, item); // 添加数据
          } else {
            this.gridData[itemIndex] = item; // 数据修改
          }

          this.gridDataMap[item[this.rowKey]] = Object.assign(
            {
              parent: this.loadingNode[this.rowKey],
              level: this.loadingNode.level + 1,
              collapse: this.defaultCollapse
            },
            item
          );
        });
      }
    },
    getGridDataIndex(value, startIndex = 0) {
      let index = -1;
      for (let i = startIndex, len = this.gridData.length; i < len; i++) {
        if (this.gridData[i][this.rowKey] === value) {
          index = i;
          break;
        }
      }
      return index;
    },
    appendChildrenData(gridData, data, parent, level) {
      data.forEach(item => {
        this.appendItem(gridData, item, parent, level);
      });
    },
    appendItem(gridData, item, parent, level) {
      let rowKey = item[this.rowKey];
      let _level = level;
      this.gridDataMap[rowKey] = Object.assign(
        {
          parent: parent,
          level: level,
          collapse: this.defaultCollapse
        },
        item
      );
      gridData.push(item);
      if (item.children) {
        this.appendChildrenData(
          gridData,
          item.children,
          item[this.rowKey],
          ++_level
        );
      }
    },
    getRows() {
      return this.$refs["dg"].getRows();
    },
    getRow(row) {
      return this.$refs["dg"].getRow(row);
    },
    getSelection() {
      return this.$refs["dg"].selection;
    },
    getRowKeyValue(row) {
      let id = row[this.rowKey];
      return id;
    }
  },
  watch: {
    data: {
      deep: true,
      handler: function(value) {
        this.originalData = value;
      }
    },
    treeQueryParams() {
      this.refresh();
    }
  }
};
</script>

<style>
.el-treegrid .el-treegrid-tr.hide {
  display: none;
}
.el-treegrid .el-treegrid-node-text,
.el-treegrid .el-treegrid-node-icon {
  display: inline-block;
  vertical-align: middle;
}
.el-treegrid .el-treegrid-node-icon {
  padding: 0px;
  border-radius: 3px;
  width: 14px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  font-size: 12px;
  color: #ada9a9;
}
.el-treegrid .el-treegrid-node-icon > i {
  transition: 0.3s;
}
.el-treegrid .el-treegrid-node-icon > i.collapse {
  transform: rotate(-90deg);
}
.el-treegrid .el-treegrid-node-span {
  display: inline-block;
  width: 16px;
  height: 20px;
  vertical-align: middle;
}
</style>
