<template>
  <el-dialog class="el-page-dialog" :visible.sync="dialogVisible" @open="onOpen" @close="onClose" :close-on-click-modal="false" :width="dialogSize" :before-close="onCloseDialog" :fullscreen="maximized" :show-close="true" top="15px" :modal="modal" v-if='dialogVisible'>
    <template slot="title">
      <span class="el-dialog__title">{{title}}</span>
      <i class="iconfont icon-zuidahua" @click="onChangeSize" />
    </template>
    <component :is="page" ref="page" :params="pageParams" :args="args" :is-edit="isEdit" :is-view="isView" :table-name="tableName" :primary-key="primaryKey" :submit="submit" v-loading="loading" @loading="onLoading" @submitted="onSubmitted" @modified="onModified" :edit-columns="editColumns" :before-submit="beforeSubmit" :after-submit="afterSubmit" :after-add="afterAdd" :after-edit="afterEdit"></component>
    <div ref="footer" slot="footer" class="dialog-footer">
      <slot name="customButtons" :loading="loading"></slot>
      <template v-if="!isView || keepSaveButton">
        <el-button v-if="saveCloseButtonVisible" type="primary" @click="submitForm(true)" :disabled="loading">
          <i class="glyphicon glyphicon-floppy-remove"></i>{{saveCloseButtonText}}
        </el-button>
        <el-button v-if="saveButtonVisible" type="info" @click="submitForm(false)" :disabled="loading">
          <i class="glyphicon glyphicon-floppy-disk"></i>{{saveButtonText}}
        </el-button>
      </template>
      <el-button v-if="closeButtonVisible" @click="onCloseDialog">
        <i class="glyphicon glyphicon-remove"></i>{{closeButtonText}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import $ from "jquery";
export default {
  name: "ElPageDialog",
  props: {
    page: {},
    params: {},
    args: {},
    size: { type: String, default: "80%" },
    fullscreen: { type: Boolean, default: false },
    title: { default: "详细信息" },
    closeButtonVisible: { type: Boolean, default: true },
    closeButtonText: { type: String, default: "关闭" },
    saveButtonVisible: { type: Boolean, default: true },
    saveButtonText: { type: String, default: "保存" },
    saveCloseButtonVisible: { type: Boolean, default: true },
    saveCloseButtonText: { type: String, default: "保存并关闭" },
    datagrid: String,
    isShowSubmitConfirmMessage: { type: Boolean, default: false },
    submitConfirmMessage: { type: String, default: "您确定要提交表单吗？" },
    modal: { type: Boolean, default: true },
    draggable: { type: Boolean, default: true },
    // 模板页设置开始
    tableName: String,
    primaryKey: String,
    editColumns: {},
    beforeSubmit: Function,
    afterSubmit: Function,
    afterAdd: Function,
    afterEdit: Function,
    // 模板页设置结束
    keepSaveButton: { type: Boolean, default: false },
    isShowCloseTip: true
  },
  data() {
    return {
      dialogVisible: false,
      dialogSize: this.size,
      maximized: false,
      pageParams: this.params,
      loading: false,
      submit: false,
      submitedAndClose: false,
      reloadDatagrid: false,
      isEdit: false,
      isView: false,
      modified: false,
      isFirstOpen: true
    };
  },
  methods: {
    open({ params = {}, isEdit = false, isView = false } = {}) {
      if (this.maximized && this.dialogSize === "full") {
        this.dialogSize = this.size;
        $(this.$el)
          .find(".el-dialog__body")
          .css("height", "auto");
      } else if (this.isFirstOpen === true && this.fullscreen === true) {
        this.isFirstOpen = false;
        this.onChangeSize();
      }
      this.pageParams = params;
      this.isEdit = isEdit;
      this.isView = isView;
      this.dialogVisible = true;
      this.modified = false;
      let _this = this;

      process.nextTick(() => {
        _this.$refs["page"].$emit("open");
      });
    },
    close() {
      this.dialogVisible = false;
      this.$refs["page"].$emit("close");
    },
    submitForm(close) {
      if (this.$refs.page.validateForm !== undefined) {
        this.$refs.page.validateForm(r => {
          if (r) {
            if (this.isShowSubmitConfirmMessage === true) {
              this.$confirm(this.submitConfirmMessage, "提示")
                .then(() => {
                  this.submit = true;
                  this.loading = true;
                  this.submitedAndClose = close;
                })
                .catch(() => { });
            } else {
              this.submit = true;
              this.loading = true;
              this.submitedAndClose = close;
            }
          }
        });
      }
    },
    onSubmitted(r) {
      this.submit = false;
      this.loading = false;
      this.$nextTick(() => {
        // 因为保存完数据后，会重新给form赋值导致该操作无效，只能在下一帧修改状态
        this.modified = false;
      });
      if (r) {
        this.isEdit = true;
        this.reloadDatagrid = true;
        if (this.submitedAndClose) {
          this.close();
          this.$emit("refresh");
        }
      }
    },
    onLoading(value) {
      this.loading = value;
    },
    onOpen() {
      this.reloadDatagrid = false;
    },
    onClose() {
      if (this.reloadDatagrid) {
        // 重新加载datagrid
        this.$root.$emit("reloadDatagrid", this.datagrid);
      }
    },
    onChangeSize() {
      let $el = $(this.$el);
      if (!this.maximized) {
        // $el.find(".el-dialog").css("left", "50%");
        this.maximized = true;
        // $el.find(".el-dialog__header").removeClass("draggable-header");
        this.$nextTick(() => {
          let height = $el.height()
            - $el.find(".el-dialog__header").outerHeight()
            - $el.find(".el-dialog__footer").outerHeight()
            + "px";
          $el
            .find(".el-dialog__body")
            .outerHeight(height)
            .addClass("maximize-body");
          $el.find(".el-dialog").css({
            left: 0 + "px",
            top: 0 + "px"
          });
        });
      } else {
        //  this.dialogSize = this.size;
        this.maximized = false;
        $el
          .find(".el-dialog__body")
          .removeClass("maximize-body")
          .css({ height: "auto" });
        if (this.draggable) {
          $el.find(".el-dialog__header").addClass("draggable-header");
        }
      }
    },
    onCloseDialog() {
      // 如果编辑页面重写了beforeClose函数，则根据其结果判断是否允许关闭
      if (!this.$refs.page.beforeClose()) {
        return;
      }
      // 判断form的数据是否发生改变
      let isChanged = this.$refs.page.formChanged();
      if (isChanged) {
        if (this.isShowCloseTip === true) {
          this.$confirm("表单已修改，您确定要关闭窗口吗？", "提示")
            .then(() => {
              this.dialogVisible = false;
            })
            .catch(() => { });
        } else {
          this.dialogVisible = false;
        }
      } else {
        this.dialogVisible = false;
      }
    },
    onModified(value = true) {
      this.modified = value;
    }
  },
  mounted() {
    let $el = $(this.$el);
    let $header = $el.find(".el-dialog__header");
    let $dialog = $el.find(".el-dialog");
    let $footer = $el.find(".el-dialog__footer");
    if (this.draggable) {
      let startPoint = null;
      let moveDialog = false;
      $header
        .mousedown(e => {
          // if (this.dialogSize === "full") return;
          if (this.maximized) {
            return;
          }
          startPoint = { x: e.pageX, y: e.pageY };
          moveDialog = true;
        })
        .addClass("draggable-header");

      $el.mousemove(e => {
        if (moveDialog) {
          let left = parseFloat($dialog.css("left"));
          let top = parseFloat($dialog.css("top"));
          $dialog.css({
            left: left + (e.pageX - startPoint.x) + "px",
            top: top + (e.pageY - startPoint.y) + "px"
          });
          startPoint = { x: e.pageX, y: e.pageY };
        }
      });

      $el.mouseup(() => {
        moveDialog = false;
      });
    }
    // 调整高度
    if (this.maximized) {
      $(window).bind("resize", () => {
        // if (this.dialogSize !== "full") return;
        if (!this.maximized) {
          return;
        }
        let height = $el.height() - $header.outerHeight() - $footer.outerHeight() + "px";
        $header.outerHeight() - $footer.outerHeight() - 6 + "px";
        $el
          .find(".el-dialog__body")
          .outerHeight(height)
          .addClass("maximize-body");
      });
    }
  },
  watch: {
    size(value) {
      this.dialogSize = value;
    }
  }
};
</script>

<style>
.el-page-dialog > .el-dialog {
  min-width: 700px;
}
.el-dialog__title {
  font-size: 16px;
  padding: 8px 8px 11px 8px;
}
.el-page-dialog .maximize-body {
  overflow: auto;
}
/*
鼠标移动到头部变成移动图标
.el-page-dialog .draggable-header {
  cursor: move;
}
*/
.iconfont.icon-zuidahua {
  float: right;
  margin-right: 23px;
  margin-top: 3px;
}
</style>
