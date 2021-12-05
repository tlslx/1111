/**
* @file 企业-产品-设计师基本资料展示
* @author:wanglifeng
* @date:2019/1/22
*/
<template>
  <div>
    <el-form :inline="true" label-position="right" label-width="230px" class="demo-ruleForm">
      <el-tabs v-model="activeName" @tab-click="handleTabChangeClick" class="tabs">
        <!-- 企业信息 -->
        <el-tab-pane label="企业信息" name="first">
            <section>
              <div class="line"><span class="title-left">企业基本信息</span></div>
              <el-form-item label="企业名称（中文）:" class="item" size="small">
                <span>{{companyDetail.companyNameCn}}</span>
              </el-form-item>
              <el-form-item label="企业名称（英文）:" class="item" size="small">
                <span>{{companyDetail.companyNameEn}}</span>
              </el-form-item>
              <el-form-item label="所属区域:" class="item" size="small">
                <span v-for="(area,index) in areaProvince" v-if="area.dataDictItemId == companyDetail.provinceCode" :key="index">{{area.itemText}}</span>
                <span v-for="(city,index1) in areaCitys" v-if="city.dataDictItemId == companyDetail.cityCode" :key="index1">{{city.itemText}}</span>
              </el-form-item>
              <el-form-item label="企业类型:" class="item" size="small">
                <span v-for="(categoryCompany,index) in companyCategorys" v-if="categoryCompany.itemCode === companyDetail.typeId">{{categoryCompany.itemText}}</span>
              </el-form-item>
              <el-form-item label="所属交易团:" class="item" size="small">
                <span v-for="(trade,index) in tradingGroups" :key="index" v-if="companyDetail.tradingGroup === trade.dataDictItemId">{{trade.itemText}}</span>
              </el-form-item>
              <el-form-item label="企业内部研发团队人数:" class="item" size="small">
                <span>{{companyDetail.researchNumber}}</span>
              </el-form-item>
              <div v-for="(contact, index) in companyDetail.contactList.slice(0,2)" :key="index">
                <el-form-item :label="index === 0? '联系人1（中文）:':'联系人2（中文）:'" class="item" size="small">
                  <span>{{contact.contactNameCn}}</span>
                </el-form-item>
                <el-form-item :label="index === 0? '联系人1（英文）:':'联系人2（英文）:'" class="item" size="small">
                  <span>{{contact.contactNameEn}}</span>
                </el-form-item>
                <el-form-item label="性别:" class="item" size="small">
                  <span v-if="contact.gender == '0'">男</span>
                  <span v-else>女</span>
                </el-form-item>
                <el-form-item class="item" label="邮箱:" size="small">
                  <span>{{contact.email}}</span>
                </el-form-item>
                <el-form-item label="联系电话:" class="item" size="small">
                  <span>{{contact.telephone}}</span>
                </el-form-item>
                <el-form-item label="手机:" class="item" size="small">
                  <span>{{contact.mobile}}</span>
                </el-form-item>
                <el-form-item label="联系地址:" class="item2" size="small">
                  <span>{{contact.address}}</span>
                </el-form-item>
              </div>
            </section>

            <section>
              <div class="line"><span class="title-left">获奖信息</span></div>
              <el-form-item label="IF奖（个）:" class="item" size="small">
                <span>{{companyDetail.award.ifAward}}</span>
              </el-form-item>
              <el-form-item label="红点奖（个）:" class="item" size="small">
                <span>{{companyDetail.award.reddoAward}}</span>
              </el-form-item>
              <el-form-item label="G-MARK奖（个）:" class="item" size="small">
                <span>{{companyDetail.award.gmarkAward}}</span>
              </el-form-item>
              <el-form-item label="IDEA奖（个）:" class="item" size="small">
                <span>{{companyDetail.award.ideaAward}}</span>
              </el-form-item>
              <el-form-item label="中国创新设计红星奖（个）:" class="item" size="small">
                <span>{{companyDetail.award.redstarAward}}</span>
              </el-form-item>
              <el-row>
                <el-form-item label="其他国际设计奖（中文）:" class="item" size="small">
                  <span>{{companyDetail.award.otherAwardCn}}</span>
                </el-form-item>
                <el-form-item label="其他国际设计奖（英文）:" class="item" size="small">
                  <span>{{companyDetail.award.otherAwardEn}}</span>
                </el-form-item>
              </el-row>
            </section>

            <section>
              <div class="line"><span class="title-left">其他信息</span></div>
              <el-form-item label="所拥有的品牌（中文）:" class="item" size="small">
                <span>{{companyDetail.brandCn}}</span>
              </el-form-item>

              <el-form-item label="所拥有的品牌（英文）:" class="item" size="small">
                <span>{{companyDetail.brandEn}}</span>
              </el-form-item>

              <el-form-item label="外观设计专业数量（个）:" class="item" size="small">
                <span>{{companyDetail.designPatentNumber}}</span>
              </el-form-item>
              <el-form-item label="实用新型专利数量（个）:" class="item" size="small">
                <span>{{companyDetail.utilitionPatentNumber}}</span>
              </el-form-item>

              <el-form-item label="发明专利数量（个）:" class="item" size="small">
                <span>{{companyDetail.inventionPatentNumber}}</span>
              </el-form-item>
            </section>

          <el-form-item class="el-form-item-btn">
            <el-button class="btn2" @click="goBack()">返回</el-button>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="产品基本资料" name="second">
          <el-form-item class="item" label="产品所属类别：" prop="region" size="small">
            <span v-for="(category,index) in productCategorys" v-if="category.productCategoryId === productBase.productCategoryId" :key="index">{{category.productCategoryNameCn}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品型号：" prop="name" size="small">
            <span>{{productBase.productModel}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品名称（中文）：" prop="name" size="small">
            <span>{{productBase.productNameCn}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品名称（英文）：" prop="name" size="small">
            <span>{{productBase.productNameEn}}</span>
          </el-form-item>

          <el-form-item class="item" label="市场通用名（中文）：" prop="name" size="small">
            <span>{{productBase.genericNameCn}}</span>
          </el-form-item>

          <el-form-item class="item" label="市场通用名（英文）：" prop="name" size="small">
            <span>{{productBase.genericNameEn}}</span>
          </el-form-item>

          <el-form-item class="item" label="上市日期：" prop="name" size="small">
            <span>{{productBase.marketDate}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品设计主体：" prop="" size="small">
            <span v-if="productBase.designSubject === '0'">内部研发团队</span>
            <span v-else-if="productBase.designSubject === '1'">外部设计机构</span>
            <span v-else>前二者结合</span>
          </el-form-item>

          <el-form-item class="item" label="设计费/研发成本（美元）：" prop="name" size="small">
            <span>{{productBase.designFee}}</span>
          </el-form-item>

          <el-form-item class="item" label="已投放市场区域（中文）" prop="name" size="small">
            <span>{{productBase.marketAreaCn}}</span>
          </el-form-item>

          <el-form-item class="item" label="国际市场出口价（美元）：" prop="name" size="small">
            <span>{{productBase.exportFee}}</span>
          </el-form-item>

          <el-form-item class="item" label="已投放市场区域（英文）：" prop="name" size="small">
            <span>{{productBase.marketAreaEn}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品实用新型专利号：" size="small">
            <span>{{productBase.utilitionPatent}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品外观设计专利号：" size="small">
            <span>{{productBase.designPatent}}</span>
          </el-form-item>

          <el-form-item class="item" label="产品发明专利号：" size="small">
            <span>{{productBase.inventionPatent}}</span>
          </el-form-item>

          <el-form-item label="产品获奖奖项：" size="small">
            <span v-for="(award,index) in productBase.designAwards.split('')">
              <span v-if="award === '1'">IF奖</span>
              <span v-if="award === '2'">红点奖</span>
              <span v-if="award === '3'">GMARK奖</span>
              <span v-if="award === '4'">IDEA奖</span>
              <span v-if="award === '5'">Gooddesign奖</span>
              <span v-if="award === '6'">红星奖</span>
            </span>
          </el-form-item>

          <el-form-item class="item" label="其他国际设计奖（中文）：" size="small">
            <span>{{productBase.designAwardCn}}</span>
          </el-form-item>

          <el-form-item class="item" label="其他国际设计奖（英文）：" size="small">
            <span>{{productBase.designAwardEn}}</span>
          </el-form-item>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn2" @click="goBack()">返回</el-button>
          </el-form-item>

        </el-tab-pane>

        <el-tab-pane label="产品形象图" name="third">
          <el-row>
            <el-form-item label="产品形象图片：" size="small">
              <el-col :span="8" v-for="(imgInfo,index) in productImages" :key="index">
                <!--<img -->
                <!--:src="showImagePath(imgInfo.imagePath)" alt="" class="imgproduct">-->
                <imageMagnify
                  :previewImg="showImagePath(imgInfo.imagePath)"
                  :zoomImg="showImagePath(imgInfo.imagePath)"
                  :hoverHeight="20"
                  :bigimgHeight="520"
                  :leftDistance="140"
                  alt="图片不见了"
                  class="imgproduct"></imageMagnify>
              </el-col>
              <!--<el-col :span="8"><img :src="" alt=""></el-col>-->
              <!--<el-col :span="8"><img :src="" alt=""></el-col>-->
            </el-form-item>
          </el-row>

         <div v-for="(imgInfo,index) in productImages" :key="index">
           <el-row>
             <el-form-item class="item-block" label="图片1说明（中文）：" size="small">
              <span class="tip">
                {{imgInfo.descriptionCn}}
              </span>
             </el-form-item>
           </el-row>
           <el-row>
             <el-form-item class="item-block" label="图片1说明（英文）：" size="small">
              <span class="tip">
                {{imgInfo.descriptionEn}}
              </span>
             </el-form-item>
           </el-row>
         </div>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn2" @click="goBack()">返回</el-button>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="产品技术规格" name="fourth">
          <el-row>
            <el-form-item class="item-block" label="产品尺寸（厘米）：" size="small">
              <span>{{productStandard.standardLong}}</span>(长)
              <span>{{productStandard.standardWidth}}</span>(宽)
              <span>{{productStandard.standardHight}}</span>(高)
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="item-block" label="产品重量（千克）：" size="small">
              <span>{{productStandard.standardWeight}}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="item-block" label="材质（中文）：" size="small">
              <span>{{productStandard.materialCn}}</span>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="item-block" label="材质（英文）：" size="small">
              <span>{{productStandard.materialEn}}</span>
            </el-form-item>
          </el-row>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn2" @click="goBack()">返回</el-button>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="设计师信息" name="five">
          <div v-for="(designer,index) in designers">
            <el-row>
              <el-form-item class="item" label="设计师名称（中文）：" prop="name" size="small">
                <span>{{designer.designerNameCn}}</span>
              </el-form-item>

              <el-form-item class="item" label="设计师名称（英文）：" prop="name" size="small">
                <span>{{designer.designerNameEn}}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="item" label="职务（中文）：" prop="name" size="small">
                <span>{{designer.positionCn}}</span>
              </el-form-item>
              <el-form-item class="item" label="职务（英文）：" prop="name" size="small">
                <span>{{designer.positionEn}}</span>
              </el-form-item>
            </el-row>
          </div>

          <el-row>
            <el-form-item class="el-form-item-btn">
              <el-button class="btn2" @click="goBack()">返回</el-button>
            </el-form-item>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="产品佐证材料" name="six">
          <el-row>
            <el-form-item class="item" label="产品材料：" prop="name" size="small">
              <a style="display: block;width: 600px;overflow: hidden;margin-left: 230px;" target="_Blank"  v-for="(attachment,index) in productAttachments"  v-if="attachment.noteType === '03'" class="item-text" :href="showFilePath(productAttachments[index].filePath)">{{productAttachments[index].fileName}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="视频资料：" prop="name" size="small">
              <a target="_Blank" v-for="(attachment,index) in productAttachments"  v-if="attachment.noteType === '04'" class="item-text" :href="productAttachments[index].filePath">{{productAttachments[index].filePath}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class="el-form-item-btn">
              <el-button class="btn2" @click="goBack()">返回</el-button>
            </el-form-item>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="reviewbtn-group" v-if="showTopBtn">
      <el-button  type="primary" class="reviewbtn"  :disabled="showPassBtn" @click="handleReviewPass()">审核通过</el-button>
      <el-button  type="primary" class="reviewbtn" :disabled="showPassBtn" @click="handleReviewNoPass()">审核不通过</el-button>
    </div>

    <!--驳回原因弹窗-->
    <el-dialog title="驳回原因" :visible.sync="showReviewDialog" class="formProduct" :close-on-click-modal="false" :append-to-body="true">
      <el-form :model="reviewForm" :rules="rules">
        <el-form-item label-width="0" prop="auditContent">
          <el-input v-model.trim="reviewForm.auditContent" type="textarea" maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="sendReviewStatusRequest()">确 定</el-button>
        <el-button @click="showReviewDialog = false">取 消</el-button>
        <el-button @click="resetComment()">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import http from "@/scripts/framework/http";
  import imageMagnify from "@/components/project/common/imageMagnify";

  export default {
    name: "productInfomationDetail",
    components: {
      imageMagnify
    },
    data() {
      return {
        showPassBtn: false,
        showReviewDialog: false,
        enterRouterPath: '',
        productStatus: '',
        productCategorys: [],
        companyCategorys: [],
        tradingGroups: [],
        areaProvince: [],
        areaCitys: [],
        designers: [],
        company: {},
        companyDetail: {
          award: {},
          contactList: []
        },
        productBase: {},
        productStandard: {},
        productAttachments: [],
        productImages: [],
        activeName: 'first',
        dialogImageUrl: '',
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        internationalaOption: [
          {
            name: '交易团1',
            id: '01'
          },
          {
            name: '交易团2',
            id: '02'
          },
          {
            name: '交易团3',
            id: '03'
          }
        ],
        reviewForm: {
          auditStatus: '1',
          nodeId: '',
          auditContent: ''
        },
        rules: {
          auditContent: [
            { required: true, message: '驳回原因需要在100个字符以内', trigger: 'blur' },
            { min: 0, max: 100, message: '驳回原因需要在100个字符以内', trigger: 'blur' }
          ]
        },
        awardProductId: '',
        cfCompanyId: '',
        showTopBtn: false,
        // baseApi: 'http://192.168.1.107:9014',
        baseApi: process.env.API_CF_URL,
        baseApi2: process.env.API_DICT_URL
      };
    },
    mounted() {
      this.cfCompanyId = this.$route.query.cfCompanyId;
      this.awardProductId = this.$route.query.awardProductId;
      this.productStatus = this.$route.query.productStatus;
      this.showTopBtn = this.$route.query.showBtn;
      if (this.productStatus === '02') {
        this.showPassBtn = false;
      } else {
        this.showPassBtn = true;
      }
      this.getCompanyCategory();
      this.getProductCategory();
      this.getCompanyArea();
      this.getCompanyDetailInfo(this.cfCompanyId);
      this.getProductDetailInfo();
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      showImagePath(imagepath) {
        return this.baseApi + '/api/customservice/cf/viewImage/' + imagepath;
      },
      showFilePath(filePath) {
        return this.baseApi + '/api/customservice/cf/viewImage/' + filePath;
      },
      /*
       * 数据获取
       */
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
      // 企业资料查询
      getCompanyDetailInfo(cfCompanyId) {
        http.get(this.baseApi + '/api/customservice/cf/getCfCompanyInfo', {
          cfCompanyId: cfCompanyId
        }).then(res => {
          this.companyDetail = res;
          // for (let item in res) {
          //   this.companyDetail[item] = res[item];
          // }
        }).catch(error => {
        });
      },
      // 获取地区信息
      getCompanyArea() {
        http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=province').then(data => {
          this.areaProvince = data.records;
          setTimeout(() => {
            this.provinceChange();
          }, 1000);
        }).catch(error => {
          this.$message.error("地区字典获取错误");
        });
      },
      // 获取所有产品类别
      getProductCategory() {
        http.get(this.baseApi + '/api/customservice/cf/getRecommend').then(data => {
          this.productCategorys = data;
        }).catch(err => {
        });
      },
      // 获取所属交易团
      getTradeGroup() {
        this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=tradingGroup').then(data => {
          this.internationalaOption = data.records;
        }).catch(err => {
        });
      },
      // 获取企业类别
      getCompanyCategory() {
        http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=companyAttribute').then(data => {
          this.companyCategorys = data.records;
        }).catch(err => {
          this.$message.error("企业类别获取错误");
        });
      },
      provinceChange() {
        http.get(this.baseApi2 + '/api/sysDataDictItem/getChildDicItemList?dataDictItemId=' + this.companyDetail.provinceCode).then(data => {
          this.areaCitys = data.records;
        }).catch(error => {
        });
      },
      // 提交资质审核信息
      putProductReviewStatus(params) {
        http.postJson(this.baseApi + '/api/customservice/cf/auditProductInfo', params).then((res) => {
          this.$message.success("审核信息提交成功");
          this.showReviewDialog = false;
        }).catch((error) => {
          this.$message.error(error);
        });
      },
      /*
      *  事件处理
      */
      // 产品资质审核通过
      handleReviewPass() {
        this.showDialogTips("确认让该产品通过审核?").then(() => {
          this.reviewForm.nodeId = this.awardProductId;
          this.reviewForm.auditStatus = "1";
          this.putProductReviewStatus([this.reviewForm]);
          this.showPassBtn = true;
        }).catch(() => {});
      },
      // 产品资质审核不通过
      handleReviewNoPass() {
        this.showReviewDialog = true;
      },
      sendReviewStatusRequest() {
        this.reviewForm.nodeId = this.awardProductId;
        this.reviewForm.auditStatus = "2";
        this.putProductReviewStatus([this.reviewForm]);
        this.showPassBtn = true;
      },
      // tab切换
      handleTabChangeClick(tab, event) {

      },
      resetComment() {
        this.reviewForm.auditContent = "";
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
/*  new  */
  .item {
    display: inline-block;
    width: 45%;
  }
  .item2 {
    width: 96%;
  }
  .btn1 {
    background-color: #e04040;
    width: 150px;
    height: 40px;
    color: white;
    border-color: #e04040;
  }
  .btn2 {
    background-color: white;
    width: 150px;
    height: 40px;
  }
  .line{
    height: 10px;
    border-bottom: 1px solid #e6e6e6;
    width: 90%;
    margin: 20px auto;
  }
  .title-left{
    display: inline-block;
    height: 20px;
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }

  /* yuanben */
  .tabs{
    margin: 12px 10px;
  }
  .item-inline{
    display: inline-block;
    width: 45%;
    text-align: center;
  }
  .el-form-item-btn {
    position: relative;
    left: 20%;
    margin: 40px 0;
  }
  .btn2 {
    background-color: white;
    width: 120px;
    height: 40px;
  }
  .item-block{
    display: block;
    width: 100%;
  }
  .tip{
    display: inline-block;
    font-size: 12px;
    line-height: 16px;
    width: 700px;
    top: -10px;
    text-align: left;
    color: #8b8b8b;
  }
  .dialog-footer {
    text-align: center;
    margin: 20px 0;
    padding-bottom: 10px;
  }
  .imgproduct{
    height: 100px;
    width: 100px;
    margin: 10px;
  }
  .reviewbtn-group{
    position: absolute;
    top: 0px;
    right: 100px;
  }
  .reviewbtn-group .reviewbtn-group {
    background-color: #0070b8;
  }
</style>
