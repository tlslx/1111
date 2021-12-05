import { Select } from 'element-ui';
Select.watch.disabled = function () {
  if (this.multiple && this.resetInputHeight) {
    this.$nextTick(() => {
      this.resetInputHeight();
    });
  }
};
export default Select;

