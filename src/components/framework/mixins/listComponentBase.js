import Utility from '@/scripts/framework/utility';
export default {
  props: {
    value: {},
    options: Array,
    disabled: Boolean,
    dataDictionary: String,
    textField: { type: String, default: 'text' },
    valueField: { type: String, default: 'value' },
    url: { type: String },
    baseUrl: { type: String, default: '' },
    params: { type: Object, default: null },
    httpData: { type: Object, default: null },
    loadingText: { type: String, default: '正在加载' }
  },
  data() {
    return {
      loading: false,
      itemTextField: this.textField,
      itemValueField: this.valueField,
      dataUrl: this.url,
      queryParams: this.params || {},
      componentOptions: this.options || [],
      componentValue: this.value
    };
  },
  methods: {
    loadData() {
      var qParams = this.queryParams || {};
      var url = Utility.genServiceUrl(this.baseUrl, this.dataUrl);
      var data = { json: JSON.stringify(qParams) };
      if (this.httpData != null) {
        data = this.httpData;
      }
      this.$http.get(url, data).then((response) => {
        this.componentOptions = response.records;
        this.loading = false;
        this.$emit('load-success', response);
      });
    },
    getArrayItemBy(list, keyName, keyValue) {
      var result;
      for (let index = 0; index < list.length; index++) {
        let item = list[index];
        if (item[keyName] === keyValue) {
          result = item;
          continue;
        }
      }
      return result;
    },
    onChange(value) {
      var text = "";
      var item = this.getArrayItemBy(this.componentOptions, this.valueField, value);
      if (item != null && typeof item !== 'undefined') {
        text = item[this.textField];
      }
      // 庞亦华，原来是返回整个数据集，改为返回当前选中的数据
      // 20181004
      // this.$emit('change', value, text, this.componentOptions )
      this.$emit('change', value, text, item);
    },
    onInput(value) {
      this.$emit('input', value);
    }
  },
  watch: {
    value(value) {
      this.componentValue = !String.isNullOrEmpty(value) ? value : (this.multiple ? [] : '');
    },
    option(value) {
      this.componentOptions = value || [];
    },
    loading(value) {
      if (value) {
        this.loadData();
      }
    },
    dataDictionary(value) {
      this.componentOptions = this.$store.getters.dataDictionary[value] || [];
    }
  },
  created() {
    if (!String.isNullOrEmpty(this.url)) {
      this.loading = true;
    } else if (!String.isNullOrEmpty(this.dataDictionary)) {
      this.$nextTick(() => {
        this.componentOptions = this.$store.getters.dataDictionary[this.dataDictionary] || [];
      });
    }
  }
};
