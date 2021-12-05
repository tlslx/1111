<template>
  <div style="padding: 20px;">
    <el-tabs v-model="activeName" class="mimeograph">
      <el-tab-pane label="打印调整函" name="first">
      </el-tab-pane>
    </el-tabs>
    <h2 style="text-align: center;">{{ currentDelegation }}交易团一般性展位等量/不等量调整申请</h2>
    <p>广交会工作部领导小组办公室秘书处：</p>
    <p style="text-indent: 2em;">经协商，第{{ tableData[0].exhibitionSession }}届广交会，{{ currentDelegation }}交易团与{{ tableData[0].delegationName }}交易团就第{{ tableData[0].exhibitionSession }}届广交会一般性展位等量/不等量调整申请如下：</p>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border size="small">
      <el-table-column align="center" label="编号" prop="orderNo"></el-table-column>
      <el-table-column align="center" label="展位类型" prop="boothType">
        <template slot-scope="scope">{{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}</template>
      </el-table-column>
      <el-table-column align="center" label="对方交易团" prop="delegationName"></el-table-column>
      <el-table-column align="center" label="本团换入展位类别" prop="outArea"></el-table-column>
      <el-table-column align="center" label="本团换入展位数" prop="outNumber"></el-table-column>
      <el-table-column align="center" label="本团换出展位类别" prop="inArea"></el-table-column>
      <el-table-column align="center" label="本团换出展位数" prop="inNumber"></el-table-column>
      <el-table-column align="center" label="生效情况" prop="examineStatus">
        <template slot-scope="scope">{{scope.row.examineStatus | checkState}}</template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark"></el-table-column>
    </el-table>
    <p>以上一般性展位等量/不等量调整申请经广交会工作领导小组办公室秘书处审核后生效（广交会工作领导小组办公室秘书处传真：020-89138550）</p>
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
            <span></span>
          </el-form-item>
          <el-form-item label="电话：">
            <span></span>
          </el-form-item>
          <el-form-item label="传真：">
            <span></span>
          </el-form-item>
        </el-form>
      </div>
      <div class="floatRight">
        <el-form :model="form" label-width="80px">
          <el-form-item label="盖章：">
            <span>{{ tableData[0].delegationName }}交易团</span>
          </el-form-item>
          <el-form-item label="日期：">
            <span>{{ currentDate }}</span>
          </el-form-item>
          <el-form-item label="联系人：">
            <span></span>
          </el-form-item>
          <el-form-item label="电话：">
            <span></span>
          </el-form-item>
          <el-form-item label="传真：">
            <span></span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" class="mimeograph" @click="handPrint">打印</el-button>
      <el-button class="mimeograph" @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      currentDelegation: this.$store.getters.userInfo.org.deptName,
      currentDate: '',
      form: {},
      activeName: "first"
    };
  },
  filters: {
    checkState(value) {
      if (value === "1") {
        return "通过";
      } else if (value === "2") {
        return "不通过";
      } else if (value === "0") {
        return "未审核";
      } else {
        return "待确认";
      }
    }
  },
  created() {
    let date = new Date();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    this.currentDate = `${date.getFullYear()}-${month}-${strDate}`;
    this.tableData = [];
    this.tableData.push(this.$route.query.data);
  },
  methods: {
    // ...mapActions("releaseAdjust", [
    //   "getlistAdjustApplyDelegation" // 查询填写的一般性调整申请
    // ]),
    back() {
      // this.$router.go(-1);
      this.$router.push({
        path: "/equalUnequalIntemational",
        query: {
          num: "four"
        }
      });
    },
    handPrint() {
      window.print();
    }
  }
};
</script>
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
}
@page {
  margin: 0;
}
.floatLeft {
  margin-left: 25%;
  width: 25%;
  float: left;
  text-align: center;
}
.floatRight {
  width: 25%;
  margin-right: 25%;
  float: left;
  text-align: center;
}
.toph {
  position: absolute;
  top: 0;
  right: 50px;
}
</style>

