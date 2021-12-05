<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="label" name="first">
      <section style="padding: 10px;">
        <el-row>
          <el-col :span="12">
            <span class="label-l">主办单位：</span>
            <span class="label-r">{{resData.companyName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label-l">申请人：</span>
            <span class="label-r">{{resData.contactName}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <span class="label-l">支持单位：</span>
            <span class="label-r">{{resData.supportCompany}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label-l">手机号：</span>
            <span class="label-r">{{resData.contactPhone}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <span class="label-l">承办单位：</span>
            <span class="label-r">{{resData.undertakeCompany}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label-l">发票抬头：</span>
            <span class="label-r">{{resData.invoiceName}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <span class="label-l">邮箱：</span>
            <span class="label-r">{{resData.contactEmail}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label-l">职务：</span>
            <span class="label-r">{{resData.contactPosition}}</span>
          </el-col>
        </el-row>
        <!--会议简要-->
        <div v-for="(item, index) in resData.meetingContentListStr" :key="index">
          <el-row>
            <el-col :span="12">
              <span class="label-l">
                <span class="number-round" v-text="index+1"></span>会议名称：
              </span>
              <span class="label-r">{{item.meetingName}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label-l">租用时间：</span>
              <span class="label-r">{{item.meetingStartTime}}-{{item.meetingEndTime}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label-l">会议规模：</span>
              <span class="label-r" v-for="(option, ind) in meetingSizeOptions" :key="ind" v-if="item.meetingSize == option.id">{{option.label}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label-l">意向会议室：</span>
              <span class="label-r">
                <span v-for="(meeting1, ind1) in meetingRoomAreaOptions"
                      :key="ind1"
                      v-if="meeting1.meetingRoomAreaId === item.meetingRoomAreaId">
                  {{meeting1.meetingRoomArea}}
                </span>-
                <span v-for="(meeting2, ind2) in meetingRoomFloorOptions"
                      :key="ind2"
                      v-if="meeting2.meetingRoomFloorId === item.meetingRoomFloorId">
                {{meeting2.meetingRoomFloor}}
                </span>-
                <span v-for="(meeting3, ind3) in meetingRoomOptions"
                      :key="ind3"
                      v-if="meeting3.meetingRoomId === item.meetingRoomId">
                {{meeting3.meetingRoom}}
                </span>

                <el-button type="text" class="label-r blue-underline" :disabled="item.meetingRoomId === '' && item.meetingRoomId == null" @click="showDetail(item.meetingRoomId)">详情</el-button>
              </span>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="label-l">基本情况：</span>
              <span class="label-r">{{item.meetingBaseInfo}}</span>
            </el-col>
          </el-row>

        </div>

        <el-row>
          <el-col :span="24">
            <span class="label-l">备注：</span>
            <span class="label-r">{{resData.remark}}</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <span class="label-l vertical-top">举办证明材料：</span>
            <span class="label-r">
              <span v-for="(imgitem, imgindex) in resData.attachmentList"
                    :key="imgindex" style="width: 220px;display: inline-block;">
                <el-popover
                  placement="right"
                  title="图片"
                  width="450"
                  trigger="hover">
                  <img :src="showImgPath(imgitem)" alt="" style="width: 450px;">
                  <img :src="showImgPath(imgitem)" alt="" slot="reference" class="img">
                </el-popover>
              </span>
            </span>
          </el-col>
        </el-row>
      </section>
      <el-form ref="resData" :inline="true" :model="resData" :rules="rules" class="form">
        <section>
          <div v-for="(item4, index4) in resData.meetingContentListStr" :key="index4">
            <el-row>
              <el-col :span="8">
                <span class="label-l"><span class="number-round" v-text="index4+1"></span>会议名称：</span>
                <span>{{item4.meetingName}}</span>
              </el-col>
              <el-col :span="16">
                <el-form-item label="会议时间：" size="mini" :prop="`meetingContentListStr.${index4}.arrangeEndTime`" :rules="rules.arrangeEndTime">
                  <el-date-picker
                    v-model="item4.arrangeStartTime"
                    type="datetime"
                    size="mini"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    default-time="09:00:00"
                    :picker-options="pickerOptions"
                    @change="pickerOptionsEnd(item4.arrangeStartTime, item4.arrangeEndTime, index4, 1)"
                    style="display: inline-block;width: 200px;">
                  </el-date-picker>-
                  <el-date-picker
                    v-model="item4.arrangeEndTime"
                    type="datetime"
                    size="mini"
                    placeholder="选择结束时间"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    default-time="12:00:00"
                    :picker-options="pickerOptions"
                    @change="pickerOptionsEnd(item4.arrangeStartTime, item4.arrangeEndTime, index4, 2)"
                    style="display: inline-block;width: 200px;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="会议室：" label-width="150px" label-position="right" size="mini" :prop="`meetingContentListStr.${index4}.arrangeRoomId`" :rules="rules.arrangeRoomId">
                  <el-select v-model="item4.arrangeRoomAreaId" placeholder="请选择" style="width:150px;"
                             size="mini">
                    <el-option v-for="(item5, index5) in meetingRoomAreaOptions"
                               :key="index5"
                               :label="item5.meetingRoomArea"
                               :value="item5.meetingRoomAreaId"></el-option>
                  </el-select>
                  <el-select v-model="item4.arrangeRoomFloorId" placeholder="请选择" style="width:150px;"
                             size="mini">
                    <el-option v-for="(item6, index6) in meetingRoomFloorOptions"
                               :key="index6"
                               :label="item6.meetingRoomFloor"
                               :value="item6.meetingRoomFloorId"></el-option>
                  </el-select>
                  <el-select v-model="item4.arrangeRoomId" placeholder="请选择" style="width:150px;"
                             size="mini">
                    <el-option v-for="(item7, index7) in meetingRoomOptions"
                               :key="index7"
                               :label="item7.meetingRoom"
                               :value="item7.meetingRoomId"></el-option>
                  </el-select>
                  <el-button type="text" class="label-r blue-underline" :disabled="item4.arrangeRoomId === '' || item4.arrangeRoomId == null" @click="showDetail(item4.arrangeRoomId)">详情</el-button>
                </el-form-item>
              </el-col>
            </el-row>

          </div>
        </section>

        <el-row class="text-center">
          <el-button type="primary" v-show="edit" @click="submitForm">提交</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-row>
      </el-form>
      <!-- 会议室详情弹窗 -->
      <el-dialog title="会议室信息" :visible.sync="digMettingRoomDetail" width="350px">
        <el-row>
          <el-col :span="8">
            <img src="" alt="">
            <p>图一</p>
          </el-col>
          <el-col :span="8">
            <img src="" alt="">
            <p>图二</p>
          </el-col>
          <el-col :span="8">
            <img src="" alt="">
            <p>图三</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label-l">地点：</span>
            <span class="label-r">{{meetingRoomData.add}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label-l">意向会议室：</span>
            <span class="label-r">{{meetingRoomData.text}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label-l">面积：</span>
            <span class="label-r">{{meetingRoomData.text}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label-l">容纳人数：</span>
            <span class="label-r">{{meetingRoomData.text}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label-l">标准配置</span>
            <span class="label-r">{{meetingRoomData.text}}</span>
          </el-col>

        </el-row>

        <div class="dialog-footer text-center">
          <!--<el-button type="primary" @click="submitReceivedAward">确认</el-button>-->
          <el-button @click="digMettingRoomDetail = false">取消</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: "zwkApprovalDetail",
    data() {
      return {
        activeName: 'first',
        label: '会议室预定详情',
        digMettingRoomDetail: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        resData: {},
        taskId: '',
        edit: false,
        meetingRoomData: {
          add: '',
          peopleNo: '',
          text: 'afsdasfa'
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
        baseApi: process.env.API_FF_URL
      };
    },
    methods: {
      init() {
        let meetingId = this.$route.query.meetingId;
        let data = {
          meetingId: meetingId
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/getMeetingApply', data).then(res => {
          this.resData = res;
        });
      },
      showDetail (id) {
        this.digMettingRoomDetail = true;
      },
      submitForm() {
        this.$refs.resData.validate((valid) => {
          if (valid) {
            let data = [];
            data = this.resData.meetingContentListStr;
            this.$http.post(this.baseApi + '/api/customservice/meetingRent/saveMeetingDestine', {
              meetingContentListStr: JSON.stringify(data),
              meetingId: this.resData.meetingId,
              taskId: this.taskId
            })
              .then(res => {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.goBack();
              });
          } else {
            return false;
          }
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
      showImgPath(row) {
        if (row.filePath) {
          return this.baseApi + "/api/customservice/forum/viewImage/" + row.filePath;
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted () {
      this.taskId = this.$route.query.taskId;
      if (this.$route.query.edit) {
        this.edit = true;
      } else {
        this.edit = false;
      }
      this.init();
    }
  };
</script>

<style scoped>
  .label-l{
    display: inline-block;
    width: 150px;
    color: #8a8a8a;
    text-align: right;
    line-height: 30px;
  }

  .vertical-top{
    vertical-align: top;
  }
  .label-r{
    color: #000000;
    display: inline-block;
    padding-left: 10px;
    line-height: 30px;
  }
  .label-r .img{
    display: inline-block;
    width: 220px;
    max-height: 400px;
    height: auto;
  }
  .number-round {
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background-color: #f44336;
    color: #FFFFFF;
    border-radius: 15px;
  }
  .blue-underline{
    color: #0000ff;
    text-decoration: underline;
    cursor: pointer;
  }
  .text-center{
    text-align: center;
  }
</style>
