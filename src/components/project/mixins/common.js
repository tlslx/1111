export default {
  data () {
    return {
      isFullScreen: false,
      source: {
        language: {},
        status: [
          // { id: "0", value: "0", label: "未提交" },
          // { id: "1", value: "1", label: "待审核" },
          // { id: "2", value: "2", label: "审核不通过" },
          // { id: "3", value: "3", label: "审核通过" },
          // { id: "4", value: "4", label: "已撤回" }
        ],
        submitTypeOptions: [
          // { id: "0", value: "0", label: "拒绝" },
          // { id: "1", value: "1", label: "通过" },
          // { id: "2", value: "-1", label: "撤回" }
        ]
      }
    };
  },
  async created() {
    // // 读取数据字典
    //   this.source.languageSelection = await kindo.dictionary.get('languageType');
    // 读取国际化
    this.source.language = kindo.util.getLanguage('TemplateMapLang');
    this.source.status = [
      { id: "0", value: "0", label: this.source.language.unsubmitted },
      { id: "1", value: "1", label: this.source.language.pendingReview },
      { id: "2", value: "2", label: this.source.language.auditNotPassed },
      { id: "3", value: "3", label: this.source.language.auditPassed },
      { id: "4", value: "4", label: this.source.language.withdrawn }
    ];
    this.source.submitTypeOptions = [
      { id: "0", value: "0", label: this.source.language.refuse },
      { id: "1", value: "1", label: this.source.language.pass },
      { id: "2", value: "-1", label: this.source.language.recall },
      { id: "3", value: "2", label: this.source.language.submit }
    ]; 
  },
  methods: {
    // 表格内容居中
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    // 对话框是否全屏显示
    onChangeSize() {
      this.isFullScreen = !this.isFullScreen;
    }
  }
};
