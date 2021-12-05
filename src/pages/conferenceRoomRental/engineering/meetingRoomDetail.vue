<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室明细详情" name="first">
      <section style="padding: 10px;" v-for="(item, index) in resData" :key="index">
        <el-row>
          <el-col :span="10">
            <span>会议时间：</span>
            <span>{{item.arrangeStartTime}} 至 {{item.arrangeEndTime}}</span>
          </el-col>
          <el-col :span="10">
            <span>会议室：</span>
            <!--<span>{{item.arrangeRoomArea}} - {{item.arrangeRoomFloor}} - {{item.arrangeRoomName}}</span>-->
            <span>
              <span v-for="(meeting1, index1) in meetingRoomAreaOptions"
                    :key="index1"
                    v-if="meeting1.meetingRoomAreaId === item.arrangeRoomAreaId">{{meeting1.meetingRoomArea}}</span>-
                <span v-for="(meeting2, index2) in meetingRoomFloorOptions"
                      :key="index2"
                      v-if="meeting2.meetingRoomFloorId === item.arrangeRoomFloorId">{{meeting2.meetingRoomFloor}}</span>-
                <span v-for="(meeting3, index3) in meetingRoomOptions"
                      :key="index3"
                      v-if="meeting3.meetingRoomId === item.arrangeRoomId">{{meeting3.meetingRoom}}</span>
            </span>
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
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'">{{scope.row.meetingDeviceName}}</span>
                <span v-else>{{scope.row.meetingDeviceName}} (<span class="color-r">补录</span>） </span>
              </template>
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
              label="小计金额"
              prop="sumPrice"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.workPrice * scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center">
            </el-table-column>
          </el-table>
          <p style="line-height: 40px;padding-left: 20px;border: 1px solid rgb(235, 238, 245);margin-top: 0px;">
            <span>共计金额： <span v-text="tableSum(index)"></span> 元</span>
            <span>含补录金额： <span v-text="tableBulu(index)"></span> 元</span>
          </p>
        </template>
      </section>

      <el-row>
        <span>收费凭证：</span>
        <span v-for="(itemhref, index) in imgList" :key="index" class="item-img"><img :src="itemhref.url" alt=""></span>
      </el-row>

      <el-row>
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
        totalMoney: '',
        resData: [],
        imgList: [],
        meetingRoomAreaOptions: [
          {
            meetingRoomAreaId: '0',
            meetingRoomArea: 'A区'
          },
          {
            meetingRoomAreaId: '1',
            meetingRoomArea: 'B区'
          },
          {
            meetingRoomAreaId: '2',
            meetingRoomArea: 'C区'
          }
        ],
        meetingRoomFloorOptions: [
          {
            meetingRoomFloorId: '0',
            meetingRoomFloor: 'A层'
          },
          {
            meetingRoomFloorId: '1',
            meetingRoomFloor: 'B层'
          },
          {
            meetingRoomFloorId: '2',
            meetingRoomFloor: 'C层'
          }
        ],
        meetingRoomOptions: [
          {
            meetingRoomId: '0',
            meetingRoom: '梅花厅'
          },
          {
            meetingRoomId: '1',
            meetingRoom: '牡丹厅'
          },
          {
            meetingRoomId: '2',
            meetingRoom: '荷花厅'
          }
        ],
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
          this.imgList = res.imageList;
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
  .item-img {
    display: inline-block;
    width: 220px;
  }
  .item-img img {
    width: 100%;
  }
</style>
