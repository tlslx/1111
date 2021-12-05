import { addResizeListener, removeResizeListener } from '@/scripts/framework/resizeEvent.js';
export default {
  props: {
    value: {},
    size: String,
    url: { type: String, required: true },
    valueField: { type: String, required: true },
    textField: { type: String, required: true },
    multiple: { type: Boolean, default: false },
    disabled: Boolean,
    dialogTitle: { type: String, default: '选择器' },
    clearable: { type: Boolean, default: true },
    returnType: { type: String, default: "array" }
  },
  data() {
    return {
      componentValue: '',
      selection: [],
      selectnode: [],
      iconCls: 'caret-top',
      pickerDialog: null,
      componentHeight: '',
      inputHovering: false
    };
  },
  created() {
    this.initComponentValue(this.value);
  },
  mounted() {
    if (this.multiple) {
      addResizeListener(this.$el, this.handleResize);
    }
  },
  computed: {
    iconClass() {
      if (!this.multiple && this.clearable && this.inputHovering && this.componentValue.length > 0) {
        return 'circle-close';
      } else {
        return 'caret-top';
      }
    }
  },
  methods: {
    handleResize() {
      this.setComponentHeight();
    },
    onClick(event) {
      if (event.target.tagName === 'I' && this.iconClass === 'circle-close') {
        this.componentValue = [];
        this.$emit('input', '');
        this.$emit('clear');
      } else if (!this.disabled) {
        this.pickerDialog.selection = this.selection;
        this.pickerDialog.dialogVisible = true;
      }
    },
    onSelectionOne(selection) {
      this.selectnode = selection;
      if (this.selectnode.length > 0) {
        this.$emit('input', this.selectnode[0][this.valueField], this.selectnode[0][this.textField], this.selectnode[0]);
        this.$emit('change', this.selectnode[0][this.valueField], this.selectnode[0][this.textField], this.selectnode[0]);
      } else {
        this.$emit('input', {});
        this.$emit('change', {});
      }
    },
    onSelectionChange(selection) {
      this.selection = selection;
      if (!this.multiple) {
        if (this.selection.length > 0) {
          if (this.returnType === "array") {
            this.$emit('input', [this.selection[0][this.valueField]], [this.selection[0][this.textField]], [this.selection[0]]);
            this.$emit('change', [this.selection[0][this.valueField]], [this.selection[0][this.textField]], [this.selection[0]]);
          } else {
            this.$emit('input', this.selection[0][this.valueField], this.selection[0][this.textField], this.selection[0]);
            this.$emit('change', this.selection[0][this.valueField], this.selection[0][this.textField], this.selection[0]);
          }
        } else if (this.returnType !== "array") {
          if (this.returnType === "array") {
            this.$emit('input', []);
            this.$emit('change', []);
          } else {
            this.$emit('input', {});
            this.$emit('change', {});
          }
        }
      } else if (this.multiple) {
        // console.log(this.showcheckbox);
        if (this.selection.length > 0) {
          let values = [];
          let texts = [];
          this.selection.forEach((row) => {
            values.push(row[this.valueField]);
            texts.push(row[this.textField]);
          });
          this.$emit('input', values, texts, this.selection);
          this.$emit('change', values, texts, this.selection);
        } else {
          this.$emit('input', []);
          this.$emit('change', []);
        }
      }
    },
    initDefaultSelection() {
      this.selection = [];
      if (this.componentValue) {
        this.componentValue.forEach((value) => {
          this.selection.push({ [this.valueField]: value, [this.textField]: value });
        });
      }
    },
    loadSelection() {
      this.initDefaultSelection();
      if (this.componentValue.length > 0) {
        let queryParams = [];
        queryParams.push({ 'Name': this.valueField, 'FindType': 'IN', 'Values': this.componentValue });
        this.$http.get(this.url, { 
          json: { 
            OrderModelField: [], CustomQueryParams: queryParams 
          } 
        }).then((data) => {
          this.selection = data.records;
        });
      }
      this.pickerDialog.selection = this.selection;
    },
    initComponentValue(value) {
      if (!value) {
        this.componentValue = [];
      } else if (typeof value === 'string') {
        this.componentValue = [value];
      } else {
        this.componentValue = value;
      }
    },
    deleteItem(index) {
      this.selection.splice(index, 1);
      this.pickerDialog.selection = this.selection;
      if (this.multiple) {
        // console.log(this.showcheckbox);
        if (this.selection.length > 0) {
          let values = [];
          let texts = [];
          this.selection.forEach((row) => {
            values.push(row[this.valueField]);
            texts.push(row[this.textField]);
          });
          this.$emit('input', values, texts, this.selection);
          this.$emit('change', values, texts, this.selection);
        } else {
          this.$emit('input', []);
          this.$emit('change', []);
        }
      }
    },
    getInputText() {
      if (!this.multiple && this.selection.length > 0) {
        return this.selection[0][this.textField];
      } else {
        return '';
      }
    },
    setComponentHeight() {
      this.$nextTick(() => {
        if (this.$refs['tags'] && this.$refs['input']) {
          let height = '';
          if (this.multiple && this.$refs['tags'].clientHeight > 0) {
            height = (this.$refs['tags'].clientHeight + 6) + 'px';
          }
          let inputChildNodes = this.$refs['input'].$el.childNodes;
          let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
          input.style.height = height;
        }
      });
    },
    isNewComponentValue() {
      if ((this.componentValue.length !== this.selection.length)) {
        return true;
      } else {
        for (let i = 0, len = this.componentValue.length; i < len; i++) {
          if (this.componentValue[i] !== this.selection[i][this.valueField]) {
            return true;
          }
        }
        return false;
      }
    }
  },
  watch: {
    value(newValue) {
      this.initComponentValue(newValue);
      if (this.isNewComponentValue()) {
        this.loadSelection();
      }
      this.setComponentHeight();
    },
    selection() {
      this.setComponentHeight();
    }
  },
  beforeDestroy() {
    if (this.$el && this.multiple && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize);
    }

    if (typeof this.pickerDialog.$el.parentNode !== 'undefined') {
      this.pickerDialog.$el.parentNode.removeChild(this.pickerDialog.$el);
    }
    this.pickerDialog.$destroy();
  }
};
