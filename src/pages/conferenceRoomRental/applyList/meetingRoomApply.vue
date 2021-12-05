<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="label" name="first">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="110px" class="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="主办单位：" size="mini" prop="companyName">
              <el-input v-model.trim="form.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人：" size="mini" prop="contactName">
              <el-input v-model.trim="form.contactName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="支持单位：" size="mini">
              <el-input v-model.trim="form.supportCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：" size="mini" prop="contactPhone">
              <el-input v-model.trim="form.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="承办单位：" size="mini">
              <el-input v-model.trim="form.undertakeCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票信息抬头：" size="mini">
              <el-input v-model.trim="form.invoiceName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：" size="mini" prop="contactEmail">
              <el-input v-model.trim="form.contactEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位：" size="mini">
              <el-input v-model.trim="form.contactPosition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 申请会议室 -->
        <div v-for="(item, index) in form.meetingContentListStr" :key="index">
          <el-row>
            <el-col :span="8">
              <span v-text="index+1" class="index-col-red"></span>
              <el-form-item label="会议名称:" size="mini" label-width="85px" :prop="`meetingContentListStr.${index}.meetingName`" :rules="rules.meetingName">
                <el-input v-model.trim="item.meetingName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="租用时间:" size="mini" :prop="`meetingContentListStr.${index}.meetingEndTime`" :rules="rules.meetingEndTime">
                <el-date-picker
                  v-model="item.meetingStartTime"
                  type="datetime"
                  placeholder="选择开始时间"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm"
                  default-time="09:00:00"
                  :picker-options="pickerOptions"
                  @change="pickerOptionsEnd(item.meetingStartTime, item.meetingEndTime, index, 1)"
                  style="display: inline-block;width: 180px;">
                </el-date-picker>-
                <el-date-picker
                  v-model="item.meetingEndTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  value-format="yyyy-MM-dd HH:mm"
                  format="yyyy-MM-dd HH:mm"
                  default-time="12:00:00"
                  :picker-options="pickerOptions"
                  @change="pickerOptionsEnd(item.meetingStartTime, item.meetingEndTime, index, 2)"
                  style="display: inline-block;width: 180px;">
                </el-date-picker>
              </el-form-item>
              <span>
                <el-button type="danger" v-if="index===0" @click="addMeetingRoom" size="mini">添加</el-button>
                <el-button type="info" v-else @click="delMeetingRoom(index)" size="mini">删除</el-button>
              </span>
            </el-col>

            <el-col :span="8">
              <el-form-item label="会议规模：" size="mini" :prop="`meetingContentListStr.${index}.meetingSize`" :rules="rules.meetingSize">
                <el-select v-model="item.meetingSize" placeholder="请选择活动区域" style="width: 178px;">
                  <el-option v-for="(item4, index4) in meetingSizeOptions"
                             :key="index4"
                             :label="item4.label"
                             :value="item4.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="意向会议室：" size="mini" :prop="`meetingContentListStr.${index}.meetingRoomId`" :rules="rules.meetingRoomId">
                <el-select v-model="item.meetingRoomAreaId" placeholder="请选择" style="width:120px;">
                  <el-option v-for="(item1, index1) in meetingRoomAreaOptions"
                             :key="index1"
                             :label="item1.meetingRoomArea"
                             :value="item1.meetingRoomAreaId"></el-option>
                </el-select>
                <el-select v-model="item.meetingRoomFloorId" placeholder="请选择" style="width:120px;">
                  <el-option v-for="(item2, index2) in meetingRoomFloorOptions"
                             :key="index2"
                             :label="item2.meetingRoomFloor"
                             :value="item2.meetingRoomFloorId"></el-option>
                </el-select>
                <el-select v-model="item.meetingRoomId" placeholder="请选择" style="width:120px;">
                  <el-option v-for="(item3, index3) in meetingRoomOptions"
                             :key="index3"
                             :label="item3.meetingRoom"
                             :value="item3.meetingRoomId"></el-option>
                </el-select>
                <el-button type="text" class="label-r blue-underline" :disabled="item.meetingRoomId === '' || item.meetingRoomId == null" @click="showDetail(item.meetingRoomId)">详情</el-button>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="基本情况：" size="mini" :prop="`meetingContentListStr.${index}.meetingBaseInfo`" :rules="rules.meetingBaseInfo">
                <el-input v-model.trim="item.meetingBaseInfo" style="width: 700px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" size="mini">
              <el-input v-model.trim="form.remark" style="width: 700px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item class="" label="举办证明材料：" size="small">
              <el-upload
                class="upload-demo item-inline-block"
                :action="uploadApi"
                :headers="header"
                :data="postdata"
                :limit="3"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-remove="handleDelete"
                :on-exceed="exceed"
                accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF"
                :file-list="imgList"
                :auto-upload="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip item-inline-block">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="text-center">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="backToPrevious">返回</el-button>
          </el-form-item>
        </el-row>

      </el-form>

      <!-- 会议室详情弹窗 -->
      <el-dialog title="会议室信息" :visible.sync="digMettingRoomDetail" width="70%">
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
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        label: '会议室申请',
        taskId: '',
        digMettingRoomDetail: false,
        form: {
          meetingId: null,
          meetingStatus: null,
          taskId: null,
          companyName: '',
          contactName: '',
          supportCompany: '',
          contactPhone: '',
          undertakeCompany: '',
          invoiceName: '',
          contactEmail: '',
          contactPosition: '',
          remark: '',
          meetingContentListStr: [
            {
              meetingId: '',
              meetingName: '',
              meetingContentId: '',
              meetingStartTime: '',
              meetingEndTime: '',
              meetingSize: '',
              meetingRoomAreaId: '',
              meetingRoomFloorId: '',
              meetingRoomId: '',
              meetingBaseInfo: ''
            }
          ],
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
        meetingRoomData: {
          add: '',
          peopleNo: '',
          text: ''
        },
        uploadApi: '',
        header: { Token: this.$store.state.token },
        postdata: { code: 1 },
        imgList: [],
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
          ],
          meetingName: [
            { required: true, message: '会议名称不能为空', trigger: 'blur' }
          ],
          meetingBaseInfo: [
            { required: true, message: '基本情况不能为空', trigger: 'blur' }
          ],
          meetingSize: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          meetingRoomId: [
            { required: true, message: '意向会议室不能为空', trigger: 'change' }
          ],
          meetingStartTime: [
            { required: true, message: '开始时间和结束时间都不能为空', trigger: 'change' }
          ],
          meetingEndTime: [
            { required: true, message: '开始时间和结束时间都不能为空', trigger: 'change' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    mounted() {
      if (this.$route.query.meetingId) {
        this.init();
        this.form.meetingId = this.$route.query.meetingId;
        this.taskId = this.$route.query.taskId;
        this.form.meetingStatus = this.$route.query.meetingStatus;
        this.label = '会议室修改';
      } else {
        this.form.meetingId = null;
        this.form.meetingStatus = null;
        this.label = '会议室申请';
        this.form.meetingContentListStr[0].meetingStartTime = '';
        this.form.meetingContentListStr[0].meetingEndTime = '';
      }
      this.uploadApi = this.baseApi + '/api/customservice/forum/uploadFile';
    },
    methods: {
      init() {
        let meetingId = this.$route.query.meetingId;
        let data = {
          meetingId: meetingId
        };
        this.$http.get(this.baseApi + '/api/customservice/meetingRent/getMeetingApply', data).then(res => {
          for (let name in this.form) {
            this.form[name] = res[name];
          }
          this.form.attachmentList.forEach(item => {
            this.imgList.push({
              name: item.fileName, url: this.baseApi + '/api/customservice/forum/viewImage/' + item.filePath
            });
          });
        });
      },
      // 添加会议室
      addMeetingRoom() {
        let data = {
          meetingName: '',
          meetingStartTime: '',
          meetingEndTime: '',
          meetingSize: '',
          meetingRoomAreaId: '',
          meetingRoomFloorId: '',
          meetingRoomId: '',
          meetingBaseInfo: ''
        };
        this.form.meetingContentListStr.push(data);
      },
      // 删除会议室
      delMeetingRoom(index) {
        this.form.meetingContentListStr.splice(index, 1);
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let data = this.deepClone(this.form);
            data.meetingContentListStr = JSON.stringify(data.meetingContentListStr);
            data.attachmentList = JSON.stringify(data.attachmentList);
            data.taskId = this.taskId;
            let sentApi = '';
            if (this.form.meetingId) {
              sentApi = '/api/customservice/meetingRent/updateMeetingApply';
            } else {
              sentApi = '/api/customservice/meetingRent/saveMeetingApply';
            }
            this.$http.post(this.baseApi + sentApi, data).then(res => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.backToPrevious();
            }).catch(err => {
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
              this.form.meetingContentListStr[index].meetingEndTime = '';
            }
          } else {
            let strTime = new Date(Date.parse(begTime.replace(/-/g, "/")));
            if (strTime.getTime() > endTime.getTime()) {
              this.$message({
                type: "error",
                message: "开始时间不能晚与结束时间"
              });
              this.form.meetingContentListStr[index].meetingStartTime = '';
            }
          }
        }
      },
      showDetail () {
        this.digMettingRoomDetail = true;
      },
      // 举办证明材料上传
      beforeUpload(file) {
        let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
        let testPdf = file.type === "application/pdf";
        if (!testPdf && !testFileType) {
          this.$message.warning("文件格式上传错误!");
          return false;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.warning("上传文件大小不能超过 5MB!");
          return false;
        }
        return true;
      },
      exceed(fileList) {
        //  上传的文件超过3个
        this.$message({
          message: '佐证材料不能超过3个',
          type: 'error'
        });
      },
      uploadSuccess(response, file, fileList) {
        if (response.data != null) {
          this.form.attachmentList.push({ meetingId: this.form.meetingId, fileName: file.name, filePath: response.data });
          this.imgList.push({
            name: file.name, url: this.baseApi + '/api/customservice/forum/viewImage/' + response.data
          });
        }
      },
      handleDelete(file, fileList) {
        let aaa = null;
        let bbb = null;
        this.form.attachmentList.forEach((item, index) => {
          if (file.name === item.fileName) {
            aaa = index;
          }
        });
        this.form.attachmentList.splice(aaa, 1);
        this.imgList.forEach((item, index) => {
          if (file.name === item.name) {
            bbb = index;
          }
        });
        this.imgList.splice(bbb, 1);
      },

      backToPrevious() {
        this.$router.go(-1);
      },
      deepClone(obj) { // 深拷贝
        let _obj = JSON.stringify(obj);
        let objClone = JSON.parse(_obj);
        return objClone;
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
