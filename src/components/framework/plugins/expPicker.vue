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
    dialog-title="选择器" 
    :size="size"
    :clearable="clearable" 
    @clear="onClear" 
    @change="onChange" 
    :merge-checked-nodes="mergeCheckedNodes">
  </el-tree-picker>
</template>

<script>
export default {
  name: "ElExpPicker",
  props: {
    value: {},
    rootId: { type: String, default: "0" },
    multiple: Boolean,
    size: String,
    clearable: { type: Boolean, default: true },
    mergeCheckedNodes: { type: Boolean, default: false }
  },
  data() {
    return {
      // url: process.env.API_COMS_URL + "/api/common/sysOrg/getListAll",
      url: kindo.config.api.upms + "/api/sysDepartment/getListAll",
      textField: "deptName",
      valueField: "deptId",
      parentField: "parentId",
      pickerValue: this.value,
      treeQueryParams: [{ Name: "State", FindType: "EQ", Values: ["1"] }],
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
<style lang="scss" scoped>
  .el-tree-picker{
    width: 200px!important;
    /deep/ .el-input__inner{
      padding-right:0px!important;
    }
  }
</style>
