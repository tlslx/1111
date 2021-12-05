export default {
  namespaced: true,
  state: {
    dicTypeData: {
     //产品类别
      exType: [
        {

          value: "EH05",
          text: "电子消费及信息消费品"
        },
        {
          value: "MA02",
          text: "大型机械及设备"
        },
        {

          value: "OF03",
          text: "体育及旅游休闲用品"
        },
        {

          value: "BM02",
          text: "卫浴设备"
        },
        {
          value: "CG06",
          text: "宠物用品"
        }
      ],
      exTypeTwo: [
        {
          value: "EH0501",
          text: "计算机附件",
          pValue: "EH05"
        },
        {
          value: "0102",
          text: "计算机部件",
          pValue: "EH05"
        },
        {
          value: "0103",
          text: "计算机网络设备",
          pValue: "EH05"
        },
        {
          value: "0104",
          text: "家用音频设备",
          pValue: "EH05"
        },
        {
          value: "0105",
          text: "个人通讯产品",
          pValue: "EH05"
        },
        {
          value: "0201",
          text: "挖掘机",
          pValue: "MA02"
        },
        {
          value: "0301",
          text: "网球",
          pValue: "OF03"
        },
        {
          value: "0401",
          text: "浴霸",
          pValue: "BM02"
        },
        {
          value: "0501",
          text: "水族馆用品及配件",
          pValue: "05"
        },
        {
          value: "0502",
          text: "宠物项圈和牵引带",
          pValue: "CG06"
        }
      ],
      exTypeThree: [
        {
          value: "010101",
          text: "刻录盘",
          pValue: "0101"
        },
        {
          value: "010102",
          text: "usb新奇特产品",
          pValue: "0101"
        },
        {
          value: "010103",
          text: "摄像头",
          pValue: "0101"
        },
        {
          value: "010104",
          text: "笔记本电脑包",
          pValue: "0101"
        },
        {
          value: "010105",
          text: "键盘鼠标套装",
          pValue: "0101"
        },
        {
          value: "010106",
          text: "无限摄像头",
          pValue: "0101"
        },
        {
          value: "010107",
          text: "数字媒体播放器",
          pValue: "0101"
        },
        {
          value: "010201",
          text: "硬盘盒",
          pValue: "0102"
        },
        {
          value: "010301",
          text: "服务器",
          pValue: "0103"
        },
        {
          value: "010302",
          text: "网络存储",
          pValue: "0103"
        },
        {
          value: "010401",
          text: "扩音器",
          pValue: "0104"
        },
        {
          value: "010402",
          text: "液晶电视",
          pValue: "0104"
        },
        {
          value: "010501",
          text: "PET保护膜胶带",
          pValue: "0105"
        },
        {
          value: "020101",
          text: "婴儿布鞋",
          pValue: "0201"
        },
        {
          value: "020102",
          text: "婴儿注塑鞋",
          pValue: "0201"
        },
        {
          value: "030101",
          text: "烘焙套装",
          pValue: "0301"
        },
        {
          value: "030102",
          text: "蛋糕工具",
          pValue: "0301"
        },
        {
          value: "030103",
          text: "硅胶蛋糕模",
          pValue: "0301"
        },
        {
          value: "030104",
          text: "微波炉手套",
          pValue: "0301"
        },
        {
          value: "040101",
          text: "罗盘",
          pValue: "0401"
        },
        {
          value: "040102",
          text: "鱼缸",
          pValue: "0401"
        },
        {
          value: "050101",
          text: "宠物牵引带",
          pValue: "0501"
        }
      ]
    }
  },
  getters: {
    dicTypeData: state => state.dicTypeData
  }
};
