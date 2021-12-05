<template>
  <el-radio-group v-model="componentValue" @change="onChange" @input="onInput" :size="buttonSize">
    <component :is="getComponentView()" v-for="item in componentOptions" :label="item[itemValueField]" :name="name" :key="item[itemValueField]" :disabled="getStatus(item.disabled)">{{item[itemTextField]}}</component>
  </el-radio-group>
</template>

<script>
import listComponentBase from '@/components/framework/mixins/listComponentBase';
export default {
  name: 'ElRadioList',
  mixins: [listComponentBase],
  props: {
    name: {},
    buttonView: Boolean,
    buttonSize: { type: String, default: 'small' }
  },
  methods: {
    getComponentView () {
      if (this.buttonView) {
        return 'ElRadioButton';
      } else {
        return 'ElRadio';
      }
    },
    getStatus (disabled) {
      if (typeof disabled !== 'undefined') {
        return disabled;
      } else {
        return this.disabled;
      }
    }
  }
};
</script>

<style>
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: -1px 0 0 0 #20a0ff;
}
</style>
