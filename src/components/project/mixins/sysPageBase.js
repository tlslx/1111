export default {
  data() {
    return {
      editpageName: "editpage"
    };
  },
  methods: {
    onAdd() {
      this.$refs[this.editpageName].open();
    },
    onSysEdit(row, isView = false) {
      let currentSysId = '';
      if (row.userId) {
        currentSysId = row.userId;
      } else if (row.roleId) {
        currentSysId = row.roleId;
      } else if (row.deptId) {
        currentSysId = row.deptId;
      }
      this.$refs[this.editpageName].open({
        params: {
          id: currentSysId
        },
        isEdit: true,
        isView: isView
      });
    },
    onExp() {
      var pageData = $($(".el-page-data").html());
      pageData.find(".el-datagird-checkbox-column,.exclude-excel").remove();
      let wb = XLSX.utils.table_to_book(pageData[0]);
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        this.$message.error(e);
      }
      return wbout;
    }
  }
};
