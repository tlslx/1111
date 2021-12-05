<template>
  <el-form :ref="name" :model="form" :data-url="apiUrl.data" :update-url="apiUrl.update" :add-url="apiUrl.add"
    :before-submit="beforeSubmit" @submit-success="onSubmitSuccess">
    <el-row v-for="row in editColumns" :key="row.rowIndex">
      <el-form-col v-for="column in row.columns" :key="column.field" :label="column.title + '：'" :prop="column.field"
        :required="column.required" :span="column.span || 12">
        <component :is="column.component" v-model="form[column.field]" :options="column.options"
          :type="column.multiple ? 'textarea': null" :disabled="isView" :data-dictionary="column.dataDictionary">
        </component>
      </el-form-col>
    </el-row>
  </el-form>
</template>

<script>
import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
export default {
  mixins: [dialogPageBase],
  props: {
    tableName: { type: String, required: true },
    primaryKey: { type: String, required: true },
    editColumns: {},
    beforeSubmit: Function,
    afterSubmit: Function,
    afterAdd: Function,
    afterEdit: Function
  },
  data () {
    return {
      pageId: this.tableName,
      apiUrl: {
        add: '/api/' + this.tableName + '/add',
        update: '/api/' + this.tableName + '/updateById',
        data: '/api/' + this.tableName + '/getSingleById'
      },
      form: {}
    };
  },
  created () {
    this.form[this.primaryKey] = '';
    this.editColumns.forEach((row) => {
      row.columns.forEach((column) => {
        this.form[column.field] = column.defaultValue || '';
      });
    });
  },
  methods: {
    onSubmitSuccess (data) {
      if (this.$utility.isFunction(this.afterSubmit)) {
        this.afterSubmit(data);
        if (!this.isEdit && this.$utility.isFunction(this.afterAdd)) {
          this.afterAdd(data);
        } else if (this.isEdit && this.$utility.isFunction(this.afterEdit)) {
          this.afterEdit(data);
        }
      }
    }
  }
};
</script>
