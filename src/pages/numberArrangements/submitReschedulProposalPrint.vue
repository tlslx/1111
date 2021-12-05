<template>
  <div class="print_page">
    <h2 style="text-align: center;">第{{exhibitionSession}}届广交会品牌展位商协会调整安排情况表</h2>
    <h3>商协会：___________________(盖章)</h3>
    <table class="default-table">
      <tr>
        <th>序号</th>
        <th>展区</th>
        <th>拟安排企业名称</th>
        <th>所属交易团</th>
        <th style="max-width: 120px;">拟新增安排展位数</th>
        <th style="max-width: 130px;">拟新增安排展位号</th>
        <th style="max-width: 120px;">是否涉及岛型展位</th>
        <th>
          安排理由
        </th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index">
        <td class="tac">{{index + 1}}</td>
        <td class="tac">{{item.exhibitionAreaName}}</td>
        <td class="tac">{{item.companyName}}</td>
        <td class="tac">{{item.dealClusterName}}</td>
        <td class="tac">{{item.scheduleBoothNumber}}</td>
        <td class="tac">{{item.scheduleBooth}}</td>
        <td class="tac">{{item.isIsland | chooseFilter}}</td>
        <!--<td class="tac">{{item.scheduleReason}}</td>-->
        <td class="tac" style="text-align: center; max-width: 350px;">
          <!-- <div><el-checkbox :checked="handleChecked(index, '1')"><p class="text">{{item.reasonOne}}</p></el-checkbox></div>
          <div><el-checkbox :checked="handleChecked(index, '2')"><p class="text">{{item.reasonTwo}}</p></el-checkbox></div>
          <div><el-checkbox :checked="handleChecked(index, '3')"><p class="text">{{item.reasonThree}}</p></el-checkbox></div> -->
          <p class="text">{{item.scheduleReason}}</p>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      store,
      exhibitionSession: '___',
      tableData: []
    };
  },
  filters: {
    chooseFilter: value => {
      let val = value + '';
      switch (val) {
        case '1':
          return '是';
        case '0':
          return '否';
        default:
          return;
      }
    }
  },
  created() {
    let list = JSON.parse(this.$route.query.data);
    // for (let i = 0, l = list.length; i < l; i++) {
    //   if (list[i].scheduleType === '1') {
    //     list[i].reasonOne = list[i].scheduleReason;
    //    // list[i].reasonTwo = '该展区有需求的候补新企业中排名第_______（请严格按分数高低安排）';
    //    // list[i].reasonThree = '其他理由：（请另文说明）';
    //   } else if (list[i].scheduleType === '2') {
    //   //  list[i].reasonOne = '该展区现有品牌企业，安排理由：________（请说明）';
    //     list[i].reasonTwo = list[i].scheduleReason;
    //   //  list[i].reasonThree = '其他理由：（请另文说明）';
    //   } else if (list[i].scheduleType === '3') {
    //   //  list[i].reasonOne = '该展区现有品牌企业，安排理由：________（请说明）';
    //   //  list[i].reasonTwo = '该展区有需求的候补新企业中排名第_______（请严格按分数高低安排）';
    //     list[i].reasonThree = list[i].scheduleReason;
    //   } else {
    //     list[i].reasonOne = '';
    //   //  list[i].reasonTwo = '该展区有需求的候补新企业中排名第_______（请严格按分数高低安排）';
    //   //  list[i].reasonThree = '其他理由：（请另文说明）';
    //   }
    // }
    this.tableData = list;
    if (this.tableData.length > 0) {
      this.exhibitionSession = this.tableData[0].exhibitionSession;
    } else {
      this.exhibitionSession = '';
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.print.portrait = false;
      window.print();
    });
  }
  // methods: {
  //   // 是否选中
  //   handleChecked(i, id) {
  //     if (this.tableData[i].scheduleType === id) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }
};
</script>
<style media="print">
  @page {
    size: landscape;
  }
</style>
<style>
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
table.default-table tr td a:hover{
color:#0080c0;
}
/* 表格结束 ↑ */
</style>
