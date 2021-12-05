import { TableColumn } from 'element-ui';
TableColumn.props.dictProp = { type: String, default: '' };
if (TableColumn.watch) {
  TableColumn.watch = Object.assign(TableColumn.watch, {
    dictProp: function (newVal) {
      if (this.columnConfig) {
        this.columnConfig.dictProp = newVal;
      }
    }
  });
}
export default TableColumn;

