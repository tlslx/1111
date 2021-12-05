<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="确认本团的各期一般性展位数量" name="first"></el-tab-pane>
    <el-card class="box-card">
      <div>
        <p>请核对你团各展期展位数。本次确认的各期展位数量范围是在各交易团（分团）2018年11月19日确认的广交会各展期一般性展位数量的基础上，做一下增减：</p>
        <p>1.如第122届广交会获得“实际使用者得”展位、组展表彰奖励展位，则相应增加:</p>
        <p>2.如第123届广交会会有跨期等量调整，则相应调整；</p>
        <p>3.如第123届广交会有违规使用一般性展位，则相应扣减；</p>
        <p>4.铁石装饰品及户外水疗设施展区基数内展位列入范围内。</p>
        <p>注：上述展位数均不涉及新能源、宠物用品、贫困地区特色产品展区和中央通道展位。化工展区展位按4平米0.5个计。</p>
        <p>请于2018年11月23日17点前，确认打印并加盖公章后，传真至外贸中心（传真：020-89138550）</p>
      </div>
      <el-table :data="boothQueryData" border v-loading="loading">
        <el-table-column label="交易团名称" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="第一期" align="center" prop="firstBaseNumber"></el-table-column>
        <el-table-column label="第二期" align="center" prop="secondBaseNumber"></el-table-column>
        <el-table-column label="第三期" align="center" prop="thirdBaseNumber"></el-table-column>
        <el-table-column label="确认情况" align="center" prop="examineStatus">
          <template slot-scope="scope">
            {{ scope.row.examineStatus | statusFilter }}
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; text-align: center;">
        <el-button  type="danger" @click="onNotice()" :disabled="handleDisabled">确认</el-button>
        <el-button @click="onNotice()">返回</el-button>
        <el-button  type="primary" @click="print()">打印</el-button>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      // 查询传参
      searchParams: {
        delegationId: this.$store.getters.userInfo.org.deptId
      },
      boothQueryData: [],
      haveDate: false
    };
  },
  filters: {
    statusFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '未确认';
        case '1':
          return '已确认';
        default:
          return;    
      }
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "boothQuery"
    ])
  },
  methods: {
    ...mapActions("baseAccounting", [
      "getBoothNumberQuery",
      "postBoothNumberCheck" 
    ]),
    // 能否确认
    handleDisabled() {
      if (this.boothQuery && this.boothQuery.examineStatus === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.boothQueryData = [];
      this.getBoothNumberQuery(this.searchParams)
        .then(response => {
          this.loading = false;
          this.boothQueryData.push(response);
        })
        .catch(e => {
          this.loading = false;
        });
    },
    onNotice() {
      this.loading = true;
      let data = {
        ordinaryBaseList: [
          { 
            delegationId: this.searchParams.delegationId
          }
        ]
      };
      this.postBoothNumberCheck(data).then(() => {
        this.loading = false;
        this.$message.success('操作成功');
        this.getData();
      }).catch(e => {
        this.loading = false;
      });
    },
    //打印跳转
    print() {
      this.$router.push({ path: '/printDate' });
    }
  }
};
</script>
