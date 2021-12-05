export default {
  props: {
    url: { type: String, required: true },
    valueField: { type: String, required: true },
    textField: { type: String, required: true },
    multiple: { type: Boolean, default: true },
    selection: {},
    dialogTitle: { type: String, default: '选择器' }
  },
  data () {
    return {
      dialogVisible: false
    };
  },
  methods: {
    onCancelClick () {
      this.dialogVisible = false;
    },
    onConfirmClick () {
      this.dialogVisible = false;
    }
  }
};
