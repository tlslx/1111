/**
* @file 听众-会议论坛详情
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="contanier">
    <p class="top_line"><span class="title">会议论坛详情</span></p>
    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="10">
        <span class="itemtitle">会议主题:</span>
        <span>{{mettingForumForm.meetingTitle}}</span>
      </el-col>
      <el-col :span="12">
        <span class="itemtitle">期数:</span>
        <span>{{mettingForumForm.exhibitionPeriod}}</span>
      </el-col>
    </el-row>

    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="10">
        <span class="itemtitle">开始时间:</span>
        <span>{{mettingForumForm.meetingStartTime.substring(0,16)}}</span>
      </el-col>
      <el-col :span="12">
        <span class="itemtitle">结束时间:</span>
        <span>{{mettingForumForm.meetingEndTime.substring(0,16)}}</span>
      </el-col>
    </el-row>

    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="10">
        <span class="itemtitle">活动:</span>
        <span>{{mettingForumForm.activity}}</span>
      </el-col>
      <el-col :span="12">
        <span class="itemtitle">会议地点:</span>
        <span>{{mettingForumForm.meetingAddress}}</span>
      </el-col>
    </el-row>

    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="10">
        <span class="itemtitle">类别:</span>
        <span v-for="(category,index) in categoryList" :key="index" v-if="mettingForumForm.forumCategoryId === category.forumCategoryId">{{category.forumCategoryName}}</span>
      </el-col>
      <el-col :span="12">
        <span class="itemtitle">是否收费:</span>
        <span>{{mettingForumForm.isFree === '0'? "收费 " + mettingForumForm.forumCost + "元" : "免费" }}</span>
      </el-col>
    </el-row>

    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="10">
        <span class="itemtitle">人数限制:</span>
        <span>{{mettingForumForm.numberLimit}}</span>
      </el-col>
      <el-col :span="12">
        <span class="itemtitle">标签:</span>
        <span v-for="(label,index) in labelList" :key="index" v-if="mettingForumForm.forumLabelId === label.forumLabelId">{{label.forumLabelName}}</span>
      </el-col>
    </el-row>

    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="10">
        <span class="itemtitle">出席嘉宾:</span>
        <el-button type="primary" @click="viewAudienceList()">查看</el-button>
      </el-col>
      <el-col :span="12">
        <span class="itemtitle">归属单位:</span>
        <span v-for="(vest,index) in vestUnitList" :key="index" v-if="mettingForumForm.ascriptionUnitId === vest.ascriptionUnitId">{{vest.ascriptionUnitName}}</span>
      </el-col>
    </el-row>

    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="22">
        <span class="itemtitle">是否开放:</span>
        <span>{{mettingForumForm.isOpen === 1 ? "开放" : "不开放" }}</span>
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col :span="2">
        <span class="itemtitle"></span>
      </el-col>
      <el-col :span="22">
        <span class="itemtitle">会议内容:</span>
        <span>{{mettingForumForm.meetingContent}}</span>
      </el-col>
    </el-row>
    <el-row style="text-align: center">
      <el-button type="danger" :disabled="isRegister" class="btn" @click="openSignUpDialog()">报名</el-button>
      <el-button type="primary" :disabled="!isRegister" class="btn" @click="cancelSignUpForum()">取消报名</el-button>
      <el-button class="btn" @click="goBackList()">返回</el-button>
    </el-row>
    <el-form :model="commentForm" style="margin: 0 60px;" :rules="rules" ref="commentForm">
      <el-form-item label-width="0" prop="comment">
        <div>
          留言评论
        </div>
        <div style="position:relative;height: 80px;">
          <el-input v-model="commentForm.comment" type="textarea" maxlength="200" ></el-input>
          <el-button type="primary" class="comment_btn" @click="saveComment()">发表</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div v-for="(comment,index) in comments" :key="index">
      <section class="comment">
        <img class="comment_img" src="" alt="">
        <div class="comment_user">
          <span>{{comment.creatorName}}</span>
          <span style="margin-left: 10px">{{comment.createDate}}</span>
          <span style="margin-left: 10px;color: red">{{comment.status === '2' ? '*此评论审核不通过' : '' }}</span>
          <span style="margin-left: 10px;color: blue">{{comment.status === '1' ? '*此评论审核通过' : '' }}</span>
        </div>
      </section>
      <div class="comment_content">
        <span>{{comment.comment}}</span>
      </div>
      <div v-if="comment.replyContent" style="margin-left: 10px;background-color: rgba(226,226,226,0.95);padding: 5px;border-radius: 5px">
        <div>
          <section class="comment">
            <img class="comment_img" src="" alt="">
            <div class="comment_user">
              <span>{{comment.modifierName}}</span>
              <span style="margin-left: 10px">{{comment.modifyDate}}</span>
            </div>
          </section>
          <div class="comment_content">
            <span>{{comment.replyContent}}</span>
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div>

    <!--查看嘉宾名单弹框-->
    <el-dialog title="查看嘉宾名单"  width="700px" :visible.sync="viewListDialog" :close-on-click-modal="false">
      <el-form :inline="true" :model="viewListForm" class="demo-form-inline">
        <el-form-item label="姓名" size="mini" label-width="70px">
          <el-input style="width: 150px" v-model.trim="viewListForm.guestName"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" size="mini" label-width="70px" >
          <el-input style="width: 150px" v-model.trim="viewListForm.orgName"></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button  type="primary" @click="getGuestList('1')">查询</el-button>
          <el-button  type="primary" @click="resetViewListForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="viewListDatas"
        border
      >
        <el-table-column
          property="date"
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="guestName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="所属机构"
          align="center">
        </el-table-column>
        <el-table-column
          prop="forumRole"
          label="会议角色"
          fixed="right"
          width="140"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleViewListSizeChange"
        @current-change="handleViewListCurrentChange"
        :current-page.sync="viewListForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="viewListForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="viewListTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button @click="viewListDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!--报名提示弹框-->
    <el-dialog title="报名提示"  width="400px" :visible.sync="signUpDialog">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="" size="mini" label-width="0" style="text-align: center">
          <div style="width: 400px;text-align: center" v-if="this.mettingForumForm.forumCost">你报名参加的会议论坛签到时需要付费<span style="color: red">{{ this.mettingForumForm.forumCost }}</span>元,是否报名?</div>
          <div style="width: 400px;text-align: center" v-else>你报名参加的会议论坛免费,是否报名?</div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="signUpForum()">确 定</el-button>
        <el-button @click="signUpDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--报名提示弹框-->
    <el-dialog title="报名成功"  width="450px" :visible.sync="signUpSuccessDialog">
      <div style="padding: 10px 20px;margin-left: 20px">
        您参加的会议论坛报名成功，报名费现场签到给相关工作
      </div>
      <div style="padding: 10px 20px">
        人员，温馨提示：参会需办理入场证件，如不办理，则不能进
      </div>
      <div style="padding: 10px 20px">
        入广交会馆。点击<a href="">证件申请</a>
      </div>
      <div style="width: 450px;text-align: center" >
        <img :src="qrCodeUrl" style="width:150px;height:150px;margin: 0 auto">
      </div>
      <div style="width: 450px;text-align: center">签到二维码</div>
      <div class="dialog-footer">
        <el-button @click="signUpSuccessDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'mettingForumMsgDetail',
    data() {
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`~!@#$%^&*()_+<>?:"{}\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、|《。》？、【】[\]]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error("输入不能包含特殊字符!"));
        } else {
          return callback();
        }
      };
      return {
        source: {
          language: []
        },
        forumId: '',
        isRegister: false,
        viewListDialog: false,
        signUpDialog: false,
        signUpSuccessDialog: false,
        qrCodeUrl: '',

        viewListDatas: [],
        viewListTotal: 0,
        comments: [],

        commentForm: {
          forumId: '',
          comment: ''
        },
        viewListForm: {
          forumId: '',
          guestName: '',
          orgName: '',
          current: 1,
          size: 10
        },
        mettingForumForm: {
          forumId: '',
          area: '',
          room: '',
          exhibitionPeriod: '',
          forumCategoryId: '',
          forumLabelId: '',
          ascriptionUnitId: '',
          meetingTitle: '',
          meetingStartTime: '',
          meetingEndTime: '',
          meetingAddress: '',
          numberLimit: '',
          activity: '',
          isFree: '0',
          isOpen: 0,
          forumCost: "",
          meetingContent: '',
          infoCsForumGuestRelationLkList: [
            {
              forumId: '',
              guestId: '',
              forumRole: ''
            }
          ]
        },
        rules: {
          comment: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ]
        },
        categoryList: [],
        labelList: [],
        vestUnitList: [],
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.forumId = this.$route.query.forumId;
      this.isRegister = this.$route.query.isRegister;
      this.viewListForm.forumId = this.forumId;
      this.getLabelList();
      this.getCategoryList();
      this.getVestUnitList();
      if (this.forumId) {
        this.getForumDetailById(this.forumId);
      } else {
        this.$message.error("请传入会议论坛ID!");
      }
      this.getCommentList();
    },
    methods: {
      /*
        按钮操作
       */
      goBackList() {
        this.$router.push({ path: '/mettingForumSignupAduience' });
      },
      resetViewListForm() {
        this.viewListForm.guestName = '';
        this.viewListForm.orgName = '';
        this.viewListForm.current = 1;
      },
      // 嘉宾名单列表
      handleViewListSizeChange(pageSize) {
        this.viewListForm.size = pageSize;
        this.getGuestList();
      },
      handleViewListCurrentChange(currentPage) {
        this.viewListForm.current = currentPage;
        this.getGuestList();
      },
      viewAudienceList() {
        this.viewListDialog = true;
        this.getGuestList();
      },
      // 获取评论列表
      getCommentList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumCommentAudience', { forumId: this.forumId }).then(res => {
          this.comments = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 通过forumId获取论坛详情
      getForumDetailById(forumId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getForum', { forumId: forumId }).then(res => {
          this.mettingForumForm.exhibitionPeriod = res.exhibitionPeriod;
          this.mettingForumForm.forumCategoryId = res.forumCategoryId;
          this.mettingForumForm.forumLabelId = res.forumLabelId;
          if (res.meetingAddress) {
            this.mettingForumForm.area = res.meetingAddress.split('-')[0];
            this.mettingForumForm.room = res.meetingAddress.split('-')[1];
          }
          this.mettingForumForm.ascriptionUnitId = res.ascriptionUnitId;
          this.mettingForumForm.meetingTitle = res.meetingTitle;
          this.mettingForumForm.meetingStartTime = res.meetingStartTime;
          this.mettingForumForm.meetingEndTime = res.meetingEndTime;
          this.mettingForumForm.meetingAddress = res.meetingAddress;
          this.mettingForumForm.numberLimit = res.numberLimit;
          this.mettingForumForm.forumCost = res.forumCost;
          this.mettingForumForm.isOpen = res.isOpen;
          if (res.forumCost == null) {
            this.mettingForumForm.isFree = "1";
          } else {
            this.mettingForumForm.isFree = "0";
          }
          this.mettingForumForm.meetingContent = res.meetingContent;
          this.mettingForumForm.activity = res.activity;
          if (res.infoCsGuestList.length > 0) {
            for (let i = 0, length = res.infoCsGuestList.length; i < length; i++) {
              let params = {
                forumId: res.forumId,
                guestId: res.infoCsGuestList[i].guestId,
                forumRole: res.infoCsGuestList[i].forumRole
              };
              this.mettingForumForm.infoCsForumGuestRelationLkList.push(params);
            }
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取类别列表
      getCategoryList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumTypeSet').then(res => {
          this.categoryList = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取标签列表
      getLabelList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumLabelSet').then(res => {
          this.labelList = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取归属单位列表
      getVestUnitList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listAscriptionUnitSet').then(res => {
          this.vestUnitList = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取嘉宾信息列表
      getGuestList(flag) {
        if (flag === '1') {
          this.viewListForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumGuestRelation', this.viewListForm).then(res => {
          this.viewListDatas = res.records;
          this.viewListTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      openSignUpDialog() {
        this.signUpDialog = true;
      },
      // 报名会议论坛
      signUpForum() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/forumRegister', [this.forumId]).then(res => {
          this.$message.success("报名成功!");
          this.getQrCode();
          this.signUpDialog = false;
          this.signUpSuccessDialog = true;
          this.isRegister = true;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      cancelSignUpForum() {
        // /api/public/cancelForumRegister
        this.showDialogTips("确认取消报名?").then(() => {
          this.$http.post(this.baseApi + '/api/customservice/forum/cancelForumRegister', { forumId: this.forumId }).then(res => {
            this.$message.success("取消报名成功!");
            this.isRegister = false;
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      saveComment() {
        this.$refs["commentForm"].validate((valid) => {
          if (valid) {
            this.commentForm.forumId = this.forumId;
            this.$http.postJson(this.baseApi + '/api/customservice/forum/forumComment', this.commentForm).then(res => {
              this.$message.success("评论成功!");
              this.commentForm.comment = '';
              this.getCommentList();
            }).catch(error => {
              this.$message.error(error);
            });
          }
        });

      },
      // 获取签到二维码
      getQrCode() {
        this.$http.get(this.baseApi + '/api/customservice/forum/getQRCode').then(res => {
          // 获取二维码结果
          this.qrCodeUrl = "data:image/jpeg;base64," + res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 消息提示
      showDialogTips(tipMessage) {
        return this.$confirm(tipMessage, '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        });
      }
    }
  };
</script>

<style scoped>
  .container{
    margin: 10px;
  }
  .top_line{
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }
  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .btn{
    text-align: center;
    height: 40px;
    padding: 0 30px;
  }
  .pagination {
    text-align: right;
    margin: 10px;
  }
  .item{
    margin: 25px 0;
  }
  .itemtitle{
    display: inline-block;
    width: 100px;
    vertical-align: top;
    text-align: right;
  }
  .dialog-footer {
    text-align: center;
    margin-top: 10px;
  }
  .comment_btn{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .comment_img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  .comment {
    display: flex;
    align-items: center;
  }

  .comment_user {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 20px;
    width: 100%;
  }
  .comment_user .reply {
    position: absolute;
    right: 100px;
  }

  .comment_content {
    margin: 5px 0 5px 70px;
  }
  .line{
    height: 1px;
    background-color: #c2c2c2;
    margin: 3px 55px;
  }
</style>
<style>
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__label{
    color: rgba(123, 126, 120, 0.71);
  }
  .el-textarea__inner{
    height: 80px;
  }
</style>
