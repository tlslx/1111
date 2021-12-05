/**
* @file 产品基本信息
* @author:wanglifeng
* @date:2019/1/22
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="产品基本信息" name="first">
      <section class="top">
        <el-row class="item-row">
          <el-col :span="8">
            <span v-for="(category,index) in productCategorys" :key="index" v-if="category.productCategoryId== productBase.productCategoryId">{{category.productCategoryNameCn}}：</span>
            <span v-for="(votelimit,index1) in voteLimits" :key="index1" v-if="votelimit.productCategoryId== productBase.productCategoryId"><span>上限{{votelimit.firstUpLimit}}（可投票{{votelimit.remainVotes}}）</span><span>下限{{votelimit.firstDownLimit}}</span></span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="item-img">
          <el-col :span="12" class="bigimg_con">
            <imageMagnify
              :previewImg="showBigImg()"
              :zoomImg="showBigImg()"
              :hoverHeight="100"
              :bigimgHeight="560"
              :leftDistance="470"
              :smlimgHeight="450"
              alt="图片不见了"
              class="bigimg"></imageMagnify>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="50">
              <el-radio-group v-model="productImgRadio">
                <el-col :span="8" v-for="(img,index) in productImages" :key="index">
                  <el-radio :label="index">
                    <img
                      :src="showSmallImg(img.imagePath)"
                      alt="" class="smallimg">
                    <p style="text-align: center">图 {{index+1}}</p>
                  </el-radio>
                </el-col>
              </el-radio-group>
            </el-row>
            <el-row>
              <span class="productdes">{{imgDescription==null? '没有产品描述信息！' :imgDescription }}</span>
            </el-row>
            <el-row class="item-center">
              <el-button style="padding: 10px 30px;" type="primary" @click="commentProduct()">点评</el-button>
              <el-button style="padding: 10px 30px;" type="warning" @click="vetoProduct()" v-if="reviewState==='1'">投票</el-button>
              <el-button style="padding: 10px 30px;" type="info" @click="sendCancelVeto()" v-else>已投票</el-button>
              <el-button style="padding: 10px 20px;" @click="nextProductVeto()">下一个产品</el-button>
            </el-row>
          </el-col>
        </el-row>

      </section>

      <section class="productInfo">
        <el-row :gutter="50">
          <el-col :span="12">
            <span class="item-label">产品所属类别：</span>
            <span class="item-text" v-for="(category,index) in productCategorys"
                  v-if="category.productCategoryId == productBase.productCategoryId">{{category.productCategoryNameCn}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">产品所属展区：</span>
            <span class="item-text">{{productBase.marketAreaCn}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">产品名称：</span>
            <span class="item-text">{{productBase.productNameCn}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">市场通用名：</span>
            <span class="item-text">{{productBase.genericNameCn}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">产品型号：</span>
            <span class="item-text">{{productBase.productModel}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">产品设计主体：</span>
            <span class="item-text">{{productBase.designSubject}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">上市日期：</span>
            <span class="item-text">{{productBase.marketDate}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">已投放市场区域：</span>
            <span class="item-text">{{productBase.marketAreaCn}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">设计/研发成本（美元）：</span>
            <span class="item-text">{{productBase.designFee}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">产品外观设计专利号：</span>
            <span class="item-text">{{productBase.designPatent}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">国际市场出口价（美元）：</span>
            <span class="item-text">{{productBase.exportFee}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">产品发明专利号：</span>
            <span class="item-text">{{productBase.inventionPatent}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">产品使用新型专利号：</span>
            <span class="item-text">{{productBase.utilitionPatent}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">产品获奖奖项：</span>
            <span class="item-text">{{productBase.designAwards}}</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">其他设计奖：</span>
            <span class="item-text">{{productBase.designAwardCn}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">产品尺寸（厘米）：</span>
            <span class="item-text">{{productStandard.standardLong}}(长)x{{productStandard.standardWidth}}(宽)x{{productStandard.standardHight}}(高)</span>
          </el-col>

          <el-col :span="12">
            <span class="item-label">产品重量（千克）：</span>
            <span class="item-text">{{productStandard.standardWeight}}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-label">材质：</span>
            <span class="item-text">{{productStandard.materialCn}}</span>
          </el-col>

            <el-col :span="12">
              <span class="item-label">视频资料：</span>
              <a target="_Blank"  v-for="(attachment,index) in productAttachments"  v-if="attachment.noteType === '04'" class="item-text" :href="productAttachments[index].filePath">{{productAttachments[index].filePath}}</a>
            </el-col>
            <el-col :span="12">
              <span class="item-label">产品材料：</span>
              <a target="_Blank"  style="display: block;margin-left: 200px" v-for="(attachment,index) in productAttachments" v-if="attachment.noteType === '03'"  class="item-text" :href="showFilePath(productAttachments[index].filePath)">{{productAttachments[index].fileName}}</a>
            </el-col>

        </el-row>
        <el-row class="item-center">
          <el-button @click="toVoteList()">返回</el-button>
        </el-row>

      </section>

      <!--点评留言弹窗-->
      <el-dialog title="点评留言" :visible.sync="commentDialog"  :close-on-click-modal="false" class="formProduct">
        <el-form :model="commentForm" :rules="rules">
          <el-form-item prop="auditContent" label-width="0">
            <el-input v-model="commentForm.auditContent" type="textarea" maxlength="100"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="sendCommentRequest()">确 定</el-button>
          <el-button type="primary" @click="resetComment()">重 置</el-button>
          <el-button @click="commentDialog = false">取 消</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import http from "@/scripts/framework/http";
  import imageMagnify from "@/components/project/common/imageMagnify";

  export default {
    name: "productBasicInformation",
    components: {
      imageMagnify
    },
    data() {
      return {
        votedFlag: false,
        activeName: 'first',
        productImgRadio: 0,
        commentDialog: false,
        voteLimits: [],
        activityCodes: [],  // 活动列表对应的活动编号
        productCategorys: [],  // 产品种类列表
        awardProductId: '',
        reviewId: '',
        reviewState: '',
        productImages: [],
        designers: [],
        company: {},
        productBase: {},
        productStandard: {},
        productAttachments: [],
        bigImgUrl: '',
        commentForm: {
          auditContent: ''
        },
        imgDescription: '',
        baseApi: process.env.API_CF_URL,
        rules: {
          auditContent: [
            { required: true, message: '点评内容需要在100个字符以内', trigger: 'blur' },
            { min: 0, max: 100, message: '点评内容需要在100个字符以内', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      this.reviewId = this.$route.query.reviewId;
      this.awardProductId = this.$route.query.awardProductId;
      this.reviewState = this.$route.query.reviewState;
      if (this.reviewState === '1') {
        this.votedFlag = false;
      } else {
        this.votedFlag = true;
      }
      this.getActivityList();
      this.getProductDetailInfo();
    },
    methods: {
      toVoteList() {
        this.$router.go(-1);
      },
      showSmallImg(imagePath) {
        return this.baseApi + "/api/customservice/cf/viewImage/" + imagePath;
      },
      showBigImg() {
        // imgDescription
        if (this.productImages[this.productImgRadio] != null) {
          this.imgDescription = this.productImages[this.productImgRadio].descriptionCn;
          return this.baseApi + "/api/customservice/cf/viewImage/" + this.productImages[this.productImgRadio].imagePath;
        } else {
          this.imgDescription = "本照片没有描述信息";
          return this.baseApi + "/api/customservice/cf/viewImage/";
        }
      },
      showFilePath(filePath) {
        return this.baseApi + '/api/customservice/cf/viewImage/' + filePath;
      },
      // 获取各类别投票上下限
      getCategoryVoteLimit(activityCode) {
        http.get(this.baseApi + '/api/customservice/cf/getFirstVoteLimit', {
          activityCode: activityCode
        }).then(res => {
          this.voteLimits = res;
        }).catch(err => {
        });
      },
      // 获取活动列表
      getActivityList() {
        http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          //http.get(this.baseApi + '/api/customservice/cf/listCfActivity').then(res => {
          this.activityCodes = res.records;
          this.getCategoryVoteLimit(this.activityCodes[0].activityCode);
          this.getProductCategoryInfo(this.activityCodes[0].activityCode);
        }).catch(error => {
        });
      },
      // 获取所有的产品分类信息
      getProductCategoryInfo(activityCode) {
        http.get(this.baseApi + '/api/customservice/cf/listProductCategory', {
          activityCode: activityCode
        }).then(res => {
          this.productCategorys = res.records;
        }).catch(error => {

        });
      },
      // 获取产品资料详情
      getProductDetailInfo() {
        http.get(this.baseApi + '/api/customservice/cf/getCfProduct', {
          awardProductId: this.awardProductId
        }).then(res => {
          if (typeof res.productBase === 'undefined') {
            this.productBase = {};
          } else {
            this.productBase = res.productBase;
          }

          if (typeof res.designers === 'undefined') {
            this.designers = [];
          } else {
            this.designers = res.designers;
          }

          if (typeof res.productImages === 'undefined') {
            this.productImages = [];
          } else {
            this.productImages = res.productImages;
          }

          if (typeof res.productAttachments === 'undefined') {
            this.productAttachments = [];
          } else {
            this.productAttachments = res.productAttachments;
          }

          if (typeof res.company === 'undefined') {
            this.company = {};
          } else {
            this.company = res.company;
          }

          if (typeof res.productStandard === 'undefined' || res.productStandard == null) {
            this.productStandard = {};
          } else {
            this.productStandard = res.productStandard;
          }
        }).catch(error => {
        });
      },
      // 投票操作
      vetoProduct() {
        http.post(this.baseApi + '/api/customservice/cf/firstReviewVote', { awardProductId: this.awardProductId }).then(res => {
          this.$message({
            message: '投票成功',
            type: 'success'
          });
          this.reviewId = res;
          this.reviewState = '2';
          this.votedFlag = true;
        }).catch(error => {
        });
      },
      // 点评操作
      commentProduct() {
        this.commentForm.auditContent = '';
        this.commentDialog = true;
      },
      // 发送点评信息,专家评价接口
      sendCommentRequest() {
        http.postJson(this.baseApi + '/api/customservice/cf/commentFirstProduct', {
          awardProductId: this.awardProductId,
          comment: this.commentForm.auditContent
        }).then(res => {
          this.$message.success("点评成功");
          this.commentDialog = false;
        }).catch(error => {

        });
      },
      // 撤销投票
      sendCancelVeto() {
        this.showDialogTips("确认撤销投票吗?").then(() => {
          http.post(this.baseApi + '/api/customservice/cf/firstReviewVoteCancel', { reviewIds: this.reviewId }).then(res => {
            this.$message.success("撤销投票成功");
            this.reviewState = "1";
            this.votedFlag = false;
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => { });
      },
      // 下一个产品
      nextProductVeto() {
        http.post(this.baseApi + '/api/customservice/cf/nextFirstReviewVote', { productCategoryId: this.productBase.productCategoryId, awardProductId: this.productBase.awardProductId, votedFlag: this.votedFlag }).then(res => {
          this.$message.success("获取下一个产品成功");
          if (typeof res.productBase === 'undefined' || res.productBase == null) {
            this.productBase = {};
          } else {
            this.productBase = res.productBase;
          }

          if (typeof res.designers === 'undefined') {
            this.designers = [];
          } else {
            this.designers = res.designers;
          }

          if (typeof res.productImages === 'undefined') {
            this.productImages = [];
          } else {
            this.productImages = res.productImages;
          }

          if (typeof res.productAttachments === 'undefined') {
            this.productAttachments = [];
          } else {
            this.productAttachments = res.productAttachments;
          }

          if (typeof res.company === 'undefined') {
            this.company = {};
          } else {
            this.company = res.company;
          }

          if (typeof res.productStandard === 'undefined' || res.productStandard == null) {
            this.productStandard = {};
          } else {
            this.productStandard = res.productStandard;
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 重置点评表单
      resetComment() {
        this.commentForm.auditContent = "";
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
  .item-img {
    padding: 10px;
    overflow: hidden;
  }

  img {
    width: 100%;
  }

  .item-label {
    display: inline-block;
    width: 200px;
    text-align: right;
    line-height: 40px;
    color: #8a8a8a;
  }

  .item-text {
    display: inline-block;
    /*width: 200px;*/
    text-align: left;
    line-height: 40px;
  }

  .item-center {
    text-align: center;
  }


  .dialog-footer {
    text-align: center;
    margin: 15px 0;
    padding-bottom: 10px;
  }
  .smallimg {
    height: 150px;
    width: 150px;
    border: 1px solid #afafaf;
  }
  .bigimg_con{
    overflow: visible;
  }
  .bigimg {
    height: 450px;
    width: 450px;
  }
  .productdes {
    display: block;
    min-height: 160px;
    min-width: 460px;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: rgba(155, 155, 155, 0.33);
  }
  /*.productInfo{*/
    /*position: absolute;*/
    /*margin-top: 700px;*/
  /*}*/

</style>
