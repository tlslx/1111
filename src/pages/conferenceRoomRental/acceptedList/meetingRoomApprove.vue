<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室审批" name="first">
      <!--<div>会议室审批</div>-->
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
            <span class="label-l">发票信息抬头：</span>
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
              <span class="label-l"><span class="number-round" v-text="index+1"></span>会议名称：</span>
              <span class="label-r">{{item.meetingName}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label-l">租用时间：</span>
              <span class="label-r">{{item.meetingStartTime}}至{{item.meetingEndTime}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label-l">会议规模：</span>
              <span class="label-r"
                    v-for="(option, ind) in meetingSizeOptions"
                    :key="ind"
                    v-if="item.meetingSize == option.id">{{option.label}}</span>
            </el-col>
            <el-col :span="12">
              <span class="label-l">意向会议室：</span>
              <span class="label-r">
                <!--{{item.meetingRoomArea}}-->
                <!--{{item.meetingRoomFloor}}-->
                <!--{{item.meetingRoomName}}-->
                <span v-for="(meeting, index) in meetingRoomAreaOptions"
                      :key="index"
                      v-if="meeting.meetingRoomAreaId === item.meetingRoomAreaId">{{meeting.meetingRoomArea}}</span>-
                <span v-for="(meeting, index) in meetingRoomFloorOptions"
                      :key="index"
                      v-if="meeting.meetingRoomFloorId === item.meetingRoomFloorId">{{meeting.meetingRoomFloor}}</span>-
                <span v-for="(meeting, index) in meetingRoomOptions"
                      :key="index"
                      v-if="meeting.meetingRoomId === item.meetingRoomId">{{meeting.meetingRoom}}</span>
              </span>
              <el-button type="text" class="label-r blue-underline" :disabled="item.meetingRoomId === '' && item.meetingRoomId == null" @click="showDetail">详情</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="label-l">基本情况：</span>
              <span class="label-r">{{item.meetingBaseInfo}}</span>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="label-l vertical-top">审批结果：</span>
              <span class="label-r">
                <el-radio-group v-model="item.meetingPayTypeId">
                  <el-radio label="1" style="line-height:30px;">属商务部各司（局）、交易团、商协会组织的非商业性会议，同意举办，并免收会议室及设备使用费用。</el-radio><br>
                  <el-radio label="2" style="line-height:30px;">属各交易团、商协会组织的商业性会议，同意举办，按标准收取会议室及设备使用费用。</el-radio><br>
                  <el-radio label="3" style="line-height:30px;">属VIP参展企业或其他机构组织会议、论坛，同意举办，按标准收取会议室及设备使用费用。</el-radio><br>
                  <el-radio label="4" style="line-height:30px;">属不适合在广交会举办的会议论坛，不承接安排。<el-input v-model="item.meetingFaillReason" placeholder="请输入内容" size="mini" style="width:400px;"></el-input></el-radio>
                </el-radio-group>
              </span>
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
            <span class="label-l">举办证明材料：</span>
            <span class="label-r">
              <span v-for="(imgitem, imgindex) in resData.attachmentList"
                    :key="imgindex" style="width: 220px;display: inline-block;">
                <img :src="showImgPath(imgitem)" alt="" class="img">
              </span>
            </span>
          </el-col>
        </el-row>

        <el-row class="text-center">
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button type="primary" @click="submitZwk">提交展务科</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-row>

      </section>

      <!-- 会议室详情弹窗 -->
      <el-dialog title="会议室信息" :visible.sync="digMettingRoomDetail" width="80%">
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
              <span class="label-r">{{meetingRoomData.text}}</span>
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

        <div class="dialog-footer">
          <el-button @click="digMettingRoomDetail = false">关闭</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    name: "meetingRoomApprove",
    data() {
      return {
        activeName: 'first',
        meetingId: '',
        taskId: '',
        digMettingRoomDetail: false,
        resData: {},
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
        meetingRoomData: {
          add: '',
          peopleNo: '',
          text: 'afsdasfa'
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
      submit() {
        let data = {
          meetingId: this.meetingId,
          formFlag: '1',
          taskId: this.taskId
        };
        let faillReason = true;
        data.meetingContentListStr = [];
        this.resData.meetingContentListStr.forEach((item, index) => {
          if (item.meetingPayTypeId === '' || item.meetingPayTypeId == null || item.meetingPayTypeId === undefined) {
            this.$message({
              type: "error",
              message: "请选择审批结果后再受理"
            });
            payTypeId = false;
            return;
          } else {
            // if (item.meetingPayTypeId !== 4) {
            //   item.meetingFaillReason = '';
            // }
            data.meetingContentListStr.push({
              meetingPayTypeId: item.meetingPayTypeId,
              meetingFaillReason: item.meetingFaillReason || null,
              meetingContentId: item.meetingContentId || null
            });
          }
        });
        data.meetingContentListStr = JSON.stringify(data.meetingContentListStr);
        if (faillReason === true) {
          this.$http.post(this.baseApi + '/api/customservice/meetingRent/applyAccept', data).then(res => {
            this.$message({
              type: "success",
              message: "受理成功"
            });
            this.goBack();
          });
        }
      },
      // 提交展务科
      submitZwk() {
        let data = [{
          taskId: this.taskId,
          meetingId: this.meetingId
        }];
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/passToExhibition', {
          ids: JSON.stringify(data)
        }).then(res => {
          this.$message({
            type: "success",
            message: "成功提交到展务科"
          });
          this.goBack();
        });
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
      this.init();
      this.meetingId = this.$route.query.meetingId;
      this.taskId = this.$route.query.taskId;
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
.label-f-l{
  display: inline-block;
  width: 230px;
  color: #8a8a8a;
  text-align: right;
  line-height: 40px;
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
.color-r{
  color: red;
}
.vertical-top{
  vertical-align: top;
}
.text-center{
  text-align: center;
}
.blue-underline{
  color: #0000ff;
  text-decoration: underline;
  cursor: pointer;
}

</style>
