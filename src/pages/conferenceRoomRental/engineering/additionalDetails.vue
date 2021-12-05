<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室费用-补录" name="first">
      <section style="padding: 10px;">
        <div v-for="(tableData, index) in resData" :key="index" style="margin-top: 15px;">
          <el-row class="btn-row">
            <span v-text="index+1" style="display: inline-block;width: 40px;height: 40px;
            line-height: 40px;text-align: center;border-radius: 20px;
            background-color: #2cadff;color: white;"></span>
            <el-button type="primary" @click="addTable(index, tableData.meetingContentId)">增加</el-button>
            <el-button type="primary" @click="addStandard(index, tableData.meetingContentId)">增加标配</el-button>
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
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'">{{scope.row.meetingDeviceName}}</span>
                <span v-else>{{scope.row.meetingDeviceName}} (<span class="color-r">补录</span>） </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              align="center"
              width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'">{{scope.row.unit}}</span>
                <span v-else>
                  <el-input v-model="scope.row.unit" size="mini"></el-input>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="number"
              label="数量"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'">{{scope.row.number}}</span>
                <el-input-number v-else v-model="scope.row.num" :min="0" :max="100" style="width: 120px;"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              prop="centerPrice"
              label="中心单价"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'">{{scope.row.centerPrice}}</span>
                <span v-else>
                  <el-input v-model="scope.row.centerPrice"></el-input>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="workPrice"
              label="工程公司价格"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'">{{scope.row.workPrice}}</span>
                <span v-else>
                  <el-input v-model="scope.row.workPrice"></el-input>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="小计金额"
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
                <span v-if="scope.row.isComplement == '0'">{{scope.row.remark}}</span>
                <span v-else>
                  <el-input v-model="scope.row.remark"></el-input>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isComplement == '0'"></span>
                <span v-else>
                  <el-button type="text" @click="deleteTable(index, scope.$index)" size="mini">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <p style="line-height: 40px;padding-left: 20px;border: 1px solid rgb(235, 238, 245);margin-top: 0px;">
            <!--<span>共计金额： {{tableSum(index)}} 元</span>-->
            <span>共计金额： <span v-text="tableSum(index)"></span> 元</span>
            <span>含补录金额： <span v-text="tableBulu(index)"></span> 元</span>
          </p>
        </div>
      </section>
      <el-row>
        <p>订单总金额： <span class="color-r">{{tableSumAll()}}</span>元</p>
      </el-row>
      <el-row>
        <el-button type="primary" @click="onSubmit">提交付款</el-button>
        <el-button type="primary">取消</el-button>
      </el-row>

      <!--增加-->
      <el-dialog
        title="增加"
        :visible.sync="centerDialogVisible"
        width="850px">
        <el-row>
          <span style="width: 80px;">会议室设备名称：</span>
          <el-input v-model="form.meetingDeviceName" placeholder="请输入" size="mini" style="width: 180px;display: inline-block;"></el-input>
          <el-button type="primary" size="mini" @click="searchForm">查询</el-button>
          <el-button type="primary" size="mini" @click="resetForm">重置</el-button>
        </el-row>
        <div>
          <el-table
            :data="tableData2"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="meetingDeviceName" label="设备名称" align="center"></el-table-column>
            <!--<el-table-column prop="meetingOtherDevice" label="公司分类" align="center"></el-table-column>-->
            <el-table-column prop="centerPrice" label="中心价格" align="center"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="joinTable(index)">确 定</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <!--增加标配-->
      <el-dialog
        title="增加"
        :visible.sync="centerDialogVisible2"
        width="850px">
        <el-row>
          <span style="width: 80px;">会议室设备名称：</span>
          <el-input v-model="form2.meetingDeviceName" placeholder="请输入" size="mini" style="width: 180px;display: inline-block;"></el-input>
          <el-button type="primary" size="mini" @click="searchForm2">查询</el-button>
          <el-button type="primary" size="mini" @click="resetForm">重置</el-button>
        </el-row>
        <div>
          <el-table
            :data="tableData3"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="meetingDeviceName" label="设备名称" align="center"></el-table-column>
            <!--<el-table-column prop="meetingOtherDevice" label="公司分类" align="center"></el-table-column>-->
            <el-table-column prop="centerPrice" label="中心价格" align="center"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="joinTable2(index)">确 定</el-button>
          <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        </span>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        totalMoney: '',
        centerDialogVisible: false,
        centerDialogVisible2: false,
        value: '',
        form: {
          meetingDeviceName: '' // 项目名称
        },
        form2: {
          meetingDeviceName: '' // 项目名称
        },
        table: [],
        multipleSelection: [],
        resData: [],
        // 临时存的两个参数
        tableindex: '',
        meetingContentId: '',

        tableData2: [
          {
            meetingOtherDevice: '设备',
            meetingDeviceName: '椅子',
            centerPrice: '120'
          },
          {
            meetingOtherDevice: '设备',
            meetingDeviceName: '桌子',
            centerPrice: '800'
          },
          {
            meetingOtherDevice: '设备',
            meetingDeviceName: '杯子',
            centerPrice: '15'
          }
        ],
        tableData3: [
          {
            meetingOtherDevice: '设备',
            meetingDeviceName: '椅子',
            centerPrice: '323'
          },
          {
            meetingOtherDevice: '设备',
            meetingDeviceName: '桌子',
            centerPrice: '120'
          },
          {
            meetingOtherDevice: '设备',
            meetingDeviceName: '杯子',
            centerPrice: '19'
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
          this.totalMoney = res.totalMoney;
        });
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
        let params = {
          meetingFeeDetailsStr: JSON.stringify(data)
        };
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/saveMeetingFeeDetail', params).then(res => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        });
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
      addTable(index, meetingContentId) {
        this.centerDialogVisible = true;
        this.form.meetingDeviceName = '';
        this.tableindex = index;
        this.meetingContentId = meetingContentId;
      },
      addStandard(index, meetingContentId) {
        this.centerDialogVisible2 = true;
        this.form2.meetingDeviceName = '';
        this.tableindex = index;
        this.meetingContentId = meetingContentId;
      },
      searchForm() {
        //   this.$http.post(this.baseApi + '/api/customservice/meetingRent/saveMeetingFeeDetail', data).then(res => {
        //
        //   });
      },
      searchForm2() {
        //   this.$http.post(this.baseApi + '/api/customservice/meetingRent/saveMeetingFeeDetail', data).then(res => {
        //
        //   });
      },
      resetForm() {
        this.form.meetingDeviceName = '';
        this.form2.meetingDeviceName = '';
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      joinTable() {
        let data = [];
        this.multipleSelection.forEach(item => {
          let items = {
            centerPrice: item.centerPrice,
            meetingDeviceName: item.meetingDeviceName,
            meetingOtherDevice: '',
            meetingContentId: this.meetingContentId, // '会议内容ID'
            leasePeriod: "2", // '租期'
            remark: "",
            number: "1",
            unit: null,
            workPrice: "",
            meetingDeviceId: "",
            isComplement: "1", // '是否补录设备。0：否；1：是；默认0',
            source: "1", // '收费来源。0：中心收；1：工程公司收'
            isMatch: "1", // '是否配套设备。0：否；1：是；默认0'
            status: 'new'
          };
          data.push(items);
        });
        // this.resData[this.tableindex].list.concat(data);
        this.resData[this.tableindex].list.push.apply(this.resData[this.tableindex].list, data);
        this.centerDialogVisible = false;
      },
      joinTable2() {
        let data = [];
        this.multipleSelection.forEach(item => {
          let items = {
            centerPrice: item.centerPrice,
            meetingDeviceName: item.meetingDeviceName,
            meetingOtherDevice: '',
            meetingContentId: this.meetingContentId, // '会议内容ID'
            leasePeriod: "2", // '租期'
            remark: "",
            number: "1",
            unit: null,
            workPrice: "",
            meetingDeviceId: "",
            isComplement: "1", // '是否补录设备。0：否；1：是；默认0',
            source: "1", // '收费来源。0：中心收；1：工程公司收'
            isMatch: "1", // '是否配套设备。0：否；1：是；默认0'
            status: 'new'
          };
          data.push(items);
        });
        // this.resData[this.tableindex].list.concat(data);
        this.resData[this.tableindex].list.push.apply(this.resData[this.tableindex].list, data);
        this.centerDialogVisible = false;
      },
      deleteTable(index, index2) {
        this.resData[index].list.splice(index2, 1);
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
