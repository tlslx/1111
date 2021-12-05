/**
* @file 广交会-会议论坛留言详情
* @author:zhangwenjian
* @date: 2019/2/26
*/
<template>
  <div class="contanier">
    <p style="border-bottom: 1px solid #a2a2a2"><span class="title">{{title}}</span></p>
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否开放:">
            <span>{{mettingForumForm.isOpen === 1 ? "开放" : "不开放" }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="text-align: center">
      <el-button class="btn" @click="goBackList()">返回</el-button>
    </el-row>
    <template>
      <el-tabs style="margin-left: 60px" v-model="activeTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="会前会后留言" name="first">
          <div v-for="(beforecomment,index) in beforeComments" :key="index">
            <section class="comment">
              <img class="comment_img" src="" alt="">
              <div class="comment_user">
                <span>{{beforecomment.creatorName}}</span>
                <span style="margin-left: 10px">{{beforecomment.createDate}}</span>
                <span style="margin-left: 10px;color: red">{{beforecomment.status === '2' ? '*此评论审核不通过' : '' }}</span>
                <span style="margin-left: 10px;color: blue">{{beforecomment.status === '1' ? '*此评论审核通过' : '' }}</span>
                <el-button v-if="isView === '1'" class="reply" @click="replyBtnClick(index)">回复</el-button>
              </div>
            </section>
            <div class="comment_content">
              <span>{{beforecomment.comment}}</span>
            </div>
            <div v-if="beforecomment.replyContent && index !== currentReplyIndex" style="margin-left: 10px;background-color: rgba(226,226,226,0.95);padding: 5px;border-radius: 5px">
              <div  v-if="index !== currentReplyIndex">
                <section class="comment">
                  <img class="comment_img" src="" alt="">
                  <div class="comment_user">
                    <span>{{beforecomment.modifierName}}</span>
                    <span style="margin-left: 10px">{{beforecomment.modifyDate}}</span>
                  </div>
                </section>
                <div class="comment_content">
                  <span>{{beforecomment.replyContent}}</span>
                </div>
              </div>
            </div>
            <div class="comment_btn" v-if="isView === '1'">
              <el-button type="primary" v-if="beforecomment.status === '1'" :disabled="true" @click="handlePassVerify(index)">通过</el-button>
              <el-button type="primary" v-else @click="handlePassVerify(index)" >通过</el-button>
              <el-button type="primary" v-if="beforecomment.status === '2'" :disabled="true" @click="handleNoPassVerify(index)">不通过</el-button>
              <el-button type="primary" v-else @click="handleNoPassVerify(index)">不通过</el-button>
            </div>
            <div class="comment_input" v-if="index === currentReplyIndex">
              <el-form :model="commentForm" :rules="rules" ref="commentForm">
                <el-form-item label-width="0" prop="replyContent" style="display: flex;justify-content: flex-start">
                  <el-input type="text" maxlength="200" placeholder="请输入评论" v-model="commentForm.replyContent" style="width: 800px"></el-input>
                  <el-button type="warning" @click="sendReplyCommentRequest(index)">确认</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <el-pagination
            background
            class="pagination"
            @size-change="handleBeforeCommentSizeChange"
            @current-change="handleBeforeCommentCurrentChange"
            :current-page.sync="commentSearchForm.current"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="commentSearchForm.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="beforeCommentTotal"
            prev-text="上一页"
            next-text="下一页">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="会中留言" name="second">
          <div  v-for="(aftercomment,index) in afterComments">
            <section class="comment">
              <img class="comment_img" src="" alt="">
              <div class="comment_user">
                <span>{{aftercomment.creatorName}}</span>
                <span style="margin-left: 10px">{{aftercomment.createDate}}</span>
              </div>
            </section>
            <div class="comment_content">
              <span>{{aftercomment.comment}}</span>
            </div>
          </div>
          <el-pagination
            background
            class="pagination"
            @size-change="handleAfterCommentSizeChange"
            @current-change="handleAfterCommentCurrentChange"
            :current-page.sync="commentAfterForm.current"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="commentAfterForm.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="afterCommentTotal"
            prev-text="上一页"
            next-text="下一页">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </template>

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
          prop="guestPhone"
          label="手机"
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
  </div>
</template>

<script>
  export default {
    name: "mettingForumMsgDetail",
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
        activeTab: 'first',
        auditFlag: '',
        isView: '0',
        title: '会议论坛留言详情',

        viewListDialog: false,

        viewListDatas: [],
        viewListTotal: 0,

        beforeComments: [],
        afterComments: [],
        categoryList: [],
        labelList: [],
        vestUnitList: [],

        beforeCommentTotal: 0,
        afterCommentTotal: 0,
        currentReplyIndex: '',

        commentForm: {
          forumId: '',
          forumCommentId: '',
          replayMainId: '',
          replyContent: ''
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
          isOpen: 0,
          isFree: '0',
          forumCost: "",
          meetingContent: ''
        },
        viewListForm: {
          forumId: '',
          guestName: '',
          orgName: '',
          current: 1,
          size: 10
        },
        commentSearchForm: {
          stages: [0, 2],
          forumId: '',
          size: 10,
          current: 1
        },
        commentAfterForm: {
          forumId: '',
          size: 10,
          current: 1
        },
        rules: {
          replyContent: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.forumId = this.$route.query.forumId;
      this.isView = this.$route.query.isView;
      if (this.isView === '1') {
        this.title = '会议论坛留言审核';
      } else {
        this.title = '会议论坛留言详情';
      }
      this.commentForm.forumId = this.forumId;
      this.viewListForm.forumId = this.forumId;
      this.getCategoryList();
      this.getLabelList();
      this.getVestUnitList();
      if (this.forumId) {
        this.getForumDetailById(this.forumId);
      } else {
        this.$message.error("请传入会议论坛ID!");
      }
      this.getBeforeCommentList();
    },
    methods: {
      goBackList() {
        this.$router.push({ path: '/mettingForumMsgList' });
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
          this.mettingForumForm.meetingContent = res.meetingContent;
          this.mettingForumForm.isOpen = res.isOpen;
          if (res.forumCost == null) {
            this.mettingForumForm.isFree = "1";
          } else {
            this.mettingForumForm.isFree = "0";
          }
          this.mettingForumForm.activity = res.activity;
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
      replyBtnClick(index) {
        this.currentReplyIndex = index;
        this.commentForm.replyContent = this.beforeComments[index].replyContent;
      },
      resetViewListForm() {
        this.viewListForm.guestName = '';
        this.viewListForm.orgName = '';
        this.viewListForm.current = 1;
      },
      getBeforeCommentList() {
        this.commentSearchForm.forumId = this.forumId;
        let params = "?stages=0,2&forumId=" + this.forumId + "&current=" + this.commentSearchForm.current + "&size=" + this.commentSearchForm.size;
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumCommentAll' + params).then(res => {
          this.beforeComments = res.records;
          this.beforeCommentTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getAfterCommentList() {
        this.commentAfterForm.forumId = this.forumId;
        let params = "?stages=1&forumId=" + this.forumId + "&current=" + this.commentAfterForm.current + "&size=" + this.commentAfterForm.size;
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumCommentAll' + params).then(res => {
          this.afterComments = res.records;
          this.afterCommentTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      viewAudienceList() {
        this.viewListDialog = true;
        this.getGuestList();
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
      // 嘉宾名单列表
      handleViewListSizeChange(pageSize) {
        this.viewListForm.size = pageSize;
        this.getGuestList();
      },
      handleViewListCurrentChange(currentPage) {
        this.viewListForm.current = currentPage;
        this.getGuestList();
      },
      // 发送评论请求 -- 暂时不用
      sendCommentRequest() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/forumComment', this.commentForm).then(res => {
          this.$message.success("评论成功");
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 发送回复请求
      sendReplyCommentRequest(index) {
        this.$refs.commentForm[0].validate((valid) => {
          if (valid) {
            this.commentForm.forumCommentId = this.beforeComments[index].forumCommentId;
            this.commentForm.replayMainId = this.beforeComments[index].replayMainId;
            this.commentForm.forumId = this.forumId;
            //  ?forumCommentId=' + this.beforeComments[index].forumCommentId
            this.$http.postJson(this.baseApi + '/api/customservice/forum/forumComment', this.commentForm).then(res => {
              this.$message.success("回复成功");
              this.getBeforeCommentList();
              this.currentReplyIndex = '';
            }).catch(error => {
              this.$message.error(error);
            });
          } else {
            this.$message.error("存在必填项位空");
          }
        });
      },
      // auditFlag  0 待审核  1 通过 2 不通过
      handlePassVerify(index) {
        this.auditFlag = '1';
        this.sendCommentVerifyRequest(this.beforeComments[index].forumCommentId);
      },
      handleNoPassVerify(index) {
        this.auditFlag = '2';
        this.sendCommentVerifyRequest(this.beforeComments[index].forumCommentId);
      },
      // 评论审核结果发送
      sendCommentVerifyRequest(forumCommentId) {
        this.$http.post(this.baseApi + '/api/customservice/forum/auditForumComment', {
          forumCommentId: forumCommentId,
          auditFlag: this.auditFlag
        }).then(res => {
          this.$message.success("审核成功");
          this.getBeforeCommentList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 分页处理函数
      handleBeforeCommentSizeChange(pageSize) {
        this.commentSearchForm.size = pageSize;
        this.getBeforeCommentList();
      },
      handleBeforeCommentCurrentChange(currentPage) {
        this.commentSearchForm.current = currentPage;
        this.getBeforeCommentList();
      },
      handleAfterCommentSizeChange(pageSize) {
        this.commentAfterForm.size = pageSize;
        this.getAfterCommentList();
      },
      handleAfterCommentCurrentChange(currentPage) {
        this.commentAfterForm.current = currentPage;
        this.getAfterCommentList();
      },
      handleClick(tab) {
        if (tab.index === '1') {
          this.getAfterCommentList();
        }
      }
    }
  };
</script>

<style scoped>
  .title {
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    border-bottom: 2px solid #8a8a8a;
  }

  .btn {
    text-align: center;
    height: 40px;
    padding: 0 30px;
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

  .comment_img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #8b8b8b;
  }

  .comment {
    display: flex;
    align-items: center;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .comment_user {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 100%;
  }
  .comment_user .reply {
    position: absolute;
    right: 100px;
  }

  .comment_content {
    margin: 10px 0 10px 50px;
  }
  .comment_btn{
    margin: 5px 0 5px 50px;
  }

  .comment_input{
    display: flex;
    align-items: center;
    margin: 5px 100px 5px 50px;
  }
  .pagination {
    text-align: right;
    margin: 10px;
  }
  .dialog-footer {
    text-align: center;
  }
</style>
