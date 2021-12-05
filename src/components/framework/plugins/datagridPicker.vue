<template>
  <div class="el-select el-picker el-datagrid-picker">
    <div class="el-select__tags el-picker__tags" v-if="multiple" ref="tags" @click="onClick">
      <transition-group @after-leave="setComponentHeight">
        <el-tag v-for="(item, index) in selection" :key="item[valueField]" :closable="!disabled" type="primary"
          @close.stop="deleteItem(index)" close-transition>
          <span class="el-select__tags-text">{{ item[textField] }}</span>
        </el-tag>
      </transition-group>
    </div>
    <el-input ref="input" class="el-datagrid-picker__input" :class="{'is-disabled':disabled}" :placeholder="selection.length === 0 ? '请选择' : ''"
      :icon="iconClass" :size="size" :readonly="true" @click="onClick" @focus="onClick" :value="getInputText()"
      @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false"></el-input>
  </div>
</template>

<script>
import Vue from "@/scripts/framework/config";
import PickerBase from "../mixins/pickerBase";
export default {
  name: "ElDatagridPicker",
  mixins: [PickerBase],
  props: {
    disabled: { type: Boolean, default: false },
    treeUrl: { type: String },
    treeValueField: { type: String },
    treeTextField: { type: String },
    treeParentField: { type: String, default: "parentId" },
    treeRootId: { type: String, default: "" },
    treeGridRelateKeyName: { type: String, default: "" },
    treeDefaultExpandKeys: Array,
    columns: { type: Array, required: true },
    pagination: { type: Boolean, default: true },
    queryParams: {}
  },
  mounted() {
    let DatagridDialog = Vue.component("ElDatagridDialog");
    this.pickerDialog = new DatagridDialog({
      propsData: {
        url: this.url,
        valueField: this.valueField,
        textField: this.textField,
        defaultQueryParams: this.queryParams,
        treeUrl: this.treeUrl,
        treeValueField: this.treeValueField,
        treeTextField: this.treeTextField,
        treeParentField: this.treeParentField,
        treeRootId: this.treeRootId,
        treeGridRelateKey: this.treeGridRelateKeyName,
        treeDefaultExpandKeys: this.treeDefaultExpandKeys,
        columns: this.columns,
        multiple: this.multiple,
        pagination: this.pagination,
        dialogTitle: this.dialogTitle
      }
    }).$mount();
    document
      .getElementsByClassName("el-page")[0]
      .appendChild(this.pickerDialog.$el);
    this.pickerDialog.$on("selection-change", this.onSelectionChange);
    this.loadSelection(this.value);
  }
};
</script>
