/**
* @file 广交会-会议论坛详情
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
      <el-button type="primary" class="btn" @click="toEditForum()">编辑</el-button>
      <el-button class="btn" @click="goBackList()">返回</el-button>
    </el-row>

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
    name: 'mettingForumDetail',
    data() {
      return {
        source: {
          language: []
        },
        forumId: '',
        viewListDialog: false,

        viewListDatas: [],
        viewListTotal: 0,

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
          forumCost: "",
          isOpen: 0,
          meetingContent: '',
          infoCsForumGuestRelationLkList: [
            {
              forumId: '',
              guestId: '',
              forumRole: ''
            }
          ]
        },
        enterRouter: '',
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
      this.viewListForm.forumId = this.forumId;
      this.enterRouter = this.$route.query.enterRouter;
      this.getLabelList();
      this.getCategoryList();
      this.getVestUnitList();
      if (this.forumId) {
        this.getForumDetailById(this.forumId);
      } else {
        this.$message.error("请传入会议论坛ID!");
      }
    },
    methods: {
      /*
        按钮操作
       */
      toEditForum() {
        this.$router.push({ path: '/addMettingForum', query: { forumId: this.forumId }});
      },
      goBackList() {
        this.$router.push({ path: this.enterRouter });
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
  .dialog-footer {
    text-align: center;
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
</style>
<style>
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__label{
    color: rgba(123, 126, 120, 0.71);
  }
</style>
