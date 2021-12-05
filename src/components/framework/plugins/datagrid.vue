<template>
  <div class="el-datagrid" :class="{'el-datagrid-single-select': singleSelect }" v-loading="loading" :element-loading-text="loadingText">
    <el-table ref="table" size="small" 
      :row-key="rowKey" 
      :data="gridData" stripe border 
      :height="tableHeight" 
      :default-sort="defaultSort" 
      @sort-change="onSortChange"
      @select="onSelect" 
      @selection-change="onSelectionChange" 
      @row-click="onRowClick" 
      @row-dblclick="onRowDblClick" 
      @select-all="onSelectAll"
      @cell-click="onCellClick" 
      @cell-dblclick="onCellDblClick" 
      @cell-mouse-enter="onCellMouseEnter" 
      @cell-mouse-leave="onCellMouseLeave"
      @row-contextmenu="onRowContextMenu" 
      @header-click="onHeaderClick" 
      @filter-change="onFilterChange" 
      :row-class-name="rowClassName"
      :highlight-current-row="isHighlightCurrentRow" 
      :current-row-key="gridCurrentRowKey" 
      @current-change="onCurrentChange"
      :cell-style="rowClass"
      >
      <el-table-column v-if="showCheckbox" 
        type="selection" 
        :reserve-selection="true" 
        width="40" 
        class-name="el-datagird-checkbox-column">
      </el-table-column>
      <el-table-column v-if="editable" width="80" 
        :render-header="datagridEditHeader">
        <template slot-scope="scope">
          <template v-if="!isRowEdit(scope.row)">
            <el-button v-right.edit icon="el-icon-edit" type="primary" @click.stop="editRow(scope.row)"></el-button>
            <!-- <el-button v-right.delete icon="el-icon-delete" type="danger" @click.stop="deleteRow(scope.row, scope.$index)"></el-button> -->
            <el-button v-right.delete icon="el-icon-delete" type="danger" @click.stop="delRow(scope.row, scope.$index)"></el-button>
          </template>
          <template v-else>
            <el-button type="warning" :loading="saving" icon="el-icon-check" @click.stop="saveRow(scope.row, scope.$index)"></el-button>
            <el-button type="info" :loading="deletting" icon="el-icon-close" @click.stop="cancelEdit(scope.row, scope.$index)"></el-button>
          </template>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="pagination-block" v-if="showBottom">
      <!-- <el-feedback class="feedback"/> 去掉评价报障功能-->
      <el-pagination ref="pagination" 
        @size-change="onSizeChange" 
        @current-change="onPageChange" 
        v-if="pagination"
        :page-size="gridPageSize" 
        :page-sizes="pageSizes" 
        :current-page="gridPageIndex" 
        :layout="layout" 
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import sysFeedback from "./sysFeedback.vue";
export default {
  name: "ElDatagrid",
  props: {
    value: {},
    rowKey: { type: String },
    height: { type: Number, default: 300 },
    showBottom: { type: Boolean, default: true },
    pageSize: { type: Number, default: 30 },
    pageSizes: { type: Array, default: () => [10, 30, 50, 100, 150] },
    baseUrl: { type: String, default: "" },
    dataUrl: String,
    deleteUrl: String,
    addUrl: String,
    updateUrl: String,
    data: {},
    dataHandler: Function,
    editable: Boolean,
    addable: { type: Boolean, default: true },
    operationField: { type: String, default: "operType" },
    beforeRowAdd: Function,
    afterRowSave: Function,
    afterRowDelete: Function,
    right: { type: Function }, // 绑定页面检查权限方法
    validator: Function, // 保存时的验证方法，返回false取消保存
    singleSelect: Boolean,
    clickRowToSelect: Boolean,
    defaultQueryParams: { 
      type: Array, 
      default: function() { 
        return [];
      }
    }, // 默认查询条件
    queryParams: {
      type: Array, 
      default: function() { 
        return [];
      }
    },
    oneShotParams: {
      type: Array, 
      default: function() { 
        return [];
      }
    },
    customParams: {},
    defaultSort: {},
    loadingText: { type: String, default: "" },
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper, ->, total, slot"
    },
    pagination: { type: Boolean, default: true },
    showCheckbox: { type: Boolean, default: true },
    deleteConfirmMessage: { type: String, default: "您确认要删除所选数据吗？" },
    highlightCurrentRow: Boolean,
    currentRowKey: {},
    rowClassName: {},
    defaultRowData: {},
    dataLoadHandler: { type: Function },
    loadedScrollTop: { type: Boolean, default: true }
  },
  data() {
    return {
      tableHeight: this.height,
      loading: false,
      saving: false,
      deletting: false,
      gridPageIndex: 1,
      gridPageSize: this.pageSize,
      gridData: this.data,
      gridCurrentRowKey: this.currentRowKey,
      total: 0,
      sort: "",
      order: "",
      selection: [],
      editingRow: [],
      currentRow: null,
      operationData: this.value,
      tempOneShotParams: this.oneShotParams // 一次使用参数
    };
  },
  methods: {
    load() {
       // 合并默认查询条件和自定义查询条件
      let queryTemp = [];
      if (this.queryParams.length !== 0) {
        queryTemp = this.queryParams;
      }
      if (this.defaultQueryParams.length !== 0) {
        queryTemp = queryTemp.concat(this.defaultQueryParams);
      }
      let params = {
        OrderModelField: [
          {
            OrderByField: this.sort,
            asc: this.order === "ascending" || this.order === "asc"
          }
        ],
        CustomQueryParams: queryTemp, // 拼合后的查询条件
        QueryParams: this.customParams
      };
      if (this.pagination) {
        params.PageIndex = this.gridPageIndex;
        params.PageSize = this.gridPageSize;
      }
      let url = this.$utility.genServiceUrl(this.baseUrl, this.dataUrl);
      this.$http
        .get(url, { json: params })
        .then(data => {
          if (this.$utility.isFunction(this.dataLoadHandler)) {
            this.dataLoadHandler(data.records);
          } else {
            this.gridData = data.records;
          }
          this.total = data.total;
          this.loading = false;
          this.$emit("load-success", data.records);
          if (this.loadedScrollTop) {
            this.scrollTop();
          }
        })
        .catch(msg => {
          this.loading = false;
        });
    },
    reload() {
      this.loading = true;
    },
    refresh(queryParams) {
      this.tempOneShotParams = queryParams;
      this.gridPageIndex = 1;
      this.loading = true;
    },
    delete(row) {
      if (this.selection.length === 0 && typeof row === 'undefined') {
        this.$message.warning("请选择数据");
        return;
      } else if (String.isNullOrEmpty(this.rowKey)) {
        this.$message.error("Datagrid未设置RowKey属性");
        return;
      }
      let array = [];
      if (Array.isArray(row)) {
        array = row;
      } else if (typeof row !== 'undefined') {
        array.push(row[this.rowKey]);
      } else {
        this.selection.forEach(_row => {
          array.push(_row[this.rowKey]);
        });
      }
      this.$confirm(this.deleteConfirmMessage, "警告", { type: "warning" })
        .then(() => {
          this.deletting = true;
          let url = this.$utility.genServiceUrl(this.baseUrl, this.deleteUrl);
          this.$http
            .post(url, { json: JSON.stringify(array) })
            .then(() => {
              this.clearSelection();
              this.reload();
              this.$emit("delete-success", array);
              this.deletting = false;
            })
            .catch(msg => {
              if (!String.isNullOrEmpty(msg)) {
                this.$message.error(msg);
              }
              this.$emit("delete-error", msg);
              this.deletting = false;
            });
        })
        .catch(() => {});
    },
    datagridEditHeader(h, { column, $index }) {
      if (this.addable) {
        return (
          <el-button type='success' icon='el-icon-plus' onClick={this.onAdd} />
        );
      } else {
        return "操作";
      }
    },
    onAdd() {
      this.addRow();
    },
    isRowEdit(row) {
      return (
        row[this.operationField] === this.$utility.operationType.edit 
        || row[this.operationField] === this.$utility.operationType.add
        || row[this.operationField] === this.$utility.operationType.delete
      );
    },
    addRowData(row) {
      row[this.rowKey] = "";
      row[this.operationField] = this.$utility.operationType.add;

      if (typeof this.beforeRowAdd === "function") {
        this.beforeRowAdd(row);
      }
      if (this.currentRow) {
        let rowIndex = -1;
        for (let i = 0, len = this.gridData.length; i < len; i++) {
          if (this.gridData[i][this.rowKey] === this.currentRow[this.rowKey]) {
            rowIndex = i;
            break;
          }
        }
        this.gridData.splice(rowIndex + 1, 0, row);
      } else {
        this.gridData.unshift(row);
      }
      this.saveRow(row);
    },
    addRow() {
      let columns = this.$refs["table"].columns;
      let data = {};
      if (!this.$utility.isEmpty(this.defaultRowData)) {
        for (let key in this.defaultRowData) {
          data[key] = this.defaultRowData[key];
        }
      } else {
        columns.forEach(column => {
          if (!String.isNullOrEmpty(column.property)) {
            data[column.property] = "";
          }
        });
      }
      data[this.operationField] = this.$utility.operationType.add;
      // console.info(typeof this.beforeRowAdd);
      if (typeof this.beforeRowAdd === "function") {
        this.beforeRowAdd(data);
      }
      if (this.currentRow) {
        let rowIndex = -1;
        for (let i = 0, len = this.gridData.length; i < len; i++) {
          if (this.gridData[i][this.rowKey] === this.currentRow[this.rowKey]) {
            rowIndex = i;
            break;
          }
        }
        this.gridData.splice(rowIndex + 1, 0, data);
      } else {
        this.gridData.unshift(data);
      }
    },
    editRow(row) {
      // 查找是否有存在
      var _index = -1;
      var _this = this;
      _index = this.editingRow.findIndex(function (x) {
        return x[_this.rowKey] === row[_this.rowKey];
      });
      if (_index === -1) {
        this.editingRow.push(Object.assign({}, row));
      }
      // this.editingRow = Object.assign({}, row);
      row[this.operationField] = this.$utility.operationType.edit;
    },
    delRow(row, index) {
      row[this.operationField] = this.$utility.operationType.delete;
    },
    saveRow(row, index) {
      // console.log("提示", "开始保存数据");
      // debugger;
      let url = this.updateUrl;
      if (row[this.operationField] === this.$utility.operationType.add) {
        url = this.addUrl;
      }
      // 自定义数据处理方法
      if (typeof this.dataHandler === "function") {
        this.dataHandler(row, row[this.operationField], msg => {
          if (String.isNullOrEmpty(msg)) {
            row[this.operationField] = this.$utility.operationType.normal;
          } else {
            this.$message.error(msg);
          }
        });
        return;
      }
      // console.log("提示", "开始基类保存");
      // 数据验证
      if (typeof this.validator === "function") {
        if (this.validator(row) === false) {
          return;
        }
      }
      // 绑定操作数据实体
      if (this.operationData) {
        this.operationDataHandler(row, row[this.operationField], index);
        return;
      }
      // 调用API操作数据
      this.saving = true;
      url = this.$utility.genServiceUrl(this.baseUrl, url);
      this.$http
        .post(url, {
          json: JSON.stringify({
            formData: JSON.stringify(row),
            subTables: [],
            subTableNames: [],
            subTableLength: 0
          })
        })
        .then(data => {
          this.$nextTick(() => {
            this.saving = false;
          });
          if (row[this.operationField] === this.$utility.operationType.add) {
            Object.assign(row, data);
          }
          row[this.operationField] = this.$utility.operationType.normal;
        })
        .catch(error => {
          this.$message.error(error);
          this.$nextTick(() => {
            this.saving = false;
          });
        });
    },
    deleteRow(row, index) {
      // 自定义操作数据方法
      if (
        typeof this.dataHandler !== 'undefined' 
        && typeof this.dataHandler === "function"
      ) {
        this.dataHandler(row, this.$utility.operationType.delete, msg => {
          if (!String.isNullOrEmpty(msg)) {
            this.$message.error(msg);
          } else {
            this.gridData.splice(index, 1);
          }
        });
      } else if (this.operationData) {
        // 绑定操作数据实体
        this.operationDataHandler(
          row,
          this.$utility.operationType.delete,
          index
        );
      } else {
        this.delete(row);
      }
    },
    cancelEdit(row, index) {
      /*
      if (row[this.operationField] === this.$utility.operationType.add) {
        this.gridData.splice(index, 1);
      } else {
        Object.assign(row, this.editingRow);
        row[this.operationField] = this.$utility.operationType.normal;
      }
      */
      if (row[this.operationField] === this.$utility.operationType.add) {
        this.gridData.splice(index, 1);
      } else if (row[this.operationField] === this.$utility.operationType.edit) {
        // 查找对应的数据
        let _index = -1;
        let _this = this;
        _index = _this.editingRow.findIndex(function (x) {
          return x[_this.rowKey] === row[_this.rowKey];
        });
        Object.assign(row, this.editingRow[_index]);
        this.editingRow.splice(_index, 1);
        row[this.operationField] = this.$utility.operationType.normal;
      } else if (row[this.operationField] === this.$utility.operationType.delete) {
        row[this.operationField] = this.$utility.operationType.normal;
      }
    },
    operationDataHandler(row, operationType, index) {
      let data = this.operationData;
      if (String.isNullOrEmpty(this.rowKey)) {
        this.$message.error("Datagrid未设置RowKey属性");
        return;
      }
      if (operationType === this.$utility.operationType.delete) {
        this.$confirm("您确定要删除数据吗？", "提示")
          .then(() => {
            let rowIndex = this.findOperationData(row);
            if (
              rowIndex !== -1 
              && data[rowIndex].operType === this.$utility.operationType.add
            ) {
              data.splice(rowIndex, 1);
            } else {
              data.push(
                Object.assign({}, row, {
                  operType: this.$utility.operationType.delete
                })
              );
            }
            this.gridData.splice(index, 1);
            if (this.$utility.isFunction(this.afterRowDelete)) {
              this.afterRowDelete(row);
            }
            this.$emit("input", data);
          })
          .catch(() => {});
      } else {
        if (operationType === this.$utility.operationType.add) {
          row[this.rowKey] = this.$utility.newGuid();
          data.push(Object.assign({}, row));
          if (this.$utility.isFunction(this.afterRowSave)) {
            this.afterRowSave(row);
          }
        } else {
          let rowIndex = this.findOperationData(row);
          if (rowIndex !== -1) {
            if (data[rowIndex].operType === this.$utility.operationType.add) {
              Object.assign(data[rowIndex], row, {
                operType: this.$utility.operationType.add
              });
            } else {
              Object.assign(data[rowIndex], row);
            }
          } else {
            data.push(Object.assign({}, row));
          }
          if (this.$utility.isFunction(this.afterRowSave)) {
            this.afterRowSave(row);
          }
        }
        row[this.operationField] = this.$utility.operationType.normal;
        this.$emit("input", data);
      }
    },
    findOperationData(row) {
      let rowIndex = -1;
      for (let i = 0, len = this.operationData.length; i < len; i++) {
        if (this.operationData[i][this.rowKey] === row[this.rowKey]) {
          rowIndex = i;
          break;
        }
      }
      return rowIndex;
    },
    getTableHeight() {
      this.tableHeight = this.pagination
        ? this.height - this.$refs["pagination"].$el.offsetHeight
        : this.height;
    },
    getSelection() {
      return this.selection;
    },
    toggleRowSelection(row, selection) {
      this.$refs["table"].toggleRowSelection(row, selection);
    },
    clearSelection() {
      this.$refs["table"].clearSelection();
    },
    onSizeChange(size) {
      [this.gridPageSize, this.gridPageIndex, this.loading] = [size, 1, true];
    },
    onPageChange(pageIndex) {
      [this.gridPageIndex, this.loading] = [pageIndex, true];
    },
    onSortChange(params) {
      this.sort = params.prop;
      this.order = params.order;
      this.loading = true;
    },
    onSelectionChange(selection) {
      this.selection = selection;
      this.$emit("selection-change", selection);
    },
    onSelect(selection, row) {
      if (this.singleSelect) {
        this.clearSelection();
        this.toggleRowSelection(row, true);
      }
      this.$emit("select", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("select-all", selection);
    },
    onRowClick(row, event, column) {
      if (
        this.clickRowToSelect
        && event.target.className.indexOf("el-checkbox") === -1
      ) {
        if (this.singleSelect) {
          this.clearSelection();
          this.toggleRowSelection(row, true);
        } else {
          this.toggleRowSelection(row);
        }
      }
      if (
        row 
        && this.rowKey 
        && !this.isRowEdit(row) 
        && this.currentRow 
        && this.currentRow[this.rowKey] === row[this.rowKey]
      ) {
        this.$refs["table"].setCurrentRow(); // 取消选中行
      }
      this.$emit("row-click", row, event, column);
    },
    onRowDblClick(row, event, column) {
      this.$emit("row-dblclick", row, event, column);
    },
    onCellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    onCellDblClick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    onCellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event);
    },
    onCellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event);
    },
    onRowContextMenu(row, event) {
      this.$emit("row-contextmenu", row, event);
    },
    onHeaderClick(column, event) {
      this.$emit("header-click", column, event);
    },
    onFilterChange(filters) {
      this.$emit("filter-change", filters);
    },
    onCurrentChange(row, oldRow) {
      this.$nextTick(() => {
        this.currentRow = row;
      });
      this.$emit("current-change", row, oldRow);
    },
    scrollTop() {
      if (this.$refs["table"] && this.$refs["table"].$refs["bodyWrapper"]) {
        $(this.$refs["table"].$refs["bodyWrapper"]).animate(
          { scrollTop: "0" },
          200
        );
      }
    },
    getRows() {
      return this.gridData;
    },
    getRow(row) {
      if (typeof row === "string") {
        for (let i = 0, len = this.gridData.length; i < len; i++) {
          if (this.gridData[i][this.rowKey] === row) {
            return this.gridData[i];
          }
        }
        return null;
      } else {
        return this.gridData[row];
      }
    },
    getCurrentRow() {
      return this.currentRow;
    },
    getModifiedRows() {
      return this.operationData;
    },
    isRowModified(row) {
      let _row = row;
      if (typeof _row === "object") {
        _row = _row[this.rowKey];
      }
      if (!this.operationData) {
        return false;
      }
      for (let i = 0, len = this.operationData.length; i < len; i++) {
        if (this.operationData[this.rowKey] === _row) {
          return true;
        }
      }
      return false;
    },
    rowClass({ row, rowIndex }) {
      if (row.operType === "DEL") {
        return 'text-decoration:line-through';
      }
    },
    /**
     * @param {Object} row
     * @param {String} operationType
     * 数据后台保存成功后设置前端列表
     * 供自定义保存方法使用
     */
    saveSuccess(row, operationType) {
      var _index = -1;
      var _this = this;
      switch (operationType) {
        case 'DEL':
          _index = _this.gridData.findIndex(function (x) {
            return x[_this.rowKey] === row[_this.rowKey];
          });
          if (_index < 0) {
            return;
          } 
          _this.gridData.splice(_index, 1);
          break;
        case 'EDIT':
          // 查找对应editingRow的数据
          _index = this.editingRow.findIndex(function (x) {
            return x[_this.rowKey] === row[_this.rowKey];
          });
          this.editingRow.splice(_index, 1);
          row[this.operationField] = this.$utility.operationType.normal;
          break;
        case 'ADD':
          row[this.operationField] = this.$utility.operationType.normal;
          break;
        default:
          // console.log("数据操作方式必须是EDIT、DEL、ADD之一");
          break;
      }
    }
  },
  computed: {
    isHighlightCurrentRow() {
      return this.editable || this.highlightCurrentRow;
    }
  },
  watch: {
    height() {
      this.getTableHeight();
    },
    loading(newValue) {
      if (newValue) {
        this.load();
      }
    },
    queryParams() {
      this.refresh();
    },
    defaultQueryParams() {
      this.refresh();
    },
    value(value) {
      this.operationData = value;
    },
    data: {
      deep: true,
      immediate: true,
      handler: function(value) {
        this.gridData = value;
      }
    }
  },
  mounted() {
    this.getTableHeight();
    /**
     *  庞亦华 2018-10-01
     *  将获取数据从create迁移到此，
     *  可以先显示窗体，再显示数据
     */
    if (typeof this.defaultSort !== 'undefined') {
      this.sort = this.defaultSort.prop;
      this.order = this.defaultSort.order;
    }
    if (!String.isNullOrEmpty(this.dataUrl)) {
      this.loading = true;
    }
    this.$root.$on("reloadDatagrid", datagrid => {
      if (datagrid === this.$vnode.data.ref) {
        this.reload();
      }
    });
  }
};
</script>

