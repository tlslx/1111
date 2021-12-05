<template>
  <div class="el-treegrid-column">
    <span v-for="item in rowLevel(props.row)" :key="item" class="el-treegrid-node-span"></span>
    <span class="el-treegrid-node-icon" @click="onIconClick(props.row)">
      <template v-if="hasChildren(props.row)">
        <i class="el-icon-caret-bottom" :class="{'collapse': isCollapse(props.row)}"></i>
      </template>
    </span>
    <span class="el-treegrid-node-text">{{props.row[field]}}</span>
  </div>
</template>

<script>
export default {
  name: "ElTreegridCell",
  props: {
    props: {},
    field: {}
  },
  data() {
    return {
      treegrid: null
    };
  },
  created() {
    this.treegrid = this.getTreegrid();
  },
  methods: {
    getTreegrid() {
      let _this = this;
      let component = _this;
      while (component && !component.treegrid) {
        component = component.$parent;
      }
      return component;
    },
    onIconClick(row) {
      if (this.treegrid) {
        this.treegrid.onNodeIconClick(row);
      }
    },
    isCollapse(row) {
      if (this.treegrid) {
        return this.treegrid.isCollapse(row);
      } else {
        return true;
      }
    },
    hasChildren(row) {
      if (this.treegrid) {
        let hasChildren = this.treegrid.hasChildren(row);
        // let node = this.treegrid.getNode(row);
        // var keyValue = this.treegrid.getRowKeyValue(row);
        // if (
        //   this.$utility.isInArray(this.treegrid.expandKeys, keyValue) &&
        //   typeof node.children === 'undefined' &&
        //   this.isCollapse(row)
        // ) {
        //   this.onIconClick(row);
        // }
        return hasChildren;
      } else {
        return false;
      }
    },
    rowLevel(row) {
      if (this.treegrid) {
        return this.treegrid.rowLevel(row);
      } else {
        return 0;
      }
    }
  }
};
</script>
