export default {
  namespaced: true,
  state: {
    dictionaryData: {
      // 商协会
      "businessAssociation": [
        {
          "label": "日用品协会",
          "code": "01",
          "value": "01"
        },
        {
          "label": "电器协会",
          "code": "02",
          "value": "02"
        },
        {
          "label": "纺织品协会",
          "code": "03",
          "value": "03"
        },
        {
          "label": "乳制品协会",
          "code": "04",
          "value": "04"
        },
        {
          "label": "畜牧业协会",
          "code": "05",
          "value": "05"
        },
        {
          "label": "食品协会",
          "code": "06",
          "value": "06"
        }
      ],
      // 展品专区
      "productTypeOpts": [
        { 
          label: '大型机械及设备',
          code: 'MA02',
          exhibitionList: [
            { value: '1', label: '机床及金属加工机械' }, 
            { value: '2', label: '模具、塑料、包装机械' }, 
            { value: '3', label: '化工、纺织机械' }, 
            { value: '4', label: '厨具、食品、饮料机械' }, 
            { value: '5', label: '木工、建材机械及成套设备' }
            // {  }
          ]
        },
        {
          label: '宠物用品',
          code: 'CG06',
          exhibitionList: [
            { value: '1', label: '宠物用品' }, 
            { value: '2', label: '宠物食品' }
          ]
        },
        {
          label: '体育及旅游休闲用品',
          code: 'OF03',
          exhibitionList: [
            { value: '1', label: '体育器材' }, 
            { value: '2', label: '户外休闲用品' }
          ]
        },
        {
          label: '电子消费品及信息产品',
          code: 'EH05',
          exhibitionList: [
            { value: '1', label: '视听及娱乐产品' }, 
            { value: '2', label: '通讯产品' }, 
            { value: '3', label: '其他电子消费品' }
          ]
        },
        {
          label: '卫浴设备',
          code: 'BM02',
          exhibitionList: [
            { value: '1', label: '卫浴五金' }, 
            { value: '2', label: '淋浴房/桑拿房及配件' }, 
            { value: '3', label: '卫生陶瓷及浴室设备' }
          ]
        }
      ],
      // 展区
      "exhibitionAreaOpts": [
        { value: 'MA02', label: '大型机械及设备' },
        { value: 'CG06', label: '宠物用品' },
        { value: 'OF03', label: '体育及旅游休闲用品' },
        { value: 'EH05', label: '电子消费品及信息产品' },
        { value: 'BM02', label: '卫浴设备' }
        // { value: 'HD06', label: '铁石及水疗' },
        // { value: 'EH04', label: '家用电器' }
      ],
      // 交易团
      "delegation": [
        {
          "text": "北京",
          "code": "010",
          "value": "010"
        },
        {
          "text": "浙江",
          "code": "160",
          "value": "160"
        },
        {
          "text": "江苏",
          "code": "140",
          "value": "140"
        },
        {
          "text": "南京",
          "code": "150",
          "value": "150"
        },
        {
          "text": "新疆建设兵团",
          "code": "460",
          "value": "460"
        },
        {
          "text": "江西",
          "code": "200",
          "value": "200"
        }
      ],
      // 展区
      "exhibitionArea": [
        {
          "text": "餐厨用具",
          "code": "CG01",
          "value": "CG01"
        },
        {
          "text": "工具",
          "code": "HT02",
          "value": "HT02"
        },
        {
          "text": "家用电器",
          "code": "EH04",
          "value": "EH04"
        },
        {
          "text": "五金",
          "code": "HT01",
          "value": "HT01"
        },
        {
          "text": "食品",
          "code": "FN01",
          "value": "FN01"
        },
        {
          "text": "卫浴设备",
          "code": "BM02",
          "value": "BM02"
        },
        {
          "text": "铁石水疗",
          "code": "HD06",
          "value": "HD06"
        },
        {
          "text": "新能源",
          "code": "NE01",
          "value": "NE01"
        }
      ],
      // 展区类型
      "extensionCategory": [
        {
          "label": "汽车配件",
          "code": "01",
          "value": "01"
        },
        {
          "label": "纺织品",
          "code": "02",
          "value": "02"
        },
        {
          "label": "家电",
          "code": "03",
          "value": "03"
        },
        {
          "label": "陶瓷",
          "code": "04",
          "value": "04"
        },
        {
          "label": "日用品",
          "code": "05",
          "value": "05"
        },
        {
          "label": "食品",
          "code": "06",
          "value": "06"
        }
      ],
      // 推荐状态
      "recommendStatus": [
        {
          "label": "已推荐",
          "code": "01",
          "value": "01"
        },
        {
          "label": "未推荐",
          "code": "02",
          "value": "02"
        }
      ],
      // 审核结果
      // "businessApproveResult": [
      //   {
      //     "label": "审核中",
      //     "code": "0",
      //     "value": "0"
      //   },
      //   {
      //     "label": "通过",
      //     "code": "1",
      //     "value": "1"
      //   },
      //   {
      //     "label": "不通过",
      //     "code": "2",
      //     "value": "2"
      //   }
      // ],
      // 最终审核结果
      "approveResult": [
        {
          "label": "待审核",
          "code": "null",
          "value": "null"
        },
        {
          "label": "不同意",
          "code": "0",
          "value": "0"
        },
        {
          "label": "待交易团审核",
          "code": "1",
          "value": "1"
        },
        {
          "label": "待商协会审核",
          "code": "2",
          "value": "2"
        },
        {
          "label": "待广交会审核",
          "code": "3",
          "value": "3"
        },
        {
          "label": "已通过",
          "code": "4",
          "value": "4"
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
      ],
      // tradeGroupType
      "tradeGroupType": [
        {
          "label": "随省市交易团参展",
          "code": "0",
          "value": "0"
        },
        {
          "label": "随中央企业交易团参展",
          "code": "1",
          "value": "1"
        }
      ],
      // 审核结果
      "tradeApproveResult": [
        {
          "label": "不通过",
          "code": "0",
          "value": "0"
        },
        {
          "label": "通过",
          "code": "1",
          "value": "1"
        }
      ],
      "businessApproveResult": [
        {
          "label": "不通过",
          "code": "0",
          "value": "0"
        },
        {
          "label": "通过",
          "code": "1",
          "value": "1"
        }
      ],
      "cantonApproveResult": [
        {
          "label": "不通过",
          "code": "0",
          "value": "0"
        },
        {
          "label": "通过",
          "code": "1",
          "value": "1"
        }
      ],
      // 审核结果
      "checkStatus": [
        {
          "label": "未审核",
          "code": "0",
          "value": "0"
        },
        {
          "label": "审核通过",
          "code": "1",
          "value": "1"
        },
        {
          "label": "审核不通过",
          "code": "2",
          "value": "2"
        }
      ],
      // 企业资质
      "aptitudeKind": [
        {
          "label": "海关编码",
          "code": "01",
          "value": "01"
        },
        {
          "label": "境外注册商标",
          "code": "02",
          "value": "02"
        },
        {
          "label": "境内注册商标",
          "code": "03",
          "value": "03"
        },
        {
          "label": "品牌建设内容",
          "code": "04",
          "value": "04"
        },
        {
          "label": "国际通行认证",
          "code": "05",
          "value": "05"
        },
        {
          "label": "登记研发创新和自主知识产权",
          "code": "06",
          "value": "06"
        },
        {
          "label": "行业自律登记",
          "code": "07",
          "value": "07"
        },
        {
          "label": "广交会参展表现内容",
          "code": "08",
          "value": "08"
        },
        {
          "label": "国家和行业标准",
          "code": "09",
          "value": "09"
        }
      ],
      // 资质来源
      "aptitudeSource": [
        {
          "label": "本企业所有",
          "code": "1",
          "value": "1"
        },
        {
          "label": "绝对控股子公司所有",
          "code": "2",
          "value": "2"
        },
        {
          "label": "相对控股子公司所有",
          "code": "3",
          "value": "3"
        },
        {
          "label": "绝对控股母公司所有",
          "code": "4",
          "value": "4"
        },
        {
          "label": "绝对控股母公司的其他子公司所有",
          "code": "5",
          "value": "5"
        }
      ],
      "companyId": [
        {
          "label": "广东萌果科技有限公司",
          "code": "1",
          "value": "1"
        },
        {
          "label": "新科对外贸易有限公司",
          "code": "2",
          "value": "2"
        }
      ],
      "boothNo": [
        {
          "label": "2.C453  1.V7N9",
          "code": "01",
          "value": "01"
        },
        {
          "label": "2.C454",
          "code": "02",
          "value": "02"
        }
      ],
      // 展位类型
      "boothKind": [
        {
          "label": "一般性展位",
          "code": "0",
          "value": "0"
        },
        {
          "label": "特殊性展位",
          "code": "1",
          "value": "1"
        }
      ],
      // 布展类型
      "exhibitionKind": [
        {
          "label": "A",
          "code": "0",
          "value": "0"
        },
        {
          "label": "B",
          "code": "1",
          "value": "1"
        },
        {
          "label": "C",
          "code": "2",
          "value": "2"
        }
      ],
      // 审核进度
      auditResults: [
        {
          "label": "待审核",
          "code": "null",
          "value": "null"
        },
        {
          "label": "审核不通过",
          "code": "0",
          "value": "0"
        },
        {
          "label": "交易团待审核",
          "code": "1",
          "value": "1"
        },
        {
          "label": "工作部待审核",
          "code": "2",
          "value": "2"
        },
        {
          "label": "审核通过",
          "code": "3",
          "value": "3"
        }
      ],
      // 审核联合布展业务-类型
      type: [
        {
          "label": "申请方",
          "code": "1",
          "value": "1"
        },
        {
          "label": "联合方",
          "code": "2",
          "value": "2"
        }
      ]
    }
  },
  getters: {
    dictionaryData: state => state.dictionaryData
  }
};
