<template>
  <div class="print_page">
    <h1 style="margin-bottom: 2px"><img src="../../../../static/img/print/printHead.jpg" style="width: 20%; height:40px;margin-left: 5px;margin-top: 5px"></h1>
    <hr align=center width="100%" color="#000000" SIZE="2">
    <h1 style="margin: 0px auto;margin-top:10px;text-align: center; width: 60%">第{{exhibitionSession}}届广交会铁石装饰品及户外水疗设施展区基数外展位需求申报</h1>
    <div style="display: flex;font-size: 1.2em; margin-top: 25px;">
      <div style="flex: 1">交易团:&nbsp;&nbsp;&nbsp;{{delegationName}}</div>
      <div style="flex: 1">日期:&nbsp;&nbsp;&nbsp;{{defaultDate}}</div>
      <div style="flex: 1">盖章:</div>
    </div>
    <p style="font-size: 12px; margin: 5px 0 0 0">注:</p>
    <p style="font-size: 12px; margin: 0">1、提交的企业需符合广交会参展资质, 且展品需符合该展区展品范围。</p>
    <p style="font-size: 12px; margin: 0 0 2px 0">2、请于0000年00月00日24时前填报本表, 打印盖章后传真至广交会工作领导小组办公室秘书处(FAX: 020-89138550)。</p>
    <table class="default-table">
      <tr>
        <th>期数</th>
        <th>展品专区</th>
        <th>广交会编码</th>
        <th>企业名称</th>
        <th>申报展位数</th>
      </tr>
      <tr v-for="(item, index) in tableFormData" :key="index">
        <td class="tac">{{item.exhibitionPeriod | nper}}</td>
        <td class="tac">{{item.specialAreaCode | speCode}}</td>
        <td class="tac">{{item.companyCecfCode}}</td>
        <td class="tac">{{item.companyCn}}</td>
        <td class="tac">{{item.boothNumber}}</td>
      </tr>
      <tr>
        <td colspan="4" class="tab">申请基数外展位小计</td>
        <td class="tac">{{num}}</td>
      </tr>
      <tr>
        <td colspan="4" class="tab">基数内铁石装饰品类别展位数</td>
        <td class="tac">{{initialNumber || 0}}</td>
      </tr>
      <tr>
        <td colspan="4" class="tab">合计</td>
        <td class="tac">{{(Number(num) + Number(initialNumber)) || 0}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { $date } from "@/scripts/project/utils";
import { mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      tableFormData: [],
      num: this.$route.query.num,
      initialNumber: this.$route.query.initialNumber,
      exhibitionSession: '',
      defaultDate: $date.format(new Date(), 'yyyy-MM-dd hh:mm'),
      delegationName: this.$store.getters.userInfo.org.deptName
    };
  },
  filters: {
    nper(data) {
      if (data === "1") {
        return "第一期";
      } else if (data === "2") {
        return "第二期";
      } else if (data === "3") {
        return "第三期";
      }
    },
    speCode(data) {
      if (data === "HD06_2") {
        return "铁石装饰品";
      } else if (data === "HD06_1") {
        return "户外水疗设施";
      }
    }
  },
  created() {
    let list = JSON.parse(this.$route.query.data);
    this.tableFormData = list;
    this.getcurrentExhibitionSession().then(res => {
      this.exhibitionSession = res;
    });
  },
  mounted() {
    this.$nextTick(() => {
      window.print.portrait = false;
      setTimeout(() => {
        window.print();
      }, 2000);
    });
  },
  computed: {
  },
  methods: {
    ...mapActions("nainformation", [
      "getcurrentExhibitionSession" // 展届
    ])
  }
};
</script>

<style media="print">
  @page {
    size: landscape;
  }
</style>
<style>
  @media print {
    .mimeograph {
      display: none;
    }
    .edit-text {
      display: none;
    }
    .noprint {
      display: none;
    }
  }
  @page { margin: 0; }
  .el-layout .el-layout-item {
    height: auto!important;
  }
  #app {
    height: auto!important;
  }
  #app .app-body {
    height: auto!important;
  }
  body, html {
    margin: 0;
    padding: 0;
  }
</style>

<style>
.print_page {
  padding: 20px 60px;
  /* 控制打印页顶部是否分页，avoid为避免分页，always是必须分页，auto为自动 */
  page-break-before: auto;
  /* 控制打印页底部是否分页，avoid为避免分页，always是必须分页 */
  page-break-after: avoid;
}
.text {
  word-break: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
}
/*table start*/
table.default-table{
/* -moz-border-radius: 5px;
-webkit-border-radius:5px;
border-radius:5px; */
font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
"Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
width: 100%;
border:solid #EBEEF5;
border-width:1px 0px 0px 1px;
border-collapse: collapse;
border-spacing: 0;
color: #909399;
font-size: 12px;
}
table.default-table tr{
height: 23px;
color: #909399;
line-height: 23px;
}
table.default-table tr.odd{
background-color: #fff;
}
table.default-table tr.even{
background-color: #F5F5F5;
}
table.default-table tr:hover{
background-color: #eee;
}
table.default-table tr th,table.default-table tr td{
/*width: 16%;*/
padding:6px 20px;
text-align: left;
/* border: 1px solid #ddd; */
border:solid #EBEEF5;
border-width:0px 1px 1px 0px;
}
table.default-table tr th{
font-weight: bold;
text-align: center;
}
table.default-table tr td.tac{
color: #606266;
text-align: center;
}
table.default-table tr td.tab{
color: #606266;
text-align: right;
}
table.default-table tr td a:hover{
color:#0080c0;
}
/* 表格结束 ↑ */
</style>
