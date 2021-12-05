<template>
  <el-container>
      <el-dialog :title="language.selectdown" :visible.sync="downVisible" :close-on-click-modal="false"
        :close-on-press-escape="false" width="60%">
        <div class="maincenter">
          <el-button icon="el-icon-download" type="primary" @click="onDownload('dwg')">
            {{language.dwgdown}}</el-button>
          <el-button icon="el-icon-download" type="primary" @click="onDownload('svg')">
            {{language.svgdown}}</el-button>
          <el-button icon="el-icon-download" type="primary" @click="onDownload('pdf')">
            {{language.pdfdown}}</el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="downVisible = false">{{language.cancel}}</el-button>
        </div>
      </el-dialog>
  </el-container>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'downDialog',
  mixins: [listPageBase],
  data() {
    return {
      downVisible: false,
      rowData: {},
      action: ''
    };
  },
  props: {
    api: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    onDownload(type) {
      kindo.util.downloadFile(this.rowData, type);
    }
    // onDownload(type) {
    //   if (this.rowData instanceof Array) {
    //     let dwgFileIds = [];
    //     let pdfFileIds = [];
    //     let svgFileIds = [];
    //     this.rowData.forEach(el => {
    //       dwgFileIds.push(el.dwgFileId);
    //       pdfFileIds.push(el.pdfFileId);
    //       svgFileIds.push(el.svgFileId);
    //     });
    //     type === "dwg" ? kindo.util.downloadFile(this.api.download, { ids: dwgFileIds.join(',') }) : type === "pdf" ? kindo.util.downloadFile(this.api.download, { ids: pdfFileIds.join(',') }) : kindo.util.downloadFile(this.api.download, { ids: svgFileIds.join(',') });
    //   } else {
    //     type === "dwg" ? kindo.util.downloadFile(this.api.download, { ids: this.rowData.dwgFileId }) : type === "pdf" ? kindo.util.downloadFile(this.api.download, { ids: this.rowData.pdfFileId }) : kindo.util.downloadFile(this.api.download, { ids: this.rowData.svgFileId });
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
  .maincenter{
    text-align: center;
    height: 300px;
    line-height: 300px;
 }
</style>

