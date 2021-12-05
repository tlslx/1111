<template>
  <div>
    <!--用户授权-->
    <el-dialog :title="language.download" :close-on-click-modal="false" top="15px" :visible.sync="downVisible" width="60%">
      <el-form label-width="80px" inline class="maincenter">
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="onDownload('dwg')">{{language.dwgdown}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="onDownload('svg')">{{language.svgdown}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="onDownload('pdf')">{{language.pdfdown}}</el-button>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="downVisible = false">{{language.cancel}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
export default {
  name: 'downdialog',
  mixins: [tableMixIn],
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
  data () {
    return {
      action: "",
      rowdata: {},
      child: {
        buttomGraphId: ""
      },
      source: {
      },
      selectData: [],
      downVisible: false
    };
  },
  async created () {
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getadd() {
      this.child.buttomGraphId = this.rowdata.buttomGraphId;
    },
    // 保存提交数据
    onDownload(type) {
      kindo.util.downloadFile(this.rowdata, type);
      // if (this.rowdata instanceof Array) {
      //   let dwgFileIds = [];
      //   let pdfFileIds = [];
      //   let svgFileIds = [];
      //   this.rowdata.forEach(el => {
      //     dwgFileIds.push(el.dwgFileId);
      //     pdfFileIds.push(el.pdfFileId);
      //     svgFileIds.push(el.svgFileId);
      //   });
      //   type === "dwgFile" ? kindo.util.downloadFile(this.api.download, { ids: dwgFileIds.join(',') }) : type === "pdfFile" ? kindo.util.downloadFile(this.api.download, { ids: pdfFileIds.join(',') }) : kindo.util.downloadFile(this.api.download, { ids: svgFileIds.join(',') });
      // } else {
      //   type === "dwgFile" ? kindo.util.downloadFile(this.api.downone + this.rowdata.dwgFileId) : type === "pdfFile" ? kindo.util.downloadFile(this.api.downone + this.rowdata.pdfFileId) : kindo.util.downloadFile(this.api.downone + this.rowdata.svgFileId);
      // }
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "add":
          return this.getadd();
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
  .maincenter{
    text-align: center;
  }
</style>
