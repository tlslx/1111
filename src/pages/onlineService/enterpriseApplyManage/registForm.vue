/**
 * @file 企业展品管理---刀具报备登记表
*/
<style scoped>
.form-wrapper {
  width: 649px;
  height: 500px;
  margin: 0 auto;
}
.form-wrapper h2 {
  text-align: center;
  margin-bottom: 50px;
}
.half {
  width: 50%;
  float: left;
}
.mimeograph {
  width: 120px;
  height: 40px;
  margin-top: 20px;
}
.markInfo {
  color: #d80c18;
  text-align: center;
}
.edit-text {
  color: red;
  cursor: pointer;
  margin-left: 20px;
  text-decoration: underline;
}
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
}
@page { margin: 0; }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="" name="first">
      <div class="form-wrapper" id="myDiv">
        <h2>中国进出口商品交易会刀具展样品报备登记表</h2>
        <p>参展企业名称：{{ companyName }}</p>
        <p class="half">法人代表：{{ legalPerson }}</p>
        <p class="half">身份证号码：</p>
        <p class="half">联系电话：</p>
        <el-table :data="tableData" style="width: 100%;margin-top: 20px;">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="exhibitNameCh" label="刀具名称"></el-table-column>
          <el-table-column prop="toolSpecCh" label="规格"></el-table-column>
          <el-table-column prop="toolCount" label="数量"></el-table-column>
          <el-table-column prop="boothNo" label="展位号"></el-table-column>
        </el-table>
        <p style="text-indent: 2em;margin-top: 20px;">本人作为展位刀具管理的具体负责人，已熟悉《关于切实做好中国进出口商品交易会刀具展样品参展安全管理工作的通知》的要求，参展期间将遵循相关规定，配合大会安保人员做好刀具管理工作，并添加微信号747954208加入刀具管理服务群。</p>
        <p class="half">现场负责人签名盖章：</p>
        <p class="half">身份证号码：</p>
        <p class="half">手机号码：</p>
        <p class="half">日期：</p>
      </div>
      <div style="width:100%; text-align: center">
        <span class="markInfo">备注：请参展企业通过参展易捷通在线填报打印该表，筹展前交所属交易团。<br/>
                   保卫办办公地点：A区1楼功能区（5.1馆北门对面）<br/>
                   保卫办办公电话：（020）83129905 <br/></span>
        <el-button type="danger" @click="toMimeograph" class="mimeograph">打印</el-button>
        <span class="edit-text" @click="toEdit">返回修改</span>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [], // 表格数据
      companyName: "", // 公司名称
      legalPerson: "" // 法人代表
    };
  },
  created() {
    // 将表单页填入的刀具信息带入显示于表格中
    let newData = [];
    let companyId = this.$store.state.userInfo.companyId;
    // 获取公司名称和法人代表
    this.getCompanyLegalInfo(companyId).then(res => {
      this.legalPerson = res[0].legalPerson;
      this.companyName = res[0].companyName;
    });
    if (this.$route.query.returnPath === 'enterExManagement') {
      this.tableData = [];
      this.getProductDetailInfo(this.$route.query.ruleForm).then(res => {
        this.tableData = [res.toolSampleInfo];
        this.tableData[0].boothNo = res.exhibitInfo.boothNo;
        this.tableData[0].exhibitNameCh = res.exhibitInfo.exhibitNameCh;

      });
    } else {
      newData = [this.$route.query.ruleForm];
      this.tableData = newData;
    }

  },
  computed: {
    ...mapGetters('enterExManagement', ['getCom'])
  },
  methods: {
    ...mapActions('enterExManagement', [
      'getCompanyLegalInfo', // 获取公司信息
      'getProductDetailInfo' // 获取刀具信息
    ]),
    // 打印
    toMimeograph() {
      window.print();
    },
    // 返回编辑
    toEdit() {
      if (this.$route.query.returnPath === 'addProduction') {
        this.$router.push({
          path: "/addProduction",
          query: this.$route.query
        });
      } else if (this.$route.query.returnPath === 'enterExManagement') {
        this.$router.push({
          path: "/enterExManagement"
        });
      }

    }
  }
};
</script>
