<template>
  <el-tree-picker v-model="pickerValue" 
    :highlight-current="highlightCurrent"
    :url="url" 
    :tree-query-params="treeQueryParams"
    :sort="sort"
    :root-id="rootId" 
    :multiple="multiple" 
    :default-expand-keys="defaultExpandKeys"
    :value-field="valueField" 
    :text-field="textField" 
    :parent-field="parentField"
    :showcheckbox="showcheckbox"
    :getchild="getchild"
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
  name: "ElExphallPicker",
  props: {
    value: {},
    rootId: { type: String, default: "0" },
    multiple: Boolean, // 是否多选列表
    size: String,
    clearable: { type: Boolean, default: true },
    showcheckbox: Boolean, // 是否显示勾选项
    getchild: Boolean, // 是否只选取子集
    mergeCheckedNodes: { type: Boolean, default: false }
  },
  data() {
    return {
      url: kindo.config.api.expUrl + "/api/exphallprivilege/getHallList",
      textField: "parilionCode",
      valueField: "dataDictId",
      parentField: "dataDictParentId",
      highlightCurrent: true,
      pickerValue: this.value,
      treeQueryParams: [],
      sort: "dataDictId",
      defaultExpandKeys: [] // "1", "2", "4"
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
