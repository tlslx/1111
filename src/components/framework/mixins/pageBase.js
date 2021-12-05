export default {
  data() {
    return {
      pageId: '',
      customDictData: {},
      customRelateDictData: {},
      dictRelateKeys: [],
      baseUrl: String,
      comsApiUrl: process.env.API_COMS_URL,
      preUrl: String
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    dataDictionary() {
      let dictData = this.$store.getters.dataDictionary;
      if (this.$utility.isEmpty(this.customRelateDictData)) {
        this.dictRelateKeys.forEach(item => {
          var fromData = dictData[item.from];
          if (!this.$utility.isEmpty(fromData)) {
            this.customRelateDictData[item.to] = fromData;
          }
        });
      }

      return Object.assign(dictData, this.customDictData, this.customRelateDictData);
    },
    isSystemAdmin() {
      if (!String.isNullOrEmpty(process.env.SYSTEM_ADMIN) && this.$store.getters.isSystemAdmin == null) {
        let account = this.userInfo.account;
        let isSystemAdmin = false;
        let systemAdmin = process.env.SYSTEM_ADMIN.split(',');
        for (let i = 0, len = systemAdmin.length; i < len; i++) {
          if (account && systemAdmin[i] && systemAdmin[i].toLowerCase() === account.toLowerCase()) {
            isSystemAdmin = true;
            break;
          }
        }
        this.$store.commit('userInfo/systemAdmin', isSystemAdmin);
      }
      return this.$store.getters.isSystemAdmin;
    },
    page() {
      let _this = this;
      let page = _this;
      while (!(page.isListPage || page === undefined || page == null)) {
        page = page.$parent;
      }
      return page || this;
    }
  },
  methods: {
    genActionUrl(action) {
      var url = "";
      if (!this.$utility.isEmpty(this.baseUrl)) {
        url = this.baseUrl;
      }
      if (!this.$utility.isEmpty(this.preUrl)) {
        url = url + this.preUrl;
      }
      return url + action;
    },
    dataDict(row, column, val) {
      return this.$formatter.dataDictionary(row, column, null, this.dataDictionary);
    },
    datetime(row, column) {
      return this.$formatter.datetime(row, column);
    },
    date(row, column) {
      return this.$formatter.date(row, column);
    },
    right: function (action) {
      let rightList = this.$store.getters.right;
      for (let i = 0; i < rightList.length; i++) {
        let r = rightList[i];
        // if (r.pageCode === 'sysmgr/sysmenumgr') {
        //   console.log(r.pageId === this.pageId 
        //     || (!this.$utility.isEmpty(r.pageCode) 
        //       && r.pageCode === this.pageId));
        // }
        if (r.pageId === this.pageId 
          || (!this.$utility.isEmpty(r.pageCode) 
            && r.pageCode === this.pageId)) {
          return r.right[action];
        }
      }
      return true;
    },
    getDictionaryText(dicCode, value) {
      let temp = this.dataDictionary;
      temp = temp || this.$store.getters.temp;
      let data = temp[dicCode];
      if (!data) {
        return '';
      }
      for (let i = 0, len = data.length; i < len; i++) {
        if (value === data[i].value) {
          return data[i].text;
        }
      }
      return '';
    }
  }
};
