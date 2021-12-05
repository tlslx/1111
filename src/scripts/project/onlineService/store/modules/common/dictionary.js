export default {
  namespaced: true,
  state: {
    osDictionaryData: {
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
      // 交易团
      "businessDelegation": [
        {
          "label": "北京",
          "code": "01",
          "value": "01"
        },
        {
          "label": "上海",
          "code": "02",
          "value": "02"
        },
        {
          "label": "江苏",
          "code": "03",
          "value": "03"
        },
        {
          "label": "湖南",
          "code": "04",
          "value": "04"
        },
        {
          "label": "广州",
          "code": "05",
          "value": "05"
        },
        {
          "label": "海南",
          "code": "06",
          "value": "06"
        }
      ],
      // 展区
      "exhibitionArea": [
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
      // 展品专区
      "productTypeOpts": [
        {
          label: '五金',
          code: 'HT01',
          exhibitionList: [
            { value: "HT01001", label: "铁艺制品" },
            { value: "HT01002", label: "紧固件" },
            { value: "HT01003", label: "阀门/管件" },
            { value: "HT01004", label: "焊接用材料" },
            { value: "HT01005", label: "家具五金" },
            { value: "HT01006", label: "建筑五金" },
            { value: "HT01007", label: "门窗五金" },
            { value: "HT01008", label: "锁具及配件" },
            { value: "HT01009", label: "浴室五金及配件" },
            { value: "HT01011", label: "装饰五金" },
            { value: "HT01014", label: "索具" },
            { value: "HT01015", label: "绳线类" },
            { value: "HT01016", label: "钉类" },
            { value: "HT01017", label: "手推车/平板车及配件" },
            { value: "HT01018", label: "货架/支架及配件" },
            { value: "HT01019", label: "金属丝、网" },
            { value: "HT01020", label: "消防器材" },
            { value: "HT01999", label: "其他五金制品" }
            // {  }
          ]
        },
        {
          label: '餐厨用具',
          code: 'CG01',
          exhibitionList: [
            { value: "CG01001", label: "烘焙用具" },
            { value: "CG01002", label: "厨房刀具及附件" },
            { value: "CG01003", label: "餐具" },
            { value: "CG01004", label: "饮具" },
            { value: "CG01005", label: "酒吧酒具" },
            { value: "CG01006", label: "桌面装饰品" },
            { value: "CG01007", label: "烹调工具" },
            { value: "CG01008", label: "炊具" },
            { value: "CG01009", label: "不锈钢器皿" },
            { value: "CG01010", label: "搪瓷器皿" },
            { value: "CG01011", label: "其他材料器皿" },
            { value: "CG01012", label: "保鲜用品" },
            { value: "CG01013", label: "自助餐用具" },
            { value: "CG01014", label: "烟具" },
            { value: "CG01999", label: "其他餐厨用具" }
          ]
        },
        {
          label: '工具',
          code: 'HT02',
          exhibitionList: [
            { value: "HT02001", label: "建筑工具" },
            { value: "HT02002", label: "园林工具及农具" },
            { value: "HT02003", label: "手动工具" },
            { value: "HT02004", label: "起重工具" },
            { value: "HT02005", label: "动力工具配件" },
            { value: "HT02006", label: "动力工具" },
            { value: "HT02007", label: "量具" },
            { value: "HT02008", label: "电动工具" },
            { value: "HT02009", label: "工具零件" },
            { value: "HT02010", label: "安防工具及用品" },
            { value: "HT02011", label: "组合工具" },
            { value: "HT02012", label: "工具包装" },
            { value: "HT02013", label: "磨具" },
            { value: "HT02014", label: "焊接工具" },
            { value: "HT02999", label: "其他工具" }
          ]
        },
        {
          label: '宠物用品',
          code: 'CG06',
          exhibitionList: [
            { value: "CG06001", label: "水族馆用品及配件" },
            { value: "CG06002", label: "宠物服饰/配件" },
            { value: "CG06003", label: "宠物床及附件" },
            { value: "CG06004", label: "宠物食具及附件" },
            { value: "CG06005", label: "宠物笼" },
            { value: "CG06006", label: "宠物棺材与坟墓" },
            { value: "CG06007", label: "宠物清洁与美容用品" },
            { value: "CG06008", label: "宠物项圈和牵引带" },
            { value: "CG06009", label: "宠物食品" },
            { value: "CG06010", label: "宠物营养保健品" },
            { value: "CG06011", label: "宠物玩具" },
            { value: "CG06012", label: "宠物训导用品" },
            { value: "CG06013", label: "宠物旅行与户外用品" },
            { value: "CG06999", label: "其他宠物用品" }
          ]
        },
        {
          label: '淋浴设备',
          code: 'BM02',
          exhibitionList: [
            { value: "BM02001", label: "淋浴类" },
            { value: "BM02002", label: "浴室家居" },
            { value: "BM02003", label: "水龙头" },
            { value: "BM02005", label: "厕所设备" },
            { value: "BM02006", label: "浴缸类" },
            { value: "BM02007", label: "浴室五金件类" },
            { value: "BM02008", label: "泳池设备" },
            { value: "BM02999", label: "其他卫浴设备" }
          ]
        },
        {
          label: '家用电器',
          code: 'EH04',
          exhibitionList: [
            { value: "EH04001", label: "空气处理家电" },
            { value: "EH04002", label: "清洁家电" },
            { value: "EH04003", label: "家电零部件" },
            { value: "EH04004", label: "家用取暖器" },
            { value: "EH04005", label: "厨房家电" },
            { value: "EH04006", label: "洗熨家电" },
            { value: "EH04007", label: "冷冻家电" },
            { value: "EH04008", label: "热水器" },
            { value: "EH04009", label: "水处理家电" },
            { value: "EH04010", label: "太阳能家电" },
            { value: "EH04011", label: "抽油烟机、灶具" },
            { value: "EH04012", label: "小家电" },
            { value: "EH04999", label: "其他家用电器" }
          ]
        },
        {
          label: '食品',
          code: 'FN01',
          exhibitionList: [
            { value: "FN01001", label: "酒精饮料" },
            { value: "FN01002", label: "婴儿食品" },
            { value: "FN01003", label: "烘焙食品" },
            { value: "FN01004", label: "豆制品" },
            { value: "FN01005", label: "罐装食品" },
            { value: "FN01006", label: "辣椒制品" },
            { value: "FN01007", label: "糖果" },
            { value: "FN01008", label: "乳制品" },
            { value: "FN01009", label: "食品配料" },
            { value: "FN01010", label: "水果制品" },
            { value: "FN01011", label: "谷物制品" },
            { value: "FN01012", label: "蜂蜜及其制品" },
            { value: "FN01013", label: "方便食品" },
            { value: "FN01014", label: "禽畜肉" },
            { value: "FN01015", label: "水产" },
            { value: "FN01016", label: "食品调味料" },
            { value: "FN01017", label: "软饮料" },
            { value: "FN01018", label: "茶叶" },
            { value: "FN01019", label: "蔬菜制品" },
            { value: "FN01020", label: "食品包装" },
            { value: "FN01021", label: "畜禽产品" },
            { value: "FN01022", label: "豆状种子" },
            { value: "FN01023", label: "豆类" },
            { value: "FN01024", label: "新鲜水果" },
            { value: "FN01025", label: "新鲜蔬菜" },
            { value: "FN01026", label: "谷物" },
            { value: "FN01027", label: "食用菌" },
            { value: "FN01028", label: "坚果和果仁" },
            { value: "FN01029", label: "动植物油" },
            { value: "FN01030", label: "香烟" },
            { value: "FN01999", label: "其他食品" }
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
        },
        {
          "label": "审核中",
          "code": "3",
          "value": "3"
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
        },
        {
          "label": "近两年参加国际专业展",
          "code": "10",
          "value": "10"
        },
        {
          "label": "参与商务部组织对外经济合作、援助项目",
          "code": "11",
          "value": "11"
        }
      ],
      // 新资质来源
      "aptitudeSourceT": [
        {
          "label": "本企业所有",
          "code": "1",
          "value": "1"
        },
        {
          "label": "全资子公司",
          "code": "2",
          "value": "2"
        },
        {
          "label": "控股子公司",
          "code": "3",
          "value": "3"
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
          "label": "绿色特装",
          "code": "SPECIAL_BOOTH",
          "value": "SPECIAL_BOOTH"
        },
        {
          "label": "标摊",
          "code": "STANDARD_BOOTH",
          "value": "STANDARD_BOOTH"
        },
        {
          "label": "中央通道",
          "code": "CENTER_CHANNEL_BOOTH",
          "value": "CENTER_CHANNEL_BOOTH"
        },
        {
          "label": "统一布展",
          "code": "UNIFICATION_BOOTH",
          "value": "UNIFICATION_BOOTH"
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
          "label": "待审核",
          "code": "1",
          "value": "1"
        },
        {
          "label": "待审核",
          "code": "2",
          "value": "2"
        },
        {
          "label": "审核通过",
          "code": "3",
          "value": "3"
        }
      ],
      // 认证类型
      authenticationCategory: [
        {
          "label": "管理体系认证",
          "code": "1",
          "value": "1"
        },
        {
          "label": "行业认证",
          "code": "2",
          "value": "2"
        }
      ],
      // 专利类型
      patentCategory: [
        {
          "label": "发明专利",
          "code": "1",
          "value": "1"
        },
        {
          "label": "新型实用专利",
          "code": "2",
          "value": "2"
        },
        {
          "label": "外观设计专利",
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
    osDictionaryData: state => state.osDictionaryData
  }
};
