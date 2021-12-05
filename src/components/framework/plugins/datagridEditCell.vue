<template>
  <div class="el-datagrid-edit-cell">
    <template v-if="isEdit">
      <slot></slot>
    </template>
    <template v-else><slot name="view">{{cellText}}</slot></template>
  </div>
</template>

<script>
export default {
  name: "ElDatagridEditCell",
  props: {
    operationField: { type: String, default: "operType" },
    props: {}
  },
  data() {
    return {};
  },
  computed: {
    isEdit() {
      return (
        this.props.row[this.operationField] 
        === this.$utility.operationType.edit 
        || this.props.row[this.operationField] === this.$utility.operationType.add
      );
    },
    cellText() {
      if (
        typeof (this.props.column.formatter) !== 'undefined' 
        && typeof (this.props.column.formatter) === "function"
      ) {
        return this.props.column.formatter(
          this.props.row,
          this.props.column,
          this.props.row[this.props.column.property]
        );
      } else {
        return this.props.row[this.props.column.property];
      }
    }
  }
};
</script>
