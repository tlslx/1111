<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室明细修改" name="first">
      <section style="padding: 10px;">
        <div v-for="(tableData, index) in resData" :key="index" style="margin-top: 15px;">
          <el-row class="btn-row">
            <span v-text="index+1" style="display: inline-block;width: 40px;height: 40px;
            line-height: 40px;text-align: center;border-radius: 20px;
            background-color: #2cadff;color: white;"></span>
            <!--<el-col :span="8">-->
            <!--<span class="label-l"><span class="number-round" v-text="index+1"></span>会议名称：</span>-->
            <!--<span>{{tableData.meetingName}}</span>-->
            <!--</el-col>-->
            <el-button type="primary" @click="addTable(index, tableData.meetingContentId)">增加</el-button>
            <el-button type="primary" @click="addStandard(index, tableData.meetingContentId)">增加标配</el-button>
          </el-row>
          <el-row>

            <el-col :span="12">
              <span>会议时间：</span>
              <el-date-picker
                v-model="tableData.arrangeStartTime"
                type="datetime"
                size="mini"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                default-time="09:00:00"
                :picker-options="pickerOptions"
                @change="pickerOptionsEnd(tableData.arrangeStartTime, tableData.arrangeEndTime, index, 1)"
                style="display: inline-block;width: 180px;">
              </el-date-picker>-
              <el-date-picker
                  v-model="tableData.arrangeEndTime"
                  type="datetime"
                  size="mini"
                  placeholder="选择结束时间"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm"
                  default-time="12:00:00"
                  :picker-options="pickerOptions"
                  @change="pickerOptionsEnd(tableData.arrangeStartTime, tableData.arrangeEndTime, index, 2)"
                  style="display: inline-block;width: 180px;">
                </el-date-picker>
            </el-col>
            <el-col :span="12">
              <span>会议室：</span>
              <el-select v-model="tableData.arrangeRoomAreaId" placeholder="请选择" style="width:120px;"
                         size="mini">
                <el-option v-for="(item5, index5) in meetingRoomAreaOptions"
                           :key="index5"
                           :label="item5.meetingRoomArea"
                           :value="item5.meetingRoomAreaId"></el-option>
              </el-select>
              <el-select v-model="tableData.arrangeRoomFloorId" placeholder="请选择" style="width:120px;"
                         size="mini">
                <el-option v-for="(item6, index6) in meetingRoomFloorOptions"
                           :key="index6"
                           :label="item6.meetingRoomFloor"
                           :value="item6.meetingRoomFloorId"></el-option>
              </el-select>
              <el-select v-model="tableData.arrangeRoomId" placeholder="请选择" style="width:120px;"
                           size="mini">
                  <el-option v-for="(item7, index7) in meetingRoomOptions"
                             :key="index7"
                             :label="item7.meetingRoom"
                             :value="item7.meetingRoomId"></el-option>
                </el-select>
            </el-col>
          </el-row>
          <el-table
            :data="tableData.list"
            border
            style="width: 100%;margin-top: 10px;">
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
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'new'">
                  <el-input v-model="scope.row.unit" size="mini"></el-input>
                </span>
                <span v-else>{{scope.row.unit}}</span>
              </template>
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
              prop="centerPrice"
              label="中心单价"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.centerPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="workPrice"
              label="工程公司价格"
              align="center">
              <template slot-scope="scope">
                <!--<span v-if="scope.row.workPrice">{{scope.row.workPrice}}</span>-->
                <!--<span v-else>-->
                <el-input v-model="scope.row.workPrice" size="mini"></el-input>
                <!--</span>-->
              </template>
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
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'new'">
                  <el-input v-model="scope.row.remark" size="mini"></el-input>
                </span>
                <span v-else>{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.$index === 0"></span>
                <span v-else>
                  <el-button type="text" @click="deleteTable(index, scope.$index)" size="mini">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <p style="line-height: 40px;padding-left: 20px;border: 1px solid rgb(235, 238, 245);margin-top: 0px;">
            <!--<span>共计金额： {{tableSum(index)}} 元</span>-->
            <span>共计金额： <span v-text="tableSum(index)"></span> 元</span>
          </p>
        </div>
      </section>
      <el-row>
        <p>订单总金额： <span class="color-r" v-text="tableSumAll()"></span>元</p>
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
            ref="multipleTable2"
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
            ref="multipleTable3"
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

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        // 会议室规模meetingSize
        meetingSizeOptions: [
          {
            id: '0',
            label: '0-50人'
          },
          {
            id: '1',
            label: '51-100人'
          },
          {
            id: '2',
            label: '100人以上'
          }
        ],
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
        rules: {
          arrangeRoomId: [
            { required: true, message: '意向会议室不能为空', trigger: 'change' }
          ],
          arrangeEndTime: [
            { required: true, message: '开始时间和结束时间都不能为空', trigger: 'blur' }
          ]
        },
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
        for (let i = 0; i < this.resData.length; i++) {
          this.resData[i].list.forEach(item => {
            delete item["meetingServiceItemId"];
            delete item["status"];
          });
        }
        this.$http.postJson(this.baseApi + '/api/customservice/meetingRent/updateMeetingFeeDetail', this.resData).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        });
      },
      pickerOptionsEnd(begTime, endTime, index, ind) {
        if (begTime !== '' && endTime !== '') {
          if (ind === 2) {
            let lastTime = new Date(Date.parse(endTime.replace(/-/g, "/")));
            if (begTime.getTime() > lastTime.getTime()) {
              this.$message({
                type: "error",
                message: "开始时间不能晚与结束时间"
              });
              this.resData.meetingContentListStr[index].arrangeEndTime = '';
            }
          } else {
            let strTime = new Date(Date.parse(begTime.replace(/-/g, "/")));
            if (strTime.getTime() > endTime.getTime()) {
              this.$message({
                type: "error",
                message: "开始时间不能晚与结束时间"
              });
              this.resData.meetingContentListStr[index].arrangeStartTime = '';
            }
          }
        }
      },
      addTable(index, meetingContentId) {
        this.centerDialogVisible = true;
        this.form.meetingDeviceName = '';
        this.tableindex = index;
        this.meetingContentId = meetingContentId;
        this.multipleSelection = [];
        this.$refs.multipleTable2.clearSelection();
      },
      addStandard(index, meetingContentId) {
        this.centerDialogVisible2 = true;
        this.form2.meetingDeviceName = '';
        this.tableindex = index;
        this.meetingContentId = meetingContentId;
        this.multipleSelection = [];
        this.$refs.multipleTable3.clearSelection();
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
            isComplement: "0", // '是否补录设备。0：否；1：是；默认0',
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
            isComplement: "0", // '是否补录设备。0：否；1：是；默认0',
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

