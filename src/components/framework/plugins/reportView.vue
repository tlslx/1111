<template>
    <div class="reports">
      <div id="viewerContent"></div>
    </div>
</template>

<script>
import http from "@/scripts/framework/http";
import Utility from "@/scripts/framework/utility";
export default {
  name: "ElReportView",
  props: {
    reportFile: { type: String, default: "/static/reports/demoReport.mrt" },
    dsName: { type: String, default: "Demo" },
    dictNames: { type: String, default: "Info" },
    baseUrl: { type: String, default: "" },
    dataUrl: { type: String, default: "" },
    fnFormatData: { type: Function },
    defaultShow: { type: Boolean, default: false },
    queryParams: {},
    jsonData: {}
  },
  data() {
    return {
      value: this.jsonData,
      params: this.queryParams
    };
  },
  created: function() {
    if (this.defaultShow) {
      var _this = this;
      window.setTimeout(() => {
        _this.show(_this);
      }, 1);
    }
  },
  methods: {
    show() {
      $("#viewerContent").html("");
      if (Utility.isEmpty(this.dataUrl)) {
        this.loadReport(this.value);
      } else {
        this.load(this.queryParams)
          .then(data => {
            if (this.$utility.isFunction(this.fnFormatData)) {
              this.fnFormatData(data);
            }
            this.loadReport(data);
          })
          .catch(msg => {
            this.$message.error(msg);
          });
        // this.load(this.params)
        //   .then(data => {
        //     // if (this.$utility.isFunction(this.fnFormatData)) {
        //     //   this.fnFormatData(data);
        //     // }
        //     this.loadReport(data);
        //   })
        //   .catch(msg => {
        //     this.$message.error(msg);
        //   });
      }
    },
    loadReport(data) {
      var report = new Stimulsoft.Report.StiReport();
      report.loadFile(this.reportFile);
      var ds = new Stimulsoft.System.Data.DataSet(this.dsName);
      ds.readJson(data);
      // console.info(ds)
      report.regData(this.dsName, null, ds);
      if (!Utility.isEmpty(this.dictNames)) {
        for (var i = 0; i < ds.tables.list.length; i++) {
          var tb = ds.tables.list[i];
          if (this.dictNames instanceof Array) {
            if (this.isInArray(this.dictNames, tb.tableName)) {
              this.genReportDict(report, ds, i);
            }
          } else {
            if (this.dictNames == tb.tableName) {
              this.genReportDict(report, ds, i);
            }
          }
        }
      }
      var opts = new Stimulsoft.Viewer.StiViewerOptions();
      var viewer = new Stimulsoft.Viewer.StiViewer(opts, "StiViewer", false);
      viewer.report = report;
      viewer.renderHtml("viewerContent");
    },
    load(params) {
      return new Promise((resolve, reject) => {
        var url = Utility.genServiceUrl(this.baseUrl, this.dataUrl);
        http
          .get(url, params)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    isInArray(array, name) {
      for (var i = 0; i < array.length; i++) {
        // console.info(array[i]);
        if (array[i] == name) {
          return true;
        }
      }
      return false;
    },
    genReportDict(report, ds, index) {
      var data = ds.tables.getByIndex(index);
      var tName = data.tableName;
      var dataSource = new Stimulsoft.Report.Dictionary.StiDataTableSource(
        tName,
        tName,
        tName
      );
      for (var i = 0; i < data.columns.list.length; i++) {
        var cName = data.columns.list[i].columnName;
        dataSource.columns.add(
          new Stimulsoft.Report.Dictionary.StiDataColumn(cName, cName, cName)
        );
      }
      report.dictionary.dataSources.add(dataSource);
    }
  }
};
</script>

<style>

</style>