<style>
.el-datagrid {
  position: relative;
}
.el-datagrid .el-pagination {
  text-align: right;
  padding: 3px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-top: 0px;
}
.el-datagrid .el-table td,
.el-datagrid .el-table th {
  height: 8px;
  padding: 2px 0;
}
.el-datagrid .el-table th {
  background-color: #f5f5f5;
}
.el-datagrid .el-table th > .cell {
  text-align: center;
}
.el-datagrid .el-table__footer-wrapper thead div,
.el-datagrid .el-table__header-wrapper thead div,
.el-datagrid .el-table__fixed-header-wrapper thead div {
  background-color: #f5f5f5;
}

.el-datagrid .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.5);
}

.el-datagrid .el-table .cell,
.el-datagrid .el-table th > div {
  padding-left: 8px;
  padding-right: 8px;
}
.el-datagrid .el-table .cell .el-button {
  padding: 3px;
}
.el-datagrid .el-table .cell .el-button + .el-button {
  margin-left: 3px;
}
.el-datagrid-single-select
  .el-table__header-wrapper
  .el-datagird-checkbox-column
  .el-checkbox {
  display: none;
}
.el-datagrid .el-table .cell .el-button .el-icon-check {
  font-size: 12px;
}
.el-datagrid .el-table .cell .el-button .el-icon-close {
  font-size: 13px;
}
.el-datagrid .el-table .cell .el-button .glyphicon {
  margin: 0px;
}
.el-datagrid .el-table__body tr.current-row > td,
.el-datagrid
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped.current-row
  td {
  background: #f2f3e3;
}

.feedback {
  float: left;
  margin-top: 8px;
  margin-left: 10px;
}
.pagination-block .demonstration {
  float: left;
}
</style>
