import { DatePicker } from 'element-ui';
let base = {
  watch: {
    value: {
      immediate: true,
      handler: function (newValue) {
        if (typeof newValue !== 'undefined' && typeof newValue === 'string') {
          let datestr = newValue.replace(/-/g, '/');
          this.currentValue = Date.parse(datestr);
          this.$emit('input', this.currentValue);
        } else {
          this.currentValue = newValue;
        }
      }
    }
  }
};
DatePicker.mixins.push(base);
export default DatePicker;
