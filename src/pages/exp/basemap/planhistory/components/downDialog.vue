<template>
  <div>
    <!--用户授权-->
    <el-dialog :title="language.download" :close-on-click-modal="false" top="15px" :visible.sync="downVisible" width="60%">
      <el-form label-width="80px" inline class="maincenter">
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="onDown('dwg')">{{language.dwgdown}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="onDown('svg')">{{language.svgdown}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="onDown('pdf')">{{language.pdfdown}}</el-button>
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
      rowselect: [],
      child: {
        schemeGraphId: ""
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
    getinit() {
      this.child.schemeGraphId = this.rowdata.schemeGraphId;
    },
    getFileId(fileType, item) {
      let fileId = "";
      switch (fileType) {
        case "dwg":
          fileId = item.dwgFileId;
          break;
        case "svg":
          fileId = item.svgFileId;
          break;
        case "pdf":
          fileId = item.pdfFileId;
          break;
        default:
          fileId = "";
      }
      return fileId;
    },
    // 保存提交数据
    onDown(type) {
      kindo.util.downloadFile(this.rowdata, type);
      // if (this.action === "download") {
      //   const fileId = this.getFileId(fileType, this.rowdata);
      //   console.log(fileId);
      //   kindo.util.download(fileId);
      // } else {
      //   let fileIds = [];
      //   this.rowselect.forEach(item => { 
      //     let fileId = this.getFileId(fileType, item);
      //     fileIds.push(fileId);
      //   });
      //   console.log(fileIds);
      //   kindo.util.downloads(fileIds);
      // }
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "download":
          return this.getinit();
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
