<template>
  <div>
    <el-upload
      ref="upload"
      :action="url"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :disabled="isView"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">上传文件不超过10M</div> -->
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "ElUploadPicker",
  props: {
    value: {},
    isView: false,
    baseUrl: { type: String, default: process.env.API_COMS_URL }
  },
  data() {
    return {
      // baseUrl: process.env.API_COMS_URL,
      url: this.baseUrl + "/api/common/upload/save",
      viewUrl: this.baseUrl + "/api/common/upload/download?mongofsId=",
      pickerValue: this.value
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.$message({ message: response.message });
      if (response.flag === "1") {
        let tempArr = [];
        // var temp = {
        //   id: response.data,
        //   name: fileList[0].name,
        //   url: this.viewUrl + response.data
        // };
        // this.fileList.push(temp);
        // console.info(temp);
        for (let i = 0; i < fileList.length; i++) {
          let item = fileList[i];
          let temp = {};
          if (typeof item.id === 'undefined') {
            temp = {
              id: response.data,
              name: item.name,
              url: this.viewUrl + response.data
            };
          } else {
            temp = {
              id: item.id,
              name: item.name,
              url: item.url
            };
          }
          tempArr.push(temp);
        }
        this.pickerValue = tempArr;
      }
    },
    handlePreview(file) {
      window.open(file.url, "_blank");
    },
    handleBeforeUpload(file) {
      // if (this.$refs.upload.uploadFiles.length > 1) {
      //   this.$message({ message: "当前限制上传 1 个文件", type: "warning" });
      //   return false;
      // }
      return true;
    },
    handleExceed(files, fileList) {
      // console.log("handleExceed");
      // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleRemove(file, fileList) {
      this.pickerValue = fileList;
    }
  },
  watch: {
    value: function() {
      this.pickerValue = this.value;
    },
    pickerValue: function() {
      this.$emit("input", this.pickerValue);
    }
  },
  computed: {
    fileList() {
      if (this.$utility.isEmpty(this.value)) {
        return [];
      }
      let tempArr = [];
      // var tempArr = [];
      // var o = {};
      if (typeof this.value === "string") {
        try {
          tempArr = [].concat(JSON.parse(this.value));
        } catch (ex) {
          return [];
        }
      } else {
        tempArr = this.value;
      }

      // tempArr.push({
      //   name: o.name,
      //   url: o.url
      // });
      // console.info(tempArr);
      return tempArr;
    }
  }
};
</script>

<style>

</style>
