<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会议室修改" name="first">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="110px" class="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="主办单位：" size="mini" prop="companyName">
              <el-input v-model="form.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人：" size="mini" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="支持单位：" size="mini">
              <el-input v-model="form.supportCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：" size="mini" prop="contactPhone">
              <el-input v-model="form.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="承办单位：" size="mini">
              <el-input v-model="form.undertakeCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票信息抬头：" size="mini">
              <el-input v-model="form.invoiceName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：" size="mini" prop="contactEmail">
              <el-input v-model="form.contactEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位：" size="mini">
              <el-input v-model="form.contactPosition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<p>{{form}}</p>-->
        <!--<p>{{form.meetingContentListStr}}</p>-->
        <!-- 申请会议室 -->
        <div v-for="(item, index) in form.meetingContentListStr" :key="index">
          <el-row>
            <el-col :span="8">
              <span v-text="index+1" class="index-col-red"></span>
              <el-form-item label="会议名称:" size="mini" label-width="150px">
                <el-input v-model="item.meetingName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="租用时间:" size="mini">
                <el-date-picker
                  v-model="item.meetingStartTime"
                  type="datetime"
                  placeholder="开始时间"
                  default-time="09:00:00" style="display: inline-block;width: 180px;">
                </el-date-picker>
                <el-date-picker
                  v-model="item.meetingEndTime"
                  type="datetime"
                  placeholder="结束时间"
                  default-time="12:00:00" style="display: inline-block;width: 180px;">
                </el-date-picker>
              </el-form-item>
              <!--<span>-->
                <!--<el-button type="danger" v-if="index===0" @click="addMeetingRoom">添加</el-button>-->
                <!--<el-button type="info" v-else @click="delMeetingRoom(index)">删除</el-button>-->
              <!--</span>-->
            </el-col>
            </el-row>
            <el-row>
            <el-col :span="8">
              <el-form-item label="会议规模：" size="mini" label-width="150px">
                <el-select v-model="item.meetingSize" placeholder="请选择活动区域">
                  <el-option v-for="(item, index) in meetingSizeOptions"
                             :key="index"
                             :label="item.label"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="意向会议室：" size="mini">
                <el-select v-model="item.meetingRoomAreaId" placeholder="请选择" style="width:120px;">
                  <el-option v-for="(item, index) in meetingRoomAreaOptions"
                             :key="index"
                             :label="item.meetingRoomArea"
                             :value="item.meetingRoomAreaId"></el-option>
                </el-select>
                <el-select v-model="item.meetingRoomFloorId" placeholder="请选择" style="width:120px;">
                  <el-option v-for="(item, index) in meetingRoomFloorOptions"
                             :key="index"
                             :label="item.meetingRoomFloor"
                             :value="item.meetingRoomFloorId"></el-option>
                </el-select>
                <el-select v-model="item.meetingRoomId" placeholder="请选择" style="width:120px;">
                  <el-option v-for="(item, index) in meetingRoomOptions"
                             :key="index"
                             :label="item.meetingRoom"
                             :value="item.meetingRoomId"></el-option>
                </el-select>
                <el-button type="text" class="label-r blue-underline" :disabled="item.meetingRoomId === '' && item.meetingRoomId == null" @click="showDetail(item.meetingRoomId)">详情</el-button>
              </el-form-item>
            </el-col>
            <!--</el-row>-->
            <!--<el-row>-->
            <el-col :span="24">
              <el-form-item label="基本情况：" size="mini">
                <el-input v-model="item.meetingBaseInfo" style="width: 800px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" size="mini">
              <el-input v-model="form.remark" style="width: 800px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="举办证明材料：" size="mini">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item class="text-center">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="goback">返回</el-button>
          </el-form-item>
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
    name: "meetingRoomDetailEdit",
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (value === "") {
          return callback(new Error("请输入手机号"));
        } else if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const checkEmail2 = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; //Email正则
        if (value !== '') {
          if (!reg.test(value)) {
            return callback(new Error("请输入正确的邮箱"));
          } else {
            return callback();
          }
        } else {
          return callback();
        }
      };
      return {
        activeName: 'first',
        digMettingRoomDetail: false,
        meetingRoomData: {
          add: '',
          peopleNo: '',
          text: 'afsdasfa'
        },
        taskId: '',
        form: {
          meetingStatus: '',
          meetingId: null,
          companyName: '',
          contactName: '',
          supportCompany: '',
          contactPhone: '',
          undertakeCompany: '',
          invoiceName: '',
          contactEmail: '',
          contactPosition: '',
          meetingContentListStr: [
            {
              meetingName: '',
              meetingStartTime: '',
              meetingEndTime: '',
              meetingSize: '',
              arrangeRoomAreaId: '',
              meetingRoomFloorId: '',
              meetingRoomId: '',
              meetingBaseInfo: ''
            }
          ],
          remark: '',
          attachmentList: [] // 证明材料
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
        fileList: [],
        rules: {
          companyName: [
            { required: true, message: '请输入主办单位', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, validator: validateMobile, trigger: 'blur' }
          ],
          contactEmail: [
            { required: false, validator: checkEmail2, trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    mounted() {
      this.init();
      this.form.meetingId = this.$route.query.meetingId;
      this.taskId = this.$route.query.taskId;
    },
    methods: {
      init() {
        let meetingId = this.$route.query.meetingId;
        let data = {
          meetingId: meetingId
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/getMeetingApply', data).then(res => {
          for (let name in this.form) {
            if (name === 'meetingContentListStr') {
              for (let i = 0; i < res.meetingContentListStr.length; i++) {
                for (let name1 in this.form.meetingContentListStr[0]) {
                  this.form.meetingContentListStr[i][name1] = res.meetingContentListStr[i][name1];
                }
              }
            } else {
              this.form[name] = res[name];
            }
          }
        });
      },
      onSubmit() {
        let data = this.form;
        data.meetingContentListStr = JSON.stringify(data.meetingContentListStr);
        data.taskId = this.taskId;
        this.$http.post(this.baseApi + '/api/customservice/meetingRent/updateMeetingApply', data).then(res => {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.goback();
        });
      },
      showDetail (id) {
        this.digMettingRoomDetail = true;
      },
      goback() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style scoped>

  .form{
    margin-left: 20px;
  }
  .index-col-red{
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: white;
    background-color: red;
    border-radius: 10px;
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
