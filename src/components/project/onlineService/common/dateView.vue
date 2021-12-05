<style scoped>

</style>
<template>
  <div>
    <el-date-picker
      v-model="value"
      type="date"
      size="mini"
      :readonly="readonly"
      placeholder="选择日期"
      @change="changeDate"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: this.defaultValue,
      pickerOptions: {
        disabledDate: () => {

        }
      }
    };
  },
  computed: {
  },
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeDate(val) {
      this.$emit('date-change', val);
    }
  }
};
</script>


