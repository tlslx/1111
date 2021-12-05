export default {
  props: {
    id: String,
    tableName: { type: String, required: true },
    primaryKey: { type: String, required: true },
    columns: { type: Array, required: true },
    customButtons: Array,
    beforeAdd: Function,
    afterAdd: Function,
    beforeDelete: Function,
    afterDelete: Function,
    beforeEdit: Function,
    afterEdit: Function,
    beforeSubmit: Function,
    afterSubmit: Function
  },
  data () {
    return {
      queryParams: [],
      tableColumns: [],
      queryColumns: [],
      editColumns: [],
      apiUrl: {
        query: '/api/' + this.tableName + '/getListPage',
        del: '/api/' + this.tableName + '/deleteBatchIds',
        exp: '',
        print: ''
      }
    };
  },
  created () {
    // 初始化列数据
    this.columns.forEach((column) => {
      // 表格列
      let tableColumn = {
        field: column.field,
        title: column.title,
        width: column.width,
        sortable: column.sortable ? 'custom' : false
      };
      if (typeof this.dataDictionary[tableColumn.field] !== 'undefined') {
        tableColumn.formatter = (row, col) => {
          let data = this.dataDictionary[tableColumn.field];
          for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].value === row[tableColumn.field]) {
              return data[i].text;
            }
          }
        };
      }
      this.tableColumns.push(tableColumn);
      // 查询列
      if (column.queryable) {
        let queryColumn = {
          field: column.field,
          title: column.title,
          findType: this.$utility.getFieldTypeFind(column.fieldType),
          component: this.$utility.getFieldTypeComponent(column.fieldType),
          dataDictionary: column.field
        };
        this.queryColumns.push(queryColumn);
      }
      // 编辑列
      if (column.editable) {
        let row = this.findEditRow(column.rowIndex);
        if (row == null) {
          row = { rowIndex: column.rowIndex, columns: [] };
          this.editColumns.push(row);
        }

        let editColumn = {
          field: column.field,
          title: column.title,
          component: this.$utility.getFieldTypeComponent(column.fieldType),
          required: column.required,
          span: column.span || 12,
          defaultValue: column.defaultValue,
          dataDictionary: column.field
        };
        if (column.fieldType === 'textarea') {
          editColumn.multiple = true;
        }
        row.columns.push(editColumn);
      }
    });
  },
  computed: {
    datagrid () {
      return this.$refs['datagrid'];
    },
    form () {
      return this.$refs['editpage'].$refs['page'].form;
    }
  },
  methods: {
    findEditRow (rowIndex) {
      for (let i = 0, len = this.editColumns.length; i < len; i++) {
        if (this.editColumns[i].rowIndex === rowIndex) {
          return this.editColumns[i];
        }
      }
      return null;
    }
  }
};
