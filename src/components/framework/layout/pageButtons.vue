<template>
  <div class="el-page-buttons">
    <el-dropdown v-if="isDataView" trigger="click" type="primary" @command="onCommand">
      <el-button type="primary">
        <div class="data-view-text">{{viewText}}</div><i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="item.command" :key="item.command" v-for="item in viewOptions">{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button-group>
      <el-button v-if="refresh" v-right.view type="primary" @click="onClick('refresh')">刷新</el-button>
      <el-button v-if="add" v-right.add type="primary" @click="onClick('add')">新增</el-button>
      <el-button v-if="del" v-right.delete type="primary" @click="onClick('del')">删除</el-button>
      <el-button v-if="edit" v-right.edit type="primary" @click="onClick('edit')">修改</el-button>
      <el-button v-if="view" v-right.view type="primary" @click="onClick('view')">查看</el-button>
      <el-button v-if="exp" v-right.export type="primary" @click="onClick('exp')">导出</el-button>
      <el-button v-if="approve" v-right.edit type="primary" @click="onClick('approve')">{{approveText}}</el-button>
      <slot></slot>
    </el-button-group>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "ElPageButtons",
  props: {
    dataView: { type: Boolean, default: true },
    refresh: { type: Boolean, default: true },
    add: { type: Boolean, default: true },
    del: { type: Boolean, default: true },
    edit: { type: Boolean, default: true },
    view: { type: Boolean, default: true },
    exp: { type: Boolean, default: true },
    approve: { type: Boolean, default: false },
    withWorkflow: { type: Boolean, default: false },
    approveText: { type: String, default: "Approve" },
    viewOptions: { type: Array, default: null },
    right: Function // 绑定检查权限方法
  },
  data() {
    return {
      primaryColor: "red",
      viewText: "数据视图",
      isDataView: this.dataView,
      viewOptionList: this.viewOptions || []
    };
  },
  created: function() {
    if (this.$utility.isEmpty(this.viewOptionList)) {
      this.isDataView = false;
    } else {
      this.viewText = this.viewOptionList[0].text;
      let defaultCommand = this.viewOptionList[0].command;
      this.viewOptionList.forEach(e => {
        if (e.isDefault === true) {
          this.viewText = e.text;
          defaultCommand = e.command;
        }
      });
      this.$emit("view-change", defaultCommand);
    }
  },
  methods: {
    onClick(eventName) {
      this.$emit(eventName);
    },
    onCommand(command) {
      for (let i = 0, len = this.viewOptions.length; i < len; i++) {
        if (this.viewOptions[i].command === command) {
          this.viewText = this.viewOptions[i].text;
          break;
        }
      }
      this.$emit("view-change", command);
    },
    switchButtonColor(primaryColor) {
      this.buttonColor.primaryBackgroundColor = primaryColor;
      let $el = $(this.$el);
      let $button = $el.find(".el-button--primary");
      $button.css("background-color", this.buttonColor.primaryBackgroundColor);
      $button.css("border-color", this.buttonColor.primaryBorderColor);
    }
  }
};
</script>

<style>
.el-page-buttons {
  padding: 5px 8px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
}

.el-page-buttons .el-dropdown {
  vertical-align: middle;
  margin-right: 5px;
}

.el-page-buttons .data-view-text {
  width: 80px;
  text-align: center;
  display: inline-block;
}
</style>
