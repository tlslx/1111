<template>
  <el-tree-picker v-model="pickerValue"
    :url="url"
    :tree-query-params="treeQueryParams"
    :sort="sort"
    :root-id="rootId"
    :multiple="multiple"
    :default-expand-keys="defaultExpandKeys"
    :value-field="valueField"
    :text-field="textField"
    :parent-field="parentField"
    dialog-title="部门选择器"
    :size="size"
    :clearable="clearable"
    :disabled="disabled"
    @clear="onClear"
    @change="onChange"
    :merge-checked-nodes="mergeCheckedNodes"
    :showcheckbox="showcheckbox"
    :expand-on-click-node="expandOnClickNode"
    :tree-params="treeParams"
  >
  </el-tree-picker>
</template>

<script>
export default {
  name: "ElOuPicker",
  props: {
    value: {},
    rootId: { type: String, default: "0" },
    multiple: Boolean,
    size: String,
    clearable: { type: Boolean, default: true },
    mergeCheckedNodes: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    showcheckbox: { type: Boolean, default: true },
    expandOnClickNode: { type: Boolean, default: true },
    treeParams: { type: Array, default: () => [] }
  },
  data() {
    return {
      // url: process.env.API_COMS_URL + "/api/common/sysOrg/getListAll",
      url: kindo.config.api.upms + "/api/sysDepartment/getListAll",
      textField: "deptName",
      valueField: "deptId",
      parentField: "parentId",
      pickerValue: this.value,
      treeQueryParams: this.treeParams.concat([{ Name: "State", FindType: "EQ", Values: ["1"] }]),
      sort: "orderNo",
      defaultExpandKeys: [
        "cd08bdeb2bd84091901da4f39637c94d",
        "8a706d0898954e4c910fb73769bd4ae9"
      ]
    };
  },
  methods: {
    onClear() {
      this.$emit("clear");
    },
    onChange(value, text, objs) {
      this.$emit("change", value, text, objs);
    }
  },
  watch: {
    value: function() {
      this.pickerValue = this.value;
    },
    pickerValue: function() {
      this.$emit("input", this.pickerValue);
    }
  }
};
</script>
