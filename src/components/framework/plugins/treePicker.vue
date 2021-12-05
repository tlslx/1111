<template>
  <div class="el-select el-picker el-tree-picker">
    <div class="el-select__tags el-picker__tags" v-if="multiple" ref="tags" @click="onClick">
      <transition-group v-if="colltags" @after-leave="setComponentHeight">
        <el-tag v-if="selection.length > 0" :key="1" type="primary" close-transition>
          <span class="el-select__tags-text">{{ selection[0][textField] }}</span>
        </el-tag>
        <el-tag v-if="selection.length > 1" :key="2" type="primary" close-transition>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content"><span v-for="(item, index) in selection" :key="item[valueField]">{{ item[textField] }} {{index !== selection.length - 1 ? '、' : ''}}</span></div>
            <span class="el-select__tags-text">+{{ selection.length-1 }}</span>
          </el-tooltip>
        </el-tag>
        
        <!-- <el-tag v-for="(item, index) in selection" :key="item[valueField]" :closable="!disabled" type="primary" @close.stop="deleteItem(index)" close-transition>
          <span class="el-select__tags-text">{{ item[textField] }}666</span>
        </el-tag> -->
      </transition-group>
      <transition-group v-else @after-leave="setComponentHeight">
        <el-tag v-for="(item, index) in selection" :key="item[valueField]" :closable="!disabled" type="primary" @close.stop="deleteItem(index)" close-transition>
          <span class="el-select__tags-text">{{ item[textField] }}</span>
        </el-tag>
      </transition-group>
    </div>
    <el-input ref="input" class="el-datagrid-picker__input" :class="{'is-disabled':disabled}" :placeholder="selection.length === 0 ? defaultPlaceholder:''" :icon="iconClass" :size="size" :readonly="true" @click="onClick" @focus="onClick" :value="getInputText()" @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false"></el-input>
  </div>
</template>

<script>
import Vue from "@/scripts/framework/config";
import PickerBase from "../mixins/pickerBase";
export default {
  name: "ElTreePicker",
  mixins: [PickerBase],
  props: {
    treeQueryParams: { type: Array, default: () => [] },
    sort: String,
    parentField: { type: String },
    rootId: { type: String, default: "" },
    defaultExpandKeys: Array,
    colltags: Boolean,
    disabled: { type: Boolean, default: false },
    showcheckbox: { type: Boolean, default: true },
    mergetags: { type: Boolean },
    getchild: { type: Boolean, default: false },
    mergeCheckedNodes: { type: Boolean, default: false },
    expandOnClickNode: { type: Boolean, default: true }
  },
  data() {
    return {
      defaultPlaceholder: '请输入'
    };
  },
  mounted() {
    let TreeDialog = Vue.component("ElTreeDialog");
    this.pickerDialog = new TreeDialog({
      propsData: {
        url: this.url,
        treeQueryParams: this.treeQueryParams,
        sort: this.sort,
        valueField: this.valueField,
        textField: this.textField,
        parentField: this.parentField,
        rootId: this.rootId,
        multiple: this.multiple,
        dialogTitle: this.dialogTitle,
        defaultExpandKeys: this.defaultExpandKeys,
        showcheckbox: this.showcheckbox,
        getchild: this.getchild,
        mergeCheckedNodes: this.mergeCheckedNodes,
        expandOnClickNode: this.expandOnClickNode
      }
    }).$mount();
    document
      .getElementsByClassName("el-page")[0]
      .appendChild(this.pickerDialog.$el);
    this.pickerDialog.$on("selection-change", this.onSelectionChange);
    this.pickerDialog.$on("selection-click", this.onSelectionOne);
    this.loadSelection(this.value);
    const currentLn = kindo.cache.get('language');
    if (currentLn === 'en') {
      this.defaultPlaceholder = 'Please select';
    }
  }
};
</script>
