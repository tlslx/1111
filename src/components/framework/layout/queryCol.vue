<template>
  <el-col :span="span">
    <label class="control-label" :style="{width: labelWidth}">{{label}}</label>
    <div class="control-item" :style="{'margin-left': labelWidth}">
      <slot></slot>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'ElQueryCol',
  props: {
    label: String,
    span: { type: Number, default: 8 },
    labelWidth: { type: String, default: '100px' }
  },
  computed: {
    getLabelSpan: function () {
      if (!String.isNullOrEmpty(this.label)) {
        return this.labelSpan;
      } else {
        return 0;
      }
    }
  }
};
</script>