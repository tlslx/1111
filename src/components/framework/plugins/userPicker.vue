<template>
  <el-datagrid-picker v-model="componentValue" :multiple="multiple" :columns="columns" :size="size" :clearable="clearable"
    :url="url" :value-field="valueField" 
    :text-field="textField" 
    :query-params="queryParams"
    dialog-title="用户选择器"
    :tree-url="treeUrl" :tree-value-field="treeValueField" 
    :tree-text-field="treeTextField"
    :tree-parent-field="treeParentField" 
    :tree-root-id="treeRootId" 
    :tree-grid-relate-key-name="treeGridRelateKeyName"
    :tree-default-expand-keys="treeDefaultExpandKeys"
    @clear="onClear" @change="onChange" :disabled="disabled">
  </el-datagrid-picker>
</template>

<script>
export default {
  name: "ElUserPicker",
  props: {
    value: {},
    multiple: Boolean,
    size: String,
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true }
  },
  data() {
    return {
      componentValue: "",
      url: process.env.API_COMS_URL + "/api/common/sysUser/getListPage",
      valueField: "id",
      textField: "name",
      treeUrl: process.env.API_COMS_URL + "/api/common/sysOrg/getListAll",
      treeValueField: "id",
      treeTextField: "name",
      treeParentField: "parentId",
      treeRootId: "0",
      treeDefaultExpandKeys: ["51B09512E4994831B7F7D899D7FCF002"],
      treeGridRelateKeyName: "TopDeptId",
      customParams: [],
      queryParams: [
        {
          Name: "oaState",
          FindType: "EQ",
          Values: ["1"]
        }
      ],
      columns: [
        { field: "name", title: "姓名", width: "120", sortable: true },
        {
          field: "sex",
          title: "性别",
          width: "70",
          sortable: true,
          formatter: this.sexFormatter
        },
        { field: "oaDeptName", title: "部门", sortable: true },
        {
          field: "oaPositionType",
          title: "岗位类型",
          width: "100",
          sortable: true
        }
      ]
    };
  },
  created() {
    this.initComponentValue(this.value);
  },
  methods: {
    initComponentValue(value) {
      if (this.multiple) {
        this.componentValue = value || [];
      } else {
        this.componentValue = value || "";
      }
    },
    sexFormatter(row) {
      return row.sex === "1" ? "男" : "女";
    },
    onClear() {
      this.$emit("clear");
    },
    onChange(value, text) {
      this.$emit("change", value, text);
    }
  },
  watch: {
    componentValue(newValue) {
      this.$emit("input", newValue);
    },
    value(newValue) {
      this.initComponentValue(newValue);
    }
  }
};
</script>
