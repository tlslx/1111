<template>
  <el-select v-model="componentValue" 
    :multiple="multiple" 
    :clearable="clearable" 
    :loading="loading"
    :filterable="filterable"
    :allow-create="allowCreate"
    :placeholder="placeholder" 
    @change="onChange" 
    @input="onInput" 
    :no-match-text="noMatchText"
    :disabled="disabled" 
    :loading-text="loadingText" 
    :size="size" 
    :popper-class="popperClass">
    <template v-if="groupView">
      <el-option-group v-for="group in componentOptions" :label="group[groupField]" :key="group[groupField]">
        <el-option v-for="item in group[groupOptionsField]" :label="item[itemTextField]" :value="item[itemValueField]" :key="item[itemValueField]">
          <slot :item="item"></slot>
        </el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-option v-for="item in componentOptions" :label="item[itemTextField]" :value="item[itemValueField]" :key="item[itemValueField]">
        <slot :item="item"></slot>
      </el-option>
    </template>
  </el-select>
</template>

<script>
import listComponentBase from "@/components/framework/mixins/listComponentBase";
export default {
  name: "ElDropdownList",
  mixins: [listComponentBase],
  props: {
    placeholder: String,
    size: String,
    clearable: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    groupView: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    allowCreate: { type: Boolean, default: false },
    groupField: { type: String, default: "group" },
    groupOptionsField: { type: String, default: "options" },
    popperClass: String,
    noMatchText: String
  },
  data() {
    return {
      componentValue: !String.isNullOrEmpty(this.value)
        ? this.value
        : this.multiple ? [] : ""
    };
  },
  watch: {
    value(value) {
      if (value instanceof Array) {
        this.componentValue = !String.isNullOrEmpty(value)
          ? value
          : this.multiple ? [] : "";
      } else {
        let data = this.componentOptions;
        let val = value;
        for (let index = 0; index < data.length; index++) {
          if (data[index].value === String(value)) {
            val = data[index].text;
          }
        }
        this.componentValue = !String.isNullOrEmpty(val)
          ? val
          : this.multiple ? [] : "";
      }
    }
  }
};
</script>
