// import Vue from '@/scripts/framework/config';
import PageBase from './pageBase';
import FileSaver from "file-saver";
import XLSX from "xlsx";
import $ from 'jquery';
import Utility from '@/scripts/framework/utility';
export default {
  mixins: [PageBase],
  data() {
    return {
      defaultQueryParams: [],
      queryParams: [],
      pageQueryParams: [],
      customQueryParams: [],
      isListPage: true,
      datagridName: "datagrid",
      editpageName: "editpage",
      primaryKey: "id",
      expFileName: "导出列表",
      args: {}
    };
  },
  methods: {
    onAdd() {
      this.args = {};
      this.$refs[this.editpageName].open();
    },
    onEdit(row, isView = false) {
      let temp = row;
      if (!temp) {
        let gridSelection = this.$refs[this.datagridName].getSelection();
        if (gridSelection.length === 0) {
          this.$message({
            message: "请选择数据",
            type: "warning"
          });
          return;
        } else if (gridSelection.length > 1) {
          this.$message({
            message: "只能选择一条数据",
            type: "warning"
          });
          return;
        } else {
          temp = gridSelection[0];
        }
      }
      this.args = {};
      this.$refs[this.editpageName].open({
        params: { id: temp[this.primaryKey] },
        isEdit: true,
        isView: isView
      });
    },
    onQuery(queryParams) {
      let tempQueryParams = [];
      this.pageQueryParams = queryParams;
      tempQueryParams = tempQueryParams.concat(this.pageQueryParams);
      tempQueryParams = tempQueryParams.concat(this.customQueryParams);
      this.queryParams = tempQueryParams;
    },
    onDel(row) {
      this.$refs[this.datagridName].delete(row);
    },
    onExp() {
      let pageData = $($(".el-page-data").html());
      pageData.find(".el-table__fixed-right,.el-datagird-checkbox-column,.exclude-excel").remove();
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(pageData[0]);
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          this.expFileName + new Date().getTime() + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          // console.log(e, wbout);
        }
      }
      return wbout;
    },
    onViewChange(value) {
      this.dataView = value;
    },
    onRefresh() {
      // console.info("onRefresh");
      this.$refs[this.datagridName].refresh();
    },
    // 根据传入的主色自动设置按钮的颜色
    switchPrimaryColor(primaryColor) {
      let temp = primaryColor;
      temp = "#" + temp;
      let borderColor = Utility.colorLightenDarken(temp, -10);
      let hoverPrimaryColor = Utility.colorLightenDarken(temp, 20);
      let hoverBorderColor = Utility.colorLightenDarken(temp, 10);
      $(".el-button--primary").css("background-color", temp);
      $(".el-button--primary").css("border-color", borderColor);
      $(".el-button--primary").hover(
        function() {
          $(this).css("background-color", hoverPrimaryColor);
          $(this).css("border-color", hoverBorderColor);
        },
        function() {
          $(this).css("background-color", temp);
          $(this).css("border-color", borderColor);
        }
      );
    }
  },
  mounted() {
    /*
      通过路由传入的primaryColor，设置本模块按钮颜色
    */
    this.$nextTick(() => {
      let primaryColor = this.$route.query.primarycolor;
      this.switchPrimaryColor(primaryColor);
    });
  },
  beforeDestroy() {
    /* 如果无异常可以删除
    if (this.showsysFeedback && this.sysFeedback) {
      if (typeof this.sysFeedback.$el.parentNode !== 'undefined') {
        this.sysFeedback.$el.parentNode.removeChild(this.sysFeedback.$el)
      }
      this.sysFeedback.$destroy()
    }
    */
  }
};
