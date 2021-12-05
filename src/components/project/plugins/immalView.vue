<template>
  <el-dialog :title="title" :visible.sync="showView" 
    :before-close="handleClose" @open="handleOpen" 
    width="50%" top="2vh" 
    :lock-scroll=true>
    <div class="content" v-html="content"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name: "inimailView",
    props: ["showView", "imailId", "inmailRecordId"],
    data() {
      return {
        title: "",
        content: ""
      };
    },
    methods: {
      handleClose(done) {
        this.$emit("CloseView");
        return;
      },
      handleOpen() {
        this.$emit("OpenView");
      },
      getContent(_inmailId, _inmailRecordId) {
        this.content = "";
        this.title = "";
        let _this = this;
        let paramData = {
          id: _inmailId
        };
        // 查看站内信内容
        this.$http
          .get("/api/sysInmail/getSingleById", paramData)
          .then(function (resultData) {
            _this.content = resultData.content;
            _this.title = resultData.title;
            
            _this.setInmailAlreadyRead(_inmailRecordId);
          })
          .catch(function (msg) {
            // 错误捕捉
          });
      },
      setInmailAlreadyRead(_inmailRecordId) {
        let paramData = {
          inmailRecordId: _inmailRecordId
        };
        // 设置站内信已读
        this.$http
          .get("/api/sysInmail/setInmailAlreadyRead", paramData)
          .then(function (resultData) {
            // console.info(resultData);
          })
          .catch(function (msg) {
            // 错误捕捉
          });

      }
    }
  };

</script> 

<style>
.content {
  overflow: auto;
}
.el-dialog__body{
  min-height: 250px;
}
</style>

