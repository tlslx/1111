<template>
  <el-tree ref="tree" :data="treeData" :lazy="lazy"
    :props="treeProps"
    :load="load"
    :node-key="valueField"
    :render-content="renderContent"
    :highlight-current="highlightCurrent"
    :show-checkbox="showCheckbox"
    :accordion="accordion"
    :expand-on-click-node="expandOnClickNode"
    :current-node-key="treeCurrentNodeKey"
    @node-click="onNodeClick"
    @check-change="onCheckChange"
    @current-change="onCurrentChange"
    @node-expand="onNodeExpand"
    @node-collapse="onNodeCollapse"
    :default-expanded-keys="defaultExpandKeys"
    :filter-node-method="filterNodeMethod"
    auto-expand-parent
    :default-expand-all="defaultExpandAll"
    :default-checked-keys="defaultCheckedKeys">
  </el-tree>
</template>

<script>
export default {
  name: "ElTreeView",
  props: {
    data: { type: Array, default: () => [] },
    url: String,
    customParams: { type: Array, default: () => [] },
    params: { type: Object, default: () => { } },
    sort: String,
    order: { type: String, default: "asc" },
    valueField: { type: String, default: "value" },
    textField: { type: String, default: "text" },
    parentField: { type: String, default: "parent" },
    childrenField: { type: String, default: "children" },
    rootId: String,
    lazy: { type: Boolean, default: true },
    highlightCurrent: Boolean,
    iconCls: String,
    showCheckbox: Boolean,
    expandOnClickNode: { type: Boolean, default: true },
    currentNodeKey: { type: [String, Number] },
    accordion: Boolean,
    multiple: { type: Boolean, default: true },
    defaultExpandKeys: Array,
    defaultCheckedKeys: Array,
    customRenderContent: { type: Function },
    filterNodeMethod: { type: Function },
    defaultExpandAll: { type: Boolean, default: false }
  },
  data() {
    return {
      treeProps: {
        label: this.textField,
        children: this.childrenField,
        disabled: "disabled",
        icon: "icon"
      },
      treeData: this.data,
      treeDataMap: {},
      treeStore: null,
      treeCurrentNodeKey: this.currentNodeKey,
      checkedNodes: [],
      checkedKeys: [],
      loadedNodeMap: {},
      singleCheckTimeObject: null,
      singleCheckChangedNodes: [],
      isSingleChecking: false
    };
  },
  methods: {
    filter(val) {
      this.$refs["tree"].filter(val);
    },
    load(node, resolve) {
      let rootId = this.rootId;
      if (node.level !== 0) {
        rootId = node.data[this.valueField];
        this.customParams = this.customParams.filter(item => item.Name !== 'DEPT_ID');
      }
      if (this.loadedNodeMap[rootId]) {
        // 模拟异步返回数据
        let _this = this;
        setTimeout(() => {
          return resolve(_this.loadedNodeMap[rootId]);
        }, 10);
      }
      let queryParams = null;
      if (!String.isNullOrEmpty(rootId)) {
        // rootId为-1时，不按parentId查询
        let customQueryParams = rootId === '-1' ? [] : [].concat([
          {
            Name: this.parentField,
            FindType: "EQ",
            Values: [rootId]
          }
        ]);
        queryParams = {
          OrderModelField: [
            {
              OrderByField: this.sort || this.valueField,
              asc: this.order === "ascending" || this.order === "asc"
            }
          ],
          CustomQueryParams: customQueryParams.concat(this.customParams),
          queryParams: this.params
        };
      } else {
        rootId = "root";
        queryParams = {
          OrderModelField: [
            {
              OrderByField: this.sort || this.valueField,
              asc: this.order === "ascending" || this.order === "asc"
            }
          ],
          CustomQueryParams: [
            {
              Name: this.parentField,
              FindType: "IS_NULL",
              Values: []
            }
          ].concat(this.customParams),
          queryParams: this.params
        };
      }
      //rootId为-1时，删除字段为DEPT_ID的查询条件
      if (rootId === '-1') {
        this.$emit("handle-params", this.customParams);
      }
      // customParams
      this.loadedNodeMap[rootId] = [];
      this.$http.get(this.url, { json: queryParams }).then(data => {
        if (node.level === 0 && this.checkedKeys.length > 0) {
          this.loadDefaultNodes();
        }
        this.loadedNodeMap[rootId] = data.records;
        return resolve(data.records);
      });
    },
    renderContent(h, { node, data, store }) {
      if (this.treeStore == null) {
        this.treeStore = store;
      }
      this.treeDataMap[data[this.valueField]] = data;
      if (this.$utility.isFunction(this.customRenderContent)) {
        return this.customRenderContent(node, data, store);
      } else if (!this.$utility.isFunction(this.customRenderContent)) {
        if (!String.isNullOrEmpty(this.iconCls)) {
          return (
            <span class='el-tree-node__label'>
              <i class={"el-tree-node__label-icon " + this.iconCls} />
              {data[this.textField]}
            </span>
          );
        } else {
          return (
            <span class='el-tree-node__label'>{data[this.textField]}</span>
          );
        }
      }
    },
    loadDefaultNodes() {
      this.$nextTick(() => {
        this.getAllParentKeys(defaultLoadKeys => {
          this.loadNode(defaultLoadKeys, 1, () => {
            this.$nextTick(() => {
              this.$refs["tree"].setCheckedNodes(this.checkedNodes);
            });
          });
        });
      });
    },
    loadNode(defaultLoadKeys, itemIndex, fn) {
      if (defaultLoadKeys.length === 0) {
        if (typeof fn === "function") {
          fn();
        }
        return;
      }

      let key = defaultLoadKeys[itemIndex - 1];
      let _itemIndex = itemIndex;
      if (this.treeDataMap[key]) {
        let treeNode = this.treeStore.getNode(this.treeDataMap[key]);
        if (treeNode) {
          if (!treeNode.loaded) {
            this.treeStore.load(treeNode, childrenNodes => {
              childrenNodes.forEach(node => {
                this.treeStore.append(node, treeNode.data);
              });
              treeNode.loaded = true;
              // 加载所有默认节点，设置默认选中
              if (_itemIndex === defaultLoadKeys.length) {
                if (typeof fn === "function") {
                  fn();
                }
              } else {
                this.$nextTick(() => {
                  this.loadNode(defaultLoadKeys, ++_itemIndex, fn);
                });
              }
            });
          } else if (treeNode.loaded) {
            if (_itemIndex === defaultLoadKeys.length) {
              if (typeof fn === "function") {
                fn();
              }
            } else {
              this.loadNode(defaultLoadKeys, ++_itemIndex, fn);
            }
          }
        }
      }
    },
    getAllParentKeys(fn) {
      let defaultLoadKeys = [];
      let completeCount = 0;
      this.checkedKeys.forEach(key => {
        this.getParentKeys(defaultLoadKeys, key, () => {
          completeCount++;
          if (completeCount === this.checkedKeys.length) {
            if (typeof fn === "function") {
              fn(defaultLoadKeys);
            }
          }
        });
      });
    },
    getParentKeys(defaultLoadKeys, key, fn) {
      if (this.treeDataMap[key]) {
        if (typeof fn === "function") {
          fn();
        }
        return;
      }
      this.$http
        .get(this.url, {
          json: {
            CustomQueryParams: [
              { Name: this.valueField, FindType: "EQ", Values: [key] }
            ]
          }
        })
        .then(data => {
          if (
            data.records.length > 0
            && !String.isNullOrEmpty(data.records[0][this.parentField])
            && data.records[0][this.parentField] !== this.rootId
          ) {
            defaultLoadKeys.unshift(data.records[0][this.parentField]);
            this.getParentKeys(
              defaultLoadKeys,
              data.records[0][this.parentField],
              fn
            );
          } else if (data.records.length <= 0
            || String.isNullOrEmpty(data.records[0][this.parentField])
            || data.records[0][this.parentField] === this.rootId) {
            if (typeof fn === "function") {
              fn();
            }
          }
        });
    },
    getCheckedNodes(isLeafOnly) {
      return this.$refs["tree"].getCheckedNodes(isLeafOnly);
    },
    getCheckedKeys(isLeafOnly) {
      return this.$refs["tree"].getCheckedKeys(isLeafOnly);
    },
    getHalfCheckedNodes() {
      return this.$refs["tree"].getHalfCheckedNodes();
    },
    getHalfCheckedKeys() {
      return this.$refs["tree"].getHalfCheckedKeys();
    },
    getAllCheckedNodes(isLeafOnly) {
      var checkedNodes = this.$refs["tree"].getCheckedNodes(isLeafOnly);
      var halfCheckedNodes = this.$refs["tree"].getHalfCheckedNodes();
      return checkedNodes.concat(halfCheckedNodes);
    },
    getAllCheckedKeys(isLeafOnly) {
      var checkedKeys = this.$refs["tree"].getCheckedKeys(isLeafOnly);
      var halfCheckedKeys = this.$refs["tree"].getHalfCheckedKeys();
      return checkedKeys.concat(halfCheckedKeys);
    },
    setCheckedNodes(checkedNodes) {
      if (this.lazy && this.showCheckbox) {
        this.checkedNodes = checkedNodes;
        if (this.treeStore != null) {
          if (this.checkedNodes.length > 0) {
            this.$nextTick(() => {
              this.loadDefaultNodes();
            });
          } else {
            this.$refs["tree"].setCheckedNodes(checkedNodes);
            this.isSetCheckedNodes = false;
          }
        } else {
          this.isSetCheckedNodes = false;
        }
      } else {
        this.$refs["tree"].setCheckedNodes(checkedNodes);
      }
    },
    setCheckedKeys(keys) {
      this.$refs["tree"].setCheckedKeys(keys);
    },
    setChecked(node, checked, deep) {
      this.$refs["tree"].setChecked(node, checked, deep);
    },
    setSingleChecked() {
      this.isSingleChecking = true;
      let checkedNodes = [];
      if (this.singleCheckChangedNodes.length === 1) {
        checkedNodes.push(this.singleCheckChangedNodes[0].data);
      } else if (this.singleCheckChangedNodes.length !== 1) {
        if (this.singleCheckChangedNodes[0].checked) {
          checkedNodes.push(this.singleCheckChangedNodes[0].data);
        } else if (
          this.singleCheckChangedNodes[this.singleCheckChangedNodes.length - 1]
            .checked
        ) {
          let index = this.singleCheckChangedNodes.length - 1;
          checkedNodes.push(this.singleCheckChangedNodes[index].data);
        }
      }
      if (checkedNodes.length > 0) {
        this.$refs["tree"].setCheckedNodes(checkedNodes);
      } else {
        this.$nextTick(() => {
          if (this.getCheckedNodes().length > 0) {
            this.$refs["tree"].setCheckedNodes([]);
          }
        });
      }
      this.$nextTick(() => {
        this.singleCheckChangedNodes = [];
        this.isSingleChecking = false;
      });
    },
    onNodeClick(data, node, component) {
      this.$emit("node-click", data, node, component);
    },
    onCheckChange(data, checked, childrenChecked) {
      if (!this.multiple && !this.isSingleChecking) {
        if (this.singleCheckTimeObject != null) {
          clearTimeout(this.singleCheckTimeObject);
        }
        this.singleCheckChangedNodes.push({ data, checked });
        let _this = this;
        this.singleCheckTimeObject = setTimeout(() => {
          _this.setSingleChecked();
        }, 30);
      }
      this.$emit("check-change", data, checked, childrenChecked);
    },
    onCurrentChange(data, node) {
      this.$emit("current-change", data, node);
    },
    onNodeExpand(data, node, component) {
      this.$emit("node-expand", data, node, component);
    },
    onNodeCollapse(data, node, component) {
      this.$emit("node-collapse", data, node, component);
    }
  },
  watch: {
    currentNodeKey() {
      this.treeCurrentNodeKey = this.currentNodeKey;
    },
    data() {
      this.treeData = this.data;
    },
    checkedNodes() {
      this.checkedKeys = [];
      this.checkedNodes.forEach(node => {
        this.checkedKeys.push(node[this.valueField]);
      });
    }
  }
};
</script>

<style>
.el-tree-node__label .el-tree-node__label-icon {
  top: -1px;
  margin-right: 5px;
  color: orange;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #eff1da;
}
</style>
