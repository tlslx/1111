<template>
  <div class="print_page">
    <h1 style="margin: 0px auto;margin-top:10px;text-align: center; width: 60%">{{tableData.demandName}}</h1>
    <div style="display: flex;font-size: 1.2em; margin-top: 25px;">
      <div style="flex: 1">交易团:&nbsp;&nbsp;&nbsp;{{delegationName}}</div>
      <div style="flex: 1">日期:&nbsp;&nbsp;&nbsp;{{defaultDate}}</div>
      <div style="flex: 1">盖章:____________</div>
    </div>
    <p style="font-size: 12px; margin: 5px 0 0 0">注:&nbsp;{{tableData.remark}}</p>
    <table class="default-table">
      <tr>
        <th>展区</th>
        <th>展品专区</th>
        <th>展位类别</th>
        <th>申报展位数(个)</th>
      </tr>
      <tr>
        <td class="tac">{{tableData.exhibitionAreaName}}</td>
        <td class="tac">{{tableData.specialAreaName}}</td>
        <td class="tac">{{tableData.exhibitionAreaName}}</td>
        <td class="tac">{{tableData.boothNumber}}</td>
      </tr>
      <tr>
        <td colspan="3" class="tab">合计</td>
        <td class="tac">{{tableData.boothNumber}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { $date } from "@/scripts/project/utils";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      tableData: {},
      timeData: '',
      defaultDate: $date.format(new Date(), 'yyyy-MM-dd hh:mm'),
      delegationName: this.$store.getters.userInfo.org.deptName
    };
  },
  filters: {
  },
  created() {
    let ordData = JSON.parse(this.$route.query.data);
    this.tableData = ordData;
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
  }
};
</script>

<style media="print">

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
text-align: center;
}
table.default-table tr td a:hover{
color:#0080c0;
}
/* 表格结束 ↑ */
</style>
