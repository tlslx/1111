<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室付款费用明细" name="first">
      <section style="padding: 10px;">
        <template>
          <el-table
            :data="tableData"
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
            <!--<el-table-column-->
              <!--prop="workPrice"-->
              <!--label="工程公司价格"-->
              <!--align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<el-input v-model="scope.row.workPrice" placeholder="请输入内容"></el-input>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              prop="phoneNo"
              label="小计金额"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.centerPrice * scope.row.number }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData2"
            border
            :show-header="false"
            style="width: 100%">
            <el-table-column
              prop="zongji"
              align="left">
            </el-table-column>
          </el-table>
        </template>
      </section>
      <el-row>
        <p>应付总金额： <span class="color-r">{{money}}</span>元</p>
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
        money: 54321,
        tableData: [{
          companyNameCn: '12987122',
          userName: '王小虎1',
          status: '1',
          phoneNo: '13567899876',
          applyTime: 10
        }, {
          companyNameCn: '12987123',
          userName: '王小虎2',
          status: '2',
          phoneNo: '13243215432',
          applyTime: 12
        }, {
          companyNameCn: '12987124',
          userName: '王小虎3',
          status: '3',
          phoneNo: '13243215432',
          applyTime: 9
        }],
        tableData2: [{
          zongji: '合计：12345元'
        }],
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

        });
      },
      onSubmit () {
        //
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
