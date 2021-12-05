export const exhibitionPeriod = {
  data() {
    return {
      api: {
        getExhibitionNumAll: kindo.config.api.expUrl + "/api/exp/exhibitions",
        getExhibitionType: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/getExhibitioAreaScheme"  // 根据届别 展期 获取明细表单的展览大类
      },
      isFullScreen: false,
      visible: false,
      visibleInfo: false,
      action: '',
      detailAction: '',
      rowdata: {},
      isAdd: false,
      isClone: false,
      // reset: false,  // 判断是否有不匹配展区
      detailDisabled: true,  // 对届别和展期置灰
      detailTableData: [],  // 根据明细列表数据，判断child表单届别，展期 置灰
      index: '',
      rowIndex: '',
      queryParams: {
        exhibitionNum: '',
        exhibitionPeriodNum: '',
        schemeName: '',
        state: ''
      },
      child: { 
        exhibitionNum: "",
        exhibitionPeriodNum: "",
        schemeName: "",
        schemeStatus: ""
      }, 
      list: [],  // 根据届别 展期接收请求回的数据，将展览大类，展区 做成层级结构数据
      exhibitionTypeList: [],
      resultData: [], // 根据届别 展期接收请求回的数据
      cloneData: [], // 复制数据时，选择届别，展期后，判断复制的数据是否存在该届别和展期里面
      notExist: [],  // 复制时根据展区接收不匹配的展区数据
      notUnit: [], // 复制时根据安排单位接收不匹配的展区数据
      notExists: [],
      notUnits: [],
      source: {
        language: {},
        // 展区名称
        exhibitionAreaCodeData: [],
        exhibitionAreaCodes: [],
        // 届别
        exhibitionNum: [],
        // 届别
        hisExhibitionNum: [],
        // 展期
        exhibitionPeriodNum: [],
        exhibitionPeriodNums: [],
        // 展览大类
        exhibitionType: [],
        exhibitionTypeData: []
      },
      queryRules: {
        exhibitionNum: [
          // { required: false, message: "请输入届别", trigger: "change" },
          // { pattern: /^[1-9]{1}\d{0,5}$/, message: "请输入6位数以内的正整数" }
        ] 
      },
      rules: {
        exhibitionNum: [
          // { required: true, message: "请选择届别", trigger: "change" }
        ],
        exhibitionPeriodNum: [
          // { required: true, message: "请选择展期", trigger: "change" }
        ],
        schemeName: [
          // { required: true, message: "请输入方案名称", trigger: "change" },
          // { min: 1, max: 32, message: "请输入最多32个字符", trigger: "change" }
        ]
      }
    };
  },
  async created() {
     // 读取国际化
    this.source.language = kindo.util.getLanguage('ExtensionLang');
    this.source.exhibitionType = await kindo.dictionary.get('bigCategoryOfExhibits');   // 展览大类
    this.source.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
    this.source.exhibitionAreaCodes = await kindo.dictionary.get('exhibitionArea');    // 展区
    this.getExhibitionNum();
    this.queryRules.exhibitionNum = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^[1-9]{1}\d{0,5}$/, message: this.source.language.max6PositiveInteger }
    ];
    this.rules.exhibitionNum = this.rules.exhibitionPeriodNum = [
      { required: true, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.rules.schemeName = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^[^\s]*$/, message: this.source.language.isSpace },
      { min: 1, max: 32, message: this.source.language.maxChar32, trigger: "change" }
    ];
  },
  methods: {
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    onAction(action, row, list) {
      this.$refs.childDialog.visible = true;
      this.$refs.childDialog.action = action;

      if (row) {
        this.$refs.childDialog.rowdata = row;
      }
      list ? this.$refs.childDialog.associationList = list : this.$refs.childDialog.associationList = '';
    },
    // 获取届别
    getExhibitionNum() {
      this.$http.get(this.api.getExhibitionNumAll + '/getListAll').then(res => {
        let exhibitionNumList = [];
        res.forEach(el => {
          exhibitionNumList.push({
            id: el.exhibitionId.toString(),
            label: el.exhibitionNum.toString(),
            value: el.exhibitionNum.toString()
          });
        });
        this.source.exhibitionNum = exhibitionNumList;
      });
    },
    getHisExhibitionNum() {
      this.$http.get(this.api.getExhibitionNumAll + '/getListAll').then(res => {
        let exhibitionNumList = [];
        res.forEach(el => {
          exhibitionNumList.push({
            id: el.exhibitionId.toString(),
            label: el.exhibitionNum.toString(),
            value: el.exhibitionNum.toString()
          });
        });
        this.source.hisExhibitionNum = exhibitionNumList;
      });
    },
    // 根据届别 获取展期
    getExhibitionPeriodNum(url, val) {
      this.$nextTick(function () {
        this.$http.get(url + '/' + val + '/periods').then(res => {
          let exhibitionPeriodNumList = [];
          res.forEach(el => {
            exhibitionPeriodNumList.push({
              id: el.exhibitionPeriodId.toString(),
              label: kindo.dictionary.getLabel(this.source.exhibitionPeriodNum, el.exhibitionPeriodDictCode),
              value: el.exhibitionPeriodDictCode.toString()
            });
          });
          this.source.exhibitionPeriodNums = exhibitionPeriodNumList;
        }); 
      });
    },
    // 选择届别
    selectExhibitionNum() {
      if (this.action !== 'view') {
        this.child.exhibitionPeriodNum = '';
      }
      if (this.child.exhibitionNum) {
        this.$nextTick(function () {
          this.getExhibitionPeriodNum(this.api.getExhibitionNumAll, this.child.exhibitionNum);
        });
      }
    },
    // 选择展期时，先判断届别是否已存在
    selectExhibitionPeriodNum(val) {
      if (!val) {
        this.source.exhibitionPeriodNums = [];
        this.$message({
          type: 'warning',
          message: this.source.language.chooseFirstTime + this.source.language.exhibitionNum
        });
      }
    },
      // 对话框是否全屏显示
    onChangeSize() {
      this.isFullScreen = !this.isFullScreen;
    },
    // 选择展览大类时，根据展览大类得到级联下的展区
    async exhibitionTypeChange(val) {
      this.addmodel.exhibitionAreaCode = '';
      this.list.forEach(el => {
        if (val === el.exhibitionCategoryCode) {
          this.source.exhibitionAreaCodeData = el.children;
        }
      });
    },
    // 选择展区时，先判断展览大类是否已经选择
    selectExhibitionType(val) {
      if (!val) {
        this.source.exhibitionAreaCodeData = [];
        this.$message({
          type: 'warning',
          message: this.source.language.chooseFirstTime + this.source.language.categoryCode
        });
      } 
    },
    // 根据届别展期获取 展区方案设置中的数据
    getListData() {
      this.$http.get(this.api.getExhibitionType, { exhibitionNum: this.child.exhibitionNum.toString(), periodCode: this.child.exhibitionPeriodNum.toString() }).then(res => {
        this.source.exhibitionTypeData = [];
        this.source.exhibitionAreaCodeData = [];
        this.resultData = res;
        this.list = [];
        this.exhibitionTypeList = [];
        this.$nextTick(function () {
          res.forEach(item => {
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].exhibitionCategoryCode === item.exhibitionCategoryCode.toString()) {
                this.list[i].children.push({
                  id: item.schemeDetailId.toString(),
                  label: kindo.dictionary.getLabel(this.source.exhibitionAreaCodes, item.exhibitionAreaCode.toString()),
                  value: item.exhibitionAreaCode.toString()
                });
                return;
              }
            }
            this.list.push({
              id: item.schemeDetailId.toString(),
              exhibitionCategoryCode: item.exhibitionCategoryCode.toString(),
              children: [{
                id: item.schemeDetailId.toString(),
                label: kindo.dictionary.getLabel(this.source.exhibitionAreaCodes, item.exhibitionAreaCode.toString()),
                value: item.exhibitionAreaCode.toString()
              }]
            });
          }); 
          this.list.forEach(el => {
            this.exhibitionTypeList.push({
              id: el.id,
              label: kindo.dictionary.getLabel(this.source.exhibitionType, el.exhibitionCategoryCode),
              value: el.exhibitionCategoryCode
            });     
          });
          this.source.exhibitionTypeData = this.exhibitionTypeList;
        });
      });
    },
    includes(arr1, arr2) {
      return arr2.every(val => arr1.includes(val));
    },
    // 复制数据
    isCloneData() {
      this.$http.get(this.api.getExhibitionType, { exhibitionNum: this.child.exhibitionNum.toString(), periodCode: this.child.exhibitionPeriodNum.toString() }).then(res => {
        this.cloneData = [];  
        this.notExist = [];
        this.notUnit = [];
        this.isClone = false; 
        // 专区方案复制
        if (this.operational === '1' && this.action === 'clone') {
          this.$refs.zonePlanDetailTable.internalData.forEach((el, index) => {
            let reset = false;
            this.includesExpUnit = false;
            this.includesUnit = false;
            res.forEach(v => {
              if (this.includes(v.numArrangeOrg, el.numArrangeOrg.split(','))) {
                this.includesUnit = true;
                el.pkVal = null;
              }
              if (this.includes(v.positionArrangeOrg, el.positionArrangeOrg.split(','))) {
                this.includesExpUnit = true;
                el.pkVal = null;
              }
              if (el.exhibitionAreaCode === v.exhibitionAreaCode) {
                reset = true;
                el.pkVal = null;
                this.cloneData.push(v.exhibitionAreaCode);
              }  
            });
            if (!this.includesUnit || !this.includesExpUnit) {
              this.notUnit.unshift(el);
              el.pkVal = 'noMatch';
            }
            if (!reset) {
              this.notExist.unshift(el);
              el.pkVal = 'noMatch';
              this.isClone = true;
            }
          });
        }
        // 展位价格复制
        if (!this.operational && this.action === 'clone') {
          this.$refs.priceTableData.internalData.forEach((el, index) => {
            let resets = false;
            res.forEach(v => {
              if (el.exhibitionAreaCode === v.exhibitionAreaCode) {
                resets = true;
                el.pkVal = null;
                this.cloneData.push(v.exhibitionAreaCode);
              }
            });  
            if (!resets) {
              this.notExist.unshift(el);
              el.pkVal = 'noMatch';
              this.isClone = true;
            }
          });
        }
      });
    },
    rowStyle({ row, rowIndex }) {
      if (this.operational === '1' && this.action === 'clone') {
        this.$refs.zonePlanDetailTable.internalStripe = false;
      }
      if (!this.operational && this.action === 'clone') {
        this.$refs.priceTableData.internalStripe = false;
      }
      if (row.pkVal === 'noMatch') {
        return 'background:#E6A23C';
      }
    }
  },
  watch: {
    "child.exhibitionPeriodNum"(val) {
      if (val) {
        this.getListData();
      }
      if (val && this.action === 'clone') {
        this.isCloneData();
      }
      // 判断专区方案的届别和展期是否添加重复
      if ((val && this.operational === '1') && (this.action === 'clone' || this.action === 'add')) {
        this.isRepeat = false;
        this.$http.get(this.api.isRepeat, { exhibitionNum: this.child.exhibitionNum, exhibitionPeriodNum: this.child.exhibitionPeriodNum }).then(res => {
          if (res === true) {
            this.isRepeat = true;
            this.$message({
              type: 'warning',
              message: this.source.language.repeat
            });
          }
        });
      }
    },
    detailTableData(val) {
      if (this.action !== 'edit') {
        val.length ? this.detailDisabled = true : this.detailDisabled = false;
      }
    }
  },
  computed: {
    form: function () {
      return {
        queryParams: this.queryParams
      };
    },
    exhibitionAreaCodeData: function () {
      return this.source.exhibitionAreaCodeData;
    }
  }
};

export default exhibitionPeriod;
