<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室结算详情" name="first">
      <section style="padding: 10px;" v-for="(item, index) in resData" :key="index">

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
              prop="number"
              label="数量"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="centerPrice"
              label="中心单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="workPrice"
              label="工程公司价格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="phoneNo"
              label="差价"
              align="center">
              <template slot-scope="scope">
                <span>{{(scope.row.workPrice - scope.row.centerPrice)*scope.row.number }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center">
            </el-table-column>

          </el-table>
          <p style="line-height: 40px;padding-left: 20px;border: 1px solid rgb(235, 238, 245);margin-top: 0px;">
            <!--<span>共计金额： {{item.meetingContentTotal}} 元</span>-->
            <span>共计金额： <span v-text="tableSum(index)"></span> 元</span>
          </p>

        </template>
      </section>

      <el-row>
        <!--<p>订单总金额： <span class="color-r">{{totalMoney}}</span>元</p>-->
        <p>订单总金额： <span class="color-r font18" v-text="tableSumAll()"></span>元</p>
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
        resData: [],
        totalMoney: '',
        sumAll: '',
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
          // let sumAll = [];
          // for (let i = 0; i < this.resData.length; i++) {
          //   let xnumber = [];
          //   for (let j = 0; j < this.resData[i].list.length; j++) {
          //     xnumber.push(this.objXum(this.resData[i].list[j]));
          //   }
          //   sumAll.push(this.sumArr(xnumber));
          //   let sum = [{ zongji: this.sumArr(xnumber) }];
          //   this.resData[i].sumArr = sum;
          // }
          // console.log(sumAll);
          // this.sumAll = this.sumArr(sumAll);
        });
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
      sumArr(arr) {
        // return eval(arr.join("+"));
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        return sum;
      },
      objXum(arr) {
        return arr.workPrice * arr.number;
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
    font-size: 18px;
  }
  .vertical-top{
    vertical-align: top;
  }
  .text-center{
    text-align: center;
  }
</style>
