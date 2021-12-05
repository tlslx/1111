<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室退款记录" name="first">
      <section style="padding: 10px;" v-for="(item, index) in resData" :key="index">
        <el-row>
          <el-col :span="10">
            <span>会议名称：</span>
            <span>{{item.meetingName}}</span>
          </el-col>
        </el-row>
        <template>
          <el-table
            :data="item.list"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              prop="meetingDeviceName"
              label="会议室费用项目"
              align="center"
              width="200">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="centerPrice"
              label="单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="number"
              label="已退数量"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              label="已退款金额"
              prop="sumPrice"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.workPrice * scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="centerPrice"
              label="退款时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="workPrice"
              label="状态"
              align="center">
            </el-table-column>

            <el-table-column
              prop="remark"
              label="备注"
              align="center">
            </el-table-column>
          </el-table>
          <p style="line-height: 40px;padding-left: 20px;border: 1px solid rgb(235, 238, 245);margin-top: 0px;">
            <span>退款金额： <span v-text="tableSum(index)"></span> 元</span>
            <!--<span>共计金额： {{item.meetingContentTotal}} 元</span>-->
          </p>
        </template>
      </section>

      <el-row>
        <!--<p>订单总金额： <span class="color-r">{{totalMoney}}</span>元</p>-->
        <p>退款总金额： <span class="color-r font18" v-text="tableSumAll()"></span>元</p>
      </el-row>

      <el-row class="text-center">
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-row>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        totalMoney: '',
        resData: [],
        baseApi: process.env.API_FF_URL
      };
    },
    methods: {
      init() {
        let meetingId = this.$route.query.meetingId;
        let data = {
          meetingId: meetingId
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/listMeetingFeeDetail', data).then(res => {
          this.resData = res.list;
          this.totalMoney = res.totalMoney;
        });
      },
      sumArr(arr) {
        // return eval(arr.join('+'));
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        return sum;
      },
      objXum(arr) {
        return arr.workPrice * arr.number;
      },
      tableBulu(index) {
        let xnumber = [];
        for (let j = 0; j < this.resData[index].list.length; j++) {
          if (this.resData[index].list[j].isComplement === '1') {
            xnumber.push(this.objXum(this.resData[index].list[j]));
          }
        }
        return this.sumArr(xnumber);
      },
      tableSum(index) {
        let xnumber = [];
        for (let j = 0; j < this.resData[index].list.length; j++) {
          xnumber.push(this.objXum(this.resData[index].list[j]));
        }
        return this.sumArr(xnumber);
      },
      tableSumAll() {
        let sumAll = [];
        for (let i = 0; i < this.resData.length; i++) {
          let xnumber = [];
          for (let j = 0; j < this.resData[i].list.length; j++) {
            xnumber.push(this.objXum(this.resData[i].list[j]));
          }
          sumAll.push(this.sumArr(xnumber));
        }
        return this.sumArr(sumAll);
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

<style scoped>
  .color-r{
    color: red;
  }
  .font18{
    font-size: 18px;
  }
  .vertical-top{
    vertical-align: top;
  }
  .text-center{
    text-align: center;
  }
</style>
