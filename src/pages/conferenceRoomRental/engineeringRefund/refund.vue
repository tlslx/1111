<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室退款" name="first">
      <section style="padding: 10px;">
        <div v-for="(tableData, index) in resData" :key="index" style="margin-top: 15px;">
          <el-row class="btn-row">
            <span v-text="index+1" style="display: inline-block;width: 40px;height: 40px;
            line-height: 40px;text-align: center;border-radius: 20px;
            background-color: #2cadff;color: white;"></span>
            <!--<el-button type="primary" @click="addTable(index, tableData.meetingContentId)">增加</el-button>-->
            <!--<el-button type="primary" @click="addStandard(index, tableData.meetingContentId)">增加标配</el-button>-->
          </el-row>
          <el-table
            :data="tableData.list"
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
              width="180">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="centerPrice"
              label="单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="number"
              label="数量"
              align="center"
              width="180">
              <template slot-scope="scope">
                <el-input-number size="mini" v-if="scope.index == 0" v-model="scope.row.number" :min="1" :max="10" style="width: 120px;"></el-input-number>
                <el-input-number size="mini" v-else v-model="scope.row.number" :min="0" :max="100" style="width: 120px;"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              label="合计金额"
              prop="sumPrice"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.workPrice * scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="退款金额"
              prop="refundPrice"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.workPrice * scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center">
              <template slot-scope="scope">
                <span>
                  <el-input v-model="scope.row.remark" size="mini"></el-input>
                </span>
              </template>
            </el-table-column>

          </el-table>
          <p style="line-height: 40px;padding-left: 20px;border: 1px solid rgb(235, 238, 245);margin-top: 0px;">
            <!--<span>共计金额： {{tableSum(index)}} 元</span>-->
            <span>退款金额： <span v-text="tableSum(index)"></span> 元</span>
          </p>
        </div>
      </section>
      <el-row>
        <p>退款总金额： <span class="color-r" v-text="tableSumAll()"></span>元</p>
      </el-row>
      <el-row>
        <el-button type="primary" @click="onSubmit">提交付款</el-button>
        <el-button type="primary">取消</el-button>
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
          // this.totalMoney = res.totalMoney;
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
      onSubmit () {
        let data = [];
        for (let i = 0; i < this.resData.length; i++) {
          this.resData[i].list.forEach(item => {
            delete item["meetingServiceItemId"];
            delete item["status"];
          });
          data.push.apply(data, this.resData[i].list);
        }
        // console.log(data);
        let params = {
          meetingFeeDetailsStr: JSON.stringify(data)
        };
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/saveMeetingFeeDetail', params).then(res => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        });
      }
    },
    mounted () {
      this.init();
    }
  };
</script>

<style scoped>
  .btn-row {
    margin: 10px;
  }
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
