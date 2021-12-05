export default {
  namespaced: true,
  state: {
    dictionaryData: {
      //是否合成
      "isMixture": [
        {
          "label": "是",
          "code": "01",
          "value": "01"
        },
        {
          "label": "否",
          "code": "02",
          "value": "02"
        }
      ],
      // 届数
      "sessionNums": [
        {
          "label": "第120届",
          "code": "01",
          "value": "01"
        },
        {
          "label": "第121届",
          "code": "02",
          "value": "02"
        },
        {
          "label": "第122届",
          "code": "03",
          "value": "03"
        },
        {
          "label": "第123届",
          "code": "04",
          "value": "04"
        },
        {
          "label": "第124届",
          "code": "05",
          "value": "05"
        },
        {
          "label": "第125届",
          "code": "06",
          "value": "06"
        }
      ],
      // 展期
      "issueNums": [
        {
          "label": "1期",
          "code": "01",
          "value": "01"
        },
        {
          "label": "2期",
          "code": "02",
          "value": "02"
        },
        {
          "label": "3期",
          "code": "03",
          "value": "03"
        },
        {
          "label": "4期",
          "code": "04",
          "value": "04"
        },
        {
          "label": "5期",
          "code": "05",
          "value": "05"
        }
      ],
      // 展区
      "places": [
        {
          "label": "A区",
          "code": "01",
          "value": "01"
        },
        {
          "label": "B区",
          "code": "02",
          "value": "02"
        },
        {
          "label": "C区",
          "code": "03",
          "value": "03"
        },
        {
          "label": "D区",
          "code": "04",
          "value": "04"
        },
        {
          "label": "E区",
          "code": "05",
          "value": "05"
        },
        {
          "label": "F区",
          "code": "06",
          "value": "06"
        },
        {
          "label": "G区",
          "code": "07",
          "value": "07"
        },
        {
          "label": "H区",
          "code": "08",
          "value": "08"
        }
      ],
      // 期数
      "phase": [
        {
          "label": "1",
          "code": "01",
          "value": "01"
        },
        {
          "label": "2",
          "code": "02",
          "value": "02"
        },
        {
          "label": "3",
          "code": "03",
          "value": "03"
        }
      ]
    }
  },
  getters: {
    dictionaryData: state => state.dictionaryData
  }
};
