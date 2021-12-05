<template>
  <el-datagrid-picker v-model="componentValue" :multiple="multiple" :columns="columns" :size="size" :clearable="clearable"
    :url="url" :value-field="valueField" :text-field="textField" dialog-title="JCIS用户选择器"
    :tree-url="treeUrl" :tree-value-field="treeValueField" :tree-text-field="treeTextField"
    :tree-parent-field="treeParentField" :tree-root-id="treeRootId" :tree-default-expand-keys="treeDefaultExpandKeys">
  </el-datagrid-picker>
</template>

<script>
export default {
  name: 'ElUserPickerJcis',
  props: {
    value: {},
    multiple: Boolean,
    size: String,
    clearable: { type: Boolean, default: true }
  },
  data () {
    return {
      componentValue: '',
      url: '/api/sysUser/getListPage',
      valueField: 'id',
      textField: 'name',
      treeUrl: '/api/sysOrg/getListAll',
      treeValueField: 'id',
      treeTextField: 'name',
      treeParentField: 'parentId',
      treeRootId: '',
      treeDefaultExpandKeys: ['51B09512E4994831B7F7D899D7FCF002'],
      columns: [
        { field: 'name', title: '姓名', width: '120', sortable: true },
        { field: 'sex', title: '性别', width: '70', sortable: true, formatter: this.sexFormatter },
        { field: 'workDeptname', title: '部门', sortable: true },
        { field: 'oaPositionType', title: '岗位类型', width: '100', sortable: true }
      ]
    };
  },
  created () {
    this.initComponentValue(this.value);
  },
  methods: {
    initComponentValue (value) {
      if (this.multiple) {
        this.componentValue = value || [];
      } else {
        this.componentValue = value || '';
      }
    },
    sexFormatter (row) {
      return row.sex === '1' ? '男' : '女';
    }
  },
  watch: {
    componentValue (newValue) {
      this.$emit('input', newValue);
    },
    value (newValue) {
      this.initComponentValue(newValue);
    }
  }
};
</script>
