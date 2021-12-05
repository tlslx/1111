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
                <span v-for="(meeting, index) in meetingRoomAreaOptions"
                      :key="index"
                      v-if="meeting.arrangeRoomAreaId === item.meetingRoomAreaId">{{meeting.arrangeRoomArea}}</span>-
                <span v-for="(meeting, index) in meetingRoomFloorOptions"
                      :key="index"
                      v-if="meeting.meetingRoomFloorId === item.meetingRoomFloorId">{{meeting.meetingRoomFloor}}</span>-
                <span v-for="(meeting, index) in meetingRoomOptions"
                      :key="index"
                      v-if="meeting.meetingRoomId === item.meetingRoomId">{{meeting.meetingRoom}}</span>
              </span>
              <el-button type="text" class="label-r blue-underline" :disabled="item.meetingRoomId === '' && item.meetingRoomId == null" @click="showDetail(item.meetingRoomId)">详情</el-button>
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

      <section>
        <div v-for="(item, index) in resData.meetingContentList" :key="index">
          <el-row>
            <el-col :span="6">
              <span class="label-l"><span class="number-round" v-text="index+1"></span>会议名称：</span>
              <span class="label-r">{{item.meetingName}}</span>
            </el-col>
            <el-col :span="10">
              <span class="label-l">会议时间：</span>
              <span class="label-r">{{item.meetingStartTime}} - {{item.meetingEndTime}}</span>
            </el-col>

            <el-col :span="8">
              <span class="label-l">意向会议室：</span>
              <span class="label-r">
                <span v-for="(meeting1, index1) in meetingRoomAreaOptions"
                      :key="index1"
                      v-if="meeting1.meetingRoomAreaId === item.meetingRoomAreaId">{{meeting1.meetingRoomArea}}</span>-
                <span v-for="(meeting2, index2) in meetingRoomFloorOptions"
                      :key="index2"
                      v-if="meeting2.meetingRoomFloorId === item.meetingRoomFloorId">{{meeting2.meetingRoomFloor}}</span>-
                <span v-for="(meeting3, index3) in meetingRoomOptions"
                      :key="index3"
                      v-if="meeting3.meetingRoomId === item.meetingRoomId">{{meeting3.meetingRoom}}</span>
              </span>

            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="label-l vertical-top">审批意见：</span>
              <span class="label-r">
                <span v-if="item.meetingPayTypeId==1" :label="1">属商务部各司（局）、交易团、商协会组织的非商业性会议，同意举办，并免收会议室及设备使用费用。</span>
                <span v-if="item.meetingPayTypeId==2" :label="2">属各交易团、商协会组织的商业性会议，同意举办，按标准收取会议室及设备使用费用。</span>
                <span v-if="item.meetingPayTypeId==3" :label="3">属VIP参展企业或其他机构组织会议、论坛，同意举办，按标准收取会议室及设备使用费用。</span>
                <span v-if="item.meetingPayTypeId==4" :label="4">属不适合在广交会举办的会议论坛，不承接安排。<span v-if="item.meetingFaillReason">原因：{{item.meetingFaillReason}}</span></span>
              </span>
            </el-col>
          </el-row>
        </div>
      </section>

      <el-row class="text-center">
        <el-button @click="goBack">返回</el-button>
      </el-row>

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
          <el-button @click="digMettingRoomDetail = false">取消</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        label: '会议室预订复审详情',
        digMettingRoomDetail: false,
        resData: {},
        meetingContentList: [],
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
      // 通过
      handlePass(index, row) {
        let data = [];
        let data2 = [];
        let taskId = this.$route.query.taskId;
        let meetingId = this.$route.query.meetingId;
        data.push(taskId);
        data2.push(meetingId);

        let params = {
          taskIds: data.join(),
          auditFlag: 1,
          meetingIds: data2.join()
        };
        this.auditCondition(params);
      },
      // 驳回
      handleReject(index, row) {
        let data = [];
        let data2 = [];
        let taskId = this.$route.query.taskId;
        let meetingId = this.$route.query.meetingId;
        data.push(taskId);
        data2.push(meetingId);
        this.reject(data, data2);
      },
      auditCondition(params) {
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/repeatAuditDestine', params).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
        });
      },
      reject(data, data2) {
        this.$prompt('请输入驳回原因', '驳回原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let params = {
            auditFlag: 0,
            taskIds: data.join(),
            meetingIds: data2.join(),
            auditContent: value
          };
          this.auditCondition(params);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
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
  .vertical-top{
    vertical-align: top;
  }
  .text-center{
    text-align: center;
  }
</style>
