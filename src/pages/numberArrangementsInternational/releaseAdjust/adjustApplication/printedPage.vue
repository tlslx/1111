<template>
  <div class="print_page">
    <div class="table_div">
      <el-tabs v-model="activeName" class="mimeograph">
        <el-tab-pane label="打印调整函" name="first">
        </el-tab-pane>
      </el-tabs>
      <h2 style="text-align: center;">一般性展位不等量调整函</h2>
      <p>广交会工作部领导小组办公室秘书处：</p>
      <p style="text-indent: 2em;">经协商，第{{ tableData[0].exhibitionSession }}届广交会，{{ currentDelegation }}交易团与{{ tableData[0].otherDelegationName }}交易团就第{{ exhibitionSession }}届广交会一般性展位等量/不等量调整申请如下：</p>
      <!-- 表格 -->
      <!--<el-table :data="tableData" class="tabStyle" size="small" border>
        <el-table-column align="center" label="换入展区" prop="inArea">
        </el-table-column>
        <el-table-column align="center" label="换出展区" prop="outArea">
        </el-table-column>
        <el-table-column align="center" label="对方交易团" prop="otherDelegationName">
        </el-table-column>
        <el-table-column align="center" label="换出数量" prop="outNumber">
        </el-table-column>
        <el-table-column align="center" label="换入数量" prop="inNumber">
        </el-table-column>
        <el-table-column align="center" label="备注" prop="remark">
        </el-table-column>
      </el-table>-->
      <div>
        <table class="default-table">
          <tr>
            <th>展位类型</th>
            <th>换入展区</th>
            <th>换出展区</th>
            <th>对方交易团</th>
            <th>换出数量</th>
            <th>换入数量</th>
            <th>备注</th>
          </tr>
          <tr>
            <td class="tac">{{tableData[0].boothType | boothTypeFilter}}</td>
            <td class="tac">{{tableData[0].inArea}}</td>
            <td class="tac">{{tableData[0].outArea}}</td>
            <td class="tac">{{tableData[0].otherDelegationName}}</td>
            <td class="tac">{{tableData[0].outNumber}}</td>
            <td class="tac">{{tableData[0].inNumber}}</td>
            <td class="tac">{{tableData[0].remark}}</td>
          </tr>
        </table>
      </div>
      <p v-if="tableData[0].boothType === '1'">以上调整经广交会工作领导小组办公室秘书处审核后生效。如需还原，请通过备案系统“展位数量安排-交易团一般性展位管理-等量/不等量（含还原）调整”目录下“提交不等量还原调整申请”界面查找到本调整记录后，点击对应的“还原”按钮，生成不等量还原调整函，经双方打印盖章后传真至工作领导小组办公室秘书处(广交会工作领导小组办公室秘书处传真：020-89138550）</p>
      <p v-if="tableData[0].boothType !== '1'">以上调整经广交会工作领导小组办公室秘书处审核后生效。(广交会工作领导小组办公室秘书处传真：020-89138550）</p>
      <p>特此备案。</p>
      <div>
        <div class="floatLeft">
          <el-form :model="form" label-width="80px">
            <el-form-item label="盖章：">
              <span>{{ currentDelegation }}交易团</span>
            </el-form-item>
            <el-form-item label="日期：">
              <span>{{ currentDate }}</span>
            </el-form-item>
            <el-form-item label="联系人：">
              <span>{{ tableData[0].contact }}</span>
            </el-form-item>
            <el-form-item label="电话：">
              <span>{{ tableData[0].phone }}</span>
            </el-form-item>
            <el-form-item label="传真：">
              <span>{{ tableData[0].fax }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="floatRight">
          <el-form :model="form" label-width="80px">
            <el-form-item label="盖章：">
              <span>{{ tableData[0].otherDelegationName }}交易团</span>
            </el-form-item>
            <el-form-item label="日期：">
              <span>{{ currentDate }}</span>
            </el-form-item>
            <el-form-item label="联系人：">
              <span>{{ tableData[0].otherContact }}</span>
            </el-form-item>
            <el-form-item label="电话：">
              <span>{{ tableData[0].otherPhone }}</span>
            </el-form-item>
            <el-form-item label="传真：">
              <span>{{ tableData[0].otherFax }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" class="mimeograph" @click="handPrint">打印</el-button>
        <el-button class="mimeograph" @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      currentDelegation: this.$store.getters.userInfo.org.deptName,
      currentDate: '',
      exhibitionSession: '',
      form: {},
      activeName: "first"
    };
  },
  created() {
    let date = new Date();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    this.currentDate = `${date.getFullYear()}-${month}-${strDate}`;
    this.tableData = [];
    this.tableData.push(this.$route.query.data);
    this.exhibitionSession = JSON.parse(JSON.stringify(this.tableData[0])).exhibitionSession;
    this.getcurrentExhibitionSession().then(res => {
      this.tableData[0].exhibitionSession = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.$http.get(`${process.env.API_NA_URL}/api/common/sysDepartmentById/get`, { deptId: this.$store.getters.userInfo.org.deptId }).then(res => {
      this.tableData[0].contact = res.contacts;
      this.tableData[0].phone = res.contactsInfo;
      this.tableData[0].fax = res.fax;
      this.$http.get(`${process.env.API_NA_URL}/api/common/sysDepartmentById/get`, { deptId: this.tableData[0].otherDelegationId }).then(({ contacts, contactsInfo, fax }) => {
        this.tableData[0].otherContact = contacts;
        this.tableData[0].otherPhone = contactsInfo;
        this.tableData[0].otherFax = fax;
        this.tableData = [...this.tableData];
      }).catch(e => {});
    }).catch(e => {});
  },
  filters: {
    boothTypeFilter: value => {
      if (value === '1') {
        return '一般性展位';
      } else if (value === '2') {
        return '中央通道展位';
      }
    }
  },
  methods: {
    ...mapActions("nainformation", [
      "getcurrentExhibitionSession" // 获取当前展届
    ]),
    back() {
      // this.$router.go(-1);
      this.$router.push({
        path: "/equalUnequalIntemational",
        query: {
          num: "three"
        }
      });
    },
    handPrint() {
      window.print();
    }
  }
};
</script>
<style media="print">
  @page {
    margin-bottom: 0mm;
    margin-top: 0mm
  }
</style>
<style scoped>
/* 打印时去掉页眉页脚、以及按钮等不需要打印的元素  */
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
  .table_div {
    width: 93%;
    margin: 30px auto;
  }
}
@page {
    size: 210mm 297mm; /*设置纸张大小:A4(210mm 297mm)、A3(297mm 420mm) 横向则反过来*/
    margin: 0;
}
.print_page {
  margin-bottom: 20px;
  /* 控制打印页顶部是否分页，avoid为避免分页，always是必须分页，auto为自动 */
  page-break-before: auto;
  /* 控制打印页底部是否分页，avoid为避免分页，always是必须分页 */
  page-break-after: avoid;
}
.table_div {
  width: 93%;
  margin: 0 auto;
}
.floatLeft {
  margin-left: 10%;
  width: 40%;
  float: left;
  text-align: center;
}
.floatRight {
  width: 40%;
  margin-right: 10%;
  float: left;
  text-align: center;
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

