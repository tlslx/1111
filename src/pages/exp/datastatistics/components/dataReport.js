import config from '../components';
import $ from 'jquery';
export const dataReport = {
  data () {
    return {
      config,
      action: "",
      tabindex: "0",
      activeName: 'first',
      rules: {
        period: [{ required: true, message: "请选择", trigger: "change" }],
        exhibitionYear: [{ required: true, message: "请选择", trigger: "change" }]
      },
      formstatCondition: "",
      hisformstatCondition: "",
      source: {
        period: [], // 届数
        tradeTeam: [], // 交易团
        recruitmentAgent: [], // 招展代理
        region: [], // 地区
        enterpriseType: [], // 企业类型
        enterpriseAttri: [], // 企业属性
        exhibitionPeriodNum: [], // 期数
        expRegion: [], // 展区
        expRegionType: [], // 展位性质
        proMenu: [], // 产品二级目录
        proThreeMenu: [], // 产品三级目录
        nationalRegion: [], // 国家地区
        productCategory: [], // 展品大类
        isNewEnterprise: [ // 新老参展企业
          { id: "1", value: "1", label: "是" },
          { id: "2", value: "0", label: "否" }
        ],
        expcheck: [
          { id: "1", value: "1", label: "是" },
          { id: "2", value: "0", label: "否" }
        ],
        histroyTag: [ // 企业参展历史标签
          { id: "1", value: "5", label: "参展5届以上" },
          { id: "2", value: "10", label: "参展10届以上" },
          { id: "3", value: "15", label: "参展15届以上" },
          { id: "4", value: "20", label: "参展20届以上" }
        ],
        language: {
          common: {}
        }
      }
    };
  },
  created () {
    this._forms = Object.assign({}, this.forms);
    this._hisforms = Object.assign({}, this.hisforms);
    // 读取国际化
    // this.source.language = kindo.util.getLanguage('FlatMapLang');
    // this.source.language.common = kindo.util.getLanguage('CommonLang');
  },
  mounted () {
    // this.$nextTick(function () {
    //   this.onResetQuery();
    // });
  },
  methods: {
    onQuery () {
      this.$refs.forms.validate((valid) => {
        if (valid) {
          // this.formstatCondition = this.forms.statCondition;
          // this.hisformstatCondition = this.hisforms.statCondition;
          this.$refs.table.reloadData();
        }
      });
    },
    // 重置条件为空查询
    onResetQuery () {
      this.forms = Object.assign({}, this._forms);
      this.hisforms = Object.assign({}, this._hisforms);
      // this.formstatCondition = '';
      // this.hisformstatCondition = '';
      this.$nextTick(function () {
        this.$refs.table.internalData = [];
        this.$refs.table.internalTotal = 0;
        this.$refs.table.internalTotalPage = 0;
        this.$refs.forms.clearValidate();
      });
      // this.$nextTick(function () {
      //   this.$refs.table.reloadData();
      //   this.$refs.forms.clearValidate();
      // });
    },
    handleClick (tab, event) {
      let $el = $(this.$el);
      let $left = $el.find(".more-control");
      this.tabindex = tab.index;
      if (this.tabindex === '1') {
        $left.css("display", "none");
      } else {
        $left.css("display", "block");
      }
      this.onResetQuery();
    },
    // 格式化反显,判断是否为中文
    formatInfo (row, column) {
      return row[column.property];
      // let regRule = /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$/;
      // if (!regRule.test(row[column.property]) && row[column.property] !== "") {
      //   return kindo.dictionary.getLabel(this.source[column.property], row[column.property]);
      // } else {
      //   return row[column.property];
      // }
    },
    formatTypeInfo (row, column, con) {
      // console.log(con);
      return kindo.dictionary.getLabel(this.source[con], row[column.property]);
    },
    // 下载
    onDownload (val) {
      this.$refs.downDialog.downVisible = true;
      this.$refs.downDialog.action = '';
      this.$nextTick(function () {
        this.$refs.downDialog.action = "add";
        this.$refs.downDialog.rowdata = val;
      });
    },
    isCenter ({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    // 导出
    export (data) {
      this.$refs.forms.validate((valid) => {
        if (valid) {
          let params = {
            customQueryParams: data
          };
          params = encodeURI(JSON.stringify(params));
          kindo.util.getdown(this.config.api.export + '?json=' + params);
        } else {
          kindo.util.alert('请先选择查询条件', '提示', 'warning');
        }
      });
    },
    // 公用触发方法
    onAction (action, form, row) {
      if (action === 'down') {
        if (this.activeName === 'first') {
          this.export(this.forms);
        } else {
          this.export(this.hisforms);
        }
      }
    },
    // 届数
    getPeriod () {
      this.$http.get(this.config.api.getall).then(res => {
        if (res.length) {
          res.forEach((item, index) => {
            let values = {
              id: item.exhibitionId.toString(),
              label: item.exhibitionNum.toString(),
              value: item.exhibitionNum.toString()
            };
            this.source.period.push(values);
          });
        }
      });
    },
    // 交易团
    getTrade () {
      let params = {
        customQueryParams: [
          {
            "name": "DEPT_TYPE",
            "findType": "EQ",
            "values": ["7"]
          }
        ]
      };
      let param = {
        json: params
      };
      this.$http.get(this.config.api.getdepart, param).then(res => {
        if (res.records.length) {
          res.records.forEach((item, index) => {
            let values = {
              id: item.deptCode,
              label: item.fullName,
              value: item.deptCode
            };
            this.source.tradeTeam.push(values);
          });
        }
      });
    },
    // 展品大类
    getCategory () {
      this.$http.get(this.config.api.getcategory).then(res => {
        if (res.length) {
          res.forEach((item, index) => {
            let values = {
              id: item.productcategoryid,
              label: item.productcategoryname,
              value: item.productcategoryid
            };
            this.source.productCategory.push(values);
          });
        }
      });
    },
    // 产品二级目录
    getProMenu (type) {
      let param = {
        level: 2
      };
      let url = this.config.api.getproMenu;
      if (type) {
        url = this.config.api.getimportMenu;
        param = {
          level: 1
        };
        this.$http.get(url, param).then(res => {
          for (let i in res) {
            let values = {
              id: res[i].proMenu.toString(),
              label: res[i].proMenuCh.toString(),
              value: res[i].proMenu.toString()
            };
            this.source.proMenu.push(values);
          }
        });
      } else {
        this.$http.get(url, param).then(res => {
          for (let i in res.exhibit_type_two) {
            let values = {
              id: i.toString(),
              label: res.exhibit_type_two[i].toString(),
              value: i.toString()
            };
            this.source.proMenu.push(values);
          }
        });
      }
    },
    // 产品三级目录
    getProThreeMenu (type) {
      let param = {
        level: 3
      };
      let url = this.config.api.getproMenu;
      if (type) {
        url = this.config.api.getimportMenu;
        param = {
          level: 2
        };
        this.$http.get(url, param).then(res => {
          for (let i in res) {
            let values = {
              id: res[i].proThreeMenu.toString(),
              label: res[i].proThreeMenuCh.toString(),
              value: res[i].proThreeMenu.toString()
            };
            this.source.proThreeMenu.push(values);
          }
        });
      } else {
        this.$http.get(url, param).then(res => {
          for (let i in res.exhibit_type_three) {
            let values = {
              id: i.toString(),
              label: res.exhibit_type_three[i].toString(),
              value: i.toString()
            };
            this.source.proThreeMenu.push(values);
          }
        });
      }
    },
    // 进口展国家地区
    getNation () {
      this.$http.get(this.config.api.getnation).then(res => {
        for (let i in res) {
          let values = {
            id: res[i].countryRegionId.toString(),
            label: res[i].nationalRegion.toString(),
            value: res[i].countryRegionId.toString()
          };
          this.source.nationalRegion.push(values);
        }
      });
    },
    // 进口展招商代理
    getRecruiment () {
      this.$http.get(this.config.api.getrecruiment).then(res => {
        for (let i in res) {
          let values = {
            id: res[i].exhibitionAgentId.toString(),
            label: res[i].recruitmentAgent.toString(),
            value: res[i].exhibitionAgentId.toString()
          };
          this.source.recruitmentAgent.push(values);
        }
      });
    }
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    },
    hisform: function () {
      return {
        queryParams: this.hisforms
      };
    }
  }
};

export default dataReport;
