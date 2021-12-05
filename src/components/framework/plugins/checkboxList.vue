<template>
  <div class="el-checkbox-list">
    <el-checkbox v-if="checkAllVisible" :indeterminate="getIndeterminate()" v-model="checkAll" @change="onCheckAll">{{checkAllText}}</el-checkbox>
    <el-checkbox-group v-model="componentValue" @input="onInput" @change="onChange">
      <el-checkbox v-for="item in componentOptions" :label="item[itemValueField]" :name="name" :key="item[itemValueField]" :disabled="getStatus(item.disabled)">
        {{item[itemTextField]}}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import listComponentBase from "@/components/framework/mixins/listComponentBase";
export default {
  name: "ElCheckboxList",
  mixins: [listComponentBase],
  props: {
    name: {},
    checkAllVisible: Boolean,
    checkAllText: { default: "全选" }
  },
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      componentValue: this.value || []
    };
  },
  methods: {
    onChange(value) {
      this.checkAll 
      = this.componentValue.length === this.componentOptions.length;
      let textArr = [];
      for (let i = 0; i < value.length; i++) {
        let item = this.getArrayItemBy(
          this.componentOptions,
          this.valueField,
          value[i]
        );
        if (item != null && typeof item !== 'undefined') {
          textArr.push(item[this.textField]);
        }
      }
      this.$emit("change", value, textArr, this.componentOptions);
    },
    onCheckAll(event) {
      if (event.target.checked) {
        let checkedValue = [];
        this.componentOptions.forEach(option => {
          checkedValue.push(option[this.valueField]);
        });
        this.componentValue = checkedValue;
      } else {
        this.componentValue = [];
      }
      this.$emit("input", this.componentValue);
    },
    getIndeterminate() {
      return (
        this.componentValue.length !== 0 
        && this.componentValue.length !== this.componentOptions.length
      );
    },
    getStatus(disabled) {
      if (typeof disabled !== 'undefined') {
        return disabled;
      } else {
        return this.disabled;
      }
    }
  }
};
</script>
