export default {
  namespaced: true,
  state: {
    dicCountryCity: {
      // 省
      provinces: [
        {
          value: "1100",
          text: "北京市"
        },
        {
          value: "3200",
          text: "江苏省"
        },
        {
          value: "3400",
          text: "安徽省"
        },
        {
          value: "4400",
          text: "广东省"
        }
      ],
      // 市
      city: [
        {
          value: "1100",
          text: "北京市",
          pValue: "1100"
        },
        {
          value: "3201",
          text: "南京市",
          pValue: "3200"
        },
        {
          value: "3202",
          text: "无锡市",
          pValue: "3200"
        },
        {
          value: "3203",
          text: "徐州市",
          pValue: "3200"
        },
        {
          value: "3204",
          text: "常州市",
          pValue: "3200"
        },
        {
          value: "3205",
          text: "苏州市",
          pValue: "3200"
        },
        {
          value: "3206",
          text: "南通市",
          pValue: "3200"
        },
        {
          value: "3401",
          text: "合肥市",
          pValue: "3400"
        },
        {
          value: "3402",
          text: "芜湖市",
          pValue: "3400"
        },
        {
          value: "3415",
          text: "六安市",
          pValue: "3400"
        },
        {
          value: "4401",
          text: "广州市",
          pValue: "4400"
        },
        {
          value: "4402",
          text: "韶关市",
          pValue: "4400"
        },
        {
          value: "4403",
          text: "深圳市",
          pValue: "4400"
        }
      ]
    }
  },
  getters: {
    dicCountryCity: state => state.dicCountryCity
  }
};
